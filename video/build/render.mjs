// Rendu image par image via Chrome DevTools Protocol (WebSocket natif de Node, aucune dépendance).
// node render.mjs <film.html> <outdir> <fps> <fromFrame> <toFrame> [port]
// node render.mjs <film.html> <outdir> probe t1 t2 ...
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

const [html, outdir, mode, ...rest] = process.argv.slice(2);
const V = html.includes("-v");
const W = V ? 1080 : 1920, H = V ? 1920 : 1080;
const port = mode === "probe" ? 9400 + Math.floor(Math.random() * 400) : +(rest[2] || 9333);
mkdirSync(outdir, { recursive: true });

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`, "--hide-scrollbars", "--disable-gpu",
  "--force-color-profile=srgb", `--user-data-dir=/tmp/pet-chrome-${port}`, `--window-size=${W},${H}`, "about:blank"], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) {
  try { target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === "page"); } catch { await sleep(200); }
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expr) => (await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true })).result?.result?.value;

await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: false });
await send("Page.enable");
await send("Page.navigate", { url: `http://127.0.0.1:8765/${html}` });
for (let i = 0; i < 100 && !(await ev("window.ready===true")); i++) await sleep(150);

async function shot(t, file) {
  await ev(`seek(${t}); new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))`);
  const r = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  writeFileSync(file, Buffer.from(r.result.data, "base64"));
}

if (mode === "probe") {
  for (const t of rest) await shot(+t, `${outdir}/t${(+t).toFixed(2).padStart(6, "0")}.png`);
} else {
  const fps = +mode, from = +rest[0], to = +rest[1];
  for (let f = from; f < to; f++) await shot(f / fps, `${outdir}/f${String(f).padStart(5, "0")}.png`);
}
ws.close(); chrome.kill();
process.exit(0);

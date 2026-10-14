// Capture d'une section du site à plusieurs largeurs via CDP.
// node shot.mjs <url> <selecteur> <outdir> [clic]
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

const [url, sel, outdir, clic] = process.argv.slice(2);
mkdirSync(outdir, { recursive: true });
const port = 9500 + Math.floor(Math.random() * 300);
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", `--remote-debugging-port=${port}`,
  "--hide-scrollbars", `--user-data-dir=/tmp/pet-shot-${port}`, "--autoplay-policy=no-user-gesture-required", "about:blank"], { stdio: "ignore" });
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
const ev = async (e) => (await send("Runtime.evaluate", { expression: e, awaitPromise: true, returnByValue: true })).result?.result?.value;

for (const w of [360, 768, 1024, 1440]) {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 768 });
  await send("Page.navigate", { url });
  await sleep(4500);
  if (clic) { await ev(`document.querySelector(${JSON.stringify(clic)})?.click()`); await sleep(2500); }
  const box = await ev(`(()=>{const e=document.querySelector(${JSON.stringify(sel)});e.scrollIntoView({block:'start'});const r=e.getBoundingClientRect();return {y:r.top+scrollY,h:r.height}})()`);
  await sleep(1500);
  const r = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y: box.y, width: w, height: box.h, scale: 1 } });
  writeFileSync(`${outdir}/w${w}${clic ? "-lecture" : ""}.png`, Buffer.from(r.result.data, "base64"));
  console.log(w, Math.round(box.h), await ev(`document.documentElement.scrollWidth>innerWidth?'DEBORDEMENT':'ok'`));
}
ws.close(); chrome.kill(); process.exit(0);

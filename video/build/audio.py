# Mixage : voix (placée sur timeline.json) + musique Mixkit ducking + SFX calés sur leur pic, puis -14 LUFS.
import json, subprocess, numpy as np

T = json.load(open("timeline.json"))
TOTAL, TEMPO, SC = T["total"], T["tempo"], T["scenes"]


def peak(f):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-ac", "1", "-ar", "44100", "-f", "s16le", "-"], capture_output=True).stdout
    x = np.abs(np.frombuffer(raw, np.int16).astype(float))
    return float(np.argmax(x) / 44100)


WH, IMP = "sfx/1490.mp3", "sfx/1143.mp3"
pw, pi = peak(WH), peak(IMP)
inputs, filt, vo_labels, fx_labels = [], [], [], []


def add(f):
    inputs.extend(["-i", f]); return len(inputs) // 2 - 1


for s in SC:
    k = add(f"vo/l{s['i']:02d}.mp3")
    ms = int(s["vo"] * 1000)
    filt.append(f"[{k}]atempo={TEMPO},highpass=f=80,adelay={ms}|{ms},apad[v{k}]")
    vo_labels.append(f"[v{k}]")
# souffle doux, pic calé sur chaque changement de scène
for s in SC[1:]:
    k = add(WH); ms = max(0, int((s["start"] - pw) * 1000))
    filt.append(f"[{k}]volume=0.10,adelay={ms}|{ms},apad[f{k}]"); fx_labels.append(f"[f{k}]")
# impact sourd : logo d'ouverture et carte finale
for t in (0.55, SC[-1]["start"] + 0.35):
    k = add(IMP); ms = max(0, int((t - pi) * 1000))
    filt.append(f"[{k}]volume=0.22,lowpass=f=3000,adelay={ms}|{ms},apad[f{k}]"); fx_labels.append(f"[f{k}]")
m = add("audio/m32.mp3")
fade = TOTAL - 3.2
filt.append(f"[{m}]volume=0.55,afade=t=in:d=0.8,afade=t=out:st={fade:.2f}:d=3.0[mus]")
n = len(vo_labels)
filt.append("".join(vo_labels) + f"amix=inputs={n}:normalize=0,asplit=2[vo][vsc]")
filt.append("[mus][vsc]sidechaincompress=threshold=0.03:ratio=6:attack=40:release=450[duck]")
filt.append("[duck][vo]" + "".join(fx_labels) + f"amix=inputs={2 + len(fx_labels)}:normalize=0,atrim=0:{TOTAL:.3f},"
            "loudnorm=I=-14:TP=-1.5:LRA=9,aresample=48000[out]")
cmd = ["ffmpeg", "-y", "-v", "error", *inputs, "-filter_complex", ";".join(filt), "-map", "[out]", "-ac", "2", "-c:a", "pcm_s16le", "mix.wav"]
subprocess.run(cmd, check=True)
print("mix.wav", TOTAL, "s; whoosh peak", round(pw, 3), "impact peak", round(pi, 3))

# sous-titres SRT
def ts(x):
    h, r = divmod(x, 3600); mi, se = divmod(r, 60)
    return f"{int(h):02d}:{int(mi):02d}:{int(se):02d},{int(round((se % 1) * 1000)):03d}"
with open("pet-presentation.srt", "w") as f:
    for j, s in enumerate(SC, 1):
        f.write(f"{j}\n{ts(s['vo'])} --> {ts(s['vo'] + s['vodur'] + 0.15)}\n{s['text']}\n\n")

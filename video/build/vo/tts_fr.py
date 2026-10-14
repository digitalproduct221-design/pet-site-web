# Voix off v2 : voix « Eric » (certifiée français standard), modèle eleven_multilingual_v2, réplique par réplique.
import json, os, base64, urllib.request, subprocess
L = ["Pé, Eu, Té, Partenaire Entreprise Travaux.",
     "Depuis 2016, nous construisons durablement au Sénégal.",
     "Cinq expertises, un seul partenaire.",
     "Le bâtiment : logements, écoles, ateliers et usines.",
     "Les travaux publics et la VRD : routes, voiries, terrassement et réseaux divers.",
     "L'hydraulique : pose de conduites, stations de pompage et irrigation.",
     "L'assainissement : réseaux d'eaux usées et stations de traitement.",
     "Le génie civil : des ouvrages en béton armé, conçus pour durer.",
     "Et jusqu'aux finitions : électricité et peinture.",
     "De la conception à la réalisation, nous coordonnons chaque corps de métier.",
     "Une équipe qualifiée, forte de plus de quarante ans d'expérience cumulée.",
     "Qualité, sécurité, respect des lieux et des délais.",
     "Pé, Eu, Té, votre allié de confiance. Parlons de votre projet."]
V = "cjVigY5qzO86Huf0OWal"  # Eric
K = open(os.path.expanduser("~/.config/elevenlabs-key")).read().strip()
here = os.path.dirname(os.path.abspath(__file__))
out = []
for i, t in enumerate(L, 1):
    f = os.path.join(here, f"l{i:02d}.mp3")
    if not os.path.exists(f):
        body = {"text": t, "model_id": "eleven_multilingual_v2", "language_code": "fr",
                "voice_settings": {"stability": 0.55, "similarity_boost": 0.75, "style": 0.0, "use_speaker_boost": True},
                # continuité de ton entre répliques
                "previous_text": L[i - 2] if i > 1 else None, "next_text": L[i] if i < len(L) else None}
        req = urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{V}/with-timestamps?output_format=mp3_44100_128",
                                     data=json.dumps(body).encode(), headers={"xi-api-key": K, "Content-Type": "application/json"})
        d = json.load(urllib.request.urlopen(req, timeout=120))
        open(f, "wb").write(base64.b64decode(d["audio_base64"]))
        json.dump(d.get("alignment"), open(f[:-4] + ".json", "w"))
    dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]))
    out.append({"i": i, "text": t, "dur": round(dur, 3)})
    print(i, round(dur, 2), t)
json.dump(out, open(os.path.join(here, "lines.json"), "w"), ensure_ascii=False, indent=1)
print("total", round(sum(o["dur"] for o in out), 2), "s ;", sum(len(t) for t in L), "caractères")

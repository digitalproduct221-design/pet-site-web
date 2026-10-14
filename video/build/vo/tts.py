import json,os,base64,urllib.request,subprocess
L=["Pé, Eu, Té, Partenaire Entreprise Travaux.",
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
V="onwK4e9ZLuTAKqWW03F9"; K=os.environ["ELEVENLABS_API_KEY"]
out=[]
for i,t in enumerate(L,1):
    f=f"l{i:02d}.mp3"
    if not os.path.exists(f):
        req=urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{V}/with-timestamps?output_format=mp3_44100_128",
          data=json.dumps({"text":t,"model_id":"eleven_v4","language_code":"fr"}).encode(),headers={"xi-api-key":K,"Content-Type":"application/json"})
        d=json.load(urllib.request.urlopen(req))
        open(f,"wb").write(base64.b64decode(d["audio_base64"])); json.dump(d.get("alignment"),open(f"l{i:02d}.json","w"))
    dur=float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f]))
    out.append({"i":i,"text":t,"dur":round(dur,3)}); print(i,round(dur,2),t)
json.dump(out,open("lines.json","w"),ensure_ascii=False,indent=1)
print("total",round(sum(o["dur"] for o in out),2), "chars",sum(len(t) for t in L))

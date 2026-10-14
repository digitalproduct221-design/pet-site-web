IMG="file:///Users/mac/PET-site-web/public/images/chantiers/"
BR="file:///Users/mac/PET-site-web/public/brand/"
N,R,Y,K,S,I="#0B1B3F","#21409A","#F7C61C","#5B9BD5","#F3EBDD","#1A1F2E"
HEAD="""<meta charset=utf-8><link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Manrope:wght@500;600;700&display=block" rel=stylesheet><style>
*{margin:0;box-sizing:border-box}body{width:1920px;height:1080px;position:relative;overflow:hidden;font-family:Manrope,sans-serif}
.abs{position:absolute}.ph{position:absolute;background-size:cover;background-position:center}
.t{font-family:'Barlow Condensed';font-weight:800;text-transform:uppercase;line-height:.95;letter-spacing:.005em}
.k{font-family:Manrope;font-weight:700;font-size:22px;letter-spacing:.22em;text-transform:uppercase}
.li{font-size:30px;font-weight:600;line-height:1.35;display:flex;gap:18px;align-items:center;margin-top:22px}
.li i{width:12px;height:12px;background:%Y%;flex:none}
.cTL{position:absolute;width:70px;height:70px;border-left:8px solid %Y%;border-top:8px solid %Y%}
.cBR{position:absolute;width:70px;height:70px;border-right:8px solid %K%;border-bottom:8px solid %K%}
.sub{position:absolute;left:0;right:0;bottom:44px;text-align:center}.sub span{background:rgba(11,27,63,.82);color:#fff;font-size:28px;font-weight:600;padding:8px 20px}
.tag{position:absolute;right:28px;top:20px;font-size:16px;opacity:.5;font-weight:700;letter-spacing:.1em}
</style>""".replace("%Y%",Y).replace("%K%",K)
def frame(x,y,w,h,img,pos="center"):
    return f'<div class=ph style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;background-image:url({IMG}{img}.jpg);background-position:{pos}"></div><div class=cTL style="left:{x-22}px;top:{y-22}px"></div><div class=cBR style="left:{x+w-48}px;top:{y+h-48}px"></div>'
SERV=["Bâtiment","Travaux publics et VRD","Hydraulique","Assainissement","Génie civil"]
def prog(active,dark):
    c="#fff" if dark else N
    o=""
    for i,s in enumerate(SERV):
        on=i==active
        o+=f'<div style="display:flex;align-items:center;gap:10px;opacity:{1 if on else .45}"><div style="width:{46 if on else 18}px;height:6px;background:{Y if on else c}"></div><span style="font-size:17px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:{c}">{s}</span></div>'
    return f'<div class=abs style="left:110px;top:60px;display:flex;gap:34px">{o}</div>'
ICON={
"bat":'<path d="M8 56V20l20-12 20 12v36M20 56V36h16v20M4 56h56" />',
"vrd":'<path d="M18 58L28 6M46 58L36 6M32 12v6M32 26v8M32 42v10" />',
"hyd":'<path d="M32 6C22 22 14 30 14 40a18 18 0 0036 0c0-10-8-18-18-34z" />',
"ass":'<path d="M6 20h52M6 44h52M14 20v24M50 20v24M24 32h16" /><circle cx="32" cy="32" r="4"/>',
"gc":'<path d="M4 50h56M10 50V30M54 50V30M4 30h56M18 30a14 14 0 0128 0" />',
"elec":'<path d="M36 4L14 36h16l-4 24 24-34H34z" />',
}
def icon(k,col): return f'<svg width="72" height="72" viewBox="0 0 64 64" fill="none" stroke="{col}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round">{ICON[k]}</svg>'
def split(n,idx,ic,title,lines,img,bg,voice,photo_right=False,pos="center"):
    dark=bg!=S; fg="#fff" if dark else N; acc=Y if dark else R
    px=860 if photo_right else 110; tx=110 if photo_right else 1230
    lis="".join(f'<div class=li style="color:{fg}"><i></i>{l}</div>' for l in lines)
    num=f"0{idx+1}" if idx is not None else "06"
    body=frame(px,190,950,720,img,pos)+f'''<div class=abs style="left:{tx}px;top:250px;width:600px;color:{fg}">{icon(ic,acc)}
<div class=k style="margin-top:34px;color:{acc}">{num} · Savoir-faire</div><div class=t style="font-size:{104 if len(title)<14 else 84}px;margin-top:16px">{title}</div><div style="margin-top:20px">{lis}</div></div>'''
    return pg(n,bg,body+(prog(idx,dark) if idx is not None else ""),voice)
def pg(n,bg,body,voice): return f'{HEAD}<body style="background:{bg}">{body}<div class=sub><span>{voice}</span></div><div class=tag style="color:{"#000" if bg==S else "#fff"}">SCÈNE {n:02d}</div></body>'
P={}
grid="".join(f'<div class=abs style="left:{i}px;top:0;width:1px;height:1080px;background:{K};opacity:.12"></div>' for i in range(0,1920,80))+"".join(f'<div class=abs style="top:{i}px;left:0;height:1px;width:1920px;background:{K};opacity:.12"></div>' for i in range(0,1080,80))
P[1]=pg(1,N,grid+f'<img class=abs src="{BR}logo-pet-inverse.png" style="left:560px;top:250px;width:800px">',"« PET, Partenaire Entreprise Travaux. »")
P[2]=pg(2,N,f'<div class=ph style="inset:0;background-image:url({IMG}gros-oeuvre-dakar.jpg)"></div><div class=abs style="inset:0;background:linear-gradient(90deg,{N}f2 0%,{N}b0 45%,{N}10 100%)"></div><div class=abs style="left:110px;top:330px;color:#fff"><div class=k style="color:{Y}">Entreprise de BTP · Sénégal</div><div class=t style="font-size:150px;margin-top:20px">Construire<br>durablement</div><div style="font-size:40px;font-weight:600;margin-top:26px">au Sénégal, depuis <b style="color:{Y}">2016</b>.</div></div><div class=cTL style="left:80px;top:290px"></div>',"« Depuis 2016, nous construisons le Sénégal de demain. »")
cards=[("Bâtiment","immeuble-grue"),("Travaux publics et VRD","vrd-asphalte-boulevard"),("Hydraulique","hydraulique-canalisations-pose"),("Assainissement","dalot-regard"),("Génie civil","genie-civil-reservoir-beton")]
cc="".join(f'<div class=abs style="left:{110+i*346}px;top:400px;width:320px;height:440px;background:#fff;box-shadow:0 20px 40px rgba(11,27,63,.12)"><div class=ph style="left:0;top:0;width:320px;height:300px;background-image:url({IMG}{im}.jpg)"></div><div class=abs style="left:0;top:300px;width:320px;height:6px;background:{Y if i%2==0 else K}"></div><div class=k style="position:absolute;left:24px;top:330px;color:{R};font-size:18px">0{i+1}</div><div class=t style="position:absolute;left:24px;top:362px;font-size:{42 if len(t)<14 else 34}px;color:{N};width:280px">{t}</div></div>' for i,(t,im) in enumerate(cards))
P[3]=pg(3,S,f'<div class=abs style="left:110px;top:130px"><div class=k style="color:{R}">Nos savoir-faire</div><div class=t style="font-size:110px;color:{N};margin-top:14px">Cinq expertises, <span style="color:{R}">un seul partenaire</span></div></div>'+cc,"« Cinq expertises, un seul partenaire. »")
P[4]=split(4,0,"bat","Bâtiment",["Logements","Écoles et universités","Ateliers et usines","Murs de clôture"],"immeuble-grue",N,"« Bâtiments d'habitation, scolaires et industriels. »")
P[5]=split(5,1,"vrd","Travaux publics et VRD",["Routes et pistes","Ponts et ouvrages d'art","Voiries et réseaux divers","Terrassement"],"vrd-asphalte-boulevard",R,"« Routes, voiries, terrassement et réseaux divers. »",True)
P[6]=split(6,2,"hyd","Hydraulique",["Pose de conduites, dont fonte","Stations de pompage","Bâches à eau et dalots","Irrigation"],"hydraulique-canalisations-pose",S,"« L'eau potable acheminée avec rigueur. »")
P[7]=split(7,3,"ass","Assainissement",["Stations de traitement","Réseaux d'eaux usées","Regards de visite","Réhabilitation de dalots"],"dalot-regard",N,"« Des réseaux d'assainissement fiables et durables. »",True)
P[8]=split(8,4,"gc","Génie civil",["Ouvrages en béton armé","Travaux souterrains","Ouvrages d'art"],"genie-civil-reservoir-beton",R,"« Des ouvrages en béton armé, conçus pour durer. »")
P[9]=split(9,None,"elec","Électricité et peinture",["Installations basse tension","Éclairage et mise aux normes","Peintures et ravalement"],"villa-contemporaine",S,"« Jusqu'aux finitions : électricité et peinture. »",True)
steps=[("Conception","etude-plans-equipe-pet"),("Coordination","pilotage-chantier"),("Réalisation","controle-qualite-beton")]
st="".join(f'<div class=ph style="left:{110+i*580}px;top:360px;width:540px;height:460px;background-image:url({IMG}{im}.jpg)"></div><div class=abs style="left:{110+i*580}px;top:760px;width:540px;height:60px;background:linear-gradient(0deg,{N}cc,transparent)"></div><div class="t abs" style="left:{110+i*580}px;top:280px;font-size:90px;color:{Y}">0{i+1}</div><div class="t abs" style="left:{220+i*580}px;top:300px;font-size:56px;color:#fff">{t}</div>' for i,(t,im) in enumerate(steps))
P[10]=pg(10,N,f'<div class=abs style="left:110px;top:110px;color:#fff"><div class=k style="color:{Y}">Notre méthode</div><div class=t style="font-size:96px;margin-top:12px">De la conception à la réalisation</div></div>'+st,"« Nous gérons tout, de la conception à la réalisation. »")
stats=[("2016","Année de création"),("40+","Ans d'expérience cumulée"),("3","Types de clients : publics, industriels, privés")]
ss="".join(f'<div class=abs style="left:{110+i*580}px;top:420px;width:520px;color:#fff;border-top:6px solid {Y if i!=1 else K};padding-top:30px"><div class=t style="font-size:200px;color:{Y if i!=1 else "#fff"}">{v}</div><div style="font-size:32px;font-weight:600;margin-top:10px;line-height:1.3">{l}</div></div>' for i,(v,l) in enumerate(stats))
P[11]=pg(11,R,f'<div class=abs style="left:110px;top:130px;color:#fff"><div class=k style="color:{Y}">PET en bref</div><div class=t style="font-size:96px;margin-top:12px">Une expérience solide</div></div>'+ss,"« Une équipe forte de plus de quarante ans d'expérience cumulée. »")
vals=["Qualité","Sécurité","Respect des lieux","Choix des matériaux","Tenue des délais","Satisfaction du client"]
vv="".join(f'<div class=li style="color:{N};font-size:38px;margin-top:26px"><i style="width:16px;height:16px;background:{Y if i%2==0 else R}"></i>{v}</div>' for i,v in enumerate(vals))
P[12]=pg(12,S,frame(110,190,900,720,"briefing-securite-equipe")+f'<div class=abs style="left:1140px;top:220px"><div class=k style="color:{R}">Nos engagements</div><div class=t style="font-size:96px;color:{N};margin-top:14px">Nos valeurs</div>{vv}</div>',"« Qualité, sécurité, respect des lieux et des délais. »")
P[13]=pg(13,N,grid+f'<img class=abs src="{BR}logo-pet-inverse.png" style="left:710px;top:130px;width:500px"><div class="t abs" style="left:0;right:0;top:580px;text-align:center;font-size:84px;color:#fff">Votre allié de confiance</div><div class=abs style="left:0;right:0;top:700px;text-align:center;color:#fff;font-size:32px;font-weight:600">33 827 61 85 · 77 597 01 98 · 78 305 04 44<br><span style="color:{K}">partenaire.direction@outlook.com</span></div><div class="abs t" style="left:810px;top:840px;width:300px;height:76px;background:{Y};color:{N};font-size:38px;display:flex;align-items:center;justify-content:center">Demander un devis</div>',"« PET : votre allié de confiance. Parlons de votre projet. »")
for n,h in P.items(): open(f"p{n:02d}.html","w").write(h)

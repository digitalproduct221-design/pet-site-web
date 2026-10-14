import math, os
P="file:///Users/mac/PET-site-web/public/images/chantiers/"
NIGHT,ROY,YEL,SKY,SAND,INK="#0B1B3F","#21409A","#F7C61C","#5B9BD5","#F3EBDD","#1A1F2E"
CSS="""*{margin:0;box-sizing:border-box}body{width:1920px;height:1080px;position:relative;overflow:hidden;font-family:'Barlow Condensed','Arial Narrow',Impact,sans-serif}
svg{position:absolute;inset:0}.h{position:absolute;font-weight:800;text-transform:uppercase;line-height:1}
.c{position:absolute;font-family:Inter,Helvetica,Arial,sans-serif;font-size:30px;font-weight:600}
.tag{position:absolute;right:60px;top:40px;font-family:Inter,Helvetica;font-size:22px;opacity:.65}
.sub{position:absolute;left:0;right:0;bottom:36px;text-align:center;font-family:Inter,Helvetica;font-size:30px;font-weight:600}
"""
def iso(x,y,z,cx=960,cy=600,s=40):
    return (cx+(x-y)*0.866*s, cy+(x+y)*0.5*s - z*s)
def box(x,y,z,w,d,h,top,left,right,cx=960,cy=600,s=40,stroke="none"):
    p=lambda a,b,c: "%.1f,%.1f"%iso(a,b,c,cx,cy,s)
    t=" ".join([p(x,y,z+h),p(x+w,y,z+h),p(x+w,y+d,z+h),p(x,y+d,z+h)])
    l=" ".join([p(x,y+d,z+h),p(x+w,y+d,z+h),p(x+w,y+d,z),p(x,y+d,z)])
    r=" ".join([p(x+w,y,z+h),p(x+w,y+d,z+h),p(x+w,y+d,z),p(x+w,y,z)])
    return f'<polygon points="{l}" fill="{left}" stroke="{stroke}"/><polygon points="{r}" fill="{right}" stroke="{stroke}"/><polygon points="{t}" fill="{top}" stroke="{stroke}"/>'
def page(n,style,bg,body,text,voice,dark=True):
    col="#fff" if dark else INK
    return f'<meta charset=utf-8><style>{CSS}body{{background:{bg};color:{col}}}</style><svg width=1920 height=1080 viewBox="0 0 1920 1080">{body}</svg>{text}<div class=tag>SCÈNE {n:02d} · {style}</div><div class=sub style="color:{col}"><span style="background:{"rgba(0,0,0,.35)" if dark else "rgba(255,255,255,.7)"};padding:6px 18px">{voice}</span></div>'
S=[]
# 1 blueprint
g="".join(f'<path d="M{i} 0V1080" stroke="#5B9BD5" stroke-opacity=".18"/>' for i in range(0,1920,60))+"".join(f'<path d="M0 {i}H1920" stroke="#5B9BD5" stroke-opacity=".18"/>' for i in range(0,1080,60))
b=g+f'<g fill="none" stroke="{SKY}" stroke-width="3"><rect x="300" y="340" width="520" height="420"/><path d="M300 340L560 220L820 340M420 760V560h120v200M600 440h140v100H600M340 440h100M300 760H820" stroke-dasharray="14 8"/><path d="M300 800H820M300 790v20M820 790v20" stroke="{YEL}"/></g><text x="560" y="835" fill="{YEL}" font-size="26" text-anchor="middle" font-family="Inter">12 000 mm</text><circle cx="1380" cy="520" r="230" fill="none" stroke="{YEL}" stroke-width="4" stroke-dasharray="3 14"/>'
S.append(page(1,"PLAN D'ARCHITECTE ANIMÉ",NIGHT,b,f'<div class=h style="left:1030px;top:400px;font-size:260px;color:{YEL}">PET</div><div class=c style="left:1040px;top:670px;letter-spacing:.2em;color:#fff">PARTENAIRE ENTREPRISE TRAVAUX</div>',"« PET, Partenaire Entreprise Travaux. »"))
# 2 iso city
bs=""
import random; random.seed(4)
for i in range(7):
    for j in range(5):
        h=random.choice([1,1.5,2,3,4,6]); c=random.choice([ROY,SKY,"#fff"])
        bs+=box(i*2,j*2,0,1.5,1.5,h,"#ffffff" if c!="#fff" else "#e8e1d0",c,"#16306f" if c==ROY else "#3f78b0",cx=960,cy=420,s=36)
crane=f'<path d="M1500 560V150H1100M1500 190l-90 -30" stroke="{YEL}" stroke-width="12" fill="none"/><rect x="1090" y="150" width="40" height="70" fill="{YEL}"/>'
S.append(page(2,"ISOMÉTRIQUE PLAT",SAND,bs+crane,f'<div class=h style="left:100px;top:90px;font-size:150px;color:{NIGHT}">Depuis<br><span style="color:{ROY}">2016</span></div>',"« Depuis 2016, nous construisons le Sénégal de demain. »",False))
# 3 kinetic
st="".join(f'<rect x="{i*160-400}" y="0" width="60" height="1500" fill="{NIGHT}" opacity=".08" transform="rotate(20 960 540)"/>' for i in range(0,18))
S.append(page(3,"TYPO CINÉTIQUE",YEL,st,f'<div class=h style="left:90px;top:60px;font-size:330px;color:{NIGHT};line-height:.9">Bâtir.<br><span style="margin-left:220px;color:{ROY}">Relier.</span><br>Assainir.</div>',"« Bâtir. Relier. Assainir. »",False))
# 4 exploded building
b=f'<ellipse cx="960" cy="900" rx="520" ry="110" fill="#000" opacity=".25"/>'
for k,(z,c) in enumerate([(0,"#16306f"),(2.2,ROY),(4.4,SKY),(6.6,"#cfe3f5")]):
    b+=box(0,0,z+k*1.0,8,5,1.4,"#ffffff" if k==3 else c,c,"#0B1B3F",cx=960,cy=640,s=44)
for k in range(4):
    y=640+0.5*(0)+ -(k*3.2)*44 + 0
b+=f'<path d="M1500 360H1250M1500 530H1250M1500 700H1250" stroke="{YEL}" stroke-width="3" stroke-dasharray="8 8"/>'
S.append(page(4,"ISOMÉTRIQUE ÉCLATÉ 3D",NIGHT,b,f'<div class=h style="left:100px;top:110px;font-size:120px">Bâtiment</div><div class=c style="left:104px;top:250px;color:{YEL};line-height:1.7">Logements<br>Écoles et universités<br>Ateliers et usines<br>Murs de clôture</div><div class=c style="left:1510px;top:335px">Toiture</div><div class=c style="left:1510px;top:505px">Étages</div><div class=c style="left:1510px;top:675px">Fondations</div>',"« Bâtiment, travaux publics, voiries et réseaux divers. »"))
# 5 road map
cont="".join(f'<ellipse cx="1000" cy="600" rx="{150+i*90}" ry="{80+i*50}" fill="none" stroke="{SKY}" stroke-opacity=".35" stroke-width="2"/>' for i in range(9))
b=cont+f'<path d="M-50 900C500 800 900 300 1980 220" stroke="#2a2f3d" stroke-width="150" fill="none"/><path d="M-50 900C500 800 900 300 1980 220" stroke="#fff" stroke-width="6" stroke-dasharray="40 30" fill="none"/>'
for x,y in [(520,780),(940,470),(1380,300)]:
    b+=f'<circle cx="{x}" cy="{y-70}" r="30" fill="{YEL}"/><path d="M{x} {y-40}V{y}" stroke="{YEL}" stroke-width="6"/><circle cx="{x}" cy="{y}" r="10" fill="{YEL}"/>'
S.append(page(5,"CARTE TOPOGRAPHIQUE",NIGHT,b,f'<div class=h style="left:100px;top:100px;font-size:120px">Travaux publics<br><span style="color:{YEL}">et VRD</span></div><div class=c style="left:104px;top:360px;line-height:1.7">Routes et pistes · Ponts et ouvrages d\'art<br>Terrassement · Voiries et réseaux divers</div>',"« …travaux publics, voiries et réseaux divers. »"))
# 6 hydraulique cross-section
b=f'<rect y="380" width="1920" height="700" fill="#7a5a3a"/><rect y="380" width="1920" height="40" fill="#a98757"/><rect y="760" width="1920" height="320" fill="#5a4129"/><rect y="0" width="1920" height="380" fill="#cfe3f5"/>'
b+=f'<rect x="200" y="540" width="1520" height="90" rx="45" fill="{ROY}"/><rect x="200" y="560" width="1520" height="20" rx="10" fill="{SKY}"/>'
b+="".join(f'<path d="M{x} 585l30 -15v30z" fill="#fff"/>' for x in range(300,1700,150))
b+=f'<rect x="1380" y="230" width="250" height="160" fill="#fff"/><rect x="1380" y="215" width="250" height="25" fill="{YEL}"/><rect x="1480" y="300" width="50" height="90" fill="{ROY}"/><path d="M1505 390V540" stroke="{ROY}" stroke-width="30"/><g><rect x="350" y="120" width="200" height="130" fill="{ROY}"/><rect x="350" y="105" width="200" height="22" fill="{YEL}"/><path d="M450 250V380" stroke="{ROY}" stroke-width="26"/></g><path d="M450 380V540" stroke="{ROY}" stroke-width="26"/>'
S.append(page(6,"COUPE TECHNIQUE 2D",NIGHT,b,f'<div class=h style="left:700px;top:60px;font-size:100px;color:{NIGHT}">Hydraulique</div><div class=c style="left:700px;top:170px;color:{NIGHT}">Conduites en fonte · Stations de pompage · Bâches à eau</div><div class=c style="left:240px;top:850px;color:#fff;font-size:34px">Dalots · Irrigation · Pose de conduites de différents diamètres</div>',"« Hydraulique et assainissement : l'eau acheminée et traitée avec rigueur. »"))
# 7 assainissement flow
b=f'<rect width="1920" height="1080" fill="{SAND}"/>'
cols=["#8b6b43","#9fb07a","#7fc4e8"]
for i,c in enumerate(cols):
    x=180+i*600
    b+=f'<rect x="{x}" y="380" width="420" height="380" rx="12" fill="#fff" stroke="{NIGHT}" stroke-width="8"/><rect x="{x+8}" y="{480-i*20}" width="404" height="{272+i*20}" fill="{c}"/>'
    if i<2: b+=f'<path d="M{x+420} 560H{x+600}" stroke="{ROY}" stroke-width="22"/><path d="M{x+560} 520l60 40l-60 40z" fill="{ROY}"/>'
b+=f'<circle cx="1470" cy="330" r="26" fill="{SKY}"/><path d="M1470 270l-26 40h52z" fill="{SKY}"/>'
S.append(page(7,"SCHÉMA DE PROCESSUS",SAND,b,f'<div class=h style="left:100px;top:90px;font-size:120px;color:{NIGHT}">Assainissement</div><div class=c style="left:104px;top:230px;color:{ROY}">Eaux usées → traitement → eau rejetée aux normes</div><div class=c style="left:180px;top:800px;color:{NIGHT};font-size:32px">Réseaux · Regards de visite · Stations de traitement · Dalots réhabilités</div>',"« …l'eau acheminée et traitée avec rigueur. »",False))
# 8 genie civil wireframe
b=""
for i in range(0,9):
    for j in range(0,5):
        for k,(a,bb) in enumerate([((i,j,0),(i,j,5))]):
            p=iso(*a,cx=960,cy=700,s=44); q=iso(*bb,cx=960,cy=700,s=44)
            b+=f'<path d="M{p[0]:.0f} {p[1]:.0f}L{q[0]:.0f} {q[1]:.0f}" stroke="{YEL}" stroke-width="3" opacity=".9"/>'
for z in (0,1.5,3,4.5):
    p=[iso(0,0,z,960,700,44),iso(8,0,z,960,700,44),iso(8,4,z,960,700,44),iso(0,4,z,960,700,44)]
    b+=f'<polygon points="{" ".join("%.0f,%.0f"%t for t in p)}" fill="none" stroke="{SKY}" stroke-width="4"/>'
b+=box(0,0,-1,8,4,1,"#9aa3b2","#6b7385","#4f5668",cx=960,cy=700,s=44)
S.append(page(8,"FIL DE FER 3D",NIGHT,b,f'<div class=h style="left:100px;top:100px;font-size:120px">Génie civil</div><div class=c style="left:104px;top:240px;color:{YEL};line-height:1.7">Ouvrages hydrauliques en béton armé<br>Travaux souterrains · Ouvrages d\'art</div>',"« Génie civil : des ouvrages durables… »"))
# 9 split élec/peinture
b=f'<rect width="960" height="1080" fill="{NIGHT}"/><rect x="960" width="960" height="1080" fill="{SAND}"/>'
b+=f'<path d="M120 700H420V400H700V700H860" stroke="{YEL}" stroke-width="10" fill="none"/><circle cx="420" cy="400" r="22" fill="{YEL}"/><circle cx="700" cy="700" r="22" fill="{YEL}"/><circle cx="560" cy="250" r="70" fill="{YEL}" opacity=".95"/><path d="M530 330h60v40h-60z" fill="#fff"/>'
b+=f'<rect x="1100" y="360" width="640" height="360" fill="#fff"/><rect x="1100" y="360" width="400" height="360" fill="{ROY}"/><rect x="1060" y="300" width="300" height="70" rx="10" fill="{YEL}"/><path d="M1360 335H1600V210" stroke="{INK}" stroke-width="10" fill="none"/>'
S.append(page(9,"SPLIT SCREEN ÉLECTRICITÉ / PEINTURE",NIGHT,b,f'<div class=h style="left:90px;top:80px;font-size:100px">Électricité</div><div class=h style="left:1020px;top:80px;font-size:100px;color:{ROY}">et peinture</div><div class=c style="left:96px;top:880px">Basse tension · Tableaux · Éclairage · Mise aux normes</div><div class=c style="left:1020px;top:880px;color:{INK}">Peintures intérieures et extérieures · Ravalement</div>',"« …électricité et peinture, jusqu'aux finitions. »"))
# 10 counter
b=f'<circle cx="960" cy="540" r="330" fill="none" stroke="#fff" stroke-opacity=".15" stroke-width="40"/><path d="M960 210A330 330 0 1 1 640 640" fill="none" stroke="{YEL}" stroke-width="40" stroke-linecap="round"/>'
b+=f'<path d="M200 960H1720" stroke="#fff" stroke-opacity=".4" stroke-width="4"/>'+"".join(f'<circle cx="{200+i*190}" cy="960" r="{14 if i not in (0,8) else 24}" fill="{YEL if i in (0,8) else SKY}"/>' for i in range(9))
S.append(page(10,"COMPTEUR / FRISE",ROY,b,f'<div class=h style="left:660px;top:340px;font-size:250px;color:{YEL};width:600px;text-align:center">40+</div><div class=c style="left:660px;top:600px;width:600px;text-align:center;font-size:40px">ans d\'expérience cumulée</div><div class=c style="left:170px;top:990px">2016 · création</div><div class=c style="left:1560px;top:990px">aujourd\'hui</div>',"« …plus de quarante ans d'expérience cumulée. »"))
# 11 values
vals=["Qualité","Sécurité","Service et conseil","Respect des lieux","Choix des matériaux","Tenue des délais","Satisfaction du client"]
b=f'<rect width="1920" height="1080" fill="url(#g)"/><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{NIGHT}"/><stop offset="1" stop-color="{ROY}"/></linearGradient></defs>'
for i,v in enumerate(vals):
    r,c=divmod(i,4) if i<4 else (1,i-4)
    x=130+c*430+(215 if r==1 else 0); y=300+r*300
    b+=f'<rect x="{x}" y="{y}" width="390" height="250" rx="8" fill="#fff" fill-opacity=".1" stroke="#fff" stroke-opacity=".4"/><rect x="{x}" y="{y}" width="40" height="8" fill="{YEL}"/><circle cx="{x+60}" cy="{y+85}" r="30" fill="{YEL}"/><text x="{x+30}" y="{y+200}" fill="#fff" font-size="46" font-weight="800" font-family="Barlow Condensed,Arial Narrow" >{v.upper()}</text>'
S.append(page(11,"CARTES VERRE / UI",NIGHT,b,f'<div class=h style="left:130px;top:100px;font-size:110px">Nos <span style="color:{YEL}">valeurs</span></div>',"« Qualité, sécurité, respect des lieux, tenue des délais. »"))
# 12 process
steps=[("1","Conception"),("2","Coordination des corps de métier"),("3","Réalisation")]
b=f'<path d="M300 560H1620" stroke="{ROY}" stroke-width="10" stroke-dasharray="4 22" stroke-linecap="round"/>'
for i,(n,t) in enumerate(steps):
    x=360+i*600
    b+=f'<circle cx="{x}" cy="560" r="120" fill="{ROY if i!=1 else YEL}"/><text x="{x}" y="615" fill="{"#fff" if i!=1 else NIGHT}" font-size="150" font-weight="800" text-anchor="middle" font-family="Barlow Condensed,Arial Narrow">{n}</text>'
S.append(page(12,"PROCESSUS EN 3 ÉTAPES",SAND,b,f'<div class=h style="left:100px;top:90px;font-size:120px;color:{NIGHT}">De la conception<br><span style="color:{ROY}">à la réalisation</span></div>'+"".join(f'<div class=c style="left:{360+i*600-210}px;top:730px;width:420px;text-align:center;color:{NIGHT};font-size:38px">{t}</div>' for i,(n,t) in enumerate(steps)),"« De la conception à la réalisation, une seule équipe. »",False))
# 13 photo duotone in frame
b=f'<rect x="260" y="150" width="1400" height="780" rx="10" fill="#fff"/><rect x="260" y="150" width="1400" height="46" fill="{NIGHT}"/><circle cx="296" cy="173" r="8" fill="{YEL}"/><circle cx="324" cy="173" r="8" fill="{SKY}"/><circle cx="352" cy="173" r="8" fill="#fff"/>'
t=f'<div style="position:absolute;left:272px;top:196px;width:1376px;height:722px;background:url({P}equipe-pet.jpg) center/cover"></div><div style="position:absolute;left:272px;top:196px;width:1376px;height:722px;background:{ROY};mix-blend-mode:multiply;opacity:.5"></div><div class=h style="left:1180px;top:210px;background:{YEL};color:{NIGHT};padding:12px 20px;font-size:50px">Équipes qualifiées</div><div class=h style="left:300px;top:790px;background:{NIGHT};padding:12px 20px;font-size:44px">Sécurité sur chaque chantier</div>'
S.append(page(13,"MAQUETTE ÉCRAN + PHOTO RÉELLE",SAND,b,t,"« Une équipe qualifiée, sur tous les chantiers. »",False))
# 14 end
b=f'<rect width="1920" height="1080" fill="url(#e)"/><defs><radialGradient id="e" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="{ROY}"/><stop offset="1" stop-color="{NIGHT}"/></radialGradient></defs><path d="M520 300v-120h120" stroke="{YEL}" stroke-width="14" fill="none"/><path d="M1400 780v120h-120" stroke="{SKY}" stroke-width="14" fill="none"/>'
S.append(page(14,"CARTE FINALE / LOGO",NIGHT,b,f'<div class=h style="left:0;right:0;top:300px;text-align:center;font-size:300px;color:{YEL}">PET</div><div class=h style="left:0;right:0;top:600px;text-align:center;font-size:70px">Votre allié de confiance</div><div class=c style="left:0;right:0;top:720px;text-align:center;font-size:34px">partenaire.direction@outlook.com · 33 827 61 85 · 77 597 01 98</div>',"« PET : votre allié de confiance. Parlons de votre projet. »"))

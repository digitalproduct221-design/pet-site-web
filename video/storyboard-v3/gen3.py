import math,random
from base import *
S=[]
def add(n,style,bg,body,text,voice,dark=True): S.append((n,page(n,style,bg,body,text,voice,dark)))
poly=[(-17,15),(-10,35),(10,37),(32,31),(43,12),(51,12),(40,-10),(35,-25),(20,-35),(12,-17),(9,4),(-8,4)]
def inside(lo,la):
    c=False;j=len(poly)-1
    for i in range(len(poly)):
        xi,yi=poly[i];xj,yj=poly[j]
        if ((yi>la)!=(yj>la)) and lo<(xj-xi)*(la-yi)/(yj-yi)+xi: c=not c
        j=i
    return c
cx,cy,R=640,560,380
lo0,la0=10,10
def proj(lo,la):
    l=math.radians(lo-lo0);p=math.radians(la);p0=math.radians(la0)
    x=math.cos(p)*math.sin(l); y=math.cos(p0)*math.sin(p)-math.sin(p0)*math.cos(p)*math.cos(l)
    z=math.sin(p0)*math.sin(p)+math.cos(p0)*math.cos(p)*math.cos(l)
    return cx+R*x,cy-R*y,z
b=f'<defs><radialGradient id="gl" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="{ROY}"/><stop offset="1" stop-color="#06122e"/></radialGradient></defs><circle cx="{cx}" cy="{cy}" r="{R+30}" fill="none" stroke="{SKY}" stroke-opacity=".35" stroke-width="3"/><circle cx="{cx}" cy="{cy}" r="{R}" fill="url(#gl)"/>'
for la in range(-80,81,5):
    for lo in range(-90,130,5):
        x,y,z=proj(lo,la)
        if z>0:
            on=inside(lo,la)
            b+=f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{4.5 if on else 2.2}" fill="{YEL if on else "#fff"}" opacity="{.95 if on else .35}"/>'
sx,sy,_=proj(-14.5,14.5)
b+=f'<circle cx="{sx:.0f}" cy="{sy:.0f}" r="34" fill="none" stroke="#fff" stroke-width="4"/><circle cx="{sx:.0f}" cy="{sy:.0f}" r="12" fill="#fff"/>'
b+=f'<rect x="{cx-170}" y="{cy-60}" width="340" height="120" rx="6" fill="{NIGHT}" stroke="{YEL}" stroke-width="5"/>'
chips=["Bâtiment","Hydraulique","Assainissement","Génie civil","Travaux publics et VRD"]
for i,c in enumerate(chips):
    y=250+i*135
    b+=f'<path d="M{cx+R-20} {cy}C1000 {cy} 1000 {y+40} 1130 {y+40}" fill="none" stroke="{YEL}" stroke-width="3" stroke-dasharray="6 8"/><rect x="1130" y="{y}" width="640" height="82" rx="6" fill="#fff" fill-opacity=".1" stroke="#fff" stroke-opacity=".45"/><rect x="1130" y="{y}" width="14" height="82" fill="{YEL}"/><text x="1180" y="{y+56}" fill="#fff" font-size="50" font-weight="800" font-family="Barlow Condensed,Arial Narrow">{c.upper()}</text>'
add(1,"GLOBE 3D + LOGO + 5 SERVICES",NIGHT,b,f'<div class=h style="left:{cx-150}px;top:{cy-40}px;width:300px;text-align:center;font-size:86px;color:{YEL}">PET</div><div class=c style="left:{sx+50:.0f}px;top:{sy-20:.0f}px;font-size:26px">Sénégal</div><div class=h style="left:1130px;top:110px;font-size:80px">Cinq expertises, <span style="color:{YEL}">un partenaire</span></div>',"« Cinq expertises, un seul partenaire. »")
b=f'<rect y="840" width="1920" height="240" fill="#d8cdb6"/>'
for k in range(4):
    b+=box(0,0,k*1.7,6,4,1.5,"#ffffff",ROY if k%2 else SKY,"#16306f" if k%2 else "#3f78b0",cx=760,cy=800,s=52)
b+=f'<path d="M1500 840V180H1000M1500 220l-110 -35" stroke="{YEL}" stroke-width="16" fill="none"/><path d="M1130 180V420" stroke="#fff" stroke-width="4"/><rect x="1105" y="420" width="50" height="40" fill="{YEL}"/>'
b+="".join(f'<circle cx="{200+i*130}" cy="140" r="20" fill="{YEL}"/>' for i in range(4))
add(2,"3D ISOMÉTRIQUE · ÉTAPES DE CONSTRUCTION",SAND,b,f'<div class=h style="left:100px;top:180px;font-size:120px;color:{NIGHT}">Bâtiment</div><div class=c style="left:104px;top:310px;color:{ROY}">Du terrassement aux finitions</div>',"« Du gros œuvre aux finitions. »",False)
b=""
for z,c in [(0,"#7a5a3a"),(1,"#a98757"),(2,"#8d8d95"),(3,"#3a4052")]:
    b+=box(0,0,z*0.9,10,5,0.9,c,c,"#00000066",cx=900,cy=720,s=46)
b+=f'<g transform="translate(980 330)"><rect width="260" height="110" rx="10" fill="{YEL}"/><circle cx="60" cy="130" r="55" fill="{NIGHT}"/><circle cx="210" cy="130" r="40" fill="{NIGHT}"/></g>'
add(3,"3D COUPE DE CHAUSSÉE · COMPACTEUR",NIGHT,b,f'<div class=h style="left:100px;top:90px;font-size:110px">Travaux publics <span style="color:{YEL}">et VRD</span></div><div class=c style="left:104px;top:230px;color:{YEL}">Terrassement · Fondation · Grave · Enrobé</div>',"« Terrassement, chaussée, réseaux divers. »")
b=f'<rect width="1920" height="1080" fill="{SKY}" opacity=".18"/>'
for i in range(5):
    for j in range(3):
        b+=box(i*2.3,j*2.3,0,1.8,1.8,0.6+((i*j)%3)*0.4,"#fff","#c9d6e8","#aebdd3",cx=900,cy=520,s=42)
b+=box(-3,2,0,2,2,5,"#fff",ROY,"#16306f",cx=900,cy=520,s=42)
p=[iso(-2,3,5,900,520,42),iso(4.5,0.5,0.3,900,520,42),iso(8,6,0.3,900,520,42)]
d="M%.0f %.0fL%.0f %.0fL%.0f %.0f"%(p[0]+p[1]+p[2])
b+=f'<path d="{d}" stroke="{ROY}" stroke-width="22" fill="none" stroke-linejoin="round"/><path d="{d}" stroke="{SKY}" stroke-width="8" fill="none" stroke-dasharray="2 24" stroke-linecap="round"/>'
add(4,"3D RÉSEAU D'EAU · QUARTIER",SAND,b,f'<div class=h style="left:100px;top:90px;font-size:120px;color:{NIGHT}">Hydraulique</div><div class=c style="left:104px;top:230px;color:{ROY}">Château d\'eau · Conduites · Stations de pompage</div>',"« L'eau acheminée jusqu'au quartier. »",False)
b=f'<rect width="1920" height="1080" fill="{ROY}"/><rect x="0" y="470" width="1920" height="140" fill="#0B1B3F"/><rect x="760" y="300" width="400" height="480" rx="30" fill="{YEL}"/><circle cx="960" cy="540" r="130" fill="{NIGHT}"/><circle cx="960" cy="540" r="70" fill="{SKY}"/><rect x="930" y="130" width="60" height="180" fill="#fff"/><rect x="800" y="110" width="320" height="40" rx="8" fill="#fff"/>'
b+="".join(f'<circle cx="{150+i*210}" cy="540" r="{12+(i%3)*6}" fill="{SKY}"/>' for i in range(9))
add(5,"2D PLAN SERRÉ · VANNE (CHANGEMENT DE COULEUR)",ROY,b,f'<div class=h style="left:100px;top:100px;font-size:100px">Maîtrise du débit</div><div class=c style="left:104px;top:220px;color:{YEL}">Vannes · Dalots · Irrigation</div>',"« Chaque ouvrage, maîtrisé. »")
b=f'<rect y="0" width="1920" height="300" fill="#cfe3f5"/><rect y="300" width="1920" height="780" fill="#7a5a3a"/><rect y="300" width="1920" height="40" fill="#a98757"/>'
b+=f'<rect x="760" y="260" width="400" height="640" fill="#c9c9cf" stroke="{NIGHT}" stroke-width="8"/><rect x="800" y="300" width="320" height="560" fill="#2a2f3d"/><rect x="800" y="640" width="320" height="220" fill="#8b6b43"/><rect x="0" y="780" width="760" height="70" fill="#c9c9cf"/><rect x="0" y="796" width="760" height="40" fill="#8b6b43"/><rect x="1160" y="780" width="760" height="70" fill="#c9c9cf"/><rect x="1160" y="796" width="760" height="40" fill="#7fc4e8"/><path d="M800 300v-80h320v80" fill="none" stroke="{YEL}" stroke-width="12"/>'
add(6,"COUPE 2D · REGARD DE VISITE",NIGHT,b,f'<div class=h style="left:100px;top:360px;font-size:100px;color:#fff;width:650px">Assainis-<br>sement</div><div class=c style="left:104px;top:600px;width:640px;line-height:1.5;color:#fff">Regards de visite · Boîtes de branchement · Réseaux d\'eaux usées</div>',"« Réseaux, regards, stations de traitement. »")
b=f'<rect y="760" width="1920" height="320" fill="#a98757"/><path d="M0 760H1920" stroke="{NIGHT}" stroke-width="6"/>'
b+=box(0,0,0,3,4,3,"#9aa3b2","#6b7385","#4f5668",cx=420,cy=760,s=50)+box(9,0,0,3,4,3,"#9aa3b2","#6b7385","#4f5668",cx=420,cy=760,s=50)+box(-0.5,0,3,13,4,0.9,"#cfd6e2","#8a93a6","#6b7385",cx=420,cy=760,s=50)
add(7,"3D OUVRAGE D'ART",SAND,b,f'<div class=h style="left:100px;top:90px;font-size:120px;color:{NIGHT}">Génie civil</div><div class=c style="left:104px;top:230px;color:{ROY}">Ouvrages d\'art · Béton armé · Travaux souterrains</div>',"« Des ouvrages conçus pour durer. »",False)
for n,h in S: open(f"v{n:02d}.html","w").write(h)

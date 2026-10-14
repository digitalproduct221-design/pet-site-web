# Génère film-h.html (1920x1080) et film-v.html (1080x1920) + timeline.json
# Chaque frame est une fonction pure du temps : window.seek(t).
import json

TEMPO = 1.0            # voix native : vitesse naturelle
LEAD, TAIL = 0.4, 0.3
lines = json.load(open("vo/lines.json"))
DISPLAY = {}  # sous-titres = texte exact de la voix off

scenes, t = [], 0.0
for l in lines:
    vo = l["dur"] / TEMPO
    lead = 1.2 if l["i"] == 1 else LEAD
    tail = 2.4 if l["i"] == 13 else TAIL
    scenes.append({"i": l["i"], "start": round(t, 3), "vo": round(t + lead, 3), "vodur": round(vo, 3),
                   "dur": round(lead + vo + tail, 3), "text": DISPLAY.get(l["i"], l["text"])})
    t += lead + vo + tail
TOTAL = round(t, 3)
json.dump({"tempo": TEMPO, "total": TOTAL, "scenes": scenes}, open("timeline.json", "w"), ensure_ascii=False, indent=1)

N, R, Y, K, S = "#0B1B3F", "#21409A", "#F7C61C", "#5B9BD5", "#F3EBDD"
BG = {1: "#FFFFFF", 2: N, 3: S, 4: N, 5: R, 6: S, 7: N, 8: R, 9: S, 10: N, 11: R, 12: S, 13: "#FFFFFF"}

ICON = {
    "bat": '<path d="M8 56V20l20-12 20 12v36M20 56V36h16v20M4 56h56"/>',
    "vrd": '<path d="M18 58L28 6M46 58L36 6M32 12v6M32 26v8M32 42v10"/>',
    "hyd": '<path d="M32 6C22 22 14 30 14 40a18 18 0 0036 0c0-10-8-18-18-34z"/>',
    "ass": '<path d="M6 20h52M6 44h52M14 20v24M50 20v24M24 32h16"/><circle cx="32" cy="32" r="4"/>',
    "gc": '<path d="M4 50h56M10 50V30M54 50V30M4 30h56M18 30a14 14 0 0128 0"/>',
    "elec": '<path d="M36 4L14 36h16l-4 24 24-34H34z"/>',
}
SERV = ["Bâtiment", "Travaux publics et VRD", "Hydraulique", "Assainissement", "Génie civil"]


def a(kind, d, inner, style="", cls="", dur=0.8):
    """Élément animé : kind = up | mask | left | right | fade | scale | bar | wipeR | wipeL | count"""
    return f'<div class="a {cls}" data-k="{kind}" data-d="{d}" data-u="{dur}" style="{style}">{inner}</div>'


def icon(k, col, size=72):
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 64 64" fill="none" stroke="{col}" stroke-width="3.5" '
            f'stroke-linejoin="round" stroke-linecap="round">{ICON[k]}</svg>')


def title(text, size, color, d, extra=""):
    # Titre en révélation masquée (le texte monte dans un cache)
    return (f'<div class="mk" style="{extra}"><div class="a t" data-k="mask" data-d="{d}" data-u="0.9" '
            f'style="font-size:{size}px;color:{color}">{text}</div></div>')


def photo(x, y, w, h, img, d, side="R", pos="center"):
    return (f'<div class="a ph" data-k="wipe{side}" data-d="{d}" data-u="1.0" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px">'
            f'<div class="kb" style="background-image:url(assets/{img}.jpg);background-position:{pos}"></div></div>'
            + a("fade", d + 0.5, "", f"left:{x-22}px;top:{y-22}px", "cTL abs")
            + a("fade", d + 0.6, "", f"left:{x+w-48}px;top:{y+h-48}px", "cBR abs"))


def prog(active, dark, V):
    c = "#fff" if dark else N
    if V:
        segs = "".join(f'<div style="flex:1;height:6px;background:{Y if i == active else c};opacity:{1 if i == active else .3}"></div>' for i in range(5))
        return a("fade", 0.1, f'<div style="display:flex;gap:10px;width:900px">{segs}</div>', "left:90px;top:120px", "abs")
    o = ""
    for i, s in enumerate(SERV):
        on = i == active
        bar = (f'<div class="a" data-k="grow" data-d="0.4" data-u="0.7" data-w="46" style="width:18px;height:6px;background:{Y}"></div>'
               if on else f'<div style="width:18px;height:6px;background:{c}"></div>')
        o += (f'<div style="display:flex;align-items:center;gap:10px;opacity:{1 if on else .45}">{bar}'
              f'<span style="font-size:17px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:{c}">{s}</span></div>')
    return a("fade", 0.1, f'<div style="display:flex;gap:34px">{o}</div>', "left:110px;top:60px", "abs")


def split(i, idx, ic, ttl, items, img, V, right=False, pos="center"):
    bg = BG[i]; dark = bg != S; fg = "#fff" if dark else N; acc = Y if dark else R
    num = f"0{idx + 1}" if idx is not None else "06"
    lis = "".join(a("left", 0.95 + k * 0.12, f'<i></i>{x}', "", "li") for k, x in enumerate(items))
    if V:
        h = photo(90, 220, 900, 760, img, 0.15, "L" if right else "R", pos)
        txt = (a("scale", 0.5, icon(ic, acc, 84), "") + a("up", 0.6, f'{num} · Savoir-faire', f"color:{acc};margin-top:30px", "k")
               + title(ttl, 120 if len(ttl) < 14 else 96, fg, 0.65, "margin-top:14px") + f'<div style="margin-top:14px">{lis}</div>')
        body = h + f'<div class="abs" style="left:90px;top:1060px;width:900px;color:{fg}">{txt}</div>'
    else:
        px, tx = (860, 110) if right else (110, 1230)
        h = photo(px, 190, 950, 720, img, 0.15, "L" if right else "R", pos)
        txt = (a("scale", 0.5, icon(ic, acc), "") + a("up", 0.6, f'{num} · Savoir-faire', f"color:{acc};margin-top:34px", "k")
               + title(ttl, 104 if len(ttl) < 14 else 84, fg, 0.65, "margin-top:16px") + f'<div style="margin-top:20px">{lis}</div>')
        body = h + f'<div class="abs" style="left:{tx}px;top:250px;width:600px;color:{fg}">{txt}</div>'
    if idx is not None:
        body += prog(idx, dark, V)
    return body


def grid(W, H):
    g = "".join(f'<div class="a abs" data-k="growV" data-d="{(x % 7) * 0.05}" data-u="1.2" style="left:{x}px;top:0;width:1px;height:{H}px;background:{R};opacity:.09"></div>' for x in range(0, W, 80))
    g += "".join(f'<div class="a abs" data-k="growH" data-d="{(y % 5) * 0.06}" data-u="1.2" style="top:{y}px;left:0;height:1px;width:{W}px;background:{R};opacity:.09"></div>' for y in range(0, H, 80))
    return g


def build(V):
    W, H = (1080, 1920) if V else (1920, 1080)
    sc = {}
    # 1 Logo
    lw = 860 if V else 800
    sc[1] = grid(W, H) + a("logo", 0.35, f'<img src="assets/logo-pet.png" style="width:{lw}px;display:block">',
                           f"left:{(W - lw) // 2}px;top:{(H - lw * 0.5) // 2 - 40}px", "abs", 1.4)
    # 2 Accroche sur photo
    if V:
        sc[2] = (f'<div class="abs kbw" style="inset:0"><div class="kb" style="background-image:url(assets/gros-oeuvre-dakar.jpg);background-position:40% center"></div></div>'
                 f'<div class="abs" style="inset:0;background:linear-gradient(0deg,{N}f5 0%,{N}c0 45%,{N}30 100%)"></div>'
                 f'<div class="abs" style="left:90px;top:980px;color:#fff">' + a("up", 0.3, "Entreprise de BTP · Sénégal", f"color:{Y}", "k")
                 + title("Construire", 170, "#fff", 0.45, "margin-top:20px") + title("durablement", 170, "#fff", 0.6)
                 + a("up", 1.0, f'au Sénégal, depuis <b style="color:{Y}">2016</b>.', "font-size:48px;font-weight:600;margin-top:30px") + "</div>"
                 + a("fade", 0.3, "", "left:60px;top:940px", "cTL abs"))
    else:
        sc[2] = (f'<div class="abs kbw" style="inset:0"><div class="kb" style="background-image:url(assets/gros-oeuvre-dakar.jpg)"></div></div>'
                 f'<div class="abs" style="inset:0;background:linear-gradient(90deg,{N}f2 0%,{N}b0 45%,{N}10 100%)"></div>'
                 f'<div class="abs" style="left:110px;top:330px;color:#fff">' + a("up", 0.3, "Entreprise de BTP · Sénégal", f"color:{Y}", "k")
                 + title("Construire", 150, "#fff", 0.45, "margin-top:20px") + title("durablement", 150, "#fff", 0.6)
                 + a("up", 1.0, f'au Sénégal, depuis <b style="color:{Y}">2016</b>.', "font-size:40px;font-weight:600;margin-top:26px") + "</div>"
                 + a("fade", 0.3, "", "left:80px;top:290px", "cTL abs"))
    # 3 Cinq expertises
    cards = [("Bâtiment", "immeuble-grue"), ("Travaux publics et VRD", "vrd-asphalte-boulevard"), ("Hydraulique", "hydraulique-canalisations-pose"),
             ("Assainissement", "dalot-regard"), ("Génie civil", "genie-civil-reservoir-beton")]
    if V:
        head = (f'<div class="abs" style="left:90px;top:170px;width:900px">' + a("up", 0.2, "Nos savoir-faire", f"color:{R}", "k")
                + title("Cinq expertises,", 110, N, 0.3, "margin-top:14px") + title("un seul partenaire", 110, R, 0.42) + "</div>")
        cc = "".join(a("left", 0.6 + k * 0.14,
                       f'<div style="display:flex;background:#fff;box-shadow:0 16px 30px rgba(11,27,63,.12);height:210px">'
                       f'<div style="width:300px;background:url(assets/{im}.jpg) center/cover"></div><div style="width:8px;background:{Y if k % 2 == 0 else K}"></div>'
                       f'<div style="padding:34px 30px"><div class="k" style="color:{R};font-size:20px">0{k + 1}</div><div class="t" style="font-size:{60 if len(tt) < 14 else 50}px;color:{N};margin-top:10px">{tt}</div></div></div>',
                       f"left:90px;top:{470 + k * 235}px;width:900px", "abs") for k, (tt, im) in enumerate(cards))
    else:
        head = (f'<div class="abs" style="left:110px;top:130px">' + a("up", 0.2, "Nos savoir-faire", f"color:{R}", "k")
                + title(f'Cinq expertises, <span style="color:{R}">un seul partenaire</span>', 110, N, 0.3, "margin-top:14px") + "</div>")
        cc = "".join(a("up", 0.6 + k * 0.14,
                       f'<div class=ph2 style="height:300px;background-image:url(assets/{im}.jpg)"></div><div style="height:6px;background:{Y if k % 2 == 0 else K}"></div>'
                       f'<div class="k" style="color:{R};font-size:18px;margin:24px 24px 0">0{k + 1}</div><div class="t" style="font-size:{42 if len(tt) < 14 else 34}px;color:{N};margin:10px 24px 0">{tt}</div>',
                       f"left:{110 + k * 346}px;top:400px;width:320px;height:440px;background:#fff;box-shadow:0 20px 40px rgba(11,27,63,.12)", "abs") for k, (tt, im) in enumerate(cards))
    sc[3] = head + cc
    sc[4] = split(4, 0, "bat", "Bâtiment", ["Logements", "Écoles et universités", "Ateliers et usines", "Murs de clôture"], "immeuble-grue", V)
    sc[5] = split(5, 1, "vrd", "Travaux publics et VRD", ["Routes et pistes", "Ponts et ouvrages d'art", "Voiries et réseaux divers", "Terrassement"], "vrd-asphalte-boulevard", V, True)
    sc[6] = split(6, 2, "hyd", "Hydraulique", ["Pose de conduites, dont fonte", "Stations de pompage", "Bâches à eau et dalots", "Irrigation"], "hydraulique-canalisations-pose", V)
    sc[7] = split(7, 3, "ass", "Assainissement", ["Stations de traitement", "Réseaux d'eaux usées", "Regards de visite", "Réhabilitation de dalots"], "dalot-regard", V, True)
    sc[8] = split(8, 4, "gc", "Génie civil", ["Ouvrages en béton armé", "Travaux souterrains", "Ouvrages d'art"], "genie-civil-reservoir-beton", V)
    sc[9] = split(9, None, "elec", "Électricité et peinture", ["Installations basse tension", "Éclairage et mise aux normes", "Peintures et ravalement"], "villa-contemporaine", V, True)
    # 10 Méthode
    steps = [("Conception", "etude-plans-equipe-pet"), ("Coordination", "pilotage-chantier"), ("Réalisation", "controle-qualite-beton")]
    if V:
        hd = f'<div class="abs" style="left:90px;top:170px;width:900px">' + a("up", 0.2, "Notre méthode", f"color:{Y}", "k") + title("De la conception", 100, "#fff", 0.3, "margin-top:12px") + title("à la réalisation", 100, Y, 0.42) + "</div>"
        st = "".join(a("left", 0.6 + k * 0.35,
                       f'<div style="display:flex;height:330px"><div style="width:520px;background:url(assets/{im}.jpg) center/cover"></div>'
                       f'<div style="padding:40px 36px;color:#fff"><div class="t" style="font-size:110px;color:{Y}">0{k + 1}</div><div class="t" style="font-size:58px;margin-top:10px">{tt}</div></div></div>',
                       f"left:90px;top:{560 + k * 370}px;width:900px", "abs") for k, (tt, im) in enumerate(steps))
    else:
        hd = f'<div class="abs" style="left:110px;top:110px">' + a("up", 0.2, "Notre méthode", f"color:{Y}", "k") + title("De la conception à la réalisation", 96, "#fff", 0.3, "margin-top:12px") + "</div>"
        st = "".join(a("up", 0.6 + k * 0.35,
                       f'<div style="display:flex;align-items:baseline;gap:22px;height:80px"><span class="t" style="font-size:90px;color:{Y}">0{k + 1}</span><span class="t" style="font-size:56px;color:#fff">{tt}</span></div>'
                       f'<div class=ph2 style="height:460px;background-image:url(assets/{im}.jpg)"></div>',
                       f"left:{110 + k * 580}px;top:280px;width:540px", "abs") for k, (tt, im) in enumerate(steps))
        st += a("bar", 0.5, "", f"left:110px;top:870px;width:1700px;height:4px;background:{Y}", "abs", 1.6)
    sc[10] = hd + st
    # 11 Chiffres
    stats = [("2016", "Année de création", None), ("40+", "Ans d'expérience cumulée", 40), ("3", "Types de clients : publics, industriels, privés", 3)]
    out = ""
    for k, (v, l, cnt) in enumerate(stats):
        col = Y if k != 1 else "#fff"; line = Y if k != 1 else K
        num = (f'<span class="a" data-k="count" data-d="{0.7 + k * 0.3}" data-u="1.3" data-n="{cnt}" data-s="{"+" if "+" in v else ""}">{v}</span>' if cnt else v)
        if V:
            out += a("up", 0.5 + k * 0.3, f'<div class="t" style="font-size:190px;color:{col}">{num}</div><div style="font-size:40px;font-weight:600;margin-top:6px;line-height:1.3">{l}</div>',
                     f"left:90px;top:{470 + k * 390}px;width:900px;color:#fff;border-top:6px solid {line};padding-top:26px", "abs")
        else:
            out += a("up", 0.5 + k * 0.3, f'<div class="t" style="font-size:200px;color:{col}">{num}</div><div style="font-size:32px;font-weight:600;margin-top:10px;line-height:1.3">{l}</div>',
                     f"left:{110 + k * 580}px;top:420px;width:520px;color:#fff;border-top:6px solid {line};padding-top:30px", "abs")
    hx = "90px;top:170px" if V else "110px;top:130px"
    sc[11] = f'<div class="abs" style="left:{hx}">' + a("up", 0.2, "PET en bref", f"color:{Y}", "k") + title("Une expérience solide", 100 if V else 96, "#fff", 0.3, "margin-top:12px") + "</div>" + out
    # 12 Valeurs
    vals = ["Qualité", "Sécurité", "Respect des lieux", "Choix des matériaux", "Tenue des délais", "Satisfaction du client"]
    vv = "".join(a("left", 0.8 + k * 0.16, f'<i style="width:16px;height:16px;background:{Y if k % 2 == 0 else R}"></i>{v}', f"color:{N};font-size:{46 if V else 38}px;margin-top:{24 if V else 26}px", "li") for k, v in enumerate(vals))
    if V:
        sc[12] = photo(90, 200, 900, 640, "briefing-securite-equipe", 0.15, "R") + f'<div class="abs" style="left:90px;top:940px">' + a("up", 0.5, "Nos engagements", f"color:{R}", "k") + title("Nos valeurs", 110, N, 0.6, "margin-top:14px") + vv + "</div>"
    else:
        sc[12] = photo(110, 190, 900, 720, "briefing-securite-equipe", 0.15, "R") + f'<div class="abs" style="left:1140px;top:220px">' + a("up", 0.5, "Nos engagements", f"color:{R}", "k") + title("Nos valeurs", 96, N, 0.6, "margin-top:14px") + vv + "</div>"
    # 13 Fin
    lw = 620 if V else 500
    top = 420 if V else 130
    sc[13] = (grid(W, H) + a("logo", 0.2, f'<img src="assets/logo-pet.png" style="width:{lw}px;display:block">', f"left:{(W - lw) // 2}px;top:{top}px", "abs", 1.2)
              + f'<div class="abs" style="left:0;right:0;top:{top + lw * 0.5 + 110}px;text-align:center">' + title("Votre allié de confiance", 92 if V else 84, N, 0.7)
              + a("up", 1.1, f'33 827 61 85 · 77 597 01 98 · 78 305 04 44<br><span style="color:{R}">partenaire.direction@outlook.com</span>', f"color:{N};font-size:{34 if V else 32}px;font-weight:600;margin-top:30px;line-height:1.5")
              + a("scale", 1.5, "Demander un devis", f"display:inline-block;margin-top:44px;background:{Y};color:{N};font-size:40px;padding:18px 44px", "t") + "</div>")

    # Sous-titres
    subs = "".join(f'<div class="subl" data-a="{s["vo"]}" data-b="{s["vo"] + s["vodur"] + 0.15}"><span>{s["text"]}</span></div>' for s in scenes)
    body = "".join(f'<section class="sc" id="s{i}" data-i="{i}" style="background:{BG[i]}">{sc[i]}</section>' for i in range(1, 14))
    tl = json.dumps([{"i": s["i"], "start": s["start"], "dur": s["dur"], "bg": BG[s["i"]]} for s in scenes])
    subpos = "bottom:110px;font-size:40px" if V else "bottom:40px;font-size:30px"
    return f"""<!doctype html><html lang=fr><meta charset=utf-8><link rel=stylesheet href="assets/fonts.css"><style>
*{{margin:0;box-sizing:border-box}}html,body{{width:{W}px;height:{H}px;overflow:hidden;background:{N}}}
body{{position:relative;font-family:Manrope,sans-serif;-webkit-font-smoothing:antialiased}}
.sc{{position:absolute;inset:0;overflow:hidden;visibility:hidden}}.abs{{position:absolute}}
.a{{will-change:transform,opacity}}.mk{{overflow:hidden;padding-bottom:.06em}}
.t{{font-family:'Barlow Condensed';font-weight:800;text-transform:uppercase;line-height:.95}}
.k{{font-weight:700;font-size:{24 if V else 22}px;letter-spacing:.22em;text-transform:uppercase}}
.li{{font-size:{38 if V else 30}px;font-weight:600;line-height:1.35;display:flex;gap:18px;align-items:center;margin-top:{18 if V else 22}px}}
.li i{{width:12px;height:12px;background:{Y};flex:none;display:block}}
.ph{{position:absolute;overflow:hidden}}.kb{{position:absolute;inset:-2%;background-size:cover;background-position:center}}
.kbw{{overflow:hidden}}.ph2{{background-size:cover;background-position:center}}
.cTL{{width:70px;height:70px;border-left:8px solid {Y};border-top:8px solid {Y}}}
.cBR{{width:70px;height:70px;border-right:8px solid {K};border-bottom:8px solid {K}}}
.subl{{position:absolute;left:60px;right:60px;{subpos};text-align:center;visibility:hidden;z-index:20}}
.subl span{{background:rgba(11,27,63,.85);color:#fff;font-weight:600;padding:8px 20px;line-height:1.6;box-decoration-break:clone;-webkit-box-decoration-break:clone}}
.wp{{position:absolute;z-index:30;visibility:hidden}}
</style><body>{body}{subs}<div class=wp id=w1 style="background:{Y}"></div><div class=wp id=w2></div>
<script>
const V={str(V).lower()},W={W},H={H},TL={tl},WIPE=0.8;
const cl=(x)=>Math.max(0,Math.min(1,x));
const eo=(x)=>1-Math.pow(1-x,4), eio=(x)=>x<.5?8*x*x*x*x:1-Math.pow(-2*x+2,4)/2;
const secs=[...document.querySelectorAll('.sc')], subs=[...document.querySelectorAll('.subl')];
const els=secs.map(s=>[...s.querySelectorAll('.a')].map(e=>({{e,k:e.dataset.k,d:+e.dataset.d,u:+e.dataset.u,n:+e.dataset.n,s:e.dataset.s||'',w:+e.dataset.w}})));
const kbs=secs.map(s=>[...s.querySelectorAll('.kb')]);
function anim(o,lt){{
  const p=eo(cl((lt-o.d)/o.u)), e=o.e;
  switch(o.k){{
    case 'up': e.style.opacity=p; e.style.transform=`translateY(${{(1-p)*60}}px)`; break;
    case 'mask': e.style.transform=`translateY(${{(1-p)*110}}%)`; break;
    case 'left': e.style.opacity=p; e.style.transform=`translateX(${{(1-p)*-70}}px)`; break;
    case 'right': e.style.opacity=p; e.style.transform=`translateX(${{(1-p)*70}}px)`; break;
    case 'fade': e.style.opacity=p; break;
    case 'scale': e.style.opacity=p; e.style.transform=`scale(${{.85+.15*p}})`; break;
    case 'logo': e.style.opacity=cl(p*1.6); e.style.transform=`scale(${{1.08-.08*p}})`; e.style.clipPath=`inset(${{(1-p)*100}}% 0 0 0)`; break;
    case 'wipeR': e.style.clipPath=`inset(0 ${{(1-p)*100}}% 0 0)`; break;
    case 'wipeL': e.style.clipPath=`inset(0 0 0 ${{(1-p)*100}}%)`; break;
    case 'bar': e.style.transformOrigin='left'; e.style.transform=`scaleX(${{p}})`; break;
    case 'grow': e.style.width=(18+(o.w-18)*p)+'px'; break;
    case 'growV': e.style.transformOrigin='top'; e.style.transform=`scaleY(${{p}})`; break;
    case 'growH': e.style.transformOrigin='left'; e.style.transform=`scaleX(${{p}})`; break;
    case 'count': e.textContent=Math.round(o.n*p)+o.s; break;
  }}
}}
window.seek=(t)=>{{
  let cur=0; for(let i=0;i<TL.length;i++) if(t>=TL[i].start) cur=i;
  secs.forEach((s,i)=>{{s.style.visibility=i===cur?'visible':'hidden';}});
  const lt=t-TL[cur].start;
  {{ const q=cl(lt/TL[cur].dur); secs[cur].style.transform=`scale(${{1+0.04*q}})`; }} // poussée de caméra : aucun plan figé
  els[cur].forEach(o=>anim(o,lt));
  kbs[cur].forEach(k=>{{const q=cl(lt/TL[cur].dur); k.style.transform=`scale(${{1.10-.08*q}}) translateX(${{(q-.5)*-14}}px)`;}});
  subs.forEach(s=>{{s.style.visibility=(t>=+s.dataset.a&&t<+s.dataset.b)?'visible':'hidden';}});
  // volet de transition centré sur chaque changement de scène
  const w1=document.getElementById('w1'), w2=document.getElementById('w2'); w1.style.visibility=w2.style.visibility='hidden';
  for(let i=1;i<TL.length;i++){{
    const c=TL[i].start, q=(t-(c-WIPE/2))/WIPE;
    if(q>0&&q<1){{
      const p=eio(q);
      w2.style.background=TL[i].bg;
      // panneau couleur de la scène suivante précédé d'un liseré jaune ; couvre tout l'écran à p=0.5
      const set=(el,o)=>{{for(const k in o) el.style[k]=o[k];}};
      if(V){{ // de bas en haut
        const y=H+320-p*(2*H+640);
        set(w2,{{visibility:'visible',left:'0px',width:W+'px',top:y+'px',height:(H+200)+'px'}});
        set(w1,{{visibility:'visible',left:'0px',width:W+'px',top:(y-120)+'px',height:'120px'}});
      }} else {{ // de gauche à droite
        const x=-W-320+p*(2*W+640);
        set(w2,{{visibility:'visible',top:'0px',height:H+'px',left:x+'px',width:(W+200)+'px'}});
        set(w1,{{visibility:'visible',top:'0px',height:H+'px',left:(x+W+200)+'px',width:'120px'}});
      }}
    }}
  }}
}};
window.TOTAL={TOTAL};
document.fonts.ready.then(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>0)))).then(()=>{{seek(0);window.ready=true;}});
</script></html>"""


open("film-h.html", "w").write(build(False))
open("film-v.html", "w").write(build(True))
print("total", TOTAL, "s")

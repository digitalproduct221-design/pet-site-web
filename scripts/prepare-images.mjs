// Prépare les images du site à partir des sources de assets/.
// Relancer avec `npm run images` quand les originaux haute définition arrivent :
// il suffit de remplacer les fichiers de assets/photos et assets/logo.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const PHOTOS_OUT = "public/images/chantiers";
const BRAND_OUT = "public/brand";

// Recadrages : retire les liserés laissés par la découpe de la bâche.
// `source` : fichier dans assets/photos ; `crop` : zone utile en pixels.
const photos = [
  // La photo d'engins (pelle et chargeuse CAT) n'existe que dans la planche complète :
  // le fichier 01 fourni contient par erreur une mosaïque d'autres photos.
  { out: "terrassement-engins", source: "_planche-complete.png", crop: { left: 0, top: 0, width: 2500, height: 1284 } },
  { out: "conduite-ouvrage-hydraulique", source: "03-conduite-ouvrage-hydraulique.png", crop: { left: 0, top: 0, width: 1252, height: 564 } },
  { out: "dalot-regard", source: "04-dalot-regard-chantier.png", crop: { left: 0, top: 0, width: 1244, height: 584 } },
  { out: "ferraillage-ouvrage", source: "05-ferraillage-ouvrage-hydraulique.png", crop: { left: 0, top: 0, width: 1252, height: 584 } },
  { out: "irrigation", source: "06-irrigation-agricole.png", crop: { left: 0, top: 0, width: 1244, height: 972 } },
  { out: "cloture-grillage", source: "07-cloture-grillage.png", crop: { left: 8, top: 0, width: 1244, height: 940 } },
  { out: "pose-conduite-topographie", source: "08-pose-conduite-topographie.png", crop: { left: 0, top: 0, width: 1244, height: 798 } },
  { out: "immeuble-grue", source: "09-immeuble-grue-coffrage.png", crop: { left: 6, top: 0, width: 1246, height: 812 } },
  { out: "niveleuse-voirie", source: "10-grader-voirie.png", crop: { left: 8, top: 0, width: 1236, height: 900 } },
  { out: "tranchee-lotissement", source: "11-pose-conduite-lotissement.png", crop: { left: 8, top: 0, width: 1244, height: 908 } },
  // 02-piste-laterite est exclue : elle porte un filigrane « Adobe Stock » (droits non acquis).
];

/**
 * Blanc → transparence (« color to alpha »), sans halo sur les couleurs du logo.
 * Le PNG source est déjà transparent, sauf des carrés blancs derrière les équerres :
 * on combine la transparence d'origine avec celle déduite du blanc.
 */
async function whiteToAlpha(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2], sourceAlpha = data[i + 3] / 255;
    if (sourceAlpha === 0) continue;
    // Seuls les pixels quasi blancs (carrés de fond et bords anticrénelés) deviennent
    // transparents ; le jaune et le bleu ciel gardent leur pleine opacité.
    const min = Math.min(r, g, b);
    if (min < 200) continue;
    const a = Math.max(0, (250 - min) / 50);
    if (a === 0) { data[i + 3] = 0; continue; }
    data[i + 3] = Math.round(a * sourceAlpha * 255);
  }
  return { data, info };
}

/** Version inversée pour fonds sombres : le bleu marine du logo devient blanc cassé. */
function navyToLight({ data, info }) {
  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += 4) {
    const r = out[i], g = out[i + 1], b = out[i + 2];
    const isNavy = b > r + 40 && b > g + 20 && r < 110;
    const isSky = b > 150 && g > 120; // équerre bleu ciel et sous-titres : conservés
    if (isNavy && !isSky) {
      out[i] = 247; out[i + 1] = 244; out[i + 2] = 238;
    }
  }
  return { data: out, info };
}

const raw = ({ data, info }) => sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });

async function main() {
  await mkdir(PHOTOS_OUT, { recursive: true });
  await mkdir(BRAND_OUT, { recursive: true });

  for (const p of photos) {
    await sharp(`assets/photos/${p.source}`)
      .extract(p.crop)
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(`${PHOTOS_OUT}/${p.out}.jpg`);
  }

  const logo = await whiteToAlpha("assets/logo/logo-PET.png");
  const full = { left: 50, top: 100, width: 1510, height: 910 };
  const emblem = { left: 318, top: 100, width: 926, height: 672 };

  await raw(logo).extract(full).png().toFile(`${BRAND_OUT}/logo-pet.png`);
  await raw(logo).extract(emblem).png().toFile(`${BRAND_OUT}/embleme-pet.png`);
  const inverse = navyToLight(logo);
  await raw(inverse).extract(full).png().toFile(`${BRAND_OUT}/logo-pet-inverse.png`);
  await raw(inverse).extract(emblem).png().toFile(`${BRAND_OUT}/embleme-pet-inverse.png`);

  // Icônes et image de partage.
  await raw(logo).extract(emblem).resize(512, 512, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } }).flatten({ background: "#ffffff" }).png().toFile("app/icon.png");
  await raw(logo).extract(emblem).resize(180, 180, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } }).flatten({ background: "#ffffff" }).png().toFile("app/apple-icon.png");

  // Image de partage (Open Graph) : photo des engins voilée de bleu nuit et logo inversé.
  const largeur = 1200, hauteur = 630;
  const fond = await sharp(`${PHOTOS_OUT}/terrassement-engins.jpg`).resize(largeur, hauteur, { fit: "cover", position: "centre" }).toBuffer();
  const voile = Buffer.from(
    `<svg width="${largeur}" height="${hauteur}"><defs><linearGradient id="v" x1="0" x2="1"><stop offset="0" stop-color="#07122b" stop-opacity="0.96"/><stop offset="0.55" stop-color="#0b1b3f" stop-opacity="0.82"/><stop offset="1" stop-color="#0b1b3f" stop-opacity="0.35"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#v)"/></svg>`,
  );
  const logoOg = await sharp(`${BRAND_OUT}/logo-pet-inverse.png`).resize({ width: 560 }).toBuffer();
  await sharp(fond)
    .composite([{ input: voile }, { input: logoOg, left: 70, top: 150 }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile("public/og-image.jpg");

  console.log(`${photos.length} photos, 4 variantes du logo et l'image de partage générées.`);
}

main();

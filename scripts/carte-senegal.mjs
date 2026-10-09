// Génère components/ui/carte-senegal-donnees.ts : contour, régions, villes et loupe sur Dakar.
// Usage : node scripts/carte-senegal.mjs <dossier des GeoJSON geoBoundaries SEN> components/ui/carte-senegal-donnees.ts
// Dépendances (non installées dans le projet) : d3-geo, topojson-server, topojson-simplify, topojson-client.
// Source : geoBoundaries (CC BY 3.0 IGO), géométries simplifiées puis projetées.
import { readFileSync, writeFileSync } from "node:fs";
import { geoMercator, geoPath } from "d3-geo";
import { topology } from "topojson-server";
import { presimplify, simplify, quantile } from "topojson-simplify";
import { feature, mesh } from "topojson-client";

const G = process.argv[2];
// d3-geo attend des anneaux extérieurs dans le sens horaire (convention inverse du GeoJSON RFC 7946)
const retourner = (fc) => {
  for (const f of fc.features) {
    const g = f.geometry;
    const polys = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
    for (const poly of polys) for (const anneau of poly) anneau.reverse();
  }
  return fc;
};
const lire = (n) => retourner(JSON.parse(readFileSync(`${G}/sen-${n}.geojson`, "utf8")));
const adm1 = lire("ADM1");
const adm2 = lire("ADM2");

// --- Pays : régions avec frontières partagées, simplifiées
let topo = presimplify(topology({ regions: adm1 }, 1e5));
topo = simplify(topo, quantile(topo, 0.12));
const regions = feature(topo, topo.objects.regions);
const contour = mesh(topo, topo.objects.regions, (a, b) => a === b);
const interieur = mesh(topo, topo.objects.regions, (a, b) => a !== b);

const W = 640, H = 470;
const proj = geoMercator().fitExtent([[10, 10], [W - 10, H - 10]], regions);
const chemin = geoPath(proj).digits(1);

const villes = [
  // [nom, lat, lng, position du libellé, ville principale (gardée sur mobile)]
  ["Saint-Louis", 16.0326, -16.4818, "droite", true],
  ["Louga", 15.6144, -16.2286, "droite", false],
  ["Thiès", 14.7886, -16.926, "droite", true],
  ["Kaolack", 14.1652, -16.0726, "droite", true],
  ["Matam", 15.6559, -13.2554, "gauche", false],
  ["Tambacounda", 13.7707, -13.6673, "haut", true],
  ["Ziguinchor", 12.5641, -16.2719, "haut", true],
  ["Kédougou", 12.5605, -12.1747, "haut", false],
].map(([nom, lat, lng, cote, principale]) => {
  const [x, y] = proj([lng, lat]);
  return { nom, x: +x.toFixed(1), y: +y.toFixed(1), cote, principale };
});
const PET = [-17.45723, 14.72863];
const [dx, dy] = proj(PET);

// --- Loupe : départements de la région de Dakar
const dakar = { type: "FeatureCollection", features: adm2.features.filter((f) => ["Dakar", "Pikine", "Guediawaye", "Rufisque"].includes(f.properties.shapeName)) };
let t2 = presimplify(topology({ dep: dakar }, 1e5));
t2 = simplify(t2, quantile(t2, 0.25));
const deps = feature(t2, t2.objects.dep);
const LW = 300, LH = 230;
// Cadrage resserré sur la presqu'île (Dakar, Guédiawaye, Pikine) ; Rufisque déborde, coupé par la loupe.
const cadrage = { type: "FeatureCollection", features: deps.features.filter((f) => f.properties.shapeName !== "Rufisque") };
const p2 = geoMercator().fitExtent([[18, 18], [LW - 18, LH - 18]], cadrage);
const c2 = geoPath(p2).digits(1);
const [lx, ly] = p2(PET);

const donnees = {
  pays: { largeur: W, hauteur: H, contour: chemin(contour), frontieres: chemin(interieur), dakar: { x: +dx.toFixed(1), y: +dy.toFixed(1) } },
  villes,
  loupe: {
    largeur: LW,
    hauteur: LH,
    contour: c2({ type: "FeatureCollection", features: deps.features }),
    limites: c2(mesh(t2, t2.objects.dep, (a, b) => a !== b)),
    pet: { x: +lx.toFixed(1), y: +ly.toFixed(1) },
    lieux: [
      ["Plateau", 14.6680, -17.4320],
    ].map(([nom, lat, lng]) => {
      const [x, y] = p2([lng, lat]);
      return { nom, x: +x.toFixed(1), y: +y.toFixed(1) };
    }),
  },
};
const ts = `/**
 * Données de la carte illustrée du Sénégal (générées, ne pas éditer à la main).
 * Source : geoBoundaries, SEN ADM1 et ADM2 (CC BY 3.0 IGO), simplifiées et projetées
 * en Mercator. Script : voir docs/decisions.md (décision 46).
 */
export const carteSenegal = ${JSON.stringify(donnees, null, 2)} as const;
`;
writeFileSync(process.argv[3], ts);
console.log("octets", ts.length);

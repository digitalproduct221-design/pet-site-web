import { adresse, lienItineraire, SIGLE } from "@/content/site";
import { carteSenegal } from "./carte-senegal-donnees";

const { pays, villes, loupe } = carteSenegal;

// L'océan est élargi à gauche pour y poser la loupe sur Dakar.
const MARGE = 330;
const VUE = `${-MARGE} 0 ${pays.largeur + MARGE} ${pays.hauteur + 30}`;
const LOUPE = { x: -150, y: 285, r: 150 };
const ECHELLE = ((LOUPE.r * 2) / loupe.largeur) * 0.98;

/**
 * Carte illustrée du Sénégal : le pays au trait, les grandes villes en repère,
 * et une loupe sur la presqu'île du Cap-Vert qui pointe le siège de PET
 * (rond-point Liberté 6) ; la loupe ouvre l'itinéraire.
 * Composant serveur : le tracé se dessine à l'entrée dans l'écran (Reveleur,
 * `data-vu`), immobile sous mouvement réduit.
 * Fond de carte : geoBoundaries (CC BY 3.0 IGO).
 */
export function CarteSenegal({ className = "" }: { className?: string }) {
  const p = loupe.pet;
  return (
    <figure className={`carte-senegal ${className}`}>
      <svg viewBox={VUE} role="img" aria-labelledby="titre-carte-senegal" className="h-auto w-full overflow-visible">
        <title id="titre-carte-senegal">{`Carte du Sénégal : ${SIGLE} est basé à Dakar, ${adresse}.`}</title>
        <defs>
          <clipPath id="loupe-cercle">
            <circle cx={LOUPE.x} cy={LOUPE.y} r={LOUPE.r} />
          </clipPath>
        </defs>

        {/* Océan : quelques houles au trait */}
        <g className="cs-houle" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.28">
          <path d="M-225 60q14-8 28 0t28 0 28 0" />
          <path d="M-150 120q14-8 28 0t28 0 28 0" />
          <path d="M-60 40q14-8 28 0t28 0 28 0" />
          <path d="M-215 190q14-8 28 0t28 0" />
        </g>
        <text x="-318" y="96" className="cs-ocean">Océan Atlantique</text>

        {/* Pays */}
        <path d={pays.contour} className="cs-pays" pathLength={1} />
        <path d={pays.frontieres} className="cs-frontieres" />
        <text x="250" y="348" className="cs-voisin">Gambie</text>

        {/* Grandes villes (repères géographiques) */}
        <g className="cs-villes">
          {villes.map((v) => {
            const pos =
              v.cote === "haut"
                ? { x: v.x, y: v.y - 16, ancre: "middle" as const }
                : v.cote === "gauche"
                  ? { x: v.x - 13, y: v.y + 9, ancre: "end" as const }
                  : { x: v.x + 13, y: v.y + 9, ancre: "start" as const };
            return (
              <g key={v.nom} className={`${v.principale ? "" : "cs-secondaire"} cs-v-${v.nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()}`}>
                <circle cx={v.x} cy={v.y} r="6.5" />
                <text x={pos.x} y={pos.y} textAnchor={pos.ancre}>
                  {v.nom}
                </text>
              </g>
            );
          })}
        </g>

        {/* Dakar, et le trait vers la loupe */}
        <path
          d={`M${pays.dakar.x} ${pays.dakar.y} L${LOUPE.x + LOUPE.r * 0.72} ${LOUPE.y - LOUPE.r * 0.7}`}
          className="cs-lien"
          pathLength={1}
        />
        <circle cx={pays.dakar.x} cy={pays.dakar.y} r="16" className="cs-halo" />
        <circle cx={pays.dakar.x} cy={pays.dakar.y} r="11" className="cs-dakar" />
        <text x={pays.dakar.x + 8} y={pays.dakar.y - 26} className="cs-nom-dakar">
          Dakar
        </text>

        {/* Loupe sur la région de Dakar : ouvre l'itinéraire */}
        <a href={lienItineraire} target="_blank" rel="noopener noreferrer" className="cs-loupe">
          <title>{`Itinéraire vers ${SIGLE}, ${adresse} (nouvel onglet)`}</title>
          <circle cx={LOUPE.x} cy={LOUPE.y} r={LOUPE.r} className="cs-loupe-fond" />
          <g clipPath="url(#loupe-cercle)">
            <g transform={`translate(${LOUPE.x - (loupe.largeur * ECHELLE) / 2} ${LOUPE.y - (loupe.hauteur * ECHELLE) / 2}) scale(${ECHELLE})`}>
              <path d={loupe.contour} className="cs-loupe-terre" />
              <path d={loupe.limites} className="cs-loupe-limites" />
              {loupe.lieux.map((l) => (
                  <text key={l.nom} x={l.x} y={l.y} textAnchor="middle" className="cs-loupe-lieu">
                    {l.nom}
                  </text>
                ))}
              <text x={p.x + 22} y={p.y - 22} className="cs-loupe-pet">
                Liberté 6
              </text>
              {/* Repère PET en goutte */}
              <g transform={`translate(${p.x} ${p.y})`} className="cs-repere">
                <path d="M0 0c-7-11-15-19-15-29a15 15 0 0 1 30 0c0 10-8 18-15 29z" />
                <circle cy="-29" r="6" />
              </g>
            </g>
          </g>
          <circle cx={LOUPE.x} cy={LOUPE.y} r={LOUPE.r} className="cs-loupe-bord" />
          <text x={LOUPE.x} y={LOUPE.y + LOUPE.r + 30} textAnchor="middle" className="cs-loupe-legende">
            Siège de {SIGLE}, Dakar
          </text>
          <text x={LOUPE.x} y={LOUPE.y + LOUPE.r + 54} textAnchor="middle" className="cs-loupe-action">
            Itinéraire ↗
          </text>
        </a>
      </svg>
      <figcaption className="sr-only">
        {SIGLE} est basé à Dakar, {adresse}. La loupe ouvre l&apos;itinéraire dans un nouvel onglet.
      </figcaption>
    </figure>
  );
}

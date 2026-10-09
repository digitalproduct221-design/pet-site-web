/**
 * Transition entre deux blocs : un profil de terrain irrégulier en deux strates
 * (la strate arrière, translucide, donne de la profondeur), à la couleur du bloc
 * suivant (`couleur` : classe text-*). Se pose en bas d'une section `relative`.
 * Trois formes, éventuellement retournées, pour ne jamais répéter la même coupe.
 */
const formes = {
  // Terrain naturel : bosses douces et irrégulières
  terrain: {
    avant: "M0 96V58C96 52 168 40 262 44C368 49 420 66 540 63C664 60 716 36 842 34C968 32 1030 54 1146 56C1250 58 1320 44 1440 40V96Z",
    arriere: "M0 96V38C110 28 190 18 300 24C420 31 470 48 600 44C740 40 790 14 930 12C1060 10 1120 34 1240 36C1330 38 1390 28 1440 22V96Z",
  },
  // Talus : une pente longue qui casse en plateau
  talus: {
    avant: "M0 96V70C180 66 300 60 430 50C560 40 640 22 780 20C930 18 1010 30 1130 38C1260 46 1360 44 1440 42V96Z",
    arriere: "M0 96V52C200 46 320 38 460 30C600 22 700 8 840 8C990 8 1080 20 1200 26C1300 31 1380 30 1440 28V96Z",
  },
  // Déblai : un creux franc, comme une tranchée vue en coupe
  deblai: {
    avant: "M0 96V44C140 40 260 46 380 52C470 57 540 70 640 72C760 74 840 60 960 50C1100 39 1240 40 1440 46V96Z",
    arriere: "M0 96V28C150 24 270 30 390 38C500 45 580 56 690 56C800 56 880 44 1000 34C1140 23 1280 22 1440 30V96Z",
  },
} as const;

export type FormeProfil = keyof typeof formes;

export function Profil({
  couleur,
  forme = "terrain",
  miroir = false,
  haut = false,
  arriere,
  className = "",
}: {
  couleur: string;
  forme?: FormeProfil;
  miroir?: boolean;
  haut?: boolean;
  /** Couleur propre de la strate arrière (classe text-*), quand le mélange translucide donnerait une teinte terne. */
  arriere?: string;
  className?: string;
}) {
  const f = formes[forme];
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 z-[1] leading-none ${haut ? "top-0 -scale-y-100" : "-bottom-px"} ${miroir ? "-scale-x-100" : ""} ${couleur} ${className}`}
    >
      <svg viewBox="0 0 1440 96" preserveAspectRatio="none" className="block h-[clamp(2.25rem,5vw,5.5rem)] w-full">
        <path d={f.arriere} fill="currentColor" opacity={arriere ? 1 : 0.42} className={arriere} />
        <path d={f.avant} fill="currentColor" />
      </svg>
    </div>
  );
}

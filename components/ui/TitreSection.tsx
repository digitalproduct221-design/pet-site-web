import type { ReactNode } from "react";
import { Equerres } from "./Equerres";

type Props = {
  titre: ReactNode;
  intro?: ReactNode;
  id?: string;
  /** Niveau de titre (h2 par défaut). */
  niveau?: 1 | 2 | 3;
  ton?: "clair" | "sombre";
  taille?: "m" | "l" | "xl";
  className?: string;
  /** Équerre du logo à l'angle du titre : réservée aux titres phares. */
  equerre?: boolean;
};

const tailles = { m: "text-titre-m", l: "text-titre-l", xl: "text-titre-xl" };

/**
 * Titre de section. Pas d'étiquette au-dessus : le titre porte seul la section.
 * L'équerre du logo n'apparaît que sur demande (`equerre`).
 */
export function TitreSection({ titre, intro, id, niveau = 2, ton = "clair", taille = "l", className = "", equerre = false }: Props) {
  const Balise = `h${niveau}` as const;
  const texte = (
    <Balise id={id} className={`titre ${tailles[taille]} ${ton === "sombre" ? "text-blanc" : "text-nuit"}`}>
      {titre}
    </Balise>
  );
  return (
    <div className={`max-w-[46rem] ${className}`}>
      {equerre ? (
        <Equerres seule decalage={18} className="inline-block pl-1 pt-1">
          {texte}
        </Equerres>
      ) : (
        texte
      )}
      {intro ? (
        <p className={`mt-6 max-w-[38rem] text-lg leading-relaxed ${ton === "sombre" ? "text-brume" : "text-texte-doux"}`}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}

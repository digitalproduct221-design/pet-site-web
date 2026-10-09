import type { ReactElement } from "react";

export type FormeSeparateur = "onde" | "topographie" | "strates" | "arche" | "biseau";

interface Props {
  forme?: FormeSeparateur;
  sens: "vertical" | "horizontal";
  className?: string;
}

const tracés = {
  onde: {
    // Vagues fluides pour l'Hydraulique et l'Assainissement
    vertical: {
      arriere: "M0 0 L20 0 C55 200 12 400 50 600 C80 800 24 950 20 1000 L0 1000 Z",
      avant: "M0 0 L8 0 C32 200 2 400 32 600 C56 800 12 950 8 1000 L0 1000 Z",
    },
    horizontal: {
      arriere: "M0 0 L1000 0 L1000 20 C800 55 600 12 400 50 C200 80 50 24 0 20 Z",
      avant: "M0 0 L1000 0 L1000 8 C800 32 600 2 400 32 C200 56 50 12 0 8 Z",
    },
  },
  topographie: {
    // Talus et courbes de niveau pour Travaux Publics, VRD et Terrassement
    vertical: {
      arriere: "M0 0 L14 0 C24 250 44 500 68 750 C82 900 52 980 36 1000 L0 1000 Z",
      avant: "M0 0 L6 0 C14 250 28 500 48 750 C60 900 34 980 20 1000 L0 1000 Z",
    },
    horizontal: {
      arriere: "M0 0 L1000 0 L1000 36 C750 60 500 28 250 48 C100 60 50 36 0 20 Z",
      avant: "M0 0 L1000 0 L1000 20 C750 38 500 14 250 28 C100 34 50 20 0 10 Z",
    },
  },
  strates: {
    // Gradins et niveaux architecturaux pour Bâtiment et Peinture
    vertical: {
      arriere: "M0 0 L24 0 C30 280 30 300 48 340 C48 600 48 620 66 660 C66 920 38 980 28 1000 L0 1000 Z",
      avant: "M0 0 L12 0 C16 280 16 300 30 340 C30 600 30 620 44 660 C44 920 22 980 14 1000 L0 1000 Z",
    },
    horizontal: {
      arriere: "M0 0 L1000 0 L1000 24 C720 24 700 48 660 48 C380 48 360 28 320 28 C100 28 80 42 0 42 Z",
      avant: "M0 0 L1000 0 L1000 12 C720 12 700 30 660 30 C380 30 360 14 320 14 C100 14 80 24 0 24 Z",
    },
  },
  arche: {
    // Voûte et tablier d'ouvrage d'art pour le Génie Civil
    vertical: {
      arriere: "M0 0 L16 0 C58 250 72 500 72 500 C72 500 58 750 16 1000 L0 1000 Z",
      avant: "M0 0 L8 0 C38 250 48 500 48 500 C48 500 38 750 8 1000 L0 1000 Z",
    },
    horizontal: {
      arriere: "M0 0 L1000 0 L1000 16 C750 58 500 72 500 72 C500 72 250 58 0 16 Z",
      avant: "M0 0 L1000 0 L1000 8 C750 38 500 48 500 48 C500 48 250 38 0 8 Z",
    },
  },
  biseau: {
    // Diagonale dynamique institutionnelle (Entreprise, Engagements, Réalisations)
    vertical: {
      arriere: "M0 0 L22 0 C30 300 42 700 56 1000 L0 1000 Z",
      avant: "M0 0 L10 0 C16 300 24 700 34 1000 L0 1000 Z",
    },
    horizontal: {
      arriere: "M0 0 L1000 0 L1000 46 C650 34 350 22 0 14 Z",
      avant: "M0 0 L1000 0 L1000 26 C650 18 350 12 0 6 Z",
    },
  },
} as const;

/**
 * Séparateur organique subtil et non agressif entre le bloc texte et la photo :
 * - Double strate (strate arrière douce à 32% d'opacité, strate avant pleine)
 * - Formes variées selon le domaine : onde (eau), topographie (VRD), strates (bâtiment), arche (génie civil), biseau (général)
 * - Aucune arête coupante ni débordement hors du conteneur.
 */
export function SeparateurHero({ forme = "biseau", sens, className = "" }: Props): ReactElement {
  const data = tracés[forme][sens];

  if (sens === "vertical") {
    return (
      <svg
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        aria-hidden
        className={`pointer-events-none block h-full w-full ${className}`}
      >
        <path d={data.arriere} fill="currentColor" opacity="0.32" />
        <path d={data.avant} fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 1000 100"
      preserveAspectRatio="none"
      aria-hidden
      className={`pointer-events-none block h-full w-full ${className}`}
    >
      <path d={data.arriere} fill="currentColor" opacity="0.32" />
      <path d={data.avant} fill="currentColor" />
    </svg>
  );
}

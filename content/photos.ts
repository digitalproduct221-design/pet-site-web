/**
 * Registre unique des photos du site.
 * Pour remplacer une photo par son original haute définition : déposer le nouveau
 * fichier dans assets/photos puis relancer `npm run images`, ou changer `src` ici.
 * Aucun composant ne référence un fichier image directement.
 */
import terrassementEngins from "@/public/images/chantiers/terrassement-engins.jpg";
import conduiteOuvrage from "@/public/images/chantiers/conduite-ouvrage-hydraulique.jpg";
import dalotRegard from "@/public/images/chantiers/dalot-regard.jpg";
import ferraillageOuvrage from "@/public/images/chantiers/ferraillage-ouvrage.jpg";
import irrigation from "@/public/images/chantiers/irrigation.jpg";
import clotureGrillage from "@/public/images/chantiers/cloture-grillage.jpg";
import poseConduiteTopographie from "@/public/images/chantiers/pose-conduite-topographie.jpg";
import immeubleGrue from "@/public/images/chantiers/immeuble-grue.jpg";
import niveleuseVoirie from "@/public/images/chantiers/niveleuse-voirie.jpg";
import trancheeLotissement from "@/public/images/chantiers/tranchee-lotissement.jpg";
import type { StaticImageData } from "next/image";

export type Photo = {
  src: StaticImageData;
  alt: string;
  /** Point d'intérêt pour le recadrage (object-position). */
  focale?: string;
  /** À vérifier : photo d'aspect « banque d'images » (voir docs/decisions.md). */
  droitsAVerifier?: boolean;
};

export const photos = {
  terrassementEngins: {
    src: terrassementEngins,
    alt: "Une chargeuse et une pelle hydraulique CAT terrassent un remblai de sable sur un chantier.",
    focale: "58% 55%",
  },
  conduiteOuvrage: {
    src: conduiteOuvrage,
    alt: "Ouvrier dans une cage d'armatures autour d'une conduite en fonte noire et de vannes bleues, au fond d'une fouille.",
    focale: "55% 50%",
  },
  dalotRegard: {
    src: dalotRegard,
    alt: "Regard en béton coulé en place, raccordé à une conduite en fonte, au milieu d'un quartier de Dakar.",
    focale: "50% 60%",
  },
  ferraillageOuvrage: {
    src: ferraillageOuvrage,
    alt: "Nappe d'armatures en acier posée sur un radier en béton, au bord d'un plan d'eau.",
    focale: "45% 60%",
  },
  irrigation: {
    src: irrigation,
    alt: "Asperseur d'irrigation en fonctionnement sur une conduite posée entre deux rangs de cultures.",
    focale: "50% 45%",
    droitsAVerifier: true,
  },
  clotureGrillage: {
    src: clotureGrillage,
    alt: "Clôture en panneaux de grillage rigide sur poteaux noirs, posée au-dessus d'un muret de pierres.",
    focale: "50% 50%",
    droitsAVerifier: true,
  },
  poseConduiteTopographie: {
    src: poseConduiteTopographie,
    alt: "Équipe en gilets orange posant une conduite dans une tranchée, pendant qu'un topographe relève les cotes au GPS.",
    focale: "78% 45%",
  },
  immeubleGrue: {
    src: immeubleGrue,
    alt: "Immeuble en structure béton en cours de construction, avec coffrages jaunes et grue à tour.",
    focale: "50% 40%",
    droitsAVerifier: true,
  },
  niveleuseVoirie: {
    src: niveleuseVoirie,
    alt: "Chef de chantier en casque jaune guidant une niveleuse CAT 140H sur une voirie en terre.",
    focale: "45% 50%",
  },
  trancheeLotissement: {
    src: trancheeLotissement,
    alt: "Ouvriers creusant une tranchée de canalisation en latérite rouge au pied de villas en construction.",
    focale: "55% 55%",
  },
} satisfies Record<string, Photo>;

export type PhotoId = keyof typeof photos;

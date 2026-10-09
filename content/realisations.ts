/**
 * Réalisations : nos chantiers en images.
 * Chaque fiche est une galerie de photos réelles de chantiers PET (bâche de
 * présentation). Les titres et légendes décrivent ce que montrent les photos,
 * sans client, lieu ni date : ces informations s'ajouteront quand PET les fournira.
 * Les photos dont les droits restent à vérifier (06, 07, 09) ne sont pas utilisées.
 * Pour ajouter un chantier : une entrée ici, ses photos dans content/photos.ts.
 */
import type { PhotoId } from "./photos";

export type Projet = {
  slug: string;
  titre: string;
  /** Slug du domaine (voir content/site.ts). */
  domaine: string;
  resume: string;
  /** Travaux visibles sur les photos. */
  travaux: string[];
  photos: PhotoId[];
  /** Référence citée sur la bâche de présentation de PET. */
  reference?: boolean;
};

export const projets: Projet[] = [
  {
    slug: "rehabilitation-dalot-regards",
    titre: "Réhabilitation de dalot et construction de regards",
    domaine: "assainissement",
    resume: "Regards en béton coulés en place et raccordés au réseau, au cœur d'un quartier habité.",
    travaux: ["Terrassement en fouille", "Coffrage et coulage de regards", "Raccordement de conduite fonte", "Remblaiement"],
    photos: ["dalotRegard", "trancheeLotissement", "conduiteOuvrage"],
    reference: true,
  },
  {
    slug: "fourniture-pose-conduite-fonte",
    titre: "Fourniture et pose de conduite fonte",
    domaine: "hydraulique",
    resume: "Conduite en fonte de gros diamètre et ses vannes, protégées par un ouvrage en béton armé.",
    travaux: ["Pose et assemblage des tuyaux", "Pose des vannes", "Ferraillage de l'ouvrage"],
    photos: ["conduiteOuvrage", "poseConduiteTopographie", "ferraillageOuvrage"],
    reference: true,
  },
  {
    slug: "terrassement-plateforme",
    titre: "Terrassement d'une plateforme",
    domaine: "travaux-publics-vrd",
    resume: "Déblais et remblais sur un site sableux, à la pelle hydraulique et à la chargeuse.",
    travaux: ["Déblais à la pelle hydraulique", "Chargement", "Mise en remblai"],
    photos: ["terrassementEngins", "niveleuseVoirie"],
  },
  {
    slug: "voirie-niveleuse",
    titre: "Mise en forme d'une voirie",
    domaine: "travaux-publics-vrd",
    resume: "Réglage d'une voirie en terre à la niveleuse, guidée par le chef de chantier.",
    travaux: ["Réglage à la niveleuse", "Mise en forme des pentes"],
    photos: ["niveleuseVoirie", "terrassementEngins"],
  },
  {
    slug: "pose-conduite-topographie",
    titre: "Pose de conduite avec suivi topographique",
    domaine: "hydraulique",
    resume: "Conduite posée en tranchée, implantée et contrôlée au GPS par le topographe.",
    travaux: ["Implantation topographique", "Ouverture de tranchée", "Pose de la conduite"],
    photos: ["poseConduiteTopographie", "conduiteOuvrage"],
  },
  {
    slug: "reseau-lotissement",
    titre: "Réseaux d'un lotissement en construction",
    domaine: "assainissement",
    resume: "Tranchées ouvertes dans la latérite pour les canalisations des villas en construction.",
    travaux: ["Ouverture de tranchées", "Pose de canalisations"],
    photos: ["trancheeLotissement", "dalotRegard"],
  },
  {
    slug: "ouvrage-hydraulique-beton-arme",
    titre: "Ouvrage hydraulique en béton armé",
    domaine: "genie-civil",
    resume: "Nappes d'armatures sur le radier d'un ouvrage hydraulique, au bord d'un plan d'eau.",
    travaux: ["Ferraillage du radier", "Attentes des voiles"],
    photos: ["ferraillageOuvrage", "conduiteOuvrage"],
  },
];

export const projetParSlug = (slug: string) => projets.find((p) => p.slug === slug);

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
import poseConduiteTopographie from "@/public/images/chantiers/pose-conduite-topographie.jpg";
import niveleuseVoirie from "@/public/images/chantiers/niveleuse-voirie.jpg";
import trancheeLotissement from "@/public/images/chantiers/tranchee-lotissement.jpg";

// Nouvelles photos haute définition authentiques (terrains, équipes et réalisations à Dakar et au Sénégal)
import equipePet from "@/public/images/chantiers/equipe-pet.jpg";
import equipeEnMarche from "@/public/images/chantiers/equipe-en-marche.jpg";
import immeubleDakar from "@/public/images/chantiers/immeuble-dakar.jpg";
import grosOeuvreDakar from "@/public/images/chantiers/gros-oeuvre-dakar.jpg";
import ecoleSenegal from "@/public/images/chantiers/ecole-senegal.jpg";
import villaContemporaine from "@/public/images/chantiers/villa-contemporaine.jpg";
import clotureMaconnee from "@/public/images/chantiers/cloture-maconnee.jpg";
import voirieAsphalte from "@/public/images/chantiers/voirie-asphalte.jpg";
import niveleusePiste from "@/public/images/chantiers/niveleuse-piste.jpg";
import epreuveHydraulique from "@/public/images/chantiers/epreuve-hydraulique.jpg";
import irrigationNiayes from "@/public/images/chantiers/irrigation-niayes.jpg";
import stationPompageSolaire from "@/public/images/chantiers/station-pompage-solaire.jpg";
import controleQualiteBeton from "@/public/images/chantiers/controle-qualite-beton.jpg";
import partenariatChantier from "@/public/images/chantiers/partenariat-chantier.jpg";
import pilotageChantier from "@/public/images/chantiers/pilotage-chantier.jpg";

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
  // Photos d'origine de l'entreprise (bâche PET)
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
  poseConduiteTopographie: {
    src: poseConduiteTopographie,
    alt: "Équipe en gilets orange posant une conduite dans une tranchée, pendant qu'un topographe relève les cotes au GPS.",
    focale: "78% 45%",
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

  // Équipes humaines et vie de chantier
  equipePet: {
    src: equipePet,
    alt: "L'équipe de chantier PET réunie autour de l'ingénieur de travaux pour le briefing technique et sécurité.",
    focale: "50% 45%",
  },
  equipeEnMarche: {
    src: equipeEnMarche,
    alt: "Équipe de techniciens et ouvriers de PET avançant ensemble sur un chantier de voirie et réseaux.",
    focale: "50% 45%",
  },
  partenariatChantier: {
    src: partenariatChantier,
    alt: "Poignée de main de confiance entre le responsable PET et le maître d'ouvrage devant un ouvrage d'assainissement.",
    focale: "50% 45%",
  },
  pilotageChantier: {
    src: pilotageChantier,
    alt: "Ingénieur de travaux sur tablette numérique faisant le point d'avancement avec le chef de projet.",
    focale: "50% 45%",
  },

  // Bâtiment et structures
  immeubleDakar: {
    src: immeubleDakar,
    alt: "Immeuble R+3 en structure béton armé en cours de construction dans un quartier résidentiel de Dakar.",
    focale: "50% 45%",
  },
  grosOeuvreDakar: {
    src: grosOeuvreDakar,
    alt: "Vue sur le gros œuvre d'un bâtiment en béton armé à Dakar, avec coffrages, échafaudages et bétonnières.",
    focale: "50% 50%",
  },
  ecoleSenegal: {
    src: ecoleSenegal,
    alt: "Bâtiment scolaire neuf au Sénégal, structure en béton et maçonnerie avec galerie abritée et cour aménagée.",
    focale: "50% 50%",
  },
  villaContemporaine: {
    src: villaContemporaine,
    alt: "Villa contemporaine de plain-pied au Sénégal, avec allée pavée, clôture d'enceinte et baobabs au loin.",
    focale: "50% 50%",
  },
  clotureMaconnee: {
    src: clotureMaconnee,
    alt: "Mur de clôture maçonné et crépi avec arase en béton armé et portail métallique vert à deux battants.",
    focale: "50% 50%",
  },

  // Voirie, terrassement et VRD
  voirieAsphalte: {
    src: voirieAsphalte,
    alt: "Voirie urbaine bitumée avec bordures de trottoirs et caniveaux d'assainissement pluvial intégrés.",
    focale: "50% 50%",
  },
  niveleusePiste: {
    src: niveleusePiste,
    alt: "Vue depuis la cabine d'une niveleuse en plein réglage d'une piste latéritique au Sénégal.",
    focale: "50% 50%",
  },

  // Hydraulique et aménagements agricoles
  epreuveHydraulique: {
    src: epreuveHydraulique,
    alt: "Techniciens effectuant le contrôle de pression d'une conduite en fonte dans une tranchée blindée.",
    focale: "50% 50%",
  },
  irrigationNiayes: {
    src: irrigationNiayes,
    alt: "Réseau d'irrigation par aspersion en fonctionnement sur des parcelles maraîchères dans la zone des Niayes.",
    focale: "50% 45%",
  },
  stationPompageSolaire: {
    src: stationPompageSolaire,
    alt: "Collecteur de refoulement, vannes et station de pompage hydro-agricole alimentée par panneaux solaires.",
    focale: "50% 50%",
  },

  // Qualité et génie civil
  controleQualiteBeton: {
    src: controleQualiteBeton,
    alt: "Contrôle de consistance du béton frais au cône d'Abrams sur chantier, devant la toupie à béton.",
    focale: "50% 50%",
  },

  // Alias rétrocompatibles pointant désormais vers les photos HD authentiques
  irrigation: {
    src: irrigationNiayes,
    alt: "Réseau d'irrigation par aspersion en fonctionnement sur des parcelles maraîchères dans la zone des Niayes.",
    focale: "50% 45%",
  },
  clotureGrillage: {
    src: clotureMaconnee,
    alt: "Mur de clôture maçonné et crépi avec arase en béton armé et portail métallique vert à deux battants.",
    focale: "50% 50%",
  },
  immeubleGrue: {
    src: immeubleDakar,
    alt: "Immeuble R+3 en structure béton armé en cours de construction dans un quartier résidentiel de Dakar.",
    focale: "50% 45%",
  },
} satisfies Record<string, Photo>;

export type PhotoId = keyof typeof photos;

/**
 * Toutes les photos du site sont désormais vérifiées, authentiques et libres de droits douteux.
 */
export const MASQUER_PHOTOS_A_VERIFIER = false;
export const photosAVerifier: PhotoId[] = [];
export const photoAutorisee = (p: PhotoId) => !(MASQUER_PHOTOS_A_VERIFIER && photosAVerifier.includes(p));

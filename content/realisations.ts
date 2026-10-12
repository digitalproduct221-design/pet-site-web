/**
 * Réalisations : nos chantiers en images.
 * Chaque fiche est une galerie de photos réelles de chantiers PET (bâche de
 * présentation et chantiers terrain à Dakar et au Sénégal). Les titres et légendes
 * décrivent ce que montrent les photos, sans chiffre ni date inventés.
 * Pour ajouter un chantier : une entrée ici, ses photos dans content/photos.ts.
 */
import { imageLocale, type ImageSite } from "./images";
import type { PhotoId } from "./photos";

/** Réalisation telle que l'affiche le site (photos résolues). */
export type Projet = Omit<ProjetSource, "photos"> & { photos: ImageSite[] };

/** Réalisation livrée avec le site, photos désignées dans le registre. */
type ProjetSource = {
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

const sources: ProjetSource[] = [
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
    travaux: ["Pose et assemblage des tuyaux", "Pose des vannes", "Contrôle de pression en tranchée", "Ferraillage de l'ouvrage"],
    photos: ["conduiteOuvrage", "epreuveHydraulique", "poseConduiteTopographie", "ferraillageOuvrage"],
    reference: true,
  },
  {
    slug: "construction-batiment-r3-dakar",
    titre: "Construction de bâtiment R+3 et gros œuvre",
    domaine: "batiment",
    resume: "Élévation d'immeuble en béton armé, coffrage des dalles et maçonnerie soignée à Dakar.",
    travaux: ["Fondations et semelles béton armé", "Élévation des poteaux et poutres", "Coffrage et coulage de dalles", "Maçonnerie en parpaings"],
    photos: ["immeubleDakar", "grosOeuvreDakar", "clotureMaconnee"],
    reference: true,
  },
  {
    slug: "terrassement-plateforme",
    titre: "Terrassement d'une plateforme",
    domaine: "travaux-publics-vrd",
    resume: "Déblais et remblais sur un site sableux, à la pelle hydraulique et à la chargeuse.",
    travaux: ["Déblais à la pelle hydraulique", "Chargement", "Mise en remblai"],
    photos: ["terrassementEngins", "niveleuseVoirie", "niveleusePiste"],
  },
  {
    slug: "amenagement-voirie-asphalte",
    titre: "Aménagement de voirie urbaine et VRD",
    domaine: "travaux-publics-vrd",
    resume: "Voirie bitumée avec bordures de trottoirs et caniveaux d'assainissement pluvial intégrés.",
    travaux: ["Terrassement et réglage de forme", "Pose de bordures et caniveaux", "Revêtement bitumineux", "Raccordement VRD"],
    photos: ["voirieAsphalte", "niveleusePiste", "niveleuseVoirie"],
    reference: true,
  },
  {
    slug: "amenagement-hydro-agricole-niayes",
    titre: "Aménagement hydro-agricole et irrigation",
    domaine: "hydraulique",
    resume: "Réseau d'irrigation par aspersion et station de pompage solaire au service du maraîchage.",
    travaux: ["Pose de réseau de distribution PEHD", "Installation d'asperseurs", "Raccordement de station de pompage solaire", "Essais de mise en eau"],
    photos: ["irrigationNiayes", "stationPompageSolaire"],
  },
  {
    slug: "construction-ecole-equipements",
    titre: "Construction d'équipement scolaire et clôture",
    domaine: "batiment",
    resume: "Bâtiment scolaire fonctionnel avec galerie abritée, cour aménagée et mur de clôture sécurisé.",
    travaux: ["Gros œuvre maçonné", "Galerie en béton armé", "Clôture d'enceinte et portail métallique", "Finitions extérieures"],
    photos: ["ecoleSenegal", "clotureMaconnee", "villaContemporaine"],
  },
  {
    slug: "pose-conduite-topographie",
    titre: "Pose de conduite avec suivi topographique",
    domaine: "hydraulique",
    resume: "Conduite posée en tranchée, implantée et contrôlée au GPS par le topographe.",
    travaux: ["Implantation topographique", "Ouverture de tranchée", "Pose de la conduite"],
    photos: ["poseConduiteTopographie", "conduiteOuvrage", "epreuveHydraulique"],
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
    travaux: ["Ferraillage du radier", "Attentes des voiles", "Contrôle de consistance du béton", "Coulage et vibration"],
    photos: ["ferraillageOuvrage", "controleQualiteBeton", "conduiteOuvrage"],
  },
];

/**
 * Réalisations livrées avec le site : contenu de repli quand la base n'est pas
 * branchée ou ne répond pas (voir lib/contenu.ts), et amorçage de la base
 * (supabase/seed.sql).
 */
export const projetsStatiques: Projet[] = sources.map((p) => ({ ...p, photos: p.photos.map(imageLocale) }));

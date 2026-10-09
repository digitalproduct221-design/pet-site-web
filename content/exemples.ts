/**
 * ============================================================================
 *  EXEMPLE – DONNÉES D'EXEMPLE À REMPLACER
 * ============================================================================
 * Tout ce fichier contient des données d'exemple : projets, actualités, offres.
 * - Les projets reprennent les chantiers visibles sur les photos fournies, mais
 *   client, lieu et année restent « À renseigner » : ce ne sont PAS des références
 *   client vérifiées.
 * - Les actualités et offres d'emploi sont fictives et signalées à l'écran.
 * Pour publier de vrais contenus : remplacer les entrées ci-dessous et passer
 * `exemple` à false. Aucun autre fichier n'est à modifier.
 * ============================================================================
 */
import type { PhotoId } from "./photos";

export const A_RENSEIGNER = "À renseigner";

/* ---------- Réalisations ---------- */

export type Projet = {
  slug: string;
  titre: string;
  /** Slug du domaine (voir content/site.ts). */
  domaine: string;
  client: string;
  lieu: string;
  annee: string;
  resume: string;
  description: string[];
  travaux: string[];
  photos: PhotoId[];
  /** EXEMPLE : passer à false une fois la fiche vérifiée par le client. */
  exemple: boolean;
};

export const projets: Projet[] = [
  {
    slug: "rehabilitation-dalot-regards",
    titre: "Réhabilitation de dalot et construction de regards",
    domaine: "assainissement",
    client: A_RENSEIGNER,
    lieu: A_RENSEIGNER,
    annee: A_RENSEIGNER,
    resume: "Remise en état d'un dalot et création de regards en béton coulé en place, en milieu urbain.",
    description: [
      "Chantier mené au cœur d'un quartier habité : terrassement, coffrage et coulage de regards en béton, puis raccordement aux conduites existantes.",
      "Fiche d'exemple construite à partir d'une photo de chantier : le contexte précis est à compléter par PET.",
    ],
    travaux: ["Terrassement en fouille", "Coffrage et coulage de regards", "Raccordement de conduite fonte", "Remblaiement"],
    photos: ["dalotRegard", "trancheeLotissement"],
    exemple: true,
  },
  {
    slug: "fourniture-pose-conduite-fonte",
    titre: "Fourniture et pose de conduite fonte",
    domaine: "hydraulique",
    client: A_RENSEIGNER,
    lieu: A_RENSEIGNER,
    annee: A_RENSEIGNER,
    resume: "Pose d'une conduite en fonte de gros diamètre et de ses vannes, avec ouvrage de protection en béton armé.",
    description: [
      "Conduite en fonte posée en fouille profonde, équipée de vannes et protégée par une cage d'armatures avant bétonnage.",
      "Fiche d'exemple construite à partir d'une photo de chantier : le contexte précis est à compléter par PET.",
    ],
    travaux: ["Fourniture de la conduite", "Pose et assemblage des tuyaux", "Ferraillage de l'ouvrage", "Essais de pression"],
    photos: ["conduiteOuvrage", "poseConduiteTopographie"],
    exemple: true,
  },
  {
    slug: "cloture-batiment-voirie",
    titre: "Construction de mur de clôture, bâtiment et voirie",
    domaine: "batiment",
    client: A_RENSEIGNER,
    lieu: A_RENSEIGNER,
    annee: A_RENSEIGNER,
    resume: "Ensemble de travaux sur une même emprise : clôture, bâtiment et voirie d'accès.",
    description: [
      "Projet regroupant plusieurs corps d'état : clôture périphérique, construction d'un bâtiment et réalisation de la voirie.",
      "Fiche d'exemple construite à partir de la bâche de présentation : le contexte précis est à compléter par PET.",
    ],
    travaux: ["Mur et clôture grillagée", "Gros œuvre du bâtiment", "Voirie d'accès"],
    photos: ["clotureGrillage", "immeubleGrue"],
    exemple: true,
  },
  {
    slug: "terrassement-plateforme",
    titre: "Terrassement d'une plateforme",
    domaine: "travaux-publics-vrd",
    client: A_RENSEIGNER,
    lieu: A_RENSEIGNER,
    annee: A_RENSEIGNER,
    resume: "Déblais, remblais et mise en forme d'une plateforme avec pelle hydraulique et chargeuse.",
    description: [
      "Mouvements de terre sur un site sableux : extraction à la pelle, chargement et mise en remblai jusqu'aux cotes du projet.",
      "Fiche d'exemple construite à partir d'une photo de chantier : le contexte précis est à compléter par PET.",
    ],
    travaux: ["Déblais à la pelle hydraulique", "Chargement et transport", "Mise en remblai et compactage"],
    photos: ["terrassementEngins", "niveleuseVoirie"],
    exemple: true,
  },
  {
    slug: "reseau-lotissement",
    titre: "Réseaux d'un lotissement en construction",
    domaine: "assainissement",
    client: A_RENSEIGNER,
    lieu: A_RENSEIGNER,
    annee: A_RENSEIGNER,
    resume: "Ouverture de tranchées et pose de canalisations au pied de villas en cours de construction.",
    description: [
      "Tranchées ouvertes dans la latérite pour poser les canalisations qui desserviront les villas du lotissement.",
      "Fiche d'exemple construite à partir d'une photo de chantier : le contexte précis est à compléter par PET.",
    ],
    travaux: ["Ouverture de tranchées", "Pose de canalisations", "Remblaiement et réfection"],
    photos: ["trancheeLotissement", "dalotRegard"],
    exemple: true,
  },
  {
    slug: "ouvrage-hydraulique-beton-arme",
    titre: "Ouvrage hydraulique en béton armé",
    domaine: "genie-civil",
    client: A_RENSEIGNER,
    lieu: A_RENSEIGNER,
    annee: A_RENSEIGNER,
    resume: "Ferraillage du radier et des voiles d'un ouvrage hydraulique au bord d'un plan d'eau.",
    description: [
      "Mise en place des nappes d'armatures sur le radier et des attentes pour les voiles, avant coulage du béton.",
      "Fiche d'exemple construite à partir d'une photo de chantier : le contexte précis est à compléter par PET.",
    ],
    travaux: ["Ferraillage du radier", "Armatures des voiles", "Coulage du béton"],
    photos: ["ferraillageOuvrage", "conduiteOuvrage"],
    exemple: true,
  },
  {
    slug: "pose-conduite-topographie",
    titre: "Pose de conduite avec suivi topographique",
    domaine: "hydraulique",
    client: A_RENSEIGNER,
    lieu: A_RENSEIGNER,
    annee: A_RENSEIGNER,
    resume: "Pose d'une conduite en tranchée, implantée et contrôlée au GPS par notre topographe.",
    description: [
      "Pose d'une conduite dans une tranchée en terrain sableux, avec contrôle continu des cotes et des pentes.",
      "Fiche d'exemple construite à partir d'une photo de chantier : le contexte précis est à compléter par PET.",
    ],
    travaux: ["Implantation topographique", "Ouverture de tranchée", "Pose de la conduite", "Contrôle des pentes"],
    photos: ["poseConduiteTopographie", "conduiteOuvrage"],
    exemple: true,
  },
  {
    slug: "voirie-niveleuse",
    titre: "Mise en forme d'une voirie",
    domaine: "travaux-publics-vrd",
    client: A_RENSEIGNER,
    lieu: A_RENSEIGNER,
    annee: A_RENSEIGNER,
    resume: "Réglage d'une voirie en terre à la niveleuse, sous la conduite du chef de chantier.",
    description: [
      "Mise en forme et réglage de la chaussée à la niveleuse avant compactage et revêtement.",
      "Fiche d'exemple construite à partir d'une photo de chantier : le contexte précis est à compléter par PET.",
    ],
    travaux: ["Réglage à la niveleuse", "Mise en forme des pentes", "Compactage"],
    photos: ["niveleuseVoirie", "terrassementEngins"],
    exemple: true,
  },
];

export const projetParSlug = (slug: string) => projets.find((p) => p.slug === slug);

/* ---------- Actualités ---------- */

export type Article = {
  slug: string;
  titre: string;
  date: string; // AAAA-MM-JJ
  chapo: string;
  corps: string[];
  photo: PhotoId;
  exemple: boolean;
};

export const articles: Article[] = [
  {
    slug: "exemple-nos-equipes-sur-une-pose-de-conduite",
    titre: "Nos équipes sur une pose de conduite",
    date: "2026-09-15",
    chapo: "Article d'exemple : il montre comment une actualité de chantier s'affichera sur le site.",
    corps: [
      "Ce texte est un exemple. Une actualité type présente un chantier en cours ou terminé : le besoin du client, les travaux réalisés, les équipes mobilisées et les photos du chantier.",
      "Pour publier une vraie actualité, il suffit de remplacer cette entrée dans le fichier de contenus par le texte et les photos fournis par PET.",
    ],
    photo: "poseConduiteTopographie",
    exemple: true,
  },
  {
    slug: "exemple-securite-sur-nos-chantiers",
    titre: "La sécurité au quotidien sur nos chantiers",
    date: "2026-08-28",
    chapo: "Article d'exemple : une actualité peut aussi parler de nos méthodes et de nos équipes.",
    corps: [
      "Ce texte est un exemple. Il pourra être remplacé par un retour sur une formation, un rappel des consignes de sécurité ou la présentation d'un nouvel équipement.",
      "Les articles sont classés du plus récent au plus ancien et s'affichent automatiquement sur la page Actualités.",
    ],
    photo: "niveleuseVoirie",
    exemple: true,
  },
  {
    slug: "exemple-reseaux-lotissement",
    titre: "Des réseaux posés avant les villas",
    date: "2026-07-10",
    chapo: "Article d'exemple : un format court pour montrer l'avancement d'un chantier.",
    corps: [
      "Ce texte est un exemple. Une actualité courte peut accompagner une ou deux photos d'avancement et un lien vers la réalisation correspondante.",
    ],
    photo: "trancheeLotissement",
    exemple: true,
  },
];

export const articleParSlug = (slug: string) => articles.find((a) => a.slug === slug);

/* ---------- Offres d'emploi ---------- */

export type TypeContrat = "CDI" | "CDD" | "Stage";

export type Offre = {
  id: string;
  poste: string;
  contrat: TypeContrat;
  lieu: string;
  domaine: string;
  resume: string;
  exemple: boolean;
};

export const offres: Offre[] = [
  {
    id: "conducteur-engins",
    poste: "Conducteur d'engins",
    contrat: "CDI",
    lieu: "Dakar et régions",
    domaine: "Travaux publics et VRD",
    resume: "Conduite de pelle hydraulique et de chargeuse sur nos chantiers de terrassement.",
    exemple: true,
  },
  {
    id: "chef-equipe-canalisation",
    poste: "Chef d'équipe canalisation",
    contrat: "CDD",
    lieu: "Dakar",
    domaine: "Hydraulique",
    resume: "Encadrement d'une équipe de pose de conduites, du terrassement aux essais.",
    exemple: true,
  },
  {
    id: "stage-technicien-topographe",
    poste: "Technicien topographe",
    contrat: "Stage",
    lieu: "Dakar",
    domaine: "Génie civil",
    resume: "Implantation et relevés au GPS aux côtés de nos topographes.",
    exemple: true,
  },
];

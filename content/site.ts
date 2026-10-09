/**
 * Contenus structurés du site. Les faits viennent de content/entreprise.json ;
 * ce fichier les organise (navigation, domaines, textes d'interface).
 * Aucun chiffre ni nom de client ne doit être ajouté ici sans source.
 */
import entreprise from "./entreprise.json";
import type { PhotoId } from "./photos";
import { besoins } from "./besoins";

export { entreprise };

/** Slogan provisoire, à valider par le client. */
export const SLOGAN = "Votre partenaire pour bâtir et raccorder le Sénégal";

/**
 * Domaine public du site : NEXT_PUBLIC_SITE_URL s'il est défini (domaine définitif),
 * sinon le domaine de production fourni par Vercel, sinon l'adresse Vercel actuelle.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://pet-site-web.vercel.app")
).replace(/\/$/, "");

export const NOM = entreprise.nom;
export const SIGLE = entreprise.sigle;

/* ---------- Coordonnées ---------- */

export type Telephone = { affichage: string; lien: string; mobile: boolean };

const versLien = (numero: string) => `tel:+221${numero.replace(/\s/g, "")}`;

export const telephones: Telephone[] = entreprise.contact.telephones.map((numero) => ({
  affichage: numero,
  lien: versLien(numero),
  // Au Sénégal, les numéros en 33 sont des fixes ; 7x sont des mobiles.
  mobile: !numero.startsWith("33"),
}));

/** Numéro WhatsApp par défaut : premier mobile (à confirmer, voir docs/decisions.md). */
export const whatsapp = (() => {
  const mobile = telephones.find((t) => t.mobile) ?? telephones[0];
  const international = `221${mobile.affichage.replace(/\s/g, "")}`;
  return {
    affichage: mobile.affichage,
    lien: `https://wa.me/${international}?text=${encodeURIComponent(
      "Bonjour PET, je souhaite échanger au sujet d'un projet.",
    )}`,
  };
})();

export const email = entreprise.contact.email;
export const adresse = entreprise.contact.adresse;
/** Rond-point Liberté 6 (OpenStreetMap). L'emplacement exact des bureaux reste à confirmer par PET. */
export const coordonnees = { lat: 14.72863, lng: -17.45723 };
export const lienItineraire = `https://www.google.com/maps/dir/?api=1&destination=${coordonnees.lat},${coordonnees.lng}`;

/** Réseaux sociaux : liens à renseigner par le client (vides = non affichés). */
export const reseaux: { nom: "LinkedIn" | "Facebook" | "Instagram"; url: string }[] = [
  { nom: "LinkedIn", url: "" },
  { nom: "Facebook", url: "" },
  { nom: "Instagram", url: "" },
];

/* ---------- Domaines d'activité ---------- */

export type IconeDomaine = "batiment" | "route" | "eau" | "assainissement" | "genie-civil";

export type Domaine = {
  slug: string;
  titre: string;
  resume: string;
  prestations: string[];
  photos: PhotoId[];
  icone: IconeDomaine;
  /** Accroche courte pour les panneaux et le méga-menu. */
  accroche: string;
  /** Texte de présentation de la page domaine, reformulé depuis la fiche entreprise. */
  presentation: string[];
};

const photosParDomaine: Record<string, PhotoId[]> = {
  batiment: ["trancheeLotissement", "immeubleGrue", "clotureGrillage"],
  "travaux-publics-vrd": ["terrassementEngins", "niveleuseVoirie", "trancheeLotissement"],
  hydraulique: ["conduiteOuvrage", "poseConduiteTopographie", "ferraillageOuvrage"],
  assainissement: ["dalotRegard", "trancheeLotissement", "conduiteOuvrage"],
  "genie-civil": ["ferraillageOuvrage", "conduiteOuvrage", "dalotRegard"],
};

const textesDomaines: Record<string, Pick<Domaine, "icone" | "accroche" | "presentation">> = {
  batiment: {
    icone: "batiment",
    accroche: "Logements, écoles, ateliers et usines, du gros œuvre aux finitions.",
    presentation: [
      "Nous construisons des bâtiments à usage d'habitation et industriel : logements, écoles et universités, ateliers et usines.",
      "Nos équipes prennent aussi en charge les murs de clôture et les corps d'état de finition, dont l'électricité et la peinture, pour livrer un ouvrage complet.",
    ],
  },
  "travaux-publics-vrd": {
    icone: "route",
    accroche: "Routes, pistes, voiries, terrassements et ouvrages d'art.",
    presentation: [
      "Nous réalisons les routes et pistes, les ponts et ouvrages d'art, les voiries et réseaux divers (VRD) et les terrassements.",
      "Pelles, chargeuses et niveleuses : nos engins préparent les plateformes et mettent en forme les chaussées avant revêtement.",
    ],
  },
  hydraulique: {
    icone: "eau",
    accroche: "Conduites de tous diamètres, dont la fonte, pompage et irrigation.",
    presentation: [
      "Nous posons des conduites de différents diamètres, y compris en fonte, et construisons les ouvrages qui les accompagnent : stations de pompage, bâches à eau et dalots.",
      "Nous intervenons aussi sur les réseaux d'irrigation, de la pose des canalisations à la mise en service.",
    ],
  },
  assainissement: {
    icone: "assainissement",
    accroche: "Réseaux d'eaux usées, regards, branchements et réhabilitation.",
    presentation: [
      "Nous construisons des stations de traitement des eaux usées et installons ou réhabilitons les réseaux qui y mènent.",
      "Regards de visite, boîtes de branchement et réhabilitation de dalots : nous traitons chaque ouvrage du réseau, en milieu urbain comme en périphérie.",
    ],
  },
  "genie-civil": {
    icone: "genie-civil",
    accroche: "Ouvrages en béton armé, travaux souterrains et ouvrages d'art.",
    presentation: [
      "Nous réalisons les ouvrages de génie civil qui portent les réseaux et les infrastructures : ouvrages hydrauliques en béton armé, travaux souterrains et ouvrages d'art.",
      "Du ferraillage au coulage, nos équipes travaillent au plus près des plans pour des ouvrages durables.",
    ],
  },
};

export const domaines: Domaine[] = entreprise.domaines.map((d) => ({
  slug: d.id,
  titre: d.titre,
  resume: d.resume,
  prestations: d.prestations,
  photos: photosParDomaine[d.id],
  ...textesDomaines[d.id],
}));

export const domaineParSlug = (slug: string) => domaines.find((d) => d.slug === slug);

/* ---------- Valeurs et engagements ---------- */

export const valeurs: { titre: string; texte: string }[] = [
  { titre: "Qualité", texte: "Des ouvrages conformes aux plans et aux règles de l'art, contrôlés à chaque étape." },
  { titre: "Sécurité", texte: "Au centre de nos préoccupations : équipements de protection, chantiers balisés, consignes partagées." },
  { titre: "Service et conseil", texte: "Nous éclairons vos choix techniques dès l'étude, pour un projet juste et maîtrisé." },
  { titre: "Respect des lieux", texte: "Riverains, voiries, environnement : nous laissons le site propre et en ordre." },
  { titre: "Choix des matériaux", texte: "Des matériaux adaptés à l'usage et au climat, pour des ouvrages qui durent." },
  { titre: "Tenue des délais", texte: "Un planning clair, suivi et tenu, avec des points d'avancement réguliers." },
  { titre: "Satisfaction du client", texte: "À votre écoute de la première visite jusqu'à la réception des travaux." },
];

/** Les quatre engagements mis en avant sur l'accueil (« Pourquoi PET ? »). */
export const engagementsCles: { titre: string; texte: string; icone: "qualite" | "securite" | "delais" | "client" }[] = [
  {
    titre: "Qualité",
    texte: "Un personnel qualifié et des équipements régulièrement mis à niveau pour des ouvrages conformes et durables.",
    icone: "qualite",
  },
  {
    titre: "Sécurité",
    texte: "La sécurité est au centre de nos préoccupations, pour nos équipes, nos clients et les riverains.",
    icone: "securite",
  },
  {
    titre: "Délais",
    texte: "La tenue des délais fait partie de nos valeurs : un planning réaliste dès l'étude, suivi jusqu'à la livraison.",
    icone: "delais",
  },
  {
    titre: "Satisfaction client",
    texte: "Du conseil à la réception des travaux, nous servons avec la même exigence des clients publics, industriels et privés.",
    icone: "client",
  },
];

/** Notre manière de travailler. */
export const methode: { titre: string; texte: string }[] = [
  { titre: "Étude et conseil", texte: "Visite du site, lecture des plans, choix des matériaux et des méthodes avec vous." },
  { titre: "Planification", texte: "Phasage, moyens humains et matériels, planning partagé et validé ensemble." },
  { titre: "Exécution", texte: "Des équipes qualifiées, un chantier sécurisé et des contrôles à chaque étape." },
  { titre: "Livraison et suivi", texte: "Réception des travaux, levée des réserves et suivi de l'ouvrage après livraison." },
];

/* ---------- Métiers de nos chantiers (page Carrières) ---------- */

/** Les métiers exercés sur nos chantiers, d'après nos domaines. Ce ne sont pas des offres ouvertes. */
export const metiers: { id: string; titre: string; texte: string; domaine: string }[] = [
  { id: "conducteur-engins", titre: "Conducteur d'engins", texte: "Pelle hydraulique, chargeuse, niveleuse : terrassements et voiries.", domaine: "travaux-publics-vrd" },
  { id: "chef-equipe", titre: "Chef d'équipe", texte: "Organise le travail de l'équipe et veille à la sécurité sur le terrain.", domaine: "travaux-publics-vrd" },
  { id: "canalisateur", titre: "Canalisateur", texte: "Pose de conduites d'eau et de réseaux d'eaux usées, regards et branchements.", domaine: "hydraulique" },
  { id: "ferrailleur-coffreur", titre: "Ferrailleur coffreur", texte: "Armatures et coffrages des ouvrages en béton armé.", domaine: "genie-civil" },
  { id: "macon", titre: "Maçon", texte: "Gros œuvre des bâtiments, murs de clôture et ouvrages maçonnés.", domaine: "batiment" },
  { id: "topographe", titre: "Topographe", texte: "Implantation des ouvrages et contrôle des cotes au GPS.", domaine: "hydraulique" },
  { id: "electricien", titre: "Électricien", texte: "Installations électriques de nos bâtiments.", domaine: "batiment" },
  { id: "peintre", titre: "Peintre", texte: "Finitions intérieures et extérieures des bâtiments.", domaine: "batiment" },
];

/* ---------- Navigation (méga-menu) ---------- */

export type LienMenu = { titre: string; description: string; href: string; icone: string };
export type Rubrique = {
  id: string;
  titre: string;
  href: string;
  intro: string;
  liens: LienMenu[];
  carte: { photo: PhotoId; titre: string; lien: { libelle: string; href: string } };
};

export const navigation: Rubrique[] = [
  {
    id: "entreprise",
    titre: "L'entreprise",
    href: "/entreprise",
    intro: "Une entreprise de BTP tous corps d'état, fondée à Dakar en 2016 et portée par une équipe de plus de 40 ans d'expérience cumulée.",
    liens: [
      { titre: "Qui sommes-nous", description: "Notre métier et nos clients", href: "/entreprise#qui-sommes-nous", icone: "batiment" },
      { titre: "Notre histoire", description: "De 2016 à aujourd'hui", href: "/entreprise#histoire", icone: "histoire" },
      { titre: "Nos valeurs", description: "Sept principes de chantier", href: "/entreprise#valeurs", icone: "valeurs" },
      { titre: "Qualité et sécurité", description: "Au centre de nos préoccupations", href: "/entreprise#qualite-securite", icone: "securite" },
      { titre: "Équipe et moyens", description: "Personnel qualifié, engins mis à niveau", href: "/entreprise#equipe-moyens", icone: "equipe" },
      { titre: "Carrières", description: "Nos métiers, candidature spontanée", href: "/carrieres", icone: "emploi" },
    ],
    carte: {
      photo: "poseConduiteTopographie",
      titre: "Nos équipes sur une pose de conduite",
      lien: { libelle: "Découvrir PET", href: "/entreprise" },
    },
  },
  {
    id: "savoir-faire",
    titre: "Savoir-faire",
    href: "/savoir-faire",
    intro: "Cinq domaines d'expertise, du bâtiment aux réseaux d'eau, pour des clients publics, industriels et privés.",
    liens: [
      ...domaines.map((d) => ({ titre: d.titre, description: d.resume, href: `/savoir-faire/${d.slug}`, icone: d.icone })),
      {
        titre: "Électricité et peinture",
        description: "Les finitions de nos bâtiments",
        href: "/savoir-faire/batiment#electricite-peinture",
        icone: "electricite",
      },
    ],
    carte: {
      photo: "conduiteOuvrage",
      titre: "Pose de conduite fonte et ouvrage hydraulique",
      lien: { libelle: "Voir le savoir-faire", href: "/savoir-faire" },
    },
  },
  {
    id: "realisations",
    titre: "Réalisations",
    href: "/realisations",
    intro: "Nos chantiers en images, classés par domaine. Chaque réalisation s'ouvre sur sa galerie de photos.",
    liens: [
      { titre: "Tous les chantiers", description: "L'ensemble de nos réalisations", href: "/realisations", icone: "grille" },
      { titre: "Hydraulique", description: "Conduites et ouvrages", href: "/realisations?domaine=hydraulique", icone: "eau" },
      { titre: "Génie civil", description: "Ouvrages en béton armé", href: "/realisations?domaine=genie-civil", icone: "genie-civil" },
      { titre: "Assainissement", description: "Réseaux, regards et dalots", href: "/realisations?domaine=assainissement", icone: "assainissement" },
      { titre: "Routes et VRD", description: "Terrassements et voiries", href: "/realisations?domaine=travaux-publics-vrd", icone: "route" },
    ],
    carte: {
      photo: "dalotRegard",
      titre: "Réhabilitation de dalot et construction de regards",
      lien: { libelle: "Voir la galerie", href: "/realisations/rehabilitation-dalot-regards" },
    },
  },
  {
    id: "engagements",
    titre: "Engagements",
    href: "/engagements",
    intro: "Ce que nous promettons à nos clients, à nos équipes et aux territoires où nous travaillons.",
    liens: [
      { titre: "Sécurité (QHSE)", description: "Protéger les équipes et les riverains", href: "/engagements#securite", icone: "securite" },
      { titre: "Environnement", description: "Respecter les lieux et les ressources", href: "/engagements#environnement", icone: "environnement" },
      { titre: "Local et emploi", description: "Une entreprise sénégalaise", href: "/engagements#local-emploi", icone: "local" },
      { titre: "Qualité", description: "Des ouvrages conformes et durables", href: "/engagements#qualite", icone: "qualite" },
    ],
    carte: {
      photo: "niveleuseVoirie",
      titre: "Chef de chantier et niveleuse sur une voirie",
      lien: { libelle: "Nos engagements", href: "/engagements" },
    },
  },
  {
    id: "votre-projet",
    titre: "Votre projet",
    href: "/votre-projet",
    intro: "Dites-nous ce que vous voulez réaliser : nous vous montrons ce que nous faisons, ce qu'il faut préparer et comment nous avançons.",
    liens: [
      ...besoins.map((b) => ({ titre: b.titre, description: b.question, href: `/votre-projet#${b.slug}`, icone: domaineParSlug(b.domaine)?.icone ?? "batiment" })),
    ],
    carte: {
      photo: "niveleuseVoirie",
      titre: "Un projet ? Décrivez-le, nous vous rappelons",
      lien: { libelle: "Demander un devis", href: "/contact#devis" },
    },
  },
];

export const liensRapides = [
  { titre: "L'entreprise", href: "/entreprise" },
  { titre: "Savoir-faire", href: "/savoir-faire" },
  { titre: "Réalisations", href: "/realisations" },
  { titre: "Engagements", href: "/engagements" },
  { titre: "Votre projet", href: "/votre-projet" },
  { titre: "Carrières", href: "/carrieres" },
  { titre: "Contact et devis", href: "/contact" },
];

/**
 * Contenus structurés du site. Les faits viennent de content/entreprise.json ;
 * ce fichier les organise (navigation, domaines, textes d'interface).
 * Aucun chiffre ni nom de client ne doit être ajouté ici sans source.
 */
import entreprise from "./entreprise.json";
import { photoAutorisee, type PhotoId } from "./photos";
import { besoins } from "./besoins";

export { entreprise };

/** Slogan officiel PET. */
export const SLOGAN = "Votre allié de confiance pour des solutions sûres et respectueuses des normes environnementales";

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

export type IconeDomaine = "batiment" | "route" | "eau" | "assainissement" | "genie-civil" | "electricite";

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
  batiment: [
    "implantationVoirieBatiment",
    "etudePlansEquipePet",
    "directeurChantier",
    "maconnerieImmeubleSenegal",
    "murClotureIndustriel",
    "cloturePortailAcier",
    "batimentCommercialDakar",
    "immeubleDakar",
    "grosOeuvreDakar",
    "ecoleSenegal",
    "villaContemporaine",
    "clotureMaconnee",
    "clotureGrillage",
    "immeubleGrue",
    "partenariatConfianceClient",
    "briefingSecuriteEquipe",
  ],
  "travaux-publics-vrd": [
    "topographiePlanVoirie",
    "niveauOptiqueGeometre",
    "etudePlansEquipePet",
    "implantationVoirieBatiment",
    "topographieGps",
    "geometresImplantation",
    "terrassementEngins",
    "niveleuseVoirie",
    "trancheeLotissement",
    "niveleuseTerrassementPiste",
    "compacteurSolLaterite",
    "compacteurVibrantTerrassement",
    "vrdAsphalteBoulevard",
    "grandeAvenueUrbaineDakar",
    "rueResidentielleBitumee",
    "voirieAsphalte",
    "niveleusePiste",
    "reunionTechniqueChantier",
  ],
  hydraulique: [
    "poseConduiteTopographie",
    "conduiteOuvrage",
    "trancheeLotissement",
    "etudePlansEquipePet",
    "topographieGps",
    "inspectionTechniqueCanalisation",
    "controleConduiteEauPotable",
    "ouvertureVanneReseauEau",
    "vanneReservoirEauPotable",
    "pompeIrrigationAgricole",
    "irrigationParcellesMaraicheres",
    "hydrauliqueCanalisationsPose",
    "epreuveHydraulique",
    "stationPompageSolaire",
    "irrigationNiayes",
    "irrigation",
  ],
  assainissement: [
    "delegationSetecMeckhe",
    "inspectionDigueMeckhe",
    "supervisionSetecChantier",
    "terrassementCasierMeckhe",
    "directeurChantier",
    "dalotRegard",
    "conduiteOuvrage",
    "trancheeLotissement",
    "inspectionTechniqueCanalisation",
    "genieCivilDalotPrefa",
    "stationPompageSolaire",
    "epreuveHydraulique",
    "reunionTechniqueChantier",
  ],
  "genie-civil": [
    "ferraillageOuvrage",
    "dalotRegard",
    "conduiteOuvrage",
    "inspectionDigueMeckhe",
    "terrassementCasierMeckhe",
    "directeurChantier",
    "essaiAffaissementBeton",
    "mesureQualiteBetonFrais",
    "genieCivilReservoirBeton",
    "genieCivilDalotPrefa",
    "vanneReservoirEauPotable",
    "controleQualiteBeton",
    "grosOeuvreDakar",
    "pilotageChantier",
  ],
  "electricite-peinture": [
    "immeubleDakar",
    "villaContemporaine",
    "ecoleSenegal",
    "batimentCommercialDakar",
    "cloturePortailAcier",
  ],
};

const textesDomaines: Record<string, Pick<Domaine, "icone" | "accroche" | "presentation">> = {
  batiment: {
    icone: "batiment",
    accroche: "Du gros œuvre aux finitions : logements, écoles, locaux industriels et aménagements.",
    presentation: [
      "Que ce soit pour construire une résidence, un établissement scolaire ou un bâtiment industriel, nous prenons en charge votre projet de A à Z. Nous bâtissons des structures solides, bien ventilées et adaptées aux exigences de notre climat.",
      "Nos équipes réalisent les fondations, l'élévation des murs, les dalles en béton et les clôtures de protection. Nous assurons également les travaux de second œuvre indispensables pour vous livrer un bâtiment propre, sécurisé et prêt à l'emploi.",
      "Sur chaque chantier, nous veillons à la qualité des matériaux, à la propreté du site et au respect strict du calendrier convenu, avec un interlocuteur unique pour vous accompagner.",
    ],
  },
  "travaux-publics-vrd": {
    icone: "route",
    accroche: "Terrassement, voiries, pistes et viabilisation de terrains pour bâtir sur des bases saines.",
    presentation: [
      "Avant de construire, il faut préparer le sol. Nous intervenons pour déblayer, niveler et terrasser vos plateformes, qu'il s'agisse d'un lotissement d'habitation, d'une zone d'activités ou d'un site industriel.",
      "Nos conducteurs d'engins manient pelles mécaniques, chargeuses et niveleuses pour aménager les voies d'accès, ouvrir des pistes en latérite ou bitumées, et creuser les tranchées nécessaires au passage des réseaux.",
      "Nous intégrons les caniveaux d'évacuation des eaux de pluie dès la phase de voirie, pour garantir la longévité des voies même pendant les fortes pluies de l'hivernage.",
    ],
  },
  hydraulique: {
    icone: "eau",
    accroche: "Distribution et adduction d'eau potable : conduites tous diamètres, pompage et stockage.",
    presentation: [
      "L'accès à l'eau est au cœur de notre métier. Nous posons les canalisations qui alimentent en eau potable les quartiers, les communes, les usines et les exploitations agricoles.",
      "Nos équipes posent des conduites en fonte de gros diamètre et en PEHD, guidées au GPS par nos topographes pour garantir des pentes et des raccordements parfaits. Nous construisons également les réservoirs, bâches à eau et stations de pompage.",
      "Chaque réseau fait l'objet d'essais de pression rigoureux avant sa mise en service, pour vous assurer un approvisionnement continu, sans fuite ni baisse de débit.",
    ],
  },
  assainissement: {
    icone: "assainissement",
    accroche: "Collecte des eaux usées, drainage des pluies, regards et réhabilitation de réseaux.",
    presentation: [
      "Un bon assainissement protège la santé des habitants, préserve les sols et met fin aux problèmes d'inondation. Nous concevons et rénovons les réseaux d'évacuation en milieu urbain comme en zone rurale.",
      "Nous installons les collecteurs d'eaux usées, raccordons les boîtes de branchement des habitations et coulons sur place les regards de visite qui permettent un entretien facile au fil des années.",
      "Pour la gestion des eaux pluviales, nous construisons et réhabilitons des dalots en béton armé capables d'absorber les gros volumes d'eau et de sécuriser les voies de circulation.",
    ],
  },
  "genie-civil": {
    icone: "genie-civil",
    accroche: "Ouvrages en béton armé, structures hydrauliques et fondations spéciales durables.",
    presentation: [
      "Le génie civil regroupe les ouvrages techniques qui demandent une solidité à toute épreuve : radiers de fondation, ponts, dalots de grand gabarit, bassins et ouvrages souterrains.",
      "Nos ferrailleurs et coffreurs travaillent dans le respect scrupuleux des plans d'ingénierie et des normes de dosage du béton, pour que chaque structure résiste durablement aux charges et au temps.",
      "De la préparation du coffrage jusqu'au coulage et au séchage contrôlé, chaque étape est vérifiée pour garantir une sécurité totale aux usagers et aux riverains.",
    ],
  },
  "electricite-peinture": {
    icone: "electricite",
    accroche: "Installations électriques sécurisées aux normes et finitions soignées pour sublimer et protéger vos bâtiments.",
    presentation: [
      "Une construction n'est achevée que lorsque ses réseaux techniques sont parfaitement sûrs et ses finitions irréprochables. PET prend en charge l'ensemble des travaux d'électricité générale et de mise aux normes pour bâtiments résidentiels, tertiaires et industriels.",
      "Nos électriciens qualifiés réalisent la distribution électrique, les armoires de protection, l'éclairage économe en énergie et les dispositifs de sécurité. Chaque installation est vérifiée minutieusement pour garantir la protection des personnes et des équipements.",
      "Nos équipes de peintres et applicateurs assurent le traitement des surfaces, l'application d'enduits et de peintures de haute résistance adaptées aux rigueurs du climat sénégalais, garantissant un rendu esthétique et pérenne.",
    ],
  },
};

export const domaines: Domaine[] = entreprise.domaines.map((d) => ({
  slug: d.id,
  titre: d.titre,
  resume: d.resume,
  prestations: d.prestations,
  photos: (photosParDomaine[d.id] ?? []).filter(photoAutorisee),
  ...(textesDomaines[d.id] ?? textesDomaines.batiment),
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
    href: "/a-propos",
    intro: "Une entreprise de BTP tous corps d'état, fondée en 2016 et portée par une équipe de plus de 40 ans d'expérience cumulée au Sénégal.",
    liens: [
      { titre: "À propos de PET", description: "Histoire, mot de la direction et partenaires", href: "/a-propos", icone: "valeurs" },
      { titre: "Mot du Directeur", description: "Vision et engagements environnementaux", href: "/a-propos#mot-directeur", icone: "valeurs" },
      { titre: "Notre histoire", description: "De 2016 à aujourd'hui", href: "/a-propos#histoire", icone: "histoire" },
      { titre: "Nos partenaires", description: "Bailleurs et maîtres d'ouvrage", href: "/a-propos#partenaires", icone: "qualite" },
      { titre: "Qui sommes-nous", description: "Notre métier et nos clients", href: "/entreprise#qui-sommes-nous", icone: "batiment" },
      { titre: "Équipe et moyens", description: "Topographie GNSS, engins mis à niveau", href: "/entreprise#equipe-moyens", icone: "equipe" },
      { titre: "Actualités", description: "La vie de nos chantiers", href: "/actualites", icone: "actualites" },
      { titre: "Carrières", description: "Nos métiers, candidature spontanée", href: "/carrieres", icone: "emploi" },
    ],
    carte: {
      photo: "directeurChantier",
      titre: "Partenaire de confiance sur les chantiers au Sénégal",
      lien: { libelle: "Découvrir PET", href: "/a-propos" },
    },
  },
  {
    id: "savoir-faire",
    titre: "Savoir-faire",
    href: "/savoir-faire",
    intro: "Six domaines d'expertise, du bâtiment aux réseaux d'eau et finitions, pour des clients publics, industriels et privés.",
    liens: domaines.map((d) => ({
      titre: d.titre,
      description: d.resume,
      href: `/savoir-faire/${d.slug}`,
      icone: d.icone,
    })),
    carte: {
      photo: "immeubleDakar",
      titre: "Bâtiment, réseaux et génie civil au Sénégal",
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
      photo: "controleQualiteBeton",
      titre: "Rigueur technique et sécurité sur nos chantiers",
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
      photo: "pilotageChantier",
      titre: "Un projet ? Décrivez-le, nous vous rappelons",
      lien: { libelle: "Demander un devis", href: "/contact#devis" },
    },
  },
];

export const liensRapides = [
  { titre: "À propos", href: "/a-propos" },
  { titre: "L'entreprise", href: "/entreprise" },
  { titre: "Savoir-faire", href: "/savoir-faire" },
  { titre: "Réalisations", href: "/realisations" },
  { titre: "Engagements", href: "/engagements" },
  { titre: "Votre projet", href: "/votre-projet" },
  { titre: "Actualités", href: "/actualites" },
  { titre: "Carrières", href: "/carrieres" },
  { titre: "Contact et devis", href: "/contact" },
];

/* ---------- Mentions légales ---------- */

/**
 * Informations légales à fournir par PET avant la mise en ligne définitive.
 * Une valeur vide masque la ligne sur le site ; passer AFFICHER_MENTIONS_MANQUANTES
 * à true pour afficher « À renseigner » à la place (relecture interne).
 */
export const mentionsLegales = {
  ninea: "",
  rccm: "",
  directeurPublication: "",
  hebergeur: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
};
export const AFFICHER_MENTIONS_MANQUANTES = false;

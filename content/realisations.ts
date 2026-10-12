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
    slug: "installation-stockage-dechets-isdnd-meckhe",
    titre: "Installation de stockage de déchets (ISDND Meckhé)",
    domaine: "assainissement",
    resume: "Construction d'une installation de stockage de déchets non dangereux sous financement de l'AFD, maîtrise d'œuvre SETEC Infrastructures Afrique et appui GESCOD.",
    travaux: [
      "Relevés altimétriques de haute précision par station GNSS mobile",
      "Terrassements généraux, déblais et profilage des casiers de stockage",
      "Édification des digues et merlons périphériques de confinement",
      "Visites d'inspection et réunions de contrôle avec le maître d'œuvre SETEC",
      "Concertation de terrain avec les experts de coopération technique (GESCOD)",
      "Respect rigoureux des normes environnementales et exigences AFD",
    ],
    photos: [
      "delegationSetecMeckhe",
      "directeurChantier",
      "inspectionDigueMeckhe",
      "supervisionSetecChantier",
      "terrassementCasierMeckhe",
      "topographieGps",
      "geometresImplantation",
    ],
    reference: true,
  },
  {
    slug: "viabilisation-lotissement-topographie-voirie",
    titre: "Implantation topographique et viabilisation de lotissement résidentiel",
    domaine: "travaux-publics-vrd",
    resume: "Travaux topographiques de haute précision, calage des plans d'exécution et nivellement des voiries d'un nouveau lotissement résidentiel et d'immeubles au Sénégal.",
    travaux: [
      "Relevés altimétriques et nivellement au niveau d'optique de précision (trépied PET)",
      "Implantation des emprises de voies et raccordements aux villas",
      "Étude et calage des plans d'exécution sur le terrain par les ingénieurs PET",
      "Profilage en long et en travers de la plateforme de chaussée latéritique",
      "Contrôle altimétrique d'accès vers les bâtiments et infrastructures",
    ],
    photos: [
      "topographiePlanVoirie",
      "implantationVoirieBatiment",
      "niveauOptiqueGeometre",
      "etudePlansEquipePet",
    ],
    reference: true,
  },
  {
    slug: "construction-immeubles-tertiaires-dakar",
    titre: "Construction de bâtiments industriels et tertiaires à Dakar",
    domaine: "batiment",
    resume: "Réalisation d'immeubles commerciaux et tertiaires en structure béton armé multi-niveaux à Dakar, de la conception au gros œuvre achevé.",
    travaux: [
      "Fondations profondes et coulage du radier général",
      "Élévation de structures poteaux-poutres et dalles béton armé",
      "Coffrage soigné et maçonnerie de remplissage",
      "Coordination tous corps d'état et respect des délais",
    ],
    photos: ["batimentCommercialDakar", "immeubleDakar", "grosOeuvreDakar", "immeubleGrue"],
    reference: true,
  },
  {
    slug: "adduction-eau-canalisations-maitresses",
    titre: "Grands réseaux d'adduction d'eau et canalisations en tranchée",
    domaine: "hydraulique",
    resume: "Pose de conduites maîtresses de gros diamètre en fonte ductile et PEHD en tranchée blindée sécurisée.",
    travaux: [
      "Ouverture de tranchées et blindage par palplanches",
      "Pose et emboîtement de tuyaux fonte et PEHD gros diamètre",
      "Raccordements sur brides, ventouses et vannes de régulation",
      "Épreuves hydrauliques de mise en pression avant remblaiement",
    ],
    photos: ["hydrauliqueCanalisationsPose", "epreuveHydraulique", "stationPompageSolaire", "conduiteOuvrage"],
    reference: true,
  },
  {
    slug: "reservoirs-eau-ouvrages-art-beton",
    titre: "Construction de réservoirs d'eau et dalots préfabriqués",
    domaine: "genie-civil",
    resume: "Ouvrages d'art hydrauliques majeurs : grands réservoirs d'eau en béton armé, bassins de stockage et pose de dalots cadres préfabriqués.",
    travaux: [
      "Ferraillage lourd haute densité et contrôle des armatures",
      "Coulage continu de béton hydrofuge pour réservoirs étanches",
      "Grutage et emboîtement de dalots cadres préfabriqués de grand gabarit",
      "Épreuves d'étanchéité et essais de résistance mécanique",
    ],
    photos: ["genieCivilReservoirBeton", "genieCivilDalotPrefa", "ferraillageOuvrage", "controleQualiteBeton"],
    reference: true,
  },
  {
    slug: "amenagement-voirie-boulevards-vrd",
    titre: "Aménagement de voiries urbaines et réseaux divers (VRD)",
    domaine: "travaux-publics-vrd",
    resume: "Travaux complets d'application d'enrobé bitumineux, de pose de bordures et caniveaux d'assainissement pluvial sur artères urbaines.",
    travaux: [
      "Terrassement, déblais et remblais de voirie",
      "Mise en œuvre de grave non traitée et compactage",
      "Pose de bordures préfabriquées et caniveaux de drainage",
      "Application d'enrobé à chaud par finisseur et compactage dynamique",
    ],
    photos: ["vrdAsphalteBoulevard", "voirieAsphalte", "niveleusePiste", "terrassementEngins"],
    reference: true,
  },
  {
    slug: "construction-villas-etablissements-scolaires",
    titre: "Élévation de structures scolaires et résidentielles au Sénégal",
    domaine: "batiment",
    resume: "Chantiers de construction d'établissements éducatifs, de villas contemporaines de standing et de clôtures périphériques maçonnées.",
    travaux: [
      "Terrassement d'assise et coulage de semelles filantes",
      "Élévation des murs et pose de charpentes / toitures",
      "Galeries coursives, claustras de ventilation et finitions",
      "Clôtures d'enceinte maçonnées et aménagements extérieurs",
    ],
    photos: ["ecoleSenegal", "villaContemporaine", "clotureMaconnee", "clotureGrillage"],
  },
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
    reference: true,
  },
  {
    slug: "pose-conduite-topographie",
    titre: "Pose de conduite avec suivi topographique",
    domaine: "hydraulique",
    resume: "Conduite posée en tranchée, implantée et contrôlée au GPS par le topographe.",
    travaux: ["Implantation topographique", "Ouverture de tranchée", "Pose de la conduite"],
    photos: ["poseConduiteTopographie", "conduiteOuvrage"],
    reference: true,
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
    travaux: ["Ferraillage du radier", "Attentes des voiles", "Coulage et vibration"],
    photos: ["ferraillageOuvrage", "conduiteOuvrage"],
    reference: true,
  },
];

/**
 * Réalisations livrées avec le site : contenu de repli quand la base n'est pas
 * branchée ou ne répond pas (voir lib/contenu.ts), et amorçage de la base
 * (supabase/seed.sql).
 */
export const projetsStatiques: Projet[] = sources.map((p) => ({ ...p, photos: p.photos.map(imageLocale) }));

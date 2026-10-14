/**
 * Réalisations : nos chantiers en images.
 * Chaque fiche est une galerie de photos réelles et techniques de chantiers PET
 * à Dakar et au Sénégal. Les titres et travaux décrivent ce que montrent les photos,
 * sans chiffre ni date inventés.
 *
 * RÈGLE STRICTE : Chaque projet possède une photo de couverture (photos[0]) unique.
 * Au sein d'un même domaine, les photos sont réparties sans doublons entre projets.
 */
import { imageLocale, type ImageSite } from "./images";
import type { PhotoId } from "./photos";

/** Réalisation telle que l'affiche le site (photos résolues). */
export type Projet = Omit<ProjetSource, "photos"> & { photos: ImageSite[] };

/** Réalisation livrée avec le site, photos désignées dans le registre. */
export type ProjetSource = {
  slug: string;
  titre: string;
  /** Slug du domaine (voir content/site.ts). */
  domaine: string;
  resume: string;
  /** Travaux visibles sur les photos. */
  travaux: string[];
  photos: PhotoId[];
  /** Référence majeure de l'entreprise. */
  reference?: boolean;
};

export const sources: ProjetSource[] = [
  // --- TRAVAUX PUBLICS & VRD ---
  {
    slug: "amenagement-voirie-boulevards-vrd",
    titre: "Aménagement de voiries urbaines, boulevards et réseaux divers (VRD)",
    domaine: "travaux-publics-vrd",
    resume: "Travaux complets de terrassement, d'application d'enrobé bitumineux, de pose de bordures préfabriquées et de caniveaux d'assainissement pluvial sur artères urbaines et voies de circulation au Sénégal.",
    travaux: [
      "Terrassement général, déblais et remblais de voirie",
      "Profilage et régalage par niveleuse de forte puissance",
      "Compactage dynamique et contrôle de portance du fond de forme",
      "Pose de bordures préfabriquées et caniveaux latéraux de drainage",
      "Mise en œuvre d'enrobé à chaud au finisseur et compactage dynamique",
      "Signalisation et raccordements de réseaux divers",
    ],
    photos: [
      "niveleuseVoirie",
      "vrdAsphalteBoulevard",
      "grandeAvenueUrbaineDakar",
      "voirieAsphalte",
      "niveleusePiste",
      "compacteurVibrantTerrassement",
    ],
    reference: true,
  },
  {
    slug: "viabilisation-lotissement-topographie-voirie",
    titre: "Implantation topographique, nivellement et viabilisation de plateformes",
    domaine: "travaux-publics-vrd",
    resume: "Relevés altimétriques de haute précision, calage des plans d'exécution, ouverture de voies en latérite et viabilisation de plateformes pour lotissements résidentiels et industriels.",
    travaux: [
      "Relevés au niveau d'optique de précision CST/Berger (trépied PET)",
      "Implantation des axes de voirie et calage des cotes au GPS différentiel",
      "Analyse et ajustement des plans d'exécution sur le terrain par l'équipe d'ingénieurs PET",
      "Profilage en long et en travers des plateformes de chaussée latéritique",
      "Ouverture de pistes d'accès et voies intérieures de lotissement",
    ],
    photos: [
      "topographiePlanVoirie",
      "collaboratriceGeometreGps",
      "niveauOptiqueGeometre",
      "etudePlansEquipePet",
      "implantationVoirieBatiment",
      "geometresImplantation",
    ],
    reference: true,
  },
  {
    slug: "terrassement-plateformes-engins-lourds",
    titre: "Terrassements massifs, déblais-remblais et préparation de sols",
    domaine: "travaux-publics-vrd",
    resume: "Opérations de terrassement lourd, décapage de terre végétale, remblaiement méthodique et compactage de plateformes industrielles et logistiques.",
    travaux: [
      "Décapage de sol et déblais massifs à la pelle hydraulique CAT",
      "Mise en remblai par couches successives sélectionnées",
      "Compactage lourd au compacteur monocylindre vibrant",
      "Régalage et profilage de plateforme de forte portance",
      "Contrôles de densité in situ et essais de portance",
    ],
    photos: [
      "camionChargementChargeuse",
      "camionSableChantierPet",
      "camionDechargementSable",
      "ouvrierGiletPetNiveleuse",
      "terrassementEngins",
      "niveleuseTerrassementPiste",
      "compacteurSolLaterite",
    ],
    reference: true,
  },

  // --- HYDRAULIQUE ---
  {
    slug: "adduction-eau-canalisations-maitresses",
    titre: "Grands réseaux d'adduction d'eau potable et canalisations maîtresses",
    domaine: "hydraulique",
    resume: "Fourniture, transport et pose de conduites maîtresses de gros diamètre en fonte ductile et PEHD, tranchées sécurisées, raccordements sur brides et épreuves de pression.",
    travaux: [
      "Ouverture de tranchées profondes et blindage de sécurité",
      "Implantation et guidage topographique des pentes de pose",
      "Emboîtement et calage de tuyaux fonte et PEHD tous diamètres",
      "Montage de pièces spéciales : cônes, coudes, tés, vannes et ventouses",
      "Essais de mise en pression hydrostatique selon les normes de distribution",
    ],
    photos: [
      "poseConduiteTopographie",
      "hydrauliquePoseVanneTranchee",
      "hydrauliqueCanalisationsPose",
      "conduiteOuvrage",
      "epreuveHydraulique",
      "controleConduiteEauPotable",
    ],
    reference: true,
  },
  {
    slug: "stations-pompage-amenagements-hydro-agricoles",
    titre: "Stations de pompage, bâches de stockage et réseaux hydro-agricoles",
    domaine: "hydraulique",
    resume: "Équipement de stations de pompage hydrauliques et solaires, réservoirs tampons et collecteurs d'irrigation sous pression pour l'alimentation en eau et l'agriculture.",
    travaux: [
      "Génie civil de stations de pompage et chambres de vannes",
      "Installation de groupes motopompes et alimentations solaires",
      "Raccordement de collecteurs de refoulement et distribution",
      "Pose de réseaux d'irrigation et bornes d'arrosage en milieu rural",
      "Essais de débit, de pression et mise en service continue",
    ],
    photos: [
      "stationPompageSolaire",
      "ouvertureVanneReseauEau",
      "irrigationNiayes",
      "irrigation",
      "vanneReservoirEauPotable",
    ],
    reference: true,
  },

  // --- ASSAINISSEMENT ---
  {
    slug: "installation-stockage-dechets-isdnd-meckhe",
    titre: "Installation de stockage de déchets (ISDND Meckhé - AFD / SETEC / GESCOD)",
    domaine: "assainissement",
    resume: "Construction d'une installation de stockage de déchets non dangereux sous financement de l'AFD, maîtrise d'œuvre SETEC Infrastructures Afrique et appui technique GESCOD.",
    travaux: [
      "Relevés altimétriques de haute précision par station GNSS mobile",
      "Terrassements généraux, déblais et profilage des casiers de stockage",
      "Édification des digues et merlons périphériques de confinement",
      "Visites d'inspection et réunions de contrôle avec le maître d'œuvre SETEC",
      "Concertation de terrain avec les experts de coopération technique (GESCOD)",
      "Respect rigoureux des normes environnementales et exigences AFD",
    ],
    // Avant / après : montrés par le curseur comparatif de la fiche, donc absents de la galerie.
    photos: [
      "terrassementCasierMeckhe",
      "concertationChantierCasier",
      "supervisionSetecChantier",
      "inspectionDigueMeckhe",
      "delegationSetecMeckhe",
      "apresCasierNiveleMeckhe",
      "avantDechetsMeckhe",
    ],
    reference: true,
  },
  {
    slug: "reseaux-assainissement-dalots-evacuation",
    titre: "Réseaux d'assainissement pluvial, dalots cadres et regards de visite",
    domaine: "assainissement",
    resume: "Collecte et évacuation des eaux pluviales et usées, pose de dalots préfabriqués de grand gabarit, coulage de regards de visite étanches et raccordements urbains.",
    travaux: [
      "Terrassement en tranchée et confection de lit de pose",
      "Pose et emboîtement de dalots cadres préfabriqués en béton armé",
      "Coulage en place de regards de visite avec tampons de fonte",
      "Branchements particuliers et raccordement au collecteur principal",
      "Curage, réhabilitation de dalots existants et remblaiement soigné",
    ],
    photos: [
      "dalotRegard",
      "trancheeLotissement",
      "genieCivilDalotPrefa",
      "epreuveHydraulique",
    ],
    reference: true,
  },

  // --- GÉNIE CIVIL ---
  {
    slug: "reservoirs-eau-ouvrages-art-beton",
    titre: "Réservoirs de stockage d'eau et ouvrages d'art en béton armé",
    domaine: "genie-civil",
    resume: "Ouvrages d'art hydrauliques majeurs : grands réservoirs d'eau en béton armé, bassins de stockage, radiers lourds ferraillés et contrôle qualité continu du béton.",
    travaux: [
      "Ferraillage haute densité sur radiers et voiles étanches",
      "Coffrage soigné et coulage continu de béton hydrofuge",
      "Contrôle d'affaissement au cône d'Abrams et prélèvement d'éprouvettes",
      "Chambres de vannes étanches et traversées de parois sécurisées",
      "Essais de mise en eau et épreuves d'étanchéité réglementaires",
    ],
    photos: [
      "ferraillageOuvrage",
      "genieCivilReservoirBeton",
      "vanneReservoirEauPotable",
      "essaiAffaissementBeton",
      "controleQualiteBeton",
    ],
    reference: true,
  },
  {
    slug: "ouvrages-hydrauliques-dalots-prefa",
    titre: "Ouvrages de franchissement, dalots cadres et structures béton",
    domaine: "genie-civil",
    resume: "Conception et mise en œuvre d'ouvrages de franchissement hydrauliques, pose de dalots préfabriqués de fort gabarit et réhabilitation d'ouvrages d'art.",
    travaux: [
      "Terrassement en fouille et fondations d'ouvrages d'art",
      "Ferraillage et coulage de radiers porteurs en béton armé",
      "Grutage et assemblage de dalots préfabriqués de grande section",
      "Traitement des joints et étanchéité multicouche",
    ],
    photos: [
      "genieCivilDalotPrefa",
      "conduiteOuvrage",
      "pilotageChantier",
      "reunionTechniqueChantier",
      "partenariatChantier",
    ],
    reference: true,
  },

  // --- BÂTIMENT ---
  {
    slug: "construction-immeubles-tertiaires-dakar",
    titre: "Construction de bâtiments industriels, tertiaires et commerciaux à Dakar",
    domaine: "batiment",
    resume: "Réalisation complète d'immeubles commerciaux et tertiaires en structure béton armé multi-niveaux à Dakar, de l'étude géotechnique au gros œuvre achevé.",
    travaux: [
      "Implantation topographique de précision et études des plans",
      "Fondations profondes, semelles et coulage du radier général",
      "Élévation de structures poteaux-poutres et dalles en béton armé",
      "Maçonnerie de remplissage et pose de linteaux",
      "Coordination technique et respect strict des normes de sécurité",
    ],
    photos: [
      "batimentCommercialDakar",
      "grosOeuvreDakar",
      "immeubleGrue",
      "batimentTechniqueChantier",
      "immeubleSerigneDakar",
      "immeubleDakar",
    ],
    reference: true,
  },
  {
    slug: "construction-villas-etablissements-scolaires",
    titre: "Établissements scolaires, résidences et murs de clôture d'enceinte",
    domaine: "batiment",
    resume: "Chantiers de construction d'établissements éducatifs, de villas contemporaines de standing et de murs de clôture périphériques maçonnés de haute protection.",
    travaux: [
      "Terrassement d'assise et coulage de semelles filantes",
      "Élévation des murs en agglos de ciment vibré et coulage de chaînages",
      "Galeries coursives, toitures adaptées au climat sahélien",
      "Murs de clôture périphériques avec crépis soignés et portails acier",
      "Second œuvre, finitions intérieures et peintures de protection",
    ],
    photos: [
      "chantierVillaFinitions",
      "ecoleSenegal",
      "villaContemporaine",
      "clotureGrillage",
      "murClotureIndustriel",
      "clotureMaconnee",
    ],
    reference: true,
  },
];

/**
 * Réalisations livrées avec le site : contenu de référence garantissant
 * que tous les domaines disposent d'un ensemble riche de chantiers réels.
 */
export const projetsStatiques: Projet[] = sources.map((p) => ({ ...p, photos: p.photos.map(imageLocale) }));

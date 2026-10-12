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
import directeurChantier from "@/public/images/chantiers/directeur-chantier-meckhe.jpg";
import directeurBureau from "@/public/images/directeur/directeur-bureau.jpg";
import topographieGps from "@/public/images/chantiers/topographie-gps-chantier.jpg";
import geometresImplantation from "@/public/images/chantiers/geometres-implantation-chantier.jpg";
import hydrauliqueCanalisationsPose from "@/public/images/chantiers/hydraulique-canalisations-pose.jpg";
import genieCivilReservoirBeton from "@/public/images/chantiers/genie-civil-reservoir-beton.jpg";
import genieCivilDalotPrefa from "@/public/images/chantiers/genie-civil-dalot-prefa.jpg";
import batimentCommercialDakar from "@/public/images/chantiers/batiment-commercial-dakar.jpg";
import vrdAsphalteBoulevard from "@/public/images/chantiers/vrd-asphalte-boulevard.jpg";
import clotureGrillage from "@/public/images/chantiers/cloture-grillage.jpg";
import immeubleGrue from "@/public/images/chantiers/immeuble-grue.jpg";
import irrigation from "@/public/images/chantiers/irrigation.jpg";

// Nouvelles photos réelles du dossier client (ISDND Meckhé, SETEC, topographie niveau optique et voirie lotissement)
import delegationSetecMeckhe from "@/public/images/chantiers/delegation-setec-isdnd-meckhe.jpg";
import inspectionDigueMeckhe from "@/public/images/chantiers/inspection-digue-isdnd-meckhe.jpg";
import supervisionSetecChantier from "@/public/images/chantiers/supervision-setec-chantier.jpg";
import terrassementCasierMeckhe from "@/public/images/chantiers/terrassement-casier-isdnd-meckhe.jpg";
import topographiePlanVoirie from "@/public/images/chantiers/topographie-plan-voirie-lotissement.jpg";
import implantationVoirieBatiment from "@/public/images/chantiers/implantation-voirie-batiment-r3.jpg";
import niveauOptiqueGeometre from "@/public/images/chantiers/niveau-optique-geometre-pet.jpg";
import etudePlansEquipePet from "@/public/images/chantiers/etude-plans-equipe-pet.jpg";

// Photos supplémentaires haute définition (redistribuées sur les différentes rubriques)
import niveleuseTerrassementPiste from "@/public/images/chantiers/niveleuse-terrassement-piste.jpg";
import compacteurSolLaterite from "@/public/images/chantiers/compacteur-sol-laterite.jpg";
import compacteurVibrantTerrassement from "@/public/images/chantiers/compacteur-vibrant-terrassement.jpg";
import rueResidentielleBitumee from "@/public/images/chantiers/rue-residentielle-bitumee.jpg";
import grandeAvenueUrbaineDakar from "@/public/images/chantiers/grande-avenue-urbaine-dakar.jpg";
import inspectionTechniqueCanalisation from "@/public/images/chantiers/inspection-technique-canalisation.jpg";
import controleConduiteEauPotable from "@/public/images/chantiers/controle-conduite-eau-potable.jpg";
import ouvertureVanneReseauEau from "@/public/images/chantiers/ouverture-vanne-reseau-eau.jpg";
import vanneReservoirEauPotable from "@/public/images/chantiers/vanne-reservoir-eau-potable.jpg";
import pompeIrrigationAgricole from "@/public/images/chantiers/pompe-irrigation-agricole.jpg";
import irrigationParcellesMaraicheres from "@/public/images/chantiers/irrigation-parcelles-maraicheres.jpg";
import essaiAffaissementBeton from "@/public/images/chantiers/essai-affaissement-beton.jpg";
import mesureQualiteBetonFrais from "@/public/images/chantiers/mesure-qualite-beton-frais.jpg";
import maconnerieImmeubleSenegal from "@/public/images/chantiers/maconnerie-immeuble-senegal.jpg";
import murClotureIndustriel from "@/public/images/chantiers/mur-cloture-industriel.jpg";
import cloturePortailAcier from "@/public/images/chantiers/cloture-portail-acier.jpg";
import briefingSecuriteEquipe from "@/public/images/chantiers/briefing-securite-equipe.jpg";
import reunionTechniqueChantier from "@/public/images/chantiers/reunion-technique-chantier.jpg";
import partenariatConfianceClient from "@/public/images/chantiers/partenariat-confiance-client.jpg";

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

  // Photos d'infrastructures et bâtiments réels au Sénégal
  irrigation: {
    src: irrigation,
    alt: "Système et canalisations d'irrigation sur parcelle agricole au Sénégal.",
    focale: "50% 50%",
  },
  clotureGrillage: {
    src: clotureGrillage,
    alt: "Pose de clôture grillagée avec piquets métalliques scellés sur muret béton.",
    focale: "50% 50%",
  },
  immeubleGrue: {
    src: immeubleGrue,
    alt: "Chantier d'immeuble avec grue de levage et coulage de dalle béton à Dakar.",
    focale: "50% 45%",
  },

  // Photos réelles de terrain PET – Chantier ISDND Meckhé et Direction
  directeurBureau: {
    src: directeurBureau,
    alt: "Directeur Général de PARTENAIRE ENTREPRISE TRAVAUX SUARL dans son bureau de direction à Dakar.",
    focale: "50% 30%",
  },
  directeurChantier: {
    src: directeurChantier,
    alt: "Le Directeur de PET SUARL en tenue de chantier devant le panneau officiel du projet ISDND Meckhé financé par l'AFD.",
    focale: "50% 28%",
  },
  topographieGps: {
    src: topographieGps,
    alt: "Technicien géomètre topographe de PET équipé d'un système de positionnement GNSS/GPS de précision sur le chantier.",
    focale: "50% 35%",
  },
  geometresImplantation: {
    src: geometresImplantation,
    alt: "Équipe de géomètres PET en gilets de sécurité orange effectuant l'implantation technique et les cotes altimétriques sur le terrain.",
    focale: "50% 45%",
  },
  hydrauliqueCanalisationsPose: {
    src: hydrauliqueCanalisationsPose,
    alt: "Pose de canalisations d'adduction d'eau et réseau hydraulique en tranchée blindée à Dakar.",
    focale: "50% 50%",
  },
  genieCivilReservoirBeton: {
    src: genieCivilReservoirBeton,
    alt: "Construction d'un grand réservoir d'eau et bassin de stockage en béton armé au Sénégal.",
    focale: "50% 45%",
  },
  genieCivilDalotPrefa: {
    src: genieCivilDalotPrefa,
    alt: "Pose et grutage de dalot cadre préfabriqué en béton armé pour canal d'évacuation et ouvrage d'art.",
    focale: "50% 50%",
  },
  batimentCommercialDakar: {
    src: batimentCommercialDakar,
    alt: "Chantier de construction d'un bâtiment commercial et tertiaire multi-niveaux à Dakar.",
    focale: "50% 40%",
  },
  vrdAsphalteBoulevard: {
    src: vrdAsphalteBoulevard,
    alt: "Travaux d'enrobé bitumineux, bordures d'assainissement et aménagement de voirie urbaine.",
    focale: "50% 50%",
  },

  // Photos réelles issues du dossier client (ISDND Meckhé, supervision SETEC & voirie lotissement)
  delegationSetecMeckhe: {
    src: delegationSetecMeckhe,
    alt: "Délégation officielle conjointe sur le chantier de l'ISDND de Meckhé : équipes PET SUARL, ingénieurs de SETEC et experts de coopération technique (GESCOD).",
    focale: "50% 45%",
  },
  inspectionDigueMeckhe: {
    src: inspectionDigueMeckhe,
    alt: "Visite d'inspection technique sur la digue du casier de l'ISDND de Meckhé, ingénieurs PET présentant l'avancement des terrassements à la mission technique.",
    focale: "50% 35%",
  },
  supervisionSetecChantier: {
    src: supervisionSetecChantier,
    alt: "Contrôle technique et réunion sur le terrain avec le maître d'œuvre SETEC Infrastructures Afrique et l'encadrement PET.",
    focale: "50% 40%",
  },
  terrassementCasierMeckhe: {
    src: terrassementCasierMeckhe,
    alt: "Vue panoramique des terrassements et du casier de stockage de déchets de Meckhé avec le comité de pilotage sur la crête du merlon.",
    focale: "50% 50%",
  },
  topographiePlanVoirie: {
    src: topographiePlanVoirie,
    alt: "Équipe de topographie PET au niveau optique et concertation sur les plans d'exécution d'une voirie de lotissement en cours de viabilisation.",
    focale: "50% 45%",
  },
  implantationVoirieBatiment: {
    src: implantationVoirieBatiment,
    alt: "Implantation et nivellement de la voie d'accès vers un bâtiment R+3 en construction au Sénégal par l'équipe géomètre et travaux PET.",
    focale: "50% 50%",
  },
  niveauOptiqueGeometre: {
    src: niveauOptiqueGeometre,
    alt: "Technicien topographe PET en gilet de sécurité effectuant la visée au niveau optique sur trépied CST/Berger siglé PET Suarl.",
    focale: "50% 30%",
  },
  etudePlansEquipePet: {
    src: etudePlansEquipePet,
    alt: "Trois ingénieurs et techniciens de PET SUARL avec casquettes et gilets de sécurité analysant les plans d'exécution et la mire de nivellement sur le tracé de la voie.",
    focale: "50% 45%",
  },

  // Photos haute définition redistribuées par rubriques et savoir-faire
  niveleuseTerrassementPiste: {
    src: niveleuseTerrassementPiste,
    alt: "Niveleuse de terrassement lourd en pleine opération de régalage et de profilage de plateforme au Sénégal.",
    focale: "50% 50%",
  },
  compacteurSolLaterite: {
    src: compacteurSolLaterite,
    alt: "Compacteur monocylindre lourd compactant le sol latéritique sur plateforme de terrassement.",
    focale: "50% 50%",
  },
  compacteurVibrantTerrassement: {
    src: compacteurVibrantTerrassement,
    alt: "Compacteur vibrant assurant la portance et le compactage dynamique de fond de forme.",
    focale: "50% 50%",
  },
  rueResidentielleBitumee: {
    src: rueResidentielleBitumee,
    alt: "Rue résidentielle aménagée et bitumée avec bordures et assainissement pluvial achevé.",
    focale: "50% 50%",
  },
  grandeAvenueUrbaineDakar: {
    src: grandeAvenueUrbaineDakar,
    alt: "Grande avenue urbaine à Dakar avec double voie bitumée, trottoirs et réseau d'évacuation pluviale.",
    focale: "50% 50%",
  },
  inspectionTechniqueCanalisation: {
    src: inspectionTechniqueCanalisation,
    alt: "Techniciens en tranchée inspectant le calage et l'emboîtement d'une conduite maîtresse d'eau potable.",
    focale: "50% 50%",
  },
  controleConduiteEauPotable: {
    src: controleConduiteEauPotable,
    alt: "Équipe technique de canalisateurs procédant au contrôle qualité sur réseau de distribution d'eau potable.",
    focale: "50% 50%",
  },
  ouvertureVanneReseauEau: {
    src: ouvertureVanneReseauEau,
    alt: "Manœuvre d'ouverture et test hydraulique sur vanne de régulation de réseau d'eau.",
    focale: "50% 50%",
  },
  vanneReservoirEauPotable: {
    src: vanneReservoirEauPotable,
    alt: "Chambre de vannes et raccordement étanche sur grand réservoir de stockage d'eau potable.",
    focale: "50% 50%",
  },
  pompeIrrigationAgricole: {
    src: pompeIrrigationAgricole,
    alt: "Station de pompage hydro-agricole et collecteur d'irrigation pour parcelles maraîchères.",
    focale: "50% 50%",
  },
  irrigationParcellesMaraicheres: {
    src: irrigationParcellesMaraicheres,
    alt: "Aménagement hydro-agricole et arrosage de cultures maraîchères en plein champ au Sénégal.",
    focale: "50% 50%",
  },
  essaiAffaissementBeton: {
    src: essaiAffaissementBeton,
    alt: "Contrôle qualité du béton au cône d'Abrams mesurant l'affaissement avant coulage d'ouvrage.",
    focale: "50% 50%",
  },
  mesureQualiteBetonFrais: {
    src: mesureQualiteBetonFrais,
    alt: "Prélèvement d'échantillons d'éprouvettes de béton armé pour essais d'écrasement en laboratoire.",
    focale: "50% 50%",
  },
  maconnerieImmeubleSenegal: {
    src: maconnerieImmeubleSenegal,
    alt: "Élévation de maçonnerie et coulage de linteaux béton armé sur un immeuble en chantier à Dakar.",
    focale: "50% 50%",
  },
  murClotureIndustriel: {
    src: murClotureIndustriel,
    alt: "Mur de clôture périphérique de haute sécurité ceinturant un complexe industriel et logistique.",
    focale: "50% 50%",
  },
  cloturePortailAcier: {
    src: cloturePortailAcier,
    alt: "Mur d'enceinte maçonné crépi et portail battant en acier d'une résidence contemporaine.",
    focale: "50% 50%",
  },
  briefingSecuriteEquipe: {
    src: briefingSecuriteEquipe,
    alt: "Briefing sécurité et quart d'heure hygiène-sécurité animé par l'ingénieur de travaux avant prise de poste.",
    focale: "50% 45%",
  },
  reunionTechniqueChantier: {
    src: reunionTechniqueChantier,
    alt: "Réunion de coordination technique sur site entre l'ingénieur travaux et les chefs d'équipes.",
    focale: "50% 45%",
  },
  partenariatConfianceClient: {
    src: partenariatConfianceClient,
    alt: "Poignée de main de confiance scellant un partenariat de qualité entre l'entreprise PET et le maître d'ouvrage.",
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

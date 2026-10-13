/**
 * Partenaires et clients de référence de PARTENAIRE ENTREPRISE TRAVAUX SUARL.
 * Données réelles documentées sur nos panneaux de chantiers officiels (ISDND Meckhé).
 */
export type Partenaire = { nom: string; logo: string; url?: string };

export const partenaires: Partenaire[] = [
  { nom: "Agence Française de Développement (AFD)", logo: "/brand/partenaires/afd.svg" },
  { nom: "Office des Forages Ruraux (OFOR)", logo: "/brand/partenaires/ofor.svg" },
  { nom: "Programme Agricole Italie-Sénégal (PAIS)", logo: "/brand/partenaires/pais.svg" },
  { nom: "SETEC Infrastructures Afrique", logo: "/brand/partenaires/setec.svg" },
  { nom: "Commune de Meckhé (Maître d'Ouvrage)", logo: "/brand/partenaires/commune-meckhe.svg" },
  { nom: "GESCOD Coopération Décentralisée", logo: "/brand/partenaires/gescod.svg" },
];

export type PartenaireInstitutionnel = {
  nom: string;
  sigle: string;
  role: string;
  projet: string;
  description: string;
  type: "bailleur" | "maitrise-ouvrage" | "maitrise-oeuvre" | "cooperation";
};

export const partenairesOfficiels: PartenaireInstitutionnel[] = [
  {
    nom: "Office des Forages Ruraux",
    sigle: "OFOR",
    role: "Maître d'Ouvrage Public & Hydraulique Rurale",
    projet: "Infrastructures d'adduction et réseaux d'eau potable",
    description: "Établissement public assurant la gestion, le développement et la pérennité du patrimoine de l'hydraulique rurale au Sénégal.",
    type: "maitrise-ouvrage",
  },
  {
    nom: "Programme Agricole Italie-Sénégal",
    sigle: "PAIS",
    role: "Coopération & Développement Agricole",
    projet: "Aménagements hydro-agricoles et ouvrages de maîtrise de l'eau",
    description: "Programme de coopération bilatérale dédié à la valorisation agricole, aux forages et aux réseaux d'irrigation structurants.",
    type: "cooperation",
  },
  {
    nom: "Agence Française de Développement",
    sigle: "AFD",
    role: "Bailleur de fonds international",
    projet: "Construction de l'ISDND (Installation de Stockage de Déchets Non Dangereux)",
    description: "Financement d'infrastructures environnementales durables et conformes aux standards internationaux.",
    type: "bailleur",
  },
  {
    nom: "Commune de Meckhé",
    sigle: "Meckhé",
    role: "Maître d'Ouvrage",
    projet: "Aménagement ISDND & infrastructures territoriales",
    description: "Collectivité territoriale sénégalaise engagée dans la modernisation et la salubrité environnementale.",
    type: "maitrise-ouvrage",
  },
  {
    nom: "SETEC Infrastructures Afrique",
    sigle: "SETEC",
    role: "Maître d'Œuvre & Ingénierie",
    projet: "Contrôle technique et supervision des travaux",
    description: "Cabinet d'ingénierie internationale veillant au strict respect des règles de l'art et des tolérances d'exécution.",
    type: "maitrise-oeuvre",
  },
  {
    nom: "GESCOD",
    sigle: "GESCOD",
    role: "Appui à la Maîtrise d'Ouvrage",
    projet: "Coopération décentralisée (Saint-Dié-des-Vosges)",
    description: "Grand Est Solidarité et Coopération pour le Développement, appui technique territorial.",
    type: "cooperation",
  },
];

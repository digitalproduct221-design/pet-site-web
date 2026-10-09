/**
 * « Votre projet » : on entre par le besoin du client plutôt que par nos métiers.
 * Les prestations citées sont celles de content/entreprise.json ; les documents
 * à préparer sont des conseils pour une demande de devis complète.
 */
import type { PhotoId } from "./photos";

export type Besoin = {
  slug: string;
  titre: string;
  question: string;
  photo: PhotoId;
  /** Domaine principal (pour préremplir le devis et renvoyer vers le savoir-faire). */
  domaine: string;
  prestations: string[];
  preparer: string[];
};

export const besoins: Besoin[] = [
  {
    slug: "construire-un-batiment",
    titre: "Construire un bâtiment",
    question: "Un logement, une école, un atelier ou une usine à construire ?",
    photo: "trancheeLotissement",
    domaine: "batiment",
    prestations: ["Logements", "Écoles et universités", "Ateliers et usines", "Murs de clôture", "Électricité et peinture"],
    preparer: ["Les plans ou un croquis du bâtiment", "La localisation et la surface du terrain", "L'usage prévu et le calendrier souhaité"],
  },
  {
    slug: "viabiliser-un-terrain",
    titre: "Viabiliser un terrain",
    question: "Un terrain ou un lotissement à terrasser, desservir et équiper ?",
    photo: "terrassementEngins",
    domaine: "travaux-publics-vrd",
    prestations: ["Terrassement", "Voiries et réseaux divers", "Routes et pistes"],
    preparer: ["Le plan de masse ou de lotissement", "Un relevé topographique, s'il existe", "Les réseaux à prévoir (eau, assainissement, voirie)"],
  },
  {
    slug: "amener-l-eau",
    titre: "Amener l'eau",
    question: "Une conduite à poser, une station de pompage ou une bâche à eau ?",
    photo: "conduiteOuvrage",
    domaine: "hydraulique",
    prestations: [
      "Pose de conduites de différents diamètres (dont fonte)",
      "Stations de pompage",
      "Bâches à eau",
      "Dalots",
      "Irrigation",
    ],
    preparer: ["Le tracé ou le point de raccordement", "Le diamètre et la nature des conduites, s'ils sont connus", "Les débits ou volumes attendus"],
  },
  {
    slug: "assainir",
    titre: "Assainir",
    question: "Des eaux usées à collecter, traiter ou raccorder ?",
    photo: "dalotRegard",
    domaine: "assainissement",
    prestations: [
      "Stations de traitement des eaux usées",
      "Installation et réhabilitation de réseaux d'eaux usées",
      "Regards de visite",
      "Boîtes de branchement",
      "Réhabilitation de dalots",
    ],
    preparer: ["Le plan du réseau existant ou projeté", "Le nombre de branchements à desservir", "Des photos de l'existant, en cas de réhabilitation"],
  },
  {
    slug: "ouvrage-beton-arme",
    titre: "Bâtir un ouvrage en béton armé",
    question: "Un ouvrage hydraulique, un ouvrage d'art ou des travaux souterrains ?",
    photo: "ferraillageOuvrage",
    domaine: "genie-civil",
    prestations: ["Ouvrages hydrauliques en béton armé", "Travaux souterrains", "Ouvrages d'art"],
    preparer: ["Les plans d'exécution ou l'étude de structure", "Les conditions d'accès au site", "Le calendrier et les contraintes d'exploitation"],
  },
  {
    slug: "rehabiliter-entretenir",
    titre: "Réhabiliter ou entretenir",
    question: "Un réseau, un bâtiment ou une infrastructure à remettre en état ?",
    photo: "poseConduiteTopographie",
    domaine: "assainissement",
    prestations: [
      "Réhabilitation de réseaux d'eaux usées",
      "Réhabilitation de dalots",
      "Entretien des réseaux d'eau, des bâtiments et des infrastructures",
    ],
    preparer: ["Des photos de l'état actuel", "Les plans d'origine, s'ils existent", "Les désordres constatés et leur ancienneté"],
  },
];

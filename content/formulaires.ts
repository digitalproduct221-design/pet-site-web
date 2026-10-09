/**
 * Règles des formulaires, partagées entre le navigateur et l'API (/api/contact),
 * pour que les messages d'erreur soient identiques des deux côtés.
 */
import { domaines } from "./site";

export type TypeFormulaire = "devis" | "candidature";

export const TAILLE_MAX_FICHIER = 10 * 1024 * 1024; // 10 Mo
export const EXTENSIONS_ACCEPTEES = [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"];

export const optionsDomaine = [...domaines.map((d) => d.titre), "Autre ou plusieurs domaines"];

export type Erreurs = Partial<Record<string, string>>;

const texte = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");

const emailValide = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
// Numéros sénégalais (9 chiffres) ou internationaux, espaces et + tolérés.
const telephoneValide = (v: string) => /^\+?[\d\s.-]{9,20}$/.test(v) && v.replace(/\D/g, "").length >= 9;

/** Valide un formulaire ; renvoie un message par champ en erreur. */
export function valider(type: TypeFormulaire, donnees: FormData): Erreurs {
  const e: Erreurs = {};
  const nom = texte(donnees.get("nom"));
  const email = texte(donnees.get("email"));
  const telephone = texte(donnees.get("telephone"));
  const message = texte(donnees.get("message"));

  if (nom.length < 2) e.nom = "Indiquez votre nom et votre prénom.";
  if (!email) e.email = "Indiquez votre adresse e-mail pour que nous puissions vous répondre.";
  else if (!emailValide(email)) e.email = "Cette adresse e-mail semble incomplète. Exemple : nom@entreprise.sn";
  if (!telephone) e.telephone = "Indiquez un numéro où vous joindre.";
  else if (!telephoneValide(telephone)) e.telephone = "Ce numéro semble incomplet. Exemple : 77 597 01 98";

  if (type === "devis") {
    const domaine = texte(donnees.get("domaine"));
    if (!optionsDomaine.includes(domaine)) e.domaine = "Choisissez le domaine concerné par votre projet.";
    if (message.length < 20) e.message = "Décrivez votre projet en quelques phrases (20 caractères au moins) : nature des travaux, lieu, délais.";
  } else {
    const poste = texte(donnees.get("poste"));
    if (poste.length < 2) e.poste = "Indiquez le poste qui vous intéresse.";
    const cv = donnees.get("fichier");
    if (!(cv instanceof File) || cv.size === 0) e.fichier = "Joignez votre CV (PDF, Word ou image).";
  }

  const fichier = donnees.get("fichier");
  if (fichier instanceof File && fichier.size > 0) {
    const nomFichier = fichier.name.toLowerCase();
    if (!EXTENSIONS_ACCEPTEES.some((ext) => nomFichier.endsWith(ext))) e.fichier = "Format non accepté. Envoyez un PDF, un document Word ou une image (JPG, PNG).";
    else if (fichier.size > TAILLE_MAX_FICHIER) e.fichier = "Ce fichier dépasse 10 Mo. Compressez-le ou envoyez-le par e-mail.";
  }

  if (donnees.get("consentement") !== "oui") e.consentement = "Cochez cette case pour que nous puissions traiter votre demande.";
  return e;
}

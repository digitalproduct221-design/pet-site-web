/**
 * Partenaires et clients de référence, avec leur accord. Vide pour l'instant :
 * la section « Ils nous font confiance » de l'accueil reste masquée tant que
 * cette liste est vide. Logo : fichier dans public/partenaires/ (SVG ou PNG transparent).
 */
export type Partenaire = { nom: string; logo: string; url?: string };

export const partenaires: Partenaire[] = [];

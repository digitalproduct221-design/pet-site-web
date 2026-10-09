/**
 * Témoignages de clients, réels et validés par leurs auteurs. Vide pour l'instant :
 * la section « Ils en parlent » de l'accueil reste masquée tant que cette liste est vide.
 */
export type Temoignage = { citation: string; auteur: string; fonction?: string; organisation?: string };

export const temoignages: Temoignage[] = [];

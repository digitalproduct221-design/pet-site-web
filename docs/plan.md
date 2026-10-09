# Plan de construction

Chaque phase se termine par : lancement du site, capture, corrections, commit.

## Phase A : fondations
- Next.js 16 + TypeScript + Tailwind 4, Motion, Phosphor, Radix.
- Jetons à trois niveaux (primitifs, sémantiques, composants) dans `app/globals.css`.
- Polices locales via `next/font` ; images préparées par `scripts/prepare-images.mjs`.
- Données : `content/entreprise.json` (faits), `content/site.ts` (navigation, slogan, liens), `content/exemples.ts` (EXEMPLE).
- Composants de base : `Equerres`, `PhotoCadre` (composant image unique), `Bouton`, `Conteneur`, `Section`, `Revele`.

## Phase B : navigation
- Barre du haut, header collant (réduction et verre au défilement), méga-menu Radix à 3 colonnes (souris, clavier, toucher), recherche plein écran.
- Menu mobile plein écran en accordéon, barre d'actions mobile (Appeler, WhatsApp, Devis).
- Footer en cartouche.

## Phase C : accueil
Hero, règle graduée des chiffres, présentation, savoir-faire en panneaux, réalisations en mosaïque, pourquoi PET, frise de méthode, carrières, appel final.

## Phase D : pages intérieures
L'entreprise, Savoir-faire (index + 5 pages domaine), Réalisations (filtres + détail), Engagements, Actualités (liste + article), Carrières (offres + candidature), Contact et devis, Mentions légales, 404.

## Phase E : SEO, performance, accessibilité
Metadata par page, Open Graph, JSON-LD Organization, sitemap, robots, `lang="fr"`, images optimisées, focus, contrastes, mouvement réduit.

## Phase F : vérification
Captures à 360, 768, 1024 et 1440 px ; audits web-design-guidelines, accessibilité, Impeccable (critique, audit, polish) ; revue finale par l'agent `impeccable-finish-reviewer` ; `DESIGN.md` par `impeccable-documenter`.

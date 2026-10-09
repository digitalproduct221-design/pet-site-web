# PET – Site web (Partenaire Entreprise Travaux SUARL)

Site vitrine premium d'une entreprise BTP de Dakar (Sénégal). Lis ce fichier avant toute tâche, puis `content/entreprise.json` et `docs/design-brief.md`.

## Source de vérité
- Contenu et faits : `content/entreprise.json`. N'invente jamais de chiffre, de client ni de projet. Toute donnée d'exemple doit être signalée `// EXEMPLE` et regroupée dans un seul fichier de données.
- Identité visuelle : `docs/design-brief.md`.
- Brief complet initial : `prompts/prompt-ai-studio-PET.md`.
- Logo : `assets/logo/logo-PET.png`. Photos de chantier : `assets/photos/01…11-*.png` (ignorer `_planche-complete.png`).
- Documents d'origine du client : `docs/originaux/`.

## Stack cible
Next.js (App Router) + TypeScript + Tailwind CSS. Composants réutilisables, tokens de design dans la config Tailwind. (Remplace le choix Vite du premier prompt : meilleur SEO et performance pour un site vitrine.) Prompt de référence pour Claude Code : `prompts/prompt-claude-code.md`.

## Règles
- Langue du site : français (structure prête pour l'anglais ensuite).
- Mobile first : tester à 360, 768, 1024 et 1440 px.
- Accessibilité AA, `alt` sur toutes les images, navigation clavier du méga-menu, `prefers-reduced-motion` respecté.
- Aucun lorem ipsum. Orthographe soignée : le document d'origine contient des fautes, ne pas les reproduire.
- Le nom correct est **PARTENAIRE ENTREPRISE TRAVAUX SUARL** (sigle PET), pas « SURAL ».
- Les photos sont de basse résolution (extraites d'une bâche) : ne pas les agrandir en plein écran sans voile ni cadrage. À remplacer par les originaux dès qu'ils sont disponibles.

## Définition de « terminé »
Toutes les pages du brief sont navigables, le méga-menu fonctionne (survol, clavier, mobile), aucun lien mort, build sans erreur, rendu vérifié aux 4 largeurs.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

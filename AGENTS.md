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

# PROMPT À COLLER DANS CLAUDE CODE (dossier PET-site-web)

Tu travailles dans le dossier `PET-site-web`. Construis de bout en bout le site vitrine de **PARTENAIRE ENTREPRISE TRAVAUX SUARL (PET)**, entreprise de BTP de Dakar. Je veux un résultat de niveau agence haut de gamme, à l'identité unique, pas un template. Travaille de façon autonome, sans me poser de questions sauf blocage réel : en cas de doute, choisis l'option la plus raisonnable et note-la dans `docs/decisions.md`.

## 0. Lis d'abord (dans cet ordre)
1. `AGENTS.md` (règles du projet)
2. `content/entreprise.json` (seule source de vérité des faits)
3. `docs/design-brief.md` (identité, menus, pages)
4. `prompts/prompt-ai-studio-PET.md` (brief fonctionnel détaillé : sections de l'accueil, pages, interactions)
5. `assets/logo/logo-PET.png` et les photos de `assets/photos/01…11-*.png`. Regarde-les vraiment avant de concevoir. Ignore `_planche-complete.png`.

Inspirations structurelles : Eiffage Sénégal (méga-menus pleine largeur à 3 colonnes) et NGE (chiffres clés animés, bouton d'action permanent, bloc offres d'emploi). Ne copie ni leurs couleurs, ni leurs polices, ni leur mise en page.

## 1. Skills à mobiliser (invoque-les réellement avec l'outil Skill, ne les imite pas)
**Cadrage et plan**
- `claude-mem:make-plan` : plan en phases. Puis `claude-mem:do` : exécution phase par phase avec sous-agents.

**Direction artistique et conception**
- `impeccable` : mode « shape » pour fixer la direction avant de coder, puis « craft » pour construire. Rédige le contrat de direction dans `docs/direction.md`.
- `design-taste-frontend` et `high-end-visual-design` : interdire tout rendu générique d'IA (cartes identiques, dégradés violets, espacements timides). Pré-contrôle strict avant chaque page.
- `ui-ux-pro-max` : recherche de familles de polices et de variantes de palette cohérentes avec le logo.
- `brand` : cohérence d'identité (logo, équerres, ton de voix).
- `design-system` : jetons de design à trois niveaux (primitifs → sémantiques → composants) en variables CSS et dans la config Tailwind.

**Implémentation**
- `ui-styling` : Tailwind et composants accessibles (shadcn/ui + Radix si utile, notamment pour le méga-menu, les dialogues, l'accordéon mobile).
- `vercel-react-best-practices` : performance React/Next.js (composants serveur par défaut, imports, images, polices).
- `apple-design` : mouvement fluide et physique (ressorts, transitions interruptibles, `prefers-reduced-motion`).
- `glassmorphism` : uniquement pour le header au défilement et la barre d'actions mobile, avec repli accessible. Pas ailleurs.
- `design:ux-copy` : textes des boutons, formulaires, messages d'erreur, états vides.

**Vérification (obligatoire)**
- `agent-browser` ou `playwright-cli` : lancer le site, naviguer, capturer et inspecter chaque page à 360, 768, 1024 et 1440 px.
- `web-design-guidelines` et `design:accessibility-review` : audit conformité et accessibilité AA.
- `impeccable` : passes « critique », « audit » puis « polish ».
- Agent `impeccable-finish-reviewer` : revue finale contre `docs/direction.md`. Applique ses corrections prioritaires.
- Agent `impeccable-documenter` : produire `DESIGN.md` à partir du site réellement livré.

Si un skill est introuvable, dis-le en une ligne et continue avec le plus proche. N'utilise pas les skills hors sujet (slides, banner, logo, CIP).

## 2. Stack
**Next.js (App Router) + TypeScript + Tailwind CSS**, export statique possible, animations avec **Motion** (ex-Framer Motion) ou CSS natif. Pas de back-end : les formulaires (devis, candidature) envoient pour l'instant vers un endpoint à brancher (`/api/contact` en stub avec validation) et proposent aussi WhatsApp et e-mail. Mets à jour `AGENTS.md` pour refléter ce choix (remplace la mention Vite) et initialise git avec un premier commit propre. Ne pousse rien en ligne.

## 3. Direction artistique (point de départ, tu peux l'affiner dans `docs/direction.md`)
- Concept : **« La poignée de main qui bâtit »**. Couleurs du logo : bleu royal `#21409A`, bleu nuit `#0B1B3F`, jaune `#F7C61C`, bleu ciel `#5B9BD5`, sable `#F3EBDD`.
- Signature : les deux **équerres d'angle** du logo (jaune en haut à gauche, bleu ciel en bas à droite) comme cadres de photos et de titres, plus un quadrillage de plan technique très discret sur les fonds sombres.
- Typographie : titres condensés très gras, proches du logo (Barlow Condensed, Oswald, ou mieux si `ui-ux-pro-max` propose plus distinctif) ; texte en Manrope ou Inter.
- Chaque page doit avoir au moins un moment visuel marquant (grande typographie, composition asymétrique, détail d'interaction). Interdit : grilles de trois cartes identiques en série, icônes décoratives sans sens, textes lorem ipsum.
- Les photos sont de **basse résolution** (extraites d'une bâche) : cadre-les, applique un voile bleu nuit et évite le plein écran net. Prévois un composant image unique pour pouvoir les remplacer sans toucher au code.
- Logo en PNG sur fond blanc : prépare une version détourée (fond transparent) si c'est faisable proprement, sinon utilise une pastille blanche sur les fonds sombres. Note la limite dans `docs/decisions.md`.

## 4. Périmètre fonctionnel
Reprends intégralement le brief de `prompts/prompt-ai-studio-PET.md` : barre du haut, header collant avec bouton jaune « Demander un devis », **5 méga-menus** pleine largeur (titre + intro / liste de liens avec descriptions / carte image à droite), accessibles au clavier (Échap, flèches, focus visible), accordéon plein écran sur mobile ; accueil en 10 sections ; pages L'entreprise, Savoir-faire (modèle commun, une page par domaine), Réalisations (filtres + détail), Engagements, Actualités, Carrières, Contact et devis (formulaire, carte, WhatsApp, appel) ; barre d'actions fixe sur mobile.

## 5. Règles de contenu (strictes)
- Les faits viennent uniquement de `content/entreprise.json`. **N'invente aucun chiffre, client, certification ou projet.** Chiffres autorisés : 2016, 40+ ans d'expérience cumulée, 5 domaines, 3 types de clients.
- Toute donnée d'exemple (projets, actualités, offres d'emploi) est regroupée dans `content/exemples.ts`, étiquetée **EXEMPLE** dans le code et rendue facile à remplacer. Rien d'exemple ne doit ressembler à une vraie référence client.
- Nom correct : « PARTENAIRE ENTREPRISE TRAVAUX SUARL » (jamais « SURAL »). Orthographe française irréprochable.
- Le slogan proposé est provisoire : isole-le dans une constante.

## 6. Déroulé attendu
1. Lecture des sources, puis `docs/direction.md` (concept, palette finale, typo, composition, mouvement, ce qu'on évite).
2. Plan en phases (`make-plan`).
3. Phase A : fondations (Next, Tailwind, jetons, polices, composants de base, données).
4. Phase B : header, méga-menus, footer, barre mobile.
5. Phase C : accueil complet.
6. Phase D : pages intérieures et formulaires.
7. Phase E : SEO (titres, meta, Open Graph, JSON-LD `Organization`, `lang="fr"`, sitemap), performance, accessibilité.
8. Phase F : vérification navigateur aux 4 largeurs, corrections, passes critique, audit et polish, revue finale, `DESIGN.md`.

À chaque fin de phase, lance le site, vérifie visuellement avec une capture, corrige, puis commit. Ne passe pas à la suite tant qu'un défaut visible reste.

## 7. Critères de réussite
- `npm run build` sans erreur ni avertissement bloquant ; aucun lien mort ; aucune erreur console.
- Toutes les pages navigables et cohérentes visuellement aux 4 largeurs, sans défilement horizontal.
- Méga-menu fluide à la souris, au clavier et au toucher.
- Contrastes AA, `alt` partout, `prefers-reduced-motion` respecté.
- Score Lighthouse visé : Performance ≥ 90, Accessibilité ≥ 95, SEO ≥ 95 (mesure-le si possible).

## 8. Livrable final
Termine par un court rapport : ce qui est fait, comment lancer le site (`npm run dev`), les décisions prises, **la liste précise de ce que je dois fournir ou remplacer** (photos haute définition, logo vectoriel, vrais projets, réseaux sociaux, offres d'emploi, nom du dirigeant, certifications), et les limites connues.

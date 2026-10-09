# Product

<!-- impeccable:product-schema 1 -->

> Fiche déduite des sources du dépôt (`AGENTS.md`, `content/entreprise.json`, `docs/design-brief.md`, `prompts/`), sans entretien : le client a demandé un travail autonome. Les points marqués *(déduit)* sont à confirmer.

## Platform

web

## Stack

Imposée par le client : Next.js (App Router) + TypeScript + Tailwind CSS, animations avec Motion ou CSS natif. Pas de back-end : formulaires vers un endpoint `/api/contact` à brancher, plus WhatsApp et e-mail.

## Users

- **Donneurs d'ordre publics** (collectivités, agences, services techniques) qui vérifient qu'une entreprise sait réaliser des réseaux d'eau, d'assainissement, de voirie ou des bâtiments avant de la consulter. *(déduit)*
- **Clients industriels et privés** (promoteurs, usines, particuliers) qui cherchent un interlocuteur pour un chantier et veulent demander un devis rapidement.
- **Candidats** (ouvriers qualifiés, techniciens, conducteurs de travaux) qui cherchent des offres ou veulent envoyer une candidature spontanée.
- Contexte d'usage : bureaux à Dakar et téléphone sur chantier, souvent en plein soleil et sur réseau mobile variable. *(déduit)*

## Product Purpose

Site vitrine de PARTENAIRE ENTREPRISE TRAVAUX SUARL (PET), entreprise de BTP de Dakar fondée en 2016. Il doit présenter les cinq domaines de l'entreprise, montrer le travail réel sur chantier, inspirer confiance et convertir en demande de devis, appel ou message WhatsApp. Succès : un visiteur comprend en quelques secondes ce que fait PET et sait comment la contacter.

## Positioning

Une entreprise « tous corps d'état » qui couvre à la fois le bâtiment, les travaux publics et VRD, l'hydraulique, l'assainissement et le génie civil, portée par une équipe cumulant plus de 40 ans d'expérience. Le concept de marque est « La poignée de main qui bâtit » : partenariat, confiance, solidité.

## Operating Context

Le visiteur compare plusieurs entreprises, souvent avant un appel d'offres ou une consultation. Il cherche des preuves de réalisations, des domaines précis, des coordonnées directes (téléphones fixes et mobiles, WhatsApp) et un moyen simple de transmettre un dossier (pièce jointe au formulaire de devis).

## Capabilities and Constraints

- Langue : français, structure prête pour l'anglais.
- Chiffres autorisés seulement : 2016, 40+ ans d'expérience cumulée, 5 domaines, 3 types de clients.
- Aucun client, projet, certification ou chiffre inventé. Les données d'exemple (projets, actualités, offres) sont regroupées dans `content/exemples.ts` et étiquetées.
- Photos de chantier en basse résolution, extraites d'une bâche : toujours cadrées et voilées, jamais en plein écran net.
- Accessibilité AA, `prefers-reduced-motion`, navigation clavier du méga-menu, rendu vérifié à 360, 768, 1024 et 1440 px.

## Brand Commitments

- Nom exact : **PARTENAIRE ENTREPRISE TRAVAUX SUARL** (sigle PET), jamais « SURAL ».
- Logo fourni (`assets/logo/logo-PET.png`) : poignée de main bleu et jaune, deux équerres d'angle (jaune en haut à gauche, bleu ciel en bas à droite).
- Couleurs issues du logo : bleu royal `#21409A`, bleu nuit `#0B1B3F`, jaune `#F7C61C`, bleu ciel `#5B9BD5`, sable `#F3EBDD`, texte `#1A1F2E`.
- Titres en police condensée très grasse, proche du logo ; texte en Manrope ou Inter.
- Les équerres servent de cadre aux photos et aux titres ; quadrillage de plan technique discret sur les fonds sombres ; angles vifs (4 à 6 px).
- Slogan provisoire : « Votre partenaire pour bâtir et raccorder le Sénégal ».
- Ton : professionnel, chaleureux et fier.

## Evidence on Hand

- Présentation, valeurs, domaines et prestations : `content/entreprise.json`.
- Photos de chantiers réels : `assets/photos/` (dont terrassement avec engins CAT, pose de conduite fonte, dalot et regards, ferraillage, niveleuse, tranchée en lotissement, pose de conduite avec topographes).
- Références visibles sur les photos : réhabilitation de dalot et construction de regards ; fourniture et pose de conduite fonte ; construction de mur de clôture, bâtiment et voirie.
- Absents, à ne pas inventer : clients nommés, années et lieux des projets, certifications, témoignages, nom du dirigeant, offres d'emploi réelles, liens de réseaux sociaux.

## Product Principles

1. Prouver par le chantier : chaque affirmation s'appuie sur une photo, une prestation ou un fait de la fiche entreprise.
2. Le contact n'est jamais à plus d'un geste : devis, appel et WhatsApp toujours accessibles.
3. Honnêteté des données : tout exemple est étiqueté et remplaçable sans toucher au code.
4. Lisible au soleil et sur mobile d'abord.

## Accessibility & Inclusion

WCAG 2.2 AA : contrastes, `alt` sur toutes les images, focus visible, navigation clavier complète du méga-menu (Échap, flèches), respect de `prefers-reduced-motion` et `prefers-reduced-transparency`.

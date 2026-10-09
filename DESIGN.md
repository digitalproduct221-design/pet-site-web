---
name: PET – Partenaire Entreprise Travaux
description: Site vitrine d'une entreprise BTP de Dakar ; le chantier vu de près, cadré par les équerres du logo.
colors:
  jaune: "#f7c61c"
  jaune-profond: "#e0b00f"
  royal: "#21409a"
  royal-vif: "#2d52bf"
  ciel: "#5b9bd5"
  nuit: "#0b1b3f"
  nuit-profond: "#07122b"
  nuit-clair: "#13264f"
  brume: "#b9c7e6"
  sable: "#f3ebdd"
  sable-soutenu: "#e8dcc6"
  sable-fonce: "#d9c8a9"
  encre: "#1a1f2e"
  encre-douce: "#454b5e"
  blanc: "#fbfaf7"
  blanc-pur: "#ffffff"
  erreur: "#b42318"
  succes: "#1d6b3a"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.75rem, 1.4rem + 5.6vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.005em"
  chiffre:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(3.5rem, 2rem + 6vw, 7rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.005em"
    fontFeature: "\"tnum\", \"lnum\""
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 3.6vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.005em"
  headline-m:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2.2vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Barlow Semi Condensed, Arial Narrow, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.02em"
  label-bouton:
    fontFamily: "Barlow Semi Condensed, Arial Narrow, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    letterSpacing: "0.04em"
  cote:
    fontFamily: "Barlow Semi Condensed, Arial Narrow, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.02em"
rounded:
  chantier: "4px"
  panneau: "6px"
spacing:
  gouttiere-mobile: "16px"
  gouttiere-tablette: "24px"
  gouttiere-bureau: "32px"
  section-mobile: "80px"
  section-bureau: "112px"
  conteneur: "1360px"
  colonne-texte: "672px"
components:
  bouton-primaire:
    backgroundColor: "{colors.jaune}"
    textColor: "{colors.nuit}"
    typography: "{typography.label-bouton}"
    rounded: "{rounded.chantier}"
    padding: "0 24px"
    height: "52px"
  bouton-primaire-survol:
    backgroundColor: "{colors.jaune-profond}"
    textColor: "{colors.nuit}"
  bouton-contour:
    backgroundColor: "transparent"
    textColor: "{colors.royal}"
    typography: "{typography.label-bouton}"
    rounded: "{rounded.chantier}"
    padding: "0 24px"
    height: "52px"
  bouton-contour-survol:
    backgroundColor: "{colors.royal}"
    textColor: "{colors.blanc}"
  bouton-contour-clair:
    backgroundColor: "transparent"
    textColor: "{colors.blanc}"
    typography: "{typography.label-bouton}"
    rounded: "{rounded.chantier}"
    padding: "0 24px"
    height: "52px"
  bouton-contour-clair-survol:
    backgroundColor: "{colors.blanc}"
    textColor: "{colors.nuit}"
  bouton-sombre:
    backgroundColor: "{colors.nuit}"
    textColor: "{colors.blanc}"
    typography: "{typography.label-bouton}"
    rounded: "{rounded.chantier}"
    padding: "0 24px"
    height: "52px"
  bouton-sombre-survol:
    backgroundColor: "{colors.royal}"
    textColor: "{colors.blanc}"
  champ:
    backgroundColor: "{colors.blanc-pur}"
    textColor: "{colors.encre}"
    typography: "{typography.body}"
    rounded: "{rounded.chantier}"
    padding: "14px 16px"
  panneau-verre:
    backgroundColor: "{colors.nuit}"
    textColor: "{colors.blanc}"
    rounded: "{rounded.panneau}"
    padding: "24px"
  mention-exemple:
    backgroundColor: "{colors.sable-soutenu}"
    textColor: "{colors.encre-douce}"
    typography: "{typography.cote}"
    rounded: "{rounded.chantier}"
    padding: "2px 8px"
  lien-megamenu:
    backgroundColor: "transparent"
    textColor: "{colors.nuit}"
    typography: "{typography.label}"
    rounded: "{rounded.chantier}"
    padding: "12px"
  lien-megamenu-survol:
    backgroundColor: "{colors.sable}"
    textColor: "{colors.royal}"
---

# Design System: PET – Partenaire Entreprise Travaux

## Overview

**Creative North Star: "Le chantier vu de près, signé d'une poignée de main"**

Le site se lit comme une suite de planches : une scène sombre et immersive de vrais chantiers, puis des planches claires et aérées sur sable ou blanc cassé, ponctuées d'aplats bleu royal et d'un aplat jaune final. La voix visuelle vient du logo : capitales condensées très grasses, jaune chantier réservé à l'action, et la paire d'équerres (jaune en haut à gauche, bleu ciel en bas à droite) qui vient serrer les moments forts. Densité modérée, grands blancs entre les sections, compositions asymétriques sur grille de douze colonnes.

Depuis la révision client du 9 octobre 2026, le système est sobre en lignes : pas de quadrillage, pas de filets entre les lignes de liste, pas de cases bordées. La profondeur vient des aplats (dégradé nuit vers nuit profond avec halo royal), des voiles bleu nuit sur les photos et du verre liquide posé sur les photos. Les photos de chantier, de basse définition, ne sont jamais nues : toujours cadrées, toujours voilées.

Le mouvement est mesuré et décélérant (une courbe maison unique), il part toujours d'un état déjà lisible et s'efface entièrement sous `prefers-reduced-motion` ; le verre passe à l'opaque sous `prefers-reduced-transparency`.

**Key Characteristics:**
- Capitales Barlow Condensed 800 pour tous les titres, Manrope pour le texte, Barlow Semi Condensed 600 pour les étiquettes et commandes.
- Jaune chantier réservé à l'action principale, à l'équerre haute et aux accents sur fond sombre.
- Alternance de planches : blanc cassé, sable, nuit profond, royal, jaune.
- Équerres du logo comme unique signature linéaire.
- Verre liquide sur les surfaces posées sur photo, verre dépoli pour le header compact et la barre mobile.
- Angles vifs : 4 px pour les commandes et photos, 6 px pour les panneaux et cartes.

## Colors

Une palette tirée du logo : bleus profonds en masse, jaune chantier en ponctuation, sable chaud pour respirer.

### Primary
- **Jaune chantier** (jaune) : bouton « Demander un devis », équerre haute, soulignés actifs du méga-menu, progression du diaporama, troisième ligne du titre du hero, suffixes des chiffres, sélection de texte, focus sur fond sombre. Toujours avec texte nuit ; jamais en texte sur fond clair.
- **Jaune profond** (jaune-profond) : survol du bouton jaune uniquement.

### Secondary
- **Bleu royal** (royal) : grands aplats d'information (chiffres clés, tuiles d'icônes), liens et intitulés de domaine sur fond clair, anneau de focus sur fond clair, survol du bouton sombre, contour du bouton secondaire.
- **Royal vif** (royal-vif) : variante de survol des liens sur fond clair.

### Tertiary
- **Bleu ciel** (ciel) : équerre basse ; étiquettes, icônes et intitulés de domaine sur fond nuit (5,7:1). Jamais en texte sur fond clair (2,8:1).

### Neutral
- **Nuit** (nuit) : fonds sombres, barre du haut, footer, texte des titres sur clair, texte sur jaune.
- **Nuit profond** (nuit-profond) : bas des dégradés de profondeur, teinte de toutes les ombres et des voiles denses.
- **Nuit clair** (nuit-clair) : primitif disponible pour les surfaces sombres intermédiaires.
- **Brume** (brume) : texte secondaire sur nuit et royal.
- **Sable** (sable) : planches claires, survols dans le méga-menu, tuiles d'icônes claires.
- **Sable soutenu** (sable-soutenu) : séparateur discret (ligne du header), fond de la mention « Exemple ».
- **Sable foncé** (sable-fonce) : contour fin des champs de formulaire, chevrons du fil d'Ariane sur clair.
- **Encre** (encre) : texte courant.
- **Encre douce** (encre-douce) : texte secondaire sur clair (8,3:1 sur blanc).
- **Blanc cassé** (blanc) : fond principal, texte sur sombre.
- **Blanc pur** (blanc-pur) : intérieur des champs et des cartes de confirmation.
- **Erreur** (erreur) et **Succès** (succes) : états de formulaire uniquement.

### Named Rules
**The Jaune Rule.** Le jaune signale ce qu'on peut faire (devis, action, focus sur sombre) ou l'équerre haute ; il n'habille jamais une surface décorative, sauf l'aplat de l'appel final, où les boutons passent en nuit.

**The Palette-Only Shadow Rule.** Toute ombre, tout voile et tout liseré est teinté de nuit, nuit profond, royal ou blanc ; jamais de noir pur.

## Typography

**Display Font:** Barlow Condensed 800 (avec Arial Narrow)
**Body Font:** Manrope (avec system-ui)
**Label/Mono Font:** Barlow Semi Condensed 600, romain et italique (avec Arial Narrow)

**Character:** Une condensée de signalisation routière, en capitales serrées, qui parle de voirie et rejoint le mot-symbole du logo ; une sans-serif géométrique chaleureuse pour lire longtemps.

### Hierarchy
- **Display** (800, clamp 44 à 88 px, 0,94) : titre du hero et titres d'en-tête de page, toujours en capitales, avec équerre.
- **Chiffre** (800, clamp 56 à 112 px, 0,9, chiffres tabulaires) : l'année de création et les grands chiffres.
- **Headline** (800, clamp 40 à 60 px, 0,98) : titres de section par défaut.
- **Headline M** (800, clamp 32 à 44 px, 1) : titres de section secondaires, titre de confirmation de formulaire.
- **Title** (800, 24 px, 1,05) : titres de panneaux et de blocs latéraux ; les vignettes de projet utilisent 26 px.
- **Body** (400, 17 px, 1,6) : texte courant ; intros en 18 px, colonne de 38 à 46 rem maximum ; texte secondaire 15 px.
- **Label** (600, 15 à 18 px, +0,02 em) : navigation, intitulés de domaine, légendes, libellés de champ. Intro du méga-menu en italique 20 px.
- **Label bouton** (600, 17 px, +0,04 em, capitales) : boutons et appels d'action.
- **Cote** (600, 13 à 14 px) : légendes de photo ; en capitales espacées (+0,06 à +0,1 em) seulement pour les libellés de données (adresse, fiche projet, mention « Exemple », colonnes du footer).

### Named Rules
**The Title-Carries-Itself Rule.** Aucune étiquette au-dessus d'un titre : le titre porte seul sa section. Les petites capitales espacées ne servent qu'à nommer une donnée qui suit (adresse, téléphone, champ de fiche).

**The Uppercase-Display Rule.** Tout titre est en Barlow Condensed 800 capitales, `text-wrap: balance` ; le texte courant n'est jamais en capitales.

## Layout

Conteneur de 85 rem (1360 px) centré, gouttières de 16, 24 puis 32 px (à 768 et 1024 px). Grille de douze colonnes sur bureau, compositions asymétriques (7 + 5, 5 + 6 décalé, 9 + 3) ; une colonne sur mobile. Points de rupture : 26 rem (xs), 48, 64 (passage au bureau, barre d'actions mobile en dessous), 72 rem (méga-menu complet sur une ligne).

Rythme vertical : sections de 80 px sur mobile et 112 px sur bureau (96 px pour les blocs à photo de fond, 128 px pour quelques planches). Plus d'espace au-dessus d'un titre qu'en dessous ; intro à 24 px du titre, actions à 36 à 40 px.

Header collant de 80 px, réduit à 64 px au défilement, sous une barre du haut nuit de 36 px. Sous 1024 px, une barre d'actions fixe de 68 px (Appeler, WhatsApp, Demander un devis) réserve sa hauteur en bas de page. Le hero occupe au moins toute la hauteur visible sous le header (minimum 38 rem) ; les en-têtes de page au moins min(34 rem, 70 svh).

**The Planche Rule.** Chaque section est une planche à fond plein (blanc cassé, sable, nuit profond, royal ou jaune) ; deux planches voisines ne partagent pas le même fond et aucune ligne ne les sépare.

## Elevation & Depth

Système hybride : les planches sont plates, la profondeur des fonds sombres vient d'un dégradé nuit vers nuit profond avec deux halos royaux discrets ; les ombres sont douces, longues, décalées vers le bas et toujours teintées de bleu nuit. Les photos portent un voile bleu nuit (léger par défaut, latéral ou dense selon le texte posé dessus). Le verre est une couche à part : verre liquide (flou 22 px, saturation 170 %, liseré lumineux en dégradé, reflet qui glisse au survol) sur les surfaces posées sur photo ; verre dépoli clair ou sombre (flou 18 px) pour le header compact et la barre mobile. Repli opaque sans `backdrop-filter` et sous `prefers-reduced-transparency`.

### Shadow Vocabulary
- **Carte** (`0 18px 40px -28px rgb(11 27 63 / 0.45)`) : cartes blanches et filtres au repos sur fond clair.
- **Carte survol** (`0 24px 48px -26px rgb(11 27 63 / 0.55)`) : même carte au survol.
- **Flottante** (`0 30px 60px -30px rgb(7 18 43 / 0.45)`) : panneau du méga-menu, fenêtres.
- **Planche** (`0 24px 48px -24px rgb(7 18 43 / 0.45), 0 2px 6px -2px rgb(7 18 43 / 0.2)`) : photo secondaire qui chevauche une autre photo.
- **Tuile** (`0 14px 30px -14px rgb(33 64 154 / 0.7)`) : tuile d'icône royale.
- **Bouton** (`inset 0 -3px 0 rgb(7 18 43 / 0.18)`) : assise du bouton jaune.
- **Texte** (`text-shadow: 0 2px 24px rgb(7 18 43 / 0.45)`) : titres posés sur photo.

### Named Rules
**The Veiled Photo Rule.** Aucune photo n'apparaît nette et nue : voile bleu nuit au minimum léger, dense sous le texte, et jamais d'agrandissement plein écran sans voile.

**The Glass-On-Photo Rule.** Le verre liquide n'existe que posé sur une photo ou un fond sombre ; sur une planche claire, la même carte devient sable ou blanche avec ombre carte.

## Shapes

Angles vifs, à peine adoucis : 4 px pour les boutons, champs, photos, mentions et tuiles du méga-menu ; 6 px pour les panneaux de verre, cartes blanches et blocs de coordonnées. Les contours sont des ombres internes (2 px pour les boutons secondaires, 1,5 px pour les champs), pas des bordures. Les équerres sont des angles en L : épaisseur 4 px (5 px au hero), taille fluide de 28 à 52 px, posées hors du cadre ; un petit angle de 3 px rappelle l'équerre au survol des boutons.

**The Equerre Rule.** Les équerres sont la seule signature linéaire du site : paire complète sur les photos phares et l'année de création, équerre haute seule sur le titre du hero, les titres d'en-tête de page et les titres de section phares. Ailleurs, aucun filet.

## Components

### Buttons
- **Shape :** angles vifs (4 px), hauteur 52 px, padding horizontal 24 px, libellé en capitales espacées, flèche à droite qui avance de 4 px au survol.
- **Primaire :** jaune, texte nuit, assise intérieure de 3 px ; un seul libellé par intention (« Demander un devis »).
- **Hover / Focus :** passage au jaune profond, petit angle en L nuit qui se dessine en haut à gauche (aussi au focus clavier), enfoncement de 1 px à l'appui ; transition 300 ms sur la courbe maison. Focus : anneau royal de 3 px décalé de 3 px, jaune sur fond sombre.
- **Contour :** contour royal de 2 px, se remplit de royal au survol. **Contour clair** (sur photo) : contour blanc à 70 %, se remplit de blanc. **Sombre :** nuit, passe au royal ; c'est l'action principale sur l'aplat jaune. **Texte :** lien royal souligné au survol.

### Chips
- **Mention « Exemple » :** pastille rectangulaire 4 px, sable soutenu et encre douce (blanc à 10 % et brume sur sombre), capitales 13 px. Obligatoire sur tout contenu d'exemple.
- **Type de contrat :** même forme en jaune et nuit.

### Cards / Containers
- **Vignette de projet :** photo 4:3 voilée qui s'approche de 4 % en 900 ms au survol, puis titre condensé 26 px, domaine en label (royal sur clair, ciel sur sombre), résumé. Pas de fond ni de bordure.
- **Panneau de verre liquide :** 6 px, padding 24 à 32 px, texte blanc ; légende et commandes du diaporama, chiffres clés, fiches projet, offres d'emploi sur fond sombre.
- **Carte blanche :** 6 px, blanc pur, ombre carte, ombre carte survol au survol.
- **Panneaux de savoir-faire (bureau) :** cinq panneaux photo en rangée ; le premier ouvert par défaut, celui survolé ou ciblé au clavier s'élargit (×3,6) en 700 ms, les autres se resserrent et affichent leur titre à la verticale.

### Inputs / Fields
- **Style :** blanc pur, angles 4 px, contour intérieur sable foncé de 1,5 px, padding 14 × 16 px, texte 17 px ; libellé au-dessus en label nuit, mention « (facultatif) » en encre douce.
- **Focus :** contour royal de 2 px et halo royal à 12 % de 4 px.
- **Error / Disabled :** contour erreur de 2 px, message sous le champ avec icône, résumé des erreurs en tête de formulaire (fond erreur à 7 %) ; boutons désactivés à 50 % d'opacité.
- **Dépôt de fichier :** zone en tirets de 2 px sable foncé, royale au survol.

### Navigation
- **Header :** blanc cassé avec une ligne sable intérieure ; au défilement, verre dépoli clair et réduction de 80 à 64 px (500 ms). Entrées en label avec chevron ; l'entrée ouverte ou active reçoit un trait jaune de 3 px qui se trace de gauche à droite.
- **Méga-menu (Radix, validé par le client) :** panneau plein largeur blanc, ombre flottante, trois colonnes (titre et intro italique royale, liens avec tuile d'icône sable qui passe au royal, carte photo à équerres). Entrée 380 ms, sortie 200 ms, glissement latéral de 32 px entre rubriques.
- **Mobile :** menu plein écran sombre en accordéon, barre d'actions fixe en verre sombre (devis en jaune, deux fois plus large).
- **Fil d'Ariane :** label, chevrons ciel sur sombre.

### Équerres (signature)
Deux angles en L, jaune en haut à gauche, ciel en bas à droite, posés hors du cadre et écartés de 14 px ; ils se referment en 700 ms quand le cadre entre dans l'écran (une seule fois) et s'écartent de 6 px au survol ou au focus. Immobiles sous mouvement réduit.

### Diaporama du hero (signature)
Photos en fondu enchaîné (1 400 ms) et zoom lent de 1,02 à 1,12 sur 9 s, sous voile hero ; panneau de verre liquide en bas à droite avec légende, domaine en jaune, compteur tabulaire, précédent, pause, suivant, et segments de progression cliquables. Pause au survol, au focus et hors écran ; aucune lecture automatique sous mouvement réduit.

### Mouvement
Courbe maison `cubic-bezier(0.16, 1, 0.3, 1)` pour les entrées, `cubic-bezier(0.7, 0, 0.84, 0)` pour les sorties. Apparitions au défilement une seule fois (montée de 28 à 32 px, 800 à 900 ms, échelonnées de 90 ms), rideau sur les photos (clip-path depuis 18 %, image qui recule de 1,12 à 1), parallaxe CSS de 8 % sur les fonds d'en-tête, fondu entre pages (View Transitions). Le contenu reste visible sans JavaScript.

## Do's and Don'ts

### Do:
- **Do** réserver le jaune chantier aux actions, à l'équerre haute et aux accents sur fond sombre, toujours avec texte nuit.
- **Do** faire passer toute photo par le cadre unique : angles 4 px, voile bleu nuit, légende sous la photo et jamais posée dessus.
- **Do** construire la profondeur avec le dégradé nuit vers nuit profond et le verre liquide sur photo, avec repli opaque.
- **Do** dessiner les contours en ombres internes (2 px boutons, 1,5 px champs) plutôt qu'en bordures.
- **Do** utiliser la courbe maison pour toute transition et tout couper sous `prefers-reduced-motion`.
- **Do** utiliser les chiffres tabulaires pour les compteurs, téléphones et numéros de diapositive.
- **Do** étiqueter tout contenu d'exemple avec la mention « Exemple ».

### Don't:
- **Don't** réintroduire de quadrillage, de filets entre lignes de liste, de cases bordées ou de règle graduée (révision client du 9 octobre 2026).
- **Don't** poser une petite étiquette au-dessus d'un titre ni numéroter les sections pour décorer.
- **Don't** afficher une photo de chantier nette et nue en plein écran.
- **Don't** utiliser le bleu ciel pour du texte sur fond clair ou sur royal.
- **Don't** utiliser d'ombres noires ou dures, de dégradés violets ni de texte en dégradé.
- **Don't** aligner des cartes identiques en série ni une bande de chiffres en tuiles égales.
- **Don't** arrondir en pilule les boutons, filtres ou étiquettes.
- **Don't** utiliser le verre liquide sur une planche claire.

## Ajouts de la refonte du 9 octobre 2026 (2ᵉ série)

| Élément | Où | Règle |
|---|---|---|
| Profil de terrain | `components/ui/Profil.tsx` | En bas d'une section `relative`, à la couleur du bloc suivant. Trois formes (`terrain`, `talus`, `deblai`), `miroir` pour varier. `arriere` donne une couleur propre à la strate arrière quand le mélange translucide ternirait (jaune ↔ nuit : `text-royal`). |
| Motifs BTP | `components/ui/Motif.tsx`, `public/motifs/` | `courbes`, `ferraillage`, `beton`, `plan`, appliqués en masque CSS. Couleur = `text-*`, opacité entre 0,05 et 0,22. Section parente `relative isolate`. |
| Rideau de transition | `components/layout/TransitionPage.tsx` | Volet jaune puis bleu nuit (parallélogramme en `clip-path`, `translate` animé par WAAPI), logo au centre, barre de chargement si la page tarde. Écran d'accueil seulement si la page met plus de 600 ms à devenir interactive. |
| Hero | `components/accueil/Hero.tsx` (serveur) et `Diaporama.tsx` (client) | Voiles `voile-hero-clair` et `voile-bas-clair` au-dessus des photos (`z-[2]`), `grain` masqué sur mobile. Contrastes mesurés au moins à 5:1. |
| Ruban de valeurs | `components/accueil/RubanValeurs.tsx` | Jaune, -1,6°, défilement continu de 38 s, pause au survol, figé sous mouvement réduit. |
| Galerie | `components/realisations/Galerie.tsx` | Mosaïque et visionneuse Radix Dialog (flèches, ←/→, glisser au doigt). Photo jamais agrandie au-delà de sa largeur d'origine. |
| Carte | `components/ui/CarteDakar.tsx` | MapLibre et OpenFreeMap (style positron), repère PET en goutte nuit cerclée de jaune, gestes coopératifs, chargée à l'approche. |
| Globe | `components/ui/Globe.tsx` | cobe, sable et repère jaune, se pose sur Dakar, rendu suspendu hors de l'écran. |
| Pelleteuse | `components/ui/Pelleteuse.tsx` | SVG au trait (`currentColor`), cycle de creusement de 5,6 s, en pause hors de l'écran. |
| Bord des champs | jeton `--color-contour` (#7d725e) | 4,6:1 sur blanc. |

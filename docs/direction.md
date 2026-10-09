# Direction artistique – PET

Document de travail (non publié sur le site). Il fixe la direction avant le code ; `DESIGN.md` sera rédigé à la fin, à partir du site livré.

## Lecture du brief

Site vitrine B2B pour donneurs d'ordre publics, industriels et privés de Dakar, au langage « plan de chantier » éditorial et solide, sur une base Next.js + Tailwind + Motion, typographie condensée de signalisation.

- Mode Impeccable : **Persuade** (le visiteur doit décider de contacter PET).
- Réglages : variété de composition 7, mouvement 5, densité 4. Une entreprise de travaux doit d'abord inspirer confiance : composition affirmée, mouvement mesuré.
- Parcours de construction : **code direct**, sans maquette préalable (aucun outil de génération d'images ici). L'ambition est donc portée par ce contrat et vérifiée à la revue finale.

## Contrat de direction

**THÈSE.** Le site est un plan d'exécution signé par une poignée de main : chaque page se lit comme une planche de chantier, cadrée par les deux équerres du logo, avec son cartouche et son quadrillage. Il refuse le gabarit BTP par défaut : diaporama plein écran, trois cartes de services identiques, bande de chiffres générique.

**MONDE PROPRE.** Bleu nuit `#0B1B3F` quadrillé comme un calque de plan ; sable `#F3EBDD` pour les planches claires ; bleu royal `#21409A` pour les grands aplats d'information ; jaune chantier `#F7C61C` réservé aux actions et à l'équerre haute ; bleu ciel `#5B9BD5` pour l'équerre basse et les cotes. Titres Barlow Condensed 800 en capitales, texte Manrope. Angles vifs (4 px), filets de cote fins, cartouches à cases. Photos toujours dans un cadre à équerres, sous voile bleu nuit.

**RÉCIT.** Le visiteur comprend qui est PET (BTP tous corps d'état à Dakar depuis 2016), voit les chantiers réels par domaine, croit à la solidité de l'équipe et des méthodes, puis demande un devis, appelle ou écrit sur WhatsApp.

**PREMIER ÉCRAN.** Fond bleu nuit quadrillé ; la photo des engins CAT occupe toute la scène sous un voile dense dégradé, et une seconde fenêtre nette de la même photo, cadrée par les équerres, s'avance à droite sur 5 colonnes. À gauche, sur 7 colonnes, le titre en trois lignes « Nous bâtissons. Nous raccordons. Nous durons. » (environ 88 px sur grand écran), l'équerre jaune accrochée à son angle haut gauche, le slogan en dessous, puis « Demander un devis » (jaune) et « Nos savoir-faire » (contour). Le header blanc et la barre du haut bleu nuit restent visibles au-dessus.

**FORME.** Direction imposée par le brief (palette, typographie, équerres, quadrillage) : aucun tirage de concept. Interaction signature : **les équerres se referment**. À l'entrée dans l'écran comme au survol, les deux équerres partent écartées et viennent serrer leur cadre (photo, titre, carte), comme deux mains qui se rejoignent. Grammaire de mouvement : ressorts courts, déplacements depuis un état déjà visible, aucun contenu masqué par défaut.

**FIN.** Unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Palette finale

| Rôle | Jeton | Valeur | Usage |
|---|---|---|---|
| Bleu nuit | `nuit-900` | `#0B1B3F` | Fonds sombres, barre du haut, footer, texte sur jaune |
| Bleu nuit profond | `nuit-950` | `#07122B` | Ombres teintées, voiles |
| Bleu royal | `royal-600` | `#21409A` | Bande de chiffres, liens, accents de titre |
| Bleu royal clair | `royal-500` | `#2D52BF` | Survols de liens sur fond clair |
| Jaune chantier | `jaune-400` | `#F7C61C` | Bouton principal, équerre haute, focus sur fond sombre |
| Jaune profond | `jaune-500` | `#E0B00F` | Survol du bouton jaune |
| Bleu ciel | `ciel-400` | `#5B9BD5` | Équerre basse, cotes, texte secondaire sur fond nuit |
| Sable | `sable-100` | `#F3EBDD` | Fonds clairs de section |
| Sable soutenu | `sable-200` | `#E8DCC6` | Filets et séparateurs sur sable |
| Encre | `encre-900` | `#1A1F2E` | Texte courant |
| Encre douce | `encre-600` | `#454B5E` | Texte secondaire sur fond clair (8,3:1 sur blanc, 7,3:1 sur sable) |
| Brume | `brume-200` | `#B9C7E6` | Texte secondaire sur fonds nuit et royal (10:1 et 5,5:1) |
| Blanc cassé | `blanc` | `#FBFAF7` | Fond principal |

Contrastes calculés (WCAG) : encre sur blanc 15,7:1, encre sur sable 13,9:1, royal sur blanc 8,9:1, royal sur sable 7,8:1, jaune sur nuit 10,5:1, nuit sur jaune 10,5:1, jaune sur royal 5,8:1, ciel sur nuit 5,7:1, blanc sur royal 8,9:1. Le bleu ciel n'est jamais utilisé pour du texte sur fond clair (2,8:1) ni sur royal (3,1:1, réservé aux grands chiffres et aux filets).

Thème : clair, avec des planches sombres. Scène d'usage : bureaux de Dakar et téléphone sur chantier en plein soleil, donc un fond clair pour la lecture et des aplats sombres pour les moments forts. Pas de mode sombre automatique : l'identité repose sur l'alternance sable, nuit et royal voulue par le brief (voir `docs/decisions.md`).

## Typographie

- **Titres** : Barlow Condensed 700 et 800, capitales, interlignage 0,95, approche légère (-0,01 em). Inspirée de la signalisation routière : elle parle de voirie et de VRD et rejoint le mot-symbole du logo. UI/UX Pro Max la propose aussi en tête des familles condensées.
- **Étiquettes, navigation, cotes** : Barlow Semi Condensed 600.
- **Texte** : Manrope 400 à 700, 17 px de base, interlignage 1,6, 65 caractères de largeur. Inter est écarté (trop générique selon les skills de goût).
- Échelle : 14 / 16 / 17 / 20 / 24 / 32 / 44 / 60 / 88 px. Titre principal plafonné à 6 rem.
- Chiffres tabulaires pour les compteurs et les cartouches.

## Composition

- Grille de 12 colonnes, conteneur de 1360 px, gouttières de 16 px (mobile), 24 px (tablette), 32 px (bureau).
- Rythme vertical : sections de 96 à 144 px sur bureau, 64 à 80 px sur mobile ; plus d'espace au-dessus d'un titre qu'en dessous.
- Familles de sections toutes différentes sur l'accueil : scène de hero, règle graduée (chiffres), planche texte et photo, panneaux en accordéon (savoir-faire), mosaïque asymétrique (réalisations), liste éditoriale (pourquoi PET), frise tracée (méthode), tableau d'affichage sombre (carrières), aplat jaune (appel final), cartouche (footer).
- Pas de petites étiquettes au-dessus des titres, pas de numéros de section décoratifs, aucun tiret long dans les textes.

## Mouvement

- Courbe maison : `cubic-bezier(0.16, 1, 0.3, 1)` ; ressorts Motion (raideur 260, amortissement 30) pour les équerres et le méga-menu.
- Un seul moment orchestré par section : équerres qui se referment, compteurs qui défilent avec les graduations, frise qui se trace.
- Parallaxe légère (8 % maximum) sur la photo du hero.
- Sous `prefers-reduced-motion` : tout est immédiatement à l'état final, sans déplacement.
- Verre dépoli uniquement sur le header au défilement et la barre d'actions mobile, avec repli opaque sous `prefers-reduced-transparency`.

## Ton de voix

| Trait | On écrit | On évite |
|---|---|---|
| Solide | « Nous posons les conduites, nous bâtissons les ouvrages, nous tenons les délais. » | « Des solutions innovantes et sur mesure » |
| Chaleureux | « Parlons de votre projet. » | « Contactez notre service commercial » |
| Fier sans fanfaronner | « Plus de 40 ans d'expérience cumulée dans l'équipe » | « Leader incontesté du BTP » |
| Précis | Verbes de chantier : poser, terrasser, ferrailler, raccorder, réhabiliter | Élever, révolutionner, sublimer |

Un seul libellé par intention : « Demander un devis » pour le devis, « Appeler » pour le téléphone, « WhatsApp » pour la messagerie.

## Ce qu'on évite

Dégradés violets, texte en dégradé, cartes identiques en série, icônes décoratives sans rôle, verre dépoli décoratif, ombres noires dures, arrondis en pilule, photos plein écran nettes, étiquettes posées sur les photos, compteurs de chiffres inventés, lorem ipsum.

## Révision du 9 octobre 2026 (retours du client)

Ces retours priment sur ce qui précède.

1. **Moins de lignes.** Le client trouve trop de traits verticaux et horizontaux. Supprimés : le quadrillage de plan sur les fonds sombres, les cases bordées du footer, la règle graduée des chiffres, les filets entre les lignes de listes, les bordures du bandeau des métiers et le trait de la frise. Les équerres restent la seule signature linéaire, réservées au titre du hero, aux titres des en-têtes de page et à quelques photos phares.
2. **Hero immersif.** Comme sur les sites de référence, l'accueil s'ouvre sur un diaporama plein écran : photos de chantier en fondu enchaîné avec un lent zoom, sous un voile bleu nuit dense (les photos basse définition ne sont jamais nettes et nues en plein écran). Commandes accessibles : précédent, suivant, pause ; arrêt au survol et au focus ; pas de défilement automatique sous mouvement réduit.
3. **Luxe et verre liquide.** Les fonds sombres deviennent des aplats profonds (dégradé nuit vers nuit profond, halo royal discret). Le verre liquide (flou, saturation, liseré lumineux, reflet) habille les surfaces posées sur des photos : panneau du diaporama, chiffres clés, offres d'emploi, en-têtes de page, header au défilement, barre mobile. Repli opaque sous `prefers-reduced-transparency`.
4. **Transitions.** Apparitions échelonnées des blocs, photos révélées par un rideau (clip-path), fondu entre les pages (View Transitions de React), sans jamais masquer le contenu par défaut.
5. Le méga-menu est validé tel quel.

## Révision du 9 octobre 2026, deuxième série (référence : eiffage.sn)

- **Hero lumineux** : photos au naturel, voile limité au bloc de texte (mesuré au moins à 5:1), onglets numérotés en bas, volet diagonal entre les photos.
- **Rythme entre les blocs** : profils de terrain irréguliers en deux strates à chaque changement de couleur, ruban de chantier jaune incliné pour les valeurs. Plus aucune rupture franche entre deux aplats.
- **Matière BTP** : motifs au trait en masque, très discrets (courbes de niveau, ferraillage, coupe de béton, trame de plan), jamais derrière un texte long.
- **Mouvement de marque** : transition entre pages en volet jaune puis bleu nuit avec le logo, pelleteuse au trait qui creuse, globe qui se pose sur Dakar. Tout se fige sous mouvement réduit.
- **Contenu honnête** : réalisations = galeries de photos réelles ; « Votre projet » remplace les actualités ; métiers à la place des offres fictives.
- **Inchangé** : le méga-menu, que le client trouve excellent.

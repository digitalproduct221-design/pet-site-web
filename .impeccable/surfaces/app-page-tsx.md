---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/layout.tsx"]
---

# Surface : site vitrine PET (toutes les pages)

Mode : Persuade. Parcours de construction : code direct (pas de génération d'images disponible).

Audience : donneurs d'ordre publics, industriels et privés de Dakar ; candidats. Action : demander un devis, appeler, écrire sur WhatsApp. Preuves : photos de chantiers réels, domaines et prestations de content/entreprise.json. Contraintes : aucun chiffre ni client inventé, exemples étiquetés dans content/exemples.ts, photos basse définition toujours cadrées et voilées.

## Direction contract

THESIS: Le site est le chantier PET vu de près, signé par une poignée de main : un premier écran immersif de vrais chantiers sous voile bleu nuit, puis des planches aérées où les deux équerres du logo cadrent les moments forts et où le verre liquide porte les commandes posées sur photo. Il refuse le gabarit BTP par défaut : diaporama nu sans identité, trois cartes identiques, bande de chiffres en tuiles égales, surcharge de filets (révision client du 9 octobre).

OWN-WORLD: Aplats bleu nuit profonds (dégradé nuit vers nuit profond, halo royal discret), sable #F3EBDD pour les planches claires, bleu royal #21409A en grands aplats, jaune #F7C61C réservé aux actions et à l'équerre haute, bleu ciel #5B9BD5 pour l'équerre basse. Barlow Condensed 800 capitales + Manrope. Angles vifs 4 px. Très peu de lignes (révision client du 9 octobre) : pas de quadrillage, pas de filets ; les équerres sont la seule signature linéaire. Verre liquide (flou, liseré lumineux, reflet) sur les surfaces posées sur photo.

STORY: Le visiteur comprend qui est PET (BTP tous corps d'état, Dakar, 2016), voit les chantiers réels par domaine, croit à la solidité de l'équipe et des méthodes, puis demande un devis, appelle ou écrit sur WhatsApp.

FIRST VIEWPORT: Barre du haut nuit + header blanc (logo, 5 entrées, recherche, bouton jaune « Demander un devis »). Diaporama plein écran (révision client) : photos de chantier en fondu enchaîné et lent zoom sous voile bleu nuit dense ; à gauche, titre en trois lignes « Nous bâtissons. Nous raccordons. Nous durons. » (~88 px) avec l'équerre jaune, slogan, boutons « Demander un devis » (jaune) et « Nos savoir-faire » (contour) ; en bas à droite, un panneau de verre liquide légende la photo (domaine, lien) et porte les commandes (précédent, suivant, pause, progression).

FORM: Direction imposée par le brief puis révisée par le client le 9 octobre 2026 (moins de lignes, hero diaporama immersif, verre liquide, luxe) ; concept-seed non lancé, aucune clé de tirage : exemption consignée dans docs/decisions.md. Interactions signature : le diaporama du hero (fondu, zoom lent, panneau de verre avec commandes) et la paire d'équerres du logo (jaune en haut à gauche, bleu ciel en bas à droite) qui se referme autour du titre du hero, de l'année de création et des photos phares.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

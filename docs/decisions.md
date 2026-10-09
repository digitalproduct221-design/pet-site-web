# Journal des décisions

Choix faits en autonomie quand le brief laissait un doute. Chaque ligne dit ce qui a été décidé et pourquoi ; tout peut être revu.

## Sources et contenus

1. **Photo des engins CAT recadrée depuis la planche.** Le fichier `assets/photos/01-terrassement-engins-cat.png` contient par erreur une mosaïque d'autres photos. La vraie photo (pelle et chargeuse) a été extraite du haut de `_planche-complete.png` par `scripts/prepare-images.mjs`.
2. **Photo `02-piste-laterite` exclue.** Elle porte un filigrane « Adobe Stock » : c'est une image de banque d'images dont les droits ne sont pas acquis. Le domaine Travaux publics et VRD s'appuie sur la photo des engins et sur celle de la niveleuse.
3. **Photos à vérifier.** `06-irrigation-agricole`, `07-cloture-grillage` et `09-immeuble-grue-coffrage` ont l'aspect de photos de banque d'images (cadrage, végétation non sahélienne). Elles sont utilisées parce qu'elles figurent sur la bâche du client, mais leurs droits doivent être confirmés avant la mise en ligne.
4. **Électricité et peinture.** La fiche entreprise en fait une prestation du domaine Bâtiment, pas un sixième domaine. Le lien « Électricité et peinture » du méga-menu mène donc à la section correspondante de la page Bâtiment, ce qui préserve le chiffre « 5 domaines ».
5. **Projets d'exemple fondés sur le réel.** Les réalisations reprennent les trois références visibles sur les photos (dalot et regards, conduite fonte, mur de clôture, bâtiment et voirie) et les autres photos de chantier. Client, lieu et année restent « À renseigner » : rien ne ressemble à une vraie référence client inventée. Tout est dans `content/exemples.ts`, étiqueté EXEMPLE.
6. **Actualités et offres d'emploi** : contenus d'exemple génériques (métiers réellement présents sur les photos : conducteur d'engins, chef d'équipe canalisation, technicien topographe), étiquetés EXEMPLE et signalés comme tels à l'écran.
7. **WhatsApp** : le numéro mobile `77 597 01 98` est utilisé par défaut (`+221775970198`). À confirmer par le client.
8. **Carte** : intégration Google Maps sans clé, centrée sur l'adresse « Rond-point Liberté 6, Dakar ». Elle ne se charge qu'au clic (performance et vie privée), avec un lien direct vers l'itinéraire.
9. **Slogan provisoire** isolé dans la constante `SLOGAN` de `content/site.ts`.
10. **Notre histoire** : seule la date de création (2016) est connue. La section s'en tient à ce fait et aux chiffres autorisés ; les dates clés et premiers chantiers sont à fournir par le client.
10 bis. **Mentions légales** : page créée avec les informations connues et les champs manquants signalés (NINEA, RCCM, directeur de la publication, hébergeur), pour éviter un lien mort dans le footer.

## Identité visuelle

11. **Logo détouré** : le PNG fourni est déjà transparent, sauf des carrés blancs derrière les équerres, qui ont été retirés. Une version inversée (bleu marine remplacé par du blanc cassé) sert sur les fonds sombres, et un emblème recadré (PET, poignée de main, équerres) sert pour le header compact et les icônes. Limite : c'est un traitement de bitmap. Un logo vectoriel (SVG ou AI) reste nécessaire pour l'impression et un rendu parfaitement net.
12. **Typographie** : Barlow Condensed (titres) + Barlow Semi Condensed (étiquettes) + Manrope (texte), servies en local par `next/font`. Barlow est issue de la signalisation routière, ce qui rejoint les métiers de voirie et le mot-symbole du logo. Inter a été écartée car jugée trop générique par les skills de goût.
13. **Angles vifs (4 px)** comme le demande le brief, plutôt que les grands arrondis et pilules recommandés par `high-end-visual-design` : le brief prime.
14. **Pas de mode sombre automatique.** `design-taste-frontend` le recommande, mais l'identité repose sur l'alternance voulue entre planches sable, nuit et royal ; un mode sombre en dupliquerait les rôles sans gain. À reconsidérer si le client le souhaite.
15. **Pas de petites étiquettes au-dessus des titres** ni de numéros de section décoratifs (règle d'Impeccable) ; aucun tiret long dans les textes (règle de Taste Skill).
16. **Verre liquide** : d'abord limité au header et à la barre mobile, puis étendu à la demande du client (9 octobre) aux surfaces posées sur des photos : panneau du diaporama, chiffres clés, offres, en-têtes de page. Repli opaque sous `prefers-reduced-transparency`. C'est une approximation web (`backdrop-filter`), pas le « Liquid Glass » d'Apple.
27. **Hero en diaporama plein écran** (demande du client, 9 octobre) : photos voilées en fondu enchaîné, commandes précédent, suivant et pause, arrêt au survol et au focus, pas d'autodéfilement sous mouvement réduit.
28. **Moins de lignes** (demande du client, 9 octobre) : quadrillage, cartouche bordé, règle graduée, filets de listes et trait de frise retirés ; seules quelques équerres restent.
17. **Icônes** : Phosphor (trait régulier), une seule famille.

## Technique

26. **Méga-menu à partir de 1152 px.** Sous cette largeur, les cinq rubriques, la recherche et « Demander un devis » ne tiennent pas sur une seule ligne sans réduire le texte sous le seuil de lisibilité. Entre 1024 et 1151 px, le menu passe donc en accordéon plein écran, comme sur mobile.

18. **Next.js 16 (App Router) avec Cache Components**, tel que généré par `create-next-app`. Les pages sont prérendues ; les pages à paramètre (`[slug]`) déclarent `generateStaticParams`.
19. **Pas d'export statique pur pour l'instant.** Le brief demande à la fois un export statique « possible » et une route `/api/contact` : une route d'API exige un serveur. Le site est donc construit en mode serveur Node (`next start` ou plateforme compatible). Pour un hébergement 100 % statique, il suffira de remplacer `/api/contact` par un service de formulaires (Formspree, fonction serverless) et d'activer `output: "export"`.
20. **Tailwind CSS 4** : les jetons sont déclarés dans `app/globals.css` via `@theme`, qui remplace le fichier `tailwind.config` des versions précédentes.
21. **Formulaires** : validation côté client et côté serveur dans `/api/contact`. L'endpoint renvoie une réponse simulée tant qu'aucun service d'envoi n'est branché, et le visiteur se voit proposer l'e-mail et WhatsApp en solution de repli.
22. **Recherche** : index statique des pages et contenus, filtré côté navigateur dans une fenêtre plein écran.
23. **Fichiers en double à la racine** (`logo-PET.png`, `photos-chantiers-bache.png`, `prompt-ai-studio-PET.md`) laissés en place : ils doublonnent `assets/` et `prompts/` et peuvent être supprimés par le client.
24. **Skills `claude-mem:make-plan` et `claude-mem:do` introuvables dans cette session** (plugin non rechargé) : le plan est rédigé à la main dans `docs/plan.md` et exécuté phase par phase.
29. **Pas de tirage de concept Impeccable** (`concept-seed`) : la direction est imposée par le brief (palette, typographie, équerres) puis révisée par le client le 9 octobre. Le contrat de direction le note dans son bloc FORM, sans clé de tirage.
30. **Revue finale (agent impeccable-finish-reviewer)** : disposition « fix ». Corrections appliquées : contrat mis à jour, bande de chiffres recomposée (2016 entre les équerres, trois chiffres en lignes sur une photo visible), libellés au-dessus des titres supprimés, listes sans majuscules en milieu de phrase, « Pourquoi nous rejoindre » recomposé, filets de la recherche retirés, paire d'équerres sur le titre du hero, voile léger sur toutes les photos.
25. **Entretien Impeccable non mené** : le client a demandé un travail sans questions. `PRODUCT.md` est déduit des sources, les déductions y sont signalées.

## Refonte du 9 octobre 2026 (deuxième série de retours du client)

31. **Hero lumineux sur le modèle d'eiffage.sn** (le propriétaire trouvait l'ancien hero trop sombre). Les photos sont affichées au naturel. Le voile se limite au bloc de texte (moitié gauche sur grand écran, ensemble du texte sur mobile) et aux onglets du bas. Le contraste a été mesuré sur les pixels réels des cinq photos, au 95ᵉ centile du fond : au moins 5:1 partout, « Nous durons » en jaune compris. Les onglets numérotés « 01 Terrassement… » reprennent le principe d'Eiffage. Chaque photo entre par un volet diagonal, sauf la première, affichée d'emblée pour le LCP. Seules la photo affichée et la suivante se chargent.
32. **Transition entre les pages en volet diagonal** (demande du client) : un volet jaune puis un volet bleu nuit balaient l'écran, le logo apparaît au centre, puis les volets dévoilent la page. Aucune transition sous mouvement réduit. L'audit n°1 proposait de supprimer l'écran au logo. Il est conservé, puisque l'utilisateur l'a demandé, mais il ne s'affiche que si la page met plus de 600 ms à devenir interactive : sur une connexion normale, on ne le voit jamais.
33. **Motifs BTP en fond** : courbes de niveau générées à partir d'un relief calculé (`public/motifs/courbes-niveau.svg`), treillis de ferraillage, coupe de béton et trame de plan. Ils sont appliqués en masque CSS (composant `Motif`) à faible opacité, sur quelques sections seulement.
34. **Transitions entre les blocs** : des profils de terrain irréguliers en deux strates (composant `Profil`, formes terrain, talus et déblai) remplacent les ruptures nettes de couleur. Un ruban de chantier jaune incliné fait défiler les valeurs.
35. **Réalisations transformées en galeries de photos** : client, lieu et année « à renseigner » sont supprimés, ainsi que la mention « Exemple ». Chaque fiche est une galerie de photos réelles avec une visionneuse plein écran, qui n'agrandit jamais une photo au-delà de sa taille d'origine. La fiche « clôture, bâtiment et voirie » est retirée, faute de photo dont les droits soient sûrs (06, 07 et 09 sont à vérifier). Elle reviendra avec les photos HD. Les deux références citées sur la bâche sont marquées « Référence PET ».
36. **Actualités remplacées par « Votre projet »** (`/votre-projet`). Une recherche sur les sites d'entreprises de BTP montre qu'un client cherche d'abord si l'entreprise fait son type de travaux, des preuves en photos, puis un devis simple. La page présente six besoins, chacun avec les prestations tirées de `entreprise.json`, les documents à préparer et un devis prérempli (`/contact?besoin=…`). `/actualites` redirige de façon permanente vers cette page.
37. **Offres d'emploi fictives supprimées** : la page Carrières présente les métiers exercés sur nos chantiers (ce ne sont pas des postes ouverts) et la candidature spontanée, avec le métier prérempli. La rubrique Carrières passe sous « L'entreprise » dans le méga-menu.
38. **Carte interactive** : MapLibre avec les tuiles libres d'OpenFreeMap, sans clé ni traceur. Les fonds CARTO exigent désormais une clé. La carte se charge à l'approche, avec des gestes coopératifs. Le repère est placé sur le rond-point Liberté 6 (14,72863 N ; 17,45723 O, OpenStreetMap). **L'emplacement exact des bureaux est à confirmer par PET.**
39. **Globe** (remplacé par la carte illustrée, voir 46). **Pelleteuse animée** en SVG dans l'appel final, sur la page 404 et dans la confirmation des formulaires.
40. **Voile photo général allégé** (`--voile-photo`) : le site paraissait sombre.
41. **Audit n°1 (session d'audit indépendante)**, traité dans la refonte :
    - URL de base corrigée : repli sur le domaine Vercel, plus aucune occurrence de « localhost » ;
    - en-têtes de sécurité (CSP adaptée à la carte) et cache des fichiers statiques sur 30 jours, sans `immutable`, car le logo et les photos seront remplacés sous le même nom ;
    - nom accessible des onglets du hero, bord des champs à 4,6:1, focus du dépôt de fichier, cibles tactiles d'au moins 44 px ;
    - apparitions au défilement qui ne masquent plus jamais le contenu ;
    - recherche et menu mobile chargés à la demande, méga-menu Radix chargé seulement sur grand écran, équerres rendues côté serveur ;
    - un seul appel principal dans le hero mobile, accueil mobile ramené de 18 à 13,5 écrans grâce à des carrousels horizontaux.

    Reste ouvert : les photos de 1 250 px en plein écran sur un écran Retina. C'est le prix du hero immersif demandé, et les photos HD le régleront.
42. **Commits inattendus** : deux commits (03:57 et 05:32), suivis d'une mise en ligne sur Vercel, ont été faits sur ce dépôt par un autre processus que cette session. Probablement l'IDE ou une intégration Git. À vérifier par l'utilisateur.
43. **Mise en ligne** : production sur **https://pet-site-web.vercel.app**. Vercel est relié au dépôt GitHub privé `digitalproduct221-design/pet-site-web` : chaque push sur `main` redéploie. Pour un domaine définitif, définir `NEXT_PUBLIC_SITE_URL` dans Vercel.
44. **Interrupteur des photos à droits incertains** : `MASQUER_PHOTOS_A_VERIFIER` dans `content/photos.ts` (désactivé, décision du client). Activé, il retire les photos 06, 07 et 09 partout.
45. **Lighthouse mobile en production** (mesuré depuis une machine chargée, d'où la variance) : accueil 87 à 94, `/realisations` 81 à 96. Accessibilité, bonnes pratiques et SEO à 100.
46. **Le globe laisse place à une carte illustrée du Sénégal** (demande du client : « plus utile, plus illustratif »). Elle montre le contour du pays et les régions en pointillé, les grandes villes comme repères géographiques et la Gambie. Une loupe sur la presqu'île du Cap-Vert pointe le siège (Liberté 6) et ouvre l'itinéraire. Le tracé se dessine à l'entrée dans l'écran. C'est un SVG rendu côté serveur, sans JavaScript ajouté : la bibliothèque cobe est supprimée. Fond de carte geoBoundaries (CC BY 3.0 IGO), simplifié et projeté par le script `scripts/carte-senegal.mjs`. Aucune zone d'intervention n'est revendiquée : les villes ne sont que des repères.
47. **Audit n°2** :
    - **Hero mobile** : le texte descend en bas du hero et la photo se dégage en haut. Sous 640 px, le slogan est masqué (il est repris dans la section suivante et dans le pied de page) et la légende ne reste que pour les lecteurs d'écran.
    - **Voiles** recalibrés par mesure sur les pixels des 5 diapos : au moins 6,3:1 à 360 et 1440 px.
    - **Écrans bas** (1024 × 768) : le titre se règle aussi sur la hauteur et la légende est masquée. Libellés des onglets à partir de 1024 px.
    - **Photos du hero** en qualité 75. Variante 3840 supprimée (`deviceSizes` plafonné à 2560).
    - **Visionneuse** chargée au premier clic.
    - **Barre « Votre projet »** affichée seulement pendant la lecture des besoins.
    - **Ancre au chargement direct** sécurisée.
    - **Méga-menu** : les flèches ouvrent le panneau voisin.
48. **Mentions légales à fournir par le client avant la mise en ligne définitive** : NINEA, RCCM, directeur de la publication. Elles se renseignent dans `mentionsLegales`, dans `content/site.ts`. Tant qu'elles sont vides, leur ligne est masquée. `AFFICHER_MENTIONS_MANQUANTES = true` affiche « À renseigner » pour une relecture. Hébergeur renseigné : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
49. **Non retenu** : intégrer le CSS au HTML (`experimental.inlineCss`). Le HTML compressé passait de 41 à 96 Ko, le CSS étant aussi recopié dans la charge RSC. Ce serait plus lent en 4G.
50. **Troisième série de retours du client** :
    - **Transition entre pages raccourcie** à environ 0,6 s : un liseré jaune devant le volet bleu nuit, le logo en un éclair, aucune pause si la page est prête.
    - **Hero et en-têtes refaits en clair** : texte bleu nuit sur fond blanc ou sable, photo nette sans aucun voile, dans un cadre coupé en biais (le geste du volet). Sur mobile, la photo passe au-dessus du texte. Le diaporama porte une barre de verre clair avec l'intitulé de la diapo, sa légende, les onglets et la pause. « Nous durons. » est surligné en jaune.
    - **La carte du Sénégal quitte l'accueil** pour la page Contact (section « Nous trouver », à côté de la carte interactive du quartier).
    - **Chiffres de l'accueil** en cartes compactes, avec des pictogrammes au trait qui se dessinent (grue, casque, réseau, bâtiments).
51. **Audit n°3 (finitions)** :
    - sélecteur EN retiré tant que la version anglaise n'existe pas ;
    - étiquettes Kaolack et Thiès masquées sous 400 px ;
    - équerres sans écart initial sur mobile (débordement de 10 px) ;
    - saut d'ancre instantané même avec un défilement doux ;
    - repli de la carte interactive (sans WebGL ou sans tuiles après 8 s : fond de plan et itinéraire).

    **Non traité** : les avertissements « Expected value to be of type number », qui viennent du style positron d'OpenFreeMap et non du site.
52. **Page Bâtiment** : son en-tête montre une photo de tranchée de lotissement, faute de photo de bâtiment sûre (la photo 09 a des droits à vérifier). À remplacer dès réception des photos HD.

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

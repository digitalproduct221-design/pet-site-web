# PROMPT À COLLER DANS GOOGLE AI STUDIO (Build)

> À joindre avec le prompt : `logo-PET.png` et `photos-chantiers-bache.png` (les 10 photos de chantier).

---

## RÔLE
Tu es un directeur artistique et développeur front-end senior spécialisé dans les sites d'entreprises de BTP haut de gamme. Crée un site web vitrine **multi-pages, complet, premium et responsive** pour l'entreprise ci-dessous. Le design doit être **unique et mémorable**, jamais générique ni « template ». Il s'inspire de la structure des grands groupes (NGE, Eiffage) mais avec sa propre identité, adaptée à Dakar et au Sénégal.

## L'ENTREPRISE
- **Nom :** PARTENAIRE ENTREPRISE TRAVAUX SUARL (sigle **PET**)
- **Domaines (sous le logo) :** Bâtiment · Hydraulique · Assainissement · Génie civil · VRD
- **Fondée en 2016.** Équipe forte de **plus de 40 ans d'expérience cumulée**.
- **Positionnement :** entreprise de Bâtiment et Travaux Publics, tous corps d'état, au service de clients publics, industriels et privés.
- **Valeurs :** qualité, sécurité (au centre des préoccupations), service, conseil, respect des lieux, choix des matériaux, tenue des délais, satisfaction du client. Personnel qualifié, équipements mis à niveau.
- **Slogan à utiliser :** « Votre partenaire pour bâtir et raccorder le Sénégal » (je peux le changer plus tard).
- **Contact :**
  - Téléphones : 33 827 61 85 · 77 597 01 98 · 78 305 04 44
  - E-mail : partenaire.direction@outlook.com
  - Adresse : Rond-point Liberté 6, Dakar, Sénégal

### Domaines d'activités
1. **Bâtiment** : construction de bâtiments d'habitation et industriels (logements, écoles, universités, ateliers, usines), murs de clôture.
2. **Travaux publics et ouvrages d'art** : routes, ponts, génie civil, voirie.
3. **Hydraulique** : pose de conduites de canalisation de différents diamètres (dont conduites en fonte), stations de pompage, bâches à eau, dalots, irrigation.
4. **Assainissement** : stations de traitement des eaux usées, installation et réhabilitation de réseaux d'eaux usées, regards de visite, boîtes de branchement, réhabilitation de dalots.
5. **VRD** : voiries et réseaux divers, terrassements.
6. **Électricité et peinture.**

### Références visibles sur les photos fournies
Réhabilitation de dalot et construction de regards · Fourniture et pose de conduite fonte · Construction de mur de clôture, bâtiment et voirie · terrassement avec engins (pelle et chargeuse CAT) · ferraillage d'ouvrage hydraulique · bâtiment R+ avec grue · pose de canalisation avec équipe de topographie · piste en latérite · irrigation agricole.

## RÈGLES SUR LE CONTENU
- **N'invente aucun chiffre ni nom de client.** Utilise uniquement : 2016 (fondation), 40+ ans d'expérience cumulée, 5 domaines d'activité, 3 types de clients (public, industriel, privé). Pour les autres éléments (projets, témoignages, offres d'emploi), mets des données d'exemple clairement faciles à remplacer, regroupées dans un seul fichier `data.ts` ou `data.js`.
- Texte en **français**, ton professionnel, chaleureux et fier. Prévois la structure pour ajouter l'anglais plus tard.
- Corrige l'orthographe du texte fourni.
- Utilise les photos jointes : découpe-les en images séparées pour les sections. Si une image manque, utilise des emplacements propres avec un dégradé et une icône, jamais de lorem ipsum.

## IDENTITÉ VISUELLE
**Concept : « La poignée de main qui bâtit »** : partenariat, confiance, solidité.

- **Couleurs (issues du logo) :**
  - Bleu royal PET `#21409A` (principal)
  - Bleu nuit `#0B1B3F` (fonds sombres)
  - Jaune chantier `#F7C61C` (actions, accents)
  - Bleu ciel `#5B9BD5` (secondaire)
  - Sable chaud `#F3EBDD` (fonds clairs, rappel de la terre du Sénégal)
  - Blanc `#FFFFFF`, texte `#1A1F2E`
- **Typographie :** titres en police condensée très grasse, comme le logo (**Barlow Condensed** ou **Oswald**, majuscules possibles pour les grands titres) ; texte en **Manrope** ou **Inter**. Hiérarchie très marquée, très grands titres.
- **Signature graphique :** les deux **équerres d'angle** du logo (jaune en haut à gauche, bleu ciel en bas à droite) reprises comme cadres autour des photos et des titres de section. Motif de plan technique / quadrillage très discret en filigrane sur les fonds sombres. Formes angulaires, peu d'arrondis (4 à 6 px).
- **Photos :** traitement cohérent (léger voile bleu nuit en dégradé sur le hero, coins nets, cadre en équerre jaune au survol).
- **Ambiance :** solide, moderne, humaine. Pas de gradients arc-en-ciel, pas de cartes génériques sans personnalité.

## NAVIGATION
### Barre du haut (fine, bleu nuit)
Téléphone cliquable · e-mail · « Dakar, Sénégal » · sélecteur FR/EN (désactivé pour l'instant) · icônes réseaux sociaux (liens à renseigner).

### Header principal (collant, blanc, ombre légère au défilement)
Logo PET à gauche · menu à 5 entrées · icône recherche · **bouton jaune « Demander un devis »** toujours visible. Le header se réduit légèrement au défilement.

### MÉGA-MENUS pleins écran au survol (desktop) et accordéon plein écran (mobile)
Chaque panneau s'ouvre sous le header sur toute la largeur, avec ce modèle à 3 colonnes :
- **Gauche** : très grand titre de la rubrique + court paragraphe d'introduction en italique de couleur bleu royal.
- **Centre** : liste des sous-pages, chacune avec une petite icône et une ligne de description.
- **Droite** : une carte image mise en avant (photo de chantier avec équerre jaune) + lien « Télécharger la présentation (PDF) » ou « Voir le projet ».

Entrées :
1. **L'entreprise** : Qui sommes-nous · Notre histoire (2016) · Nos valeurs · Qualité et sécurité · Équipe et moyens
2. **Savoir-faire** : Bâtiment · Travaux publics et VRD · Hydraulique · Assainissement · Génie civil et ouvrages d'art · Électricité et peinture
3. **Réalisations** : Tous les projets · Bâtiment · Hydraulique · Assainissement · Routes et VRD (page avec filtres)
4. **Engagements** : Sécurité (QHSE) · Environnement · Local et emploi · Qualité
5. **Actualités et carrières** : Actualités · Offres d'emploi · Candidature spontanée
6. Bouton jaune : **Demander un devis** (et lien « Contact » dans le footer et la page dédiée)

## PAGES À CRÉER
1. **Accueil**, avec ces sections dans l'ordre :
   1. **Hero plein écran** : photo de chantier (engins CAT) avec voile bleu nuit, grand titre « Nous bâtissons. Nous raccordons. Nous durons. » (ou équivalent), deux boutons (« Nos savoir-faire », « Demander un devis »), logo en équerre, indicateur de défilement.
   2. **Bande de chiffres clés animés** (compteurs au scroll) sur fond bleu royal : 2016 (année de création), 40+ ans d'expérience cumulée, 5 domaines d'expertise, 3 types de clients.
   3. **Présentation** : texte à gauche, photo encadrée d'équerres à droite, bouton « Découvrir PET ».
   4. **Nos savoir-faire** : 5 grandes cartes verticales (Bâtiment, Travaux publics et VRD, Hydraulique, Assainissement, Génie civil) avec photo, titre, trait jaune, animation au survol.
   5. **Réalisations en vedette** : carrousel ou grille asymétrique avec les photos fournies et leurs légendes.
   6. **Pourquoi PET ?** : 4 engagements (Qualité, Sécurité, Délais, Satisfaction client) avec icônes.
   7. **Notre manière de travailler** : frise en 4 étapes (Étude et conseil → Planification → Exécution → Livraison et suivi).
   8. **Rejoignez-nous** : bloc façon « offres d'emploi » sur fond bleu nuit avec 3 cartes d'exemple, filtres CDI/CDD/Stage.
   9. **Appel à l'action final** : « Un projet ? Parlons-en. » avec téléphones et bouton devis.
   10. **Footer** riche : logo, adresse, 3 téléphones, e-mail, liens rapides, mini-carte de Dakar, mentions légales, copyright.
2. **L'entreprise** (histoire, valeurs, équipe et moyens).
3. **Savoir-faire** (une page par domaine, avec modèle de page commun : hero, description, prestations en liste, galerie, projets liés, CTA).
4. **Réalisations** (grille filtrable par domaine, page de détail projet avec galerie et fiche synthétique : client, lieu, domaine, année, description. Données d'exemple).
5. **Engagements** (sécurité, environnement, local et emploi).
6. **Actualités** (liste + article type).
7. **Carrières** (offres d'exemple + formulaire de candidature spontanée).
8. **Contact et devis** : formulaire (nom, société, e-mail, téléphone, domaine concerné, description, pièce jointe), coordonnées, carte intégrée centrée sur Rond-point Liberté 6, Dakar, boutons WhatsApp et appel.

## INTERACTIONS ET ANIMATIONS
- Apparition douce des sections au scroll (fade et léger glissement), compteurs animés, parallaxe léger sur le hero.
- Méga-menu avec transition fluide et fermeture au clic extérieur et à la touche Échap.
- Boutons : le jaune se remplit au survol avec un effet d'équerre.
- Respect de `prefers-reduced-motion`.
- **Bouton flottant WhatsApp** et bouton « Appeler » sur mobile (barre d'actions fixe en bas).
- Recherche : overlay plein écran simple.

## EXIGENCES TECHNIQUES
- **React + Vite + TypeScript + Tailwind CSS**, avec React Router pour la navigation multi-pages. Composants réutilisables (`Header`, `MegaMenu`, `Hero`, `StatsBand`, `ServiceCard`, `ProjectCard`, `CTA`, `Footer`, etc.).
- Toutes les couleurs et polices en variables de design (tokens) dans la config Tailwind.
- Code propre, commenté, avec un fichier de données unique pour les textes, projets, services et offres.
- **Responsive mobile first** : testé à 360, 768, 1024 et 1440 px. Menu mobile en plein écran.
- Accessibilité : contrastes AA, focus visibles, balises sémantiques, `alt` sur toutes les images, navigation clavier du méga-menu.
- SEO de base : titres de page, meta description, Open Graph, `lang="fr"`, balisage JSON-LD `Organization`.
- Performance : images optimisées et en chargement différé (lazy-loading).

## LIVRABLE
Génère le site complet et fonctionnel dès cette première version, avec toutes les pages navigables et des données d'exemple propres. À la fin, liste-moi les éléments à remplacer ou fournir (photos haute définition, réseaux sociaux, vrais projets, offres d'emploi, logo vectoriel, lien de la carte).

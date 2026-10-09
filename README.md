# PET – Site web

Site vitrine de **PARTENAIRE ENTREPRISE TRAVAUX SUARL** (PET), entreprise de BTP à Dakar.
Next.js 16 (App Router) + TypeScript + Tailwind CSS 4.

## Lancer le site

```bash
npm install
npm run dev            # développement : http://localhost:3000
npm run build && npm start   # version de production
```

Variable à définir au déploiement : `NEXT_PUBLIC_SITE_URL` (domaine public, ex. `https://www.exemple.sn`), utilisée pour le sitemap, les liens canoniques et le partage sur les réseaux.

## Où modifier quoi

| Besoin | Fichier |
|---|---|
| Faits de l'entreprise (contacts, domaines, valeurs) | `content/entreprise.json` |
| Navigation, slogan (`SLOGAN`), textes des domaines, réseaux sociaux | `content/site.ts` |
| Réalisations (galeries de photos) | `content/realisations.ts` |
| « Votre projet » (besoins, prestations, documents à préparer) | `content/besoins.ts` |
| Métiers (page Carrières), coordonnées GPS de la carte | `content/site.ts` |
| Motifs BTP (courbes de niveau, ferraillage, béton) | `public/motifs/` |
| Photos (texte alternatif, cadrage) | `content/photos.ts` |
| Couleurs, polices, voiles, ombres (jetons de design) | `app/globals.css` |
| Envoi des formulaires | `app/api/contact/route.ts` |

### Remplacer les photos par les originaux HD
1. Déposer les nouveaux fichiers dans `assets/photos/` (mêmes noms) et le logo dans `assets/logo/`.
2. Lancer `npm run images` : les versions du site sont régénérées dans `public/`.

### Brancher l'envoi des formulaires
`/api/contact` valide les demandes mais **n'envoie rien** pour l'instant (le visiteur en est averti et peut écrire par e-mail ou WhatsApp). Ajouter l'envoi (Resend, SMTP…) à l'endroit marqué « À BRANCHER ».

## Documentation
- `AGENTS.md` : consignes du projet.
- `PRODUCT.md` : produit, publics, contraintes.
- `docs/direction.md` : direction artistique (et révisions du client).
- `docs/decisions.md` : décisions prises et points à confirmer.
- `DESIGN.md` : système de design tel que livré.

## Arborescence

```
app/            pages (accueil, entreprise, savoir-faire, réalisations, votre projet,
                engagements, carrières, contact, mentions légales) et API
components/     accueil/, layout/ (header, méga-menu, footer…), ui/, formulaires/
content/        données du site (faits, réalisations, besoins, photos, formulaires)
scripts/        prepare-images.mjs (photos et logo depuis assets/)
assets/         sources du client (logo, photos de la bâche)
docs/           brief, direction, décisions, documents d'origine
```

## Espace admin (`/admin`)

Un espace volontairement simple pour ajouter ou retirer les photos des réalisations, publier des nouvelles du quotidien, des partenaires et des témoignages. Le site se met à jour tout seul après chaque modification.

Mise en service (une fois) :
1. Créer un projet Supabase et appliquer `supabase/migrations/20261009150000_espace_admin.sql`, puis `supabase/seed.sql` (les 7 réalisations actuelles).
2. Dans Vercel, définir `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (Supabase, *Project Settings > API*), puis redéployer.
3. Créer le compte de l'administrateur (Supabase, *Authentication > Users > Add user*, avec e-mail et mot de passe), puis l'autoriser :
   `insert into public.admins (user_id, email) select id, email from auth.users where email = 'adresse@exemple.sn';`

Sans ces variables, le site garde le contenu livré avec lui (`content/`) et `/admin` l'indique.

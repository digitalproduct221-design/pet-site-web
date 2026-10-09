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

## Espace admin (`/admin`) et demandes de devis

Le lien « Espace admin » du pied de page mène à la connexion. L'espace permet de lire les demandes de devis et candidatures, d'ajouter ou retirer les photos des réalisations, de publier des nouvelles, des partenaires et des témoignages. Le site se met à jour tout seul.

Les demandes envoyées par les formulaires sont enregistrées et envoyées par e-mail (Resend) via la fonction `supabase/functions/demande`. Pour changer le destinataire ou l'expéditeur : Supabase, *Edge Functions > Secrets*, variables `DEMANDES_DESTINATAIRES` (plusieurs adresses séparées par des virgules) et `DEMANDES_EXPEDITEUR`.

Mise en service du site (Vercel, *Settings > Environment Variables*, tous les environnements, puis redéployer) :

| Variable | Valeur |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://biehvhzlxacednllfclu.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | la clé « Publishable » (Supabase, *Project Settings > API Keys*) |

Sans ces variables, le site garde le contenu livré avec lui, `/admin` l'indique et les formulaires n'envoient rien.

Ajouter un administrateur : créer l'utilisateur (Supabase, *Authentication > Users*), puis `insert into public.admins (user_id, email) select id, email from auth.users where email = 'adresse@exemple.sn';`.

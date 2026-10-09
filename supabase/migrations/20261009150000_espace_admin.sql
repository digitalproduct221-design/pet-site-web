-- Espace d'administration de PET : réalisations et leurs photos, nouvelles du
-- quotidien, partenaires, témoignages. Lecture publique de ce qui est publié ;
-- écriture réservée aux administrateurs (table « admins »).

-- ---------- Administrateurs ----------
create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  cree_le timestamptz not null default now()
);
alter table public.admins enable row level security;
create policy "Un admin voit sa propre ligne" on public.admins
  for select to authenticated using (user_id = (select auth.uid()));

create or replace function public.est_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;
revoke execute on function public.est_admin() from public;
grant execute on function public.est_admin() to anon, authenticated;

-- ---------- Réalisations ----------
create table public.realisations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  titre text not null,
  domaine text not null check (domaine in ('batiment', 'travaux-publics-vrd', 'hydraulique', 'assainissement', 'genie-civil')),
  resume text not null default '',
  travaux text[] not null default '{}',
  reference boolean not null default false,
  publie boolean not null default true,
  ordre integer not null default 0,
  cree_le timestamptz not null default now()
);

-- « chemin » : « local:<PhotoId> » pour les photos livrées avec le site,
-- sinon le chemin du fichier dans le stockage « medias ».
create table public.realisation_photos (
  id uuid primary key default gen_random_uuid(),
  realisation_id uuid not null references public.realisations (id) on delete cascade,
  chemin text not null,
  alt text not null default '',
  largeur integer,
  hauteur integer,
  ordre integer not null default 0,
  cree_le timestamptz not null default now()
);
create index realisation_photos_realisation_id_idx on public.realisation_photos (realisation_id);

-- ---------- Nouvelles du quotidien ----------
create table public.actualites (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  texte text not null,
  photo text,
  largeur integer,
  hauteur integer,
  publie_le date not null default current_date,
  publie boolean not null default true,
  cree_le timestamptz not null default now()
);

-- ---------- Partenaires et témoignages ----------
create table public.partenaires (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  logo text not null,
  url text,
  ordre integer not null default 0,
  publie boolean not null default true,
  cree_le timestamptz not null default now()
);

create table public.temoignages (
  id uuid primary key default gen_random_uuid(),
  citation text not null,
  auteur text not null,
  fonction text,
  organisation text,
  ordre integer not null default 0,
  publie boolean not null default true,
  cree_le timestamptz not null default now()
);

-- ---------- Règles d'accès ----------
alter table public.realisations enable row level security;
alter table public.realisation_photos enable row level security;
alter table public.actualites enable row level security;
alter table public.partenaires enable row level security;
alter table public.temoignages enable row level security;

create policy "Lecture : publié ou admin" on public.realisations
  for select to anon, authenticated using (publie or (select public.est_admin()));
create policy "Écriture : admin" on public.realisations
  for all to authenticated using ((select public.est_admin())) with check ((select public.est_admin()));

create policy "Lecture : réalisation publiée ou admin" on public.realisation_photos
  for select to anon, authenticated using (
    (select public.est_admin())
    or exists (select 1 from public.realisations r where r.id = realisation_id and r.publie)
  );
create policy "Écriture : admin" on public.realisation_photos
  for all to authenticated using ((select public.est_admin())) with check ((select public.est_admin()));

create policy "Lecture : publié ou admin" on public.actualites
  for select to anon, authenticated using (publie or (select public.est_admin()));
create policy "Écriture : admin" on public.actualites
  for all to authenticated using ((select public.est_admin())) with check ((select public.est_admin()));

create policy "Lecture : publié ou admin" on public.partenaires
  for select to anon, authenticated using (publie or (select public.est_admin()));
create policy "Écriture : admin" on public.partenaires
  for all to authenticated using ((select public.est_admin())) with check ((select public.est_admin()));

create policy "Lecture : publié ou admin" on public.temoignages
  for select to anon, authenticated using (publie or (select public.est_admin()));
create policy "Écriture : admin" on public.temoignages
  for all to authenticated using ((select public.est_admin())) with check ((select public.est_admin()));

-- ---------- Stockage des photos (lecture publique, écriture admin) ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('medias', 'medias', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'])
on conflict (id) do nothing;

create policy "Médias : envoi par un admin" on storage.objects
  for insert to authenticated with check (bucket_id = 'medias' and (select public.est_admin()));
create policy "Médias : modification par un admin" on storage.objects
  for update to authenticated using (bucket_id = 'medias' and (select public.est_admin()));
create policy "Médias : suppression par un admin" on storage.objects
  for delete to authenticated using (bucket_id = 'medias' and (select public.est_admin()));

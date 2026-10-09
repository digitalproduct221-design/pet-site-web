-- Demandes reçues par le site (devis et candidatures). Écrites uniquement par la
-- fonction « demande » (clé de service) ; lues et gérées par les administrateurs.
create table public.demandes (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('devis', 'candidature')),
  nom text not null,
  email text not null,
  telephone text not null,
  societe text,
  domaine text,
  poste text,
  message text,
  fichier text,
  fichier_nom text,
  traitee boolean not null default false,
  recue_le timestamptz not null default now()
);
create index demandes_recue_le_idx on public.demandes (recue_le desc);
alter table public.demandes enable row level security;

create policy "Lecture : admin" on public.demandes
  for select to authenticated using ((select public.est_admin()));
create policy "Modification : admin" on public.demandes
  for update to authenticated using ((select public.est_admin())) with check ((select public.est_admin()));
create policy "Suppression : admin" on public.demandes
  for delete to authenticated using ((select public.est_admin()));

-- Pièces jointes (plans, CV) : stockage privé, lisible par les administrateurs seulement.
insert into storage.buckets (id, name, public, file_size_limit)
values ('demandes', 'demandes', false, 10485760)
on conflict (id) do nothing;
create policy "Pièces jointes : lecture admin" on storage.objects
  for select to authenticated using (bucket_id = 'demandes' and (select public.est_admin()));
create policy "Pièces jointes : suppression admin" on storage.objects
  for delete to authenticated using (bucket_id = 'demandes' and (select public.est_admin()));

-- Médias : un admin doit pouvoir lister et supprimer ses photos (la suppression passe par une lecture).
create policy "Médias : lecture par un admin" on storage.objects
  for select to authenticated using (bucket_id = 'medias' and (select public.est_admin()));

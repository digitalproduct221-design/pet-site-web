-- Amorçage : réalisations livrées avec le site (photos locales).
insert into public.realisations (slug, titre, domaine, resume, travaux, reference, ordre) values
  ('rehabilitation-dalot-regards', 'Réhabilitation de dalot et construction de regards', 'assainissement', 'Regards en béton coulés en place et raccordés au réseau, au cœur d''un quartier habité.', array['Terrassement en fouille','Coffrage et coulage de regards','Raccordement de conduite fonte','Remblaiement']::text[], true, 0),
  ('fourniture-pose-conduite-fonte', 'Fourniture et pose de conduite fonte', 'hydraulique', 'Conduite en fonte de gros diamètre et ses vannes, protégées par un ouvrage en béton armé.', array['Pose et assemblage des tuyaux','Pose des vannes','Ferraillage de l''ouvrage']::text[], true, 1),
  ('terrassement-plateforme', 'Terrassement d''une plateforme', 'travaux-publics-vrd', 'Déblais et remblais sur un site sableux, à la pelle hydraulique et à la chargeuse.', array['Déblais à la pelle hydraulique','Chargement','Mise en remblai']::text[], false, 2),
  ('voirie-niveleuse', 'Mise en forme d''une voirie', 'travaux-publics-vrd', 'Réglage d''une voirie en terre à la niveleuse, guidée par le chef de chantier.', array['Réglage à la niveleuse','Mise en forme des pentes']::text[], false, 3),
  ('pose-conduite-topographie', 'Pose de conduite avec suivi topographique', 'hydraulique', 'Conduite posée en tranchée, implantée et contrôlée au GPS par le topographe.', array['Implantation topographique','Ouverture de tranchée','Pose de la conduite']::text[], false, 4),
  ('reseau-lotissement', 'Réseaux d''un lotissement en construction', 'assainissement', 'Tranchées ouvertes dans la latérite pour les canalisations des villas en construction.', array['Ouverture de tranchées','Pose de canalisations']::text[], false, 5),
  ('ouvrage-hydraulique-beton-arme', 'Ouvrage hydraulique en béton armé', 'genie-civil', 'Nappes d''armatures sur le radier d''un ouvrage hydraulique, au bord d''un plan d''eau.', array['Ferraillage du radier','Attentes des voiles']::text[], false, 6);
insert into public.realisation_photos (realisation_id, chemin, ordre)
select r.id, v.chemin, v.ordre from (values
  ('rehabilitation-dalot-regards', 'local:dalotRegard', 0),
  ('rehabilitation-dalot-regards', 'local:trancheeLotissement', 1),
  ('rehabilitation-dalot-regards', 'local:conduiteOuvrage', 2),
  ('fourniture-pose-conduite-fonte', 'local:conduiteOuvrage', 0),
  ('fourniture-pose-conduite-fonte', 'local:poseConduiteTopographie', 1),
  ('fourniture-pose-conduite-fonte', 'local:ferraillageOuvrage', 2),
  ('terrassement-plateforme', 'local:terrassementEngins', 0),
  ('terrassement-plateforme', 'local:niveleuseVoirie', 1),
  ('voirie-niveleuse', 'local:niveleuseVoirie', 0),
  ('voirie-niveleuse', 'local:terrassementEngins', 1),
  ('pose-conduite-topographie', 'local:poseConduiteTopographie', 0),
  ('pose-conduite-topographie', 'local:conduiteOuvrage', 1),
  ('reseau-lotissement', 'local:trancheeLotissement', 0),
  ('reseau-lotissement', 'local:dalotRegard', 1),
  ('ouvrage-hydraulique-beton-arme', 'local:ferraillageOuvrage', 0),
  ('ouvrage-hydraulique-beton-arme', 'local:conduiteOuvrage', 1)
) as v(slug, chemin, ordre) join public.realisations r on r.slug = v.slug;

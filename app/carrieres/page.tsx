import type { Metadata } from "next";
import { Suspense } from "react";
import { valeurs } from "@/content/site";
import { EnTetePage } from "@/components/ui/EnTetePage";
import { BoutonLien } from "@/components/ui/Bouton";
import { Icone } from "@/components/ui/Icone";
import { PhotoCadre } from "@/components/ui/PhotoCadre";
import { ListeOffres } from "@/components/accueil/CarrieresBloc";
import { Formulaire } from "@/components/formulaires/Formulaire";
import { FormulaireCandidature } from "@/components/formulaires/FormulaireCandidature";

export const metadata: Metadata = {
  title: "Carrières",
  description: "Rejoignez les équipes de PET à Dakar : offres d'emploi dans le BTP et candidature spontanée.",
  alternates: { canonical: "/carrieres" },
};

const atouts = [
  { icone: "casque", titre: "La sécurité d'abord", texte: "Équipements de protection et consignes partagées sur chaque chantier." },
  { icone: "equipe", titre: "Des équipes expérimentées", texte: "Une équipe qui cumule plus de 40 ans d'expérience et transmet son savoir-faire." },
  { icone: "engins", titre: "Des moyens entretenus", texte: "Des équipements régulièrement mis à niveau pour travailler dans de bonnes conditions." },
] as const;

export default function PageCarrieres() {
  return (
    <>
      <EnTetePage
        titre="Carrières"
        intro="Conducteurs d'engins, chefs d'équipe, techniciens : rejoignez une entreprise de terrain où le travail bien fait compte."
        ariane={[{ titre: "Carrières" }]}
        photo="trancheeLotissement"
      >
        <BoutonLien href="#offres">Voir les offres</BoutonLien>
        <BoutonLien href="#candidature" variante="contour-clair">
          Candidature spontanée
        </BoutonLien>
      </EnTetePage>

      <section aria-labelledby="pourquoi-nous-rejoindre" className="bg-blanc py-20 lg:py-28">
        <div className="conteneur grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="revele lg:col-span-5">
            <h2 id="pourquoi-nous-rejoindre" className="titre text-titre-l text-nuit">
              Pourquoi nous rejoindre
            </h2>
            <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-encre-douce">
              Chez PET, chacun compte sur le chantier. Nos valeurs guident la façon dont nous travaillons ensemble :
            </p>
            <p className="mt-4 max-w-[34rem] cote text-[1.0625rem] leading-relaxed text-royal">
              {valeurs.map((v) => v.titre).join(", ")}.
            </p>
          </div>
          <ul className="revele-groupe grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:gap-8">
            {atouts.map((a) => (
              <li key={a.titre}>
                <span className="grid size-14 place-items-center rounded-[6px] bg-royal text-jaune shadow-[0_14px_30px_-14px_rgb(33_64_154/0.7)]">
                  <Icone nom={a.icone} size={28} />
                </span>
                <h3 className="mt-5 titre text-[1.625rem] leading-[1] text-nuit">{a.titre}</h3>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-encre-douce">{a.texte}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="offres" aria-labelledby="titre-offres" className="bg-sable py-20 lg:py-28">
        <div className="conteneur grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="revele lg:col-span-4">
            <h2 id="titre-offres" className="titre text-titre-l text-nuit">
              Offres d&apos;emploi
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-encre-douce">
              Les offres ci-contre sont des exemples de mise en page : les postes réellement ouverts seront publiés ici.
            </p>
            <PhotoCadre photo="niveleuseVoirie" ratio="aspect-[4/3]" sizes="(min-width: 1024px) 30vw, 100vw" equerres className="mt-10 hidden lg:block" />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ListeOffres ton="clair" />
          </div>
        </div>
      </section>

      <section id="candidature" aria-labelledby="titre-candidature" className="bg-blanc py-20 lg:py-28">
        <div className="conteneur grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="revele lg:col-span-4">
            <h2 id="titre-candidature" className="titre text-titre-l text-nuit">
              Candidature spontanée
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-encre-douce">
              Aucune offre ne correspond ? Présentez-vous : nous gardons les profils de terrain pour nos prochains chantiers.
            </p>
          </div>
          <div className="rounded-[6px] bg-sable p-6 sm:p-8 lg:col-span-7 lg:col-start-6 lg:p-10">
            <Suspense fallback={<Formulaire type="candidature" />}>
              <FormulaireCandidature />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}

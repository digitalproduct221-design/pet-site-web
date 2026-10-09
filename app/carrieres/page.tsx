import type { Metadata } from "next";
import { Suspense } from "react";
import { domaineParSlug, metiers, valeurs } from "@/content/site";
import { listeFrancaise } from "@/content/texte";
import { EnTetePage } from "@/components/ui/EnTetePage";
import { BoutonLien } from "@/components/ui/Bouton";
import { Icone } from "@/components/ui/Icone";
import { PhotoCadre } from "@/components/ui/PhotoCadre";
import Link from "next/link";
import { Motif } from "@/components/ui/Motif";
import { Formulaire } from "@/components/formulaires/Formulaire";
import { FormulaireCandidature } from "@/components/formulaires/FormulaireCandidature";

export const metadata: Metadata = {
  title: "Carrières",
  description: "Rejoignez les équipes de PET à Dakar : les métiers de nos chantiers et la candidature spontanée.",
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
      <EnTetePage suite="text-blanc"
        titre="Carrières"
        intro="Conducteurs d'engins, canalisateurs, ferrailleurs, topographes : rejoignez une entreprise de terrain où le travail bien fait compte."
        ariane={[{ titre: "Carrières" }]}
        photo="trancheeLotissement"
      >
        <BoutonLien href="#candidature">Candidature spontanée</BoutonLien>
        <BoutonLien href="#metiers" variante="contour">
          Nos métiers
        </BoutonLien>
      </EnTetePage>

      <section aria-labelledby="pourquoi-nous-rejoindre" className="bg-blanc py-20 lg:py-28">
        <div className="conteneur grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="revele">
              <h2 id="pourquoi-nous-rejoindre" className="titre text-titre-l text-nuit">
                Pourquoi nous rejoindre
              </h2>
              <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-encre-douce">
                Chez PET, chacun compte sur le chantier. Nos valeurs guident la façon dont nous travaillons ensemble&nbsp;:{" "}
                {listeFrancaise(valeurs.map((v) => v.titre)).toLowerCase()}.
              </p>
            </div>
            <PhotoCadre photo="conduiteOuvrage" ratio="aspect-[4/3]" sizes="(min-width: 1024px) 36vw, 100vw" equerres decalage={12} className="mt-10" />
          </div>
          <ul className="revele-groupe grid content-center gap-12 lg:col-span-6 lg:col-start-7 lg:gap-16">
            {atouts.map((a) => (
              <li key={a.titre} className="grid grid-cols-[auto_1fr] gap-x-6">
                <Icone nom={a.icone} size={40} weight="light" className="mt-1 text-royal" />
                <div>
                  <h3 className="titre text-titre-m text-royal">{a.titre}</h3>
                  <p className="mt-3 max-w-[32rem] text-[1.0625rem] leading-relaxed text-encre-douce">{a.texte}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="metiers" aria-labelledby="titre-metiers" className="relative isolate overflow-hidden bg-sable py-20 lg:py-28">
        <Motif type="ferraillage" className="text-nuit" opacite={0.05} />
        <div className="conteneur">
          <div className="revele max-w-[44rem]">
            <h2 id="titre-metiers" className="titre text-titre-l text-nuit">
              Les métiers de nos chantiers
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-encre-douce">
              Les métiers que nous exerçons au quotidien. Le vôtre y figure&nbsp;? Choisissez-le&nbsp;: il sera indiqué dans votre
              candidature.
            </p>
          </div>
          <ul className="revele-groupe mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {metiers.map((m, i) => {
              const domaine = domaineParSlug(m.domaine);
              return (
                <li key={m.id}>
                  <Link
                    href={`/carrieres?metier=${m.id}#candidature`}
                    scroll={false}
                    className="group/metier relative flex h-full flex-col rounded-panneau bg-blanc p-6 ombre-carte transition-[translate,box-shadow] duration-500 ease-chantier hover:-translate-y-1 hover:ombre-carte-survol"
                  >
                    <span className="flex items-center justify-between">
                      <span className="titre text-[2.25rem] leading-none text-contour chiffres-tabulaires transition-colors group-hover/metier:text-royal">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {domaine ? <Icone nom={domaine.icone} size={28} weight="light" className="text-royal" /> : null}
                    </span>
                    <span className="mt-6 titre text-[1.625rem] leading-[1] text-nuit">{m.titre}</span>
                    <span className="mt-3 flex-1 text-[1rem] leading-relaxed text-encre-douce">{m.texte}</span>
                    <span className="mt-6 inline-flex items-center gap-2 cote text-[1.0625rem] text-royal">
                      Postuler
                      <Icone nom="fleche" size={18} weight="bold" className="transition-transform group-hover/metier:translate-x-1" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="candidature" aria-labelledby="titre-candidature" className="bg-blanc py-20 lg:py-28">
        <div className="conteneur grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="revele lg:col-span-4">
            <h2 id="titre-candidature" className="titre text-titre-l text-nuit">
              Candidature spontanée
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-encre-douce">
              Présentez-vous en quelques lignes et joignez votre CV&nbsp;: votre candidature est transmise à la direction.
            </p>
          </div>
          <div className="rounded-panneau bg-sable p-6 sm:p-8 lg:col-span-7 lg:col-start-6 lg:p-10">
            <Suspense fallback={<Formulaire type="candidature" />}>
              <FormulaireCandidature />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}

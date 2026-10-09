import Link from "next/link";
import { projets } from "@/content/exemples";
import { domaineParSlug } from "@/content/site";
import { Icone } from "@/components/ui/Icone";
import { MentionExemple } from "@/components/ui/Exemple";
import { PhotoCadre } from "@/components/ui/PhotoCadre";
import { TitreSection } from "@/components/ui/TitreSection";

// Composition de la planche : une grande photo et quatre photos de tailles variées.
const disposition = [
  { slug: "rehabilitation-dalot-regards", cellule: "lg:col-span-7 lg:row-span-2", ratio: "aspect-[4/3] lg:aspect-auto lg:h-full", sizes: "(min-width: 1024px) 55vw, 100vw" },
  { slug: "fourniture-pose-conduite-fonte", cellule: "lg:col-span-5", ratio: "aspect-[16/9]", sizes: "(min-width: 1024px) 38vw, 100vw" },
  { slug: "terrassement-plateforme", cellule: "lg:col-span-5", ratio: "aspect-[16/9]", sizes: "(min-width: 1024px) 38vw, 100vw" },
  { slug: "ouvrage-hydraulique-beton-arme", cellule: "lg:col-span-5", ratio: "aspect-[16/10]", sizes: "(min-width: 1024px) 38vw, 100vw" },
  { slug: "reseau-lotissement", cellule: "lg:col-span-7", ratio: "aspect-[16/10] lg:aspect-[21/10]", sizes: "(min-width: 1024px) 55vw, 100vw" },
];

export function RealisationsVedette() {
  return (
    <section aria-labelledby="titre-realisations" className="sur-sombre profondeur py-20 text-blanc lg:py-28">
      <div className="conteneur">
        <div className="revele flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <TitreSection
            id="titre-realisations"
            ton="sombre"
            titre="Réalisations en vedette"
            intro="Quelques chantiers menés par nos équipes, du réseau d'eau à la voirie."
          />
          <Link
            href="/realisations"
            className="inline-flex shrink-0 items-center gap-2 cote text-[1.0625rem] uppercase tracking-[0.04em] text-blanc underline decoration-jaune decoration-[3px] underline-offset-[6px] hover:text-jaune"
          >
            Toutes les réalisations
            <Icone nom="fleche" size={18} weight="bold" />
          </Link>
        </div>

        <ul className="revele-groupe mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-y-12">
          {disposition.map((cellule, i) => {
            const projet = projets.find((p) => p.slug === cellule.slug)!;
            const domaine = domaineParSlug(projet.domaine);
            return (
              <li key={projet.slug} className={`${cellule.cellule} ${i === 0 ? "sm:col-span-2" : ""} flex flex-col`}>
                <Link href={`/realisations/${projet.slug}`} className="group/projet flex h-full flex-col">
                  <PhotoCadre
                    photo={projet.photos[0]}
                    ratio={cellule.ratio}
                    sizes={cellule.sizes}
                    voile="leger"
                    rideau={false}
                    className={i === 0 ? "lg:flex-1 [&>div]:h-full [&>div>div]:h-full" : ""}
                    imageClassName="transition-transform duration-[900ms] ease-chantier group-hover/projet:scale-[1.03]"
                  />
                  <span className="mt-5 flex flex-wrap items-center gap-3">
                    <span className="cote text-[0.9375rem] uppercase tracking-[0.06em] text-ciel">{domaine?.titre}</span>
                    <MentionExemple visible={projet.exemple} ton="sombre" />
                  </span>
                  <span className="mt-2 block titre text-[1.625rem] leading-[1] text-blanc transition-colors group-hover/projet:text-jaune lg:text-[1.875rem]">
                    {projet.titre}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

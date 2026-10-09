import Link from "next/link";
import { lireRealisations } from "@/lib/contenu";
import { domaineParSlug } from "@/content/site";
import { Icone } from "@/components/ui/Icone";
import { PhotoCadre } from "@/components/ui/PhotoCadre";
import { Profil } from "@/components/ui/Profil";
import { TitreSection } from "@/components/ui/TitreSection";

// Composition de la planche : une grande photo et quatre photos de tailles variées,
// remplies dans l'ordre des réalisations (références d'abord).
const disposition = [
  { cellule: "lg:col-span-7 lg:row-span-2", ratio: "aspect-[4/3] lg:aspect-auto lg:h-full", sizes: "(min-width: 1024px) 55vw, 100vw" },
  { cellule: "lg:col-span-5", ratio: "aspect-[16/9]", sizes: "(min-width: 1024px) 38vw, 100vw" },
  { cellule: "lg:col-span-5", ratio: "aspect-[16/9]", sizes: "(min-width: 1024px) 38vw, 100vw" },
  { cellule: "lg:col-span-5", ratio: "aspect-[16/10]", sizes: "(min-width: 1024px) 38vw, 100vw" },
  { cellule: "lg:col-span-7", ratio: "aspect-[16/10] lg:aspect-[21/10]", sizes: "(min-width: 1024px) 55vw, 100vw" },
];

export async function RealisationsVedette() {
  const toutes = await lireRealisations();
  const choisies = [...toutes.filter((p) => p.reference), ...toutes.filter((p) => !p.reference)].slice(0, disposition.length);
  return (
    <section aria-labelledby="titre-realisations" className="sur-sombre profondeur relative pb-28 pt-16 text-blanc lg:pb-40 lg:pt-20">
      <div className="conteneur">
        <div className="revele flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <TitreSection
            id="titre-realisations"
            ton="sombre"
            titre="Réalisations en vedette"
            intro="Nos chantiers en images, du réseau d'eau à la voirie. Chaque réalisation s'ouvre sur sa galerie."
          />
          <Link
            href="/realisations"
            className="inline-flex shrink-0 items-center gap-2 cote text-[1.0625rem] uppercase tracking-[0.04em] text-blanc underline decoration-jaune decoration-[3px] underline-offset-[6px] hover:text-jaune"
          >
            Toutes les réalisations
            <Icone nom="fleche" size={18} weight="bold" />
          </Link>
        </div>

        <ul className="revele-groupe mt-10 grid gap-x-6 gap-y-10 max-sm:-mx-4 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:overflow-x-auto max-sm:scroll-px-4 max-sm:px-4 max-sm:pb-3 max-sm:[scrollbar-width:none] max-sm:gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-y-12">
          {choisies.map((projet, i) => {
            const cellule = disposition[i];
            const domaine = domaineParSlug(projet.domaine);
            return (
              <li key={projet.slug} className={`${cellule.cellule} ${i === 0 ? "sm:col-span-2" : ""} flex flex-col max-sm:w-[84%] max-sm:shrink-0 max-sm:snap-start`}>
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
                  <span className="mt-5 block titre text-[1.625rem] leading-[1] text-blanc transition-colors group-hover/projet:text-jaune lg:text-[1.875rem]">
                    {projet.titre}
                  </span>
                  <span className="mt-2 flex flex-wrap items-center gap-3">
                    <span className="cote text-[0.9375rem] text-ciel">{domaine?.titre}</span>
                    <span className="inline-flex items-center gap-1.5 cote text-[0.9375rem] text-brume">
                      <Icone nom="photos" size={16} />
                      {projet.photos.length} photos
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <Profil couleur="text-blanc" forme="deblai" miroir />
    </section>
  );
}

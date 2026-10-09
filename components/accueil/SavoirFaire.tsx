import Image from "next/image";
import Link from "next/link";
import { photos } from "@/content/photos";
import { domaines } from "@/content/site";
import { Icone } from "@/components/ui/Icone";
import { Profil } from "@/components/ui/Profil";
import { TitreSection } from "@/components/ui/TitreSection";

/**
 * Les cinq domaines en panneaux verticaux : sur grand écran, le panneau survolé
 * ou ciblé au clavier s'ouvre et les autres se resserrent (CSS seul).
 */
// Le panneau ouvert par défaut montre les engins CAT : la photo la plus forte du chantier.
const ordrePanneaux = [...domaines].sort((a, b) => Number(b.slug === "travaux-publics-vrd") - Number(a.slug === "travaux-publics-vrd"));

export function SavoirFaire() {
  return (
    <section aria-labelledby="titre-savoir-faire" className="relative bg-sable pb-28 pt-20 lg:pb-40 lg:pt-28">
      <div className="conteneur">
        <div className="revele flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <TitreSection
            id="titre-savoir-faire"
            titre="Nos savoir-faire"
            intro="Cinq domaines d'expertise, du bâtiment aux réseaux d'eau, menés de l'étude à la livraison."
          />
          <Link
            href="/savoir-faire"
            className="inline-flex shrink-0 items-center gap-2 cote text-[1.0625rem] uppercase tracking-[0.04em] text-nuit underline decoration-jaune decoration-[3px] underline-offset-[6px] hover:text-royal"
          >
            Tous les savoir-faire
            <Icone nom="fleche" size={18} weight="bold" />
          </Link>
        </div>

        <ul className="panneaux revele-groupe mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16">
          {ordrePanneaux.map((d, i) => {
            const photo = photos[d.photos[0]];
            return (
              <li key={d.slug} className={`panneau ${i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                <Link
                  href={`/savoir-faire/${d.slug}`}
                  className="group/panneau relative flex h-full min-h-[24rem] flex-col justify-end overflow-hidden rounded-chantier bg-nuit text-blanc lg:min-h-0"
                >
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
                   
                    className="object-cover transition-transform duration-[900ms] ease-chantier group-hover/panneau:scale-[1.04]"
                    style={{ objectPosition: photo.focale }}
                  />
                  <span aria-hidden className="absolute inset-0 voile-carte" />
                  {/* Panneau fermé (grand écran) : titre vertical */}
                  <span aria-hidden className="panneau-vertical titre text-[1.75rem] leading-none text-blanc">
                    {d.titre}
                  </span>
                  <span className="panneau-contenu relative block p-6 lg:p-8">
                    <Icone nom={d.icone} size={30} className="text-jaune" />
                    <span className="mt-4 block titre text-[1.875rem] leading-[0.95] lg:text-[2.25rem]">{d.titre}</span>
                    <span aria-hidden className="mt-4 block h-1 w-12 bg-jaune transition-[width] duration-500 ease-chantier group-hover/panneau:w-20" />
                    <span className="mt-5 block max-w-[30rem] text-[1rem] leading-relaxed text-brume">{d.accroche}</span>
                    <span className="mt-5 inline-flex items-center gap-2 cote text-[1.0625rem] text-jaune">
                      Découvrir le domaine
                      <Icone nom="fleche" size={18} weight="bold" />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <Profil couleur="text-nuit" forme="talus" />
    </section>
  );
}

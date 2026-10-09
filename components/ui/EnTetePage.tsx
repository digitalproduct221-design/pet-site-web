import Image from "next/image";
import type { ReactNode } from "react";
import { resoudreImage, type ImageSite } from "@/content/images";
import type { PhotoId } from "@/content/photos";
import { FilAriane } from "./FilAriane";
import { Equerres } from "./Equerres";
import { Motif } from "./Motif";
import { Profil } from "./Profil";

type Props = {
  titre: string;
  intro?: ReactNode;
  ariane: { titre: string; href?: string }[];
  photo?: PhotoId | ImageSite;
  children?: ReactNode;
  /** Bloc affiché sous l'intro (ex. fiche synthétique). */
  aside?: ReactNode;
  /** Couleur du bloc qui suit (classe text-*), pour le profil de terrain. */
  suite?: string;
};

/**
 * En-tête des pages intérieures :
 * - Le bloc texte vient en premier (en haut sur mobile, à gauche sur bureau) avec le fil d'Ariane
 *   et le titre complètement dégagés et visibles sous l'en-tête flottante
 * - La photo vient ensuite (en dessous sur mobile, à droite sur bureau)
 * - La transition entre le bloc et l'image se fait sans aucun trait vertical, horizontal ou oblique,
 *   mais par une fusion organique à motifs irréguliers inspirés des strates de terrain
 */
export function EnTetePage({ titre, intro, ariane, photo, children, aside, suite = "text-sable" }: Props) {
  const p = photo ? resoudreImage(photo) : null;
  const fond = suite === "text-sable" ? "bg-blanc" : "bg-sable";
  const couleurFond = suite === "text-sable" ? "text-blanc" : "text-sable";

  return (
    <header className={`relative isolate overflow-hidden ${fond} ${couleurFond}`}>
      <Motif type="plan" className="text-royal" opacite={0.14} />

      <div className={`grid ${p ? "lg:min-h-[34rem] lg:grid-cols-12 items-stretch" : ""}`}>
        {/* BLOC TEXTE : Toujours en haut sur mobile, et à gauche sur grand écran */}
        <div
          className={`flex flex-col justify-center gap-6 px-4 pb-12 pt-28 sm:px-6 sm:pt-32 lg:col-span-7 lg:gap-8 lg:pb-24 lg:pl-[max(2rem,calc((100vw-var(--container-site))/2+2rem))] lg:pr-10 lg:pt-36`}
        >
          {/* Fil d'Ariane parfaitement visible et dégagé de l'en-tête */}
          <FilAriane etapes={ariane} ton="clair" />

          <div className="entree">
            <Equerres as="div" seule decalage={18} className="inline-block pl-1 pt-1">
              <h1 className="titre text-[clamp(2.5rem,1.4rem+3.4vw,4.5rem)] leading-[0.95] text-nuit">{titre}</h1>
            </Equerres>
            {intro ? <p className="mt-5 max-w-[38rem] text-lg leading-relaxed text-encre-douce">{intro}</p> : null}
            {children ? <div className="mt-7 flex flex-wrap gap-4">{children}</div> : null}
          </div>
          {aside}
        </div>

        {/* PHOTO : Vient APRÈS le bloc texte sur mobile, et à droite sur grand écran */}
        {p ? (
          <div className="relative h-64 sm:h-80 md:h-96 lg:col-span-5 lg:h-auto overflow-hidden">
            {/* Transition organique irrégulière HORIZONTALE pour mobile (en haut de la photo) */}
            <div aria-hidden className="absolute -top-0.5 inset-x-0 z-10 leading-none text-current lg:hidden pointer-events-none">
              <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="block h-10 sm:h-14 w-full">
                <path
                  d="M0 0 L1440 0 L1440 20 C1310 45 1220 12 1090 38 C960 62 870 18 740 44 C610 68 520 22 390 48 C260 70 140 28 0 52 Z"
                  fill="currentColor"
                  opacity="0.38"
                />
                <path
                  d="M0 0 L1440 0 L1440 10 C1300 35 1210 5 1080 28 C950 50 860 10 730 34 C600 56 510 12 380 38 C250 58 130 18 0 40 Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Transition organique irrégulière VERTICALE pour ordinateur (à gauche de la photo) */}
            <div aria-hidden className="absolute -left-0.5 inset-y-0 z-10 hidden h-full w-14 xl:w-20 text-current lg:block pointer-events-none">
              <svg viewBox="0 0 100 800" preserveAspectRatio="none" className="block h-full w-full">
                <path
                  d="M0 0 L15 0 C45 60 10 130 50 200 C85 270 20 340 60 410 C95 480 30 550 70 620 C45 690 75 750 25 800 L0 800 Z"
                  fill="currentColor"
                  opacity="0.38"
                />
                <path
                  d="M0 0 L5 0 C30 70 -5 140 35 210 C70 280 5 350 45 420 C80 490 15 560 55 630 C30 700 60 760 10 800 L0 800 Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* L'image de fond avec parallaxe */}
            <div className="absolute inset-0 bg-sable-soutenu">
              <div className="parallaxe absolute -inset-y-[6%] inset-x-0">
                <Image
                  src={p.src}
                  alt=""
                  fill
                  preload
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  quality={75}
                  className="object-cover"
                  style={{ objectPosition: p.focale }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <Profil couleur={suite} forme="talus" />
    </header>
  );
}

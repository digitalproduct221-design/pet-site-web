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
 * En-tête des pages intérieures, dans l'esprit du hero : le texte sur fond clair,
 * la photo nette (sans voile) dans un cadre coupé en biais, à droite sur grand
 * écran et au-dessus du texte sur mobile. Le fond alterne avec le bloc suivant
 * (blanc avant un bloc sable, sable avant un bloc blanc) pour ne jamais se confondre.
 */
export function EnTetePage({ titre, intro, ariane, photo, children, aside, suite = "text-sable" }: Props) {
  const p = photo ? resoudreImage(photo) : null;
  const fond = suite === "text-sable" ? "bg-blanc" : "bg-sable";
  return (
    <header className={`relative isolate overflow-hidden ${fond}`}>
      <Motif type="plan" className="text-royal" opacite={0.14} />
      <div className={`grid ${p ? "lg:min-h-[30rem] lg:grid-cols-2" : ""}`}>
        <div
          className={`flex flex-col justify-center gap-8 px-4 pb-24 pt-24 sm:px-6 sm:pt-28 lg:pb-28 lg:pl-[max(2rem,calc((100vw-var(--container-site))/2+2rem))] lg:pt-32 ${
            p ? "lg:pr-10" : "lg:pr-[max(2rem,calc((100vw-var(--container-site))/2+2rem))]"
          }`}
        >
          <FilAriane etapes={ariane} ton="clair" />
          <div className="entree">
            <Equerres as="div" seule decalage={18} className="inline-block pl-1 pt-1">
              <h1 className="titre text-[clamp(2.5rem,1.4rem+3.4vw,4.5rem)] leading-[0.95] text-nuit">{titre}</h1>
            </Equerres>
            {intro ? <p className="mt-6 max-w-[38rem] text-lg leading-relaxed text-encre-douce">{intro}</p> : null}
            {children ? <div className="mt-8 flex flex-wrap gap-4">{children}</div> : null}
          </div>
          {aside}
        </div>
        {p ? (
          <div className="relative order-first h-[min(44svh,20rem)] sm:h-[24rem] lg:order-none lg:h-auto">
            <div className="cadre-hero absolute inset-0 overflow-hidden bg-sable-soutenu">
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

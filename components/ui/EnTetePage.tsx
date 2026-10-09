import Image from "next/image";
import type { ReactNode } from "react";
import { photos, type PhotoId } from "@/content/photos";
import { FilAriane } from "./FilAriane";
import { Equerres } from "./Equerres";

type Props = {
  titre: string;
  intro?: ReactNode;
  ariane: { titre: string; href?: string }[];
  photo?: PhotoId;
  children?: ReactNode;
  /** Bloc affiché à droite sur grand écran (ex. fiche synthétique). */
  aside?: ReactNode;
};

/**
 * En-tête des pages intérieures, dans l'esprit du hero : photo plein cadre
 * sous un voile bleu nuit dense, titre cadré par l'équerre du logo.
 */
export function EnTetePage({ titre, intro, ariane, photo, children, aside }: Props) {
  const p = photo ? photos[photo] : null;
  return (
    <header className="sur-sombre relative isolate overflow-hidden profondeur text-blanc">
      {p ? (
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="parallaxe absolute -inset-y-[6%] inset-x-0">
            <Image src={p.src} alt="" fill preload fetchPriority="high" sizes="(max-width: 768px) 70vw, 100vw" quality={50} className="object-cover" style={{ objectPosition: p.focale }} />
          </div>
          <div className="absolute inset-0 voile-lateral" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 voile-bas" />
        </div>
      ) : null}
      <div className="conteneur grid min-h-[min(34rem,70svh)] content-between gap-10 pb-14 pt-8 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pb-20 lg:pt-10">
        <div className="lg:col-span-12">
          <FilAriane etapes={ariane} />
        </div>
        <div className={`entree ${aside ? "lg:col-span-7" : "lg:col-span-9"}`}>
          <Equerres as="div" seule decalage={20} className="inline-block pl-1 pt-1">
            <h1 className="titre text-titre-xl text-blanc ombre-texte">{titre}</h1>
          </Equerres>
          {intro ? <p className="mt-7 max-w-[38rem] text-lg leading-relaxed text-blanc/85">{intro}</p> : null}
          {children ? <div className="mt-9 flex flex-wrap gap-4">{children}</div> : null}
        </div>
        {aside ? <div className="lg:col-span-4 lg:col-start-9">{aside}</div> : null}
      </div>
    </header>
  );
}

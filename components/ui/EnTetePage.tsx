import Image from "next/image";
import type { ReactNode } from "react";
import { photos, type PhotoId } from "@/content/photos";
import { FilAriane } from "./FilAriane";
import { Equerres } from "./Equerres";
import { Profil } from "./Profil";

type Props = {
  titre: string;
  intro?: ReactNode;
  ariane: { titre: string; href?: string }[];
  photo?: PhotoId;
  children?: ReactNode;
  /** Bloc affiché à droite sur grand écran (ex. fiche synthétique). */
  aside?: ReactNode;
  /** Couleur du bloc qui suit (classe text-*), pour le profil de terrain. */
  suite?: string;
};

/**
 * En-tête des pages intérieures, dans l'esprit du hero : photo plein cadre et
 * lumineuse, voilée seulement sous le texte, titre cadré par l'équerre du logo,
 * profil de terrain vers le bloc suivant (`suite` : sa couleur).
 */
export function EnTetePage({ titre, intro, ariane, photo, children, aside, suite = "text-sable" }: Props) {
  const p = photo ? photos[photo] : null;
  return (
    <header className="sur-sombre relative isolate overflow-hidden profondeur text-blanc">
      {p ? (
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="parallaxe absolute -inset-y-[6%] inset-x-0">
            <Image src={p.src} alt="" fill preload fetchPriority="high" sizes="(max-width: 768px) 80vw, 100vw" quality={75} className="object-cover" style={{ objectPosition: p.focale }} />
          </div>
          <div className="absolute inset-0 voile-hero-clair" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 voile-bas-clair" />
          <div className="absolute inset-0 grain" />
        </div>
      ) : null}
      <div className="conteneur grid min-h-[min(34rem,70svh)] content-between gap-10 pb-[calc(clamp(2.25rem,5vw,5.5rem)+2rem)] pt-8 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pt-10">
        <div className="lg:col-span-12">
          <FilAriane etapes={ariane} />
        </div>
        <div className={`entree ${aside ? "lg:col-span-7" : "lg:col-span-9"}`}>
          <Equerres as="div" seule decalage={20} className="inline-block pl-1 pt-1">
            <h1 className="titre text-titre-xl text-blanc ombre-texte">{titre}</h1>
          </Equerres>
          {intro ? <p className="mt-7 max-w-[38rem] text-lg leading-relaxed text-blanc ombre-texte">{intro}</p> : null}
          {children ? <div className="mt-9 flex flex-wrap gap-4">{children}</div> : null}
        </div>
        {aside ? <div className="lg:col-span-4 lg:col-start-9">{aside}</div> : null}
      </div>
      {p ? <Profil couleur={suite} forme="talus" /> : null}
    </header>
  );
}

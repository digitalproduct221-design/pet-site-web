import Image from "next/image";
import type { ReactNode } from "react";
import { resoudreImage, type ImageSite } from "@/content/images";
import type { PhotoId } from "@/content/photos";
import { FilAriane } from "./FilAriane";
import { Equerres } from "./Equerres";
import { Motif } from "./Motif";
import { Profil } from "./Profil";
import { Icone } from "./Icone";

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

const atoutsDefaut = [
  {
    icone: "casque",
    titre: "+40 ans",
    desc: "d'expérience cumulée",
  },
  {
    icone: "engins",
    titre: "Parc matériel",
    desc: "engins récents équipés",
  },
  {
    icone: "qualite",
    titre: "Normes & Délais",
    desc: "qualité BTP certifiée",
  },
];

/**
 * En-tête des pages intérieures :
 * - Le bloc texte vient en premier (haut sur mobile, gauche sur bureau) avec fil d'Ariane
 *   et titre complètement dégagés et visibles sous l'en-tête flottante
 * - Hauteur augmentée et immersive (min-h-[46rem] sur grand écran)
 * - Cartes d'atouts esthétiques avec icônes qui comblent l'espace sous le texte
 * - La photo vient ensuite et se fond de manière 100% organique (fondu dégradé progressif sans aucun trait vertical, horizontal ou oblique, et sans aucun débordement)
 */
export function EnTetePage({ titre, intro, ariane, photo, children, aside, suite = "text-sable" }: Props) {
  const p = photo ? resoudreImage(photo) : null;
  const fond = suite === "text-sable" ? "bg-blanc" : "bg-sable";
  const couleurFond = suite === "text-sable" ? "text-blanc" : "text-sable";

  return (
    <header className={`relative isolate overflow-hidden ${fond} ${couleurFond}`}>
      <Motif type="plan" className="text-royal" opacite={0.14} />

      <div className={`grid ${p ? "min-h-[80vh] lg:min-h-[46rem] xl:min-h-[50rem] lg:grid-cols-12 items-stretch" : ""}`}>
        {/* BLOC TEXTE : Toujours en haut sur mobile, et à gauche sur grand écran */}
        <div
          className={`flex flex-col justify-center px-4 pb-14 pt-28 sm:px-6 sm:pt-32 lg:col-span-7 xl:col-span-6 lg:pb-20 lg:pl-[max(2rem,calc((100vw-var(--container-site))/2+2rem))] lg:pr-10 lg:pt-36`}
        >
          {/* Fil d'Ariane parfaitement visible et dégagé de l'en-tête */}
          <FilAriane etapes={ariane} ton="clair" />

          <div className="entree mt-4">
            <Equerres as="div" seule decalage={18} className="inline-block pl-1 pt-1">
              <h1 className="titre text-[clamp(2.5rem,1.4rem+3.4vw,4.5rem)] leading-[0.95] text-nuit">{titre}</h1>
            </Equerres>
            {intro ? <p className="mt-5 max-w-[38rem] text-lg leading-relaxed text-encre-douce">{intro}</p> : null}
            {children ? <div className="mt-7 flex flex-wrap gap-4">{children}</div> : null}
          </div>

          {/* Espace sous le texte : comblé par les atouts PET et icônes (esthétique et rassurant) */}
          {aside ? (
            <div className="mt-8">{aside}</div>
          ) : (
            <div className="mt-8 border-t border-nuit/10 pt-6 lg:mt-10 lg:pt-8">
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-jaune" />
                <span className="text-[0.72rem] font-bold uppercase tracking-wider text-nuit/70">
                  Garanties d&apos;exécution & engagements PET
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {atoutsDefaut.map((a) => (
                  <div
                    key={a.titre}
                    className="liquid-glass flex items-center gap-3 rounded-2xl p-3 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-jaune/20 text-nuit border border-jaune/40 shadow-sm">
                      <Icone nom={a.icone} size={20} weight="bold" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-[0.875rem] font-black uppercase leading-tight text-nuit truncate">
                        {a.titre}
                      </p>
                      <p className="text-[0.75rem] leading-snug text-encre-douce line-clamp-1">
                        {a.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PHOTO : Vient APRÈS le bloc texte sur mobile, et à droite sur grand écran */}
        {p ? (
          <div className="relative h-72 sm:h-96 lg:col-span-5 xl:col-span-6 lg:h-full overflow-hidden">
            {/* Conteneur d'image avec masque de fondu progressif organique (sans trait droit ni débordement) */}
            <div className="masque-fondu-hero absolute inset-0 bg-sable-soutenu">
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

            {/* Voile de fondu supplémentaire sur mobile (du haut vers le bas) */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-16 pointer-events-none lg:hidden"
              style={{
                background: "linear-gradient(to bottom, currentColor 0%, transparent 100%)",
                opacity: 0.9,
              }}
            />

            {/* Voile de fondu supplémentaire sur grand écran (de gauche à droite) */}
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-24 pointer-events-none hidden lg:block"
              style={{
                background: "linear-gradient(to right, currentColor 0%, transparent 100%)",
                opacity: 0.85,
              }}
            />
          </div>
        ) : null}
      </div>

      <Profil couleur={suite} forme="talus" />
    </header>
  );
}

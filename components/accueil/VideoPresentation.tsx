"use client";

import { useEffect, useRef, useState } from "react";
import { Equerres } from "@/components/ui/Equerres";
import { Icone } from "@/components/ui/Icone";
import { Motif } from "@/components/ui/Motif";

const VIDEO = "/video/pet-presentation.mp4";
const AFFICHE = "/video/pet-film-affiche.jpg";
const SOUS_TITRES = "/video/pet-presentation.vtt";

type Phase = "apercu" | "son" | "fin";

/**
 * Le film de présentation (1 min 05). Il démarre seul, sans le son, quand il arrive
 * à l'écran (les sous-titres sont incrustés) ; un seul clic sur « Regarder le film »
 * le relance depuis le début avec le son et les commandes natives. Rien n'est
 * chargé avant l'arrivée à l'écran ; sous mouvement réduit, seule l'affiche est
 * montrée jusqu'au clic. La lecture se met en pause hors de l'écran.
 */
export function VideoPresentation() {
  const video = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("apercu");
  const phaseRef = useRef<Phase>("apercu");

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    // `muted` doit être posé comme propriété pour autoriser la lecture automatique.
    v.muted = true;
    v.defaultMuted = true;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) v.pause();
        else if (phaseRef.current === "apercu" && !reduit) v.play().catch(() => {});
      },
      { threshold: 0.45 },
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, []);

  // Appelé directement dans le clic : un seul geste suffit, même sur Safari.
  const regarder = () => {
    const v = video.current;
    if (!v) return;
    v.muted = false;
    v.loop = false;
    v.currentTime = 0;
    v.play().catch(() => {});
    setPhase("son");
    v.focus({ preventScroll: true });
  };

  const voile = phase !== "son";

  return (
    <section aria-labelledby="titre-video" className="relative isolate overflow-hidden bg-nuit py-20 text-blanc lg:py-28">
      <Motif type="plan" className="text-ciel" opacite={0.1} />
      {/* Halo royal derrière le lecteur */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[58%] -z-10 h-[36rem] w-[70rem] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-royal/40 blur-[120px]" />

      <div className="conteneur">
        <div className="revele mx-auto max-w-[44rem] text-center">
          <p className="inline-flex items-center gap-3 font-label text-sm font-semibold uppercase tracking-[0.18em] text-jaune">
            <span aria-hidden className="size-1.5 rotate-45 bg-jaune" />
            Film de présentation
            <span aria-hidden className="size-1.5 rotate-45 bg-jaune" />
          </p>
          <h2 id="titre-video" className="titre mt-5 text-balance text-titre-l text-blanc">
            PET en une minute
          </h2>
          <p className="mx-auto mt-5 max-w-[34rem] text-lg leading-relaxed text-brume">
            Nos savoir-faire, notre méthode et nos valeurs, racontés en images de nos chantiers au Sénégal.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-[72rem] lg:mt-16">
          <Equerres decalage={16}>
            <div className="relative aspect-video overflow-hidden rounded-panneau bg-nuit-profond shadow-[0_40px_100px_-30px_rgb(0_0_0/0.75)] ring-1 ring-blanc/10">
              <video
                ref={video}
                className="size-full object-cover"
                muted
                loop
                playsInline
                preload="none"
                poster={AFFICHE}
                controls={phase === "son"}
                tabIndex={phase === "son" ? 0 : -1}
                onEnded={() => setPhase("fin")}
                aria-label="Film de présentation de PET, 1 minute 05, voix off et sous-titres incrustés"
              >
                <source src={VIDEO} type="video/mp4" />
                <track kind="captions" src={SOUS_TITRES} srcLang="fr" label="Français" />
              </video>

              {/* Voile d'aperçu : un seul bouton, qui lance le film avec le son */}
              <div
                className={`absolute inset-0 grid place-items-center bg-gradient-to-t from-nuit/80 via-nuit/25 to-nuit/10 transition-opacity duration-500 ease-[var(--ease-chantier)] ${voile ? "opacity-100" : "pointer-events-none opacity-0"}`}
              >
                <button
                  type="button"
                  onClick={regarder}
                  tabIndex={voile ? 0 : -1}
                  aria-hidden={!voile}
                  className="group flex cursor-pointer flex-col items-center gap-4 rounded-panneau p-4 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-jaune"
                >
                  <span className="relative grid size-16 place-items-center rounded-full bg-jaune text-nuit shadow-[0_14px_44px_rgb(247_198_28/0.45)] transition-transform duration-300 ease-[var(--ease-chantier)] motion-safe:group-hover:scale-110 sm:size-24">
                    <span aria-hidden className="absolute inset-0 rounded-full border-2 border-jaune/80 motion-safe:animate-ping motion-safe:[animation-duration:2.6s]" />
                    <Icone nom="lecture" size={32} weight="fill" className="ml-1" aria-hidden />
                  </span>
                  <span className="verre-liquide rounded-full px-5 py-2 font-label text-base font-semibold tracking-wide text-blanc sm:text-lg">
                    {phase === "fin" ? "Revoir le film" : "Regarder le film avec le son"}
                  </span>
                </button>
              </div>
            </div>
          </Equerres>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-brume">
            <li className="flex items-center gap-2">
              <Icone nom="lecture" size={16} className="text-jaune" aria-hidden />
              <span className="chiffres-tabulaires">1 min 05</span>
            </li>
            <li aria-hidden className="h-4 w-px bg-blanc/20" />
            <li>Voix off et sous-titres</li>
            <li aria-hidden className="h-4 w-px bg-blanc/20" />
            <li>
              <a href={VIDEO} download className="font-semibold text-blanc underline decoration-jaune decoration-2 underline-offset-4 transition-colors hover:text-jaune">
                Télécharger le film (MP4)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

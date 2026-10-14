"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowCounterClockwise, Pause, Play, SpeakerSlash } from "@phosphor-icons/react/ssr";
import { Bouton } from "@/components/ui/Bouton";
import { Equerres } from "@/components/ui/Equerres";
import { Icone } from "@/components/ui/Icone";
import { Motif } from "@/components/ui/Motif";

const VIDEO = "/video/pet-presentation.mp4";
const AFFICHE = "/video/pet-film-affiche.jpg";
const SOUS_TITRES = "/video/pet-presentation.vtt";

type Phase = "apercu" | "son" | "fin";

/**
 * Le film de présentation (58 s). Il démarre seul, sans le son, quand il arrive
 * à l'écran (les sous-titres sont incrustés) ; un seul clic (sur l'image ou sur
 * « Regarder le film avec le son ») le relance depuis le début avec le son et les commandes natives. Rien n'est
 * chargé avant l'arrivée à l'écran ; sous mouvement réduit, seule l'affiche est
 * montrée jusqu'au clic. La lecture se met en pause hors de l'écran.
 */
export function VideoPresentation() {
  const video = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("apercu");
  const [enPause, setEnPause] = useState(true);
  const pauseVoulue = useRef(false);
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
        else if (phaseRef.current === "apercu" && !reduit && !pauseVoulue.current) v.play().catch(() => {});
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


  return (
    <section aria-labelledby="titre-video" className="relative isolate overflow-hidden bg-nuit py-20 text-blanc lg:py-28">
      <Motif type="plan" className="text-ciel" opacite={0.1} />
      {/* Halo royal derrière le lecteur */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[58%] -z-10 h-[36rem] w-[70rem] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-royal/40 blur-[120px]" />

      <div className="conteneur">
        <div className="revele mx-auto max-w-[44rem] text-center">
          <h2 id="titre-video" className="titre text-balance text-titre-l text-blanc">
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
                onPlay={() => setEnPause(false)}
                onPause={() => setEnPause(true)}
                aria-label="Film de présentation de PET, 58 secondes, voix off et sous-titres incrustés"
              >
                <source src={VIDEO} type="video/mp4" />
                <track kind="captions" src={SOUS_TITRES} srcLang="fr" label="Français" />
              </video>

              {/* Aperçu muet : toute l'image se clique, l'angle rappelle que le son est coupé */}
              {phase === "apercu" ? (
                <button
                  type="button"
                  onClick={regarder}
                  aria-label="Regarder le film avec le son"
                  className="group absolute inset-0 cursor-pointer focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-jaune"
                >
                  <span aria-hidden className="absolute right-3 top-3 sm:right-5 sm:top-5">
                    <span className="verre-liquide flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-blanc transition-colors group-hover:text-jaune sm:px-4">
                      <SpeakerSlash size={18} weight="bold" />
                      <span className="max-sm:hidden">Activer le son</span>
                    </span>
                  </span>
                </button>
              ) : null}

              {/* Arrêt de l'aperçu automatique (WCAG 2.2.2) */}
              {phase === "apercu" ? (
                <button
                  type="button"
                  onClick={() => {
                    const v = video.current;
                    if (!v) return;
                    pauseVoulue.current = !v.paused;
                    if (v.paused) v.play().catch(() => {});
                    else v.pause();
                  }}
                  aria-label={enPause ? "Reprendre l'aperçu" : "Mettre l'aperçu en pause"}
                  className="verre-liquide absolute! bottom-3 right-3 grid size-11 cursor-pointer place-items-center rounded-full text-blanc transition-colors hover:text-jaune focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jaune sm:bottom-5 sm:right-5"
                >
                  {enPause ? <Play size={18} weight="fill" aria-hidden /> : <Pause size={18} weight="fill" aria-hidden />}
                </button>
              ) : null}

              {/* Fin du film : on propose de le revoir */}
              {phase === "fin" ? (
                <div className="absolute inset-0 grid place-items-center bg-nuit/55">
                  <button
                    type="button"
                    onClick={regarder}
                    className="group flex cursor-pointer flex-col items-center gap-4 rounded-panneau p-4 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-jaune"
                  >
                    <span className="grid size-16 place-items-center rounded-full bg-jaune text-nuit shadow-[0_14px_44px_rgb(247_198_28/0.45)] transition-transform duration-300 ease-chantier motion-safe:group-hover:scale-110 sm:size-20">
                      <ArrowCounterClockwise size={30} weight="bold" aria-hidden />
                    </span>
                    <span className="cote text-lg uppercase tracking-[0.04em] text-blanc">Revoir le film</span>
                  </button>
                </div>
              ) : null}
            </div>
          </Equerres>

          {phase === "apercu" ? (
            <div className="mt-10 flex justify-center">
              <Bouton onClick={regarder} icone="lecture">
                Regarder le film avec le son
              </Bouton>
            </div>
          ) : null}

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-brume">
            <li className="flex items-center gap-2">
              <Icone nom="lecture" size={16} className="text-jaune" aria-hidden />
              <span className="chiffres-tabulaires">58 s</span>
            </li>
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

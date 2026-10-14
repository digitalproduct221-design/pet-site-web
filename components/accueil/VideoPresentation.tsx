"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Equerres } from "@/components/ui/Equerres";
import { Icone, type NomIcone } from "@/components/ui/Icone";
import { Motif } from "@/components/ui/Motif";
import { TitreSection } from "@/components/ui/TitreSection";

const VIDEO = "/video/pet-presentation.mp4";
const AFFICHE = "/video/pet-film-affiche.jpg";
const SOUS_TITRES = "/video/pet-presentation.vtt";
const DUREE = "1 min 05";

// Débuts de chapitre (s), relevés sur la timeline de rendu (video/build/timeline.json).
const chapitres: { debut: number; titre: string; icone: NomIcone }[] = [
  { debut: 0, titre: "Qui est PET", icone: "histoire" },
  { debut: 13.1, titre: "Bâtiment", icone: "batiment" },
  { debut: 18.0, titre: "Travaux publics et VRD", icone: "route" },
  { debut: 24.3, titre: "Hydraulique", icone: "eau" },
  { debut: 29.3, titre: "Assainissement", icone: "assainissement" },
  { debut: 33.7, titre: "Génie civil", icone: "engins" },
  { debut: 43.3, titre: "Notre méthode", icone: "projet" },
  { debut: 53.4, titre: "Nos valeurs", icone: "valeurs" },
];

const horodatage = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/**
 * Le film de présentation (1 min 05, voix off et sous-titres). Rien n'est chargé
 * avant le clic : seule l'affiche est servie. Les chapitres permettent d'aller
 * directement à un savoir-faire ; la lecture se met en pause hors de l'écran.
 */
export function VideoPresentation() {
  const [lancee, setLancee] = useState(false);
  const [actif, setActif] = useState(0);
  const video = useRef<HTMLVideoElement>(null);
  const cadre = useRef<HTMLDivElement>(null);
  const departDemande = useRef(0);

  // Pause dès que le lecteur quitte l'écran.
  useEffect(() => {
    const el = cadre.current;
    if (!el || !lancee) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) video.current?.pause();
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [lancee]);

  // Au montage du lecteur : se placer au chapitre demandé puis lancer.
  useEffect(() => {
    const v = video.current;
    if (!lancee || !v) return;
    v.currentTime = departDemande.current;
    v.play().catch(() => {});
    v.focus({ preventScroll: true });
  }, [lancee]);

  const lire = (debut = 0) => {
    const v = video.current;
    if (!lancee || !v) {
      departDemande.current = debut;
      setLancee(true);
      return;
    }
    v.currentTime = debut;
    v.play().catch(() => {});
  };

  const suivre = () => {
    const t = video.current?.currentTime ?? 0;
    let i = 0;
    chapitres.forEach((c, k) => { if (t >= c.debut) i = k; });
    setActif(i);
  };

  return (
    <section aria-labelledby="titre-video" className="relative isolate overflow-hidden bg-nuit py-20 text-blanc lg:py-28">
      <Motif type="plan" className="text-ciel" opacite={0.12} />
      <div className="conteneur grid gap-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-8">
        {/* Mobile : titre, film, chapitres. Bureau : titre et chapitres à gauche, film à droite. */}
        <div className="revele lg:col-span-4 lg:row-start-1">
          <p className="flex items-center gap-3 font-label text-sm font-semibold uppercase tracking-[0.18em] text-jaune">
            <span aria-hidden className="size-1.5 rotate-45 bg-jaune" />
            Film de présentation
          </p>
          <TitreSection
            id="titre-video"
            ton="sombre"
            className="mt-5"
            titre="PET en une minute"
            intro="Nos cinq savoir-faire, notre méthode et nos valeurs, racontés en images de nos chantiers au Sénégal."
          />
        </div>

        <div className="lg:col-span-8 lg:col-start-5 lg:row-span-2 lg:row-start-1 lg:self-center">
          <Equerres decalage={14}>
            <div ref={cadre} className="relative aspect-video overflow-hidden rounded-chantier bg-nuit-profond shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]">
              {lancee ? (
                <video
                  ref={video}
                  className="size-full"
                  controls
                  playsInline
                  preload="auto"
                  poster={AFFICHE}
                  onTimeUpdate={suivre}
                  aria-label="Film de présentation de PET, 1 minute 05, avec voix off et sous-titres incrustés"
                >
                  <source src={VIDEO} type="video/mp4" />
                  <track kind="captions" src={SOUS_TITRES} srcLang="fr" label="Français" />
                  Votre navigateur ne lit pas la vidéo. <a href={VIDEO}>Télécharger le film (MP4)</a>.
                </video>
              ) : (
                <button
                  type="button"
                  onClick={() => lire(0)}
                  className="group absolute inset-0 cursor-pointer focus-visible:outline-none"
                  aria-label={`Lire le film de présentation de PET, ${DUREE}, avec voix off`}
                >
                  <Image
                    src={AFFICHE}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 62vw, 100vw"
                    quality={70}
                    className="object-cover transition-transform duration-700 ease-[var(--ease-chantier)] motion-safe:group-hover:scale-[1.03]"
                  />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-nuit/85 via-nuit/20 to-transparent" />
                  <span aria-hidden className="absolute inset-0 grid place-items-center">
                    <span className="relative grid size-16 place-items-center rounded-full bg-jaune text-nuit shadow-[0_12px_40px_rgb(247_198_28/0.45)] transition-transform duration-300 group-focus-visible:outline-4 group-focus-visible:outline-offset-4 group-focus-visible:outline-jaune motion-safe:group-hover:scale-110 sm:size-24">
                      <span className="absolute inset-0 rounded-full border-2 border-jaune motion-safe:animate-ping motion-safe:[animation-duration:2.4s]" />
                      <Icone nom="lecture" size={30} weight="fill" className="ml-1" />
                    </span>
                  </span>
                  <span aria-hidden className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-left sm:p-7">
                    <span className="max-sm:hidden">
                      <span className="block font-display text-2xl font-extrabold uppercase leading-none sm:text-3xl">Découvrez PET</span>
                      <span className="mt-2 block text-sm text-brume">Voix off et sous-titres</span>
                    </span>
                    <span className="ml-auto chiffres-tabulaires rounded-chantier bg-nuit/70 px-3 py-1.5 text-sm font-semibold backdrop-blur-sm">{DUREE}</span>
                  </span>
                </button>
              )}
            </div>
          </Equerres>
          <p className="mt-6 text-sm text-brume">
            Vous préférez le partager ?{" "}
            <a href={VIDEO} download className="font-semibold text-blanc underline decoration-jaune decoration-2 underline-offset-4 hover:text-jaune">
              Télécharger le film (MP4)
            </a>
          </p>
        </div>
        <div className="lg:col-span-4 lg:row-start-2">
          <ol aria-label="Chapitres du film" className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
            {chapitres.map((c, k) => {
              const enCours = lancee && actif === k;
              return (
                <li key={c.titre}>
                  <button
                    type="button"
                    onClick={() => lire(c.debut)}
                    aria-current={enCours ? "true" : undefined}
                    className={`group flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-chantier px-3 py-2 text-left transition-colors duration-200 hover:bg-blanc/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jaune ${enCours ? "bg-blanc/10" : ""}`}
                  >
                    <span aria-hidden className={`h-5 w-[3px] shrink-0 transition-colors ${enCours ? "bg-jaune" : "bg-blanc/15 group-hover:bg-ciel"}`} />
                    <Icone nom={c.icone} size={20} className={enCours ? "text-jaune" : "text-ciel"} aria-hidden />
                    <span className="cote flex-1 text-[1.0625rem]">{c.titre}</span>
                    <span className="chiffres-tabulaires text-sm text-brume">{horodatage(c.debut)}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { photos, type PhotoId } from "@/content/photos";
import { Icone } from "@/components/ui/Icone";

export type Diapo = { photo: PhotoId; onglet: string; legende: string; href: string; origine: string };

const DUREE = 7000;
const VOLET = 1300; // durée du volet diagonal (voir .diapo dans globals.css)

/**
 * Le diaporama du hero (photos, légende, onglets numérotés, pause) : seule
 * partie interactive du hero, dont le texte est rendu par le serveur.
 * Ne charge que la photo affichée et la suivante. Le défilement s'arrête au
 * survol ou au focus des commandes, hors de l'écran, et ne démarre pas sous
 * mouvement réduit.
 */
export function Diaporama({ diapos }: { diapos: Diapo[] }) {
  const total = diapos.length;
  const [index, setIndex] = useState(0);
  // Tant que le diaporama n'a pas bougé, la première photo s'affiche sans volet.
  const [aBouge, setABouge] = useState(false);
  // null : comportement par défaut (défilement, sauf mouvement réduit) ; sinon, choix du visiteur.
  const [lecture, setLecture] = useState<boolean | null>(null);
  const [reduit, setReduit] = useState(false);
  const [suspendu, setSuspendu] = useState(false);
  const [horsEcran, setHorsEcran] = useState(false);
  // Photos déjà demandées : la première, puis chaque photo affichée et sa suivante.
  const [chargees, setChargees] = useState<Set<number>>(() => new Set([0]));
  const racine = useRef<HTMLDivElement>(null);

  const enLecture = lecture ?? !reduit;
  const enPause = !enLecture || suspendu || horsEcran;

  const aller = useCallback(
    (i: number) => {
      setABouge(true);
      setIndex(((i % total) + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const requete = window.matchMedia("(prefers-reduced-motion: reduce)");
    const maj = () => setReduit(requete.matches);
    maj();
    requete.addEventListener("change", maj);
    return () => requete.removeEventListener("change", maj);
  }, []);

  useEffect(() => {
    if (enPause) return;
    const minuteur = window.setTimeout(() => aller(index + 1), DUREE);
    return () => window.clearTimeout(minuteur);
  }, [index, enPause, aller]);

  // La suivante se charge une fois la page au repos, pour ne pas concurrencer la photo affichée.
  useEffect(() => {
    const prechargerSuivante = () =>
      setChargees((c) => (c.has(index) && c.has((index + 1) % total) ? c : new Set([...c, index, (index + 1) % total])));
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(prechargerSuivante, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(prechargerSuivante, 1500);
    return () => clearTimeout(t);
  }, [index, total]);

  useEffect(() => {
    const el = racine.current?.closest("section");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setHorsEcran(!e.isIntersecting), { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const diapo = diapos[index];

  return (
    <div ref={racine} className="contents">
      {/* Photos */}
      <div className="absolute inset-0 -z-10">
        {diapos.map((d, i) => {
          const p = photos[d.photo];
          return (
            <div
              key={d.photo}
              role="group"
              aria-roledescription="diapositive"
              aria-label={`${i + 1} sur ${total} : ${d.onglet}`}
              aria-hidden={i !== index}
              data-active={i === index}
              data-pause={enPause}
              data-initial={!aBouge || undefined}
              className="diapo absolute inset-0 overflow-hidden"
              style={{ ["--origine" as string]: d.origine }}
            >
              {chargees.has(i) || i === index ? (
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  preload={i === 0}
                  fetchPriority={i === 0 ? "high" : "low"}
                  sizes="100vw"
                  quality={75}
                  className="object-cover"
                  style={{ objectPosition: p.focale }}
                />
              ) : null}
            </div>
          );
        })}
        {/* Lisibilité seulement là où il y a du texte : à gauche et sous les onglets */}
        {/* z-[2] : au-dessus de la photo active (z-index 1 pendant le volet) */}
        <div aria-hidden className="absolute inset-0 z-[2] voile-hero-clair" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-[2] h-[60%] voile-bas-clair" />
        <div aria-hidden className="absolute inset-0 z-[2] grain" />
      </div>

      {/* Commandes : légende, pause, onglets numérotés */}
      <div
        className="absolute inset-x-0 bottom-[clamp(2.25rem,5vw,5.5rem)] z-[2] pb-6"
        onMouseEnter={() => setSuspendu(true)}
        onMouseLeave={() => setSuspendu(false)}
        onFocusCapture={() => setSuspendu(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setSuspendu(false);
        }}
      >
        <div className="conteneur grid gap-4">
          <div className="flex items-end justify-between gap-6">
            {/* La légende arrive avec la photo, pas avant : léger retard calé sur le volet */}
            <p
              key={index}
              aria-live={enPause ? "polite" : "off"}
              className="max-w-[34rem] text-[1.0625rem] leading-snug text-blanc ombre-texte animate-[apparition_600ms_var(--ease-chantier)_both] max-md:sr-only [@media(min-width:48rem)_and_(max-height:820px)]:hidden"
              style={{ animationDelay: aBouge ? `${VOLET * 0.45}ms` : "0ms" }}
            >
              {diapo.legende}{" "}
              <Link
                href={diapo.href}
                className="group/lien inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap align-middle cote text-jaune hover:text-blanc"
              >
                Voir le domaine
                <Icone nom="fleche" size={16} weight="bold" className="transition-transform group-hover/lien:translate-x-1" />
              </Link>
            </p>
            <button
              type="button"
              onClick={() => setLecture(!enLecture)}
              aria-label={enLecture ? "Mettre le diaporama en pause" : "Lancer le diaporama"}
              className="bouton-verre ml-auto grid size-11 shrink-0 place-items-center rounded-full text-blanc transition-colors"
            >
              <Icone nom={enLecture ? "pause" : "lecture"} size={18} weight="fill" />
            </button>
          </div>

          <ol className="grid grid-cols-5 gap-3 sm:gap-5" style={{ ["--duree-diapo" as string]: `${DUREE}ms` }}>
            {diapos.map((d, i) => {
              const actif = i === index;
              return (
                <li key={d.photo}>
                  {/* Nom accessible = texte visible (« 01 Terrassement ») */}
                  <button
                    type="button"
                    onClick={() => aller(i)}
                    aria-current={actif ? "true" : undefined}
                    className="group/onglet block min-h-11 w-full pt-3 text-left"
                  >
                    <span
                      aria-hidden
                      data-active={actif && !enPause}
                      className="progression-diapo relative block h-[3px] overflow-hidden rounded-full bg-blanc/35 transition-colors group-hover/onglet:bg-blanc/60"
                    >
                      <span
                        className={`absolute inset-0 origin-left rounded-full bg-jaune ${i < index || (actif && enPause) ? "scale-x-100" : "scale-x-0"}`}
                      />
                    </span>
                    <span className="mt-3 flex items-baseline gap-3">
                      <span
                        className={`titre text-[1.75rem] leading-none chiffres-tabulaires transition-colors sm:text-[2.25rem] ${actif ? "text-blanc" : "text-blanc/75 group-hover/onglet:text-blanc"}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`sr-only cote text-[1rem] leading-tight transition-colors lg:not-sr-only ${actif ? "text-blanc" : "text-blanc/80 group-hover/onglet:text-blanc"}`}
                      >
                        {" "}
                        {d.onglet}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

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
 * Le diaporama du hero, dans son cadre photo : les photos sont affichées nettes,
 * sans voile ; légende, onglets numérotés et pause sont posés sur une barre de
 * verre clair en bas du cadre (lisible sur n'importe quelle photo).
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
  const [chargees, setChargees] = useState<Set<number>>(() => new Set([0]));
  const cadre = useRef<HTMLDivElement>(null);

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
    const el = cadre.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setHorsEcran(!e.isIntersecting), { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const diapo = diapos[index];

  return (
    <div ref={cadre} className="absolute inset-0 overflow-hidden bg-sable-soutenu">
      {/* Photos, nettes, sans voile */}
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
                sizes="(min-width: 1024px) 60vw, 100vw"
                quality={75}
                className="object-cover"
                style={{ objectPosition: p.focale }}
              />
            ) : null}
          </div>
        );
      })}

      {/* Barre de verre clair : légende, pause, onglets */}
      <div
        className="verre-clair absolute inset-x-3 bottom-3 z-[2] rounded-panneau p-3 sm:inset-x-5 sm:bottom-5 sm:p-4 lg:bottom-[calc(clamp(2.25rem,5vw,5.5rem)+0.5rem)] lg:left-[14%] lg:right-[max(1.25rem,calc((100vw-var(--container-site))/2+2rem))]"
        onMouseEnter={() => setSuspendu(true)}
        onMouseLeave={() => setSuspendu(false)}
        onFocusCapture={() => setSuspendu(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setSuspendu(false);
        }}
      >
        <div className="flex items-start justify-between gap-4 max-sm:absolute max-sm:right-3 max-sm:top-3">
          {/* La légende arrive avec la photo, pas avant : léger retard calé sur le volet */}
          <p
            key={index}
            aria-live={enPause ? "polite" : "off"}
            className="min-h-[2.6em] text-[0.9375rem] leading-snug text-encre animate-[apparition_600ms_var(--ease-chantier)_both] max-sm:sr-only sm:text-[1rem]"
            style={{ animationDelay: aBouge ? `${VOLET * 0.45}ms` : "0ms" }}
          >
            <strong className="cote font-semibold text-nuit">{diapo.onglet}</strong>
            <span aria-hidden className="mx-1.5 text-encre-douce">·</span>
            {diapo.legende}{" "}
            <Link href={diapo.href} className="group/lien inline-flex items-center gap-1 whitespace-nowrap cote text-royal hover:text-nuit">
              Voir le domaine
              <Icone nom="fleche" size={15} weight="bold" className="transition-transform group-hover/lien:translate-x-1" />
            </Link>
          </p>
          <button
            type="button"
            onClick={() => setLecture(!enLecture)}
            aria-label={enLecture ? "Mettre le diaporama en pause" : "Lancer le diaporama"}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-nuit text-blanc transition-colors hover:bg-royal"
          >
            <Icone nom={enLecture ? "pause" : "lecture"} size={16} weight="fill" />
          </button>
        </div>

        <ol className="grid grid-cols-5 gap-2 max-sm:pr-14 sm:mt-2 sm:gap-4" style={{ ["--duree-diapo" as string]: `${DUREE}ms` }}>
          {diapos.map((d, i) => {
            const actif = i === index;
            return (
              <li key={d.photo}>
                {/* Nom accessible = texte visible (« 01 Terrassement ») */}
                <button
                  type="button"
                  onClick={() => aller(i)}
                  aria-current={actif ? "true" : undefined}
                  className="group/onglet block min-h-11 w-full pt-2 text-left"
                >
                  <span
                    aria-hidden
                    data-active={actif && !enPause}
                    className="progression-diapo relative block h-[3px] overflow-hidden rounded-full bg-nuit/15 transition-colors group-hover/onglet:bg-nuit/30"
                  >
                    <span
                      className={`absolute inset-0 origin-left rounded-full bg-jaune-profond ${i < index || (actif && enPause) ? "scale-x-100" : "scale-x-0"}`}
                    />
                  </span>
                  <span className="mt-2 flex items-baseline gap-2">
                    <span
                      className={`titre text-[1.375rem] leading-none chiffres-tabulaires transition-colors sm:text-[1.625rem] ${actif ? "text-nuit" : "text-encre-douce group-hover/onglet:text-nuit"}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="sr-only"
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
  );
}

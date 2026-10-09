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
 * Diaporama du hero immersif : les photos occupent tout le cadre, nettes. Un seul
 * dégradé, ancré en bas à gauche sous le titre, assure la lisibilité ; le haut et
 * la droite de la photo restent naturels. Le panneau de verre en bas à droite
 * pilote le diaporama : vignette de la photo suivante, compteur, intitulé,
 * légende, flèches, pause et progression.
 * Ne charge que la photo affichée et la suivante. Le défilement s'arrête au survol
 * ou au focus du panneau, hors de l'écran, et ne démarre pas sous mouvement réduit.
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

  // La suivante (et sa vignette) se charge une fois la page au repos.
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
    // display: contents n'a pas de boîte : on observe la section du hero
    const el = cadre.current?.closest("section");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setHorsEcran(!e.isIntersecting), { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const diapo = diapos[index];
  const suivante = diapos[(index + 1) % total];
  const photoSuivante = photos[suivante.photo];

  return (
    <div ref={cadre} className="contents">
      {/* Photos plein cadre, nettes */}
      <div className="absolute inset-0 -z-10 bg-nuit">
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
        {/* Un seul dégradé, ancré en bas à gauche sous le titre (z-[2] : au-dessus de la photo active) */}
        <div aria-hidden className="absolute inset-0 z-[2] voile-immersif" />
      </div>

      {/* Panneau de verre : pilote du diaporama */}
      <div
        className="verre-immersif relative z-[3] w-full rounded-panneau p-3 text-blanc sm:p-4 lg:w-[25rem]"
        onMouseEnter={() => setSuspendu(true)}
        onMouseLeave={() => setSuspendu(false)}
        onFocusCapture={() => setSuspendu(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setSuspendu(false);
        }}
      >
        <div className="flex gap-4">
          {/* Vignette de la photo suivante : un clic l'affiche */}
          <button
            type="button"
            onClick={() => aller(index + 1)}
            className="group/suivante relative hidden size-24 shrink-0 overflow-hidden rounded-chantier sm:block"
            aria-label={`Photo suivante : ${suivante.onglet}`}
          >
            {chargees.has((index + 1) % total) ? (
              <Image
                src={photoSuivante.src}
                alt=""
                fill
                sizes="96px"
                className="object-cover transition-transform duration-500 group-hover/suivante:scale-110"
                style={{ objectPosition: photoSuivante.focale }}
              />
            ) : null}
            <span aria-hidden className="absolute inset-x-0 bottom-0 bg-nuit/70 py-1 text-center cote text-[0.75rem] uppercase tracking-[0.1em]">
              À suivre
            </span>
          </button>

          <div className="min-w-0 flex-1" aria-live={enPause ? "polite" : "off"} aria-atomic="true">
            <p className="flex items-center justify-between cote text-[0.875rem] uppercase tracking-[0.14em] text-jaune">
              <span>Nos chantiers</span>
              <span className="chiffres-tabulaires text-blanc">
                {String(index + 1).padStart(2, "0")} <span className="text-brume">/ {String(total).padStart(2, "0")}</span>
              </span>
            </p>
            <p key={index} className="mt-1 animate-[apparition_600ms_var(--ease-chantier)_both]" style={{ animationDelay: aBouge ? `${VOLET * 0.35}ms` : "0ms" }}>
              <span className="block titre text-[1.375rem] leading-none">{diapo.onglet}</span>
              <span className="mt-1.5 block text-[0.9375rem] leading-snug text-blanc/90 max-sm:sr-only">{diapo.legende}</span>
            </p>
            <Link href={diapo.href} className="group/lien mt-2 inline-flex min-h-11 items-center gap-1.5 cote text-[1rem] text-jaune hover:text-blanc sm:min-h-0">
              Voir le domaine
              <Icone nom="fleche" size={16} weight="bold" className="transition-transform group-hover/lien:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <ol className="flex flex-1 gap-1.5" style={{ ["--duree-diapo" as string]: `${DUREE}ms` }}>
            {diapos.map((d, i) => {
              const actif = i === index;
              return (
                <li key={d.photo} className="flex-1">
                  <button
                    type="button"
                    onClick={() => aller(i)}
                    aria-current={actif ? "true" : undefined}
                    aria-label={`${String(i + 1).padStart(2, "0")} ${d.onglet}`}
                    className="group/onglet block h-11 w-full"
                  >
                    <span
                      data-active={actif && !enPause}
                      className="progression-diapo relative block h-[3px] overflow-hidden rounded-full bg-blanc/30 transition-colors group-hover/onglet:bg-blanc/55"
                    >
                      <span className={`absolute inset-0 origin-left rounded-full bg-jaune ${i < index || (actif && enPause) ? "scale-x-100" : "scale-x-0"}`} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => aller(index - 1)}
              aria-label="Photo précédente"
              className="grid size-11 place-items-center rounded-full bg-blanc/12 transition-colors hover:bg-blanc hover:text-nuit"
            >
              <Icone nom="fleche" size={18} weight="bold" className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => setLecture(!enLecture)}
              aria-label={enLecture ? "Mettre le diaporama en pause" : "Lancer le diaporama"}
              className="grid size-11 place-items-center rounded-full bg-blanc/12 transition-colors hover:bg-blanc hover:text-nuit"
            >
              <Icone nom={enLecture ? "pause" : "lecture"} size={16} weight="fill" />
            </button>
            <button
              type="button"
              onClick={() => aller(index + 1)}
              aria-label="Photo suivante"
              className="grid size-11 place-items-center rounded-full bg-jaune text-nuit transition-colors hover:bg-blanc"
            >
              <Icone nom="fleche" size={18} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

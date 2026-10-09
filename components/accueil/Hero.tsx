"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { photos, type PhotoId } from "@/content/photos";
import { SLOGAN } from "@/content/site";
import { BoutonLien } from "@/components/ui/Bouton";
import { Equerres } from "@/components/ui/Equerres";
import { Icone } from "@/components/ui/Icone";

type Diapo = { photo: PhotoId; domaine: string; legende: string; href: string };

// Photos réelles de chantier (celles dont les droits sont à vérifier sont écartées).
const diapos: Diapo[] = [
  {
    photo: "terrassementEngins",
    domaine: "Travaux publics et VRD",
    legende: "Terrassement d'une plateforme à la pelle hydraulique et à la chargeuse.",
    href: "/savoir-faire/travaux-publics-vrd",
  },
  {
    photo: "conduiteOuvrage",
    domaine: "Hydraulique",
    legende: "Pose de conduite fonte et ferraillage de l'ouvrage de vannes.",
    href: "/savoir-faire/hydraulique",
  },
  {
    photo: "ferraillageOuvrage",
    domaine: "Génie civil",
    legende: "Armatures d'un ouvrage hydraulique en béton armé, avant coulage.",
    href: "/savoir-faire/genie-civil",
  },
  {
    photo: "dalotRegard",
    domaine: "Assainissement",
    legende: "Regard en béton raccordé au réseau, au cœur d'un quartier.",
    href: "/savoir-faire/assainissement",
  },
  {
    photo: "poseConduiteTopographie",
    domaine: "Hydraulique",
    legende: "Pose de conduite en tranchée, suivie au GPS par notre topographe.",
    href: "/savoir-faire/hydraulique",
  },
];

const DUREE = 7000;

/**
 * Hero immersif : diaporama plein écran de chantiers, fondu enchaîné et zoom lent
 * sous un voile bleu nuit (les photos basse définition ne sont jamais nues).
 * Commandes accessibles : précédent, suivant, pause, accès direct à chaque photo.
 * Le défilement s'arrête au survol, au focus, hors de l'écran, et ne démarre pas
 * sous mouvement réduit.
 */
export function Hero() {
  const [index, setIndex] = useState(0);
  // null : comportement par défaut (défilement, sauf mouvement réduit) ; sinon, choix explicite du visiteur.
  const [lecture, setLecture] = useState<boolean | null>(null);
  const [reduit, setReduit] = useState(false);
  const [suspendu, setSuspendu] = useState(false); // survol ou focus
  const [horsEcran, setHorsEcran] = useState(false);
  // Les photos suivantes ne se chargent qu'une fois la page au repos, pour ne pas
  // concurrencer la première (élément le plus visible du premier écran).
  const [suivantesPretes, setSuivantesPretes] = useState(false);
  const section = useRef<HTMLElement>(null);

  const enLecture = lecture ?? !reduit;
  const enPause = !enLecture || suspendu || horsEcran;

  useEffect(() => {
    const requete = window.matchMedia("(prefers-reduced-motion: reduce)");
    const maj = () => setReduit(requete.matches);
    maj();
    requete.addEventListener("change", maj);
    return () => requete.removeEventListener("change", maj);
  }, []);
  const total = diapos.length;
  const aller = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);

  useEffect(() => {
    if (enPause) return;
    const minuteur = window.setTimeout(() => aller(index + 1), DUREE);
    return () => window.clearTimeout(minuteur);
  }, [index, enPause, aller]);

  useEffect(() => {
    const charger = () => setSuivantesPretes(true);
    // Safari ne connaît pas requestIdleCallback : repli sur un délai.
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(charger, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(charger, 2000);
    return () => clearTimeout(t);
  }, []);

  // Hors de l'écran : on suspend.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setHorsEcran(!e.isIntersecting), { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const diapo = diapos[index];

  return (
    <section
      ref={section}
      aria-roledescription="carrousel"
      aria-label="Nos chantiers en images"
      onMouseEnter={() => setSuspendu(true)}
      onMouseLeave={() => setSuspendu(false)}
      onFocusCapture={() => setSuspendu(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setSuspendu(false);
      }}
      className="sur-sombre relative isolate flex min-h-[max(38rem,calc(100svh-var(--header-h)-var(--topbar-h)))] flex-col overflow-hidden bg-nuit text-blanc"
    >
      {/* Diapositives */}
      <div className="absolute inset-0 -z-10">
        {diapos.map((d, i) => {
          const p = photos[d.photo];
          return (
            <div
              key={d.photo}
              role="group"
              aria-roledescription="diapositive"
              aria-label={`${i + 1} sur ${total} : ${d.domaine}`}
              aria-hidden={i !== index}
              data-active={i === index}
              data-pause={enPause}
              className="diapo absolute inset-0 overflow-hidden"
            >
              {i === 0 || suivantesPretes || i === index ? (
              <Image
                src={p.src}
                alt={p.alt}
                fill
                preload={i === 0}
                fetchPriority={i === 0 ? "high" : "low"}
                sizes="(max-width: 768px) 70vw, 100vw"
                quality={50}
               
                className="object-cover"
                style={{ objectPosition: p.focale }}
              />
              ) : null}
            </div>
          );
        })}
        {/* Voile : dense à gauche pour le texte, en bas pour le panneau */}
        <div aria-hidden className="absolute inset-0 voile-hero" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 voile-bas" />
      </div>

      <div className="conteneur flex flex-1 flex-col justify-between gap-12 pb-8 pt-16 lg:pb-12 lg:pt-24">
        <div className="entree max-w-[46rem]">
          <Equerres seule decalage={22} className="inline-block pl-1 pt-2">
            <h1 className="titre text-titre-xl text-blanc ombre-texte">
              <span className="block">Nous bâtissons.</span>
              <span className="block">Nous raccordons.</span>
              <span className="block text-jaune">Nous durons.</span>
            </h1>
          </Equerres>
          <p className="mt-8 max-w-[32rem] text-[1.1875rem] leading-relaxed text-blanc/90">
            {SLOGAN}. Bâtiment, travaux publics, hydraulique, assainissement et génie civil, depuis 2016.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <BoutonLien href="/contact#devis">Demander un devis</BoutonLien>
            <BoutonLien href="/savoir-faire" variante="contour-clair">
              Nos savoir-faire
            </BoutonLien>
          </div>
        </div>

        {/* Panneau de verre liquide : légende et commandes du diaporama */}
        <div className="verre-liquide w-full max-w-[30rem] self-end rounded-[6px] p-5 sm:p-6">
          <div aria-live={enPause ? "polite" : "off"} aria-atomic="true">
            <div className="flex items-center justify-between gap-4">
              <p className="cote text-[0.875rem] uppercase tracking-[0.1em] text-jaune">{diapo.domaine}</p>
              <p className="cote text-[0.9375rem] text-brume chiffres-tabulaires">
                <span className="text-blanc">{String(index + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
              </p>
            </div>
            <p className="mt-2 min-h-[3.2em] text-[1.0625rem] leading-snug text-blanc">{diapo.legende}</p>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <Link href={diapo.href} className="group/lien inline-flex items-center gap-2 cote text-[1rem] text-blanc hover:text-jaune">
              Voir le domaine
              <Icone nom="fleche" size={18} weight="bold" className="transition-transform group-hover/lien:translate-x-1" />
            </Link>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => aller(index - 1)}
                aria-label="Photo précédente"
                className="grid size-11 place-items-center rounded-full text-blanc transition-colors hover:bg-blanc/15"
              >
                <Icone nom="fleche" size={20} weight="bold" className="rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => setLecture(!enLecture)}
                aria-label={enLecture ? "Mettre le diaporama en pause" : "Lancer le diaporama"}
                className="grid size-11 place-items-center rounded-full text-blanc transition-colors hover:bg-blanc/15"
              >
                <Icone nom={enLecture ? "pause" : "lecture"} size={20} weight="fill" />
              </button>
              <button
                type="button"
                onClick={() => aller(index + 1)}
                aria-label="Photo suivante"
                className="grid size-11 place-items-center rounded-full text-blanc transition-colors hover:bg-blanc/15"
              >
                <Icone nom="fleche" size={20} weight="bold" />
              </button>
            </div>
          </div>

          {/* Progression : un segment par photo, cliquable */}
          <div className="mt-4 flex gap-1.5" style={{ ["--duree-diapo" as string]: `${DUREE}ms` }}>
            {diapos.map((d, i) => (
              <button
                key={d.photo}
                type="button"
                onClick={() => aller(i)}
                aria-label={`Afficher la photo ${i + 1} : ${d.domaine}`}
                aria-current={i === index ? "true" : undefined}
                className="group/segment relative h-6 flex-1"
              >
                <span
                  data-active={i === index && !enPause}
                  className="progression-diapo absolute inset-x-0 top-1/2 block h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-blanc/25 transition-colors group-hover/segment:bg-blanc/45"
                >
                  <span
                    className={`absolute inset-0 origin-left rounded-full bg-jaune ${i < index || (i === index && enPause) ? "scale-x-100" : "scale-x-0"}`}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

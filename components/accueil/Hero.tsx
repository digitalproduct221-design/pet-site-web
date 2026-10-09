"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { photos, type PhotoId } from "@/content/photos";
import { SLOGAN } from "@/content/site";
import { BoutonLien } from "@/components/ui/Bouton";
import { Equerres } from "@/components/ui/Equerres";
import { Icone } from "@/components/ui/Icone";
import { Profil } from "@/components/ui/Profil";

type Diapo = { photo: PhotoId; onglet: string; legende: string; href: string; origine: string };

// Photos réelles de chantier, les plus lumineuses d'abord (droits à vérifier : écartées).
const diapos: Diapo[] = [
  {
    photo: "terrassementEngins",
    onglet: "Terrassement",
    legende: "Plateforme terrassée à la pelle hydraulique et à la chargeuse.",
    href: "/savoir-faire/travaux-publics-vrd",
    origine: "62% 58%",
  },
  {
    photo: "niveleuseVoirie",
    onglet: "Voirie",
    legende: "Réglage d'une voirie en terre à la niveleuse, guidée par le chef de chantier.",
    href: "/savoir-faire/travaux-publics-vrd",
    origine: "40% 45%",
  },
  {
    photo: "conduiteOuvrage",
    onglet: "Réseaux d'eau",
    legende: "Conduite en fonte, vannes et ferraillage de l'ouvrage, en fond de fouille.",
    href: "/savoir-faire/hydraulique",
    origine: "55% 50%",
  },
  {
    photo: "dalotRegard",
    onglet: "Assainissement",
    legende: "Regard en béton raccordé au réseau, au cœur d'un quartier de Dakar.",
    href: "/savoir-faire/assainissement",
    origine: "48% 62%",
  },
  {
    photo: "ferraillageOuvrage",
    onglet: "Génie civil",
    legende: "Armatures d'un ouvrage hydraulique en béton armé, avant coulage.",
    href: "/savoir-faire/genie-civil",
    origine: "45% 60%",
  },
];

const DUREE = 7000;

/**
 * Hero immersif et lumineux : diaporama plein écran de vrais chantiers, sans voile
 * général. Seuls un dégradé sous le texte et un autre sous les onglets assurent la
 * lisibilité. Chaque photo entre par un volet diagonal (comme la transition entre
 * pages) puis s'approche lentement. En bas, des onglets numérotés : la ligne de
 * l'onglet actif se remplit pendant l'affichage, un clic montre la photo.
 * Le défilement s'arrête au survol, au focus, hors de l'écran, et ne démarre pas
 * sous mouvement réduit.
 */
export function Hero() {
  const [index, setIndex] = useState(0);
  // Tant que le diaporama n'a pas bougé, la première photo s'affiche sans volet.
  const [aBouge, setABouge] = useState(false);
  // null : comportement par défaut (défilement, sauf mouvement réduit) ; sinon, choix du visiteur.
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
  const total = diapos.length;
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
      className="sur-sombre relative isolate flex min-h-[max(40rem,calc(100svh-var(--header-h)-var(--topbar-h)))] flex-col overflow-hidden bg-nuit text-blanc"
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
              aria-label={`${i + 1} sur ${total} : ${d.onglet}`}
              aria-hidden={i !== index}
              data-active={i === index}
              data-pause={enPause}
              data-initial={!aBouge || undefined}
              className="diapo absolute inset-0 overflow-hidden"
              style={{ ["--origine" as string]: d.origine }}
            >
              {i === 0 || suivantesPretes || i === index ? (
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  preload={i === 0}
                  fetchPriority={i === 0 ? "high" : "low"}
                  sizes="(max-width: 768px) 80vw, 100vw"
                  quality={75}
                  className="object-cover"
                  style={{ objectPosition: p.focale }}
                />
              ) : null}
            </div>
          );
        })}
        {/* Lisibilité seulement là où il y a du texte : à gauche et sous les onglets */}
        <div aria-hidden className="absolute inset-0 voile-hero-clair" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[55%] voile-bas-clair" />
        <div aria-hidden className="absolute inset-0 grain" />
      </div>

      <div className="conteneur flex flex-1 flex-col justify-between gap-12 pb-[calc(clamp(2.25rem,5vw,5.5rem)+1.5rem)] pt-14 lg:pt-20">
        <div className="entree max-w-[44rem]">
          <p className="cote text-[0.9375rem] uppercase tracking-[0.16em] text-blanc ombre-texte">
            Bâtiment · Travaux publics · Hydraulique · Assainissement · Génie civil
          </p>
          <Equerres
            decalage={20}
            className="mt-6 inline-block px-3 pb-4 pt-3"
            style={{ ["--equerre-taille" as string]: "clamp(2.5rem, 1.5rem + 3vw, 4.25rem)", ["--equerre-epaisseur" as string]: "5px" }}
          >
            <h1 className="titre text-titre-xl text-blanc ombre-texte">
              <span className="block">Nous bâtissons.</span>
              <span className="block">Nous raccordons.</span>
              <span className="block text-jaune">Nous durons.</span>
            </h1>
          </Equerres>
          <p className="mt-7 max-w-[30rem] text-[1.1875rem] leading-relaxed text-blanc ombre-texte">
            {SLOGAN}, depuis 2016.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <BoutonLien href="/contact#devis">Demander un devis</BoutonLien>
            <BoutonLien href="/savoir-faire" variante="contour-clair">
              Nos savoir-faire
            </BoutonLien>
          </div>
        </div>

        {/* Onglets numérotés : légende de la photo, progression, accès direct */}
        <div className="grid gap-4">
          <div aria-live={enPause ? "polite" : "off"} aria-atomic="true" className="flex items-end justify-between gap-6">
            <p className="max-w-[34rem] text-[1.0625rem] leading-snug text-blanc ombre-texte">
              {diapo.legende}{" "}
              <Link href={diapo.href} className="group/lien inline-flex items-center gap-1.5 whitespace-nowrap cote text-jaune hover:text-blanc">
                Voir le domaine
                <Icone nom="fleche" size={16} weight="bold" className="transition-transform group-hover/lien:translate-x-1" />
              </Link>
            </p>
            <button
              type="button"
              onClick={() => setLecture(!enLecture)}
              aria-label={enLecture ? "Mettre le diaporama en pause" : "Lancer le diaporama"}
              className="grid size-11 shrink-0 place-items-center rounded-full bg-blanc/15 text-blanc backdrop-blur-sm transition-colors hover:bg-blanc/30"
            >
              <Icone nom={enLecture ? "pause" : "lecture"} size={18} weight="fill" />
            </button>
          </div>

          <ol className="grid grid-cols-5 gap-3 sm:gap-5" style={{ ["--duree-diapo" as string]: `${DUREE}ms` }}>
            {diapos.map((d, i) => {
              const actif = i === index;
              return (
                <li key={d.photo}>
                  <button
                    type="button"
                    onClick={() => aller(i)}
                    aria-label={`Afficher la photo ${i + 1} : ${d.onglet}`}
                    aria-current={actif ? "true" : undefined}
                    className="group/onglet block w-full pt-3 text-left"
                  >
                    <span
                      data-active={actif && !enPause}
                      className="progression-diapo relative block h-[3px] overflow-hidden rounded-full bg-blanc/35 transition-colors group-hover/onglet:bg-blanc/60"
                    >
                      <span
                        className={`absolute inset-0 origin-left rounded-full bg-jaune ${i < index || (actif && enPause) ? "scale-x-100" : "scale-x-0"}`}
                      />
                    </span>
                    <span className="mt-3 flex items-baseline gap-3">
                      <span
                        className={`titre text-[1.75rem] leading-none chiffres-tabulaires transition-colors sm:text-[2.25rem] ${actif ? "text-blanc" : "text-blanc/55 group-hover/onglet:text-blanc/80"}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`hidden cote text-[1rem] leading-tight transition-colors md:block ${actif ? "text-blanc" : "text-blanc/70 group-hover/onglet:text-blanc"}`}
                      >
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

      <Profil couleur="text-sable" />
    </section>
  );
}

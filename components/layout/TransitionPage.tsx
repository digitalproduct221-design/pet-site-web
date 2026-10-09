"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import embleme from "@/public/brand/embleme-pet-inverse.png";
import { CLE_INTRO } from "./intro";


// Transition courte (≈ 0,6 s au total) : le volet jaune ne fait qu'un liseré devant le bleu nuit.
const COUVRE = 300; // entrée des volets
const DEVOILE = 340; // sortie des volets
const DECALAGE = 40; // le volet nuit suit de près le jaune : seul un liseré jaune se voit
const MAINTIEN = 0; // pas de pause : le logo ne reste que si la page tarde
const ATTENTE_MAX = 8000; // au-delà, on dévoile quoi qu'il arrive
const COURBE = "cubic-bezier(0.76, 0, 0.24, 1)";

const reduit = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Lien interne vers une autre page du site (pas une ancre, un filtre ni un fichier). */
function cibleInterne(e: MouseEvent): string | null {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
  const lien = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
  if (!lien || (lien.target && lien.target !== "_self") || lien.hasAttribute("download")) return null;
  if (lien.dataset.transition === "non") return null;
  const url = new URL(lien.href, location.href);
  if (url.origin !== location.origin) return null;
  if (url.pathname === location.pathname) return null;
  if (/\.[a-z0-9]{2,4}$/i.test(url.pathname) || url.pathname.startsWith("/api/")) return null;
  return url.pathname + url.search + url.hash;
}

/**
 * Transition plein écran entre les pages, comme une diapositive : un volet jaune
 * puis un volet bleu nuit balaient l'écran en diagonale, le logo PET apparaît au
 * centre (une barre de chargement s'y ajoute si la page tarde), puis les
 * volets repartent du même côté pour dévoiler la nouvelle page.
 * À la première page vue, le même rideau sert d'écran de chargement, mais
 * seulement si la page tarde (plus de 600 ms) : sinon il ne s'affiche jamais.
 * Aucun effet sous mouvement réduit : la navigation reste instantanée.
 */
export function TransitionPage() {
  const router = useRouter();
  const chemin = usePathname();
  const rideau = useRef<HTMLDivElement>(null);
  const occupe = useRef(false);
  const arrivee = useRef<{ chemin: string; resoudre: () => void } | null>(null);

  // Arrivée sur la nouvelle page : on libère l'attente.
  useEffect(() => {
    const a = arrivee.current;
    if (a && chemin === a.chemin) {
      arrivee.current = null;
      a.resoudre();
    }
  }, [chemin]);

  useEffect(() => {
    const el = rideau.current;
    if (!el) return;
    const volets = Array.from(el.querySelectorAll<HTMLElement>("[data-volet]"));
    const logo = el.querySelector<HTMLElement>("[data-logo]")!;

    const animer = (cible: HTMLElement, images: Keyframe[], duree: number, delai = 0) =>
      cible.animate(images, { duration: duree, delay: delai, easing: COURBE, fill: "forwards" }).finished;

    const couvrir = async () => {
      el.dataset.etat = "anime";
      await Promise.all([
        ...volets.map((v, i) => animer(v, [{ translate: "102% 0" }, { translate: "0 0" }], COUVRE, i * DECALAGE)),
        animer(logo, [{ opacity: 0, scale: "0.94" }, { opacity: 1, scale: "1" }], 180, COUVRE - 140),
      ]);
    };

    const devoiler = async () => {
      el.dataset.etat = "anime";
      el.dataset.attente = "non";
      // Le volet de dessus (bleu nuit) part en premier, le jaune le suit.
      const ordre = [...volets].reverse();
      await Promise.all([
        animer(logo, [{ opacity: 1 }, { opacity: 0 }], 120),
        ...ordre.map((v, i) => animer(v, [{ translate: "0 0" }, { translate: "-102% 0" }], DEVOILE, 40 + i * DECALAGE)),
      ]);
      el.dataset.etat = "repos";
      for (const a of el.getAnimations({ subtree: true })) a.cancel();
    };

    // Écran d'accueil au logo : il n'apparaît (en CSS) que si la page met plus de
    // 600 ms à devenir interactive. Page prête avant : il ne se montre jamais.
    // Page lente : on le dévoile dès que le script tourne, sans attendre les images.
    if (el.dataset.etat === "intro") {
      try {
        sessionStorage.setItem(CLE_INTRO, "1");
      } catch {}
      const affiche = getComputedStyle(el).visibility === "visible";
      if (!affiche || reduit()) {
        el.dataset.etat = "repos";
      } else {
        occupe.current = true;
        pause(MAINTIEN)
          .then(devoiler)
          .finally(() => (occupe.current = false));
      }
    }

    const surClic = (e: MouseEvent) => {
      const cible = cibleInterne(e);
      if (!cible || reduit()) return;
      e.preventDefault();
      if (occupe.current) return;
      occupe.current = true;
      const cheminCible = cible.split(/[?#]/)[0];
      router.prefetch(cible);

      (async () => {
        await couvrir();
        const arrive = new Promise<void>((resoudre) => (arrivee.current = { chemin: cheminCible, resoudre }));
        router.push(cible);
        // Si la page tarde, la barre de chargement apparaît sous le logo.
        const signal = setTimeout(() => (el.dataset.attente = "oui"), 250);
        await Promise.all([Promise.race([arrive, pause(ATTENTE_MAX)]), pause(MAINTIEN)]);
        clearTimeout(signal);
        arrivee.current = null;
        await devoiler();
      })().finally(() => (occupe.current = false));
    };

    document.addEventListener("click", surClic, true);
    return () => document.removeEventListener("click", surClic, true);
  }, [router]);

  return (
    <div ref={rideau} aria-hidden inert data-etat="intro" data-attente="non" className="rideau">
      <div data-volet className="rideau-volet bg-jaune" />
      <div data-volet className="rideau-volet profondeur" />
      <div data-logo className="rideau-logo">
        <Image src={embleme} alt="" loading="eager" fetchPriority="low" sizes="160px" className="h-auto w-28 sm:w-36" />
        <span className="rideau-nom titre">Partenaire Entreprise Travaux</span>
        <span className="rideau-barre" />
      </div>
    </div>
  );
}

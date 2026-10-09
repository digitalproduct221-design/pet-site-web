"use client";

import { useEffect } from "react";

const SELECTEUR = ".revele:not([data-vu]), .revele-groupe:not([data-vu]), .revele-image:not([data-vu]), .equerres:not([data-vu]), .carte-senegal:not([data-vu])";

/**
 * Apparitions au défilement, une seule fois par élément
 * (.revele, .revele-groupe, .revele-image, et la fermeture des .equerres).
 * Le contenu n'est jamais masqué : il est seulement un peu décalé tant qu'il
 * n'est pas vu (classe `js` sur <html>), et rien ne bouge sous mouvement réduit.
 * Les éléments ajoutés plus tard (changement de page, filtres) sont pris en compte.
 */
export function Reveleur() {
  useEffect(() => {
    document.documentElement.classList.add("js");

    // Ancre à l'arrivée (chargement direct ou rechargement) : si le navigateur n'a
    // pas placé la cible en haut de l'écran (restauration de défilement, contenu
    // diffusé après coup), on s'y place une fois la page prête.
    const ancre = decodeURIComponent(location.hash.slice(1));
    if (ancre) {
      const placer = () => {
        const cible = document.getElementById(ancre);
        if (!cible) return;
        const haut = cible.getBoundingClientRect().top;
        if (haut < 0 || haut > window.innerHeight * 0.4) cible.scrollIntoView({ block: "start", behavior: "instant" });
      };
      requestAnimationFrame(placer);
      window.addEventListener("load", placer, { once: true });
    }

    const intersection = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.vu = "";
            intersection.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );

    const suivis = new WeakSet<Element>();
    const observer = () => {
      document.querySelectorAll(SELECTEUR).forEach((el) => {
        if (suivis.has(el)) return;
        suivis.add(el);
        intersection.observe(el);
      });
    };
    observer();

    let attente = 0;
    const mutations = new MutationObserver(() => {
      cancelAnimationFrame(attente);
      attente = requestAnimationFrame(observer);
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersection.disconnect();
      mutations.disconnect();
      cancelAnimationFrame(attente);
    };
  }, []);

  return null;
}

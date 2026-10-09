"use client";

import { useEffect } from "react";

const SELECTEUR = ".revele:not([data-vu]), .revele-groupe:not([data-vu]), .revele-image:not([data-vu]), .trace:not([data-vu])";

/**
 * Apparitions au défilement, une seule fois par élément
 * (.revele, .revele-groupe, .revele-image, .trace).
 * Le contenu est visible par défaut : il n'est masqué qu'une fois ce script
 * actif (classe `js` sur <html>), et jamais sous mouvement réduit (voir CSS).
 * Les éléments ajoutés plus tard (changement de page, filtres) sont pris en compte.
 */
export function Reveleur() {
  useEffect(() => {
    document.documentElement.classList.add("js");

    const intersection = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.vu = "";
            intersection.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
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

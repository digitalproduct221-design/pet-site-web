"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Apparitions au défilement, une seule fois par élément (.revele, .revele-groupe, .revele-image, .trace).
 * Le contenu est visible par défaut : il n'est masqué qu'une fois ce script
 * actif (classe `js` sur <html>), et jamais sous mouvement réduit (voir CSS).
 */
export function Reveleur() {
  const chemin = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js");
    const elements = document.querySelectorAll<HTMLElement>(".revele:not([data-vu]), .trace:not([data-vu]), .revele-groupe:not([data-vu]), .revele-image:not([data-vu])");
    const obs = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.vu = "";
            obs.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [chemin]);

  return null;
}

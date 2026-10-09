"use client";

import { useEffect, useState } from "react";
import { besoins } from "@/content/besoins";

/**
 * Barre des besoins, fixée sous le header : elle n'apparaît que pendant la lecture
 * des sections de besoins (jamais à côté des cartes, qu'elle répéterait), met en
 * avant le besoin à l'écran et permet de sauter de l'un à l'autre.
 */
export function NavBesoins() {
  const [actif, setActif] = useState<string | null>(null);

  useEffect(() => {
    const sections = besoins.map((b) => document.getElementById(b.slug)).filter(Boolean) as HTMLElement[];
    const visibles = new Set<string>();
    const obs = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          if (e.isIntersecting) visibles.add(e.target.id);
          else visibles.delete(e.target.id);
        }
        // Le premier besoin (dans l'ordre de la page) qui traverse le milieu de l'écran
        setActif(besoins.find((b) => visibles.has(b.slug))?.slug ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const visible = actif !== null;

  return (
    <nav
      aria-label="Aller à un besoin"
      inert={!visible}
      className={`verre fixed inset-x-0 top-[var(--header-h-compact)] z-30 transition-[translate,opacity] duration-500 ease-chantier ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
      }`}
    >
      <ul className="conteneur flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
        {besoins.map((b, i) => {
          const courant = b.slug === actif;
          return (
            <li key={b.slug} className="shrink-0">
              <a
                href={`#${b.slug}`}
                aria-current={courant ? "location" : undefined}
                className={`flex min-h-11 items-center gap-2 whitespace-nowrap rounded-chantier px-4 cote text-[1rem] transition-colors ${
                  courant ? "bg-nuit text-blanc" : "text-nuit hover:bg-sable"
                }`}
              >
                <span className={`chiffres-tabulaires ${courant ? "text-jaune" : "text-royal"}`}>{String(i + 1).padStart(2, "0")}</span>
                {b.titre}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

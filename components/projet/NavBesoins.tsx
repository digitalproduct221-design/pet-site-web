"use client";

import { useEffect, useState } from "react";
import { besoins } from "@/content/besoins";

/**
 * Barre collante des besoins : suit la lecture (le besoin à l'écran est mis en
 * avant) et permet de sauter de l'un à l'autre. Verre dépoli sur le contenu.
 */
export function NavBesoins() {
  const [actif, setActif] = useState<string | null>(null);

  useEffect(() => {
    const sections = besoins.map((b) => document.getElementById(b.slug)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) if (e.isIntersecting) setActif(e.target.id);
      },
      // Une section est « active » quand elle traverse le milieu de l'écran.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <nav aria-label="Aller à un besoin" className="verre sticky top-[var(--header-h-compact)] z-30">
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

"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icone } from "@/components/ui/Icone";
import { Logo } from "./Logo";
import { MenuMobile } from "./MenuMobile";
import { NavStatique } from "./NavStatique";

// Le méga-menu (Radix) ne se charge que sur grand écran : sous 1152 px, le menu
// plein écran prend le relais. La barre statique tient la place pendant le chargement.
const MegaMenu = dynamic(() => import("./MegaMenu").then((m) => m.MegaMenu), {
  ssr: false,
  loading: () => <NavStatiqueCourante />,
});

function NavStatiqueCourante() {
  return <NavStatique chemin={usePathname()} />;
}
import { Recherche } from "./Recherche";

/**
 * Header collant. Au défilement, il se réduit et passe en verre dépoli
 * (détection par IntersectionObserver, sans écouteur de scroll).
 */
export function Header() {
  const sentinelle = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);
  const [grandEcran, setGrandEcran] = useState(false);
  const chemin = usePathname();

  useEffect(() => {
    const requete = window.matchMedia("(width >= 72rem)");
    const maj = () => setGrandEcran(requete.matches);
    maj();
    requete.addEventListener("change", maj);
    return () => requete.removeEventListener("change", maj);
  }, []);

  useEffect(() => {
    const el = sentinelle.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setCompact(!e.isIntersecting));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelle} aria-hidden className="pointer-events-none absolute left-0 top-0 h-24 w-px" />
      <header
        data-compact={compact}
        className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-500 ease-chantier ${
          compact ? "verre" : "bg-blanc shadow-[inset_0_-1px_0_var(--color-ligne)]"
        }`}
      >
        <div
          className={`conteneur flex items-center justify-between gap-6 transition-[height] duration-500 ease-chantier ${
            compact ? "h-[var(--header-h-compact)] [--header-h:var(--header-h-compact)]" : "h-[var(--header-h)]"
          }`}
        >
          <Logo compact={compact} />
          {grandEcran ? <MegaMenu /> : <NavStatique chemin={chemin} />}
          <div className="flex items-center gap-2 lg:gap-3">
            <Recherche />
            <Link
              href="/contact#devis"
              className="group/devis relative hidden min-h-12 items-center gap-2.5 whitespace-nowrap rounded-chantier bg-jaune px-5 cote text-[1rem] uppercase tracking-[0.04em] text-nuit ombre-bouton transition-colors duration-300 hover:bg-jaune-profond sm:inline-flex"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -left-1.5 -top-1.5 size-3.5 translate-x-1 translate-y-1 border-l-[3px] border-t-[3px] border-nuit opacity-0 transition-[opacity,translate] duration-300 ease-chantier group-hover/devis:translate-x-0 group-hover/devis:translate-y-0 group-hover/devis:opacity-100"
              />
              Demander un devis
              <Icone nom="fleche" size={18} weight="bold" className="transition-transform duration-300 group-hover/devis:translate-x-0.5" />
            </Link>
            <MenuMobile />
          </div>
        </div>
      </header>
    </>
  );
}

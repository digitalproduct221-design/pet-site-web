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
        className="fixed top-2.5 sm:top-4 inset-x-0 z-50 px-2.5 sm:px-6 pointer-events-none transition-[top] duration-500 ease-chantier"
      >
        <div
          className={`pointer-events-auto mx-auto max-w-[85rem] flex items-center justify-between gap-3 sm:gap-6 rounded-full px-3.5 sm:px-6 transition-all duration-500 ease-chantier ${
            compact
              ? "h-14 sm:h-15 lg:h-16 liquid-glass-sombre border-white/25 shadow-[0_16px_36px_-10px_rgba(7,18,43,0.5),0_2px_8px_-2px_rgba(7,18,43,0.1)] text-blanc"
              : "h-15 sm:h-16 lg:h-[4.75rem] liquid-glass shadow-[0_12px_32px_-8px_rgba(7,18,43,0.18),0_1px_3px_rgba(0,0,0,0.04)] text-nuit"
          }`}
        >
          <Logo compact={compact} ton={compact ? "sombre" : "clair"} />
          {grandEcran ? <MegaMenu /> : <NavStatique chemin={chemin} />}
          <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3">
            <Recherche />
            {/* Action discrète WhatsApp rapide sur mobile en bulle de verre liquide */}
            <a
              href="https://wa.me/221775970198"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contacter PET sur WhatsApp"
              className="flex size-10 items-center justify-center rounded-full bg-white/40 backdrop-blur-xl border border-white/70 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.9),0_4px_12px_rgba(7,18,43,0.1)] text-[#128C7E] transition-all hover:scale-105 hover:bg-[#25D366] hover:text-white active:scale-95 sm:hidden"
            >
              <Icone nom="whatsapp" size={20} weight="bold" />
            </a>
            <Link
              href="/contact#devis"
              className="group/devis relative hidden min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-jaune px-5.5 cote text-[0.9375rem] uppercase tracking-[0.04em] text-nuit ombre-bouton transition-all duration-300 hover:bg-jaune-profond hover:shadow-lg sm:inline-flex"
            >
              Demander un devis
              <Icone nom="fleche" size={16} weight="bold" className="transition-transform duration-300 group-hover/devis:translate-x-0.5" />
            </Link>
            <MenuMobile />
          </div>
        </div>
      </header>
    </>
  );
}

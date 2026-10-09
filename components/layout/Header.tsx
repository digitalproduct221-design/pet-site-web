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
        className="sticky top-2 sm:top-3 z-50 px-2.5 sm:px-4 lg:px-6 transition-[top] duration-500 ease-chantier"
      >
        <div
          className={`mx-auto max-w-[85rem] flex items-center justify-between gap-3 sm:gap-6 rounded-2xl border px-3 sm:px-5 lg:px-6 transition-all duration-500 ease-chantier ${
            compact
              ? "h-14 sm:h-15 lg:h-16 bg-blanc/92 backdrop-blur-2xl border-white/90 shadow-[0_12px_36px_-10px_rgba(7,18,43,0.18),0_2px_8px_-2px_rgba(7,18,43,0.06)]"
              : "h-15 sm:h-16 lg:h-[4.75rem] bg-blanc/85 backdrop-blur-xl border-white/60 shadow-[0_8px_30px_-8px_rgba(7,18,43,0.1),0_1px_3px_rgba(0,0,0,0.04)]"
          }`}
        >
          <Logo compact={compact} />
          {grandEcran ? <MegaMenu /> : <NavStatique chemin={chemin} />}
          <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-3">
            <Recherche />
            {/* Action discrète WhatsApp rapide sur mobile */}
            <a
              href="https://wa.me/221775970198"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contacter PET sur WhatsApp"
              className="flex size-9 items-center justify-center rounded-chantier bg-[#25D366]/15 text-[#128C7E] transition-all hover:bg-[#25D366]/25 active:scale-95 sm:hidden"
            >
              <Icone nom="whatsapp" size={19} weight="bold" />
            </a>
            <Link
              href="/contact#devis"
              className="group/devis relative hidden min-h-11 items-center gap-2 whitespace-nowrap rounded-chantier bg-jaune px-4.5 cote text-[0.9375rem] uppercase tracking-[0.04em] text-nuit ombre-bouton transition-colors duration-300 hover:bg-jaune-profond sm:inline-flex"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -left-1.5 -top-1.5 size-3.5 translate-x-1 translate-y-1 border-l-[3px] border-t-[3px] border-nuit opacity-0 transition-[opacity,translate] duration-300 ease-chantier group-hover/devis:translate-x-0 group-hover/devis:translate-y-0 group-hover/devis:opacity-100"
              />
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

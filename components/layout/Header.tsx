"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icone } from "@/components/ui/Icone";
import { Logo } from "./Logo";
import { MenuMobile } from "./MenuMobile";
import { NavStatique } from "./NavStatique";
import { Recherche } from "./Recherche";

const MegaMenu = dynamic(() => import("./MegaMenu").then((m) => m.MegaMenu), {
  ssr: false,
  loading: () => <NavStatiqueCourante />,
});

function NavStatiqueCourante() {
  return <NavStatique chemin={usePathname()} />;
}

/**
 * Header intelligent flottant Liquid Glass :
 * - Disparaît avec fluidité au défilement vers le bas pour dégager la vue et laisser place à la navbar mobile
 * - Réapparaît instantanément au défilement vers le haut ou en haut de page
 * - Capsule blanc dépoli haute lisibilité (aucun conflit de contraste sur les blocs bleus ou sombres)
 */
export function Header() {
  const [visible, setVisible] = useState(true);
  const [scrolle, setScrolle] = useState(false);
  const [grandEcran, setGrandEcran] = useState(false);
  const dernierY = useRef(0);
  const chemin = usePathname();

  useEffect(() => {
    const requete = window.matchMedia("(width >= 72rem)");
    const maj = () => setGrandEcran(requete.matches);
    maj();
    requete.addEventListener("change", maj);
    return () => requete.removeEventListener("change", maj);
  }, []);

  useEffect(() => {
    let ticking = false;

    const gererScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          setScrolle(y > 35);

          if (y < 60) {
            // Toujours visible tout en haut
            setVisible(true);
          } else {
            const delta = y - dernierY.current;
            // Défilement vers le bas : masquer pour laisser place à la navbar mobile
            if (delta > 8) {
              setVisible(false);
            }
            // Défilement vers le haut : réafficher immédiatement
            else if (delta < -8) {
              setVisible(true);
            }
          }
          dernierY.current = y;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", gererScroll, { passive: true });
    return () => window.removeEventListener("scroll", gererScroll);
  }, []);

  // Réafficher l'en-tête lors d'un changement de page
  useEffect(() => {
    setVisible(true);
  }, [chemin]);

  return (
    <header
      aria-label="En-tête principale"
      className={`fixed top-2.5 sm:top-4 inset-x-0 z-50 px-2.5 sm:px-6 pointer-events-none transition-all duration-500 ease-chantier ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-28 opacity-0"
      }`}
    >
      <div
        className={`pointer-events-auto mx-auto max-w-[85rem] flex items-center justify-between gap-3 sm:gap-6 rounded-full px-3.5 sm:px-6 transition-all duration-500 ease-chantier ${
          scrolle
            ? "h-14 sm:h-15 lg:h-16 bg-blanc/95 backdrop-blur-2xl border border-white/90 shadow-[0_16px_36px_-10px_rgba(7,18,43,0.18),0_2px_8px_rgba(0,0,0,0.06)] text-nuit"
            : "h-15 sm:h-16 lg:h-[4.75rem] liquid-glass shadow-[0_12px_32px_-8px_rgba(7,18,43,0.18),0_1px_3px_rgba(0,0,0,0.04)] text-nuit"
        }`}
      >
        <Logo compact={scrolle} ton="clair" />
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
  );
}

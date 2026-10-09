"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Icone } from "@/components/ui/Icone";
import { telephones, whatsapp } from "@/content/site";

interface ItemMenu {
  id: string;
  titre: string;
  href: string;
  icone: string;
  estCentral?: boolean;
}

const items: ItemMenu[] = [
  { id: "accueil", titre: "Accueil", href: "/", icone: "accueil" },
  { id: "savoir-faire", titre: "Métiers", href: "/savoir-faire", icone: "engins" },
  { id: "contact", titre: "Contact", href: "/contact", icone: "telephone", estCentral: true },
  { id: "realisations", titre: "Chantiers", href: "/realisations", icone: "photos" },
  { id: "devis", titre: "Devis", href: "/contact#devis", icone: "devis" },
];

const domainesRapides = [
  { titre: "Bâtiment", href: "/savoir-faire/batiment", icone: "batiment" },
  { titre: "TP & VRD", href: "/savoir-faire/travaux-publics-vrd", icone: "route" },
  { titre: "Hydraulique", href: "/savoir-faire/hydraulique", icone: "eau" },
  { titre: "Assainissement", href: "/savoir-faire/assainissement", icone: "assainissement" },
  { titre: "Génie civil", href: "/savoir-faire/genie-civil", icone: "genie-civil" },
];

/**
 * Navbar mobile flottante Liquid Glass (Dock Apple avec bouton central surélevé) :
 * - 5 menus avec icône en bulle arrondie en haut et libellé en bas
 * - Bouton central « Contact » (#3) proéminent qui déborde vers le haut (action clé)
 * - Morphisme verre liquide dépoli avec biseau supérieur lumineux
 */
export function BarreActionsMobile() {
  const chemin = usePathname();
  const [tiroir, setTiroir] = useState<"domaines" | "contact" | null>(null);

  const getActif = () => {
    if (chemin === "/") return "accueil";
    if (chemin.startsWith("/savoir-faire")) return "savoir-faire";
    if (chemin.startsWith("/realisations")) return "realisations";
    if (chemin.startsWith("/contact#devis") || chemin.includes("devis")) return "devis";
    if (chemin.startsWith("/contact")) return "contact";
    return "";
  };

  const actif = getActif();

  useEffect(() => {
    setTiroir(null);
  }, [chemin]);

  const handleItemClick = (id: string) => {
    if (id === "savoir-faire") {
      if (actif === "savoir-faire") {
        setTiroir((prev) => (prev === "domaines" ? null : "domaines"));
      }
    } else if (id === "contact") {
      if (actif === "contact") {
        setTiroir((prev) => (prev === "contact" ? null : "contact"));
      }
    } else {
      setTiroir(null);
    }
  };

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-md lg:hidden select-none">
      {/* Tiroir rapide des 5 domaines */}
      {tiroir === "domaines" && (
        <div className="mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300 rounded-2xl liquid-glass-sombre p-2.5 shadow-2xl">
          <div className="mb-2 flex items-center justify-between px-2 text-[0.75rem] font-bold uppercase tracking-wider text-brume">
            <span>Métiers du BTP</span>
            <button
              type="button"
              onClick={() => setTiroir(null)}
              className="text-jaune hover:text-white"
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {domainesRapides.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                onClick={() => setTiroir(null)}
                className="flex items-center gap-2 rounded-xl bg-white/10 px-2.5 py-2 text-[0.8125rem] font-medium text-blanc transition-colors hover:bg-jaune hover:text-nuit active:scale-95"
              >
                <Icone nom={d.icone} size={16} className="text-jaune" />
                <span className="truncate">{d.titre}</span>
              </Link>
            ))}
            <Link
              href="/savoir-faire"
              onClick={() => setTiroir(null)}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-jaune/25 px-2.5 py-2 text-[0.8125rem] font-bold text-jaune hover:bg-jaune hover:text-nuit active:scale-95"
            >
              Tous les métiers →
            </Link>
          </div>
        </div>
      )}

      {/* Tiroir contact direct */}
      {tiroir === "contact" && (
        <div className="mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300 flex items-center justify-center gap-2 rounded-2xl liquid-glass-sombre p-2.5 shadow-2xl">
          <a
            href={telephones[0].lien}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/12 px-3 py-2.5 text-[0.8125rem] font-bold text-blanc transition-colors hover:bg-white/20 active:scale-95"
          >
            <Icone nom="telephone" size={17} className="text-jaune" />
            Appeler
          </a>
          <a
            href={whatsapp.lien}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-2.5 text-[0.8125rem] font-bold text-white shadow-md transition-transform active:scale-95"
          >
            <Icone nom="whatsapp" size={18} weight="bold" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setTiroir(null)}
            className="grid size-9 place-items-center rounded-xl bg-white/10 text-brume hover:text-white"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Barre de navigation principale : Dock Liquid Glass avec bouton central Contact débordant */}
      <nav
        aria-label="Navigation mobile principale"
        className="relative flex h-[3.875rem] items-center justify-around rounded-full liquid-glass-sombre px-2 shadow-[0_16px_40px_-10px_rgba(7,18,43,0.85),0_2px_8px_rgba(0,0,0,0.4)]"
      >
        {items.map((item) => {
          const isActif = actif === item.id;

          // Bouton central proéminent : CONTACT (#3 surélevé)
          if (item.estCentral) {
            return (
              <div key={item.id} className="relative -top-3.5 flex flex-col items-center">
                <Link
                  href={item.href}
                  onClick={() => handleItemClick(item.id)}
                  aria-label="Prendre contact avec PET"
                  className="group/central relative grid size-13.5 place-items-center rounded-full liquid-glass-or text-nuit border-2 border-white/95 shadow-[0_12px_24px_-4px_rgba(247,198,28,0.7),0_4px_12px_rgba(7,18,43,0.35)] transition-transform duration-300 hover:scale-105 active:scale-95"
                >
                  <Icone nom={item.icone} size={24} weight="bold" className="transition-transform group-hover/central:scale-110" />
                </Link>
                <span className="mt-1 text-[0.6875rem] font-black uppercase tracking-wider text-jaune">
                  {item.titre}
                </span>
              </div>
            );
          }

          // Éléments standards (Accueil, Métiers, Chantiers, Devis) :
          // Icône en bulle arrondie au-dessus, nom de la page en dessous
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => handleItemClick(item.id)}
              aria-current={isActif ? "page" : undefined}
              className="group/nav flex flex-1 flex-col items-center justify-center py-1 transition-transform active:scale-95"
            >
              {/* Bulle d'icône arrondie en haut */}
              <span
                className={`flex size-8.5 items-center justify-center rounded-full transition-all duration-300 ${
                  isActif
                    ? "bg-white/25 text-jaune border border-white/50 shadow-[0_2px_8px_rgba(255,255,255,0.2)] scale-105"
                    : "bg-white/8 text-white/75 group-hover/nav:bg-white/15 group-hover/nav:text-white border border-white/15"
                }`}
              >
                <Icone nom={item.icone} size={18} weight={isActif ? "bold" : "regular"} />
              </span>

              {/* Libellé de la page en bas */}
              <span
                className={`mt-1 text-[0.625rem] tracking-tight uppercase transition-colors ${
                  isActif
                    ? "font-bold text-jaune"
                    : "font-medium text-white/70 group-hover/nav:text-white"
                }`}
              >
                {item.titre}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

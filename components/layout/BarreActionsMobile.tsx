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
    <div className="fixed inset-x-0 bottom-0 z-50 w-full lg:hidden select-none border-t border-white/12 bg-nuit/98 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_24px_rgba(7,18,43,0.7)] backdrop-blur-2xl">
      {/* Tiroir rapide des 5 domaines */}
      {tiroir === "domaines" && (
        <div className="mx-auto max-w-md px-3 pt-2">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 rounded-2xl liquid-glass-sombre p-2.5 shadow-2xl">
            <div className="mb-2 flex items-center justify-between px-2 text-[0.75rem] font-bold uppercase tracking-wider text-brume">
              <span>Métiers du BTP</span>
              <button
                type="button"
                onClick={() => setTiroir(null)}
                className="grid size-8 place-items-center rounded-lg text-jaune hover:bg-white/10 hover:text-white"
                aria-label="Fermer le menu des métiers"
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
        </div>
      )}

      {/* Tiroir contact direct */}
      {tiroir === "contact" && (
        <div className="mx-auto max-w-md px-3 pt-2">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex items-center justify-center gap-2 rounded-2xl liquid-glass-sombre p-2.5 shadow-2xl">
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
              className="grid size-11 place-items-center rounded-xl bg-white/10 text-brume hover:text-white"
              aria-label="Fermer les options de contact"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Barre de navigation principale : 100% rattachée au bas du site */}
      <nav
        aria-label="Navigation mobile principale"
        className="mx-auto flex h-[4rem] max-w-md items-center justify-around px-2"
      >
        {items.map((item) => {
          const isActif = actif === item.id;

          // Bouton central : CONTACT (#3)
          if (item.estCentral) {
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => handleItemClick(item.id)}
                aria-label="Prendre contact avec PET"
                className="group/central flex flex-1 flex-col items-center justify-center py-1 transition-transform active:scale-95"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-jaune text-nuit shadow-[0_2px_10px_rgba(247,198,28,0.45)] transition-transform duration-200 group-hover/central:scale-105">
                  <Icone nom={item.icone} size={19} weight="bold" />
                </span>
                <span className="mt-1 text-[0.625rem] font-black uppercase tracking-wider text-jaune">
                  {item.titre}
                </span>
              </Link>
            );
          }

          // Éléments standards (Accueil, Métiers, Chantiers, Devis)
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => handleItemClick(item.id)}
              aria-current={isActif ? "page" : undefined}
              className="group/nav flex flex-1 flex-col items-center justify-center py-1 transition-transform active:scale-95"
            >
              {/* Bulle d'icône */}
              <span
                className={`flex size-8 items-center justify-center rounded-full transition-all duration-300 ${
                  isActif
                    ? "bg-white/20 text-jaune border border-white/40 shadow-[0_2px_8px_rgba(255,255,255,0.15)]"
                    : "bg-white/5 text-white/70 group-hover/nav:bg-white/10 group-hover/nav:text-white border border-white/10"
                }`}
              >
                <Icone nom={item.icone} size={18} weight={isActif ? "bold" : "regular"} />
              </span>

              {/* Libellé de la page */}
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

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
}

const items: ItemMenu[] = [
  { id: "accueil", titre: "Accueil", href: "/", icone: "accueil" },
  { id: "savoir-faire", titre: "Métiers", href: "/savoir-faire", icone: "engins" },
  { id: "realisations", titre: "Chantiers", href: "/realisations", icone: "photos" },
  { id: "projet", titre: "Projet", href: "/votre-projet", icone: "liste" },
  { id: "contact", titre: "Devis", href: "/contact#devis", icone: "telephone" },
];

const domainesRapides = [
  { titre: "Bâtiment", href: "/savoir-faire/batiment", icone: "batiment" },
  { titre: "TP & VRD", href: "/savoir-faire/travaux-publics-vrd", icone: "route" },
  { titre: "Hydraulique", href: "/savoir-faire/hydraulique", icone: "eau" },
  { titre: "Assainissement", href: "/savoir-faire/assainissement", icone: "assainissement" },
  { titre: "Génie civil", href: "/savoir-faire/genie-civil", icone: "genie-civil" },
];

/**
 * Navbar mobile flottante (style Apple Dock) :
 * - Position flottante avec verre dépoli liquide
 * - L'élément actif s'agrandit automatiquement avec une animation fluide
 * - Accès express aux sections clés et tiroirs d'actions rapides (domaines & contact direct)
 */
export function BarreActionsMobile() {
  const chemin = usePathname();
  const [tiroir, setTiroir] = useState<"domaines" | "contact" | null>(null);

  // Détermination de l'élément actif selon l'URL courante
  const getActif = () => {
    if (chemin === "/") return "accueil";
    if (chemin.startsWith("/savoir-faire")) return "savoir-faire";
    if (chemin.startsWith("/realisations")) return "realisations";
    if (chemin.startsWith("/votre-projet")) return "projet";
    if (chemin.startsWith("/contact")) return "contact";
    return "";
  };

  const actif = getActif();

  // Fermer le tiroir quand la page change
  useEffect(() => {
    setTiroir(null);
  }, [chemin]);

  const handleItemClick = (id: string, href: string) => {
    if (id === "savoir-faire") {
      // Toggle tiroir des métiers si déjà sur savoir-faire
      if (actif === "savoir-faire") {
        setTiroir((prev) => (prev === "domaines" ? null : "domaines"));
      } else {
        setTiroir("domaines");
      }
    } else if (id === "contact") {
      // Proposer les actions directes rapides
      if (actif === "contact") {
        setTiroir((prev) => (prev === "contact" ? null : "contact"));
      }
    } else {
      setTiroir(null);
    }
  };

  return (
    <div className="fixed inset-x-2.5 bottom-3 z-40 mx-auto max-w-lg lg:hidden select-none">
      {/* Tiroir d'accès express aux 5 domaines du BTP */}
      {tiroir === "domaines" && (
        <div className="mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300 rounded-xl border border-white/20 bg-nuit/95 p-2 shadow-2xl backdrop-blur-2xl">
          <div className="mb-1.5 flex items-center justify-between px-2 text-[0.75rem] font-bold uppercase tracking-wider text-brume">
            <span>Accès direct aux domaines</span>
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
                className="flex items-center gap-2 rounded-lg bg-white/5 px-2.5 py-2 text-[0.8125rem] font-medium text-blanc transition-colors hover:bg-jaune hover:text-nuit active:scale-95"
              >
                <Icone nom={d.icone} size={16} className="text-jaune group-hover:text-nuit" />
                <span className="truncate">{d.titre}</span>
              </Link>
            ))}
            <Link
              href="/savoir-faire"
              onClick={() => setTiroir(null)}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-jaune/20 px-2.5 py-2 text-[0.8125rem] font-bold text-jaune hover:bg-jaune hover:text-nuit active:scale-95"
            >
              Vue d'ensemble →
            </Link>
          </div>
        </div>
      )}

      {/* Tiroir d'actions directes Devis / WhatsApp / Téléphone */}
      {tiroir === "contact" && (
        <div className="mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300 flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-nuit/95 p-2 shadow-2xl backdrop-blur-2xl">
          <a
            href={telephones[0].lien}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2.5 text-[0.8125rem] font-bold text-blanc transition-colors hover:bg-white/20 active:scale-95"
          >
            <Icone nom="telephone" size={17} className="text-jaune" />
            Appeler ({telephones[0].affichage})
          </a>
          <a
            href={whatsapp.lien}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 py-2.5 text-[0.8125rem] font-bold text-white shadow-md transition-transform active:scale-95"
          >
            <Icone nom="whatsapp" size={18} weight="bold" />
            WhatsApp direct
          </a>
          <button
            type="button"
            onClick={() => setTiroir(null)}
            className="grid size-9 place-items-center rounded-lg bg-white/10 text-brume hover:text-white"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Barre de navigation principale en dock flottant */}
      <nav
        aria-label="Navigation mobile rapide"
        className="flex h-14 items-center justify-between gap-1 rounded-2xl border border-white/15 bg-nuit/90 p-1.5 shadow-[0_16px_36px_-8px_rgba(7,18,43,0.7),0_2px_8px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-all duration-300 ease-chantier"
      >
        {items.map((item) => {
          const isActif = actif === item.id;
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => handleItemClick(item.id, item.href)}
              aria-current={isActif ? "page" : undefined}
              className={`group/dock relative flex h-full items-center justify-center rounded-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-95 ${
                isActif
                  ? "flex-[2.4] bg-jaune text-nuit shadow-md font-bold px-3.5"
                  : "flex-1 text-brume/80 hover:text-blanc hover:bg-white/5 px-2"
              }`}
            >
              {/* Icône du menu */}
              <span
                className={`transition-transform duration-300 ${
                  isActif ? "scale-110 text-nuit" : "group-hover/dock:scale-105"
                }`}
              >
                <Icone
                  nom={item.icone}
                  size={20}
                  weight={isActif ? "bold" : "regular"}
                />
              </span>

              {/* Libellé texte qui s'agrandit pour l'élément actif (Style Apple) */}
              <span
                className={`overflow-hidden whitespace-nowrap text-[0.8125rem] uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActif
                    ? "max-w-[75px] ml-1.5 opacity-100 font-bold"
                    : "max-w-0 ml-0 opacity-0"
                }`}
              >
                {item.titre}
              </span>

              {/* Indicateur discret de sous-menu pour Métiers & Devis */}
              {(item.id === "savoir-faire" || item.id === "contact") && !isActif && (
                <span
                  aria-hidden
                  className="absolute right-1 top-1 size-1 rounded-full bg-jaune/60"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

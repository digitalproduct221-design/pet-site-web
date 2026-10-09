"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { telephones, whatsapp } from "@/content/site";
import { Icone } from "@/components/ui/Icone";

/** Barre d'actions fixe sur mobile et tablette : appeler, WhatsApp, devis. */
export function BarreActionsMobile() {
  // Sur la page Contact, le formulaire est déjà là : pas de bouton devis en double.
  const surContact = usePathname() === "/contact";
  const action = "flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-chantier cote text-[0.875rem]";
  return (
    <nav
      aria-label="Actions rapides"
      className="verre-sombre sur-sombre fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <div className="conteneur flex h-[var(--barre-mobile-h)] items-center gap-1.5">
        <a href={telephones[0].lien} className={`${action} text-blanc hover:bg-blanc/10`}>
          <Icone nom="telephone" size={22} weight="bold" className="text-jaune" />
          Appeler
        </a>
        <a href={whatsapp.lien} target="_blank" rel="noopener noreferrer" className={`${action} text-blanc hover:bg-blanc/10`}>
          <Icone nom="whatsapp" size={22} weight="bold" className="text-jaune" />
          WhatsApp
          <span className="sr-only">(nouvel onglet)</span>
        </a>
        {surContact ? null : (
        <Link href="/contact#devis" className={`${action} flex-[2.2] flex-row gap-2 whitespace-nowrap bg-jaune px-2 text-[0.9375rem] uppercase tracking-[0.03em] text-nuit`}>
          Demander un devis
        </Link>
        )}
      </div>
    </nav>
  );
}

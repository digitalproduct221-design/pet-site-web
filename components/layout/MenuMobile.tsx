"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Icone } from "@/components/ui/Icone";

// La fenêtre du menu (Radix Dialog et Accordion) ne se charge qu'au premier clic.
const MenuMobileFenetre = dynamic(() => import("./MenuMobileFenetre"), { ssr: false });

/** Bouton du menu plein écran, sous 1152 px. */
export function MenuMobile() {
  const [ouvert, setOuvert] = useState(false);
  const [demande, setDemande] = useState(false);
  const bouton = useRef<HTMLButtonElement>(null);
  // Ferme le menu quand la page change (y compris via le logo).
  const chemin = usePathname();
  const [cheminPrecedent, setCheminPrecedent] = useState(chemin);
  if (chemin !== cheminPrecedent) {
    setCheminPrecedent(chemin);
    setOuvert(false);
  }

  return (
    <>
      <button
        ref={bouton}
        type="button"
        onClick={() => {
          setDemande(true);
          setOuvert(true);
        }}
        onTouchStart={() => void import("./MenuMobileFenetre")}
        aria-haspopup="dialog"
        aria-expanded={ouvert}
        aria-label="Ouvrir le menu"
        className="grid size-11 place-items-center rounded-chantier text-nuit transition-colors hover:bg-sable nav:hidden"
      >
        <Icone nom="menu" size={28} weight="bold" />
      </button>
      {demande ? <MenuMobileFenetre ouvert={ouvert} setOuvert={setOuvert} declencheur={bouton} /> : null}
    </>
  );
}

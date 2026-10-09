"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Icone } from "@/components/ui/Icone";

// La fenêtre (et l'index de recherche) ne se chargent qu'au premier clic.
const RechercheFenetre = dynamic(() => import("./RechercheFenetre"), { ssr: false });

/** Bouton de recherche du header : ouvre la recherche plein écran. */
export function Recherche({ classeDeclencheur = "" }: { classeDeclencheur?: string }) {
  const [ouvert, setOuvert] = useState(false);
  const [demande, setDemande] = useState(false);
  const bouton = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={bouton}
        type="button"
        onClick={() => {
          setDemande(true);
          setOuvert(true);
        }}
        onPointerEnter={() => void import("./RechercheFenetre")}
        aria-haspopup="dialog"
        aria-expanded={ouvert}
        aria-label="Rechercher sur le site"
        className={`grid size-11 place-items-center rounded-chantier text-nuit transition-colors hover:bg-sable hover:text-royal ${classeDeclencheur}`}
      >
        <Icone nom="recherche" size={24} weight="bold" />
      </button>
      {demande ? <RechercheFenetre ouvert={ouvert} setOuvert={setOuvert} declencheur={bouton} /> : null}
    </>
  );
}

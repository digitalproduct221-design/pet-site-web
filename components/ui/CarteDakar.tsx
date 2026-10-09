"use client";

import Image from "next/image";
import { useState } from "react";
import { photos } from "@/content/photos";
import { adresse, carteIntegree, lienItineraire } from "@/content/site";
import { Icone } from "./Icone";

/**
 * Carte de l'adresse PET. Elle ne se charge qu'au clic : pas de traceur tiers
 * ni de poids inutile tant que le visiteur ne l'a pas demandée.
 */
export function CarteDakar({ hauteur = "h-72" }: { hauteur?: string }) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className={`relative overflow-hidden rounded-[6px] ${hauteur}`}>
        <iframe
          title={`Carte : ${adresse}`}
          src={carteIntegree}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div className={`relative isolate flex flex-col justify-end overflow-hidden rounded-[6px] p-4 text-blanc ${hauteur}`}>
      {/* Une rue de Dakar, très voilée, en attendant la carte */}
      <Image src={photos.dalotRegard.src} alt="" fill sizes="(min-width: 1024px) 24vw, 100vw" placeholder="blur" className="-z-10 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(11_27_63/0.55)_0%,rgb(7_18_43/0.92)_100%)]" />
      <div className="verre-liquide rounded-[6px] p-4">
        <p className="flex items-start gap-2 text-[0.9375rem] leading-snug text-blanc">
          <Icone nom="adresse" size={18} className="mt-0.5 shrink-0 text-jaune" />
          {adresse}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActive(true)}
            className="inline-flex min-h-11 items-center gap-2 rounded-chantier bg-blanc px-4 cote text-[1rem] text-nuit transition-colors hover:bg-jaune"
          >
            Afficher la carte
          </button>
          <a
            href={lienItineraire}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-chantier bg-blanc/10 px-4 cote text-[1rem] text-blanc transition-colors hover:bg-blanc/20"
          >
            Itinéraire
            <Icone nom="fleche-externe" size={18} weight="bold" />
            <span className="sr-only">(nouvel onglet)</span>
          </a>
        </div>
      </div>
    </div>
  );
}

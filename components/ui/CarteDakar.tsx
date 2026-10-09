"use client";

import { useEffect, useRef, useState } from "react";
import { adresse, coordonnees, lienItineraire, SIGLE } from "@/content/site";
import { Icone } from "./Icone";
import { Motif } from "./Motif";

/**
 * Carte interactive de l'adresse PET (MapLibre, tuiles libres OpenFreeMap,
 * sans clé ni traceur). La bibliothèque et les tuiles ne se chargent qu'à
 * l'approche de la carte. Gestes coopératifs : Ctrl + molette ou deux doigts
 * pour zoomer, le défilement de la page n'est jamais capturé.
 */
export function CarteDakar({ hauteur = "h-72" }: { hauteur?: string }) {
  const cadre = useRef<HTMLDivElement>(null);
  const [prete, setPrete] = useState(false);

  useEffect(() => {
    const el = cadre.current;
    if (!el) return;
    let carte: import("maplibre-gl").Map | undefined;
    let annule = false;

    const creer = async () => {
      const maplibregl = (await import("maplibre-gl")).default;
      await import("maplibre-gl/dist/maplibre-gl.css");
      if (annule || !cadre.current) return;
      const centre: [number, number] = [coordonnees.lng, coordonnees.lat];
      carte = new maplibregl.Map({
        container: cadre.current,
        style: "https://tiles.openfreemap.org/styles/positron",
        center: centre,
        zoom: 15,
        cooperativeGestures: true,
        attributionControl: { compact: true },
        locale: {
          "CooperativeGesturesHandler.WindowsHelpText": "Ctrl + molette pour zoomer la carte",
          "CooperativeGesturesHandler.MacHelpText": "⌘ + molette pour zoomer la carte",
          "CooperativeGesturesHandler.MobileHelpText": "Deux doigts pour déplacer la carte",
          "NavigationControl.ZoomIn": "Zoomer",
          "NavigationControl.ZoomOut": "Dézoomer",
        },
      });
      carte.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-left");

      const repere = document.createElement("div");
      repere.className = "repere-pet";
      repere.innerHTML = `<span class="repere-pet-halo"></span><span class="repere-pet-pin"><span>${SIGLE}</span></span>`;
      new maplibregl.Marker({ element: repere, anchor: "bottom" })
        .setLngLat(centre)
        .setPopup(
          new maplibregl.Popup({ offset: 48, closeButton: true }).setHTML(
            `<strong>${SIGLE}</strong><br>${adresse}<br><a href="${lienItineraire}" target="_blank" rel="noopener noreferrer">Itinéraire</a>`,
          ),
        )
        .addTo(carte);
      carte.once("load", () => setPrete(true));
    };

    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        void creer();
      },
      { rootMargin: "300px" },
    );
    obs.observe(el);
    return () => {
      annule = true;
      obs.disconnect();
      carte?.remove();
    };
  }, []);

  return (
    <div className={`relative isolate overflow-hidden rounded-panneau bg-sable ${hauteur}`}>
      {/* En attendant la carte : un fond de plan et l'adresse */}
      {!prete ? (
        <div aria-hidden className="absolute inset-0 grid place-items-center text-royal">
          <Motif type="courbes" className="text-royal" opacite={0.18} />
          <Icone nom="adresse" size={36} className="text-royal" />
        </div>
      ) : null}
      <div ref={cadre} role="region" aria-label={`Carte interactive : ${adresse}`} className={`carte-pet absolute inset-0 transition-opacity duration-700 ${prete ? "opacity-100" : "opacity-0"}`} />
      <a
        href={lienItineraire}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-3 top-3 z-[2] inline-flex min-h-11 items-center gap-2 rounded-chantier bg-nuit px-4 cote text-[1rem] text-blanc ombre-flottante transition-colors hover:bg-jaune hover:text-nuit"
      >
        Itinéraire
        <Icone nom="fleche-externe" size={18} weight="bold" />
        <span className="sr-only">(nouvel onglet)</span>
      </a>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { coordonnees } from "@/content/site";

// Angles qui placent Dakar face au visiteur (convention de cobe).
const PHI_DAKAR = Math.PI - ((coordonnees.lng * Math.PI) / 180 - Math.PI / 2);
const THETA_DAKAR = (coordonnees.lat * Math.PI) / 180;

/**
 * Globe en points (cobe, WebGL) qui tourne doucement et revient se poser sur
 * Dakar ; on peut le faire tourner au doigt ou à la souris. Décoratif : la
 * bibliothèque ne se charge qu'à l'approche, le rendu s'arrête hors de l'écran,
 * et il reste immobile, face à Dakar, sous mouvement réduit.
 */
export function Globe({ className = "" }: { className?: string }) {
  const toile = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = toile.current;
    if (!canvas) return;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let globe: { destroy: () => void; toggle: (lecture: boolean) => void } | undefined;
    let annule = false;
    let phi = PHI_DAKAR - 1.2; // part d'un peu plus à l'est, puis tourne vers Dakar
    let elan = 0;
    let saisie: number | null = null;
    let largeur = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const mesurer = () => (largeur = canvas.offsetWidth);

    const demarrer = async () => {
      const { default: createGlobe } = await import("cobe");
      if (annule) return;
      mesurer();
      globe = createGlobe(canvas, {
        // Taille du tampon = taille affichée × densité de pixels (sinon le globe est rogné).
        devicePixelRatio: dpr,
        width: largeur * dpr,
        height: largeur * dpr,
        phi: reduit ? PHI_DAKAR : phi,
        theta: THETA_DAKAR,
        dark: 0,
        diffuse: 1.15,
        mapSamples: 14000,
        mapBrightness: 5,
        baseColor: [0.95, 0.92, 0.87], // sable
        markerColor: [0.97, 0.78, 0.11], // jaune PET
        glowColor: [0.85, 0.88, 0.95],
        markers: [{ location: [coordonnees.lat, coordonnees.lng], size: 0.09 }],
        onRender: (etat) => {
          if (!reduit && saisie === null) {
            // Rotation lente, freinée à l'approche de Dakar, puis tour complet.
            const ecart = (((PHI_DAKAR - phi) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
            phi += ecart < 0.6 ? 0.0018 : 0.0045;
          }
          phi += elan;
          elan *= 0.92;
          etat.phi = phi;
          etat.width = largeur * dpr;
          etat.height = largeur * dpr;
        },
      });
      canvas.style.opacity = "1";
    };

    const vue = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !globe) void demarrer();
        globe?.toggle(e.isIntersecting);
      },
      { rootMargin: "200px" },
    );
    vue.observe(canvas);
    window.addEventListener("resize", mesurer);

    const presser = (e: PointerEvent) => {
      saisie = e.clientX;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const bouger = (e: PointerEvent) => {
      if (saisie === null) return;
      const delta = e.clientX - saisie;
      saisie = e.clientX;
      phi += delta / 160;
      elan = delta / 1600;
    };
    const lacher = () => {
      saisie = null;
      canvas.style.cursor = "grab";
    };
    canvas.addEventListener("pointerdown", presser);
    canvas.addEventListener("pointermove", bouger);
    canvas.addEventListener("pointerup", lacher);
    canvas.addEventListener("pointercancel", lacher);

    return () => {
      annule = true;
      vue.disconnect();
      window.removeEventListener("resize", mesurer);
      canvas.removeEventListener("pointerdown", presser);
      canvas.removeEventListener("pointermove", bouger);
      canvas.removeEventListener("pointerup", lacher);
      canvas.removeEventListener("pointercancel", lacher);
      globe?.destroy();
    };
  }, []);

  return (
    <div className={`relative aspect-square ${className}`}>
      <canvas
        ref={toile}
        aria-hidden
        className="size-full cursor-grab touch-pan-y opacity-0 transition-opacity duration-1000 ease-out"
      />
    </div>
  );
}

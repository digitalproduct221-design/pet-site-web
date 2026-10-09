"use client";

import { useEffect, useRef } from "react";

/**
 * Pelleteuse au trait, animée : la flèche se lève, le bras plonge, le godet
 * racle puis vide sa charge. Illustration décorative (aria-hidden).
 * L'animation ne tourne que visible à l'écran, et jamais sous mouvement réduit.
 */
export function Pelleteuse({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => (el.dataset.visible = String(e.isIntersecting)), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 340 210"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`pelleteuse ${className}`}
    >
      {/* Tas de terre */}
      <path d="M262 192c8-20 22-30 38-30s30 12 36 30" strokeWidth="4" />
      <path d="M284 176l6-4M302 172l5 3M318 182l4-3" strokeWidth="3" />
      <g className="pelleteuse-terre">
        <circle cx="300" cy="150" r="3" fill="currentColor" stroke="none" />
        <circle cx="309" cy="158" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="294" cy="160" r="2" fill="currentColor" stroke="none" />
      </g>

      {/* Chenilles */}
      <rect x="28" y="160" width="168" height="34" rx="17" strokeWidth="5" />
      {[48, 80, 112, 144, 176].map((x) => (
        <circle key={x} cx={x} cy="177" r="7" strokeWidth="4" />
      ))}

      {/* Tourelle, contrepoids et cabine */}
      <g className="pelleteuse-tourelle">
        <path d="M40 160v-34h18v-12h104l14 18v28" strokeWidth="5" />
        <path d="M100 114V70h40l18 44" strokeWidth="5" />
        <path d="M108 104V80h26l11 24z" fill="currentColor" fillOpacity="0.16" strokeWidth="3.5" />
        <path d="M58 140h40" strokeWidth="3.5" />

        {/* Flèche, bras et godet : chaque pièce tourne autour de son axe */}
        <g className="pelleteuse-fleche">
          <path d="M160 122L222 54" strokeWidth="13" />
          <circle cx="160" cy="122" r="5" fill="currentColor" stroke="none" />
          <g className="pelleteuse-bras">
            <path d="M222 54l40 70" strokeWidth="10" />
            <circle cx="222" cy="54" r="5" fill="currentColor" stroke="none" />
            <g className="pelleteuse-godet">
              <path d="M262 124c-6 14-2 28 12 34l18-18z" fill="currentColor" strokeWidth="4" />
              <path d="M274 158l-2 6M282 152l1 6M290 144l3 5" strokeWidth="3" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

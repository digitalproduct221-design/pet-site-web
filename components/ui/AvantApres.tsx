"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { photos } from "@/content/photos";
import { Icone } from "@/components/ui/Icone";

interface AvantApresProps {
  titre?: string;
  sousTitre?: string;
  description?: string;
  photoAvant?: keyof typeof photos;
  photoApres?: keyof typeof photos;
  labelAvant?: string;
  labelApres?: string;
  detailsTechniques?: { label: string; valeur: string }[];
}

/**
 * Composant Avant / Après interactif :
 * Permet de glisser un séparateur tactile ou d'utiliser les boutons
 * pour comparer la réhabilitation environnementale d'un site.
 */
export function AvantApres({
  titre = "Transformation de terrain : Avant / Après",
  sousTitre = "Réhabilitation environnementale et terrassement de casier",
  description = "Découvrez la transformation concrète du site de l'ISDND de Meckhé par PARTENAIRE ENTREPRISE TRAVAUX SUARL : du site encombré de déchets bruts à une plateforme technique étanchée, réglée et compactée aux normes internationales.",
  photoAvant = "avantDechetsMeckhe",
  photoApres = "apresCasierNiveleMeckhe",
  labelAvant = "Avant : Décharge brute et déchets non confinés",
  labelApres = "Après : Casier technique nivelé et compacté",
  detailsTechniques = [
    { label: "Opération", valeur: "Déblai, évacuation & profilage de casier" },
    { label: "Portance", valeur: "Compactage lourd au rouleau vibrant" },
    { label: "Normes", valeur: "Conforme prescriptions AFD & SETEC" },
    { label: "Entreprise", valeur: "PARTENAIRE ENTREPRISE TRAVAUX SUARL" },
  ],
}: AvantApresProps) {
  const [position, setPosition] = useState(50); // Pourcentage 0 - 100
  const [estEnGlissement, setEstEnGlissement] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const imgAvant = photos[photoAvant];
  const imgApres = photos[photoApres];

  const calculerPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(Math.round(pct * 10) / 10);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setEstEnGlissement(true);
    calculerPosition(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!estEnGlissement) return;
    calculerPosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setEstEnGlissement(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignorer si non capturé
    }
  };

  // Accessibilité clavier
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === "Home") {
      setPosition(0);
    } else if (e.key === "End") {
      setPosition(100);
    }
  };

  return (
    <div className="rounded-panneau bg-nuit text-blanc p-6 sm:p-8 lg:p-12 shadow-2xl overflow-hidden border border-blanc/10">
      {/* En-tête de section */}
      <div className="max-w-3xl mb-8 lg:mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-jaune/15 px-3.5 py-1 text-[0.8125rem] font-bold uppercase tracking-wider text-jaune mb-3 border border-jaune/25">
          <Icone nom="succes" size={15} weight="bold" />
          <span>Contrôle & Réhabilitation de site</span>
        </div>
        <h3 className="titre text-titre-m sm:text-titre-l text-blanc mb-3">{titre}</h3>
        <p className="cote text-[0.9375rem] text-jaune/90 uppercase tracking-wider mb-3">{sousTitre}</p>
        <p className="text-[1.0625rem] leading-relaxed text-blanc/80">{description}</p>
      </div>

      {/* Boutons de contrôle rapide */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPosition(0)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              position <= 10
                ? "bg-royal text-blanc shadow-lg shadow-royal/30"
                : "bg-blanc/10 text-blanc/70 hover:bg-blanc/20 hover:text-blanc"
            }`}
          >
            Vue 100% Après
          </button>
          <button
            type="button"
            onClick={() => setPosition(50)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              position > 10 && position < 90
                ? "bg-jaune text-nuit shadow-lg shadow-jaune/30 font-black"
                : "bg-blanc/10 text-blanc/70 hover:bg-blanc/20 hover:text-blanc"
            }`}
          >
            Comparaison 50/50
          </button>
          <button
            type="button"
            onClick={() => setPosition(100)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              position >= 90
                ? "bg-rose-900/80 text-blanc shadow-lg"
                : "bg-blanc/10 text-blanc/70 hover:bg-blanc/20 hover:text-blanc"
            }`}
          >
            Vue 100% Avant
          </button>
        </div>

        <span className="text-xs text-blanc/60 hidden sm:inline-flex items-center gap-1.5">
          <Icone nom="fleche" size={14} className="rotate-180" />
          Glissez le curseur pour comparer
          <Icone nom="fleche" size={14} />
        </span>
      </div>

      {/* Cadre interactif de comparaison */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="slider"
        aria-label="Comparateur Avant / Après"
        aria-valuenow={position}
        aria-valuemin={0}
        aria-valuemax={100}
        className="group relative h-[320px] sm:h-[420px] lg:h-[540px] w-full select-none overflow-hidden rounded-chantier bg-nuit-profonde cursor-ew-resize outline-none focus-visible:ring-2 focus-visible:ring-jaune touch-none"
      >
        {/* Image Après (dessous) */}
        <div className="absolute inset-0">
          <Image
            src={imgApres.src}
            alt={imgApres.alt}
            fill
            sizes="(min-width: 1200px) 1100px, 100vw"
            priority={false}
            className="object-cover"
            style={{ objectPosition: imgApres.focale }}
          />
          {/* Badge Après */}
          <div className="absolute bottom-5 right-5 z-10 flex items-center gap-2 rounded-lg bg-emerald-950/85 backdrop-blur-md px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-emerald-300 border border-emerald-500/30 shadow-lg">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{labelApres}</span>
          </div>
        </div>

        {/* Image Avant (dessus, découpée selon position) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={imgAvant.src}
            alt={imgAvant.alt}
            fill
            sizes="(min-width: 1200px) 1100px, 100vw"
            priority={false}
            className="object-cover"
            style={{ objectPosition: imgAvant.focale }}
          />
          {/* Badge Avant */}
          <div className="absolute top-5 left-5 z-10 flex items-center gap-2 rounded-lg bg-red-950/85 backdrop-blur-md px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-red-300 border border-red-500/30 shadow-lg">
            <span className="size-2 rounded-full bg-red-400" />
            <span>{labelAvant}</span>
          </div>
        </div>

        {/* Ligne verticale de séparation */}
        <div
          className="absolute top-0 bottom-0 z-20 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.8)]"
          style={{ left: `${position}%` }}
        >
          {/* Poignée centrale */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center size-12 sm:size-14 rounded-full bg-jaune text-nuit shadow-2xl border-4 border-blanc cursor-grab active:cursor-grabbing transition-transform group-hover:scale-105">
            <div className="flex items-center gap-0.5">
              <Icone nom="fleche" size={14} weight="bold" className="rotate-180" />
              <Icone nom="fleche" size={14} weight="bold" />
            </div>
          </div>
        </div>
      </div>

      {/* Grille technique sous le comparateur */}
      {detailsTechniques.length > 0 && (
        <div className="mt-8 pt-6 border-t border-blanc/10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {detailsTechniques.map((detail, idx) => (
            <div key={idx} className="bg-blanc/5 rounded-panneau p-4 border border-blanc/5">
              <span className="block text-[0.75rem] uppercase tracking-wider text-jaune/80 font-bold mb-1">
                {detail.label}
              </span>
              <span className="block text-[0.9375rem] font-medium text-blanc leading-snug">
                {detail.valeur}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

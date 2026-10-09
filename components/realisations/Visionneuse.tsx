"use client";

import Image from "next/image";
import { Dialog } from "radix-ui";
import { useRef, type RefObject } from "react";
import type { ImageSite } from "@/content/images";
import { Icone } from "@/components/ui/Icone";

const SEUIL_GLISSE = 50; // px avant de changer de photo au doigt

/**
 * Visionneuse plein écran de la galerie (flèches, clavier ←/→, glisser au doigt,
 * Échap), chargée au premier clic sur une photo (voir Galerie.tsx).
 * La photo n'est jamais agrandie au-delà de sa taille d'origine.
 */
export default function Visionneuse({
  photos,
  titre,
  index,
  aller,
  ouverte,
  setOuverte,
  retour,
}: {
  photos: ImageSite[];
  titre: string;
  index: number;
  aller: (i: number) => void;
  ouverte: boolean;
  setOuverte: (o: boolean) => void;
  retour: RefObject<HTMLButtonElement | null>;
}) {
  const total = photos.length;
  const depart = useRef<number | null>(null);
  const p = photos[index];

  return (
    <Dialog.Root open={ouverte} onOpenChange={setOuverte}>
      <Dialog.Portal>
        <Dialog.Overlay className="voile-fenetre fixed inset-0 z-[90] bg-nuit-profond/95" />
        <Dialog.Content
          aria-modal="true"
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            retour.current?.focus();
          }}
          className="fenetre sur-sombre fixed inset-0 z-[95] flex flex-col text-blanc outline-none"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") aller(index + 1);
            if (e.key === "ArrowLeft") aller(index - 1);
          }}
          aria-describedby="legende-visionneuse"
        >
          <div className="conteneur flex items-center justify-between gap-4 py-4">
            <Dialog.Title className="truncate cote text-[1.0625rem] text-blanc">{titre}</Dialog.Title>
            <div className="flex items-center gap-4">
              <p className="cote text-[1rem] text-brume chiffres-tabulaires" aria-live="polite">
                <span className="text-blanc">{String(index + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
              </p>
              <Dialog.Close className="grid size-12 place-items-center rounded-full bg-blanc/10 transition-colors hover:bg-blanc/20" aria-label="Fermer la galerie">
                <Icone nom="fermer" size={24} weight="bold" />
              </Dialog.Close>
            </div>
          </div>

          <div
            className="relative flex flex-1 touch-pan-y items-center justify-center px-4 sm:px-20"
            onPointerDown={(e) => (depart.current = e.clientX)}
            onPointerUp={(e) => {
              if (depart.current === null) return;
              const ecart = e.clientX - depart.current;
              depart.current = null;
              if (Math.abs(ecart) > SEUIL_GLISSE) aller(index + (ecart < 0 ? 1 : -1));
            }}
          >
            <figure key={index} className="animate-[apparition_420ms_var(--ease-chantier)_both]" style={{ width: `min(100%, ${p.largeur}px)` }}>
              <Image
                src={p.src}
                alt={p.alt}
                sizes={`min(100vw, ${p.largeur}px)`}
                className="mx-auto h-auto max-h-[calc(100svh-12rem)] w-auto rounded-chantier object-contain"
                draggable={false}
              />
            </figure>
            {total > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => aller(index - 1)}
                  aria-label="Photo précédente"
                  className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-blanc/10 transition-colors hover:bg-jaune hover:text-nuit sm:left-6"
                >
                  <Icone nom="fleche" size={22} weight="bold" className="rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => aller(index + 1)}
                  aria-label="Photo suivante"
                  className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-blanc/10 transition-colors hover:bg-jaune hover:text-nuit sm:right-6"
                >
                  <Icone nom="fleche" size={22} weight="bold" />
                </button>
              </>
            ) : null}
          </div>

          <p id="legende-visionneuse" className="conteneur pb-6 pt-4 text-center text-[1rem] text-brume">
            {p.alt}
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

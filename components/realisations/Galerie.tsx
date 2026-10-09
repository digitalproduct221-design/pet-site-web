"use client";

import Image from "next/image";
import { Dialog } from "radix-ui";
import { useCallback, useRef, useState } from "react";
import { photos as registre, type PhotoId } from "@/content/photos";
import { Icone } from "@/components/ui/Icone";

const SEUIL_GLISSE = 50; // px avant de changer de photo au doigt

/**
 * Galerie d'une réalisation : une mosaïque de photos, chacune ouvre la
 * visionneuse plein écran (flèches, clavier ←/→, glisser au doigt, Échap).
 * Dans la visionneuse, la photo n'est jamais agrandie au-delà de sa taille
 * d'origine (photos basse définition) : elle est posée sur le bleu nuit.
 */
export function Galerie({ photos, titre }: { photos: PhotoId[]; titre: string }) {
  const [ouverte, setOuverte] = useState(false);
  const [index, setIndex] = useState(0);
  const total = photos.length;
  const aller = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);
  const depart = useRef<number | null>(null);

  const ouvrir = (i: number) => {
    setIndex(i);
    setOuverte(true);
  };

  const p = registre[photos[index]];

  return (
    <Dialog.Root open={ouverte} onOpenChange={setOuverte}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        {photos.map((id, i) => {
          const photo = registre[id];
          // Une grande photo et deux petites ; à deux photos, deux moitiés égales.
          const grande = i === 0 && total > 2;
          const cellule = grande ? "sm:col-span-2 lg:col-span-8 lg:row-span-2" : total > 2 ? "lg:col-span-4" : "lg:col-span-6";
          return (
            <li key={id} className={cellule}>
              <button
                type="button"
                onClick={() => ouvrir(i)}
                className="group/photo relative block w-full overflow-hidden rounded-chantier bg-nuit text-left"
                aria-label={`Agrandir la photo ${i + 1} sur ${total} : ${photo.alt}`}
              >
                <span className={`relative block ${grande ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[34rem]" : "aspect-[4/3]"}`}>
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes={grande ? "(min-width: 1024px) 62vw, 100vw" : "(min-width: 1024px) 46vw, (min-width: 640px) 50vw, 100vw"}
                    className="object-cover transition-transform duration-[900ms] ease-chantier group-hover/photo:scale-[1.04]"
                    style={{ objectPosition: photo.focale }}
                  />
                  <span aria-hidden className="absolute inset-0 bg-(image:--voile-photo)" />
                  <span
                    aria-hidden
                    className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-nuit/55 text-blanc transition-[background-color,scale] duration-300 group-hover/photo:scale-110 group-hover/photo:bg-jaune group-hover/photo:text-nuit"
                  >
                    <Icone nom="agrandir" size={20} weight="bold" />
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <Dialog.Portal>
        <Dialog.Overlay className="voile-fenetre fixed inset-0 z-[90] bg-nuit-profond/95" />
        <Dialog.Content
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
            <figure key={photos[index]} className="animate-[apparition_420ms_var(--ease-chantier)_both]" style={{ width: `min(100%, ${p.src.width}px)` }}>
              <Image
                src={p.src}
                alt={p.alt}
                sizes={`min(100vw, ${p.src.width}px)`}
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

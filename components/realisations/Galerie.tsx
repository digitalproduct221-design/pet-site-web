"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { photos as registre, type PhotoId } from "@/content/photos";
import { Icone } from "@/components/ui/Icone";

// La visionneuse (Radix Dialog) ne se charge qu'au premier clic sur une photo.
const Visionneuse = dynamic(() => import("./Visionneuse"), { ssr: false });

/**
 * Galerie d'une réalisation : une mosaïque de photos, chacune ouvre la
 * visionneuse plein écran (Visionneuse.tsx, chargée au premier clic).
 */
export function Galerie({ photos, titre }: { photos: PhotoId[]; titre: string }) {
  const [ouverte, setOuverte] = useState(false);
  const [index, setIndex] = useState(0);
  const total = photos.length;
  const aller = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);
  const [demandee, setDemandee] = useState(false);
  const declencheur = useRef<HTMLButtonElement | null>(null);

  const ouvrir = (i: number, bouton: HTMLButtonElement) => {
    declencheur.current = bouton;
    setIndex(i);
    setDemandee(true);
    setOuverte(true);
  };

  return (
    <>
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
                onClick={(e) => ouvrir(i, e.currentTarget)}
                onPointerEnter={() => void import("./Visionneuse")}
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

      {demandee ? (
        <Visionneuse
          photos={photos}
          titre={titre}
          index={index}
          aller={aller}
          ouverte={ouverte}
          setOuverte={setOuverte}
          retour={declencheur}
        />
      ) : null}
    </>
  );
}

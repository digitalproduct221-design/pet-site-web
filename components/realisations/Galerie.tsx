"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { ImageSite } from "@/content/images";
import { imageLocale } from "@/content/images";
import { Icone } from "@/components/ui/Icone";

// La visionneuse (Radix Dialog) ne se charge qu'au premier clic sur une photo.
const Visionneuse = dynamic(() => import("./Visionneuse"), { ssr: false });

/**
 * Galerie d'une réalisation ou d'un domaine : mosaïque de photos réelles,
 * chacune ouvre la visionneuse plein écran au clic.
 * Aucun ajout artificiel de photos extérieures pour garantir zéro doublon.
 */
export function Galerie({ photos: photosEntree, titre }: { photos: ImageSite[]; titre: string }) {
  // Déduplication absolue par URL d'image pour garantir qu'aucune photo n'apparaît en double
  const photosAffichees = (() => {
    const urlsVues = new Set<string>();
    const uniques: ImageSite[] = [];
    for (const p of photosEntree) {
      if (!p || !p.src) continue;
      const url = typeof p.src === "string" ? p.src : p.src.src;
      if (!urlsVues.has(url)) {
        urlsVues.add(url);
        uniques.push(p);
      }
    }
    return uniques;
  })();

  const [ouverte, setOuverte] = useState(false);
  const [index, setIndex] = useState(0);
  const total = photosAffichees.length;
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
        {photosAffichees.map((photo, i) => {
          // Disposition harmonieuse :
          // À 2 photos : deux moitiés égales (col-6).
          // À 4 photos : 2 rangées de 2 (col-6) pour un équilibre parfait sans trou.
          // À 3 photos ou plus : photo 0 en grand (col-8 sur 2 rangées) avec 2 vignettes à droite (col-4).
          // Si la dernière photo est isolée sur la rangée finale, elle s'étend sur toute la largeur (col-12).
          const is4 = total === 4;
          const grande = !is4 && i === 0 && total > 2;
          const isDerniere = i === total - 1;
          const isoléeFinale = !is4 && total > 3 && (total - 3) % 3 === 1 && isDerniere;

          const cellule = is4
            ? "sm:col-span-1 lg:col-span-6"
            : grande
            ? "sm:col-span-2 lg:col-span-8 lg:row-span-2"
            : isoléeFinale
            ? "sm:col-span-2 lg:col-span-12"
            : total > 2
            ? `${isDerniere && total % 2 === 0 ? "sm:col-span-2" : "sm:col-span-1"} lg:col-span-4`
            : "sm:col-span-1 lg:col-span-6";

          return (
            <li key={i} className={cellule}>
              <button
                type="button"
                onClick={(e) => ouvrir(i, e.currentTarget)}
                onPointerEnter={() => void import("./Visionneuse")}
                className="group/photo relative block w-full overflow-hidden rounded-chantier bg-nuit text-left"
                aria-label={`Agrandir la photo ${i + 1} sur ${total} : ${photo.alt}`}
              >
                <span
                  className={`relative block ${
                    grande
                      ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[34rem]"
                      : isoléeFinale
                      ? "aspect-[16/9] lg:aspect-[21/9]"
                      : isDerniere && total % 2 === 0
                      ? "aspect-[4/3] sm:max-lg:aspect-[21/9] lg:aspect-[4/3]"
                      : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes={grande ? "(min-width: 1024px) 62vw, 100vw" : "(min-width: 1024px) 46vw, (min-width: 640px) 50vw, 100vw"}
                    quality={75}
                    placeholder={typeof photo.src === "object" && "blurDataURL" in photo.src && photo.src.blurDataURL ? "blur" : undefined}
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
          photos={photosAffichees}
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

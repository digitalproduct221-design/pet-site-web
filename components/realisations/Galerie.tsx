"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { ImageSite } from "@/content/images";
import { Icone } from "@/components/ui/Icone";

// La visionneuse (Radix Dialog) ne se charge qu'au premier clic sur une photo.
const Visionneuse = dynamic(() => import("./Visionneuse"), { ssr: false });

/**
 * Calcul de la disposition en grille (12 colonnes) :
 * Garantit mathématiquement que chaque rangée est 100% pleine,
 * sans aucun espace vide ni trou orphelin en bas de galerie.
 */
function getDisposition(i: number, total: number) {
  if (total === 1) {
    return {
      cellule: "sm:col-span-2 lg:col-span-12",
      aspect: "aspect-[16/9] lg:aspect-[21/9]",
      grande: false,
    };
  }
  if (total === 2) {
    return {
      cellule: "sm:col-span-1 lg:col-span-6",
      aspect: "aspect-[4/3] lg:aspect-[16/10]",
      grande: false,
    };
  }
  if (total === 3) {
    return {
      cellule: "sm:col-span-1 lg:col-span-4",
      aspect: "aspect-[4/3]",
      grande: false,
    };
  }
  if (total === 4) {
    return {
      cellule: "sm:col-span-1 lg:col-span-6",
      aspect: "aspect-[4/3] lg:aspect-[16/10]",
      grande: false,
    };
  }
  if (total === 5) {
    // 2 photos en haut (col-6) + 3 photos en bas (col-4) : équilibre parfait
    if (i < 2) {
      return {
        cellule: "sm:col-span-1 lg:col-span-6",
        aspect: "aspect-[4/3] lg:aspect-[16/10]",
        grande: false,
      };
    }
    const isDerniere = i === 4;
    return {
      cellule: `${isDerniere ? "sm:col-span-2" : "sm:col-span-1"} lg:col-span-4`,
      aspect: isDerniere ? "aspect-[4/3] sm:max-lg:aspect-[21/9] lg:aspect-[4/3]" : "aspect-[4/3]",
      grande: false,
    };
  }
  if (total === 6) {
    return {
      cellule: "sm:col-span-1 lg:col-span-4",
      aspect: "aspect-[4/3]",
      grande: false,
    };
  }
  // total >= 7 : Photo 0 en grande vedette (col-8 row-span-2) + 2 vignettes à droite (col-4)
  if (i === 0) {
    return {
      cellule: "sm:col-span-2 lg:col-span-8 lg:row-span-2",
      aspect: "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[34rem]",
      grande: true,
    };
  }
  if (i === 1 || i === 2) {
    return {
      cellule: "sm:col-span-1 lg:col-span-4",
      aspect: "aspect-[4/3]",
      grande: false,
    };
  }
  // Reste des photos (total - 3)
  const remaining = total - 3;
  if (remaining % 3 === 1 && i === total - 1) {
    return {
      cellule: "sm:col-span-2 lg:col-span-12",
      aspect: "aspect-[16/9] lg:aspect-[21/9]",
      grande: false,
    };
  }
  if (remaining % 3 === 2 && i >= total - 2) {
    return {
      cellule: "sm:col-span-1 lg:col-span-6",
      aspect: "aspect-[4/3] lg:aspect-[16/10]",
      grande: false,
    };
  }
  const isDerniere = i === total - 1;
  return {
    cellule: `${isDerniere && total % 2 === 0 ? "sm:col-span-2" : "sm:col-span-1"} lg:col-span-4`,
    aspect: "aspect-[4/3]",
    grande: false,
  };
}

/**
 * Galerie d'une réalisation ou d'un domaine : mosaïque de photos réelles,
 * chacune ouvre la visionneuse plein écran au clic.
 * Aucun trou en bas ni décalage de grille.
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
          const { cellule, aspect, grande } = getDisposition(i, total);

          return (
            <li key={i} className={cellule}>
              <button
                type="button"
                onClick={(e) => ouvrir(i, e.currentTarget)}
                onPointerEnter={() => void import("./Visionneuse")}
                className="group/photo relative block w-full overflow-hidden rounded-chantier bg-nuit text-left"
                aria-label={`Agrandir la photo ${i + 1} sur ${total} : ${photo.alt}`}
              >
                <span className={`relative block ${aspect}`}>
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes={grande ? "(min-width: 1024px) 62vw, 100vw" : "(min-width: 1024px) 46vw, (min-width: 640px) 50vw, 100vw"}
                    quality={70}
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

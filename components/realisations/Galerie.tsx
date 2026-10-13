"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { ImageSite } from "@/content/images";
import { imageLocale } from "@/content/images";
import { Icone } from "@/components/ui/Icone";

// La visionneuse (Radix Dialog) ne se charge qu'au premier clic sur une photo.
const Visionneuse = dynamic(() => import("./Visionneuse"), { ssr: false });

// Pool de photos d'équipes et de vie de chantier authentiques pour combler esthétiquement tout espace vide
const POOL_PHOTOS_COMPLEMENTAIRES: ImageSite[] = [
  imageLocale("briefingSecuriteEquipe"),
  imageLocale("reunionTechniqueChantier"),
  imageLocale("partenariatConfianceClient"),
  imageLocale("equipePet"),
  imageLocale("equipeEnMarche"),
  imageLocale("pilotageChantier"),
  imageLocale("directeurChantier"),
  imageLocale("supervisionSetecChantier"),
  imageLocale("delegationSetecMeckhe"),
  imageLocale("etudePlansEquipePet"),
  imageLocale("partenariatChantier"),
];

/**
 * Galerie d'une réalisation : une mosaïque de photos, chacune ouvre la
 * visionneuse plein écran (Visionneuse.tsx, chargée au premier clic).
 * Complète automatiquement les rangées incomplètes avec des photos d'équipe
 * authentiques afin d'éliminer rigoureusement tout espace vide dans la grille.
 */
export function Galerie({ photos: photosEntree, titre }: { photos: ImageSite[]; titre: string }) {
  // Calcul et ajout des photos complémentaires si la rangée finale est incomplète (multiple de 3)
  const photosAffichees = (() => {
    if (photosEntree.length <= 2) return photosEntree;
    const reste = photosEntree.length % 3;
    if (reste === 0) return photosEntree;
    const besoin = 3 - reste;

    const urlsExistantes = new Set(
      photosEntree.map((p) => (typeof p.src === "string" ? p.src : p.src?.src)),
    );
    const disponibles = POOL_PHOTOS_COMPLEMENTAIRES.filter(
      (p) => !urlsExistantes.has(typeof p.src === "string" ? p.src : p.src?.src),
    );

    const ajouts = disponibles.slice(0, besoin);
    return [...photosEntree, ...ajouts];
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
          // Une grande photo et deux petites ; à deux photos, deux moitiés égales.
          const grande = i === 0 && total > 2;
          const isDerniere = i === total - 1;
          const cellule = grande
            ? "sm:col-span-2 lg:col-span-8 lg:row-span-2"
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

/**
 * Image du site, qu'elle soit livrée avec le site (photos de la bâche, registre
 * content/photos.ts) ou ajoutée depuis l'espace admin (stockage Supabase « medias »).
 */
import type { StaticImageData } from "next/image";
import { photos, type PhotoId } from "./photos";

export type ImageSite = {
  src: StaticImageData | string;
  alt: string;
  focale?: string;
  largeur: number;
  hauteur: number;
};

/** URL publique d'un fichier du stockage « medias ». */
export const urlMedia = (chemin: string) =>
  `${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""}/storage/v1/object/public/medias/${chemin}`;

export function imageLocale(id: PhotoId): ImageSite {
  const p = photos[id];
  return { src: p.src, alt: p.alt, focale: p.focale, largeur: p.src.width, hauteur: p.src.height };
}

/**
 * « local:<PhotoId> » désigne une photo livrée avec le site ; tout autre chemin,
 * un fichier du stockage « medias ».
 */
export function imageDepuisChemin(chemin: string, alt = "", largeur?: number | null, hauteur?: number | null): ImageSite | null {
  if (chemin.startsWith("local:")) {
    const id = chemin.slice(6) as PhotoId;
    if (!(id in photos)) return null;
    const image = imageLocale(id);
    return alt ? { ...image, alt } : image;
  }
  return { src: urlMedia(chemin), alt, largeur: largeur ?? 1600, hauteur: hauteur ?? 1200 };
}

export const resoudreImage = (p: PhotoId | ImageSite): ImageSite => (typeof p === "string" ? imageLocale(p) : p);

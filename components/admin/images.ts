"use client";

import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Prépare une photo avant l'envoi : redimensionnée (2000 px au plus, 600 pour un
 * logo) et convertie en WebP dans le navigateur. Les photos de chantier prises au
 * téléphone passent ainsi de plusieurs Mo à quelques centaines de Ko.
 */
async function preparer(fichier: File, max: number) {
  if (fichier.type === "image/svg+xml") return { blob: fichier as Blob, largeur: 400, hauteur: 160, ext: "svg", type: "image/svg+xml" };
  const image = await createImageBitmap(fichier);
  const echelle = Math.min(1, max / Math.max(image.width, image.height));
  const largeur = Math.round(image.width * echelle);
  const hauteur = Math.round(image.height * echelle);
  const toile = document.createElement("canvas");
  toile.width = largeur;
  toile.height = hauteur;
  toile.getContext("2d")!.drawImage(image, 0, 0, largeur, hauteur);
  const blob = await new Promise<Blob>((ok, ko) => toile.toBlob((b) => (b ? ok(b) : ko(new Error("Conversion impossible"))), "image/webp", 0.85));
  return { blob, largeur, hauteur, ext: "webp", type: "image/webp" };
}

/** Envoie une photo dans le stockage « medias » et renvoie son chemin et ses dimensions. */
export async function envoyerImage(supabase: SupabaseClient, dossier: "realisations" | "actualites" | "partenaires", fichier: File) {
  const p = await preparer(fichier, dossier === "partenaires" ? 600 : 2000);
  const chemin = `${dossier}/${crypto.randomUUID()}.${p.ext}`;
  const { error } = await supabase.storage.from("medias").upload(chemin, p.blob, { contentType: p.type, cacheControl: "31536000" });
  if (error) throw error;
  return { chemin, largeur: p.largeur, hauteur: p.hauteur };
}

/** Supprime des fichiers du stockage (les photos livrées avec le site, « local: », sont ignorées). */
export async function supprimerImages(supabase: SupabaseClient, chemins: (string | null | undefined)[]) {
  const aSupprimer = chemins.filter((c): c is string => Boolean(c) && !c!.startsWith("local:"));
  if (aSupprimer.length) await supabase.storage.from("medias").remove(aSupprimer);
}

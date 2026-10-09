import "server-only";
import { createClient } from "@supabase/supabase-js";
import { cacheLife, cacheTag } from "next/cache";
import { imageDepuisChemin, type ImageSite } from "@/content/images";
import { partenaires as partenairesStatiques, type Partenaire } from "@/content/partenaires";
import { projetsStatiques, type Projet } from "@/content/realisations";
import { temoignages as temoignagesStatiques, type Temoignage } from "@/content/temoignages";

/**
 * Lecture du contenu géré depuis l'espace admin (Supabase), mise en cache et
 * invalidée à chaque modification (étiquettes, voir app/admin/actions.ts).
 * Sans base branchée, ou si elle ne répond pas, le site garde le contenu livré
 * avec lui (content/).
 */

export const ETIQUETTES = ["realisations", "actualites", "partenaires", "temoignages"] as const;
export type Etiquette = (typeof ETIQUETTES)[number];

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const cle = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
export const baseBranchee = Boolean(url && cle);

const client = () => createClient(url!, cle!, { auth: { persistSession: false, autoRefreshToken: false } });

export type Actualite = { id: string; titre: string; texte: string; date: string; photo: ImageSite | null };

type LignePhoto = { chemin: string; alt: string | null; largeur: number | null; hauteur: number | null; ordre: number };

export async function lireRealisations(): Promise<Projet[]> {
  "use cache";
  cacheTag("realisations");
  cacheLife("hours");
  if (!baseBranchee) return projetsStatiques;
  const { data, error } = await client()
    .from("realisations")
    .select("slug, titre, domaine, resume, travaux, reference, ordre, realisation_photos (chemin, alt, largeur, hauteur, ordre)")
    .eq("publie", true)
    .order("ordre")
    .order("cree_le", { ascending: false });
  if (error || !data) return projetsStatiques;
  return data
    .map((r) => ({
      slug: r.slug,
      titre: r.titre,
      domaine: r.domaine,
      resume: r.resume,
      travaux: r.travaux ?? [],
      reference: r.reference || undefined,
      photos: ((r.realisation_photos ?? []) as LignePhoto[])
        .toSorted((a, b) => a.ordre - b.ordre)
        .map((p) => imageDepuisChemin(p.chemin, p.alt ?? r.titre, p.largeur, p.hauteur))
        .filter((p): p is ImageSite => p !== null),
    }))
    .filter((r) => r.photos.length > 0);
}

export async function lireRealisation(slug: string) {
  return (await lireRealisations()).find((p) => p.slug === slug);
}

export async function lireActualites(): Promise<Actualite[]> {
  "use cache";
  cacheTag("actualites");
  cacheLife("hours");
  if (!baseBranchee) return [];
  const { data, error } = await client()
    .from("actualites")
    .select("id, titre, texte, photo, largeur, hauteur, publie_le")
    .eq("publie", true)
    .order("publie_le", { ascending: false })
    .limit(30);
  if (error || !data) return [];
  return data.map((a) => ({
    id: a.id,
    titre: a.titre,
    texte: a.texte,
    date: a.publie_le,
    photo: a.photo ? imageDepuisChemin(a.photo, a.titre, a.largeur, a.hauteur) : null,
  }));
}

export async function lirePartenaires(): Promise<Partenaire[]> {
  "use cache";
  cacheTag("partenaires");
  cacheLife("hours");
  if (!baseBranchee) return partenairesStatiques;
  const { data, error } = await client().from("partenaires").select("nom, logo, url").eq("publie", true).order("ordre");
  if (error || !data) return partenairesStatiques;
  return data.map((p) => ({ nom: p.nom, logo: imageDepuisChemin(p.logo, p.nom)?.src as string, url: p.url ?? undefined }));
}

export async function lireTemoignages(): Promise<Temoignage[]> {
  "use cache";
  cacheTag("temoignages");
  cacheLife("hours");
  if (!baseBranchee) return temoignagesStatiques;
  const { data, error } = await client()
    .from("temoignages")
    .select("citation, auteur, fonction, organisation")
    .eq("publie", true)
    .order("ordre");
  if (error || !data) return temoignagesStatiques;
  return data.map((t) => ({ citation: t.citation, auteur: t.auteur, fonction: t.fonction ?? undefined, organisation: t.organisation ?? undefined }));
}

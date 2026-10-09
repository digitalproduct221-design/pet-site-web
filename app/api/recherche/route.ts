import { entreesRealisations, indexRecherche, type Resultat } from "@/content/recherche";
import { projetsStatiques } from "@/content/realisations";
import { lireActualites, lireRealisations } from "@/lib/contenu";

/**
 * Index complet de la recherche : pages et contenus livrés avec le site, plus les
 * réalisations et nouvelles gérées depuis l'espace admin (lues avec le même cache).
 */
export async function GET() {
  const [projets, actualites] = await Promise.all([lireRealisations(), lireActualites()]);
  const statiques = new Set(projetsStatiques.map((p) => `/realisations/${p.slug}`));
  const index: Resultat[] = [
    // Les réalisations viennent de la base : on retire celles de l'index de départ.
    ...indexRecherche.filter((r) => !statiques.has(r.href)),
    ...entreesRealisations(projets),
    ...actualites.map((a) => ({ titre: a.titre, description: a.texte.slice(0, 160), href: "/actualites", rubrique: "Actualités" })),
  ];
  return Response.json(index);
}

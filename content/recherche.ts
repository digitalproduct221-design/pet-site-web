/** Index statique pour la recherche plein écran (filtré dans le navigateur). */
import { domaines, metiers, navigation } from "./site";
import { besoins } from "./besoins";
import { projets } from "./realisations";
import { listeFrancaise } from "./texte";

export type Resultat = { titre: string; description: string; href: string; rubrique: string };

export const indexRecherche: Resultat[] = [
  { titre: "Accueil", description: "Bâtiment, travaux publics, hydraulique, assainissement et génie civil à Dakar.", href: "/", rubrique: "Pages" },
  { titre: "L'entreprise", description: "Qui sommes-nous, notre histoire, nos valeurs, qualité et sécurité, équipe et moyens.", href: "/entreprise", rubrique: "Pages" },
  { titre: "Savoir-faire", description: "Nos cinq domaines d'expertise.", href: "/savoir-faire", rubrique: "Pages" },
  { titre: "Réalisations", description: "Nos chantiers par domaine.", href: "/realisations", rubrique: "Pages" },
  { titre: "Engagements", description: "Sécurité, environnement, local et emploi, qualité.", href: "/engagements", rubrique: "Pages" },
  { titre: "Votre projet", description: "Ce que nous faisons pour vous, ce qu'il faut préparer, comment nous avançons.", href: "/votre-projet", rubrique: "Pages" },
  { titre: "Carrières", description: "Les métiers de nos chantiers et la candidature spontanée.", href: "/carrieres", rubrique: "Pages" },
  { titre: "Contact et devis", description: "Demander un devis, nous appeler, nous écrire sur WhatsApp.", href: "/contact", rubrique: "Pages" },
  ...navigation.flatMap((r) =>
    r.liens
      .filter((l) => l.href.includes("#"))
      .map((l) => ({ titre: l.titre, description: l.description, href: l.href, rubrique: r.titre })),
  ),
  ...domaines.map((d) => ({
    titre: d.titre,
    description: `${d.resume} ${listeFrancaise(d.prestations)}.`,
    href: `/savoir-faire/${d.slug}`,
    rubrique: "Savoir-faire",
  })),
  ...projets.map((p) => ({ titre: p.titre, description: p.resume, href: `/realisations/${p.slug}`, rubrique: "Réalisations" })),
  ...besoins.map((b) => ({ titre: b.titre, description: `${b.question} ${listeFrancaise(b.prestations)}.`, href: `/votre-projet#${b.slug}`, rubrique: "Votre projet" })),
  ...metiers.map((m) => ({ titre: m.titre, description: m.texte, href: `/carrieres?metier=${m.id}#candidature`, rubrique: "Carrières" })),
];

/** Normalise pour une recherche insensible à la casse et aux accents. */
export const normaliser = (texte: string) =>
  texte
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

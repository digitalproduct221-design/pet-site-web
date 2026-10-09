import Link from "next/link";
import { SITE_URL } from "@/content/site";

type Etape = { titre: string; href?: string };

/** Fil d'Ariane des pages intérieures, avec données structurées pour le SEO. */
export function FilAriane({ etapes, ton = "sombre" }: { etapes: Etape[]; ton?: "clair" | "sombre" }) {
  const toutes: Etape[] = [{ titre: "Accueil", href: "/" }, ...etapes];
  const donnees = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: toutes.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.titre,
      ...(e.href ? { item: `${SITE_URL}${e.href}` } : {}),
    })),
  };
  return (
    <nav aria-label="Fil d'Ariane" className="cote text-cote">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees).replace(/</g, "\\u003c") }} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {toutes.map((e, i) => {
          const derniere = i === toutes.length - 1;
          return (
            <li key={e.titre} className="flex items-center gap-2">
              {e.href && !derniere ? (
                <Link
                  href={e.href}
                  className={`underline-offset-4 hover:underline ${ton === "sombre" ? "text-brume hover:text-blanc" : "text-texte-doux hover:text-royal"}`}
                >
                  {e.titre}
                </Link>
              ) : (
                <span aria-current={derniere ? "page" : undefined} className={ton === "sombre" ? "text-blanc" : "text-nuit"}>
                  {e.titre}
                </span>
              )}
              {!derniere ? (
                <span aria-hidden className={ton === "sombre" ? "text-ciel" : "text-sable-fonce"}>
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

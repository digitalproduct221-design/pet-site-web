import type { MetadataRoute } from "next";
import { projets } from "@/content/realisations";
import { domaines, SITE_URL } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/entreprise", "/savoir-faire", "/realisations", "/votre-projet", "/engagements", "/carrieres", "/contact", "/mentions-legales"];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...domaines.map((d) => ({ url: `${SITE_URL}/savoir-faire/${d.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...projets.map((p) => ({ url: `${SITE_URL}/realisations/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}

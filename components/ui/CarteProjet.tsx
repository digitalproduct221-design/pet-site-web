import Link from "next/link";
import type { Projet } from "@/content/exemples";
import { domaineParSlug } from "@/content/site";
import { MentionExemple } from "./Exemple";
import { PhotoCadre } from "./PhotoCadre";

/** Vignette de réalisation : photo, domaine, titre ; la photo s'approche au survol. */
export function CarteProjet({ projet, ton = "clair", ratio = "aspect-[4/3]" }: { projet: Projet; ton?: "clair" | "sombre"; ratio?: string }) {
  const domaine = domaineParSlug(projet.domaine);
  const sombre = ton === "sombre";
  return (
    <Link href={`/realisations/${projet.slug}`} className="group/projet block">
      <PhotoCadre
        photo={projet.photos[0]}
        ratio={ratio}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        voile="leger"
        imageClassName="transition-transform duration-[900ms] ease-chantier group-hover/projet:scale-[1.04]"
      />
      <span className="mt-5 flex flex-wrap items-center gap-3">
        <span className={`cote text-[0.9375rem] uppercase tracking-[0.06em] ${sombre ? "text-ciel" : "text-royal"}`}>{domaine?.titre}</span>
        <MentionExemple visible={projet.exemple} ton={ton} />
      </span>
      <span className={`mt-2 block titre text-[1.625rem] leading-[1] transition-colors ${sombre ? "text-blanc group-hover/projet:text-jaune" : "text-nuit group-hover/projet:text-royal"}`}>
        {projet.titre}
      </span>
      <span className={`mt-2 block text-[1rem] leading-relaxed ${sombre ? "text-brume" : "text-encre-douce"}`}>{projet.resume}</span>
    </Link>
  );
}

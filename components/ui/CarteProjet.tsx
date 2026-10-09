import Link from "next/link";
import type { Projet } from "@/content/realisations";
import { domaineParSlug } from "@/content/site";
import { Icone } from "./Icone";
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
      <span className={`mt-5 block titre text-[1.625rem] leading-[1] transition-colors ${sombre ? "text-blanc group-hover/projet:text-jaune" : "text-nuit group-hover/projet:text-royal"}`}>
        {projet.titre}
      </span>
      <span className="mt-2 flex flex-wrap items-center gap-3">
        <span className={`cote text-[0.9375rem] ${sombre ? "text-ciel" : "text-royal"}`}>{domaine?.titre}</span>
        <span className={`inline-flex items-center gap-1.5 cote text-[0.9375rem] ${sombre ? "text-brume" : "text-encre-douce"}`}>
          <Icone nom="photos" size={16} />
          {projet.photos.length} photos
        </span>
      </span>
      <span className={`mt-2 block text-[1rem] leading-relaxed ${sombre ? "text-brume" : "text-encre-douce"}`}>{projet.resume}</span>
    </Link>
  );
}

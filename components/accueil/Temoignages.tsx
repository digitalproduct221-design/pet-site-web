import { temoignages } from "@/content/temoignages";
import { Motif } from "@/components/ui/Motif";
import { TitreSection } from "@/components/ui/TitreSection";

/**
 * « Ils en parlent » : témoignages de clients en cartes défilantes (défilement
 * horizontal natif, accrochage par carte). Rien n'est affiché tant que la liste
 * (content/temoignages.ts) est vide.
 */
export function Temoignages() {
  if (temoignages.length === 0) return null;
  return (
    <section aria-labelledby="titre-temoignages" className="relative isolate overflow-hidden bg-sable py-20 lg:py-28">
      <Motif type="courbes" className="text-royal" opacite={0.08} />
      <div className="conteneur">
        <TitreSection id="titre-temoignages" titre="Ils en parlent" />
        <ul className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:thin]">
          {temoignages.map((t) => (
            <li key={t.auteur} className="w-[min(88%,30rem)] shrink-0 snap-start">
              <figure className="flex h-full flex-col rounded-panneau bg-blanc p-7 ombre-carte">
                <span aria-hidden className="titre text-[4rem] leading-none text-jaune-profond">«</span>
                <blockquote className="-mt-4 flex-1 text-[1.125rem] leading-relaxed text-encre">{t.citation}</blockquote>
                <figcaption className="mt-6 cote text-[1rem] text-nuit">
                  {t.auteur}
                  {t.fonction || t.organisation ? (
                    <span className="block text-encre-douce">{[t.fonction, t.organisation].filter(Boolean).join(", ")}</span>
                  ) : null}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { engagementsCles } from "@/content/site";
import { Icone } from "@/components/ui/Icone";
import { PhotoCadre } from "@/components/ui/PhotoCadre";
import { TitreSection } from "@/components/ui/TitreSection";

/** Quatre engagements, en liste éditoriale (pas en cartes identiques). */
export function Pourquoi() {
  return (
    <section aria-labelledby="titre-pourquoi" className="bg-blanc py-20 lg:py-32">
      <div className="conteneur grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h-compact)+3rem)]">
            <TitreSection
              id="titre-pourquoi"
              titre="Pourquoi choisir PET ?"
              intro="Parce qu'un chantier se gagne sur le terrain : des équipes qualifiées, des engins entretenus et une parole tenue."
            />
            <PhotoCadre
              photo="niveleuseVoirie"
              ratio="aspect-[4/3]"
              sizes="(min-width: 1024px) 34vw, 100vw"
              voile="aucun"
              equerres
              decalage={12}
              className="mt-12 hidden lg:block lg:max-w-[28rem]"
            />
          </div>
        </div>

        <ul className="revele-groupe grid gap-12 lg:col-span-6 lg:col-start-7 lg:gap-16 lg:pt-4">
          {engagementsCles.map((e) => (
            <li key={e.titre} className="grid grid-cols-[auto_1fr] gap-x-6">
              <span className="grid size-14 place-items-center rounded-[6px] bg-royal text-jaune shadow-[0_14px_30px_-14px_rgb(33_64_154/0.7)]">
                <Icone nom={e.icone} size={30} />
              </span>
              <div>
                <h3 className="titre text-titre-m text-royal">{e.titre}</h3>
                <p className="mt-3 max-w-[32rem] text-[1.0625rem] leading-relaxed text-texte-doux">{e.texte}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

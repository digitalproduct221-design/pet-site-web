import { methode } from "@/content/site";
import { Motif } from "@/components/ui/Motif";
import { Profil } from "@/components/ui/Profil";
import { TitreSection } from "@/components/ui/TitreSection";

/**
 * La méthode en frise chronologique : le titre reste en place à gauche, les
 * quatre temps s'enchaînent à droite le long d'une ligne qui se remplit au fil
 * du défilement (animation liée au défilement, ligne pleine sans cette
 * fonction ou sous mouvement réduit).
 */
export function Methode() {
  return (
    <section aria-labelledby="titre-methode" className="relative isolate overflow-hidden bg-sable pb-28 pt-16 lg:pb-40 lg:pt-24">
      <Motif type="beton" className="text-nuit" opacite={0.07} />
      <div className="conteneur grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="revele lg:sticky lg:top-[calc(var(--header-h-compact)+3rem)]">
            <TitreSection
              id="titre-methode"
              titre="Notre manière de travailler"
              intro="Quatre temps, toujours les mêmes, pour que vous sachiez où en est votre chantier."
            />
          </div>
        </div>

        <ol className="frise relative lg:col-span-6 lg:col-start-7">
          {/* La ligne de la frise et son remplissage */}
          <span aria-hidden className="absolute bottom-6 left-[1.375rem] top-6 w-[3px] rounded-full bg-nuit/12" />
          <span aria-hidden className="frise-remplissage absolute bottom-6 left-[1.375rem] top-6 w-[3px] origin-top rounded-full bg-jaune" />
          {methode.map((etape, i) => (
            <li key={etape.titre} className="revele relative grid grid-cols-[2.875rem_1fr] gap-x-5 pb-12 last:pb-0 sm:gap-x-7">
              <span
                aria-hidden
                className="relative z-[1] grid size-[2.875rem] place-items-center rounded-full bg-nuit titre text-[1.25rem] text-jaune shadow-[0_0_0_6px_var(--color-sable)] chiffres-tabulaires"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="rounded-panneau bg-blanc/80 p-5 ombre-carte sm:p-6">
                <h3 className="titre text-[1.75rem] leading-[0.95] text-nuit sm:text-[2rem]">
                  <span className="sr-only">Étape {i + 1} : </span>
                  {etape.titre}
                </h3>
                <p className="mt-2.5 text-[1.0625rem] leading-relaxed text-texte-doux">{etape.texte}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <Profil couleur="text-nuit" forme="talus" miroir />
    </section>
  );
}

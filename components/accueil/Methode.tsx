import { methode } from "@/content/site";
import { Motif } from "@/components/ui/Motif";
import { Profil } from "@/components/ui/Profil";
import { TitreSection } from "@/components/ui/TitreSection";

/** La méthode en quatre temps : de grands numéros, sans trait ni filet. */
export function Methode() {
  return (
    <section aria-labelledby="titre-methode" className="relative isolate overflow-hidden bg-sable pb-28 pt-16 lg:pb-40 lg:pt-20">
      <Motif type="beton" className="text-nuit" opacite={0.07} />
      <div className="conteneur">
        <div className="revele">
          <TitreSection
            id="titre-methode"
            titre="Notre manière de travailler"
            intro="Quatre temps, toujours les mêmes, pour que vous sachiez où en est votre chantier."
          />
        </div>

        <ol className="revele-groupe mt-14 grid gap-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-10">
          {methode.map((etape, i) => (
            <li key={etape.titre} className="relative">
              {/* Le numéro porte l'ordre des étapes : il compte vraiment ici */}
              <span aria-hidden className="block titre text-[2.75rem] leading-none text-royal chiffres-tabulaires">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 titre text-[1.875rem] leading-[0.95] text-nuit lg:text-[2.125rem]">
                <span className="sr-only">Étape {i + 1} : </span>
                {etape.titre}
              </h3>
              <p className="mt-3 max-w-[18rem] text-[1.0625rem] leading-relaxed text-texte-doux">{etape.texte}</p>
            </li>
          ))}
        </ol>
      </div>
      <Profil couleur="text-nuit" forme="talus" miroir />
    </section>
  );
}

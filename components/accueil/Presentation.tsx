import { valeurs } from "@/content/site";
import { BoutonLien } from "@/components/ui/Bouton";
import { Icone } from "@/components/ui/Icone";
import { Motif } from "@/components/ui/Motif";
import { PhotoCadre } from "@/components/ui/PhotoCadre";
import { TitreSection } from "@/components/ui/TitreSection";

/**
 * Qui est PET : une grande photo d'équipe posée sur une feuille de plan (trame de
 * points), une carte de verre qui dit l'essentiel, et les valeurs en deux colonnes.
 */
export function Presentation() {
  return (
    <section aria-labelledby="titre-presentation" className="relative bg-blanc pb-28 pt-20 lg:pb-36 lg:pt-28">
      <div className="conteneur grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-6">
          {/* Feuille de plan décalée derrière la photo */}
          <div aria-hidden className="absolute -inset-y-6 -left-4 right-10 isolate rounded-panneau bg-sable sm:-left-8 lg:-left-12">
            <Motif type="plan" className="text-royal" opacite={0.22} />
          </div>
          <div className="relative">
            <PhotoCadre
              photo="trancheeLotissement"
              ratio="aspect-[5/4]"
              sizes="(min-width: 1024px) 46vw, 100vw"
              voile="leger"
              equerres
              decalage={14}
            />
            {/* .verre-liquide impose position: relative : l'ancrage se fait sur un conteneur */}
            <div className="absolute -bottom-10 right-3 max-w-[19rem] sm:right-6 lg:-right-10">
              <div className="verre-liquide rounded-panneau p-5 text-blanc">
                <Icone nom="securite" size={28} className="text-jaune" />
                <p className="mt-3 cote text-[1.125rem] leading-snug">Personnel qualifié et équipements régulièrement mis à niveau.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="revele lg:col-span-5 lg:col-start-8">
          <TitreSection id="titre-presentation" titre="La qualité et la sécurité au centre de nos chantiers" />
          <p className="mt-8 max-w-[34rem] text-[1.125rem] leading-relaxed text-texte">
            Entreprise de bâtiment et de travaux publics, de génie civil, d&apos;hydraulique et d&apos;assainissement, tous corps
            d&apos;état, PET s&apos;appuie sur une équipe qui cumule plus de 40 ans d&apos;expérience.
          </p>
          <ul aria-label="Nos valeurs" className="mt-8 grid max-w-[34rem] gap-x-6 gap-y-3 sm:grid-cols-2">
            {valeurs.map((v) => (
              <li key={v.titre} className="flex items-center gap-3 cote text-[1.0625rem] text-nuit">
                <span aria-hidden className="size-2 shrink-0 rounded-[1px] bg-jaune" />
                {v.titre}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <BoutonLien href="/entreprise" variante="contour">
              Découvrir PET
            </BoutonLien>
          </div>
        </div>
      </div>
    </section>
  );
}

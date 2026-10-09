import { entreprise, valeurs } from "@/content/site";
import { BoutonLien } from "@/components/ui/Bouton";
import { PhotoCadre } from "@/components/ui/PhotoCadre";
import { TitreSection } from "@/components/ui/TitreSection";

/** Qui est PET : le texte de présentation, et deux photos en cascade. */
export function Presentation() {
  return (
    <section aria-labelledby="titre-presentation" className="bg-blanc py-20 lg:py-32">
      <div className="conteneur grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="revele lg:col-span-6">
          <TitreSection id="titre-presentation" titre="Une entreprise de travaux, tous corps d'état" />
          <div className="mt-8 max-w-[38rem] space-y-5 text-[1.125rem] leading-relaxed text-texte">
            <p>
              Fondée en {entreprise.fondation}, <strong className="font-semibold text-nuit">{entreprise.nom}</strong> conçoit,
              construit, réhabilite et entretient des réseaux d&apos;eau, des bâtiments et des infrastructures, pour des clients
              publics, industriels et privés.
            </p>
            <p className="text-texte-doux">
              Notre équipe cumule plus de 40 ans d&apos;expérience. La qualité et la sécurité sont au centre de nos
              préoccupations, avec un personnel qualifié et des équipements régulièrement mis à niveau.
            </p>
          </div>
          <ul aria-label="Nos valeurs" className="mt-8 flex max-w-[38rem] flex-wrap gap-2">
            {valeurs.map((v) => (
              <li key={v.titre} className="rounded-chantier bg-sable px-3 py-1.5 cote text-[0.9375rem] text-nuit">
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

        <div className="relative lg:col-span-5 lg:col-start-8">
          <PhotoCadre
            photo="poseConduiteTopographie"
            ratio="aspect-[5/4]"
            sizes="(min-width: 1024px) 36vw, 100vw"
            voile="aucun"
            equerres
            decalage={14}
          />
          <PhotoCadre
            photo="dalotRegard"
            ratio="aspect-[4/3]"
            sizes="(min-width: 1024px) 20vw, 60vw"
            voile="aucun"
            equerres={false}
            className="-mt-24 ml-auto w-3/5 shadow-[var(--ombre-planche)] lg:absolute lg:-bottom-14 lg:-left-20 lg:mt-0 lg:ml-0 lg:w-[52%]"
          />
        </div>
      </div>
    </section>
  );
}

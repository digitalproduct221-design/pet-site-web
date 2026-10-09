import Image from "next/image";
import { photos } from "@/content/photos";
import { BoutonLien } from "@/components/ui/Bouton";
import { TitreSection } from "@/components/ui/TitreSection";
import { ListeOffres } from "./CarrieresBloc";

/** Bloc « Rejoignez-nous » de l'accueil : offres en verre liquide sur photo d'équipe. */
export function Carrieres() {
  return (
    <section aria-labelledby="titre-carrieres" className="sur-sombre relative isolate overflow-hidden bg-nuit py-20 text-blanc lg:py-28">
      {/* Photo d'équipe très voilée : la matière du verre des offres */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image src={photos.trancheeLotissement.src} alt="" fill sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 voile-lateral" />
      </div>
      <div className="conteneur grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="revele lg:col-span-5">
          <TitreSection
            id="titre-carrieres"
            ton="sombre"
            titre="Rejoignez nos équipes"
            intro="Conducteurs d'engins, chefs d'équipe, techniciens : nous cherchons des femmes et des hommes de terrain, fiers de leur métier."
          />
          <div className="mt-10 flex flex-wrap gap-4">
            <BoutonLien href="/carrieres#offres">Voir les offres</BoutonLien>
            <BoutonLien href="/carrieres#candidature" variante="contour-clair" icone={undefined}>
              Candidature spontanée
            </BoutonLien>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ListeOffres />
        </div>
      </div>
    </section>
  );
}

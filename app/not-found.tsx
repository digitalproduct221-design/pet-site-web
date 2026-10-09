import { BoutonLien } from "@/components/ui/Bouton";
import { Equerres } from "@/components/ui/Equerres";
import { Motif } from "@/components/ui/Motif";
import { Pelleteuse } from "@/components/ui/Pelleteuse";

/** 404 : la page n'existe pas… la pelleteuse continue de creuser. */
export default function PageIntrouvable() {
  return (
    <section className="relative isolate flex min-h-[70svh] items-center overflow-hidden bg-sable py-20 text-nuit lg:py-28">
      <Motif type="courbes" className="text-royal" opacite={0.12} />
      <div className="conteneur grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <p className="titre text-[clamp(5rem,3rem+8vw,10rem)] leading-none text-royal">404</p>
          <Equerres seule decalage={20} className="mt-4 inline-block pl-1 pt-1">
            <h1 className="titre text-titre-l text-nuit">Page introuvable</h1>
          </Equerres>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-encre-douce">
            Cette page n&apos;existe pas ou a changé d&apos;adresse. Le chantier continue ailleurs&nbsp;: revenez à l&apos;accueil ou
            parlez-nous de votre projet.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <BoutonLien href="/">Retour à l&apos;accueil</BoutonLien>
            <BoutonLien href="/votre-projet" variante="contour">
              Votre projet
            </BoutonLien>
          </div>
        </div>
        <Pelleteuse className="mx-auto h-auto w-full max-w-[28rem] text-nuit lg:col-span-5 lg:col-start-8" />
      </div>
    </section>
  );
}

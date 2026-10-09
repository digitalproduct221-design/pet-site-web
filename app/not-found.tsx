import Image from "next/image";
import { photos } from "@/content/photos";
import { BoutonLien } from "@/components/ui/Bouton";
import { Equerres } from "@/components/ui/Equerres";

export default function PageIntrouvable() {
  return (
    <section className="sur-sombre relative isolate flex min-h-[70svh] items-center overflow-hidden bg-nuit py-24 text-blanc">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image src={photos.terrassementEngins.src} alt="" fill sizes="100vw" placeholder="blur" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(7_18_43/0.95)_0%,rgb(11_27_63/0.8)_60%,rgb(11_27_63/0.6)_100%)]" />
      </div>
      <div className="conteneur">
        <Equerres seule decalage={20} className="inline-block pl-1 pt-1">
          <h1 className="titre text-titre-xl text-blanc">Page introuvable</h1>
        </Equerres>
        <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-blanc/85">
          Cette page n&apos;existe pas ou a changé d&apos;adresse. Le chantier continue ailleurs : revenez à l&apos;accueil ou parlez-nous de votre projet.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <BoutonLien href="/">Retour à l&apos;accueil</BoutonLien>
          <BoutonLien href="/contact#devis" variante="contour-clair">
            Demander un devis
          </BoutonLien>
        </div>
      </div>
    </section>
  );
}

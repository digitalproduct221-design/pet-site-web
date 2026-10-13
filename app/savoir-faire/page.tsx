import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { photos } from "@/content/photos";
import { domaines } from "@/content/site";
import { listeFrancaise } from "@/content/texte";
import { EnTetePage } from "@/components/ui/EnTetePage";
import { Icone } from "@/components/ui/Icone";
import { AppelFinal } from "@/components/accueil/AppelFinal";

export const metadata: Metadata = {
  title: "Savoir-faire",
  description:
    "Bâtiment, travaux publics et VRD, hydraulique, assainissement, génie civil, électricité et peinture : nos domaines d'expertise au Sénégal.",
  alternates: { canonical: "/savoir-faire" },
  openGraph: {
    title: "Savoir-faire | PET SUARL Sénégal",
    description: "Bâtiment, VRD, hydraulique, assainissement, génie civil, électricité et peinture : nos domaines d'expertise au Sénégal.",
    url: "/savoir-faire",
    images: [{ url: "/images/chantiers/batiment-commercial-dakar.jpg", width: 1376, height: 768, alt: "Savoir-faire et domaines d'expertise PET SUARL" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Savoir-faire | PET SUARL Sénégal",
    description: "Bâtiment, VRD, hydraulique, assainissement et génie civil au Sénégal.",
    images: ["/images/chantiers/batiment-commercial-dakar.jpg"],
  },
};

export default function PageSavoirFaire() {
  return (
    <>
      <EnTetePage
        suite="text-blanc"
        titre="Savoir-faire"
        intro="Nos domaines d'expertise, tous corps d'état, pour des clients publics, industriels et privés. Du gros œuvre aux réseaux et finitions, nous menons vos travaux de l'étude à la livraison au Sénégal."
        ariane={[{ titre: "Savoir-faire" }]}
        photo="batimentCommercialDakar"
      />

      <section aria-label="Nos domaines d'activité" className="bg-blanc py-20 lg:py-28">
        <ul className="conteneur revele-groupe grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {domaines.map((d) => {
            const p = photos[d.photos[0]];
            return (
              <li key={d.slug}>
                <Link
                  href={`/savoir-faire/${d.slug}`}
                  className="group/domaine relative isolate flex min-h-[26rem] items-end overflow-hidden rounded-panneau bg-nuit p-5 sm:p-7 text-blanc transition-all duration-500 hover:shadow-2xl"
                >
                  <Image
                    src={p.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    quality={75}
                    placeholder="blur"
                    className="-z-10 object-cover transition-transform duration-[1100ms] ease-chantier group-hover/domaine:scale-[1.05]"
                    style={{ objectPosition: p.focale }}
                  />
                  <span aria-hidden className="absolute inset-0 -z-10 voile-carte" />
                  <span className="verre-liquide block w-full rounded-panneau p-6 transition-all duration-300 group-hover/domaine:border-jaune/40">
                    <span className="flex items-center gap-3">
                      <Icone nom={d.icone} size={28} className="text-jaune" />
                      <span className="titre text-[1.875rem] leading-[0.95] text-blanc">{d.titre}</span>
                    </span>
                    <span className="mt-3 block text-[1rem] leading-relaxed text-blanc/90">{d.accroche}</span>
                    <span className="mt-3 block cote text-[0.875rem] leading-relaxed text-brume">{listeFrancaise(d.prestations)}</span>
                    <span className="mt-4 inline-flex items-center gap-2 cote text-[1rem] text-jaune">
                      Découvrir le domaine
                      <Icone nom="fleche" size={16} weight="bold" className="transition-transform group-hover/domaine:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <AppelFinal />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { photos } from "@/content/photos";
import { domaines } from "@/content/site";
import { EnTetePage } from "@/components/ui/EnTetePage";
import { Icone } from "@/components/ui/Icone";
import { AppelFinal } from "@/components/accueil/AppelFinal";

export const metadata: Metadata = {
  title: "Savoir-faire",
  description:
    "Bâtiment, travaux publics et VRD, hydraulique, assainissement et génie civil : les cinq domaines d'expertise de PET à Dakar.",
  alternates: { canonical: "/savoir-faire" },
};

export default function PageSavoirFaire() {
  return (
    <>
      <EnTetePage
        titre="Savoir-faire"
        intro="Cinq domaines d'expertise, tous corps d'état, pour des clients publics, industriels et privés. Du gros œuvre aux réseaux, nous menons vos travaux de l'étude à la livraison."
        ariane={[{ titre: "Savoir-faire" }]}
        photo="conduiteOuvrage"
      />

      <section aria-label="Nos cinq domaines" className="bg-blanc py-20 lg:py-28">
        <ul className="conteneur revele-groupe grid gap-6 md:grid-cols-2 lg:gap-8">
          {domaines.map((d, i) => {
            const p = photos[d.photos[0]];
            const vedette = i === 0;
            return (
              <li key={d.slug} className={vedette ? "md:col-span-2" : ""}>
                <Link
                  href={`/savoir-faire/${d.slug}`}
                  className={`group/domaine relative isolate flex overflow-hidden rounded-[6px] bg-nuit text-blanc ${
                    vedette ? "min-h-[30rem] items-end p-5 sm:p-8 lg:min-h-[36rem] lg:p-10" : "min-h-[26rem] items-end p-5 sm:p-7"
                  }`}
                >
                  <Image
                    src={p.src}
                    alt=""
                    fill
                    sizes={vedette ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                   
                    className="-z-10 object-cover transition-transform duration-[1100ms] ease-chantier group-hover/domaine:scale-[1.04]"
                    style={{ objectPosition: p.focale }}
                  />
                  <span aria-hidden className="absolute inset-0 -z-10 voile-carte" />
                  <span className={`verre-liquide block w-full rounded-[6px] p-6 ${vedette ? "max-w-[38rem] lg:p-8" : ""}`}>
                    <span className="flex items-center gap-3">
                      <Icone nom={d.icone} size={28} className="text-jaune" />
                      <span className={`titre leading-[0.95] text-blanc ${vedette ? "text-titre-l" : "text-[2rem]"}`}>{d.titre}</span>
                    </span>
                    <span className="mt-4 block text-[1.0625rem] leading-relaxed text-blanc/90">{d.accroche}</span>
                    <span className="mt-4 block cote text-[0.9375rem] leading-relaxed text-brume">{d.prestations.join(", ")}</span>
                    <span className="mt-5 inline-flex items-center gap-2 cote text-[1.0625rem] text-jaune">
                      Découvrir le domaine
                      <Icone nom="fleche" size={18} weight="bold" className="transition-transform group-hover/domaine:translate-x-1" />
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

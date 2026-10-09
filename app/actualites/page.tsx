import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/content/exemples";
import { dateLongue } from "@/content/dates";
import { photos } from "@/content/photos";
import { EnTetePage } from "@/components/ui/EnTetePage";
import { MentionExemple } from "@/components/ui/Exemple";
import { Icone } from "@/components/ui/Icone";
import { PhotoCadre } from "@/components/ui/PhotoCadre";
import { AppelFinal } from "@/components/accueil/AppelFinal";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Les nouvelles des chantiers et des équipes de PET.",
  alternates: { canonical: "/actualites" },
};

export default function PageActualites() {
  const tries = articles.toSorted((a, b) => b.date.localeCompare(a.date));
  const [une, ...suite] = tries;

  return (
    <>
      <EnTetePage titre="Actualités" intro="La vie de nos chantiers et de nos équipes." ariane={[{ titre: "Actualités" }]} photo="poseConduiteTopographie" />

      <section aria-label="Articles" className="bg-sable py-20 lg:py-28">
        <div className="conteneur">
          {une ? (
            <article className="revele">
              <Link href={`/actualites/${une.slug}`} className="group/une relative isolate flex min-h-[28rem] items-end overflow-hidden rounded-panneau bg-nuit p-5 sm:p-8 lg:min-h-[32rem] lg:p-10">
                <Image
                  src={photos[une.photo].src}
                  alt=""
                  fill
                  sizes="100vw"
                 
                  className="-z-10 object-cover transition-transform duration-[1100ms] ease-chantier group-hover/une:scale-[1.03]"
                  style={{ objectPosition: photos[une.photo].focale }}
                />
                <span aria-hidden className="absolute inset-0 -z-10 voile-carte" />
                <span className="verre-liquide block max-w-[40rem] rounded-panneau p-6 lg:p-8">
                  <h2 className="titre text-titre-m text-blanc">{une.titre}</h2>
                  <span className="mt-3 flex flex-wrap items-center gap-3">
                    <time dateTime={une.date} className="cote text-[0.9375rem] text-brume">
                      {dateLongue(une.date)}
                    </time>
                    <MentionExemple visible={une.exemple} ton="sombre" />
                  </span>
                  <p className="mt-3 text-[1.0625rem] leading-relaxed text-blanc/90">{une.chapo}</p>
                  <span className="mt-5 inline-flex items-center gap-2 cote text-[1.0625rem] text-jaune">
                    Lire l&apos;article
                    <Icone nom="fleche" size={18} weight="bold" className="transition-transform group-hover/une:translate-x-1" />
                  </span>
                </span>
              </Link>
            </article>
          ) : (
            <p className="text-lg text-encre-douce">Aucune actualité publiée pour le moment. Revenez bientôt.</p>
          )}

          {suite.length > 0 ? (
            <ul className="revele-groupe mt-14 grid gap-x-6 gap-y-14 md:grid-cols-2">
              {suite.map((a) => (
                <li key={a.slug}>
                  <article>
                    <Link href={`/actualites/${a.slug}`} className="group/article block">
                      <PhotoCadre
                        photo={a.photo}
                        ratio="aspect-[16/10]"
                        sizes="(min-width: 768px) 45vw, 100vw"
                        voile="leger"
                        imageClassName="transition-transform duration-[900ms] ease-chantier group-hover/article:scale-[1.04]"
                      />
                      <h2 className="mt-5 titre text-[1.875rem] leading-[1] text-nuit group-hover/article:text-royal">{a.titre}</h2>
                      <span className="mt-2 flex flex-wrap items-center gap-3">
                        <time dateTime={a.date} className="cote text-[0.9375rem] text-encre-douce">
                          {dateLongue(a.date)}
                        </time>
                        <MentionExemple visible={a.exemple} />
                      </span>
                      <p className="mt-3 text-[1.0625rem] leading-relaxed text-encre-douce">{a.chapo}</p>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      <AppelFinal />
    </>
  );
}

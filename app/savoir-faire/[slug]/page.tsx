import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projets } from "@/content/realisations";
import { domaineParSlug, domaines } from "@/content/site";
import { listeFrancaise } from "@/content/texte";
import { EnTetePage } from "@/components/ui/EnTetePage";
import { BoutonLien } from "@/components/ui/Bouton";
import { CarteProjet } from "@/components/ui/CarteProjet";
import { Icone } from "@/components/ui/Icone";
import { PhotoCadre } from "@/components/ui/PhotoCadre";
import { AppelFinal } from "@/components/accueil/AppelFinal";

export function generateStaticParams() {
  return domaines.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/savoir-faire/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = domaineParSlug(slug);
  if (!d) return {};
  return {
    title: d.titre,
    description: `${d.titre} à Dakar avec PET : ${listeFrancaise(d.prestations).toLowerCase()}.`,
    alternates: { canonical: `/savoir-faire/${d.slug}` },
  };
}

// Ancres stables pour les prestations qui ont un lien direct dans le menu.
const ancre = (prestation: string) => (prestation === "Électricité et peinture" ? "electricite-peinture" : undefined);

export default async function PageDomaine({ params }: PageProps<"/savoir-faire/[slug]">) {
  const { slug } = await params;
  const d = domaineParSlug(slug);
  if (!d) notFound();

  const lies = projets.filter((p) => p.domaine === d.slug);
  const autres = domaines.filter((x) => x.slug !== d.slug);
  const [photoA, photoB, photoC] = d.photos;

  return (
    <>
      <EnTetePage suite="text-blanc" titre={d.titre} intro={d.resume} ariane={[{ titre: "Savoir-faire", href: "/savoir-faire" }, { titre: d.titre }]} photo={photoA}>
        <BoutonLien href="/contact#devis">Demander un devis</BoutonLien>
      </EnTetePage>

      {/* Description et prestations */}
      <section aria-labelledby="titre-prestations" className="bg-blanc py-20 lg:py-28">
        <div className="conteneur grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="revele lg:col-span-5">
            <div className="space-y-5 text-[1.125rem] leading-relaxed text-encre">
              {d.presentation.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 id="titre-prestations" className="titre text-titre-m text-nuit">
              Nos prestations
            </h2>
            <ul className="revele-groupe mt-8 grid gap-3 sm:grid-cols-2">
              {d.prestations.map((p) => (
                <li key={p} id={ancre(p)} className="flex scroll-mt-32 items-start gap-4 rounded-panneau bg-sable p-5">
                  <Icone nom="succes" size={24} weight="fill" className="mt-0.5 shrink-0 text-royal" />
                  <span className="cote text-[1.125rem] leading-snug text-nuit">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section aria-label="Galerie" className="bg-sable pb-20 pt-4 lg:pb-28">
        <div className="conteneur grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          <PhotoCadre photo={photoB} ratio="aspect-[4/3]" sizes="(min-width: 1024px) 55vw, 100vw" voile="leger" equerres decalage={12} className="sm:col-span-2 lg:col-span-7" />
          <div className="grid gap-4 lg:col-span-5 lg:gap-5">
            <PhotoCadre photo={photoC} ratio="aspect-[4/3] lg:aspect-auto lg:h-full" sizes="(min-width: 1024px) 38vw, 50vw" voile="leger" className="lg:h-full [&>div]:h-full" />
          </div>
        </div>
      </section>

      {/* Projets liés */}
      {lies.length > 0 ? (
        <section aria-labelledby="titre-lies" className="bg-blanc py-20 lg:py-28">
          <div className="conteneur">
            <div className="revele flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <h2 id="titre-lies" className="titre text-titre-l text-nuit">
                Réalisations : {d.titre}
              </h2>
              <Link
                href={`/realisations?domaine=${d.slug}`}
                className="inline-flex shrink-0 items-center gap-2 cote text-[1.0625rem] uppercase tracking-[0.04em] text-nuit underline decoration-jaune decoration-[3px] underline-offset-[6px] hover:text-royal"
              >
                Toutes ces réalisations
                <Icone nom="fleche" size={18} weight="bold" />
              </Link>
            </div>
            {/* Autant de colonnes que de réalisations (trois au plus) : jamais de colonne vide */}
            <ul className={`revele-groupe mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 ${lies.length >= 3 ? "lg:grid-cols-3" : ""}`}>
              {lies.map((p) => (
                <li key={p.slug}>
                  <CarteProjet projet={p} ratio={lies.length < 3 ? "aspect-[16/10]" : undefined} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Autres domaines */}
      <nav aria-labelledby="titre-autres" className="sur-sombre profondeur py-16 text-blanc lg:py-20">
        <div className="conteneur">
          <h2 id="titre-autres" className="titre text-titre-m text-blanc">
            Nos autres savoir-faire
          </h2>
          <ul className="revele-groupe mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {autres.map((x) => (
              <li key={x.slug}>
                <Link href={`/savoir-faire/${x.slug}`} className="group/autre flex h-full items-center justify-between gap-4 rounded-panneau bg-blanc/[0.06] p-5 transition-colors hover:bg-blanc/[0.12]">
                  <span className="flex items-center gap-3">
                    <Icone nom={x.icone} size={26} className="text-jaune" />
                    <span className="cote text-[1.125rem] text-blanc">{x.titre}</span>
                  </span>
                  <Icone nom="fleche" size={18} weight="bold" className="shrink-0 text-jaune transition-transform group-hover/autre:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <AppelFinal />
    </>
  );
}

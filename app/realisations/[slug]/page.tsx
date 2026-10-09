import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projetParSlug, projets } from "@/content/realisations";
import { domaineParSlug } from "@/content/site";
import { EnTetePage } from "@/components/ui/EnTetePage";
import { CarteProjet } from "@/components/ui/CarteProjet";
import { Icone } from "@/components/ui/Icone";
import { Motif } from "@/components/ui/Motif";
import { Galerie } from "@/components/realisations/Galerie";
import { AppelFinal } from "@/components/accueil/AppelFinal";

export function generateStaticParams() {
  return projets.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/realisations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projetParSlug(slug);
  if (!p) return {};
  return { title: p.titre, description: p.resume, alternates: { canonical: `/realisations/${p.slug}` } };
}

/** Une réalisation, c'est d'abord sa galerie : les photos passent avant le texte. */
export default async function PageProjet({ params }: PageProps<"/realisations/[slug]">) {
  const { slug } = await params;
  const projet = projetParSlug(slug);
  if (!projet) notFound();
  const domaine = domaineParSlug(projet.domaine);
  const autres = projets
    .filter((p) => p.slug !== projet.slug && p.domaine === projet.domaine)
    .concat(projets.filter((p) => p.domaine !== projet.domaine))
    .slice(0, 3);

  return (
    <>
      <EnTetePage
        titre={projet.titre}
        intro={projet.resume}
        ariane={[{ titre: "Réalisations", href: "/realisations" }, { titre: projet.titre }]}
        photo={projet.photos[0]}
      >
        <a
          href="#galerie"
          className="inline-flex min-h-11 items-center gap-2 rounded-chantier bg-nuit/70 px-5 cote text-[1.0625rem] text-blanc transition-colors hover:bg-jaune hover:text-nuit"
        >
          <Icone nom="photos" size={20} />
          Voir les {projet.photos.length} photos
        </a>
      </EnTetePage>

      <section id="galerie" aria-label="Galerie du chantier" className="relative isolate overflow-hidden bg-sable py-14 lg:py-20">
        <Motif type="courbes" className="text-royal" opacite={0.08} />
        <div className="conteneur">
          <Galerie photos={projet.photos} titre={projet.titre} />
        </div>
      </section>

      <section aria-labelledby="titre-travaux" className="bg-blanc py-16 lg:py-24">
        <div className="conteneur grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="revele lg:col-span-5">
            <p className="flex flex-wrap items-center gap-3 cote text-[1rem] text-royal">
              {domaine?.titre}
              {projet.reference ? (
                <span className="rounded-chantier bg-jaune px-2.5 py-0.5 text-[0.875rem] uppercase tracking-[0.06em] text-nuit">Référence PET</span>
              ) : null}
            </p>
            <h2 id="titre-travaux" className="mt-4 titre text-titre-m text-nuit">
              Les travaux en images
            </h2>
            {domaine ? (
              <Link
                href={`/savoir-faire/${domaine.slug}`}
                className="mt-8 inline-flex items-center gap-2 cote text-[1.0625rem] uppercase tracking-[0.04em] text-nuit underline decoration-jaune decoration-[3px] underline-offset-[6px] hover:text-royal"
              >
                Notre savoir-faire : {domaine.titre}
                <Icone nom="fleche" size={18} weight="bold" />
              </Link>
            ) : null}
          </div>
          <ul className="revele-groupe flex flex-wrap content-start gap-3 lg:col-span-6 lg:col-start-7">
            {projet.travaux.map((t) => (
              <li key={t} className="flex items-center gap-3 rounded-chantier bg-sable px-4 py-3 cote text-[1.0625rem] text-nuit">
                <span aria-hidden className="size-2 rounded-[1px] bg-jaune" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="titre-autres-projets" className="bg-blanc pb-20 lg:pb-28">
        <div className="conteneur">
          <h2 id="titre-autres-projets" className="titre text-titre-l text-nuit">
            D&apos;autres réalisations
          </h2>
          <ul className="revele-groupe mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {autres.map((p) => (
              <li key={p.slug}>
                <CarteProjet projet={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AppelFinal />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { lireRealisation, lireRealisations } from "@/lib/contenu";
import { domaineParSlug, SITE_URL } from "@/content/site";
import type { PhotoId } from "@/content/photos";
import { photos } from "@/content/photos";
import { EnTetePage } from "@/components/ui/EnTetePage";
import { CarteProjet } from "@/components/ui/CarteProjet";
import { Icone } from "@/components/ui/Icone";
import { Motif } from "@/components/ui/Motif";
import { Galerie } from "@/components/realisations/Galerie";
import { AppelFinal } from "@/components/accueil/AppelFinal";

export async function generateStaticParams() {
  return (await lireRealisations()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/realisations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = await lireRealisation(slug);
  if (!p) return {};
  const photoUrl = p.photos[0]?.src ? (typeof p.photos[0].src === "string" ? p.photos[0].src : p.photos[0].src.src) : "/og-image.jpg";
  return {
    title: p.titre,
    description: p.resume,
    alternates: { canonical: `/realisations/${p.slug}` },
    openGraph: {
      title: `${p.titre} | PET SUARL`,
      description: p.resume,
      url: `/realisations/${p.slug}`,
      images: [{ url: photoUrl, alt: p.titre }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.titre} | PET SUARL`,
      description: p.resume,
      images: [photoUrl],
    },
  };
}

/** Une réalisation, c'est d'abord sa galerie : les photos passent avant le texte. */
export default async function PageProjet({ params }: PageProps<"/realisations/[slug]">) {
  const { slug } = await params;
  const projets = await lireRealisations();
  const projet = projets.find((p) => p.slug === slug);
  if (!projet) notFound();
  const domaine = domaineParSlug(projet.domaine);
  const autres = projets
    .filter((p) => p.slug !== projet.slug && p.domaine === projet.domaine)
    .concat(projets.filter((p) => p.domaine !== projet.domaine))
    .slice(0, 3);

  const schemaFilAriane = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Réalisations", item: `${SITE_URL}/realisations` },
      { "@type": "ListItem", position: 3, name: projet.titre, item: `${SITE_URL}/realisations/${projet.slug}` },
    ],
  };

  // La première photo (projet.photos[0]) est mise en majesté dans l'en-tête immersif du projet.
  // La galerie sous-jacente présente les autres clichés de terrain sans aucun doublon.
  const photoCouverture = projet.photos[0];
  const photosGalerie = projet.photos.length > 1 ? projet.photos.slice(1) : projet.photos;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFilAriane).replace(/</g, "\\u003c") }}
      />
      <EnTetePage
        titre={projet.titre}
        intro={projet.resume}
        ariane={[{ titre: "Réalisations", href: "/realisations" }, { titre: projet.titre }]}
        photo={photoCouverture}
      >
        <a
          href="#galerie"
          className="inline-flex min-h-11 items-center gap-2 rounded-chantier bg-blanc px-5 cote text-[1.0625rem] text-nuit transition-colors hover:bg-jaune"
        >
          <Icone nom="photos" size={20} />
          Voir la galerie ({photosGalerie.length} photos)
        </a>
      </EnTetePage>

      <section id="galerie" aria-label="Galerie du chantier" className="relative isolate overflow-hidden bg-sable py-14 lg:py-20">
        <Motif type="courbes" className="text-royal" opacite={0.08} />
        <div className="conteneur">
          <Galerie photos={photosGalerie} titre={projet.titre} />
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

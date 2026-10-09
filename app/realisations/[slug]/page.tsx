import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { A_RENSEIGNER, projetParSlug, projets } from "@/content/exemples";
import { domaineParSlug } from "@/content/site";
import { EnTetePage } from "@/components/ui/EnTetePage";
import { CarteProjet } from "@/components/ui/CarteProjet";
import { MentionExemple } from "@/components/ui/Exemple";
import { Icone } from "@/components/ui/Icone";
import { PhotoCadre } from "@/components/ui/PhotoCadre";
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

export default async function PageProjet({ params }: PageProps<"/realisations/[slug]">) {
  const { slug } = await params;
  const projet = projetParSlug(slug);
  if (!projet) notFound();
  const domaine = domaineParSlug(projet.domaine);
  const autres = projets.filter((p) => p.slug !== projet.slug && p.domaine === projet.domaine).concat(projets.filter((p) => p.domaine !== projet.domaine)).slice(0, 3);

  const fiche = [
    { libelle: "Client", valeur: projet.client },
    { libelle: "Lieu", valeur: projet.lieu },
    { libelle: "Domaine", valeur: domaine?.titre ?? "" },
    { libelle: "Année", valeur: projet.annee },
  ];

  return (
    <>
      <EnTetePage
        titre={projet.titre}
        intro={projet.resume}
        ariane={[{ titre: "Réalisations", href: "/realisations" }, { titre: projet.titre }]}
        photo={projet.photos[0]}
        aside={
          <dl className="verre-liquide grid grid-cols-2 gap-x-6 gap-y-5 rounded-[6px] p-6 lg:p-7">
            {fiche.map((f) => (
              <div key={f.libelle}>
                <dt className="cote text-[0.875rem] uppercase tracking-[0.1em] text-ciel">{f.libelle}</dt>
                <dd className={`mt-1 text-[1.0625rem] ${f.valeur === A_RENSEIGNER ? "italic text-brume" : "text-blanc"}`}>{f.valeur}</dd>
              </div>
            ))}
            {projet.exemple ? (
              <div className="col-span-2 flex items-start gap-2 text-[0.9375rem] leading-snug text-brume">
                <dt className="shrink-0">
                  <MentionExemple ton="sombre" />
                </dt>
                <dd>Fiche construite à partir d&apos;une photo de chantier, à compléter par PET.</dd>
              </div>
            ) : null}
          </dl>
        }
      />

      <section aria-labelledby="titre-travaux" className="bg-blanc py-20 lg:py-28">
        <div className="conteneur grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="revele lg:col-span-6">
            <div className="space-y-5 text-[1.125rem] leading-relaxed text-encre">
              {projet.description.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            {domaine ? (
              <Link
                href={`/savoir-faire/${domaine.slug}`}
                className="mt-8 inline-flex items-center gap-2 cote text-[1.0625rem] uppercase tracking-[0.04em] text-nuit underline decoration-jaune decoration-[3px] underline-offset-[6px] hover:text-royal"
              >
                Notre savoir-faire : {domaine.titre}
                <Icone nom="fleche" size={18} weight="bold" />
              </Link>
            ) : null}
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h2 id="titre-travaux" className="titre text-titre-m text-nuit">
              Travaux réalisés
            </h2>
            <ul className="revele-groupe mt-6 grid gap-3">
              {projet.travaux.map((t) => (
                <li key={t} className="flex items-start gap-4 rounded-[6px] bg-sable p-5">
                  <Icone nom="succes" size={24} weight="fill" className="mt-0.5 shrink-0 text-royal" />
                  <span className="cote text-[1.125rem] text-nuit">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-label="Galerie du chantier" className="bg-sable py-16 lg:py-24">
        <div className="conteneur grid gap-5 md:grid-cols-12">
          <PhotoCadre photo={projet.photos[0]} ratio="aspect-[4/3]" sizes="(min-width: 768px) 58vw, 100vw" voile="leger" equerres decalage={12} className="md:col-span-7" />
          {projet.photos[1] ? (
            <PhotoCadre photo={projet.photos[1]} ratio="aspect-[4/3] md:aspect-auto md:h-full" sizes="(min-width: 768px) 40vw, 100vw" voile="leger" className="md:col-span-5 md:h-full [&>div]:h-full" />
          ) : null}
        </div>
      </section>

      <section aria-labelledby="titre-autres-projets" className="bg-blanc py-20 lg:py-28">
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

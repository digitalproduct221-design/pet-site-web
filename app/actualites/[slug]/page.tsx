import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articleParSlug, articles } from "@/content/exemples";
import { EnTetePage } from "@/components/ui/EnTetePage";
import { MentionExemple } from "@/components/ui/Exemple";
import { Icone } from "@/components/ui/Icone";
import { PhotoCadre } from "@/components/ui/PhotoCadre";
import { AppelFinal } from "@/components/accueil/AppelFinal";
import { dateLongue } from "@/content/dates";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/actualites/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = articleParSlug(slug);
  if (!a) return {};
  return { title: a.titre, description: a.chapo, alternates: { canonical: `/actualites/${a.slug}` }, openGraph: { type: "article" } };
}

export default async function PageArticle({ params }: PageProps<"/actualites/[slug]">) {
  const { slug } = await params;
  const article = articleParSlug(slug);
  if (!article) notFound();
  const autres = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      <EnTetePage titre={article.titre} intro={article.chapo} ariane={[{ titre: "Actualités", href: "/actualites" }, { titre: article.titre }]} photo={article.photo}>
        <span className="flex flex-wrap items-center gap-3">
          <time dateTime={article.date} className="cote text-[1rem] text-brume">
            Publié le {dateLongue(article.date)}
          </time>
          <MentionExemple visible={article.exemple} ton="sombre" />
        </span>
      </EnTetePage>

      <article className="bg-blanc py-20 lg:py-28">
        <div className="conteneur grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="revele mx-auto max-w-[42rem] lg:col-span-7 lg:mx-0">
            {article.exemple ? (
              <p className="mb-8 rounded-[6px] bg-sable p-5 text-[1rem] text-encre">
                Cet article est un exemple de mise en page : il sera remplacé par une vraie actualité de PET.
              </p>
            ) : null}
            <div className="space-y-6 text-[1.1875rem] leading-[1.75] text-encre">
              {article.corps.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <Link
              href="/actualites"
              className="mt-12 inline-flex items-center gap-2 cote text-[1.0625rem] uppercase tracking-[0.04em] text-nuit underline decoration-jaune decoration-[3px] underline-offset-[6px] hover:text-royal"
            >
              <Icone nom="fleche" size={18} weight="bold" className="rotate-180" />
              Toutes les actualités
            </Link>
          </div>
          <aside aria-labelledby="titre-autres-articles" className="lg:col-span-4 lg:col-start-9">
            <h2 id="titre-autres-articles" className="titre text-titre-s text-nuit">
              À lire aussi
            </h2>
            <ul className="mt-6 grid gap-8">
              {autres.map((a) => (
                <li key={a.slug}>
                  <Link href={`/actualites/${a.slug}`} className="group/autre block">
                    <PhotoCadre photo={a.photo} ratio="aspect-[16/10]" sizes="(min-width: 1024px) 28vw, 100vw" voile="leger" />
                    <span className="mt-4 block titre text-[1.5rem] leading-[1] text-nuit group-hover/autre:text-royal">{a.titre}</span>
                    <time dateTime={a.date} className="mt-1.5 block cote text-[0.9375rem] text-encre-douce">
                      {dateLongue(a.date)}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </article>

      <AppelFinal />
    </>
  );
}

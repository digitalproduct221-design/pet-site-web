"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Projet } from "@/content/realisations";
import { domaines } from "@/content/site";
import { CarteProjet } from "@/components/ui/CarteProjet";
import { Icone } from "@/components/ui/Icone";

// Liste des filtres disponibles avec comptage dynamique
const optionsPour = (projets: Projet[]) => [
  { slug: "tous", titre: "Tous les chantiers" },
  ...domaines
    .filter((d) => projets.some((p) => p.domaine === d.slug))
    .map((d) => ({
      slug: d.slug,
      titre: d.titre,
    })),
];


/**
 * Une rangée toujours pleine : autant de colonnes que de chantiers (3 au plus), et des
 * photos plus larges quand il y en a moins, pour ne jamais laisser une colonne vide.
 */
function disposition(nombre: number) {
  if (nombre <= 1) return { grille: "grid-cols-1", ratio: "aspect-[16/9] lg:aspect-[21/9]", sizes: "(min-width: 1024px) 90vw, 100vw" };
  if (nombre === 2) return { grille: "sm:grid-cols-2", ratio: "aspect-[4/3] lg:aspect-[16/10]", sizes: "(min-width: 1024px) 46vw, (min-width: 640px) 50vw, 100vw" };
  return { grille: "sm:grid-cols-2 lg:grid-cols-3", ratio: undefined, sizes: undefined };
}

/**
 * Grille des réalisations de chantiers PET par discipline.
 * Présentation claire et sans redondance :
 * - Cartouche de présentation du domaine avec ses indicateurs réels
 * - Fiches chantiers structurées sans carte synthétique ni photos dupliquées
 * - Grille parfaitement équilibrée : la rangée est toujours pleine (voir `disposition`)
 */
export function Grille({ filtre, projets }: { filtre: string; projets: Projet[] }) {
  const options = optionsPour(projets);
  const domaineActif = domaines.find((d) => d.slug === filtre);
  const visibles = filtre === "tous" ? projets : projets.filter((p) => p.domaine === filtre);

  return (
    <div className="space-y-12 lg:space-y-16">
      {/* Barre de navigation / filtres */}
      <div>
        <nav aria-label="Filtrer par domaine">
          <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {options.map((o) => {
              const choisi = o.slug === filtre;
              const nombre = o.slug === "tous" ? projets.length : projets.filter((p) => p.domaine === o.slug).length;
              return (
                <li key={o.slug}>
                  <Link
                    href={o.slug === "tous" ? "/realisations" : `/realisations?domaine=${o.slug}`}
                    scroll={false}
                    replace
                    aria-current={choisi ? "page" : undefined}
                    className={`inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-chantier px-5 cote text-[1rem] transition-colors ${
                      choisi ? "bg-nuit text-blanc" : "bg-blanc text-nuit ombre-carte hover:text-royal"
                    }`}
                  >
                    {o.titre}
                    <span className={`chiffres-tabulaires text-[0.875rem] ${choisi ? "text-jaune" : "text-encre-douce"}`}>{nombre}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* CAS 1 : VUE FILTRÉE SUR UN DOMAINE PARTICULIER */}
      {domaineActif ? (
        <div className="space-y-12 lg:space-y-16">
          {/* Cartouche d'introduction explicatif du domaine */}
          <div className="rounded-panneau bg-blanc p-6 sm:p-8 lg:p-10 shadow-sm border border-nuit/5">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-[48rem]">
                <div className="flex items-center gap-3 text-royal">
                  <Icone nom={domaineActif.icone} size={28} />
                  <span className="cote text-[0.9375rem] uppercase tracking-[0.08em]">{domaineActif.titre}</span>
                </div>
                <h2 className="mt-3 titre text-titre-m text-nuit">{domaineActif.accroche}</h2>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-encre-douce">
                  {domaineActif.presentation[0]}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 lg:flex-col lg:items-end">
                <div className="flex items-center gap-3 rounded-chantier bg-sable px-4 py-2 text-nuit">
                  <span className="cote text-[1.125rem] text-royal">{visibles.length}</span>
                  <span className="text-[0.9375rem] text-encre-douce">chantiers majeurs</span>
                </div>
                <Link
                  href={`/savoir-faire/${domaineActif.slug}`}
                  className="inline-flex items-center gap-2 cote text-[1rem] uppercase tracking-[0.04em] text-royal underline decoration-jaune decoration-[3px] underline-offset-[6px] hover:text-nuit"
                >
                  Fiche savoir-faire
                  <Icone nom="fleche" size={16} weight="bold" />
                </Link>
              </div>
            </div>
          </div>

          {/* Section : Chantiers de référence du domaine */}
          <div>
            <div className="mb-6 flex flex-col gap-2">
              <span className="cote text-[0.875rem] uppercase tracking-[0.08em] text-royal">Opérations emblématiques</span>
              <h3 className="titre text-titre-m text-nuit">Chantiers majeurs en {domaineActif.titre}</h3>
            </div>
            <ul className={`grid gap-x-6 gap-y-12 ${disposition(visibles.length).grille}`}>
              {visibles.map((p, i) => (
                <li
                  key={p.slug}
                  className="animate-[apparition_600ms_var(--ease-chantier)_both]"
                  style={{ animationDelay: `${Math.min(i, 6) * 60}ms` }}
                >
                  <CarteProjet projet={p} ratio={disposition(visibles.length).ratio} sizes={disposition(visibles.length).sizes} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        /* CAS 2 : VUE D'ENSEMBLE (« TOUS LES CHANTIERS ») ORGANISÉE PAR DOMAINE */
        <div className="space-y-16 lg:space-y-24">
          <div className="flex flex-col gap-2">
            <p className="text-[1.125rem] text-encre-douce max-w-[46rem]">
              Tous nos chantiers de référence classés par grand domaine technique. Cliquez sur un projet pour découvrir le détail des travaux et sa galerie photos, ou sélectionnez un filtre pour explorer une discipline en détail.
            </p>
          </div>

          {/* Présentation par sections disciplinaires distinctes */}
          {domaines
            .filter((d) => projets.some((p) => p.domaine === d.slug))
            .map((dom) => {
              const chantiersDomaine = projets.filter((p) => p.domaine === dom.slug);
              return (
                <section key={dom.slug} aria-labelledby={`titre-section-${dom.slug}`} className="space-y-8">
                  {/* En-tête de section de domaine */}
                  <div className="flex flex-col gap-4 border-b border-nuit/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 text-royal">
                        <Icone nom={dom.icone} size={24} />
                        <span className="cote text-[0.875rem] uppercase tracking-[0.08em]">{dom.titre}</span>
                      </div>
                      <h2 id={`titre-section-${dom.slug}`} className="mt-2 titre text-titre-m text-nuit">
                        {dom.accroche}
                      </h2>
                    </div>
                    <Link
                      href={`/realisations?domaine=${dom.slug}`}
                      className="inline-flex shrink-0 items-center gap-2 cote text-[1rem] uppercase tracking-[0.04em] text-royal hover:text-nuit"
                    >
                      Voir les {chantiersDomaine.length} chantiers de ce domaine
                      <Icone nom="fleche" size={16} weight="bold" />
                    </Link>
                  </div>

                  {/* Grille des chantiers du domaine */}
                  <ul className={`grid gap-x-6 gap-y-12 ${disposition(chantiersDomaine.length).grille}`}>
                    {chantiersDomaine.map((p) => (
                      <li key={p.slug}>
                        <CarteProjet projet={p} ratio={disposition(chantiersDomaine.length).ratio} sizes={disposition(chantiersDomaine.length).sizes} />
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
        </div>
      )}
    </div>
  );
}

/** Lit le filtre dans l'URL (rendu côté client, voir <Suspense> dans la page). */
export function GrilleFiltree({ projets }: { projets: Projet[] }) {
  const demande = useSearchParams().get("domaine") ?? "tous";
  const filtre = domaines.some((d) => d.slug === demande) ? demande : "tous";
  return <Grille filtre={filtre} projets={projets} />;
}

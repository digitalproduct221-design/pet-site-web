"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { projets } from "@/content/exemples";
import { domaines } from "@/content/site";
import { CarteProjet } from "@/components/ui/CarteProjet";
import { Icone } from "@/components/ui/Icone";

const options = [{ slug: "tous", titre: "Tous les projets" }, ...domaines.map((d) => ({ slug: d.slug, titre: d.titre }))];

/**
 * Grille des réalisations filtrée par domaine. Les filtres sont de vrais liens
 * (?domaine=…) : ils fonctionnent sans JavaScript et se partagent.
 */
export function Grille({ filtre }: { filtre: string }) {
  const visibles = filtre === "tous" ? projets : projets.filter((p) => p.domaine === filtre);
  const domaineActif = domaines.find((d) => d.slug === filtre);

  return (
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
                  className={`inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-5 cote text-[1rem] transition-colors ${
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

      <p aria-live="polite" className="mt-6 text-[1rem] text-encre-douce">
        {visibles.length} réalisation{visibles.length > 1 ? "s" : ""}
        {domaineActif ? ` en ${domaineActif.titre}` : ""}. Les fiches marquées « Exemple » sont à compléter par PET.
      </p>

      {visibles.length === 0 ? (
        <div className="mt-10 rounded-[6px] bg-blanc p-8">
          <p className="titre text-titre-s text-nuit">Aucune réalisation publiée dans ce domaine pour l&apos;instant</p>
          <p className="mt-3 max-w-[36rem] text-encre-douce">
            Nos chantiers sont présentés au fur et à mesure. En attendant, découvrez ce que nous faisons dans ce domaine.
          </p>
          <Link href={`/savoir-faire/${filtre}`} className="mt-5 inline-flex items-center gap-2 cote text-[1.0625rem] text-royal underline underline-offset-4">
            Voir le savoir-faire
            <Icone nom="fleche" size={18} weight="bold" />
          </Link>
        </div>
      ) : (
        <ul key={filtre} className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {visibles.map((p, i) => (
            <li key={p.slug} className="animate-[apparition_600ms_var(--ease-chantier)_both]" style={{ animationDelay: `${Math.min(i, 6) * 60}ms` }}>
              <CarteProjet projet={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Lit le filtre dans l'URL (rendu côté client, voir <Suspense> dans la page). */
export function GrilleFiltree() {
  const demande = useSearchParams().get("domaine") ?? "tous";
  const filtre = domaines.some((d) => d.slug === demande) ? demande : "tous";
  return <Grille filtre={filtre} />;
}

import Link from "next/link";
import { lireActualites } from "@/lib/contenu";
import { Icone } from "@/components/ui/Icone";
import { TitreSection } from "@/components/ui/TitreSection";
import { CarteActualite } from "@/components/actualites/CarteActualite";

/** « Sur nos chantiers » : les trois dernières nouvelles. Masquée tant qu'aucune n'est publiée. */
export async function ActualitesAccueil() {
  const actualites = (await lireActualites()).slice(0, 3);
  if (actualites.length === 0) return null;
  return (
    <section aria-labelledby="titre-actualites" className="bg-blanc py-20 lg:py-28">
      <div className="conteneur">
        <div className="revele flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <TitreSection id="titre-actualites" titre="Sur nos chantiers" intro="Les dernières nouvelles de nos équipes." />
          <Link
            href="/actualites"
            className="inline-flex shrink-0 items-center gap-2 cote text-[1.0625rem] uppercase tracking-[0.04em] text-nuit underline decoration-jaune decoration-[3px] underline-offset-[6px] hover:text-royal"
          >
            Toutes les actualités
            <Icone nom="fleche" size={18} weight="bold" />
          </Link>
        </div>
        <ul className="revele-groupe mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {actualites.map((a) => (
            <li key={a.id}>
              <CarteActualite actualite={a} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

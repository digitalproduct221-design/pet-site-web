import type { Metadata } from "next";
import { lireActualites } from "@/lib/contenu";
import { EnTetePage } from "@/components/ui/EnTetePage";
import { BoutonLien } from "@/components/ui/Bouton";
import { CarteActualite } from "@/components/actualites/CarteActualite";
import { AppelFinal } from "@/components/accueil/AppelFinal";

export const metadata: Metadata = {
  title: "Actualités",
  description: "La vie des chantiers de PET à Dakar : travaux en cours, équipes, ouvrages livrés.",
  alternates: { canonical: "/actualites" },
};

/** Les nouvelles du quotidien, publiées depuis l'espace admin. */
export default async function PageActualites() {
  const actualites = await lireActualites();
  const [une, ...autres] = actualites;
  return (
    <>
      <EnTetePage
        titre="Actualités"
        intro="La vie de nos chantiers : travaux en cours, équipes au travail, ouvrages livrés."
        ariane={[{ titre: "Actualités" }]}
        photo="poseConduiteTopographie"
      />
      <section aria-label="Nouvelles" className="bg-sable py-16 lg:py-24">
        <div className="conteneur">
          {une ? (
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <CarteActualite actualite={une} grande />
              </div>
              <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
                {autres.slice(0, 2).map((a) => (
                  <li key={a.id}>
                    <CarteActualite actualite={a} />
                  </li>
                ))}
              </ul>
              {autres.length > 2 ? (
                <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-3">
                  {autres.slice(2).map((a) => (
                    <li key={a.id}>
                      <CarteActualite actualite={a} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : (
            <div className="max-w-[40rem] rounded-panneau bg-blanc p-8 ombre-carte">
              <p className="titre text-titre-s text-nuit">Les premières nouvelles arrivent bientôt</p>
              <p className="mt-3 text-encre-douce">
                Nous publierons ici la vie de nos chantiers. En attendant, parcourez nos réalisations en images.
              </p>
              <div className="mt-6">
                <BoutonLien href="/realisations" variante="contour">
                  Nos réalisations
                </BoutonLien>
              </div>
            </div>
          )}
        </div>
      </section>
      <AppelFinal />
    </>
  );
}

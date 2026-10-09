import type { Metadata } from "next";
import { Suspense } from "react";
import { EnTetePage } from "@/components/ui/EnTetePage";
import { Grille, GrilleFiltree } from "@/components/realisations/GrilleFiltree";
import { AppelFinal } from "@/components/accueil/AppelFinal";

export const metadata: Metadata = {
  title: "Réalisations",
  description: "Les chantiers de PET à Dakar et au Sénégal : bâtiment, hydraulique, assainissement, routes et VRD, génie civil.",
  alternates: { canonical: "/realisations" },
};

export default function PageRealisations() {
  return (
    <>
      <EnTetePage
        titre="Réalisations"
        intro="Nos chantiers en images, classés par domaine. Ouvrez une réalisation pour parcourir sa galerie en plein écran."
        ariane={[{ titre: "Réalisations" }]}
        photo="trancheeLotissement"
      />
      <section aria-label="Liste des réalisations" className="bg-sable py-16 lg:py-24">
        <div className="conteneur">
          <Suspense fallback={<Grille filtre="tous" />}>
            <GrilleFiltree />
          </Suspense>
        </div>
      </section>
      <AppelFinal />
    </>
  );
}

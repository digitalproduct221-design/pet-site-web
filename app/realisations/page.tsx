import type { Metadata } from "next";
import { Suspense } from "react";
import { EnTetePage } from "@/components/ui/EnTetePage";
import { Grille, GrilleFiltree } from "@/components/realisations/GrilleFiltree";
import { AppelFinal } from "@/components/accueil/AppelFinal";
import { lireRealisations } from "@/lib/contenu";

export const metadata: Metadata = {
  title: "Réalisations",
  description: "Les chantiers de PET à Dakar et au Sénégal : bâtiment, hydraulique, assainissement, routes et VRD, génie civil.",
  alternates: { canonical: "/realisations" },
  openGraph: {
    title: "Réalisations de chantiers | PET SUARL Dakar",
    description: "Les chantiers de PET à Dakar et au Sénégal : bâtiment, hydraulique, assainissement, routes et VRD, génie civil.",
    url: "/realisations",
    images: [{ url: "/images/chantiers/tranchee-lotissement.jpg", width: 1376, height: 768, alt: "Réalisations de chantiers PET SUARL Dakar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Réalisations de chantiers | PET SUARL Dakar",
    description: "Les chantiers et ouvrages de PET à Dakar et au Sénégal.",
    images: ["/images/chantiers/tranchee-lotissement.jpg"],
  },
};

export default async function PageRealisations() {
  const projets = await lireRealisations();
  return (
    <>
      <EnTetePage
        titre="Réalisations"
        intro="Nos chantiers en images, classés par domaine. Ouvrez une réalisation pour parcourir sa galerie en plein écran."
        ariane={[{ titre: "Réalisations" }]}
        photo="vrdAsphalteBoulevard"
      />
      <section aria-label="Liste des réalisations" className="bg-sable py-16 lg:py-24">
        <div className="conteneur">
          <Suspense fallback={<Grille filtre="tous" projets={projets} />}>
            <GrilleFiltree projets={projets} />
          </Suspense>
        </div>
      </section>
      <AppelFinal />
    </>
  );
}

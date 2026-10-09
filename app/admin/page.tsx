import type { Metadata } from "next";
import { EspaceAdmin } from "@/components/admin/EspaceAdmin";

export const metadata: Metadata = {
  title: "Espace admin",
  robots: { index: false, follow: false },
};

/** Espace admin : ajouter ou retirer des photos de réalisations, des nouvelles, des partenaires, des témoignages. */
export default function PageAdmin() {
  return (
    <section className="min-h-[70svh] bg-sable py-12 lg:py-16">
      <div className="conteneur max-w-[60rem]">
        <h1 className="titre text-titre-l text-nuit">Espace admin</h1>
        <p className="mt-3 max-w-[40rem] text-encre-douce">
          Ajoutez ou retirez les photos de vos réalisations, publiez les nouvelles de vos chantiers, vos partenaires et les
          témoignages de vos clients. Le site se met à jour tout seul.
        </p>
        <div className="mt-10">
          <EspaceAdmin />
        </div>
      </div>
    </section>
  );
}

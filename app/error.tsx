"use client";

import { useEffect } from "react";
import { Bouton } from "@/components/ui/Bouton";
import { Equerres } from "@/components/ui/Equerres";
import { Motif } from "@/components/ui/Motif";

export default function ErrorGlobal({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Enregistrement de l'erreur côté client si besoin
    console.error("Erreur d'application :", error);
  }, [error]);

  return (
    <section className="relative isolate flex min-h-[70svh] items-center overflow-hidden bg-sable py-20 text-nuit lg:py-28">
      <Motif type="courbes" className="text-royal" opacite={0.12} />
      <div className="conteneur max-w-2xl text-center">
        <Equerres seule decalage={16} className="inline-block pl-1 pt-1">
          <h1 className="titre text-titre-l text-nuit">Une anomalie est survenue</h1>
        </Equerres>
        <p className="mt-6 text-lg leading-relaxed text-encre-douce">
          Le chargement de cette page a rencontré une difficulté technique temporaire. Vous pouvez
          réessayer ou revenir à la page d&apos;accueil de PET.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Bouton type="button" onClick={() => reset()}>
            Réessayer
          </Bouton>
          <Bouton type="button" variante="contour" onClick={() => (window.location.href = "/")}>
            Retour à l&apos;accueil
          </Bouton>
        </div>
      </div>
    </section>
  );
}

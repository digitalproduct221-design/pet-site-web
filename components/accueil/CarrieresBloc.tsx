"use client";

import Link from "next/link";
import { useState } from "react";
import { offres, type TypeContrat } from "@/content/exemples";
import { Icone } from "@/components/ui/Icone";
import { MentionExemple } from "@/components/ui/Exemple";

const filtres: ("Toutes" | TypeContrat)[] = ["Toutes", "CDI", "CDD", "Stage"];

/** Offres d'emploi filtrables par type de contrat. */
export function ListeOffres({ ton = "sombre" }: { ton?: "clair" | "sombre" }) {
  const [filtre, setFiltre] = useState<(typeof filtres)[number]>("Toutes");
  const visibles = filtre === "Toutes" ? offres : offres.filter((o) => o.contrat === filtre);
  const sombre = ton === "sombre";

  return (
    <div>
      <div role="group" aria-label="Filtrer par type de contrat" className="flex flex-wrap gap-2">
        {filtres.map((f) => {
          const actif = f === filtre;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={actif}
              onClick={() => setFiltre(f)}
              className={`min-h-11 rounded-full px-5 cote text-[1rem] transition-colors ${
                actif ? "bg-jaune text-nuit" : sombre ? "bg-blanc/10 text-blanc hover:bg-blanc/20" : "bg-sable text-nuit hover:bg-sable-soutenu"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {visibles.length} offre{visibles.length > 1 ? "s" : ""} affichée{visibles.length > 1 ? "s" : ""}
      </p>

      {visibles.length === 0 ? (
        <div className={`mt-8 rounded-[6px] p-6 ${sombre ? "verre-liquide" : "bg-sable"}`}>
          <p className={sombre ? "text-blanc" : "text-nuit"}>Aucune offre de ce type pour le moment.</p>
          <Link href="/carrieres#candidature" className={`mt-2 inline-flex items-center gap-2 cote text-[1.0625rem] ${sombre ? "text-jaune" : "text-royal"}`}>
            Envoyer une candidature spontanée
            <Icone nom="fleche" size={18} weight="bold" />
          </Link>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4">
          {visibles.map((o) => (
            <li
              key={o.id}
              className={`group/offre relative grid gap-4 rounded-[6px] p-6 transition-colors sm:grid-cols-[1fr_auto] sm:items-center lg:p-7 ${
                sombre ? "verre-liquide" : "bg-blanc ombre-carte hover:ombre-carte-survol"
              }`}
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-chantier bg-jaune px-2 py-0.5 cote text-[0.875rem] uppercase tracking-[0.06em] text-nuit">{o.contrat}</span>
                  <span className={`cote text-[0.9375rem] ${sombre ? "text-brume" : "text-texte-doux"}`}>
                    {o.lieu}, {o.domaine}
                  </span>
                  <MentionExemple visible={o.exemple} ton={ton} />
                </div>
                <h3 className={`mt-3 titre text-[1.75rem] leading-[0.95] ${sombre ? "text-blanc" : "text-nuit"}`}>{o.poste}</h3>
                <p className={`mt-2 max-w-[36rem] ${sombre ? "text-brume" : "text-texte-doux"}`}>{o.resume}</p>
              </div>
              <Link
                href={`/carrieres?poste=${o.id}#candidature`}
                className={`inline-flex items-center gap-2 cote text-[1.0625rem] after:absolute after:inset-0 after:content-[''] ${sombre ? "text-jaune" : "text-royal"}`}
              >
                Postuler<span className="sr-only"> : {o.poste}</span>
                <Icone nom="fleche" size={18} weight="bold" className="transition-transform group-hover/offre:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

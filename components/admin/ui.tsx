"use client";

import type { ReactNode } from "react";

/** Petits éléments d'interface de l'espace admin : simples, lisibles, accessibles. */

export const champ =
  "mt-1.5 block w-full rounded-chantier bg-blanc-pur px-3.5 py-3 text-[1rem] text-encre shadow-[inset_0_0_0_1.5px_var(--color-contour)] focus:outline-none focus:anneau-champ";

export const boutonPrincipal =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-chantier bg-jaune px-5 cote text-[1rem] text-nuit transition-colors hover:bg-jaune-profond disabled:cursor-wait disabled:opacity-60";

export const boutonSecondaire =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-chantier px-4 cote text-[1rem] text-nuit shadow-[inset_0_0_0_2px_var(--color-nuit)] transition-colors hover:bg-nuit hover:text-blanc";

export const boutonDanger =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-chantier px-4 cote text-[1rem] text-erreur shadow-[inset_0_0_0_2px_var(--color-erreur)] transition-colors hover:bg-erreur hover:text-blanc";

export function Champ({ libelle, aide, children }: { libelle: string; aide?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="cote text-[1rem] text-nuit">{libelle}</span>
      {children}
      {aide ? <span className="mt-1 block text-[0.875rem] text-encre-douce">{aide}</span> : null}
    </label>
  );
}

export function CaseAcocher({ libelle, checked, onChange }: { libelle: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="inline-flex min-h-11 cursor-pointer items-center gap-3 cote text-[1rem] text-nuit">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="size-5 accent-[var(--color-royal)]" />
      {libelle}
    </label>
  );
}

export function Message({ type, children }: { type: "succes" | "erreur" | "info"; children: ReactNode }) {
  const couleurs = { succes: "bg-succes/10 text-succes", erreur: "bg-erreur/10 text-erreur", info: "bg-royal/10 text-royal" };
  return (
    <p role={type === "erreur" ? "alert" : "status"} className={`rounded-chantier px-4 py-3 text-[0.9375rem] ${couleurs[type]}`}>
      {children}
    </p>
  );
}

export function Pastille({ publie }: { publie: boolean }) {
  return (
    <span className={`rounded-chantier px-2 py-0.5 cote text-[0.8125rem] uppercase tracking-[0.06em] ${publie ? "bg-succes/12 text-succes" : "bg-sable-soutenu text-encre-douce"}`}>
      {publie ? "En ligne" : "Masqué"}
    </span>
  );
}

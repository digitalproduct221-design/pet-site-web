import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icone, type NomIcone } from "./Icone";

type Variante = "primaire" | "contour" | "contour-clair" | "sombre" | "texte";

const base =
  "group/bouton relative inline-flex min-h-[var(--bouton-h)] items-center justify-center gap-3 whitespace-nowrap rounded-chantier px-6 cote text-[1.0625rem] uppercase tracking-[0.04em] transition-[background-color,color,box-shadow,translate] duration-300 ease-chantier active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50";

const variantes: Record<Variante, string> = {
  // Jaune : l'action principale, partout la même (« Demander un devis »)
  primaire:
    "bg-[var(--bouton-primaire-bg)] text-[var(--bouton-primaire-texte)] ombre-bouton hover:bg-[var(--bouton-primaire-bg-survol)]",
  contour:
    "text-royal shadow-[inset_0_0_0_2px_var(--color-royal)] hover:bg-royal hover:text-blanc",
  "contour-clair":
    "text-blanc contour-clair hover:bg-blanc hover:text-nuit hover:shadow-[inset_0_0_0_2px_var(--color-blanc)]",
  sombre: "bg-nuit text-blanc hover:bg-royal",
  texte: "min-h-0 px-0 text-royal underline-offset-[0.3em] hover:underline",
};

/**
 * L'équerre du bouton : un angle jaune ou nuit qui se dessine au survol,
 * en rappel des équerres du logo.
 */
function Angle({ variante }: { variante: Variante }) {
  if (variante === "texte") return null;
  const couleur = variante === "primaire" ? "border-nuit" : variante === "sombre" ? "border-jaune" : "border-jaune";
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute -left-1.5 -top-1.5 size-3.5 border-l-[3px] border-t-[3px] ${couleur} opacity-0 transition-[opacity,translate] duration-300 ease-chantier translate-x-1 translate-y-1 group-hover/bouton:translate-x-0 group-hover/bouton:translate-y-0 group-hover/bouton:opacity-100 group-focus-visible/bouton:opacity-100`}
    />
  );
}

type Commun = { variante?: Variante; icone?: NomIcone; children: ReactNode; className?: string };

export function BoutonLien({
  variante = "primaire",
  icone = "fleche",
  children,
  className = "",
  ...props
}: Commun & Omit<ComponentProps<typeof Link>, "children" | "className">) {
  return (
    <Link className={`${base} ${variantes[variante]} ${className}`} {...props}>
      <Angle variante={variante} />
      <span>{children}</span>
      {icone ? (
        <Icone nom={icone} size={20} weight="bold" className="transition-transform duration-300 ease-chantier group-hover/bouton:translate-x-1" />
      ) : null}
    </Link>
  );
}

/** Lien externe ou protocole (tel:, mailto:, WhatsApp). */
export function BoutonExterne({
  variante = "primaire",
  icone,
  children,
  className = "",
  ...props
}: Commun & Omit<ComponentProps<"a">, "children" | "className">) {
  return (
    <a className={`${base} ${variantes[variante]} ${className}`} {...props}>
      <Angle variante={variante} />
      {icone ? <Icone nom={icone} size={20} weight="bold" /> : null}
      <span>{children}</span>
    </a>
  );
}

export function Bouton({
  variante = "primaire",
  icone,
  children,
  className = "",
  ...props
}: Commun & Omit<ComponentProps<"button">, "children" | "className">) {
  return (
    <button className={`${base} ${variantes[variante]} ${className}`} {...props}>
      <Angle variante={variante} />
      <span>{children}</span>
      {icone ? <Icone nom={icone} size={20} weight="bold" /> : null}
    </button>
  );
}

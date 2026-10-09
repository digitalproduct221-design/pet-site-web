/** Motif BTP au trait, posé en fond d'une section `relative isolate` (couleur : `className` text-*). */
export type TypeMotif = "courbes" | "ferraillage" | "beton" | "plan";

export function Motif({ type, className = "", opacite }: { type: TypeMotif; className?: string; opacite?: number }) {
  return (
    <span
      aria-hidden
      className={`motif motif-${type} ${className}`}
      style={opacite === undefined ? undefined : { ["--motif-opacite" as string]: opacite }}
    />
  );
}

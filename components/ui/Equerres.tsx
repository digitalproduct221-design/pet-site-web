import type { ComponentPropsWithoutRef, ElementType } from "react";

type Props<T extends ElementType> = {
  as?: T;
  /** Seulement l'équerre haute (titres). */
  seule?: boolean;
  /** Décalage des équerres hors du cadre, en px. */
  decalage?: number;
} & ComponentPropsWithoutRef<T>;

/**
 * Signature PET : deux équerres (jaune en haut à gauche, bleu ciel en bas à droite)
 * qui se referment autour de leur cadre quand il entre dans l'écran.
 * Composant serveur : c'est le Reveleur (components/ui/Reveleur.tsx) qui pose
 * `data-vu` à l'entrée dans l'écran. Sans JavaScript ou avec mouvement réduit,
 * les équerres restent simplement en place.
 */
export function Equerres<T extends ElementType = "div">({ as, seule = false, decalage = 0, className = "", style, ...props }: Props<T>) {
  const Balise = (as ?? "div") as ElementType;
  return (
    <Balise
      className={`equerres ${seule ? "equerre-seule" : ""} ${className}`}
      style={{ ...style, ["--equerre-decalage" as string]: `${decalage}px` }}
      {...props}
    />
  );
}

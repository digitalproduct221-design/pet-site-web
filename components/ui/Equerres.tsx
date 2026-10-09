"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type ElementType } from "react";

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
 * Sans JavaScript ou avec mouvement réduit, elles restent simplement en place.
 */
export function Equerres<T extends ElementType = "div">({
  as,
  seule = false,
  decalage = 0,
  className = "",
  style,
  ...props
}: Props<T>) {
  const Balise = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [vu, setVu] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          setVu(true);
          observateur.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.2 },
    );
    observateur.observe(el);
    return () => observateur.disconnect();
  }, []);

  return (
    <Balise
      ref={ref}
      data-vu={vu}
      className={`equerres ${seule ? "equerre-seule" : ""} ${className}`}
      style={{ ...style, ["--equerre-decalage" as string]: `${decalage}px` }}
      {...props}
    />
  );
}

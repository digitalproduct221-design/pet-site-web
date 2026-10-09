import Image from "next/image";
import { photos, type PhotoId } from "@/content/photos";
import { Equerres } from "./Equerres";

type Voile = "aucun" | "leger" | "fort";

const voiles: Record<Voile, string> = {
  aucun: "",
  leger: "bg-[var(--voile-photo)]",
  fort: "bg-[linear-gradient(180deg,rgb(11_27_63/0.35)_0%,rgb(11_27_63/0.8)_100%)]",
};

type Props = {
  photo: PhotoId;
  /** Classe de proportion, ex. « aspect-[4/3] ». Ignorée si `remplir`. */
  ratio?: string;
  /** L'image remplit son parent (qui doit être positionné). */
  remplir?: boolean;
  sizes: string;
  priority?: boolean;
  voile?: Voile;
  equerres?: boolean;
  decalage?: number;
  className?: string;
  imageClassName?: string;
  /** Légende affichée sous la photo (jamais posée dessus). */
  legende?: string;
  /** Remplace le texte alternatif du registre (rare). */
  alt?: string;
  /** Rideau d'apparition au défilement (désactivé pour les images du premier écran). */
  rideau?: boolean;
};

/**
 * Composant image unique du site : toutes les photos passent par ici.
 * Les photos sont de basse résolution (extraites d'une bâche) : elles sont
 * toujours cadrées et, par défaut, voilées de bleu nuit. Les équerres du logo
 * ne s'ajoutent que sur les photos phares (`equerres`).
 */
export function PhotoCadre({
  photo,
  ratio = "aspect-[4/3]",
  remplir = false,
  sizes,
  priority = false,
  voile = "leger",
  equerres = false,
  decalage = 10,
  className = "",
  imageClassName = "",
  legende,
  alt,
  rideau = !priority,
}: Props) {
  const p = photos[photo];
  const cadre = (
    <div className={`relative overflow-hidden rounded-chantier bg-nuit ${rideau ? "revele-image" : ""} ${remplir ? "absolute inset-0" : ratio}`}>
      <Image
        src={p.src}
        alt={alt ?? p.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        className={`object-cover ${imageClassName}`}
        style={{ objectPosition: p.focale ?? "50% 50%" }}
      />
      {voile !== "aucun" ? <div aria-hidden className={`absolute inset-0 ${voiles[voile]}`} /> : null}
    </div>
  );

  const corps = equerres ? (
    <Equerres decalage={decalage} className={remplir ? "absolute inset-0" : ""}>
      {cadre}
    </Equerres>
  ) : (
    cadre
  );

  if (!legende) return <div className={`relative ${className}`}>{corps}</div>;

  return (
    <figure className={`relative ${className}`}>
      {corps}
      <figcaption className="mt-4 cote text-cote text-texte-doux">{legende}</figcaption>
    </figure>
  );
}

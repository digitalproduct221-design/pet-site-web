import Image from "next/image";
import Link from "next/link";
import embleme from "@/public/brand/embleme-pet.png";
import embleminverse from "@/public/brand/embleme-pet-inverse.png";

/**
 * Logo du header : l'emblème (PET, poignée de main, équerres) détouré depuis le
 * logo fourni, suivi du nom de l'entreprise en texte réel.
 * À remplacer par le logo vectoriel dès qu'il est disponible.
 */
export function Logo({ ton = "clair", compact = false, nom = true }: { ton?: "clair" | "sombre"; compact?: boolean; nom?: boolean }) {
  return (
    <Link
      href="/"
      className="group/logo flex items-center gap-3 rounded-chantier"
      aria-label="PET, Partenaire Entreprise Travaux, retour à l'accueil"
    >
      <Image
        src={ton === "sombre" ? embleminverse : embleme}
        alt=""
        priority
        className={`w-auto transition-[height] duration-500 ease-chantier ${compact ? "h-11" : "h-12 nav:h-14"}`}
        sizes="96px"
      />
      {nom ? (
        <span
          aria-hidden
          className={`hidden titre text-[1.0625rem] leading-[0.95] tracking-[0.01em] min-[90rem]:block ${ton === "sombre" ? "text-blanc" : "text-nuit"}`}
        >
          Partenaire
          <br />
          Entreprise Travaux
        </span>
      ) : null}
    </Link>
  );
}

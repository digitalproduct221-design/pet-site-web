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
      translate="no"
      aria-label="PET, Partenaire Entreprise Travaux, retour à l'accueil"
    >
      <Image
        src={ton === "sombre" ? embleminverse : embleme}
        alt=""
        loading="eager"
        className={`w-auto transition-[height] duration-500 ease-chantier ${compact ? "h-11" : "h-12 nav:h-14"}`}
        sizes="96px"
      />
      {nom ? (
        <>
          <span
            aria-hidden
            className={`h-6 sm:h-7.5 w-px transition-colors ${
              ton === "sombre" ? "bg-blanc/20" : "bg-nuit/15 group-hover/logo:bg-royal/30"
            }`}
          />
          <span
            aria-hidden
            className="flex flex-col justify-center leading-[0.88] select-none"
          >
          <span
            className={`font-display font-extrabold text-[0.65rem] sm:text-[0.72rem] nav:text-[0.78rem] tracking-[0.14em] uppercase transition-colors ${
              ton === "sombre" ? "text-blanc" : "text-nuit group-hover/logo:text-royal"
            }`}
          >
            Partenaire
          </span>
          <span
            className={`font-display font-extrabold text-[0.65rem] sm:text-[0.72rem] nav:text-[0.78rem] tracking-[0.14em] uppercase transition-colors ${
              ton === "sombre" ? "text-brume" : "text-royal"
            }`}
          >
            Entreprise
          </span>
          <span
            className={`font-display font-extrabold text-[0.65rem] sm:text-[0.72rem] nav:text-[0.78rem] tracking-[0.14em] uppercase transition-colors ${
              ton === "sombre" ? "text-jaune" : "text-nuit/85 group-hover/logo:text-jaune-profond"
            }`}
          >
            Travaux
          </span>
        </span>
      </>
    ) : null}
    </Link>
  );
}

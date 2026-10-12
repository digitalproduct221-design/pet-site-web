import Image from "next/image";
import Link from "next/link";
import emblemePet from "@/public/brand/embleme-pet.png";
import emblemePetInverse from "@/public/brand/embleme-pet-inverse.png";

/**
 * Logo officiel PET :
 * Emblème officiel à grande échelle + nom « PARTENAIRE ENTREPRISE TRAVAUX SUARL »
 * en typographie haute lisibilité immédiatement visible et lisible à toutes les résolutions.
 */
export function Logo({
  ton = "clair",
  compact = false,
}: {
  ton?: "clair" | "sombre";
  compact?: boolean;
  nom?: boolean;
}) {
  const estSombre = ton === "sombre";

  return (
    <Link
      href="/"
      className="group/logo flex items-center gap-2 sm:gap-3 rounded-chantier focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
      translate="no"
      aria-label="PARTENAIRE ENTREPRISE TRAVAUX SUARL (PET), retour à l'accueil"
    >
      <div
        className={`relative shrink-0 transition-all duration-300 ${
          compact ? "size-10 sm:size-12" : "size-11 sm:size-12 lg:size-14"
        }`}
      >
        <Image
          src={estSombre ? emblemePetInverse : emblemePet}
          alt="Emblème officiel PARTENAIRE ENTREPRISE TRAVAUX SUARL"
          fill
          priority
          sizes="64px"
          className="object-contain"
        />
      </div>

      <div className="flex flex-col justify-center leading-none">
        <span
          className={`font-display font-black uppercase tracking-tight transition-colors duration-300 ${
            estSombre ? "text-blanc group-hover/logo:text-jaune" : "text-royal group-hover/logo:text-royal-sombre"
          } ${
            compact
              ? "text-[0.875rem] sm:text-[1rem] lg:text-[1.125rem]"
              : "text-[0.9375rem] sm:text-[1.125rem] lg:text-[1.25rem]"
          }`}
        >
          PARTENAIRE ENTREPRISE TRAVAUX
        </span>
        <span
          className={`font-sans font-extrabold tracking-[0.14em] uppercase transition-colors duration-300 ${
            estSombre ? "text-jaune" : "text-jaune-profond"
          } ${
            compact
              ? "mt-0.5 text-[0.5625rem] sm:text-[0.625rem] lg:text-[0.6875rem]"
              : "mt-0.5 sm:mt-1 text-[0.625rem] sm:text-[0.6875rem] lg:text-[0.75rem]"
          }`}
        >
          SUARL · BTP AU SÉNÉGAL
        </span>
      </div>
    </Link>
  );
}

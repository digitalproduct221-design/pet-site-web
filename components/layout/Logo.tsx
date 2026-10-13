import Image from "next/image";
import Link from "next/link";
import emblemePet from "@/public/brand/embleme-pet.png";
import emblemePetInverse from "@/public/brand/embleme-pet-inverse.png";

/**
 * Logo officiel PET :
 * - Emblème officiel haute définition (équerres architecte or & bleu, poignée de main et sigle PET)
 * - Typographie adaptative haute fidélité :
 *   • Sur mobile (< sm) : « PET SUARL » puissant et lisible + « BTP AU SÉNÉGAL », garanti 0 retour à la ligne et 0 débordement.
 *   • Sur écran large (>= sm) : « PARTENAIRE ENTREPRISE TRAVAUX » + « SUARL · BTP AU SÉNÉGAL » déployé en majesté.
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
      className="group/logo flex items-center gap-2 sm:gap-3 rounded-chantier focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] shrink-0"
      translate="no"
      aria-label="PARTENAIRE ENTREPRISE TRAVAUX SUARL (PET), retour à l'accueil"
    >
      <div
        className={`relative shrink-0 transition-all duration-300 ${
          compact ? "size-10 sm:size-11 lg:size-13" : "size-11 sm:size-12 lg:size-14"
        }`}
      >
        <Image
          src={estSombre ? emblemePetInverse : emblemePet}
          alt="Emblème officiel PARTENAIRE ENTREPRISE TRAVAUX SUARL"
          fill
          priority
          sizes="(max-width: 640px) 48px, 56px"
          className="object-contain"
        />
      </div>

      {/* 1. TYPOGRAPHIE MOBILE (< sm) : Compacte, percutante, 100% lisible, 0 retour à la ligne */}
      <div className="flex flex-col justify-center sm:hidden leading-none select-none">
        <div className="flex items-baseline gap-1.5 whitespace-nowrap leading-none">
          <span
            className={`font-display font-black tracking-tight transition-colors duration-300 ${
              estSombre ? "text-blanc group-hover/logo:text-jaune" : "text-royal group-hover/logo:text-royal-sombre"
            } ${compact ? "text-[1.125rem]" : "text-[1.25rem]"}`}
          >
            PET
          </span>
          <span
            className={`font-sans font-black tracking-[0.14em] uppercase transition-colors duration-300 ${
              estSombre ? "text-jaune" : "text-jaune-profond"
            } ${compact ? "text-[0.6875rem]" : "text-[0.75rem]"}`}
          >
            SUARL
          </span>
        </div>
        <span
          className={`mt-1 font-sans font-extrabold tracking-[0.14em] uppercase whitespace-nowrap transition-colors duration-300 ${
            estSombre ? "text-brume" : "text-encre-douce"
          } ${compact ? "text-[0.5625rem]" : "text-[0.625rem]"}`}
        >
          BTP AU SÉNÉGAL
        </span>
      </div>

      {/* 2. TYPOGRAPHIE TABLETTE & GRAND ÉCRAN (>= sm) : Nom complet déployé en majesté */}
      <div className="hidden sm:flex flex-col justify-center leading-none select-none">
        <span
          className={`font-display font-black uppercase tracking-tight whitespace-nowrap transition-colors duration-300 ${
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
          className={`font-sans font-extrabold tracking-[0.14em] uppercase whitespace-nowrap transition-colors duration-300 ${
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

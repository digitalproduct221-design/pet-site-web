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
      className="group/logo flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 rounded-chantier focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] shrink-0 min-w-0"
      translate="no"
      aria-label="PARTENAIRE ENTREPRISE TRAVAUX SUARL (PET), retour à l'accueil"
    >
      {/* Emblème PET */}
      <div
        className={`relative shrink-0 transition-all duration-300 ${
          compact
            ? "size-[28px] sm:size-10 lg:size-12"
            : "size-[32px] sm:size-11 lg:size-13"
        }`}
      >
        <Image
          src={estSombre ? emblemePetInverse : emblemePet}
          alt="Emblème officiel PARTENAIRE ENTREPRISE TRAVAUX SUARL"
          fill
          priority
          sizes="(max-width: 640px) 36px, 52px"
          className="object-contain"
        />
      </div>

      {/* TYPOGRAPHIE OFFICIELLE : Nom complet en haut + BTP en bas (mobile & bureau) */}
      <div className="flex flex-col justify-center leading-none select-none min-w-0">
        <div className="flex items-baseline gap-1 sm:gap-1.5 whitespace-nowrap leading-none">
          <span
            className={`font-display font-black uppercase tracking-tight transition-colors duration-300 ${
              estSombre ? "text-blanc group-hover/logo:text-jaune" : "text-royal group-hover/logo:text-royal-sombre"
            } ${
              compact
                ? "text-[0.5rem] min-[360px]:text-[0.53125rem] min-[390px]:text-[0.59375rem] sm:text-[0.9375rem] lg:text-[1.125rem]"
                : "text-[0.53125rem] min-[360px]:text-[0.5625rem] min-[390px]:text-[0.625rem] sm:text-[1rem] lg:text-[1.1875rem]"
            }`}
          >
            PARTENAIRE ENTREPRISE TRAVAUX
          </span>
          <span
            className={`font-sans font-black tracking-[0.1em] uppercase transition-colors duration-300 ${
              estSombre ? "text-jaune" : "text-jaune-profond"
            } ${
              compact
                ? "text-[0.40625rem] min-[360px]:text-[0.4375rem] min-[390px]:text-[0.46875rem] sm:text-[0.625rem] lg:text-[0.75rem]"
                : "text-[0.4375rem] min-[360px]:text-[0.46875rem] min-[390px]:text-[0.5rem] sm:text-[0.6875rem] lg:text-[0.8125rem]"
            }`}
          >
            SUARL
          </span>
        </div>
        <span
          className={`font-sans font-extrabold tracking-[0.14em] uppercase whitespace-nowrap transition-colors duration-300 ${
            estSombre ? "text-brume" : "text-encre-douce"
          } ${
            compact
              ? "mt-0.5 text-[0.4375rem] min-[360px]:text-[0.46875rem] sm:text-[0.5625rem] lg:text-[0.65625rem]"
              : "mt-0.5 sm:mt-1 text-[0.46875rem] min-[360px]:text-[0.5rem] sm:text-[0.625rem] lg:text-[0.71875rem]"
          }`}
        >
          BTP <span className="hidden min-[480px]:inline">AU SÉNÉGAL</span>
        </span>
      </div>
    </Link>
  );
}

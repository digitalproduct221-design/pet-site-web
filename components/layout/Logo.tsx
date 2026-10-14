import Image from "next/image";
import Link from "next/link";
import emblemePet from "@/public/brand/embleme-pet.png";
import emblemePetInverse from "@/public/brand/embleme-pet-inverse.png";

/**
 * Logo officiel PET :
 * - Emblème officiel haute définition (équerres architecte or & bleu, poignée de main et sigle PET)
 * - Typographie officielle équilibrée et lisible :
 *   • Sur mobile (< sm) : « PARTENAIRE ENTREPRISE » / « TRAVAUX SUARL » en police moyenne nette et aérée + « BTP AU SÉNÉGAL » garanti sans débordement.
 *   • Sur écran large (>= sm) : « PARTENAIRE ENTREPRISE TRAVAUX SUARL » en ligne continue majestueuse + « BTP AU SÉNÉGAL ».
 */
export function Logo({
  ton = "clair",
  compact = false,
}: {
  ton?: "clair" | "sombre";
  compact?: boolean;
}) {
  const estSombre = ton === "sombre";

  return (
    <Link
      href="/"
      className="group/logo flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 rounded-chantier focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] shrink-0 min-w-0"
      translate="no"
      aria-label="PARTENAIRE ENTREPRISE TRAVAUX SUARL (PET) - BTP AU SÉNÉGAL, retour à l'accueil"
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

      {/* TYPOGRAPHIE OFFICIELLE : Nom complet en haut + BTP AU SÉNÉGAL en bas */}
      <div className="flex flex-col justify-center select-none min-w-0">
        {/* Mobile (< sm) : 2 lignes harmonieuses en police moyenne lisible */}
        <div className="sm:hidden flex flex-col leading-[1.05]">
          <span
            className={`font-display font-black uppercase tracking-[-0.015em] transition-colors duration-300 ${
              estSombre ? "text-blanc group-hover/logo:text-jaune" : "text-royal group-hover/logo:text-royal-sombre"
            } ${compact ? "text-[0.71875rem]" : "text-[0.78125rem]"}`}
          >
            PARTENAIRE ENTREPRISE
          </span>
          <div className="flex items-baseline gap-1">
            <span
              className={`font-display font-black uppercase tracking-[-0.015em] transition-colors duration-300 ${
                estSombre ? "text-blanc group-hover/logo:text-jaune" : "text-royal group-hover/logo:text-royal-sombre"
              } ${compact ? "text-[0.71875rem]" : "text-[0.78125rem]"}`}
            >
              TRAVAUX
            </span>
            <span
              className={`font-display font-bold uppercase tracking-wider transition-colors duration-300 ${
                estSombre ? "text-blanc/85 group-hover/logo:text-jaune" : "text-royal/85 group-hover/logo:text-royal-sombre"
              } ${compact ? "text-[0.59375rem]" : "text-[0.625rem]"}`}
            >
              SUARL
            </span>
          </div>
        </div>

        {/* Bureau et tablettes (>= sm) : sur une seule ligne majestueuse */}
        <div className="hidden sm:flex items-baseline gap-1.5 whitespace-nowrap leading-none">
          <span
            className={`font-display font-black uppercase tracking-[-0.015em] transition-colors duration-300 ${
              estSombre ? "text-blanc group-hover/logo:text-jaune" : "text-royal group-hover/logo:text-royal-sombre"
            } ${
              compact
                ? "text-[0.9375rem] lg:text-[1.125rem]"
                : "text-[1rem] lg:text-[1.1875rem]"
            }`}
          >
            PARTENAIRE ENTREPRISE TRAVAUX
          </span>
          <span
            className={`font-display font-bold uppercase tracking-wider transition-colors duration-300 ${
              estSombre ? "text-blanc/85 group-hover/logo:text-jaune" : "text-royal/85 group-hover/logo:text-royal-sombre"
            } ${
              compact
                ? "text-[0.75rem] lg:text-[0.875rem]"
                : "text-[0.8125rem] lg:text-[0.9375rem]"
            }`}
          >
            SUARL
          </span>
        </div>

        {/* Ligne du bas : STRICTEMENT « BTP AU SÉNÉGAL » sur tous les écrans */}
        <span
          className={`font-sans font-extrabold tracking-[0.14em] uppercase whitespace-nowrap transition-colors duration-300 ${
            estSombre ? "text-brume" : "text-encre-douce"
          } ${
            compact
              ? "mt-0.5 text-[0.46875rem] sm:text-[0.5625rem] lg:text-[0.65625rem]"
              : "mt-0.5 sm:mt-1 text-[0.5rem] sm:text-[0.625rem] lg:text-[0.71875rem]"
          }`}
        >
          BTP AU SÉNÉGAL
        </span>
      </div>
    </Link>
  );
}

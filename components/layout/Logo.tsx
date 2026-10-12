import Image from "next/image";
import Link from "next/link";
import logoPet from "@/public/brand/logo-pet.png";
import logoPetInverse from "@/public/brand/logo-pet-inverse.png";

/**
 * Logo officiel PET : emblème et nom « PARTENAIRE ENTREPRISE TRAVAUX SUARL »
 * extrait haute fidélité du logo de marque, détouré et optimisé.
 */
export function Logo({
  ton = "clair",
  compact = false,
}: {
  ton?: "clair" | "sombre";
  compact?: boolean;
  nom?: boolean;
}) {
  return (
    <Link
      href="/"
      className="group/logo flex items-center rounded-chantier focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
      translate="no"
      aria-label="PARTENAIRE ENTREPRISE TRAVAUX SUARL (PET), retour à l'accueil"
    >
      <Image
        src={ton === "sombre" ? logoPetInverse : logoPet}
        alt="PARTENAIRE ENTREPRISE TRAVAUX SUARL"
        priority
        loading="eager"
        className={`w-auto object-contain transition-all duration-300 ${
          compact ? "h-11 sm:h-12" : "h-12 sm:h-14 lg:h-16"
        }`}
        sizes="(max-width: 640px) 160px, (max-width: 1024px) 220px, 260px"
      />
    </Link>
  );
}

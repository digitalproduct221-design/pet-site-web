import Link from "next/link";
import { navigation } from "@/content/site";
import { Icone } from "@/components/ui/Icone";

/**
 * Barre de navigation principale sans JavaScript : mêmes rubriques et même
 * aspect que le méga-menu, en simples liens. Rendue par le serveur, elle tient
 * la place pendant le chargement du méga-menu (grand écran seulement).
 */
export function NavStatique({ chemin }: { chemin: string }) {
  return (
    <nav aria-label="Navigation principale" className="static hidden nav:block">
      <ul className="flex items-center">
        {navigation.map((rubrique) => {
          const actif = chemin.startsWith(rubrique.href) || (rubrique.id === "entreprise" && chemin.startsWith("/carrieres"));
          return (
            <li key={rubrique.id}>
              <Link
                href={rubrique.href}
                aria-current={chemin === rubrique.href ? "page" : undefined}
                className={`relative flex h-[var(--header-h)] items-center gap-1 whitespace-nowrap px-2.5 cote text-[1.0625rem] text-nuit outline-offset-[-6px] transition-colors hover:text-royal xl:px-4 ${actif ? "text-royal" : ""}`}
              >
                {rubrique.titre}
                <Icone nom="chevron" size={14} weight="bold" />
                <span
                  aria-hidden
                  className={`absolute inset-x-2.5 bottom-0 h-[3px] origin-left bg-jaune xl:inset-x-4 ${actif ? "scale-x-100" : "scale-x-0"}`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

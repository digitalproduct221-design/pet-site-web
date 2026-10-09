import { SLOGAN } from "@/content/site";
import { BoutonLien } from "@/components/ui/Bouton";
import { Equerres } from "@/components/ui/Equerres";
import { Profil } from "@/components/ui/Profil";
import { Diaporama, type Diapo } from "./Diaporama";

// Photos réelles de chantier, les plus lumineuses d'abord (droits à vérifier : écartées).
const diapos: Diapo[] = [
  {
    photo: "terrassementEngins",
    onglet: "Terrassement",
    legende: "Plateforme terrassée à la pelle hydraulique et à la chargeuse.",
    href: "/savoir-faire/travaux-publics-vrd",
    origine: "62% 58%",
  },
  {
    photo: "niveleuseVoirie",
    onglet: "Voirie",
    legende: "Réglage d'une voirie en terre à la niveleuse, guidée par le chef de chantier.",
    href: "/savoir-faire/travaux-publics-vrd",
    origine: "40% 45%",
  },
  {
    photo: "conduiteOuvrage",
    onglet: "Réseaux d'eau",
    legende: "Conduite en fonte, vannes et ferraillage de l'ouvrage, en fond de fouille.",
    href: "/savoir-faire/hydraulique",
    origine: "55% 50%",
  },
  {
    photo: "dalotRegard",
    onglet: "Assainissement",
    legende: "Regard en béton raccordé au réseau, au cœur d'un quartier de Dakar.",
    href: "/savoir-faire/assainissement",
    origine: "48% 62%",
  },
  {
    photo: "ferraillageOuvrage",
    onglet: "Génie civil",
    legende: "Armatures d'un ouvrage hydraulique en béton armé, avant coulage.",
    href: "/savoir-faire/genie-civil",
    origine: "45% 60%",
  },
];

/**
 * Hero immersif et lumineux : diaporama plein écran de vrais chantiers, sans voile
 * général (seuls un dégradé sous le texte et un autre sous les onglets assurent la
 * lisibilité). Le texte est rendu par le serveur ; le diaporama est la seule
 * partie interactive. Profil de terrain vers la section suivante.
 */
export function Hero() {
  return (
    <section
      aria-roledescription="carrousel"
      aria-label="Nos chantiers en images"
      className="sur-sombre relative isolate flex min-h-[max(34rem,calc(100svh-var(--header-h)-var(--barre-mobile-h)))] flex-col overflow-hidden bg-nuit text-blanc lg:min-h-[max(40rem,calc(100svh-var(--header-h)-var(--topbar-h)))]"
    >
      <Diaporama diapos={diapos} />

      {/* Mobile : texte en bas, la photo reste dégagée en haut ; écrans bas : moins de marge */}
      <div className="conteneur pb-[calc(clamp(2.25rem,5vw,5.5rem)+13rem)] pt-12 max-md:mt-auto max-md:pb-[calc(clamp(2.25rem,5vw,5.5rem)+8rem)] sm:pt-14 lg:pt-20 [@media(min-width:64rem)_and_(max-height:820px)]:pt-10">
        <div className="entree max-w-[44rem]">
          <p className="hidden cote text-[0.9375rem] uppercase tracking-[0.16em] text-blanc ombre-texte sm:block">
            Bâtiment · Travaux publics · Hydraulique · Assainissement · Génie civil
          </p>
          <Equerres
            decalage={20}
            className="-ml-3 inline-block px-3 pb-4 pt-3 sm:mt-6"
            style={{ ["--equerre-taille" as string]: "clamp(2.5rem, 1.5rem + 3vw, 4.25rem)", ["--equerre-epaisseur" as string]: "5px" }}
          >
            <h1 className="titre text-[clamp(2.5rem,min(1.2rem+5.6vw,9svh),5.5rem)] leading-[0.94] text-blanc ombre-texte">
              <span className="block">Nous bâtissons.</span>
              <span className="block">Nous raccordons.</span>
              <span className="block text-jaune">Nous durons.</span>
            </h1>
          </Equerres>
          {/* Sous 640 px, le slogan cède la place à la photo (il est repris plus bas et dans le pied de page) */}
          <p className="mt-7 max-w-[30rem] text-[1.1875rem] leading-relaxed text-blanc ombre-texte max-sm:hidden">{SLOGAN}, depuis 2016.</p>
          <div className="mt-7 flex flex-wrap gap-4 sm:mt-9">
            {/* Sur mobile, la barre d'actions fixe porte déjà « Devis » : un seul appel principal à l'écran */}
            <span className="hidden sm:contents">
              <BoutonLien href="/contact#devis">Demander un devis</BoutonLien>
            </span>
            <BoutonLien href="/savoir-faire" variante="contour-clair">
              Nos savoir-faire
            </BoutonLien>
          </div>
        </div>
      </div>

      <Profil couleur="text-sable" />
    </section>
  );
}

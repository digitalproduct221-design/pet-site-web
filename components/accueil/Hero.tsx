import { SLOGAN } from "@/content/site";
import { BoutonLien } from "@/components/ui/Bouton";
import { Equerres } from "@/components/ui/Equerres";
import { Motif } from "@/components/ui/Motif";
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
 * Hero clair et lumineux : le texte sur fond blanc à gauche, la photo en grand à
 * droite, nette et sans voile, dans un cadre coupé en biais (le geste du volet).
 * Sur mobile, la photo passe au-dessus du texte. Le texte est rendu par le
 * serveur ; le diaporama est la seule partie interactive.
 */
export function Hero() {
  return (
    <section
      aria-roledescription="carrousel"
      aria-label="Nos chantiers en images"
      className="relative isolate overflow-hidden bg-blanc"
    >
      <Motif type="plan" className="text-royal" opacite={0.16} />
      <div className="grid lg:min-h-[max(38rem,calc(100svh-var(--header-h)-var(--topbar-h)))] lg:grid-cols-2">
        {/* Texte */}
        <div className="flex flex-col justify-center px-4 pb-24 pt-8 sm:px-6 lg:pb-28 lg:pl-[max(2rem,calc((100vw-var(--container-site))/2+2rem))] lg:pr-10 lg:pt-12">
          <div className="entree">
            <p className="cote text-[0.9375rem] uppercase tracking-[0.16em] text-royal">Entreprise de BTP à Dakar, depuis 2016</p>
            <Equerres
              decalage={18}
              className="-ml-3 mt-5 inline-block px-3 pb-4 pt-3"
              style={{ ["--equerre-taille" as string]: "clamp(2.25rem, 1.4rem + 2.6vw, 3.75rem)", ["--equerre-epaisseur" as string]: "5px" }}
            >
              <h1 className="titre text-[clamp(2.75rem,1.4rem+3.6vw,4.625rem)] leading-[0.94] text-nuit">
                <span className="block">Nous bâtissons.</span>
                <span className="block">Nous raccordons.</span>
                <span className="block">
                  <span className="surligne">Nous durons.</span>
                </span>
              </h1>
            </Equerres>
            <p className="mt-6 max-w-[30rem] text-[1.1875rem] leading-relaxed text-encre-douce">
              {SLOGAN} : bâtiment, travaux publics, hydraulique, assainissement et génie civil.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {/* Sur mobile, la barre d'actions fixe porte déjà « Devis » : un seul appel principal à l'écran */}
              <span className="hidden sm:contents">
                <BoutonLien href="/contact#devis">Demander un devis</BoutonLien>
              </span>
              <BoutonLien href="/savoir-faire" variante="contour">
                Nos savoir-faire
              </BoutonLien>
            </div>
          </div>
        </div>

        {/* Photo : au-dessus du texte sur mobile, à droite sur grand écran */}
        <div className="relative order-first h-[min(62svh,32rem)] sm:h-[34rem] lg:order-none lg:h-auto">
          <div className="cadre-hero absolute inset-0">
            <Diaporama diapos={diapos} />
          </div>
        </div>
      </div>

      <Profil couleur="text-sable" />
    </section>
  );
}

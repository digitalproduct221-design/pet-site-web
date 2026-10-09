import { SLOGAN } from "@/content/site";
import { BoutonLien } from "@/components/ui/Bouton";
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
 * Hero immersif : la photo occupe tout le cadre, nette, posée sur le sable comme
 * un tableau (équerres du logo dans les angles, coin bas-gauche coupé). Le titre
 * se lit en bas à gauche sur un dégradé localisé ; les domaines flottent en haut
 * à droite ; le panneau de verre en bas à droite pilote le diaporama.
 * Pensé pour recevoir des photos HD : rien ne couvre le haut ni la droite.
 */
export function Hero() {
  return (
    <section aria-roledescription="carrousel" aria-label="Nos chantiers en images" className="relative isolate min-h-screen w-full overflow-hidden">
      <div className="relative isolate flex min-h-screen flex-col justify-between text-blanc pt-24 sm:pt-28 lg:pt-32" data-vu="">
        {/* Domaines, en haut à droite */}
        <ul
          aria-label="Nos domaines"
          className="liquid-glass-sombre mr-4 hidden self-end rounded-2xl px-5 py-3.5 cote text-[0.875rem] uppercase leading-[1.8] tracking-[0.16em] md:block lg:mr-8"
        >
          {["Bâtiment", "Travaux publics et VRD", "Hydraulique", "Assainissement", "Génie civil"].map((d) => (
            <li key={d} className="flex items-center gap-2.5">
              <span aria-hidden className="size-1.5 rotate-45 bg-jaune" />
              {d}
            </li>
          ))}
        </ul>

        {/* Titre en bas à gauche, panneau du diaporama en bas à droite */}
        <div className="conteneur mt-auto grid items-end gap-6 pb-24 sm:pb-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10 lg:pb-24">
          <div className="entree max-w-[46rem]">
            <p className="cote text-[0.9375rem] uppercase tracking-[0.16em] text-blanc ombre-texte max-sm:hidden">Entreprise de BTP à Dakar, depuis 2016</p>
            <h1 className="titre sm:mt-4 text-[clamp(2.75rem,1.2rem+5.4vw,6rem)] leading-[0.92] text-blanc ombre-texte">
              <span className="block">Nous bâtissons.</span>
              <span className="block">Nous raccordons.</span>
              <span className="block text-jaune">Nous durons.</span>
            </h1>
            <p className="mt-5 max-w-[32rem] text-[1.1875rem] leading-relaxed text-blanc ombre-texte max-sm:hidden">{SLOGAN}.</p>
            <div className="mt-7 flex flex-wrap gap-4">
              <span className="hidden sm:contents">
                <BoutonLien href="/contact#devis">Demander un devis</BoutonLien>
              </span>
              <BoutonLien href="/realisations" variante="contour-clair">
                Nos réalisations
              </BoutonLien>
            </div>
          </div>
          <Diaporama diapos={diapos} />
        </div>
      </div>
      <Profil couleur="text-sable" forme="terrain" className="z-20" />
    </section>
  );
}

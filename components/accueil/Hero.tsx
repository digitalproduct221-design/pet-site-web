import { SLOGAN } from "@/content/site";
import { BoutonLien } from "@/components/ui/Bouton";
import { Profil } from "@/components/ui/Profil";
import { Diaporama, type Diapo } from "./Diaporama";

const diapos: Diapo[] = [
  {
    photo: "immeubleDakar",
    onglet: "Bâtiment",
    legende: "Élévation de structures en béton armé et gros œuvre de qualité à Dakar.",
    href: "/savoir-faire/batiment",
    origine: "50% 45%",
  },
  {
    photo: "equipePet",
    onglet: "Notre Équipe",
    legende: "Ingénieurs, conducteurs de travaux et équipes de terrain mobilisés pour bâtir le Sénégal.",
    href: "/entreprise",
    origine: "50% 35%",
  },
  {
    photo: "voirieAsphalte",
    onglet: "Voirie & VRD",
    legende: "Voirie urbaine bitumée avec bordures et caniveaux d'assainissement intégrés.",
    href: "/savoir-faire/travaux-publics-vrd",
    origine: "50% 50%",
  },
  {
    photo: "epreuveHydraulique",
    onglet: "Réseaux d'eau",
    legende: "Canalisations d'adduction d'eau, vannes de régulation et épreuves de pression.",
    href: "/savoir-faire/hydraulique",
    origine: "50% 50%",
  },
  {
    photo: "controleQualiteBeton",
    onglet: "Génie civil",
    legende: "Ouvrages d'art en béton armé et contrôle qualité rigoureux des matériaux.",
    href: "/savoir-faire/genie-civil",
    origine: "50% 50%",
  },
  {
    photo: "stationPompageSolaire",
    onglet: "Aménagements",
    legende: "Stations de pompage solaire et réseaux d'irrigation agricole moderne.",
    href: "/savoir-faire/prestations-generales",
    origine: "50% 50%",
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

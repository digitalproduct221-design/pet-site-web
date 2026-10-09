import Image from "next/image";
import type { ReactNode } from "react";
import { resoudreImage, type ImageSite } from "@/content/images";
import type { PhotoId } from "@/content/photos";
import { FilAriane } from "./FilAriane";
import { Equerres } from "./Equerres";
import { Motif } from "./Motif";
import { Profil } from "./Profil";
import { Icone } from "./Icone";
import { SeparateurHero, type FormeSeparateur } from "./SeparateurHero";

type Props = {
  titre: string;
  intro?: ReactNode;
  ariane: { titre: string; href?: string }[];
  photo?: PhotoId | ImageSite;
  children?: ReactNode;
  /** Bloc affiché sous l'intro (ex. fiche synthétique). */
  aside?: ReactNode;
  /** Couleur du bloc qui suit (classe text-*), pour le profil de terrain. */
  suite?: string;
  /** Motif de séparation personnalisé (sinon auto-détecté selon le domaine métier). */
  motif?: FormeSeparateur;
};

const atoutsDefaut = [
  {
    icone: "casque",
    titre: "+40 ans",
    desc: "d'expérience cumulée",
  },
  {
    icone: "engins",
    titre: "Parc matériel",
    desc: "engins récents équipés",
  },
  {
    icone: "qualite",
    titre: "Normes & Délais",
    desc: "qualité BTP certifiée",
  },
];

/**
 * Détermine le motif de séparation organique selon le domaine :
 * - onde : Hydraulique, Assainissement (eau, flux)
 * - topographie : Travaux Publics, VRD, Terrassement (talus, courbes de niveau)
 * - strates : Bâtiment, Électricité, Peinture (étages, architecture)
 * - arche : Génie Civil, Ponts, Dalots (voûtes d'ouvrages d'art)
 * - biseau : Pages institutionnelles (dynamique angulaire PET)
 */
function determinerMotif(
  titre: string,
  ariane: { titre: string }[] = [],
  force?: FormeSeparateur
): FormeSeparateur {
  if (force) return force;
  const texte = `${titre} ${ariane.map((a) => a.titre).join(" ")}`.toLowerCase();
  if (texte.includes("hydraulique") || texte.includes("assainissement") || texte.includes("eau")) {
    return "onde";
  }
  if (
    texte.includes("travaux publics") ||
    texte.includes("vrd") ||
    texte.includes("terrassement") ||
    texte.includes("route")
  ) {
    return "topographie";
  }
  if (
    texte.includes("bâtiment") ||
    texte.includes("batiment") ||
    texte.includes("peinture") ||
    texte.includes("electricite") ||
    texte.includes("électricité")
  ) {
    return "strates";
  }
  if (
    texte.includes("génie civil") ||
    texte.includes("genie civil") ||
    texte.includes("ouvrage") ||
    texte.includes("pont") ||
    texte.includes("dalot")
  ) {
    return "arche";
  }
  return "biseau";
}

/**
 * En-tête des pages intérieures :
 * - Teinte minérale douce et apaisante (ne tape pas à l'œil, reposante)
 * - Mise en valeur généreuse de la photo de chantier (grande présence dès l'arrivée sur la page)
 * - Séparation organique subtile et variée selon le métier (onde, strates, topographie, arche, biseau)
 * - Zéro débordement, zéro trait dur, profil inférieur parfaitement scellé
 * - Cartes d'engagements et d'atouts PET qui comblent l'espace sous le texte
 */
export function EnTetePage({
  titre,
  intro,
  ariane,
  photo,
  children,
  aside,
  suite = "text-sable",
  motif,
}: Props) {
  const p = photo ? resoudreImage(photo) : null;
  const formeMotif = determinerMotif(titre, ariane, motif);
  const classeFond = suite === "text-sable" ? "bg-hero-blanc" : "bg-hero-doux";

  return (
    <header className={`relative isolate overflow-hidden ${classeFond}`}>
      {/* Trame technique très discrète et douce (opacité atténuée pour éviter toute agressivité) */}
      <Motif type="plan" className="text-encre" opacite={0.035} />

      <div className={`grid ${p ? "min-h-[82vh] lg:min-h-[46rem] xl:min-h-[50rem] lg:grid-cols-12 items-stretch" : ""}`}>
        {/* BLOC TEXTE : Toujours en haut sur mobile, et à gauche sur grand écran */}
        <div
          className={`flex flex-col justify-center px-4 pb-14 pt-28 sm:px-6 sm:pt-32 lg:col-span-6 xl:col-span-5 lg:pb-20 lg:pl-[max(2rem,calc((100vw-var(--container-site))/2+2rem))] lg:pr-8 lg:pt-36`}
        >
          {/* Fil d'Ariane parfaitement visible et dégagé de l'en-tête */}
          <FilAriane etapes={ariane} ton="clair" />

          <div className="entree mt-4">
            <Equerres as="div" seule decalage={18} className="inline-block pl-1 pt-1">
              <h1 className="titre text-[clamp(2.5rem,1.4rem+3.4vw,4.5rem)] leading-[0.95] text-nuit">{titre}</h1>
            </Equerres>
            {intro ? <p className="mt-5 max-w-[38rem] text-lg leading-relaxed text-encre-douce">{intro}</p> : null}
            {children ? <div className="mt-7 flex flex-wrap gap-4">{children}</div> : null}
          </div>

          {/* Espace sous le texte : comblé par les atouts PET et icônes (esthétique et rassurant) */}
          {aside ? (
            <div className="mt-8">{aside}</div>
          ) : (
            <div className="mt-8 border-t border-nuit/10 pt-6 lg:mt-10 lg:pt-8">
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-jaune" />
                <span className="text-[0.72rem] font-bold uppercase tracking-wider text-nuit/70">
                  Garanties d&apos;exécution & engagements PET
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {atoutsDefaut.map((a) => (
                  <div
                    key={a.titre}
                    className="liquid-glass flex items-center gap-3 rounded-2xl p-3 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-jaune/20 text-nuit border border-jaune/40 shadow-sm">
                      <Icone nom={a.icone} size={20} weight="bold" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-[0.875rem] font-black uppercase leading-tight text-nuit truncate">
                        {a.titre}
                      </p>
                      <p className="text-[0.75rem] leading-snug text-encre-douce line-clamp-1">
                        {a.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PHOTO : Vient APRÈS le bloc texte sur mobile, et occupe une place prépondérante et lumineuse sur grand écran */}
        {p ? (
          <div className="relative h-80 sm:h-96 md:h-[28rem] lg:col-span-6 xl:col-span-7 lg:h-full overflow-hidden">
            {/* L'image de chantier nette avec effet de parallaxe */}
            <div className="absolute inset-0 bg-sable-soutenu">
              <div className="parallaxe absolute -inset-y-[6%] inset-x-0">
                <Image
                  src={p.src}
                  alt=""
                  fill
                  preload
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  quality={80}
                  className="object-cover"
                  style={{ objectPosition: p.focale }}
                />
              </div>
            </div>

            {/* SÉPARATEUR MOBILE : horizontal au sommet de la photo, adapté au domaine métier */}
            <div
              aria-hidden
              className="absolute top-0 inset-x-0 z-10 h-8 sm:h-11 pointer-events-none text-current lg:hidden"
            >
              <SeparateurHero forme={formeMotif} sens="horizontal" />
            </div>

            {/* SÉPARATEUR BUREAU : vertical le long du côté gauche de la photo, adapté au domaine métier */}
            <div
              aria-hidden
              className="absolute left-0 inset-y-0 z-10 hidden h-full w-14 lg:w-20 xl:w-24 pointer-events-none text-current lg:block"
            >
              <SeparateurHero forme={formeMotif} sens="vertical" />
            </div>
          </div>
        ) : null}
      </div>

      {/* Profil de terrain inférieur : strictly z-20 pour fermer la transition vers la section suivante sans débordement */}
      <Profil couleur={suite} forme="talus" className="relative z-20" />
    </header>
  );
}

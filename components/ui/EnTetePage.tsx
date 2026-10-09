import Image from "next/image";
import type { ReactNode } from "react";
import { resoudreImage, type ImageSite } from "@/content/images";
import type { PhotoId } from "@/content/photos";
import { FilAriane } from "./FilAriane";
import { Equerres } from "./Equerres";
import { Motif } from "./Motif";
import { Profil } from "./Profil";
import { Icone } from "./Icone";

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
 * En-tête des pages intérieures :
 * - Rendu 100% naturel, unifié et immersif (aucun angle droit, aucun carré, aucun bloc superposé, aucun espace blanc)
 * - La photo de chantier fait corps avec le héros en arrière-plan sans aucune coupure
 * - Transition en fondu atmosphérique continu (voile minéral doux et progressif qui se mixe à la photo)
 * - Parfaite lisibilité des textes et mise en valeur des engagements PET
 * - Profil de terrain inférieur strictement scellé au bas du conteneur sans bande vide
 */
export function EnTetePage({
  titre,
  intro,
  ariane,
  photo,
  children,
  aside,
  suite = "text-sable",
}: Props) {
  const p = photo ? resoudreImage(photo) : null;
  const classeFond = suite === "text-sable" ? "bg-hero-blanc" : "bg-hero-doux";
  const couleurVoile = suite === "text-sable" ? "#fbfaf7" : "#f7f3ea";

  return (
    <header className={`relative isolate overflow-hidden ${classeFond} min-h-[44rem] lg:min-h-[48rem] xl:min-h-[52rem] flex flex-col justify-center`}>
      {/* 1. PHOTO DE CHANTIER : Intégrée en arrière-plan unifié, sans aucun angle droit ni bloc découpé */}
      {p ? (
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* L'image de chantier nette avec effet de parallaxe */}
          <div className="parallaxe absolute -inset-y-[6%] inset-x-0">
            <Image
              src={p.src}
              alt=""
              fill
              preload
              fetchPriority="high"
              sizes="100vw"
              quality={82}
              className="object-cover"
              style={{ objectPosition: p.focale }}
            />
          </div>

          {/* Voile d'ambiance naturel GRAND ÉCRAN : diffuse le fond minéral doux vers la photo
              (zéro coupure, zéro angle droit, mixage parfaitement fluide) */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background: `linear-gradient(90deg, ${couleurVoile} 0%, ${couleurVoile} 34%, rgba(247,243,234,0.96) 44%, rgba(247,243,234,0.75) 56%, rgba(247,243,234,0.25) 72%, transparent 88%)`,
            }}
          />

          {/* Voile d'ambiance naturel MOBILE : fondu progressif vertical du haut vers le bas
              (protège la lisibilité du texte en haut, révèle la photo en bas) */}
          <div
            className="absolute inset-0 lg:hidden"
            style={{
              background: `linear-gradient(180deg, ${couleurVoile} 0%, ${couleurVoile} 42%, rgba(247,243,234,0.95) 54%, rgba(247,243,234,0.7) 68%, rgba(247,243,234,0.2) 82%, transparent 94%)`,
            }}
          />
        </div>
      ) : null}

      {/* 2. Trame technique discrète en filigrane (très douce pour ne pas saturer l'œil) */}
      <Motif type="plan" className="text-encre pointer-events-none" opacite={0.03} />

      {/* 3. CONTENU : Fil d'Ariane, titre, intro, CTA et badges d'engagements */}
      <div className="conteneur relative z-10 py-28 sm:py-32 lg:py-36">
        <div className="max-w-[44rem] xl:max-w-[48rem]">
          {/* Fil d'Ariane visible et dégagé */}
          <FilAriane etapes={ariane} ton="clair" />

          <div className="entree mt-5">
            <Equerres as="div" seule decalage={18} className="inline-block pl-1 pt-1">
              <h1 className="titre text-[clamp(2.5rem,1.4rem+3.4vw,4.5rem)] leading-[0.95] text-nuit">{titre}</h1>
            </Equerres>
            {intro ? <p className="mt-5 max-w-[38rem] text-lg leading-relaxed text-encre-douce">{intro}</p> : null}
            {children ? <div className="mt-7 flex flex-wrap gap-4">{children}</div> : null}
          </div>

          {/* Espace sous le texte : comblé de façon esthétique par les atouts PET */}
          {aside ? (
            <div className="mt-8">{aside}</div>
          ) : (
            <div className="mt-8 border-t border-nuit/10 pt-6 lg:mt-10 lg:pt-8 max-w-[38rem]">
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
      </div>

      {/* 4. Profil de terrain inférieur : strictement collé en bas sans espace vide */}
      <Profil couleur={suite} forme="talus" className="z-20" />
    </header>
  );
}

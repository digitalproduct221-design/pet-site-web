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
 * - Style immersif, prestigieux et architectural (dans la continuité de l'Accueil PET)
 * - Photo de chantier réelle en arrière-plan plein écran avec voile bleu nuit profond
 * - Typographie monumentale en blanc pur avec équerre d'or signature
 * - Cartes d'engagements en verre dépoli sombre (Liquid Glass) avec reflets dorés
 * - Transition basse en profil de terrain naturel sans aucun décalage
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

  return (
    <header className="relative isolate overflow-hidden profondeur text-blanc min-h-[38rem] sm:min-h-[42rem] lg:min-h-[46rem] flex flex-col justify-center">
      {/* 1. PHOTO DE CHANTIER : Plein cadre avec voile architectural bleu nuit */}
      {p ? (
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
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

          {/* Voile architectural GRAND ÉCRAN : sombre sur le texte à gauche, dégage la photo à droite */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(7, 18, 43, 0.95) 0%, rgba(11, 27, 63, 0.90) 38%, rgba(11, 27, 63, 0.65) 60%, rgba(7, 18, 43, 0.25) 82%, transparent 100%)",
            }}
          />

          {/* Voile architectural MOBILE : sombre en haut sous le texte, photo révélée en dessous */}
          <div
            className="absolute inset-0 lg:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(7, 18, 43, 0.96) 0%, rgba(11, 27, 63, 0.90) 45%, rgba(11, 27, 63, 0.60) 75%, rgba(7, 18, 43, 0.35) 100%)",
            }}
          />
        </div>
      ) : null}

      {/* 2. Trame technique discrète de plan d'architecte en filigrane */}
      <Motif type="plan" className="text-ciel pointer-events-none" opacite={0.06} />

      {/* 3. CONTENU : Fil d'Ariane, titre monumental, intro et réassurance BTP */}
      <div className="conteneur relative z-10 pt-32 pb-24 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32">
        <div className="max-w-[44rem] xl:max-w-[48rem]">
          {/* Fil d'Ariane contrasté sur fond sombre */}
          <FilAriane etapes={ariane} ton="sombre" />

          <div className="entree mt-5">
            <Equerres as="div" seule decalage={18} className="inline-block pl-1 pt-1">
              <h1 className="titre text-[clamp(2.75rem,1.8rem+4vw,5rem)] leading-[0.92] text-blanc ombre-texte">
                {titre}
              </h1>
            </Equerres>
            {intro ? (
              <p className="mt-5 max-w-[38rem] text-lg sm:text-xl leading-relaxed text-brume ombre-texte">
                {intro}
              </p>
            ) : null}
            {children ? <div className="mt-7 flex flex-wrap gap-4">{children}</div> : null}
          </div>

          {/* Espace sous le texte : Cartes d'engagements en verre dépoli sombre */}
          {aside ? (
            <div className="mt-8">{aside}</div>
          ) : (
            <div className="mt-10 border-t border-blanc/15 pt-8 max-w-[42rem]">
              <div className="mb-3.5 flex items-center gap-2">
                <span className="inline-block size-1.5 rotate-45 bg-jaune" />
                <span className="cote text-[0.75rem] font-bold uppercase tracking-[0.14em] text-ciel">
                  Garanties d&apos;exécution & engagements PET
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {atoutsDefaut.map((a) => (
                  <div
                    key={a.titre}
                    className="liquid-glass-sombre flex items-center gap-3.5 rounded-2xl p-3.5 shadow-lg transition-transform hover:scale-[1.02]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-jaune/20 text-jaune border border-jaune/40 shadow-inner">
                      <Icone nom={a.icone} size={22} weight="bold" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-[0.9375rem] font-black uppercase leading-tight text-blanc truncate">
                        {a.titre}
                      </p>
                      <p className="text-[0.75rem] leading-snug text-brume line-clamp-1">
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

      {/* 4. Profil de terrain inférieur : découpe nette vers la section suivante */}
      <Profil couleur={suite} forme="talus" className="z-20" />
    </header>
  );
}

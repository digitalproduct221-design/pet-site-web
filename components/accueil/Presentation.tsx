import Image from "next/image";
import { photos } from "@/content/photos";
import { valeurs } from "@/content/site";
import { BoutonLien } from "@/components/ui/Bouton";
import { Icone } from "@/components/ui/Icone";
import { Motif } from "@/components/ui/Motif";
import { TitreSection } from "@/components/ui/TitreSection";

/**
 * Qui est PET :
 * - Photo d'équipe réelle sur chantier (supervision terrain, gilets PET orange et EPI).
 * - Cadre asymétrique d'architecte avec cartouche QHSE à la base pour masquer les imperfections de prise de vue.
 * - Feuille de plan géométrique, valeurs d'entreprise et synthèse de confiance.
 */
export function Presentation() {
  const photo = photos.equipeTerrainSecurite;

  return (
    <section aria-labelledby="titre-presentation" className="relative bg-blanc pb-28 pt-20 lg:pb-36 lg:pt-28">
      <div className="conteneur grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-6">
          {/* Feuille de plan décalée derrière la photo */}
          <div aria-hidden className="absolute -inset-y-6 -left-4 right-10 isolate max-md:hidden rounded-panneau bg-sable sm:-left-8 lg:-left-12">
            <Motif type="plan" className="text-royal" opacite={0.22} />
          </div>

          {/* Photo d'équipe avec cadre asymétrique irrégulier & cartouche QHSE */}
          <div className="relative mx-auto w-full max-w-[34rem]">
            {/* 1. Cadre décoratif asymétrique d'arrière-plan */}
            <div
              aria-hidden
              className="absolute -inset-3 sm:-inset-4 rounded-[2.75rem_1.25rem_3.25rem_1.25rem] -rotate-1 bg-gradient-to-br from-royal via-ciel/40 to-jaune/40 opacity-70 transition-transform duration-500 group-hover:rotate-0"
            />

            {/* 2. Filet géométrique d'architecte décalé */}
            <div
              aria-hidden
              className="absolute -inset-1.5 sm:-inset-2 rounded-[1.25rem_3rem_1rem_2.75rem] rotate-1 border-2 border-royal/35 pointer-events-none"
            />

            {/* 3. Cadre principal organique avec ombre profonde */}
            <div className="group relative overflow-hidden rounded-[2.5rem_1.25rem_3rem_1.25rem] bg-nuit shadow-[0_20px_50px_rgba(7,18,43,0.22)] ring-4 ring-white">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden bg-nuit">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 36vw"
                  className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                />

                {/* Voile dégradé avec cartouche QHSE couvrant la zone inférieure */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-nuit via-nuit/85 to-transparent p-5 sm:p-6 text-blanc">
                  <div className="flex items-center gap-2 text-jaune">
                    <Icone nom="securite" size={17} weight="bold" />
                    <span className="cote text-[0.75rem] uppercase tracking-[0.14em] font-bold">
                      Sécurité & Qualité QHSE
                    </span>
                  </div>
                  <p className="mt-1 font-display font-black text-[1.125rem] sm:text-[1.25rem] text-blanc leading-snug">
                    Supervision active & encadrement qualifié
                  </p>
                  <p className="mt-1 text-[0.8125rem] sm:text-[0.875rem] text-brume line-clamp-2">
                    Équipes PET en gilets de haute visibilité et respect strict des normes de sécurité sur le terrain.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Pastille flottante de conformité sécurité */}
            <div className="absolute -bottom-4 -right-2 sm:-bottom-5 sm:-right-4 rounded-2xl bg-blanc/95 backdrop-blur-md px-4 py-2.5 sm:px-5 sm:py-3 shadow-xl border border-nuit/10 flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-jaune text-nuit shadow-sm">
                <Icone nom="casque" size={22} weight="bold" />
              </div>
              <div>
                <p className="text-[0.875rem] font-extrabold text-nuit leading-tight">100% Sécurité Active</p>
                <p className="text-[0.6875rem] uppercase tracking-wider text-encre-douce">Port des EPI obligatoire</p>
              </div>
            </div>
          </div>
        </div>

        <div className="revele lg:col-span-5 lg:col-start-8">
          <TitreSection id="titre-presentation" titre="La qualité et la sécurité au centre de nos chantiers" />
          <p className="mt-8 max-w-[34rem] text-[1.125rem] leading-relaxed text-texte">
            Fondée en 2016, <strong>PARTENAIRE ENTREPRISE TRAVAUX SUARL</strong> offre des solutions complètes pour l&apos;aménagement des infrastructures : bâtiment, VRD, hydraulique, assainissement et génie civil de l&apos;eau. De la conception à la réalisation, nous coordonnons tous les corps d&apos;état selon les plus hauts standards de qualité, dans le respect des délais et des budgets.
          </p>
          <ul aria-label="Nos valeurs" className="mt-8 grid max-w-[34rem] gap-x-6 gap-y-3 sm:grid-cols-2">
            {valeurs.map((v) => (
              <li key={v.titre} className="flex items-center gap-3 cote text-[1.0625rem] text-nuit">
                <span aria-hidden className="size-2 shrink-0 rounded-[1px] bg-jaune" />
                {v.titre}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <BoutonLien href="/a-propos" variante="contour">
              Découvrir PET
            </BoutonLien>
          </div>
        </div>
      </div>
    </section>
  );
}

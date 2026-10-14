import Image from "next/image";
import Link from "next/link";
import { photos } from "@/content/photos";
import { metiers } from "@/content/site";
import { BoutonLien } from "@/components/ui/Bouton";
import { Icone } from "@/components/ui/Icone";
import { Motif } from "@/components/ui/Motif";
import { Profil } from "@/components/ui/Profil";
import { TitreSection } from "@/components/ui/TitreSection";

/**
 * « Rejoignez nos équipes » : les métiers de nos chantiers composés en grand,
 * comme un tableau de chantier ; chacun mène à la candidature, métier prérempli.
 * Aucune offre inventée : ce sont les métiers que nous exerçons.
 */
export function Carrieres() {
  const photo = photos.equipeTerrainSecurite;

  return (
    <section aria-labelledby="titre-carrieres" className="sur-sombre profondeur relative isolate overflow-hidden pb-28 pt-16 text-blanc lg:pb-40 lg:pt-20">
      <Motif type="ferraillage" className="text-brume" opacite={0.06} />
      <div className="conteneur grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="revele">
            <TitreSection
              id="titre-carrieres"
              ton="sombre"
              titre="Construisez avec nous"
              intro="Des femmes et des hommes de terrain, fiers de leur métier, dans une équipe qui cumule plus de 40 ans d'expérience."
            />
            <div className="mt-9 flex flex-wrap gap-4">
              <BoutonLien href="/carrieres#candidature">Candidature spontanée</BoutonLien>
              <BoutonLien href="/carrieres" variante="contour-clair">
                Nos métiers
              </BoutonLien>
            </div>
          </div>

          {/* Photo d'équipe réelle sur le terrain avec cadre architectural irrégulier & cartouche */}
          <div className="relative mt-10 sm:mt-12 w-full max-w-[28rem] lg:max-w-none">
            {/* 1. Cadre décoratif asymétrique d'arrière-plan */}
            <div
              aria-hidden
              className="absolute -inset-3 sm:-inset-4 rounded-[2.75rem_1.25rem_3.25rem_1.25rem] -rotate-1 bg-gradient-to-br from-royal via-ciel/40 to-jaune/40 opacity-70 transition-transform duration-500 group-hover:rotate-0"
            />

            {/* 2. Filet géométrique d'architecte décalé */}
            <div
              aria-hidden
              className="absolute -inset-1.5 sm:-inset-2 rounded-[1.25rem_3rem_1rem_2.75rem] rotate-1 border-2 border-ciel/35 pointer-events-none"
            />

            {/* 3. Cadre principal organique avec ombre profonde */}
            <div className="group relative overflow-hidden rounded-[2.5rem_1.25rem_3rem_1.25rem] bg-nuit shadow-[0_20px_50px_rgba(7,18,43,0.45)] ring-4 ring-white/10">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-nuit">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 36vw"
                  className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                />

                {/* Voile dégradé avec cartouche terrain masquant la base */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-nuit via-nuit/85 to-transparent p-4 sm:p-5 text-blanc">
                  <div className="flex items-center gap-2 text-jaune">
                    <Icone nom="casque" size={16} weight="bold" />
                    <span className="cote text-[0.75rem] uppercase tracking-[0.14em] font-bold">
                      Équipes & Encadrement Terrain
                    </span>
                  </div>
                  <p className="mt-1 font-display font-black text-[1rem] sm:text-[1.125rem] text-blanc leading-snug">
                    Des femmes et des hommes de terrain
                  </p>
                  <p className="mt-0.5 text-[0.75rem] sm:text-[0.8125rem] text-brume line-clamp-1">
                    Présence active, port des EPI et fierté du travail bien fait sur chaque chantier.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Pastille flottante d'expérience */}
            <div className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-3 rounded-2xl bg-nuit/95 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-xl border border-white/15 flex items-center gap-2.5">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-jaune text-nuit shadow-sm">
                <Icone nom="qualite" size={18} weight="bold" />
              </div>
              <div>
                <p className="text-[0.8125rem] font-bold text-blanc leading-tight">40+ ans d&apos;expérience</p>
                <p className="text-[0.625rem] uppercase tracking-wider text-brume">Transmission & Rigueur</p>
              </div>
            </div>
          </div>
        </div>

        <nav aria-label="Les métiers de nos chantiers" className="lg:col-span-6 lg:col-start-7">
          <p className="cote text-[1rem] uppercase tracking-[0.14em] text-ciel">Les métiers de nos chantiers</p>
          <ol className="revele-groupe mt-6">
            {metiers.map((m, i) => (
              <li key={m.id}>
                <Link
                  href={`/carrieres?metier=${m.id}#candidature`}
                  className="group/metier flex items-baseline gap-5 py-2.5 sm:py-3"
                >
                  <span className="w-8 shrink-0 cote text-[0.9375rem] text-ciel chiffres-tabulaires">{String(i + 1).padStart(2, "0")}</span>
                  <span className="titre text-[clamp(1.875rem,1.3rem+2vw,3rem)] leading-[0.95] text-blanc/85 transition-colors duration-300 group-hover/metier:text-jaune">
                    {m.titre}
                  </span>
                  <Icone
                    nom="fleche"
                    size={24}
                    weight="bold"
                    className="shrink-0 -translate-x-2 self-center text-jaune opacity-0 transition-[opacity,translate] duration-300 group-hover/metier:translate-x-0 group-hover/metier:opacity-100 group-focus-visible/metier:opacity-100"
                  />
                  <span className="sr-only">, postuler</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
      <Profil couleur="text-jaune" forme="terrain" arriere="text-royal" />
    </section>
  );
}

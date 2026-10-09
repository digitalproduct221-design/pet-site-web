import Link from "next/link";
import { metiers } from "@/content/site";
import { BoutonLien } from "@/components/ui/Bouton";
import { Icone } from "@/components/ui/Icone";
import { Motif } from "@/components/ui/Motif";
import { PhotoCadre } from "@/components/ui/PhotoCadre";
import { Profil } from "@/components/ui/Profil";
import { TitreSection } from "@/components/ui/TitreSection";

/**
 * « Rejoignez nos équipes » : les métiers de nos chantiers composés en grand,
 * comme un tableau de chantier ; chacun mène à la candidature, métier prérempli.
 * Aucune offre inventée : ce sont les métiers que nous exerçons.
 */
export function Carrieres() {
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
          <PhotoCadre
            photo="poseConduiteTopographie"
            ratio="aspect-[16/10]"
            sizes="(min-width: 1024px) 36vw, 100vw"
            voile="leger"
            equerres
            decalage={12}
            className="mt-12 hidden lg:block"
          />
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

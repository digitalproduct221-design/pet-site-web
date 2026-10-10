import Image from "next/image";
import { engagementsCles } from "@/content/site";
import { photos, type PhotoId } from "@/content/photos";
import { Icone } from "@/components/ui/Icone";
import { Profil } from "@/components/ui/Profil";
import { TitreSection } from "@/components/ui/TitreSection";

// Une photo par engagement : elle change quand on ouvre l'engagement.
const illustrations: PhotoId[] = ["niveleuseVoirie", "poseConduiteTopographie", "terrassementEngins", "trancheeLotissement"];

/**
 * « Pourquoi PET ? » en accordéon : quatre engagements, un seul ouvert à la fois
 * (<details name> natif, sans JavaScript), et une grande photo qui suit
 * l'engagement ouvert (sélecteur :has en CSS).
 */
export function Pourquoi() {
  return (
    <section aria-labelledby="titre-pourquoi" className="pourquoi relative bg-blanc pb-28 pt-20 lg:pb-40 lg:pt-28">
      <div className="conteneur grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <div className="revele">
            <TitreSection
              id="titre-pourquoi"
              titre="Pourquoi choisir PET ?"
              intro="Parce qu'un chantier se gagne sur le terrain : des équipes qualifiées, des engins entretenus et une parole tenue."
            />
          </div>
          <div className="mt-10 grid gap-3">
            {engagementsCles.map((e, i) => (
              <details key={e.titre} name="pourquoi" open={i === 0} className="accordeon group/acc rounded-panneau bg-sable px-5 transition-colors open:bg-nuit open:text-blanc sm:px-6">
                <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 py-4 [&::-webkit-details-marker]:hidden">
                  <Icone nom={e.icone} size={30} weight="regular" className="shrink-0 text-royal group-open/acc:text-jaune" />
                  <span className="flex-1 titre text-[1.625rem] leading-none text-nuit group-open/acc:text-blanc sm:text-[1.875rem]">{e.titre}</span>
                  {/* La croix tournée de 45° fait un « + » ; ouverte, elle redevient une croix */}
                  <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-blanc text-nuit transition-colors group-open/acc:bg-jaune">
                    <Icone nom="fermer" size={18} weight="bold" className="rotate-45 transition-transform duration-300 group-open/acc:rotate-90" />
                  </span>
                </summary>
                <p className="max-w-[34rem] pb-6 pl-[2.875rem] text-[1.0625rem] leading-relaxed text-brume">{e.texte}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Photo qui suit l'engagement ouvert */}
        <div className="relative hidden aspect-[4/5] overflow-hidden rounded-chantier bg-sable-soutenu lg:col-span-5 lg:col-start-8 lg:block">
          {illustrations.map((id, i) => {
            const p = photos[id];
            return (
              <Image
                key={id}
                src={p.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 1px"
                className={`pourquoi-photo pourquoi-photo-${i + 1} object-cover`}
                style={{ objectPosition: p.focale }}
              />
            );
          })}
          <span aria-hidden className="absolute inset-0 bg-(image:--voile-photo)" />
        </div>
      </div>
      <Profil couleur="text-sable" forme="terrain" miroir />
    </section>
  );
}

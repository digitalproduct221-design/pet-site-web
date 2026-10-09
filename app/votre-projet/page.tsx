import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { besoins } from "@/content/besoins";
import { photos } from "@/content/photos";
import { domaineParSlug, methode } from "@/content/site";
import { EnTetePage } from "@/components/ui/EnTetePage";
import { BoutonLien } from "@/components/ui/Bouton";
import { Icone } from "@/components/ui/Icone";
import { Motif } from "@/components/ui/Motif";
import { PhotoCadre } from "@/components/ui/PhotoCadre";
import { Profil } from "@/components/ui/Profil";
import { NavBesoins } from "@/components/projet/NavBesoins";
import { AppelFinal } from "@/components/accueil/AppelFinal";

export const metadata: Metadata = {
  title: "Votre projet",
  description:
    "Construire, viabiliser, amener l'eau, assainir, bâtir un ouvrage en béton armé ou réhabiliter : ce que PET réalise pour vous, ce qu'il faut préparer et comment nous avançons.",
  alternates: { canonical: "/votre-projet" },
};

/**
 * « Votre projet » : on entre par le besoin, pas par l'organigramme.
 * Un sélecteur en photos, une barre qui suit la lecture, puis chaque besoin :
 * ce que nous réalisons, ce qu'il faut préparer, et un devis prérempli.
 */
export default function PageVotreProjet() {
  return (
    <>
      <EnTetePage
        titre="Votre projet"
        intro="Dites-nous ce que vous voulez réaliser. Pour chaque besoin : ce que nous faisons, ce qu'il faut préparer et comment nous avançons ensemble."
        ariane={[{ titre: "Votre projet" }]}
        photo="niveleuseVoirie"
      >
        <BoutonLien href="#besoins">Choisir mon besoin</BoutonLien>
        <BoutonLien href="/contact#devis" variante="contour-clair">
          Demander un devis
        </BoutonLien>
      </EnTetePage>

      {/* Sélecteur : six besoins en photos */}
      <section id="besoins" aria-labelledby="titre-besoins" className="relative isolate overflow-hidden bg-sable py-16 lg:py-24">
        <Motif type="courbes" className="text-royal" opacite={0.09} />
        <div className="conteneur">
          <h2 id="titre-besoins" className="revele titre text-titre-l text-nuit">
            Que voulez-vous réaliser&nbsp;?
          </h2>
          <ul className="revele-groupe mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
            {besoins.map((b, i) => {
              const p = photos[b.photo];
              return (
                <li key={b.slug}>
                  <a href={`#${b.slug}`} className="group/besoin relative block aspect-[4/3] overflow-hidden rounded-panneau bg-nuit text-blanc">
                    <Image
                      src={p.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[900ms] ease-chantier group-hover/besoin:scale-[1.05]"
                      style={{ objectPosition: p.focale }}
                    />
                    <span aria-hidden className="absolute inset-0 voile-carte" />
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 lg:p-6">
                      <span>
                        <span className="cote text-[0.9375rem] text-jaune chiffres-tabulaires">{String(i + 1).padStart(2, "0")}</span>
                        <span className="mt-1 block titre text-[1.75rem] leading-[0.95]">{b.titre}</span>
                        <span className="mt-2 block max-w-[22rem] text-[0.9375rem] leading-snug text-blanc/85">{b.question}</span>
                      </span>
                      <span
                        aria-hidden
                        className="grid size-11 shrink-0 place-items-center rounded-full bg-nuit/55 transition-colors group-hover/besoin:bg-jaune group-hover/besoin:text-nuit"
                      >
                        <Icone nom="fleche" size={20} weight="bold" className="rotate-90" />
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <NavBesoins />

      {/* Un bloc par besoin, photo et texte en alternance */}
      {besoins.map((b, i) => {
        const domaine = domaineParSlug(b.domaine);
        const inverse = i % 2 === 1;
        return (
          <section
            key={b.slug}
            id={b.slug}
            aria-labelledby={`titre-${b.slug}`}
            className={`scroll-mt-[calc(var(--header-h-compact)+4.5rem)] py-16 lg:py-24 ${inverse ? "bg-sable" : "bg-blanc"}`}
          >
            <div className="conteneur grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
              <div className={`relative lg:col-span-6 ${inverse ? "lg:order-2 lg:col-start-7" : ""}`}>
                <PhotoCadre photo={b.photo} ratio="aspect-[5/4]" sizes="(min-width: 1024px) 46vw, 100vw" voile="leger" equerres={i === 0} decalage={12} />
                <span
                  aria-hidden
                  className={`absolute -top-8 titre text-[clamp(5rem,3rem+6vw,8.5rem)] leading-none text-jaune [-webkit-text-stroke:2px_var(--color-nuit)] ${inverse ? "-left-2 lg:-left-8" : "-right-2 lg:-right-8"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className={`revele lg:col-span-5 ${inverse ? "lg:order-1" : "lg:col-start-8"}`}>
                <p className="cote text-[1rem] text-royal">{b.question}</p>
                <h2 id={`titre-${b.slug}`} className="mt-3 titre text-titre-l text-nuit">
                  {b.titre}
                </h2>

                <h3 className="mt-8 cote text-[0.9375rem] uppercase tracking-[0.12em] text-encre-douce">Ce que nous réalisons</h3>
                <ul className="mt-4 grid gap-2.5">
                  {b.prestations.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[1.0625rem] text-encre">
                      <span aria-hidden className="mt-[0.6em] size-2 shrink-0 rounded-[1px] bg-jaune" />
                      {t}
                    </li>
                  ))}
                </ul>

                <div className={`mt-8 rounded-panneau p-5 sm:p-6 ${inverse ? "bg-blanc" : "bg-sable"}`}>
                  <h3 className="flex items-center gap-2.5 cote text-[1.0625rem] text-nuit">
                    <Icone nom="liste" size={22} className="text-royal" />
                    À préparer pour votre demande
                  </h3>
                  <ul className="mt-3 grid gap-2 text-[1rem] text-encre-douce">
                    {b.preparer.map((t) => (
                      <li key={t} className="flex items-start gap-3">
                        <Icone nom="succes" size={18} weight="fill" className="mt-[0.2em] shrink-0 text-royal" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <BoutonLien href={`/contact?besoin=${b.slug}#devis`}>Demander un devis</BoutonLien>
                  {domaine ? (
                    <Link
                      href={`/savoir-faire/${domaine.slug}`}
                      className="inline-flex items-center gap-2 cote text-[1.0625rem] text-nuit underline decoration-jaune decoration-[3px] underline-offset-[6px] hover:text-royal"
                    >
                      Notre savoir-faire&nbsp;: {domaine.titre}
                      <Icone nom="fleche" size={18} weight="bold" />
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Comment nous avançons */}
      <section aria-labelledby="titre-etapes" className="sur-sombre profondeur relative isolate overflow-hidden pb-28 pt-20 text-blanc lg:pb-36 lg:pt-28">
        <Motif type="plan" className="text-brume" opacite={0.12} />
        <div className="conteneur">
          <h2 id="titre-etapes" className="revele max-w-[40rem] titre text-titre-l text-blanc">
            Comment nous avançons, quel que soit le projet
          </h2>
          <ol className="revele-groupe mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {methode.map((m, i) => (
              <li key={m.titre} className="relative">
                <span className="titre text-[4rem] leading-none text-jaune chiffres-tabulaires">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 titre text-[1.75rem] leading-none text-blanc">{m.titre}</h3>
                <p className="mt-3 max-w-[18rem] text-[1rem] leading-relaxed text-brume">{m.texte}</p>
              </li>
            ))}
          </ol>
        </div>
        <Profil couleur="text-jaune" forme="talus" arriere="text-royal" />
      </section>

      <AppelFinal />
    </>
  );
}

import Image from "next/image";
import { photos } from "@/content/photos";
import { BoutonLien } from "@/components/ui/Bouton";
import { Icone } from "@/components/ui/Icone";

/**
 * Mot du Directeur Général sur la page d'accueil :
 * Met en valeur la direction sur le terrain (panneau officiel de chantier Meckhé / AFD / SETEC),
 * la vision d'excellence et l'engagement environnemental et sécuritaire de PET.
 */
export function MotDirecteur() {
  const photo = photos.directeurBureau;

  return (
    <section
      id="mot-du-directeur"
      aria-labelledby="titre-mot-directeur"
      className="relative overflow-hidden bg-gradient-to-b from-sable-100/60 via-blanc to-blanc py-20 sm:py-28 lg:py-32"
    >
      {/* Motifs décoratifs discrets */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-royal/5 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-jaune/10 blur-3xl"
      />

      <div className="conteneur relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Photo du Directeur avec cadre esthétique irrégulier et taille affinée */}
          <div className="relative mx-auto w-full max-w-[290px] sm:max-w-[320px] lg:col-span-5 lg:max-w-[350px]">
            {/* 1. Cadre décoratif asymétrique d'arrière-plan avec dégradé royal & or */}
            <div
              aria-hidden
              className="absolute -inset-3 sm:-inset-4 rounded-[2.75rem_1rem_3.25rem_1.25rem] -rotate-2 bg-gradient-to-br from-royal via-ciel/40 to-jaune/40 opacity-70 transition-transform duration-500 group-hover:rotate-0"
            />

            {/* 2. Filet géométrique d'architecte décalé */}
            <div
              aria-hidden
              className="absolute -inset-1.5 sm:-inset-2 rounded-[1.25rem_3rem_1rem_2.75rem] rotate-1 border-2 border-royal/35 pointer-events-none"
            />

            {/* 3. Cadre principal à découpe organique asymétrique et ombre profonde */}
            <div className="group relative overflow-hidden rounded-[2.5rem_1rem_3.25rem_1rem] bg-nuit shadow-[0_20px_50px_rgba(10,34,64,0.22)] ring-4 ring-white">
              <Image
                src={photo.src}
                alt="Directeur Général de PARTENAIRE ENTREPRISE TRAVAUX SUARL dans son bureau de direction à Dakar"
                width={720}
                height={814}
                placeholder="blur"
                className="h-[21rem] sm:h-[24rem] lg:h-[26rem] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 290px, (max-width: 1024px) 320px, 350px"
              />

              {/* Voile dégradé subtil avec cartouche de direction */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-nuit via-nuit/75 to-transparent p-4 sm:p-5 text-blanc">
                <div className="flex items-center gap-2 text-jaune">
                  <Icone nom="qualite" size={16} weight="bold" />
                  <span className="cote text-[0.75rem] uppercase tracking-[0.14em] font-bold">Direction Générale</span>
                </div>
                <p className="mt-1 font-display font-extrabold text-[1rem] sm:text-[1.0625rem] text-blanc leading-snug">
                  PARTENAIRE ENTREPRISE TRAVAUX SUARL
                </p>
                <p className="mt-0.5 text-[0.8125rem] text-brume">
                  Siège social · Dakar, Sénégal
                </p>
              </div>
            </div>

            {/* 4. Pastille flottante prestigieuse */}
            <div className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-3 rounded-2xl bg-blanc/95 backdrop-blur-md px-3.5 py-2.5 shadow-xl border border-nuit/10 flex items-center gap-2.5 max-w-[15rem]">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-royal text-blanc shadow-sm">
                <Icone nom="environnement" size={20} weight="bold" />
              </div>
              <div>
                <p className="cote text-[0.6875rem] uppercase tracking-[0.08em] text-encre-douce">Fondateur & Direction</p>
                <p className="text-[0.8125rem] font-bold text-nuit leading-tight">Excellence & Vision BTP</p>
              </div>
            </div>
          </div>

          {/* Discours et vision */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-royal/10 px-4 py-1.5 text-royal mb-4">
              <span className="size-2 rounded-full bg-royal animate-pulse" />
              <span className="cote text-[0.8125rem] uppercase tracking-[0.16em] font-bold">Le Mot du Directeur</span>
            </div>

            <h2
              id="titre-mot-directeur"
              className="titre text-[clamp(2rem,1.5rem+2.2vw,3.25rem)] leading-[1.05] text-nuit"
            >
              « Votre allié de confiance pour des solutions sûres et respectueuses des normes environnementales. »
            </h2>

            <div className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed text-encre-600 sm:text-[1.125rem]">
              <p>
                Depuis la fondation de <strong className="text-nuit font-semibold">PARTENAIRE ENTREPRISE TRAVAUX SUARL</strong> en 2016, notre priorité absolue est d&apos;offrir à nos maîtres d&apos;ouvrage bien plus qu&apos;une simple prestation de travaux : un véritable partenariat technique fondé sur la rigueur, l&apos;intégrité et la fiabilité opérationnelle.
              </p>
              <p>
                Sur l&apos;ensemble du territoire sénégalais, nous répondons aux défis les plus exigeants — qu&apos;il s&apos;agisse de réseaux d&apos;adduction d&apos;eau et d&apos;assainissement, d&apos;ouvrages de génie civil et de bâtiment, ou de projets environnementaux structurants financés par des bailleurs internationaux tels que l&apos;<strong>Agence Française de Développement (AFD)</strong> sous la supervision de bureaux d&apos;ingénierie comme <strong>SETEC</strong>.
              </p>
              <p>
                Grâce à des équipes cumulant plus de 40 ans d&apos;expérience, des équipements régulièrement modernisés et une technologie topographique GNSS de haute précision, nous bâtissons durablement tout en préservant notre environnement.
              </p>
            </div>

            {/* Repères forts */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-nuit/10">
              <div className="rounded-xl bg-white p-3.5 border border-nuit/5 shadow-sm">
                <p className="titre text-[1.625rem] text-royal leading-none">2016</p>
                <p className="mt-1 cote text-[0.75rem] uppercase tracking-[0.08em] text-encre-douce">Année de fondation</p>
              </div>
              <div className="rounded-xl bg-white p-3.5 border border-nuit/5 shadow-sm">
                <p className="titre text-[1.625rem] text-royal leading-none">40+ ans</p>
                <p className="mt-1 cote text-[0.75rem] uppercase tracking-[0.08em] text-encre-douce">Expérience cumulée</p>
              </div>
              <div className="rounded-xl bg-white p-3.5 border border-nuit/5 shadow-sm col-span-2 sm:col-span-1">
                <p className="titre text-[1.625rem] text-jaune-profond leading-none">100 %</p>
                <p className="mt-1 cote text-[0.75rem] uppercase tracking-[0.08em] text-encre-douce">Normes et sécurité</p>
              </div>
            </div>

            {/* Signature & CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4">
              <div>
                <p className="font-display font-black text-[1.25rem] text-nuit tracking-tight">
                  La Direction Générale
                </p>
                <p className="cote text-[0.875rem] text-encre-douce">
                  PARTENAIRE ENTREPRISE TRAVAUX SUARL
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <BoutonLien href="/a-propos" variante="contour">
                  Découvrir notre histoire
                </BoutonLien>
                <BoutonLien href="/contact#devis" variante="primaire">
                  Estimer un projet
                </BoutonLien>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

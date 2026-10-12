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
  const photo = photos.directeurChantier;

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
          {/* Photo du Directeur avec cadre de chantier et badge de terrain */}
          <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            {/* Arrière-plan architectural décalé */}
            <div
              aria-hidden
              className="absolute -inset-2.5 rounded-2xl bg-gradient-to-tr from-nuit via-royal to-ciel opacity-15 sm:-inset-4 sm:rounded-3xl"
            />

            <div className="relative overflow-hidden rounded-2xl bg-nuit shadow-2xl sm:rounded-3xl border border-white/20">
              <Image
                src={photo.src}
                alt="Directeur Général de PET SUARL sur chantier d'infrastructure au Sénégal"
                width={800}
                height={1067}
                placeholder="blur"
                className="h-[28rem] sm:h-[32rem] lg:h-[36rem] w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />

              {/* Voile dégradé avec métadonnées de terrain */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-nuit via-nuit/85 to-transparent p-5 sm:p-6 text-blanc">
                <div className="flex items-center gap-2 text-jaune">
                  <Icone nom="casque" size={18} weight="bold" />
                  <span className="cote text-[0.8125rem] uppercase tracking-[0.14em]">Présence active sur le terrain</span>
                </div>
                <p className="mt-1 font-display font-extrabold text-[1.125rem] text-blanc leading-snug">
                  Direction Générale · PET SUARL
                </p>
                <p className="mt-0.5 text-[0.875rem] text-brume">
                  Chantier d&apos;infrastructure environnementale au Sénégal (Financement AFD / Contrôle SETEC)
                </p>
              </div>
            </div>

            {/* Pastille flottante de garantie environnementale */}
            <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-4 rounded-xl bg-blanc/95 backdrop-blur-md p-3.5 sm:p-4 shadow-xl border border-nuit/10 flex items-center gap-3 max-w-[17rem]">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-royal text-blanc">
                <Icone nom="environnement" size={24} weight="bold" />
              </div>
              <div>
                <p className="cote text-[0.75rem] uppercase tracking-[0.1em] text-encre-douce">Engagement QHSE</p>
                <p className="text-[0.875rem] font-bold text-nuit leading-tight">Normes environnementales et de sécurité</p>
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

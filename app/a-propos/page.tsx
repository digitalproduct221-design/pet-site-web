import type { Metadata } from "next";
import Image from "next/image";
import { photos } from "@/content/photos";
import { partenairesOfficiels } from "@/content/partenaires";
import { NOM, SIGLE, valeurs } from "@/content/site";
import { EnTetePage } from "@/components/ui/EnTetePage";
import { BoutonLien } from "@/components/ui/Bouton";
import { Icone } from "@/components/ui/Icone";
import { AppelFinal } from "@/components/accueil/AppelFinal";

export const metadata: Metadata = {
  title: "À propos | Mot du directeur, histoire et partenaires",
  description:
    "Découvrez l'histoire de PARTENAIRE ENTREPRISE TRAVAUX SUARL (PET), le mot de la direction générale, nos partenaires institutionnels (AFD, SETEC, Commune de Meckhé) et nos équipes au Sénégal.",
  alternates: { canonical: "/a-propos" },
  openGraph: {
    title: `À propos | ${SIGLE}, ${NOM}`,
    description:
      "Histoire depuis 2016, mot de la direction générale, partenaires institutionnels et expertise terrain de PET SUARL au Sénégal.",
    url: "/a-propos",
    images: [{ url: "/images/chantiers/directeur-chantier-meckhe.jpg", width: 800, height: 1067, alt: `Direction Générale ${SIGLE}` }],
  },
};

const etapesHistoire = [
  {
    annee: "2016",
    titre: "Fondation de l'entreprise",
    description:
      "Création de PARTENAIRE ENTREPRISE TRAVAUX SUARL par des ingénieurs et techniciens chevronnés cumulant plus de 40 ans d'expérience dans les métiers du BTP, de l'hydraulique et du génie civil au Sénégal.",
    icone: "histoire",
  },
  {
    annee: "2018",
    titre: "Structuration et montée en puissance",
    description:
      "Constitution d'un parc matériel performant (engins de terrassement, niveleuses, compacteurs) et acquisition de compétences spécialisées dans la pose de canalisations en fonte et la viabilisation de plateformes.",
    icone: "engins",
  },
  {
    annee: "2021",
    titre: "Révolution topographique GNSS",
    description:
      "Intégration d'équipements topographiques de haute précision par station GNSS mobile, permettant une implantation millimétrique des ouvrages et un contrôle d'exécution en temps réel.",
    icone: "local",
  },
  {
    annee: "Aujourd'hui",
    titre: "Projets d'envergure & engagements environnementaux",
    description:
      "Réalisation de projets structurants majeurs, tels que les installations de stockage de déchets (ISDND) et les grands réseaux d'eau, supervisés par des institutions internationales comme l'AFD et SETEC.",
    icone: "environnement",
  },
];

export default function PageAPropos() {
  const photoDirecteur = photos.directeurChantier;
  const photoTopographie = photos.topographieGps;
  const photoGeometres = photos.geometresImplantation;

  return (
    <>
      <EnTetePage
        suite="text-blanc"
        titre="À propos de PET"
        intro={`${NOM} (${SIGLE}) : votre allié de confiance pour des solutions sûres et respectueuses des normes environnementales sur l'ensemble du territoire sénégalais.`}
        ariane={[
          { titre: "Accueil", href: "/" },
          { titre: "À propos" },
        ]}
        photo="directeurChantier"
      />

      {/* 1. Mot du Directeur Général */}
      <section id="mot-directeur" aria-labelledby="titre-mot-dir" className="bg-blanc py-16 sm:py-24 lg:py-28">
        <div className="conteneur">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Photo officielle de la direction sur chantier */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl bg-nuit shadow-2xl border border-nuit/10">
                <Image
                  src={photoDirecteur.src}
                  alt="Directeur Général de PET sur chantier Meckhé"
                  width={800}
                  height={1067}
                  priority
                  placeholder="blur"
                  className="h-[30rem] sm:h-[34rem] w-full object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-nuit via-nuit/80 to-transparent p-6 text-blanc">
                  <div className="flex items-center gap-2 text-jaune">
                    <Icone nom="casque" size={18} weight="bold" />
                    <span className="cote text-[0.8125rem] uppercase tracking-[0.12em]">Terrain & Responsabilité</span>
                  </div>
                  <p className="mt-1 font-display font-extrabold text-[1.25rem] text-blanc leading-snug">
                    La Direction Générale
                  </p>
                  <p className="mt-0.5 text-[0.875rem] text-brume">
                    Sur le chantier d&apos;aménagement ISDND Meckhé (Financement AFD / SETEC)
                  </p>
                </div>
              </div>
            </div>

            {/* Texte et vision de la direction */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-royal/10 px-4 py-1.5 text-royal mb-4">
                <Icone nom="valeurs" size={16} weight="bold" />
                <span className="cote text-[0.8125rem] uppercase tracking-[0.16em] font-bold">Le Mot du Directeur</span>
              </div>

              <h2 id="titre-mot-dir" className="titre text-[clamp(2.2rem,1.6rem+2.5vw,3.5rem)] leading-[1.02] text-nuit">
                « Bâtir le Sénégal avec rigueur, intégrité et respect scrupuleux de l&apos;environnement. »
              </h2>

              <div className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed text-encre-600 sm:text-[1.125rem]">
                <p>
                  Chers partenaires, maîtres d&apos;ouvrage et clients,
                </p>
                <p>
                  Depuis notre création en 2016, <strong>PARTENAIRE ENTREPRISE TRAVAUX SUARL (PET)</strong> est animée par une conviction fondamentale : la réussite d&apos;un projet de BTP ne se mesure pas seulement au béton coulé ou aux canalisations posées, mais à la confiance durable tissée avec ceux qui nous mandatent.
                </p>
                <p>
                  Qu&apos;il s&apos;agisse de la construction d&apos;infrastructures environnementales financées par des bailleurs internationaux exigeants comme l&apos;<strong>Agence Française de Développement (AFD)</strong> sous le contrôle rigoureux du bureau d&apos;ingénierie <strong>SETEC</strong>, de réseaux d&apos;adduction d&apos;eau ou de bâtiments complexes, notre méthode demeure inflexible :
                </p>
                <ul className="grid gap-2.5 pt-2 text-[1.0625rem] text-encre-900 font-medium">
                  <li className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-royal" />
                    <span>Une sécurité absolue pour nos équipes et les riverains sur chaque chantier.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-royal" />
                    <span>L&apos;usage de technologies de pointe, dont notre topographie GNSS de précision centimétrique.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-royal" />
                    <span>Le respect strict des normes environnementales et des calendriers de livraison.</span>
                  </li>
                </ul>
                <p className="pt-2">
                  Nous sommes fiers de mettre quotidiennement l&apos;expérience cumulée de plus de 40 ans de notre équipe au service des collectivités territoriales, des industriels et des investisseurs du Sénégal.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-nuit/10 flex items-center justify-between">
                <div>
                  <p className="font-display font-extrabold text-[1.25rem] text-nuit">
                    La Direction Générale
                  </p>
                  <p className="cote text-[0.875rem] text-encre-douce">
                    PARTENAIRE ENTREPRISE TRAVAUX SUARL
                  </p>
                </div>
                <div className="hidden sm:block">
                  <span className="inline-flex items-center gap-2 rounded-full bg-sable px-4 py-2 cote text-[0.8125rem] text-nuit">
                    <Icone nom="qualite" size={18} className="text-royal" weight="bold" />
                    Fondée en 2016 · Dakar, Sénégal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Notre Histoire */}
      <section id="histoire" aria-labelledby="titre-histoire" className="bg-sable-100/50 py-16 sm:py-24 lg:py-28 border-y border-nuit/5">
        <div className="conteneur">
          <div className="max-w-2xl">
            <p className="cote text-[0.875rem] uppercase tracking-[0.16em] text-royal font-bold">Origine et trajectoire</p>
            <h2 id="titre-histoire" className="titre mt-2 text-[clamp(2rem,1.5rem+2vw,3rem)] leading-none text-nuit">
              Notre histoire : bâtie sur l&apos;expérience du terrain
            </h2>
            <p className="mt-4 text-[1.125rem] leading-relaxed text-encre-600">
              De notre création en 2016 à nos réalisations d&apos;envergure actuelles, découvrez comment PET s&apos;est imposée comme un acteur incontournable du BTP et du génie civil au Sénégal.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {etapesHistoire.map((etape) => (
              <div
                key={etape.annee}
                className="relative flex flex-col rounded-2xl bg-white p-6 sm:p-7 shadow-sm border border-nuit/10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-[2rem] text-royal leading-none">
                    {etape.annee}
                  </span>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-sable text-nuit">
                    <Icone nom={etape.icone} size={20} weight="bold" />
                  </div>
                </div>
                <h3 className="titre mt-5 text-[1.3125rem] leading-snug text-nuit">
                  {etape.titre}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-encre-600">
                  {etape.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Nos Partenaires & Références */}
      <section id="partenaires" aria-labelledby="titre-partenaires" className="bg-blanc py-16 sm:py-24 lg:py-28">
        <div className="conteneur">
          <div className="max-w-2xl">
            <p className="cote text-[0.875rem] uppercase tracking-[0.16em] text-royal font-bold">Confiance & Rigueur</p>
            <h2 id="titre-partenaires" className="titre mt-2 text-[clamp(2rem,1.5rem+2vw,3rem)] leading-none text-nuit">
              Nos partenaires institutionnels & techniques
            </h2>
            <p className="mt-4 text-[1.125rem] leading-relaxed text-encre-600">
              PET collabore avec des bailleurs de fonds de premier plan, des ministères, des collectivités territoriales et des bureaux d&apos;ingénierie reconnus au Sénégal et à l&apos;international.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partenairesOfficiels.map((p) => (
              <div
                key={p.sigle}
                className="rounded-2xl border border-nuit/10 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:border-royal/40 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-md bg-royal/10 px-3 py-1 font-display font-black text-[1.125rem] text-royal tracking-wide">
                      {p.sigle}
                    </span>
                    <span className="cote text-[0.75rem] uppercase tracking-[0.1em] text-encre-douce">
                      {p.type === "bailleur"
                        ? "Bailleur"
                        : p.type === "maitrise-oeuvre"
                        ? "Maîtrise d'œuvre"
                        : p.type === "cooperation"
                        ? "Coopération"
                        : "Maître d'ouvrage"}
                    </span>
                  </div>

                  <h3 className="titre mt-4 text-[1.375rem] leading-snug text-nuit">
                    {p.nom}
                  </h3>
                  <p className="mt-1 cote text-[0.875rem] text-royal font-semibold">
                    {p.role}
                  </p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-encre-600">
                    {p.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-nuit/5">
                  <p className="cote text-[0.75rem] uppercase tracking-[0.08em] text-encre-douce">Projet documenté :</p>
                  <p className="mt-0.5 text-[0.875rem] font-semibold text-nuit">{p.projet}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Témoignage terrain / encart vérifié */}
          <div className="mt-10 rounded-2xl bg-sable p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-royal text-blanc">
                <Icone nom="qualite" size={24} weight="bold" />
              </div>
              <div>
                <p className="font-bold text-nuit text-[1.0625rem]">Transparence et traçabilité de nos références</p>
                <p className="text-[0.9375rem] text-encre-600">Tous les partenariats cités correspondent à des réalisations de terrain vérifiables et documentées.</p>
              </div>
            </div>
            <BoutonLien href="/realisations" variante="contour" className="shrink-0">
              Voir nos réalisations en images
            </BoutonLien>
          </div>
        </div>
      </section>

      {/* 4. Équipes techniques & Topographie GNSS */}
      <section id="equipe" aria-labelledby="titre-equipe" className="bg-gradient-to-b from-sable-100/40 to-blanc py-16 sm:py-24 lg:py-28 border-t border-nuit/5">
        <div className="conteneur">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p className="cote text-[0.875rem] uppercase tracking-[0.16em] text-royal font-bold">Haute Précision & Compétences</p>
              <h2 id="titre-equipe" className="titre mt-2 text-[clamp(2rem,1.5rem+2vw,3rem)] leading-none text-nuit">
                Des équipes formées et équipées des technologies de pointe
              </h2>
              <p className="mt-5 text-[1.125rem] leading-relaxed text-encre-600">
                Sur nos chantiers, la précision millimétrique n&apos;est pas une option. Nos géomètres et topographes opèrent avec des récepteurs GNSS reliés en temps réel à des tablettes de terrain robustes.
              </p>
              <ul className="mt-6 space-y-3.5 text-[1.0625rem] text-encre-900">
                <li className="flex items-start gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-royal/10 text-royal mt-0.5">
                    <Icone nom="local" size={16} weight="bold" />
                  </span>
                  <span><strong>Implantation centimétrique</strong> des conduites d&apos;eau, radiers, caniveaux et pentes de terrassement.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-royal/10 text-royal mt-0.5">
                    <Icone nom="casque" size={16} weight="bold" />
                  </span>
                  <span><strong>Sécurité active</strong> : port obligatoire des EPI (gilets haute visibilité siglés PET, casques de protection, chaussures de sécurité).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-royal/10 text-royal mt-0.5">
                    <Icone nom="engins" size={16} weight="bold" />
                  </span>
                  <span><strong>Conducteurs d&apos;engins expérimentés</strong> sur pelles hydrauliques, niveleuses et chargeurs Caterpillar.</span>
                </li>
              </ul>
            </div>

            {/* Galerie des photos authentiques de topographie */}
            <div className="grid grid-cols-2 gap-4 lg:col-span-6">
              <div className="overflow-hidden rounded-2xl bg-nuit shadow-lg border border-nuit/10">
                <Image
                  src={photoTopographie.src}
                  alt="Topographe PET avec récepteur GNSS et tablette sur chantier"
                  width={800}
                  height={1067}
                  placeholder="blur"
                  className="h-72 sm:h-80 w-full object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="p-3 bg-nuit text-blanc text-[0.8125rem]">
                  <p className="font-bold text-jaune">Station GNSS mobile</p>
                  <p className="text-brume text-[0.75rem]">Relevé altimétrique et cotes de projet</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl bg-nuit shadow-lg border border-nuit/10">
                <Image
                  src={photoGeometres.src}
                  alt="Géomètres PET procédant à l'implantation précise sur chantier"
                  width={800}
                  height={1067}
                  placeholder="blur"
                  className="h-72 sm:h-80 w-full object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="p-3 bg-nuit text-blanc text-[0.8125rem]">
                  <p className="font-bold text-jaune">Équipe de géomètres</p>
                  <p className="text-brume text-[0.75rem]">Contrôle qualité d&apos;exécution des terrassements</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Valeurs clés */}
      <section id="valeurs" aria-labelledby="titre-valeurs" className="bg-blanc py-16 sm:py-20 border-t border-nuit/5">
        <div className="conteneur">
          <div className="text-center max-w-2xl mx-auto">
            <p className="cote text-[0.875rem] uppercase tracking-[0.16em] text-royal font-bold">Nos Engagements</p>
            <h2 id="titre-valeurs" className="titre mt-2 text-[clamp(2rem,1.5rem+2vw,3rem)] leading-none text-nuit">
              Sept principes inébranlables sur nos chantiers
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {valeurs.map((v) => (
              <div key={v.titre} className="rounded-xl border border-nuit/10 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2.5 text-royal font-bold">
                  <Icone nom="valeurs" size={18} />
                  <h3 className="titre text-[1.25rem] text-nuit">{v.titre}</h3>
                </div>
                <p className="mt-2 text-[0.9375rem] text-encre-600 leading-relaxed">{v.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AppelFinal />
    </>
  );
}

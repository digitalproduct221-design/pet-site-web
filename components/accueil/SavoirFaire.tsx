import Image from "next/image";
import Link from "next/link";
import { photos, type PhotoId } from "@/content/photos";
import { Icone, type NomIcone } from "@/components/ui/Icone";
import { Profil } from "@/components/ui/Profil";
import { TitreSection } from "@/components/ui/TitreSection";

type ExpertiseItem = {
  titre: string;
  slug: string;
  icone: NomIcone;
  photo: PhotoId;
  accroche: string;
  points: string[];
};

const expertises: ExpertiseItem[] = [
  {
    titre: "Bâtiment",
    slug: "batiment",
    icone: "batiment",
    photo: "batimentCommercialDakar",
    accroche: "Construction de bâtiments industriels, tertiaires et commerciaux de la conception à la réalisation.",
    points: [
      "Bâtiments tertiaires & commerciaux",
      "Élévation béton armé & gros œuvre",
      "Second œuvre & finitions soignées",
    ],
  },
  {
    titre: "Hydraulique et Assainissement",
    slug: "hydraulique",
    icone: "eau",
    photo: "epreuveHydraulique",
    accroche: "Infrastructures hydrauliques complètes, réseaux d'eau potable, canalisations et stations d'épuration.",
    points: [
      "Canalisations & réseaux de distribution",
      "Stations d'épuration & réservoirs d'eau",
      "Bassins de stockage des eaux usées",
    ],
  },
  {
    titre: "Génie civil",
    slug: "genie-civil",
    icone: "genie-civil",
    photo: "ferraillageOuvrage",
    accroche: "Génie civil de l'eau, ouvrages d'art en béton armé, dalots et structures hydrauliques durables.",
    points: [
      "Ouvrages en béton armé & radiers",
      "Génie civil de l'eau & dalots préfabriqués",
      "Rénovation d'ouvrages d'art courants",
    ],
  },
  {
    titre: "Voirie et Réseaux Divers (VRD)",
    slug: "travaux-publics-vrd",
    icone: "route",
    photo: "voirieAsphalte",
    accroche: "Aménagement de voiries urbaines, pistes en latérite, viabilisation et terrassement de plateformes.",
    points: [
      "Voiries bitumées & pistes aménagées",
      "Terrassement & profilage d'infrastructures",
      "Caniveaux de drainage & réseaux divers",
    ],
  },
];

export function SavoirFaire() {
  return (
    <section id="savoir-faire" aria-labelledby="titre-savoir-faire" className="relative bg-sable pb-24 pt-20 lg:pb-36 lg:pt-28">
      <div className="conteneur">
        <div className="revele flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <TitreSection
            id="titre-savoir-faire"
            titre="Nos savoir-faire"
            intro="Des solutions complètes pour la gestion et l'aménagement des infrastructures au Sénégal, menées de l'étude à la livraison."
          />
          <Link
            href="/savoir-faire"
            className="inline-flex shrink-0 items-center gap-2 cote text-[1.0625rem] uppercase tracking-[0.04em] text-nuit underline decoration-jaune decoration-[3px] underline-offset-[6px] hover:text-royal"
          >
            Tous les savoir-faire
            <Icone nom="fleche" size={18} weight="bold" />
          </Link>
        </div>

        {/* Grille horizontale alignée des 4 expertises clés */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {expertises.map((item) => {
            const photo = photos[item.photo];
            return (
              <div
                key={item.slug}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-nuit text-blanc shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl border border-white/10"
              >
                {/* Image de fond avec zoom au survol */}
                <div className="relative h-56 w-full overflow-hidden sm:h-64">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={70}
                    placeholder="blur"
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                    style={{ objectPosition: photo.focale }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-nuit via-nuit/60 to-transparent" />
                  
                  {/* Badge icône d'expertise */}
                  <div className="absolute top-4 left-4 flex size-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-jaune shadow-md">
                    <Icone nom={item.icone} size={26} weight="bold" />
                  </div>
                </div>

                {/* Contenu textuel rédigé horizontalement de façon parfaitement lisible */}
                <div className="relative flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <h3 className="titre text-[1.5rem] sm:text-[1.625rem] leading-[1.08] text-blanc group-hover:text-jaune transition-colors">
                      {item.titre}
                    </h3>
                    <div className="mt-3 h-1 w-10 bg-jaune transition-all duration-300 group-hover:w-16" />
                    <p className="mt-4 text-[0.9375rem] leading-relaxed text-brume">
                      {item.accroche}
                    </p>

                    {/* Liste des prestations clés */}
                    <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-[0.8125rem] text-blanc/85 font-medium">
                      {item.points.map((pt, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="size-1.5 shrink-0 rounded-full bg-jaune" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 pt-2">
                    <Link
                      href={`/savoir-faire/${item.slug}`}
                      className="inline-flex items-center gap-2 cote text-[0.9375rem] font-bold text-jaune transition-all hover:text-white group/lien"
                    >
                      En savoir plus
                      <Icone nom="fleche" size={16} weight="bold" className="transition-transform group-hover/lien:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Profil couleur="text-nuit" forme="talus" />
    </section>
  );
}

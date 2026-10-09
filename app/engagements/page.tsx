import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { photos } from "@/content/photos";
import type { PhotoId } from "@/content/photos";
import { EnTetePage } from "@/components/ui/EnTetePage";
import { Icone } from "@/components/ui/Icone";
import { PhotoCadre } from "@/components/ui/PhotoCadre";
import { AppelFinal } from "@/components/accueil/AppelFinal";

export const metadata: Metadata = {
  title: "Engagements",
  description: "Sécurité, environnement, ancrage local et qualité : les engagements de PET sur ses chantiers à Dakar et au Sénégal.",
  alternates: { canonical: "/engagements" },
};

type Engagement = { id: string; titre: string; icone: string; photo: PhotoId; intro: string; points: string[] };

// Formulés à partir des valeurs de l'entreprise ; aucune certification n'est revendiquée.
const engagements: Engagement[] = [
  {
    id: "securite",
    titre: "Sécurité (QHSE)",
    icone: "securite",
    photo: "niveleuseVoirie",
    intro: "La sécurité est au centre de nos préoccupations : celle de nos équipes, de nos clients et des riverains de nos chantiers.",
    points: ["Port des équipements de protection : casques, gilets, chaussures de sécurité", "Balisage des fouilles et des zones de manœuvre des engins", "Consignes partagées avec chaque équipe avant le démarrage"],
  },
  {
    id: "environnement",
    titre: "Environnement",
    icone: "environnement",
    photo: "ferraillageOuvrage",
    intro: "Le respect des lieux fait partie de nos valeurs : un chantier doit laisser derrière lui un site propre et en ordre.",
    points: ["Remise en état des voiries et des abords après travaux", "Matériaux choisis pour durer, et donc moins remplacés", "Réseaux d'eau et d'assainissement qui préservent la ressource"],
  },
  {
    id: "local-emploi",
    titre: "Local et emploi",
    icone: "local",
    photo: "trancheeLotissement",
    intro: "PET est une entreprise sénégalaise, installée à Dakar, qui construit pour les territoires où elle travaille.",
    points: ["Des équipes de terrain qui transmettent leur savoir-faire", "Des offres d'emploi et des candidatures spontanées ouvertes à tous", "Des ouvrages utiles au quotidien : eau, assainissement, voiries"],
  },
  {
    id: "qualite",
    titre: "Qualité",
    icone: "qualite",
    photo: "conduiteOuvrage",
    intro: "Un personnel qualifié et des équipements régulièrement mis à niveau, pour des ouvrages conformes et durables.",
    points: ["Contrôles à chaque étape, du ferraillage à la réception", "Tenue des délais suivie avec le client", "Conseil dès l'étude pour choisir les bonnes solutions"],
  },
];

export default function PageEngagements() {
  return (
    <>
      <EnTetePage
        titre="Engagements"
        intro="Ce que nous promettons à nos clients, à nos équipes et aux territoires où nous travaillons."
        ariane={[{ titre: "Engagements" }]}
        photo="niveleuseVoirie"
      />

      <div className="bg-blanc py-20 lg:py-28">
        <div className="conteneur grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Sommaire collant */}
          <nav aria-label="Sommaire des engagements" className="hidden lg:col-span-3 lg:block">
            <ul className="sticky top-[calc(var(--header-h-compact)+2.5rem)] grid gap-1">
              {engagements.map((e) => (
                <li key={e.id}>
                  <Link href={`#${e.id}`} className="flex items-center gap-3 rounded-panneau px-4 py-3 cote text-[1.0625rem] text-nuit transition-colors hover:bg-sable hover:text-royal">
                    <Icone nom={e.icone} size={22} className="text-royal" />
                    {e.titre}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-24 lg:col-span-9 lg:gap-32">
            {engagements.map((e, i) => {
              const liste = (
                <ul className="mt-7 grid gap-3">
                  {e.points.map((p) => (
                    <li key={p} className={`flex items-start gap-3 text-[1.0625rem] leading-snug ${i % 2 === 1 ? "text-blanc" : "text-encre"}`}>
                      <Icone nom="succes" size={22} weight="fill" className={`mt-0.5 shrink-0 ${i % 2 === 1 ? "text-jaune" : "text-royal"}`} />
                      {p}
                    </li>
                  ))}
                </ul>
              );
              // Deux mises en page alternées : texte et photo côte à côte, puis panneau de verre sur photo.
              return i % 2 === 0 ? (
                <section key={e.id} id={e.id} aria-labelledby={`titre-${e.id}`} className="grid scroll-mt-28 gap-10 md:grid-cols-2 md:items-center md:gap-12">
                  <div className="revele">
                    <span className="grid size-14 place-items-center rounded-panneau bg-royal text-jaune ombre-tuile">
                      <Icone nom={e.icone} size={28} />
                    </span>
                    <h2 id={`titre-${e.id}`} className="mt-6 titre text-titre-l text-nuit">
                      {e.titre}
                    </h2>
                    <p className="mt-5 text-[1.125rem] leading-relaxed text-encre">{e.intro}</p>
                    {liste}
                  </div>
                  <PhotoCadre photo={e.photo} ratio="aspect-[4/5]" sizes="(min-width: 1024px) 34vw, (min-width: 768px) 45vw, 100vw" voile="leger" equerres={i === 0} decalage={12} />
                </section>
              ) : (
                <section
                  key={e.id}
                  id={e.id}
                  aria-labelledby={`titre-${e.id}`}
                  className="sur-sombre relative isolate flex min-h-[34rem] scroll-mt-28 items-end overflow-hidden rounded-panneau bg-nuit p-5 text-blanc sm:p-8 lg:p-10"
                >
                  <Image src={photos[e.photo].src} alt="" fill sizes="(min-width: 1024px) 70vw, 100vw" className="-z-10 object-cover" style={{ objectPosition: photos[e.photo].focale }} />
                  <span aria-hidden className="absolute inset-0 -z-10 voile-carte" />
                  <div className="revele verre-liquide w-full max-w-[36rem] rounded-panneau p-6 lg:p-8">
                    <span className="flex items-center gap-3">
                      <Icone nom={e.icone} size={28} className="text-jaune" />
                      <h2 id={`titre-${e.id}`} className="titre text-titre-m text-blanc">
                        {e.titre}
                      </h2>
                    </span>
                    <p className="mt-4 text-[1.0625rem] leading-relaxed text-blanc/90">{e.intro}</p>
                    {liste}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>

      <AppelFinal />
    </>
  );
}

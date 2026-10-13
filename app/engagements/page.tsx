import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { photos } from "@/content/photos";
import type { PhotoId } from "@/content/photos";
import { EnTetePage } from "@/components/ui/EnTetePage";
import { Icone } from "@/components/ui/Icone";
import { PhotoCadre } from "@/components/ui/PhotoCadre";
import { AvantApres } from "@/components/ui/AvantApres";
import { AppelFinal } from "@/components/accueil/AppelFinal";

export const metadata: Metadata = {
  title: "Engagements",
  description: "Sécurité, environnement, ancrage local et qualité : les engagements de PET sur ses chantiers à Dakar et au Sénégal.",
  alternates: { canonical: "/engagements" },
  openGraph: {
    title: "Engagements | PET SUARL Dakar",
    description: "Sécurité, environnement, ancrage local et qualité : les engagements de PET sur ses chantiers à Dakar et au Sénégal.",
    url: "/engagements",
    images: [{ url: "/images/chantiers/partenariat-chantier.jpg", width: 1376, height: 768, alt: "Engagements PET SUARL" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engagements | PET SUARL Dakar",
    description: "Sécurité, environnement, ancrage local et qualité : nos engagements sur le terrain.",
    images: ["/images/chantiers/partenariat-chantier.jpg"],
  },
};

type Engagement = { id: string; titre: string; icone: string; photo: PhotoId; intro: string; points: string[] };

// Formulés à partir des valeurs de l'entreprise ; aucune certification n'est revendiquée.
const engagements: Engagement[] = [
  {
    id: "environnement",
    titre: "Environnement et Développement durable",
    icone: "environnement",
    photo: "irrigationNiayes",
    intro: "Le respect des écosystèmes et le développement durable guident chacune de nos interventions au Sénégal : un chantier éco-responsable, propre et pérenne.",
    points: [
      "Gestion rigoureuse, tri et valorisation des déblais et déchets de chantier",
      "Protection des ressources en eau, des sols et de la biodiversité locale",
      "Ouvrages hydrauliques, VRD et assainissement conçus pour durer et préserver l'environnement",
    ],
  },
  {
    id: "delais",
    titre: "Respect des délais",
    icone: "delais",
    photo: "pilotageChantier",
    intro: "La tenue des délais est un engagement contractuel et d'honneur : un planning réaliste, scrupuleusement suivi et respecté jusqu'à la livraison.",
    points: [
      "Planning d'exécution détaillé avec jalons critiques dès la phase d'étude",
      "Points d'avancement hebdomadaires et transparence permanente avec le maître d'ouvrage",
      "Mobilisation réactive des équipes et du parc matériel pour sécuriser le calendrier",
    ],
  },
  {
    id: "securite",
    titre: "Sécurité (QHSE)",
    icone: "securite",
    photo: "equipePet",
    intro: "La sécurité est au centre de nos préoccupations : celle de nos équipes, de nos clients et des riverains de nos chantiers.",
    points: [
      "Port obligatoire des équipements de protection individuelle (EPI) siglés PET",
      "Balisage rigoureux des fouilles, tranchées et zones de manœuvre des engins",
      "Briefings sécurité (quarts d'heure sécurité) partagés avant chaque phase de travaux",
    ],
  },
  {
    id: "qualite",
    titre: "Qualité & Rigueur",
    icone: "qualite",
    photo: "controleQualiteBeton",
    intro: "Un personnel qualifié et des équipements régulièrement mis à niveau, pour des ouvrages conformes et durables.",
    points: [
      "Contrôles techniques à chaque étape, des essais béton (cône d'Abrams) à la réception",
      "Respect strict des normes sénégalaises et internationales du BTP",
      "Conseil technique dès l'étude pour optimiser la longévité des infrastructures",
    ],
  },
  {
    id: "local-emploi",
    titre: "Local et emploi",
    icone: "local",
    photo: "equipeEnMarche",
    intro: "PET est une entreprise sénégalaise, installée à Dakar, qui construit pour les territoires où elle travaille.",
    points: [
      "Des équipes de terrain locales qui transmettent leur savoir-faire",
      "Recrutement et formation continue aux métiers du bâtiment et des travaux publics",
      "Des ouvrages utiles au quotidien des populations : eau, assainissement, voiries",
    ],
  },
];

export default function PageEngagements() {
  return (
    <>
      <EnTetePage suite="text-blanc"
        titre="Engagements"
        intro="Ce que nous promettons à nos clients, à nos équipes et aux territoires où nous travaillons."
        ariane={[{ titre: "Engagements" }]}
        photo="partenariatChantier"
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
              const sectionEl = i % 2 === 0 ? (
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
                  <Image src={photos[e.photo].src} alt="" fill sizes="(min-width: 1024px) 70vw, 100vw" quality={75} placeholder="blur" className="-z-10 object-cover" style={{ objectPosition: photos[e.photo].focale }} />
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

              return (
                <div key={e.id} className="grid gap-12">
                  {sectionEl}
                  {e.id === "environnement" && (
                    <div className="mt-2">
                      <AvantApres
                        titre="Preuve par l'action : Réhabilitation de site"
                        sousTitre="Transformation environnementale à l'ISDND de Meckhé"
                        description="Un exemple concret de notre exigence environnementale : la transformation d'un terrain encombré de déchets bruts en un casier de stockage étanché et profilé aux normes internationales."
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AppelFinal />
    </>
  );
}

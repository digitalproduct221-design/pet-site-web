import type { Metadata } from "next";
import Image from "next/image";
import { photos } from "@/content/photos";
import { entreprise, valeurs } from "@/content/site";
import { EnTetePage } from "@/components/ui/EnTetePage";
import { BoutonLien } from "@/components/ui/Bouton";
import { Icone } from "@/components/ui/Icone";
import { PhotoCadre } from "@/components/ui/PhotoCadre";
import { AppelFinal } from "@/components/accueil/AppelFinal";

export const metadata: Metadata = {
  title: "L'entreprise",
  description:
    "PARTENAIRE ENTREPRISE TRAVAUX SUARL : entreprise de BTP tous corps d'état fondée à Dakar en 2016, portée par une équipe de plus de 40 ans d'expérience cumulée.",
  alternates: { canonical: "/entreprise" },
};

const clients = [
  { titre: "Publics", texte: "Collectivités, services techniques et maîtres d'ouvrage publics.", icone: "batiment" },
  { titre: "Industriels", texte: "Usines, ateliers et sites de production.", icone: "engins" },
  { titre: "Privés", texte: "Promoteurs, entreprises et particuliers.", icone: "valeurs" },
] as const;

// Mosaïque des valeurs : la première, plus grande, porte une photo.
const cellules = [
  "lg:col-span-6 lg:row-span-2",
  "lg:col-span-6",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

const moyens = [
  { icone: "engins", titre: "Engins de terrassement", texte: "Pelles hydrauliques, chargeuses et niveleuses, visibles sur nos chantiers." },
  { icone: "local", titre: "Topographie", texte: "Implantation et contrôle des cotes au GPS, pour poser juste du premier coup." },
  { icone: "casque", titre: "Équipements de protection", texte: "Casques, gilets et chaussures de sécurité portés par nos équipes." },
  { icone: "equipe", titre: "Personnel qualifié", texte: "Une équipe qui cumule plus de 40 ans d'expérience dans les travaux." },
] as const;

export default function PageEntreprise() {
  return (
    <>
      <EnTetePage
        titre="L'entreprise"
        intro={`Fondée à Dakar en ${entreprise.fondation}, PET réalise des bâtiments, des réseaux d'eau et des infrastructures pour des clients publics, industriels et privés.`}
        ariane={[{ titre: "L'entreprise" }]}
        photo="poseConduiteTopographie"
      />

      {/* Qui sommes-nous */}
      <section id="qui-sommes-nous" aria-labelledby="titre-qui" className="bg-blanc py-20 lg:py-28">
        <div className="conteneur grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="revele lg:col-span-6">
            <h2 id="titre-qui" className="titre text-titre-l text-nuit">
              Qui sommes-nous
            </h2>
            <p className="mt-6 max-w-[38rem] text-[1.125rem] leading-relaxed text-encre">{entreprise.presentation}</p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="cote text-[1.0625rem] text-encre-douce">Nous travaillons pour trois types de clients</p>
            <ul className="revele-groupe mt-6 grid gap-4">
              {clients.map((c) => (
                <li key={c.titre} className="flex items-start gap-5 rounded-[6px] bg-sable p-6">
                  <span className="grid size-12 shrink-0 place-items-center rounded-[6px] bg-royal text-jaune">
                    <Icone nom={c.icone} size={26} />
                  </span>
                  <span>
                    <span className="block titre text-[1.75rem] leading-none text-nuit">{c.titre}</span>
                    <span className="mt-2 block text-[1rem] text-encre-douce">{c.texte}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Notre histoire */}
      <section id="histoire" aria-labelledby="titre-histoire" className="sur-sombre relative isolate overflow-hidden bg-royal py-20 text-blanc lg:py-28">
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image src={photos.terrassementEngins.src} alt="" fill sizes="100vw" placeholder="blur" className="object-cover opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgb(33_64_154/0.96)_0%,rgb(33_64_154/0.85)_55%,rgb(11_27_63/0.9)_100%)]" />
        </div>
        <div className="conteneur grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="revele lg:col-span-5">
            <h2 id="titre-histoire" className="titre text-titre-l text-blanc">
              Notre histoire
            </h2>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-brume">
              Créée à Dakar en {entreprise.fondation}, PET réunit au sein d&apos;une même entreprise le bâtiment, les travaux publics et
              VRD, l&apos;hydraulique, l&apos;assainissement et le génie civil : un seul partenaire, de l&apos;étude à la livraison.
            </p>
          </div>
          <ol className="revele-groupe grid gap-4 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            <li className="verre-liquide rounded-[6px] p-7">
              <p className="titre text-chiffre text-jaune">{entreprise.fondation}</p>
              <p className="mt-3 cote text-[1.125rem] text-blanc">Création de l&apos;entreprise à Dakar</p>
            </li>
            <li className="verre-liquide rounded-[6px] p-7">
              <p className="titre text-[clamp(2.5rem,1.6rem+2.6vw,3.75rem)] leading-[0.9] text-blanc">Aujourd&apos;hui</p>
              <p className="mt-3 cote text-[1.125rem] text-blanc">
                {entreprise.domaines.length} domaines d&apos;expertise, {entreprise.clients.length} types de clients, plus de 40 ans
                d&apos;expérience cumulée
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Nos valeurs */}
      <section id="valeurs" aria-labelledby="titre-valeurs" className="bg-sable py-20 lg:py-28">
        <div className="conteneur">
          <div className="revele max-w-[46rem]">
            <h2 id="titre-valeurs" className="titre text-titre-l text-nuit">
              Nos valeurs
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-encre-douce">Sept principes que nous appliquons sur chaque chantier, quelle que soit sa taille.</p>
          </div>
          <ul className="revele-groupe mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
            {valeurs.map((v, i) =>
              i === 0 ? (
                <li key={v.titre} className={`sur-sombre relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-[6px] p-8 text-blanc sm:col-span-2 lg:p-10 ${cellules[i]}`}>
                  <Image src={photos.conduiteOuvrage.src} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" placeholder="blur" className="-z-10 object-cover" />
                  <span aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(11_27_63/0.2)_0%,rgb(7_18_43/0.92)_100%)]" />
                  <h3 className="titre text-titre-l text-blanc">{v.titre}</h3>
                  <p className="mt-4 max-w-[30rem] text-[1.125rem] leading-relaxed text-blanc/90">{v.texte}</p>
                </li>
              ) : (
                <li
                  key={v.titre}
                  className={`flex flex-col rounded-[6px] p-7 lg:p-8 ${cellules[i]} ${i === 1 ? "bg-nuit text-blanc" : i === 4 ? "bg-royal text-blanc" : "bg-blanc"}`}
                >
                  <h3 className={`titre text-[1.875rem] leading-[0.95] ${i === 1 || i === 4 ? "text-blanc" : "text-nuit"}`}>{v.titre}</h3>
                  <p className={`mt-3 text-[1.0625rem] leading-relaxed ${i === 1 || i === 4 ? "text-brume" : "text-encre-douce"}`}>{v.texte}</p>
                </li>
              ),
            )}
          </ul>
        </div>
      </section>

      {/* Qualité et sécurité */}
      <section id="qualite-securite" aria-labelledby="titre-qualite" className="bg-blanc py-20 lg:py-28">
        <div className="conteneur grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-6">
            <PhotoCadre photo="niveleuseVoirie" ratio="aspect-[4/3]" sizes="(min-width: 1024px) 45vw, 100vw" voile="aucun" equerres decalage={14} />
          </div>
          <div className="revele lg:col-span-5 lg:col-start-8">
            <h2 id="titre-qualite" className="titre text-titre-l text-nuit">
              Qualité et sécurité
            </h2>
            <p className="mt-6 text-[1.125rem] leading-relaxed text-encre">
              La qualité et la sécurité sont au centre de nos préoccupations. Elles reposent sur un personnel qualifié et sur des équipements
              régulièrement mis à niveau.
            </p>
            <ul className="mt-8 grid gap-4">
              {["Chantiers balisés et équipements de protection portés", "Contrôles à chaque étape, du ferraillage à la réception", "Respect des lieux, des riverains et des délais"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[1.0625rem] text-encre">
                  <Icone nom="succes" size={24} weight="fill" className="mt-0.5 shrink-0 text-royal" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <BoutonLien href="/engagements" variante="contour">
                Nos engagements
              </BoutonLien>
            </div>
          </div>
        </div>
      </section>

      {/* Équipe et moyens */}
      <section id="equipe-moyens" aria-labelledby="titre-moyens" className="sur-sombre profondeur py-20 text-blanc lg:py-28">
        <div className="conteneur">
          <div className="revele max-w-[46rem]">
            <h2 id="titre-moyens" className="titre text-titre-l text-blanc">
              Équipe et moyens
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-brume">Des femmes et des hommes de terrain, et le matériel pour bien travailler.</p>
          </div>
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-8">
            <ul className="revele-groupe grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {moyens.map((m) => (
                <li key={m.titre} className="rounded-[6px] bg-blanc/[0.05] p-7">
                  <Icone nom={m.icone} size={32} className="text-jaune" />
                  <h3 className="mt-5 titre text-[1.625rem] leading-[1] text-blanc">{m.titre}</h3>
                  <p className="mt-3 text-[1rem] leading-relaxed text-brume">{m.texte}</p>
                </li>
              ))}
            </ul>
            <div className="lg:col-span-5">
              <PhotoCadre photo="terrassementEngins" ratio="aspect-[4/3] lg:aspect-auto lg:h-full" sizes="(min-width: 1024px) 38vw, 100vw" voile="leger" className="h-full [&>div]:h-full" />
            </div>
          </div>
        </div>
      </section>

      <AppelFinal />
    </>
  );
}

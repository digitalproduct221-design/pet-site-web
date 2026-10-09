import type { Metadata } from "next";
import { adresse, AFFICHER_MENTIONS_MANQUANTES, email, mentionsLegales, NOM, telephones } from "@/content/site";
import { EnTetePage } from "@/components/ui/EnTetePage";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site de ${NOM}.`,
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

const ARENSEIGNER = "À renseigner par l'entreprise";

const blocs = [
  {
    titre: "Éditeur du site",
    lignes: [
      ["Raison sociale", NOM],
      ["Forme juridique", "Société unipersonnelle à responsabilité limitée (SUARL)"],
      ["Siège", adresse],
      ["Téléphone", telephones[0].affichage],
      ["E-mail", email],
      ["NINEA", mentionsLegales.ninea],
      ["RCCM", mentionsLegales.rccm],
      ["Directeur de la publication", mentionsLegales.directeurPublication],
    ],
  },
  {
    titre: "Hébergement",
    lignes: [["Hébergeur", mentionsLegales.hebergeur]],
  },
].map((b) => ({
  ...b,
  // Valeur manquante : ligne masquée en production (voir content/site.ts)
  lignes: b.lignes
    .filter(([, valeur]) => valeur || AFFICHER_MENTIONS_MANQUANTES)
    .map(([cle, valeur]) => [cle, valeur || ARENSEIGNER]),
}));

export default function PageMentions() {
  return (
    <>
      <EnTetePage suite="text-blanc" titre="Mentions légales" ariane={[{ titre: "Mentions légales" }]} />
      <section className="bg-blanc py-20 lg:py-24">
        <div className="conteneur grid max-w-[60rem] gap-14">
          {blocs.map((b) => (
            <div key={b.titre}>
              <h2 className="titre text-titre-m text-nuit">{b.titre}</h2>
              <dl className="mt-6 grid gap-4 sm:grid-cols-[14rem_1fr]">
                {b.lignes.map(([cle, valeur]) => (
                  <div key={cle} className="contents">
                    <dt className="cote text-[1.0625rem] text-encre-douce">{cle}</dt>
                    <dd className={valeur === ARENSEIGNER ? "italic text-encre-douce" : "text-encre"}>{valeur}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
          <div className="space-y-5 text-[1.0625rem] leading-relaxed text-encre">
            <h2 className="titre text-titre-m text-nuit">Données personnelles</h2>
            <p>
              Les informations envoyées par les formulaires de devis et de candidature servent uniquement à répondre à votre demande. Elles ne
              sont ni revendues ni utilisées à d&apos;autres fins. Pour les consulter, les corriger ou les supprimer, écrivez à{" "}
              <a href={`mailto:${email}`} className="text-royal underline underline-offset-4">
                {email}
              </a>
              .
            </p>
            <h2 className="pt-6 titre text-titre-m text-nuit">Propriété intellectuelle</h2>
            <p>
              Les textes, le logo et les photographies de ce site sont protégés. Toute reproduction sans l&apos;accord écrit de {NOM} est
              interdite.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

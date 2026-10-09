import { email, telephones, whatsapp } from "@/content/site";
import { BoutonExterne, BoutonLien } from "@/components/ui/Bouton";
import { Motif } from "@/components/ui/Motif";
import { Pelleteuse } from "@/components/ui/Pelleteuse";
import { Profil } from "@/components/ui/Profil";

/** Appel à l'action final : un aplat jaune chantier, une pelleteuse au travail, les numéros en grand. */
export function AppelFinal() {
  return (
    <section aria-labelledby="titre-appel" className="relative isolate overflow-hidden bg-jaune text-nuit">
      <Motif type="courbes" className="text-nuit" opacite={0.07} />
      <div className="conteneur relative grid gap-12 pb-28 pt-20 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pb-40 lg:pt-28">
        <div className="relative lg:col-span-7">
          <Pelleteuse className="mb-6 h-auto w-44 text-nuit sm:w-56 lg:absolute lg:-top-6 lg:right-0 lg:mb-0 lg:w-64 xl:w-72" />
          <h2 id="titre-appel" className="titre text-[clamp(3.25rem,1.6rem+7vw,6rem)] leading-[0.9] text-nuit">
            Un projet ?<br />
            Parlons-en.
          </h2>
          <p className="mt-6 max-w-[32rem] text-[1.1875rem] leading-relaxed text-nuit/85">
            Décrivez-nous votre chantier : nous vous rappelons pour en parler et préparer votre devis.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <BoutonLien href="/contact#devis" variante="sombre">
              Demander un devis
            </BoutonLien>
            <BoutonExterne href={whatsapp.lien} target="_blank" rel="noopener noreferrer" variante="contour" icone="whatsapp" className="text-nuit shadow-[inset_0_0_0_2px_var(--color-nuit)] hover:bg-nuit hover:text-jaune">
              WhatsApp<span className="sr-only"> (nouvel onglet)</span>
            </BoutonExterne>
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9">
          <ul aria-label="Nos numéros de téléphone" className="grid gap-3">
            {telephones.map((t) => (
              <li key={t.affichage}>
                <a
                  href={t.lien}
                  className="group/tel flex items-baseline justify-between gap-4 rounded-panneau bg-nuit/[0.06] px-4 py-3 transition-colors hover:bg-nuit hover:text-jaune"
                >
                  <span className="whitespace-nowrap titre text-[clamp(1.875rem,1.2rem+1.6vw,2.625rem)] chiffres-tabulaires">{t.affichage}</span>
                  <span className="cote text-[0.9375rem] opacity-80">{t.mobile ? "Mobile" : "Standard"}</span>
                </a>
              </li>
            ))}
          </ul>
          <a href={`mailto:${email}`} className="mt-5 inline-block break-all cote text-[1.0625rem] text-nuit underline decoration-2 underline-offset-4">
            {email}
          </a>
        </div>
      </div>
      <Profil couleur="text-nuit" forme="deblai" arriere="text-royal" />
    </section>
  );
}

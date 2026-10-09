import { email, telephones, whatsapp } from "@/content/site";
import { BoutonExterne, BoutonLien } from "@/components/ui/Bouton";

/** Appel à l'action final : un aplat jaune chantier, les numéros en grand. */
export function AppelFinal() {
  return (
    <section aria-labelledby="titre-appel" className="relative overflow-hidden bg-jaune text-nuit">
      <div className="conteneur relative grid gap-12 py-20 lg:grid-cols-12 lg:items-end lg:gap-8 lg:py-28">
        <div className="lg:col-span-7">
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
          <p className="cote text-[1rem] uppercase tracking-[0.08em] text-nuit/80">Appelez-nous</p>
          <ul className="mt-3 grid gap-3">
            {telephones.map((t) => (
              <li key={t.affichage}>
                <a
                  href={t.lien}
                  className="group/tel flex items-baseline justify-between gap-4 rounded-[6px] bg-nuit/[0.06] px-4 py-3 transition-colors hover:bg-nuit hover:text-jaune"
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
    </section>
  );
}

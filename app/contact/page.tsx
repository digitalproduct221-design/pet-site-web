import type { Metadata } from "next";
import { adresse, email, telephones, whatsapp } from "@/content/site";
import { EnTetePage } from "@/components/ui/EnTetePage";
import { CarteDakar } from "@/components/ui/CarteDakar";
import { Icone } from "@/components/ui/Icone";
import { Formulaire } from "@/components/formulaires/Formulaire";

export const metadata: Metadata = {
  title: "Contact et devis",
  description:
    "Demandez un devis à PET pour vos travaux de bâtiment, VRD, hydraulique, assainissement ou génie civil à Dakar. Téléphone, WhatsApp, e-mail et formulaire.",
  alternates: { canonical: "/contact" },
};

export default function PageContact() {
  return (
    <>
      <EnTetePage
        titre="Contact et devis"
        intro="Un chantier en vue ? Décrivez-le en quelques lignes, joignez vos plans si vous en avez : nous revenons vers vous pour en parler."
        ariane={[{ titre: "Contact et devis" }]}
        photo="dalotRegard"
      >
        <a
          href={telephones[0].lien}
          className="inline-flex min-h-[var(--bouton-h)] items-center gap-3 rounded-chantier bg-jaune px-6 cote text-[1.0625rem] uppercase tracking-[0.04em] text-nuit hover:bg-jaune-profond"
        >
          <Icone nom="telephone" size={20} weight="bold" />
          Appeler
        </a>
        <a
          href={whatsapp.lien}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[var(--bouton-h)] items-center gap-3 rounded-chantier px-6 cote text-[1.0625rem] uppercase tracking-[0.04em] text-blanc shadow-[inset_0_0_0_2px_rgb(251_250_247/0.7)] hover:bg-blanc hover:text-nuit"
        >
          <Icone nom="whatsapp" size={20} weight="bold" />
          WhatsApp<span className="sr-only"> (nouvel onglet)</span>
        </a>
      </EnTetePage>

      <section aria-labelledby="devis" className="bg-sable py-20 lg:py-28">
        <div className="conteneur grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="revele lg:col-span-7">
            <h2 id="devis" className="titre text-titre-l text-nuit">
              Demander un devis
            </h2>
            <p className="mt-5 max-w-[38rem] text-lg leading-relaxed text-encre-douce">
              Plus votre description est précise (nature des travaux, lieu, délais), plus notre premier échange sera utile.
            </p>
            <div className="mt-10">
              <Formulaire type="devis" />
            </div>
          </div>

          <aside aria-labelledby="coordonnees" className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-[calc(var(--header-h-compact)+2rem)]">
              <div className="sur-sombre profondeur rounded-[6px] p-7 text-blanc lg:p-8">
                <h2 id="coordonnees" className="titre text-titre-s text-blanc">
                  Nos coordonnées
                </h2>
                <address className="mt-6 grid gap-6 not-italic">
                  <div>
                    <p className="cote text-[0.875rem] uppercase tracking-[0.1em] text-ciel">Adresse</p>
                    <p className="mt-1.5 text-blanc">{adresse}</p>
                  </div>
                  <div>
                    <p className="cote text-[0.875rem] uppercase tracking-[0.1em] text-ciel">Téléphones</p>
                    <ul className="mt-1.5 grid gap-1">
                      {telephones.map((t) => (
                        <li key={t.affichage}>
                          <a href={t.lien} className="flex items-baseline justify-between gap-4 hover:text-jaune">
                            <span className="titre text-[1.625rem] chiffres-tabulaires">{t.affichage}</span>
                            <span className="cote text-[0.9375rem] text-brume">{t.mobile ? "Mobile" : "Standard"}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="cote text-[0.875rem] uppercase tracking-[0.1em] text-ciel">E-mail</p>
                    <a href={`mailto:${email}`} className="mt-1.5 inline-block text-blanc underline decoration-ciel/60 underline-offset-4 hover:text-jaune">
                      {email.split("@")[0]}@<wbr />
                      {email.split("@")[1]}
                    </a>
                  </div>
                </address>
                <a
                  href={whatsapp.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 flex min-h-12 items-center justify-center gap-2 rounded-chantier bg-blanc/10 px-5 cote text-[1.0625rem] text-blanc transition-colors hover:bg-blanc hover:text-nuit"
                >
                  <Icone nom="whatsapp" size={22} />
                  Écrire sur WhatsApp<span className="sr-only"> (nouvel onglet)</span>
                </a>
              </div>
              <div className="mt-5">
                <CarteDakar hauteur="h-72" />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import logoInverse from "@/public/brand/logo-pet-inverse.png";
import { adresse, domaines, email, liensRapides, NOM, reseaux, SIGLE, SLOGAN, telephones, whatsapp } from "@/content/site";
import { Icone } from "@/components/ui/Icone";
import { CarteDakar } from "@/components/ui/CarteDakar";

/** Année du copyright, mise en cache au rendu (pas de rendu dynamique pour une date). */
async function AnneeCourante() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

const etiquette = "cote text-[0.875rem] uppercase tracking-[0.1em] text-ciel";

/** Footer : identité, coordonnées, liens et plan d'accès, sans cases ni filets. */
export function Footer() {
  const reseauxRenseignes = reseaux.filter((r) => r.url);

  return (
    <footer className="sur-sombre profondeur text-brume">
      <div className="conteneur pb-10 pt-20 lg:pt-28">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Identité */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Image src={logoInverse} alt={`Logo ${SIGLE}, ${NOM}`} className="h-auto w-60" sizes="240px" />
            <p className="mt-8 max-w-[22rem] titre text-[1.625rem] leading-[1] text-blanc">{SLOGAN}.</p>
          </div>

          {/* Coordonnées */}
          <div className="lg:col-span-3">
            <p className={etiquette}>Coordonnées</p>
            <address className="mt-5 not-italic">
              <p className="text-blanc">{adresse}</p>
              <ul className="mt-3 grid">
                {telephones.map((t) => (
                  <li key={t.affichage}>
                    <a href={t.lien} className="inline-flex min-h-11 items-center cote text-[1.1875rem] text-blanc chiffres-tabulaires hover:text-jaune">
                      {t.affichage}
                    </a>
                  </li>
                ))}
              </ul>
              <a href={`mailto:${email}`} className="mt-3 inline-flex min-h-11 items-center text-blanc underline decoration-ciel/60 underline-offset-4 hover:text-jaune">
                {email.split("@")[0]}@<wbr />
                {email.split("@")[1]}
              </a>
              <a
                href={whatsapp.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex min-h-11 items-center gap-2 cote text-[1.0625rem] text-blanc hover:text-jaune"
              >
                <Icone nom="whatsapp" size={20} className="text-jaune" />
                WhatsApp
                <span className="sr-only">(nouvel onglet)</span>
              </a>
            </address>
          </div>

          {/* Liens */}
          <nav aria-label="Liens du pied de page" className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-1">
            <div>
              <p className={etiquette}>Le site</p>
              <ul className="mt-3 grid">
                {liensRapides.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex min-h-11 items-center text-blanc transition-colors hover:text-jaune">
                      {l.titre}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:hidden">
              <p className={etiquette}>Savoir-faire</p>
              <ul className="mt-3 grid">
                {domaines.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/savoir-faire/${d.slug}`} className="inline-flex min-h-11 items-center text-blanc transition-colors hover:text-jaune">
                      {d.titre}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Plan d'accès */}
          <div className="sm:col-span-2 lg:col-span-3">
            <p className={etiquette}>Plan d&apos;accès</p>
            <div className="mt-5">
              <CarteDakar hauteur="h-56" />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 rounded-panneau bg-blanc/[0.04] px-5 py-4 text-[0.9375rem] md:flex-row md:items-center md:justify-between">
          <p>
            © <AnneeCourante /> {NOM}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link href="/mentions-legales" className="inline-flex min-h-11 items-center text-blanc underline underline-offset-4 hover:text-jaune">
                Mentions légales
              </Link>
            </li>
            {reseauxRenseignes.map((r) => (
              <li key={r.nom}>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="hover:text-blanc">
                  <Icone nom={r.nom.toLowerCase()} size={20} label={r.nom} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

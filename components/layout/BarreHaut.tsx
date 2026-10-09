import { email, reseaux, telephones } from "@/content/site";
import { Icone } from "@/components/ui/Icone";

/** Barre fine bleu nuit au-dessus du header (tablette et bureau). */
export function BarreHaut() {
  const reseauxRenseignes = reseaux.filter((r) => r.url);
  return (
    <div className="sur-sombre hidden bg-nuit text-brume md:block">
      <div className="conteneur flex h-[var(--topbar-h)] items-center justify-between gap-6 cote text-[0.9375rem]">
        <ul className="flex items-center gap-6">
          <li>
            <a href={telephones[0].lien} className="inline-flex items-center gap-2 transition-colors hover:text-blanc chiffres-tabulaires relative before:absolute before:inset-x-0 before:-inset-y-[11px] before:content-['']">
              <Icone nom="telephone" size={16} className="text-jaune" />
              {telephones[0].affichage}
            </a>
          </li>
          <li className="hidden lg:block">
            <a href={`mailto:${email}`} className="inline-flex items-center gap-2 transition-colors hover:text-blanc relative before:absolute before:inset-x-0 before:-inset-y-[11px] before:content-['']">
              <Icone nom="email" size={16} className="text-jaune" />
              {email}
            </a>
          </li>
          <li className="inline-flex items-center gap-2">
            <Icone nom="adresse" size={16} className="text-jaune" />
            Dakar, Sénégal
          </li>
        </ul>
        <div className="flex items-center gap-5">
          {reseauxRenseignes.length > 0 ? (
            <ul className="flex items-center gap-3">
              {reseauxRenseignes.map((r) => (
                <li key={r.nom}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blanc relative before:absolute before:inset-x-0 before:-inset-y-[11px] before:content-['']">
                    <Icone nom={r.nom.toLowerCase()} size={18} label={r.nom} />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          {/* Sélecteur de langue : à remettre quand la version anglaise existera */}
        </div>
      </div>
    </div>
  );
}

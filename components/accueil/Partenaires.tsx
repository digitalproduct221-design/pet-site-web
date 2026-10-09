import Image from "next/image";
import { partenaires } from "@/content/partenaires";

/**
 * « Ils nous font confiance » : les logos défilent lentement, en niveaux de gris,
 * et reprennent leurs couleurs au survol. Rien n'est affiché tant que la liste
 * (content/partenaires.ts) est vide.
 */
export function Partenaires() {
  if (partenaires.length === 0) return null;
  const suite = [...partenaires, ...partenaires];
  return (
    <section aria-labelledby="titre-partenaires" className="bg-blanc py-16 lg:py-20">
      <div className="conteneur">
        <h2 id="titre-partenaires" className="text-center cote text-[1rem] uppercase tracking-[0.16em] text-encre-douce">
          Ils nous font confiance
        </h2>
      </div>
      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="ruban-piste flex w-max items-center gap-16">
          {suite.map((p, i) => (
            <li key={`${p.nom}-${i}`} aria-hidden={i >= partenaires.length || undefined} className="shrink-0">
              <Image src={p.logo} alt={p.nom} width={160} height={64} className="h-12 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

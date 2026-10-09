"use client";

import { useEffect, useRef } from "react";
import { entreprise } from "@/content/site";
import { Globe } from "@/components/ui/Globe";
import { Motif } from "@/components/ui/Motif";

type Chiffre = { valeur: number; depart: number; suffixe?: string; libelle: string };

// Seuls chiffres autorisés : 2016, 40+, 5 domaines, 3 types de clients.
const chiffres: Chiffre[] = [
  { valeur: entreprise.fondation, depart: 1990, libelle: "Année de création, à Dakar" },
  { valeur: 40, depart: 0, suffixe: "+", libelle: "Années d'expérience cumulée dans l'équipe" },
  { valeur: entreprise.domaines.length, depart: 0, libelle: "Domaines d'expertise, du bâtiment aux réseaux" },
  { valeur: entreprise.clients.length, depart: 0, libelle: "Types de clients : publics, industriels et privés" },
];

/** Courbe de décélération exponentielle, comme le reste du site. */
const ralentir = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

function Compteur({ valeur, depart, suffixe }: Pick<Chiffre, "valeur" | "depart" | "suffixe">) {
  const ref = useRef<HTMLSpanElement>(null);

  // La valeur finale est rendue côté serveur ; l'animation ne fait que la rejouer
  // à l'entrée dans l'écran, et jamais sous mouvement réduit.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let image = 0;
    const duree = valeur > 100 ? 1600 : 1200;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const debut = performance.now();
        const pas = (maintenant: number) => {
          const t = Math.min(1, (maintenant - debut) / duree);
          el.textContent = String(Math.round(depart + (valeur - depart) * ralentir(t)));
          if (t < 1) image = requestAnimationFrame(pas);
        };
        image = requestAnimationFrame(pas);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(image);
    };
  }, [depart, valeur]);

  return (
    <span className="chiffres-tabulaires">
      <span ref={ref}>{valeur}</span>
      {suffixe ? <span className="text-nuit">{suffixe}</span> : null}
    </span>
  );
}

/**
 * Juste après le hero, sur le sable du profil de terrain : une phrase qui dit ce
 * que fait PET, puis les quatre chiffres composés en très grand, posés sur des
 * courbes de niveau. Ni cadre ni filet : la typographie porte la section.
 */
export function Chiffres() {
  return (
    <section aria-labelledby="titre-chiffres" className="relative isolate overflow-hidden bg-sable pb-20 pt-12 lg:pb-28 lg:pt-16">
      <Motif type="courbes" className="text-royal" opacite={0.1} />
      <div className="conteneur">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <h2
            id="titre-chiffres"
            className="revele max-w-[56rem] text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-nuit md:col-span-8"
          >
            De la conception à l&apos;entretien, nous construisons et réhabilitons{" "}
            <span className="text-royal">les bâtiments, les réseaux d&apos;eau et les infrastructures</span> du Sénégal.
          </h2>
          {/* Basés à Dakar : le globe tourne puis se pose sur la ville */}
          <figure className="hidden md:col-span-4 md:block">
            <Globe className="mx-auto w-full max-w-[22rem]" />
            <figcaption className="mt-2 text-center cote text-[0.9375rem] text-encre-douce">
              <span className="text-nuit">Dakar</span>, Rond-point Liberté 6
            </figcaption>
          </figure>
        </div>

        <dl className="revele-groupe mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:mt-20 lg:grid-cols-4 lg:gap-x-10">
          {chiffres.map((c) => (
            <div key={c.libelle} className="flex flex-col-reverse justify-end">
              <dt className="mt-3 max-w-[15rem] cote text-[1.0625rem] leading-snug text-encre-douce">{c.libelle}</dt>
              <dd className="titre text-chiffre text-royal">
                <Compteur valeur={c.valeur} depart={c.depart} suffixe={c.suffixe} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

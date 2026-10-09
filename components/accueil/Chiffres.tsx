"use client";

import { useEffect, useRef } from "react";
import { entreprise } from "@/content/site";
import { Pictogramme, type NomPicto } from "./Pictogramme";
import { Motif } from "@/components/ui/Motif";

type Chiffre = { valeur: number; depart: number; suffixe?: string; libelle: string; picto: NomPicto };

// Seuls chiffres autorisés : 2016, 40+, 5 domaines, 3 types de clients.
const chiffres: Chiffre[] = [
  { valeur: entreprise.fondation, depart: 1990, libelle: "Année de création, à Dakar", picto: "creation" },
  { valeur: 40, depart: 0, suffixe: "+", libelle: "Années d'expérience cumulée dans l'équipe", picto: "experience" },
  { valeur: entreprise.domaines.length, depart: 0, libelle: "Domaines d'expertise, du bâtiment aux réseaux", picto: "domaines" },
  { valeur: entreprise.clients.length, depart: 0, libelle: "Types de clients : publics, industriels et privés", picto: "clients" },
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
 * Juste après le hero : une phrase qui dit ce que fait PET, et les quatre chiffres
 * en cartes compactes. Chaque chiffre a son pictogramme au trait, qui se dessine
 * pendant que le compteur défile. Posé sur des courbes de niveau.
 */
export function Chiffres() {
  return (
    <section aria-labelledby="titre-chiffres" className="relative isolate overflow-hidden bg-sable pb-20 pt-12 lg:pb-24 lg:pt-14">
      <Motif type="courbes" className="text-royal" opacite={0.1} />
      <div className="conteneur grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <h2
          id="titre-chiffres"
          className="revele text-[clamp(1.625rem,1.2rem+1.6vw,2.5rem)] font-semibold leading-[1.18] tracking-[-0.02em] text-nuit lg:col-span-5"
        >
          De la conception à l&apos;entretien, nous construisons et réhabilitons{" "}
          <span className="text-royal">les bâtiments, les réseaux d&apos;eau et les infrastructures</span> du Sénégal.
        </h2>

        <dl className="revele-groupe grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7">
          {chiffres.map((c) => (
            <div key={c.libelle} className="flex flex-col-reverse justify-end rounded-panneau bg-blanc/85 p-4 ombre-carte sm:p-6">
              <dt className="mt-2 cote text-[0.9375rem] leading-snug text-encre-douce sm:text-[1.0625rem]">{c.libelle}</dt>
              <dd className="flex items-center justify-between gap-3">
                <span className="titre text-[clamp(2.5rem,1.6rem+2.6vw,4rem)] leading-[0.9] text-royal">
                  <Compteur valeur={c.valeur} depart={c.depart} suffixe={c.suffixe} />
                </span>
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-sable text-royal sm:size-16">
                  <Pictogramme nom={c.picto} />
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

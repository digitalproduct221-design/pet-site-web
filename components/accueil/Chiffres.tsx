"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { photos } from "@/content/photos";
import { Equerres } from "@/components/ui/Equerres";
import { entreprise } from "@/content/site";

type Chiffre = { valeur: number; depart: number; suffixe?: string; libelle: string };

// Seuls chiffres autorisés : 2016, 40+, 5 domaines, 3 types de clients.
const chiffres: Chiffre[] = [
  { valeur: entreprise.fondation, depart: 2000, libelle: "Année de création de l'entreprise" },
  { valeur: 40, depart: 0, suffixe: "+", libelle: "Années d'expérience cumulée dans l'équipe" },
  { valeur: entreprise.domaines.length, depart: 0, libelle: "Domaines d'expertise, du bâtiment aux réseaux" },
  { valeur: entreprise.clients.length, depart: 0, libelle: "Types de clients : publics, industriels et privés" },
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
    const duree = valeur > 100 ? 1400 : 1100;
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
      {suffixe ? <span className="text-jaune">{suffixe}</span> : null}
    </span>
  );
}

/**
 * Les chiffres clés sur fond bleu royal : l'année de création composée en grand
 * entre les deux équerres du logo, les trois autres chiffres en lignes dans un
 * panneau de verre posé sur une vraie photo de chantier.
 */
export function Chiffres() {
  const fond = photos.ferraillageOuvrage;
  const [annee, ...autres] = chiffres;
  return (
    <section aria-labelledby="titre-chiffres" className="sur-sombre relative isolate overflow-hidden bg-royal text-blanc">
      <h2 id="titre-chiffres" className="sr-only">
        PET en chiffres
      </h2>
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image src={fond.src} alt="" fill sizes="(max-width: 768px) 70vw, 100vw" quality={50} className="object-cover" style={{ objectPosition: "50% 40%" }} />
        <div className="absolute inset-0 voile-royal-lateral" />
      </div>
      <div className="conteneur grid gap-10 py-16 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-24">
        <div className="revele flex flex-col lg:col-span-5">
          <Equerres decalage={18} className="self-start px-5 py-4">
            <p className="titre text-chiffre text-blanc">
              <Compteur valeur={annee.valeur} depart={annee.depart} />
            </p>
          </Equerres>
          <p className="mt-6 max-w-[18rem] cote text-[1.125rem] leading-snug text-brume">{annee.libelle}</p>
        </div>
        <div className="verre-liquide revele-groupe grid gap-6 rounded-panneau p-6 sm:p-8 lg:col-span-6 lg:col-start-7">
          {autres.map((c) => (
            <div key={c.libelle} className="grid grid-cols-[5.5rem_1fr] items-center gap-5 sm:grid-cols-[7rem_1fr]">
              <p className="titre text-[clamp(3rem,2.2rem+2.4vw,4.25rem)] leading-none text-blanc">
                <Compteur valeur={c.valeur} depart={c.depart} suffixe={c.suffixe} />
              </p>
              <p className="cote text-[1.0625rem] leading-snug text-blanc/90">{c.libelle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

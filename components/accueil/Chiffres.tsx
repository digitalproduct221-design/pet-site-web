"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { photos } from "@/content/photos";
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
 * Les chiffres clés sur fond bleu royal : une photo de chantier très voilée
 * donne de la matière au verre liquide des quatre tuiles.
 */
export function Chiffres() {
  const fond = photos.ferraillageOuvrage;
  return (
    <section aria-labelledby="titre-chiffres" className="sur-sombre relative isolate overflow-hidden bg-royal text-blanc">
      <h2 id="titre-chiffres" className="sr-only">
        PET en chiffres
      </h2>
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image src={fond.src} alt="" fill sizes="100vw" className="object-cover opacity-60" style={{ objectPosition: "50% 40%" }} />
        <div className="absolute inset-0 voile-royal" />
      </div>
      <div className="conteneur py-16 lg:py-24">
        <dl className="revele-groupe grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5 lg:gap-5">
          {chiffres.map((c, i) => (
            <div key={c.libelle} className={`verre-liquide flex flex-col rounded-[6px] p-5 sm:p-7 lg:p-8 ${i === 0 ? "col-span-2 lg:justify-end" : i === chiffres.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}>
              <dt className="order-2 mt-3 max-w-[16rem] cote text-[1rem] leading-snug text-brume sm:text-[1.0625rem]">{c.libelle}</dt>
              <dd className="order-1 titre text-chiffre text-blanc">
                <Compteur valeur={c.valeur} depart={c.depart} suffixe={c.suffixe} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

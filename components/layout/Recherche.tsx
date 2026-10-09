"use client";

import Link from "next/link";
import { Dialog } from "radix-ui";
import { useDeferredValue, useMemo, useState } from "react";
import { indexRecherche, normaliser } from "@/content/recherche";
import { Icone } from "@/components/ui/Icone";

const suggestions = ["Hydraulique", "Assainissement", "Conduite fonte", "Devis", "Carrières"];

/** Recherche plein écran : un index statique filtré dans le navigateur. */
export function Recherche({ classeDeclencheur = "" }: { classeDeclencheur?: string }) {
  const [ouvert, setOuvert] = useState(false);
  const [requete, setRequete] = useState("");
  const requeteDifferee = useDeferredValue(requete);

  const resultats = useMemo(() => {
    const termes = normaliser(requeteDifferee).split(/\s+/).filter(Boolean);
    if (termes.length === 0) return [];
    return indexRecherche
      .filter((r) => {
        const texte = normaliser(`${r.titre} ${r.description} ${r.rubrique}`);
        return termes.every((t) => texte.includes(t));
      })
      .slice(0, 12);
  }, [requeteDifferee]);

  return (
    <Dialog.Root
      open={ouvert}
      onOpenChange={(o) => {
        setOuvert(o);
        if (!o) setRequete("");
      }}
    >
      <Dialog.Trigger
        className={`grid size-11 place-items-center rounded-chantier text-nuit transition-colors hover:bg-sable hover:text-royal ${classeDeclencheur}`}
        aria-label="Rechercher sur le site"
      >
        <Icone nom="recherche" size={24} weight="bold" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="voile-fenetre fixed inset-0 z-[70] bg-nuit/70" />
        <Dialog.Content className="fenetre sur-sombre fixed inset-0 z-[80] overflow-y-auto profondeur text-blanc">
          <div className="conteneur flex min-h-full flex-col pb-16 pt-6">
            <div className="flex items-center justify-between">
              <Dialog.Title className="titre text-titre-s text-blanc">Rechercher</Dialog.Title>
              <Dialog.Close
                className="grid size-12 place-items-center rounded-chantier text-blanc transition-colors hover:bg-blanc/10"
                aria-label="Fermer la recherche"
              >
                <Icone nom="fermer" size={28} weight="bold" />
              </Dialog.Close>
            </div>
            <Dialog.Description className="sr-only">
              Saisissez un mot : un domaine, un type de travaux, une page.
            </Dialog.Description>

            <div className="mx-auto mt-12 w-full max-w-3xl lg:mt-20">
              <label htmlFor="champ-recherche" className="cote text-[1.0625rem] text-brume">
                Que cherchez-vous ?
              </label>
              <div className="relative mt-3">
                <Icone nom="recherche" size={30} className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-ciel" />
                <input
                  id="champ-recherche"
                  type="search"
                  autoComplete="off"
                  value={requete}
                  onChange={(e) => setRequete(e.target.value)}
                  placeholder="Ex. assainissement, conduite fonte, devis"
                  className="w-full border-b-2 border-brume/40 bg-transparent py-4 pl-12 titre text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] normal-case text-blanc caret-jaune placeholder:text-brume/60 focus:border-jaune focus:outline-none"
                />
              </div>

              <div aria-live="polite" className="mt-10">
                {requete.trim() === "" ? (
                  <div>
                    <p className="cote text-[1.0625rem] text-brume">Recherches fréquentes</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {suggestions.map((s) => (
                        <li key={s}>
                          <button
                            type="button"
                            onClick={() => setRequete(s)}
                            className="rounded-chantier px-4 py-2 cote text-[1rem] text-blanc shadow-[inset_0_0_0_1px_rgb(185_199_230/0.35)] transition-colors hover:bg-blanc hover:text-nuit"
                          >
                            {s}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : resultats.length === 0 ? (
                  <div className="border-l-[3px] border-jaune pl-5">
                    <p className="text-lg text-blanc">Aucun résultat pour « {requete} ».</p>
                    <p className="mt-2 text-brume">
                      Essayez un autre mot, ou{" "}
                      <Link href="/contact" onClick={() => setOuvert(false)} className="text-jaune underline underline-offset-4">
                        posez-nous directement votre question
                      </Link>
                      .
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="cote text-[1.0625rem] text-brume">
                      {resultats.length} résultat{resultats.length > 1 ? "s" : ""}
                    </p>
                    <ul className="mt-4 divide-y divide-[var(--color-ligne-sombre)]">
                      {resultats.map((r) => (
                        <li key={`${r.href}-${r.titre}`}>
                          <Link
                            href={r.href}
                            onClick={() => setOuvert(false)}
                            className="group/resultat flex items-start justify-between gap-6 py-5"
                          >
                            <span>
                              <span className="block cote text-[0.875rem] uppercase tracking-[0.06em] text-ciel">{r.rubrique}</span>
                              <span className="mt-1 block titre text-[1.625rem] text-blanc group-hover/resultat:text-jaune">{r.titre}</span>
                              <span className="mt-1 block text-brume">{r.description}</span>
                            </span>
                            <Icone nom="fleche" size={24} className="mt-6 shrink-0 text-jaune transition-transform group-hover/resultat:translate-x-1" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

"use client";

import Link from "next/link";
import { Accordion, Dialog } from "radix-ui";
import type { RefObject } from "react";
import { navigation, telephones, whatsapp } from "@/content/site";
import { Icone } from "@/components/ui/Icone";
import { Logo } from "./Logo";

/** Fenêtre du menu plein écran en accordéon (sous 1152 px), chargée à la demande (voir MenuMobile.tsx). */
export default function MenuMobileFenetre({
  ouvert,
  setOuvert,
  declencheur,
}: {
  ouvert: boolean;
  setOuvert: (o: boolean) => void;
  declencheur: RefObject<HTMLButtonElement | null>;
}) {
  const fermer = () => setOuvert(false);

  return (
    <Dialog.Root open={ouvert} onOpenChange={setOuvert}>
      <Dialog.Portal>
        <Dialog.Overlay className="voile-fenetre fixed inset-0 z-[70] bg-nuit/70" />
        <Dialog.Content
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            declencheur.current?.focus();
          }}
          className="fenetre sur-sombre fixed inset-0 z-[80] flex flex-col overflow-y-auto overscroll-contain profondeur text-blanc">
          <div className="conteneur flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <Logo ton="sombre" />
            <Dialog.Close
              className="grid size-12 place-items-center rounded-chantier text-blanc transition-colors hover:bg-blanc/10"
              aria-label="Fermer le menu"
            >
              <Icone nom="fermer" size={28} weight="bold" />
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <Dialog.Description className="sr-only">Navigation principale du site PET.</Dialog.Description>

          <nav aria-label="Navigation principale" className="conteneur mt-4 flex-1">
            <Accordion.Root type="single" collapsible className="grid gap-1">
              {navigation.map((rubrique) => (
                <Accordion.Item key={rubrique.id} value={rubrique.id} className="rounded-panneau px-1 transition-colors data-[state=open]:bg-blanc/[0.05]">
                  <Accordion.Header>
                    <Accordion.Trigger className="group/acc flex w-full items-center justify-between px-3 py-4 text-left titre text-[1.875rem] text-blanc">
                      {rubrique.titre}
                      <span className="grid size-10 place-items-center rounded-chantier bg-blanc/5 text-jaune transition-transform duration-300 ease-chantier group-data-[state=open]/acc:rotate-180">
                        <Icone nom="chevron" size={20} weight="bold" />
                      </span>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="accordeon-contenu">
                    <p className="max-w-[34rem] px-3 pb-4 cote text-[1.0625rem] italic text-brume">{rubrique.intro}</p>
                    <ul className="grid gap-1 px-3 pb-6 sm:grid-cols-2">
                      <li>
                        <Link href={rubrique.href} onClick={fermer} className="flex items-center gap-3 rounded-chantier py-3 pr-3 cote text-[1.125rem] text-jaune">
                          Vue d&apos;ensemble
                          <Icone nom="fleche" size={18} weight="bold" />
                        </Link>
                      </li>
                      {rubrique.liens.map((lien) => (
                        <li key={lien.href}>
                          <Link href={lien.href} onClick={fermer} className="flex items-start gap-3 rounded-chantier py-3 pr-3">
                            <Icone nom={lien.icone} size={22} className="mt-0.5 shrink-0 text-ciel" />
                            <span>
                              <span className="block cote text-[1.125rem] text-blanc">{lien.titre}</span>
                              <span className="block text-[0.9375rem] leading-snug text-brume">{lien.description}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
            <Link href="/contact" onClick={fermer} className="mt-1 block px-4 py-4 titre text-[1.875rem] text-blanc">
              Contact
            </Link>
          </nav>

          <div className="conteneur mt-10 grid gap-3 pb-10 sm:grid-cols-2">
            <Link
              href="/contact#devis"
              onClick={fermer}
              className="flex min-h-14 items-center justify-center gap-3 rounded-chantier bg-jaune px-6 cote text-[1.125rem] uppercase tracking-[0.04em] text-nuit"
            >
              Demander un devis
              <Icone nom="fleche" size={20} weight="bold" />
            </Link>
            <a
              href={whatsapp.lien}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center justify-center gap-3 rounded-chantier px-6 cote text-[1.125rem] uppercase tracking-[0.04em] text-blanc contour-clair"
            >
              <Icone nom="whatsapp" size={22} weight="bold" />
              WhatsApp
            </a>
            <ul className="mt-4 grid gap-2 sm:col-span-2">
              {telephones.map((t) => (
                <li key={t.affichage}>
                  <a href={t.lien} className="inline-flex items-center gap-3 cote text-[1.25rem] text-blanc chiffres-tabulaires">
                    <Icone nom="telephone" size={20} className="text-ciel" />
                    {t.affichage}
                    <span className="text-[0.9375rem] text-brume">{t.mobile ? "mobile" : "standard"}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

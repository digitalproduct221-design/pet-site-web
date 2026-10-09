"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu } from "radix-ui";
import { useState } from "react";
import { navigation } from "@/content/site";
import { photos } from "@/content/photos";
import { Icone } from "@/components/ui/Icone";

/**
 * Méga-menu pleine largeur à trois colonnes (titre et intro / liens / carte image).
 * Radix gère l'accessibilité : flèches gauche/droite entre rubriques, flèche bas
 * pour entrer dans un panneau, Échap pour fermer, clic extérieur, toucher.
 */
export function MegaMenu() {
  const [ouvert, setOuvert] = useState("");
  const chemin = usePathname();

  return (
    <>
      <NavigationMenu.Root
        value={ouvert}
        onValueChange={setOuvert}
        delayDuration={120}
        skipDelayDuration={400}
        aria-label="Navigation principale"
        className="static hidden nav:block"
      >
        <NavigationMenu.List className="flex items-center">
          {navigation.map((rubrique) => {
            const actif = chemin.startsWith(rubrique.href) || (rubrique.id === "actualites-carrieres" && chemin.startsWith("/carrieres"));
            return (
              <NavigationMenu.Item key={rubrique.id} value={rubrique.id}>
                <NavigationMenu.Trigger
                  className={`group/declencheur relative flex h-[var(--header-h)] items-center gap-1 whitespace-nowrap px-2.5 cote text-[1.0625rem] text-nuit outline-offset-[-6px] transition-colors hover:text-royal data-[state=open]:text-royal xl:px-4 ${actif ? "text-royal" : ""}`}
                >
                  {rubrique.titre}
                  <Icone
                    nom="chevron"
                    size={14}
                    weight="bold"
                    className="transition-transform duration-300 ease-chantier group-data-[state=open]/declencheur:rotate-180"
                  />
                  <span
                    aria-hidden
                    className={`absolute inset-x-2.5 bottom-0 h-[3px] origin-left bg-jaune transition-transform duration-500 ease-chantier xl:inset-x-4 ${
                      actif ? "scale-x-100" : "scale-x-0 group-data-[state=open]/declencheur:scale-x-100"
                    }`}
                  />
                </NavigationMenu.Trigger>

                <NavigationMenu.Content className="panneau-menu">
                  <div className="conteneur grid grid-cols-12 gap-8 py-12">
                    {/* Colonne 1 : titre et intro */}
                    <div className="col-span-4 border-r border-ligne pr-8">
                      <p className="titre text-titre-l text-nuit">{rubrique.titre}</p>
                      <p className="mt-5 cote text-[1.25rem] italic leading-snug text-royal">{rubrique.intro}</p>
                      <NavigationMenu.Link asChild>
                        <Link
                          href={rubrique.href}
                          className="mt-8 inline-flex items-center gap-2 cote text-[1.0625rem] uppercase tracking-[0.04em] text-nuit underline decoration-jaune decoration-[3px] underline-offset-[6px] hover:text-royal"
                        >
                          Vue d&apos;ensemble
                          <Icone nom="fleche" size={18} weight="bold" />
                        </Link>
                      </NavigationMenu.Link>
                    </div>

                    {/* Colonne 2 : liens */}
                    <ul className={`col-span-5 grid content-start gap-x-6 gap-y-1 ${rubrique.liens.length > 5 ? "grid-cols-2" : "grid-cols-1"}`}>
                      {rubrique.liens.map((lien) => (
                        <li key={lien.href}>
                          <NavigationMenu.Link asChild>
                            <Link
                              href={lien.href}
                              className="group/lien flex items-start gap-4 rounded-chantier p-3 transition-colors hover:bg-sable focus-visible:bg-sable"
                            >
                              <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-chantier bg-sable text-royal transition-colors group-hover/lien:bg-royal group-hover/lien:text-blanc">
                                <Icone nom={lien.icone} size={22} />
                              </span>
                              <span>
                                <span className="block cote text-[1.125rem] text-nuit group-hover/lien:text-royal">{lien.titre}</span>
                                <span className="mt-0.5 block text-[0.9375rem] leading-snug text-texte-doux">{lien.description}</span>
                              </span>
                            </Link>
                          </NavigationMenu.Link>
                        </li>
                      ))}
                    </ul>

                    {/* Colonne 3 : carte image */}
                    <div className="col-span-3">
                      <NavigationMenu.Link asChild>
                        <Link href={rubrique.carte.lien.href} className="group/carte block">
                          <span className="equerres block" data-vu="true" style={{ ["--equerre-decalage" as string]: "8px", ["--equerre-taille" as string]: "1.75rem" }}>
                            <span className="relative block aspect-[4/3] overflow-hidden rounded-chantier bg-nuit">
                              <Image
                                src={photos[rubrique.carte.photo].src}
                                alt={photos[rubrique.carte.photo].alt}
                                fill
                                sizes="22vw"
                               
                                className="object-cover transition-transform duration-700 ease-chantier group-hover/carte:scale-[1.04]"
                              />
                              <span aria-hidden className="absolute inset-0 bg-[var(--voile-photo)]" />
                            </span>
                          </span>
                          <span className="mt-4 block text-[0.9375rem] leading-snug text-texte-doux">{rubrique.carte.titre}</span>
                          <span className="mt-2 inline-flex items-center gap-2 cote text-[1.0625rem] text-royal group-hover/carte:underline group-hover/carte:underline-offset-4">
                            {rubrique.carte.lien.libelle}
                            <Icone nom="fleche" size={18} weight="bold" />
                          </span>
                        </Link>
                      </NavigationMenu.Link>
                    </div>
                  </div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            );
          })}
        </NavigationMenu.List>

        <div className="absolute inset-x-0 top-full">
          <NavigationMenu.Viewport className="viewport-menu relative w-full overflow-hidden border-t border-ligne bg-blanc ombre-flottante" />
        </div>
      </NavigationMenu.Root>

      {/* Voile sous le menu ouvert : recentre l'attention (Radix ferme au clic extérieur) */}
      <div
        aria-hidden
        className={`absolute inset-x-0 top-full -z-10 hidden h-dvh bg-nuit/35 transition-opacity duration-300 nav:block ${
          ouvert ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
    </>
  );
}

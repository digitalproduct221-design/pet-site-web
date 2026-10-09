"use client";

import { useSearchParams } from "next/navigation";
import { besoins } from "@/content/besoins";
import { domaineParSlug } from "@/content/site";
import { Formulaire } from "./Formulaire";

/** Devis : domaine et objet préremplis quand on arrive depuis « Votre projet » (?besoin=…). */
export function FormulaireDevis() {
  const demande = useSearchParams().get("besoin");
  const besoin = besoins.find((b) => b.slug === demande);
  const domaine = besoin ? domaineParSlug(besoin.domaine)?.titre ?? "" : "";
  return (
    <Formulaire
      key={besoin?.slug ?? "devis"}
      type="devis"
      domaineInitial={domaine}
      messageInitial={besoin ? `Mon projet : ${besoin.titre.toLowerCase()}.\n` : ""}
    />
  );
}

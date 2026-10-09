"use client";

import { useSearchParams } from "next/navigation";
import { offres } from "@/content/exemples";
import { Formulaire } from "./Formulaire";

/** Candidature : le poste est prérempli quand on arrive depuis « Postuler ». */
export function FormulaireCandidature() {
  const id = useSearchParams().get("poste");
  const offre = offres.find((o) => o.id === id);
  return <Formulaire key={offre?.id ?? "spontanee"} type="candidature" posteInitial={offre?.poste ?? ""} />;
}

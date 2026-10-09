"use client";

import { useSearchParams } from "next/navigation";
import { metiers } from "@/content/site";
import { Formulaire } from "./Formulaire";

/** Candidature spontanée : le métier est prérempli quand on arrive depuis la liste des métiers. */
export function FormulaireCandidature() {
  const id = useSearchParams().get("metier");
  const metier = metiers.find((m) => m.id === id);
  return <Formulaire key={metier?.id ?? "spontanee"} type="candidature" posteInitial={metier?.titre ?? ""} />;
}

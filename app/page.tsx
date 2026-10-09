import type { Metadata } from "next";
import { Hero } from "@/components/accueil/Hero";
import { Chiffres } from "@/components/accueil/Chiffres";
import { Presentation } from "@/components/accueil/Presentation";
import { RubanValeurs } from "@/components/accueil/RubanValeurs";
import { SavoirFaire } from "@/components/accueil/SavoirFaire";
import { RealisationsVedette } from "@/components/accueil/RealisationsVedette";
import { Pourquoi } from "@/components/accueil/Pourquoi";
import { Methode } from "@/components/accueil/Methode";
import { Carrieres } from "@/components/accueil/Carrieres";
import { AppelFinal } from "@/components/accueil/AppelFinal";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Accueil() {
  return (
    <>
      <Hero />
      <Chiffres />
      <Presentation />
      <RubanValeurs />
      <SavoirFaire />
      <RealisationsVedette />
      <Pourquoi />
      <Methode />
      <Carrieres />
      <AppelFinal />
    </>
  );
}

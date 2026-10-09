"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { urlMedia } from "@/content/images";
import type { Contexte } from "./EspaceAdmin";
import { envoyerImage, supprimerImages } from "./images";
import { boutonDanger, boutonPrincipal, boutonSecondaire, CaseAcocher, champ, Champ, Message, Pastille } from "./ui";

type Partenaire = { id: string; nom: string; logo: string; url: string | null; publie: boolean; ordre: number };

/** Partenaires : un nom, un logo, un lien. La section de l'accueil apparaît au premier publié. */
export function OngletPartenaires({ supabase, publier }: Contexte) {
  const [liste, setListe] = useState<Partenaire[]>([]);
  const [nom, setNom] = useState("");
  const [url, setUrl] = useState("");
  const [fichier, setFichier] = useState<File | null>(null);
  const [publie, setPublie] = useState(true);
  const [envoi, setEnvoi] = useState(false);
  const [message, setMessage] = useState<{ type: "succes" | "erreur"; texte: string } | null>(null);

  const charger = useCallback(async () => {
    const { data } = await supabase.from("partenaires").select("id, nom, logo, url, publie, ordre").order("ordre");
    setListe((data ?? []) as Partenaire[]);
  }, [supabase]);

  useEffect(() => {
    // Chargement initial depuis la base : l'état est mis à jour une fois la réponse reçue
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void charger();
  }, [charger]);

  const ajouter = async (e: FormEvent) => {
    e.preventDefault();
    if (!fichier) return;
    setEnvoi(true);
    try {
      const { chemin } = await envoyerImage(supabase, "partenaires", fichier);
      const ordre = liste.reduce((m, p) => Math.max(m, p.ordre), -1) + 1;
      const { error } = await supabase.from("partenaires").insert({ nom: nom.trim(), logo: chemin, url: url.trim() || null, publie, ordre });
      if (error) throw error;
      setNom("");
      setUrl("");
      setFichier(null);
      await publier(["partenaires"]);
      await charger();
      setMessage({ type: "succes", texte: "Partenaire ajouté." });
    } catch {
      setMessage({ type: "erreur", texte: "L'ajout a échoué. Vérifiez la connexion et réessayez." });
    }
    setEnvoi(false);
  };

  const basculer = async (p: Partenaire) => {
    await supabase.from("partenaires").update({ publie: !p.publie }).eq("id", p.id);
    await publier(["partenaires"]);
    await charger();
  };

  const supprimer = async (p: Partenaire) => {
    if (!window.confirm(`Retirer « ${p.nom} » ?`)) return;
    await supprimerImages(supabase, [p.logo]);
    await supabase.from("partenaires").delete().eq("id", p.id);
    await publier(["partenaires"]);
    await charger();
    setMessage({ type: "succes", texte: "Partenaire retiré." });
  };

  return (
    <div className="grid gap-8">
      <form onSubmit={ajouter} className="grid gap-5 rounded-panneau bg-blanc p-5 ombre-carte sm:p-8">
        <h2 className="titre text-titre-s text-nuit">Ajouter un partenaire</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Champ libelle="Nom">
            <input required value={nom} onChange={(e) => setNom(e.target.value)} className={champ} />
          </Champ>
          <Champ libelle="Site web (facultatif)">
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} className={champ} placeholder="https://" />
          </Champ>
        </div>
        <Champ libelle="Logo" aide="PNG transparent ou SVG de préférence.">
          <input required type="file" accept="image/png,image/svg+xml,image/webp,image/jpeg" onChange={(e) => setFichier(e.target.files?.[0] ?? null)} className={`${champ} py-2`} />
        </Champ>
        <CaseAcocher libelle="Afficher sur le site" checked={publie} onChange={setPublie} />
        <div>
          <button type="submit" disabled={envoi} className={boutonPrincipal}>
            {envoi ? "Envoi…" : "Ajouter"}
          </button>
        </div>
      </form>
      {message ? <Message type={message.type}>{message.texte}</Message> : null}
      <ul className="grid gap-4 sm:grid-cols-2">
        {liste.map((p) => (
          <li key={p.id} className="flex items-center gap-4 rounded-panneau bg-blanc p-4 ombre-carte">
            <div className="relative h-12 w-24 shrink-0">
              <Image src={urlMedia(p.logo)} alt="" fill sizes="96px" className="object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate cote text-[1.0625rem] text-nuit">{p.nom}</p>
              <Pastille publie={p.publie} />
            </div>
            <div className="flex flex-col gap-2">
              <button type="button" onClick={() => basculer(p)} className={boutonSecondaire}>
                {p.publie ? "Masquer" : "Afficher"}
              </button>
              <button type="button" onClick={() => supprimer(p)} className={boutonDanger}>
                Retirer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

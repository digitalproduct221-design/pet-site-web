"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { imageDepuisChemin } from "@/content/images";
import type { Contexte } from "./EspaceAdmin";
import { envoyerImage, supprimerImages } from "./images";
import { boutonDanger, boutonPrincipal, boutonSecondaire, CaseAcocher, champ, Champ, Message, Pastille } from "./ui";

type Actualite = { id: string; titre: string; texte: string; photo: string | null; publie_le: string; publie: boolean };

const aujourdhui = () => new Date().toISOString().slice(0, 10);

/** Nouvelles du quotidien : une photo, un titre, quelques lignes. */
export function OngletActualites({ supabase, publier }: Contexte) {
  const [liste, setListe] = useState<Actualite[]>([]);
  const [edition, setEdition] = useState<Actualite | "nouvelle" | null>(null);
  const [message, setMessage] = useState<{ type: "succes" | "erreur"; texte: string } | null>(null);

  const charger = useCallback(async () => {
    const { data } = await supabase.from("actualites").select("id, titre, texte, photo, publie_le, publie").order("publie_le", { ascending: false });
    setListe((data ?? []) as Actualite[]);
  }, [supabase]);

  useEffect(() => {
    void charger();
  }, [charger]);

  const apres = async (texte: string) => {
    await publier(["actualites"]);
    await charger();
    setMessage({ type: "succes", texte });
  };

  const supprimer = async (a: Actualite) => {
    if (!window.confirm(`Supprimer « ${a.titre} » ?`)) return;
    await supprimerImages(supabase, [a.photo]);
    await supabase.from("actualites").delete().eq("id", a.id);
    await apres("Nouvelle supprimée.");
  };

  if (edition) {
    const initiale = edition === "nouvelle" ? null : edition;
    return (
      <FormulaireActualite
        supabase={supabase}
        initiale={initiale}
        onAnnuler={() => setEdition(null)}
        onFini={async (t) => {
          setEdition(null);
          await apres(t);
        }}
      />
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-encre-douce">{liste.length} nouvelle{liste.length > 1 ? "s" : ""}</p>
        <button type="button" onClick={() => setEdition("nouvelle")} className={boutonPrincipal}>
          Publier une nouvelle
        </button>
      </div>
      {message ? <Message type={message.type}>{message.texte}</Message> : null}
      <ul className="grid gap-4">
        {liste.map((a) => {
          const image = a.photo ? imageDepuisChemin(a.photo, a.titre) : null;
          return (
            <li key={a.id} className="grid gap-4 rounded-panneau bg-blanc p-4 ombre-carte sm:grid-cols-[8rem_1fr_auto] sm:items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-chantier bg-sable-soutenu">
                {image ? <Image src={image.src} alt="" fill sizes="128px" className="object-cover" /> : null}
              </div>
              <div>
                <p className="flex flex-wrap items-center gap-2">
                  <span className="titre text-[1.375rem] leading-none text-nuit">{a.titre}</span>
                  <Pastille publie={a.publie} />
                </p>
                <p className="mt-1 text-[0.9375rem] text-encre-douce">{a.publie_le}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setEdition(a)} className={boutonSecondaire}>
                  Modifier
                </button>
                <button type="button" onClick={() => supprimer(a)} className={boutonDanger}>
                  Supprimer
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function FormulaireActualite({
  supabase,
  initiale,
  onFini,
  onAnnuler,
}: {
  supabase: Contexte["supabase"];
  initiale: Actualite | null;
  onFini: (t: string) => Promise<void>;
  onAnnuler: () => void;
}) {
  const [titre, setTitre] = useState(initiale?.titre ?? "");
  const [texte, setTexte] = useState(initiale?.texte ?? "");
  const [date, setDate] = useState(initiale?.publie_le ?? aujourdhui());
  const [publie, setPublie] = useState(initiale?.publie ?? true);
  const [fichier, setFichier] = useState<File | null>(null);
  const [retirerPhoto, setRetirerPhoto] = useState(false);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");

  const enregistrer = async (e: FormEvent) => {
    e.preventDefault();
    setEnvoi(true);
    setErreur("");
    try {
      let photo = retirerPhoto ? null : (initiale?.photo ?? null);
      let dimensions: { largeur?: number; hauteur?: number } = {};
      if (fichier) {
        const envoyee = await envoyerImage(supabase, "actualites", fichier);
        photo = envoyee.chemin;
        dimensions = { largeur: envoyee.largeur, hauteur: envoyee.hauteur };
      }
      if ((fichier || retirerPhoto) && initiale?.photo) await supprimerImages(supabase, [initiale.photo]);
      const donnees = { titre: titre.trim(), texte: texte.trim(), publie_le: date, publie, photo, ...dimensions };
      const { error } = initiale
        ? await supabase.from("actualites").update(donnees).eq("id", initiale.id)
        : await supabase.from("actualites").insert(donnees);
      if (error) throw error;
      await onFini(initiale ? "Nouvelle mise à jour." : "Nouvelle publiée.");
    } catch {
      setErreur("L'enregistrement a échoué. Vérifiez la connexion et réessayez.");
      setEnvoi(false);
    }
  };

  return (
    <form onSubmit={enregistrer} className="grid gap-5 rounded-panneau bg-blanc p-5 ombre-carte sm:p-8">
      <h2 className="titre text-titre-s text-nuit">{initiale ? "Modifier la nouvelle" : "Nouvelle du quotidien"}</h2>
      <div className="grid gap-5 sm:grid-cols-[1fr_12rem]">
        <Champ libelle="Titre">
          <input required value={titre} onChange={(e) => setTitre(e.target.value)} className={champ} placeholder="Ex. Coulage du radier à Rufisque" />
        </Champ>
        <Champ libelle="Date">
          <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className={champ} />
        </Champ>
      </div>
      <Champ libelle="Texte" aide="Quelques lignes suffisent.">
        <textarea required rows={5} value={texte} onChange={(e) => setTexte(e.target.value)} className={champ} />
      </Champ>
      <Champ libelle="Photo (facultative)" aide={initiale?.photo ? "Une nouvelle photo remplace l'actuelle." : undefined}>
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFichier(e.target.files?.[0] ?? null)} className={`${champ} py-2`} />
      </Champ>
      <div className="flex flex-wrap gap-6">
        <CaseAcocher libelle="Afficher sur le site" checked={publie} onChange={setPublie} />
        {initiale?.photo ? <CaseAcocher libelle="Retirer la photo" checked={retirerPhoto} onChange={setRetirerPhoto} /> : null}
      </div>
      {erreur ? <Message type="erreur">{erreur}</Message> : null}
      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={envoi} className={boutonPrincipal}>
          {envoi ? "Enregistrement…" : "Enregistrer"}
        </button>
        <button type="button" onClick={onAnnuler} className={boutonSecondaire}>
          Annuler
        </button>
      </div>
    </form>
  );
}

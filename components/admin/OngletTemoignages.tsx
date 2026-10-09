"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { Contexte } from "./EspaceAdmin";
import { boutonDanger, boutonPrincipal, boutonSecondaire, CaseAcocher, champ, Champ, Message, Pastille } from "./ui";

type Temoignage = { id: string; citation: string; auteur: string; fonction: string | null; organisation: string | null; publie: boolean; ordre: number };

/** Témoignages de clients, réels et validés par leurs auteurs. */
export function OngletTemoignages({ supabase, publier }: Contexte) {
  const [liste, setListe] = useState<Temoignage[]>([]);
  const [citation, setCitation] = useState("");
  const [auteur, setAuteur] = useState("");
  const [fonction, setFonction] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [publie, setPublie] = useState(true);
  const [envoi, setEnvoi] = useState(false);
  const [message, setMessage] = useState<{ type: "succes" | "erreur"; texte: string } | null>(null);

  const charger = useCallback(async () => {
    const { data } = await supabase.from("temoignages").select("id, citation, auteur, fonction, organisation, publie, ordre").order("ordre");
    setListe((data ?? []) as Temoignage[]);
  }, [supabase]);

  useEffect(() => {
    // Chargement initial depuis la base : l'état est mis à jour une fois la réponse reçue
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void charger();
  }, [charger]);

  const ajouter = async (e: FormEvent) => {
    e.preventDefault();
    setEnvoi(true);
    const ordre = liste.reduce((m, t) => Math.max(m, t.ordre), -1) + 1;
    const { error } = await supabase.from("temoignages").insert({
      citation: citation.trim(),
      auteur: auteur.trim(),
      fonction: fonction.trim() || null,
      organisation: organisation.trim() || null,
      publie,
      ordre,
    });
    setEnvoi(false);
    if (error) {
      setMessage({ type: "erreur", texte: "L'ajout a échoué. Vérifiez la connexion et réessayez." });
      return;
    }
    setCitation("");
    setAuteur("");
    setFonction("");
    setOrganisation("");
    await publier(["temoignages"]);
    await charger();
    setMessage({ type: "succes", texte: "Témoignage ajouté." });
  };

  const basculer = async (t: Temoignage) => {
    await supabase.from("temoignages").update({ publie: !t.publie }).eq("id", t.id);
    await publier(["temoignages"]);
    await charger();
  };

  const supprimer = async (t: Temoignage) => {
    if (!window.confirm(`Supprimer le témoignage de ${t.auteur} ?`)) return;
    await supabase.from("temoignages").delete().eq("id", t.id);
    await publier(["temoignages"]);
    await charger();
    setMessage({ type: "succes", texte: "Témoignage supprimé." });
  };

  return (
    <div className="grid gap-8">
      <form onSubmit={ajouter} className="grid gap-5 rounded-panneau bg-blanc p-5 ombre-carte sm:p-8">
        <h2 className="titre text-titre-s text-nuit">Ajouter un témoignage</h2>
        <Champ libelle="Citation" aide="Les mots du client, avec son accord.">
          <textarea required rows={4} value={citation} onChange={(e) => setCitation(e.target.value)} className={champ} />
        </Champ>
        <div className="grid gap-5 sm:grid-cols-3">
          <Champ libelle="Nom">
            <input required value={auteur} onChange={(e) => setAuteur(e.target.value)} className={champ} />
          </Champ>
          <Champ libelle="Fonction (facultatif)">
            <input value={fonction} onChange={(e) => setFonction(e.target.value)} className={champ} />
          </Champ>
          <Champ libelle="Organisation (facultatif)">
            <input value={organisation} onChange={(e) => setOrganisation(e.target.value)} className={champ} />
          </Champ>
        </div>
        <CaseAcocher libelle="Afficher sur le site" checked={publie} onChange={setPublie} />
        <div>
          <button type="submit" disabled={envoi} className={boutonPrincipal}>
            {envoi ? "Envoi…" : "Ajouter"}
          </button>
        </div>
      </form>
      {message ? <Message type={message.type}>{message.texte}</Message> : null}
      <ul className="grid gap-4">
        {liste.map((t) => (
          <li key={t.id} className="grid gap-3 rounded-panneau bg-blanc p-5 ombre-carte sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="text-encre">« {t.citation} »</p>
              <p className="mt-2 flex flex-wrap items-center gap-2 cote text-[0.9375rem] text-encre-douce">
                {[t.auteur, t.fonction, t.organisation].filter(Boolean).join(", ")}
                <Pastille publie={t.publie} />
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => basculer(t)} className={boutonSecondaire}>
                {t.publie ? "Masquer" : "Afficher"}
              </button>
              <button type="button" onClick={() => supprimer(t)} className={boutonDanger}>
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

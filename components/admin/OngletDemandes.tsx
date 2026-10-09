"use client";

import { useCallback, useEffect, useState } from "react";
import type { Contexte } from "./EspaceAdmin";
import { boutonDanger, boutonSecondaire, Message } from "./ui";

type Demande = {
  id: string;
  type: "devis" | "candidature";
  nom: string;
  email: string;
  telephone: string;
  societe: string | null;
  domaine: string | null;
  poste: string | null;
  message: string | null;
  fichier: string | null;
  fichier_nom: string | null;
  traitee: boolean;
  recue_le: string;
};

const date = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });

/** Demandes de devis et candidatures reçues par le site, de la plus récente à la plus ancienne. */
export function OngletDemandes({ supabase, onCompte }: Pick<Contexte, "supabase"> & { onCompte: (aTraiter: number) => void }) {
  const [liste, setListe] = useState<Demande[]>([]);
  const [message, setMessage] = useState("");

  const charger = useCallback(async () => {
    const { data } = await supabase.from("demandes").select("*").order("recue_le", { ascending: false }).limit(200);
    const l = (data ?? []) as Demande[];
    setListe(l);
    onCompte(l.filter((d) => !d.traitee).length);
  }, [supabase, onCompte]);

  useEffect(() => {
    // Chargement initial depuis la base : l'état est mis à jour une fois la réponse reçue
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void charger();
  }, [charger]);

  const basculer = async (d: Demande) => {
    await supabase.from("demandes").update({ traitee: !d.traitee }).eq("id", d.id);
    await charger();
  };

  const supprimer = async (d: Demande) => {
    if (!window.confirm(`Supprimer la demande de ${d.nom} ?`)) return;
    if (d.fichier) await supabase.storage.from("demandes").remove([d.fichier]);
    await supabase.from("demandes").delete().eq("id", d.id);
    await charger();
  };

  const telecharger = async (d: Demande) => {
    const { data } = await supabase.storage.from("demandes").createSignedUrl(d.fichier!, 300);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank", "noopener");
    else setMessage("Impossible d'ouvrir la pièce jointe.");
  };

  if (liste.length === 0) {
    return <Message type="info">Aucune demande pour l&apos;instant. Elles arrivent ici, et par e-mail, dès qu&apos;un visiteur remplit un formulaire.</Message>;
  }

  return (
    <div className="grid gap-4">
      {message ? <Message type="erreur">{message}</Message> : null}
      <ul className="grid gap-4">
        {liste.map((d) => (
          <li key={d.id} className={`rounded-panneau bg-blanc p-5 ombre-carte ${d.traitee ? "opacity-70" : ""}`}>
            <div className="flex flex-wrap items-center gap-3">
              <span className={`rounded-chantier px-2.5 py-0.5 cote text-[0.8125rem] uppercase tracking-[0.06em] ${d.type === "devis" ? "bg-jaune text-nuit" : "bg-royal text-blanc"}`}>
                {d.type === "devis" ? "Devis" : "Candidature"}
              </span>
              {!d.traitee ? <span className="rounded-chantier bg-erreur px-2 py-0.5 cote text-[0.8125rem] text-blanc">Nouveau</span> : null}
              <span className="text-[0.9375rem] text-encre-douce">{date.format(new Date(d.recue_le))}</span>
            </div>
            <p className="mt-3 titre text-[1.5rem] leading-none text-nuit">{d.nom}</p>
            <p className="mt-1 text-[0.9375rem] text-encre-douce">
              {[d.societe, d.type === "devis" ? d.domaine : d.poste].filter(Boolean).join(" · ")}
            </p>
            {d.message ? <p className="mt-3 whitespace-pre-wrap rounded-chantier bg-sable p-3 text-[1rem] text-encre">{d.message}</p> : null}
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={`tel:${d.telephone.replace(/\s/g, "")}`} className={boutonSecondaire}>
                Appeler {d.telephone}
              </a>
              <a href={`mailto:${d.email}?subject=${encodeURIComponent("Votre demande à PET")}`} className={boutonSecondaire}>
                Répondre
              </a>
              {d.fichier ? (
                <button type="button" onClick={() => telecharger(d)} className={boutonSecondaire}>
                  Pièce jointe
                </button>
              ) : null}
              <button type="button" onClick={() => basculer(d)} className={boutonSecondaire}>
                {d.traitee ? "Remettre à traiter" : "Marquer comme traitée"}
              </button>
              <button type="button" onClick={() => supprimer(d)} className={boutonDanger}>
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

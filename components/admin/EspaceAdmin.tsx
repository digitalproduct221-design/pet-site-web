"use client";

import type { Session, SupabaseClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { rafraichirSite } from "@/app/admin/actions";
import type { Etiquette } from "@/lib/contenu";
import { supabaseNavigateur } from "@/lib/supabase-navigateur";
import { OngletActualites } from "./OngletActualites";
import { OngletDemandes } from "./OngletDemandes";
import { OngletPartenaires } from "./OngletPartenaires";
import { OngletRealisations } from "./OngletRealisations";
import { OngletTemoignages } from "./OngletTemoignages";
import { boutonPrincipal, boutonSecondaire, champ, Champ, Message } from "./ui";

export type Contexte = {
  supabase: SupabaseClient;
  /** À appeler après chaque modification : met le site à jour. */
  publier: (etiquettes: Etiquette[]) => Promise<void>;
};

const onglets = [
  { id: "demandes", titre: "Demandes" },
  { id: "realisations", titre: "Réalisations" },
  { id: "actualites", titre: "Actualités" },
  { id: "partenaires", titre: "Partenaires" },
  { id: "temoignages", titre: "Témoignages" },
] as const;

/**
 * Espace admin volontairement minimal : se connecter, puis ajouter, masquer ou
 * retirer des réalisations (et leurs photos), des nouvelles, des partenaires et
 * des témoignages. Les droits sont vérifiés par la base (règles d'accès).
 */
export function EspaceAdmin() {
  const supabase = supabaseNavigateur();
  const [session, setSession] = useState<Session | null>(null);
  const [pret, setPret] = useState(false);
  const [estAdmin, setEstAdmin] = useState<boolean | null>(null);
  const [onglet, setOnglet] = useState<(typeof onglets)[number]["id"]>("demandes");
  const [aTraiter, setATraiter] = useState(0);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setPret(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_evenement, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (!supabase || !session) return;
    supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", session.user.id)
      .maybeSingle()
      .then(({ data }) => setEstAdmin(Boolean(data)));
  }, [supabase, session]);

  const publier = useCallback(
    async (etiquettes: Etiquette[]) => {
      const jeton = (await supabase?.auth.getSession())?.data.session?.access_token;
      if (jeton) await rafraichirSite(jeton, etiquettes);
    },
    [supabase],
  );

  if (!supabase) {
    return (
      <Message type="info">
        L&apos;espace admin n&apos;est pas encore branché : il manque les variables NEXT_PUBLIC_SUPABASE_URL et
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (voir le README).
      </Message>
    );
  }
  if (!pret) return <p className="text-encre-douce">Chargement…</p>;
  if (!session) return <Connexion supabase={supabase} />;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-encre-douce">
          Connecté : <span className="text-nuit">{session.user.email}</span>
        </p>
        <div className="flex gap-3">
          <Link href="/" className={boutonSecondaire} data-transition="non">
            Voir le site
          </Link>
          <button type="button" onClick={() => supabase.auth.signOut()} className={boutonSecondaire}>
            Se déconnecter
          </button>
        </div>
      </div>

      {estAdmin === false ? (
        <div className="mt-8">
          <Message type="erreur">Ce compte n&apos;a pas accès à l&apos;espace admin. Demandez à l&apos;administrateur du site de l&apos;ajouter.</Message>
        </div>
      ) : estAdmin === null ? (
        <p className="mt-8 text-encre-douce">Vérification des droits…</p>
      ) : (
        <>
          <div role="tablist" aria-label="Contenus" className="mt-8 flex flex-wrap gap-2">
            {onglets.map((o) => (
              <button
                key={o.id}
                type="button"
                role="tab"
                aria-selected={onglet === o.id}
                onClick={() => setOnglet(o.id)}
                className={`min-h-11 rounded-chantier px-5 cote text-[1.0625rem] transition-colors ${onglet === o.id ? "bg-nuit text-blanc" : "bg-blanc text-nuit ombre-carte hover:text-royal"}`}
              >
                {o.titre}
                {o.id === "demandes" && aTraiter > 0 ? (
                  <span className="ml-2 rounded-full bg-erreur px-2 py-0.5 text-[0.8125rem] text-blanc">{aTraiter}</span>
                ) : null}
              </button>
            ))}
          </div>
          <div role="tabpanel" className="mt-8">
            {onglet === "demandes" ? <OngletDemandes supabase={supabase} onCompte={setATraiter} /> : null}
            {onglet === "realisations" ? <OngletRealisations supabase={supabase} publier={publier} /> : null}
            {onglet === "actualites" ? <OngletActualites supabase={supabase} publier={publier} /> : null}
            {onglet === "partenaires" ? <OngletPartenaires supabase={supabase} publier={publier} /> : null}
            {onglet === "temoignages" ? <OngletTemoignages supabase={supabase} publier={publier} /> : null}
          </div>
        </>
      )}
    </div>
  );
}

function Connexion({ supabase }: { supabase: SupabaseClient }) {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [envoi, setEnvoi] = useState(false);

  const seConnecter = async (e: FormEvent) => {
    e.preventDefault();
    setEnvoi(true);
    setErreur("");
    const { error } = await supabase.auth.signInWithPassword({ email, password: motDePasse });
    setEnvoi(false);
    if (error) setErreur("E-mail ou mot de passe incorrect.");
  };

  return (
    <form onSubmit={seConnecter} className="grid max-w-[26rem] gap-5 rounded-panneau bg-blanc p-6 ombre-carte sm:p-8">
      <h2 className="titre text-titre-s text-nuit">Connexion</h2>
      <Champ libelle="E-mail">
        <input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className={champ} />
      </Champ>
      <Champ libelle="Mot de passe">
        <input type="password" required autoComplete="current-password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} className={champ} />
      </Champ>
      {erreur ? <Message type="erreur">{erreur}</Message> : null}
      <button type="submit" disabled={envoi} className={boutonPrincipal}>
        {envoi ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}

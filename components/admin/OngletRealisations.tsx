"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { imageDepuisChemin } from "@/content/images";
import { domaines } from "@/content/site";
import type { Contexte } from "./EspaceAdmin";
import { envoyerImage, supprimerImages } from "./images";
import { boutonDanger, boutonPrincipal, boutonSecondaire, CaseAcocher, champ, Champ, Message, Pastille } from "./ui";

type Photo = { id: string; chemin: string; alt: string; ordre: number };
type Realisation = {
  id: string;
  slug: string;
  titre: string;
  domaine: string;
  resume: string;
  travaux: string[];
  reference: boolean;
  publie: boolean;
  ordre: number;
  realisation_photos: Photo[];
};

const vide = { titre: "", domaine: "batiment", resume: "", travaux: "", reference: false, publie: true };

/** Adresse de la fiche, tirée du titre (« Pose de conduite » → « pose-de-conduite »). */
const slugDe = (titre: string) =>
  titre
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

export function OngletRealisations({ supabase, publier }: Contexte) {
  const [liste, setListe] = useState<Realisation[]>([]);
  const [edition, setEdition] = useState<Realisation | "nouvelle" | null>(null);
  const [message, setMessage] = useState<{ type: "succes" | "erreur"; texte: string } | null>(null);

  const charger = useCallback(async () => {
    const { data, error } = await supabase
      .from("realisations")
      .select("id, slug, titre, domaine, resume, travaux, reference, publie, ordre, realisation_photos (id, chemin, alt, ordre)")
      .order("ordre")
      .order("cree_le", { ascending: false });
    if (error) setMessage({ type: "erreur", texte: "Impossible de charger les réalisations." });
    else setListe((data ?? []) as Realisation[]);
  }, [supabase]);

  useEffect(() => {
    void charger();
  }, [charger]);

  const apres = async (texte: string) => {
    await publier(["realisations"]);
    await charger();
    setMessage({ type: "succes", texte });
  };

  const basculer = async (r: Realisation) => {
    await supabase.from("realisations").update({ publie: !r.publie }).eq("id", r.id);
    await apres(r.publie ? "Réalisation masquée du site." : "Réalisation remise en ligne.");
  };

  const supprimer = async (r: Realisation) => {
    if (!window.confirm(`Supprimer définitivement « ${r.titre} » et ses photos ?`)) return;
    await supprimerImages(supabase, r.realisation_photos.map((p) => p.chemin));
    const { error } = await supabase.from("realisations").delete().eq("id", r.id);
    if (error) setMessage({ type: "erreur", texte: "La suppression a échoué." });
    else await apres("Réalisation supprimée.");
  };

  if (edition) {
    return (
      <Formulaire
        supabase={supabase}
        initiale={edition === "nouvelle" ? null : edition}
        onFini={async (texte) => {
          setEdition(null);
          await apres(texte);
        }}
        onAnnuler={() => setEdition(null)}
      />
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-encre-douce">{liste.length} réalisation{liste.length > 1 ? "s" : ""}</p>
        <button type="button" onClick={() => setEdition("nouvelle")} className={boutonPrincipal}>
          Ajouter une réalisation
        </button>
      </div>
      {message ? <Message type={message.type}>{message.texte}</Message> : null}
      <ul className="grid gap-4">
        {liste.map((r) => {
          const premiere = r.realisation_photos.toSorted((a, b) => a.ordre - b.ordre)[0];
          const image = premiere ? imageDepuisChemin(premiere.chemin, r.titre) : null;
          return (
            <li key={r.id} className="grid gap-4 rounded-panneau bg-blanc p-4 ombre-carte sm:grid-cols-[8rem_1fr_auto] sm:items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-chantier bg-sable-soutenu">
                {image ? <Image src={image.src} alt="" fill sizes="128px" className="object-cover" /> : null}
              </div>
              <div>
                <p className="flex flex-wrap items-center gap-2">
                  <span className="titre text-[1.375rem] leading-none text-nuit">{r.titre}</span>
                  <Pastille publie={r.publie} />
                </p>
                <p className="mt-1 text-[0.9375rem] text-encre-douce">
                  {domaines.find((d) => d.slug === r.domaine)?.titre} · {r.realisation_photos.length} photo{r.realisation_photos.length > 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setEdition(r)} className={boutonSecondaire}>
                  Modifier
                </button>
                <button type="button" onClick={() => basculer(r)} className={boutonSecondaire}>
                  {r.publie ? "Masquer" : "Remettre en ligne"}
                </button>
                <button type="button" onClick={() => supprimer(r)} className={boutonDanger}>
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

function Formulaire({
  supabase,
  initiale,
  onFini,
  onAnnuler,
}: {
  supabase: Contexte["supabase"];
  initiale: Realisation | null;
  onFini: (message: string) => Promise<void>;
  onAnnuler: () => void;
}) {
  const [valeurs, setValeurs] = useState(
    initiale
      ? { titre: initiale.titre, domaine: initiale.domaine, resume: initiale.resume, travaux: initiale.travaux.join("\n"), reference: initiale.reference, publie: initiale.publie }
      : vide,
  );
  const [photos, setPhotos] = useState<Photo[]>(initiale?.realisation_photos.toSorted((a, b) => a.ordre - b.ordre) ?? []);
  const [retirees, setRetirees] = useState<Photo[]>([]);
  const [nouvelles, setNouvelles] = useState<File[]>([]);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");

  const maj = <K extends keyof typeof valeurs>(cle: K, v: (typeof valeurs)[K]) => setValeurs((x) => ({ ...x, [cle]: v }));

  const enregistrer = async (e: FormEvent) => {
    e.preventDefault();
    if (photos.length + nouvelles.length === 0) {
      setErreur("Ajoutez au moins une photo : une réalisation, c'est d'abord ses photos.");
      return;
    }
    setEnvoi(true);
    setErreur("");
    try {
      const donnees = {
        titre: valeurs.titre.trim(),
        domaine: valeurs.domaine,
        resume: valeurs.resume.trim(),
        travaux: valeurs.travaux.split("\n").map((t) => t.trim()).filter(Boolean),
        reference: valeurs.reference,
        publie: valeurs.publie,
      };
      let id = initiale?.id;
      if (id) {
        const { error } = await supabase.from("realisations").update(donnees).eq("id", id);
        if (error) throw error;
      } else {
        const slug = `${slugDe(donnees.titre) || "realisation"}-${Date.now().toString(36).slice(-4)}`;
        const { data, error } = await supabase.from("realisations").insert({ ...donnees, slug }).select("id").single();
        if (error) throw error;
        id = data.id;
      }
      // Photos retirées : lignes puis fichiers
      if (retirees.length) {
        await supabase.from("realisation_photos").delete().in("id", retirees.map((p) => p.id));
        await supprimerImages(supabase, retirees.map((p) => p.chemin));
      }
      // Nouvelles photos : envoi (redimensionnées) puis lignes, à la suite des autres
      let ordre = photos.reduce((m, p) => Math.max(m, p.ordre), -1) + 1;
      for (const fichier of nouvelles) {
        const envoyee = await envoyerImage(supabase, "realisations", fichier);
        const { error } = await supabase.from("realisation_photos").insert({ realisation_id: id, ...envoyee, alt: donnees.titre, ordre: ordre++ });
        if (error) throw error;
      }
      await onFini(initiale ? "Réalisation mise à jour." : "Réalisation ajoutée.");
    } catch {
      setErreur("L'enregistrement a échoué. Vérifiez la connexion et réessayez.");
      setEnvoi(false);
    }
  };

  return (
    <form onSubmit={enregistrer} className="grid gap-6 rounded-panneau bg-blanc p-5 ombre-carte sm:p-8">
      <h2 className="titre text-titre-s text-nuit">{initiale ? "Modifier la réalisation" : "Nouvelle réalisation"}</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <Champ libelle="Titre">
          <input required value={valeurs.titre} onChange={(e) => maj("titre", e.target.value)} className={champ} placeholder="Ex. Pose de conduite à Pikine" />
        </Champ>
        <Champ libelle="Domaine">
          <select value={valeurs.domaine} onChange={(e) => maj("domaine", e.target.value)} className={champ}>
            {domaines.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.titre}
              </option>
            ))}
          </select>
        </Champ>
      </div>
      <Champ libelle="Description courte" aide="Une phrase, affichée sous le titre.">
        <textarea rows={2} value={valeurs.resume} onChange={(e) => maj("resume", e.target.value)} className={champ} />
      </Champ>
      <Champ libelle="Travaux réalisés" aide="Un travail par ligne (facultatif).">
        <textarea rows={3} value={valeurs.travaux} onChange={(e) => maj("travaux", e.target.value)} className={champ} />
      </Champ>

      <fieldset>
        <legend className="cote text-[1rem] text-nuit">Photos</legend>
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {photos.map((p) => {
            const image = imageDepuisChemin(p.chemin, valeurs.titre);
            return (
              <li key={p.id} className="relative aspect-[4/3] overflow-hidden rounded-chantier bg-sable-soutenu">
                {image ? <Image src={image.src} alt="" fill sizes="200px" className="object-cover" /> : null}
                <button
                  type="button"
                  onClick={() => {
                    setPhotos((x) => x.filter((y) => y.id !== p.id));
                    setRetirees((x) => [...x, p]);
                  }}
                  className="absolute right-2 top-2 rounded-chantier bg-nuit/85 px-2.5 py-1 cote text-[0.875rem] text-blanc hover:bg-erreur"
                >
                  Retirer
                </button>
              </li>
            );
          })}
          {nouvelles.map((f, i) => (
            <li key={`${f.name}-${i}`} className="grid aspect-[4/3] place-items-center rounded-chantier bg-sable p-2 text-center text-[0.875rem] text-encre-douce">
              <span>
                {f.name}
                <button type="button" onClick={() => setNouvelles((x) => x.filter((_, j) => j !== i))} className="mt-2 block w-full cote text-erreur underline">
                  Ne pas ajouter
                </button>
              </span>
            </li>
          ))}
        </ul>
        <label className={`${boutonSecondaire} mt-4 cursor-pointer`}>
          Ajouter des photos
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="sr-only"
            onChange={(e) => {
              const fichiers = Array.from(e.target.files ?? []);
              setNouvelles((x) => [...x, ...fichiers]);
              e.target.value = "";
            }}
          />
        </label>
        <p className="mt-2 text-[0.875rem] text-encre-douce">JPEG, PNG ou WebP. Elles sont réduites automatiquement avant l&apos;envoi.</p>
      </fieldset>

      <div className="flex flex-wrap gap-6">
        <CaseAcocher libelle="Afficher sur le site" checked={valeurs.publie} onChange={(v) => maj("publie", v)} />
        <CaseAcocher libelle="Référence mise en avant" checked={valeurs.reference} onChange={(v) => maj("reference", v)} />
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

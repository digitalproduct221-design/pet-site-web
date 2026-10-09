"use client";

import { useRef, useState, type ReactNode } from "react";
import { EXTENSIONS_ACCEPTEES, optionsDomaine, valider, type Erreurs, type TypeFormulaire } from "@/content/formulaires";
import { email, whatsapp } from "@/content/site";
import { Icone } from "@/components/ui/Icone";
import { Pelleteuse } from "@/components/ui/Pelleteuse";

type Etat = { statut: "repos" } | { statut: "envoi" } | { statut: "succes"; simule: boolean } | { statut: "echec" };

const libelles: Record<string, string> = {
  nom: "Nom et prénom",
  societe: "Société",
  email: "E-mail",
  telephone: "Téléphone",
  domaine: "Domaine concerné",
  message: "Votre projet",
  poste: "Poste visé",
  fichier: "Pièce jointe",
  consentement: "Consentement",
};

const champBase =
  "mt-2 block w-full rounded-chantier bg-blanc-pur px-4 py-3.5 text-[1.0625rem] text-encre shadow-[inset_0_0_0_1.5px_var(--color-contour)] transition-shadow placeholder:text-encre-douce hover:shadow-[inset_0_0_0_1.5px_var(--color-encre-douce)] focus:outline-none focus:anneau-champ aria-[invalid=true]:shadow-[inset_0_0_0_2px_var(--color-erreur)]";

function Champ({
  nom,
  libelle,
  requis = false,
  aide,
  erreur,
  children,
}: {
  nom: string;
  libelle: string;
  requis?: boolean;
  aide?: string;
  erreur?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`champ-${nom}`} className="cote text-[1.0625rem] text-nuit">
        {libelle}
        {requis ? (
          <span className="text-erreur" aria-hidden>
            {" "}
            *
          </span>
        ) : (
          <span className="text-[0.9375rem] font-medium text-encre-douce"> (facultatif)</span>
        )}
      </label>
      {children}
      {aide ? (
        <p id={`aide-${nom}`} className="mt-1.5 text-[0.9375rem] text-encre-douce">
          {aide}
        </p>
      ) : null}
      {erreur ? (
        <p id={`erreur-${nom}`} className="mt-1.5 flex items-start gap-1.5 text-[0.9375rem] font-semibold text-erreur">
          <Icone nom="erreur" size={18} weight="bold" className="mt-0.5 shrink-0" />
          {erreur}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Formulaire de devis ou de candidature, envoyé à /api/contact.
 * Validation au départ du champ puis à l'envoi ; résumé des erreurs focalisé.
 */
export function Formulaire({
  type,
  posteInitial = "",
  domaineInitial = "",
  messageInitial = "",
}: {
  type: TypeFormulaire;
  posteInitial?: string;
  domaineInitial?: string;
  messageInitial?: string;
}) {
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [etat, setEtat] = useState<Etat>({ statut: "repos" });
  const [nomFichier, setNomFichier] = useState("");
  const formulaire = useRef<HTMLFormElement>(null);
  const resume = useRef<HTMLDivElement>(null);
  const succes = useRef<HTMLDivElement>(null);

  const decrit = (nom: string, aide = false) =>
    [aide ? `aide-${nom}` : "", erreurs[nom] ? `erreur-${nom}` : ""].filter(Boolean).join(" ") || undefined;

  // Revalide un champ en quittant, seulement s'il était déjà en erreur.
  const revalider = (nom: string) => {
    if (!erreurs[nom] || !formulaire.current) return;
    const nouvelles = valider(type, new FormData(formulaire.current));
    setErreurs((e) => ({ ...e, [nom]: nouvelles[nom] }));
  };

  async function envoyer(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const donnees = new FormData(evt.currentTarget);
    const trouvees = valider(type, donnees);
    setErreurs(trouvees);
    if (Object.keys(trouvees).length > 0) {
      requestAnimationFrame(() => resume.current?.focus());
      return;
    }
    setEtat({ statut: "envoi" });
    try {
      const reponse = await fetch("/api/contact", { method: "POST", body: donnees });
      const corps = await reponse.json();
      if (reponse.ok && corps.ok) {
        setEtat({ statut: "succes", simule: Boolean(corps.simule) });
        formulaire.current?.reset();
        setNomFichier("");
        requestAnimationFrame(() => succes.current?.focus());
      } else if (corps.erreurs) {
        setErreurs(corps.erreurs);
        setEtat({ statut: "repos" });
        requestAnimationFrame(() => resume.current?.focus());
      } else {
        setEtat({ statut: "echec" });
      }
    } catch {
      setEtat({ statut: "echec" });
    }
  }

  const listeErreurs = Object.entries(erreurs).filter(([, m]) => m);
  const sujet = type === "devis" ? "Demande de devis" : "Candidature";

  if (etat.statut === "succes") {
    return (
      <div ref={succes} tabIndex={-1} role="status" className="relative overflow-hidden rounded-panneau bg-blanc-pur p-8 ombre-carte outline-none sm:pr-44 lg:p-10 lg:pr-48">
        {/* Petit clin d'œil : le chantier démarre */}
        <Pelleteuse className="absolute -right-4 top-4 hidden h-auto w-40 text-royal/80 sm:block" />
        <Icone nom="succes" size={44} className="text-succes" />
        <h3 className="mt-5 titre text-titre-m text-nuit">
          {type === "devis" ? "Merci, votre demande est prête" : "Merci pour votre candidature"}
        </h3>
        {etat.simule ? (
          <p className="mt-4 max-w-[36rem] text-[1.0625rem] leading-relaxed text-encre-douce">
            Votre message est complet. L&apos;envoi automatique n&apos;est pas encore activé sur ce site : pour être sûr
            qu&apos;il nous parvienne, écrivez-nous aussi par e-mail ou sur WhatsApp.
          </p>
        ) : (
          <p className="mt-4 max-w-[36rem] text-[1.0625rem] leading-relaxed text-encre-douce">
            Nous l&apos;avons bien reçu et revenons vers vous par téléphone ou par e-mail.
          </p>
        )}
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={`mailto:${email}?subject=${encodeURIComponent(sujet)}`}
            className="inline-flex min-h-12 items-center gap-2 rounded-chantier bg-nuit px-5 cote text-[1rem] text-blanc hover:bg-royal"
          >
            <Icone nom="email" size={20} />
            Écrire par e-mail
          </a>
          <a
            href={whatsapp.lien}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-chantier px-5 cote text-[1rem] text-nuit shadow-[inset_0_0_0_2px_var(--color-nuit)] hover:bg-nuit hover:text-blanc"
          >
            <Icone nom="whatsapp" size={20} />
            WhatsApp<span className="sr-only"> (nouvel onglet)</span>
          </a>
          <button type="button" onClick={() => setEtat({ statut: "repos" })} className="min-h-12 px-3 cote text-[1rem] text-royal underline underline-offset-4">
            Envoyer une autre demande
          </button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formulaire} onSubmit={envoyer} noValidate className="grid gap-6" aria-describedby="mention-requis">
      <input type="hidden" name="type" value={type} />
      {/* Champ piège pour les robots, invisible pour les visiteurs */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`site-web-${type}`}>Site web</label>
        <input id={`site-web-${type}`} name="site_web" tabIndex={-1} autoComplete="off" />
      </div>

      <p id="mention-requis" className="text-[0.9375rem] text-encre-douce">
        Les champs marqués d&apos;un <span className="text-erreur">*</span> sont obligatoires.
      </p>

      {listeErreurs.length > 0 ? (
        <div ref={resume} tabIndex={-1} className="rounded-panneau bg-erreur/[0.07] p-5 outline-none focus-visible:ring-2 focus-visible:ring-erreur">
          <p className="cote text-[1.0625rem] text-erreur">
            {listeErreurs.length === 1 ? "Un champ est à corriger :" : `${listeErreurs.length} champs sont à corriger :`}
          </p>
          <ul className="mt-2 grid gap-1">
            {listeErreurs.map(([nom, message]) => (
              <li key={nom}>
                <a href={`#champ-${nom}`} className="text-[0.9375rem] text-erreur underline underline-offset-4">
                  {libelles[nom] ?? nom} : {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Champ nom="nom" libelle="Nom et prénom" requis erreur={erreurs.nom}>
          <input id="champ-nom" name="nom" autoComplete="name" className={champBase} aria-invalid={!!erreurs.nom} aria-describedby={decrit("nom")} onBlur={() => revalider("nom")} />
        </Champ>
        {type === "devis" ? (
          <Champ nom="societe" libelle="Société ou organisme">
            <input id="champ-societe" name="societe" autoComplete="organization" className={champBase} />
          </Champ>
        ) : (
          <Champ nom="poste" libelle="Poste visé" requis erreur={erreurs.poste}>
            <input
              id="champ-poste"
              name="poste"
              defaultValue={posteInitial}
              placeholder="Ex. conducteur d'engins…"
              className={champBase}
              aria-invalid={!!erreurs.poste}
              aria-describedby={decrit("poste")}
              onBlur={() => revalider("poste")}
            />
          </Champ>
        )}
        <Champ nom="email" libelle="E-mail" requis erreur={erreurs.email}>
          <input id="champ-email" name="email" type="email" autoComplete="email" inputMode="email" spellCheck={false} className={champBase} aria-invalid={!!erreurs.email} aria-describedby={decrit("email")} onBlur={() => revalider("email")} />
        </Champ>
        <Champ nom="telephone" libelle="Téléphone" requis erreur={erreurs.telephone}>
          <input id="champ-telephone" name="telephone" type="tel" autoComplete="tel" inputMode="tel" placeholder="77 000 00 00…" className={champBase} aria-invalid={!!erreurs.telephone} aria-describedby={decrit("telephone")} onBlur={() => revalider("telephone")} />
        </Champ>
      </div>

      {type === "devis" ? (
        <Champ nom="domaine" libelle="Domaine concerné" requis erreur={erreurs.domaine}>
          <div className="relative">
            <select
              id="champ-domaine"
              name="domaine"
              defaultValue={optionsDomaine.includes(domaineInitial) ? domaineInitial : ""}
              className={`${champBase} appearance-none pr-12`}
              aria-invalid={!!erreurs.domaine}
              aria-describedby={decrit("domaine")}
              onBlur={() => revalider("domaine")}
            >
              <option value="" disabled>
                Choisissez un domaine
              </option>
              {optionsDomaine.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <Icone nom="chevron" size={20} weight="bold" className="pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-royal" />
          </div>
        </Champ>
      ) : null}

      <Champ
        nom="message"
        libelle={type === "devis" ? "Votre projet" : "Votre message"}
        requis={type === "devis"}
        aide={type === "devis" ? "Nature des travaux, lieu du chantier, délais souhaités, plans disponibles." : "Votre expérience, vos disponibilités, ce qui vous motive."}
        erreur={erreurs.message}
      >
        <textarea id="champ-message" name="message" rows={6} defaultValue={messageInitial} className={`${champBase} resize-y`} aria-invalid={!!erreurs.message} aria-describedby={decrit("message", true)} onBlur={() => revalider("message")} />
      </Champ>

      <Champ
        nom="fichier"
        libelle={type === "devis" ? "Plans ou documents" : "Votre CV"}
        requis={type === "candidature"}
        aide="PDF, Word ou image, 10 Mo au maximum."
        erreur={erreurs.fichier}
      >
        <label
          htmlFor="champ-fichier"
          className={`depot-fichier mt-2 flex cursor-pointer items-center gap-4 rounded-chantier border-2 border-dashed px-5 py-5 transition-colors hover:border-royal hover:bg-blanc-pur ${
            erreurs.fichier ? "border-erreur" : "border-sable-fonce"
          }`}
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-chantier bg-sable text-royal">
            <Icone nom="fichier" size={24} />
          </span>
          <span className="text-[1rem] text-encre">
            {nomFichier ? (
              <>
                <span className="font-semibold">{nomFichier}</span>
                <span className="block text-[0.9375rem] text-encre-douce">Cliquez pour choisir un autre fichier</span>
              </>
            ) : (
              <>
                <span className="font-semibold text-royal">Choisir un fichier</span>
                <span className="block text-[0.9375rem] text-encre-douce">Depuis votre ordinateur ou votre téléphone</span>
              </>
            )}
          </span>
        </label>
        <input
          id="champ-fichier"
          name="fichier"
          type="file"
          accept={EXTENSIONS_ACCEPTEES.join(",")}
          className="sr-only"
          aria-invalid={!!erreurs.fichier}
          aria-describedby={decrit("fichier", true)}
          onChange={(e) => {
            setNomFichier(e.target.files?.[0]?.name ?? "");
            if (erreurs.fichier) setErreurs((x) => ({ ...x, fichier: undefined }));
          }}
        />
      </Champ>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[1rem] leading-relaxed text-encre">
          <input
            id="champ-consentement"
            type="checkbox"
            name="consentement"
            value="oui"
            className="mt-1 size-5 shrink-0 accent-[var(--color-royal)]"
            aria-invalid={!!erreurs.consentement}
            aria-describedby={erreurs.consentement ? "erreur-consentement" : undefined}
          />
          <span>
            J&apos;accepte que PET utilise ces informations pour répondre à ma demande. Elles ne sont ni revendues ni utilisées à d&apos;autres fins.
            <span className="text-erreur" aria-hidden>
              {" "}
              *
            </span>
          </span>
        </label>
        {erreurs.consentement ? (
          <p id="erreur-consentement" className="mt-1.5 flex items-start gap-1.5 text-[0.9375rem] font-semibold text-erreur">
            <Icone nom="erreur" size={18} weight="bold" className="mt-0.5 shrink-0" />
            {erreurs.consentement}
          </p>
        ) : null}
      </div>

      {etat.statut === "echec" ? (
        <div role="alert" className="rounded-panneau bg-erreur/[0.07] p-5 text-[1rem] text-encre">
          <p className="font-semibold text-erreur">L&apos;envoi n&apos;a pas abouti.</p>
          <p className="mt-1">
            La connexion a peut-être été interrompue. Réessayez dans un instant, ou contactez-nous directement par{" "}
            <a href={`mailto:${email}?subject=${encodeURIComponent(sujet)}`} className="text-royal underline underline-offset-4">
              e-mail
            </a>{" "}
            ou sur{" "}
            <a href={whatsapp.lien} target="_blank" rel="noopener noreferrer" className="text-royal underline underline-offset-4">
              WhatsApp
            </a>
            .
          </p>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={etat.statut === "envoi"}
          className="group/envoi inline-flex min-h-[var(--bouton-h)] items-center gap-3 rounded-chantier bg-jaune px-7 cote text-[1.0625rem] uppercase tracking-[0.04em] text-nuit ombre-bouton transition-colors hover:bg-jaune-profond active:translate-y-px disabled:cursor-wait disabled:opacity-70"
        >
          {etat.statut === "envoi" ? (
            <>
              <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-nuit/30 border-t-nuit" />
              Envoi en cours…
            </>
          ) : (
            <>
              {type === "devis" ? "Envoyer ma demande" : "Envoyer ma candidature"}
              <Icone nom="fleche" size={20} weight="bold" className="transition-transform group-hover/envoi:translate-x-1" />
            </>
          )}
        </button>
        <p className="text-[0.9375rem] text-encre-douce">
          Plus rapide ?{" "}
          <a href={whatsapp.lien} target="_blank" rel="noopener noreferrer" className="text-royal underline underline-offset-4">
            Écrivez-nous sur WhatsApp
          </a>
        </p>
      </div>
    </form>
  );
}

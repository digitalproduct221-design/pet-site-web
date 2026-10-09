// Fonction « demande » : reçoit les formulaires du site (devis et candidature),
// les enregistre, range la pièce jointe dans un stockage privé et prévient par
// e-mail (Resend). Les secrets (RESEND_API_KEY, DEMANDES_EXPEDITEUR,
// DEMANDES_DESTINATAIRES) vivent dans Supabase, jamais dans le site.
import { createClient } from "npm:@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (corps: unknown, status = 200) =>
  new Response(JSON.stringify(corps), { status, headers: { ...CORS, "Content-Type": "application/json" } });

const MAX_FICHIER = 10 * 1024 * 1024;
const EXT = [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"];
const texte = (v: FormDataEntryValue | null, max = 4000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const echapper = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ ok: false }, 405);

  const donnees = await req.formData().catch(() => null);
  if (!donnees) return json({ ok: false, message: "Requête illisible." }, 400);

  const type = donnees.get("type") === "candidature" ? "candidature" : "devis";
  const nom = texte(donnees.get("nom"), 200);
  const email = texte(donnees.get("email"), 200);
  const telephone = texte(donnees.get("telephone"), 40);
  if (nom.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || telephone.replace(/\D/g, "").length < 9) {
    return json({ ok: false, message: "Coordonnées incomplètes." }, 422);
  }
  const societe = texte(donnees.get("societe"), 200);
  const domaine = texte(donnees.get("domaine"), 200);
  const poste = texte(donnees.get("poste"), 200);
  const message = texte(donnees.get("message"));

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false },
  });

  // Freinage simple : 5 demandes par heure et par adresse e-mail
  const { count } = await admin
    .from("demandes")
    .select("id", { count: "exact", head: true })
    .eq("email", email)
    .gte("recue_le", new Date(Date.now() - 3600_000).toISOString());
  if ((count ?? 0) >= 5) return json({ ok: false, message: "Trop de demandes, réessayez plus tard." }, 429);

  // Pièce jointe : stockage privé
  let chemin: string | null = null;
  let nomFichier: string | null = null;
  const fichier = donnees.get("fichier");
  if (fichier instanceof File && fichier.size > 0) {
    const n = fichier.name.toLowerCase();
    if (!EXT.some((e) => n.endsWith(e)) || fichier.size > MAX_FICHIER) return json({ ok: false, message: "Fichier non accepté." }, 422);
    const ext = n.slice(n.lastIndexOf("."));
    chemin = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}${ext}`;
    nomFichier = fichier.name.slice(0, 200);
    const { error } = await admin.storage.from("demandes").upload(chemin, fichier, { contentType: fichier.type || undefined });
    if (error) return json({ ok: false, message: "Envoi du fichier impossible." }, 500);
  }

  const { error: erreurBase } = await admin.from("demandes").insert({
    type, nom, email, telephone, societe: societe || null, domaine: domaine || null,
    poste: poste || null, message: message || null, fichier: chemin, fichier_nom: nomFichier,
  });
  if (erreurBase) return json({ ok: false, message: "Enregistrement impossible." }, 500);

  // Notification par e-mail : une panne d'e-mail ne fait pas perdre la demande (elle est en base)
  let envoye = false;
  const cle = Deno.env.get("RESEND_API_KEY");
  const destinataires = (Deno.env.get("DEMANDES_DESTINATAIRES") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  if (cle && destinataires.length) {
    let lien = "";
    if (chemin) {
      const { data } = await admin.storage.from("demandes").createSignedUrl(chemin, 7 * 86400);
      if (data?.signedUrl) lien = data.signedUrl;
    }
    const titre = type === "devis" ? "Nouvelle demande de devis" : "Nouvelle candidature";
    const lignes: [string, string][] = [
      ["Nom", nom], ["E-mail", email], ["Téléphone", telephone],
      ...(societe ? [["Société", societe] as [string, string]] : []),
      ...(domaine ? [["Domaine", domaine] as [string, string]] : []),
      ...(poste ? [["Poste visé", poste] as [string, string]] : []),
    ];
    const html = `<div style="font-family:Arial,sans-serif;max-width:560px;color:#1a1f2e">
      <h2 style="color:#0b1b3f;margin:0 0 16px">${titre}</h2>
      <table style="border-collapse:collapse;width:100%">${lignes
        .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#454b5e;vertical-align:top">${k}</td><td style="padding:6px 0"><strong>${echapper(v)}</strong></td></tr>`)
        .join("")}</table>
      ${message ? `<p style="margin:16px 0 4px;color:#454b5e">Message</p><p style="white-space:pre-wrap;margin:0;padding:12px;background:#f3ebdd;border-radius:4px">${echapper(message)}</p>` : ""}
      ${lien ? `<p style="margin:16px 0"><a href="${lien}">Télécharger la pièce jointe (${echapper(nomFichier ?? "")})</a> (lien valable 7 jours, ou depuis l'espace admin)</p>` : ""}
      <p style="margin-top:20px;color:#454b5e;font-size:13px">Répondez directement à ce message pour écrire au client.</p></div>`;
    const brut = [`${titre}`, ...lignes.map(([k, v]) => `${k} : ${v}`), message ? `\nMessage :\n${message}` : "", lien ? `\nPièce jointe : ${lien}` : ""].join("\n");
    const rep = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${cle}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: Deno.env.get("DEMANDES_EXPEDITEUR"),
        to: destinataires,
        reply_to: email,
        subject: `${titre} : ${nom}`,
        html,
        text: brut,
      }),
    }).catch(() => null);
    envoye = Boolean(rep?.ok);
  }
  return json({ ok: true, envoye });
});

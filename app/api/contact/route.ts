import { valider, type TypeFormulaire } from "@/content/formulaires";

/**
 * Point d'arrivée des formulaires (devis et candidature).
 * La demande est validée ici, puis transmise à la fonction Supabase « demande » :
 * elle l'enregistre (visible dans l'espace admin), range la pièce jointe et
 * prévient par e-mail (Resend). Sans Supabase branché, la demande est acceptée
 * mais rien n'est envoyé (réponse « simulee », le visiteur en est averti).
 */
export async function POST(requete: Request) {
  let donnees: FormData;
  try {
    donnees = await requete.formData();
  } catch {
    return Response.json({ ok: false, message: "Requête illisible." }, { status: 400 });
  }

  // Champ piège invisible : rempli seulement par les robots.
  if (typeof donnees.get("site_web") === "string" && donnees.get("site_web") !== "") {
    return Response.json({ ok: true });
  }

  const type: TypeFormulaire = donnees.get("type") === "candidature" ? "candidature" : "devis";
  const erreurs = valider(type, donnees);
  if (Object.keys(erreurs).length > 0) {
    return Response.json({ ok: false, erreurs }, { status: 422 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return Response.json({ ok: true, simule: true });

  try {
    const reponse = await fetch(`${url}/functions/v1/demande`, { method: "POST", body: donnees, signal: AbortSignal.timeout(20000) });
    const corps = await reponse.json().catch(() => ({}));
    if (reponse.ok && corps.ok) return Response.json({ ok: true });
    if (reponse.status === 429) return Response.json({ ok: false, message: "Trop de demandes. Réessayez dans une heure." }, { status: 429 });
  } catch {
    // tombe sur la réponse d'échec ci-dessous
  }
  return Response.json({ ok: false, message: "L'envoi a échoué." }, { status: 502 });
}

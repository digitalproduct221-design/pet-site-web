import { valider, type TypeFormulaire } from "@/content/formulaires";

/**
 * Point d'arrivée des formulaires (devis et candidature).
 * STUB : la demande est validée puis acceptée, mais AUCUN envoi n'est encore
 * branché. Pour la mise en ligne, transmettre `donnees` à un service d'e-mail
 * (Resend, SMTP, etc.) à l'endroit indiqué ci-dessous.
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

  // À BRANCHER : envoi de la demande à partenaire.direction@outlook.com.

  return Response.json({ ok: true, simule: true });
}

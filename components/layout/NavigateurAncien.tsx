import { adresse, email, NOM, SLOGAN, telephones, whatsapp } from "@/content/site";

/**
 * Page de repli pour les navigateurs trop anciens (Chrome avant la version 99, etc.).
 * Ils ne connaissent pas les « cascade layers » CSS : toute la feuille de style du site
 * serait ignorée et la page s'afficherait brute. Un petit script de l'en-tête (layout.tsx)
 * ajoute alors la classe `navigateur-ancien` sur <html>, ce qui masque le site et montre
 * ce bloc. Il n'utilise aucune classe Tailwind : uniquement des styles en ligne simples,
 * compris par tous les navigateurs. Invisible partout ailleurs (display: none).
 */
export function NavigateurAncien() {
  const carte = { background: "#ffffff", border: "1px solid #dcd3c0", borderRadius: 6, padding: "20px 22px", margin: "0 0 16px" } as const;
  const bouton = (couleur: string, texte: string) =>
    ({ display: "block", padding: "14px 16px", margin: "0 0 10px", background: couleur, color: texte, fontWeight: 700, fontSize: 17, textDecoration: "none", borderRadius: 4, textAlign: "center" }) as const;
  return (
    <div id="navigateur-ancien" style={{ minHeight: "100%", background: "#f3ebdd", color: "#1a1f2e", fontFamily: "Arial, Helvetica, sans-serif", lineHeight: 1.5 }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "28px 20px 40px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async" src="/brand/logo-pet.png" alt="PET, Partenaire Entreprise Travaux" width={300} height={150} style={{ display: "block", width: 300, maxWidth: "80%", height: "auto", margin: "0 auto 18px" }} />
        <h1 style={{ margin: "0 0 6px", fontSize: 22, textAlign: "center", color: "#21409a", textTransform: "uppercase" }}>{NOM}</h1>
        <p style={{ margin: "0 0 24px", textAlign: "center", color: "#44506a" }}>{SLOGAN}.</p>

        <div style={{ ...carte, borderLeft: "6px solid #f7c61c" }}>
          <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: 18 }}>Votre navigateur est trop ancien pour afficher notre site.</p>
          <p style={{ margin: 0 }}>
            Pour profiter du site complet, mettez à jour Google Chrome, Microsoft Edge ou Mozilla Firefox (gratuit). En attendant, retrouvez ci-dessous nos coordonnées et notre film de présentation.
          </p>
        </div>

        <a href="/video/pet-presentation-720.mp4" style={bouton("#21409a", "#ffffff")}>
          Voir le film de présentation (58 s)
        </a>
        {telephones.map((t) => (
          <a key={t.affichage} href={`tel:${t.lien.replace(/^tel:/, "")}`} style={bouton("#f7c61c", "#0b1b3f")}>
            Appeler le {t.affichage}
          </a>
        ))}
        <a href={whatsapp.lien} style={bouton("#128c7e", "#ffffff")}>
          Écrire sur WhatsApp
        </a>

        <div style={{ ...carte, marginTop: 20 }}>
          <p style={{ margin: "0 0 6px" }}>
            <strong>E-mail :</strong> <a href={`mailto:${email}`} style={{ color: "#21409a" }}>{email}</a>
          </p>
          <p style={{ margin: "0 0 6px" }}><strong>Adresse :</strong> {adresse}</p>
          <p style={{ margin: 0 }}>
            <strong>Nos métiers :</strong> bâtiment, travaux publics et VRD, hydraulique, assainissement, génie civil, électricité et peinture.
          </p>
        </div>
      </div>
    </div>
  );
}

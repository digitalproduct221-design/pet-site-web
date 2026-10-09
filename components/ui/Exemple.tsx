/**
 * Mention visible des contenus d'exemple, pour qu'aucun visiteur ne les prenne
 * pour de vraies références. Disparaît quand `exemple` passe à false.
 */
export function MentionExemple({ visible = true, ton = "clair" }: { visible?: boolean; ton?: "clair" | "sombre" }) {
  if (!visible) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-chantier px-2 py-0.5 cote text-[0.8125rem] uppercase tracking-[0.06em] ${
        ton === "sombre" ? "bg-blanc/10 text-brume" : "bg-sable-soutenu text-encre-douce"
      }`}
    >
      Exemple
    </span>
  );
}

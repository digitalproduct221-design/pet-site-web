/**
 * Pictogrammes au trait des chiffres clés. Chaque tracé se dessine quand le
 * groupe entre dans l'écran (Reveleur : data-vu sur le parent .revele-groupe),
 * et reste simplement dessiné sans JavaScript ou sous mouvement réduit.
 */
export type NomPicto = "creation" | "experience" | "domaines" | "clients";

const traits: Record<NomPicto, React.ReactNode> = {
  // Grue et bâtiment en construction
  creation: (
    <>
      <path pathLength={1} d="M6 58h52" />
      <path pathLength={1} d="M14 58V10h36M14 18l8-8M20 10v8" />
      <path pathLength={1} d="M44 10v12" />
      <path pathLength={1} className="accent" d="M40 22h8v6h-8z" />
      <path pathLength={1} d="M30 58V36h22v22M36 42h4M45 42h3M36 50h4M45 50h3" />
    </>
  ),
  // Casque de chantier
  experience: (
    <>
      <path pathLength={1} d="M8 44h48" />
      <path pathLength={1} className="accent" d="M13 44c0-13 8.5-21 19-21s19 8 19 21" />
      <path pathLength={1} d="M27 23.6V18h10v5.6M24 26v18M40 26v18" />
      <path pathLength={1} d="M18 50h28" />
    </>
  ),
  // Cinq domaines reliés en réseau
  domaines: (
    <>
      <path pathLength={1} d="M32 10L53 25l-8 25H19l-8-25z" />
      <path pathLength={1} d="M32 10v20M53 25L32 30M45 50L32 30M19 50L32 30M11 25l21 5" />
      <circle pathLength={1} className="accent" cx="32" cy="30" r="5" />
      <circle pathLength={1} cx="32" cy="10" r="4" />
      <circle pathLength={1} cx="53" cy="25" r="4" />
      <circle pathLength={1} cx="45" cy="50" r="4" />
      <circle pathLength={1} cx="19" cy="50" r="4" />
      <circle pathLength={1} cx="11" cy="25" r="4" />
    </>
  ),
  // Bâtiment public, usine, maison
  clients: (
    <>
      <path pathLength={1} d="M4 58h56" />
      <path pathLength={1} d="M6 58V38l10-7 10 7v20M10 58V42M16 58V42M22 58V42" />
      <path pathLength={1} className="accent" d="M28 58V42l6 4v-4l6 4v-4l6 4v12M42 40V30h3v12" />
      <path pathLength={1} d="M48 58V45l6-5 6 5v13M52 58v-6h4v6" />
    </>
  ),
};

export function Pictogramme({ nom }: { nom: NomPicto }) {
  return (
    <svg aria-hidden viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="picto size-11">
      {traits[nom]}
    </svg>
  );
}

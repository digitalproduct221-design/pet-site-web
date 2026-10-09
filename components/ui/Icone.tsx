import {
  ArrowRight,
  ArrowsOut,
  ArrowUpRight,
  Briefcase,
  Bridge,
  Buildings,
  Bulldozer,
  Calculator,
  CaretDown,
  ChatCircleDots,
  CheckCircle,
  ClockCountdown,
  ClockCounterClockwise,
  Compass,
  EnvelopeSimple,
  FacebookLogo,
  FileArrowUp,
  Handshake,
  HardHat,
  House,
  Images,
  InstagramLogo,
  Leaf,
  Lightning,
  LinkedinLogo,
  List,
  ListChecks,
  MagnifyingGlass,
  MapPin,
  Medal,
  Newspaper,
  Pause,
  Play,
  Phone,
  Pipe,
  RoadHorizon,
  SealCheck,
  ShieldCheck,
  SquaresFour,
  UserPlus,
  UsersThree,
  WarningCircle,
  Waves,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react/ssr";
import type { IconProps } from "@phosphor-icons/react";

/** Une seule famille d'icônes (Phosphor), un seul trait. Les noms sont métier. */
const icones = {
  accueil: House,
  devis: Calculator,
  projet: Compass,
  chat: ChatCircleDots,
  batiment: Buildings,
  route: RoadHorizon,
  eau: Pipe,
  assainissement: Waves,
  "genie-civil": Bridge,
  electricite: Lightning,
  histoire: ClockCounterClockwise,
  valeurs: Handshake,
  securite: ShieldCheck,
  equipe: UsersThree,
  engins: Bulldozer,
  grille: SquaresFour,
  environnement: Leaf,
  local: MapPin,
  qualite: SealCheck,
  delais: ClockCountdown,
  client: Medal,
  casque: HardHat,
  actualites: Newspaper,
  emploi: Briefcase,
  candidature: UserPlus,
  telephone: Phone,
  whatsapp: WhatsappLogo,
  email: EnvelopeSimple,
  adresse: MapPin,
  recherche: MagnifyingGlass,
  menu: List,
  fermer: X,
  pause: Pause,
  lecture: Play,
  fleche: ArrowRight,
  "fleche-externe": ArrowUpRight,
  chevron: CaretDown,
  fichier: FileArrowUp,
  succes: CheckCircle,
  erreur: WarningCircle,
  photos: Images,
  agrandir: ArrowsOut,
  liste: ListChecks,
  linkedin: LinkedinLogo,
  facebook: FacebookLogo,
  instagram: InstagramLogo,
} as const;

export type NomIcone = keyof typeof icones;

type Props = Omit<IconProps, "ref"> & { nom: NomIcone | string; label?: string };

/**
 * Icône décorative par défaut (masquée aux lecteurs d'écran).
 * Passer `label` quand l'icône porte seule le sens.
 */
export function Icone({ nom, label, size = 22, weight = "regular", ...reste }: Props) {
  const Composant = icones[nom as NomIcone] ?? SquaresFour;
  return (
    <Composant
      size={size}
      weight={weight}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      focusable="false"
      {...reste}
    />
  );
}

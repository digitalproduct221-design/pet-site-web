import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Barlow_Condensed, Barlow_Semi_Condensed, Manrope } from "next/font/google";
import "./globals.css";
import { BarreHaut } from "@/components/layout/BarreHaut";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BarreActionsMobile } from "@/components/layout/BarreActionsMobile";
import { Reveleur } from "@/components/ui/Reveleur";
import { adresse, email, entreprise, NOM, SIGLE, SITE_URL, SLOGAN, telephones } from "@/content/site";

// Seules les graisses réellement utilisées sont chargées (latin suffit pour le français).
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const barlowSemi = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal", "italic"],
  variable: "--font-barlow-semi",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const description =
  "PARTENAIRE ENTREPRISE TRAVAUX SUARL (PET), entreprise de BTP à Dakar depuis 2016 : bâtiment, travaux publics et VRD, hydraulique, assainissement et génie civil.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SIGLE} | BTP à Dakar : bâtiment, hydraulique, assainissement, VRD`,
    template: `%s | ${SIGLE}, Partenaire Entreprise Travaux`,
  },
  description,
  applicationName: SIGLE,
  openGraph: {
    type: "website",
    locale: "fr_SN",
    siteName: `${SIGLE}, ${NOM}`,
    title: `${SIGLE}, ${SLOGAN}`,
    description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `${SIGLE}, ${NOM}` }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b1b3f",
  width: "device-width",
  initialScale: 1,
};

const donneesOrganisation = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: NOM,
  alternateName: SIGLE,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo-pet.png`,
  slogan: SLOGAN,
  foundingDate: String(entreprise.fondation),
  email,
  telephone: telephones.map((t) => `+221 ${t.affichage}`),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rond-point Liberté 6",
    addressLocality: "Dakar",
    addressCountry: "SN",
  },
  areaServed: { "@type": "Country", name: "Sénégal" },
  knowsAbout: entreprise.domaines.map((d) => d.titre),
  description,
  location: adresse,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${barlowCondensed.variable} ${barlowSemi.variable} ${manrope.variable}`}>
      <body className="relative min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(donneesOrganisation).replace(/</g, "\\u003c") }}
        />
        <a
          href="#contenu"
          className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-chantier bg-jaune px-5 py-3 cote text-[1rem] text-nuit transition-transform focus:translate-y-0"
        >
          Aller au contenu
        </a>
        <BarreHaut />
        <Header />
        <main id="contenu" tabIndex={-1} className="outline-none">
          {/* Fondu entre les pages (navigateurs compatibles) */}
          <ViewTransition>{children}</ViewTransition>
        </main>
        <Footer />
        <BarreActionsMobile />
        <Reveleur />
      </body>
    </html>
  );
}

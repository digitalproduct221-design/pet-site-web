import type { NextConfig } from "next";

const dev = process.env.NODE_ENV !== "production";

// Politique de sécurité : tout vient du site, sauf les tuiles de la carte (OpenFreeMap).
// Next injecte des scripts en ligne (hydratation) : 'unsafe-inline' reste nécessaire
// sans nonce (un nonce imposerait un rendu dynamique de toutes les pages).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://tiles.openfreemap.org https://*.supabase.co",
  "font-src 'self'",
  `connect-src 'self' https://tiles.openfreemap.org https://*.supabase.co${dev ? " ws: wss:" : ""}`,
  "worker-src 'self' blob:",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(process.env.VERCEL ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securite = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

// Fichiers statiques non versionnés (logo, motifs, photos) : 30 jours, puis
// revalidation en arrière-plan. Pas « immutable » : le logo vectoriel et les
// photos HD remplaceront ces fichiers sous le même nom.
const cacheStatique = [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:chemin*", headers: securite },
      { source: "/brand/:fichier*", headers: cacheStatique },
      { source: "/motifs/:fichier*", headers: cacheStatique },
      { source: "/images/:fichier*", headers: cacheStatique },
    ];
  },
  async redirects() {
    return [
      // Anciennes fiches d'actualité d'exemple : la page /actualites porte désormais les nouvelles du quotidien.
      { source: "/actualites/:slug", destination: "/actualites", permanent: true },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Qualités optimisées pour un compromis parfait netteté/vitesse de chargement
    qualities: [50, 60, 70, 75, 80],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1600, 1920],
    // Photos ajoutées depuis l'espace admin (stockage Supabase « medias »)
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/medias/**" }],
    minimumCacheTTL: 86400,
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

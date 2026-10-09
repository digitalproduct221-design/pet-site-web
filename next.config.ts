import type { NextConfig } from "next";

const dev = process.env.NODE_ENV !== "production";

// Politique de sécurité : tout vient du site, sauf les tuiles de la carte (OpenFreeMap).
// Next injecte des scripts en ligne (hydratation) : 'unsafe-inline' reste nécessaire
// sans nonce (un nonce imposerait un rendu dynamique de toutes les pages).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://tiles.openfreemap.org",
  "font-src 'self'",
  `connect-src 'self' https://tiles.openfreemap.org${dev ? " ws: wss:" : ""}`,
  "worker-src 'self' blob:",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(dev ? [] : ["upgrade-insecure-requests"]),
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
const cacheStatique = [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=31536000" }];

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
  // Les actualités d'exemple ont laissé place à « Votre projet » (révision client d'octobre 2026).
  async redirects() {
    return [
      { source: "/actualites", destination: "/votre-projet", permanent: true },
      { source: "/actualites/:slug", destination: "/votre-projet", permanent: true },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // 50 à 60 : photos d'arrière-plan et première photo du hero sur mobile.
    qualities: [50, 60, 75],
    minimumCacheTTL: 2592000,
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'], // Ajoutez ici les domaines de vos images
  },
  compiler: {
    // Activer les styled-components
    styledComponents: true,
  },
  experimental: {
    // Activer le nouveau système de rendu React 18
    reactRoot: true,
    // Optimisations de performance
    scrollRestoration: true,
    // Optimisation des polices
    optimizeFonts: true,
  },
  // Configuration pour les en-têtes de sécurité
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codgeni.com';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CodGeni — Développement web & expériences digitales',
    short_name: 'CodGeni',
    description: 'Agence de développement web créative basée en Haïti, spécialisée dans la création de sites web sur mesure, applications web et expériences digitales innovantes.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0B2B4A',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}


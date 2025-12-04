import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getOrganizationSchema } from '@/lib/structured-data';

// Configuration des polices
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

// URL du site (configurable via variable d'environnement)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codgeni.com';

/**
 * Encode l'URL d'une image en préservant les slashes mais en encodant les espaces et caractères spéciaux
 */
function encodeImageUrl(path: string): string {
  const parts = path.split('/');
  return parts.map(part => part ? encodeURIComponent(part) : '').join('/');
}

const logoImagePath = encodeImageUrl('/images/Code Geniuses & Co..png');
const logoImageUrl = `${siteUrl}${logoImagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'CodGeni — Développement web & expériences digitales | Haïti',
    template: '%s | CodGeni',
  },
  description: 'Agence de développement web créative basée en Haïti, spécialisée dans la création de sites web sur mesure, applications web et expériences digitales innovantes. Plus de 50 clients satisfaits.',
  keywords: [
    'développement web',
    'création de site web',
    'agence web Haïti',
    'développement sur mesure',
    'application web',
    'design numérique',
    'site web professionnel',
    'e-commerce Haïti',
    'référencement SEO',
    'agence digitale Haïti',
    'développeur web Haïti',
    'design web',
  ],
  authors: [{ name: 'CodGeni', url: siteUrl }],
  creator: 'CodGeni',
  publisher: 'CodGeni',
  category: 'Technology',
  classification: 'Business',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_HT',
    url: siteUrl,
    siteName: 'CodGeni',
    title: 'CodGeni — Développement web & expériences digitales | Haïti',
    description: 'Agence de développement web créative basée en Haïti, spécialisée dans la création de sites web sur mesure, applications web et expériences digitales innovantes.',
    images: [
      {
        url: logoImageUrl,
        width: 1200,
        height: 630,
        alt: 'Code Geniuses & Co. - Logo CodGeni',
      },
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'CodGeni - Agence de développement web en Haïti',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodGeni — Développement web & expériences digitales | Haïti',
    description: 'Agence de développement web créative basée en Haïti, spécialisée dans la création de sites web sur mesure et expériences digitales innovantes.',
    creator: '@codgeni_ht',
    images: [
      logoImageUrl,
      `${siteUrl}/images/og-image.jpg`,
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CodGeni',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr-HT" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#0B2B4A" />
        <link rel="canonical" href={siteUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="geo.region" content="HT" />
        <meta name="geo.placename" content="Haïti" />
        <link rel="manifest" href="/manifest.json" />
        {/* Métadonnées pour le logo Code Geniuses & Co. */}
        <meta property="og:image:url" content={logoImageUrl} />
        <meta property="og:image:secure_url" content={logoImageUrl} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Code Geniuses & Co. - Logo CodGeni" />
        <link rel="image_src" href={logoImageUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema()),
          }}
        />
      </head>
      <body className="font-sans antialiased text-neutral-800 bg-white">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

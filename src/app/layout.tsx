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
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codgeni.ht';

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
    images: [`${siteUrl}/images/og-image.jpg`],
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

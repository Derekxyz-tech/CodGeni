import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
  title: 'CodGeni — Développement web & expériences digitales | Haïti',
  description: 'Agence de développement web créative basée en Haïti, spécialisée dans la création de sites web sur mesure, applications web et expériences digitales innovantes.',
  keywords: 'développement web, création de site web, agence web Haïti, développement sur mesure, application web, design numérique',
  authors: [{ name: 'CodGeni' }],
  creator: 'CodGeni',
  publisher: 'CodGeni',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'CodGeni — Développement web & expériences digitales | Haïti',
    description: 'Agence de développement web créative basée en Haïti, spécialisée dans la création de sites web sur mesure et expériences digitales innovantes.',
    url: siteUrl,
    siteName: 'CodGeni',
    locale: 'fr_HT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodGeni — Développement web & expériences digitales | Haïti',
    description: 'Agence de développement web créative basée en Haïti, spécialisée dans la création de sites web sur mesure et expériences digitales innovantes.',
    creator: '@codgeni_ht',
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

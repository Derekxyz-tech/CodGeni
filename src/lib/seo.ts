/**
 * Utilitaires SEO pour générer des métadonnées dynamiques
 */

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  path?: string;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codgeni.ht';

/**
 * Génère l'URL complète pour une image
 */
export function getImageUrl(imagePath: string): string {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  return `${siteUrl}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
}

/**
 * Génère l'URL complète pour une page
 */
export function getPageUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${cleanPath}`;
}

/**
 * Génère des métadonnées SEO pour une page
 */
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  image = '/images/og-image.jpg',
  path = '',
}: PageMetadata) {
  const pageUrl = getPageUrl(path);
  const imageUrl = getImageUrl(image);

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'CodGeni',
      locale: 'fr_HT',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

/**
 * Génère un titre de page avec le template
 */
export function generatePageTitle(pageTitle: string): string {
  return `${pageTitle} | CodGeni`;
}


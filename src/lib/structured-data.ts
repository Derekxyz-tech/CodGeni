/**
 * Données structurées JSON-LD pour améliorer le SEO
 */

export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  address?: {
    '@type': string;
    addressCountry: string;
    addressLocality: string;
  };
  sameAs?: string[];
  contactPoint?: {
    '@type': string;
    contactType: string;
    email?: string;
    telephone?: string;
  };
}

export interface WebsiteSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  description: string;
  publisher: {
    '@type': string;
    name: string;
  };
}

export interface ServiceSchema {
  '@context': string;
  '@type': string;
  serviceType: string;
  provider: {
    '@type': string;
    name: string;
  };
  areaServed: string;
  description: string;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codgeni.com';

/**
 * Encode l'URL d'une image en préservant les slashes mais en encodant les espaces et caractères spéciaux
 */
function encodeImageUrl(path: string): string {
  const parts = path.split('/');
  return parts.map(part => part ? encodeURIComponent(part) : '').join('/');
}

export const getOrganizationSchema = (): OrganizationSchema => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CodGeni',
  url: siteUrl,
  logo: `${siteUrl}${encodeImageUrl('/images/Code Geniuses & Co..png')}`,
  description: 'Agence de développement web créative basée en Haïti, spécialisée dans la création de sites web sur mesure, applications web et expériences digitales innovantes.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'HT',
    addressLocality: 'Haïti',
  },
  sameAs: [
    process.env.NEXT_PUBLIC_FACEBOOK_URL,
    process.env.NEXT_PUBLIC_TWITTER_URL,
    process.env.NEXT_PUBLIC_LINKEDIN_URL,
    process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  ].filter(Boolean) as string[],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    telephone: process.env.NEXT_PUBLIC_CONTACT_PHONE,
  },
});

export const getWebsiteSchema = (): WebsiteSchema => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'CodGeni',
  url: siteUrl,
  description: 'Agence de développement web créative basée en Haïti',
  publisher: {
    '@type': 'Organization',
    name: 'CodGeni',
  },
});

export const getServiceSchema = (serviceName: string, description: string): ServiceSchema => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: serviceName,
  provider: {
    '@type': 'Organization',
    name: 'CodGeni',
  },
  areaServed: 'HT',
  description: description,
});


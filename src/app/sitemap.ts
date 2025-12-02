import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codgeni.ht';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl;
  
  // Routes statiques principales
  const routes = [
    '',
    '/services/sites-web-sur-mesure',
    '/services/ecommerce',
    '/services/applications-web',
    '/services/seo-referencement',
    '/cgv',
    '/confidentialite',
    '/cookies',
    '/mentions-legales',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return routes;
}


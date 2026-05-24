import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dossier-studio.com'

  const routes = [
    '',
    '/offres',
    '/comment-ca-fonctionne',
    '/resultats',
    '/a-propos',
    '/diagnostic',
    '/dispositifs',
    '/mentions-legales',
    '/politique-confidentialite',
    '/cookies',
    '/conditions-generales',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}

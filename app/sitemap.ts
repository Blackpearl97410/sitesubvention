import { MetadataRoute } from 'next'
import { dispositifList } from '@/lib/dispositifs'
import { siteConfig } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const now = new Date().toISOString()

  const coreRoutes = [
    { route: '', priority: 1, changeFrequency: 'weekly' as const },
    { route: '/diagnostic', priority: 0.95, changeFrequency: 'weekly' as const },
    { route: '/offres', priority: 0.9, changeFrequency: 'monthly' as const },
    { route: '/dispositifs', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/comment-ca-fonctionne', priority: 0.85, changeFrequency: 'monthly' as const },
    { route: '/resultats', priority: 0.8, changeFrequency: 'monthly' as const },
    { route: '/a-propos', priority: 0.75, changeFrequency: 'monthly' as const },
    { route: '/contact', priority: 0.75, changeFrequency: 'monthly' as const },
  ]

  const dispositifRoutes = dispositifList.map((dispositif) => ({
    route: `/dispositifs/${dispositif.slug}`,
    priority: 0.82,
    changeFrequency: 'monthly' as const,
  }))

  const routes = [...coreRoutes, ...dispositifRoutes].map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: now,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }))

  return routes
}

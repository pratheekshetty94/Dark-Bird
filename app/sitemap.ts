import { MetadataRoute } from 'next'

const BASE_URL = 'https://darkbirdfilms.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // Core pages — highest priority
  const corePages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/filmography`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Service pages — high priority for SEO
  const servicePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/work`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/work/films`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/work/socials`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/work/designs`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/work/labs`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Sub-service pages
  const subServicePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/work/socials/brand-campaigns`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/work/socials/influencer-marketing`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/work/socials/performance-ads`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/work/designs/websites/gk-builders`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/work/designs/websites/amaravathi`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Utility pages — lower priority
  const utilityPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/careers`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  return [...corePages, ...servicePages, ...subServicePages, ...utilityPages]
}

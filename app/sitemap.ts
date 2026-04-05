import { MetadataRoute } from 'next'

const BASE_URL = 'https://darkbirdfilms.com'

// Use a stable date that updates only when content actually changes
const LAST_UPDATED = '2026-03-14'

export default function sitemap(): MetadataRoute.Sitemap {
  // Core pages — highest priority
  const corePages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/filmography`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Service pages — high priority for SEO
  const servicePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/work`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/work/films`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/work/socials`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/work/designs`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/work/labs`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Sub-service pages
  const subServicePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/work/socials/brand-campaigns`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/work/socials/influencer-marketing`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/work/socials/performance-ads`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/work/designs/websites/gk-builders`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/work/designs/websites/amaravathi`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Filmography detail pages — each film can rank independently
  const filmSlugs = [
    'kantara',
    '777-charlie',
    'gandhada-gudi',
    'su-from-so',
    'shpsk',
    'garudagamana',
    'hero',
    'ondu-motteya-kathe',
    'maarnami',
    'kotee',
    'toby',
    'katha-sangama',
    'anukta',
    'madharaasi',
    'who-is-baul',
  ]

  const filmPages: MetadataRoute.Sitemap = filmSlugs.map((slug) => ({
    url: `${BASE_URL}/filmography/${slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Utility pages — lower priority
  const utilityPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/careers`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  return [...corePages, ...servicePages, ...subServicePages, ...filmPages, ...utilityPages]
}

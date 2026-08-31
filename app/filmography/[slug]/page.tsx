import { Metadata } from 'next'
import { filmsData } from '@/lib/films'
import FilmDetailClient from './FilmDetailClient'

const BASE_URL = 'https://www.darkbirdfilms.com'

type Params = { slug: string }

export function generateStaticParams() {
  return Object.keys(filmsData).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const film = filmsData[params.slug]
  if (!film) return {}
  const url = `${BASE_URL}/filmography/${params.slug}`
  // The filmography layout's own title breaks the root template chain here,
  // so the brand suffix is appended explicitly.
  const title = `${film.title} (${film.year}) — ${film.role} | Dark Bird Films`
  // Attribution must stay precise: the role is Dark Bird's, the film's own
  // awards belong to the film and are not listed here.
  const description = `Dark Bird Films — ${film.role} on ${film.title} (${film.year}). ${film.description}`.slice(0, 158)
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${film.title} | Dark Bird Films`,
      description,
      url,
      type: 'video.movie',
      images: [{ url: `${BASE_URL}${encodeURI(film.poster)}` }],
    },
  }
}

export default function FilmDetailPage({ params }: { params: Params }) {
  const film = filmsData[params.slug]

  const movieSchema = film
    ? {
        '@context': 'https://schema.org',
        '@type': 'Movie',
        name: film.title,
        datePublished: film.year,
        description: film.synopsis || film.description,
        image: `${BASE_URL}${encodeURI(film.poster)}`,
        url: `${BASE_URL}/filmography/${params.slug}`,
        ...(film.director ? { director: { '@type': 'Person', name: film.director } } : {}),
        ...(film.cast ? { actor: film.cast.map((name) => ({ '@type': 'Person', name })) } : {}),
        ...(film.genre ? { genre: film.genre } : {}),
        ...(film.runtime ? { duration: film.runtime } : {}),
        ...(film.language ? { inLanguage: film.language } : {}),
        ...(film.award ? { award: film.award } : {}),
        ...(film.imdb ? { sameAs: [film.imdb, film.wiki].filter(Boolean) } : {}),
      }
    : null

  return (
    <>
      {movieSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(movieSchema) }}
        />
      )}
      <FilmDetailClient film={film} />
    </>
  )
}

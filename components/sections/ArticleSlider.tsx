'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Article {
  id: string
  title: string
  source: string
  thumbnail: string
  url: string
  objectPosition?: string
}

const articles: Article[] = [
  {
    id: 'metrosaga',
    title: 'Meet Pratheek Shetty, The Genius Behind Kantara\'s Editing',
    source: 'MetroSaga',
    thumbnail: '/images/articles/Metrosaga.png',
    url: 'https://metrosaga.com/meet-pratheek-shetty-the-genius-behind-kantaras-editing/',
  },
  {
    id: 'ottplay',
    title: 'The Hidden Creative Force Behind Kantara',
    source: 'OTT Play',
    thumbnail: '/images/articles/Ott Play.png',
    url: 'https://www.ottplay.com/news/meet-pratheek-shetty-the-hidden-creative-force-behind-kantara-and-gandhada-gudi/3ef83b6480916',
  },
  {
    id: 'newindianexpress',
    title: 'It Was A Fanboy Moment Fulfilled',
    source: 'The New Indian Express',
    thumbnail: '/images/articles/the_new_indian_express.png',
    url: 'https://www.newindianexpress.com/entertainment/kannada/2022/Oct/24/it-was-a-fanboy-moment-fulfilledpratheek-shetty-2511244.html',
  },
  {
    id: 'freepress',
    title: 'Sandalwood\'s Prized Technician',
    source: 'Free Press Journal',
    thumbnail: '/images/articles/Free_Press.png',
    url: 'https://www.freepressjournal.in/regional-film-news/editor-cinematographer-pratheek-shetty-is-sandalwoods-prized-technician',
    objectPosition: 'center center',
  },
  {
    id: 'filmibeat',
    title: 'Pratheek Shetty Gets Candid About His Journey',
    source: 'Filmibeat',
    thumbnail: '/images/articles/Filmibeat.png',
    url: 'https://www.filmibeat.com/promotions/editor-dop-pratheek-shetty-gets-candid-about-his-journey-says-it-has-been-a-rewarding-experience-341392.html',
  },
  {
    id: 'newshamster',
    title: 'The Editing Genius Behind Kantara',
    source: 'The News Hamster',
    thumbnail: '/images/articles/news hamster.png',
    url: 'https://www.thenewshamster.com/meet-pratheek-shetty-the-editing-genius-behind-kantara/',
  },
  {
    id: 'indiatoday',
    title: 'Gandhada Gudi: A Fitting Ode To Karnataka',
    source: 'India Today',
    thumbnail: '/images/articles/unnamed (1) copy.png',
    url: 'https://www.indiatoday.in/movies/regional-cinema/story/gandhada-gudi-review-puneeth-rajkumar-last-film-is-a-fitting-ode-to-karnataka-from-the-star-2290675-2022-10-28',
  },
]

export default function ArticleSlider() {
  const [isMobile, setIsMobile] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkMobile()
  }, [])

  const ArticleCard = ({ article, size = 'desktop' }: { article: Article, size?: 'mobile' | 'desktop' }) => (
    <Link
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0"
    >
      <div className={cn(
        "relative rounded-lg md:rounded-xl overflow-hidden bg-ink border border-stone/20 select-none",
        size === 'mobile' ? "w-[200px] h-[140px]" : "w-[320px] h-[220px]"
      )}>
        <Image
          src={article.thumbnail}
          alt={article.source}
          fill
          sizes={size === 'mobile' ? "200px" : "320px"}
          className="object-cover pointer-events-none"
          style={{ objectPosition: article.objectPosition || 'center' }}
          draggable={false}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />

        <div className={cn(
          "absolute bottom-0 left-0 right-0",
          size === 'mobile' ? "p-3" : "p-5"
        )}>
          <span className={cn(
            "font-mono uppercase tracking-wider text-accent",
            size === 'mobile' ? "text-[8px]" : "text-[10px]"
          )}>
            {article.source}
          </span>
          <h3 className={cn(
            "text-cream font-medium line-clamp-2",
            size === 'mobile' ? "text-[10px] mt-1" : "text-sm mt-2"
          )}>
            {article.title}
          </h3>
        </div>
      </div>
    </Link>
  )

  // Mobile: Auto-scroll with pause on touch
  if (isMobile) {
    return (
      <section className="section-charcoal py-10 overflow-hidden">
        <div className="container-content mb-6">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-stone/50" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
              ( Press & Media )
            </span>
          </div>
        </div>

        <div
          className="overflow-hidden"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 1000)}
        >
          <div
            className={cn(
              "flex gap-3 animate-marquee",
              isPaused && "[animation-play-state:paused]"
            )}
            style={{ width: 'max-content' }}
          >
            {[...articles, ...articles].map((article, index) => (
              <ArticleCard key={`mobile-${article.id}-${index}`} article={article} size="mobile" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Desktop: Auto-scroll with pause on hover/drag
  return (
    <section className="section-charcoal py-10 md:py-20 overflow-hidden">
      <div className="container-content mb-6 md:mb-12">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="h-px w-8 md:w-12 bg-stone/50" />
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent">
            ( Press & Media )
          </span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-charcoal to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-charcoal to-transparent z-10 pointer-events-none" />

        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 1000)}
        >
          <div
            className={cn(
              "flex gap-6 animate-marquee",
              isPaused && "[animation-play-state:paused]"
            )}
            style={{ width: 'max-content' }}
          >
            {[...articles, ...articles].map((article, index) => (
              <ArticleCard key={`desktop-${article.id}-${index}`} article={article} size="desktop" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

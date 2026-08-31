'use client'

import dynamic from 'next/dynamic'
import HomeVideoHero from '@/components/sections/HomeVideoHero'
import HomeIntro from '@/components/sections/HomeIntro'

// Components - loaded dynamically
const MetricsBar = dynamic(() => import('@/components/sections/MetricsBar'), { ssr: false })
const ClientMarquee = dynamic(() => import('@/components/sections/ClientMarquee'), { ssr: false })
const BrandPositioning = dynamic(() => import('@/components/sections/BrandPositioning'), { ssr: false })
const ArticleSlider = dynamic(() => import('@/components/sections/ArticleSlider'), { ssr: false })
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), { ssr: false })
const PromoBanner = dynamic(() => import('@/components/sections/PromoBanner'), { ssr: false })
const ServicesShowcase = dynamic(() => import('@/components/sections/ServicesShowcase'), { ssr: false })
const DarkBirdWay = dynamic(() => import('@/components/sections/DarkBirdWay'), { ssr: false })
const CTABand = dynamic(() => import('@/components/sections/CTABand'), { ssr: false })

export default function Home() {
  return (
    <>
      <HomeVideoHero />
      <HomeIntro />
      <MetricsBar />
      <ClientMarquee />
      <BrandPositioning />
      <ArticleSlider />
      <Testimonials />
      <PromoBanner />
      <ServicesShowcase />
      <DarkBirdWay />
      <CTABand />
    </>
  )
}

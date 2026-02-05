'use client'

import dynamic from 'next/dynamic'

// Components - loaded dynamically
const PreloaderWrapper = dynamic(() => import('@/components/preloader/PreloaderWrapper'), { ssr: false })
const VideoHero = dynamic(() => import('@/components/sections/VideoHero'), { ssr: false })
const MetricsBar = dynamic(() => import('@/components/sections/MetricsBar'), { ssr: false })
const ClientMarquee = dynamic(() => import('@/components/sections/ClientMarquee'), { ssr: false })
const BrandPositioning = dynamic(() => import('@/components/sections/BrandPositioning'), { ssr: false })
const ArticleSlider = dynamic(() => import('@/components/sections/ArticleSlider'), { ssr: false })
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), { ssr: false })
const Departments = dynamic(() => import('@/components/sections/Departments'), { ssr: false })
const DarkBirdWay = dynamic(() => import('@/components/sections/DarkBirdWay'), { ssr: false })
const CTABand = dynamic(() => import('@/components/sections/CTABand'), { ssr: false })

export default function Home() {
  return (
    <PreloaderWrapper>
      <VideoHero />
      <MetricsBar />
      <ClientMarquee />
      <BrandPositioning />
      <ArticleSlider />
      <Testimonials />
      <Departments />
      <DarkBirdWay />
      <CTABand />
    </PreloaderWrapper>
  )
}

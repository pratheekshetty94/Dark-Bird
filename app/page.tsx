'use client'

import dynamic from 'next/dynamic'

// Components - loaded dynamically
const HomeVideoHero = dynamic(() => import('@/components/sections/HomeVideoHero'), { ssr: false })
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
    <>
      <HomeVideoHero />
      <MetricsBar />
      <ClientMarquee />
      <BrandPositioning />
      <ArticleSlider />
      <Testimonials />
      <Departments />
      <DarkBirdWay />
      <CTABand />
    </>
  )
}

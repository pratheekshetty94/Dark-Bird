'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import VideoHero from '@/components/sections/VideoHero'
import MetricsBar from '@/components/sections/MetricsBar'
import ClientMarquee from '@/components/sections/ClientMarquee'
import BrandPositioning from '@/components/sections/BrandPositioning'
import ArticleSlider from '@/components/sections/ArticleSlider'
import Testimonials from '@/components/sections/Testimonials'
import Departments from '@/components/sections/Departments'
import DarkBirdWay from '@/components/sections/DarkBirdWay'
import CTABand from '@/components/sections/CTABand'

// Mobile homepage - all components tested and working
export default function MobileHome() {
  return (
    <main className="bg-ink min-h-screen">
      {/* Section 1: Video Hero */}
      <VideoHero />

      {/* Section 2: Metrics Bar */}
      <MetricsBar />

      {/* Section 3: Client Logo Marquee */}
      <ClientMarquee />

      {/* Section 4: Brand Positioning */}
      <BrandPositioning />

      {/* Section 5: Article Slider */}
      <ArticleSlider />

      {/* Section 6: Testimonials */}
      <Testimonials />

      {/* Section 7: Departments */}
      <Departments />

      {/* Section 8: The Dark Bird Way */}
      <DarkBirdWay />

      {/* Section 9: CTA Band */}
      <CTABand />
    </main>
  )
}

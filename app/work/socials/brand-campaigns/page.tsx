'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Video, Palette, ImageIcon } from 'lucide-react'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'

// All brand campaigns from all clients
const brandCampaigns = [
  {
    client: 'GK Builders & Developers',
    title: 'GK Hill View Villa - Walkthrough',
    youtubeId: 'AvUbojIz-f8',
    description: 'Cinematic walkthrough of the Hill View Villa project in Devanahalli',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Anjani Lake Woods - Walkthrough',
    youtubeId: '6Eq7L1wl1U8',
    description: 'Property walkthrough for the premium villa plots in Chintamani',
  },
  {
    client: 'GK Builders & Developers',
    title: "A Dog's Hope - GK Builders 2020",
    youtubeId: 'MaAUPpTXbNs',
    description: 'Brand film showcasing the values of GK Builders',
  },
  {
    client: 'YO Fruits',
    title: 'YO Fruits - Gift Your Loved Ones Good Health',
    youtubeId: 'sucVOCoeDBg',
    description: 'Festive campaign for YO Fruits gift boxes',
  },
  {
    client: 'YO Fruits',
    title: 'YO Fruits - Aap Jahan Phal Wahan',
    youtubeId: 'fYH8UgqPaQQ',
    description: 'Brand campaign showcasing fresh fruit delivery',
  },
  {
    client: 'Hangyo',
    title: 'Hangyo Ice Cream - TVC',
    youtubeId: 'fBkKkgfa5-0',
    description: 'Television commercial for Hangyo Ice Cream',
  },
  {
    client: 'Flipkart',
    title: '#FindYourMatch - Flipkart x Sima Taparia',
    youtubeId: 'a1P87WpuCM4',
    description: 'Brand collaboration campaign with matchmaker Sima Taparia',
  },
  {
    client: 'YO Fruits',
    title: 'YO Fruits - Festive Campaign',
    youtubeId: 'AsuTrS1WX-M',
    description: 'Festive season campaign for YO Fruits',
  },
]

// Social Media Reels
const socialReels = [
  {
    client: 'GK Builders & Developers',
    title: 'Investor Spotlight',
    src: '/images/socials/brand-campaigns/reels/investor-video.mp4',
  },
  {
    client: 'GK Builders & Developers',
    title: "A Dog's Hope",
    src: '/images/socials/brand-campaigns/reels/dogs-hope.mp4',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Celebrities Together',
    src: '/images/socials/brand-campaigns/reels/celebrities-together.mp4',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Anjani Lake Woods Launch',
    src: '/images/socials/brand-campaigns/reels/anjani-launch.mp4',
  },
  {
    client: 'GK Builders & Developers',
    title: '2025 Year in Review',
    src: '/images/socials/brand-campaigns/reels/2025-wrap-up.mp4',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Republic Day',
    src: '/images/socials/brand-campaigns/reels/republic-day.mp4',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Nature Meets AI',
    src: '/images/socials/brand-campaigns/reels/nature-ai.mp4',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Collect Things',
    src: '/images/socials/brand-campaigns/reels/collect-things.mp4',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Why Not Now',
    src: '/images/socials/brand-campaigns/reels/why-not-now.mp4',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Kannada Rajyotsava',
    src: '/images/socials/brand-campaigns/reels/kannada-rajyotsava.mp4',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Christmas',
    src: '/images/socials/brand-campaigns/reels/christmas.mp4',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Hill View Countdown',
    src: '/images/socials/brand-campaigns/reels/hillview-countdown.mp4',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Hill View Launch',
    src: '/images/socials/brand-campaigns/reels/hillview-launch.mp4',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Move Your Thumb',
    src: '/images/socials/brand-campaigns/reels/move-your-thumb.mp4',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Deepavali',
    src: '/images/socials/brand-campaigns/reels/deepavali.mp4',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Kids',
    src: '/images/socials/brand-campaigns/reels/kids.mp4',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Intro Board',
    src: '/images/socials/brand-campaigns/reels/intro-board.mp4',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Gandhi Jayanti',
    src: '/images/socials/brand-campaigns/reels/gandhi-jayanti.mp4',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Car Parking',
    src: '/images/socials/brand-campaigns/reels/car-parking.mp4',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Dussehra',
    src: '/images/socials/brand-campaigns/reels/dusshera.mp4',
  },
  {
    client: 'GK Builders & Developers',
    title: 'National Youth Day',
    src: '/images/socials/brand-campaigns/reels/national-youth-day.mp4',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Sankranti',
    src: '/images/socials/brand-campaigns/reels/sankranti.mp4',
  },
]

// Branding & Logo Design
const brandingLogos = [
  {
    name: 'Ashi',
    src: '/images/designs/logos/ashi.jpg',
  },
  {
    name: 'Bake A Luru',
    src: '/images/designs/logos/bake-a-luru.jpg',
  },
  {
    name: 'Great Indian Salon',
    src: '/images/designs/logos/great-indian-salon.jpg',
  },
  {
    name: 'Lorem Picsome',
    src: '/images/designs/logos/lorem-picsome.png',
  },
  {
    name: 'Vanas',
    src: '/images/designs/logos/vanas.png',
  },
]

// Social Media Posts
const socialPosts = [
  { src: '/images/socials/brand-campaigns/static-posts/anjani-scroll-1.webp', title: 'Anjani Lake Woods' },
  { src: '/images/socials/brand-campaigns/static-posts/anjani-scroll-2.webp', title: 'Anjani Lake Woods' },
  { src: '/images/socials/brand-campaigns/static-posts/announcement.jpg', title: 'Announcement' },
  { src: '/images/socials/brand-campaigns/static-posts/ayudha-pooja.png', title: 'Ayudha Pooja' },
  { src: '/images/socials/brand-campaigns/static-posts/banana-chips.jpg', title: 'Banana Chips' },
  { src: '/images/socials/brand-campaigns/static-posts/best-of-both.webp', title: 'Best of Both' },
  { src: '/images/socials/brand-campaigns/static-posts/button-post-1.webp', title: 'Button Post' },
  { src: '/images/socials/brand-campaigns/static-posts/childrens-day-1.webp', title: "Children's Day" },
  { src: '/images/socials/brand-campaigns/static-posts/childrens-day-2.webp', title: "Children's Day" },
  { src: '/images/socials/brand-campaigns/static-posts/childrens-day-3.webp', title: "Children's Day" },
  { src: '/images/socials/brand-campaigns/static-posts/childrens-day-4.webp', title: "Children's Day" },
  { src: '/images/socials/brand-campaigns/static-posts/childrens-day-5.webp', title: "Children's Day" },
  { src: '/images/socials/brand-campaigns/static-posts/congrats-india.jpg', title: 'Congrats India' },
  { src: '/images/socials/brand-campaigns/static-posts/deepavali-2.jpg', title: 'Deepavali' },
  { src: '/images/socials/brand-campaigns/static-posts/deepavali-next-year.jpg', title: 'Deepavali' },
  { src: '/images/socials/brand-campaigns/static-posts/discover-1.webp', title: 'Discover' },
  { src: '/images/socials/brand-campaigns/static-posts/discover-2.webp', title: 'Discover' },
  { src: '/images/socials/brand-campaigns/static-posts/discover-3.webp', title: 'Discover' },
  { src: '/images/socials/brand-campaigns/static-posts/discover-4.webp', title: 'Discover' },
  { src: '/images/socials/brand-campaigns/static-posts/discover.webp', title: 'Discover' },
  { src: '/images/socials/brand-campaigns/static-posts/dressed-for-celebration.jpg', title: 'Dressed for Celebration' },
  { src: '/images/socials/brand-campaigns/static-posts/evening-gk.jpg', title: 'Evening at GK' },
  { src: '/images/socials/brand-campaigns/static-posts/gk-penguin.jpg', title: 'GK Penguin' },
  { src: '/images/socials/brand-campaigns/static-posts/happy-diwali-lake-view.jpg', title: 'Happy Diwali - Lake View' },
  { src: '/images/socials/brand-campaigns/static-posts/happy-diwali.jpg', title: 'Happy Diwali' },
  { src: '/images/socials/brand-campaigns/static-posts/lake-mirrors.jpg', title: 'Lake Mirrors' },
  { src: '/images/socials/brand-campaigns/static-posts/light-up-acres.jpg', title: 'Light Up Acres' },
  { src: '/images/socials/brand-campaigns/static-posts/love-is-in-the-hair.jpg', title: 'Love is in the Hair' },
  { src: '/images/socials/brand-campaigns/static-posts/masala-peanut.jpg', title: 'Masala Peanut' },
  { src: '/images/socials/brand-campaigns/static-posts/ms-pp.png', title: 'MS PP' },
  { src: '/images/socials/brand-campaigns/static-posts/new-year-1.webp', title: 'New Year' },
  { src: '/images/socials/brand-campaigns/static-posts/new-year-2.webp', title: 'New Year' },
  { src: '/images/socials/brand-campaigns/static-posts/new-year-3.webp', title: 'New Year' },
  { src: '/images/socials/brand-campaigns/static-posts/new-year-4.webp', title: 'New Year' },
  { src: '/images/socials/brand-campaigns/static-posts/new-year-5.webp', title: 'New Year' },
  { src: '/images/socials/brand-campaigns/static-posts/new-year-6.webp', title: 'New Year' },
  { src: '/images/socials/brand-campaigns/static-posts/park-benches.jpg', title: 'Park Benches' },
  { src: '/images/socials/brand-campaigns/static-posts/post-03-a.jpg', title: 'Brand Post' },
  { src: '/images/socials/brand-campaigns/static-posts/post-03-b.jpg', title: 'Brand Post' },
  { src: '/images/socials/brand-campaigns/static-posts/puzzle-gk.jpg', title: 'Puzzle GK' },
  { src: '/images/socials/brand-campaigns/static-posts/rcb-women.jpg', title: 'RCB Women' },
  { src: '/images/socials/brand-campaigns/static-posts/routemap.jpg', title: 'Route Map' },
  { src: '/images/socials/brand-campaigns/static-posts/rules-break-1.webp', title: 'Rules Break' },
  { src: '/images/socials/brand-campaigns/static-posts/rules-break-2.webp', title: 'Rules Break' },
  { src: '/images/socials/brand-campaigns/static-posts/style-word.jpg', title: 'Style Word' },
]

export default function BrandCampaignsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-dark pt-44 pb-16">
        <div className="container-content">
          {/* Back link */}
          <ScrollReveal>
            <Link
              href="/work/socials"
              className="inline-flex items-center gap-2 text-warm-gray hover:text-accent transition-all mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-mono text-sm uppercase tracking-wider">Back to Socials</span>
            </Link>
          </ScrollReveal>

          {/* Category Badge */}
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <span className="px-4 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm font-medium">
                Brand Campaigns
              </span>
            </div>
          </ScrollReveal>

          {/* Title */}
          <ScrollReveal delay={0.2}>
            <h1 className="text-hero font-bold text-white mb-4">
              Brand Campaigns
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-xl text-warm-gray max-w-3xl mb-8">
              Cinematic walkthrough films and branded content that tell compelling stories.
              We create visual narratives that sell belief, not just products.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="section-light section-padding">
        <div className="container-content">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-charcoal mb-8">
              Walkthrough Films & Branded Content
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandCampaigns.map((campaign) => (
              <div key={campaign.youtubeId} className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${campaign.youtubeId}`}
                    title={campaign.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs text-primary-red font-medium uppercase tracking-wider">
                    {campaign.client}
                  </span>
                  <h3 className="font-semibold text-charcoal mt-1 mb-1">{campaign.title}</h3>
                  {campaign.description && (
                    <p className="text-sm text-warm-gray">{campaign.description}</p>
                  )}
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Social Media Reels */}
      <section id="reels" className="section-dark section-padding">
        <div className="container-content">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-white mb-2">
              Social Media Reels
            </h2>
            <p className="text-warm-gray mb-8">
              Scroll-stopping vertical content crafted for Instagram, YouTube Shorts & beyond.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {socialReels.map((reel) => (
              <div key={reel.src} className="bg-charcoal rounded-xl overflow-hidden shadow-lg">
                <video
                  src={`${reel.src}#t=0.5`}
                  controls
                  preload="metadata"
                  playsInline
                  muted
                  className="w-full aspect-[9/16] object-cover bg-ink"
                >
                  Your browser does not support the video tag.
                </video>
                <div className="p-3">
                  <span className="text-xs text-primary-red font-medium uppercase tracking-wider">
                    {reel.client}
                  </span>
                  <h3 className="font-semibold text-white text-sm mt-1">{reel.title}</h3>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Social Media Posts */}
      <section id="posts" className="section-light section-padding">
        <div className="container-content">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-charcoal">
                Social Media Posts
              </h2>
            </div>
            <p className="text-warm-gray mb-8">
              Thumb-stopping static creatives designed for engagement and brand recall.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {socialPosts.map((post) => (
              <div
                key={post.src}
                className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-md hover:shadow-xl transition-shadow"
              >
                <Image
                  src={post.src}
                  alt={post.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Branding & Logo Design */}
      <section className="section-dark section-padding">
        <div className="container-content">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Branding & Logo Design
                </h2>
                <p className="text-sm text-warm-gray">
                  Identities built to last. Logos designed with cinematic precision.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {brandingLogos.map((logo) => (
              <div
                key={logo.name}
                className="bg-white rounded-xl p-6 shadow-lg flex items-center justify-center aspect-square border border-gray-100"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    className="object-contain p-2"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* CTA */}
      <CTABand
        headline="Need a Brand Campaign?"
        description="Let us create cinematic content that tells your brand's story."
        buttonText="Let&apos;s Talk"
        buttonHref="/contact"
      />
    </>
  )
}

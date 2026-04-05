import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'
import LazySplineBanner from '@/components/LazySplineBanner'
import { Palette, Layout, Box, MessageSquare, Sparkles, Video, Monitor, Printer, ExternalLink, Megaphone, Instagram } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Brand Design Agency | Logo Design, Motion Graphics & Web Design India',
  description: 'Dark Bird Designs: We make brands look expensive. Brand identity, logo design, motion graphics, 3D modelling, website design & social media templates. Bengaluru, India.',
  keywords: [
    'brand design agency india', 'logo design agency bengaluru', 'motion graphics india',
    'brand identity design', 'website design production house', '3D modelling agency india',
    'social media template design', 'dark bird designs', 'cinematic brand design',
    'creative design agency bangalore',
  ],
  openGraph: {
    title: 'Dark Bird Designs | Brand Identity & Creative Design',
    description: 'We make brands look expensive. Brand identity, motion graphics, web design & 3D modelling.',
    url: 'https://darkbirdfilms.com/work/designs',
    type: 'website',
  },
  alternates: {
    canonical: 'https://darkbirdfilms.com/work/designs',
  },
}

const services = [
  {
    icon: Layout,
    title: 'Website & Landing Page Design',
    description: 'Conversion-focused web experiences that look premium and perform.',
    slug: 'website-design-agency-bangalore',
  },
  {
    icon: Palette,
    title: 'Brand Identity & Visual Kits',
    description: 'Complete brand systems from logo to guidelines.',
    slug: 'brand-identity-design-bangalore',
  },
  {
    icon: Sparkles,
    title: 'Social Media Templates & Illustrations',
    description: 'Scroll-stopping templates and illustrations for a consistent brand presence.',
    slug: 'social-media-design-bangalore',
  },
  {
    icon: Box,
    title: '3D Modelling',
    description: 'Product visualization and architectural renders.',
    slug: '3d-modelling-bangalore',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp Stickers & Digital Swag',
    description: 'Fun, shareable assets that extend your brand into everyday conversations.',
    slug: 'whatsapp-sticker-design-bangalore',
  },
  {
    icon: Video,
    title: 'Motion Design & Short-Form Animations',
    description: 'Animated graphics, kinetic type and short-form visual content.',
    slug: 'motion-design-bangalore',
  },
]

// Offline / Print Designs
const offlineDesigns = [
  { src: '/images/designs/offline/billboard-1.jpg', title: 'Billboard Design' },
  { src: '/images/designs/offline/billboard-2.jpg', title: 'Billboard Design' },
  { src: '/images/designs/offline/billboard-3.jpg', title: 'Billboard Design' },
  { src: '/images/designs/offline/billboard-4.jpg', title: 'Billboard Design' },
  { src: '/images/designs/offline/billboard-5.jpg', title: 'Billboard Design' },
  { src: '/images/designs/offline/billboard-6.jpg', title: 'Billboard Design' },
  { src: '/images/designs/offline/billboard-7.jpg', title: 'Billboard Design' },
  { src: '/images/designs/offline/billboard-8.jpg', title: 'Billboard Design' },
  { src: '/images/designs/offline/billboard-9.jpg', title: 'Billboard Design' },
  { src: '/images/designs/offline/billboard-10.jpg', title: 'Billboard Design' },
  { src: '/images/designs/offline/billboard-11.jpg', title: 'Billboard Design' },
  { src: '/images/designs/offline/billboard-12.jpg', title: 'Billboard Design' },
  { src: '/images/designs/offline/billboard-13.jpg', title: 'Billboard Design' },
  { src: '/images/designs/offline/billboard-14.jpg', title: 'Billboard Design' },
  { src: '/images/designs/offline/billboard-15.jpg', title: 'Billboard Design' },
  { src: '/images/designs/offline/board.jpg', title: 'Board Design' },
  { src: '/images/designs/offline/signboards.jpg', title: 'Signboard Design' },
  { src: '/images/designs/offline/arch.jpg', title: 'Arch Design' },
  { src: '/images/designs/offline/anjani-arch.jpg', title: 'Anjani Arch Design' },
  { src: '/images/designs/offline/tent.jpg', title: 'Tent Design' },
  { src: '/images/designs/offline/anjani-tent.jpg', title: 'Anjani Tent Design' },
]

// Social Media Posts — designed statics & carousels from brand campaigns
const socialPosts = [
  { src: '/images/socials/brand-campaigns/static-posts/anjani-scroll-1.webp', title: 'Anjani — Scroll Post' },
  { src: '/images/socials/brand-campaigns/static-posts/anjani-scroll-2.webp', title: 'Anjani — Scroll Post' },
  { src: '/images/socials/brand-campaigns/static-posts/best-of-both.webp', title: 'Best of Both Worlds' },
  { src: '/images/socials/brand-campaigns/static-posts/discover.webp', title: 'Discover' },
  { src: '/images/socials/brand-campaigns/static-posts/discover-1.webp', title: 'Discover Series' },
  { src: '/images/socials/brand-campaigns/static-posts/discover-2.webp', title: 'Discover Series' },
  { src: '/images/socials/brand-campaigns/static-posts/discover-3.webp', title: 'Discover Series' },
  { src: '/images/socials/brand-campaigns/static-posts/discover-4.webp', title: 'Discover Series' },
  { src: '/images/socials/brand-campaigns/static-posts/button-post-1.webp', title: 'Button Post' },
  { src: '/images/socials/brand-campaigns/static-posts/button-post-2.webp', title: 'Button Post' },
  { src: '/images/socials/brand-campaigns/static-posts/rules-break-1.webp', title: 'Rules to Break' },
  { src: '/images/socials/brand-campaigns/static-posts/rules-break-2.webp', title: 'Rules to Break' },
  { src: '/images/socials/brand-campaigns/static-posts/childrens-day-1.webp', title: "Children's Day" },
  { src: '/images/socials/brand-campaigns/static-posts/childrens-day-2.webp', title: "Children's Day" },
  { src: '/images/socials/brand-campaigns/static-posts/childrens-day-3.webp', title: "Children's Day" },
  { src: '/images/socials/brand-campaigns/static-posts/childrens-day-4.webp', title: "Children's Day" },
  { src: '/images/socials/brand-campaigns/static-posts/childrens-day-5.webp', title: "Children's Day" },
  { src: '/images/socials/brand-campaigns/static-posts/new-year-1.webp', title: 'New Year Campaign' },
  { src: '/images/socials/brand-campaigns/static-posts/new-year-2.webp', title: 'New Year Campaign' },
  { src: '/images/socials/brand-campaigns/static-posts/new-year-3.webp', title: 'New Year Campaign' },
  { src: '/images/socials/brand-campaigns/static-posts/new-year-4.webp', title: 'New Year Campaign' },
  { src: '/images/socials/brand-campaigns/static-posts/new-year-5.webp', title: 'New Year Campaign' },
  { src: '/images/socials/brand-campaigns/static-posts/new-year-6.webp', title: 'New Year Campaign' },
  { src: '/images/socials/brand-campaigns/static-posts/happy-diwali.jpg', title: 'Happy Diwali' },
  { src: '/images/socials/brand-campaigns/static-posts/happy-diwali-lake-view.jpg', title: 'Diwali — Lake View' },
  { src: '/images/socials/brand-campaigns/static-posts/deepavali-2.jpg', title: 'Deepavali' },
  { src: '/images/socials/brand-campaigns/static-posts/deepavali-next-year.jpg', title: 'Deepavali — Next Year' },
  { src: '/images/socials/brand-campaigns/static-posts/ayudha-pooja.png', title: 'Ayudha Pooja' },
  { src: '/images/socials/brand-campaigns/static-posts/dressed-for-celebration.jpg', title: 'Dressed for Celebration' },
  { src: '/images/socials/brand-campaigns/static-posts/light-up-acres.jpg', title: 'Light Up the Acres' },
  { src: '/images/socials/brand-campaigns/static-posts/lake-mirrors.jpg', title: 'Lake Mirrors' },
  { src: '/images/socials/brand-campaigns/static-posts/evening-gk.jpg', title: 'Evening at GK' },
  { src: '/images/socials/brand-campaigns/static-posts/park-benches.jpg', title: 'Park Benches' },
  { src: '/images/socials/brand-campaigns/static-posts/puzzle-gk.jpg', title: 'GK Puzzle' },
  { src: '/images/socials/brand-campaigns/static-posts/gk-penguin.jpg', title: 'GK Penguin' },
  { src: '/images/socials/brand-campaigns/static-posts/rcb-women.jpg', title: 'RCB Women' },
  { src: '/images/socials/brand-campaigns/static-posts/congrats-india.jpg', title: 'Congrats India' },
  { src: '/images/socials/brand-campaigns/static-posts/announcement.jpg', title: 'Announcement' },
  { src: '/images/socials/brand-campaigns/static-posts/post-03-a.jpg', title: 'Brand Post' },
  { src: '/images/socials/brand-campaigns/static-posts/post-03-b.jpg', title: 'Brand Post' },
  { src: '/images/socials/brand-campaigns/static-posts/ms-pp.png', title: 'MS Post' },
]

// Digital Designs / Ad Posters
const adPosters = [
  { src: '/images/socials/performance-ads/SP_1.png', title: 'Anjani Lake Woods — Why Drive to a Hill Station?' },
  { src: '/images/socials/performance-ads/SP_2.png', title: 'Anjani Lake Woods — Live Between the Lake & Hills' },
  { src: '/images/socials/performance-ads/SP_3.png', title: 'Anjani Lake Woods — Your Kids Don\u2019t Need a Phone' },
  { src: '/images/socials/performance-ads/SP_4.png', title: 'Anjani Lake Woods — The Gateway to Premium Living' },
  { src: '/images/socials/performance-ads/SP_5.png', title: 'Anjani Lake Woods — Slow Down. Breathe. You Are Home.' },
  { src: '/images/designs/ad-posters/ad-creative_1-1.jpg', title: 'Ad Creative' },
  { src: '/images/designs/ad-posters/ad-creative_2.jpg', title: 'Ad Creative' },
  { src: '/images/designs/ad-posters/ad-creative_6.jpg', title: 'Ad Creative' },
  { src: '/images/designs/ad-posters/banana-chips.jpg', title: 'Banana Chips Ad' },
  { src: '/images/designs/ad-posters/gk_takeoff.png', title: 'GK Takeoff Ad' },
  { src: '/images/designs/ad-posters/loveisinthehair_gis.jpg', title: 'Love Is In The Hair - GIS' },
  { src: '/images/designs/ad-posters/masala-peanut.jpg', title: 'Masala Peanut Ad' },
  { src: '/images/designs/ad-posters/routemap_01.jpg', title: 'Route Map Design' },
  { src: '/images/designs/ad-posters/styleword_gis.jpg', title: 'StyleWord - GIS' },
  { src: '/images/designs/ad-posters/ponpon.png', title: 'PonPon Ad' },
]

// Website Projects
const websiteProjects = [
  {
    client: 'GK Builders & Developers',
    description: 'Premium real estate website with luxury villa project showcases',
    thumbnail: '/images/designs/websites/screengrabs/gk-website/home-page.jpeg',
    href: '/work/designs/websites/gk-builders',
    liveUrl: 'https://gkbuildersanddevelopers.com/',
  },
  {
    client: 'Hotel Amaravathi',
    description: 'Sophisticated hospitality website with seamless booking integration',
    thumbnail: '/images/designs/websites/screengrabs/amaravathi/amaravathi-1.jpg',
    href: '/work/designs/websites/amaravathi',
    liveUrl: 'https://hotelamaravathi.in/',
  },
]

export default function DesignsPage() {
  return (
    <>
      {/* Opening Hero */}
      <section className="relative min-h-screen overflow-hidden bg-ink">
        {/* Spline 3D Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <LazySplineBanner
            scene="https://prod.spline.design/0AxnVdsvhUNmSUcJ/scene.splinecode"
            height="h-full"
            scale={3}
          />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent z-[2] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-transparent to-transparent z-[1] pointer-events-none" />

        {/* Centered content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center justify-center w-full px-6 text-center">
            {/* Label */}
            <span
              className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-accent mb-6 md:mb-8"
              style={{ animation: 'fadeIn 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.2s both' }}
            >
              Dark Bird Designs
            </span>

            {/* Headline — split into two lines for impact */}
            <h1 className="mb-6 md:mb-8">
              <span
                className="block font-display text-5xl md:text-7xl lg:text-[6rem] font-bold text-cream leading-[1.05] tracking-tight"
                style={{ animation: 'slideUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.4s both' }}
              >
                Design That
              </span>
              <span
                className="block font-display text-5xl md:text-7xl lg:text-[6rem] font-bold text-accent italic leading-[1.05] tracking-tight"
                style={{ animation: 'slideUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.6s both' }}
              >
                Performs.
              </span>
            </h1>

            {/* Accent line */}
            <div
              className="w-16 h-[2px] bg-accent mb-6 md:mb-8"
              style={{ animation: 'scaleIn 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.8s both' }}
            />

            {/* Supporting text */}
            <p
              className="max-w-xl mx-auto text-base md:text-lg text-silver leading-relaxed text-center"
              style={{ animation: 'slideUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) 1s both' }}
            >
              From the identity that defines you to the smallest digital touchpoint — every project gets the same obsession: strategic thinking wrapped in visual excellence.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          style={{ animation: 'fadeIn 0.6s cubic-bezier(0.25, 1, 0.5, 1) 1.4s both' }}
        >
          <div className="flex flex-col items-center gap-2 animate-bounce-slow">
            <span className="text-warm-gray text-xs uppercase tracking-[0.2em] font-mono">Scroll</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-warm-gray to-transparent" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-dark section-padding -mt-1">
        <div className="container-content">
          <ScrollReveal>
            <SectionLabel>Our Services</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-section font-bold text-white mt-4 mb-4">
              Design That Delivers
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-warm-gray max-w-2xl mb-12">
              Brand identity, websites, motion and everything in between — built with
              the same obsessive craft as the films. Tap any service to see the full offering.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group p-6 bg-charcoal rounded-xl hover:bg-charcoal/80 border border-white/[0.06] hover:border-primary-red/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-red/10 flex items-center justify-center group-hover:bg-primary-red/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary-red" />
                    </div>
                    <ExternalLink className="w-5 h-5 text-warm-gray group-hover:text-primary-red transition-colors" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-primary-red transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-warm-gray text-sm">
                    {service.description}
                  </p>
                </Link>
              )
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* Website Designs */}
      <section className="section-light section-padding">
        <div className="container-content">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-charcoal">
                Website Designs
              </h2>
            </div>
            <p className="text-warm-gray mb-10">
              Premium web experiences built for conversion and visual impact.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {websiteProjects.map((project) => (
              <Link
                key={project.client}
                href={project.href}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                  <Image
                    src={project.thumbnail}
                    alt={project.client}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <span className="inline-flex items-center gap-1 text-white text-sm font-medium">
                      View Project <ExternalLink className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs text-primary-red font-medium uppercase tracking-wider">Website Design</span>
                  <h3 className="text-lg font-semibold text-charcoal mt-1 mb-2 group-hover:text-primary-red transition-colors">
                    {project.client}
                  </h3>
                  <p className="text-warm-gray text-sm">{project.description}</p>
                </div>
              </Link>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Offline / Print Designs */}
      <section className="section-dark section-padding">
        <div className="container-content">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Printer className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Offline & Print Designs
              </h2>
            </div>
            <p className="text-warm-gray mb-10">
              Billboards, signboards, arch gates and tent designs that command attention in the real world.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {offlineDesigns.map((design) => (
              <div
                key={design.src}
                className="relative aspect-[4/3] rounded-xl overflow-hidden bg-charcoal shadow-lg hover:shadow-xl transition-shadow"
              >
                <Image
                  src={design.src}
                  alt={design.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Social Media Posts */}
      <section className="section-light section-padding">
        <div className="container-content">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-charcoal">
                Social Media Posts
              </h2>
            </div>
            <p className="text-warm-gray mb-10">
              Designed statics and carousels built for feed-stopping recall across brand campaigns.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {socialPosts.map((post) => (
              <div
                key={post.src}
                className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-xl transition-shadow"
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

      {/* Digital Designs / Ad Posters */}
      <section className="section-light section-padding">
        <div className="container-content">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center">
                <Megaphone className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-charcoal">
                Digital Designs & Ad Posters
              </h2>
            </div>
            <p className="text-warm-gray mb-10">
              Scroll-stopping ad creatives and digital posters designed to convert.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {adPosters.map((design) => (
              <div
                key={design.src}
                className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Image
                  src={design.src}
                  alt={design.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* CTA */}
      <CTABand
        headline="Need Design That Stands Out?"
        description="From brand identity to motion graphics, we create visuals that make an impact."
        buttonText="Start Your Project"
        buttonHref="/contact"
      />
    </>
  )
}

import { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'
import { ArrowUpRight, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Our Services | Dark Bird Films',
  description: 'Explore our services: Films, Socials, Designs, and Labs. We create cinematic content, digital marketing campaigns, brand designs, and AI-powered creative work.',
}

const divisions = [
  {
    number: '01',
    name: 'Dark Bird Films',
    tagline: 'This is where it all begins with cinema.',
    description: 'We approach every project like a film: with emotion, detail, and a strong sense of purpose. From the first idea to the final cut, we make sure your story doesn\'t just look good — it leaves an impact.',
    services: [
      'Feature Film Production & Support',
      'Ad Films & Commercials',
      'Music Videos',
      'Property Walkthrough Films',
      'Brand & Campaign Films',
      'Documentaries',
      'Product & Launch Videos',
      'Founder Stories',
    ],
    href: '/work/films',
  },
  {
    number: '02',
    name: 'Dark Bird Socials',
    tagline: 'Because today, your audience lives online.',
    description: 'We help brands show up, stand out, and stay relevant across every digital platform. Whether it\'s building a voice, growing a presence, or running performance campaigns, we make sure your brand feels human and performs smart.',
    services: [
      'AI Digital Marketing',
      'Influencer Marketing',
      'Paid Media Strategy',
      'Founder Branding & Social Presence',
      'Social Media Management & Community Growth',
      'Campaign Planning & Execution',
      'Real Estate Digital Marketing',
    ],
    href: '/work/socials',
  },
  {
    number: '03',
    name: 'Dark Bird Designs',
    tagline: 'We design experiences that are clean, cinematic, and meaningful.',
    description: 'So your brand feels complete and consistent everywhere it appears. Design should look incredible and perform even better.',
    services: [
      'Website & Landing Page Design',
      'Brand Identity & Visual Kits',
      'Social Media Templates & Illustrations',
      '3D Modelling',
      'WhatsApp Stickers & Digital Swag',
      'Motion Design & Short-Form Animations',
    ],
    href: '/work/designs',
  },
  {
    number: '04',
    name: 'Dark Bird Labs',
    tagline: 'Our sandbox for the future of film.',
    description: 'We explore AI as a creative partner — crafting films, commercials, and visuals that feel impossible, immersive, and unmistakably cinematic.',
    services: [
      'AI Short Films',
      'AI Commercials & Concept Films',
      'AI Launch Trailers',
      'AI Music Videos',
      'AI-Generated Visual Experiments',
      'Marketing Automation & AI Agents',
    ],
    href: '/work/labs',
  },
]

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-dark pt-40 pb-24 relative overflow-hidden">
        {/* Background accent */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 80% 30%, #E85A3F 0%, transparent 60%)',
          }}
        />

        <div className="container-content relative z-10">
          <div className="max-w-4xl">
            <ScrollReveal>
              <span className="label-parenthetical">Our Services</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-hero text-cream mt-6 mb-8">
                Here's everything we can do for <em className="text-accent">you</em>.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-body-lg text-silver max-w-3xl">
                At Dark Bird, we don't simply provide services — we shape narratives,
                identities, and campaigns that move people and drive results. Every film
                we produce, every digital strategy we build, and every design we deliver
                is created with intention and expertise.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Divisions */}
      {divisions.map((division, index) => (
        <section
          key={division.number}
          className={cn(
            'py-24 md:py-32 relative overflow-hidden',
            index % 2 === 0 ? 'section-dark' : 'section-light'
          )}
        >
          {/* Background accent */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              background: index % 2 === 0
                ? 'radial-gradient(ellipse at 20% 50%, #E85A3F 0%, transparent 50%)'
                : 'radial-gradient(ellipse at 80% 50%, #E85A3F 0%, transparent 50%)',
            }}
          />

          <div className="container-content relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
              {/* Text Content */}
              <div className={cn(
                "lg:col-span-6",
                index % 2 === 1 ? 'lg:order-2' : ''
              )}>
                <ScrollReveal>
                  <span className={cn(
                    "font-display text-[120px] md:text-[160px] leading-none",
                    index % 2 === 0 ? 'text-accent/10' : 'text-accent/20'
                  )}>
                    {division.number}
                  </span>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <h2 className={cn(
                    "font-display text-display -mt-12 mb-4",
                    index % 2 === 0 ? 'text-cream' : 'text-ink'
                  )}>
                    {division.name}
                  </h2>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <p className="text-xl text-accent font-display italic mb-6">
                    {division.tagline}
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <p className={cn(
                    "text-body mb-10",
                    index % 2 === 0 ? 'text-silver' : 'text-stone'
                  )}>
                    {division.description}
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.4}>
                  <div className="mb-10">
                    <h3 className={cn(
                      "font-mono text-label uppercase tracking-wider mb-4",
                      index % 2 === 0 ? 'text-warm-gray' : 'text-stone'
                    )}>
                      We Create:
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {division.services.map((service) => (
                        <li
                          key={service}
                          className={cn(
                            "flex items-start gap-3 text-sm",
                            index % 2 === 0 ? 'text-silver' : 'text-stone'
                          )}
                        >
                          <span className="text-accent mt-1">•</span>
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.5}>
                  <Link
                    href={division.href}
                    className="group inline-flex items-center gap-3 text-accent font-medium hover:gap-4 transition-all"
                  >
                    View Work
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </ScrollReveal>
              </div>

              {/* Video/Visual Placeholder */}
              <div className={cn(
                "lg:col-span-6",
                index % 2 === 1 ? 'lg:order-1' : ''
              )}>
                <ScrollReveal delay={0.2} x={index % 2 === 0 ? 30 : -30} y={0}>
                  <div className="aspect-video bg-charcoal rounded-2xl overflow-hidden relative group cursor-pointer">
                    {/* Placeholder for video reel */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 group-hover:scale-110 transition-all duration-300">
                          <Play className="w-8 h-8 text-accent ml-1" />
                        </div>
                        <p className="text-warm-gray font-mono text-label uppercase tracking-wider">
                          Showreel
                        </p>
                      </div>
                    </div>
                    {/* Decorative gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
                    {/* Border on hover */}
                    <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/30 rounded-2xl transition-colors" />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <CTABand
        headline="Let's Build Something Together"
        description="Ready to bring your vision to life? Let's talk about your project."
        buttonText="Get Started"
        buttonHref="/contact"
        variant="accent"
      />
    </>
  )
}

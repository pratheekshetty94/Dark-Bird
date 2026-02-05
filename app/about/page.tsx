import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'
import { Award, Film, Share2, Palette, Cpu, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | Dark Bird Films',
  description: 'Founded in 2016, Dark Bird Films is an award-winning production house behind Kantara, 777 Charlie, and 100+ brand campaigns. Meet our team.',
}

const timeline = [
  {
    year: '2016',
    title: 'The Beginning',
    description: 'Pratheek Shetty founded Dark Bird Films with one clear belief — that stories should make you feel something real.',
  },
  {
    year: '2018',
    title: 'First Major Projects',
    description: 'Started working with production houses on feature film post-production and brand campaigns.',
  },
  {
    year: '2021',
    title: '777 Charlie',
    description: 'Edited the acclaimed film that touched millions, winning Karnataka State Film Award for Best Editor.',
  },
  {
    year: '2022',
    title: 'Kantara',
    description: 'Won Prajavani Cine Sammana 2024 for Best Editing on the blockbuster that captivated India.',
  },
  {
    year: '2024',
    title: 'Four Divisions',
    description: 'Evolved into Films, Socials, Designs, and Labs to deliver specialized excellence.',
  },
]

const departments = [
  {
    icon: Film,
    name: 'Dark Bird Films',
    description: 'Cinematic production, feature film support, and walkthrough videos.',
    href: '/work/films',
  },
  {
    icon: Share2,
    name: 'Dark Bird Socials',
    description: 'AI-powered digital marketing and performance campaigns.',
    href: '/work/socials',
  },
  {
    icon: Palette,
    name: 'Dark Bird Designs',
    description: 'Brand systems, motion graphics, and web design.',
    href: '/work/designs',
  },
  {
    icon: Cpu,
    name: 'Dark Bird Labs',
    description: 'AI-driven films, music, and marketing automation.',
    href: '/work/labs',
  },
]

// All client logos
const clientLogos = [
  { name: 'Google', logo: '/images/clients/Goog;e.png' },
  { name: 'Flipkart', logo: '/images/clients/FlipKart.png' },
  { name: 'Netflix', logo: '/images/clients/Netflix.png' },
  { name: 'Prime Video', logo: '/images/clients/Prime.png' },
  { name: 'Jio Studios', logo: '/images/clients/Jio Studios.png' },
  { name: 'Viacom', logo: '/images/clients/Viacom.png' },
  { name: 'Zomato', logo: '/images/clients/Zomato.png' },
  { name: 'Shopsy', logo: '/images/clients/Shopsy.png' },
  { name: 'Delhivery', logo: '/images/clients/DELHIVERY.png' },
  { name: 'HP', logo: '/images/clients/HP.png' },
  { name: 'Colors', logo: '/images/clients/colors.png' },
  { name: 'Hombale Films', logo: '/images/clients/HombaleFilms.png' },
  { name: 'Paramvah Studios', logo: '/images/clients/ParamvahStudio.png' },
  { name: 'PRK Productions', logo: '/images/clients/PRK.png' },
  { name: 'Rishab Shetty Films', logo: '/images/clients/RSF.png' },
  { name: 'GK Builders', logo: '/images/clients/GK.png' },
  { name: 'Mudskipper', logo: '/images/clients/MUDSKIPPER.png' },
  { name: 'Jungle', logo: '/images/clients/Jungle.png' },
  { name: 'Ricky Kej', logo: '/images/clients/RickyKej.png' },
  { name: 'Raghu Dixit', logo: '/images/clients/RaghuDixit.png' },
  { name: 'Hang Massive', logo: '/images/clients/HangMassive.png' },
  { name: 'Lighter Buddha', logo: '/images/clients/LighterBuddha.png' },
  { name: 'Daali', logo: '/images/clients/Daali.png' },
  { name: 'Hangyo', logo: '/images/clients/Hangyo.png' },
  { name: 'YO Fruits', logo: '/images/clients/YO Fruits.png' },
]

const awards = [
  {
    title: 'Prajavani Cine Sammana',
    category: 'Best Editing',
    project: 'Kantara',
    year: '2024',
  },
  {
    title: 'Karnataka State Film Award',
    category: 'Best Editing',
    project: '777 Charlie',
    year: '2021',
  },
  {
    title: 'Grammy Winning Album - Divine Tides',
    category: 'Directed, Shot & Edited',
    project: 'Mother Earth Music Video',
    year: '2022',
  },
]

const teamMembers = [
  {
    name: 'Pratheek Shetty',
    role: 'Founder & Creative Director',
    image: '/images/team/pratheek.jpg',
  },
  {
    name: 'Shraman Jain',
    role: 'Marketing Strategist',
    image: '/images/team/shraman.jpg',
  },
  {
    name: 'Trisha',
    role: 'Ads Manager',
    image: '/images/team/trisha.jpg',
  },
  {
    name: 'Rakshit',
    role: 'Editor',
    image: '/images/team/rakshit.jpg',
  },
  {
    name: 'Rakesh',
    role: 'Editor',
    image: '/images/team/rakesh.jpg',
  },
  {
    name: 'Athul',
    role: 'Assistant Editor',
    image: '/images/team/athul.png',
  },
  {
    name: 'Raksha',
    role: 'Content Manager',
    image: '/images/team/raksha.jpg',
  },
  {
    name: 'Adarsh',
    role: 'Accounting Supervisor',
    image: '/images/team/adarsh.jpg',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-dark pt-40 pb-24 relative overflow-hidden">
        {/* Background accent */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 80% 30%, #E85A3F 0%, transparent 60%)',
          }}
        />

        <div className="container-content relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-end">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <span className="label-parenthetical">Our Story</span>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h1 className="font-display text-hero text-cream mt-6 mb-8">
                  When Did We <em className="text-accent">Start?</em>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-body-lg text-silver max-w-2xl">
                  This restless filmmaker from Udupi kept chasing frames and stories,
                  cutting his first film at 19. And in 2016, he founded Dark Bird Films
                  with one clear belief — that stories should make you feel something real.
                </p>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5">
              <ScrollReveal delay={0.3}>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-[8rem] lg:text-[10rem] text-accent leading-none">
                    9
                  </span>
                  <div>
                    <span className="font-mono text-label uppercase tracking-wider text-warm-gray">
                      Years of
                    </span>
                    <br />
                    <span className="font-mono text-label uppercase tracking-wider text-warm-gray">
                      Storytelling
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story Timeline */}
      <section className="section-light section-padding">
        <div className="container-content">
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <ScrollReveal key={item.year} delay={index * 0.1}>
                <div className="flex gap-8 mb-12 last:mb-0 group">
                  {/* Year */}
                  <div className="flex-shrink-0 w-24">
                    <span className="font-display text-4xl text-accent group-hover:translate-x-1 transition-transform inline-block">
                      {item.year}
                    </span>
                  </div>
                  {/* Line */}
                  <div className="relative flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-accent ring-4 ring-accent/20" />
                    {index < timeline.length - 1 && (
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-px h-full bg-stone/30" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-12">
                    <h3 className="font-display text-xl text-ink mb-2 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-warm-gray">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-16 p-8 bg-cream/50 border border-stone/20 rounded-2xl max-w-3xl mx-auto">
              <p className="text-body-lg text-ink">
                What started as a one-person editing suite evolved into a creative force
                working on some of India's biggest cinematic moments. Not just any films,
                but the ones people actually remember — <strong className="text-accent">777 Charlie</strong>, <strong className="text-accent">Kantara</strong>, <strong className="text-accent">Gandhada Gudi</strong>.
                The ones that made audiences cry in theatres and sparked conversations everywhere.
              </p>
              <p className="text-body text-stone mt-4">
                And brands took notice. Google, Flipkart, Zomato — over 100 of them — all
                trusting us to bring their stories to life with cinematic craft.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Evolution Into 4 Departments */}
      <section className="section-dark section-padding">
        <div className="container-content">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-16">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <span className="label-parenthetical">How We Evolved</span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-display text-cream mt-6">
                  From one filmmaker to <em className="text-accent">four</em> specialized divisions
                </h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.2}>
                <p className="text-body-lg text-silver">
                  Dark Bird is rapidly growing, and to deliver exceptional work across
                  formats, we built dedicated teams for specialised excellence. Each vertical
                  is led by specialists who deliver nothing but their best work.
                </p>
              </ScrollReveal>
            </div>
          </div>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept) => {
              const Icon = dept.icon
              return (
                <Link
                  key={dept.name}
                  href={dept.href}
                  className="group p-8 bg-charcoal rounded-2xl hover:bg-charcoal/80 transition-all duration-300 border border-stone/10 hover:border-accent/30"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display text-xl text-cream mb-3 group-hover:text-accent transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-warm-gray text-sm mb-6">{dept.description}</p>
                  <span className="inline-flex items-center gap-2 text-accent text-sm font-medium">
                    Explore
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </Link>
              )
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-light section-padding">
        <div className="container-content">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-16">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <span className="label-parenthetical">The Team</span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-display text-ink mt-6">
                  Storytellers of Different <em className="text-accent">Stripes</em>
                </h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.2}>
                <p className="text-body-lg text-stone">
                  At Dark Bird, we have storytellers of different stripes, all flocking
                  together… with the same hunger. Same obsession. Toward the same standard
                  of excellence. Our team brings together editors, cinematographers, marketers,
                  and designers who share the same obsession with craft.
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* Team Grid */}
          <StaggerReveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group relative aspect-[3/4] bg-charcoal rounded-2xl overflow-hidden"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-display text-lg text-cream group-hover:text-accent transition-colors">
                    {member.name}
                  </p>
                  <p className="font-mono text-xs text-warm-gray uppercase tracking-wider mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Client Logos */}
      <section className="section-dark section-padding">
        <div className="container-content">
          {/* Section Header */}
          <div className="text-center mb-12">
            <ScrollReveal>
              <span className="label-parenthetical">Working With The Best</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-display text-cream mt-6">
                100+ Brands & <em className="text-accent">Production Houses</em>
              </h2>
            </ScrollReveal>
          </div>

          {/* Logo Grid - 5 columns to ensure even distribution */}
          <StaggerReveal className="grid grid-cols-5 gap-6 md:gap-8">
            {clientLogos.map((client, index) => (
              <div
                key={client.name}
                className="flex items-center justify-center group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative h-16 md:h-20 lg:h-24 w-full opacity-40 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="section-dark section-padding pb-16 md:pb-24 relative overflow-hidden">
        {/* Gold accent */}
        <div
          className="absolute top-0 left-0 w-1/2 h-full opacity-5 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 20% 50%, #C4961A 0%, transparent 60%)',
          }}
        />

        <div className="container-content relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-16">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <span className="label-parenthetical">Recognition</span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-display text-cream mt-6">
                  Awards & <em className="text-gold">Achievements</em>
                </h2>
              </ScrollReveal>
            </div>
          </div>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <div
                key={`${award.title}-${index}`}
                className="group p-8 border border-gold/30 rounded-2xl bg-gold/5 hover:bg-gold/10 transition-colors"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-6 h-6 text-gold" />
                  <span className="font-display text-2xl text-gold">{award.year}</span>
                </div>
                <h3 className="font-display text-xl text-cream mb-2 group-hover:text-gold transition-colors">
                  {award.title}
                </h3>
                <p className="text-gold text-sm font-medium mb-2">{award.category}</p>
                <p className="text-warm-gray text-sm">{award.project}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* CTA */}
      <CTABand
        headline="Ready to Create Something Unforgettable?"
        description="Whether it's a feature film, a brand campaign, or a visual story that needs to be told with cinematic honesty — Dark Bird Films is ready."
        buttonText="Schedule a Call"
        buttonHref="/contact"
      />
    </>
  )
}

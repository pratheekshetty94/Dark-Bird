import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'
import HeroSlideshow from '@/components/about/HeroSlideshow'
import BTSGallery from '@/components/about/BTSGallery'
import { Award, Film, Share2, Palette, Cpu, ArrowUpRight, Quote } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Dark Bird Films & Founder Pratheek Shetty | Award-Winning Production House',
  description: 'Founded in 2016 by Pratheek Shetty, Dark Bird Films is the award-winning production house behind Kantara, 777 Charlie & Gandhada Gudi. Meet our team in HSR Layout, Bengaluru.',
  keywords: [
    'about dark bird films', 'pratheek shetty filmmaker', 'pratheek shetty editor',
    'dark bird films founder', 'kantara editor pratheek shetty', '777 charlie editor',
    'film production house bengaluru story', 'award winning production house india',
    'bengaluru filmmaker', 'kannada film editor',
  ],
  openGraph: {
    title: 'About Dark Bird Films & Pratheek Shetty',
    description: 'The story behind the studio that edited Kantara, 777 Charlie & 100+ brand campaigns.',
    url: 'https://darkbirdfilms.com/about',
    type: 'profile',
  },
  alternates: {
    canonical: 'https://darkbirdfilms.com/about',
  },
}

/* The crew — storytellers of different stripes, same obsession. */
const teamMembers = [
  { name: 'Pratheek Shetty', role: 'Founder & Creative Director', image: '/images/team/pratheek.jpg' },
  { name: 'Shraman Jain', role: 'Marketing Strategist', image: '/images/team/shraman.jpg' },
  { name: 'Trisha', role: 'Ads Manager', image: '/images/team/trisha.jpg' },
  { name: 'Rakshit', role: 'Editor', image: '/images/team/rakshit.jpg' },
  { name: 'Rakesh', role: 'Editor', image: '/images/team/rakesh.jpg' },
  { name: 'Athul', role: 'Assistant Editor', image: '/images/team/athul.jpg' },
  { name: 'Raksha', role: 'Content Manager', image: '/images/team/raksha.jpg' },
  { name: 'Adarsh', role: 'Accounting Supervisor', image: '/images/team/adarsh.jpg' },
]

/* BTS — The real work. Cameras, lighting, on-set production. This is what sells.
   No image here may appear anywhere else on the About page. */
const btsImages = [
  { src: '/images/about/bts-orchestra-jungle.jpg', caption: 'Orchestra in the Jungle Set', film: '' },
  { src: '/images/about/bts-forest-trek-puneeth.jpg', caption: 'Forest Trek with Puneeth Rajkumar', film: 'Gandhada Gudi' },
  { src: '/images/about/bts-auto-rickshaw-shoot.jpg', caption: 'Auto-Rickshaw Shoot', film: '' },
  { src: '/images/about/bts-kashmir-winter.jpg', caption: 'Winter Shoot — Kashmir', film: '' },
  { src: '/images/about/bts-lake-umbrella-shoot.jpg', caption: 'Lakeside Crew — Monsoon Shoot', film: '' },
  { src: '/images/about/bts-kashmir-snow-crew.jpg', caption: 'Kashmir Snow — Full Crew', film: '' },
  { src: '/images/about/bts-nagaland-headdress.jpg', caption: 'Hornbill Festival — Nagaland', film: '' },
  { src: '/images/about/bts-morung-tribe.jpg', caption: 'Inside a Morung — Nagaland', film: '' },
  { src: '/images/about/bts-tribe-firelight.jpg', caption: 'Konyak Elders — Firelight', film: '' },
  { src: '/images/about/bts-winter-portrait.jpg', caption: 'Winter Portrait — Up North', film: '' },
  { src: '/images/about/bts-screening-night.jpg', caption: 'Premiere Night', film: '' },
  { src: '/images/about/bts-team-dinner.jpg', caption: 'Team Dinner', film: '' },
  { src: '/images/about/bts-blue-smoke-dance.jpg', caption: 'Blue Smoke — Dance Sequence', film: '' },
  { src: '/images/about/bts-cinematographer-silhouette.jpg', caption: 'Cinematographer Silhouette', film: '' },
  { src: '/images/about/bts-rainforest-cinematography.jpg', caption: 'Rainforest Cinematography', film: '' },
  { src: '/images/about/bts-misty-forest-rig.jpg', caption: 'Misty Forest — Camera Rig', film: '' },
  { src: '/images/about/bts-red-music-video.jpg', caption: 'Red-Lit Music Video Shoot', film: '' },
  { src: '/images/about/bts-dhaba-laptop-review.jpg', caption: 'Roadside Laptop Review', film: '' },
  { src: '/images/about/bts-blue-lit-studio.jpg', caption: 'Blue-Lit Studio Setup', film: '' },
  { src: '/images/about/bts-monitoring-take.jpg', caption: 'Monitoring the Take', film: '' },
  { src: '/images/about/bts-dawn-misty-lake.jpg', caption: 'Dawn Shoot — Misty Lake', film: '' },
  { src: '/images/about/bts-dark-studio-crew.jpg', caption: 'Dark Studio — Crew Behind Camera', film: '' },
  { src: '/images/about/bts-color-grading.jpg', caption: 'Color Grading Suite', film: '' },
  { src: '/images/about/bts-777charlie-editing.jpg', caption: 'Editing 777 Charlie', film: '777 Charlie' },
  { src: '/images/about/bts-kantara-editing.jpg', caption: 'Editing Kantara', film: 'Kantara' },
  { src: '/images/about/bts-turmeric-festival.jpg', caption: 'Turmeric Festival', film: '' },
  { src: '/images/about/bts-body-paint-forest.jpg', caption: 'Body Paint Sequence — Forest', film: '' },
  { src: '/images/about/bts-lakeside-puneeth.jpg', caption: 'Lakeside with Puneeth', film: 'Gandhada Gudi' },
  { src: '/images/about/bts-rainforest-direction.jpg', caption: 'Rainforest Direction', film: 'Gandhada Gudi' },
  { src: '/images/about/bts-ladakh-festival.jpg', caption: 'Ladakh Festival Shoot', film: '' },
  { src: '/images/about/bts-boat-crew-sunset.jpg', caption: 'Boat Crew — Sunset', film: '' },
  { src: '/images/about/bts-desert-crew-jeep.jpg', caption: 'Desert Crew — Jeep', film: '' },
  { src: '/images/about/bts-french-biriyani.jpg', caption: 'French Biriyani — On Set', film: 'French Biriyani' },
  { src: '/images/about/bts-jodhpur-blue-city.jpg', caption: 'Jodhpur Blue City', film: '' },
  { src: '/images/about/bts-snow-off-camera.jpg', caption: 'Snow Day — Off Camera', film: '' },
  { src: '/images/about/bts-karakoram-jump.jpg', caption: 'Karakoram Jump', film: '' },
  { src: '/images/about/bts-winter-drone-ops.jpg', caption: 'Winter Forest — Drone Ops', film: '' },
  { src: '/images/about/bts-truck-convoy.jpg', caption: 'Truck Convoy — Road Shoot', film: '' },
  { src: '/images/about/bts-village-shoot.jpg', caption: 'Village Crowd Shoot', film: '' },
  { src: '/images/about/bts-charlie-wrap.jpg', caption: 'Wrap Day — Charlie', film: '777 Charlie' },
  { src: '/images/about/bts-777charlie-press-launch.jpg', caption: '777 Charlie — Press Launch', film: '777 Charlie' },
  { src: '/images/about/bts-projection-room.jpg', caption: 'Projection Room', film: 'Kantara' },
  { src: '/images/about/bts-team-portrait-puneeth.jpg', caption: 'Team Portrait with Puneeth', film: '' },
]

/* Visual Gallery — compact strip, travel cinematography */
// Client logos
const clientLogos = [
  { name: 'Google', logo: '/images/clients/Goog;e.png' },
  { name: 'Flipkart', logo: '/images/clients/FlipKart.png' },
  { name: 'Netflix', logo: '/images/clients/Netflix.png' },
  { name: 'Amazon Prime', logo: '/images/clients/amazon Prime.png' },
  { name: 'Jio Studios', logo: '/images/clients/Jio Studios.png' },
  { name: 'JioHotstar', logo: '/images/clients/JioHotstar.png' },
  { name: 'Viacom', logo: '/images/clients/Viacom.png' },
  { name: 'Zomato', logo: '/images/clients/Zomato.png' },
  { name: 'Shopsy', logo: '/images/clients/Shopsy.png' },
  { name: 'Delhivery', logo: '/images/clients/DELHIVERY.png' },
  { name: 'HP', logo: '/images/clients/HP.png' },
  { name: 'Colors', logo: '/images/clients/colors.png' },
  { name: 'Hombale Films', logo: '/images/clients/HombaleFilms.png' },
  { name: 'Paramvah Studios', logo: '/images/clients/ParamvahStudio.png' },
  { name: 'PRK Productions', logo: '/images/clients/PRK.png' },
  { name: 'Rishab Shetty Films', logo: '/images/clients/rishab shetty films.png' },
  { name: 'GK Builders', logo: '/images/clients/GK Builders.png' },
  { name: 'Mudskipper', logo: '/images/clients/MUDSKIPPER.png' },
  { name: 'Jungle Lodges', logo: '/images/clients/Jungle lodges.png' },
  { name: 'Ricky Kej', logo: '/images/clients/RickyKej.png' },
  { name: 'Raghu Dixit', logo: '/images/clients/RaghuDixit.png' },
  { name: 'Hang Massive', logo: '/images/clients/HangMassive.png' },
  { name: 'Lighter Buddha', logo: '/images/clients/LighterBuddha.png' },
  { name: 'Daali', logo: '/images/clients/Daali.png' },
  { name: 'Hangyo', logo: '/images/clients/Hangyo.png' },
  { name: 'YO Fruits', logo: '/images/clients/YO Fruits.png' },
  { name: 'Coffee Gang', logo: '/images/clients/CoffeGang.png' },
  { name: 'Mango Pickle', logo: '/images/clients/MangoPickle.png' },
  { name: 'Saint Art', logo: '/images/clients/saint art.png' },
  { name: 'Sri Devi Entertainers', logo: '/images/clients/sri devi entertainers.png' },
  { name: 'Vaishno Studio', logo: '/images/clients/VaishnoStudio.png' },
  { name: 'VARI', logo: '/images/clients/VARI.png' },
]

export default function AboutPage() {
  return (
    <>
      {/* ━━━ HERO SLIDESHOW ━━━ */}
      <HeroSlideshow />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MEET THE FOUNDER + THE STUDIO — merged.
          Portrait & founder story up top, company pillars below.
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-ink overflow-hidden">
        {/* Gradient accent glow behind section */}
        <div
          className="absolute top-0 right-0 w-[800px] h-[800px] opacity-[0.04] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #E85A3F 0%, transparent 50%)' }}
        />

        <div className="container-content relative z-10 py-24 md:py-32">
          {/* Two-column: Portrait left, Content right */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: Full portrait — big, commanding, editorial */}
            <ScrollReveal>
              <div className="relative">
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                  <Image
                    src="/images/about/pratheek-shetty.jpg"
                    alt="Pratheek Shetty — Founder, Dark Bird Films"
                    fill
                    className="object-cover object-top"
                    priority
                    unoptimized
                  />
                  {/* Subtle bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                </div>

              </div>
            </ScrollReveal>

            {/* Right: Content — punchy, Gen Z, founder-first */}
            <div>
              <ScrollReveal delay={0.1}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-accent" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                    Meet the Founder
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] text-cream leading-[0.95] tracking-tight mb-2">
                  Pratheek Shetty
                </h2>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-8">
                  Filmmaker &bull; Editor &bull; Cinematographer &bull; Director
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-lg md:text-xl text-silver leading-relaxed mb-6">
                  Started editing at 19. Founded Dark Bird at 22. Edited{' '}
                  <strong className="text-cream">Kantara</strong> and{' '}
                  <strong className="text-cream">777 Charlie</strong> before 30.
                  Shot <strong className="text-cream">Puneeth Rajkumar&apos;s</strong> documentary.
                  Directed Grammy-winning music videos.
                </p>
                <p className="text-base text-warm-gray leading-relaxed mb-10">
                  Not the traditional corporate founder. A filmmaker who builds teams,
                  breaks format, and refuses to make anything average. Every project at
                  Dark Bird starts with one question &mdash;{' '}
                  <em className="text-cream">&ldquo;does this make you feel something?&rdquo;</em>
                </p>
              </ScrollReveal>

            </div>
          </div>

          {/* ── Divider ── */}
          <div className="my-20 md:my-28 flex items-center gap-6 max-w-2xl mx-auto">
            <div className="flex-1 h-px bg-stone/15" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/70">
              From Founder to Studio
            </span>
            <div className="flex-1 h-px bg-stone/15" />
          </div>

          {/* ── The Studio Today — company-first narrative ── */}
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-accent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                The Studio Today
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-display text-cream mb-4 max-w-3xl">
              One obsession scaled into a full-service studio.
            </h2>
            <p className="text-warm-gray text-base md:text-lg mb-16 max-w-2xl leading-relaxed">
              What started as one filmmaker in an edit suite is now Dark Bird &mdash;
              four in-house divisions, a tight crew of obsessives, and a client list
              that spans India&apos;s biggest studios and the brands you use every day.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Film,
                number: '01',
                title: 'Four Divisions, One Roof',
                description: 'Dark Bird Films, Socials, Designs, and Labs — every department in-house. No handoffs, no finger-pointing, no waiting on vendors.',
                highlight: 'End-to-End Studio',
              },
              {
                icon: Award,
                number: '02',
                title: 'Award-Winning Pedigree',
                description: 'Kantara. 777 Charlie. Gandhada Gudi. A Grammy. National Awards, State Awards, and a body of work that plays in cinemas and streams worldwide.',
                highlight: '4 National Awards · 45+ Accolades',
              },
              {
                icon: Share2,
                number: '03',
                title: 'Trusted by 100+ Brands',
                description: 'From Netflix, Amazon Prime, and Flipkart to Hombale Films, Paramvah, and PRK — studios and brands choose Dark Bird when the work actually has to land.',
                highlight: '100+ Brands Shipped',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.number}
                  className="group relative p-8 md:p-10 bg-charcoal/60 rounded-2xl border border-stone/10 hover:border-accent/30 transition-all duration-500"
                >
                  <span className="absolute top-6 right-8 font-display text-[6rem] md:text-[8rem] text-stone/[0.06] leading-none select-none pointer-events-none">
                    {item.number}
                  </span>

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 group-hover:shadow-glow transition-all duration-500">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>

                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="font-mono text-[10px] text-accent/50 uppercase tracking-wider">
                        {item.number}
                      </span>
                      <h3 className="font-display text-2xl text-cream group-hover:text-accent transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-warm-gray text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <span className="inline-block font-mono text-[10px] uppercase tracking-wider text-accent/80 bg-accent/10 px-3 py-1.5 rounded-full">
                      {item.highlight}
                    </span>
                  </div>
                </div>
              )
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* ━━━ AWARDS — Compact, confident ━━━ */}
      <section className="relative overflow-hidden">
        <div className="relative h-[50vh] min-h-[400px]">
          {/* Split banner: Award ceremony + 777 Charlie editing */}
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
            <div className="relative overflow-hidden">
              <Image
                src="/images/about/award-best-editor-kantara.jpg"
                alt="Pratheek Shetty receiving Best Editor award for Kantara"
                fill
                className="object-cover object-top"
                unoptimized
              />
            </div>
            <div className="relative overflow-hidden hidden md:block">
              <Image
                src="/images/about/bts-777charlie-editing.jpg"
                alt="Editing 777 Charlie — post-production suite"
                fill
                className="object-cover object-center"
                unoptimized
              />
            </div>
          </div>
          {/* Mobile: show only award image as full background */}
          <div className="absolute inset-0 md:hidden">
            <Image
              src="/images/about/award-best-editor-kantara.jpg"
              alt="Pratheek Shetty receiving Best Editor award for Kantara"
              fill
              className="object-cover object-top"
              unoptimized
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/20 to-ink z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-ink/50 z-[1]" />

          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay z-[1]"
            style={{ background: 'radial-gradient(ellipse at 50% 80%, #C9A962 0%, transparent 50%)' }}
          />

          <div className="absolute inset-0 flex items-end z-[2]">
            <div className="container-content pb-12">
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-px bg-gold" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                    Recognition
                  </span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-display text-cream">
                  Awards &amp; <em className="text-gold">Achievements</em>
                </h2>
              </ScrollReveal>
            </div>
          </div>
        </div>

        <div className="bg-ink py-16 md:py-20">
          <div className="container-content">
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { title: 'Prajavani Cine Sammana', category: 'Best Editing', project: 'Kantara', year: '2024' },
                { title: 'Karnataka State Film Award', category: 'Best Editing', project: '777 Charlie', year: '2021' },
                { title: 'Grammy Winning Album', category: 'Directed, Shot & Edited', project: 'Divine Tides — Mother Earth', year: '2022' },
              ].map((award, index) => (
                <div
                  key={`${award.title}-${index}`}
                  className="group relative p-6 md:p-8 border border-gold/20 rounded-2xl bg-gold/[0.03] hover:bg-gold/[0.08] transition-all duration-500 overflow-hidden"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(201, 169, 98, 0.1) 0%, transparent 60%)' }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <Award className="w-6 h-6 text-gold" />
                      <span className="font-display text-3xl text-gold/60">{award.year}</span>
                    </div>
                    <h3 className="font-display text-xl text-cream mb-2 group-hover:text-gold transition-colors duration-300">
                      {award.title}
                    </h3>
                    <p className="text-gold/80 text-sm font-medium mb-1">{award.category}</p>
                    <p className="text-warm-gray text-sm">{award.project}</p>
                  </div>
                </div>
              ))}
            </StaggerReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-center font-mono text-[10px] text-warm-gray/50 uppercase tracking-wider mt-8">
                * Films edited by Pratheek Shetty have collectively won 4 National Awards and 45+ accolades
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ━━━ BTS — Behind the Scenes — THE HERO SECTION ━━━ */}
      <section className="relative bg-ink py-16 md:py-24 overflow-hidden">
        <div className="container-content">
          <div className="grid lg:grid-cols-12 gap-8 mb-10 md:mb-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  Behind the Scenes
                </span>
              </div>
              <h2 className="font-display text-display text-cream">
                Where the<br />
                <em className="text-accent">magic happens</em>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:flex lg:items-end">
              <p className="text-body text-warm-gray max-w-lg">
                Big cameras, bigger ambitions. From smoky studio setups with
                cinema-grade rigs to golden hour shoots in the Western Ghats
                &mdash; this is what production looks like at Dark Bird.
              </p>
            </div>
          </div>

          {/* Grid — BTS images with fullscreen lightbox */}
          <BTSGallery images={btsImages} />
        </div>
      </section>

      {/* ━━━ THE TEAM — Storytellers of different stripes ━━━ */}
      <section className="relative bg-ink py-24 md:py-32 overflow-hidden">
        <div className="container-content">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-12 md:mb-16">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-accent" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                    The Team
                  </span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-cream leading-[1.05]">
                  Storytellers of Different{' '}
                  <em className="text-accent">Stripes</em>
                </h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7 flex items-end">
              <ScrollReveal delay={0.15}>
                <p className="text-lg text-silver leading-relaxed">
                  At Dark Bird, we have storytellers of different stripes, all flocking
                  together &mdash; with the same hunger, the same obsession, toward the same
                  standard of excellence. Editors, strategists, marketers, and designers
                  who share one refusal: nothing leaves the studio unless it&apos;s
                  genuinely exceptional.
                </p>
              </ScrollReveal>
            </div>
          </div>

          <StaggerReveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group relative aspect-[3/4] bg-charcoal rounded-2xl overflow-hidden"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-top grayscale transition-transform duration-700 group-hover:scale-105"
                />
                {/* Radial vignette — darkens edges so lighter backgrounds (e.g. Pratheek's street portrait) blend with the other studio shots. */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(12,12,12,0.85) 100%)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <p className="font-display text-base md:text-lg text-cream group-hover:text-accent transition-colors">
                    {member.name}
                  </p>
                  <p className="font-mono text-[10px] md:text-xs text-warm-gray uppercase tracking-wider mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ━━━ FOUR DIVISIONS ━━━ */}
      <section className="section-dark section-padding">
        <div className="container-content">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-16">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-px bg-accent" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                    Structure
                  </span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-display text-cream">
                  Four specialized <em className="text-accent">divisions</em>
                </h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7 lg:flex lg:items-end">
              <ScrollReveal delay={0.2}>
                <p className="text-body-lg text-silver">
                  Each vertical has its own identity, its own team, its own obsession.
                  One creative vision running through all of them.
                </p>
              </ScrollReveal>
            </div>
          </div>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Film, name: 'Dark Bird Films', description: 'Cinematic production, feature film support, and walkthrough videos.', href: '/filmography' },
              { icon: Share2, name: 'Dark Bird Socials', description: 'AI-powered digital marketing and performance campaigns.', href: '/work/socials' },
              { icon: Palette, name: 'Dark Bird Designs', description: 'Brand systems, motion graphics, and web design.', href: '/work/designs' },
              { icon: Cpu, name: 'Dark Bird Labs', description: 'AI-driven films, music, and marketing automation.', href: '/work/labs' },
            ].map((dept, index) => {
              const Icon = dept.icon
              return (
                <Link
                  key={dept.name}
                  href={dept.href}
                  className="group relative p-8 bg-charcoal rounded-2xl hover:bg-charcoal/80 transition-all duration-500 border border-stone/10 hover:border-accent/30 overflow-hidden"
                >
                  <span className="absolute top-4 right-6 font-mono text-[10px] text-warm-gray/20 tracking-wider">
                    0{index + 1}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 group-hover:shadow-glow transition-all duration-500">
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

      {/* ━━━ CLIENT LOGOS ━━━ */}
      <section className="section-dark section-padding pb-8 md:pb-12">
        <div className="container-content">
          <div className="text-center mb-12">
            <ScrollReveal>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-px bg-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  Trusted By
                </span>
                <div className="w-12 h-px bg-accent" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-display text-cream">
                100+ Brands &amp; <em className="text-accent">Studios</em>
              </h2>
            </ScrollReveal>
          </div>

          <StaggerReveal className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6">
            {clientLogos.map((client, index) => (
              <div
                key={client.name}
                className="flex items-center justify-center group"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className="relative h-12 md:h-16 lg:h-20 w-full opacity-40 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110">
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

      {/* ━━━ CTA ━━━ */}
      <CTABand
        headline="Ready to Create Something Unforgettable?"
        description="Whether it's a feature film, a brand campaign, or a story that needs cinematic craft — let's talk."
        buttonText="Schedule a Call"
        buttonHref="/contact"
      />
    </>
  )
}

'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function BrandPositioning() {
  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container-content relative z-10 py-16 md:py-32">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="lg:col-span-7">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent bg-ink/60 px-3 py-1 rounded-full inline-block">
              ( Who We Are )
            </span>

            <div className="mt-4 md:mt-6 flex items-baseline gap-3 md:gap-4">
              <span className="font-display text-6xl md:text-[10rem] text-accent leading-none">
                9
              </span>
              <div>
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-cream">
                  Years of
                </span>
                <br />
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-cream">
                  Storytelling
                </span>
              </div>
            </div>

            <h2 className="font-display text-2xl md:text-5xl text-cream mb-4 md:mb-6 mt-6 md:mt-8">
              We tell stories that <em className="text-accent">move</em> people
              and <em className="text-accent">grow</em> brands.
            </h2>

            <p className="text-sm md:text-lg text-cream/90 mb-3 md:mb-4 max-w-2xl">
              Founded in 2016 by award-winning editor & cinematographer Pratheek Shetty,
              Dark Bird brings the soul of cinema into the world of brand storytelling.
            </p>

            <p className="text-xs md:text-base text-cream/80 mb-6 md:mb-8 max-w-2xl">
              We're a team of filmmakers who believe every brand deserves to be seen and
              felt like a film.
            </p>

            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <Link href="/contact" className="px-5 py-2.5 md:px-6 md:py-3 bg-accent text-cream text-sm font-medium rounded-lg">
                Schedule a Call
              </Link>
              <Link href="/work" className="px-5 py-2.5 md:px-6 md:py-3 border border-cream/50 text-cream text-sm font-medium rounded-lg">
                Explore Our Work
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              <Image
                src="/images/we tell stories 9 years of story telling.png"
                alt="9 Years of Storytelling"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

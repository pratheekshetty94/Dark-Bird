'use client'

import React from 'react'
import Image from 'next/image'

const principles = [
  {
    number: '01',
    title: 'Creative Trust',
    description: 'The foundation of every great project. We build relationships, not just deliverables.',
  },
  {
    number: '02',
    title: 'Craft Over Trends',
    description: "We don't chase virality. We create work that stands the test of time.",
  },
  {
    number: '03',
    title: 'Total Ownership',
    description: 'Every project gets our full creative commitment, from first frame to final cut.',
  },
]

export default function DarkBirdWay() {
  return (
    <section className="section-dark py-12 md:py-24 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="hidden md:block absolute bottom-0 left-0 w-1/2 h-1/2 opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 80%, #E85A3F 0%, transparent 60%)',
        }}
      />

      <div className="container-content relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-24">
          {/* Left Column - Creative Trust Visual */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-charcoal">
              {/* Creative Trust Vector Image */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <Image
                  src="/images/creative-trust.png"
                  alt="Creative Trust"
                  fill
                  className="object-contain p-8"
                />
              </div>
              {/* Decorative overlays */}
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-accent/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-accent/10 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-transparent" />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-7">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent">
              ( Our Philosophy )
            </span>

            <h2 className="font-display text-2xl md:text-5xl text-cream mt-3 md:mt-6 mb-4 md:mb-8">
              The Dark Bird <em className="text-accent">Way</em>
            </h2>

            <p className="text-sm md:text-lg text-silver mb-4 md:mb-6 max-w-xl">
              Our vision is to create a global impact. We're filmmakers and storytellers
              on a mission to strengthen one thing —{' '}
              <span className="text-accent font-medium">"Creative Trust."</span>
            </p>

            <p className="text-xs md:text-base text-warm-gray mb-8 md:mb-12 max-w-xl">
              Trust forms the foundation of great work, which is why our mission is to
              become the most trusted creative institution for brands that value craft,
              honesty, and stories that actually matter.
            </p>

            {/* Principles */}
            <div className="space-y-4 md:space-y-8 pt-4 md:pt-8 border-t border-stone/30">
              {principles.map((principle) => (
                <div key={principle.number} className="group flex gap-4 md:gap-6">
                  <span className="font-mono text-xs md:text-sm text-accent">
                    {principle.number}
                  </span>
                  <div>
                    <h3 className="font-display text-base md:text-xl text-cream mb-1 md:mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-warm-gray text-xs md:text-sm max-w-md">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="hidden md:block mt-12 pt-8 border-t border-stone/30">
              <p className="font-display text-lg text-silver italic">
                "From Pratheek's editing bay to our studio floor, every frame carries
                the same obsession with craft that earned us a seat in the rooms where
                Kantara and 777 Charlie were shaped."
              </p>
              <p className="text-warm-gray text-sm mt-4">
                — That's not a sales pitch. That's how we work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

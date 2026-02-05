'use client'

import React from 'react'

const metrics = [
  { number: '375M+', label: 'Video Views', suffix: 'across platforms' },
  { number: '100+', label: 'Brands', suffix: 'partnered with' },
  { number: '15+', label: 'Feature Films', suffix: 'edited & shot' },
  { number: '2016', label: 'Founded', suffix: 'in Bengaluru' },
]

export default function MetricsBar() {
  return (
    <section className="section-light py-16 md:py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone/20 to-transparent" />

      <div className="container-content">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center lg:text-left">
              {/* Number */}
              <div className="font-display text-4xl md:text-5xl text-ink whitespace-nowrap">
                {metric.number}
              </div>

              {/* Label */}
              <div className="mt-2">
                <span className="font-medium text-sm md:text-base text-ink whitespace-nowrap">
                  {metric.label}
                </span>
                <span className="block text-xs md:text-sm text-warm-gray mt-1">
                  {metric.suffix}
                </span>
              </div>

              {/* Accent line */}
              <div className="mt-4 mx-auto lg:mx-0 w-8 h-0.5 bg-accent/30" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

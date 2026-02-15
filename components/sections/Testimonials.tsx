'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'

const testimonials = [
  {
    id: '1',
    quote: "Working with Dark Bird Films has been a creatively fulfilling experience. I've had the privilege of directing a few projects under their banner, and each one has been marked by a high standard of professionalism, passion, and artistic integrity.",
    author: 'Raj B Shetty',
    title: 'Actor & Director',
    company: 'Film Industry',
    image: '/images/testimonials/Raj-B-Shetty-5-oEpkW16944.jpg',
    imagePosition: 'object-[50%_15%]',
  },
  {
    id: '2',
    quote: "We at Hangyo got in touch with Pratheek and got done two TVCs with Dark Bird Films. Was a great experience. They did a good job, team was professional, creative. Really appreciate their commitment to deliver on time.",
    author: 'Deepa Pai',
    title: 'VP of Branding',
    company: 'Hangyo Ice Cream Pvt. Ltd',
    image: '/images/testimonials/Deepa hangyo.png',
    imagePosition: 'object-[50%_15%]',
  },
  {
    id: '3',
    quote: 'The music video collaboration with Dark Bird was exceptional. They understood the emotion behind the music and translated it into visuals that elevated the entire piece.',
    author: 'Ricky Kej',
    title: '3-time Grammy Award Winner',
    company: 'Music Industry',
    image: '/images/testimonials/3-time_Grammy®_Award-winner,_Ricky_Kej.jpg',
    imagePosition: 'object-[50%_25%]',
  },
  {
    id: '4',
    quote: 'Dark Bird Films captured the essence of my music beautifully. Their cinematic approach and attention to detail made the collaboration seamless and the end result truly special.',
    author: 'Raghu Dixit',
    title: 'Singer & Composer',
    company: 'The Raghu Dixit Project',
    image: '/images/testimonials/raghu dixit.jpg',
    imagePosition: 'object-[30%_20%]',
  },
  {
    id: '5',
    quote: 'Working with the Dark Bird team was an incredible experience. Their creative vision and technical expertise brought our musical story to life in ways we never imagined.',
    author: 'Varijashree Venugopal',
    title: 'Grammy Nominee',
    company: 'Music Industry',
    image: '/images/testimonials/Varijashree-Venugopal- grammy nominee.jpg',
    imagePosition: 'object-[50%_20%]',
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const goToPrevious = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="section-dark py-12 md:py-24 relative overflow-hidden">
      <div className="container-content relative z-10">
        {/* Header */}
        <div className="text-center mb-6 md:mb-16">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent">
            ( Testimonials )
          </span>
          <h2 className="font-display text-2xl md:text-5xl text-cream mt-3 md:mt-6">
            Voices of Our <em className="text-accent">Partners</em>
          </h2>
        </div>

        {/* Testimonial Content */}
        <div className="relative max-w-5xl mx-auto">
          <div className="flex flex-col md:grid md:grid-cols-5 gap-4 md:gap-12 items-start md:min-h-[280px]">
            {/* Image */}
            <div className="md:col-span-2 flex justify-center items-start md:pt-2">
              <div className="relative w-24 h-24 md:w-56 md:h-56 flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden border-2 border-accent/50">
                <Image
                  key={currentTestimonial.id}
                  src={currentTestimonial.image}
                  alt={currentTestimonial.author}
                  fill
                  sizes="(max-width: 768px) 96px, 224px"
                  className={`object-cover ${currentTestimonial.imagePosition}`}
                  priority={currentIndex === 0}
                  loading={currentIndex === 0 ? 'eager' : 'lazy'}
                />
              </div>
            </div>

            {/* Quote Content */}
            <div className="md:col-span-3 relative text-center md:text-left">
              <Quote className="hidden md:block absolute -top-4 -left-2 w-10 h-10 text-accent/20" />

              <blockquote className="md:pl-8">
                <p className="text-sm md:text-xl text-cream leading-relaxed mb-3 md:mb-8 line-clamp-4 md:line-clamp-5">
                  &ldquo;{currentTestimonial.quote}&rdquo;
                </p>

                <footer>
                  <cite className="not-italic font-display text-base md:text-2xl text-accent">
                    {currentTestimonial.author}
                  </cite>
                  <p className="font-mono text-[9px] md:text-sm text-warm-gray uppercase tracking-wider mt-1">
                    {currentTestimonial.title}
                  </p>
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6 md:mt-12">
            <button
              onClick={goToPrevious}
              className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-stone/30 flex items-center justify-center text-cream"
              aria-label="Previous"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5 md:gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'h-1.5 md:h-2 rounded-full transition-all',
                    index === currentIndex
                      ? 'w-5 md:w-10 bg-accent'
                      : 'w-1.5 md:w-2 bg-cream/30'
                  )}
                  aria-label={`Go to ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-stone/30 flex items-center justify-center text-cream"
              aria-label="Next"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

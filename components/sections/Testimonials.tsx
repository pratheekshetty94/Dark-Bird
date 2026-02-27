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
    imagePosition: 'object-center',
  },
  {
    id: '2',
    quote: "We at Hangyo got in touch with Pratheek and got done two TVCs with Dark Bird Films. Was a great experience. They did a good job, team was professional, creative. Really appreciate their commitment to deliver on time.",
    author: 'Deepa Pai',
    title: 'VP of Branding',
    company: 'Hangyo Ice Cream Pvt. Ltd',
    image: '/images/testimonials/Deepa hangyo.jpg',
    imagePosition: 'object-top',
  },
  {
    id: '3',
    quote: "I worked with Pratheek for my music video for one of my songs 'Alemaari', which not only demanded great visuals but also a very intense story telling. Pratheek Shetty is a cinematographer and editor of rare, instinctive brilliance. He doesn't just capture images—he captures emotion, rhythm, and intent. Every frame he composes and every cut he makes feels purposeful, sensitive, and deeply cinematic. His ability to seamlessly balance visual beauty with storytelling clarity sets him apart, making him an invaluable creative partner on any project. He is a committed artist who doesn't settle for the ordinary. His constant relentless pursuit of perfection makes him a great asset for anyone who works with him!",
    author: 'Raghu Dixit',
    title: 'Singer & Composer',
    company: 'The Raghu Dixit Project',
    image: '/images/testimonials/raghu dixit.jpg',
    imagePosition: 'object-top',
  },
  {
    id: '4',
    quote: "I've had the pleasure of working with Pratheek Shetty for the past decade, and I've been consistently impressed by his exceptional talent and dedication. As an editor, cinematographer, colourist, and director, Pratheek has brought his A-game to every project we've collaborated on. His work as a Director on my Grammy Award-winning album Divine Tides is a testament to his skill and artistry. During the pandemic, Pratheek's expertise helped bring my online concerts to life, reaching millions of viewers worldwide. He's a true professional, always staying ahead of the curve with the latest technologies and techniques. His perfectionism is inspiring, and his multi-disciplinary approach makes him an invaluable asset to any film-making team or as a Director.",
    author: 'Ricky Kej',
    title: '3-Time Grammy Award Winner, Padma Shri Awardee',
    company: 'Music Industry',
    image: '/images/testimonials/3-time_Grammy®_Award-winner,_Ricky_Kej.jpg',
    imagePosition: 'object-[center_20%]',
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
          <div className="flex flex-col items-center md:grid md:grid-cols-5 gap-4 md:gap-12 md:items-start">
            {/* Image */}
            <div className="md:col-span-2 flex justify-center">
              <div className="relative w-32 h-32 md:w-72 md:h-72 rounded-xl md:rounded-2xl overflow-hidden border-2 border-accent/50">
                <Image
                  key={currentTestimonial.id}
                  src={currentTestimonial.image}
                  alt={currentTestimonial.author}
                  fill
                  sizes="(max-width: 768px) 128px, 288px"
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
                <p className="text-sm md:text-lg text-cream leading-relaxed mb-3 md:mb-8 line-clamp-4 md:line-clamp-none">
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

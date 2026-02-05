'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { Mail, Phone, MapPin, Instagram, Youtube, Linkedin, Facebook, Send, MessageCircle, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const services = [
  'Films',
  'Socials',
  'Designs',
  'Labs',
  'Other',
]

const budgetRanges = [
  'Under ₹2L',
  '₹2–5L',
  '₹5–10L',
  '₹10–20L',
  '₹20L+',
]

const socialLinks = [
  { href: 'https://instagram.com/darkbirdsocials', icon: Instagram, label: 'Instagram', handle: '@darkbirdsocials' },
  { href: 'https://youtube.com/@darkbirdfilms', icon: Youtube, label: 'YouTube', handle: '@darkbirdfilms' },
  { href: 'https://linkedin.com/company/darkbirdfilms', icon: Linkedin, label: 'LinkedIn', handle: 'Dark Bird Films' },
  { href: 'https://www.facebook.com/Darkbirdfilms/', icon: Facebook, label: 'Facebook', handle: 'Dark Bird Films' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="section-dark pt-40 pb-16 relative overflow-hidden">
        {/* Background accent */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 80% 30%, #E85A3F 0%, transparent 60%)',
          }}
        />

        <div className="container-content relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal>
              <span className="label-parenthetical">Contact</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-hero text-cream mt-6 mb-8">
                Get in <em className="text-accent">Touch</em>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-body-lg text-silver">
                Whether it's a film, a campaign, or a brand story — let's talk.
                We'd love to hear about your project and explore how we can bring your vision to life.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-light section-padding">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <ScrollReveal>
                <h2 className="font-display text-section text-ink mb-8">
                  Tell Us About Your <em className="text-accent">Project</em>
                </h2>
              </ScrollReveal>

              {isSubmitted ? (
                <ScrollReveal>
                  <div className="p-12 bg-accent/5 border border-accent/20 rounded-2xl text-center">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="w-10 h-10 text-accent" />
                    </div>
                    <h3 className="font-display text-2xl text-ink mb-3">
                      Message Sent!
                    </h3>
                    <p className="text-stone max-w-md mx-auto">
                      Thanks for reaching out. We'll get back to you within 24 hours.
                    </p>
                  </div>
                </ScrollReveal>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block font-mono text-label uppercase tracking-wider text-stone mb-3">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-cream border border-stone/20 rounded-lg text-ink placeholder:text-warm-gray focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-mono text-label uppercase tracking-wider text-stone mb-3">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-cream border border-stone/20 rounded-lg text-ink placeholder:text-warm-gray focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  {/* Phone & Company Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block font-mono text-label uppercase tracking-wider text-stone mb-3">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-cream border border-stone/20 rounded-lg text-ink placeholder:text-warm-gray focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block font-mono text-label uppercase tracking-wider text-stone mb-3">
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-cream border border-stone/20 rounded-lg text-ink placeholder:text-warm-gray focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        placeholder="Your company"
                      />
                    </div>
                  </div>

                  {/* Service & Budget Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="service" className="block font-mono text-label uppercase tracking-wider text-stone mb-3">
                        Service Interest *
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-cream border border-stone/20 rounded-lg text-ink focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select a service</option>
                        {services.map(service => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block font-mono text-label uppercase tracking-wider text-stone mb-3">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-cream border border-stone/20 rounded-lg text-ink focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map(range => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block font-mono text-label uppercase tracking-wider text-stone mb-3">
                      Tell Us About Your Project *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-cream border border-stone/20 rounded-lg text-ink placeholder:text-warm-gray focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                      placeholder="Share details about your project, goals, and timeline..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "group inline-flex items-center gap-3 px-8 py-4 bg-accent text-cream rounded-lg font-medium transition-all duration-300",
                      isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-accent-hover"
                    )}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info Column */}
            <div className="lg:col-span-5">
              <ScrollReveal delay={0.2}>
                <div className="bg-ink rounded-2xl p-8 lg:p-10 sticky top-32">
                  <h3 className="font-display text-2xl text-cream mb-8">
                    Direct Contact
                  </h3>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-5 bg-green-600 rounded-xl text-cream mb-6 hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle className="w-6 h-6" />
                    <div className="flex-1">
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-cream/80">Quick response guaranteed</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>

                  {/* Contact Details */}
                  <div className="space-y-4 mb-8">
                    <a
                      href="mailto:management@darkbirdfilms.com"
                      className="flex items-center gap-4 p-4 bg-charcoal rounded-xl text-cream hover:bg-charcoal/80 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-warm-gray uppercase tracking-wider font-mono">Email</p>
                        <p className="font-medium group-hover:text-accent transition-colors">management@darkbirdfilms.com</p>
                      </div>
                    </a>

                    <a
                      href="tel:+919876543210"
                      className="flex items-center gap-4 p-4 bg-charcoal rounded-xl text-cream hover:bg-charcoal/80 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-warm-gray uppercase tracking-wider font-mono">Phone</p>
                        <p className="font-medium group-hover:text-accent transition-colors">+91 98765 43210</p>
                      </div>
                    </a>

                    <div className="flex items-start gap-4 p-4 bg-charcoal rounded-xl text-cream">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-warm-gray uppercase tracking-wider font-mono">Location</p>
                        <p className="font-medium">HSR Layout, Bengaluru</p>
                        <p className="text-sm text-warm-gray">Karnataka, India</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="border-t border-stone/20 pt-6">
                    <p className="font-mono text-label uppercase tracking-wider text-warm-gray mb-4">
                      Follow Us
                    </p>
                    <div className="flex items-center gap-3">
                      {socialLinks.map((social) => {
                        const Icon = social.icon
                        return (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-lg bg-charcoal flex items-center justify-center text-warm-gray hover:text-accent hover:bg-charcoal/80 transition-all"
                            aria-label={social.label}
                          >
                            <Icon className="w-5 h-5" />
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

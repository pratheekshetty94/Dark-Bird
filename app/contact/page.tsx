'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { Mail, Phone, MapPin, Instagram, Youtube, Linkedin, Facebook, Send, MessageCircle, ArrowUpRight, Download, Calendar, Clock, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { WHATSAPP_URL, PHONE_TEL_URL, PHONE_NUMBER_DISPLAY, CONTACT_EMAIL, CONTACT_EMAIL_URL } from '@/lib/contact'
import {
  trackCtaClick,
  trackWhatsAppClick,
  trackPhoneClick,
  trackEmailClick,
  trackFormStart,
  trackFormSubmit,
  trackBookingConfirmed,
  trackBrochureDownload,
} from '@/lib/analytics'

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
  { href: 'https://in.linkedin.com/in/dark-bird-b33321396', icon: Linkedin, label: 'LinkedIn', handle: 'Dark Bird Films' },
  { href: 'https://www.facebook.com/Darkbirdfilms/', icon: Facebook, label: 'Facebook', handle: 'Dark Bird Films' },
]

/* ─── Time Slots ─── */
const TIME_SLOTS = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM',
]

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function parseTimeSlot(dateStr: string, timeStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number)
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!match) return new Date()
  let hours = parseInt(match[1])
  const minutes = parseInt(match[2])
  const ampm = match[3].toUpperCase()
  if (ampm === 'PM' && hours !== 12) hours += 12
  if (ampm === 'AM' && hours === 12) hours = 0
  return new Date(year, month - 1, day, hours, minutes)
}

function formatDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/* ─── Booking Widget ─── */
function BookingWidget() {
  const [today, setToday] = useState(() => new Date())
  const [currentMonth, setCurrentMonth] = useState(() => new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [busySlots, setBusySlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [step, setStep] = useState<'date' | 'details' | 'confirmed'>('date')
  const [isBooking, setIsBooking] = useState(false)
  const [bookingError, setBookingError] = useState('')

  // Ensure "today" is always the client's actual date
  useEffect(() => {
    const now = new Date()
    setToday(now)
    setCurrentMonth(now.getMonth())
    setCurrentYear(now.getFullYear())
  }, [])

  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  })

  // Fetch busy slots when date changes
  useEffect(() => {
    if (!selectedDate) return
    setLoadingSlots(true)
    setBusySlots([])
    setSelectedTime(null)

    fetch(`/api/booking/availability?date=${selectedDate}`)
      .then(r => r.json())
      .then(data => {
        if (data.busySlots) setBusySlots(data.busySlots)
      })
      .catch(() => {})
      .finally(() => setLoadingSlots(false))
  }, [selectedDate])

  // Calendar generation
  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const todayStr = formatDateStr(today)

  const canGoPrev = currentYear > today.getFullYear() || (currentYear === today.getFullYear() && currentMonth > today.getMonth())

  const handlePrevMonth = () => {
    if (!canGoPrev) return
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) }
    else setCurrentMonth(m => m - 1)
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) }
    else setCurrentMonth(m => m + 1)
  }

  const handleDateClick = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const d = new Date(currentYear, currentMonth, day)
    // No past dates, no weekends
    if (dateStr < todayStr) return
    if (d.getDay() === 0 || d.getDay() === 6) return
    setSelectedDate(dateStr)
  }

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !bookingForm.name || !bookingForm.email || !bookingForm.phone) return
    setIsBooking(true)
    setBookingError('')

    try {
      const response = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          name: bookingForm.name,
          email: bookingForm.email,
          phone: bookingForm.phone,
          notes: bookingForm.notes,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        trackBookingConfirmed({ date: selectedDate, time: selectedTime })
        setStep('confirmed')
      } else {
        setBookingError(data.error || 'Failed to book. Please try again.')
      }
    } catch {
      setBookingError('Network error. Please try again.')
    } finally {
      setIsBooking(false)
    }
  }

  const availableSlots = TIME_SLOTS.filter(slot => !busySlots.includes(slot))

  if (step === 'confirmed') {
    return (
      <div className="p-12 text-center">
        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-accent" />
        </div>
        <h3 className="font-display text-2xl text-cream mb-3">Meeting Booked!</h3>
        <p className="text-cream/50 max-w-md mx-auto mb-4">
          Your discovery call has been scheduled. You'll receive a confirmation email with a Google Meet link.
        </p>
        <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/[0.05] rounded-xl border border-white/[0.08]">
          <Calendar className="w-5 h-5 text-accent" />
          <span className="text-cream font-medium">{selectedDate}</span>
          <Clock className="w-5 h-5 text-accent" />
          <span className="text-cream font-medium">{selectedTime}</span>
        </div>
      </div>
    )
  }

  if (step === 'details') {
    return (
      <div className="p-6 md:p-8">
        {/* Back button */}
        <button
          onClick={() => setStep('date')}
          className="flex items-center gap-2 text-sm text-cream/50 hover:text-accent transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to calendar
        </button>

        {/* Selected slot summary */}
        <div className="flex items-center gap-4 px-5 py-3 bg-accent/10 border border-accent/20 rounded-xl mb-8">
          <Calendar className="w-5 h-5 text-accent" />
          <span className="text-cream font-medium">{selectedDate}</span>
          <Clock className="w-5 h-5 text-accent" />
          <span className="text-cream font-medium">{selectedTime}</span>
          <span className="text-cream/40 text-sm ml-auto">30 min</span>
        </div>

        <h3 className="font-display text-xl text-cream mb-6">Your Details</h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-cream/40 mb-2">Name *</label>
              <input
                type="text"
                required
                value={bookingForm.name}
                onChange={e => setBookingForm({ ...bookingForm, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-lg text-cream placeholder:text-cream/25 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-cream/40 mb-2">Email *</label>
              <input
                type="email"
                required
                value={bookingForm.email}
                onChange={e => setBookingForm({ ...bookingForm, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-lg text-cream placeholder:text-cream/25 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
                placeholder="you@company.com"
              />
            </div>
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-cream/40 mb-2">Phone <span className="text-accent">*</span></label>
            <input
              type="tel"
              required
              value={bookingForm.phone}
              onChange={e => setBookingForm({ ...bookingForm, phone: e.target.value })}
              className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-lg text-cream placeholder:text-cream/25 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
              placeholder="Your phone number"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-cream/40 mb-2">Notes</label>
            <textarea
              rows={3}
              value={bookingForm.notes}
              onChange={e => setBookingForm({ ...bookingForm, notes: e.target.value })}
              className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-lg text-cream placeholder:text-cream/25 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm resize-none"
              placeholder="Anything you'd like us to know before the call..."
            />
          </div>
        </div>

        {bookingError && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {bookingError}
          </div>
        )}

        <button
          onClick={handleBooking}
          disabled={isBooking || !bookingForm.name || !bookingForm.email || !bookingForm.phone}
          className={cn(
            "mt-6 w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-medium text-sm transition-all duration-300",
            isBooking || !bookingForm.name || !bookingForm.email || !bookingForm.phone
              ? "bg-cream/10 text-cream/30 cursor-not-allowed"
              : "bg-accent text-cream hover:bg-accent-hover hover:shadow-[0_0_30px_rgba(232,90,63,0.3)]"
          )}
        >
          {isBooking ? 'Booking...' : 'Confirm Booking'}
          {!isBooking && <ArrowUpRight className="w-4 h-4" />}
        </button>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div>
          {/* Month nav */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handlePrevMonth}
              disabled={!canGoPrev}
              className={cn(
                "w-9 h-9 rounded-full border flex items-center justify-center transition-all",
                canGoPrev
                  ? "border-cream/20 text-cream hover:border-accent hover:text-accent"
                  : "border-white/[0.06] text-cream/15 cursor-not-allowed"
              )}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h3 className="font-display text-lg text-cream">
              {MONTHS[currentMonth]} {currentYear}
            </h3>
            <button
              onClick={handleNextMonth}
              className="w-9 h-9 rounded-full border border-cream/20 text-cream hover:border-accent hover:text-accent flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[10px] font-mono uppercase tracking-wider text-cream/30 py-2">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
              const d = new Date(currentYear, currentMonth, day)
              const isPast = dateStr < todayStr
              const isWeekend = d.getDay() === 0 || d.getDay() === 6
              const isSelected = dateStr === selectedDate
              const isToday = dateStr === todayStr
              const isDisabled = isPast || isWeekend

              return (
                <button
                  key={day}
                  onClick={() => !isDisabled && handleDateClick(day)}
                  disabled={isDisabled}
                  className={cn(
                    "aspect-square rounded-lg flex items-center justify-center text-sm transition-all duration-200 relative",
                    isDisabled && "text-cream/10 cursor-not-allowed",
                    !isDisabled && !isSelected && "text-cream/60 hover:bg-accent/10 hover:text-cream",
                    isSelected && "bg-accent text-cream font-medium shadow-[0_0_20px_rgba(232,90,63,0.3)]",
                    isToday && !isSelected && "ring-1 ring-accent/40"
                  )}
                >
                  {day}
                </button>
              )
            })}
          </div>

          <p className="mt-4 text-[11px] text-cream/25 font-mono">
            IST (Indian Standard Time) • 30 min call
          </p>
        </div>

        {/* Time slots */}
        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-wider text-cream/40 mb-4">
            {selectedDate ? `Available times for ${selectedDate}` : 'Select a date first'}
          </h4>

          {!selectedDate ? (
            <div className="flex items-center justify-center h-48 border border-dashed border-white/[0.08] rounded-xl">
              <p className="text-cream/20 text-sm">Pick a date to see available slots</p>
            </div>
          ) : loadingSlots ? (
            <div className="flex items-center justify-center h-48">
              <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : availableSlots.length === 0 ? (
            <div className="flex items-center justify-center h-48 border border-dashed border-white/[0.08] rounded-xl">
              <p className="text-cream/30 text-sm">No slots available for this date</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 max-h-[340px] overflow-y-auto pr-1 scrollbar-hide" data-lenis-prevent>
              {availableSlots.map(slot => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border",
                    selectedTime === slot
                      ? "bg-accent text-cream border-accent shadow-[0_0_20px_rgba(232,90,63,0.2)]"
                      : "bg-white/[0.03] text-cream/60 border-white/[0.08] hover:border-accent/40 hover:text-cream"
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          )}

          {selectedDate && selectedTime && (
            <button
              onClick={() => setStep('details')}
              className="mt-6 w-full flex items-center justify-center gap-3 px-8 py-4 bg-accent text-cream rounded-xl font-medium text-sm transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_0_30px_rgba(232,90,63,0.3)]"
            >
              Continue
              <ArrowUpRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

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
  const [submitError, setSubmitError] = useState('')
  const [hasStarted, setHasStarted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!hasStarted) {
      trackFormStart('contact_project')
      setHasStarted(true)
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        trackFormSubmit('contact_project')
        setIsSubmitted(true)
      } else {
        setSubmitError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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

      {/* Quick Contact Bar — mobile first, above-the-fold access */}
      <section className="section-light py-6 lg:hidden border-b border-stone/10">
        <div className="container-content">
          <div className="grid grid-cols-3 gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('contact_quick_bar')}
              className="flex flex-col items-center justify-center gap-1 p-3 bg-green-600 rounded-xl text-cream text-center"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-[11px] font-medium">WhatsApp</span>
            </a>
            <a
              href="#book-call"
              onClick={() => trackCtaClick('contact_quick_bar', 'book_call')}
              className="flex flex-col items-center justify-center gap-1 p-3 bg-accent rounded-xl text-cream text-center"
            >
              <Calendar className="w-5 h-5" />
              <span className="text-[11px] font-medium">Book Call</span>
            </a>
            <a
              href={PHONE_TEL_URL}
              onClick={() => trackPhoneClick('contact_quick_bar')}
              className="flex flex-col items-center justify-center gap-1 p-3 bg-charcoal rounded-xl text-cream text-center"
            >
              <Phone className="w-5 h-5" />
              <span className="text-[11px] font-medium">Call</span>
            </a>
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
                        placeholder="Enter your phone number"
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

                  {/* Error Message */}
                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      {submitError}
                    </div>
                  )}

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
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('contact_panel')}
                    className="group flex items-center gap-4 p-5 bg-green-600 rounded-xl text-cream mb-4 hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle className="w-6 h-6" />
                    <div className="flex-1">
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-cream/80">Quick response guaranteed</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>

                  {/* Book a Call */}
                  <a
                    href="#book-call"
                    onClick={() => trackCtaClick('contact_panel', 'book_discovery_call')}
                    className="group flex items-center gap-4 p-5 bg-accent rounded-xl text-cream mb-4 hover:bg-accent-hover transition-colors"
                  >
                    <Calendar className="w-6 h-6" />
                    <div className="flex-1">
                      <p className="font-medium">Book a Discovery Call</p>
                      <p className="text-sm text-cream/80">Pick a time that works for you</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>

                  {/* Download Brochure */}
                  <a
                    href="/Dark-Bird-Brochure-2026.pdf"
                    download
                    onClick={() => trackBrochureDownload()}
                    className="group flex items-center gap-4 p-5 bg-charcoal border border-white/[0.08] rounded-xl text-cream mb-6 hover:bg-charcoal/80 transition-colors"
                  >
                    <Download className="w-6 h-6" />
                    <div className="flex-1">
                      <p className="font-medium">Download Brochure</p>
                      <p className="text-sm text-cream/80">Dark Bird Films 2026</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>

                  {/* Contact Details */}
                  <div className="space-y-4 mb-8">
                    <a
                      href={CONTACT_EMAIL_URL}
                      onClick={() => trackEmailClick('contact_panel')}
                      className="flex items-center gap-4 p-4 bg-charcoal rounded-xl text-cream hover:bg-charcoal/80 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-warm-gray uppercase tracking-wider font-mono">Email</p>
                        <p className="font-medium group-hover:text-accent transition-colors">{CONTACT_EMAIL}</p>
                      </div>
                    </a>

                    <a
                      href={PHONE_TEL_URL}
                      onClick={() => trackPhoneClick('contact_panel')}
                      className="flex items-center gap-4 p-4 bg-charcoal rounded-xl text-cream hover:bg-charcoal/80 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-warm-gray uppercase tracking-wider font-mono">Phone</p>
                        <p className="font-medium group-hover:text-accent transition-colors">{PHONE_NUMBER_DISPLAY}</p>
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

      {/* Book a Discovery Call — Google Calendar */}
      <section id="book-call" className="section-dark section-padding border-t border-white/[0.06]">
        <div className="container-content">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-cream/15" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  Schedule a Call
                </span>
                <div className="w-8 h-[1px] bg-cream/15" />
              </div>
              <h2 className="font-display text-section text-cream mb-4">
                Book a <em className="text-accent">Discovery Call</em>
              </h2>
              <p className="text-silver max-w-lg mx-auto">
                Pick a time that works for you. We'll discuss your project, goals, and how Dark Bird can help.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
              <BookingWidget />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}

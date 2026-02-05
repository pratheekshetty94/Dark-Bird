import { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Careers | Dark Bird Films',
  description: 'Join the flock. We\'re looking for editors, cinematographers, marketers, designers, and storytellers who are obsessed with craft.',
}

const openRoles = [
  {
    title: 'Video Editor',
    department: 'Dark Bird Films',
    type: 'Full-time',
    location: 'Bengaluru',
    description: 'Join our post-production team to edit feature films, commercials, and brand content with cinematic excellence.',
  },
  {
    title: 'Social Media Manager',
    department: 'Dark Bird Socials',
    type: 'Full-time',
    location: 'Bengaluru / Remote',
    description: 'Lead social strategy and content creation for our clients, growing communities and driving engagement.',
  },
  {
    title: 'Graphic Designer',
    department: 'Dark Bird Designs',
    type: 'Full-time / Freelance',
    location: 'Bengaluru / Remote',
    description: 'Create stunning visual assets from brand identities to motion graphics with attention to cinematic quality.',
  },
  {
    title: 'AI Content Creator',
    department: 'Dark Bird Labs',
    type: 'Full-time',
    location: 'Bengaluru',
    description: 'Explore and create with cutting-edge AI tools, producing experimental content that pushes creative boundaries.',
  },
  {
    title: 'Cinematographer',
    department: 'Dark Bird Films',
    type: 'Freelance',
    location: 'Bengaluru',
    description: 'Collaborate on commercial and film projects, bringing visual stories to life with your unique eye.',
  },
]

const perks = [
  'Work on nationally acclaimed projects',
  'Creative freedom and ownership',
  'Learn from industry veterans',
  'Flexible work arrangements',
  'Collaborative studio culture',
  'Growth opportunities across departments',
]

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-dark pt-32 pb-section">
        <div className="container-content">
          <ScrollReveal>
            <SectionLabel>Careers</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-hero font-bold text-white mt-4 mb-6">
              Join the Flock.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-warm-gray max-w-3xl mb-4">
              Dark Bird Films is growing. We're looking for editors, cinematographers,
              marketers, designers, and storytellers who are obsessed with craft and
              hungry to create work that matters.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-body text-primary-red font-medium">
              If you believe stories should make people feel something real — you belong here.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Open Roles */}
      <section className="section-light section-padding">
        <div className="container-content">
          <ScrollReveal>
            <SectionLabel>Open Positions</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-section font-bold text-charcoal mt-4 mb-12">
              Current Openings
            </h2>
          </ScrollReveal>

          <StaggerReveal className="space-y-6">
            {openRoles.map((role) => (
              <div
                key={role.title}
                className="p-6 bg-white rounded-xl border border-charcoal/10 hover:border-primary-red/30 hover:shadow-lg transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-charcoal group-hover:text-primary-red transition-colors">
                        {role.title}
                      </h3>
                      <span className="px-3 py-1 bg-primary-red/10 text-primary-red rounded-full text-sm font-medium">
                        {role.department}
                      </span>
                    </div>
                    <p className="text-warm-gray mb-4">{role.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-warm-gray">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {role.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {role.location}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`mailto:careers@darkbirdfilms.com?subject=Application for ${role.title}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-white rounded-lg font-medium hover:bg-primary-red transition-colors"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </StaggerReveal>

          {/* General Application */}
          <ScrollReveal>
            <div className="mt-12 p-8 bg-warm-beige rounded-xl text-center">
              <Briefcase className="w-12 h-12 text-primary-red mx-auto mb-4" />
              <h3 className="text-xl font-bold text-charcoal mb-2">
                Don't see your role?
              </h3>
              <p className="text-warm-gray mb-6 max-w-md mx-auto">
                We're always looking for talented people. Send us your portfolio
                and tell us why you'd be a great fit.
              </p>
              <a
                href="mailto:careers@darkbirdfilms.com?subject=General Application"
                className="inline-flex items-center gap-2 text-primary-red font-semibold hover:underline"
              >
                Send General Application
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="section-dark section-padding">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollReveal>
                <SectionLabel>Why Dark Bird?</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="text-section font-bold text-white mt-4 mb-6">
                  More Than Just a Job
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-body text-warm-gray mb-8">
                  At Dark Bird, you'll work on projects that actually matter — from
                  nationally acclaimed films to campaigns for brands that believe in
                  storytelling. You'll grow alongside a team that's as passionate
                  about craft as you are.
                </p>
              </ScrollReveal>
              <StaggerReveal className="space-y-3">
                {perks.map((perk) => (
                  <div key={perk} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-red" />
                    <span className="text-white">{perk}</span>
                  </div>
                ))}
              </StaggerReveal>
            </div>

            {/* Visual */}
            <ScrollReveal delay={0.2} x={30} y={0}>
              <div className="aspect-square bg-charcoal rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <span className="block text-6xl md:text-8xl font-display text-primary-red/20 mb-4">
                      25+
                    </span>
                    <p className="text-white/60 text-lg">
                      Talented storytellers<br />and counting
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-red py-20">
        <div className="container-content text-center">
          <ScrollReveal>
            <h2 className="text-section font-bold text-white mb-6">
              Ready to Create Something Meaningful?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-body text-white/90 max-w-2xl mx-auto mb-8">
              Join a team that values craft over shortcuts, stories over specs,
              and purpose over just another project.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Button
              href="mailto:careers@darkbirdfilms.com"
              className="bg-white text-primary-red hover:bg-cream"
            >
              Get in Touch
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}

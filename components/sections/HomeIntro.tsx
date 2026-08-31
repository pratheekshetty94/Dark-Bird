import Link from 'next/link'

// Server-rendered, crawlable introduction. The hero is a video with almost no
// text, so this section carries the copy search engines and AI crawlers read.
export default function HomeIntro() {
  return (
    <section className="section-dark py-16 md:py-20">
      <div className="container-content">
        <div className="max-w-3xl">
          <span className="label-parenthetical">Dark Bird Films</span>
          <h2 className="font-display text-2xl md:text-3xl text-cream mt-4 mb-6 [text-wrap:balance]">
            A film studio that runs like an <em className="text-accent">agency</em>
          </h2>
          <div className="space-y-4 text-silver text-body">
            <p>
              Dark Bird Films is a Bengaluru-based film production house and marketing
              agency founded by editor Pratheek Shetty, with editing credits on films like{' '}
              <Link href="/filmography/kantara" className="text-cream underline-offset-4 hover:text-accent underline">Kantara</Link>{' '}
              and{' '}
              <Link href="/filmography/777-charlie" className="text-cream underline-offset-4 hover:text-accent underline">777 Charlie</Link>.
              The same editorial craft goes into{' '}
              <Link href="/services/ad-film-production-bangalore" className="text-cream underline-offset-4 hover:text-accent underline">ad films</Link>,{' '}
              <Link href="/services/corporate-video-production-bangalore" className="text-cream underline-offset-4 hover:text-accent underline">corporate videos</Link>,
              brand campaigns and founder stories for 100+ brands.
            </p>
            <p>
              Four divisions under one roof: Films for production, Socials for{' '}
              <Link href="/services/social-media-marketing-agency-bangalore" className="text-cream underline-offset-4 hover:text-accent underline">marketing and social media</Link>,
              Designs for brand identity, and Labs for{' '}
              <Link href="/services/ai-video-production-bangalore" className="text-cream underline-offset-4 hover:text-accent underline">AI video production</Link>.
              One team from script to screen to campaign — based in HSR Layout,
              Bengaluru, working with brands across India.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

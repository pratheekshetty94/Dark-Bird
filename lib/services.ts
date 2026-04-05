// Service landing pages — capability / format searches in Bangalore.
// Complements lib/industries.ts which targets vertical/audience searches.
// Positioning mirrors Dark Bird's 4 divisions: Films, Socials, Designs, Labs.

export type ServiceFaq = {
  q: string
  a: string
}

export type ServiceCategory = 'Films' | 'Socials' | 'Designs' | 'Labs'

export type Service = {
  slug: string
  name: string
  shortName: string
  category: ServiceCategory
  heroKicker: string
  heroHeadline: string
  heroAccent: string
  heroSubhead: string
  gaps: { title: string; body: string }[]
  deliverables: { title: string; body: string }[]
  whyUs: string[]
  outcomeMetric: string
  faqs: ServiceFaq[]
  meta: {
    title: string
    description: string
    keywords: string[]
  }
}

export const services: Service[] = [
  {
    slug: 'ad-film-production-bangalore',
    name: 'Ad Film Production',
    shortName: 'Ad Films',
    category: 'Films',
    heroKicker: 'Ad Film Production · Bangalore',
    heroHeadline: 'Ad films that earn their media spend',
    heroAccent: 'earn',
    heroSubhead:
      'TVCs, digital ad films and campaign hero films — written, directed, shot, edited, coloured and sounded in one studio.',
    gaps: [
      { title: 'Beautiful ads that sell nothing', body: 'A reel that wins on Vimeo but flatlines on performance.' },
      { title: 'Media-first creative that feels cheap', body: 'Cut for the algorithm with none of the craft — the brand takes the hit.' },
      { title: 'Agency handoffs that kill the idea', body: 'By the fifth vendor, the original film is unrecognisable.' },
    ],
    deliverables: [
      { title: 'TVCs & Digital Ad Films', body: '15s, 30s, 60s and 90s hero films with matching social cuts.' },
      { title: 'Campaign Hero Films', body: 'Tentpole films that carry a full-year brand or seasonal campaign.' },
      { title: 'Multi-language Delivery', body: 'Hindi, Kannada, Tamil, Telugu, Malayalam and English as standard.' },
      { title: 'Platform Cutdowns', body: 'Reels, Shorts, YouTube pre-roll and OOH — built in the same edit.' },
      { title: 'Script & Concept Development', body: 'In-house creative, not borrowed decks — the idea and the craft from one room.' },
      { title: 'Post Production In-House', body: 'Edit, colour, sound, VFX and motion — no third-party ping-pong.' },
    ],
    whyUs: [
      'Nine years of ad films for Zomato, Flipkart, Myntra, PhonePe, Swiggy and more',
      'Feature-film crew pedigree: Kantara, 777 Charlie, Gandhada Gudi on our credits',
      'Performance-aware editors who cut for hooks, retention and CPA',
      'One studio from brief to delivery',
    ],
    outcomeMetric: 'Ad films with craft your media team actually wants to buy',
    faqs: [
      { q: 'How much does an ad film cost in Bangalore?', a: 'Digital ad films typically start around ₹3–8L and scale with talent, locations, VFX and language versions. We share a transparent line-item quote after a short brief.' },
      { q: 'Do you handle casting and talent?', a: 'Yes — end-to-end casting, negotiation and on-set direction is part of our standard scope.' },
      { q: 'Can you handle multilingual delivery?', a: 'Yes. Most of our ad films ship in 4–6 Indian languages with matched dubs, subtitles and platform-native cuts.' },
      { q: 'Do you work directly or through agencies?', a: 'Both. We work directly with brands as well as with creative agencies that partner with us for production and post.' },
    ],
    meta: {
      title: 'Ad Film Production Company in Bangalore | Dark Bird Films',
      description: 'TVCs, digital ad films and campaign hero films by Dark Bird — a 9-year film studio in Bangalore. Credits on Kantara, 777 Charlie and 100+ brand ads.',
      keywords: ['ad film production bangalore', 'ad film production company bangalore', 'tvc production bangalore', 'advertising film maker bangalore', 'digital ad film bangalore'],
    },
  },
  {
    slug: 'brand-film-production-bangalore',
    name: 'Brand Film Production',
    shortName: 'Brand Films',
    category: 'Films',
    heroKicker: 'Brand Film Production · Bangalore',
    heroHeadline: 'Brand films that make people feel something',
    heroAccent: 'feel',
    heroSubhead:
      'Hero brand films, founder stories and manifesto films for companies that want to be remembered — not just seen.',
    gaps: [
      { title: 'A brand film that reads like a brochure', body: 'All the facts, none of the feeling. No one shares it.' },
      { title: 'Generic stock imagery', body: 'Happy-people-at-laptops footage will never build a brand.' },
      { title: 'No narrative point of view', body: 'If the film could belong to any company in your category, it doesn’t belong to yours.' },
    ],
    deliverables: [
      { title: 'Hero Brand Films', body: 'Flagship 60–180s films that carry the brand across website, sales, hiring and media.' },
      { title: 'Founder Story Films', body: 'Founder and leadership films — the strongest credibility asset a company owns.' },
      { title: 'Manifesto Films', body: 'Positioning and belief films for repositioning, IPOs, anniversaries and major launches.' },
      { title: 'Culture & People Films', body: 'Internal comms, employer brand and recruitment films.' },
      { title: 'Sub-brand & Division Films', body: 'Smaller films that ladder up to the master brand narrative.' },
      { title: 'Sales & Investor Reels', body: 'Short, tight cuts for sales decks, investor rooms and board meetings.' },
    ],
    whyUs: [
      'Feature-film grammar applied to brand storytelling',
      'Script-first process — the idea leads the craft, not the other way around',
      'In-house direction, DOP, edit, colour, sound, VFX and music design',
      'Brand film credits across D2C, SaaS, healthcare, real estate, finance and F&B',
    ],
    outcomeMetric: 'A brand film you’ll put on the homepage and keep there',
    faqs: [
      { q: 'How long should a brand film be?', a: 'Most hero brand films land between 60–180 seconds, with 30s and 15s cutdowns for social and paid media built from the same edit.' },
      { q: 'Do you write the script, or do we?', a: 'We write the script. That’s the core of the job. We work closely with your team for brand voice, proof points and approvals.' },
      { q: 'How long does production take?', a: 'A typical brand film runs 4–8 weeks from brief to final delivery, depending on locations, talent and post complexity.' },
      { q: 'Can you produce in multiple languages?', a: 'Yes — English, Hindi and regional Indian languages are standard delivery options.' },
    ],
    meta: {
      title: 'Brand Film Production Company in Bangalore | Dark Bird Films',
      description: 'Hero brand films, founder stories and manifesto films by Dark Bird — a 9-year film studio in Bangalore with feature-film credits and 100+ brand ads.',
      keywords: ['brand film production bangalore', 'brand film maker bangalore', 'founder story film bangalore', 'manifesto film bangalore', 'company brand film'],
    },
  },
  {
    slug: 'corporate-video-production-bangalore',
    name: 'Corporate Video Production',
    shortName: 'Corporate Videos',
    category: 'Films',
    heroKicker: 'Corporate Video Production · Bangalore',
    heroHeadline: 'Corporate videos that don’t feel corporate',
    heroAccent: 'corporate',
    heroSubhead:
      'Company profiles, leadership films, CSR films, annual reports and investor reels — with the craft of editorial, not the look of a template.',
    gaps: [
      { title: 'Template aesthetics', body: 'Drone shot → boardroom → handshake → logo. Your company deserves more.' },
      { title: 'Facts without story', body: 'Stats don’t travel. Stories do.' },
      { title: 'Stakeholder committee edits', body: 'By the sixth round of feedback, the film has lost its spine.' },
    ],
    deliverables: [
      { title: 'Company Profile Films', body: '2–4 minute institutional films for sales, investor and partnership use.' },
      { title: 'Leadership & CXO Films', body: 'Founder, CEO and leadership team films that humanise the brand.' },
      { title: 'CSR & Impact Films', body: 'Story-led CSR films that actually travel inside and outside the company.' },
      { title: 'Annual Report & Investor Reels', body: 'Film versions of annual reports, earnings highlights and investor updates.' },
      { title: 'Town Hall & Event Films', body: 'Internal event coverage, culture films and recap reels.' },
      { title: 'Recruitment & Employer Brand', body: 'Films designed to attract the talent you can’t hire with a JD.' },
    ],
    whyUs: [
      'Script-first process even on corporate scope',
      'Senior direction on every project — no juniors flying solo',
      'Clean stakeholder workflows that protect the idea through approvals',
      'Multilingual delivery as standard',
    ],
    outcomeMetric: 'Corporate films your internal team actually wants to share',
    faqs: [
      { q: 'Can you work with listed companies and MLR / compliance cycles?', a: 'Yes. We work under NDA and build scripting and edit phases around legal, compliance and MLR review.' },
      { q: 'Do you handle shoots outside Bangalore?', a: 'Yes. We travel across India and internationally for corporate shoots. Travel is added transparently to the quote.' },
      { q: 'Do you offer annual retainers?', a: 'Yes — for companies that need ongoing corporate video, leadership content and internal comms, retainers are our preferred model.' },
      { q: 'How many rounds of edits are included?', a: 'Two rounds of structural edits and one round of fine-tuning, with clear scope beyond that. We’ve found this protects the craft without being rigid.' },
    ],
    meta: {
      title: 'Corporate Video Production Company in Bangalore | Dark Bird Films',
      description: 'Company profiles, leadership films, CSR films and investor reels by Dark Bird — a 9-year film studio in Bangalore with feature-film pedigree.',
      keywords: ['corporate video production bangalore', 'corporate film maker bangalore', 'company profile video', 'ceo profile video bangalore', 'csr film bangalore'],
    },
  },
  {
    slug: 'product-video-production-bangalore',
    name: 'Product Video Production',
    shortName: 'Product Videos',
    category: 'Films',
    heroKicker: 'Product Video Production · Bangalore',
    heroHeadline: 'Product films that turn browsers into buyers',
    heroAccent: 'buyers',
    heroSubhead:
      'Hero product films, explainer videos, lifestyle shoots and high-volume ad creative for D2C, SaaS, hardware and consumer brands.',
    gaps: [
      { title: 'Flat studio stills', body: 'They convert on marketplace listings — not on paid social.' },
      { title: 'Explainers that explain nothing', body: 'Voiceover + icons is not a film.' },
      { title: 'One film, one campaign, then silence', body: 'Without a creative pipeline, media spend outruns creative supply.' },
    ],
    deliverables: [
      { title: 'Hero Product Films', body: 'Flagship launch films that position the product, not just the feature list.' },
      { title: 'Explainer Videos', body: 'Scripted, animated or live-action explainers that make complex products simple.' },
      { title: 'Lifestyle & Editorial Shoots', body: 'Seasonal campaigns and lookbooks across digital, print and OOH.' },
      { title: 'Performance Ad Creative', body: 'UGC, hook-led ads and platform-native cutdowns engineered for CPA.' },
      { title: 'Unboxing & Demo Films', body: 'Short, high-clarity product films for category pages and D2C storefronts.' },
      { title: 'Motion Graphics & 3D', body: 'For hardware, SaaS and tech products where live-action can’t show the whole story.' },
    ],
    whyUs: [
      'In-house product photography and videography on the same shoot day',
      'High-volume creative pipelines for performance teams',
      'Motion, 3D and VFX under one roof',
      'Shipped product films across D2C, SaaS, hardware, beauty and F&B',
    ],
    outcomeMetric: 'Product content that keeps up with your ad spend',
    faqs: [
      { q: 'Do you shoot product stills alongside video?', a: 'Yes — video and stills on the same shoot keeps the visual language consistent and cost down.' },
      { q: 'Can you deliver high-volume ad creative?', a: 'Yes. Dedicated creative pipelines can deliver 20–60 ad cuts per month from a single shoot day.' },
      { q: 'Do you work with pre-launch brands?', a: 'Yes. We work with early-stage D2C, SaaS and hardware brands as well as established companies.' },
      { q: 'Can you include 3D and motion?', a: 'Yes. Motion graphics, 3D modelling and VFX are in-house.' },
    ],
    meta: {
      title: 'Product Video Production Company in Bangalore | Dark Bird Films',
      description: 'Hero product films, explainers and performance ad creative for D2C, SaaS and consumer brands. Made by Dark Bird — a 9-year film studio in Bangalore.',
      keywords: ['product video production bangalore', 'product film maker bangalore', 'explainer video bangalore', 'd2c video production bangalore', 'product photography bangalore'],
    },
  },
  {
    slug: 'music-video-production-bangalore',
    name: 'Music Video Production',
    shortName: 'Music Videos',
    category: 'Films',
    heroKicker: 'Music Video Production · Bangalore',
    heroHeadline: 'Music videos made by people who love music',
    heroAccent: 'love',
    heroSubhead:
      'Music videos, lyric videos, artist films and album campaigns for independent artists, labels and touring acts.',
    gaps: [
      { title: 'Pretty shots, no story', body: 'A sequence of good frames is not a music video.' },
      { title: 'Artist films that don’t feel like the artist', body: 'Every act is different. The film should be too.' },
      { title: 'One video, zero campaign', body: 'A single drop without a campaign around it is a missed launch.' },
    ],
    deliverables: [
      { title: 'Music Videos', body: 'Narrative, performance and hybrid music videos across genres and languages.' },
      { title: 'Lyric Videos & Visualisers', body: 'Motion-led lyric videos and abstract visualisers for album releases.' },
      { title: 'Artist Documentary Films', body: 'Behind-the-music films and short docs for album rollouts and tour kits.' },
      { title: 'Album Launch Campaigns', body: 'Full visual identity, teaser reels, social cuts and EPKs around a release.' },
      { title: 'Live Session Films', body: 'Single-take and multi-cam live session films for YouTube and press.' },
      { title: 'Tour & Festival Recap Films', body: 'Aftermovies and recap reels that extend the life of a tour.' },
    ],
    whyUs: [
      'Directed music videos for 3-time Grammy winner Ricky Kej (Divine Tides)',
      'Feature-film crew pedigree and colour grading',
      'In-house edit, colour, sound and motion — built for quick turnarounds between releases',
      'We work with labels, independent artists and touring acts',
    ],
    outcomeMetric: 'Music videos that sound like the song looks',
    faqs: [
      { q: 'Do you work with independent artists?', a: 'Yes. We’ve worked with everyone from independent artists on their first EP to Grammy-winning acts.' },
      { q: 'Can you handle the full album rollout?', a: 'Yes — from the first single teaser to the full album campaign, including visual identity, music videos, lyric videos and social cutdowns.' },
      { q: 'Do you shoot live sessions?', a: 'Yes. Single-take, multi-cam and hybrid live sessions are part of our standard delivery.' },
      { q: 'How much does a music video cost?', a: 'Music videos range widely — from tight, focused shoots at ₹2–4L to full-scale narrative videos at ₹10L+. We scope carefully around the song and the release plan.' },
    ],
    meta: {
      title: 'Music Video Production Company in Bangalore | Dark Bird Films',
      description: 'Music videos, lyric videos and album campaigns by Dark Bird — directors of Ricky Kej’s Grammy-winning Divine Tides music videos.',
      keywords: ['music video production bangalore', 'music video director bangalore', 'lyric video maker bangalore', 'album launch film bangalore', 'artist film bangalore'],
    },
  },
  {
    slug: 'performance-marketing-agency-bangalore',
    name: 'Performance Marketing',
    shortName: 'Performance Marketing',
    category: 'Socials',
    heroKicker: 'Performance Marketing · Bangalore',
    heroHeadline: 'Paid ads where creative and media actually talk',
    heroAccent: 'talk',
    heroSubhead:
      'Meta, Google, YouTube and Instagram performance marketing — run by the same team that makes the creative.',
    gaps: [
      { title: 'Media agencies without creative', body: 'Media buyers burn through ads they didn’t make. CAC creeps up.' },
      { title: 'Creative agencies without media', body: 'Beautiful films with no plan for how they’ll be spent.' },
      { title: 'One-and-done campaigns', body: 'Performance rewards volume, iteration and testing — not single hero ads.' },
    ],
    deliverables: [
      { title: 'Meta Ads (Facebook + Instagram)', body: 'Full-funnel Meta campaigns, retargeting, catalog ads and Reels-native creative.' },
      { title: 'Google & YouTube Ads', body: 'Search, YouTube pre-roll, Performance Max and Demand Gen campaigns.' },
      { title: 'Creative Pipelines', body: 'High-volume ad creative — UGC, hooks, static, motion — engineered for CPA.' },
      { title: 'Landing Pages & Funnels', body: 'High-conversion landing pages built to match the creative.' },
      { title: 'Analytics & Reporting', body: 'Transparent weekly reporting on spend, CPA, ROAS and creative performance.' },
      { title: 'Creator & UGC Ads', body: 'Scripted, directed and sourced UGC at volume.' },
    ],
    whyUs: [
      'Creative and media under one roof — fewer handoffs, faster iteration',
      'Performance-aware editors who cut for hooks, retention and CPA',
      'Scripted UGC pipelines that outperform stock creator content',
      'Run performance for D2C, edtech, real estate and healthcare brands',
    ],
    outcomeMetric: 'Lower CAC, higher ROAS, and ads your brand is still proud of',
    faqs: [
      { q: 'What’s the minimum monthly ad spend you work with?', a: 'We typically work with brands spending ₹3L+ per month on media, where the combination of creative and performance shows real leverage.' },
      { q: 'Do you guarantee ROAS?', a: 'No serious performance team can. What we guarantee is transparent reporting, creative velocity and a shared weekly scorecard that tells the truth.' },
      { q: 'Do you handle just creative, just media, or both?', a: 'Ideally both, because that’s where we create the most leverage. But we also partner with in-house media teams as the creative engine.' },
      { q: 'How often do you refresh creative?', a: 'Weekly to bi-weekly. Creative fatigue is the silent killer of performance campaigns.' },
    ],
    meta: {
      title: 'Performance Marketing Agency in Bangalore | Dark Bird Socials',
      description: 'Meta, Google and YouTube performance marketing by Dark Bird — where creative and media actually come from the same team.',
      keywords: ['performance marketing agency bangalore', 'meta ads agency bangalore', 'google ads agency bangalore', 'paid ads bangalore', 'd2c performance marketing'],
    },
  },
  {
    slug: 'social-media-marketing-agency-bangalore',
    name: 'Social Media Marketing',
    shortName: 'Social Media',
    category: 'Socials',
    heroKicker: 'Social Media Marketing · Bangalore',
    heroHeadline: 'Social media that actually sounds like the brand',
    heroAccent: 'sounds',
    heroSubhead:
      'Content strategy, monthly reels, shorts and carousels for brands that want more than a generic content calendar.',
    gaps: [
      { title: 'Template content farms', body: 'The same three reel formats, cloned across every brand.' },
      { title: 'No voice, no point of view', body: 'If the brand removed its logo, nothing on the grid would identify it.' },
      { title: 'Monthly calendars with no story', body: 'Posts without a narrative thread don’t compound.' },
    ],
    deliverables: [
      { title: 'Content Strategy & Calendars', body: 'Quarterly content strategy with monthly calendars mapped to business goals.' },
      { title: 'Reels & Shorts', body: 'Cinematic reels and shorts — not phone-shot filler.' },
      { title: 'Carousels & Statics', body: 'Editorial carousels and statics designed around a strong visual voice.' },
      { title: 'Copywriting', body: 'Captions, hooks and long-form copy that sound like the brand, not a template.' },
      { title: 'Community & DM Management', body: 'Inbox, DMs and community moderation handled by a real team.' },
      { title: 'Analytics & Reporting', body: 'Transparent monthly reports on reach, engagement and growth.' },
    ],
    whyUs: [
      'Film-studio craft applied to social content',
      'Voice-led scripting and copy — not template captions',
      'One team for strategy, shoot, edit and post',
      'Monthly retainers across real estate, F&B, interiors and D2C',
    ],
    outcomeMetric: 'A social feed that earns saves, shares, and followers',
    faqs: [
      { q: 'What does a typical monthly retainer include?', a: 'A typical retainer covers content strategy, 1–2 shoot days, 8–12 reels, 8–12 carousels/statics, copy and monthly reporting. Scope flexes with the brand.' },
      { q: 'Do you handle paid ads too?', a: 'Yes — social and performance marketing are offered together. Both come from the same team.' },
      { q: 'Can you shoot at our office / store / studio?', a: 'Yes. We shoot on location for brands that want their team, product and space in the content.' },
      { q: 'How long does the engagement run?', a: 'Minimum 3 months. Social compounds over time — shorter engagements rarely do the brand justice.' },
    ],
    meta: {
      title: 'Social Media Marketing Agency in Bangalore | Dark Bird Socials',
      description: 'Content strategy, reels, shorts and carousels for brands that want more than templates. Cinematic social content from a 9-year film studio in Bangalore.',
      keywords: ['social media marketing agency bangalore', 'social media agency bangalore', 'instagram marketing agency bangalore', 'reels agency bangalore', 'content marketing bangalore'],
    },
  },
  {
    slug: 'website-design-agency-bangalore',
    name: 'Website Design & Development',
    shortName: 'Website Design',
    category: 'Designs',
    heroKicker: 'Website Design · Bangalore',
    heroHeadline: 'Websites that look like the films we make',
    heroAccent: 'look',
    heroSubhead:
      'Brand websites, D2C storefronts, landing pages and microsites with the craft, motion and typography of a well-made film.',
    gaps: [
      { title: 'Template websites on premium brands', body: 'A great brand on a stock template is a brand leaving money on the table.' },
      { title: 'Pretty but slow', body: 'Beautiful sites that fail Core Web Vitals and lose SEO and ads.' },
      { title: 'Design without film', body: 'A hero section is a film frame. Most designers don’t treat it like one.' },
    ],
    deliverables: [
      { title: 'Brand Websites', body: 'Fully custom brand websites with editorial design, motion and film-grade art direction.' },
      { title: 'D2C Storefronts', body: 'Shopify and headless commerce storefronts built around product films.' },
      { title: 'Landing Pages', body: 'High-conversion landing pages for campaigns, launches and paid media.' },
      { title: 'Microsites', body: 'Launch microsites and campaign sites that match the production value of the film.' },
      { title: 'Case Study & Portfolio Sites', body: 'Portfolio and case-study sites for studios, architects, designers and founders.' },
      { title: 'Performance & SEO', body: 'Core Web Vitals, schema, sitemap and SEO best practice baked in from day one.' },
    ],
    whyUs: [
      'Editorial art direction — we design websites like we frame films',
      'Motion and interaction native to the design process',
      'Performance and SEO are non-negotiable, not an afterthought',
      'Websites shipped for real estate, D2C, interiors, finance and F&B',
    ],
    outcomeMetric: 'A website you’re excited to put at the top of every email signature',
    faqs: [
      { q: 'Do you use templates or custom design?', a: 'Every site we ship is custom-designed. We use modern frameworks (Next.js, Shopify) but the design is always bespoke.' },
      { q: 'What stack do you build on?', a: 'Next.js and Shopify are our defaults. We pick the stack around the use case — content, commerce, campaign or brand.' },
      { q: 'How long does a website take?', a: 'A focused brand website ships in 4–8 weeks. Larger sites with commerce or custom CMS can run 8–12 weeks.' },
      { q: 'Do you handle SEO?', a: 'On-page SEO, schema, sitemap, Core Web Vitals and technical SEO are part of standard delivery. Ongoing content SEO is optional.' },
    ],
    meta: {
      title: 'Website Design Agency in Bangalore | Dark Bird Designs',
      description: 'Brand websites, D2C storefronts and landing pages with the craft of a film studio. Built on Next.js and Shopify by Dark Bird in Bangalore.',
      keywords: ['website design agency bangalore', 'website development bangalore', 'next.js agency bangalore', 'shopify agency bangalore', 'landing page design bangalore'],
    },
  },
  {
    slug: 'brand-identity-design-bangalore',
    name: 'Brand Identity Design',
    shortName: 'Brand Identity',
    category: 'Designs',
    heroKicker: 'Brand Identity Design · Bangalore',
    heroHeadline: 'Brand identities built to live on film',
    heroAccent: 'live',
    heroSubhead:
      'Logo, typography, colour, visual language and brand guidelines — designed by a studio that thinks in motion.',
    gaps: [
      { title: 'Static identities', body: 'Beautiful on a PDF, dead on film, social and product.' },
      { title: 'Guidelines no one follows', body: 'A 60-page brand book that gets ignored the next quarter.' },
      { title: 'Logo-first thinking', body: 'A brand is not a logo. It’s a voice, a rhythm and a visual worldview.' },
    ],
    deliverables: [
      { title: 'Brand Strategy', body: 'Positioning, narrative and naming work that precedes the design.' },
      { title: 'Logo & Wordmark', body: 'Primary, secondary, lockups and responsive logo systems.' },
      { title: 'Typography & Colour', body: 'Editorial type systems and colour worlds built for film, web and print.' },
      { title: 'Visual Language & Motion', body: 'Illustration, photography and motion guidelines — brands in movement.' },
      { title: 'Brand Guidelines', body: 'Practical, tight guidelines the team actually uses.' },
      { title: 'Brand Applications', body: 'Stationery, packaging, merch, social templates and launch assets.' },
    ],
    whyUs: [
      'Identities built with motion and film in mind from day one',
      'Narrative-led — the brand story comes before the mark',
      'Editorial craft across type, colour and photography',
      'Handover process that actually gets used',
    ],
    outcomeMetric: 'A brand identity your team is proud to use, not afraid to touch',
    faqs: [
      { q: 'Do you do brand strategy as well as design?', a: 'Yes. Strategy, positioning and naming are part of our scope — we don’t take design briefs we can’t question.' },
      { q: 'How long does a brand identity project take?', a: 'A full identity runs 6–10 weeks depending on the scope of applications.' },
      { q: 'Can you rebrand an existing company?', a: 'Yes. Rebrands are some of our favourite projects — we carry the equity forward and strengthen the story.' },
      { q: 'Do you handle launch assets and rollout?', a: 'Yes. Launch films, campaign creative, website and social rollout are offered as part of the same engagement.' },
    ],
    meta: {
      title: 'Brand Identity Design Agency in Bangalore | Dark Bird Designs',
      description: 'Brand strategy, logo, typography, colour and identity systems built for film, web and product. By Dark Bird — a 9-year film studio in Bangalore.',
      keywords: ['brand identity design bangalore', 'branding agency bangalore', 'logo design bangalore', 'rebranding agency bangalore', 'brand strategy bangalore'],
    },
  },
  {
    slug: 'ai-video-production-bangalore',
    name: 'AI Video Production',
    shortName: 'AI Video',
    category: 'Labs',
    heroKicker: 'AI Video Production · Bangalore',
    heroHeadline: 'AI films by a studio that actually knows film',
    heroAccent: 'actually',
    heroSubhead:
      'AI short films, AI commercials, AI launch trailers, AI music videos and AI-native brand campaigns — directed, not prompted.',
    gaps: [
      { title: 'AI videos that look like AI', body: 'Prompt-and-pray workflows produce the same uncanny aesthetic everyone else has.' },
      { title: 'No director behind the model', body: 'AI doesn’t make films. Directors make films. The tool is the tool.' },
      { title: 'Brands stuck between craft and speed', body: 'You want AI speed and economics without the AI tax on brand quality.' },
    ],
    deliverables: [
      { title: 'AI Short Films', body: 'Narrative AI short films with real direction, scripting and sound design.' },
      { title: 'AI Commercials', body: 'AI-generated ad films for categories where live-action is expensive or impossible.' },
      { title: 'AI Launch Trailers', body: 'Product and brand launch trailers made at AI speed with film-grade finish.' },
      { title: 'AI Music Videos', body: 'AI-native music videos and visualisers for independent and label releases.' },
      { title: 'AI Concept Films', body: 'Rapid concept films for pitches, investor decks and internal alignment.' },
      { title: 'Hybrid AI + Live-action', body: 'Workflows that combine AI generation with traditional shoot and post where it counts.' },
    ],
    whyUs: [
      'Dark Bird Labs — our dedicated AI division built on nine years of film pedigree',
      'Direction-first AI workflows, not prompt-first',
      'In-house edit, colour, sound and motion on top of AI generation',
      'Hybrid workflows that know when live-action is still the right call',
    ],
    outcomeMetric: 'AI films with craft, not just speed',
    faqs: [
      { q: 'Can AI video actually compete with live-action?', a: 'For certain briefs, yes — especially concept-heavy, surreal, hypothetical or cost-constrained shoots. For brand-critical hero films, live-action still wins. We advise honestly.' },
      { q: 'What tools do you work with?', a: 'A mix of frontier tools — Runway, Kling, Sora, Veo, Midjourney and others — alongside traditional edit, colour and sound. Tools change; the craft doesn’t.' },
      { q: 'How much does an AI film cost?', a: 'AI films typically run 40–70% of an equivalent live-action budget. We scope transparently after a short brief.' },
      { q: 'Do you own the outputs?', a: 'Yes — commercial ownership and licensing are handled cleanly for every project.' },
    ],
    meta: {
      title: 'AI Video Production Company in Bangalore | Dark Bird Labs',
      description: 'AI short films, AI commercials and AI launch trailers by Dark Bird Labs — directed, not prompted. A 9-year film studio in Bangalore.',
      keywords: ['ai video production bangalore', 'ai film maker bangalore', 'ai commercial bangalore', 'ai music video', 'generative video production'],
    },
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getServiceSlugs(): string[] {
  return services.map((s) => s.slug)
}

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((s) => s.category === category)
}

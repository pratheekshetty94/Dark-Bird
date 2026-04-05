// Industry landing pages — SEO / GEO targeted Bangalore verticals.
// Each entry drives /industries/[slug] and the /industries hub.
// Positioning: Dark Bird is a film/brand storytelling studio, so every
// industry is framed around cinematic video + storytelling outcomes.

export type IndustryFaq = {
  q: string
  a: string
}

export type Industry = {
  slug: string
  name: string
  shortName: string
  heroKicker: string
  heroHeadline: string
  heroAccent: string // the word wrapped in <em>
  heroSubhead: string
  painPoints: { title: string; body: string }[]
  services: { title: string; body: string }[]
  whyUs: string[]
  outcomeMetric: string
  faqs: IndustryFaq[]
  meta: {
    title: string
    description: string
    keywords: string[]
  }
}

export const industries: Industry[] = [
  {
    slug: 'real-estate-video-production-bangalore',
    name: 'Real Estate & Property Developers',
    shortName: 'Real Estate',
    heroKicker: 'Real Estate Video Production · Bangalore',
    heroHeadline: 'Films that sell projects before the site visit',
    heroAccent: 'sell',
    heroSubhead:
      'Cinematic walkthroughs, lifestyle films and launch campaigns for developers, villa projects and premium residential brands across Bangalore.',
    painPoints: [
      {
        title: 'Stock-footage walkthroughs that feel like every other project',
        body: 'Drone-swoop-over-a-slab videos all look the same. Buyers scroll past them.',
      },
      {
        title: 'Launch campaigns that leak budget into weak creative',
        body: 'You spend crores on media and get a 15-second cut that no one remembers.',
      },
      {
        title: 'Site visits that drop off before booking',
        body: 'Without a credibility layer online, walk-ins lose conviction before they sign.',
      },
    ],
    services: [
      {
        title: 'Project Launch Films',
        body: 'Hero films for pre-launch, launch and phase-2 campaigns — cinematic, emotional, aspirational.',
      },
      {
        title: 'Cinematic Walkthroughs',
        body: 'Steadicam + drone + talent-led walkthroughs that replace sterile CGI flybys.',
      },
      {
        title: 'Lifestyle & Amenity Films',
        body: 'Short films that sell the life inside the project, not just the floor plan.',
      },
      {
        title: 'Developer Brand Films',
        body: 'Founder, legacy and trust films that anchor your parent brand across projects.',
      },
      {
        title: 'Social + Performance Cutdowns',
        body: 'Reels, shorts and ad cuts built for Meta & YouTube to drive booked site visits.',
      },
      {
        title: 'Sales Collateral & Microsites',
        body: 'Web, brochure and presentation design that matches the production value of the film.',
      },
    ],
    whyUs: [
      'Nine years of cinematic experience — we shoot projects like we shoot films',
      'Credits on Kantara, 777 Charlie, Gandhada Gudi and other landmark Kannada films',
      'In-house direction, DOP, edit, colour and sound — one studio, one vision',
      'Media-ready cutdowns: every launch film ships with platform-native versions',
    ],
    outcomeMetric: 'Cinematic launches that move inventory, not just views',
    faqs: [
      {
        q: 'How much does a real estate launch film cost in Bangalore?',
        a: 'Projects typically start around ₹3–5L for a focused launch film and scale with talent, locations, aerial work, CGI and the number of cutdowns. We share a transparent line-item quote after a short discovery call.',
      },
      {
        q: 'Do you handle media buying for launch campaigns?',
        a: 'We partner with your media agency or our in-house performance team (Dark Bird Socials) to make sure the creative is cut exactly the way each platform rewards — Meta, YouTube, Instagram Reels and OOH.',
      },
      {
        q: 'Can you shoot under-construction projects?',
        a: 'Yes. We combine on-ground footage, CGI overlays and narrative storytelling so the film feels finished even when the project isn’t.',
      },
      {
        q: 'How long does a project take end-to-end?',
        a: 'A typical launch film runs 4–6 weeks from brief to delivery, including pre-production, shoot, edit, colour, sound, VFX and platform cutdowns.',
      },
    ],
    meta: {
      title: 'Real Estate Video Production Agency in Bangalore | Dark Bird Films',
      description:
        'Cinematic real estate video production in Bangalore. Launch films, walkthroughs, lifestyle films and developer brand films by Dark Bird — a 9-year film studio.',
      keywords: [
        'real estate video production bangalore',
        'real estate marketing agency bangalore',
        'property launch film bangalore',
        'real estate cinematic walkthrough',
        'developer branding bangalore',
      ],
    },
  },
  {
    slug: 'ecommerce-video-production-bangalore',
    name: 'E-commerce & D2C Brands',
    shortName: 'E-commerce & D2C',
    heroKicker: 'E-commerce Video Production · Bangalore',
    heroHeadline: 'Product films that turn scrolls into carts',
    heroAccent: 'carts',
    heroSubhead:
      'Hero product films, lifestyle shoots, and performance-ready ad cuts for D2C brands, marketplaces and category launches.',
    painPoints: [
      {
        title: 'Flat, table-top product shots that don’t sell the feeling',
        body: 'Studio stills convert on Amazon — not on Instagram, YouTube or your own store.',
      },
      {
        title: 'Ad creative that can’t keep up with your media spend',
        body: 'Performance teams burn through creative in weeks. Without a volume pipeline, CAC creeps up.',
      },
      {
        title: 'A launch with no story',
        body: 'Your product deserves a film, not just a carousel.',
      },
    ],
    services: [
      {
        title: 'Brand & Launch Films',
        body: 'Hero launch films that position the brand, not just the product.',
      },
      {
        title: 'Product Films & Explainer Videos',
        body: 'Short-form films that show utility, texture, and the why behind the buy.',
      },
      {
        title: 'Lifestyle & Campaign Shoots',
        body: 'Seasonal campaigns across print, digital and OOH — shot like editorial.',
      },
      {
        title: 'Performance Ad Creative',
        body: 'UGC, hooks, static ads and cutdowns engineered for Meta and YouTube CPA.',
      },
      {
        title: 'Founder & Brand Story Films',
        body: 'The human story behind the brand — crucial for trust in a crowded category.',
      },
      {
        title: 'D2C Website & Storefront Design',
        body: 'Shopify/headless storefronts and landing pages designed around the film.',
      },
    ],
    whyUs: [
      'We shoot products with the same craft we bring to feature films',
      'In-house editorial pipeline: new ad creative in days, not weeks',
      'Performance-aware editors who cut for hooks, retention and CPA',
      'One studio: film, design, socials and performance — no agency ping-pong',
    ],
    outcomeMetric: 'Creative that keeps up with your media team',
    faqs: [
      {
        q: 'Do you work with early-stage D2C brands?',
        a: 'Yes — we work with pre-launch and Series A D2C brands as well as established marketplaces. We tailor scope and spend to the stage of the brand.',
      },
      {
        q: 'Can you deliver a high volume of ad creative monthly?',
        a: 'Yes. We run dedicated content pipelines for performance teams — typically 20–60 cuts per month from a single shoot day.',
      },
      {
        q: 'Do you handle product photography alongside video?',
        a: 'Yes, stills and motion are captured on the same shoot to save cost and keep the visual language consistent across every channel.',
      },
      {
        q: 'Can you ship in multiple languages and formats?',
        a: 'Yes — multilingual voiceovers, subtitling and platform-native 9:16 / 1:1 / 16:9 cuts are part of standard delivery.',
      },
    ],
    meta: {
      title: 'E-commerce & D2C Video Production Agency in Bangalore | Dark Bird Films',
      description:
        'Product films, launch campaigns and performance ad creative for D2C and e-commerce brands. Made by Dark Bird — a 9-year film studio in Bangalore.',
      keywords: [
        'ecommerce video production bangalore',
        'd2c brand film bangalore',
        'product video production bangalore',
        'shopify brand film',
        'performance ad creative bangalore',
      ],
    },
  },
  {
    slug: 'restaurant-food-marketing-bangalore',
    name: 'Restaurants & Food Brands',
    shortName: 'Restaurants & F&B',
    heroKicker: 'Restaurant & Food Marketing · Bangalore',
    heroHeadline: 'Food films that make Bangalore hungry',
    heroAccent: 'hungry',
    heroSubhead:
      'Hero films, reels and brand campaigns for restaurants, cloud kitchens, cafes and packaged food brands — shot like food cinema.',
    painPoints: [
      {
        title: 'Reels that don’t match the quality of the food',
        body: 'Your kitchen is doing ten out of ten. Your content is doing four.',
      },
      {
        title: 'New menus, zero story',
        body: 'Every launch gets a flatlay and a caption. That’s not a campaign.',
      },
      {
        title: 'Ad spend that only fills slow hours',
        body: 'Without a strong hook, your boosted posts disappear.',
      },
    ],
    services: [
      {
        title: 'Restaurant Launch Films',
        body: 'Cinematic launch films that sell the room, the menu and the mood.',
      },
      {
        title: 'Food Cinematography',
        body: 'Slow-motion, steam, sear and pour — food shot like feature film.',
      },
      {
        title: 'Chef & Founder Films',
        body: 'The story of the people behind the plate — the strongest credibility asset a restaurant has.',
      },
      {
        title: 'Reels, Shorts & Menu Content',
        body: 'Monthly content retainers that feed Instagram and YouTube without thinning the craft.',
      },
      {
        title: 'Packaged Food Brand Films',
        body: 'For FMCG and gourmet F&B brands launching into retail and quick-commerce.',
      },
      {
        title: 'Website, Menu & Brand Design',
        body: 'Menus, packaging and websites that match the production value of the film.',
      },
    ],
    whyUs: [
      'A film studio that happens to love food — not a reels factory',
      'Shot across fine-dining, QSR, cloud kitchens, cafes and packaged F&B',
      'Editorial-quality stills on every shoot — ready for Zomato, Swiggy and print',
      'One team from food styling to final delivery',
    ],
    outcomeMetric: 'Food content that earns saves, shares, and reservations',
    faqs: [
      {
        q: 'Do you shoot at the restaurant or in a studio?',
        a: 'Both. Launch films and mood pieces are usually shot at the restaurant. High-volume product and menu content is often shot at our studio for speed and control.',
      },
      {
        q: 'Can you handle monthly content for our Instagram?',
        a: 'Yes — we run dedicated monthly retainers for restaurants and cafes with reels, shorts, stills and carousels built for the algorithm.',
      },
      {
        q: 'Do you work with packaged food brands?',
        a: 'Yes. We’ve worked with packaged F&B and FMCG brands on launch films, packaging design and retail-ready campaigns.',
      },
      {
        q: 'How long does a launch film take?',
        a: 'Typically 3–5 weeks from brief to delivery, including food styling, shoot, edit, colour and sound.',
      },
    ],
    meta: {
      title: 'Restaurant & Food Marketing Agency in Bangalore | Dark Bird Films',
      description:
        'Cinematic food marketing for restaurants, cafes and F&B brands in Bangalore. Launch films, reels, food cinematography and brand design by Dark Bird.',
      keywords: [
        'restaurant marketing agency bangalore',
        'restaurant video production bangalore',
        'food photography bangalore',
        'food videography bangalore',
        'restaurant branding bangalore',
      ],
    },
  },
  {
    slug: 'interior-design-marketing-bangalore',
    name: 'Interior Designers & Architects',
    shortName: 'Interiors & Architecture',
    heroKicker: 'Interior Design Marketing · Bangalore',
    heroHeadline: 'Films that turn portfolios into inquiries',
    heroAccent: 'inquiries',
    heroSubhead:
      'Cinematic project films, studio brand films and social content for interior designers, architects and design-build firms in Bangalore.',
    painPoints: [
      {
        title: 'Project photos that don’t do the space justice',
        body: 'You designed a home. The photos feel like a real-estate listing.',
      },
      {
        title: 'No face to the studio',
        body: 'Clients hire people, not portfolios. Without a founder film, you’re just another grid.',
      },
      {
        title: 'Referrals dry up between projects',
        body: 'Great content between launches is how premium studios stay top-of-mind.',
      },
    ],
    services: [
      {
        title: 'Project Walkthrough Films',
        body: 'Cinematic walkthroughs that capture light, texture, material and intent.',
      },
      {
        title: 'Studio Brand Films',
        body: 'The story of your studio — the founder, the process, the point of view.',
      },
      {
        title: 'Architectural Photography',
        body: 'Editorial-grade stills captured on the same shoot as the video.',
      },
      {
        title: 'Reels & Behind-the-Scenes Content',
        body: 'Monthly content retainers that keep your feed alive between project handovers.',
      },
      {
        title: 'Website & Portfolio Design',
        body: 'Portfolio sites and case-study pages engineered around the work.',
      },
      {
        title: 'Lead-gen Campaigns',
        body: 'Paid campaigns on Meta, YouTube and Google built around your best films.',
      },
    ],
    whyUs: [
      'We shoot interiors the way cinematographers light sets — intentional, not inventory',
      'Editorial pedigree — our stills look at home in print and feature publications',
      'Founder-led direction so the story of the studio comes through',
      'One team for film, photo, web and social',
    ],
    outcomeMetric: 'Films that fill your inquiry pipeline for months',
    faqs: [
      {
        q: 'Do you travel to project sites outside Bangalore?',
        a: 'Yes. We regularly travel across Karnataka and India for project shoots. Travel and stay are added to the quote transparently.',
      },
      {
        q: 'Can you shoot multiple projects in one trip?',
        a: 'Yes. We often bundle 2–3 completed projects in a single shoot block to bring per-project cost down.',
      },
      {
        q: 'Do you handle styling for the shoot?',
        a: 'We art-direct the shoot and work with your team on staging. For larger projects we bring on a dedicated stylist.',
      },
      {
        q: 'What do the deliverables look like?',
        a: 'A typical project includes one hero walkthrough film, 3–6 social cutdowns, 30–60 editorial stills and behind-the-scenes content.',
      },
    ],
    meta: {
      title: 'Interior Design Marketing Agency in Bangalore | Dark Bird Films',
      description:
        'Cinematic films, photography and brand content for interior designers and architects in Bangalore. Made by Dark Bird — a 9-year film studio.',
      keywords: [
        'interior design marketing agency bangalore',
        'architectural video production bangalore',
        'interior design photography bangalore',
        'architect brand film bangalore',
      ],
    },
  },
  {
    slug: 'healthcare-marketing-bangalore',
    name: 'Healthcare & Hospitals',
    shortName: 'Healthcare',
    heroKicker: 'Healthcare Marketing · Bangalore',
    heroHeadline: 'Films that build trust before the first visit',
    heroAccent: 'trust',
    heroSubhead:
      'Patient-story films, doctor films and hospital brand campaigns for hospitals, clinics and healthtech brands across Bangalore.',
    painPoints: [
      {
        title: 'Talking-head videos that feel like insurance ads',
        body: 'Patients skip them. Referring doctors don’t share them.',
      },
      {
        title: 'No emotional story to back the credentials',
        body: 'Your outcomes are world-class. The way they’re told isn’t.',
      },
      {
        title: 'Generic social content across every department',
        body: 'Oncology, cardiac and maternity all need their own story.',
      },
    ],
    services: [
      {
        title: 'Hospital Brand Films',
        body: 'Institutional films that capture the philosophy, the people and the outcomes.',
      },
      {
        title: 'Patient Story Films',
        body: 'Real patient journeys, told with empathy and craft — the strongest trust asset in healthcare.',
      },
      {
        title: 'Doctor & Department Films',
        body: 'Individual doctor films and department walkthroughs that build credibility and referrals.',
      },
      {
        title: 'Healthtech Product Films',
        body: 'For healthtech startups explaining complex products with clarity and emotion.',
      },
      {
        title: 'Awareness & CSR Campaigns',
        body: 'Health awareness campaigns that balance information with storytelling.',
      },
      {
        title: 'Social & Reel Retainers',
        body: 'Monthly, department-wise social content programs.',
      },
    ],
    whyUs: [
      'We’ve told difficult stories on big screens — the sensitivity carries into healthcare',
      'Tight, on-site production that respects clinical environments',
      'Editorial-grade colour, sound and music — not stock-footage montages',
      'Compliance-aware scripting and consent workflows',
    ],
    outcomeMetric: 'Trust-building films that move patients to pick up the phone',
    faqs: [
      {
        q: 'Do you handle patient consent and privacy?',
        a: 'Yes — we work with your team on written consent, anonymisation and compliance with hospital and regulatory guidelines.',
      },
      {
        q: 'Can you shoot inside OTs and clinical areas?',
        a: 'Yes, with the right permissions and sterilisation protocols. We’ve shot across OTs, ICUs, maternity and paediatric wards.',
      },
      {
        q: 'Do you work with individual doctors?',
        a: 'Yes — we produce personal brand films for doctors building their own practice or thought leadership presence.',
      },
      {
        q: 'What about healthtech startups?',
        a: 'We work with healthtech brands on explainer films, product demos, founder stories and investor reels.',
      },
    ],
    meta: {
      title: 'Healthcare Marketing Agency in Bangalore | Dark Bird Films',
      description:
        'Hospital brand films, patient stories and healthcare video production in Bangalore. Made by Dark Bird — a 9-year film studio.',
      keywords: [
        'healthcare marketing agency bangalore',
        'hospital video production bangalore',
        'patient story film',
        'doctor branding bangalore',
        'healthtech explainer video',
      ],
    },
  },
  {
    slug: 'pharma-marketing-bangalore',
    name: 'Pharma & Life Sciences',
    shortName: 'Pharma & Life Sciences',
    heroKicker: 'Pharma Marketing · Bangalore',
    heroHeadline: 'Science, told with the craft it deserves',
    heroAccent: 'craft',
    heroSubhead:
      'Corporate films, product explainers, conference reels and internal comms for pharma, biotech and medical device brands.',
    painPoints: [
      {
        title: 'Corporate videos that feel dated the day they’re delivered',
        body: 'Stock music, stock footage, stock story.',
      },
      {
        title: 'Complex science, badly explained',
        body: 'Your science deserves more than a PowerPoint voiceover.',
      },
      {
        title: 'Conference and launch reels that don’t travel',
        body: 'One-off edits that no one re-watches.',
      },
    ],
    services: [
      {
        title: 'Corporate & Institutional Films',
        body: 'Brand films for pharma and biotech companies — founders, facilities, philosophy.',
      },
      {
        title: 'Product Explainer Films',
        body: 'Complex drug, device and diagnostic explainers for HCP and patient audiences.',
      },
      {
        title: 'Scientific Storytelling',
        body: 'Films that translate research, molecules and outcomes into narratives.',
      },
      {
        title: 'Conference & Launch Reels',
        body: 'Event films, teasers and highlight reels that carry the brand across cycles.',
      },
      {
        title: 'Internal & HR Films',
        body: 'Culture films, onboarding and training content for large pharma teams.',
      },
      {
        title: 'Regulatory-aware Edit Process',
        body: 'Scripting and edit workflows built around medical and regulatory review.',
      },
    ],
    whyUs: [
      'Narrative-first team that can carry serious science with craft',
      'Experience working under medical-legal-review cycles',
      'Multilingual delivery for Indian and global pharma audiences',
      'In-house motion graphics for molecules, mechanisms and data',
    ],
    outcomeMetric: 'Films that make your science feel as serious as it is',
    faqs: [
      {
        q: 'Do you work under MLR (medical-legal review) cycles?',
        a: 'Yes. We build scripting and edit phases around MLR so that changes are absorbed without blowing budgets or timelines.',
      },
      {
        q: 'Can you handle multilingual delivery?',
        a: 'Yes — our standard delivery includes English plus Indian and global language versions as required.',
      },
      {
        q: 'Do you produce HCP-specific content?',
        a: 'Yes, with scripting and visual language tailored specifically for health-care professionals.',
      },
      {
        q: 'Can you handle sensitive trial / efficacy data?',
        a: 'We sign NDAs as standard and have working experience with confidential clinical and commercial data.',
      },
    ],
    meta: {
      title: 'Pharma Marketing & Video Production Agency in Bangalore | Dark Bird Films',
      description:
        'Corporate films, product explainers and conference reels for pharma, biotech and medical device brands. Made by Dark Bird in Bangalore.',
      keywords: [
        'pharma marketing agency bangalore',
        'pharma video production bangalore',
        'medical explainer video',
        'biotech brand film',
        'life sciences video production',
      ],
    },
  },
  {
    slug: 'ca-finance-marketing-bangalore',
    name: 'CA Firms & Finance Professionals',
    shortName: 'CA & Finance',
    heroKicker: 'CA Firm Marketing · Bangalore',
    heroHeadline: 'Films that turn credibility into clients',
    heroAccent: 'credibility',
    heroSubhead:
      'Founder films, explainer films and social content for chartered accountants, tax consultants, wealth managers and fintech brands.',
    painPoints: [
      {
        title: 'All authority, no visibility',
        body: 'Your expertise is world-class. Your website and socials don’t show it.',
      },
      {
        title: 'Referral-only growth has a ceiling',
        body: 'Without a content engine, growth stalls when partners stop referring.',
      },
      {
        title: 'Complex topics, boring delivery',
        body: 'Tax, structuring and wealth don’t have to look like a textbook.',
      },
    ],
    services: [
      {
        title: 'Founder & Partner Films',
        body: 'Films that put the people behind the practice on screen with craft and clarity.',
      },
      {
        title: 'Explainer Series',
        body: 'Short-form explainer films that turn complex tax and finance topics into shareable content.',
      },
      {
        title: 'Client Story Films',
        body: 'Case-study films that show outcomes without breaching confidentiality.',
      },
      {
        title: 'LinkedIn + YouTube Content Engines',
        body: 'Monthly video retainers that build a long-term authority signal.',
      },
      {
        title: 'Fintech Product Films',
        body: 'Explainers and launch films for fintech and wealth-management platforms.',
      },
      {
        title: 'Brand & Website Refresh',
        body: 'Brand identity and websites that match the seniority of the practice.',
      },
    ],
    whyUs: [
      'We’ve filmed founders across sectors — we know how to make experts look great on camera',
      'Narrative-first explainers that earn shares, not just views',
      'Scripted with your team to protect confidentiality and compliance',
      'One studio for film, design and socials',
    ],
    outcomeMetric: 'A long-term authority engine, not one-off videos',
    faqs: [
      {
        q: 'Our clients are confidential — can we still shoot case studies?',
        a: 'Yes. We build case-study films around outcomes, frameworks and anonymised client stories that protect confidentiality.',
      },
      {
        q: 'We’re camera-shy. Can you still make us look great?',
        a: 'That’s our specialty. Our direction is built for founders who don’t see themselves as on-camera talent.',
      },
      {
        q: 'Can you handle both video and LinkedIn writing?',
        a: 'Yes — monthly retainers can include scripting, captions and post copy alongside the video.',
      },
      {
        q: 'Do you work with fintech startups as well as traditional CA firms?',
        a: 'Yes. We work across both traditional practices and fintech/wealth-tech startups.',
      },
    ],
    meta: {
      title: 'CA Firm & Finance Marketing Agency in Bangalore | Dark Bird Films',
      description:
        'Founder films, explainer videos and LinkedIn content engines for CA firms, finance professionals and fintech brands in Bangalore. By Dark Bird.',
      keywords: [
        'CA marketing agency bangalore',
        'chartered accountant branding',
        'finance video production bangalore',
        'fintech brand film bangalore',
        'CA firm website design',
      ],
    },
  },
  {
    slug: 'law-firm-marketing-bangalore',
    name: 'Law Firms & Advocates',
    shortName: 'Law Firms',
    heroKicker: 'Law Firm Marketing · Bangalore',
    heroHeadline: 'Brand films with the gravitas your practice deserves',
    heroAccent: 'gravitas',
    heroSubhead:
      'Founder films, firm brand films and thought-leadership content for advocates, boutique practices and corporate law firms.',
    painPoints: [
      {
        title: 'A reputation built entirely offline',
        body: 'Your courtroom record is strong. Your digital presence is quiet.',
      },
      {
        title: 'Content that can’t cross ethical lines',
        body: 'Most agencies don’t understand Bar Council advertising rules. We do.',
      },
      {
        title: 'A generation that Googles before it calls',
        body: 'The next client is already searching — before a single referral is made.',
      },
    ],
    services: [
      {
        title: 'Firm Brand Films',
        body: 'Institutional films that capture the history, ethos and people of the firm — without crossing advertising lines.',
      },
      {
        title: 'Founder / Partner Profiles',
        body: 'Thought-leadership films that position partners as category experts.',
      },
      {
        title: 'Practice-Area Explainers',
        body: 'Explainer films on M&A, IP, criminal, tax, family and corporate practice areas.',
      },
      {
        title: 'Thought-leadership Content',
        body: 'LinkedIn and YouTube content engines that build long-term authority.',
      },
      {
        title: 'Website & Digital Presence',
        body: 'Restrained, editorial websites that match the stature of the firm.',
      },
      {
        title: 'Internal & Recruitment Films',
        body: 'Films for young associates and laterals — increasingly the real competitive moat.',
      },
    ],
    whyUs: [
      'We script within Bar Council of India advertising guidelines',
      'Narrative-first direction that keeps films dignified, not promotional',
      'Editorial-grade craft that matches the seniority of the practice',
      'One studio: film, design, socials and web',
    ],
    outcomeMetric: 'A digital presence as senior as the partners',
    faqs: [
      {
        q: 'Isn’t advertising restricted for lawyers in India?',
        a: 'Yes — direct solicitation is not allowed, but informational, educational and institutional content is. We script all our work to stay squarely within Bar Council of India Rule 36 guidelines.',
      },
      {
        q: 'Can you work with individual advocates?',
        a: 'Yes — we make founder-led films for boutique and individual practices as well as large firms.',
      },
      {
        q: 'Do you handle ongoing content?',
        a: 'Yes. Monthly retainers cover LinkedIn, YouTube Shorts and long-form thought leadership.',
      },
      {
        q: 'Can you film inside chambers and courtrooms?',
        a: 'Chambers yes. Courtrooms follow court-specific permissions and we advise on what’s possible.',
      },
    ],
    meta: {
      title: 'Law Firm Marketing Agency in Bangalore | Dark Bird Films',
      description:
        'Brand films, founder profiles and thought-leadership content for law firms and advocates in Bangalore. Bar Council-aware scripting by Dark Bird.',
      keywords: [
        'law firm marketing agency bangalore',
        'lawyer video production bangalore',
        'advocate branding bangalore',
        'law firm brand film',
      ],
    },
  },
  {
    slug: 'edtech-education-marketing-bangalore',
    name: 'EdTech & Education',
    shortName: 'EdTech & Education',
    heroKicker: 'EdTech Marketing · Bangalore',
    heroHeadline: 'Films that turn learners into long-term users',
    heroAccent: 'learners',
    heroSubhead:
      'Brand films, product films and performance creative for edtech startups, coaching institutes, schools and universities.',
    painPoints: [
      {
        title: 'Heavy ad spend, tired creative',
        body: 'Every edtech ad on YouTube looks the same. CAC goes up, trust goes down.',
      },
      {
        title: 'Teacher-led content that isn’t built for the internet',
        body: 'Great teachers, rough production. The best lessons die in a poor frame.',
          },
      {
        title: 'Campus films that feel like brochures',
        body: 'A school is a community, not a building. Films should show that.',
      },
    ],
    services: [
      {
        title: 'Brand & Launch Films',
        body: 'Hero brand films for edtech startups, schools, universities and coaching institutes.',
      },
      {
        title: 'Performance Ad Creative',
        body: 'UGC, testimonials, product cuts and hook-based ads engineered for edtech CPA.',
      },
      {
        title: 'Student & Alumni Stories',
        body: 'The single strongest social-proof format in education.',
      },
      {
        title: 'Product & Course Explainers',
        body: 'App, LMS and course explainer films that convert cold traffic.',
      },
      {
        title: 'Faculty & Teacher Films',
        body: 'Series films that build recurring authority around key faculty.',
      },
      {
        title: 'Campus & Infrastructure Films',
        body: 'Cinematic campus films for schools, universities and coaching institutes.',
      },
    ],
    whyUs: [
      'High-volume creative pipeline for edtech performance teams',
      'Storytelling-first approach that cuts through the edtech sameness',
      'Multilingual delivery across India’s biggest language markets',
      'One studio: film, design, web and socials',
    ],
    outcomeMetric: 'Creative that lowers CAC and raises brand love',
    faqs: [
      {
        q: 'Do you work with early-stage edtech startups?',
        a: 'Yes — we work with seed and Series A edtech brands as well as established institutes and universities.',
      },
      {
        q: 'Can you deliver high-volume ad creative?',
        a: 'Yes. Monthly creative retainers can deliver 20–60 cuts per month across static, video and UGC.',
      },
      {
        q: 'Do you handle multilingual delivery?',
        a: 'Yes — voiceovers, subtitles and native-language cuts are part of standard delivery.',
      },
      {
        q: 'Can you shoot at campus without disrupting classes?',
        a: 'Yes. Our crews are small, fast and experienced at shooting around active campuses and institutes.',
      },
    ],
    meta: {
      title: 'EdTech & Education Marketing Agency in Bangalore | Dark Bird Films',
      description:
        'Brand films, student stories and performance creative for edtech, schools and universities. Made by Dark Bird — a 9-year film studio in Bangalore.',
      keywords: [
        'edtech marketing agency bangalore',
        'edtech video production bangalore',
        'school branding bangalore',
        'university brand film',
        'edtech performance creative',
      ],
    },
  },
]

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug)
}

export function getIndustrySlugs(): string[] {
  return industries.map((i) => i.slug)
}

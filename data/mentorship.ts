// data/mentorship.ts

export type Module = {
  number: number
  title: string
  topics: string[]
}

export type Mentorship = {
  slug: string
  name: string
  fee: number            // 🆕 Regular seat fee (200)
  oneToOneFee: number    // 🆕 One-to-One full price (25000)
  marketValue: number    // 🆕 Market value (25000)
  shortName: string
  tagline: string
  timing: string
  duration: string
  lectures: string
  startDate: string
  icon: "brain" | "megaphone" | "chart"
  colors: {
    bg: string
    text: string
    gradient: string
    accentBorder: string
  }
  targetAudience: string[]
  modules: Module[]
  faqs: { question: string; answer: string }[]
  isCrypto?: boolean
}

export const mentorships: Mentorship[] = [
  // ──────────────── AI ────────────────
  {
    slug: "artificial-intelligence",
    name: "Artificial Intelligence",
    shortName: "AI",
    tagline: "Build the future with AI-powered skills.",
    timing: "9:15 PM (PKT)",
    duration: "1–1.5 Months",
    lectures: "14 Live Lectures",
    startDate: "6 Dec 2026",
    fee: 200,                // 🆕
oneToOneFee: 25000,      // 🆕
marketValue: 25000,      // 🆕
    
    icon: "brain",
    colors: {
      bg: "bg-blue-500/10",
      text: "text-blue-500",
      gradient: "from-blue-500/10 via-blue-500/5",
      accentBorder: "hover:border-blue-500/40",
    },
    targetAudience: [
      "Students who want to master AI from scratch",
      "Beginners exploring AI for career growth",
      "Freelancers who want to add AI services",
      "Anyone looking to automate daily workflows",
    ],
    modules: [
      {
        number: 1,
        title: "AI Foundation and Core Understanding",
        topics: [
          "Introduction to AI",
          "AI in real world (business, freelancing, automation)",
          "Types of AI & future scope",
          "Working with AI assistants",
          "Basics to advanced prompt engineering",
        ],
      },
      {
        number: 2,
        title: "Prompt Engineering",
        topics: [
          "Advanced frameworks",
          "Copywriting prompts (ads, scripts, captions)",
          "Problem-solving prompts",
          "Prompt optimization",
          "Reusable prompt templates",
        ],
      },
      {
        number: 3,
        title: "AI Content Creation and Design",
        topics: [
          "AI image generation",
          "Social media post design (ads, thumbnails, carousels)",
          "AI logo & branding (Looka)",
          "Creative visuals (Lovart)",
          "Image editing (Mixboard)",
          "Viral content & Instagram Reels",
        ],
      },
      {
        number: 4,
        title: "AI Video Creation",
        topics: [
          "Short & long content",
          "Motion graphics (Runway ML)",
          "Cinematic video (Kling AI)",
          "Reels, Shorts & YouTube automation videos",
        ],
      },
      {
        number: 5,
        title: "AI Programming and Vibe Coding",
        topics: [
          "AI-assisted coding",
          "No-code & low-code tools",
          "Vibe coding (idea to execution)",
          "Website creation (Lovable)",
          "Simple tools & apps",
        ],
      },
      {
        number: 6,
        title: "AI Automation Systems",
        topics: [
          "Introduction to automation",
          "Google Flow workflows",
          "Task automation (content, posting, response)",
          "Time-saving systems for freelancers",
        ],
      },
      {
        number: 7,
        title: "AI Agents and Smart Systems",
        topics: [
          "Introduction to AI agents",
          "Building simple AI agents",
          "Chatbots & business automation",
          "AI-based customer handling",
        ],
      },
      {
        number: 8,
        title: "Personal Branding",
        topics: [
          "Niche selection & positioning",
          "Profile optimization (Facebook + Instagram)",
          "Content system (value + proof + authority)",
          "AI-based content creation",
          "Lead generation & client closing basics",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need coding experience for AI mentorship?",
        answer:
          "No. We start from zero and teach you practical AI tools with no-code and low-code approaches.",
      },
      {
        question: "Will I learn prompt engineering?",
        answer:
          "Yes, there is a full module dedicated to advanced prompt engineering frameworks.",
      },
      {
        question: "Are class recordings available?",
        answer:
          "Yes, all 14 live lectures are recorded and available to watch anytime.",
      },
    ],
  },

  // ──────────────── SMM ────────────────
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    shortName: "SMM",
    tagline: "Master Meta Ads & grow businesses online.",
    timing: "8:00 PM (PKT)",
    duration: "1–1.5 Months",
    lectures: "14 Live Lectures",
    startDate: "6 Dec 2026",
    fee: 200,                // 🆕
oneToOneFee: 25000,      // 🆕
marketValue: 25000,      // 🆕
    icon: "megaphone",
    colors: {
      bg: "bg-purple-500/10",
      text: "text-purple-500",
      gradient: "from-purple-500/10 via-purple-500/5",
      accentBorder: "hover:border-purple-500/40",
    },
    targetAudience: [
      "Students who want to learn digital marketing",
      "Beginners looking for high-income skills",
      "Freelancers who want to offer marketing services",
      "Business owners who want to grow online",
    ],
    modules: [
      {
        number: 1,
        title: "SMM Fundamentals",
        topics: [
          "Digital marketing ecosystem",
          "Traditional vs digital",
          "Platforms deep dive (Facebook, Instagram, WhatsApp)",
          "Local vs international market",
          "High-income skills",
          "Business understanding",
          "Competitor research",
          "Niche selection",
        ],
      },
      {
        number: 2,
        title: "AI-Powered Content and Copywriting",
        topics: [
          "AI tools (ChatGPT, Claude, DeepSeek)",
          "Prompt basics",
          "Content types",
          "Hook writing",
          "Primary text (ad copy)",
          "Description & CTA",
          "Copywriting psychology",
          "Visual psychology",
          "Canva designing",
          "Content calendar",
        ],
      },
      {
        number: 3,
        title: "Facebook Marketing",
        topics: [
          "Page setup & branding",
          "Organic growth",
          "Content posting framework",
          "Algorithm basics",
          "Types of Facebook ads",
          "Audience targeting basics",
          "Post boost vs Ads Manager",
          "Engagement campaign",
          "Intro to sales funnel",
        ],
      },
      {
        number: 4,
        title: "Meta Ads Setup and Campaign Execution",
        topics: [
          "Business Manager setup",
          "Ad account creation",
          "Pixel & tracking basics",
          "Campaign objectives",
          "Campaign structure",
          "Audience targeting (core, custom, lookalike)",
          "Ad creatives",
          "First live campaign",
          "Budget & basic optimization",
        ],
      },
      {
        number: 5,
        title: "Advanced Meta Ads Scaling",
        topics: [
          "Performance analysis (CTR, CPC, CPA, ROAS)",
          "Winning ad formula",
          "Budget scaling",
          "CBO vs ABO",
          "A/B testing",
          "Retargeting",
          "Funnel-based ads",
          "AI-based optimization",
          "Low-performance fixing",
          "Disabled ad account recovery",
          "Multiple ad accounts",
        ],
      },
      {
        number: 6,
        title: "Instagram and Threads Growth",
        topics: [
          "Professional account setup",
          "Profile optimization",
          "Content strategy",
          "Viral Reels framework",
          "Hashtag & SEO",
          "Engagement techniques",
          "Growth automation (AI tools)",
          "Threads setup & content",
          "Cross-platform traffic",
        ],
      },
      {
        number: 7,
        title: "WhatsApp Business and Client Conversion",
        topics: [
          "Business setup",
          "Catalog",
          "Auto & quick replies",
          "Broadcast strategy",
          "Lead management",
          "WhatsApp ads integration",
          "Status marketing",
          "Client communication",
          "Closing techniques",
        ],
      },
      {
        number: 8,
        title: "Freelancing and Client Acquisition",
        topics: [
          "Fiverr & Upwork setup",
          "Profile optimization",
          "Gig creation",
          "Portfolio (without experience)",
          "Client hunting",
          "Proposal templates",
          "Client communication",
          "Pricing strategy",
          "Upselling",
        ],
      },
      {
        number: 9,
        title: "Personal Branding and Authority",
        topics: [
          "Branding foundation",
          "Niche-based content",
          "Authority building",
          "Social proof",
          "High-ticket client attraction",
          "Content monetization",
          "Long-term career planning",
        ],
      },
      {
        number: 10,
        title: "Agency, E-commerce and Multiple Income Streams",
        topics: [
          "Agency launch",
          "Service packaging",
          "Team hiring basics",
          "Shopify store setup (overview)",
          "Product hunting basics",
          "Affiliate marketing",
          "Local business marketing model (Pakistan)",
          "Job hunting strategy (remote + onsite)",
        ],
      },
    ],
    faqs: [
      {
        question: "Will I learn how to run real Meta Ads?",
        answer:
          "Yes, you'll set up a Business Manager, create a campaign, and run your first live campaign during the course.",
      },
      {
        question: "Is this suitable for beginners?",
        answer:
          "Yes, we start from fundamentals and go all the way to advanced scaling.",
      },
      {
        question: "Can I use these skills to freelance?",
        answer:
          "Absolutely. We have a dedicated module on Fiverr, Upwork, and client acquisition.",
      },
    ],
  },

  // ──────────────── CRYPTO ────────────────
  {
    slug: "crypto-trading",
    name: "Crypto Trading",
    shortName: "Crypto",
    tagline: "Learn technical analysis & risk management.",
    timing: "10:15 PM (PKT)",
    duration: "1–1.5 Months",
    lectures: "14 Live Lectures",
    startDate: "6 Dec 2026",
    fee: 200,                // 🆕
oneToOneFee: 25000,      // 🆕
marketValue: 25000,      // 🆕
    icon: "chart",
    colors: {
      bg: "bg-amber-500/10",
      text: "text-amber-500",
      gradient: "from-amber-500/10 via-amber-500/5",
      accentBorder: "hover:border-amber-500/40",
    },
    isCrypto: true,
    targetAudience: [
      "Students curious about crypto markets",
      "Beginners who want to learn trading properly",
      "Anyone looking to understand risk management",
      "Traders who want to build a real strategy",
    ],
    modules: [
      {
        number: 1,
        title: "Foundation",
        topics: [
          "Crypto basics (Bitcoin, altcoins, market structure)",
          "Spot vs futures vs margin",
          "Exchanges setup (Binance / Bybit)",
          "Wallets & security (avoid scams)",
          "Order types (market, limit, stop loss)",
          "TradingView setup",
        ],
      },
      {
        number: 2,
        title: "Technical Analysis Core",
        topics: [
          "Candlestick psychology",
          "Support & resistance zones",
          "Trend (bullish, bearish, sideways)",
          "Market structure (HH, HL, LH, LL)",
          "Trendlines & channels",
          "Volume analysis",
        ],
      },
      {
        number: 3,
        title: "Price Action + SMC",
        topics: [
          "Liquidity concept",
          "Order blocks",
          "Break of structure (BOS)",
          "Change of character (CHOCH)",
          "Fair value gaps (FVG)",
          "Inducement & fake breakouts",
        ],
      },
      {
        number: 4,
        title: "Indicators + Confirmation",
        topics: ["RSI", "MACD", "Moving averages", "Confluence strategy (TA + SMC)"],
      },
      {
        number: 5,
        title: "Risk Management",
        topics: [
          "Risk per trade (1–2%)",
          "Risk-reward ratio (1:2 / 1:3)",
          "Position sizing",
          "Stop loss placement",
          "Capital protection",
        ],
      },
      {
        number: 6,
        title: "Trading Psychology",
        topics: [
          "Fear & greed control",
          "Avoiding revenge trading",
          "Discipline system",
          "Trading journal",
        ],
      },
      {
        number: 7,
        title: "Live Trading + Strategy Building",
        topics: [
          "Daily live market analysis",
          "Entry to exit execution",
          "Building your own strategy",
          "Backtesting",
          "Demo to real account shift",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this financial advice?",
        answer:
          "No. This is purely an educational program. Crypto trading involves risk of loss and no profit is guaranteed.",
      },
      {
        question: "Do I need prior trading experience?",
        answer:
          "No. We start from zero and cover foundations before moving to advanced concepts.",
      },
      {
        question: "Will you teach live trading?",
        answer:
          "Yes, the final module includes daily live market analysis and strategy building.",
      },
    ],
  },
]

export function getMentorshipBySlug(slug: string): Mentorship | undefined {
  return mentorships.find((m) => m.slug === slug)
}
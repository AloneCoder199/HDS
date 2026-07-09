import { 
  Code2, 
  Megaphone, 
  Search, 
  Palette, 
  Smartphone, 
  BarChart3,
  Cloud, 
  Shield,
  Cpu,
  ShoppingCart,
  Video,
  LineChart,
  Database,
  Globe,
  Zap,
  Target,
  Award,
  Clock,
  Users,
  Star,
  TrendingUp,
  BookOpen,
  GraduationCap
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { boolean } from "zod";

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels";
export type CourseCategory = "Development" | "Design" | "Marketing"| "Finance" | "Data" | "Business" | "Security";

export interface Course {
  id: string;
  isAvailable: Boolean;
  title: string;
  slug: string;
  description: string;
  shortDesc: string;
  fullDescription: string;
  icon: LucideIcon;
  category: CourseCategory;
  level: CourseLevel;
  duration: string;
  weeks: number;
  hours: number;
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  color: string;
  bgColor: string;
  borderColor: string;
  gradient: string;
  features: string[];
  modules: {
    title: string;
    duration: string;
    topics: string[];
  }[];
  instructors: {
    name: string;
    role: string;
    company: string;
    avatar: string;
  }[];
  outcomes: string[];
  certification: string;
  prerequisites: string[];
}

export const coursesData: Course[] = [
{
    id: "dm-002",
    isAvailable: true,
    title: "Social Media Marketing Mastery",
    slug: "ai-social-media-marketing-mentorship",
    description: "Master AI-powered content creation, Meta ads deployment, scaling strategies, and client acquisition in this practical one-month mentorship.",
    shortDesc: "AI & Meta Ads Expert Marketing",
    fullDescription: "Become an expert digital marketer with high-income AI skills. Master Facebook, Instagram, Threads, and WhatsApp marketing, learn advanced Meta ads scaling, and launch your own digital marketing agency with live interactive classes and a guaranteed 1-month internship.",
    icon: Megaphone,
    category: "Marketing",
    level: "All Levels",
    duration: "4 Weeks",
    weeks: 4,
    hours: 40,
    price: 99,
    originalPrice: 25000,
    rating: 4.9,
    students: 2850,
    color: "text-violet-600",
    bgColor: "bg-violet-600/10",
    borderColor: "border-violet-200 dark:border-violet-800",
    gradient: "from-violet-600 via-purple-500 to-fuchsia-500",
    features: [
      "100% Live Interactive Classes",
      "Daily Practical Assignments & Projects",
      "1-Month Internship Program",
      "Government Verified Certificate",
      "Private WhatsApp Community Support",
      "Freelancing & Job Opportunities"
    ],
    modules: [
      {
        title: "Market Fundamentals & AI Content System",
        duration: "1 Weeks",
        topics: [
          "Digital Marketing Ecosystem",
          "AI Tools & Prompt Engineering",
          "Copywriting Psychology",
          "Canva & Content Calendars"
        ]
      },
      {
        title: "Meta Ads Setup & Core Campaigns",
        duration: "1 Weeks",
        topics: [
          "Page Setup & Organic Growth",
          "Business Manager Settings",
          "Pixel & Campaign Structure",
          "Targeting & Campaign Launch"
        ]
      },
      {
        title: "Advanced Ads Scaling & Automation",
        duration: "1 Weeks",
        topics: [
          "Performance & ROI Analysis",
          "Budget Scaling & A/B Testing",
          "Retargeting & Funnel Strategy",
          "Account Recovery & Automation"
        ]
      },
      {
        title: "Freelancing & Agency Launch",
        duration: "1 Weeks",
        topics: [
          "Fiverr, Upwork & Gig SEO",
          "Client Hunting & Proposals",
          "Personal Branding Framework",
          "Agency Launch & Shopify E-com"
        ]
      }
    ],
    instructors: [
      { name: "Ali Hassan", role: "Lead Marketing Mentor", company: "HDS Training", avatar: "/instructors/hassan.jpg" }
    ],
    outcomes: [
      "Launch profitable Meta ad campaigns and scale budgets",
      "Create high-converting AI content and ad copy",
      "Acquire high-ticket international and local clients",
      "Establish a personal brand or digital marketing agency"
    ],
    certification: "Government Verified Certificate",
    prerequisites: ["No marketing experience required", "Laptop with internet connection"]
}
,
{
    id: "fsd-001",
    isAvailable: true,
    title: "Artificial Intelligence Mastery Program",
    slug: "artificial-intelligence-mastery-program",
    description: "Master real-world AI applications, prompt engineering, AI content systems, automation, vibe coding, and personal branding to launch your tech career.",
    shortDesc: "Complete AI & Automation Mastery",
    fullDescription: "This comprehensive program takes you from AI basics to an advanced practitioner. You will master prompt engineering, AI content and video creation, AI-assisted programming (vibe coding), automation workflows, smart AI agents, and personal branding. Build powerful AI tools and learn how to secure high-ticket clients.",
    icon: Code2,
    category: "Development",
    level: "Beginner",
    duration: "4 Weeks",
    weeks: 4,
    hours: 240,
    price: 99,
    originalPrice: 50000,
    rating: 4.9,
    students: 3420,
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    borderColor: "border-blue-200 dark:border-blue-800",
    gradient: "from-blue-600 via-blue-500 to-sky-500",
    features: [
      "240+ Hours of Content",
      "Real-World AI Automation Projects",
      "AI Video & Content Portfolio",
      "Vibe Coding App Projects",
      "Lifetime Access",
      "Community Support"
    ],
    modules: [
      {
        title: "AI Foundation & Prompt Engineering",
        duration: "4 Weeks",
        topics: ["AI Foundations & Assistants", "Advanced Prompting Frameworks", "Copywriting & Optimization", "Reusable Prompt Templates"]
      },
      {
        title: "AI Content Creation & Video Production",
        duration: "4 Weeks",
        topics: ["AI Image & Brand Design", "Viral Instagram Reels", "Cinematic Video (Kling AI)", "Motion Graphics (Runway ML)"]
      },
      {
        title: "AI Programming, Vibe Coding & Automation",
        duration: "4 Weeks",
        topics: ["No-Code & Vibe Coding", "Website Creation (Lovable)", "Google Flow Workflows", "Task Automation Systems"]
      },
      {
        title: "AI Agents & Personal Branding",
        duration: "4 Weeks",
        topics: ["Smart AI Agents & Chatbots", "Niche & Profile Optimization", "AI Lead Gen & Client Closing", "Authority Building Framework"]
      }
    ],
    instructors: [
      { name: "Ahmed Hassan", role: "Senior Engineer", company: "Google", avatar: "/instructors/ahmed.jpg" },
      { name: "Sarah Khan", role: "Tech Lead", company: "Microsoft", avatar: "/instructors/sarah.jpg" }
    ],
    outcomes: [
      "Build and deploy AI automation systems",
      "Create high-quality AI videos and designs",
      "Develop websites and tools using Vibe Coding",
      "Acquire high-ticket clients via personal branding"
    ],
    certification: "HDS Certified AI Mastery Professional",
    prerequisites: ["Basic computer skills", "No coding experience needed"]
},

  
  {
    id: "seo-003",
    isAvailable: true,
    title: "Crypto Trading Mastery",
    slug: "hads-crypto-trading-mentorship",
    description: "Master Crypto Trading from scratch. Learn advanced Price Action, simplified Smart Money Concepts (SMC), and live execution in a 30-day roadmap.",
    shortDesc: "30 Days Crypto Trading Roadmap",
    fullDescription: "Go from zero to an active, disciplined crypto trader in 30 days. Master spot & futures trading, advanced Price Action, simplified Smart Money Concepts (SMC), and strict risk management frameworks. Packed with action-oriented live market execution, strategy backtesting, and psychology conditioning.",
    icon: Search,
    category: "Finance",
    level: "All Levels",
    duration: "4 Weeks",
    weeks: 4,
    hours: 40,
    price: 99,
    originalPrice: 25000,
    rating: 4.9,
    students: 1920,
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    gradient: "from-emerald-600 via-teal-500 to-cyan-500",
    features: [
      "30 Days Action-Backed Roadmap",
      "Simplified SMC Execution",
      "Live Daily Market Analysis",
      "Risk Management Blueprint",
      "Trading Psychology System",
      "Strategy Backtesting Practice"
    ],
    modules: [
      {
        title: "Trading Kickstart & Chart Mastery",
        duration: "1 Weeks",
        topics: [
          "Crypto Basics & Exchange Setup",
          "TradingView Practical Setup",
          "Candlestick Psychology Secrets",
          "Spot vs Futures & Order Types"
        ]
      },
      {
        title: "Technical Analysis Core & Trends",
        duration: "1 Weeks",
        topics: [
          "Support, Resistance & Volume Analysis",
          "Bullish, Bearish & Sideways Trends",
          "Market Structure & Trendlines",
          "RSI, MACD & Moving Averages"
        ]
      },
      {
        title: "Price Action & Simplified SMC",
        duration: "1 Weeks",
        topics: [
          "Liquidity & Stop Hunt Reality",
          "Order Blocks & Demand/Supply Zones",
          "BOS, CHOCH & Fair Value Gaps",
          "Inducement & Fake Breakouts"
        ]
      },
      {
        title: "Risk, Psychology & Live Execution",
        duration: "1 Weeks",
        topics: [
          "Risk Per Trade & Position Sizing",
          "Fear, Greed & Trading Journal",
          "Confluence Strategy & Backtesting",
          "Live Market Entry & Demo Shift"
        ]
      }
    ],
    instructors: [
      { name: "Ali Hassan", role: "Crypto Analyst", company: "HDS Training", avatar: "/instructors/zain.jpg" }
    ],
    outcomes: [
      "Analyze crypto charts independently",
      "Execute profitable Spot and Futures trades",
      "Apply Smart Money Concepts confidently",
      "Manage risk and control trading emotions"
    ],
    certification: "HDS Certified Crypto Trader",
    prerequisites: ["Basic smartphone or computer skills", "Internet connection and learning mindset"]
},




  {
    id: "ux-004",
    isAvailable:false,
    title: "UI/UX Design Professional",
    slug: "ui-ux-design-professional",
    description: "Create stunning, user-centered designs. Master Figma, design systems, and user research to build exceptional digital experiences.",
    shortDesc: "Design beautiful interfaces",
    fullDescription: "From wireframes to high-fidelity prototypes, learn the complete design process. Master Figma, build design systems, conduct user research, and create a portfolio that gets you hired at top companies.",
    icon: Palette,
    category: "Design",
    level: "Beginner",
    duration: "14 Weeks",
    weeks: 14,
    hours: 210,
    price: 1799,
    originalPrice: 2299,
    rating: 4.9,
    students: 2150,
    color: "text-rose-600",
    bgColor: "bg-rose-600/10",
    borderColor: "border-rose-200 dark:border-rose-800",
    gradient: "from-rose-600 via-pink-500 to-orange-500",
    features: [
      "210+ Hours of Content",
      "10 Portfolio Projects",
      "Figma Mastery",
      "Design System Training",
      "User Research Methods",
      "Interview Preparation"
    ],
    modules: [
      {
        title: "Design Foundations",
        duration: "3.5 Weeks",
        topics: ["Design Principles", "Color Theory", "Typography", "Layout & Grid"]
      },
      {
        title: "UI Design",
        duration: "3.5 Weeks",
        topics: ["Figma Basics", "Components", "Auto Layout", "Prototyping"]
      },
      {
        title: "UX Research",
        duration: "3.5 Weeks",
        topics: ["User Interviews", "Personas", "Journey Maps", "Usability Testing"]
      },
      {
        title: "Advanced & Career",
        duration: "3.5 Weeks",
        topics: ["Design Systems", "Handoff", "Portfolio", "Job Search"]
      }
    ],
    instructors: [
      { name: "Nadia Hussain", role: "Principal Designer", company: "Systems Limited", avatar: "/instructors/nadia.jpg" },
      { name: "Bilal Ahmed", role: "UX Lead", company: "NetSol", avatar: "/instructors/bilal.jpg" }
    ],
    outcomes: [
      "Design complete products",
      "Build scalable design systems",
      "Conduct user research",
      "Land UX designer roles"
    ],
    certification: "HDS Certified UI/UX Designer",
    prerequisites: ["Creative mindset", "No design experience needed"]
  },
  {
    id: "mob-005",
    isAvailable:false,
    title: "Mobile App Development",
    slug: "mobile-app-development",
    description: "Build native and cross-platform mobile apps. Learn React Native and Flutter to create apps for iOS and Android.",
    shortDesc: "iOS & Android apps",
    fullDescription: "Master mobile development with React Native and Flutter. Build 4 complete apps, learn app store deployment, and understand mobile UX patterns. Graduate with apps in your portfolio.",
    icon: Smartphone,
    category: "Development",
    level: "Intermediate",
    duration: "16 Weeks",
    weeks: 16,
    hours: 240,
    price: 2199,
    originalPrice: 2799,
    rating: 4.8,
    students: 1680,
    color: "text-amber-600",
    bgColor: "bg-amber-600/10",
    borderColor: "border-amber-200 dark:border-amber-800",
    gradient: "from-amber-600 via-orange-500 to-red-500",
    features: [
      "240+ Hours of Content",
      "4 Complete Apps",
      "iOS & Android",
      "App Store Publishing",
      "Push Notifications",
      "Mobile Backend"
    ],
    modules: [
      {
        title: "React Native Basics",
        duration: "4 Weeks",
        topics: ["React Native Setup", "Components", "Navigation", "State Management"]
      },
      {
        title: "Flutter Fundamentals",
        duration: "4 Weeks",
        topics: ["Dart Language", "Widgets", "Flutter Flow", "State Management"]
      },
      {
        title: "Native Features",
        duration: "4 Weeks",
        topics: ["Camera & GPS", "Push Notifications", "Local Storage", "APIs"]
      },
      {
        title: "Deployment & Career",
        duration: "4 Weeks",
        topics: ["App Store", "Play Store", "Analytics", "Monetization"]
      }
    ],
    instructors: [
      { name: "Usman Ghani", role: "Mobile Lead", company: "Foodpanda", avatar: "/instructors/usman.jpg" },
      { name: "Rabia Sheikh", role: "iOS Developer", company: "Apple", avatar: "/instructors/rabia.jpg" }
    ],
    outcomes: [
      "Build cross-platform apps",
      "Publish to app stores",
      "Implement native features",
      "Work as mobile developer"
    ],
    certification: "HDS Certified Mobile Developer",
    prerequisites: ["JavaScript basics", "React fundamentals"]
  },
  {
    id: "ds-006",
    isAvailable:false,
    title: "Data Science & Analytics",
    slug: "data-science-analytics",
    description: "Master data analysis, visualization, and machine learning. Learn Python, SQL, and modern analytics tools.",
    shortDesc: "Data-driven decisions",
    fullDescription: "From data cleaning to predictive modeling, learn the complete data science workflow. Master Python, SQL, Tableau, and machine learning basics. Work on real datasets and build a portfolio of data projects.",
    icon: BarChart3,
    category: "Data",
    level: "Beginner",
    duration: "20 Weeks",
    weeks: 20,
    hours: 300,
    price: 2499,
    originalPrice: 3199,
    rating: 4.9,
    students: 1450,
    color: "text-cyan-600",
    bgColor: "bg-cyan-600/10",
    borderColor: "border-cyan-200 dark:border-cyan-800",
    gradient: "from-cyan-600 via-blue-500 to-indigo-500",
    features: [
      "300+ Hours of Content",
      "Real Dataset Projects",
      "Python & SQL Mastery",
      "Machine Learning Intro",
      "Tableau Certification",
      "Career Coaching"
    ],
    modules: [
      {
        title: "Python Fundamentals",
        duration: "5 Weeks",
        topics: ["Python Basics", "Pandas", "NumPy", "Data Cleaning"]
      },
      {
        title: "Data Analysis",
        duration: "5 Weeks",
        topics: ["SQL", "Statistical Analysis", "A/B Testing", "Data Visualization"]
      },
      {
        title: "Machine Learning",
        duration: "5 Weeks",
        topics: ["Scikit-Learn", "Regression", "Classification", "Clustering"]
      },
      {
        title: "Advanced & Career",
        duration: "5 Weeks",
        topics: ["Deep Learning Intro", "Tableau", "Big Data", "Job Prep"]
      }
    ],
    instructors: [
      { name: "Dr. Kamran Ali", role: "Data Scientist", company: "Telenor", avatar: "/instructors/kamran.jpg" },
      { name: "Sana Mirza", role: "Analytics Lead", company: "Jazz", avatar: "/instructors/sana.jpg" }
    ],
    outcomes: [
      "Analyze complex datasets",
      "Build predictive models",
      "Create data dashboards",
      "Get hired as data analyst"
    ],
    certification: "HDS Certified Data Scientist",
    prerequisites: ["Basic math skills", "No coding required"]
  },
  {
    id: "dev-007",
    isAvailable:false,
    title: "Cloud & DevOps Engineering",
    slug: "cloud-devops-engineering",
    description: "Learn cloud infrastructure, CI/CD, and modern DevOps. Master AWS, Docker, Kubernetes, and infrastructure as code.",
    shortDesc: "Cloud infrastructure mastery",
    fullDescription: "Master the tools that power modern tech companies. Learn AWS services, containerization with Docker, orchestration with Kubernetes, and automation with Terraform. Build production-ready infrastructure.",
    icon: Cloud,
    category: "Development",
    level: "Intermediate",
    duration: "18 Weeks",
    weeks: 18,
    hours: 270,
    price: 2299,
    originalPrice: 2899,
    rating: 4.8,
    students: 980,
    color: "text-sky-600",
    bgColor: "bg-sky-600/10",
    borderColor: "border-sky-200 dark:border-sky-800",
    gradient: "from-sky-600 via-blue-500 to-indigo-500",
    features: [
      "270+ Hours of Content",
      "AWS Certification Prep",
      "Docker & Kubernetes",
      "CI/CD Pipelines",
      "Infrastructure as Code",
      "Monitoring & Logging"
    ],
    modules: [
      {
        title: "AWS Fundamentals",
        duration: "4.5 Weeks",
        topics: ["EC2 & S3", "VPC & Networking", "IAM & Security", "RDS & DynamoDB"]
      },
      {
        title: "Containerization",
        duration: "4.5 Weeks",
        topics: ["Docker", "Docker Compose", "Kubernetes", "Helm Charts"]
      },
      {
        title: "CI/CD & Automation",
        duration: "4.5 Weeks",
        topics: ["Jenkins", "GitHub Actions", "Terraform", "Ansible"]
      },
      {
        title: "Advanced DevOps",
        duration: "4.5 Weeks",
        topics: ["Monitoring", "Logging", "Security", "Career Prep"]
      }
    ],
    instructors: [
      { name: "Tariq Jameel", role: "DevOps Architect", company: "10Pearls", avatar: "/instructors/tariq.jpg" },
      { name: "Hina Aslam", role: "SRE Lead", company: "Afiniti", avatar: "/instructors/hina.jpg" }
    ],
    outcomes: [
      "Deploy cloud infrastructure",
      "Build CI/CD pipelines",
      "Manage containers at scale",
      "Land DevOps engineer role"
    ],
    certification: "HDS Certified DevOps Engineer",
    prerequisites: ["Basic Linux", "Command line familiarity"]
  },
  {
    id: "sec-008",
    isAvailable:false,
    title: "Cybersecurity Fundamentals",
    slug: "cybersecurity-fundamentals",
    description: "Protect digital assets with cybersecurity skills. Learn ethical hacking, network security, and risk management.",
    shortDesc: "Secure digital assets",
    fullDescription: "Learn to think like a hacker to protect systems. Master network security, ethical hacking, vulnerability assessment, and security compliance. Prepare for CompTIA Security+ certification.",
    icon: Shield,
    category: "Security",
    level: "Beginner",
    duration: "16 Weeks",
    weeks: 16,
    hours: 240,
    price: 2199,
    originalPrice: 2699,
    rating: 4.9,
    students: 1120,
    color: "text-red-600",
    bgColor: "bg-red-600/10",
    borderColor: "border-red-200 dark:border-red-800",
    gradient: "from-red-600 via-rose-500 to-pink-500",
    features: [
      "240+ Hours of Content",
      "Hands-on Labs",
      "Security+ Prep",
      "Capture The Flag",
      "Incident Response",
      "Compliance Training"
    ],
    modules: [
      {
        title: "Security Basics",
        duration: "4 Weeks",
        topics: ["Threat Landscape", "Cryptography", "Access Control", "Network Security"]
      },
      {
        title: "Ethical Hacking",
        duration: "4 Weeks",
        topics: ["Reconnaissance", "Scanning", "Exploitation", "Reporting"]
      },
      {
        title: "Defense & Monitoring",
        duration: "4 Weeks",
        topics: ["Firewalls", "IDS/IPS", "SIEM", "Incident Response"]
      },
      {
        title: "Compliance & Career",
        duration: "4 Weeks",
        topics: ["GDPR", "ISO 27001", "Security+", "Job Search"]
      }
    ],
    instructors: [
      { name: "Major Asad", role: "Security Consultant", company: "NCC", avatar: "/instructors/asad.jpg" },
      { name: "Fariha Noor", role: "SOC Analyst", company: "Bank Alfalah", avatar: "/instructors/fariha.jpg" }
    ],
    outcomes: [
      "Conduct security audits",
      "Perform penetration tests",
      "Implement security controls",
      "Start cybersecurity career"
    ],
    certification: "HDS Certified Cybersecurity Analyst",
    prerequisites: ["Basic IT knowledge", "Problem-solving mindset"]
  },
  {
    id: "ai-009",
    isAvailable:false,
    title: "AI & Machine Learning",
    slug: "ai-machine-learning",
    description: "Build intelligent systems with AI and ML. Learn neural networks, deep learning, and practical AI applications.",
    shortDesc: "Build intelligent systems",
    fullDescription: "From neural networks to NLP, master modern AI techniques. Learn Python, TensorFlow, and PyTorch. Build AI projects including chatbots, image classifiers, and recommendation systems.",
    icon: Cpu,
    category: "Data",
    level: "Intermediate",
    duration: "24 Weeks",
    weeks: 24,
    hours: 360,
    price: 2999,
    originalPrice: 3799,
    rating: 4.9,
    students: 890,
    color: "text-indigo-600",
    bgColor: "bg-indigo-600/10",
    borderColor: "border-indigo-200 dark:border-indigo-800",
    gradient: "from-indigo-600 via-purple-500 to-pink-500",
    features: [
      "360+ Hours of Content",
      "Deep Learning Mastery",
      "NLP & Computer Vision",
      "TensorFlow & PyTorch",
      "AI Project Portfolio",
      "Research Paper Reading"
    ],
    modules: [
      {
        title: "ML Foundations",
        duration: "6 Weeks",
        topics: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Feature Engineering"]
      },
      {
        title: "Deep Learning",
        duration: "6 Weeks",
        topics: ["Neural Networks", "CNNs", "RNNs", "Transfer Learning"]
      },
      {
        title: "Advanced AI",
        duration: "6 Weeks",
        topics: ["NLP", "Transformers", "Computer Vision", "GANs"]
      },
      {
        title: "Production & Career",
        duration: "6 Weeks",
        topics: ["MLOps", "Model Deployment", "Ethics", "AI Jobs"]
      }
    ],
    instructors: [
      { name: "Dr. Aisha Rahman", role: "AI Researcher", company: "FAST", avatar: "/instructors/aisha.jpg" },
      { name: "Hassan Tariq", role: "ML Engineer", company: "Revolut", avatar: "/instructors/hassan.jpg" }
    ],
    outcomes: [
      "Build neural networks",
      "Create AI applications",
      "Understand deep learning",
      "Work as ML engineer"
    ],
    certification: "HDS Certified AI Engineer",
    prerequisites: ["Python programming", "Basic statistics", "Linear algebra basics"]
  },
  {
    id: "ec-010",
    isAvailable:false,
    title: "E-Commerce Mastery",
    slug: "ecommerce-mastery",
    description: "Build and scale profitable online stores. Learn Shopify, dropshipping, and digital product strategies.",
    shortDesc: "Build online stores",
    fullDescription: "From store setup to scaling, learn complete e-commerce. Master Shopify, product sourcing, conversion optimization, and marketing. Launch your own store or manage client stores.",
    icon: ShoppingCart,
    category: "Business",
    level: "Beginner",
    duration: "12 Weeks",
    weeks: 12,
    hours: 180,
    price: 1599,
    originalPrice: 1999,
    rating: 4.7,
    students: 2340,
    color: "text-green-600",
    bgColor: "bg-green-600/10",
    borderColor: "border-green-200 dark:border-green-800",
    gradient: "from-green-600 via-emerald-500 to-teal-500",
    features: [
      "180+ Hours of Content",
      "Store Launch Project",
      "Shopify Mastery",
      "Product Sourcing",
      "Facebook Ads for E-com",
      "Scaling Strategies"
    ],
    modules: [
      {
        title: "Store Setup",
        duration: "3 Weeks",
        topics: ["Shopify Basics", "Theme Customization", "Product Pages", "Checkout Optimization"]
      },
      {
        title: "Products & Inventory",
        duration: "3 Weeks",
        topics: ["Dropshipping", "Private Label", "Inventory Management", "Supplier Relations"]
      },
      {
        title: "Marketing & Sales",
        duration: "3 Weeks",
        topics: ["E-com SEO", "Facebook Ads", "Influencer Marketing", "Email Campaigns"]
      },
      {
        title: "Scaling & Operations",
        duration: "3 Weeks",
        topics: ["Analytics", "A/B Testing", "Customer Service", "Automation"]
      }
    ],
    instructors: [
      { name: "Imran Sheikh", role: "E-com Entrepreneur", company: "Self-made", avatar: "/instructors/imran.jpg" },
      { name: "Alina Kazmi", role: "Shopify Expert", company: "Shopify", avatar: "/instructors/alina.jpg" }
    ],
    outcomes: [
      "Launch profitable store",
      "Source winning products",
      "Run profitable ads",
      "Scale to 6 figures"
    ],
    certification: "HDS Certified E-Commerce Specialist",
    prerequisites: ["No experience needed", "Small investment budget"]
  },
  {
    id: "cc-011",
    isAvailable:false,
    title: "Content Creation & Branding",
    slug: "content-creation-branding",
    description: "Master visual storytelling and brand building. Learn video editing, graphic design, and social media content.",
    shortDesc: "Create viral content",
    fullDescription: "Become a content creator who builds brands. Master video editing, graphic design, social media strategy, and personal branding. Create content that engages and converts.",
    icon: Video,
    category: "Marketing",
    level: "Beginner",
    duration: "10 Weeks",
    weeks: 10,
    hours: 150,
    price: 1299,
    originalPrice: 1599,
    rating: 4.8,
    students: 3120,
    color: "text-fuchsia-600",
    bgColor: "bg-fuchsia-600/10",
    borderColor: "border-fuchsia-200 dark:border-fuchsia-800",
    gradient: "from-fuchsia-600 via-purple-500 to-violet-500",
    features: [
      "150+ Hours of Content",
      "Video Editing Mastery",
      "Canva & Adobe Suite",
      "Social Media Growth",
      "Personal Branding",
      "Monetization Methods"
    ],
    modules: [
      {
        title: "Content Strategy",
        duration: "2.5 Weeks",
        topics: ["Brand Voice", "Content Pillars", "Audience Research", "Competitor Analysis"]
      },
      {
        title: "Video Production",
        duration: "2.5 Weeks",
        topics: ["Scripting", "Filming", "Premiere Pro", "Motion Graphics"]
      },
      {
        title: "Visual Design",
        duration: "2.5 Weeks",
        topics: ["Photoshop", "Illustrator", "Canva", "Brand Identity"]
      },
      {
        title: "Growth & Monetization",
        duration: "2.5 Weeks",
        topics: ["YouTube Growth", "TikTok Strategy", "Sponsorships", "Digital Products"]
      }
    ],
    instructors: [
      { name: "Shahveer Jafry", role: "Content Creator", company: "YouTube", avatar: "/instructors/shahveer.jpg" },
      { name: "Mooroo", role: "Filmmaker", company: "Independent", avatar: "/instructors/mooroo.jpg" }
    ],
    outcomes: [
      "Create professional videos",
      "Design stunning graphics",
      "Grow social following",
      "Monetize your content"
    ],
    certification: "HDS Certified Content Creator",
    prerequisites: ["Smartphone or camera", "Creative mindset"]
  },
  {
    id: "pm-012",
    isAvailable:false,
    title: "Product Management",
    slug: "product-management",
    description: "Lead product development from idea to launch. Learn agile methodologies, strategy, and stakeholder management.",
    shortDesc: "Lead product teams",
    fullDescription: "Master the skills to lead product teams and ship successful products. Learn agile methodologies, user research, roadmap planning, and data-driven decision making.",
    icon: LineChart,
    category: "Business",
    level: "Intermediate",
    duration: "12 Weeks",
    weeks: 12,
    hours: 180,
    price: 1699,
    originalPrice: 2199,
    rating: 4.8,
    students: 1250,
    color: "text-teal-600",
    bgColor: "bg-teal-600/10",
    borderColor: "border-teal-200 dark:border-teal-800",
    gradient: "from-teal-600 via-cyan-500 to-blue-500",
    features: [
      "180+ Hours of Content",
      "Real Product Case Studies",
      "Agile & Scrum Training",
      "Roadmap Mastery",
      "Stakeholder Management",
      "PM Interview Prep"
    ],
    modules: [
      {
        title: "Product Fundamentals",
        duration: "3 Weeks",
        topics: ["Product Lifecycle", "Market Research", "Competitive Analysis", "Value Proposition"]
      },
      {
        title: "Agile Execution",
        duration: "3 Weeks",
        topics: ["Scrum", "Kanban", "Sprint Planning", "User Stories"]
      },
      {
        title: "Strategy & Metrics",
        duration: "3 Weeks",
        topics: ["Product Strategy", "OKRs", "KPIs", "Data Analysis"]
      },
      {
        title: "Leadership & Career",
        duration: "3 Weeks",
        topics: ["Stakeholder Management", "Communication", "Roadmaps", "PM Interviews"]
      }
    ],
    instructors: [
      { name: "Saad Hamid", role: "VP Product", company: "Jazz", avatar: "/instructors/saad.jpg" },
      { name: "Maliha Khan", role: "Product Lead", company: "Careem", avatar: "/instructors/maliha.jpg" }
    ],
    outcomes: [
      "Lead product development",
      "Create product roadmaps",
      "Manage stakeholders",
      "Land PM role"
    ],
    certification: "HDS Certified Product Manager",
    prerequisites: ["Some work experience", "Understanding of tech"]
  }
];

export const categories = [
  { id: "all", label: "All Courses", count: 12 },
  { id: "Development", label: "Development", count: 4 },
  { id: "Design", label: "Design", count: 1 },
  { id: "Marketing", label: "Marketing", count: 3 },
  { id: "Data", label: "Data Science", count: 2 },
  { id: "Business", label: "Business", count: 2 },
  { id: "Security", label: "Security", count: 1 }
] as const;

export const levels = ["Beginner", "Intermediate", "Advanced"] as const;
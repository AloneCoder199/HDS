import { 
  Code2, 
  Megaphone, 
  Search, 
  Palette, 
  Smartphone, 
  Database, 
  Cloud, 
  Shield,
  BarChart3,
  Video,
  PenTool,
  Globe,
  Cpu,
  LineChart,
  ShoppingCart,
  Figma
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  isAvailable: boolean;
  title: string;
  href: string;
  description: string;
  shortDesc: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  gradient: string;
  features: string[];
  stats: {
    value: string;
    label: string;
  }[];
  price: string;
  duration: string;
  level: string;
}

export const servicesData: Service[] = [
  {
    id: "full-stack-development",
    isAvailable : true,
    title: "Full-Stack Development",
    href: "/services/full-stack-development",
    description: "Master modern web development with React, Next.js, Node.js, and databases. Build production-ready applications from scratch to deployment.",
    shortDesc: "Complete web dev mastery",
    icon: Code2,
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    borderColor: "border-blue-200 dark:border-blue-800",
    gradient: "from-blue-600 via-blue-500 to-sky-500",
    features: [
      "React & Next.js Mastery",
      "Node.js Backend Development",
      "Database Design & Management",
      "API Development & Integration",
      "Authentication & Security",
      "Deployment & DevOps"
    ],
    stats: [
      { value: "16", label: "Weeks Program" },
      { value: "240+", label: "Learning Hours" }
    ],
    price: "$1,999",
    duration: "16 Weeks",
    level: "Beginner to Advanced"
  },
  {
    id: "digital-marketing-mastery",
    isAvailable : false,
    title: "Digital Marketing Mastery",
    href: "/services/digital-marketing-mastery",
    description: "Learn data-driven marketing strategies across all channels. From social media to paid advertising, master the skills to drive business growth.",
    shortDesc: "Growth marketing expertise",
    icon: Megaphone,
    color: "text-violet-600",
    bgColor: "bg-violet-600/10",
    borderColor: "border-violet-200 dark:border-violet-800",
    gradient: "from-violet-600 via-purple-500 to-fuchsia-500",
    features: [
      "Social Media Marketing",
      "Google Ads & PPC Mastery",
      "Content Marketing Strategy",
      "Email Marketing Automation",
      "Marketing Analytics",
      "Conversion Optimization"
    ],
    stats: [
      { value: "12", label: "Weeks Program" },
      { value: "180+", label: "Learning Hours" }
    ],
    price: "$1,499",
    duration: "12 Weeks",
    level: "Beginner to Intermediate"
  },
  {
    id: "seo-content-strategy",
    isAvailable : false,
    title: "SEO & Content Strategy",
    href: "/services/seo-content-strategy",
    description: "Dominate search rankings with comprehensive SEO strategies. Learn technical SEO, content optimization, and link building for organic growth.",
    shortDesc: "Rank #1 on search engines",
    icon: Search,
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    gradient: "from-emerald-600 via-teal-500 to-cyan-500",
    features: [
      "Technical SEO Fundamentals",
      "Keyword Research Mastery",
      "On-Page & Off-Page SEO",
      "Content Strategy & Planning",
      "Link Building Techniques",
      "SEO Analytics & Reporting"
    ],
    stats: [
      { value: "10", label: "Weeks Program" },
      { value: "150+", label: "Learning Hours" }
    ],
    price: "$1,299",
    duration: "10 Weeks",
    level: "Beginner to Advanced"
  },
  {
    id: "ui-ux-design-pro",
    isAvailable : false,
    title: "UI/UX Design Pro",
    href: "/services/ui-ux-design-pro",
    description: "Create stunning, user-centered designs that convert. Master Figma, design systems, and user research to build exceptional digital experiences.",
    shortDesc: "Design stunning interfaces",
    icon: Palette,
    color: "text-rose-600",
    bgColor: "bg-rose-600/10",
    borderColor: "border-rose-200 dark:border-rose-800",
    gradient: "from-rose-600 via-pink-500 to-orange-500",
    features: [
      "User Research & Personas",
      "Wireframing & Prototyping",
      "Visual Design Principles",
      "Figma Mastery",
      "Design Systems",
      "Usability Testing"
    ],
    stats: [
      { value: "14", label: "Weeks Program" },
      { value: "210+", label: "Learning Hours" }
    ],
    price: "$1,799",
    duration: "14 Weeks",
    level: "Beginner to Advanced"
  },
  {
    id: "mobile-app-development",
    isAvailable : false,
    title: "Mobile App Development",
    href: "/services/mobile-app-development",
    description: "Build native and cross-platform mobile apps for iOS and Android. Learn React Native and Flutter to create apps that users love.",
    shortDesc: "iOS & Android apps",
    icon: Smartphone,
    color: "text-amber-600",
    bgColor: "bg-amber-600/10",
    borderColor: "border-amber-200 dark:border-amber-800",
    gradient: "from-amber-600 via-orange-500 to-red-500",
    features: [
      "React Native Fundamentals",
      "Flutter Development",
      "iOS & Android Design",
      "App Store Deployment",
      "Push Notifications",
      "Mobile App Analytics"
    ],
    stats: [
      { value: "16", label: "Weeks Program" },
      { value: "240+", label: "Learning Hours" }
    ],
    price: "$2,199",
    duration: "16 Weeks",
    level: "Intermediate"
  },
  {
    id: "data-science-analytics",
    isAvailable : false,
    title: "Data Science & Analytics",
    href: "/services/data-science-analytics",
    description: "Master data analysis, visualization, and machine learning. Learn Python, SQL, and modern analytics tools to drive data-informed decisions.",
    shortDesc: "Data-driven decisions",
    icon: BarChart3,
    color: "text-cyan-600",
    bgColor: "bg-cyan-600/10",
    borderColor: "border-cyan-200 dark:border-cyan-800",
    gradient: "from-cyan-600 via-blue-500 to-indigo-500",
    features: [
      "Python for Data Science",
      "SQL & Database Management",
      "Data Visualization",
      "Statistical Analysis",
      "Machine Learning Basics",
      "Business Intelligence Tools"
    ],
    stats: [
      { value: "20", label: "Weeks Program" },
      { value: "300+", label: "Learning Hours" }
    ],
    price: "$2,499",
    duration: "20 Weeks",
    level: "Beginner to Advanced"
  },
  {
    id: "cloud-devops-engineering",
    isAvailable : false,
    title: "Cloud & DevOps Engineering",
    href: "/services/cloud-devops-engineering",
    description: "Learn cloud infrastructure, CI/CD pipelines, and modern DevOps practices. Master AWS, Docker, Kubernetes, and infrastructure as code.",
    shortDesc: "Cloud infrastructure mastery",
    icon: Cloud,
    color: "text-sky-600",
    bgColor: "bg-sky-600/10",
    borderColor: "border-sky-200 dark:border-sky-800",
    gradient: "from-sky-600 via-blue-500 to-indigo-500",
    features: [
      "AWS Cloud Services",
      "Docker & Containerization",
      "Kubernetes Orchestration",
      "CI/CD Pipelines",
      "Infrastructure as Code",
      "Monitoring & Logging"
    ],
    stats: [
      { value: "18", label: "Weeks Program" },
      { value: "270+", label: "Learning Hours" }
    ],
    price: "$2,299",
    duration: "18 Weeks",
    level: "Intermediate"
  },
  {
    id: "cybersecurity-fundamentals",
    isAvailable : false,
    title: "Cybersecurity Fundamentals",
    href: "/services/cybersecurity-fundamentals",
    description: "Protect digital assets with comprehensive cybersecurity skills. Learn ethical hacking, network security, and risk management.",
    shortDesc: "Secure digital assets",
    icon: Shield,
    color: "text-red-600",
    bgColor: "bg-red-600/10",
    borderColor: "border-red-200 dark:border-red-800",
    gradient: "from-red-600 via-rose-500 to-pink-500",
    features: [
      "Network Security",
      "Ethical Hacking",
      "Security Compliance",
      "Incident Response",
      "Vulnerability Assessment",
      "Security Tools Mastery"
    ],
    stats: [
      { value: "16", label: "Weeks Program" },
      { value: "240+", label: "Learning Hours" }
    ],
    price: "$2,199",
    duration: "16 Weeks",
    level: "Beginner to Intermediate"
  },
  {
    id: "ai-machine-learning",
    isAvailable : false,
    title: "AI & Machine Learning",
    href: "/services/ai-machine-learning",
    description: "Build intelligent systems with AI and ML. Learn neural networks, deep learning, and practical AI applications using Python and TensorFlow.",
    shortDesc: "Build intelligent systems",
    icon: Cpu,
    color: "text-indigo-600",
    bgColor: "bg-indigo-600/10",
    borderColor: "border-indigo-200 dark:border-indigo-800",
    gradient: "from-indigo-600 via-purple-500 to-pink-500",
    features: [
      "Machine Learning Algorithms",
      "Neural Networks & Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
      "TensorFlow & PyTorch",
      "AI Model Deployment"
    ],
    stats: [
      { value: "24", label: "Weeks Program" },
      { value: "360+", label: "Learning Hours" }
    ],
    price: "$2,999",
    duration: "24 Weeks",
    level: "Intermediate to Advanced"
  },
  {
    id: "ecommerce-mastery",
    isAvailable : false,
    title: "E-Commerce Mastery",
    href: "/services/ecommerce-mastery",
    description: "Build and scale profitable online stores. Learn Shopify, WooCommerce, dropshipping, and digital product strategies for e-commerce success.",
    shortDesc: "Build online stores",
    icon: ShoppingCart,
    color: "text-green-600",
    bgColor: "bg-green-600/10",
    borderColor: "border-green-200 dark:border-green-800",
    gradient: "from-green-600 via-emerald-500 to-teal-500",
    features: [
      "Shopify Development",
      "WooCommerce Setup",
      "Product Sourcing",
      "Conversion Optimization",
      "E-commerce Marketing",
      "Payment Integration"
    ],
    stats: [
      { value: "12", label: "Weeks Program" },
      { value: "180+", label: "Learning Hours" }
    ],
    price: "$1,599",
    duration: "12 Weeks",
    level: "Beginner to Intermediate"
  },
  {
    id: "content-creation-branding",
    isAvailable : false,
    title: "Content Creation & Branding",
    href: "/services/content-creation-branding",
    description: "Master visual storytelling and brand building. Learn video editing, graphic design, and social media content that engages and converts.",
    shortDesc: "Create viral content",
    icon: Video,
    color: "text-fuchsia-600",
    bgColor: "bg-fuchsia-600/10",
    borderColor: "border-fuchsia-200 dark:border-fuchsia-800",
    gradient: "from-fuchsia-600 via-purple-500 to-violet-500",
    features: [
      "Video Production & Editing",
      "Graphic Design Mastery",
      "Social Media Strategy",
      "Personal Branding",
      "Content Calendar Planning",
      "Monetization Strategies"
    ],
    stats: [
      { value: "10", label: "Weeks Program" },
      { value: "150+", label: "Learning Hours" }
    ],
    price: "$1,299",
    duration: "10 Weeks",
    level: "Beginner"
  },
  {
    id: "product-management",
    isAvailable : false,
    title: "Product Management",
    href: "/services/product-management",
    description: "Lead product development from idea to launch. Learn agile methodologies, user research, and strategic product planning for tech companies.",
    shortDesc: "Lead product teams",
    icon: LineChart,
    color: "text-teal-600",
    bgColor: "bg-teal-600/10",
    borderColor: "border-teal-200 dark:border-teal-800",
    gradient: "from-teal-600 via-cyan-500 to-blue-500",
    features: [
      "Product Strategy",
      "Agile & Scrum Methodologies",
      "User Research",
      "Roadmap Planning",
      "Stakeholder Management",
      "Product Analytics"
    ],
    stats: [
      { value: "12", label: "Weeks Program" },
      { value: "180+", label: "Learning Hours" }
    ],
    price: "$1,699",
    duration: "12 Weeks",
    level: "Intermediate"
  }
];
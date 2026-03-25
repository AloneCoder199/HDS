// lib/scholarshipData.ts
import { 
  Lightbulb, 
  Rocket, 
  Target, 
  Zap, 
  Sparkles, 
  BarChart3, 
  Users, 
  TrendingUp, 
  Globe,
  LucideIcon 
} from "lucide-react";

export interface ScholarshipModule {
  title: string;
  icon: string; // Icon name as string
  topics: string[];
}

export interface ScholarshipFeature {
  icon: string;
  text: string;
}

// ✅ FIXED: Added eligibility field
export interface Scholarship {
  id: string;
  isAvailable: boolean;
  slug: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  currency: string;
  duration: string;
  level: string;
  mode: string;
  description: string;
  discount: string;
  eligibility: string; // ✅ Yeh add kiya hai
  curriculum: ScholarshipModule[];
  features: ScholarshipFeature[];
}

// Icon mapping helper
export const iconMap: Record<string, LucideIcon> = {
  Lightbulb,
  Rocket,
  Target,
  Zap,
  Sparkles,
  BarChart3,
  Users,
  TrendingUp,
  Globe,
};

export const scholarshipsData: Scholarship[] = [
  {
    id: "Social Media Marketing Mastery",
    isAvailable: true,
    title: "Social Media Marketing Mastery",
    slug: "social-media-marketing-mastery",
    subtitle: "Professional Digital Marketing Certification",
    price: "100",
    originalPrice: "25,000",
    currency: "PKR",
    duration: "4 Weeks Intensive",
    level: "Beginner to Advanced",
    mode: "Online Live + Recordings",
    description: "Master Meta Advertising with AI-powered techniques. Learn Facebook, Instagram, WhatsApp & Messenger marketing with latest Andromeda updates.",
    discount: "93% OFF",
    eligibility: "Open for all students", // ✅ Yeh add kiya hai
    curriculum: [
      {
        title: "Foundation Concepts",
        icon: "Lightbulb",
        topics: [
          "Importance of Meta Ads",
          "Facebook Ads",
          "Instagram Marketing",
          "WhatsApp Marketing",
          "Messenger Marketing",
          "Website Marketing",
          "Shopify Store Marketing"
        ]
      },
      {
        title: "Getting Started",
        icon: "Rocket",
        topics: [
          "Facebook Page Creation",
          "Business Manager Setup",
          "National & International Ad Account Creation",
          "Pixel Integration"
        ]
      },
      {
        title: "Campaign Mastery",
        icon: "Target",
        topics: [
          "Campaign Objectives",
          "Campaign, Ad Set & Ad Level Creation"
        ]
      },
      {
        title: "Advanced Techniques",
        icon: "Zap",
        topics: [
          "Budget Management (Daily & Lifetime)",
          "Budget Schedule",
          "Ads Schedule",
          "Bidding Strategies",
          "Audience Research",
          "Targeting (Location, Age, Gender, Demographics, Interests, Behaviors)",
          "Laser Targeting Strategies",
          "Placements"
        ]
      },
      {
        title: "Creative Excellence",
        icon: "Sparkles",
        topics: [
          "Creative Importance",
          "Ad Copy Production",
          "Creative Production",
          "UGC Content Guidance"
        ]
      },
      {
        title: "Campaign Analysis",
        icon: "BarChart3",
        topics: [
          "Columns Analysis",
          "Breakdown Analysis",
          "Custom Metrics Creation"
        ]
      },
      {
        title: "Audience Optimization",
        icon: "Users",
        topics: [
          "Audience Insights",
          "Saved, Custom & Lookalike Audiences",
          "Retargeting Strategies"
        ]
      },
      {
        title: "Performance Analysis",
        icon: "TrendingUp",
        topics: [
          "Campaign & Ad Set Testing",
          "Audience Testing",
          "Creative Testing",
          "CBO/ABO Strategies",
          "CAP Rule Formula",
          "Marketing Funnel Guidance"
        ]
      },
      {
        title: "Scaling Methods",
        icon: "TrendingUp",
        topics: [
          "Safe Scaling",
          "Aggressive Scaling",
          "Balanced Scaling"
        ]
      },
      {
        title: "Organic Growth",
        icon: "Globe",
        topics: [
          "Marketing Strategies",
          "Tips & Tricks & Tools for Business Scaling"
        ]
      }
    ],
    features: [
      { icon: "Video", text: "Live Interactive Sessions" },
      { icon: "FileText", text: "Study Materials" },
      { icon: "Award", text: "Certificate" },
      { icon: "Smartphone", text: "Mobile Access" },
      { icon: "MessageCircle", text: "Community" },
      { icon: "ShoppingBag", text: "Real Projects" }
    ]
  },
  // Add more scholarships here...
  {
    id: "seo-002",
    isAvailable: false, // ⏳ Coming Soon
    slug: "seo-mastery-pro",
    title: "SEO Mastery Pro",
    subtitle: "Search Engine Optimization Expert",
    price: "199",
    originalPrice: "10,000",
    currency: "PKR",
    duration: "6 Weeks",
    level: "Intermediate",
    mode: "Online Live",
    description: "Dominate Google rankings with advanced SEO strategies.",
    discount: "80% OFF",
    eligibility: "Basic marketing knowledge required", // ✅ Yeh add kiya hai
    curriculum: [
      {
        title: "SEO Basics",
        icon: "Lightbulb",
        topics: ["Keyword Research", "On-Page SEO", "Technical SEO"]
      }
    ],
    features: [
      { icon: "Video", text: "Live Sessions" },
      { icon: "FileText", text: "Resources" }
    ]
  }
];
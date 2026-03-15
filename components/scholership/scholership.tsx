"use client"

import React from 'react';
import { 
  BookOpen, 
  Target, 
  Rocket, 
  Users, 
  BarChart3, 
  TrendingUp, 
  Zap, 
  CheckCircle2,
  ArrowRight,
  Clock,
  Award,
  Video,
  FileText,
  Globe,
  Smartphone,
  ShoppingBag,
  MessageCircle,
  Sparkles,
  Lightbulb,
  Star,
  Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const ScholarshipDetailPage = () => {
  const scholarshipData = {
    title: "Meta Ads Marketing Mastery",
    subtitle: "Professional Digital Marketing Certification",
    price: "99",
    currency: "PKR",
    originalPrice: "15,000",
    duration: "8 Weeks Intensive",
    level: "Beginner to Advanced",
    mode: "Online Live + Recordings",
    description: "Master Meta Advertising with AI-powered techniques. Learn Facebook, Instagram, WhatsApp & Messenger marketing with latest Andromeda updates.",
    curriculum: [
      {
        title: "Foundation Concepts",
        icon: <Lightbulb className="w-5 h-5" />,
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
        icon: <Rocket className="w-5 h-5" />,
        topics: [
          "Facebook Page Creation",
          "Business Manager Setup",
          "National & International Ad Account Creation",
          "Pixel Integration"
        ]
      },
      {
        title: "Campaign Mastery",
        icon: <Target className="w-5 h-5" />,
        topics: [
          "Campaign Objectives",
          "Campaign, Ad Set & Ad Level Creation"
        ]
      },
      {
        title: "Advanced Techniques",
        icon: <Zap className="w-5 h-5" />,
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
        icon: <Sparkles className="w-5 h-5" />,
        topics: [
          "Creative Importance",
          "Ad Copy Production",
          "Creative Production",
          "UGC Content Guidance"
        ]
      },
      {
        title: "Campaign Analysis",
        icon: <BarChart3 className="w-5 h-5" />,
        topics: [
          "Columns Analysis",
          "Breakdown Analysis",
          "Custom Metrics Creation"
        ]
      },
      {
        title: "Audience Optimization",
        icon: <Users className="w-5 h-5" />,
        topics: [
          "Audience Insights",
          "Saved, Custom & Lookalike Audiences",
          "Retargeting Strategies"
        ]
      },
      {
        title: "Performance Analysis",
        icon: <TrendingUp className="w-5 h-5" />,
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
        icon: <TrendingUp className="w-5 h-5" />,
        topics: [
          "Safe Scaling",
          "Aggressive Scaling",
          "Balanced Scaling"
        ]
      },
      {
        title: "Organic Growth",
        icon: <Globe className="w-5 h-5" />,
        topics: [
          "Marketing Strategies",
          "Tips & Tricks & Tools for Business Scaling"
        ]
      }
    ],
    features: [
      { icon: <Video className="w-5 h-5" />, text: "Live Interactive Sessions" },
      { icon: <FileText className="w-5 h-5" />, text: "Study Materials" },
      { icon: <Award className="w-5 h-5" />, text: "Certificate" },
      { icon: <Smartphone className="w-5 h-5" />, text: "Mobile Access" },
      { icon: <MessageCircle className="w-5 h-5" />, text: "Community" },
      { icon: <ShoppingBag className="w-5 h-5" />, text: "Real Projects" }
    ]
  };

  const handleEnroll = () => {
    window.location.href = '/enroll';
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted/50 pt-16 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            
            {/* Badge */}
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-4 py-1.5 text-sm font-semibold">
              <Star className="w-3.5 h-3.5 mr-1" />
              Limited Time Offer
            </Badge>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Meta Ads Marketing
                <span className="block text-[#3495EB]">Mastery Program</span>
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground">
                Professional Digital Marketing Certification with AI-Powered Techniques
              </p>
            </div>

            {/* Price Card */}
            <div className="inline-block bg-card rounded-2xl p-8 border border-border shadow-xl max-w-md w-full">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-lg text-muted-foreground line-through">
                    {scholarshipData.originalPrice} {scholarshipData.currency}
                  </span>
                  <Badge variant="destructive" className="bg-red-100 text-red-600 border-red-200 hover:bg-red-100">
                    93% OFF
                  </Badge>
                </div>
                
                <div className="flex items-baseline justify-center gap-1">
                  <Wallet className="w-6 h-6 text-[#3495EB] mr-2" />
                  <span className="text-5xl font-bold text-[#3495EB]">
                    {scholarshipData.price}
                  </span>
                  <span className="text-xl font-semibold text-muted-foreground">
                    {scholarshipData.currency}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">
                  One-time payment • Lifetime access
                </p>

                <Button 
                  onClick={handleEnroll}
                  size="lg"
                  className="w-full bg-[#3495EB] hover:bg-[#347ce0] text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-[#3495EB]/25 hover:shadow-xl transition-all group"
                >
                  Enroll Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card">
                <Clock className="w-4 h-4 text-[#3495EB]" />
                <span className="font-medium">{scholarshipData.duration}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card">
                <Award className="w-4 h-4 text-[#3495EB]" />
                <span className="font-medium">{scholarshipData.level}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card">
                <Globe className="w-4 h-4 text-[#3495EB]" />
                <span className="font-medium">{scholarshipData.mode}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-[#3495EB]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-[#3495EB]" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">What Will You Learn?</h2>
                <p className="text-muted-foreground">
                  META ADS MARKETING with latest updates like Andromeda and advanced AI techniques
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {scholarshipData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                  <div className="text-[#8B5CF6]">
                    {feature.icon}
                  </div>
                  <span className="font-medium text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Curriculum</h2>
            <p className="text-lg text-muted-foreground">
              10 comprehensive modules to master Meta Advertising
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {scholarshipData.curriculum.map((module, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-muted">
                      <div className="text-[#3495EB]">{module.icon}</div>
                    </div>
                    <CardTitle className="text-lg font-bold">{module.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Separator className="mb-4 bg-border" />
                  <ul className="space-y-2.5">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[#3495EB]/5 border border-[#3495EB]/20 rounded-3xl p-10 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Your Journey Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join professional marketers mastering Meta Ads with AI techniques
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="text-center">
                <span className="text-sm text-muted-foreground line-through block mb-1">
                  {scholarshipData.originalPrice} PKR
                </span>
                <span className="text-4xl font-bold text-[#3495EB]">
                  {scholarshipData.price} PKR
                </span>
              </div>
            </div>

            <Button 
              onClick={handleEnroll}
              size="lg"
              className="bg-[#3495EB] hover:bg-[#347ce0] text-white font-bold px-12 py-6 text-lg rounded-full shadow-lg shadow-[#3495EB]/25 hover:shadow-xl transition-all w-full sm:w-auto"
            >
              Enroll Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <p className="mt-4 text-xs text-muted-foreground">
              Secure payment • Instant access • 30-day guarantee
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ScholarshipDetailPage;
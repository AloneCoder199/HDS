"use client";

import React, { useState } from 'react';
import { 
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ChevronRight,
  Heart,
  Sparkles,
  BadgeCheck,
  ArrowUpRight,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Footer navigation data - LINKS SAME RAHENGE
const footerLinks = {
  courses: {
    title: 'Courses',
    links: [
      { name: 'Web Development', href: '/courses' },
      { name: 'React & Next.js', href: '/courses' },
      { name: 'UI/UX Design', href: '/courses' },
      { name: 'Digital Marketing', href: '/courses' },
      { name: 'Python & Data Science', href: '/courses' },
      { name: 'Mobile Development', href: '/courses' },
    ]
  },
  company: {
    title: 'Company',
    links: [
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Courses', href: '/courses' },
      { name: 'services', href: '/services' },
      { name: 'Founder Story', href: '/founder-story' },
    ]
  },
  support: {
    title: 'Support',
    links: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Student Portal', href: '/login' },
    ]
  },
  legal: {
    title: 'Legal',
    links: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Cookie Policy', href: '/cookies' },
    ]
  }
};

// Social media links with brand colors
const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/HassanDigitalSkills/', color: '#1877F2', bg: 'hover:bg-[#1877F2]/10 hover:border-[#1877F2]/50' },
  { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@HassanDigitalSkills', color: '#FF0000', bg: 'hover:bg-[#FF0000]/10 hover:border-[#FF0000]/50' },
];

// Certification badges
const certifications = [
  { name: 'ISO 9001:2015', icon: BadgeCheck },
  { name: 'PMI Authorized', icon: BadgeCheck },
  { name: 'Microsoft Partner', icon: BadgeCheck },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-[#F9FAFB] dark:bg-[#0B1220] overflow-hidden">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3495EB]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl" />
      </div>

      {/* Top Border with Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3495EB]/50 to-transparent" />

      {/* Main Footer Content */}
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column - Takes 4 columns */}
          <div className="lg:col-span-4 space-y-8">
            {/* Logo with Glow Effect */}
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#3495EB]/30 to-[#8B5CF6]/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3495EB] via-[#347ce0] to-[#8B5CF6] p-[2px] shadow-lg shadow-[#3495EB]/20 group-hover:shadow-[#3495EB]/40 transition-all duration-300">
                  <div className="w-full h-full rounded-[14px] bg-white dark:bg-[#111827] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#3495EB]" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#111827] dark:text-white tracking-tight">HDS</h3>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#6B7280] dark:text-[#9CA3AF]">Hassan Digital Skills</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-[#6B7280] dark:text-[#9CA3AF] text-sm leading-relaxed max-w-sm">
              Empowering the next generation of tech professionals with industry-leading 
              courses, expert mentorship, and guaranteed career support since 2020.
            </p>

            {/* Contact Info - Glass Cards */}
            <div className="space-y-3">
              <a href="mailto:hello@hassandigitalskills.com" 
                 className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#111827]/50 border border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB]/50 hover:shadow-lg hover:shadow-[#3495EB]/10 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3495EB]/10 to-[#8B5CF6]/10 flex items-center justify-center group-hover:from-[#3495EB]/20 group-hover:to-[#8B5CF6]/20 transition-all">
                  <Mail className="w-5 h-5 text-[#3495EB]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">Email</p>
                  <p className="text-sm font-medium text-[#111827] dark:text-white">hello@hassandigitalskills.com</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#3495EB] opacity-0 group-hover:opacity-100 transition-all" />
              </a>

              <a href="tel:+923001234567" 
                 className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#111827]/50 border border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB]/50 hover:shadow-lg hover:shadow-[#3495EB]/10 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3495EB]/10 to-[#8B5CF6]/10 flex items-center justify-center group-hover:from-[#3495EB]/20 group-hover:to-[#8B5CF6]/20 transition-all">
                  <Phone className="w-5 h-5 text-[#3495EB]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">Phone</p>
                  <p className="text-sm font-medium text-[#111827] dark:text-white">+92 327 1543 140</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#3495EB] opacity-0 group-hover:opacity-100 transition-all" />
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#111827]/50 border border-[#E5E7EB] dark:border-[#1F2937]">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3495EB]/10 to-[#8B5CF6]/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#3495EB]" />
                </div>
                <div>
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">Location</p>
                  <p className="text-sm font-medium text-[#111827] dark:text-white">Samundri, Pakistan</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert, idx) => (
                <div key={idx} 
                     className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] text-xs hover:border-[#3495EB]/50 transition-colors">
                  <cert.icon className="w-3.5 h-3.5 text-[#3495EB]" />
                  <span className="text-[#6B7280] dark:text-[#9CA3AF] font-medium">{cert.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links Columns - Takes 5 columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <h4 className="font-semibold text-[#111827] dark:text-white mb-5 text-sm uppercase tracking-wider">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <a 
                        href={link.href}
                        onMouseEnter={() => setHoveredLink(link.name)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="text-sm text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#3495EB] dark:hover:text-[#3495EB] transition-all duration-300 inline-flex items-center gap-1 group"
                      >
                        <span className={cn(
                          "transition-transform duration-300",
                          hoveredLink === link.name ? "translate-x-1" : ""
                        )}>
                          {link.name}
                        </span>
                        <ChevronRight className={cn(
                          "w-3 h-3 transition-all duration-300",
                          hoveredLink === link.name ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                        )} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Column - Takes 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            {/* Newsletter Card - Glass Effect */}
            <div className="relative overflow-hidden rounded-2xl p-6 bg-white dark:bg-[#111827]/80 border border-[#E5E7EB] dark:border-[#1F2937] shadow-lg shadow-[#3495EB]/5">
              {/* Background Glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#3495EB]/20 rounded-full blur-2xl" />
              
              <div className="relative">
                <h4 className="font-semibold text-[#111827] dark:text-white mb-2 flex items-center gap-2">
                  Stay Updated
                  <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                </h4>
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-5">
                  Get the latest courses, free tutorials, and career tips delivered to your inbox.
                </p>

                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pr-12 h-12 bg-[#F9FAFB] dark:bg-[#0B1220] border-[#E5E7EB] dark:border-[#1F2937] focus:border-[#3495EB] focus:ring-[#3495EB]/20 rounded-xl text-sm"
                    />
                    <Button 
                      type="submit"
                      size="icon"
                      className="absolute right-1.5 top-1.5 h-9 w-9 rounded-lg bg-gradient-to-r from-[#3495EB] to-[#347ce0] hover:shadow-lg hover:shadow-[#3495EB]/30 transition-all"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>

                  {isSubscribed && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-[#3495EB]/10 border border-[#3495EB]/20">
                      <BadgeCheck className="w-4 h-4 text-[#3495EB]" />
                      <p className="text-sm text-[#3495EB] font-medium">Thanks for subscribing!</p>
                    </div>
                  )}
                </form>

                <p className="text-xs text-[#9CA3AF] mt-4">
                  No spam, unsubscribe anytime. Read our{' '}
                  <a href="/privacy-policy" className="underline hover:text-[#3495EB] transition-colors">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>

            {/* App Download */}
             <div className="p-6 rounded-2xl bg-gradient-to-br from-[#3495EB]/5 to-[#8B5CF6]/5 border border-[#E5E7EB] dark:border-[#1F2937] relative group overflow-hidden">
      
      {/* 1. Default Content (Jo pehle dikhay ga) */}
      <div className="transition-all duration-500 group-hover:opacity-0 group-hover:scale-95">
        <p className="text-sm font-semibold text-[#111827] dark:text-white mb-4 flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#3495EB]" />
          Download Our App
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button className="pointer-events-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937]">
            <svg className="w-5 h-5 text-[#111827] dark:text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74s1.57-.74 3.06-.74c3.04.04 5.15 2.58 4.79 6.52-.13 1.32-.64 2.52-1.39 3.45zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.32-1.88 4.48-3.74 4.25z"/>
            </svg>
            <span className="text-xs font-medium text-[#111827] dark:text-white">iOS</span>
          </button>
          <button className="pointer-events-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937]">
            <svg className="w-5 h-5 text-[#111827] dark:text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.303 2.303-8.633-8.635z"/>
            </svg>
            <span className="text-xs font-medium text-[#111827] dark:text-white">Android</span>
          </button>
        </div>
      </div>

      {/* 2. Hover Content (Jo mouse lanay par dikhay ga) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#3495EB]/10 dark:bg-[#3495EB]/20 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]">
        <p className="text-[#3495EB] font-bold text-lg animate-pulse">Coming Soon</p>
        <p className="text-[11px] font-medium text-gray-600 dark:text-gray-300 mt-1">
          Handcrafted by <span className="text-[#3495EB]">HDS Team</span>
        </p>
      </div>

    </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Glass Effect */}
      <div className="relative border-t border-[#E5E7EB]/50 dark:border-[#1F2937]/50 bg-white/30 dark:bg-[#0B1220]/30 backdrop-blur-md">
  <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      
      {/* Copyright & Developer Credit - Super Soft Look */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[13px] tracking-tight">
        <span className="text-[#6B7280] dark:text-[#9CA3AF] font-medium">
          © 2026 Hassan Digital Skills
        </span>
        <span className="hidden sm:block w-[1px] h-3 bg-[#E5E7EB] dark:bg-[#1F2937]"></span>
        <div className="flex items-center gap-1.5 group">
          <span className="text-[#9CA3AF] dark:text-[#6B7280]">Developed by</span>
          <a 
            href="https://hassandigitalskills.com" // Apni link dain
            className="text-[#111827] dark:text-white font-semibold hover:text-[#3495EB] transition-colors duration-300 flex items-center gap-1"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#3495EB] animate-pulse" />
            HDS Team
          </a>
        </div>
      </div>

      {/* Social Links - Cleaner & Softer Icons */}
      <div className="flex items-center gap-2.5">
        {socialLinks.map((social, idx) => (
          <a
            key={idx}
            href={social.href}
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center", // Rounded for softer feel
              "text-[#6B7280] dark:text-[#9CA3AF]",
              "bg-transparent hover:bg-white dark:hover:bg-[#111827]",
              "border border-transparent hover:border-[#E5E7EB] dark:hover:border-[#1F2937]",
              "transition-all duration-500 hover:shadow-sm hover:-translate-y-0.5",
              social.bg
            )}
            aria-label={social.name}
          >
            <social.icon className="w-4.5 h-4.5" />
          </a>
        ))}
      </div>

      {/* Language Selector - Minimal Pill Design */}
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-[#111827]/50 border border-[#E5E7EB] dark:border-[#1F2937] text-[12px] font-medium text-[#6B7280] dark:text-[#9CA3AF] hover:bg-white dark:hover:bg-[#111827] transition-all">
        <span className="grayscale-[0.5]">🇵🇰</span>
        <span>PKR</span>
        <ChevronRight className="w-3 h-3 rotate-90 opacity-50" />
      </button>

    </div>
  </div>
</div>

    </footer>
  );
}
'use client';

import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const contactInfo = [
  { 
    icon: Phone, 
    label: 'Phone', 
    value: '+92-300-1234567',
    href: 'tel:+923001234567'
  },
  { 
    icon: Mail, 
    label: 'Email', 
    value: 'info@hassandigitalskills.com',
    href: 'mailto:info@hassandigitalskills.com'
  },
  { 
    icon: MapPin, 
    label: 'Address', 
    value: 'Lahore, Pakistan',
    href: '#'
  },
  { 
    icon: Clock, 
    label: 'Hours', 
    value: 'Mon-Sat: 9AM - 6PM',
    href: '#'
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] bg-white dark:bg-[#0B1220] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3495EB]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8B5CF6]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F9FAFB] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937]">
              <Mail className="w-4 h-4 text-[#3495EB]" />
              <span className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF]">Get In Touch</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] dark:text-white leading-[1.1] tracking-tight">
              Let's Start a{' '}
              <span className="text-[#3495EB]">Conversation</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed max-w-lg">
              Whether you have questions about our courses, need corporate training, 
              or want to partner with us, we're here to help you succeed.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-[#111827] dark:bg-white text-white dark:text-[#111827] hover:bg-[#1F2937] dark:hover:bg-[#F9FAFB] rounded-full px-8 font-semibold"
              >
                <Link href="#contact-form">
                  Send Message
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB] rounded-full px-8 font-semibold"
              >
                <Link href="/courses">
                  View Courses
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Contact Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {contactInfo.map((item, i) => (
              <Card 
                key={i}
                className="group bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB]/30 hover:shadow-lg hover:shadow-[#3495EB]/5 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <Link 
                    href={item.href}
                    className="flex flex-col h-full"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#3495EB]/10 flex items-center justify-center mb-4 group-hover:bg-[#3495EB] transition-colors duration-300">
                      <item.icon className="w-6 h-6 text-[#3495EB] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="text-sm text-[#9CA3AF] mb-1">{item.label}</div>
                    <div className="font-semibold text-[#111827] dark:text-white group-hover:text-[#3495EB] transition-colors">
                      {item.value}
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
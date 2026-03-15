// app/not-found.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Home, 
  Search,
  Compass,
  Zap,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#0B1220] flex items-center justify-center relative overflow-hidden">
      
      {/* Professional SaaS Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary Gradient Orb */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#3495EB]/5 rounded-full blur-[120px]" />
        
        {/* Secondary Gradient Orb */}
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#8B5CF6]/5 rounded-full blur-[100px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1F2937_1px,transparent_1px),linear-gradient(to_bottom,#1F2937_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.02]" />
        
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} 
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        
        {/* Animated 404 Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="relative inline-block">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-[#3495EB]/20 rounded-full blur-3xl scale-150" />
            
            {/* Main 404 Circle */}
            <div className="relative w-40 h-40 md:w-52 md:h-52 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3495EB] to-[#8B5CF6] rounded-3xl rotate-12 opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#3495EB] to-[#8B5CF6] rounded-3xl -rotate-6 opacity-10" />
              
              <div className="relative w-full h-full bg-[#F9FAFB] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] rounded-3xl flex items-center justify-center shadow-2xl shadow-[#3495EB]/10">
                <div className="text-center">
                  <span className="text-6xl md:text-8xl font-bold bg-gradient-to-br from-[#3495EB] to-[#8B5CF6] bg-clip-text text-transparent">
                    404
                  </span>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-[#FFFFFF] dark:bg-[#0B1220] border border-[#E5E7EB] dark:border-[#1F2937] rounded-xl flex items-center justify-center shadow-lg"
              >
                <Zap className="w-6 h-6 text-[#3495EB]" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#FFFFFF] dark:bg-[#0B1220] border border-[#E5E7EB] dark:border-[#1F2937] rounded-xl flex items-center justify-center shadow-lg"
              >
                <Compass className="w-6 h-6 text-[#8B5CF6]" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#111827] dark:text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] max-w-md mx-auto leading-relaxed">
            Oops! Looks like you've ventured into uncharted territory. The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="h-14 px-8 rounded-xl bg-[#3495EB] hover:bg-[#347ce0] text-white font-semibold text-base transition-all hover:shadow-xl hover:shadow-[#3495EB]/25 border-0 w-full sm:w-auto"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-14 px-8 rounded-xl border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB] hover:text-[#3495EB] bg-transparent font-semibold text-base transition-all hover:bg-[#3495EB]/5 w-full sm:w-auto"
          >
            <Link href="/courses" className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Explore Courses
            </Link>
          </Button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-[#E5E7EB] dark:border-[#1F2937]"
        >
          <p className="text-sm text-[#9CA3AF] mb-4">Popular destinations</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'Courses', href: '/courses' },
              { label: 'Services', href: '/services' },
              { label: 'Scholarships', href: '/scholarships' },
              { label: 'Contact', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-full bg-[#F9FAFB] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] text-sm text-[#6B7280] dark:text-[#9CA3AF] hover:border-[#3495EB]/50 hover:text-[#3495EB] transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* HDS Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F9FAFB] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937]">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF]">
              Hassan Digital Skills
            </span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
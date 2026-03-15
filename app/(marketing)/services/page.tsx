"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Clock,
  TrendingUp,
  ArrowUpRight,
  Lock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { servicesData } from "@/lib/servisesData";
import Link from "next/link";

export default function ServicesPage() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <main className="relative min-h-screen bg-[#FFFFFF] dark:bg-[#0B1220] overflow-hidden pt-10 bottom-5">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#3495EB]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#11182703_1px,transparent_1px),linear-gradient(to_bottom,#11182703_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)]" />
      </div>

      <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 lg:mb-24"
        >
          <Badge className="mb-6 px-4 py-2 text-sm font-semibold bg-[#3495EB]/10 dark:bg-[#3495EB]/15 text-[#347ce0] dark:text-[#3495EB] border border-[#3495EB]/20 dark:border-[#3495EB]/30 backdrop-blur-sm rounded-full inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            What We Offer
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-[#111827] dark:text-white mb-6">
            Services That Drive{" "}
            <span className="text-[#3495EB]">
              Results
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-[#111827]/70 dark:text-white/70 max-w-2xl mx-auto leading-relaxed">
            Comprehensive digital solutions tailored to accelerate your growth and transform your business.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 rounded-3xl bg-[#F9FAFB] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] mb-7">
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-2">
                Need a Custom Solution?
              </h3>
              <p className="text-[#111827]/70 dark:text-white/70">
                Let's discuss your unique requirements.
              </p>
            </div>
            <Link href="/contact">
              <button className="group px-8 py-4 bg-[#3495EB] hover:bg-[#347ce0] text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-[#3495EB]/25 flex items-center gap-2 whitespace-nowrap hover:cursor-pointer">
                Contact Team
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

// Service Card Component
function ServiceCard({ 
  service, 
  index,
  isInView 
}: { 
  service: typeof servicesData[0]; 
  index: number;
  isInView: boolean;
}) {
  const Icon = service.icon;
  const isAvailable = service.isAvailable;
  
  const CardWrapper = (isAvailable ? Link : 'div') as any;
  const cardProps = isAvailable ? { href: service.href } : {};
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <CardWrapper {...cardProps} className="block h-full">
        <div className={`group relative h-full p-6 lg:p-8 rounded-3xl bg-[#F9FAFB] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] overflow-hidden transition-all duration-500 ${
          isAvailable 
            ? 'hover:border-[#3495EB]/50 hover:shadow-xl hover:shadow-[#3495EB]/5 cursor-pointer' 
            : 'opacity-75 cursor-not-allowed'
        }`}>
          
          {/* Top Border Accent - Only for available */}
          {isAvailable && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#3495EB] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          )}

          {/* Coming Soon Badge */}
          {!isAvailable && (
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-[#111827]/80 dark:bg-black/80 text-white border-0 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                <Lock className="w-3 h-3 mr-1" />
                Coming Soon
              </Badge>
            </div>
          )}

          {/* Icon */}
          <div className={`relative w-14 h-14 rounded-2xl ${service.bgColor} flex items-center justify-center mb-6 ${isAvailable ? 'group-hover:scale-110' : ''} transition-transform duration-300`}>
            <Icon className={`w-7 h-7 ${service.color}`} />
          </div>

          {/* Content */}
          <div className="relative">
            <h3 className={`text-xl font-bold text-[#111827] dark:text-white mb-2 transition-all duration-300 ${
              isAvailable ? 'group-hover:text-[#3495EB]' : ''
            }`}>
              {service.title}
            </h3>
            
            <p className="text-[#111827]/60 dark:text-white/60 mb-6 line-clamp-2">
              {service.shortDesc}
            </p>

            {/* Features Preview */}
            <div className="space-y-2 mb-6">
              {service.features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-[#111827]/50 dark:text-white/50">
                  <CheckCircle2 className={`w-4 h-4 ${service.color} flex-shrink-0`} />
                  <span className="truncate">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-4 mb-6 pt-4 border-t border-[#E5E7EB] dark:border-[#1F2937]">
              {service.stats.map((stat, idx) => (
                <div key={idx} className="flex-1">
                  <div className={`text-lg font-bold ${service.color}`}>{stat.value}</div>
                  <div className="text-xs text-[#111827]/50 dark:text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between">
              <div>
                {isAvailable ? (
                  <>
                    <div className="text-xs text-[#111827]/40 dark:text-white/40 mb-1">Starting from</div>
                    <div className="text-lg font-bold text-[#111827] dark:text-white">{service.price}</div>
                  </>
                ) : (
                  <div className="text-sm font-medium text-[#111827]/50 dark:text-white/50 italic">Not available</div>
                )}
              </div>
              
              {isAvailable ? (
                <div className={`w-12 h-12 rounded-xl ${service.bgColor} flex items-center justify-center group-hover:bg-[#3495EB] transition-all duration-300`}>
                  <ArrowUpRight className={`w-5 h-5 ${service.color} group-hover:text-white transition-colors duration-300`} />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-xl bg-[#E5E7EB] dark:bg-[#1F2937] flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#111827]/30 dark:text-white/30" />
                </div>
              )}
            </div>
          </div>
        </div>
      </CardWrapper>
    </motion.div>
  );
}
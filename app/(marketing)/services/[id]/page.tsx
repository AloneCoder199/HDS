"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Shield,
  Award,
  Users,
  ArrowRight,
  Sparkles,
  PlayCircle,
  Download
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { servicesData } from "@/lib/servisesData";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ServiceDetailPage() {
  const params = useParams();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const service = servicesData.find(s => s.id === params.id);
  
  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <main className="relative min-h-screen bg-white dark:bg-slate-950 overflow-hidden top-3">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-bl ${service.gradient} opacity-5 dark:opacity-10 rounded-full blur-[150px]`} />
      </div>

      <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bottom-10">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge className={`mb-6 px-4 py-2 text-sm font-semibold ${service.bgColor} ${service.color} border ${service.borderColor} rounded-full inline-flex items-center gap-2`}>
              <Sparkles className="w-4 h-4" />
              Premium Service
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
              {service.title}
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              {service.description}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${service.bgColor} flex items-center justify-center`}>
                  <Clock className={`w-6 h-6 ${service.color}`} />
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-500">Duration</div>
                  <div className="font-semibold text-slate-900 dark:text-white">{service.duration}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${service.bgColor} flex items-center justify-center`}>
                  <TrendingUp className={`w-6 h-6 ${service.color}`} />
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-500">Starting Price</div>
                  <div className="font-semibold text-slate-900 dark:text-white">{service.price}</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
              
              <Button 
                size="lg"
                className={`bg-linear-to-r ${service.gradient} text-white border-0  hover:cursor-pointer hover:opacity-90 transition-opacity px-8 py-6 text-lg rounded-xl`}
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              </Link>
              
              
              {/* <Button 
                variant="outline" 
                size="lg"
                className="border-slate-300 dark:border-slate-700 px-8 py-6 text-lg rounded-xl"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                Watch Demo
              </Button> */}
            </div>
          </motion.div>

          {/* Right Card - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${service.gradient} text-white overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:40px_40px]" />
              </div>
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Why Choose Us?</h3>
                    <p className="text-white/80">Proven results</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {service.stats.map((stat, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                      <div className="text-3xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-white/80">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">
            What's Included
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                className="group p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl ${service.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <CheckCircle2 className={`w-5 h-5 ${service.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {feature}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {[
            { icon: Shield, label: "Money-Back Guarantee", desc: "30-day refund policy" },
            { icon: Award, label: "Certified Experts", desc: "Industry professionals" },
            { icon: Users, label: "24/7 Support", desc: "Always available" },
            { icon: TrendingUp, label: "Results Driven", desc: "Performance focused" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className={`w-10 h-10 rounded-lg ${service.bgColor} flex items-center justify-center flex-shrink-0`}>
                <item.icon className={`w-5 h-5 ${service.color}`} />
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white text-sm">{item.label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-500">{item.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center p-12 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            Join hundreds of satisfied clients who have transformed their business with our {service.title.toLowerCase()} services.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
            <Button 
              size="lg"
              className={`bg-linear-to-r ${service.gradient} text-white border-0 hover:cursor-pointer hover:opacity-90 px-8 py-6 text-lg rounded-xl`}
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            </Link>
            
            
           
          </div>
        </motion.div>
      </div>
    </main>
  );
}
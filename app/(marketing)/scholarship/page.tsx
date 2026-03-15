// app/scholarships/page.tsx
import { scholarshipsData } from '@/lib/scholarshipData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, ArrowRight, Clock, Lock } from 'lucide-react';
import Link from 'next/link';

export default function ScholarshipsPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] dark:bg-[#0B1220] pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 px-4 py-2 text-sm font-semibold bg-[#3495EB]/10 dark:bg-[#3495EB]/15 text-[#347ce0] dark:text-[#3495EB] border border-[#3495EB]/20 dark:border-[#3495EB]/30 backdrop-blur-sm rounded-full inline-flex items-center gap-2">
            <Award className="w-4 h-4" />
            Scholarships Available
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111827] dark:text-white mb-6">
            Exclusive <span className="text-[#3495EB]">Scholarships</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-[#111827]/70 dark:text-white/70 max-w-2xl mx-auto">
            Limited time offers to accelerate your learning journey
          </p>
        </div>

        {/* Scholarships Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarshipsData.map((scholarship) => (
            <div 
              key={scholarship.id}
              className={`group relative bg-[#F9FAFB] dark:bg-[#111827] rounded-3xl border border-[#E5E7EB] dark:border-[#1F2937] p-6 transition-all duration-500 ${
                scholarship.isAvailable 
                  ? 'hover:border-[#3495EB]/50 hover:shadow-xl hover:shadow-[#3495EB]/5' 
                  : 'opacity-75'
              }`}
            >
              {/* Coming Soon Badge */}
              {!scholarship.isAvailable && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-[#111827]/80 dark:bg-black/80 text-white border-0 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                    <Lock className="w-3 h-3 mr-1" />
                    Coming Soon
                  </Badge>
                </div>
              )}

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[#3495EB]/10 flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-[#3495EB]" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-2">
                {scholarship.title}
              </h3>
              
              <p className="text-[#111827]/60 dark:text-white/60 mb-4 line-clamp-2">
                {scholarship.description}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-2 mb-4 text-sm text-[#111827]/50 dark:text-white/50">
                <Clock className="w-4 h-4" />
                {scholarship.duration}
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs text-[#111827]/40 dark:text-white/40 line-through">
                    {scholarship.originalPrice} {scholarship.currency}
                  </span>
                  <div className="text-2xl font-bold text-[#3495EB]">
                    {scholarship.price} {scholarship.currency}
                  </div>
                </div>
                <Badge className="bg-red-100 text-red-600 border-red-200">
                  {scholarship.discount}
                </Badge>
              </div>

              {/* CTA */}
              {scholarship.isAvailable ? (
                <Link href={`/scholarship/${scholarship.slug}`} 
                // scholarship/meta-ads-marketing-mastery
                className="block">
                  <Button className="w-full bg-[#3495EB] hover:bg-[#347ce0] text-white font-semibold py-5 rounded-xl group/btn">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <Button 
                  disabled 
                  className="w-full bg-[#E5E7EB] dark:bg-[#1F2937] text-[#111827]/50 dark:text-white/50 font-semibold py-5 rounded-xl cursor-not-allowed"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Coming Soon
                </Button>
              )}
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
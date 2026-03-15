// app/scholarship/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { scholarshipsData, iconMap } from '@/lib/scholarshipData';
import { 
  Video,
  FileText,
  Award,
  Smartphone,
  MessageCircle,
  ShoppingBag,
  Lightbulb,
  Star,
  Wallet,
  Clock,
  Globe,
  ArrowRight,
  CheckCircle2,
  Zap,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

// Feature icons mapping
const featureIconMap: Record<string, React.ReactNode> = {
  Video: <Video className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  Smartphone: <Smartphone className="w-5 h-5" />,
  MessageCircle: <MessageCircle className="w-5 h-5" />,
  ShoppingBag: <ShoppingBag className="w-5 h-5" />,
};

// ✅ FIXED: Interface for Next.js 15+ async params
interface PageProps {
  params: Promise<{ slug: string }>;
}

// ✅ FIXED: Async component with await params
export default async function ScholarshipDetailPage({ params }: PageProps) {
  // Unwrap params Promise
  const { slug } = await params;
  
  const scholarship = scholarshipsData.find(s => s.slug === slug);

  if (!scholarship) {
    notFound();
  }

  const isAvailable = scholarship.isAvailable;

  return (
    <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#0B1220] text-[#111827] dark:text-white transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#F9FAFB] dark:bg-[#111827] pt-16 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            
            {/* Badge */}
            <Badge className="bg-[#3495EB]/10 text-[#3495EB] border-[#3495EB]/20 hover:bg-[#3495EB]/20 px-4 py-1.5 text-sm font-semibold">
              <Star className="w-3.5 h-3.5 mr-1" />
              {isAvailable ? 'Limited Time Offer' : 'Coming Soon'}
            </Badge>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-[#111827] dark:text-white">
                {scholarship.title}
                <span className="block text-[#3495EB]">Program</span>
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto text-[#111827]/70 dark:text-white/70">
                {scholarship.subtitle}
              </p>
            </div>

            {/* Price Card */}
            <div className="inline-block bg-[#FFFFFF] dark:bg-[#0B1220] rounded-2xl p-8 border border-[#E5E7EB] dark:border-[#1F2937] shadow-xl max-w-md w-full">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-lg text-[#111827]/40 dark:text-white/40 line-through">
                    {scholarship.originalPrice} {scholarship.currency}
                  </span>
                  <Badge className="bg-red-100 text-red-600 border-red-200 hover:bg-red-100">
                    {scholarship.discount}
                  </Badge>
                </div>
                
                <div className="flex items-baseline justify-center gap-1">
                  <Wallet className="w-6 h-6 text-[#3495EB] mr-2" />
                  <span className="text-5xl font-bold text-[#3495EB]">
                    {scholarship.price}
                  </span>
                  <span className="text-xl font-semibold text-[#111827]/50 dark:text-white/50">
                    {scholarship.currency}
                  </span>
                </div>

                <p className="text-sm text-[#111827]/50 dark:text-white/50">
                  {isAvailable ? 'One-time payment • Lifetime access' : 'Not available currently'}
                </p>

                {isAvailable ? (
                  <Link href="/enroll" className="block">
                    <Button 
                      size="lg"
                      className="w-full bg-[#3495EB] hover:bg-[#347ce0] text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-[#3495EB]/25 hover:shadow-xl transition-all group"
                    >
                      Enroll Now
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    disabled
                    size="lg"
                    className="w-full bg-[#E5E7EB] dark:bg-[#1F2937] text-[#111827]/50 dark:text-white/50 font-bold py-6 text-lg rounded-xl cursor-not-allowed"
                  >
                    <Lock className="w-5 h-5 mr-2" />
                    Coming Soon
                  </Button>
                )}
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#E5E7EB] dark:border-[#1F2937] bg-[#FFFFFF] dark:bg-[#0B1220]">
                <Clock className="w-4 h-4 text-[#3495EB]" />
                <span className="font-medium text-[#111827] dark:text-white">{scholarship.duration}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#E5E7EB] dark:border-[#1F2937] bg-[#FFFFFF] dark:bg-[#0B1220]">
                <Award className="w-4 h-4 text-[#3495EB]" />
                <span className="font-medium text-[#111827] dark:text-white">{scholarship.level}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#E5E7EB] dark:border-[#1F2937] bg-[#FFFFFF] dark:bg-[#0B1220]">
                <Globe className="w-4 h-4 text-[#3495EB]" />
                <span className="font-medium text-[#111827] dark:text-white">{scholarship.mode}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F9FAFB] dark:bg-[#111827] rounded-2xl p-8 md:p-12 border border-[#E5E7EB] dark:border-[#1F2937] shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-[#3495EB]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-[#3495EB]" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#111827] dark:text-white">What Will You Learn?</h2>
                <p className="text-[#111827]/70 dark:text-white/70">
                  {scholarship.description}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {scholarship.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#0B1220] border border-[#E5E7EB] dark:border-[#1F2937]">
                  <div className="text-[#8B5CF6]">
                    {featureIconMap[feature.icon] || <Award className="w-5 h-5" />}
                  </div>
                  <span className="font-medium text-sm text-[#111827] dark:text-white">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-[#F9FAFB] dark:bg-[#111827]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#111827] dark:text-white">Complete Curriculum</h2>
            <p className="text-lg text-[#111827]/70 dark:text-white/70">
              {scholarship.curriculum.length} comprehensive modules to master the skills
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {scholarship.curriculum.map((module, index) => {
              const ModuleIcon = iconMap[module.icon] || Lightbulb;
              return (
                <Card key={index} className="bg-[#FFFFFF] dark:bg-[#0B1220] border-[#E5E7EB] dark:border-[#1F2937] hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-[#F9FAFB] dark:bg-[#111827]">
                        <ModuleIcon className="w-5 h-5 text-[#3495EB]" />
                      </div>
                      <CardTitle className="text-lg font-bold text-[#111827] dark:text-white">{module.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Separator className="mb-4 bg-[#E5E7EB] dark:bg-[#1F2937]" />
                    <ul className="space-y-2.5">
                      {module.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-[#111827]/70 dark:text-white/70">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[#3495EB]/5 border border-[#3495EB]/20 rounded-3xl p-10 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#111827] dark:text-white">
              {isAvailable ? 'Start Your Journey Today' : 'Coming Soon'}
            </h2>
            <p className="text-lg text-[#111827]/70 dark:text-white/70 mb-8">
              {isAvailable 
                ? 'Join professionals mastering these skills' 
                : 'This scholarship will be available soon. Stay tuned!'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="text-center">
                <span className="text-sm text-[#111827]/40 dark:text-white/40 line-through block mb-1">
                  {scholarship.originalPrice} {scholarship.currency}
                </span>
                <span className="text-4xl font-bold text-[#3495EB]">
                  {scholarship.price} {scholarship.currency}
                </span>
              </div>
            </div>

            {isAvailable ? (
              <Link href="/enroll">
                <Button 
                  size="lg"
                  className="bg-[#3495EB] hover:bg-[#347ce0] text-white font-bold px-12 py-6 text-lg rounded-full shadow-lg shadow-[#3495EB]/25 hover:shadow-xl transition-all w-full sm:w-auto"
                >
                  Enroll Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Button 
                disabled
                size="lg"
                className="bg-[#E5E7EB] dark:bg-[#1F2937] text-[#111827]/50 dark:text-white/50 font-bold px-12 py-6 text-lg rounded-full cursor-not-allowed w-full sm:w-auto"
              >
                <Lock className="w-5 h-5 mr-2" />
                Coming Soon
              </Button>
            )}
            
            <p className="mt-4 text-xs text-[#111827]/50 dark:text-white/50">
              {isAvailable ? 'Secure payment • Instant access • 30-day guarantee' : 'Notify me when available'}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
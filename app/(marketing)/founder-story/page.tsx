'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  Quote, 
  Calendar, 
  MapPin, 
  Award, 
  Users, 
  TrendingUp, 
  Target,
  Lightbulb,
  Heart,
  ChevronRight,
  Linkedin,
  Twitter,
  Mail,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Timeline data
const journeyMilestones = [
  {
    year: '2018',
    title: 'The Beginning',
    description: 'Started with a single laptop and a vision to bridge the digital skills gap in Pakistan. First batch of 5 students in a small room.',
    icon: Lightbulb,
    stats: '5 Students'
  },
  {
    year: '2019',
    title: 'First Breakthrough',
    description: 'Launched our first professional Web Development course. 50+ students enrolled in the first month. Moved to a proper training facility.',
    icon: Target,
    stats: '50+ Students'
  },
  {
    year: '2020',
    title: 'Digital Transformation',
    description: 'Pandemic pushed us online. Developed our LMS platform. Reached 500+ students nationwide through virtual classes.',
    icon: TrendingUp,
    stats: '500+ Students'
  },
  {
    year: '2021',
    title: 'Industry Partnerships',
    description: 'Partnered with leading tech companies for job placements. Introduced guaranteed internship programs. 100+ successful placements.',
    icon: Award,
    stats: '100+ Jobs'
  },
  {
    year: '2022',
    title: 'Expansion Era',
    description: 'Launched Digital Marketing and UI/UX programs. Opened second campus. Team grew to 25+ professional instructors.',
    icon: Users,
    stats: '3 Campuses'
  },
  {
    year: '2023',
    title: 'National Recognition',
    description: 'Recognized as Top IT Training Institute. 2000+ alumni network. Launched scholarship programs for underprivileged students.',
    icon: Award,
    stats: '2000+ Alumni'
  },
  {
    year: '2024',
    title: 'Global Reach',
    description: 'International students from 5 countries. Advanced AI and Data Science programs. State-of-the-art lab facilities.',
    icon: MapPin,
    stats: '5 Countries'
  },
  {
    year: '2025',
    title: 'Hassan Digital Skills',
    description: 'Rebranded to Hassan Digital Skills. 5000+ successful graduates. 95% employment rate. Leading digital education platform in region.',
    icon: TrendingUp,
    stats: '5000+ Graduates'
  }
];

// Core values
const coreValues = [
  {
    title: 'Excellence',
    description: 'Commitment to delivering world-class education and practical skills that meet industry standards.',
    icon: Target
  },
  {
    title: 'Innovation',
    description: 'Continuously evolving curriculum to match the latest technologies and market demands.',
    icon: Lightbulb
  },
  {
    title: 'Community',
    description: 'Building a supportive network of learners, mentors, and industry professionals.',
    icon: Users
  },
  {
    title: 'Integrity',
    description: 'Transparent practices, honest guidance, and genuine commitment to student success.',
    icon: Heart
  }
];

export default function FounderStoryPage() {
  const [activeVideo, setActiveVideo] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  const scrollToTimeline = () => {
    timelineRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      
      {/* Hero Section */}
      <section className="relative bottom-20 overflow-hidden bg-slate-50 dark:bg-slate-900 mt-15 md:mt-0">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 lg:pb-40">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100">
                  Our Story
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                  From a <span className="text-blue-600 dark:text-blue-400">Dream</span> to Digital <span className="text-blue-600 dark:text-blue-400">Excellence</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                  The journey of Hassan Digital Skills began with a simple belief: quality digital education should be accessible to everyone. This is our story of transformation, impact, and relentless pursuit of excellence.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={scrollToTimeline}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-12 text-base font-semibold group"
                >
                  Explore Our Journey
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                
              </div>

              {/* Quick Stats */}
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">7+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Years of Excellence</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">5000+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Students Trained</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">95%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Founder Image Card */}
            <div className="relative md:top-20 pb-20 md:pb-0">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-2xl shadow-blue-900/10">
                <Image
                  src="/founder.jpeg"
                  alt="Founder - Hassan Digital Skills"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold">Ali Hassan</h3>
                    <p className="text-blue-300 font-medium">Founder & CEO</p>
                    <p className="text-sm text-slate-300 mt-2">Visionary educator and tech entrepreneur with a mission to empower the next generation of digital professionals.</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute hidden md:block -bottom-6 -left-6 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold hidden md:block text-slate-900 dark:text-white">Top Educator</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 hidden md:block">2024 Award</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="w-12 h-12 text-blue-200 dark:text-blue-900 mx-auto mb-6" />
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-medium text-slate-900 dark:text-white leading-relaxed">
            "Education is not just about learning skills; it's about transforming lives. Every student who walks through our doors carries a dream, and it's our responsibility to turn that dream into reality."
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
              <Image
                src="/founder.jpeg"
                alt="Ali Hassan"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="text-left">
              <div className="font-semibold text-slate-900 dark:text-white">Ali Hassan</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Founder, Hassan Digital Skills</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mb-4">Our Journey</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              The Road to <span className="text-blue-600 dark:text-blue-400">Excellence</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              From humble beginnings to becoming a leading digital education platform. Every milestone represents countless hours of dedication and thousands of transformed lives.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 md:-translate-x-1/2" />

            <div className="space-y-12">
              {journeyMilestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const isLeft = index % 2 === 0;
                
                return (
                  <div key={milestone.year} className={cn(
                    "relative flex items-center gap-8 md:gap-0",
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  )}>
                    {/* Content */}
                    <div className={cn(
                      "flex-1 md:w-1/2",
                      isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
                    )}>
                      <div className={cn(
                        "bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow",
                        isLeft ? "md:ml-auto" : "md:mr-auto"
                      )}>
                        <div className={cn(
                          "flex items-center gap-3 mb-3",
                          isLeft ? "md:justify-end" : ""
                        )}>
                          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{milestone.year}</span>
                          <Badge variant="outline" className="text-xs border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
                            {milestone.stats}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{milestone.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>

                    {/* Center Icon */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 border-4 border-white dark:border-slate-900 flex items-center justify-center shadow-lg z-10">
                      <Icon className="w-4 h-4 text-white" />
                    </div>

                    {/* Empty Space for other side */}
                    <div className="hidden md:block flex-1 md:w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">Our Mission</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                Empowering Pakistan's <span className="text-blue-600 dark:text-blue-400">Digital Future</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                At Hassan Digital Skills, we believe that quality education is the foundation of national progress. Our mission is to bridge the gap between academic learning and industry requirements, creating a generation of skilled professionals ready to compete globally.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                We don't just teach skills; we build careers. Every course is designed with industry experts, every instructor is a working professional, and every student gets hands-on experience with real-world projects.
              </p>
              
              <div className="flex gap-4 pt-4">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  Practical Learning
                </div>
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  Industry Mentors
                </div>
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  Job Guarantee
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-8">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 relative">
                    <Image
                      src="/st1.jpg"
                      alt="Classroom"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 relative">
                    <Image
                      src="/st2.jpg"
                      alt="Students"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 relative">
                    <Image
                      src="/st3.jpg"
                      alt="Lab"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 relative">
                    <Image
                      src="/st4.jpg"
                      alt="Graduation"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mb-4">What Drives Us</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Our Core <span className="text-blue-600 dark:text-blue-400">Values</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              These principles guide every decision we make and every student we teach.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value) => {
              const Icon = value.icon;
              return (
                <div 
                  key={value.title}
                  className="group bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{value.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 bg-blue-600 dark:bg-blue-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">5000+</div>
              <div className="text-blue-100 font-medium">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">95%</div>
              <div className="text-blue-100 font-medium">Employment Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100 font-medium">Industry Partners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">25+</div>
              <div className="text-blue-100 font-medium">Expert Instructors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mb-4">Leadership</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Meet the <span className="text-blue-600 dark:text-blue-400">Visionaries</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Led by industry experts who are passionate about education and technology.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Founder Card */}
            <div className="group">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 mb-4">
                <Image
                  src="/founder.jpeg"
                  alt="Ali Hassan"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  <Button size="icon" variant="secondary" className="rounded-full w-10 h-10">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full w-10 h-10">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full w-10 h-10">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ali Hassan</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">Founder & CEO</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Visionary educator with 10+ years in tech industry. Passionate about transforming education in Pakistan.</p>
            </div>

            {/* Co-Founder Card */}
            <div className="group">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 mb-4">
                <Image
                  src="/co-founder.jpg"
                  alt="Co-Founder"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  <Button size="icon" variant="secondary" className="rounded-full w-10 h-10">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full w-10 h-10">
                    <Twitter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Sarah Ahmed</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">Co-Founder & COO</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Operations expert ensuring seamless learning experiences. Former Google PM with an eye for excellence.</p>
            </div>

            {/* CTO Card */}
            <div className="group">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 mb-4">
                <Image
                  src="/emp1.jpg"
                  alt="CTO"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  <Button size="icon" variant="secondary" className="rounded-full w-10 h-10">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full w-10 h-10">
                    <Twitter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Bilal Khan</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">Chief Technology Officer</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Full-stack architect and educator. Building the tech infrastructure for scalable digital education.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Ready to Start Your <span className="text-blue-600 dark:text-blue-400">Journey</span>?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with Hassan Digital Skills. Your success story starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-12 text-base font-semibold group"
            >
              <Link href="/courses">
                Explore Courses
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              asChild
              className="rounded-full px-8 h-12 text-base font-semibold border-slate-300 dark:border-slate-700"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}
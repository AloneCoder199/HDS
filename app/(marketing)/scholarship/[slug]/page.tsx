"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Eligibility data
const eligibilityCriteria = [
  {
    icon: "🎓",
    title: "Students",
    description: "School, college, or university students looking to build real digital skills alongside their studies.",
    color: "#3495EB"
  },
  {
    icon: "💼",
    title: "Job Seekers",
    description: "Individuals searching for online earning opportunities and career advancement in digital fields.",
    color: "#8B5CF6"
  },
  {
    icon: "🏠",
    title: "Housewives",
    description: "Anyone who wants to work from home, manage flexible hours, and generate independent income.",
    color: "#F59E0B"
  },
  {
    icon: "💻",
    title: "Freelancers",
    description: "Those already working online but looking to upgrade skills with AI and modern marketing techniques.",
    color: "#10B981"
  }
];

// Process steps
const processSteps = [
  {
    step: "01",
    icon: "📝",
    title: "Apply for Scholarship",
    description: "Submit your application through the official HDS platform with basic details."
  },
  {
    step: "02",
    icon: "💬",
    title: "Connect on WhatsApp",
    description: "Our team will guide you through next steps and confirm your seat in the upcoming batch."
  },
  {
    step: "03",
    icon: "🎯",
    title: "Program Selection",
    description: "Choose the AI Social Media Marketing mentorship program (1 Month duration)."
  },
  {
    step: "04",
    icon: "💳",
    title: "Pay PKR 100 Registration",
    description: "A small fee to confirm serious applicants — 100% scholarship covers the rest, no hidden charges."
  },
  {
    step: "05",
    icon: "🚀",
    title: "Get Access & Start",
    description: "Join your private WhatsApp group, attend live sessions, and begin your earning journey."
  }
];

// FAQ data
const faqs = [
  {
    question: "Why is only PKR 100 charged?",
    answer: "This small registration fee ensures that only serious and committed students enroll. The actual training worth thousands is provided under a scholarship model. This helps us maintain quality and dedicated support for genuine learners."
  },
  {
    question: "What does the scholarship include?",
    answer: "You get complete access to live mentorship sessions, recorded training videos, practical assignments, 1-month internship opportunity, and a government-verified certificate upon completion."
  },
  {
    question: "What does 'limited seats' mean?",
    answer: "Each batch has limited capacity to maintain quality training and personalized support. Once seats are filled (usually within days), applications close for that month and you have to wait for the next cycle."
  },
  {
    question: "Is this program online or physical?",
    answer: "This is a 100% online mentorship program. You can join from anywhere in Pakistan with just a smartphone or laptop and internet connection."
  },
  {
    question: "Will I be able to earn after this?",
    answer: "The program is designed to give you practical skills, real project experience, and a complete roadmap to start freelancing or earning online. Many students start earning within 30 days of completion."
  }
];

export default function ScholarshipDetailPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B1220]">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-[#F9FAFB] dark:bg-[#111827]">
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #3495EB 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#3495EB]/5 rounded-full blur-3xl -mr-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl -ml-48" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Limited Seats Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-red-600 dark:text-red-400 font-semibold text-sm">
                Applications Open — Limited Seats Every Month
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111827] dark:text-white leading-tight mb-6">
              HDS Scholarship Program{" "}
              <span className="text-[#3495EB]">2026</span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Learn High-Income Digital Skills. Start Earning from Home.
            </p>

            <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Hassan Digital Skills (HDS) offers a scholarship-based mentorship program for students across Pakistan. Get started with just a <span className="font-bold text-[#3495EB]">PKR 100</span> registration fee and unlock a complete system designed to take you from learning to earning.
            </p>

            {/* Registration Fee Highlight */}
            <div className="inline-block bg-white dark:bg-[#0B1220] rounded-2xl p-8 border-2 border-[#3495EB]/20 shadow-xl shadow-[#3495EB]/5 mb-10">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Registration Fee Only</div>
              <div className="text-5xl font-bold text-[#3495EB] mb-2">PKR 100</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Full scholarship covers the rest</div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enroll">
                <Button className="bg-[#3495EB] hover:bg-[#347ce0] text-white px-10 h-14 text-lg font-semibold rounded-lg shadow-lg shadow-[#3495EB]/25 w-full sm:w-auto">
                  Apply Now
                  <span className="ml-2">→</span>
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-[#E5E7EB] dark:border-[#1F2937] text-[#111827] dark:text-white px-10 h-14 text-lg font-semibold rounded-lg hover:bg-[#F9FAFB] dark:hover:bg-[#111827] w-full sm:w-auto">
                  Get Scholarship Access
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-[#3495EB]">✓</span>
                100% Scholarship Based
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#3495EB]">✓</span>
                Govt Verified Certificate
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#3495EB]">✓</span>
                1-Month Internship Included
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Training Program */}
      <section className="py-24 bg-white dark:bg-[#0B1220]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20 text-[#8B5CF6] border-0 mb-4">
              Available Training
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] dark:text-white">
              1 Program — Full Scholarship Access
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-[#F9FAFB] dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937] overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-[#3495EB] via-[#8B5CF6] to-[#10B981]" />
              <CardContent className="p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3495EB]/10 text-[#3495EB] text-sm font-semibold mb-4">
                      <span>🚀</span> Most Popular
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-[#111827] dark:text-white mb-4">
                      AI Social Media Marketing
                    </h3>
                    
                    <p className="text-lg text-[#3495EB] font-semibold mb-4">
                      Mentorship Program (1 Month)
                    </p>

                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <span className="text-green-500">✓</span>
                        100% Scholarship-Based Access
                      </li>
                      <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <span className="text-green-500">✓</span>
                        Live + Recorded Training Sessions
                      </li>
                      <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <span className="text-green-500">✓</span>
                        Practical Tasks + Real Internship
                      </li>
                      <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <span className="text-green-500">✓</span>
                        Government Verified Certificate
                      </li>
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/enroll">
                        <Button className="bg-[#3495EB] hover:bg-[#347ce0] text-white px-8 h-12 font-semibold rounded-lg w-full sm:w-auto">
                          Apply Now
                        </Button>
                      </Link>
                      <Link href="/contact">
                        <Button variant="outline" className="border-[#E5E7EB] dark:border-[#1F2937] text-[#111827] dark:text-white px-8 h-12 font-semibold rounded-lg w-full sm:w-auto">
                          Contact
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="lg:w-80 w-full bg-white dark:bg-[#0B1220] rounded-xl p-6 border border-[#E5E7EB] dark:border-[#1F2937]">
                    <h4 className="font-bold text-[#111827] dark:text-white mb-4 flex items-center gap-2">
                      <span>📋</span> Program Includes
                    </h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                        <span className="text-[#3495EB] mt-0.5">•</span>
                        <span>4 Weeks Live Mentorship</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                        <span className="text-[#3495EB] mt-0.5">•</span>
                        <span>AI Tools Training (ChatGPT, Canva AI, etc.)</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                        <span className="text-[#3495EB] mt-0.5">•</span>
                        <span>Content Creation Strategies</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                        <span className="text-[#3495EB] mt-0.5">•</span>
                        <span>Client Handling & Freelancing</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                        <span className="text-[#3495EB] mt-0.5">•</span>
                        <span>Portfolio Development</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                        <span className="text-[#3495EB] mt-0.5">•</span>
                        <span>Job Placement Assistance</span>
                      </li>
                    </ul>
                    
                    <div className="mt-6 pt-6 border-t border-[#E5E7EB] dark:border-[#1F2937]">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Next Batch</span>
                        <span className="font-semibold text-[#111827] dark:text-white">1st of Next Month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-24 bg-[#F9FAFB] dark:bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#3495EB]/10 dark:bg-[#3495EB]/20 text-[#3495EB] border-0 mb-4">
              Eligibility
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] dark:text-white mb-4">
              Who Can Apply?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Open to everyone who wants to learn and earn. No prior experience required.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {eligibilityCriteria.map((item, index) => (
              <Card key={index} className="group bg-white dark:bg-[#0B1220] border-[#E5E7EB] dark:border-[#1F2937] hover:shadow-lg hover:border-[#3495EB]/20 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    {item.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-3">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-white dark:bg-[#0B1220]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#10B981]/10 dark:bg-[#10B981]/20 text-[#10B981] border-0 mb-4">
              Scholarship Process
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] dark:text-white mb-4">
              How to Get Started
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              5 simple steps to start your digital journey
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Connection Line - Desktop */}
              <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[#3495EB] via-[#8B5CF6] to-[#10B981]" />

              <div className="grid lg:grid-cols-5 gap-8">
                {processSteps.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="bg-[#F9FAFB] dark:bg-[#111827] rounded-2xl p-6 border border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB]/30 transition-all duration-300 h-full">
                      {/* Step Number */}
                      <div className="absolute -top-4 left-6 bg-[#3495EB] text-white text-xs font-bold px-3 py-1 rounded-full">
                        Step {step.step}
                      </div>
                      
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-[#3495EB]/10 dark:bg-[#3495EB]/20 flex items-center justify-center text-3xl mb-4 mt-2">
                        {step.icon}
                      </div>
                      
                      <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-2">
                        {step.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow - Mobile */}
                    {index < processSteps.length - 1 && (
                      <div className="lg:hidden flex justify-center my-4">
                        <span className="text-2xl text-[#3495EB]">↓</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#F9FAFB] dark:bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#F59E0B]/10 dark:bg-[#F59E0B]/20 text-[#F59E0B] border-0 mb-4">
              FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`bg-white dark:bg-[#0B1220] rounded-xl border border-[#E5E7EB] dark:border-[#1F2937] overflow-hidden transition-all duration-300 ${
                  openFaq === index ? 'shadow-lg border-[#3495EB]/30' : 'hover:border-[#3495EB]/20'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4"
                >
                  <span className="font-semibold text-[#111827] dark:text-white text-lg">
                    {faq.question}
                  </span>
                  <span className={`text-2xl text-[#3495EB] transition-transform duration-300 flex-shrink-0 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}>
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                
                <div className={`px-6 overflow-hidden transition-all duration-300 ${
                  openFaq === index ? 'pb-6 max-h-96' : 'max-h-0'
                }`}>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#0B1220] to-[#111827] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #3495EB 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Urgency Banner */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 mb-8 animate-pulse">
              <span className="text-red-400 font-semibold text-sm">
                🚨 Secure Your Spot Now — Limited Seats Available!
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Don't Wait for the Next Opportunity
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start your digital journey today with HDS. Join thousands of Pakistanis who are already earning through skills learned in our scholarship program.
            </p>

            {/* Pricing Highlight */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-md mx-auto mb-10">
              <div className="text-sm text-gray-400 mb-2">Total Investment</div>
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-2xl text-gray-500 line-through">Worth PKR 25,000</span>
              </div>
              <div className="text-5xl font-bold text-[#3495EB] mb-2">PKR 100</div>
              <div className="text-sm text-gray-400">Registration fee only • Scholarship covers rest</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enroll">
                <Button className="bg-[#3495EB] hover:bg-[#347ce0] text-white px-12 h-14 text-lg font-semibold rounded-lg shadow-lg shadow-[#3495EB]/25 w-full sm:w-auto">
                  Apply Now
                  <span className="ml-2">→</span>
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-gray-600 text-black dark:text-white  px-12 h-14 text-lg font-semibold rounded-lg w-full sm:w-auto ">
                  Get Scholarship Access
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
              <span>✓ No Hidden Charges</span>
              <span>✓ Instant WhatsApp Support</span>
              <span>✓ Monthly New Batches</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
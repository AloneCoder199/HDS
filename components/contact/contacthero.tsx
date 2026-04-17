"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Import Lucide React icons
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Zap,
  MessageCircle,
  Rocket,
  Send,
  Loader2,
  CheckCircle,
  HelpCircle,
  BookOpen,
  GraduationCap,
  Wrench,
  CreditCard,
  Store,
  Users,
  FileText,
  ChevronDown,
  HeadphonesIcon,
  ArrowRight
} from 'lucide-react';

// Contact Info
const contactDetails = {
  phone: "03271543140",
  email: "hassandigitalskills@mail.com",
  whatsapp: "03271543140",
  address: "Samundri, Faisalabad, Punjab, Pakistan",
  hours: "Mon-Sat: 9:00 AM - 6:00 PM"
};

// FAQ Data (20 Items)
const faqs = [
  {
    question: "What is Hassan Digital Skills (HDS)?",
    answer: "HDS is Pakistan's largest scholarship-based digital education platform offering practical training in Social Media Marketing, Web Development, and Freelancing with just PKR 100 registration fee."
  },
  {
    question: "How can I contact HDS support?",
    answer: "You can reach us via WhatsApp/Phone at 03271543140, email at hassandigitalskills@mail.com, or fill out the contact form above. We typically respond within 24-48 hours."
  },
  {
    question: "What courses does HDS offer?",
    answer: "We offer AI Social Media Marketing, Meta Ads Mastery, SEO Content Writing, Graphic Design, WordPress Development, and YouTube Content Creation - all with 1-month internship included."
  },
  {
    question: "Is the scholarship really only PKR 100?",
    answer: "Yes! We charge only PKR 100 as a registration fee to ensure serious learners. The actual course worth thousands is provided under our scholarship model."
  },
  {
    question: "How do I enroll in a course?",
    answer: "Click 'Apply Now', fill the form, pay PKR 100 registration fee, and you'll receive access to your private WhatsApp group and learning materials within 24 hours."
  },
  {
    question: "Are the courses online or physical?",
    answer: "All courses are 100% online with live Google Meet sessions and recorded access. You can learn from anywhere in Pakistan with just a smartphone or laptop."
  },
  {
    question: "What is the duration of courses?",
    answer: "Most courses are 4-6 weeks long, followed by a 1-month real internship where you work on actual client projects."
  },
  {
    question: "Will I get a certificate?",
    answer: "Yes! Upon completion, you receive a Government Verified Certificate that adds credibility to your professional profile and helps in job applications."
  },
  {
    question: "Can I earn after completing the course?",
    answer: "Absolutely! Our system is designed to take you from learning to earning. Many students start freelancing and get their first clients within 30 days of completion."
  },
  {
    question: "Who can apply for HDS courses?",
    answer: "Anyone! Students, job seekers, housewives, freelancers looking to upgrade skills - no prior experience required. Just commitment to learn."
  },
  {
    question: "How does the internship program work?",
    answer: "After 4-6 weeks of training, you enter a 1-month internship where you work on real projects, gain practical experience, and build your portfolio."
  },
  {
    question: "What if I miss a live class?",
    answer: "No worries! All sessions are recorded and available for lifetime access. You can watch anytime and learn at your own pace."
  },
  {
    question: "Is there any refund policy?",
    answer: "Due to the scholarship-based model and minimal registration fee, we don't offer refunds. However, we ensure quality education and support throughout."
  },
  {
    question: "Can I pay the fee in installments?",
    answer: "The PKR 100 registration is a one-time small fee. For any additional services, contact our support team for flexible options."
  },
  {
    question: "Do you offer franchise opportunities?",
    answer: "Yes! We have 20+ franchise partners across Pakistan. Contact us via phone or email to discuss franchise partnership opportunities."
  },
  {
    question: "What makes HDS different from other institutes?",
    answer: "We focus on practical execution, not just theory. Live mentorship, real internship, income-focused skills, and a complete earning ecosystem - all for just PKR 100."
  },
  {
    question: "How many students have you trained?",
    answer: "We've trained 10,000+ students across 50+ cities in Pakistan with a 95% success rate in helping them start earning."
  },
  {
    question: "Is HDS registered?",
    answer: "Yes! Hassan Digital Skills is SECP registered, Google Partner, and Meta Certified training institute."
  },
  {
    question: "What support do you provide after course completion?",
    answer: "Lifetime access to community, job placement assistance, freelance guidance, continuous mentorship, and updates on new opportunities."
  },
  {
    question: "How can I become a mentor at HDS?",
    answer: "If you have 2+ years of industry experience and passion for teaching, send your CV to hassandigitalskills@mail.com with subject 'Mentorship Application'."
  }
];

const subjects = [
  { value: 'course-inquiry', label: 'Course Inquiry', icon: BookOpen },
  { value: 'enrollment-help', label: 'Enrollment Help', icon: GraduationCap },
  { value: 'technical-support', label: 'Technical Support', icon: Wrench },
  { value: 'payment-question', label: 'Payment Question', icon: CreditCard },
  { value: 'franchise', label: 'Franchise Partnership', icon: Store },
  { value: 'mentorship', label: 'Become a Mentor', icon: Users },
  { value: 'other', label: 'Other', icon: FileText },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  function validateForm() {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setErrors({ submit: data.error || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please check your connection.' });
    }

    setIsSubmitting(false);
  }

  function handleChange(field: string, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B1220]">

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-[#F9FAFB] dark:bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <Badge className="bg-[#3495EB]/10 text-[#3495EB] border-0 mb-4 inline-flex items-center gap-2">
              <HeadphonesIcon className="w-4 h-4" />
              Get in Touch
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] dark:text-white mb-4">
              Contact <span className="text-[#3495EB]">HDS</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Have questions? We&apos;re here to help. Reach out to us for course inquiries, 
              enrollment support, or partnership opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 -mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-4">
              {/* Phone */}
              <Card className="bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB]/30 transition-colors group">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#3495EB]/10 flex items-center justify-center group-hover:bg-[#3495EB]/20 transition-colors">
                      <Phone className="w-6 h-6 text-[#3495EB]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#111827] dark:text-white mb-1">Phone/WhatsApp</h3>
                      <a 
                        href={`tel:+92${contactDetails.phone}`}
                        className="text-[#3495EB] font-bold text-lg hover:underline"
                      >
                        {contactDetails.phone}
                      </a>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Available 9AM - 6PM
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#8B5CF6]/30 transition-colors group">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center group-hover:bg-[#8B5CF6]/20 transition-colors">
                      <Mail className="w-6 h-6 text-[#8B5CF6]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#111827] dark:text-white mb-1">Email</h3>
                      <a 
                        href={`mailto:${contactDetails.email}`}
                        className="text-[#8B5CF6] font-medium text-sm hover:underline break-all"
                      >
                        {contactDetails.email}
                      </a>
                      <p className="text-xs text-gray-500 mt-1">24-48 hour response</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address */}
              <Card className="bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#10B981]/30 transition-colors group">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center group-hover:bg-[#10B981]/20 transition-colors">
                      <MapPin className="w-6 h-6 text-[#10B981]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#111827] dark:text-white mb-1">Location</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {contactDetails.address}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Main Campus</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-[#3495EB] to-[#347ce0] rounded-xl p-5 text-white">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5" /> Quick Actions
                </h3>
                <div className="space-y-2">
                  <a 
                    href={`https://wa.me/92${contactDetails.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                  </a>
                  <Link 
                    href="/enroll"
                    className="flex items-center justify-center gap-2 bg-white text-[#3495EB] py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <Rocket className="w-4 h-4" /> Apply Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937] shadow-lg">
                <CardContent className="p-6 md:p-8">

                  {isSuccess ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#111827] dark:text-white mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Thank you for contacting us. We&apos;ll get back to you within 24-48 hours.
                      </p>
                      <Button 
                        onClick={() => setIsSuccess(false)}
                        variant="outline"
                        className="border-[#3495EB] text-[#3495EB] hover:bg-[#3495EB]/10"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label className="text-[#111827] dark:text-white text-sm font-medium flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            Full Name *
                          </Label>
                          <Input
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className={cn(
                              "h-11 rounded-lg",
                              errors.name ? 'border-red-500' : 'border-[#E5E7EB]'
                            )}
                          />
                          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-[#111827] dark:text-white text-sm font-medium flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            Email Address *
                          </Label>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className={cn(
                              "h-11 rounded-lg",
                              errors.email ? 'border-red-500' : 'border-[#E5E7EB]'
                            )}
                          />
                          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label className="text-[#111827] dark:text-white text-sm font-medium flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            Phone Number
                          </Label>
                          <Input
                            placeholder="03XX XXXXXXX"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="h-11 rounded-lg border-[#E5E7EB]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-[#111827] dark:text-white text-sm font-medium flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-gray-400" />
                            Subject *
                          </Label>
                          <Select 
                            value={formData.subject} 
                            onValueChange={(value) => handleChange('subject', value)}
                          >
                            <SelectTrigger className={cn(
                              "h-11 rounded-lg",
                              errors.subject ? 'border-red-500' : 'border-[#E5E7EB]'
                            )}>
                              <SelectValue placeholder="Select topic" />
                            </SelectTrigger>
                            <SelectContent>
                              {subjects.map((subject) => {
                                const IconComponent = subject.icon;
                                return (
                                  <SelectItem key={subject.value} value={subject.value}>
                                    <div className="flex items-center gap-2">
                                      <IconComponent className="w-4 h-4 text-[#3495EB]" />
                                      {subject.label}
                                    </div>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          {errors.subject && <p className="text-xs text-red-500">{errors.subject}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[#111827] dark:text-white text-sm font-medium flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-gray-400" />
                          Message *
                        </Label>
                        <Textarea
                          placeholder="How can we help you?"
                          rows={5}
                          value={formData.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          className={cn(
                            "rounded-lg resize-none",
                            errors.message ? 'border-red-500' : 'border-[#E5E7EB]'
                          )}
                        />
                        {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                      </div>

                      {errors.submit && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                          {errors.submit}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-[#3495EB] hover:bg-[#347ce0] text-white font-semibold rounded-lg shadow-lg shadow-[#3495EB]/20"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            Send Message <Send className="w-4 h-4" />
                          </span>
                        )}
                      </Button>

                      <p className="text-center text-xs text-gray-500">
                        By submitting, you agree to our{' '}
                        <Link href="/privacy" className="text-[#3495EB] hover:underline">Privacy Policy</Link>
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#F9FAFB] dark:bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <Badge className="bg-[#3495EB]/10 text-[#3495EB] border-0 mb-4 inline-flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] dark:text-white mb-4">
              Frequently Asked <span className="text-[#3495EB]">Questions</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Find answers to common questions about HDS courses, enrollment, and support
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={cn(
                  "bg-white dark:bg-[#0B1220] rounded-xl border border-[#E5E7EB] dark:border-[#1F2937] overflow-hidden transition-all duration-300",
                  openFaq === index ? "shadow-md border-[#3495EB]/30" : "hover:border-[#3495EB]/20"
                )}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4"
                >
                  <span className="font-semibold text-[#111827] dark:text-white text-sm md:text-base pr-8">
                    {index + 1}. {faq.question}
                  </span>
                  <div className={cn(
                    "w-6 h-6 rounded-full bg-[#3495EB]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300",
                    openFaq === index ? "bg-[#3495EB] text-white rotate-180" : "text-[#3495EB]"
                  )}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5">
                        <div className="pt-2 border-t border-[#E5E7EB] dark:border-[#1F2937]">
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed pt-3">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">Still have questions?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href={`tel:${contactDetails.phone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#3495EB] text-white rounded-lg font-semibold hover:bg-[#347ce0] transition-colors"
              >
                <Phone className="w-4 h-4" /> Call Us Now
              </a>
              <a 
                href={`https://wa.me/92${contactDetails.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-lg font-semibold hover:bg-[#22c35e] transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
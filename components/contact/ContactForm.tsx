'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Loader2,
  User,
  Mail,
  Phone,
  MessageSquare,
  HelpCircle,
  ArrowRight,
  Shield,
  Sparkles
} from 'lucide-react';
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

const subjects = [
  { value: 'course-inquiry', label: 'Course Inquiry', icon: '📚', desc: 'Learn about our courses' },
  { value: 'enrollment-help', label: 'Enrollment Help', icon: '🎓', desc: 'Get help with enrollment' },
  { value: 'technical-support', label: 'Technical Support', icon: '🔧', desc: 'Resolve technical issues' },
  { value: 'payment-question', label: 'Payment Question', icon: '💳', desc: 'Billing & payment help' },
  { value: 'partnership', label: 'Business Partnership', icon: '🤝', desc: 'Collaborate with us' },
  { value: 'other', label: 'Other', icon: '📋', desc: 'General inquiries' },
];

const benefits = [
  { icon: Clock, text: 'Response in 24-48 hours' },
  { icon: Shield, text: 'Secure & confidential' },
  { icon: Sparkles, text: 'Personalized assistance' },
];

export function ContactForm() {
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
  const [referenceId, setReferenceId] = useState('');
  const [rateLimitError, setRateLimitError] = useState('');

  // Keep all your original logic here
  function validateForm() {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (formData.phone && !/^(\+92|0|92)?[ -]?\d{3}[ -]?\d{7}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
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
    setRateLimitError('');
    
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
        setReferenceId(data.referenceId);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else if (data.rateLimited) {
        setRateLimitError(data.error);
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

  if (isSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <Card className="bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937] shadow-xl">
          <CardContent className="p-8 md:p-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-[#10B981]" />
              </div>
              
              <h2 className="text-3xl font-bold text-[#111827] dark:text-white mb-3">
                Message Sent!
              </h2>
              
              <p className="text-[#6B7280] dark:text-[#9CA3AF] mb-8 max-w-md mx-auto">
                Thank you for reaching out. We've received your message and will get back to you within 24-48 hours.
              </p>
              
              <div className="bg-[#3495EB]/5 border border-[#3495EB]/20 rounded-xl p-6 mb-8 max-w-sm mx-auto">
                <p className="text-sm text-[#9CA3AF] mb-2 uppercase tracking-wider font-medium">Reference ID</p>
                <p className="text-3xl font-bold text-[#3495EB] font-mono tracking-wider">
                  {referenceId}
                </p>
                <p className="text-xs text-[#9CA3AF] mt-3">
                  Save this for your records
                </p>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-[#9CA3AF]">
                  Confirmation sent to <strong className="text-[#111827] dark:text-white">{formData.email}</strong>
                </p>
                
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsSuccess(false);
                    setReferenceId('');
                  }}
                  className="border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB] hover:text-[#3495EB] rounded-full px-8"
                >
                  Send Another Message
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
        
        {/* Left Side - Info */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <Badge className="mb-4 bg-[#3495EB]/10 text-[#3495EB] border-[#3495EB]/20 hover:bg-[#3495EB]/20">
              <MessageSquare className="w-3 h-3 mr-1" />
              Contact Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] dark:text-white mb-4 leading-tight">
              Get in <span className="text-[#3495EB]">Touch</span>
            </h2>
            <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
              Have a question or need assistance? Fill out the form and our team will respond within 24-48 hours.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-[#F9FAFB] dark:bg-[#0B1220] border border-[#E5E7EB] dark:border-[#1F2937]">
                <div className="w-10 h-10 rounded-lg bg-[#3495EB]/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-[#3495EB]" />
                </div>
                <span className="text-sm font-medium text-[#111827] dark:text-white">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Quick Contact */}
          <div className="p-6 rounded-xl bg-[#111827] dark:bg-white text-white dark:text-[#111827]">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Prefer to call?
            </h3>
            <p className="text-white/80 dark:text-[#111827]/80 text-sm mb-3">
              Speak directly with our admissions team
            </p>
            <a 
              href="tel:+923001234567" 
              className="text-xl font-bold hover:underline"
            >
              +92 300 1234567
            </a>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="lg:col-span-3">
          <Card className="bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937] shadow-lg">
            <CardContent className="p-6 md:p-8">
              
              {/* Rate Limit Error */}
              <AnimatePresence>
                {rateLimitError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-lg flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#111827] dark:text-white text-sm">Please wait</p>
                      <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">{rateLimitError}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#111827] dark:text-white text-sm font-medium flex items-center gap-2">
                      <User className="w-4 h-4 text-[#3495EB]" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={cn(
                        "h-12 rounded-lg",
                        errors.name 
                          ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20' 
                          : 'border-[#E5E7EB] dark:border-[#1F2937] focus:border-[#3495EB] focus:ring-[#3495EB]/20'
                      )}
                    />
                    {errors.name && (
                      <p className="text-xs text-[#EF4444] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#111827] dark:text-white text-sm font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#3495EB]" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={cn(
                        "h-12 rounded-lg",
                        errors.email 
                          ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20' 
                          : 'border-[#E5E7EB] dark:border-[#1F2937] focus:border-[#3495EB] focus:ring-[#3495EB]/20'
                      )}
                    />
                    {errors.email && (
                      <p className="text-xs text-[#EF4444] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone & Subject Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#111827] dark:text-white text-sm font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#3495EB]" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+92 3271543140"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={cn(
                        "h-12 rounded-lg",
                        errors.phone 
                          ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20' 
                          : 'border-[#E5E7EB] dark:border-[#1F2937] focus:border-[#3495EB] focus:ring-[#3495EB]/20'
                      )}
                    />
                    {errors.phone && (
                      <p className="text-xs text-[#EF4444] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-[#111827] dark:text-white text-sm font-medium flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#3495EB]" />
                      Subject *
                    </Label>
                    <Select 
                      value={formData.subject} 
                      onValueChange={(value) => handleChange('subject', value)}
                    >
                      <SelectTrigger className={cn(
                        "h-12 rounded-lg",
                        errors.subject 
                          ? 'border-[#EF4444] focus:border-[#EF4444]' 
                          : 'border-[#E5E7EB] dark:border-[#1F2937] focus:border-[#3495EB]'
                      )}>
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937]">
                        {subjects.map((subject) => (
                          <SelectItem key={subject.value} value={subject.value} className="cursor-pointer">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{subject.icon}</span>
                              <div>
                                <div className="font-medium">{subject.label}</div>
                                <div className="text-xs text-[#9CA3AF]">{subject.desc}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.subject && (
                      <p className="text-xs text-[#EF4444] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[#111827] dark:text-white text-sm font-medium flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#3495EB]" />
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className={cn(
                      "rounded-lg resize-none",
                      errors.message 
                        ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20' 
                        : 'border-[#E5E7EB] dark:border-[#1F2937] focus:border-[#3495EB] focus:ring-[#3495EB]/20'
                    )}
                  />
                  <div className="flex justify-between text-xs">
                    {errors.message ? (
                      <p className="text-[#EF4444] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    ) : (
                      <span className="text-[#9CA3AF]">Minimum 10 characters</span>
                    )}
                    <span className={cn(
                      "text-[#9CA3AF]",
                      formData.message.length > 1800 && "text-[#F59E0B]",
                      formData.message.length >= 2000 && "text-[#EF4444]"
                    )}>
                      {formData.message.length}/2000
                    </span>
                  </div>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="p-4 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0" />
                    <p className="text-sm text-[#EF4444]">{errors.submit}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-base font-semibold bg-[#111827] dark:bg-white text-white dark:text-[#111827] hover:bg-[#1F2937] dark:hover:bg-[#F9FAFB] rounded-xl transition-all duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-[#9CA3AF]">
                  By submitting, you agree to our{' '}
                  <a href="/privacy-policy" className="text-[#3495EB] hover:underline">Privacy Policy</a>
                  . We respect your data.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
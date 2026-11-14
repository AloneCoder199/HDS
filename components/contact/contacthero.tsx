"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
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
  Users,
  FileText,
  ChevronDown,
  HeadphonesIcon,
  ArrowRight,
  ShieldCheck,
  Video,
  Award,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════
// REAL CONTACT INFO (from brief)
// ═══════════════════════════════════════════════════════════════════════
const contactDetails = {
  whatsapp: "0327 1543140", // Official number from brief
  whatsappRaw: "923271543140",
  accountTitle: "Ali Hassan",
  address: "Burion Center", // Full address TBD
  responseTime: "Usually within a few hours",
};

// ═══════════════════════════════════════════════════════════════════════
// REAL FAQ (only from brief, no fake claims)
// ═══════════════════════════════════════════════════════════════════════
const faqs = [
  {
    question: "What is the actual fee for HDS mentorships?",
    answer:
      "Each mentorship has a market value of Rs. 25,000. Under our scholarship program, you only pay a one-time seat confirmation fee of Rs. 200 per mentorship.",
  },
  {
    question: "Which mentorships are currently available?",
    answer:
      "We offer 3 top-demand mentorships: Artificial Intelligence (9:15 PM PKT), Social Media Marketing (8:00 PM PKT), and Crypto Trading (10:15 PM PKT).",
  },
  {
    question: "When does the next batch start?",
    answer:
      "Batch 18 starts on 6 December 2026. Total seats: 10,000. Registration is currently open.",
  },
  {
    question: "What is the duration and how many lectures are included?",
    answer:
      "Each mentorship runs for 1 to 1.5 months and includes 14 live lectures on Zoom. Recordings are available for all sessions.",
  },
  {
    question: "Are the classes online or physical?",
    answer:
      "All classes are 100% online via Zoom (live). Recordings are provided so you can watch anytime if you miss a session.",
  },
  {
    question: "Is this suitable for complete beginners?",
    answer:
      "Yes. Every mentorship starts from fundamentals — no prior experience is required. We guide you step-by-step from basics to advanced.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Yes. After completing your training, you receive an HDS Certified e-Certificate with a unique ID and QR code. It can be verified online at /verify-certificate.",
  },
  {
    question: "How do I enroll?",
    answer:
      "Visit /enroll, select your mentorship, fill the form, pay Rs. 200 to 0327 1543140 (JazzCash/Easypaisa, Account Title: Ali Hassan), upload your payment screenshot, and submit. Our team verifies within 24 hours.",
  },
  {
    question: "What if I miss a live class?",
    answer:
      "Don't worry. All 14 live lectures are recorded. You get access to the recordings and can watch them anytime in your student portal.",
  },
  {
    question: "Can I enroll in more than one mentorship?",
    answer:
      "Yes. Each mentorship has its own Rs. 200 seat fee. You can enroll in multiple mentorships if you wish — each one is Rs. 200.",
  },
  {
    question: "How do I make the payment?",
    answer:
      "Send Rs. 200 to the official JazzCash / Easypaisa number: 0327 1543140 (Account Title: Ali Hassan). ⚠️ Payment only to this official number — HDS has no other number.",
  },
  {
    question: "Is crypto trading safe? What about losses?",
    answer:
      "⚠️ Crypto trading involves risk of loss. Our Crypto Trading mentorship is purely educational — it teaches technical analysis and risk management, but does NOT guarantee any profit.",
  },
  {
    question: "Is there an internship?",
    answer:
      "Yes. Students who complete the training are eligible for a 1-month internship path with real project work, portfolio building, and freelancing/job guidance.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "The exact refund policy for the Rs. 200 seat fee is being finalized. Please confirm with our team on WhatsApp 0327 1543140 before enrolling.",
  },
  {
    question: "How can I contact the HDS team?",
    answer:
      "The fastest way is WhatsApp at 0327 1543140. You can also use the contact form on this page — we respond within 24-48 hours.",
  },
];

const subjects = [
  { value: "course-inquiry", label: "Mentorship Inquiry", icon: BookOpen },
  { value: "enrollment-help", label: "Enrollment Help", icon: GraduationCap },
  { value: "payment-question", label: "Payment Question", icon: CreditCard },
  { value: "technical-support", label: "Technical Support", icon: Wrench },
  { value: "franchise", label: "Franchise Inquiry", icon: Users },
  { value: "other", label: "Other", icon: FileText },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  function validateForm() {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setErrors({ submit: data.error || "Failed to send message. Please try again." });
      }
    } catch {
      setErrors({ submit: "Network error. Please check your connection." });
    }

    setIsSubmitting(false);
  }

  function handleChange(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  }

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* ═══ Animated Background ═══ */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] animate-pulse duration-[7000ms]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] animate-pulse duration-[5000ms]" />
      </div>

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative pt-12 pb-10 lg:pt-16 lg:pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge className="bg-primary/10 text-primary-text border border-primary/20 px-3 py-1 mb-4 inline-flex items-center gap-1.5 text-[11px] font-bold">
              <HeadphonesIcon className="w-3.5 h-3.5" />
              Get in Touch
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 leading-tight">
              Contact <span className="text-gradient">HDS</span>
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Have questions about mentorships, enrollment, or payment?
              WhatsApp is the fastest way to reach us.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CONTACT GRID ═══════════════════════ */}
      <section className="relative pb-16 lg:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[380px_1fr] gap-5 lg:gap-6">
            {/* ─── LEFT: Contact Cards ─── */}
            <div className="space-y-3 animate-in fade-in slide-in-from-left-8 duration-700">
              {/* WhatsApp (Primary) */}
              <Card className="border-primary/30 bg-card hover:shadow-lg transition-all group">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 group-hover:scale-110 transition-transform">
                      <MessageCircle className="h-5 w-5 text-[#25D366]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-primary-text mb-0.5">
                        WhatsApp (Primary)
                      </p>
                      <a
                        href={`https://wa.me/${contactDetails.whatsappRaw}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-bold text-foreground hover:text-primary-text transition-colors block"
                      >
                        {contactDetails.whatsapp}
                      </a>
                      <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" />
                        {contactDetails.responseTime}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address */}
              <Card className="border-border bg-card hover:shadow-md transition-all group">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 group-hover:scale-110 transition-transform">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
                        Location
                      </p>
                      <p className="text-sm font-bold text-foreground">
                        {contactDetails.address}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Full address & map coming soon
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Title */}
              <Card className="border-border bg-card hover:shadow-md transition-all group">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 group-hover:scale-110 transition-transform">
                      <CreditCard className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
                        Payment Account
                      </p>
                      <p className="text-sm font-bold text-foreground">
                        {contactDetails.accountTitle}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        JazzCash / Easypaisa
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/90 p-4 text-white overflow-hidden relative">
                <div className="pointer-events-none absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>
                <div className="relative">
                  <h3 className="font-bold mb-2.5 flex items-center gap-1.5 text-sm">
                    <Sparkles className="w-4 h-4" /> Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <a
                      href={`https://wa.me/${contactDetails.whatsappRaw}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 bg-white/20 hover:bg-white/30 py-2 rounded-lg text-xs font-semibold transition-colors backdrop-blur-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Chat on WhatsApp
                    </a>
                    <Link
                      href="/enroll"
                      className="flex items-center justify-center gap-1.5 bg-white text-primary hover:bg-white/90 py-2 rounded-lg text-xs font-bold transition-colors"
                    >
                      <Rocket className="w-3.5 h-3.5" /> Enroll in Batch 18
                    </Link>
                  </div>
                </div>
              </div>

              {/* Payment Warning */}
              <div className="flex items-start gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3">
                <AlertTriangle className="h-4 w-4 shrink-0 text-destructive mt-0.5" />
                <p className="text-[11px] text-destructive/90 leading-relaxed">
                  <strong>Payment only to 0327 1543140 (Ali Hassan).</strong>{" "}
                  HDS has no other number.
                </p>
              </div>
            </div>

            {/* ─── RIGHT: Contact Form ─── */}
            <div className="animate-in fade-in slide-in-from-right-8 duration-700">
              <Card className="border-border bg-card shadow-sm">
                <CardContent className="p-5 sm:p-6">
                  {isSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-sm text-muted-foreground mb-5 max-w-sm mx-auto">
                        Thank you. We'll get back to you within 24-48 hours.
                        For faster response, WhatsApp us at 0327 1543140.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Button
                          onClick={() => setIsSuccess(false)}
                          variant="outline"
                          size="sm"
                          className="rounded-lg"
                        >
                          Send Another
                        </Button>
                        <a
                          href={`https://wa.me/${contactDetails.whatsappRaw}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="sm"
                            className="gradient-primary text-white rounded-lg"
                          >
                            <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                            WhatsApp Now
                          </Button>
                        </a>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="mb-4">
                        <h2 className="text-lg font-bold text-foreground mb-1">
                          Send a Message
                        </h2>
                        <p className="text-xs text-muted-foreground">
                          Fill the form below. For urgent matters, WhatsApp is faster.
                        </p>
                      </div>

                      {/* Name + Email */}
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-[11px] font-semibold flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            Full Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className={cn(
                              "h-10 text-sm rounded-lg",
                              errors.name
                                ? "border-destructive"
                                : "border-border focus:border-primary"
                            )}
                          />
                          {errors.name && (
                            <p className="text-[10px] text-destructive">{errors.name}</p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-[11px] font-semibold flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            Email <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className={cn(
                              "h-10 text-sm rounded-lg",
                              errors.email
                                ? "border-destructive"
                                : "border-border focus:border-primary"
                            )}
                          />
                          {errors.email && (
                            <p className="text-[10px] text-destructive">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      {/* Phone + Subject */}
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-[11px] font-semibold flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            WhatsApp Number
                          </Label>
                          <Input
                            placeholder="03271543140"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            className="h-10 text-sm rounded-lg border-border focus:border-primary"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-[11px] font-semibold flex items-center gap-1">
                            <HelpCircle className="w-3 h-3" />
                            Subject <span className="text-destructive">*</span>
                          </Label>
                          <Select
                            value={formData.subject}
                            onValueChange={(value) => handleChange("subject", value)}
                          >
                            <SelectTrigger
                              className={cn(
                                "h-10 text-sm rounded-lg",
                                errors.subject
                                  ? "border-destructive"
                                  : "border-border focus:border-primary"
                              )}
                            >
                              <SelectValue placeholder="Select topic" />
                            </SelectTrigger>
                            <SelectContent>
                              {subjects.map((subject) => {
                                const Icon = subject.icon;
                                return (
                                  <SelectItem key={subject.value} value={subject.value}>
                                    <div className="flex items-center gap-2 text-sm">
                                      <Icon className="w-3.5 h-3.5 text-primary-text" />
                                      {subject.label}
                                    </div>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          {errors.subject && (
                            <p className="text-[10px] text-destructive">{errors.subject}</p>
                          )}
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5">
                        <Label className="text-[11px] font-semibold flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          Message <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          placeholder="Tell us how we can help..."
                          rows={5}
                          value={formData.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          className={cn(
                            "text-sm rounded-lg resize-none",
                            errors.message
                              ? "border-destructive"
                              : "border-border focus:border-primary"
                          )}
                        />
                        {errors.message && (
                          <p className="text-[10px] text-destructive">{errors.message}</p>
                        )}
                      </div>

                      {errors.submit && (
                        <div className="p-2.5 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-xs">
                          {errors.submit}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-11 gradient-primary text-white font-bold rounded-lg shadow-glow hover:scale-[1.01] transition-all disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2 text-sm">
                            <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-sm">
                            Send Message <Send className="w-4 h-4" />
                          </span>
                        )}
                      </Button>

                      <p className="text-center text-[10px] text-muted-foreground">
                        By submitting, you agree to our{" "}
                        <Link
                          href="/privacy-policy"
                          className="text-primary-text hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FAQ ═══════════════════════ */}
      <section className="relative py-16 lg:py-20 bg-muted/20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge className="bg-primary/10 text-primary-text border border-primary/20 mb-3 inline-flex items-center gap-1.5 text-[11px] font-bold">
              <HelpCircle className="w-3.5 h-3.5" />
              FAQ
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Real answers about mentorships, fees, batches, and enrollment.
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-2.5">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className={cn(
                  "rounded-xl border bg-card overflow-hidden transition-all duration-300",
                  openFaq === index
                    ? "border-primary/30 shadow-md"
                    : "border-border hover:border-primary/20"
                )}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-4 text-left flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold transition-colors",
                        openFaq === index
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold text-foreground pt-0.5">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 shrink-0 mt-0.5 transition-transform duration-300",
                      openFaq === index
                        ? "rotate-180 text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pl-13">
                        <p className="text-xs text-muted-foreground leading-relaxed pl-11">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-10 text-center animate-in fade-in duration-700 delay-500">
            <p className="text-sm text-muted-foreground mb-3">
              Still have questions? We're one message away.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
              <a
                href={`https://wa.me/${contactDetails.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#25D366] text-white rounded-xl font-semibold hover:bg-[#1ebe5d] transition-all hover:scale-105 text-sm shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Now
              </a>
              <Link
                href="/enroll"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 gradient-primary text-white rounded-xl font-semibold hover:scale-105 transition-all text-sm shadow-md"
              >
                <Rocket className="w-4 h-4" />
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FOOTER CTA ═══════════════════════ */}
      <section className="py-14 lg:py-16 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center shadow-sm">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                Secure enrollment
              </div>
              <div className="h-3 w-px bg-border" />
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Video className="w-3.5 h-3.5 text-primary-text" />
                100% Live on Zoom
              </div>
              <div className="h-3 w-px bg-border" />
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                HDS Certified e-Certificate
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Batch 18 · Starts <strong className="text-foreground">6 December 2026</strong> · 10,000 seats available
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
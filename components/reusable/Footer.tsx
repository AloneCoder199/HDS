"use client"

import Link from "next/link"
import { useState } from "react"
import {
  ChevronDown,
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
  Youtube,
  ArrowRight,
  Sparkles,
  Heart,
} from "lucide-react"
import { Logo } from "./logo"

// ═══════════════════════════════════════════════════════════════════
// REAL LINKS
// ═══════════════════════════════════════════════════════════════════
const quickLinks = [
  { href: "/mentorships", label: "Mentorships" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/verify-certificate", label: "Verify Certificate" },
  { href: "/contact", label: "Contact" },
]

// ✅ Only Privacy + Terms (removed Refund, Risk Disclaimer)
const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
]

const socials = [
  {
    href: "https://www.facebook.com/HassanDigitalSkills",
    label: "Facebook",
    icon: Facebook,
    color: "hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white",
  },
  {
    href: "https://www.instagram.com/hds_pakistan_/?hl=en",
    label: "Instagram",
    icon: Instagram,
    color:
      "hover:bg-gradient-to-br hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-transparent hover:text-white",
  },
  {
    href: "https://youtube.com/@hassandigitalskills?si=rwQfPRvRc7MPciiL",
    label: "YouTube",
    icon: Youtube,
    color: "hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white",
  },
]

const WHATSAPP_URL =
  "https://wa.me/923271543140?text=" +
  encodeURIComponent("Hello HDS Team! I want to know more about your mentorships.")

// ═══════════════════════════════════════════════════════════════════
// ACCORDION SECTION
// ═══════════════════════════════════════════════════════════════════
function FooterSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-2.5 text-[11px] font-bold uppercase tracking-wider text-foreground transition-colors hover:text-primary-text lg:pointer-events-none lg:mb-3 lg:py-0 lg:hover:text-foreground"
      >
        {title}
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-300 lg:hidden ${
            open ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        } lg:grid-rows-[1fr] lg:opacity-100`}
      >
        <div className="overflow-hidden">
          <div className="pb-2 lg:pb-0">{children}</div>
        </div>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card text-card-foreground overflow-hidden">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      {/*
        ✅ Mobile bottom margin:
        - pb-28 → extra space for fixed bottom nav + breathing room
        - lg:pb-10 → normal on desktop
      */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 pb-28 sm:pb-24 lg:pt-10 lg:pb-10">
        {/* ═══ TOP ROW — Brand + CTA ═══ */}
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-8">
          {/* ─── Brand Column ─── */}
          <div className="space-y-3 pb-4 border-b border-border lg:border-0 lg:pb-0">
            <Logo />

            <p className="text-xs text-muted-foreground leading-relaxed">
              Empowering Youth With Digital Skills.
            </p>

            <p className="text-[11px] font-medium text-primary-text/90 italic">
              One Nation, One Platform, One Mission, One Revolution.
            </p>

            {/* Enroll CTA */}
            <Link
              href="/enroll"
              className="group inline-flex items-center gap-1.5 rounded-lg gradient-primary px-3.5 py-2 text-[11px] font-bold text-white shadow-glow transition-all duration-300 hover:scale-105 mt-1"
            >
              <Sparkles className="h-3 w-3" />
              Enroll in Batch 18
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>

            {/* Social Icons */}
            <div className="flex items-center gap-1.5 pt-2">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${s.label}`}
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all duration-300 hover:scale-110 hover:shadow-md ${s.color}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                )
              })}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all duration-300 hover:scale-110 hover:shadow-md hover:bg-[#25D366] hover:border-[#25D366] hover:text-white"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* ─── Quick Links ─── */}
          <div className="border-b border-border lg:border-0">
            <FooterSection title="Quick Links">
              <ul className="space-y-2 pl-0.5">
                {quickLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary-text"
                    >
                      <span className="h-1 w-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterSection>
          </div>

          {/* ─── Legal (only Privacy + Terms) ─── */}
          <div className="border-b border-border lg:border-0">
            <FooterSection title="Legal">
              <ul className="space-y-2 pl-0.5">
                {legalLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary-text"
                    >
                      <span className="h-1 w-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterSection>
          </div>

          {/* ─── Contact ─── */}
          <div>
            <FooterSection title="Contact">
              <ul className="space-y-2.5 pl-0.5 text-xs text-muted-foreground">
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-[#25D366]"
                  >
                    <MessageCircle className="h-3 w-3" />
                    0327 1543140
                  </a>
                </li>
                <li className="flex items-start gap-1.5">
                  <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
                  Samundri
                </li>
                <li className="pt-1">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#25D366]/10 px-2 py-0.5 text-[10px] font-bold text-[#25D366]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#25D366] animate-pulse" />
                    Typically replies in minutes
                  </span>
                </li>
              </ul>
            </FooterSection>
          </div>
        </div>

        {/* ═══ BOTTOM BAR — subtle, small, low-key ═══ */}
        <div className="mt-6 flex flex-col gap-1.5 border-t border-border pt-4 text-[9.5px] leading-relaxed text-muted-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Hassan Digital Skills. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1">
            Owned & operated by{" "}
            <a
              href="https://codearntech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-muted-foreground/80 underline-offset-2 transition-colors hover:text-muted-foreground hover:underline inline-flex items-center gap-0.5"
            >
              CodEarn Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
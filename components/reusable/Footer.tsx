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
} from "lucide-react"
import { Logo } from "./logo"

const quickLinks = [
  { href: "/mentorships", label: "Mentorships" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/verify-certificate", label: "Verify Certificate" },
  { href: "/contact", label: "Contact" },
]

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/risk-disclaimer", label: "Risk Disclaimer" },
]

const socials = [
  { href: "#", label: "Facebook", icon: Facebook },
  { href: "#", label: "Instagram", icon: Instagram },
  { href: "#", label: "YouTube", icon: Youtube },
]

// ─── Reusable accordion section ───
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
      {/* Mobile: clickable header */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:text-primary-text lg:pointer-events-none lg:mb-2.5 lg:py-0 lg:hover:text-foreground"
      >
        {title}
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-300 lg:hidden ${
            open ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* Content — smooth expand */}
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
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* ─── Main Grid ─── */}
        <div className="grid gap-1 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-8">
          {/* Brand */}
          <div className="space-y-2 pb-3.5 border-b border-border lg:border-0 lg:pb-0">
            <Logo />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Empowering Youth With Digital Skills.
            </p>

            {/* Tagline — subtle highlight */}
            <p className="text-[11px] font-medium text-primary-text/90 italic">
              One Nation, One Platform, One Mission, One Revolution.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-1.5 pt-1.5">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <Link
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary-text hover:scale-110"
                  >
                    <Icon className="h-3 w-3" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Quick Links — accordion on mobile */}
          <div className="border-b border-border lg:border-0">
            <FooterSection title="Quick Links">
              <ul className="space-y-1.5 pl-0.5">
                {quickLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-xs text-muted-foreground transition-colors hover:text-primary-text"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterSection>
          </div>

          {/* Legal — accordion on mobile */}
          <div className="border-b border-border lg:border-0">
            <FooterSection title="Legal">
              <ul className="space-y-1.5 pl-0.5">
                {legalLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-xs text-muted-foreground transition-colors hover:text-primary-text"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterSection>
          </div>

          {/* Contact — accordion on mobile */}
          <div>
            <FooterSection title="Contact">
              <ul className="space-y-2 pl-0.5 text-xs text-muted-foreground">
                <li>
                  <a
                    href="https://wa.me/923271543140"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-primary-text"
                  >
                    <MessageCircle className="h-3 w-3" />
                    0327 1543140
                  </a>
                </li>
                <li className="flex items-start gap-1.5">
                  <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
                  Burion Center
                </li>
              </ul>
            </FooterSection>
          </div>
        </div>

        {/* ─── Bottom Bar ─── */}
                {/* ─── Bottom Bar ─── */}
        <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4 text-[10.5px] leading-relaxed text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Hassan Digital Skills. All rights reserved.
          </p>
          <p>
            Hassan Digital Skills is a brand owned and operated by{" "}
            <a
              href="https://codearntech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground underline-offset-2 transition-colors hover:text-primary-text hover:underline"
            >
              CodEarn Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
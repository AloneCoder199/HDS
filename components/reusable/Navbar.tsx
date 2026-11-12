"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowRight, LogIn, User } from "lucide-react"
import { Logo } from "@/components/reusable/logo"
import { ThemeToggle } from "@/components/reusable/theme-toggle"

const navLinks = [
  { href: "/mentorships", label: "Mentorships" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/verify-certificate", label: "Verify Certificate" },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "glass border-b border-border shadow-soft"
          : "bg-background/70 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary-text"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle — always visible */}
          <ThemeToggle />

          {/* Login Button — desktop & mobile visible */}
          <Link
            href="/login"
            aria-label="Login"
            className="group inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 sm:px-3 py-2 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-primary-text"
          >
            <LogIn className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Login</span>
          </Link>

          {/* CTA — desktop only */}
          <Link
            href="/enroll"
            className="group hidden lg:inline-flex items-center gap-1.5 rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:scale-105"
          >
            Confirm Your Seat
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </header>
  )
}
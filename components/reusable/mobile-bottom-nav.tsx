"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { GraduationCap, Home, ShieldCheck, Star } from "lucide-react"

const leftTabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/mentorships", label: "Courses", icon: GraduationCap },
]

const rightTabs = [
  { href: "/reviews", label: "Reviews", icon: Star },
  { href: "/verify-certificate", label: "Verify", icon: ShieldCheck },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch justify-around">
        {leftTabs.map((t) => {
          const Icon = t.icon
          const active = pathname === t.href
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium ${
                active ? "text-primary-text" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "stroke-[2.5]" : ""}`} />
              {t.label}
            </Link>
          )
        })}

        {/* Center elevated CTA */}
        <Link href="/enroll" className="flex flex-1 flex-col items-center">
          <div className="-mt-5 flex h-12 w-12 items-center justify-center rounded-full gradient-primary shadow-glow ring-4 ring-background">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="mt-1 text-[10px] font-semibold text-primary-text">
            Enroll
          </span>
        </Link>

        {rightTabs.map((t) => {
          const Icon = t.icon
          const active = pathname === t.href
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium ${
                active ? "text-primary-text" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "stroke-[2.5]" : ""}`} />
              {t.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
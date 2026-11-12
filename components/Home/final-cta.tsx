import Link from "next/link"
import { ArrowRight, MessageCircle, Sparkles, ShieldCheck } from "lucide-react"

const WHATSAPP_NUMBER = "923271543140"
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello HDS Team! I want to confirm my seat for Batch 18. Please guide me."
)

export function FinalCTA() {
  return (
    <section className="py-16 lg:py-20 bg-background relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] animate-pulse duration-[5000ms]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] animate-pulse duration-[7000ms]" />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 relative z-10">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-10 lg:p-12 text-center shadow-xl">
          
          {/* Inner Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary-text mb-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="h-3.5 w-3.5" />
              Limited Seats Available
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Ready to Transform <br className="hidden sm:block" />
              <span className="text-gradient">Your Future?</span>
            </h2>
            
            {/* Subtitle */}
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              Join Batch 18 today. Secure your seat for just Rs. 200 and get access to 14 live lectures, real projects, and internship opportunities.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <Link
                href="/enroll"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-primary/40"
              >
                Confirm Your Seat Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-muted hover:scale-105"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366] transition-transform group-hover:scale-110" />
                Chat on WhatsApp
              </Link>
            </div>

            {/* Trust Line */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground animate-in fade-in duration-700 delay-500">
              <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
              <span>
                Payment only to official number:{" "}
                <strong className="text-foreground">0327 1543140</strong> (Ali Hassan).
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
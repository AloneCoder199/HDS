import Link from "next/link"
import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck, Star } from "lucide-react"

const WHATSAPP_NUMBER = "923271543140"
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello HDS Team! I want to apply for the Batch 18 mentorship. Please guide me."
)

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32">
      {/* Background Gradients/Glows */}
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <div className="absolute -top-40 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-50" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] opacity-40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          
          {/* Left Side: Text Content */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            {/* Top Badge */}
            <div className="mx-auto lg:mx-0 mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-text">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              Batch 18 • Registration Open
            </div>

            {/* Main Headline */}
            <h1 className="heading-display text-foreground sm:text-5xl md:text-6xl text-balance">
              Rs. 25,000 Mentorship.
              <br className="hidden sm:block" />
              Yours for just{" "}
              <span className="text-gradient">Rs. 200</span>.
            </h1>

            {/* Sub-headline */}
            <p className="text-lead mt-6 mx-auto lg:mx-0">
              Master <strong className="text-foreground">Artificial Intelligence</strong>,{" "}
              <strong className="text-foreground">Social Media Marketing</strong>, and{" "}
              <strong className="text-foreground">Crypto Trading</strong> with live expert guidance. 
              Batch starts <strong className="text-foreground">6th December</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                href="/enroll"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl gradient-primary px-8 py-3.5 text-base font-bold text-white shadow-glow transition-smooth hover:scale-[1.02] hover:opacity-95"
              >
                Apply Now
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-background/50 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-foreground transition-smooth hover:bg-muted hover:border-primary/30"
              >
                <MessageCircle className="h-5 w-5 text-[#25D366]" />
                Chat on WhatsApp
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {/* Dummy avatars for trust */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-muted overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="Student" className="h-full w-full object-cover" />
                  </div>
                ))}
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-primary/10 text-[10px] font-bold text-primary-text">
                  15k+
                </div>
              </div>
              <div className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-accent text-accent" />
                Trusted by 15,000+ students across Pakistan
              </div>
            </div>
          </div>

          {/* Right Side: Image & Floating Badges */}
          <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
            {/* Image Frame with Glass Effect */}
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square overflow-hidden rounded-3xl border border-border/50 bg-card shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-overlay z-10" />
              
              {/* ⚠️ Yahan Ali Hassan ya students ki real photo aayegi */}
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
                alt="Ali Hassan - Founder & Mentor"
                className="h-full w-full object-cover"
              />
              
              {/* Dark gradient overlay at bottom for text readability */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-10" />
              
              <div className="absolute bottom-6 left-6 z-20">
                <p className="text-white font-bold text-xl">Ali Hassan</p>
                <p className="text-white/80 text-sm">Founder & Mentor</p>
              </div>
            </div>

            {/* Floating Badge 1: Certified */}
            <div className="absolute -right-4 sm:-right-8 top-10 z-20 flex items-center gap-3 rounded-2xl border border-border bg-background/90 p-3 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Meta & Google</p>
                <p className="text-[10px] text-muted-foreground">Certified Mentor</p>
              </div>
            </div>

            {/* Floating Badge 2: Live Classes */}
            <div className="absolute -left-4 sm:-left-8 bottom-20 z-20 flex items-center gap-3 rounded-2xl border border-border bg-background/90 p-3 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-left-8 duration-700 delay-150">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/10">
                <CheckCircle2 className="h-5 w-5 text-[#25D366]" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">100% Live</p>
                <p className="text-[10px] text-muted-foreground">Interactive Classes</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
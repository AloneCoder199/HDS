import { Sparkles, Star, Users, Video } from "lucide-react"

export function ReviewsHero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-14 lg:pt-20 lg:pb-20 bg-background">
      {/* Animated Background Orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse duration-[6000ms]" />
        <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-yellow-400/10 rounded-full blur-[100px] animate-pulse duration-[4000ms]" />
        <div className="absolute top-20 left-1/4 w-[250px] h-[250px] bg-accent/10 rounded-full blur-[100px] animate-pulse duration-[5000ms]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Badge with bounce */}
        <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-xs font-bold text-yellow-600 dark:text-yellow-500 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Star className="h-4 w-4 fill-current animate-[spin_4s_linear_infinite]" />
          100% Real Student Feedback
        </div>

        {/* Heading with gradient */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          Student <span className="text-gradient">Success Stories</span>
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          Real reviews from students who transformed their careers with HDS mentorships. Watch video testimonials and browse genuine WhatsApp screenshots.
        </p>

        {/* Stats — bigger cards */}
        <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="group flex flex-col items-center gap-1 rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-primary/30">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 mb-1 transition-transform duration-300 group-hover:scale-110">
              <Users className="h-5 w-5 text-primary-text" />
            </div>
            <p className="text-lg sm:text-2xl font-bold text-foreground">15,000+</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Students</p>
          </div>

          <div className="group flex flex-col items-center gap-1 rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-primary/30">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 mb-1 transition-transform duration-300 group-hover:scale-110">
              <Video className="h-5 w-5 text-purple-500" />
            </div>
            <p className="text-lg sm:text-2xl font-bold text-foreground">6</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Video Reviews</p>
          </div>

          <div className="group flex flex-col items-center gap-1 rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-primary/30">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 mb-1 transition-transform duration-300 group-hover:scale-110">
              <Star className="h-5 w-5 text-amber-500" />
            </div>
            <p className="text-lg sm:text-2xl font-bold text-foreground">24+</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Screenshots</p>
          </div>
        </div>
      </div>
    </section>
  )
}
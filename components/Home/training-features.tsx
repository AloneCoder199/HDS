import { 
  Award, 
  Briefcase, 
  MessageSquare, 
  PenTool, 
  PlayCircle, 
  Rocket, 
  UserCheck, 
  Video 
} from "lucide-react"

const features = [
  {
    title: "100% Live Interactive Classes",
    description: "Attend live sessions on Zoom and interact directly with Ali Hassan. No boring recorded videos.",
    icon: Video,
    className: "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-primary/10 to-transparent",
    iconColor: "text-primary",
  },
  {
    title: "Class Recordings",
    description: "Missed a class? No worries. Get access to all session recordings.",
    icon: PlayCircle,
    className: "md:col-span-1 lg:col-span-1",
    iconColor: "text-accent",
  },
  {
    title: "Daily Practical Assignments",
    description: "Implement what you learn with daily hands-on tasks.",
    icon: PenTool,
    className: "md:col-span-1 lg:col-span-1",
    iconColor: "text-blue-500",
  },
  {
    title: "Live Client-Based Projects",
    description: "Work on real-world projects to build a strong portfolio.",
    icon: Briefcase,
    className: "md:col-span-2 lg:col-span-2",
    iconColor: "text-purple-500",
  },
  {
    title: "Private WhatsApp Community",
    description: "Network with fellow students and stay updated.",
    icon: MessageSquare,
    className: "md:col-span-1 lg:col-span-1",
    iconColor: "text-green-500",
  },
  {
    title: "Direct Mentor Support",
    description: "Get your questions answered directly by the mentor.",
    icon: UserCheck,
    className: "md:col-span-1 lg:col-span-1",
    iconColor: "text-orange-500",
  },
  {
    title: "Free E-Certificate",
    description: "Receive an HDS Certified e-Certificate upon completion, verifiable online.",
    icon: Award,
    className: "md:col-span-1 lg:col-span-1",
    iconColor: "text-amber-500",
  },
  {
    title: "Internship & Job Opportunities",
    description: "Top performers get opportunities for internships, freelancing, and remote jobs.",
    icon: Rocket,
    className: "md:col-span-1 lg:col-span-1",
    iconColor: "text-rose-500",
  },
]

export function TrainingFeatures() {
  return (
    <section className="py-20 lg:py-28 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <p className="text-eyebrow mb-3">What You Get</p>
          <h2 className="heading-section text-foreground">
            Everything You Need to Succeed
          </h2>
          <p className="text-lead mx-auto mt-4 text-center">
            We don't just teach theory. We provide a complete ecosystem—from live interactive classes to real client projects and job opportunities.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${feature.className}`}
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-background border border-border/50 shadow-sm">
                    <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary-text transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
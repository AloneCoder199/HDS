import Link from 'next/link';

export default function PremiumHero() {
  const features = [
    "Live Interactive Classes",
    "Hardcopy Certificate",
    "Internship Letter",
    "AI-Powered Learning",
    "Expert Mentorship",
    "WhatsApp Community Support",
    "Career & Freelancing",
    "Scholarship Program"
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center bg-background text-foreground overflow-hidden selection:bg-primary/20 selection:text-primary transition-colors duration-300">
      
      {/* Unique Professional Background: Subtle Tech Grid & Glows using Theme Colors */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(52,149,235,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(52,149,235,0.05)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[500px] h-[500px] rounded-full bg-royalblue/10 blur-[100px] opacity-60 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Content Area (Spans 7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Sleek Trust Badges */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <span className="relative flex h-2.5 w-2.5 mr-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span className="text-xs md:text-sm font-semibold text-primary tracking-wide">SECP Registered</span>
              </div>
              <div className="px-4 py-1.5 rounded-full bg-muted border border-border text-xs md:text-sm font-semibold text-muted-foreground tracking-wide">
                Established 2023
              </div>
            </div>

            {/* Main Typography Setup */}
            <div className="space-y-4">
              <h2 className="text-primary font-bold tracking-widest uppercase text-sm md:text-base">
                Hassan Digital Skills (HDS)
              </h2>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground leading-[1.1] tracking-tight">
                Master Skills.<br />
                <span className="text-gradient-primary">
                  Build Your Future.
                </span>
              </h1>
              <p className="text-xl md:text-2xl font-medium text-foreground/90 mt-4 border-l-4 border-primary pl-4">
                Pakistan's Leading Digital Skills & Career Platform
              </p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl font-light">
              A premium, scholarship-based ecosystem designed to help students, freelancers, and professionals master high-income digital skills through practical training and real-world projects.
            </p>

            {/* Interactive Call To Actions */}
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link 
                href="/scholarship" 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-primary-foreground transition-all duration-300 bg-primary rounded-xl overflow-hidden shadow-soft hover:shadow-glow hover:-translate-y-1"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-royalblue group-hover:scale-105 transition-transform duration-500"></div>
                <span className="relative flex items-center">
                  Apply For Scholarship
                  <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link 
                href="/courses" 
                className="inline-flex justify-center items-center px-8 py-4 text-base font-bold text-foreground bg-background border-2 border-border hover:border-primary hover:text-primary rounded-xl transition-all duration-300 hover:-translate-y-1"
              >
                Explore Courses
              </Link>
            </div>
          </div>

          {/* Right Content Area: Unique Glassmorphism Feature Deck (Spans 5 Columns) */}
          <div className="lg:col-span-5 relative mt-10 lg:mt-0">
            
            {/* Floating Stats Badge (Top Right) */}
            <div className="absolute -top-8 -right-4 md:-right-8 z-20 bg-card p-4 rounded-2xl shadow-soft border border-border animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  <img className="w-10 h-10 rounded-full border-2 border-background object-cover" src="https://i.pravatar.cc/100?img=1" alt="User" />
                  <img className="w-10 h-10 rounded-full border-2 border-background object-cover" src="https://i.pravatar.cc/100?img=5" alt="User" />
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">+</div>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">10,000+</p>
                  <p className="text-xs font-medium text-muted-foreground">Students Trained</p>
                </div>
              </div>
            </div>

            {/* Main Feature Glass Card - Using your custom .glass utility */}
            <div className="relative z-10 glass p-8 rounded-3xl shadow-soft border border-border">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-foreground">Why Choose HDS?</h3>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
              </div>

              {/* Grid of Features with Custom Checkmarks */}
              <ul className="space-y-4">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-center group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary transition-colors duration-300">
                      <svg className="w-3.5 h-3.5 text-primary group-hover:text-primary-foreground transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-foreground/90 font-medium group-hover:text-primary transition-colors duration-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Bottom Card Footer */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-bold uppercase tracking-wider">AI-Integrated</span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground rounded-lg text-xs font-bold uppercase tracking-wider">Career-Focused</span>
                </div>
              </div>
            </div>

            {/* Decorative abstract elements behind the card */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMzNDk1RUIiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] z-0"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
import Link from "next/link"
import { ArrowRight, Award, QrCode, ShieldCheck, Sparkles } from "lucide-react"

export function CertificatePreview() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-muted/20">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Text Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary-text mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Verifiable Credential
            </div>

            <h2 className="heading-section text-foreground mb-4">
              Get Your <span className="text-gradient">HDS Certified</span> <br />
              e-Certificate
            </h2>
            
            <p className="text-lead mb-8">
              Upon successfully completing the training, you'll receive a premium e-Certificate from Hassan Digital Skills. Each certificate comes with a unique ID and QR code so anyone can verify it online in seconds.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                  <ShieldCheck className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Unique Certificate ID</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Every certificate has a unique ID for authenticity.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                  <QrCode className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">QR Code Verification</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Scan the QR code to instantly verify your certificate.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                  <Award className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Industry Recognized</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Share on LinkedIn & your portfolio to boost credibility.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/verify-certificate"
                className="inline-flex items-center justify-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-bold text-white shadow-glow transition-smooth hover:scale-[1.02] hover:opacity-95"
              >
                Verify a Certificate
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/enroll"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-smooth hover:bg-muted hover:border-primary/30"
              >
                Enroll to Get Yours
              </Link>
            </div>
          </div>

          {/* Right Side: Certificate Mockup */}
          <div className="order-1 lg:order-2 relative">
            
            {/* Certificate Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-white rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              
              {/* Certificate Border */}
              <div className="m-3 rounded-xl border-2 border-primary/30 overflow-hidden">
                
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0A3A75] via-[#0f4d94] to-[#0A3A75] px-6 py-5 text-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white" />
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-yellow-300" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-[10px] font-bold tracking-[0.3em] text-yellow-300 mb-1">
                      HASSAN DIGITAL SKILLS
                    </p>
                    <p className="text-[8px] text-white/80 tracking-widest">
                      Empowering Youth With Digital Skills
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="bg-white px-6 py-6 text-center">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-slate-500 mb-2">
                    CERTIFICATE OF COMPLETION
                  </p>
                  <div className="w-12 h-0.5 bg-yellow-400 mx-auto mb-4" />
                  
                  <p className="text-[10px] text-slate-500 mb-1">This is to certify that</p>
                  <p className="text-lg font-bold text-slate-900 mb-1" style={{ fontFamily: "serif" }}>
                    Student Name
                  </p>
                  <div className="w-32 h-px bg-slate-300 mx-auto mb-3" />
                  
                  <p className="text-[10px] text-slate-500 leading-relaxed px-2">
                    has successfully completed the <br />
                    <span className="font-bold text-slate-800">Artificial Intelligence Mentorship</span> <br />
                    Batch 18, under the guidance of Ali Hassan.
                  </p>

                  {/* Bottom Row */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
                    <div className="text-left">
                      <p className="text-[8px] text-slate-400">Certificate ID</p>
                      <p className="text-[10px] font-bold text-slate-700">HDS-AI-00123</p>
                    </div>
                    
                    {/* QR Code Mockup */}
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-slate-100 border border-slate-200">
                      <QrCode className="h-6 w-6 text-slate-700" />
                    </div>
                    
                    <div className="text-right">
                      <p className="text-[8px] text-slate-400">Issued On</p>
                      <p className="text-[10px] font-bold text-slate-700">01 Jan 2027</p>
                    </div>
                  </div>
                </div>

                {/* Footer Signature */}
                <div className="bg-slate-50 px-6 py-3 flex items-center justify-between border-t border-slate-200">
                  <p className="text-[8px] text-slate-500">HDS Certified e-Certificate</p>
                  <p className="text-[10px] font-serif italic font-bold text-slate-800">Ali Hassan</p>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 lg:-left-6 bg-background border border-border rounded-xl shadow-lg p-3 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10">
                <ShieldCheck className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Status</p>
                <p className="text-xs font-bold text-foreground">Verified ✓</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
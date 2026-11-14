import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Award, QrCode, ShieldCheck, Sparkles } from "lucide-react"

export function CertificatePreview() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-20 bg-muted/20">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ═══ LEFT: Text Content ═══ */}
          <div className="order-2 lg:order-1 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary-text mb-4">
              <Sparkles className="h-3 w-3" />
              Verifiable Credential
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 leading-tight">
              Get Your <span className="text-gradient">HDS Certified</span>{" "}
              <br className="hidden sm:block" />
              e-Certificate
            </h2>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Upon completing the training, you receive a premium e-Certificate
              from Hassan Digital Skills. Each certificate has a unique ID and
              QR code — verifiable online in seconds.
            </p>

            {/* Features */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    Unique Certificate ID
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Every certificate has a unique ID for authenticity.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                  <QrCode className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    QR Code Verification
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Scan the QR code to instantly verify the certificate.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                  <Award className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    Industry Recognized
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Share on LinkedIn & your portfolio to boost credibility.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <Link
                href="/verify-certificate"
                className="inline-flex items-center justify-center gap-2 rounded-xl gradient-primary px-5 py-2.5 text-sm font-bold text-white shadow-glow transition-all hover:scale-[1.02]"
              >
                Verify a Certificate
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/enroll"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-muted hover:border-primary/30"
              >
                Enroll to Get Yours
              </Link>
            </div>
          </div>

          {/* ═══ RIGHT: Real Certificate Image ═══ */}
          <div className="order-1 lg:order-2 relative animate-in fade-in slide-in-from-right-8 duration-700">
            {/* Certificate Frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-background bg-white rotate-[-1.5deg] hover:rotate-0 transition-transform duration-500">
              {/* Real Certificate Image */}
              <Image
                src="/Certificate/Fatima Bibi.png"
                alt="HDS Certified e-Certificate — Sample"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />

              {/* Subtle vignette overlay */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_60px_rgba(0,0,0,0.1)]" />
            </div>

            {/* Floating "Verified" badge (bottom-left) */}
            <div className="absolute -bottom-4 -left-4 lg:-left-6 bg-background border border-border rounded-xl shadow-xl p-3 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10">
                <ShieldCheck className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  Status
                </p>
                <p className="text-xs font-bold text-foreground leading-tight">
                  Verified ✓
                </p>
              </div>
            </div>

            {/* Floating "QR" badge (top-right) */}
            <div className="absolute -top-3 -right-3 bg-background border border-border rounded-xl shadow-xl p-2.5 flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-700 delay-500">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <QrCode className="h-4 w-4 text-primary-text" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-foreground leading-tight">
                  Scan to Verify
                </p>
                <p className="text-[9px] text-muted-foreground leading-tight">
                  /verify-certificate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
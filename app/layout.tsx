import type { Metadata, Viewport } from "next" // ✅ Viewport import fix
import "./globals.css"
import { Providers } from "./providers"
import { Shell } from "@/components/layout/shell"
import { ServiceWorkerRegister } from "@/components/service-worker-register"
import { InstallPrompt } from "@/components/install-prompt"

export const metadata: Metadata = {
  title: {
    default: "Hassan Digital Skills | Empowering Youth With Digital Skills",
    template: "%s | Hassan Digital Skills",
  },
  description:
    "Rs. 25,000 ki mentorship, scholarship par sirf Rs. 200 seat confirmation fee. AI, Social Media Marketing aur Crypto Trading — Batch 18 starts 6 December 2026.",
  keywords: [
    "Hassan Digital Skills",
    "HDS",
    "AI mentorship Pakistan",
    "Social Media Marketing course",
    "Crypto Trading course",
    "Rs 200 scholarship",
    "online mentorship Pakistan",
    "Ali Hassan",
  ],
  manifest: "/manifest.webmanifest",
  applicationName: "Hassan Digital Skills",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HDS",
  },
  authors: [{ name: "CodEarn Tech", url: "https://codearntech.com" }],
  creator: "CodEarn Tech",
  publisher: "Hassan Digital Skills",
  metadataBase: new URL("https://hassandigitalskills.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Hassan Digital Skills | Empowering Youth",
    description:
      "Master AI, Social Media Marketing & Crypto Trading with live mentorship. Market value Rs. 25,000 — yours for just Rs. 200.",
    url: "https://hassandigitalskills.com",
    siteName: "Hassan Digital Skills",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hassan Digital Skills — Empowering Youth",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hassan Digital Skills | Empowering Youth",
    description:
      "Master AI, SMM & Crypto Trading with live mentorship. Rs. 25,000 value — yours for Rs. 200.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    designer: "CodEarn Tech",
    developer: "CodEarn Tech",
    "developer-url": "https://codearntech.com",
    "built-with": "Next.js, TypeScript, Tailwind CSS",
  },
  verification: {
    // google: "your-search-console-code",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // ✅ Better accessibility (was 1 — blocks zoom)
  userScalable: true, // ✅ Allow zoom (accessibility standard)
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3495EB" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1220" },
  ],
  viewportFit: "cover", // iPhone notch safe area
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ═══ JSON-LD: Organization (HDS) ═══ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "@id": "https://hassandigitalskills.com/#organization",
              name: "Hassan Digital Skills",
              alternateName: "HDS",
              url: "https://hassandigitalskills.com",
              logo: "https://hassandigitalskills.com/logo.jpeg",
              description:
                "Pakistani digital skills education platform offering AI, Social Media Marketing, and Crypto Trading mentorships with live classes and internships.",
              founder: {
                "@type": "Person",
                name: "Ali Hassan",
                jobTitle: "Founder & Mentor",
                knowsAbout: [
                  "Artificial Intelligence",
                  "Social Media Marketing",
                  "Crypto Trading",
                ],
              },
              foundingDate: "2023",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Samundri",
                addressRegion: "Punjab",
                addressCountry: "PK",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+92-327-1543140",
                contactType: "customer service",
                availableLanguage: ["English", "Urdu"],
              },
              sameAs: [
                "https://www.facebook.com/HassanDigitalSkills",
                "https://www.instagram.com/hds_pakistan_/",
                "https://youtube.com/@hassandigitalskills",
              ],
            }),
          }}
        />

        {/* ═══ JSON-LD: WebSite ═══ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://hassandigitalskills.com/#website",
              url: "https://hassandigitalskills.com",
              name: "Hassan Digital Skills",
              publisher: {
                "@id": "https://hassandigitalskills.com/#organization",
              },
              inLanguage: "en-PK",
            }),
          }}
        />

        {/* ═══ JSON-LD: Developer — CodEarn Tech ═══ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": "https://hassandigitalskills.com/#developer",
              name: "CodEarn Tech",
              url: "https://codearntech.com",
              email: "hello@codearntech.com",
              description:
                "CodEarn Tech builds custom SaaS platforms, web apps, and mobile applications for businesses worldwide. Founded in 2020 as a remote-first engineering team, they designed and developed this website end-to-end.",
              foundingDate: "2020",
              areaServed: [
                { "@type": "Country", name: "United Arab Emirates" },
                { "@type": "Country", name: "Saudi Arabia" },
                { "@type": "Country", name: "Bahrain" },
                { "@type": "Country", name: "Pakistan" },
              ],
              knowsAbout: [
                "Custom SaaS Development",
                "Web Application Development",
                "Mobile App Development",
                "Business Automation",
                "Next.js",
                "TypeScript",
                "React",
                "Node.js",
                "Tailwind CSS",
                "MongoDB",
                "PostgreSQL",
                "Prisma",
                "OpenAI API",
                "Stripe",
                "Docker",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Custom SaaS Platforms",
                      description:
                        "Multi-tenant SaaS with authentication, Stripe billing, admin dashboards, and scalable architecture.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Web Platforms",
                      description:
                        "Fast web apps and business portals built with Next.js and React — SEO-optimized.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Mobile Applications",
                      description:
                        "Cross-platform iOS & Android apps built with React Native and Expo.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Business Automation",
                      description:
                        "Automated business workflows that connect existing tools and remove manual steps.",
                    },
                  },
                ],
              },
            }),
          }}
        />

        {/* ═══ PWA: Apple touch icon + Splash ═══ */}
        <link rel="apple-touch-icon" href="/icon-192.jpg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* ✅ PWA Service Worker registration (invisible) */}
        <ServiceWorkerRegister />

        <Providers>
          <Shell>{children}</Shell>
        </Providers>

        {/* ✅ PWA Install prompt (Chrome + iOS) */}
        <InstallPrompt />
      </body>
    </html>
  )
}
import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"
import { Shell } from "@/components/layout/shell"

export const metadata: Metadata = {
  title: "Hassan Digital Skills | Empowering Youth",
  description:
    "Rs. 25,000 ki mentorship, scholarship par sirf Rs. 200 seat confirmation fee.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  )
}
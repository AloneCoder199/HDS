import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Shell>{children}</Shell>
        </ThemeProvider>
      </body>
    </html>
  )
}
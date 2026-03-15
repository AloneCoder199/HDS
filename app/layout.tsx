import type { Metadata } from "next";
import { Open_Sans } from "next/font/google"; // 1. Open Sans import karein
import "./globals.css";
import { ThemeProvider } from "@/app/providers";
import Navbar from "@/components/reusable/Navbar";
import Footer from "@/components/reusable/Footer";
import AuthProvider from "@/components/providers/SessionProvider";
import { Toaster } from "sonner";

// 2. Open Sans configure karein (Inter aur Jakarta ko delete kar dein)
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
  weight: ['300', '400', '500', '600', '700', '800'], // Zaruri weights
});

export const metadata: Metadata = {
  title: "HDS | Course Platform",
  description: "Professional Course Enrollment System by Hassan Digital Skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      // 3. Purani variables hata kar sirf openSans.variable lagayein
      className={`${openSans.variable}`}
    >
      {/* 4. body mein font-family apply karein */}
      <body className={`${openSans.className} antialiased bg-white dark:bg-[#0B1220] text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex-col min-h-screen flex">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster position="top-center" richColors closeButton />
          </ThemeProvider>
        </AuthProvider>

      </body>
    </html>
  );
}

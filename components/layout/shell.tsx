"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "../reusable/Navbar"
import { Footer } from "../reusable/Footer"
import { WhatsAppFloat } from "../reusable/whatsapp-float"
import { ChatWidget } from "@/components/chatbot/chat-widget"
import { MobileBottomNav } from "../reusable/mobile-bottom-nav"

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isChat = pathname.startsWith("/hds-agent")

  if (isChat) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main className="pb-20 lg:pb-0">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <ChatWidget />
      <MobileBottomNav />
    </>
  )
}
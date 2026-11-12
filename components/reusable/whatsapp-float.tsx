import Link from "next/link"
import { MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "923271543140"

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello HDS Team! I'd like to know more about your mentorships and the Rs. 200 seat confirmation process. Please guide me."
)

export function WhatsAppFloat() {
  return (
    <Link
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 bottom-24 lg:bottom-6 lg:left-6"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />
      <MessageCircle className="relative h-6 w-6" />

      {/* Tooltip — opens to the RIGHT now (since button is on left) */}
      <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block">
        Chat on WhatsApp
      </span>
    </Link>
  )
}
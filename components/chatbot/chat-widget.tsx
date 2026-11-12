"use client"

import { useEffect, useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { ChatInterface } from "./chat-interface"

export function ChatWidget() {
  const [open, setOpen] = useState(false)

  // Auto-open on first visit? Optional
  useEffect(() => {
    // Lock scroll when widget sheet is open on mobile
    if (open && window.innerWidth < 640) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    }
  }, [open])

  return (
    <>
      {/* ─── Chat Sheet ─── */}
      {open && (
        <div
          className="
            fixed z-[55] flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl
            animate-in slide-in-from-bottom-4 fade-in duration-300
            /* mobile */
            left-3 right-3 top-4 bottom-44
            /* desktop */
            sm:left-auto sm:right-6 sm:bottom-24 sm:top-auto sm:w-[380px] sm:h-[560px] sm:max-h-[calc(100vh-7rem)]
          "
        >
          <ChatInterface variant="widget" onClose={() => setOpen(false)} />
        </div>
      )}

      {/* ─── Animated FAB ─── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with HDS Assistant"}
        className="
          group fixed z-[56] flex h-14 w-14 items-center justify-center rounded-full
          gradient-primary text-white shadow-2xl
          transition-all duration-300
          hover:scale-105 hover:shadow-glow
          bottom-24 right-4
          lg:bottom-6 lg:right-6
        "
      >
        {/* Pulse ring */}
        {!open && (
          <>
            <span className="absolute inset-0 rounded-full bg-primary opacity-40 animate-ping" />
            <span className="absolute inset-0 rounded-full bg-primary opacity-20 animate-ping [animation-delay:500ms]" />
          </>
        )}

        {/* Icon — morph between chat & close */}
        <span className="relative z-10 transition-transform duration-300">
          {open ? (
            <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
          ) : (
            <MessageCircle className="h-6 w-6 transition-transform duration-300 group-hover:rotate-6" />
          )}
        </span>

        {/* Notification dot (only when closed & no persisted chat) */}
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 z-20 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-yellow-400 border-2 border-background" />
          </span>
        )}
      </button>
    </>
  )
}
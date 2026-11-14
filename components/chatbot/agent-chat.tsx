"use client"

import { useEffect, useRef, useState, memo } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowUp,
  Bot,
  Brain,
  Check,
  Copy,
  GraduationCap,
  Plus,
  Sparkles,
  Square,
  Zap,
} from "lucide-react"
import { MarkdownRenderer } from "./markdown"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: number
}

const SUGGESTIONS = [
  { title: "Mentorship fees", desc: "What is the actual fee for HDS mentorships?", icon: Sparkles },
  { title: "AI curriculum", desc: "Explain the AI mentorship modules", icon: Brain },
  { title: "How to enroll", desc: "How do I enroll in Batch 18?", icon: GraduationCap },
  { title: "Recordings", desc: "Are class recordings available?", icon: Zap },
]

const STORAGE_KEY = "hds-agent-chat"

// ⏱️ Client-side safety
const READ_TIMEOUT = 25_000         // 25s — max gap between reads
const SAFETY_TIMEOUT = 60_000       // 60s — hard cap
const FLUSH_INTERVAL = 80           // 80ms — batch state updates (KEY!)

function uid() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function AgentChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setMessages(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    if (!mounted) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch {}
  }, [messages, mounted])

  // Auto-scroll — RAF throttled
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const raf = requestAnimationFrame(() => {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: isStreaming ? "auto" : "smooth",
      })
    })
    return () => cancelAnimationFrame(raf)
  }, [messages, isStreaming])

  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = Math.min(el.scrollHeight, 160) + "px"
  }, [input])

  const stopStreaming = () => {
    abortRef.current?.abort()
    abortRef.current = null
    setIsStreaming(false)
  }

  const startNewChat = () => {
    stopStreaming()
    setMessages([])
    setInput("")
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }

  // ═══════════════════════════════════════════════════════════════════
  // ✅ KEY FIX — THROTTLED UPDATES
  // Buffer chunks, flush to state only every 80ms.
  // This reduces re-renders from ~200 to ~15 per response.
  // ═══════════════════════════════════════════════════════════════════
  const handleSend = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isStreaming) return

    const userMsg: Message = {
      id: uid(),
      role: "user",
      content: trimmed,
      createdAt: Date.now(),
    }
    const assistantId = uid()
    const assistantMsg: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      createdAt: Date.now(),
    }

    const nextMessages = [...messages, userMsg]
    setMessages([...nextMessages, assistantMsg])
    setInput("")
    setIsStreaming(true)

    const controller = new AbortController()
    abortRef.current = controller

    const safetyTimer = setTimeout(() => {
      if (!controller.signal.aborted) controller.abort()
    }, SAFETY_TIMEOUT)

    // ─── Buffer + flush mechanism ───
    let accumulated = ""
    let flushTimer: NodeJS.Timeout | null = null

    const flush = () => {
      if (flushTimer) { clearTimeout(flushTimer); flushTimer = null }
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, content: accumulated } : m))
      )
    }

    const scheduleFlush = () => {
      if (flushTimer) return // already scheduled
      flushTimer = setTimeout(flush, FLUSH_INTERVAL)
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: controller.signal,
      })

      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`)

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        // Race read() against timeout
        const readPromise = reader.read()
        const timeoutPromise = new Promise<{ __timeout: true }>((resolve) => {
          setTimeout(() => resolve({ __timeout: true }), READ_TIMEOUT)
        })

        const result = await Promise.race([readPromise, timeoutPromise])

        if ("__timeout" in result) {
          console.warn("[client] READ_TIMEOUT — no data for 25s")
          controller.abort()
          break
        }

        const { value, done } = result
        if (done) break

        accumulated += decoder.decode(value, { stream: true })
        scheduleFlush()
      }

      // Final flush — ensure everything is rendered
      flush()
    } catch (err: any) {
      const isAbort = err?.name === "AbortError"
      if (!isAbort) {
        console.error("[client] Fetch error:", err)
        accumulated +=
          (accumulated ? "\n\n" : "") +
          "⚠️ Connection issue. Please try again or WhatsApp 0327 1543140."
      } else if (accumulated.length === 0) {
        accumulated = "⚠️ Response interrupted. Please try again."
      } else {
        accumulated += "\n\n⚠️ Response was interrupted."
      }
      flush()
    } finally {
      if (flushTimer) clearTimeout(flushTimer)
      clearTimeout(safetyTimer)
      abortRef.current = null
      setIsStreaming(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend(input)
    }
  }

  const copyMessage = async (msg: Message) => {
    try {
      await navigator.clipboard.writeText(msg.content)
      setCopiedId(msg.id)
      setTimeout(() => setCopiedId(null), 1500)
    } catch {}
  }

  const isEmpty = messages.length === 0

  return (
    <div className="flex h-dvh flex-col bg-background">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border/60 bg-background/80 backdrop-blur-md px-4">
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            aria-label="Back to home"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <div className="relative flex h-7 w-7 items-center justify-center rounded-full gradient-primary shadow-glow">
              <Bot className="h-3.5 w-3.5 text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background">
                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-60" />
              </span>
            </div>
            <div className="leading-tight">
              <p className="text-[13px] font-bold text-foreground">HDS Assistant</p>
              <p className="text-[10px] text-green-500 font-medium">
                {isStreaming ? "Typing..." : "Online"}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={startNewChat}
          disabled={isEmpty}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-[11px] font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary-text disabled:opacity-40 disabled:pointer-events-none"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">New Chat</span>
        </button>
      </header>

      {/* Messages */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
          {isEmpty ? (
            <EmptyState onSuggestion={handleSend} />
          ) : (
            <div className="space-y-6">
              {messages.map((msg, idx) => (
                <MessageRow
                  key={msg.id}
                  message={msg}
                  onCopy={() => copyMessage(msg)}
                  copied={copiedId === msg.id}
                  isStreaming={
                    isStreaming &&
                    msg.role === "assistant" &&
                    idx === messages.length - 1
                  }
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Input */}
      <div className="shrink-0 border-t border-border/40 bg-background/80 backdrop-blur-md px-4 pt-3 pb-4">
        <div className="mx-auto max-w-3xl">
          <div className="relative flex items-end gap-2 rounded-2xl border border-border bg-card shadow-sm transition-all focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message HDS Assistant..."
              rows={1}
              disabled={isStreaming}
              className="flex-1 resize-none bg-transparent px-4 py-3 text-[13px] leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:outline-none max-h-40 scrollbar-thin disabled:opacity-60"
            />
            <div className="p-2">
              {isStreaming ? (
                <button
                  onClick={stopStreaming}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background transition-all hover:opacity-80"
                  aria-label="Stop"
                >
                  <Square className="h-3 w-3 fill-current" />
                </button>
              ) : (
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim()}
                  className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary text-white transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
                  aria-label="Send"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <p className="mt-2 text-center text-[10px] text-muted-foreground/70">
            HDS Assistant can make mistakes. Please verify with{" "}
            <a
              href="https://wa.me/923271543140"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-text hover:underline"
            >
              WhatsApp 0327 1543140
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Empty State ─── */
function EmptyState({ onSuggestion }: { onSuggestion: (t: string) => void }) {
  return (
    <div className="flex flex-col items-center pt-8 sm:pt-16 animate-in fade-in duration-500">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary shadow-glow">
        <Sparkles className="h-7 w-7 text-white" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-1">
        How can I help you?
      </h1>
      <p className="text-[13px] text-muted-foreground text-center mb-8 max-w-sm">
        Ask anything about HDS mentorships, fees, batches, or enrollment.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-xl">
        {SUGGESTIONS.map((s, i) => {
          const Icon = s.icon
          return (
            <button
              key={i}
              onClick={() => onSuggestion(s.desc)}
              className="group flex items-start gap-2.5 rounded-xl border border-border bg-card p-3 text-left transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:-translate-y-0.5"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary-text transition-transform group-hover:scale-110">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-foreground leading-tight">{s.title}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{s.desc}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Message Row — memoized ─── */
const MessageRow = memo(function MessageRow({
  message,
  onCopy,
  copied,
  isStreaming,
}: {
  message: Message
  onCopy: () => void
  copied: boolean
  isStreaming: boolean
}) {
  const isUser = message.role === "user"
  const isEmpty = !message.content && !isUser

  if (isUser) {
    return (
      <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-muted px-4 py-2.5">
          <p className="text-[13px] leading-relaxed text-foreground whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="group flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full gradient-primary text-white shadow-glow">
        <Bot className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        {isEmpty ? (
          <div className="flex items-center gap-1 py-1">
            <Dot delay="0ms" />
            <Dot delay="150ms" />
            <Dot delay="300ms" />
          </div>
        ) : (
          <div className="relative">
            <div className="text-[13px] leading-relaxed text-foreground">
              <MarkdownRenderer content={message.content} />
              {isStreaming && (
                <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-foreground/70 animate-pulse rounded-sm" />
              )}
            </div>
            {!isStreaming && (
              <button
                onClick={onCopy}
                className="absolute -bottom-6 left-0 flex items-center gap-1 rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:text-foreground"
              >
                {copied ? (
                  <><Check className="h-2.5 w-2.5 text-green-500" /> Copied</>
                ) : (
                  <><Copy className="h-2.5 w-2.5" /> Copy</>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}, (prev, next) => {
  // Only re-render when content or streaming state changes
  return (
    prev.message.id === next.message.id &&
    prev.message.content === next.message.content &&
    prev.copied === next.copied &&
    prev.isStreaming === next.isStreaming
  )
})

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce"
      style={{ animationDelay: delay }}
    />
  )
}
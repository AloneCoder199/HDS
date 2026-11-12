"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowUpRight,
  Bot,
  Check,
  Copy,
  Loader2,
  Send,
  Sparkles,
  Square,
  Trash2,
  X,
} from "lucide-react"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: number
}

type Props = {
  variant?: "widget" | "fullscreen"
  onClose?: () => void
  persistKey?: string
}

const SUGGESTIONS = [
  "What is the fee for mentorship?",
  "Which 3 mentorships are available?",
  "How do I enroll in Batch 18?",
  "Are class recordings available?",
]

function uid() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function ChatInterface({
  variant = "widget",
  onClose,
  persistKey = "hds-chat-v1",
}: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Load persisted messages
  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem(persistKey)
      if (saved) setMessages(JSON.parse(saved))
    } catch {}
  }, [persistKey])

  // Save messages
  useEffect(() => {
    if (!mounted) return
    try {
      localStorage.setItem(persistKey, JSON.stringify(messages))
    } catch {}
  }, [messages, mounted, persistKey])

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (variant === "fullscreen") inputRef.current?.focus()
  }, [variant])

  const stopStreaming = () => {
    abortRef.current?.abort()
    abortRef.current = null
    setIsStreaming(false)
  }

  const clearChat = () => {
    stopStreaming()
    setMessages([])
    try {
      localStorage.removeItem(persistKey)
    } catch {}
  }

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

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: controller.signal,
      })

      if (!res.ok || !res.body) {
        throw new Error("Chat request failed")
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ""

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        accumulated += chunk
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: accumulated } : m))
        )
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    m.content +
                    (m.content ? "\n\n" : "") +
                    "⚠️ Connection issue. Please try again or WhatsApp 0327 1543140.",
                }
              : m
          )
        )
      }
    } finally {
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
    <div className="flex h-full flex-col overflow-hidden bg-background">
      {/* ─── Header ─── */}
      <header className="flex items-center justify-between gap-2 border-b border-border bg-card/60 backdrop-blur-md px-3 py-2.5 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full gradient-primary shadow-glow">
            <Bot className="h-4.5 w-4.5 text-white" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-background">
              <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-60" />
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-foreground leading-tight">
              HDS Assistant
            </p>
            <p className="text-[10px] text-green-500 font-medium leading-tight">
              Online · replies instantly
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              aria-label="Clear chat"
              title="Clear chat"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}

          {variant === "widget" && (
            <a
              href="/hds-agent"
              aria-label="Open full-screen chat"
              title="Open full screen"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary-text"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}

          {variant === "widget" && onClose && (
            <button
              onClick={onClose}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </header>

      {/* ─── Messages ─── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-4"
      >
        {isEmpty && <EmptyState onSuggestion={handleSend} />}

        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            onCopy={() => copyMessage(msg)}
            copied={copiedId === msg.id}
            isStreaming={isStreaming && msg.role === "assistant" && msg === messages[messages.length - 1]}
          />
        ))}
      </div>

      {/* ─── Input ─── */}
      <div className="border-t border-border bg-card/40 backdrop-blur-md px-3 py-2.5 shrink-0">
        <div className="relative flex items-end gap-2 rounded-xl border border-border bg-background px-3 py-2 transition-all focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask about mentorships, fees, batches..."
            disabled={isStreaming}
            className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none max-h-24 scrollbar-thin disabled:opacity-60"
            style={{ minHeight: "24px" }}
          />

          {isStreaming ? (
            <button
              onClick={stopStreaming}
              aria-label="Stop generating"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive transition-all hover:bg-destructive/20"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
            </button>
          ) : (
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim()}
              aria-label="Send message"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg gradient-primary text-white transition-all duration-300 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <p className="mt-1.5 text-center text-[9px] text-muted-foreground/70">
          Powered by AI · For urgent help, WhatsApp{" "}
          <a
            href="https://wa.me/923271543140"
            className="text-primary-text hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            0327 1543140
          </a>
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════ */
/*              Empty State                    */
/* ═══════════════════════════════════════════ */
function EmptyState({ onSuggestion }: { onSuggestion: (text: string) => void }) {
  return (
    <div className="flex flex-col items-center text-center py-6 animate-in fade-in duration-500">
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary shadow-glow">
        <Sparkles className="h-7 w-7 text-white" />
      </div>
      <h3 className="text-base font-bold text-foreground mb-1">
        Assalam-o-Alaikum! 👋
      </h3>
      <p className="text-xs text-muted-foreground max-w-[240px] mb-5">
        I'm HDS Assistant. Ask me anything about mentorships, fees, batches, or enrollment.
      </p>

      <div className="w-full space-y-2">
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            onClick={() => onSuggestion(s)}
            className="group flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-left text-xs font-medium text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:-translate-y-0.5"
          >
            <span className="text-left">{s}</span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-text" />
          </button>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════ */
/*              Message Bubble                 */
/* ═══════════════════════════════════════════ */
function MessageBubble({
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
  const isEmpty = !message.content && message.role === "assistant"

  return (
    <div
      className={`flex items-start gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
          isUser
            ? "bg-muted text-foreground"
            : "gradient-primary text-white shadow-glow"
        }`}
      >
        {isUser ? (
          <span className="text-[10px] font-bold">You</span>
        ) : (
          <Bot className="h-3.5 w-3.5" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`group relative max-w-[85%] rounded-2xl px-3 py-2 ${
          isUser
            ? "bg-primary text-white rounded-tr-sm"
            : "bg-muted text-foreground rounded-tl-sm"
        }`}
      >
        {isEmpty ? (
          <div className="flex items-center gap-1 py-0.5">
            <Dot delay="0ms" />
            <Dot delay="150ms" />
            <Dot delay="300ms" />
          </div>
        ) : (
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {renderContent(message.content)}
            {isStreaming && (
              <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-current opacity-70 animate-pulse" />
            )}
          </div>
        )}

        {/* Copy (assistant only) */}
        {!isUser && !isEmpty && (
          <button
            onClick={onCopy}
            aria-label="Copy message"
            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce"
      style={{ animationDelay: delay }}
    />
  )
}

/* ═══════════════════════════════════════════ */
/*         Lightweight Markdown Renderer       */
/* ═══════════════════════════════════════════ */
function renderContent(text: string): React.ReactNode {
  const lines = text.split("\n")
  const out: React.ReactNode[] = []
  let listItems: string[] = []
  let listType: "ul" | "ol" | null = null

  const flush = () => {
    if (listItems.length > 0 && listType) {
      const key = `list-${out.length}`
      out.push(
        listType === "ul" ? (
          <ul key={key} className="list-disc pl-4 space-y-0.5 my-1">
            {listItems.map((li, i) => (
              <li key={i}>{inline(li)}</li>
            ))}
          </ul>
        ) : (
          <ol key={key} className="list-decimal pl-4 space-y-0.5 my-1">
            {listItems.map((li, i) => (
              <li key={i}>{inline(li)}</li>
            ))}
          </ol>
        )
      )
      listItems = []
      listType = null
    }
  }

  lines.forEach((line, idx) => {
    const trimmed = line.trim()
    if (/^[-*]\s+/.test(trimmed)) {
      if (listType === "ol") flush()
      listType = "ul"
      listItems.push(trimmed.replace(/^[-*]\s+/, ""))
    } else if (/^\d+\.\s+/.test(trimmed)) {
      if (listType === "ul") flush()
      listType = "ol"
      listItems.push(trimmed.replace(/^\d+\.\s+/, ""))
    } else if (trimmed === "") {
      flush()
    } else {
      flush()
      out.push(
        <p key={idx} className={idx > 0 ? "mt-1.5" : ""}>
          {inline(trimmed)}
        </p>
      )
    }
  })
  flush()
  return <>{out}</>
}

function inline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g)
  return parts.map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={i}>{part.slice(2, -2)}</strong>
    if (/^\*[^*]+\*$/.test(part)) return <em key={i}>{part.slice(1, -1)}</em>
    if (/^`[^`]+`$/.test(part))
      return (
        <code key={i} className="rounded bg-black/10 px-1 py-0.5 text-[0.85em]">
          {part.slice(1, -1)}
        </code>
      )
    return <span key={i}>{part}</span>
  })
}
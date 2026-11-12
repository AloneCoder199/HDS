"use client"

import { AlertTriangle, Info, Lightbulb } from "lucide-react"

/* ═══════════════════════════════════════════════════
   PROFESSIONAL MARKDOWN RENDERER
   Handles headings, lists, tables, code, callouts
   ═══════════════════════════════════════════════════ */

export function MarkdownRenderer({ content }: { content: string }) {
  if (!content) return null

  const blocks = parseBlocks(content)
  return <div className="space-y-2.5 text-[13px] leading-relaxed text-foreground">{blocks}</div>
}

/* ─── Block Parser ─── */
function parseBlocks(text: string): React.ReactNode[] {
  const lines = text.split("\n")
  const out: React.ReactNode[] = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    // Empty line → skip
    if (trimmed === "") {
      i++
      continue
    }

    // ─── Code block ``` ───
    if (trimmed.startsWith("```")) {
      const lang = trimmed.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i])
        i++
      }
      i++ // skip closing ```
      out.push(
        <CodeBlock key={key++} code={codeLines.join("\n")} lang={lang} />
      )
      continue
    }

    // ─── Heading ## or ### ───
    if (/^#{1,6}\s+/.test(trimmed)) {
      const level = trimmed.match(/^#+/)?.[0].length || 1
      const text = trimmed.replace(/^#+\s+/, "")
      out.push(<Heading key={key++} level={level}>{text}</Heading>)
      i++
      continue
    }

    // ─── Horizontal rule --- or *** or ___ ───
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      out.push(<hr key={key++} className="my-3 border-border" />)
      i++
      continue
    }

    // ─── Table (| ... |) ───
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const tableLines: string[] = []
      while (
        i < lines.length &&
        lines[i].trim().startsWith("|") &&
        lines[i].trim().endsWith("|")
      ) {
        tableLines.push(lines[i].trim())
        i++
      }
      out.push(<Table key={key++} rows={tableLines} />)
      continue
    }

    // ─── Blockquote > ───
    if (trimmed.startsWith(">")) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""))
        i++
      }
      out.push(
        <Callout key={key++} type="info">
          {quoteLines.join(" ")}
        </Callout>
      )
      continue
    }

    // ─── Callout patterns (⚠️, ℹ️, 💡, ⚠) ───
    const calloutMatch = trimmed.match(/^(⚠️|⚠|ℹ️|💡)\s*(.+)/)
    if (calloutMatch) {
      const icon = calloutMatch[1]
      const text = calloutMatch[2]
      const type =
        icon === "💡" ? "tip" : icon.startsWith("⚠") ? "warning" : "info"
      out.push(
        <Callout key={key++} type={type}>
          {text}
        </Callout>
      )
      i++
      continue
    }

    // ─── Unordered list ───
    if (/^[-*•]\s+/.test(trimmed)) {
      const items: string[] = []
      while (i < lines.length && /^[-*•]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*•]\s+/, ""))
        i++
      }
      out.push(
        <ul key={key++} className="space-y-1.5 pl-1 my-1.5">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2.5">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary-text" />
              <span className="flex-1">{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      )
      continue
    }

    // ─── Ordered list ───
    if (/^\d+[.)]\s+/.test(trimmed)) {
      const items: { num: string; text: string }[] = []
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
        const m = lines[i].trim().match(/^(\d+)[.)]\s+(.+)/)
        if (m) items.push({ num: m[1], text: m[2] })
        i++
      }
      out.push(
        <ol key={key++} className="space-y-1.5 pl-1 my-1.5">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2.5">
              <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary-text mt-[1px]">
                {item.num}
              </span>
              <span className="flex-1">{renderInline(item.text)}</span>
            </li>
          ))}
        </ol>
      )
      continue
    }

    // ─── Regular paragraph ───
    const paraLines: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith("```") &&
      !lines[i].trim().startsWith(">") &&
      !/^[-*•]\s+/.test(lines[i].trim()) &&
      !/^\d+[.)]\s+/.test(lines[i].trim()) &&
      !lines[i].trim().startsWith("|")
    ) {
      paraLines.push(lines[i].trim())
      i++
    }
    if (paraLines.length > 0) {
      out.push(
        <p key={key++} className="leading-relaxed">
          {renderInline(paraLines.join(" "))}
        </p>
      )
    }
  }

  return out
}

/* ─── Heading ─── */
function Heading({
  level,
  children,
}: {
  level: number
  children: string
}) {
  const sizes: Record<number, string> = {
    1: "text-base font-bold text-foreground mt-3 mb-1.5",
    2: "text-[14px] font-bold text-foreground mt-3 mb-1.5",
    3: "text-[13px] font-bold text-foreground mt-2.5 mb-1",
    4: "text-[13px] font-semibold text-foreground mt-2 mb-1",
    5: "text-[12px] font-semibold text-foreground mt-2 mb-1",
    6: "text-[12px] font-semibold text-muted-foreground mt-2 mb-1",
  }
  return (
    <h3 className={`${sizes[level] || sizes[3]} leading-snug`}>
      {renderInline(children)}
    </h3>
  )
}

/* ─── Code Block ─── */
function CodeBlock({ code, lang }: { code: string; lang: string }) {
  return (
    <div className="my-2 overflow-hidden rounded-lg border border-border bg-muted/60">
      {lang && (
        <div className="flex items-center justify-between border-b border-border bg-muted px-3 py-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {lang}
          </span>
        </div>
      )}
      <pre className="overflow-x-auto p-3 scrollbar-thin">
        <code className="text-[11.5px] font-mono text-foreground leading-relaxed">
          {code}
        </code>
      </pre>
    </div>
  )
}

/* ─── Table ─── */
function Table({ rows }: { rows: string[] }) {
  // rows[1] is the separator |---|---|
  const headerRow = rows[0]
  const bodyRows = rows.slice(2)

  const parseRow = (row: string) =>
    row
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim())

  const headers = parseRow(headerRow)

  return (
    <div className="my-2 overflow-x-auto rounded-lg border border-border scrollbar-thin">
      <table className="w-full text-[12px]">
        <thead className="bg-muted">
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-3 py-2 text-left font-semibold text-foreground border-b border-border"
              >
                {renderInline(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, i) => {
            const cells = parseRow(row)
            return (
              <tr key={i} className="border-b border-border last:border-0">
                {cells.map((c, j) => (
                  <td
                    key={j}
                    className="px-3 py-2 text-muted-foreground align-top"
                  >
                    {renderInline(c)}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/* ─── Callout ─── */
function Callout({
  type,
  children,
}: {
  type: "info" | "warning" | "tip"
  children: React.ReactNode
}) {
  const config = {
    info: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      icon: "text-blue-500",
      Icon: Info,
    },
    warning: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      icon: "text-amber-500",
      Icon: AlertTriangle,
    },
    tip: {
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      icon: "text-green-500",
      Icon: Lightbulb,
    },
  }[type]

  const Icon = config.Icon

  return (
    <div
      className={`my-2 flex items-start gap-2 rounded-lg border ${config.border} ${config.bg} p-2.5`}
    >
      <Icon className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${config.icon}`} />
      <div className="flex-1 text-[12px] leading-relaxed">
        {typeof children === "string" ? renderInline(children) : children}
      </div>
    </div>
  )
}

/* ─── Inline Renderer (bold, italic, code, links) ─── */
function renderInline(text: string): React.ReactNode {
  // Split by: **bold**, *italic*, `code`, [link](url)
  const parts = text.split(
    /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  )

  return parts.map((part, i) => {
    // Bold
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }
    // Italic
    if (/^\*[^*]+\*$/.test(part)) {
      return (
        <em key={i} className="italic">
          {part.slice(1, -1)}
        </em>
      )
    }
    // Inline code
    if (/^`[^`]+`$/.test(part)) {
      return (
        <code
          key={i}
          className="rounded bg-muted px-1.5 py-0.5 text-[11.5px] font-mono text-foreground border border-border/60"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    // Link
    if (/^\[[^\]]+\]\([^)]+\)$/.test(part)) {
      const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (m) {
        return (
          <a
            key={i}
            href={m[2]}
            target={m[2].startsWith("http") ? "_blank" : undefined}
            rel={m[2].startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-primary-text underline-offset-2 hover:underline font-medium"
          >
            {m[1]}
          </a>
        )
      }
    }
    return <span key={i}>{part}</span>
  })
}
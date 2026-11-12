import Link from "next/link"
import Image from "next/image"

export function Logo({
  className = "",
  showText = true,
}: {
  className?: string
  showText?: boolean
}) {
  return (
    <Link
      href="/"
      aria-label="Hassan Digital Skills — Home"
      className={`group flex items-center gap-2.5 ${className}`}
    >
      {/* Logo Image */}
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-background ring-1 ring-border/60 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-glow group-hover:ring-primary/40">
        <Image
          src="/logo.jpeg"
          alt="HDS Logo"
          width={36}
          height={36}
          priority
          className="h-full w-full object-contain"
        />
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-sm font-bold tracking-tight text-foreground transition-colors group-hover:text-primary-text">
            Hassan
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Digital Skills
          </span>
        </div>
      )}
    </Link>
  )
}
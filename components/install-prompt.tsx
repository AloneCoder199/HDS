'use client'

import { useEffect, useState } from 'react'
import { Download, X, Share, Plus } from 'lucide-react'

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // iOS detection
    const ios =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as any).MSStream
    setIsIOS(ios)

    // Chrome/Android: capture beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }
    window.addEventListener('beforeinstallprompt', handler)

    // iOS: show custom guide
    if (ios && !window.matchMedia('(display-mode: standalone)').matches) {
      setShowPrompt(true)
    }

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setShowPrompt(false)
      }
      setDeferredPrompt(null)
    }
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 mx-auto max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-2xl">
        <button
          onClick={() => setShowPrompt(false)}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Download className="h-5 w-5 text-primary-text" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground">
              Install HDS App
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Add to home screen for faster access
            </p>

            {isIOS ? (
              <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1 flex-wrap">
                Tap <Share className="h-3 w-3 inline" /> then{' '}
                <Plus className="h-3 w-3 inline" /> "Add to Home Screen"
              </div>
            ) : (
              <button
                onClick={handleInstall}
                className="mt-2 rounded-lg gradient-primary px-3 py-1.5 text-xs font-bold text-white"
              >
                Install Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
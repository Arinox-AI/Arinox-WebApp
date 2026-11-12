import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Play, X } from 'lucide-react'

/**
 * VideoEmbed: a poster that opens the film in a theatre view.
 * - Nothing from YouTube loads until the visitor clicks (privacy-enhanced
 *   youtube-nocookie.com, autoplay on open).
 * - Theatre: page dims, 16:9 player centred; Esc, backdrop click or Close
 *   exit; page scroll locked while open; focus returns to the poster.
 * Frame follows design.md: hairline border, card radius, one ember action.
 */
export function VideoEmbed({ id, title, duration, poster }) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const triggerRef = useRef(null)
  const closeRef = useRef(null)
  const vid = encodeURIComponent(id)
  const src = `https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
  const thumb = poster || `https://i.ytimg.com/vi/${vid}/maxresdefault.jpg`

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    const trigger = triggerRef.current
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
      trigger?.focus()
    }
  }, [open])

  const fade = reduce ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="group block w-full text-left"
        aria-label={`Play video: ${title}${duration ? ` (${duration})` : ''}`}
      >
        <span className="relative block aspect-video w-full overflow-hidden rounded-card border border-line bg-paper-2 transition-shadow duration-300 group-hover:shadow-[0_24px_60px_-28px_rgba(11,11,13,0.45)]">
          <img
            src={thumb}
            alt=""
            loading="eager"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          />
          <span className="absolute inset-0 bg-void/0 transition-colors duration-300 group-hover:bg-void/10" />
          <span className="absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ember text-white transition-transform duration-300 ease-out group-hover:scale-105 md:h-16 md:w-16">
            <Play size={22} strokeWidth={2} className="translate-x-[2px]" fill="currentColor" aria-hidden />
          </span>
        </span>
        <span className="mt-3 flex items-center justify-between gap-4 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-faint">
          <span className="text-ink transition-colors group-hover:text-ember-deep">Watch the film</span>
          {duration && <span className="num">{duration}</span>}
        </span>
      </button>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              key="theatre"
              role="dialog"
              aria-modal="true"
              aria-label={title}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-void/90 p-4 backdrop-blur-sm md:p-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fade}
              onClick={() => setOpen(false)}
            >
              <motion.div
                className="w-full max-w-6xl"
                initial={reduce ? false : { y: 16, scale: 0.98 }}
                animate={{ y: 0, scale: 1 }}
                exit={reduce ? undefined : { y: 8, scale: 0.99 }}
                transition={fade}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-3 flex items-center justify-between gap-4">
                  <p className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-ghost">
                    {title}{duration ? ` · ${duration}` : ''}
                  </p>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-phos transition-colors hover:border-white/70"
                  >
                    Close <X size={14} strokeWidth={2} aria-hidden />
                  </button>
                </div>
                <div className="relative aspect-video w-full overflow-hidden rounded-card bg-black">
                  <iframe
                    src={src}
                    title={title}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}

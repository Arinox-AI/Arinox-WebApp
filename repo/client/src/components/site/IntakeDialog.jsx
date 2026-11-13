import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'
import { ClientIntake } from './ClientIntake'
import { intakeOffer } from '../../data/inquiries'
import { hasCompletedIntake } from '../pricing/wizardLogic'
import { track } from '../pricing/track'

/* The /get-started intake, opened in place as a modal dialog.
 *
 * Native <dialog> + showModal(): the browser traps focus, makes the page
 * behind inert, closes on Escape and returns focus to the opener. Full screen
 * on phones, a centred paper panel with a hairline border on desktop - a flat
 * ink backdrop, no blur or glow (design.md rule 2).
 *
 * The form only mounts while open. Answers live in sessionStorage
 * (wizardLogic), so closing half-way loses nothing.
 */
export function IntakeDialog({ open, onClose, prefill = null, source = null, showBooking = true }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) {
      if (typeof el.showModal === 'function') el.showModal()
      else el.setAttribute('open', '') // jsdom / very old browsers
    } else if (!open && el.open) {
      if (typeof el.close === 'function') el.close()
      else el.removeAttribute('open')
    }
  }, [open])

  /* The page behind must not scroll while the dialog is up. */
  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  /* Escape fires `cancel`: route it through onClose so React state agrees. */
  const onCancel = (e) => {
    e.preventDefault()
    onClose()
  }

  /* A click on the backdrop lands on the <dialog> element itself. */
  const onBackdrop = (e) => {
    if (e.target === ref.current) onClose()
  }

  const copy = intakeOffer.dialog

  return (
    <dialog
      ref={ref}
      aria-labelledby="intake-dialog-title"
      onCancel={onCancel}
      onClick={onBackdrop}
      className="m-0 h-full max-h-none w-full max-w-none overflow-y-auto bg-paper p-0 text-left text-ink backdrop:bg-ink/50 md:m-auto md:h-fit md:max-h-[92vh] md:max-w-3xl md:rounded-card md:border md:border-line"
    >
      {open ? (
        <div className="px-5 pb-10 pt-4 md:px-10 md:pb-8 md:pt-5">
          <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
            <p className="eyebrow text-ember-deep">{copy.label}</p>
            <button
              type="button"
              onClick={onClose}
              aria-label={copy.close}
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink-soft transition-colors hover:text-ink"
            >
              <X size={20} strokeWidth={1.8} aria-hidden />
            </button>
          </div>
          <h2 id="intake-dialog-title" className="mt-5 font-display text-[28px] leading-[1.1] tracking-[-0.02em] md:text-[36px]">
            {copy.title}
          </h2>
          <p className="mt-2 text-[13.5px] text-ink-faint">{copy.saved}</p>
          <div className="mt-5">
            <ClientIntake
              variant="dialog"
              prefill={prefill}
              source={source}
              showBooking={showBooking}
              onClose={onClose}
            />
          </div>
        </div>
      ) : null}
    </dialog>
  )
}

/* The offer shown where someone has just reached us: a hairline block with
 * one button that opens the dialog. `inline` renders a single line with a
 * text link instead (the /contact page, before they write).
 * Hidden once this browser has sent the intake.
 */
export function IntakeOffer({
  source,
  prefill = null,
  showBooking = true,
  eyebrow = null,
  text = null,
  cta = null,
  inline = false,
  lead = null,
  className = '',
}) {
  const [open, setOpen] = useState(false)
  const [completed, setCompleted] = useState(() => hasCompletedIntake())
  const shownOnce = useRef(false)

  useEffect(() => {
    if (completed || shownOnce.current) return
    shownOnce.current = true
    track('intake_offer_shown', { source })
  }, [completed, source])

  if (completed && !open) return null

  const openDialog = () => {
    track('intake_offer_open', { source })
    setOpen(true)
  }
  const close = () => {
    setOpen(false)
    setCompleted(hasCompletedIntake())
  }

  const dialog = (
    <IntakeDialog open={open} onClose={close} prefill={prefill} source={source} showBooking={showBooking} />
  )

  if (inline) {
    return (
      <>
        <p className={`text-[14px] text-ink-soft ${className}`}>
          {lead}{' '}
          <button
            type="button"
            onClick={openDialog}
            className="font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ember"
          >
            {cta}
          </button>
        </p>
        {dialog}
      </>
    )
  }

  return (
    <div className={`border-t border-ink/80 pt-5 ${className}`}>
      <p className="eyebrow text-ember-deep">{eyebrow}</p>
      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink-soft">{text}</p>
      <Button variant="ember" size="sm" className="mt-5" onClick={openDialog}>{cta}</Button>
      {dialog}
    </div>
  )
}

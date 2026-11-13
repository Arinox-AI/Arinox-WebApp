import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, ShieldCheck, Clock, UserCheck } from 'lucide-react'
import axios from 'axios'
import HumanCheck from './HumanCheck'
import { ContactFields } from './ContactFields'
import { Button } from './Button'
import { Section } from './Section'
import { Label } from './Layout'
import { wizard } from '../../data/pricing'
import { intake, intakeOffer } from '../../data/inquiries'
import {
  QUESTIONS,
  STEP_TOTAL,
  QUESTION_COUNT,
  budgetLabel,
  defaultCurrencySymbol,
  toggleOption,
  isCapReached,
  stepAnswered,
  validateContact,
  buildLeadPayload,
  loadAnswers,
  saveAnswers,
  clearAnswers,
  blankAnswers,
  hasAnyAnswer,
  markIntakeDone,
} from '../pricing/wizardLogic'
import { track } from '../pricing/track'

const TRUST_ICONS = [UserCheck, Clock, ShieldCheck]

/* Segmented progress: one segment per question plus the contact step. */
function ProgressBar({ step }) {
  return (
    <div
      role="progressbar"
      aria-label="Intake progress"
      aria-valuemin={1}
      aria-valuemax={STEP_TOTAL}
      aria-valuenow={Math.min(step, STEP_TOTAL)}
      className="flex flex-1 gap-1.5"
    >
      {Array.from({ length: STEP_TOTAL }, (_, i) => {
        const n = i + 1
        return (
          <span
            key={n}
            aria-hidden
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              n < step ? 'bg-ink' : n === step ? 'bg-ember' : 'bg-line'
            }`}
          />
        )
      })}
    </div>
  )
}

/* Option tiles (or a typed answer for the investment question). */
function StepOptions({ question, value, onPick, capNote, currency, onCurrency }) {
  const gridRef = useRef(null)

  if (question.type === 'text') {
    return (
      <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
        {question.currencies ? (
          <div role="group" aria-label="Currency" className="flex gap-2">
            {question.currencies.map((c) => (
              <button
                key={c.symbol}
                type="button"
                aria-pressed={currency === c.symbol}
                aria-label={c.label}
                onClick={() => onCurrency?.(c.symbol)}
                className={`inline-flex h-[52px] min-w-[52px] items-center justify-center rounded-btn border px-4 font-display text-[22px] transition-colors ${
                  currency === c.symbol
                    ? 'border-ember bg-tint text-ink [box-shadow:inset_0_0_0_1px_var(--color-ember)]'
                    : 'border-line bg-white text-ink-soft hover:border-ink/50 hover:text-ink'
                }`}
              >
                {c.symbol}
              </button>
            ))}
          </div>
        ) : null}
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onPick(e.target.value)}
          maxLength={question.maxLength || 120}
          placeholder={question.placeholder}
          aria-label={question.question}
          className="min-w-[200px] flex-1 rounded-none border-b border-line bg-transparent py-3 font-display text-[19px] outline-none transition-colors placeholder:font-sans placeholder:text-[15px] placeholder:text-ink-faint focus:border-ember md:text-[22px]"
        />
      </div>
    )
  }

  const selected = question.type === 'single' ? (value ? [value] : []) : value || []

  /* Roving focus: arrow keys move between tiles. */
  const onKeyDown = (e) => {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(e.key)) return
    const tiles = Array.from(gridRef.current?.querySelectorAll('button') || [])
    const idx = tiles.indexOf(document.activeElement)
    if (idx === -1) return
    e.preventDefault()
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1
    tiles[(idx + dir + tiles.length) % tiles.length]?.focus()
  }

  return (
    <div ref={gridRef} role="group" aria-label={question.question} onKeyDown={onKeyDown} className="grid gap-2.5 sm:grid-cols-2">
      {question.options.map((opt) => {
        const sel = selected.includes(opt)
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={sel}
            onClick={() => onPick(opt)}
            className={`flex min-h-[52px] items-center gap-2.5 rounded-btn border px-4 py-2.5 text-left transition-colors duration-150 ${
              sel
                ? 'border-ember bg-tint text-ink [box-shadow:inset_0_0_0_1px_var(--color-ember)]'
                : 'border-line bg-white text-ink-soft hover:border-ink/50 hover:text-ink'
            }`}
          >
            <span
              aria-hidden
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                sel ? 'border-ember bg-ember text-white' : 'border-line'
              }`}
            >
              {sel && <Check size={11} strokeWidth={3} />}
            </span>
            <span className="text-[15px] leading-snug">{opt}</span>
          </button>
        )
      })}
      {capNote && (
        <p role="status" className="col-span-full pt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ember-deep">
          {capNote}
        </p>
      )}
    </div>
  )
}

/* The live "Your profile" card, filling in as answers are given. */
function ProfileCard({ answers, activeKey, restored, onStartOver }) {
  const rows = QUESTIONS.map((q) => {
    let value = ''
    if (q.key === 'budget') value = budgetLabel(answers)
    else if (q.type === 'multi') value = (answers[q.key] || []).join(', ')
    else value = String(answers[q.key] || '').trim()
    return { key: q.key, label: intake.profileRows[q.key], value }
  })
  return (
    <div className="rounded-card border border-line bg-white p-5">
      <p className="chip text-ink-faint">{intake.profileLabel.toUpperCase()}</p>
      {restored && (
        <p className="mt-2 flex flex-wrap items-baseline gap-x-2 text-[12.5px] text-ink-soft">
          {intake.restored}
          <button
            type="button"
            onClick={onStartOver}
            className="font-mono text-[11px] uppercase tracking-[0.08em] text-ember-deep underline-offset-2 hover:underline"
          >
            {intake.startOver}
          </button>
        </p>
      )}
      <dl className="mt-3" aria-live="polite">
        {rows.map((r) => (
          <div
            key={r.key}
            className={`grid grid-cols-[84px_1fr] items-baseline gap-3 border-b border-line py-2 last:border-b-0 ${
              r.key === activeKey ? 'bg-tint/50' : ''
            }`}
          >
            <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">{r.label}</dt>
            <dd className={`line-clamp-2 text-[13px] leading-snug ${r.value ? 'text-ink' : 'text-ink-faint/60'}`}>
              {r.value || '—'}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/**
 * ClientIntake: the ten-question business-profile form (its own page, /get-started).
 * Local state (not URL driven); only the answers persist in sessionStorage,
 * contact fields never do. Submits to /api/v1/inquiries with intent `profile`.
 *
 * variant="dialog" renders only the question flow (IntakeDialog supplies the
 * frame). `prefill` seeds the contact step from a form the visitor has just
 * sent, `source` tags the lead (after-message | after-booking | contact-page),
 * and `onClose` turns the finish screen's button into a close.
 */
export function ClientIntake({
  headingLevel = 'h2',
  variant = 'page',
  prefill = null,
  source = null,
  showBooking = true,
  onDone = null,
  onClose = null,
}) {
  const dialog = variant === 'dialog'
  const Heading = headingLevel
  const reduce = useReducedMotion()
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [answers, setAnswers] = useState(() => loadAnswers() || blankAnswers())
  /* A draft restored from sessionStorage is announced, never silent. */
  const [restored, setRestored] = useState(() => hasAnyAnswer(answers))
  const startOver = () => {
    clearAnswers()
    setAnswers(blankAnswers())
    setStep(1)
    setRestored(false)
  }
  const [capNote, setCapNote] = useState(null)
  const [contact, setContact] = useState(() => ({
    name: prefill?.name || '',
    email: prefill?.email || '',
    company: prefill?.company || '',
    role: '',
    notes: '',
    website: '',
  }))
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [token, setToken] = useState(null)

  const headRef = useRef(null)
  const fieldRefs = useRef({})
  const advanceTimer = useRef(null)
  const started = useRef(false)
  const interacted = useRef(false)

  const question = step <= QUESTION_COUNT ? QUESTIONS[step - 1] : null
  const answered = stepAnswered(step, answers)

  useEffect(() => {
    saveAnswers(answers)
  }, [answers])

  useEffect(() => () => clearTimeout(advanceTimer.current), [])

  /* Move focus to the new step heading, but never on first paint. */
  useEffect(() => {
    if (interacted.current) headRef.current?.focus({ preventScroll: true })
  }, [step, done])

  const markStart = () => {
    interacted.current = true
    if (!started.current) {
      started.current = true
      track('intake_start')
    }
  }

  const goTo = (n) => {
    clearTimeout(advanceTimer.current)
    interacted.current = true
    setStep(n)
  }
  const goNext = () => {
    track('intake_step_complete', { step })
    goTo(Math.min(step + 1, STEP_TOTAL))
  }
  const goBack = () => {
    if (step > 1) goTo(step - 1)
  }

  const onPick = (opt) => {
    if (!question) return
    markStart()
    if (question.type === 'text') {
      setAnswers((a) => ({ ...a, [question.key]: opt }))
      return
    }
    if (question.type === 'single') {
      setAnswers((a) => ({ ...a, [question.key]: opt }))
      setCapNote(null)
      clearTimeout(advanceTimer.current)
      advanceTimer.current = setTimeout(() => {
        track('intake_step_complete', { step })
        setStep((s) => Math.min(s + 1, STEP_TOTAL))
      }, 250)
      return
    }
    if (isCapReached(answers[question.key] || [], question.max, opt)) {
      setCapNote(intake.capNote(question.max))
      return
    }
    setAnswers((a) => ({ ...a, [question.key]: toggleOption(a[question.key] || [], opt, question.max) }))
    setCapNote(null)
  }

  /* Enter continues from anywhere in the card except buttons / textareas. */
  const onCardKeyDown = (e) => {
    if (e.key !== 'Enter' || !question) return
    const tag = e.target.tagName
    if (tag === 'BUTTON' || tag === 'TEXTAREA' || tag === 'A') return
    e.preventDefault()
    if (answered) goNext()
  }

  const setField = (name, v) => {
    setContact((c) => ({ ...c, [name]: v }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    const errs = validateContact(contact, intake.contact.errors)
    if (Object.values(errs).some(Boolean)) {
      setErrors(errs)
      const first = wizard.contact.fields.find((f) => errs[f.name])
      fieldRefs.current[first?.name]?.focus()
      return
    }
    setErrors({})
    setSubmitting(true)
    try {
      const payload = buildLeadPayload({
        answers,
        contact,
        context: { cta: dialog ? 'intake-dialog' : 'home-intake', token, source },
        intent: 'profile',
        heading: 'Business profile answers',
      })
      const res = await axios.post('/api/v1/inquiries', payload)
      track('intake_submit', { successful: true, id: res.data?.id ?? null, source: source || 'page' })
      clearAnswers()
      markIntakeDone()
      onDone?.()
      setSubmitError(null)
      interacted.current = true
      setDone(true)
    } catch (err) {
      setSubmitError(err.response?.data?.message || intake.failure)
    } finally {
      setSubmitting(false)
    }
  }

  const slide = reduce ? 0 : 18
  const cardCls = 'rounded-card border border-line bg-white p-6 md:p-9'
  const headCls = 'mt-4 max-w-xl font-display text-[24px] leading-[1.15] tracking-[-0.01em] outline-none md:text-[30px]'

  /* Left: framing + live profile (page only - the dialog has its own head). */
  const framing = (
        <div className="lg:sticky lg:top-24">
          <Label>{intake.eyebrow}</Label>
          <Heading className="mt-5 max-w-md font-display text-[34px] leading-[1.08] tracking-[-0.02em] md:text-[46px]">
            {intake.title}
          </Heading>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-soft">{intake.sub}</p>
          <div className="mt-8 hidden lg:block">
            <ProfileCard answers={answers} activeKey={question?.key} restored={restored} onStartOver={startOver} />
          </div>
          <ul className="mt-6 space-y-2.5">
            {intake.trust.map((t, i) => {
              const Icon = TRUST_ICONS[i] || ShieldCheck
              return (
                <li key={t} className="flex items-center gap-3 text-[14px] text-ink-soft">
                  <Icon size={16} strokeWidth={2} className="shrink-0 text-ember-deep" aria-hidden />
                  {t}
                </li>
              )
            })}
          </ul>
        </div>
  )

  /* Right: one question per card. */
  const flow = (
        <div>
          <div className="flex items-center gap-4">
            <ProgressBar step={done ? STEP_TOTAL : step} />
          </div>
          <p className="sr-only" aria-live="polite">
            {done ? 'Intake complete' : question ? intake.stepLabel(step, QUESTION_COUNT) : intake.contact.label}
          </p>

          <div className="mt-5" onKeyDown={onCardKeyDown}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={done ? 'done' : step}
                initial={{ opacity: 0, x: slide }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -slide }}
                transition={{ duration: reduce ? 0 : 0.22, ease: 'easeOut' }}
              >
                {done ? (
                  <div className={cardCls}>
                    <p className="eyebrow text-ember-deep">{intake.success.eyebrow}</p>
                    <h3 ref={headRef} tabIndex={-1} className={headCls}>{intake.success.heading}</h3>
                    <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-ink-soft">{intake.success.sub}</p>
                    <ol className="mt-7 border-t border-ink/80">
                      {intake.success.next.map((n, i) => (
                        <li key={n} className="grid grid-cols-[2rem_1fr] items-baseline border-b border-line py-3 text-[14.5px] text-ink-soft">
                          <span className="num font-mono text-[11px] text-ember-deep">{String(i + 1).padStart(2, '0')}</span>
                          {n}
                        </li>
                      ))}
                    </ol>
                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                      {/* Someone who already booked is not asked to book again. */}
                      {showBooking ? (
                        <Button to="/contact?tab=book" variant="ember" onClick={() => track('booking_click')}>
                          {intake.success.cta}
                        </Button>
                      ) : null}
                      {onClose ? (
                        <Button variant={showBooking ? 'ghost' : 'dark'} onClick={onClose}>
                          {intakeOffer.doneClose}
                        </Button>
                      ) : null}
                    </div>
                  </div>
                ) : question ? (
                  <div className={cardCls}>
                    <p className="chip text-ink-faint">{intake.stepLabel(step, QUESTION_COUNT)}</p>
                    <h3 ref={headRef} tabIndex={-1} className={headCls}>{question.question}</h3>
                    <p className="mt-2 text-[14px] text-ink-faint">{question.sub}</p>
                    <div className="mt-6">
                      <StepOptions
                        question={question}
                        value={answers[question.key]}
                        onPick={onPick}
                        currency={answers.budgetCurrency || defaultCurrencySymbol()}
                        onCurrency={(sym) => setAnswers((a) => ({ ...a, budgetCurrency: sym }))}
                        capNote={capNote}
                      />
                    </div>
                    <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-5">
                      <Button variant="ghost" size="sm" disabled={step === 1} onClick={goBack}>
                        {intake.back}
                      </Button>
                      <Button variant="dark" size="sm" disabled={!answered} onClick={goNext}>
                        {intake.next}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className={`relative ${cardCls}`}>
                    <p className="chip text-ink-faint">{intake.contact.label.toUpperCase()}</p>
                    <h3 ref={headRef} tabIndex={-1} className={headCls}>{intake.contact.heading}</h3>
                    <p className="mt-2 max-w-lg text-[14.5px] leading-relaxed text-ink-soft">{intake.contact.sub}</p>

                    <div className="mt-6">
                      <ContactFields
                        fields={[
                          ...wizard.contact.fields.map((f) => ({
                            name: f.name,
                            label: f.label,
                            type: f.type,
                            autoComplete: f.autoComplete,
                            required: true,
                            maxLength: f.name === 'email' ? 255 : 160,
                          })),
                          {
                            name: 'notes',
                            label: intake.contact.notesLabel,
                            type: 'textarea',
                            rows: 3,
                            placeholder: intake.contact.notesPlaceholder,
                          },
                        ]}
                        values={contact}
                        onChange={(e) => setField(e.target.name, e.target.value)}
                        errors={errors}
                        inputRef={(name, el) => { fieldRefs.current[name] = el }}
                      />
                    </div>

                    {/* Honeypot: bots spray every field; humans never see it. */}
                    <input
                      type="text"
                      name="website"
                      value={contact.website}
                      onChange={(e) => setField('website', e.target.value)}
                      autoComplete="off"
                      tabIndex={-1}
                      aria-hidden="true"
                      className="absolute left-[-9999px] h-0 w-0 opacity-0"
                    />

                    <HumanCheck onToken={setToken} />

                    {submitError && (
                      <p role="alert" className="mt-5 rounded-btn border border-line bg-paper px-4 py-3 text-[13.5px] text-ink">
                        {submitError}{' '}
                        <button
                          type="submit"
                          className="font-mono text-[11px] uppercase tracking-[0.08em] text-ember-deep underline underline-offset-2"
                        >
                          Retry
                        </button>
                      </p>
                    )}

                    <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-5">
                      <Button variant="ghost" size="sm" onClick={goBack}>{intake.back}</Button>
                      <Button type="submit" variant="ember" size="sm" disabled={submitting}>
                        {submitting ? 'Sending…' : intake.contact.cta}
                      </Button>
                    </div>
                    <p className="mt-4 text-[12.5px] leading-relaxed text-ink-faint">
                      By sending this you consent to our{' '}
                      <Link to="/privacy" className="text-ember-deep underline underline-offset-2 hover:text-ink">
                        Privacy Policy
                      </Link>
                      . {intake.footnote}
                    </p>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* On small screens the profile sits under the card. */}
          {dialog ? null : (
            <div className="mt-8 lg:hidden">
              <ProfileCard answers={answers} activeKey={question?.key} restored={restored} onStartOver={startOver} />
            </div>
          )}
        </div>
  )

  if (dialog) return flow

  return (
    <Section id="intake" className="scroll-mt-[72px]" border>
      <div className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
        {framing}
        {flow}
      </div>
    </Section>
  )
}

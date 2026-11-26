import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, ShieldCheck, Clock, UserCheck } from 'lucide-react'
import axios from 'axios'
import HumanCheck from './HumanCheck'
import { ContactFields, fieldCls, labelCls } from './ContactFields'
import { Button } from './Button'
import { Section } from './Section'
import { Label } from './Layout'
import BookingWidget from '../booking/BookingWidget'
import { whenLabel } from '../booking/slot'
import { wizard } from '../../data/pricing'
import { intake, inquiries } from '../../data/inquiries'
import {
  QUESTIONS,
  QUESTION_COUNT,
  budgetLabel,
  defaultCurrencySymbol,
  toggleOption,
  isCapReached,
  stepAnswered,
  validateContact,
  buildFlowPayload,
  roadmapSummary,
  answerLines,
  loadAnswers,
  saveAnswers,
  clearAnswers,
  blankAnswers,
  hasAnyAnswer,
} from '../pricing/wizardLogic'
import { track } from '../pricing/track'

const TRUST_ICONS = [UserCheck, Clock, ShieldCheck]
const STEP_TOTAL = intake.steps.length
const ENQUIRY_INTENTS = inquiries.subjects.map((s) => s.intent)

/* A quiet secondary action: mono text with an arrow, never a filled button. */
function TextAction({ children, onClick, arrow = 'after', className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-[44px] items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-soft transition-colors hover:text-ember-deep ${className}`}
    >
      {arrow === 'before' ? <span aria-hidden>←</span> : null}
      {children}
      {arrow === 'after' ? <span aria-hidden>→</span> : null}
    </button>
  )
}

/* Answer rows (or a typed answer for the investment question): hairlines, no tiles. */
function StepOptions({ question, value, onPick, capNote, currency, onCurrency }) {
  const gridRef = useRef(null)

  if (question.type === 'text') {
    return (
      <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
        {question.currencies ? (
          <div role="group" aria-label="Currency" className="flex gap-3">
            {question.currencies.map((c) => (
              <button
                key={c.symbol}
                type="button"
                aria-pressed={currency === c.symbol}
                aria-label={c.label}
                onClick={() => onCurrency?.(c.symbol)}
                className={`inline-flex h-[48px] min-w-[44px] items-center justify-center border-b-2 px-3 font-display text-[22px] transition-colors ${
                  currency === c.symbol ? 'border-ink text-ink' : 'border-line text-ink-faint hover:border-ink/50 hover:text-ink'
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

  /* Roving focus: arrow keys move between rows. */
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
    <div className="border-b border-line">
      <div ref={gridRef} role="group" aria-label={question.question} onKeyDown={onKeyDown} className="grid gap-x-8 sm:grid-cols-2">
        {question.options.map((opt) => {
          const sel = selected.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={sel}
              onClick={() => onPick(opt)}
              className={`flex min-h-[48px] items-center gap-3 border-t py-2.5 text-left transition-colors duration-150 ${
                sel ? 'border-ink text-ink' : 'border-line text-ink-soft hover:border-ink/50 hover:text-ink'
              }`}
            >
              <span
                aria-hidden
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                  sel ? 'border-ink bg-ink text-white' : 'border-ink/30'
                }`}
              >
                {sel && <Check size={11} strokeWidth={3} />}
              </span>
              <span className={`text-[15px] leading-snug ${sel ? 'font-medium' : ''}`}>{opt}</span>
            </button>
          )
        })}
        {capNote && (
          <p role="status" className="col-span-full pt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ember-deep">
            {capNote}
          </p>
        )}
      </div>
    </div>
  )
}

/* The live profile, filling in as answers are given: a hairline list, not a card. */
function ProfileCard({ answers, activeKey, restored, onStartOver }) {
  const rows = QUESTIONS.map((q) => {
    let value = ''
    if (q.key === 'budget') value = budgetLabel(answers)
    else if (q.type === 'multi') value = (answers[q.key] || []).join(', ')
    else value = String(answers[q.key] || '').trim()
    return { key: q.key, label: intake.profileRows[q.key], value }
  })
  return (
    <div className="border-t border-ink/80 pt-4">
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
          <div key={r.key} className="grid grid-cols-[84px_1fr] items-baseline gap-3 border-b border-line py-2">
            <dt className={`font-mono text-[11px] uppercase tracking-[0.08em] ${r.key === activeKey ? 'text-ink' : 'text-ink-faint'}`}>{r.label}</dt>
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
 * ClientIntake: the /get-started journey, one flow in three steps.
 *   1. Your business  - the ten questions ("Skip - just talk to us" jumps on)
 *   2. Who you are    - name, email, company, role + a note. Submitting SAVES
 *                       THE LEAD (POST /api/v1/inquiries).
 *   3. Your call      - optional 30-minute slot (reuses BookingWidget), then done.
 *
 * Deep links (read by the page, passed in):
 *   no params / start=roadmap -> Step 1
 *   start=message | start=book -> Step 2 (start=message also shows the subject picker)
 *   intent=deck|pricing|partnership|question [&asset=key] -> Step 2 with the
 *     subject (and deck) preselected
 * Only the answers persist (sessionStorage); contact fields never do.
 */
export function ClientIntake({ headingLevel = 'h2', start = null, intent = null, asset = null, alreadyBooked = false }) {
  const Heading = headingLevel
  const reduce = useReducedMotion()

  const linkIntent = ENQUIRY_INTENTS.includes(intent) ? intent : null
  const showSubject = Boolean(linkIntent) || start === 'message'
  const startsAtYou = Boolean(linkIntent) || start === 'message' || start === 'book'

  const [phase, setPhase] = useState(startsAtYou ? 'you' : 'business') // business | you | call | done
  const [qStep, setQStep] = useState(1)
  const [answers, setAnswers] = useState(() => loadAnswers() || blankAnswers())
  /* A draft restored from sessionStorage is announced, never silent. */
  const [restored, setRestored] = useState(() => hasAnyAnswer(answers))
  const [capNote, setCapNote] = useState(null)
  const [contact, setContact] = useState({ name: '', email: '', company: '', role: '', notes: '', website: '' })
  const [subjectIndex, setSubjectIndex] = useState(() => {
    const i = inquiries.subjects.findIndex((s) => s.intent === linkIntent)
    return i >= 0 ? i : 0
  })
  const [assetKey, setAssetKey] = useState(asset && inquiries.assets.some((a) => a.key === asset) ? asset : '')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [token, setToken] = useState(null)
  const [summary, setSummary] = useState('') // roadmap answers, kept for the booking notes
  const [booked, setBooked] = useState(null)
  const [profileDone, setProfileDone] = useState(false) // answered the questions? (sent with a booking)

  const headRef = useRef(null)
  const fieldRefs = useRef({})
  const advanceTimer = useRef(null)
  const started = useRef(false)
  const interacted = useRef(false)

  const question = phase === 'business' ? QUESTIONS[qStep - 1] : null
  const answered = stepAnswered(qStep, answers)
  const subject = inquiries.subjects[subjectIndex]
  const enquiry = showSubject ? { intent: subject.intent, asset: assetKey || null, subject: subject.label } : null
  const noteCopy = (showSubject && inquiries.noteByIntent[subject.intent]) || {}

  useEffect(() => {
    saveAnswers(answers)
  }, [answers])

  useEffect(() => () => clearTimeout(advanceTimer.current), [])

  /* Move focus to the new step heading, but never on first paint. */
  useEffect(() => {
    if (interacted.current) headRef.current?.focus({ preventScroll: true })
  }, [phase, qStep])

  const startOver = () => {
    clearAnswers()
    setAnswers(blankAnswers())
    setQStep(1)
    setRestored(false)
  }

  const markStart = () => {
    interacted.current = true
    if (!started.current) {
      started.current = true
      track('intake_start')
    }
  }

  const goPhase = (p) => {
    clearTimeout(advanceTimer.current)
    interacted.current = true
    setPhase(p)
  }
  /* Past the last question the flow moves on to Step 2. */
  const goNext = () => {
    track('intake_step_complete', { step: qStep })
    if (qStep >= QUESTION_COUNT) goPhase('you')
    else {
      clearTimeout(advanceTimer.current)
      interacted.current = true
      setQStep(qStep + 1)
    }
  }
  const goBack = () => {
    clearTimeout(advanceTimer.current)
    interacted.current = true
    if (qStep > 1) setQStep(qStep - 1)
  }
  const skip = () => {
    track('intake_skip', { step: qStep })
    goPhase('you')
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
      const from = qStep
      advanceTimer.current = setTimeout(() => {
        track('intake_step_complete', { step: from })
        if (from >= QUESTION_COUNT) setPhase('you')
        else setQStep(from + 1)
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

  /* Enter continues from anywhere in a question except buttons / textareas. */
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

  /* Step 2: this is where the lead is saved. */
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
      const payload = buildFlowPayload({ answers, contact, enquiry, token })
      const res = await axios.post('/api/v1/inquiries', payload)
      track('intake_submit', { successful: true, id: res.data?.id ?? null, intent: payload.intent })
      setSummary(roadmapSummary(answers))
      setProfileDone(answerLines(answers, { onlyAnswered: true }).length > 0)
      clearAnswers()
      setSubmitError(null)
      /* From the booking email (?booked=1): they already have a call - no calendar again. */
      goPhase(alreadyBooked ? 'done' : 'call')
    } catch (err) {
      setSubmitError(err.response?.data?.message || intake.failure)
    } finally {
      setSubmitting(false)
    }
  }

  const onBooked = (b) => {
    track('booking_confirmed')
    setBooked(b)
    goPhase('done')
  }

  const slide = reduce ? 0 : 18
  const headCls = 'mt-4 max-w-xl font-display text-[24px] leading-[1.15] tracking-[-0.01em] outline-none md:text-[30px]'
  const stepIndex = { business: 0, you: 1, call: 2 }[phase]
  const stepLabel =
    phase === 'done'
      ? null
      : intake.stepOf(stepIndex + 1, STEP_TOTAL, intake.steps[stepIndex].name, phase === 'call')
  const firstName = contact.name.trim().split(/\s+/)[0]

  /* Left: framing + live profile (Step 1 only). */
  const framing = (
    <div className="lg:sticky lg:top-24">
      <Label>{intake.eyebrow}</Label>
      <Heading className="mt-5 max-w-md font-display text-[34px] leading-[1.08] tracking-[-0.02em] md:text-[46px]">
        {intake.title}
      </Heading>
      <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-soft">{intake.sub}</p>
      {phase === 'business' ? (
        <div className="mt-8 hidden lg:block">
          <ProfileCard answers={answers} activeKey={question?.key} restored={restored} onStartOver={startOver} />
        </div>
      ) : null}
      <ul className="mt-6 space-y-2.5">
        {intake.trust.map((t, i) => {
          const Icon = TRUST_ICONS[i] || ShieldCheck
          return (
            <li key={t} className="flex items-center gap-3 text-[14px] text-ink-soft">
              <Icon size={16} strokeWidth={2} className="shrink-0 text-ink-faint" aria-hidden />
              {t}
            </li>
          )
        })}
      </ul>
    </div>
  )

  const privacyNote = (
    <p className="mt-4 text-[12.5px] leading-relaxed text-ink-faint">
      By sending this you consent to our{' '}
      <Link to="/privacy" className="text-ember-deep underline underline-offset-2 hover:text-ink">
        Privacy Policy
      </Link>
      . {intake.footnote}
    </p>
  )

  const stepBody = () => {
    if (phase === 'done') {
      const d = intake.done
      return (
        <div role="status">
          <p className="eyebrow text-ember-deep">{booked ? d.booked.eyebrow : d.eyebrow}</p>
          <h2 ref={headRef} tabIndex={-1} className={headCls}>
            {booked ? d.booked.heading(firstName) : alreadyBooked ? d.prepared.heading : d.received.heading}
          </h2>
          <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-ink-soft">
            {booked ? d.booked.sub(contact.email.trim()) : alreadyBooked ? d.prepared.sub : d.received.sub(contact.email.trim())}
          </p>
          {booked ? (
            <dl className="mt-7 border-t border-ink/80 text-[15px]">
              <div className="grid grid-cols-[84px_1fr] gap-3 border-b border-line py-3">
                <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">{d.booked.when}</dt>
                <dd>{whenLabel(booked.startAt)}</dd>
              </div>
              <div className="grid grid-cols-[84px_1fr] gap-3 border-b border-line py-3">
                <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">{d.booked.topic}</dt>
                <dd>{booked.topic}</dd>
              </div>
              {booked.meetLink ? (
                <div className="grid grid-cols-[84px_1fr] gap-3 border-b border-line py-3">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">{d.booked.join}</dt>
                  <dd>
                    <a href={booked.meetLink} className="text-ember-deep underline underline-offset-2">{d.booked.joinLink}</a>
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : (
            <ol className="mt-7 border-t border-ink/80">
              {d.next.map((n, i) => (
                <li key={n} className="grid grid-cols-[2rem_1fr] items-baseline border-b border-line py-3 text-[14.5px] text-ink-soft">
                  <span className="num font-mono text-[11px] text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
                  {n}
                </li>
              ))}
            </ol>
          )}
          {booked ? <p className="mt-5 text-[13.5px] text-ink-faint">{d.booked.move}</p> : null}
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-soft transition-colors hover:text-ember-deep"
            >
              {d.home} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      )
    }

    if (phase === 'business' && question) {
      return (
        <div>
          <p className="chip text-ink-faint">{intake.stepLabel(qStep, QUESTION_COUNT)}</p>
          <h2 ref={headRef} tabIndex={-1} className={headCls}>{question.question}</h2>
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
          <div className="mt-6 flex items-center justify-between gap-4">
            {qStep > 1 ? <TextAction arrow="before" onClick={goBack}>{intake.back}</TextAction> : <span />}
            <Button variant="ember" size="sm" disabled={!answered} onClick={goNext}>
              {intake.next}
            </Button>
          </div>
          <div className="mt-4 border-t border-line pt-3">
            {alreadyBooked ? null : <TextAction onClick={skip}>{intake.skip}</TextAction>}
          </div>
        </div>
      )
    }

    if (phase === 'you') {
      return (
        <form onSubmit={handleSubmit} noValidate className="relative">
          <h2 ref={headRef} tabIndex={-1} className={headCls}>{intake.contact.heading}</h2>
          <p className="mt-2 max-w-lg text-[14.5px] leading-relaxed text-ink-soft">
            {hasAnyAnswer(answers) ? `${intake.contact.sub} ${intake.contact.subSent}` : intake.contact.sub}
          </p>

          {showSubject ? (
            <div className="mt-6">
              <label className="block">
                <span className={labelCls}>{intake.contact.subjectLabel}</span>
                <select
                  value={subjectIndex}
                  onChange={(e) => { setSubjectIndex(Number(e.target.value)); setAssetKey('') }}
                  className={`${fieldCls} cursor-pointer`}
                >
                  {inquiries.subjects.map((s, i) => <option key={s.label} value={i}>{s.label}</option>)}
                </select>
              </label>
              {subject.intent === 'deck' ? (
                <label className="mt-6 block">
                  <span className={labelCls}>{intake.contact.assetLabel}</span>
                  <select value={assetKey} onChange={(e) => setAssetKey(e.target.value)} className={`${fieldCls} cursor-pointer`}>
                    <option value="">{intake.contact.assetAny}</option>
                    {inquiries.assets.map((a) => <option key={a.key} value={a.key}>{a.label}</option>)}
                  </select>
                </label>
              ) : null}
            </div>
          ) : null}

          <div className="mt-6">
            <ContactFields
              fields={[
                ...wizard.contact.fields.map((f) => ({
                  name: f.name,
                  label: f.label,
                  type: f.type,
                  autoComplete: f.autoComplete,
                  required: f.required !== false,
                  maxLength: f.name === 'email' ? 255 : 160,
                })),
                {
                  name: 'notes',
                  label: noteCopy.label || intake.contact.notesLabel,
                  type: 'textarea',
                  rows: 3,
                  placeholder: noteCopy.placeholder || intake.contact.notesPlaceholder,
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
            <p role="alert" className="mt-5 border-t border-ink/80 pt-3 text-[13.5px] text-ink">
              {submitError}{' '}
              <button
                type="submit"
                className="font-mono text-[11px] uppercase tracking-[0.08em] text-ember-deep underline underline-offset-2"
              >
                Retry
              </button>
            </p>
          )}

          <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-4">
            <TextAction arrow="before" onClick={() => goPhase('business')}>{intake.back}</TextAction>
            <Button type="submit" variant="ember" size="sm" disabled={submitting}>
              {submitting ? intake.contact.sending : intake.contact.cta}
            </Button>
          </div>
          {privacyNote}
        </form>
      )
    }

    /* phase === 'call' */
    return (
      <div>
        <h2 ref={headRef} tabIndex={-1} className={headCls}>{intake.call.heading}</h2>
        <p className="mt-2 max-w-lg text-[14.5px] leading-relaxed text-ink-soft">{intake.call.sub}</p>
        <div className="mt-6">
          <BookingWidget
            embedded
            prefill={{ name: contact.name.trim(), email: contact.email.trim(), company: contact.company.trim() }}
            notesExtra={[contact.notes.trim(), summary].filter(Boolean).join('\n\n')}
            profileDone={profileDone}
            onBooked={onBooked}
          />
        </div>
        <div className="mt-6 border-t border-line pt-3">
          <TextAction onClick={() => { track('booking_skipped'); goPhase('done') }}>{intake.call.skip}</TextAction>
        </div>
      </div>
    )
  }

  /* Right: the steps, one document - a mono step label over a hairline. */
  const flow = (
    <div>
      <p
        className="border-t border-ink/80 pt-4 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-faint"
        aria-live="polite"
        data-testid="step-label"
      >
        {stepLabel || intake.done.stepLabel}
      </p>

      <div className="mt-5" onKeyDown={onCardKeyDown}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={phase === 'business' ? `q${qStep}` : phase}
            initial={{ opacity: 0, x: slide }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -slide }}
            transition={{ duration: reduce ? 0 : 0.22, ease: 'easeOut' }}
          >
            {stepBody()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* On small screens the profile sits under the question. */}
      {phase === 'business' ? (
        <div className="mt-8 lg:hidden">
          <ProfileCard answers={answers} activeKey={question?.key} restored={restored} onStartOver={startOver} />
        </div>
      ) : null}
    </div>
  )

  return (
    <Section id="intake" className="scroll-mt-[72px]" border>
      <div className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
        {framing}
        {flow}
      </div>
    </Section>
  )
}

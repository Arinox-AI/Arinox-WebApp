import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronLeft } from 'lucide-react';
import axios from 'axios';
import SEO from '../components/ui/SEO';
import HumanCheck from '../components/site/HumanCheck';
import { ContactFields } from '../components/site/ContactFields';
import { Button } from '../components/site/Button';
import { wizard, answerLabels } from '../data/pricing';
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
} from '../components/pricing/wizardLogic';
import { track } from '../components/pricing/track';

const clampStep = (n) => Math.min(Math.max(1, n || 1), STEP_TOTAL);

/* ── Progress bar: one segment per question + contact ─────────────── */
function ProgressBar({ step }) {
  return (
    <div
      role="progressbar"
      aria-label="Wizard progress"
      aria-valuemin={1}
      aria-valuemax={STEP_TOTAL}
      aria-valuenow={Math.min(step, STEP_TOTAL)}
      className="flex flex-1 gap-1.5"
    >
      {Array.from({ length: STEP_TOTAL }, (_, i) => {
        const n = i + 1;
        return (
          <span
            key={n}
            aria-hidden
            className={`h-1 flex-1 transition-colors duration-300 ${
              n < step ? 'bg-ink' : n === step ? 'bg-ember' : 'bg-line'
            }`}
          />
        );
      })}
    </div>
  );
}

/* ── Options: wrapping choice tiles (square, ember when picked) ─────── */
function StepOptions({ question, value, onPick, capNote, onSubmit, currency, onCurrency }) {
  const gridRef = useRef(null);
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
                className={`inline-flex h-[52px] min-w-[52px] items-center justify-center border px-4 font-display text-[22px] transition-colors ${
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
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onSubmit?.(); } }}
        maxLength={question.maxLength || 120}
        placeholder={question.placeholder}
        aria-label={question.question}
        className="min-w-[200px] flex-1 rounded-none border-b border-line bg-transparent py-3 font-display text-[19px] outline-none transition-colors placeholder:font-sans placeholder:text-[15px] placeholder:text-ink-faint focus:border-ember md:text-[22px]"
      />
      </div>
    );
  }
  const selected = question.type === 'single' ? (value ? [value] : []) : value || [];

  /* Roving focus: arrow keys move between option rows. */
  const onKeyDown = (e) => {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(e.key)) return;
    const rows = Array.from(gridRef.current?.querySelectorAll('button') || []);
    const idx = rows.indexOf(document.activeElement);
    if (idx === -1) return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
    rows[(idx + dir + rows.length) % rows.length]?.focus();
  };

  return (
    <div ref={gridRef} role="group" aria-label={question.question} onKeyDown={onKeyDown} className="flex flex-wrap gap-3">
      {question.options.map((opt) => {
        const sel = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={sel}
            onClick={() => onPick(opt)}
            className={`inline-flex min-h-[52px] items-center gap-2.5 border px-5 text-left transition-colors duration-150 ${
              sel
                ? 'border-ember bg-tint text-ink [box-shadow:inset_0_0_0_1px_var(--color-ember)]'
                : 'border-line bg-white text-ink-soft hover:border-ink/50 hover:text-ink'
            }`}
          >
            {sel && <Check size={16} strokeWidth={2.4} className="shrink-0 text-ember-deep" aria-hidden />}
            <span className="font-display text-[17px] tracking-[-0.01em] md:text-[19px]">{opt}</span>
          </button>
        );
      })}
      {capNote && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full pt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ember-deep"
          role="status"
        >
          {capNote}
        </motion.p>
      )}
    </div>
  );
}

/* ═══ The wizard page — /pricing/discovery ══════════════════════════
 * Steps (the questions + contact) derive entirely from ?step=n so the
 * browser Back button works; completion replaces ?step=done. Only the
 * answers persist (sessionStorage) — contact fields are never stored.
 * Presentation: the site's own editorial system — paper, hairlines, mono
 * labels, Newsreader questions — not the mockup's sidebar layout. */
export default function PriceDiscovery() {
  const [sp, setSp] = useSearchParams();
  const rawStep = sp.get('step');
  const done = rawStep === 'done';
  const step = done ? STEP_TOTAL : clampStep(parseInt(rawStep, 10));

  const [answers, setAnswers] = useState(() => loadAnswers() || blankAnswers());
  const [capNote, setCapNote] = useState(null);
  const [contact, setContact] = useState({ name: '', email: '', company: '', role: '', notes: '', website: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [token, setToken] = useState(null);

  const headRef = useRef(null);
  const fieldRefs = useRef({});
  const doneRef = useRef(done);
  const stepRef = useRef(step);
  const advanceTimer = useRef(null);
  doneRef.current = done;
  stepRef.current = step;
  const question = step <= QUESTION_COUNT ? QUESTIONS[step - 1] : null;
  const answered = stepAnswered(step, answers);

  /* URL is the single source of truth for the step. */
  const setStepValue = (n, { replace = false } = {}) => {
    setSp(
      (prev) => {
        const p = new URLSearchParams(prev);
        p.set('step', n === 'done' ? 'done' : String(n));
        return p;
      },
      { replace }
    );
  };

  /* Analytics: start on mount, abandon on unmount before completion. */
  useEffect(() => {
    track('wizard_start', { cta: sp.get('cta') || null });
    return () => {
      if (!doneRef.current) track('wizard_abandon', { lastStep: stepRef.current });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    saveAnswers(answers);
  }, [answers]);

  /* Focus the new step heading on every step change. */
  useEffect(() => {
    if (!done) headRef.current?.focus();
    return () => clearTimeout(advanceTimer.current);
  }, [step, done]);

  const goNext = () => {
    clearTimeout(advanceTimer.current);
    track('wizard_step_complete', { step });
    setStepValue(Math.min(step + 1, STEP_TOTAL));
  };

  const goBack = () => {
    if (step <= 1) return;
    clearTimeout(advanceTimer.current);
    setStepValue(step - 1, { replace: true });
  };

  /* Option pick — single-select auto-advances (~250ms), multi waits for Next. */
  const onPick = (opt) => {
    if (!question) return;
    if (question.type === 'text') {
      setAnswers((a) => ({ ...a, [question.key]: opt }));
      return;
    }
    if (question.type === 'single') {
      setAnswers((a) => ({ ...a, [question.key]: opt }));
      setCapNote(null);
      clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(() => {
        track('wizard_step_complete', { step });
        setStepValue(Math.min(step + 1, STEP_TOTAL));
      }, 250);
      return;
    }
    if (isCapReached(answers[question.key] || [], question.max, opt)) {
      setCapNote(wizard.capNote(question.max));
      return;
    }
    setAnswers((a) => ({ ...a, [question.key]: toggleOption(a[question.key] || [], opt, question.max) }));
    setCapNote(null);
  };

  /* Contact step */
  const setField = (name, v) => {
    setContact((c) => ({ ...c, [name]: v }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    const errs = validateContact(contact, wizard.contact.errors);
    if (Object.values(errs).some(Boolean)) {
      setErrors(errs);
      const first = wizard.contact.fields.find((f) => errs[f.name]);
      fieldRefs.current[first?.name]?.focus();
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const payload = buildLeadPayload({
        answers,
        contact,
        context: {
          deployment: sp.get('deployment') || null,
          currency: sp.get('currency') || null,
          cta: sp.get('cta') || null,
          token,
        },
      });
      const res = await axios.post('/api/v1/inquiries', payload);
      track('wizard_submit', { successful: true, id: res.data?.id ?? null });
      clearAnswers();
      setSubmitError(null);
      setStepValue('done', { replace: true }); // no resubmission on Back
    } catch (err) {
      setSubmitError(
        err.response?.data?.message || 'Something went wrong — your answers are safe. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const summaryRows = QUESTIONS.map((q) => ({
    label: answerLabels[q.key],
    value: q.key === 'budget' ? budgetLabel(answers) || '\u2014' : q.type === 'multi' ? (answers[q.key] || []).join(', ') || '—' : String(answers[q.key] || '').trim() || '—',
  }));

  return (
    <>
      <SEO
        title="Price Discovery | Arinox AI"
        description="Four minutes, ten questions, then a 30-minute conversation with an Arinox architect, where your price is shared and built around your business."
        canonical="https://www.arinox.ai/pricing/discovery"
      />

      <div className="min-h-[calc(100vh-68px)] bg-paper">
        <div className="mx-auto max-w-6xl px-7 pb-24 pt-10 md:pt-14">
          {/* ── Escape link (the site nav above already carries the logo) ── */}
          <Link
            to="/pricing"
            className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint transition-colors hover:text-ink"
          >
            <ChevronLeft size={13} strokeWidth={2.2} aria-hidden /> {wizard.backLink}
          </Link>

          {/* ── Rule head (site motif) ──────────────────────────── */}
          <div className="rule-head mt-6">
            <span className="index">{wizard.eyebrow.toUpperCase()}</span>
            <span className="label">4 minutes · {QUESTION_COUNT} questions · Price shared in a conversation</span>
            <span className="line" aria-hidden />
          </div>

          <h1 className="sr-only">{wizard.title}</h1>

          {/* ── Progress ────────────────────────────────────────── */}
          <div className="mt-8 flex items-center gap-4">
            <p className="chip shrink-0 text-ink-faint" aria-hidden>
              {done ? 'Complete' : wizard.stepLabel(step, STEP_TOTAL).toUpperCase()}
            </p>
            <ProgressBar step={done ? STEP_TOTAL : step} />
          </div>

          {/* Progress announced to screen readers */}
          <p className="sr-only" aria-live="polite">
            {done ? 'Price Discovery complete' : wizard.stepLabel(step, STEP_TOTAL)}
          </p>

          {/* What you get — quiet check rows under the progress */}
          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
          <aside className="lg:sticky lg:top-24">
            <img
              src="/images/industries/pricing-survey.svg"
              alt="Two people reviewing a survey and its results on screens"
              className="mx-auto hidden w-full max-w-[400px] lg:block"
            />
            <ul className="mt-2 border-t border-ink/80 lg:mt-8">
              {wizard.promises.map((p, i) => (
                <li key={p} className="grid grid-cols-[2rem_1fr] items-baseline border-b border-line py-3 text-[14px] leading-snug text-ink-soft">
                  <span className="num font-mono text-[10px] text-ember-deep">{String(i + 1).padStart(2, '0')}</span>
                  {p}
                </li>
              ))}
            </ul>
          </aside>

          <div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={done ? 'done' : step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {done ? (
                /* ── Completion screen ─────────────────────────── */
                <div className="border border-line bg-white p-7 md:p-10">
                  <p className="eyebrow text-ember-deep">Received</p>
                  <h2
                    ref={headRef}
                    tabIndex={-1}
                    className="mt-3 max-w-xl font-display text-[26px] leading-[1.15] tracking-[-0.01em] outline-none md:text-[30px]"
                  >
                    {wizard.completion.heading}
                  </h2>
                  <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-ink-soft">
                    {wizard.completion.sub}
                  </p>

                  <div className="mt-8 border border-line bg-paper-2/60 p-6">
                    <p className="chip text-ink-faint">{wizard.completion.summaryLabel.toUpperCase()}</p>
                    <dl className="mt-4">
                      {summaryRows.map((r) => (
                        <div key={r.label} className="flex items-baseline justify-between gap-6 border-b border-line py-2.5">
                          <dt className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-faint">
                            {r.label}
                          </dt>
                          <dd className="text-right text-[13.5px] text-ink">{r.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Button
                      to="/contact?tab=book"
                      variant="ember"
                      onClick={() => track('booking_click')}
                    >
                      {wizard.completion.bookingCta}
                    </Button>
                    <Button to="/pricing" variant="ghost">
                      {wizard.completion.backCta}
                    </Button>
                  </div>
                </div>
              ) : step <= QUESTION_COUNT ? (
                /* ── Question step ─────────────────────────────── */
                <div className="border border-line bg-white p-7 md:p-10">
                  <p className="chip text-ink-faint">Question {step} of {QUESTION_COUNT}</p>
                  <h2
                    ref={headRef}
                    tabIndex={-1}
                    className="mt-4 max-w-xl font-display text-[26px] leading-[1.15] tracking-[-0.01em] outline-none md:text-[32px]"
                  >
                    {question.question}
                  </h2>
                  <p className="mt-2 text-[14px] text-ink-faint">{question.sub}</p>
                  <div className="mt-7">
                    <StepOptions
                      question={question}
                      value={answers[question.key]}
                      onPick={onPick}
                      onSubmit={() => answered && goNext()}
                      currency={answers.budgetCurrency || defaultCurrencySymbol()}
                      onCurrency={(sym) => setAnswers((a) => ({ ...a, budgetCurrency: sym }))}
                      capNote={capNote}
                    />
                  </div>
                  <div className="mt-9 flex items-center justify-between gap-4 border-t border-line pt-6">
                    <Button variant="ghost" disabled={step === 1} onClick={goBack} type="button">
                      {wizard.back}
                    </Button>
                    <Button variant="dark" disabled={!answered} onClick={goNext}>
                      {wizard.next}
                    </Button>
                  </div>
                </div>
              ) : (
                /* ── Step 7 — contact ──────────────────────────── */
                <form onSubmit={handleSubmit} noValidate className="border border-line bg-white p-7 md:p-10">
                  <p className="chip text-ink-faint">Contact</p>
                  <h2
                    ref={headRef}
                    tabIndex={-1}
                    className="mt-4 max-w-xl font-display text-[26px] leading-[1.15] tracking-[-0.01em] outline-none md:text-[32px]"
                  >
                    {wizard.contact.heading}
                  </h2>
                  <p className="mt-2 max-w-lg text-[14.5px] leading-relaxed text-ink-soft">
                    {wizard.contact.sub}
                  </p>

                  <div className="mt-7">
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
                          label: wizard.contact.notesLabel,
                          type: 'textarea',
                          rows: 3,
                          placeholder: wizard.contact.notesPlaceholder,
                        },
                      ]}
                      values={contact}
                      onChange={(e) => setField(e.target.name, e.target.value)}
                      errors={errors}
                      inputRef={(name, el) => { fieldRefs.current[name] = el; }}
                    />
                  </div>

                  {/* Honeypot — bots spray every field; humans never see it. */}
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
                    <p role="alert" className="mt-5 rounded-none border border-line bg-paper px-4 py-3 text-[13.5px] text-ink">
                      {submitError}{' '}
                      <button
                        type="submit"
                        className="font-mono text-[11px] uppercase tracking-[0.08em] text-ember-deep underline underline-offset-2"
                      >
                        Retry
                      </button>
                    </p>
                  )}

                  <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-6">
                    <Button variant="ghost" disabled={step === 1} onClick={goBack} type="button">
                      {wizard.back}
                    </Button>
                    <Button type="submit" variant="ember" disabled={submitting}>
                      {submitting ? 'Sending…' : wizard.contact.cta}
                    </Button>
                  </div>
                  <p className="mt-4 text-[12.5px] leading-relaxed text-ink-faint">
                    By sending this you consent to our{' '}
                    <Link to="/privacy" className="text-ember-deep underline underline-offset-2 hover:text-ink">
                      Privacy Policy
                    </Link>
                    . {wizard.footnote}
                  </p>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

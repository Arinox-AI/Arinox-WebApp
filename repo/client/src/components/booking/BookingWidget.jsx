import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '../site/Button';
import HumanCheck from '../site/HumanCheck';
import { booking } from '../../data/booking';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DOW = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const pad = (n) => String(n).padStart(2, '0');
const dayKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const timeLabel = (iso) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
const dayLabel = (d) => d.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' });
const tz = (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch { return ''; } })();

const inputCls = 'w-full rounded-none border-b border-line bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-ink-faint focus:border-ember';
const labelCls = 'mb-1.5 block font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-ink-soft';

/* 30-minute discovery-session picker: day → time → details → confirmed.
   All slot logic (hours, buffers, clashes) lives on the server; this only
   renders what /api/v1/booking/availability offers. */
export default function BookingWidget() {
  const [state, setState] = useState('loading'); // loading | ready | error
  const [slots, setSlots] = useState([]);
  const [step, setStep] = useState('pick'); // pick | details | done
  const [topic, setTopic] = useState(booking.topics[0]);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [slot, setSlot] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', notes: '', guests: '', website: '' });
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);

  const load = async () => {
    try {
      const { data } = await axios.get('/api/v1/booking/availability');
      const list = data?.data?.slots || [];
      setSlots(list);
      setState('ready');
      return list;
    } catch {
      setState('error');
      return [];
    }
  };
  useEffect(() => { load(); }, []);

  // slots grouped by the visitor's local calendar day
  const byDay = useMemo(() => {
    const m = new Map();
    for (const iso of slots) {
      const k = dayKey(new Date(iso));
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(iso);
    }
    return m;
  }, [slots]);

  // land on the first open day when slots arrive
  useEffect(() => {
    if (!slots.length || day) return;
    const first = new Date(slots[0]);
    setDay(new Date(first.getFullYear(), first.getMonth(), first.getDate()));
    setMonth(new Date(first.getFullYear(), first.getMonth(), 1));
  }, [slots, day]);

  const monthBounds = useMemo(() => {
    if (!slots.length) return null;
    const a = new Date(slots[0]);
    const z = new Date(slots[slots.length - 1]);
    return { first: a.getFullYear() * 12 + a.getMonth(), last: z.getFullYear() * 12 + z.getMonth() };
  }, [slots]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const confirm = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = booking.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = booking.errors.email;
    const guests = form.guests.split(/[,\s;]+/).filter(Boolean);
    if (guests.some((g) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(g))) errs.guests = booking.errors.guests;
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setBusy(true);
    try {
      const { data } = await axios.post('/api/v1/booking', {
        name: form.name, email: form.email, company: form.company, phone: form.phone,
        notes: form.notes, topic, guests, startAt: slot, timezone: tz,
        website: form.website, // honeypot: '' for humans
        turnstileToken: token || undefined,
      });
      setResult(data?.data || {});
      setStep('done');
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error(err.response.data?.message || booking.errors.taken);
        setSlot(null);
        setStep('pick');
        load();
      } else {
        toast.error(err.response?.data?.message || booking.errors.generic);
      }
    } finally {
      setBusy(false);
    }
  };

  const reset = () => { setStep('pick'); setSlot(null); setResult(null); load(); };

  /* ── states ── */
  if (state === 'loading') {
    /* The calendar is a second of work away (a free/busy read of the team's
       Google Calendar), so we show the shape of what is coming rather than a
       bare line of text: the card does not jump when the real grid lands. */
    return (
      <div className="card-light p-8 md:p-10" role="status" aria-busy="true" aria-live="polite">
        <p className="eyebrow text-ember-deep">{booking.eyebrow}</p>
        <p className="mt-6 flex items-center gap-3 text-[15px] text-ink-soft">
          <span className="loader-dot" aria-hidden />
          {booking.loading}
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-[1.15fr_0.85fr]" aria-hidden>
          <div>
            <div className="skeleton h-[22px] w-40" />
            <div className="mt-5 grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="skeleton aspect-square" />
              ))}
            </div>
          </div>
          <div>
            <div className="skeleton h-[18px] w-32" />
            <div className="mt-4 grid grid-cols-2 gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="skeleton h-10" />
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 font-mono text-[11.5px] text-ink-faint">{booking.loadingNote}</p>
      </div>
    );
  }
  if (state === 'error') {
    return (
      <div className="card-light p-8">
        <p className="text-ink-soft">{booking.loadError}</p>
        <button onClick={() => { setState('loading'); load(); }} className="mt-4 font-mono text-[12px] uppercase tracking-[0.1em] text-ember-deep hover:opacity-75">Try again</button>
      </div>
    );
  }
  if (!slots.length) return <div className="card-light p-8 text-ink-soft">{booking.empty}</div>;

  if (step === 'done') {
    const start = new Date(result?.startAt || slot);
    return (
      <div className="card-light p-8 md:p-10" role="status">
        <p className="eyebrow text-success">{booking.done.eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl tracking-[-0.01em]">{booking.done.heading(form.name.trim().split(' ')[0])}</h2>
        <p className="mt-3 max-w-md text-[15.5px] leading-relaxed text-ink-soft">{booking.done.body(form.email.trim())}</p>
        <dl className="mt-6 grid gap-3 rounded-card border border-line bg-white p-5 text-[15px]">
          <div className="grid grid-cols-[90px_1fr] gap-2"><dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-faint">When</dt><dd>{dayLabel(start)} · {timeLabel(start.toISOString())}–{timeLabel(new Date(start.getTime() + 30 * 60e3).toISOString())}{tz ? ` (${tz})` : ''}</dd></div>
          <div className="grid grid-cols-[90px_1fr] gap-2"><dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-faint">Topic</dt><dd>{topic}</dd></div>
          {result?.meetLink && <div className="grid grid-cols-[90px_1fr] gap-2"><dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-faint">Join</dt><dd><a href={result.meetLink} className="text-ember-deep underline underline-offset-2">Video call</a></dd></div>}
        </dl>
        <p className="mt-5 text-[13.5px] text-ink-faint">{booking.done.move}</p>
        <button onClick={reset} className="mt-6 font-mono text-[12px] uppercase tracking-[0.1em] text-ember-deep hover:opacity-75">{booking.done.again}</button>
      </div>
    );
  }

  const daySlots = day ? byDay.get(dayKey(day)) || [] : [];

  // First render after the slots arrive: default to the first open month.
  const first = new Date(slots[0]);
  const shown = month || new Date(first.getFullYear(), first.getMonth(), 1);
  const shiftMonth = (n) => setMonth(new Date(shown.getFullYear(), shown.getMonth() + n, 1));
  const idx = shown.getFullYear() * 12 + shown.getMonth();

  /* ── calendar grid ── */
  const y = shown.getFullYear();
  const m = shown.getMonth();
  const lead = (new Date(y, m, 1).getDay() + 6) % 7;
  const dim = new Date(y, m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < lead; i++) cells.push(<div key={`l${i}`} />);
  for (let d = 1; d <= dim; d++) {
    const dt = new Date(y, m, d);
    const has = byDay.has(dayKey(dt));
    const sel = day && dayKey(day) === dayKey(dt);
    cells.push(
      <button
        key={d} type="button" disabled={!has} aria-pressed={!!sel}
        onClick={() => { setDay(dt); setSlot(null); }}
        className={`relative aspect-square rounded-lg border text-sm transition-colors ${
          sel ? 'border-ink bg-ink text-white' : has ? 'border-line bg-white hover:border-ink' : 'border-transparent text-ink-faint/50'
        }`}
      >
        {d}
        {has && <span className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-ember" />}
      </button>,
    );
  }

  if (step === 'details') {
    return (
      <form onSubmit={confirm} className="card-light relative p-8 md:p-10" noValidate>
        <p className="eyebrow text-ember-deep">{booking.eyebrow}</p>
        <p className="mt-3 rounded-card border border-ember/25 bg-tint px-4 py-3 text-[15px]">
          <span className="font-medium">{dayLabel(day)} · {timeLabel(slot)}–{timeLabel(new Date(Date.parse(slot) + 30 * 60e3).toISOString())}</span>
          {tz && <span className="text-ink-soft"> ({tz})</span>}
        </p>
        {[['name', 'text', 'name'], ['email', 'email', 'email'], ['company', 'text', 'organization'], ['phone', 'tel', 'tel']].map(([k, type, ac]) => (
          <label key={k} className="mt-7 block">
            <span className={labelCls}>{booking.fields[k]}</span>
            <input type={type} name={k} value={form[k]} onChange={handleChange} autoComplete={ac} maxLength={k === 'email' ? 255 : 160} aria-invalid={!!errors[k]} className={inputCls} />
            {errors[k] && <span role="alert" className="mt-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-ember-deep">{errors[k]}</span>}
          </label>
        ))}
        <label className="mt-7 block">
          <span className={labelCls}>{booking.fields.notes}</span>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} maxLength={2000} placeholder={booking.placeholders.notes} className={`${inputCls} resize-y`} />
        </label>
        <label className="mt-7 block">
          <span className={labelCls}>{booking.fields.guests}</span>
          <input type="text" name="guests" value={form.guests} onChange={handleChange} placeholder={booking.placeholders.guests} aria-invalid={!!errors.guests} className={inputCls} />
          {errors.guests && <span role="alert" className="mt-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-ember-deep">{errors.guests}</span>}
        </label>

        {/* Honeypot: bots spray every field; humans never see this one. */}
        <input type="text" name="website" value={form.website} onChange={handleChange} autoComplete="off" tabIndex={-1} aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
        <HumanCheck onToken={setToken} />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" onClick={() => setStep('pick')}>{booking.cta.back}</Button>
          <Button type="submit" variant="ember" disabled={busy}>{busy ? booking.cta.confirming : booking.cta.confirm}</Button>
        </div>
        <p className="mt-4 text-[12.5px] leading-relaxed text-ink-faint">
          By booking you consent to our <Link to="/privacy" className="text-ember-deep underline underline-offset-2 hover:text-ink">Privacy Policy</Link>. We use your details only to run this call.
        </p>
      </form>
    );
  }

  return (
    <div className="card-light p-8 md:p-10">
      <p className="eyebrow text-ember-deep">{booking.eyebrow}</p>
      <label className="mt-6 block">
        <span className={labelCls}>{booking.topicLabel}</span>
        <select value={topic} onChange={(e) => setTopic(e.target.value)} className={inputCls}>
          {booking.topics.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>

      <div className="mt-8 grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="flex items-center justify-between">
            <b className="font-display text-[22px] font-normal">{MONTHS[m]} {y}</b>
            <span className="flex gap-1.5">
              <button type="button" aria-label="Previous month" disabled={idx <= monthBounds.first} onClick={() => shiftMonth(-1)} className="h-8 w-8 rounded-full border border-line bg-white text-sm hover:border-ink disabled:opacity-30">←</button>
              <button type="button" aria-label="Next month" disabled={idx >= monthBounds.last} onClick={() => shiftMonth(1)} className="h-8 w-8 rounded-full border border-line bg-white text-sm hover:border-ink disabled:opacity-30">→</button>
            </span>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-1">
            {DOW.map((x) => <div key={x} className="pb-1 text-center font-mono text-[10.5px] text-ink-faint">{x}</div>)}
            {cells}
          </div>
        </div>
        <div>
          {day ? (
            <>
              <p className="eyebrow text-ink">{dayLabel(day)}</p>
              <div className="mt-3 grid max-h-[300px] grid-cols-2 content-start gap-2 overflow-auto pr-1">
                {daySlots.length === 0 && <p className="col-span-2 text-sm text-ink-soft">{booking.pickDay}</p>}
                {daySlots.map((iso) => (
                  <button
                    key={iso} type="button" onClick={() => setSlot(iso)} aria-pressed={slot === iso}
                    className={`rounded-lg border px-2 py-2.5 font-mono text-[12.5px] transition-colors ${slot === iso ? 'border-ember bg-ember text-white' : 'border-line bg-white hover:border-ink'}`}
                  >
                    {timeLabel(iso)}
                  </button>
                ))}
              </div>
            </>
          ) : <p className="text-sm text-ink-soft">{booking.pickDay}</p>}
        </div>
      </div>

      <p className="mt-6 flex items-center gap-2 font-mono text-[11.5px] text-ink-faint"><span className="h-[7px] w-[7px] rounded-full bg-ember" />Times shown in {tz || 'your local time'}</p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-[11.5px] text-ink-faint">{slot ? `${dayLabel(day)} · ${timeLabel(slot)}` : booking.none}</span>
        <Button variant="ember" disabled={!slot} onClick={() => setStep('details')}>{booking.cta.continue}</Button>
      </div>
      <p className="mt-5 text-[13px] leading-relaxed text-ink-faint">{booking.note}</p>
    </div>
  );
}

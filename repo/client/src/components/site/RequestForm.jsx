import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from './Button';
import HumanCheck from './HumanCheck';

/* Request-a-document form.
   Posts to the Leads table with a `role` tag the team notification email
   surfaces, so the source is always visible. Nothing is auto-attached: a deck
   request flags the intent in the team email ("DECK REQUEST") and the visitor
   is told a person will email the document shortly. `autoReply` customises
   the visitor's confirmation email (sent by leadController) accordingly. */
export function RequestForm({
  id = 'request',
  label,
  note,
  success,
  role,
  message,
  cta = 'Request',
  autoReply,
}) {
  const [form, setForm] = useState({ name: '', email: '', company: '', website: '' });
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/v1/leads', {
        ...form, // `website` flows as-is: '' for humans, bot junk for bots
        turnstileToken: token || undefined,
        role,
        message,
        autoReply,
        landing_page: typeof window !== 'undefined' ? window.location.href : undefined,
      });
      setSent(true);
      toast.success('Request received.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div id={id} className="card-light scroll-mt-24 p-8 md:p-10">
        <p className="eyebrow text-ember-deep">Received</p>
        <h3 className="mt-3 font-display text-2xl tracking-[-0.01em]">The team has your request.</h3>
        <p className="mt-3 max-w-md text-[15.5px] leading-relaxed text-ink-soft">{success}</p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 font-mono text-[12px] uppercase tracking-[0.1em] text-ember-deep hover:opacity-75"
        >
          Request for someone else
        </button>
      </div>
    );
  }

  const field =
    'w-full rounded-none border-b border-line bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-ink-faint focus:border-ember';
  const labelCls = 'mb-1.5 block font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-ink-soft';

  return (
    <form id={id} onSubmit={handleSubmit} className="card-light scroll-mt-24 p-8 md:p-10">
      <p className="eyebrow text-ink-faint">{label}</p>
      {note ? <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">{note}</p> : null}

      <label className="mt-7 block">
        <span className={labelCls}>Full name</span>
        <input type="text" name="name" value={form.name} onChange={handleChange} required autoComplete="name" placeholder="Your name" className={field} />
      </label>
      <label className="mt-6 block">
        <span className={labelCls}>Work email</span>
        <input type="email" name="email" value={form.email} onChange={handleChange} required autoComplete="email" placeholder="you@company.com" className={field} />
      </label>
      <label className="mt-6 block">
        <span className={labelCls}>Organisation</span>
        <input type="text" name="company" value={form.company} onChange={handleChange} autoComplete="organization" placeholder="Company or institution" className={field} />
      </label>

      {/* Honeypot: bots spray every visible/hidden field; humans never see this one. */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={handleChange}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <HumanCheck onToken={setToken} />

      <Button type="submit" variant="ember" disabled={loading} className="mt-8 w-full sm:w-auto">
        {loading ? 'Sending…' : cta}
      </Button>
      <p className="mt-4 text-[12.5px] leading-relaxed text-ink-faint">
        By sending this you consent to our{' '}
        <Link to="/privacy" className="text-ember-deep underline underline-offset-2 hover:text-ink">Privacy Policy</Link>.
        We use your details only to reply to you.
      </p>
    </form>
  );
}

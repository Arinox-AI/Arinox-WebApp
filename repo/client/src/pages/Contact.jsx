import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LinkedinIcon } from '../components/site/Icons';
import SEO from '../components/ui/SEO';
import { Eyebrow } from '../components/site/Eyebrow';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { Button } from '../components/site/Button';
import { Pill } from '../components/site/Pill';
import HumanCheck from '../components/site/HumanCheck';
import { company } from '../data/site';

const subjects = ['Demo Request', 'General Inquiry', 'Partnership', 'Career', 'Media', 'Other'];
const empty = { name: '', email: '', company: '', phone: '', subject: 'Demo Request', message: '', website: '' };

const Contact = () => {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  /* Message mirrors the server: name required, email format, a message that
     isn't just whitespace. Errors sit under the field, in the site's voice. */
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Your name — we reply person to person.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'That email doesn\u2019t look complete.';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'One sentence is enough — ten characters minimum.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.values(errs).some(Boolean)) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await axios.post('/api/v1/contact', {
        ...form, // `website` flows as-is: '' for humans, bot junk for bots
        turnstileToken: token || undefined,
      });
      setSent(true);
      toast.success("Message sent! We'll be in touch shortly.");
      setForm(empty);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Arinox AI | Book a Discovery Session"
        description="Ready to implement private AI in your company? Talk to Arinox, a focused call to map where CommandCore and KOGO fit your operations, strategy, and compliance needs."
        canonical="https://www.arinox.ai/contact"
      />

      <section className="relative overflow-hidden border-b border-line px-7 pb-12 pt-20 text-center md:pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden>
          <HalftoneBackground dotSize={4} spacing={20} dotColor="#ff6301" opacity={0.35} gradient={{ type: 'linear', angle: 90 }} />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <Eyebrow centered>Contact</Eyebrow>
          <h1 className="font-display text-[40px] leading-[1.06] tracking-[-0.025em] md:text-[62px]">
            Book a <span className="italic text-ember">discovery session.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[560px] text-lg leading-relaxed text-ink-soft">
            One focused call. We map where intelligent AI fits your operations, strategy, and
            compliance needs, free, and the map is yours whatever you decide.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 font-mono text-[11.5px] text-ink-faint">
            <Pill>zero jargon</Pill>
            <Pill>zero commitment</Pill>
            <Pill>map is yours either way</Pill>
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {sent ? (
            <div className="card-light p-10">
              <p className="eyebrow text-ember-deep">Received</p>
              <h2 className="mt-3 font-display text-2xl tracking-[-0.01em]">Someone will reply soon.</h2>
              <p className="mt-3 max-w-md text-[15.5px] leading-relaxed text-ink-soft">
                If it&apos;s urgent, write directly to{' '}
                <a href={`mailto:${company.email}`} className="font-medium underline underline-offset-2">
                  {company.email}
                </a>.
              </p>
              <button onClick={() => setSent(false)} className="mt-6 font-mono text-[12px] uppercase tracking-[0.1em] text-ember-deep hover:opacity-75">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card-light p-8 md:p-10">
              <Field label="Full name" error={errors.name}>
                <input
                  type="text" name="name" value={form.name} onChange={handleChange} required
                  autoComplete="name" placeholder="Your name" aria-invalid={!!errors.name} maxLength={120}
                  className="w-full rounded-none border-b border-line bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-ink-faint focus:border-ember"
                />
              </Field>
              <Field label="Work email" error={errors.email}>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange} required
                  autoComplete="email" placeholder="you@company.com" aria-invalid={!!errors.email} maxLength={255}
                  className="w-full rounded-none border-b border-line bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-ink-faint focus:border-ember"
                />
              </Field>
              <Field label="Organisation">
                <input
                  type="text" name="company" value={form.company} onChange={handleChange}
                  autoComplete="organization" placeholder="Company or institution"
                  className="w-full rounded-none border-b border-line bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-ink-faint focus:border-ember"
                />
              </Field>
              <Field label="Phone">
                <input
                  type="tel" name="phone" value={form.phone} onChange={handleChange}
                  autoComplete="tel" placeholder="Optional"
                  className="w-full rounded-none border-b border-line bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-ink-faint focus:border-ember"
                />
              </Field>
              <Field label="Subject">
                <select
                  name="subject" value={form.subject} onChange={handleChange}
                  className="w-full rounded-none border-b border-line bg-transparent py-2.5 text-base outline-none transition-colors focus:border-ember"
                >
                  {subjects.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="What should we look at first?" error={errors.message}>
                <textarea
                  name="message" value={form.message} onChange={handleChange} required rows={3} maxLength={4000}
                  aria-invalid={!!errors.message}
                  placeholder="One workflow, one bottleneck, one hunch, that's enough to start."
                  className="w-full resize-y rounded-none border-b border-line bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-ink-faint focus:border-ember"
                />
              </Field>

              {/* Honeypot: bots spray every field; humans never see this one. */}
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

              <Button type="submit" variant="ember" disabled={loading} className="mt-2 w-full sm:w-auto">
                {loading ? 'Sending…' : 'Book a discovery session'}
              </Button>
              <p className="mt-4 text-[13px] leading-relaxed text-ink-faint">
                No newsletter, no drip sequence. One reply from a human who can read an architecture diagram.
              </p>
              <p className="mt-3 text-[12.5px] leading-relaxed text-ink-faint">
                By sending this you consent to our{' '}
                <Link to="/privacy" className="text-ember-deep underline underline-offset-2 hover:text-ink">Privacy Policy</Link>.
                We use your details only to reply to you.
              </p>
            </form>
          )}

          <div>
            <div className="mb-8 card-light p-7">
              <h4 className="font-display text-lg">Offices</h4>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {company.offices.map(({ city, note }) => (
                  <div key={city}>
                    <p className="text-[15px] font-medium">{city}</p>
                    <p className="mt-0.5 text-xs text-ink-faint">{note}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-8 card-light p-7">
              <h4 className="font-display text-lg">Direct</h4>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                <a href={`mailto:${company.email}`} className="font-medium text-ink underline underline-offset-2">
                  {company.email}
                </a>{' '}
                · <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="font-medium text-ink underline underline-offset-2">{company.phone}</a>
              </p>
              <a
                href={company.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ember-deep transition-opacity hover:opacity-75"
              >
                <LinkedinIcon size={15} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

function Field({ label, error, children }) {
  return (
    <label className="mb-7 block">
      <span className="mb-1.5 block font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-ink-soft">{label}</span>
      {children}
      {error && (
        <span role="alert" className="mt-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-ember-deep">
          {error}
        </span>
      )}
    </label>
  );
}

export default Contact;

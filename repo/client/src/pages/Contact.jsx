import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LinkedinIcon } from '../components/site/Icons';
import SEO from '../components/ui/SEO';
import { Eyebrow } from '../components/site/Eyebrow';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { Button } from '../components/site/Button';
import { company } from '../data/site';

const subjects = ['Demo Request', 'General Inquiry', 'Partnership', 'Career', 'Media', 'Other'];
const empty = { name: '', email: '', company: '', phone: '', subject: 'Demo Request', message: '' };

const Contact = () => {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/v1/contact', form);
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

      <section className="relative overflow-hidden px-7 pb-10 pt-20 text-center md:pt-28">
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
            <span className="rounded-full border border-line bg-white px-3 py-1">reply in 1 working day</span>
            <span className="rounded-full border border-line bg-white px-3 py-1">zero jargon</span>
            <span className="rounded-full border border-line bg-white px-3 py-1">zero commitment</span>
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {sent ? (
            <div className="card-light p-10">
              <p className="eyebrow text-ember-deep">Received</p>
              <h2 className="mt-3 font-display text-2xl tracking-[-0.01em]">We&apos;ll reply within one working day.</h2>
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
              <Field label="Full name">
                <input
                  type="text" name="name" value={form.name} onChange={handleChange} required
                  autoComplete="name" placeholder="Your name"
                  className="w-full rounded-none border-b border-line bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-ink-faint focus:border-ember"
                />
              </Field>
              <Field label="Work email">
                <input
                  type="email" name="email" value={form.email} onChange={handleChange} required
                  autoComplete="email" placeholder="you@company.com"
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
              <Field label="What should we look at first?">
                <textarea
                  name="message" value={form.message} onChange={handleChange} required rows={3}
                  placeholder="One workflow, one bottleneck, one hunch, that's enough to start."
                  className="w-full resize-y rounded-none border-b border-line bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-ink-faint focus:border-ember"
                />
              </Field>
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

function Field({ label, children }) {
  return (
    <label className="mb-7 block">
      <span className="mb-1.5 block font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-ink-soft">{label}</span>
      {children}
    </label>
  );
}

export default Contact;

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import SEO from '../components/ui/SEO';
import Reveal from '../components/ui/Reveal';
import { company } from '../data/site';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', subject: 'Demo Request', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/v1/contact', form);
      setSent(true);
      toast.success("Message sent! We'll be in touch shortly.");
      setForm({ name: '', email: '', company: '', phone: '', subject: 'Demo Request', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'name', placeholder: 'Full Name', required: true },
    { name: 'email', placeholder: 'Work Email', type: 'email', required: true },
    { name: 'company', placeholder: 'Company' },
    { name: 'phone', placeholder: 'Phone Number', type: 'tel' },
  ];

  return (
    <>
      <SEO
        title="Contact Arinox AI | Start Your Private AI Journey"
        description="Ready to implement private AI in your company? Talk to Arinox — a focused call to map where CommandCore and KOGO fit your operations, strategy, and compliance needs."
        canonical="https://www.arinox.ai/contact"
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="pt-32 md:pt-40 pb-14 border-b border-brand-border">
        <div className="container-wide max-w-3xl">
          <Reveal>
            <p className="overline">Contact</p>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold leading-[1.08] mb-5">
              Let&rsquo;s put AI to work <span className="text-gradient">inside your company.</span>
            </h1>
            <p className="lead">
              Tell us where you want AI to create real advantage. We&rsquo;ll come back within one business day
              with a concrete next step — no jargon, no commitment.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Form + info ───────────────────────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="container-wide grid lg:grid-cols-12 gap-12">

          {/* Form */}
          <div className="lg:col-span-7" ref={formRef}>
            <Reveal>
              <h2 className="text-xl font-display font-bold mb-6">Send us a message</h2>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card p-10 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-brand-primary/12 border border-brand-primary/30 flex items-center justify-center mx-auto mb-4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-7 h-7 text-brand-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-lg mb-1.5">Message received</h3>
                  <p className="text-brand-muted text-sm mb-5">Our team will reach out within one business day.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-brand-primary text-sm hover:underline py-2 px-3"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {fields.map(({ name, placeholder, type = 'text', required }, i) => (
                      <motion.div
                        key={name}
                        custom={i}
                        variants={fadeUp}
                        initial="hidden"
                        animate={formInView ? 'visible' : 'hidden'}
                      >
                        <input
                          type={type}
                          name={name}
                          value={form[name]}
                          onChange={handleChange}
                          onFocus={() => setFocused(name)}
                          onBlur={() => setFocused(null)}
                          placeholder={placeholder}
                          required={required}
                          aria-label={placeholder}
                          autoComplete={name === 'email' ? 'email' : name === 'name' ? 'name' : name === 'phone' ? 'tel' : 'organization'}
                          className={`w-full px-4 py-3.5 text-sm outline-none transition-all placeholder-brand-subtle ${
                            focused === name ? 'border-brand-primary/70 ring-2 ring-brand-primary/10' : 'border-brand-border'
                          } contact-input`}
                        />
                      </motion.div>
                    ))}
                  </div>

                  <motion.select
                    custom={4} variants={fadeUp} initial="hidden" animate={formInView ? 'visible' : 'hidden'}
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    aria-label="Subject"
                    className="w-full px-4 py-3.5 text-sm bg-brand-card text-brand-text outline-none contact-input"
                  >
                    {['Demo Request', 'General Inquiry', 'Partnership', 'Career', 'Media', 'Other'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </motion.select>

                  <motion.textarea
                    custom={5} variants={fadeUp} initial="hidden" animate={formInView ? 'visible' : 'hidden'}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    rows={5}
                    placeholder="Tell us about your challenge — or where you'd like AI to start creating value..."
                    required
                    aria-label="Message"
                    className={`w-full px-4 py-3.5 text-sm resize-none outline-none transition-all placeholder-brand-subtle ${
                      focused === 'message' ? 'border-brand-primary/70 ring-2 ring-brand-primary/10' : 'border-brand-border'
                    } contact-input`}
                  />

                  <motion.div custom={6} variants={fadeUp} initial="hidden" animate={formInView ? 'visible' : 'hidden'}>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary w-full !py-3.5 disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                          />
                          Sending...
                        </span>
                      ) : 'Send message →'}
                    </motion.button>
                  </motion.div>
                </form>
              )}
            </Reveal>
          </div>

          {/* Info */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal delay={0.08}>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-primary mb-3" style={{ fontFamily: 'Manrope' }}>Our offices</p>
                <div className="grid grid-cols-2 gap-3">
                  {company.offices.map(({ city, note }) => (
                    <div key={city} className="card card-hover p-4">
                      <p className="font-display font-bold text-sm">{city}</p>
                      <p className="text-brand-subtle text-xs mt-0.5">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="card p-5">
                <p className="font-display font-bold text-sm mb-0.5">Email us</p>
                <a href={`mailto:${company.email}`} className="text-brand-primary hover:underline text-sm">{company.email}</a>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-primary mb-4" style={{ fontFamily: 'Manrope' }}>What happens next</p>
                <div className="space-y-3">
                  {[
                    'We review your message within one business day',
                    'We schedule a focused 15-minute call',
                    'We map your private AI opportunity — no commitment',
                    'You get a tailored proposal within a week',
                  ].map((step, i) => (
                    <div key={step} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-brand-primary/12 border border-brand-primary/40 flex items-center justify-center text-[11px] text-brand-primary font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-sm text-brand-muted leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="card p-5">
                <p className="text-[12px] text-brand-muted leading-relaxed">
                  <strong className="text-brand-text">Arinox AI</strong> is {company.entity}, registered in Bengaluru,
                  India — recognised by Startup India (DPIIT).
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

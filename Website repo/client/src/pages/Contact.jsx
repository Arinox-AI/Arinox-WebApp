import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import toast from 'react-hot-toast';
import SEO from '../components/ui/SEO';

gsap.registerPlugin(ScrollTrigger);

const offices = [
  {
    region: 'India',
    detail: 'New Delhi',
    flags: [{ src: 'https://flagcdn.com/in.svg', alt: 'India' }],
  },
  {
    region: 'India',
    detail: 'Bangalore',
    flags: [{ src: 'https://flagcdn.com/in.svg', alt: 'India' }],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.office-card', {
        opacity: 0, y: 36, rotateX: 18,
        stagger: 0.1, duration: 0.7, ease: 'back.out(1.3)',
        scrollTrigger: { trigger: '.offices-grid', start: 'top 82%' },
      });
      gsap.from('.step-item', {
        opacity: 0, x: -28, rotateY: -10,
        stagger: 0.12, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: '.steps-list', start: 'top 84%' },
      });
    });
    return () => ctx.revert();
  }, []);

  const fields = [
    { name: 'name', placeholder: 'Full Name', required: true },
    { name: 'email', placeholder: 'Work Email', type: 'email', required: true },
    { name: 'company', placeholder: 'Company' },
    { name: 'phone', placeholder: 'Phone Number' },
  ];

  return (
    <>
      <SEO
        title="Contact Arinox AI — Get Started or Request a Demo"
        description="Ready to transform your enterprise with AI? Contact Arinox AI for a free 15-min call, partnership inquiry, or demo request."
        canonical="https://www.arinox.ai/contact"
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-14 grid-bg overflow-hidden">
        <div className="orb w-[440px] h-[440px] bg-brand-primary/10 -top-20 left-1/2 -translate-x-1/2" />
        <div className="orb w-[260px] h-[260px] bg-brand-primary/7 top-1/2 right-0 translate-x-1/3" />

        <div className="container-wide relative">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-xs tracking-widest uppercase text-brand-primary mb-3 font-semibold"
          >
            Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 36, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="text-5xl md:text-6xl font-display font-bold text-white mb-3 leading-tight"
            style={{ transformOrigin: 'bottom center' }}
          >
            Let's Transform <span className="text-gradient">Together.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-brand-muted max-w-md"
          >
            Empower your teams, evolve your business, and lead your industry with AI that actually works.
          </motion.p>

        </div>
      </section>

      {/* ── Form + Info ──────────────────────────────────────── */}
      <section className="py-14 relative overflow-hidden">
        <motion.div
          animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="orb w-[500px] h-[500px] bg-brand-primary/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />

        <div className="container-wide grid lg:grid-cols-2 gap-14 relative">

          {/* ── Form ─────────────────────────────────────────── */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, rotateY: -14, x: -30 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-5">Send us a message</h2>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: 8 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.5, ease: 'backOut' }}
                className="glass-card rounded-2xl p-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: 'backOut' }}
                  className="w-14 h-14 rounded-full bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center mx-auto mb-3"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-7 h-7 text-brand-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-white font-bold text-lg mb-1.5">Message Received!</h3>
                <p className="text-brand-muted text-sm mb-5">Our team will reach out within 24 hours.</p>
                <button
                  onClick={() => setSent(false)}
                  className="text-brand-primary text-sm hover:underline transition-colors"
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
                      className="relative"
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
                        className="w-full px-4 py-3.5 rounded-xl glass border text-sm focus:outline-none transition-all duration-300 placeholder-brand-muted text-white"
                        style={{
                          borderColor: focused === name ? 'rgba(254,99,0,0.7)' : 'rgba(37,37,38,1)',
                          boxShadow: focused === name ? '0 0 0 3px rgba(254,99,0,0.12)' : 'none',
                        }}
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.select
                  custom={4} variants={fadeUp} initial="hidden" animate={formInView ? 'visible' : 'hidden'}
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl glass border border-brand-border text-white text-sm focus:outline-none focus:border-brand-primary transition-all duration-300 bg-brand-surface"
                >
                  {['Demo Request', 'General Inquiry', 'Partnership', 'Career', 'Media', 'Other'].map(s => (
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
                  rows={4}
                  placeholder="Tell us about your challenge or what you'd like to achieve with AI..."
                  required
                  className="w-full px-4 py-3.5 rounded-xl glass border text-white placeholder-brand-muted text-sm focus:outline-none transition-all duration-300 resize-none"
                  style={{
                    borderColor: focused === 'message' ? 'rgba(254,99,0,0.7)' : 'rgba(37,37,38,1)',
                    boxShadow: focused === 'message' ? '0 0 0 3px rgba(254,99,0,0.12)' : 'none',
                  }}
                />

                <motion.div custom={6} variants={fadeUp} initial="hidden" animate={formInView ? 'visible' : 'hidden'}>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.012 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-sm hover:shadow-xl hover:shadow-brand-primary/25 transition-all disabled:opacity-50 relative overflow-hidden"
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
                    ) : (
                      <>
                        Send Message →
                        <motion.span
                          className="absolute inset-0 bg-white/10"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.38 }}
                        />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            )}
          </motion.div>

          {/* ── Info Panel ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, rotateY: 14, x: 30 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
            className="space-y-6"
          >
            {/* Offices */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-brand-primary mb-3">Our Offices</p>
              <div className="offices-grid grid grid-cols-2 gap-3">
                {offices.map(({ region, detail, flags }) => (
                  <motion.div
                    key={region}
                    whileHover={{ rotateY: 6, rotateX: -4, scale: 1.03, transition: { duration: 0.2 } }}
                    className="office-card glass-card rounded-xl p-4 cursor-default"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      {flags.map(({ src, alt }) => (
                        <img
                          key={alt}
                          src={src}
                          alt={alt}
                          className="h-4 w-6 object-cover rounded-sm shadow-sm"
                        />
                      ))}
                    </div>
                    <p className="text-white font-semibold text-sm">{region}</p>
                    <p className="text-brand-muted text-xs">{detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, rotateX: 10, y: 20 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ rotateX: -3, scale: 1.01, transition: { duration: 0.2 } }}
              className="glass-card rounded-2xl p-5"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <p className="text-white font-bold text-sm mb-0.5">Email Us</p>
              <a href="mailto:assist@arinox.ai" className="text-brand-primary hover:underline text-sm transition-all">
                assist@arinox.ai
              </a>
            </motion.div>

            {/* What happens next */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-brand-primary mb-4">What happens next</p>
              <div className="steps-list space-y-3">
                {[
                  'We review your message within 2 hours',
                  'Our team schedules a free 15-min call',
                  'We map your AI opportunity — no commitment',
                  'You get a tailored proposal within 5 days',
                ].map((step, i) => (
                  <div key={step} className="step-item flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-primary/15 border border-brand-primary/50 flex items-center justify-center text-[11px] text-brand-primary font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm text-brand-muted leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;

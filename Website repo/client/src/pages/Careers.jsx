import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import SEO from '../components/ui/SEO';
import { useAuth } from '../hooks/useAuth';
import QRLoginModal from '../components/ui/QRLoginModal';
import AuthModal from '../components/ui/AuthModal';

/* ─── Why-join icons ─────────────────────────────────────── */
const GlobeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const TrendingUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>
);
const LightbulbIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
    <path d="M9 18h6M10 22h4"/>
  </svg>
);
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

/* ─── Data ───────────────────────────────────────────────── */
const perks = [
  { Icon: GlobeIcon,      title: 'Impact at Scale',      desc: 'Your work powers transformation across industries and continents.' },
  { Icon: TrendingUpIcon, title: 'Fast Growth',           desc: "Develop tomorrow's skills today. We invest in your career." },
  { Icon: LightbulbIcon,  title: 'Creative Freedom',      desc: 'Bring your best ideas. We implement them.' },
  { Icon: HomeIcon,       title: 'Flexible Work',         desc: 'Remote-friendly with offices across India.' },
];

const sampleRoles = [
  { title: 'AI Associate', department: 'Engineering', location: 'Bangalore / Remote', type: 'Full-time' },
];

const emptyApp = { fullName: '', email: '', phone: '', linkedIn: '', coverNote: '' };

/* ─── Apply Modal ────────────────────────────────────────── */
const ApplyModal = ({ job, onClose, onDone }) => {
  const [form, setForm] = useState(emptyApp);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const fileRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type)) { toast.error('Only PDF, DOC, or DOCX files accepted.'); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error('File must be under 5 MB.'); return; }
    setResume(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('fullName',   form.fullName);
      fd.append('email',      form.email);
      fd.append('phone',      form.phone);
      fd.append('role',       job.title);
      fd.append('department', job.department || '');
      fd.append('linkedIn',   form.linkedIn);
      fd.append('coverNote',  form.coverNote);
      if (resume) fd.append('resume', resume);
      await axios.post('/api/v1/careers/apply', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setDone(true);
      toast.success("Application submitted! We'll be in touch.");
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => { if (e.target === e.currentTarget) { if (done) onDone(job.title); onClose(); } }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24, rotateX: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto glass-card rounded-2xl p-7 shadow-2xl"
          style={{ perspective: 1000 }}
        >
          {/* Close */}
          <button
            onClick={() => { if (done) onDone(job.title); onClose(); }}
            className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-brand-muted hover:text-brand-text hover:bg-brand-border/30 transition-all"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>

          {done ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="py-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4, ease: 'backOut' }}
                className="w-14 h-14 rounded-full bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center mx-auto mb-5"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </motion.div>
              <h3 className="text-brand-text font-bold text-lg mb-2">Application Received</h3>
              <p className="text-brand-muted text-sm mb-6">We'll review your profile and be in touch within 5 business days.</p>
              <button
                onClick={() => { onDone(job.title); onClose(); }}
                className="px-6 py-2.5 rounded-xl bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-sm font-semibold hover:bg-brand-primary hover:text-white transition-all"
              >
                Close
              </button>
            </motion.div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-xs tracking-widest uppercase text-brand-primary font-semibold mb-1">Apply for</p>
                <h2 className="text-xl font-display font-bold text-brand-text">{job.title}</h2>
                <p className="text-xs text-brand-muted mt-0.5">{job.department} · {job.location}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    name="fullName" value={form.fullName} onChange={handleChange}
                    placeholder="Full Name" required
                    className="contact-input w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                  />
                  <input
                    name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="Email Address" required
                    className="contact-input w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                  />
                </div>

                {/* Phone */}
                <input
                  name="phone" type="tel" value={form.phone} onChange={handleChange}
                  placeholder="Contact Number" required
                  className="contact-input w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                />

                {/* Resume upload */}
                <div>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-brand-border hover:border-brand-primary/50 text-brand-muted hover:text-brand-text text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    {resume ? resume.name : 'Upload Resume / CV (PDF, DOC, DOCX · max 5 MB)'}
                  </button>
                  <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" />
                </div>

                {/* LinkedIn */}
                <input
                  name="linkedIn" value={form.linkedIn} onChange={handleChange}
                  placeholder="LinkedIn Profile URL (optional)"
                  className="contact-input w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                />

                {/* Cover note */}
                <textarea
                  name="coverNote" value={form.coverNote} onChange={handleChange}
                  rows={3}
                  placeholder="Why do you want to join Arinox? (optional)"
                  className="contact-input w-full px-4 py-3 rounded-xl text-sm focus:outline-none resize-none"
                />

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.012 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-sm hover:shadow-lg hover:shadow-brand-primary/25 transition-all disabled:opacity-50 relative overflow-hidden"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block" />
                      Submitting…
                    </span>
                  ) : 'Submit Application →'}
                </motion.button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ─── Careers page ───────────────────────────────────────── */
const Careers = () => {
  const { user } = useAuth();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [applyJob, setApplyJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [showQR, setShowQR] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const handleApplyClick = (job) => {
    if (!user) { setShowQR(true); return; }
    setApplyJob(job);
  };

  const handleApplyDone = (jobTitle) => {
    setAppliedJobs(prev => new Set([...prev, jobTitle]));
  };

  useEffect(() => {
    axios.get('/api/v1/careers')
      .then(({ data }) => setCareers(data.data))
      .catch(() => setCareers(sampleRoles))
      .finally(() => setLoading(false));
  }, []);

  const list = careers.length ? careers : sampleRoles;
  const depts = ['All', ...new Set(list.map(j => j.department))];
  const filtered = list.filter(j => filter === 'All' || j.department === filter);

  return (
    <>
      <SEO
        title="Careers at Arinox AI — Build What Matters"
        description="Join Arinox AI and build AI systems that transform enterprises and governments worldwide. Explore open roles in engineering, sales, research, and more."
        canonical="https://www.arinox.ai/careers"
      />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pt-36 pb-12 grid-bg overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-brand-primary/10 top-0 right-0 -translate-y-1/4" />
        <div className="container-wide relative">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs tracking-widest uppercase text-brand-primary mb-4">Careers</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
            Build What <span className="text-gradient">Matters.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-sm md:text-base text-brand-muted max-w-xl">
            We don't chase AI buzzwords. We build systems that transform how enterprises and governments work.
          </motion.p>
          <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} href="#roles"
            className="inline-flex mt-7 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-sm hover:opacity-90 transition-opacity">
            Join Our Mission
          </motion.a>
        </div>
      </section>

      {/* ── Why Join Arinox ──────────────────────────────── */}
      <section className="py-12">
        <div className="container-wide">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Why <span className="text-gradient">Join Arinox?</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {perks.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24, rotateX: 12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-card rounded-2xl p-5"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-9 h-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-3">
                  <Icon />
                </div>
                <h3 className="text-white font-bold mb-1.5 text-sm">{title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Roles ───────────────────────────────────── */}
      <section id="roles" className="py-12 bg-brand-surface">
        <div className="container-wide">
          <div className="text-center mb-7">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Open <span className="text-gradient">Positions</span></h2>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {depts.map(d => (
              <button key={d} onClick={() => setFilter(d)}
                className={`px-4 py-2 rounded-xl text-sm transition-all ${filter === d ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30' : 'glass border border-brand-border text-brand-muted hover:text-brand-text'}`}>
                {d}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="glass-card rounded-2xl h-20 animate-pulse" />)
              : filtered.map((job, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div>
                    <h3 className="text-brand-text font-bold text-lg mb-1">{job.title}</h3>
                    <div className="flex flex-wrap gap-3">
                      <span className="text-xs text-brand-primary">{job.department}</span>
                      <span className="text-xs text-brand-muted">📍 {job.location}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary">{job.type}</span>
                    </div>
                  </div>
                  {appliedJobs.has(job.title) ? (
                    <span className="flex-shrink-0 px-6 py-2.5 rounded-xl border border-brand-primary/40 bg-brand-primary/8 text-brand-primary text-sm font-semibold flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApplyClick(job)}
                      className="flex-shrink-0 px-6 py-2.5 rounded-xl border border-brand-border text-brand-muted group-hover:border-brand-primary group-hover:text-brand-text text-sm transition-all"
                    >
                      Apply Now →
                    </button>
                  )}
                </motion.div>
              ))
            }
          </div>

          <div className="text-center mt-7">
            <p className="text-brand-muted text-sm mb-3">Don't see a role that fits? We still want to hear from you.</p>
            <a href="mailto:assist@arinox.ai" className="text-brand-primary font-medium hover:underline text-sm">
              Send your CV → assist@arinox.ai
            </a>
          </div>
        </div>
      </section>

      {/* Apply modal */}
      {applyJob && (
        <ApplyModal
          job={applyJob}
          onClose={() => setApplyJob(null)}
          onDone={handleApplyDone}
        />
      )}

      {/* Login prompts */}
      <QRLoginModal isOpen={showQR} onClose={() => setShowQR(false)} onSwitchToEmail={() => { setShowQR(false); setShowAuth(true); }} />
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onSwitchToQR={() => { setShowAuth(false); setShowQR(true); }} defaultMode="register" />
    </>
  );
};

export default Careers;

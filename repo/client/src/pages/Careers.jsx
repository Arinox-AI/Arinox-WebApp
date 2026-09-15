import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ArrowUpRight, EnvelopeSimple, Tray, Plus, Minus } from '@phosphor-icons/react';
import SEO from '../components/ui/SEO';
import { Label } from '../components/site/Layout';
import { Button } from '../components/site/Button';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { CtaBand } from '../components/site/Shell';
import { perks as perksData } from '../data/careers';

const getJdBySlug = (roles, role) => {
  const match = roles.find(r => r.slug === role.slug || r.title === role.title);
  return match?.jd || null;
};

const emptyApp = { fullName: '', email: '', phone: '', linkedIn: '', coverNote: '' };

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
      fd.append('fullName', form.fullName);
      fd.append('email', form.email);
      fd.append('phone', form.phone);
      fd.append('role', job.title);
      fd.append('department', job.department || '');
      fd.append('linkedIn', form.linkedIn);
      fd.append('coverNote', form.coverNote);
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
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-4"
        onClick={(e) => { if (e.target === e.currentTarget) { if (done) onDone(job.title); onClose(); } }}
        role="dialog" aria-modal="true" aria-label="Apply for position"
      >
        <div className="absolute inset-0 bg-void/70 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto card-light p-8"
        >
          <button
            onClick={() => { if (done) onDone(job.title); onClose(); }}
            className="absolute right-5 top-5 text-2xl leading-none text-ink-faint hover:text-ink"
            aria-label="Close"
          >
            ×
          </button>

          {done ? (
            <div className="py-8 text-center">
              <h3 className="font-display text-2xl tracking-[-0.01em]">Application received</h3>
              <p className="mt-3 text-sm text-ink-soft">We&apos;ll review your profile and be in touch within 5 business days.</p>
            </div>
          ) : (
            <>
              <p className="eyebrow text-ember-deep">Apply · {job.department}</p>
              <h3 className="mt-3 font-display text-2xl tracking-[-0.01em]">{job.title}</h3>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Full name" className="w-full rounded-none border-b border-line bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-ink-faint focus:border-ember" />
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Work email" className="w-full rounded-none border-b border-line bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-ink-faint focus:border-ember" />
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full rounded-none border-b border-line bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-ink-faint focus:border-ember" />
                <input name="linkedIn" value={form.linkedIn} onChange={handleChange} placeholder="LinkedIn / portfolio URL" className="w-full rounded-none border-b border-line bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-ink-faint focus:border-ember" />
                <textarea name="coverNote" value={form.coverNote} onChange={handleChange} rows={3} placeholder="Anything we should know?" className="w-full resize-y rounded-none border-b border-line bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-ink-faint focus:border-ember" />
                <div>
                  <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" />
                  <Button type="button" variant="ghost" size="sm" onClick={() => fileRef.current?.click()}>
                    {resume ? resume.name : 'Attach resume (PDF/DOC)'}
                  </Button>
                </div>
                <Button type="submit" variant="ember" disabled={loading} className="mt-2 w-full">
                  {loading ? 'Submitting…' : 'Submit application'}
                </Button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Careers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [applyJob, setApplyJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [expandedJD, setExpandedJD] = useState(null);

  const handleApplyClick = (job) => setApplyJob(job);
  const handleApplyDone = (jobTitle) => setAppliedJobs(prev => new Set([...prev, jobTitle]));

  useEffect(() => {
    axios.get('/api/v1/careers')
      .then(({ data }) => setCareers(data.data || []))
      .catch(() => setCareers([]))
      .finally(() => setLoading(false));
  }, []);

  const list = careers;
  const depts = ['All', ...new Set(list.map(j => j.department).filter(Boolean))];
  const filtered = list.filter(j => filter === 'All' || j.department === filter);
  const perks = perksData;

  return (
    <>
      <SEO
        title="Careers at Arinox AI | Build What Matters"
        description="Join Arinox AI and build AI systems that transform enterprises and governments worldwide. Explore open roles in engineering, sales, research, and more."
        canonical="https://www.arinox.ai/careers"
      />

      <section className="relative overflow-hidden border-b border-line px-7 pb-12 pt-20 md:pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden>
          <HalftoneBackground dotSize={4} spacing={20} dotColor="#ff6301" opacity={0.35} gradient={{ type: 'linear', angle: 90 }} />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <Label>Careers</Label>
          <h1 className="mt-5 max-w-3xl font-display text-[40px] leading-[1.06] tracking-[-0.025em] md:text-[62px]">
            Build systems that <span className="italic text-ember">have to work.</span>
          </h1>
          <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-ink-soft">
            We are a small team of operators shipping sovereign AI into banks, hospitals, factories,
            and government networks. If production is the part you enjoy, talk to us.
          </p>
        </div>
      </section>

      {/* Why join */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-7">
          <Label>How we work</Label>
          <h2 className="mt-5 font-display text-3xl tracking-[-0.01em] md:text-[40px]">What we look for.</h2>
          <div className="mt-10 grid gap-x-16 gap-y-8 border-t border-ink/80 sm:grid-cols-2">
            {perks.map(({ title, desc }) => (
              <div key={title} className="border-b border-line pt-6">
                <h3 className="font-display text-[20px] tracking-[-0.01em]">{title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section id="roles" className="border-t border-line py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-7">
          <Label>Open roles</Label>
          <h2 className="mt-5 font-display text-3xl tracking-[-0.01em] md:text-[40px]">Where you could land.</h2>

          {depts.length > 1 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {depts.map(d => (
                <button
                  key={d} onClick={() => setFilter(d)}
                  className={`chip rounded-full border px-3.5 py-1.5 transition-colors ${filter === d ? 'border-ember bg-ember text-white' : 'border-line text-ink-soft hover:border-ink hover:text-ink'}`}
                >
                  {d}
                </button>
              ))}
            </div>
          )}

          <div className="mt-8 card-light overflow-hidden">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-20 border-b border-line last:border-b-0" />)
            ) : filtered.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-ember/10 text-ember">
                  <Tray size={20} weight="duotone" />
                </div>
                <h3 className="font-display text-xl">No open roles right now</h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
                  We don&apos;t have active positions at the moment, but we&apos;re always looking for exceptional people.
                </p>
                <Link to="/contact" className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ember-deep">
                  Get in touch <ArrowUpRight size={14} weight="bold" />
                </Link>
              </div>
            ) : (
              filtered.map((job, i) => {
                const key = job.slug || job.title || i;
                const jd = getJdBySlug(list, job);
                const open = expandedJD === key;
                return (
                  <div key={key} className="border-b border-line last:border-b-0">
                    <div className="grid items-center gap-3 px-6 py-6 md:grid-cols-[1.6fr_1fr_1fr_auto] md:gap-6 md:px-8">
                      <div>
                        <span className="font-display text-[20px] tracking-[-0.01em]">{job.title}</span>
                      </div>
                      <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-ink-faint">{job.department}</span>
                      <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-ink-faint">{job.location} · {job.type}</span>
                      <div className="flex items-center gap-4">
                        {jd && (
                          <button
                            onClick={() => setExpandedJD(open ? null : key)}
                            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint transition-colors hover:text-ink"
                          >
                            {open ? <Minus size={14} weight="bold" /> : <Plus size={14} weight="bold" />}
                            Role
                          </button>
                        )}
                        {appliedJobs.has(job.title) ? (
                          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ember-deep">Applied</span>
                        ) : (
                          <button
                            onClick={() => handleApplyClick(job)}
                            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint transition-colors hover:text-ember-deep"
                          >
                            Apply <ArrowUpRight size={14} weight="bold" />
                          </button>
                        )}
                      </div>
                    </div>
                    <AnimatePresence initial={false}>
                      {open && jd && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-line px-6 py-7 md:px-8">
                            {jd.tagline && <p className="max-w-3xl text-[15px] leading-relaxed text-ink-soft">{jd.tagline}</p>}
                            {jd.responsibilities?.length > 0 && (
                              <div className="mt-6">
                                <p className="eyebrow text-ember-deep">{jd.responsibilitiesLabel || "What you'll do"}</p>
                                <ul className="mt-3 grid gap-2 md:grid-cols-2">
                                  {jd.responsibilities.map((r) => (
                                    <li key={r} className="flex gap-3 text-[14px] leading-relaxed text-ink-soft">
                                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ember" />{r}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {jd.fit?.length > 0 && (
                              <div className="mt-6">
                                <p className="eyebrow text-ember-deep">{jd.fitLabel || "You'd be a great fit if you…"}</p>
                                <ul className="mt-3 grid gap-2 md:grid-cols-2">
                                  {jd.fit.map((r) => (
                                    <li key={r} className="flex gap-3 text-[14px] leading-relaxed text-ink-soft">
                                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ember" />{r}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {jd.bring?.length > 0 && (
                              <p className="mt-6 text-[14px] leading-relaxed text-ink-soft">
                                {jd.bringLabel} <b className="font-medium text-ink">{jd.bring.join(' · ')}</b>
                              </p>
                            )}
                            {jd.closing && <p className="mt-6 max-w-3xl text-[14px] leading-relaxed text-ink-faint">{jd.closing}</p>}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="mailto:careers@arinox.ai" variant="dark">
              <EnvelopeSimple size={17} weight="bold" />
              careers@arinox.ai
            </Button>
            <span className="text-sm text-ink-faint">No matching role? Send your work anyway.</span>
          </div>
        </div>
      </section>

      <CtaBand
        title="Not looking for a job, but need the work done?"
        offer={
          <>
            We deploy sovereign AI for enterprises and governments.{' '}
            <b className="font-medium text-white">Start with a discovery session.</b>
          </>
        }
      />

      {applyJob && (
        <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} onDone={handleApplyDone} />
      )}
    </>
  );
};

export default Careers;

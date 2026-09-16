import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  ArrowUpRight, EnvelopeSimple, Tray, Plus, Minus,
  Globe, TrendUp, Lightbulb, Buildings, MapPin, Clock,
} from '@phosphor-icons/react';
import SEO from '../components/ui/SEO';
import { Label } from '../components/site/Layout';
import { Button } from '../components/site/Button';
import { HalftoneBackground } from '../components/site/HalftoneBackground';
import { CtaBand } from '../components/site/Shell';
import { perks as perksData, roles as rolesData } from '../data/careers';

// Prefer a match that actually carries a JD, so API roles (which may not store
// one) still fall back to the structured JD held in data/careers.js.
const getJdBySlug = (roles, role) => {
  const match = roles.find(r => (r.slug === role.slug || r.title === role.title) && r.jd);
  return match?.jd || null;
};

const PERK_ICONS = { Globe, TrendUp, Lightbulb, Buildings, TrendingUp: TrendUp, Building2: Buildings };

const emptyApp = { fullName: '', email: '', phone: '', linkedIn: '', coverNote: '' };

const Chip = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper-2 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-faint">
    {children}
  </span>
);

const JDBlock = ({ label, items }) => (
  <div>
    <p className="eyebrow text-ember-deep">{label}</p>
    <ul className="mt-3 space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-[14.5px] leading-relaxed text-ink-soft">
          <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ember" aria-hidden />
          {it}
        </li>
      ))}
    </ul>
  </div>
);

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
      // Roles live in Supabase, but until they are published there the site
      // falls back to the structured list in data/careers.js.
      .then(({ data }) => {
        const apiRoles = data.data || [];
        setCareers(apiRoles.length ? apiRoles : rolesData);
      })
      .catch(() => setCareers(rolesData))
      .finally(() => setLoading(false));
  }, []);

  const list = careers;
  const jdSources = [...list, ...rolesData];

  const deptCounts = list.reduce((acc, j) => {
    if (!j.department) return acc;
    acc[j.department] = (acc[j.department] || 0) + 1;
    return acc;
  }, {});
  const depts = ['All', ...Object.keys(deptCounts)];
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

      {/* How we work */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-7">
          <Label>How we work</Label>
          <h2 className="mt-5 font-display text-3xl tracking-[-0.01em] md:text-[40px]">What we look for.</h2>
          <div className="mt-12 grid gap-x-16 gap-y-10 sm:grid-cols-2">
            {perks.map(({ icon, title, desc }) => {
              const Icon = PERK_ICONS[icon] || Globe;
              return (
                <div key={title} className="flex gap-4 border-t border-ink/80 pt-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-ember-deep">
                    <Icon size={19} weight="duotone" />
                  </span>
                  <div>
                    <h3 className="font-display text-[20px] tracking-[-0.01em]">{title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section id="roles" className="border-t border-line py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-7">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Label>Open roles</Label>
              <h2 className="mt-5 font-display text-3xl tracking-[-0.01em] md:text-[40px]">Where you could land.</h2>
            </div>
            {!loading && filtered.length > 0 && (
              <p className="num font-mono text-[12px] uppercase tracking-[0.08em] text-ink-faint">
                {String(filtered.length).padStart(2, '0')} open {filtered.length === 1 ? 'role' : 'roles'}
              </p>
            )}
          </div>

          {depts.length > 1 && (
            <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter roles by department">
              {depts.map((d) => {
                const on = filter === d;
                const count = d === 'All' ? list.length : deptCounts[d];
                return (
                  <button
                    key={d}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setFilter(d)}
                    className={`chip inline-flex items-center gap-2 rounded-full border px-3.5 py-2 transition-colors ${
                      on ? 'border-ember bg-ember text-ink' : 'border-line text-ink-soft hover:border-ink/40 hover:text-ink'
                    }`}
                  >
                    {d}
                    <span className={`num text-[10px] ${on ? 'text-ink/60' : 'text-ink-faint'}`}>{String(count).padStart(2, '0')}</span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-8 space-y-3">
            {loading ? (
              Array.from({ length: 2 }).map((_, i) => <div key={i} className="skeleton h-24 rounded-lg" />)
            ) : filtered.length === 0 ? (
              <div className="card-light px-6 py-16 text-center">
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-ember/10 text-ember-deep">
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
              filtered.map((job) => {
                const key = job.slug || job.title;
                const jd = getJdBySlug(jdSources, job);
                const open = expandedJD === key;
                const applied = appliedJobs.has(job.title);
                return (
                  <article key={key} className="card-light overflow-hidden">
                    <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-7">
                      <div className="min-w-0">
                        <h3 className="font-display text-[21px] leading-tight tracking-[-0.01em] md:text-[23px]">{job.title}</h3>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {job.department && <Chip>{job.department}</Chip>}
                          {job.location && <Chip><MapPin size={12} weight="bold" className="text-ember-deep" />{job.location}</Chip>}
                          {job.type && <Chip><Clock size={12} weight="bold" className="text-ember-deep" />{job.type}</Chip>}
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-wrap items-center gap-3">
                        {jd && (
                          <button
                            onClick={() => setExpandedJD(open ? null : key)}
                            aria-expanded={open}
                            aria-controls={`jd-${key}`}
                            className="inline-flex items-center gap-1.5 rounded-btn border border-ink/20 bg-white px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink transition-colors hover:border-ink/50"
                          >
                            {open ? <Minus size={13} weight="bold" /> : <Plus size={13} weight="bold" />}
                            {open ? 'Hide role' : 'View role'}
                          </button>
                        )}
                        {applied ? (
                          <span className="inline-flex items-center gap-2 rounded-btn border border-ember/40 bg-ember/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ember-deep">
                            Applied
                          </span>
                        ) : (
                          <Button onClick={() => handleApplyClick(job)} variant="dark" size="sm">
                            Apply <ArrowUpRight size={14} weight="bold" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {open && jd && (
                        <motion.div
                          id={`jd-${key}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-line bg-paper px-6 py-7 md:px-7">
                            {jd.tagline && (
                              <p className="max-w-3xl text-[15.5px] leading-relaxed text-ink">{jd.tagline}</p>
                            )}

                            <div className="mt-8 grid gap-x-14 gap-y-8 md:grid-cols-2">
                              {jd.responsibilities?.length > 0 && (
                                <JDBlock label={jd.responsibilitiesLabel || "What you'll do"} items={jd.responsibilities} />
                              )}
                              {jd.fit?.length > 0 && (
                                <JDBlock label={jd.fitLabel || "You'd be a great fit if you…"} items={jd.fit} />
                              )}
                            </div>

                            {jd.bring?.length > 0 && (
                              <p className="mt-8 max-w-3xl text-[14.5px] leading-relaxed text-ink-soft">
                                {jd.bringLabel}{' '}
                                <b className="font-medium text-ink">{jd.bring.join(' · ')}</b>
                              </p>
                            )}

                            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6">
                              {!applied && (
                                <Button onClick={() => handleApplyClick(job)} variant="ember" size="sm">
                                  Apply for this role <ArrowUpRight size={14} weight="bold" />
                                </Button>
                              )}
                              {jd.closing && (
                                <p className="max-w-xl text-[13px] leading-relaxed text-ink-faint">{jd.closing}</p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                );
              })
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-line pt-8">
            <Button href="mailto:careers@arinox.ai" variant="ghost">
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

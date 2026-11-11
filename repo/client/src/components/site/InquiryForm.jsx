import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from './Button';
import HumanCheck from './HumanCheck';
import { ContactFields, validateContact, fieldCls, labelCls } from './ContactFields';
import { readAttribution } from '../../lib/attribution';

/* THE enquiry form for the whole site.
 *
 * One component, one place (/contact): the visitor says what the enquiry is
 * about - a question, a document, a partnership, a price - and, for a
 * document, which one. Product pages deep-link into it
 * (/contact?intent=deck&asset=…), so the document is already picked when the
 * visitor lands.
 *
 * It posts to POST /api/v1/inquiries - one endpoint, one Leads row, one team
 * email. The visitor names the intent and the asset; the server owns the
 * wording of the reply (server/src/utils/autoReplies.js) and never attaches a
 * file: a deck is sent by a person from the team.
 */
export function InquiryForm({
  id = 'contact',
  subjects = [],
  assets = [],
  initialIntent = null,
  initialAsset = null,
  label,
  note,
  success,
  cta = 'Send message',
  messageRequired = true,
  source = 'hub',
  form = null, // the copy block (data/inquiries.js) - supplies the message label
  pricingSurvey = null, // { lead, link, to } - a path to the survey when the intent is a price
  /* Embedded mode: the same form, shown on another page with the intent
     locked (no picker), fewer fields and its own wording. Nothing here forks
     the form - fields, checks, endpoint and honeypot stay this component's. */
  lockIntent = null, // e.g. 'pricing' - hides the picker
  compact = false, // drops the phone field, shortens the message
  heading = null,
  sentCopy = null, // { eyebrow, heading, body }
  messageLabelOverride = null,
  messagePlaceholderOverride = null,
  messageSuffix = '', // an extra line appended to the message (e.g. the deployment being viewed)
  foot = null,
  className = 'card-light p-8 md:p-10',
  onSuccess = null,
}) {
  const [values, setValues] = useState({
    name: '', email: '', company: '', phone: '', message: '', website: '',
  });
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const [subjectIndex, setSubjectIndex] = useState(() => {
    if (!initialIntent) return 0;
    const i = subjects.findIndex((s) => s.intent === initialIntent);
    return i >= 0 ? i : 0;
  });
  const [assetKey, setAssetKey] = useState(initialAsset || '');

  const subject = lockIntent ? subjects.find((s) => s.intent === lockIntent) : subjects[subjectIndex];
  const intent = lockIntent || subject?.intent || 'question';
  const asset = assetKey || null;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  /* Mirrors the server: name required, email format, and - where the message
     is the point of the form - a message that is not just whitespace. */
  const validate = () => validateContact(values, { requireMessage: messageRequired });

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
      await axios.post('/api/v1/inquiries', {
        ...values, // `website` flows as-is: '' for humans, bot junk for bots
        message: [values.message.trim(), messageSuffix].filter(Boolean).join('\n'),
        intent,
        asset: asset || undefined,
        subject: subject?.label,
        source,
        turnstileToken: token || undefined,
        ...readAttribution(),
      });
      setSent(true);
      toast.success('Request received.');
      onSuccess?.();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div id={id} role="status" className={`${className} scroll-mt-24`}>
        <p className="eyebrow text-ember-deep">{sentCopy?.eyebrow || 'Received'}</p>
        <h3 className="mt-3 font-display text-2xl tracking-[-0.01em]">{sentCopy?.heading || 'The team has your request.'}</h3>
        <p className="mt-3 max-w-md text-[15.5px] leading-relaxed text-ink-soft">
          {sentCopy?.body || success || 'Request received — we’ll email your copy shortly. It comes from a person, not a mailing robot.'}
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 font-mono text-[12px] uppercase tracking-[0.1em] text-ember-deep hover:opacity-75"
        >
          Send another message
        </button>
      </div>
    );
  }

  /* The message asks a different question when the enquiry is about a price
     or a partnership. */
  const messageCopy = form?.messageByIntent?.[intent] || {};
  const messageLabel = messageLabelOverride || messageCopy.label || form?.messageLabel || 'What should we look at first?';
  const messagePlaceholder = messagePlaceholderOverride || messageCopy.placeholder || form?.messagePlaceholder;

  const fields = [
    { name: 'name', label: 'Full name', type: 'text', autoComplete: 'name', required: true, placeholder: 'Your name', maxLength: 120 },
    { name: 'email', label: 'Work email', type: 'email', autoComplete: 'email', required: true, placeholder: 'you@company.com', maxLength: 255 },
    { name: 'company', label: compact ? 'Company' : 'Organisation', type: 'text', autoComplete: 'organization', placeholder: 'Company or institution', maxLength: 160 },
    ...(compact ? [] : [{ name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', placeholder: 'Optional', maxLength: 40 }]),
  ];

  return (
    /* noValidate: the browser's native bubble would preempt the site's own
       error lines (name / email format / message length). The `required`
       attributes stay for semantics and screen readers. */
    <form id={id} onSubmit={handleSubmit} noValidate className={`${className} scroll-mt-24`}>
      <p className={`eyebrow ${heading ? 'text-ember-deep' : 'text-ink-faint'}`}>{label}</p>
      {heading ? <h3 className="mt-3 font-display text-[24px] leading-tight tracking-[-0.01em] md:text-[28px]">{heading}</h3> : null}
      {note ? <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">{note}</p> : null}

      <div className="mt-7">
        <ContactFields fields={fields} values={values} onChange={handleChange} errors={errors} />
      </div>

      {lockIntent ? null : (
      <label className="mt-6 block">
        <span className={labelCls}>What is this about?</span>
        <select
          value={subjectIndex}
          onChange={(e) => { setSubjectIndex(Number(e.target.value)); setAssetKey(''); }}
          className={`${fieldCls} cursor-pointer`}
        >
          {subjects.map((s, i) => <option key={s.label} value={i}>{s.label}</option>)}
        </select>
      </label>
      )}

      {intent === 'pricing' && pricingSurvey && !lockIntent ? (
        <p className="mt-3 text-[13.5px] text-ink-soft">
          {pricingSurvey.lead}{' '}
          <Link to={pricingSurvey.to} className="font-medium text-ember-deep underline underline-offset-2 hover:text-ink">
            {pricingSurvey.link}
          </Link>
        </p>
      ) : null}

      {intent === 'deck' && assets.length ? (
        <label className="mt-6 block">
          <span className={labelCls}>Which one?</span>
          <select value={assetKey} onChange={(e) => setAssetKey(e.target.value)} className={`${fieldCls} cursor-pointer`}>
            <option value="">Not sure — send me the closest</option>
            {assets.map((a) => <option key={a.key} value={a.key}>{a.label}</option>)}
          </select>
        </label>
      ) : null}

      <label className="mt-6 block">
        <span className={labelCls}>{messageLabel}</span>
        <textarea
          name="message" value={values.message} onChange={handleChange} rows={compact ? 2 : 3} maxLength={4000}
          required={messageRequired}
          placeholder={messagePlaceholder}
          aria-invalid={errors.message ? 'true' : undefined}
          className={`${fieldCls} resize-y`}
        />
        {errors.message ? (
          <span role="alert" className="mt-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-ember-deep">
            {errors.message}
          </span>
        ) : null}
      </label>

      {/* Honeypot: bots spray every visible/hidden field; humans never see this one. */}
      <input
        type="text"
        name="website"
        value={values.website}
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
      {foot ? <p className="mt-4 text-[12.5px] leading-relaxed text-ink-faint">{foot}</p> : null}
      <p className="mt-4 text-[12.5px] leading-relaxed text-ink-faint">
        By sending this you consent to our{' '}
        <Link to="/privacy" className="text-ember-deep underline underline-offset-2 hover:text-ink">Privacy Policy</Link>.
        We use your details only to reply to you.
      </p>
    </form>
  );
}

const nodemailer = require('nodemailer');

const isConfigured = () => !!(process.env.EMAIL_USER && process.env.EMAIL_PASS);

const getTransporter = () => {
  const port = Number(process.env.EMAIL_PORT) || 587;
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port,
    // Implicit TLS on a 465 relay, STARTTLS on 587.
    secure: port === 465,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    // Verify the server certificate chain by default. SMTP_ALLOW_SELF_SIGNED
    // =true opts out only for relays with self-signed certs.
    tls: { rejectUnauthorized: process.env.SMTP_ALLOW_SELF_SIGNED !== 'true' },
  });
};

const sendMail = async (options) => {
  if (!isConfigured()) {
    console.warn('[mailer] EMAIL_USER / EMAIL_PASS not set - skipping email');
    return;
  }
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"Arinox AI" <${process.env.EMAIL_USER}>`,
    ...options,
  });
};

/* solutions@arinox.ai is copied on EVERY mail chain — team notifications and
   the emails sent to visitors/applicants — so the whole thread lands in the
   shared inbox. Hard-wired on purpose: TEAM_CC can't drop it. */
const ALWAYS_CC = 'solutions@arinox.ai';

const ccList = (extra, exclude = []) => {
  const skip = new Set(
    (Array.isArray(exclude) ? exclude : String(exclude).split(','))
      .map((s) => s.trim().toLowerCase()).filter(Boolean),
  );
  const out = [];
  for (const s of [...extra, ALWAYS_CC].map((x) => x.trim()).filter(Boolean)) {
    const k = s.toLowerCase();
    if (!skip.has(k) && !out.some((o) => o.toLowerCase() === k)) out.push(s);
  }
  return out;
};

/* CC list for every email that goes to the team (inquiries, careers,
   bookings). TEAM_CC env overrides the default extra names (comma list; set
   empty to drop them) — ALWAYS_CC stays either way. */
const teamCc = (exclude = []) =>
  ccList((process.env.TEAM_CC === undefined ? 'ajay@arinox.ai' : process.env.TEAM_CC).split(','), exclude);

/* CC for emails that go to a visitor/applicant: the shared inbox only, so
   replies reach the team. */
const customerCc = (exclude = []) => ccList([], exclude);

const verifyMailer = () => {
  if (!isConfigured()) return;
  getTransporter().verify((err) => {
    if (err) console.error('[mailer] SMTP connection failed:', err.responseCode ?? '', err.message);
    else console.log('[mailer] SMTP ready - emails will deliver to', process.env.EMAIL_TO || 'assist@arinox.ai');
  });
};

/* ═══════════════════════════════════════════════════════════
   Email theme, mirrors the site design system
   paper #f2f2f0 · card #fff · line #e2e1dd · void #0b0b0d
   ink #17171a · soft #5b5b60 · faint #8a8a93
   ember #ff6301 · ember-deep #ea5a00 · tint #ffe8d9
   Georgia (display) · Arial (body) · Courier New (labels)
   ═══════════════════════════════════════════════════════════ */

const FONT_DISPLAY = "Georgia, 'Times New Roman', serif";
const FONT_BODY = "Arial, Helvetica, sans-serif";
const FONT_MONO = "'Courier New', Courier, monospace";

const baseStyle = `
  font-family: ${FONT_BODY};
  background: #f2f2f0;
  margin: 0; padding: 0;
`;
const cardStyle = `
  max-width: 560px; margin: 32px auto; background: #ffffff;
  border: 1px solid #e2e1dd; border-radius: 12px; overflow: hidden;
`;
const accentBar = `<div style="height:3px;background:linear-gradient(90deg,#ff6301,#ea5a00);"></div>`;
const headerStyle = `
  background: #0b0b0d; padding: 30px 32px 26px; text-align: center;
`;
const headerTitleStyle = `
  color: #f4ede8; margin: 0; font-family: ${FONT_DISPLAY};
  font-size: 21px; font-weight: 400; letter-spacing: -0.01em;
`;
const headerSubStyle = `color: #a39d99; margin: 8px 0 0; font-size: 13px; line-height: 1.5;`;
const bodyStyle = `padding: 32px; font-family: ${FONT_BODY};`;
const footerStyle = `
  background: #f2f2f0; border-top: 1px solid #e2e1dd;
  padding: 20px 32px; text-align: center;
  font-family: ${FONT_MONO}; font-size: 11px; color: #8a8a93; line-height: 1.7;
`;
const rowStyle = `
  padding: 11px 0; border-bottom: 1px solid #e2e1dd;
  font-size: 14px; color: #17171a; line-height: 1.5;
`;
const labelStyle = `
  font-family: ${FONT_MONO}; text-transform: uppercase; letter-spacing: 1px;
  font-size: 11px; color: #8a8a93; min-width: 118px; display: inline-block;
`;
const noteBoxStyle = `
  background: #ffe8d9; border: 1px solid rgba(255,99,1,0.22); border-radius: 8px;
  padding: 16px 20px; color: #17171a; font-size: 13px; line-height: 1.7;
`;
const quoteBoxStyle = `
  margin-top: 8px; font-size: 14px; color: #5b5b60; line-height: 1.7;
  background: #f8f7f5; border: 1px solid #e2e1dd; padding: 14px; border-radius: 8px;
`;
const linkStyle = `color:#ea5a00;text-decoration:none;font-weight:bold;`;
/* Every value that came from a form is untrusted: escape it before it enters
   an email body, so a visitor can't inject markup or links into mail sent
   from the Arinox mailbox. */
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const para = (s) => esc(s).replace(/\n/g, '<br>');
// Only http(s) URLs become links; anything else (javascript:, data:) renders as text.
const safeHref = (u) => (/^https?:\/\//i.test(String(u || '').trim()) ? esc(String(u).trim()) : null);

const logoUrl = (name = 'logo-white.png') =>
  `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://www.arinox.ai'}/images/brand/${name}`;

const header = (title, sub) => `
    ${accentBar}
    <div style="${headerStyle}">
      <img src="${logoUrl()}" alt="Arinox" style="height:26px;margin-bottom:14px;" onerror="this.style.display='none'"/>
      <h2 style="${headerTitleStyle}">${esc(title)}</h2>
      ${sub ? `<p style="${headerSubStyle}">${esc(sub)}</p>` : ''}
    </div>`;

const emailWrapper = (content) => `
<html><body style="${baseStyle}">
  <div style="${cardStyle}">
    ${content}
    <div style="${footerStyle}">
      Arinox AI · Headquartered in Bengaluru, India<br>
      <a href="https://www.arinox.ai" style="${linkStyle}">www.arinox.ai</a>
      &nbsp;·&nbsp;
      <a href="mailto:assist@arinox.ai" style="${linkStyle}">assist@arinox.ai</a>
    </div>
  </div>
</body></html>`;

/* ── Contact notification to Arinox team ── */
const contactNotification = ({ name, email, company, phone, subject, message }) =>
  emailWrapper(`
    ${header('New contact form submission', 'Via the Arinox website')}
    <div style="${bodyStyle}">
      <p style="color:#5b5b60;font-size:14px;margin:0 0 18px;">You have a new message from the contact form.</p>
      <div style="${rowStyle}"><span style="${labelStyle}">Name</span> ${esc(name)}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Email</span> <a href="mailto:${esc(email)}" style="${linkStyle}">${esc(email)}</a></div>
      <div style="${rowStyle}"><span style="${labelStyle}">Company</span> ${company ? esc(company) : 'N/A'}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Phone</span> ${phone ? esc(phone) : 'N/A'}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Subject</span> ${subject ? esc(subject) : 'General Inquiry'}</div>
      <div style="padding-top:16px;">
        <span style="${labelStyle}">Message</span>
        <p style="${quoteBoxStyle}">${para(message)}</p>
      </div>
    </div>`);

/* ── Contact auto-reply to user ──
   `body`, `steps` and `asset` override the default copy. Asset flows (deck
   requests) stay minimal: greeting + one short line — the file is sent by a
   person from the team shortly, never attached automatically. Everything
   else keeps the steps box and reply line. */
const contactAutoReply = ({ name, subject, body, steps, asset }) => {
  const minimal = Boolean(asset?.name);
  const list = Array.isArray(steps) && steps.length
    ? steps
    : ['Our team reads your message', 'We reply soon', 'If it helps, we book a 30-minute call with you'];

  /* Numbered steps as a table: ember number discs line up in every client
     (Gmail/Outlook ignore flexbox). */
  const stepsTable = `
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin-top:14px;">
        ${list.map((s, i) => `
        <tr>
          <td width="40" valign="top" style="padding:0 0 14px;">
            <div style="width:28px;height:28px;border-radius:14px;background:#ff6301;color:#ffffff;font-family:${FONT_BODY};font-size:13px;font-weight:bold;line-height:28px;text-align:center;">${i + 1}</div>
          </td>
          <td valign="top" style="padding:4px 0 14px;font-family:${FONT_BODY};font-size:15px;line-height:1.55;color:#17171a;">${esc(s)}</td>
        </tr>`).join('')}
      </table>`;

  const button = (href, label) => `
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0 4px;">
        <tr><td style="background:#ff6301;border-radius:999px;">
          <a href="${href}" style="display:inline-block;padding:13px 26px;font-family:${FONT_BODY};font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;">${label}</a>
        </td></tr>
      </table>`;

  return emailWrapper(`
    ${header('Thank you, we have it', subject || 'Arinox AI')}
    <div style="${bodyStyle}">
      <p style="font-family:${FONT_DISPLAY};font-size:22px;color:#17171a;margin:0 0 12px;">Hi ${esc(name)},</p>
      <p style="font-size:15.5px;color:#3a3a3f;line-height:1.7;margin:0;">
        ${body ? esc(body) : `Thank you for reaching out to <strong style="color:#17171a;">Arinox AI</strong>. We've received your
        message regarding <em>"${esc(subject || 'your inquiry')}"</em> and we will get back to you
        <strong style="color:#17171a;">soon</strong>.`}
      </p>
      ${minimal ? '' : `
      <div style="margin-top:26px;padding:22px 22px 8px;background:#f8f7f5;border:1px solid #e2e1dd;border-radius:10px;">
        <span style="font-family:${FONT_MONO};text-transform:uppercase;letter-spacing:1.4px;font-size:11px;color:#b84300;">What happens next</span>
        ${stepsTable}
      </div>
      ${button('https://www.arinox.ai/contact', 'Book a 30-minute call')}`}
      <p style="font-size:15px;color:#17171a;line-height:1.6;margin:26px 0 0;">Warm regards,<br><span style="font-family:${FONT_DISPLAY};font-size:17px;">The Arinox team</span></p>
      <p style="font-size:12.5px;color:#8a8a93;line-height:1.6;margin:18px 0 0;">Just reply to this email, it reaches a person on our team.</p>
    </div>`);
};

/* ── Lead notification to Arinox team (website forms) ──
   Compact on purpose: the full record (ICP, AI profile, campaign fields)
   lives in the Leads table; the email exists to act on the lead, not to
   re-type it. Rows render only when a value exists — no N/A noise.
   Deck requests render a loud intent row; the deck is never attached. */
const leadNotification = ({ name, email, phone, company, role, message, landingPage }, opts = {}) => {
  const row = (label, value) =>
    value ? `<div style="${rowStyle}"><span style="${labelStyle}">${label}</span> ${value}</div>` : '';
  return emailWrapper(`
    ${header('New lead', 'Via website form')}
    <div style="${bodyStyle}">
      ${row('Name', esc(name))}
      ${row('Email', email ? `<a href="mailto:${esc(email)}" style="${linkStyle}">${esc(email)}</a>` : '')}
      ${row('Company', esc(company))}
      ${row('Role', esc(role))}
      ${row('Phone', esc(phone))}
      ${opts.deckRequest ? `<div style="${rowStyle}"><span style="${labelStyle}">Deck requested</span> <strong style="color:#b84300;">Yes — they asked for the ${opts.deckName ? esc(opts.deckName) : 'suite deck'}. Send it to them by email.</strong></div>` : ''}
      ${message ? `<div style="padding-top:14px;"><span style="${labelStyle}">Message</span><p style="${quoteBoxStyle}">${para(message)}</p></div>` : ''}
      ${landingPage ? `<div style="padding-top:10px;">${row('Landing page', `<span style="word-break:break-all;font-size:12px;">${esc(landingPage)}</span>`)}</div>` : ''}
    </div>`);
};

/* ── Application notification to Arinox team ── */
const applicationNotification = ({ fullName, email, phone, role, department, linkedIn, coverNote, resumeName }) =>
  emailWrapper(`
    ${header('New job application', role)}
    <div style="${bodyStyle}">
      <p style="color:#5b5b60;font-size:14px;margin:0 0 18px;">A new application was submitted via the Careers page.</p>
      <div style="${rowStyle}"><span style="${labelStyle}">Name</span> ${esc(fullName)}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Email</span> <a href="mailto:${esc(email)}" style="${linkStyle}">${esc(email)}</a></div>
      <div style="${rowStyle}"><span style="${labelStyle}">Phone</span> ${phone ? esc(phone) : 'N/A'}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Role</span> ${esc(role)}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Department</span> ${department ? esc(department) : 'N/A'}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Resume</span> ${resumeName ? esc(resumeName) : 'Not provided'}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">LinkedIn</span> ${!linkedIn ? 'N/A' : safeHref(linkedIn) ? `<a href="${safeHref(linkedIn)}" style="${linkStyle}">${esc(linkedIn)}</a>` : esc(linkedIn)}</div>
      ${coverNote ? `<div style="padding-top:16px;"><span style="${labelStyle}">Cover note</span><p style="${quoteBoxStyle}">${para(coverNote)}</p></div>` : ''}
    </div>`);

/* ── Application auto-reply to applicant ── */
const applicationAutoReply = ({ fullName, role }) =>
  emailWrapper(`
    ${header('Application received', role)}
    <div style="${bodyStyle}">
      <p style="font-family:${FONT_DISPLAY};font-size:18px;color:#17171a;margin:0 0 10px;">Hi ${esc(fullName)},</p>
      <p style="font-size:14px;color:#5b5b60;line-height:1.7;margin:0 0 16px;">
        Thank you for applying for the <strong style="color:#17171a;">${esc(role)}</strong> position at
        <strong style="color:#17171a;">Arinox AI</strong>. We've received your application and our
        hiring team will review it carefully.
      </p>
      <p style="font-size:14px;color:#5b5b60;line-height:1.7;margin:0 0 24px;">
        We'll be in touch within <strong style="color:#17171a;">5 business days</strong> if your profile
        matches what we're looking for. In the meantime, learn more about us at
        <a href="https://www.arinox.ai" style="${linkStyle}">www.arinox.ai</a>.
      </p>
      <div style="${noteBoxStyle}">
        <span style="font-family:${FONT_DISPLAY};font-size:15px;color:#17171a;">Arinox AI</span><br>
        <span style="display:inline-block;margin-top:6px;">Building intelligent systems that transform how enterprises operate. We look forward to potentially working together.</span>
      </div>
    </div>`);

/* ── Discovery-session booking emails ──
   `when` is the pre-formatted host-timezone string; `visitorWhen` (optional)
   the same moment in the visitor's own timezone. Every value is escaped. */
const bookingRows = ({ when, visitorWhen, topic, meetLink }) => `
      <div style="${rowStyle}"><span style="${labelStyle}">When</span> <b>${esc(when)}</b></div>
      ${visitorWhen ? `<div style="${rowStyle}"><span style="${labelStyle}">Your time</span> ${esc(visitorWhen)}</div>` : ''}
      <div style="${rowStyle}"><span style="${labelStyle}">Length</span> 30 minutes</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Topic</span> ${esc(topic || 'General')}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Where</span> ${safeHref(meetLink) ? `<a href="${safeHref(meetLink)}" style="${linkStyle}">Join the video call</a>` : 'Video call — our team will share the joining link'}</div>`;

const bookingConfirmation = ({ name, when, visitorWhen, topic, meetLink }) =>
  emailWrapper(`
    ${header('Your discovery session is booked', 'Arinox AI')}
    <div style="${bodyStyle}">
      <p style="font-family:${FONT_DISPLAY};font-size:18px;color:#17171a;margin:0 0 12px;">Hi ${esc(name)},</p>
      <p style="font-size:15px;color:#5b5b60;line-height:1.7;margin:0 0 18px;">You're booked. You'll get a calendar invite as well — accept it and it lands in your calendar.</p>
      ${bookingRows({ when, visitorWhen, topic, meetLink })}
      <div style="${noteBoxStyle};margin-top:22px;">
        Need to move it? Just reply to this email — a person will sort it out with you. If our schedule ever has to change, we'll tell you straight away.
      </div>
    </div>`);

const bookingNotification = ({ name, email, company, phone, topic, notes, guests, when, meetLink }) =>
  emailWrapper(`
    ${header('New discovery session booked', 'Via the Arinox website')}
    <div style="${bodyStyle}">
      ${bookingRows({ when, topic, meetLink })}
      <div style="${rowStyle}"><span style="${labelStyle}">Name</span> ${esc(name)}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Email</span> <a href="mailto:${esc(email)}" style="${linkStyle}">${esc(email)}</a></div>
      <div style="${rowStyle}"><span style="${labelStyle}">Company</span> ${company ? esc(company) : 'N/A'}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Phone</span> ${phone ? esc(phone) : 'N/A'}</div>
      ${guests?.length ? `<div style="${rowStyle}"><span style="${labelStyle}">Guests</span> ${esc(guests.join(', '))}</div>` : ''}
      ${notes ? `<div style="padding-top:16px;"><span style="${labelStyle}">Look at first</span><p style="${quoteBoxStyle}">${para(notes)}</p></div>` : ''}
      <p style="font-size:12.5px;color:#8a8a93;margin-top:18px;">Add required colleagues to the calendar event. To free the slot, cancel the event and set the booking's status to "cancelled".</p>
    </div>`);

/* ── Inquiry notification to Arinox team ──
   One shape for every inquiry (question, deck request, partnership, Price
   Discovery): the intent is the first thing the reader sees, the asset row
   is loud when a document was asked for, and the source page tells the team
   which surface the inquiry came from. Rows render only when they carry a
   value - no N/A noise. */
/* Built for scanning, not for looks: a plain two-column table per block
   (Who / Their answers / Tracking). Structured messages ("Label: value" lines,
   as the ten-question intake sends) become table rows; a free-text message
   stays a paragraph. Rows render only when they carry a value. */
const splitAnswers = (message) => {
  const rows = [];
  const text = [];
  let title = null;
  String(message || '').split('\n').map((l) => l.trim()).filter(Boolean).forEach((line, i) => {
    const m = line.match(/^([^:]{1,40}):\s*(.*)$/);
    if (m && !/^https?$/i.test(m[1])) rows.push([m[1], m[2]]);
    else if (i === 0 && !title) title = line;
    else text.push(line);
  });
  return { title, rows, text };
};

const inquiryNotification = (lead) => {
  const tdL = `padding:9px 14px 9px 0;border-bottom:1px solid #ecebe8;font-family:${FONT_BODY};font-size:13px;color:#5b5b60;width:150px;vertical-align:top;`;
  const tdV = `padding:9px 0;border-bottom:1px solid #ecebe8;font-family:${FONT_BODY};font-size:14.5px;color:#17171a;vertical-align:top;line-height:1.5;`;
  const tr = (label, value) => (value ? `<tr><td style="${tdL}">${esc(label)}</td><td style="${tdV}">${value}</td></tr>` : '');
  const table = (rows) => `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">${rows}</table>`;
  const block = (title, inner) => (inner ? `
      <p style="margin:26px 0 6px;font-family:${FONT_BODY};font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#b84300;">${esc(title)}</p>${inner}` : '');
  /* Multi-select answers arrive joined with " | " - one per line reads better. */
  const val = (v) => (String(v).includes(' | ') ? String(v).split(' | ').map((x) => `&bull; ${esc(x)}`).join('<br>') : esc(v));

  const { title, rows, text } = splitAnswers(lead.message);
  const answerRows = rows.filter(([, v]) => v && v !== 'n/a').map(([k, v]) => tr(k, val(v))).join('');
  const contactRows = [
    tr('Name', `<strong>${esc(lead.name)}</strong>`),
    tr('Email', lead.email ? `<a href="mailto:${esc(lead.email)}" style="${linkStyle}">${esc(lead.email)}</a>` : ''),
    tr('Company', esc(lead.company)),
    tr('Phone', esc(lead.phone)),
    lead.subject ? tr('Subject', esc(lead.subject)) : '',
  ].join('');
  const tracking = [
    tr('Came in via', esc(lead.sourceLabel)),
    tr('Source page', lead.landingPage ? `<span style="word-break:break-all;font-size:12.5px;">${esc(lead.landingPage)}</span>` : ''),
    tr('Campaign', lead.utmSource || lead.referrer ? `${esc(lead.utmSource || '')}${lead.utmCampaign ? ' / ' + esc(lead.utmCampaign) : ''}${lead.referrer ? ' &middot; ' + esc(lead.referrer) : ''}` : ''),
  ].join('');

  return `
<html><body style="margin:0;padding:0;background:#ffffff;">
  <div style="max-width:640px;margin:0 auto;padding:24px 20px;font-family:${FONT_BODY};color:#17171a;">
    <p style="margin:0;font-size:12px;color:#8a8a93;">New website inquiry</p>
    <h2 style="margin:4px 0 0;font-family:${FONT_BODY};font-size:22px;font-weight:bold;color:#17171a;">
      ${esc(lead.intentLabel || 'General inquiry')} <span style="font-weight:normal;color:#5b5b60;">from ${esc(lead.name)}${lead.company ? `, ${esc(lead.company)}` : ''}</span>
    </h2>
    ${lead.assetLabel ? `<p style="margin:14px 0 0;padding:12px 14px;background:#ffe8d9;border-radius:6px;font-size:14px;"><strong>Requested</strong>: ${esc(lead.assetLabel)} &mdash; send it to them by email.</p>` : ''}
    ${block('Who', table(contactRows))}
    ${answerRows ? block(title || 'Their answers', table(answerRows)) : ''}
    ${text.length ? block(answerRows ? 'Notes' : 'Message', `<p style="margin:6px 0 0;font-size:14.5px;line-height:1.65;color:#17171a;">${text.map(esc).join('<br>')}</p>`) : ''}
    ${!answerRows && !text.length && title ? block('Message', `<p style="margin:6px 0 0;font-size:14.5px;line-height:1.65;">${esc(title)}</p>`) : ''}
    ${tracking ? block('Tracking', table(tracking)) : ''}
    <p style="margin:28px 0 0;font-size:12px;color:#8a8a93;">Hit reply to answer them directly.</p>
  </div>
</body></html>`;
};

module.exports = {
  bookingConfirmation,
  bookingNotification,
  sendMail,
  teamCc,
  customerCc,
  verifyMailer,
  contactNotification,
  contactAutoReply,
  inquiryNotification,
  leadNotification,
  applicationNotification,
  applicationAutoReply,
};

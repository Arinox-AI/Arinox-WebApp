const nodemailer = require('nodemailer');

const isConfigured = () => !!(process.env.EMAIL_USER && process.env.EMAIL_PASS);

const getTransporter = () =>
  nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    tls: { rejectUnauthorized: false },
  });

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
const eyebrowStyle = `
  font-family: ${FONT_MONO}; text-transform: uppercase; letter-spacing: 1.4px;
  font-size: 11px; color: #ea5a00; margin: 22px 0 8px;
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
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const logoUrl = (name = 'logo-white.png') =>
  `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://www.arinox.ai'}/images/brand/${name}`;

const header = (title, sub) => `
    ${accentBar}
    <div style="${headerStyle}">
      <img src="${logoUrl()}" alt="Arinox" style="height:26px;margin-bottom:14px;" onerror="this.style.display='none'"/>
      <h2 style="${headerTitleStyle}">${title}</h2>
      ${sub ? `<p style="${headerSubStyle}">${sub}</p>` : ''}
    </div>`;

const emailWrapper = (content) => `
<html><body style="${baseStyle}">
  <div style="${cardStyle}">
    ${content}
    <div style="${footerStyle}">
      Arinox AI · New Delhi &amp; Bengaluru, India<br>
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
      <div style="${rowStyle}"><span style="${labelStyle}">Name</span> ${name}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Email</span> <a href="mailto:${email}" style="${linkStyle}">${email}</a></div>
      <div style="${rowStyle}"><span style="${labelStyle}">Company</span> ${company || 'N/A'}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Phone</span> ${phone || 'N/A'}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Subject</span> ${subject || 'General Inquiry'}</div>
      <div style="padding-top:16px;">
        <span style="${labelStyle}">Message</span>
        <p style="${quoteBoxStyle}">${message.replace(/\n/g, '<br>')}</p>
      </div>
    </div>`);

/* ── Contact auto-reply to user ──
   `body`, `steps` and `asset` override the default copy. `asset` names a
   document the controller attaches to the email (no download link). */
const contactAutoReply = ({ name, subject, body, steps, asset }) => {
  return emailWrapper(`
    ${header("We've received your message", subject || 'Arinox AI')}
    <div style="${bodyStyle}">
      <p style="font-family:${FONT_DISPLAY};font-size:18px;color:#17171a;margin:0 0 10px;">Hi ${name},</p>
      <p style="font-size:14px;color:#5b5b60;line-height:1.7;margin:0 0 16px;">
        ${body || `Thank you for reaching out to <strong style="color:#17171a;">Arinox AI</strong>. We've received your
        message regarding <em>"${subject || 'your inquiry'}"</em> and we will get back to you
        <strong style="color:#17171a;">soon</strong>.`}
      </p>
      ${asset?.name ? `
      <div style="${noteBoxStyle};margin:0 0 22px;">
        <span style="font-family:${FONT_MONO};text-transform:uppercase;letter-spacing:1.2px;font-size:11px;color:#b84300;">Your copy is attached</span>
        <p style="font-size:13.5px;color:#17171a;line-height:1.6;margin:8px 0 0;">${esc(asset.name)} — attached to this email. It opens in PowerPoint.</p>
      </div>` : ''}
      <p style="font-size:14px;color:#5b5b60;line-height:1.7;margin:0 0 24px;">
        ${Array.isArray(steps) && steps.length
          ? 'You can also reply directly to this email.'
          : `In the meantime, explore the platform at
        <a href="https://www.arinox.ai" style="${linkStyle}">www.arinox.ai</a>,
        or reply directly to this email.`}
      </p>
      <div style="${noteBoxStyle}">
        <span style="font-family:${FONT_MONO};text-transform:uppercase;letter-spacing:1.2px;font-size:11px;color:#b84300;">What happens next</span><br>
        <span style="display:inline-block;margin-top:8px;">${Array.isArray(steps) && steps.length
          ? steps.map((s, i) => `${i + 1}. ${s}`).join('<br>')
          : `1. Our team reviews your message<br>
        2. We schedule a free discovery call<br>
        3. You get a tailored plan`}</span>
      </div>
    </div>`);
};

/* ── Lead notification to Arinox team (website forms) ──
   Compact on purpose: the full record (ICP, AI profile, campaign fields)
   lives in the Leads table; the email exists to act on the lead, not to
   re-type it. Rows render only when a value exists — no N/A noise. */
const leadNotification = ({ name, email, phone, company, role, message, landingPage }) => {
  const row = (label, value) =>
    value ? `<div style="${rowStyle}"><span style="${labelStyle}">${label}</span> ${value}</div>` : '';
  return emailWrapper(`
    ${header('New lead', 'Via website form')}
    <div style="${bodyStyle}">
      ${row('Name', name)}
      ${row('Email', email ? `<a href="mailto:${email}" style="${linkStyle}">${email}</a>` : '')}
      ${row('Company', company)}
      ${row('Role', role)}
      ${row('Phone', phone)}
      ${message ? `<div style="padding-top:14px;"><span style="${labelStyle}">Message</span><p style="${quoteBoxStyle}">${String(message).replace(/\n/g, '<br>')}</p></div>` : ''}
      ${landingPage ? `<div style="padding-top:10px;">${row('Landing page', `<span style="word-break:break-all;font-size:12px;">${esc(landingPage)}</span>`)}</div>` : ''}
    </div>`);
};

/* ── Application notification to Arinox team ── */
const applicationNotification = ({ fullName, email, phone, role, department, linkedIn, coverNote, resumeName }) =>
  emailWrapper(`
    ${header('New job application', role)}
    <div style="${bodyStyle}">
      <p style="color:#5b5b60;font-size:14px;margin:0 0 18px;">A new application was submitted via the Careers page.</p>
      <div style="${rowStyle}"><span style="${labelStyle}">Name</span> ${fullName}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Email</span> <a href="mailto:${email}" style="${linkStyle}">${email}</a></div>
      <div style="${rowStyle}"><span style="${labelStyle}">Phone</span> ${phone || 'N/A'}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Role</span> ${role}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Department</span> ${department || 'N/A'}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Resume</span> ${resumeName || 'Not provided'}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">LinkedIn</span> ${linkedIn ? `<a href="${linkedIn}" style="${linkStyle}">${linkedIn}</a>` : 'N/A'}</div>
      ${coverNote ? `<div style="padding-top:16px;"><span style="${labelStyle}">Cover note</span><p style="${quoteBoxStyle}">${coverNote.replace(/\n/g, '<br>')}</p></div>` : ''}
    </div>`);

/* ── Application auto-reply to applicant ── */
const applicationAutoReply = ({ fullName, role }) =>
  emailWrapper(`
    ${header('Application received', role)}
    <div style="${bodyStyle}">
      <p style="font-family:${FONT_DISPLAY};font-size:18px;color:#17171a;margin:0 0 10px;">Hi ${fullName},</p>
      <p style="font-size:14px;color:#5b5b60;line-height:1.7;margin:0 0 16px;">
        Thank you for applying for the <strong style="color:#17171a;">${role}</strong> position at
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

module.exports = {
  sendMail,
  verifyMailer,
  contactNotification,
  contactAutoReply,
  leadNotification,
  applicationNotification,
  applicationAutoReply,
};

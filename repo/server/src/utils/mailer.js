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
    console.warn('[mailer] EMAIL_USER / EMAIL_PASS not set — skipping email');
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
    else console.log('[mailer] SMTP ready — emails will deliver to', process.env.EMAIL_TO || 'assist@arinox.ai');
  });
};

const baseStyle = `
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background: #f9f6f2;
  margin: 0; padding: 0;
`;
const cardStyle = `
  max-width: 560px; margin: 32px auto; background: #fff;
  border-radius: 12px; overflow: hidden;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
`;
const headerStyle = `
  background: linear-gradient(135deg, #FE6300 0%, #ff7a1a 100%);
  padding: 32px 32px 24px; text-align: center;
`;
const bodyStyle = `padding: 32px;`;
const footerStyle = `
  background: #f3ede6; padding: 20px 32px; text-align: center;
  font-size: 12px; color: #888;
`;
const rowStyle = `
  padding: 10px 0; border-bottom: 1px solid #f0ebe4;
  font-size: 14px; color: #333; line-height: 1.5;
`;
const labelStyle = `font-weight: 600; color: #FE6300; min-width: 110px; display: inline-block;`;

const logoUrl = () => `${process.env.SITE_URL || 'https://www.arinox.ai'}/logo.png`;

const emailWrapper = (content) => `
<html><body style="${baseStyle}">
  <div style="${cardStyle}">
    ${content}
    <div style="${footerStyle}">
      Arinox AI · New Delhi &amp; Bangalore, India<br>
      <a href="https://www.arinox.ai" style="color:#FE6300;text-decoration:none;">www.arinox.ai</a>
      &nbsp;·&nbsp;
      <a href="mailto:assist@arinox.ai" style="color:#FE6300;text-decoration:none;">assist@arinox.ai</a>
    </div>
  </div>
</body></html>`;

/* ── Contact notification to Arinox team ── */
const contactNotification = ({ name, email, company, phone, subject, message }) =>
  emailWrapper(`
    <div style="${headerStyle}">
      <img src="${logoUrl()}" alt="Arinox AI" style="height:32px;margin-bottom:12px;" onerror="this.style.display='none'"/>
      <h2 style="color:#fff;margin:0;font-size:20px;">New Contact Form Submission</h2>
    </div>
    <div style="${bodyStyle}">
      <p style="color:#555;font-size:14px;margin-bottom:20px;">You have a new message from the Arinox website contact form.</p>
      <div style="${rowStyle}"><span style="${labelStyle}">Name:</span> ${name}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Email:</span> <a href="mailto:${email}" style="color:#FE6300;">${email}</a></div>
      <div style="${rowStyle}"><span style="${labelStyle}">Company:</span> ${company || '—'}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Phone:</span> ${phone || '—'}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Subject:</span> ${subject || 'General Inquiry'}</div>
      <div style="padding-top:16px;">
        <span style="${labelStyle}">Message:</span>
        <p style="margin-top:8px;font-size:14px;color:#444;line-height:1.7;background:#faf7f4;padding:14px;border-radius:8px;">${message.replace(/\n/g, '<br>')}</p>
      </div>
    </div>`);

/* ── Contact auto-reply to user ── */
const contactAutoReply = ({ name, subject }) =>
  emailWrapper(`
    <div style="${headerStyle}">
      <img src="${logoUrl()}" alt="Arinox AI" style="height:32px;margin-bottom:12px;" onerror="this.style.display='none'"/>
      <h2 style="color:#fff;margin:0;font-size:20px;">We've Received Your Message</h2>
    </div>
    <div style="${bodyStyle}">
      <p style="font-size:16px;font-weight:600;color:#1c160e;margin-bottom:8px;">Hi ${name},</p>
      <p style="font-size:14px;color:#555;line-height:1.7;margin-bottom:16px;">
        Thank you for reaching out to <strong>Arinox AI</strong>. We've received your message
        regarding <em>"${subject || 'your inquiry'}"</em> and our team will get back to you
        within <strong>24 hours</strong>.
      </p>
      <p style="font-size:14px;color:#555;line-height:1.7;margin-bottom:24px;">
        In the meantime, feel free to explore our solutions at
        <a href="https://www.arinox.ai" style="color:#FE6300;">www.arinox.ai</a>
        or reply directly to this email if you have anything to add.
      </p>
      <div style="background:linear-gradient(135deg,#FE6300,#ff7a1a);border-radius:8px;padding:16px 20px;color:#fff;font-size:13px;line-height:1.6;">
        <strong>What happens next?</strong><br>
        1. Our team reviews your message within 2 hours<br>
        2. We schedule a free 15-min discovery call<br>
        3. You get a tailored proposal within 5 days
      </div>
    </div>`);

/* ── Lead notification to Arinox team (Google Ads landing page) ── */
const leadNotification = (lead) => {
  const {
    name, email, phone, company, role, companySize, companyType, domain,
    usesAi, aiTools, useCases, timeline, message,
    utmSource, utmMedium, utmCampaign, utmTerm, utmContent, gclid, gadSource, referrer, landingPage,
  } = lead;
  const row = (label, value) =>
    `<div style="${rowStyle}"><span style="${labelStyle}">${label}:</span> ${value || '—'}</div>`;
  const hasCampaign = utmSource || utmMedium || utmCampaign || gclid || gadSource;
  return emailWrapper(`
    <div style="${headerStyle}">
      <img src="${logoUrl()}" alt="Arinox AI" style="height:32px;margin-bottom:12px;" onerror="this.style.display='none'"/>
      <h2 style="color:#fff;margin:0;font-size:20px;">New Lead — Google Ads</h2>
      <p style="color:rgba(255,255,255,0.9);margin:6px 0 0;font-size:13px;">Submitted via /get-started</p>
    </div>
    <div style="${bodyStyle}">
      <p style="color:#FE6300;font-weight:600;font-size:12px;letter-spacing:1px;text-transform:uppercase;margin:0 0 8px;">Contact</p>
      ${row('Name', name)}
      ${row('Email', `<a href="mailto:${email}" style="color:#FE6300;">${email}</a>`)}
      ${row('Phone', phone)}
      ${row('Company', company)}
      ${row('Role', role)}

      <p style="color:#FE6300;font-weight:600;font-size:12px;letter-spacing:1px;text-transform:uppercase;margin:22px 0 8px;">Firmographics (ICP)</p>
      ${row('Employees', companySize)}
      ${row('Company type', companyType)}
      ${row('Industry / domain', domain)}

      <p style="color:#FE6300;font-weight:600;font-size:12px;letter-spacing:1px;text-transform:uppercase;margin:22px 0 8px;">AI profile</p>
      ${row('Uses AI today', usesAi)}
      ${row('AI tools used', aiTools)}
      ${row('Wants AI for', useCases)}
      ${row('Timeline', timeline)}

      ${message ? `<div style="padding-top:16px;"><span style="${labelStyle}">Message:</span><p style="margin-top:8px;font-size:14px;color:#444;line-height:1.7;background:#faf7f4;padding:14px;border-radius:8px;">${String(message).replace(/\n/g, '<br>')}</p></div>` : ''}

      ${hasCampaign ? `
      <p style="color:#FE6300;font-weight:600;font-size:12px;letter-spacing:1px;text-transform:uppercase;margin:22px 0 8px;">Campaign attribution</p>
      ${row('Source', utmSource)}
      ${row('Medium', utmMedium)}
      ${row('Campaign', utmCampaign)}
      ${row('Term', utmTerm)}
      ${row('Content', utmContent)}
      ${row('gclid', gclid)}
      ${row('gad_source', gadSource)}
      ` : ''}
      ${referrer || landingPage ? `
      ${row('Referrer', referrer)}
      ${row('Landing page', landingPage ? `<span style="word-break:break-all;font-size:12px;">${landingPage}</span>` : '')}
      ` : ''}
    </div>`);
};

/* ── Application notification to Arinox team ── */
const applicationNotification = ({ fullName, email, phone, role, department, linkedIn, coverNote, resumeName }) =>
  emailWrapper(`
    <div style="${headerStyle}">
      <img src="${logoUrl()}" alt="Arinox AI" style="height:32px;margin-bottom:12px;" onerror="this.style.display='none'"/>
      <h2 style="color:#fff;margin:0;font-size:20px;">New Job Application</h2>
      <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:14px;">${role}</p>
    </div>
    <div style="${bodyStyle}">
      <p style="color:#555;font-size:14px;margin-bottom:20px;">A new application has been submitted via the Arinox Careers page.</p>
      <div style="${rowStyle}"><span style="${labelStyle}">Name:</span> ${fullName}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Email:</span> <a href="mailto:${email}" style="color:#FE6300;">${email}</a></div>
      <div style="${rowStyle}"><span style="${labelStyle}">Phone:</span> ${phone || '—'}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Role:</span> ${role}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Department:</span> ${department || '—'}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">Resume:</span> ${resumeName || 'Not provided'}</div>
      <div style="${rowStyle}"><span style="${labelStyle}">LinkedIn:</span> ${linkedIn ? `<a href="${linkedIn}" style="color:#FE6300;">${linkedIn}</a>` : '—'}</div>
      ${coverNote ? `<div style="padding-top:16px;"><span style="${labelStyle}">Cover Note:</span><p style="margin-top:8px;font-size:14px;color:#444;line-height:1.7;background:#faf7f4;padding:14px;border-radius:8px;">${coverNote.replace(/\n/g, '<br>')}</p></div>` : ''}
    </div>`);

/* ── Application auto-reply to applicant ── */
const applicationAutoReply = ({ fullName, role }) =>
  emailWrapper(`
    <div style="${headerStyle}">
      <img src="${logoUrl()}" alt="Arinox AI" style="height:32px;margin-bottom:12px;" onerror="this.style.display='none'"/>
      <h2 style="color:#fff;margin:0;font-size:20px;">Application Received</h2>
      <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:14px;">${role}</p>
    </div>
    <div style="${bodyStyle}">
      <p style="font-size:16px;font-weight:600;color:#1c160e;margin-bottom:8px;">Hi ${fullName},</p>
      <p style="font-size:14px;color:#555;line-height:1.7;margin-bottom:16px;">
        Thank you for applying for the <strong>${role}</strong> position at <strong>Arinox AI</strong>.
        We've received your application and our hiring team will review it carefully.
      </p>
      <p style="font-size:14px;color:#555;line-height:1.7;margin-bottom:24px;">
        We'll be in touch within <strong>5 business days</strong> if your profile matches what we're
        looking for. In the meantime, learn more about us at
        <a href="https://www.arinox.ai" style="color:#FE6300;">www.arinox.ai</a>.
      </p>
      <div style="background:linear-gradient(135deg,#FE6300,#ff7a1a);border-radius:8px;padding:16px 20px;color:#fff;font-size:13px;line-height:1.6;">
        <strong>Arinox AI</strong> — Building intelligent systems that transform how enterprises operate.<br>
        We look forward to potentially working together!
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

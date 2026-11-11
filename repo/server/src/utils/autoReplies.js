/* Server-owned auto-reply templates for lead forms.
 *
 * The visitor's confirmation email is sent from the Arinox mailbox to an
 * address the visitor typed, so its wording must never come from the request
 * body - otherwise the endpoint is an open relay for branded phishing. Forms
 * send only an `autoReplyId`; unknown ids fall back to the generic reply.
 *
 * Keep in sync with the on-page copy in client/src/data/{marketingSuite,
 * fashionLifestyleSuite, industrialSuite, secureOsSuite}.js (`request.autoReply`).
 */
const AUTO_REPLIES = {
  /* Generic inquiry - the fallback for every intent that names no document.
     `asset` is deliberately absent: no file is promised, so the copy carries
     the standard "what happens next" box. */
  'general-inquiry': {
    subject: 'We received your message',
    body: 'Thank you for writing to Arinox AI. We have your message and a person from the team will reply shortly.',
    steps: [
      'Our team reads your message',
      'We reply within one working day',
      'If it helps, we book a 30-minute discovery call with you',
    ],
  },
  'partnership': {
    subject: 'We received your partnership enquiry',
    body: 'Thank you for reaching out about working with Arinox AI. We have your note and someone from the team will come back to you.',
    steps: [
      'Our partnerships lead reads your note',
      'We reply within one working day',
      'If it fits, we set up a short call',
    ],
  },
  'marketing-os-deck': {
    subject: 'Your Marketing OS deck',
    body: 'Thank you for requesting the Marketing OS deck. We’ll email your copy shortly.',
    steps: [
      'The team will follow up soon',
      'If it helps, we walk you through it on a call',
    ],
    asset: { name: 'Marketing OS deck (PPT)' },
  },
  'fashion-lifestyle-os-deck': {
    subject: 'Your Fashion & Lifestyle OS deck',
    body: 'Thank you for requesting the Fashion & Lifestyle OS deck. We’ll email your copy shortly.',
    steps: [
      'The team will follow up soon',
      'If it helps, we map your first 2–3 systems to connect on a call',
    ],
    asset: { name: 'Fashion & Lifestyle OS deck (PDF)' },
  },
  'industrial-os-deck': {
    subject: 'Your Manufacturing OS deck',
    body: 'Thank you for requesting the Manufacturing OS deck. We’ll email your copy shortly.',
    steps: [
      'The team will follow up soon',
      'If it helps, we map your first 2–3 systems to connect on a call',
    ],
    asset: { name: 'Manufacturing OS deck (PDF)' },
  },
  'secure-os-deck': {
    subject: 'Your Secure OS playbook',
    body: 'Thank you for requesting the Secure OS playbook. We’ll send your copy shortly.',
    steps: [
      'The team will follow up soon',
      'If it helps, we map your first threat surface on a call',
    ],
    asset: { name: 'Secure OS playbook (PDF)' },
  },
  /* Price Discovery wizard confirmation. No `asset` on purpose: nothing is
     auto-attached, and no price is ever sent by email: the team shares it in
     the 30-minute conversation. */
  'price-discovery': {
    subject: 'Your Price Discovery answers are in review',
    body: 'Thank you — your answers are with an Arinox architect, who will read them before you speak.',
    steps: [
      'An architect reviews your answers and gets in touch within one business day',
      'Your 30-minute conversation: your price is shared there, built around your answers',
    ],
  },
};

const getAutoReply = (id) =>
  (typeof id === 'string' && Object.prototype.hasOwnProperty.call(AUTO_REPLIES, id) ? AUTO_REPLIES[id] : null);

module.exports = { AUTO_REPLIES, getAutoReply };

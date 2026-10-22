/* Server-owned auto-reply templates for lead forms.
 *
 * The visitor's confirmation email is sent from the Arinox mailbox to an
 * address the visitor typed, so its wording must never come from the request
 * body - otherwise the endpoint is an open relay for branded phishing. Forms
 * send only an `autoReplyId`; unknown ids fall back to the generic reply.
 *
 * Keep in sync with the on-page copy in client/src/data/{marketingSuite,
 * apparelSuite}.js (`request.autoReply`).
 */
const AUTO_REPLIES = {
  'marketing-os-deck': {
    subject: 'Your Marketing OS deck',
    body: 'Thank you for requesting the Marketing OS deck. We’ll email your copy shortly.',
    steps: [
      'The team will follow up soon',
      'If it helps, we walk you through it on a call',
    ],
    asset: { name: 'Marketing OS deck (PPT)' },
  },
  'apparel-os-deck': {
    subject: 'Your Apparel OS deck',
    body: 'Thank you for requesting the Apparel OS deck. We’ll email your copy shortly.',
    steps: [
      'The team will follow up soon',
      'If it helps, we map your first 2–3 systems to connect on a call',
    ],
    asset: { name: 'Apparel OS deck (PDF)' },
  },
};

const getAutoReply = (id) =>
  (typeof id === 'string' && Object.prototype.hasOwnProperty.call(AUTO_REPLIES, id) ? AUTO_REPLIES[id] : null);

module.exports = { AUTO_REPLIES, getAutoReply };

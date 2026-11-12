/* The contact hub: what an enquiry is about.
 *
 * The intent keys are the server's (server/src/utils/intents.js) and the
 * asset keys are the four documents a visitor can ask for. Keep the two in
 * sync - the labels here are the visitor's, the server owns the email copy.
 */

export const inquiries = {
  /* The hub link for a document request. The product pages send the visitor
     here with the document already picked. */
  deckHref: (asset) => `/contact?intent=deck&asset=${asset}`,

  subjects: [
    { label: 'General inquiry', intent: 'question' },
    { label: 'Request a deck', intent: 'deck' },
    { label: 'Partnership', intent: 'partnership' },
    { label: 'Pricing', intent: 'pricing' },
    { label: 'Media & press', intent: 'question' },
  ],

  assets: [
    { key: 'marketing-os', label: 'Marketing OS deck' },
    { key: 'fashion-lifestyle-os', label: 'Fashion & Lifestyle OS deck' },
    { key: 'industrial-os', label: 'Manufacturing OS deck' },
    { key: 'secure-os', label: 'Secure OS playbook' },
    { key: 'digital-twin', label: 'Digital Twin++ brief' },
  ],

  form: {
    label: 'Send a message',
    note: 'One place for every question — a demo, a deck, a price, a partnership, a press note. A person from the team reads it and replies.',
    success: 'Received — a person from the team will reply shortly.',
    cta: 'Send message',
    messageLabel: 'What should we look at first?',
    messagePlaceholder: 'One workflow, one bottleneck, one hunch — that’s enough to start.',
    /* The message asks a different question when the enquiry is about
       something other than a workflow. */
    messageByIntent: {
      pricing: {
        label: 'What are you trying to price?',
        placeholder: 'The workflow, the team, the outcome — a sentence is enough to start.',
      },
      partnership: {
        label: 'What would you like to build together?',
        placeholder: 'The practice you bring, the platform you need, the market you serve.',
      },
      deck: {
        label: 'Anything we should know?',
        placeholder: 'What you run today, what you want it to do. Optional.',
      },
    },
  },

  /* Shown under the picker when the enquiry is about a price - the survey is
     the precise path, and the hub is where people land first. */
  pricingSurvey: { lead: 'Want a number built around you?', link: 'Tell us about your business', to: '/get-started' },

  /* Where each enquiry type is sent from — used by the CTAs that deep-link
     into the hub (/contact?intent=deck&asset=industrial-os). */
  deepLinks: {
    deck: '/contact?intent=deck',
    partnership: '/contact?intent=partnership',
    pricing: '/contact?intent=pricing',
  },

  /* Copy for the card that replaces the inline deck form on a product page. */
  hubCard: {
    eyebrow: 'One form, one place',
    body: 'The contact page, with this document already picked. Three fields, and a person from the team emails your copy shortly.',
    foot: 'No newsletter, no drip sequence. One reply from a human who can read an architecture diagram.',
  },
};

/* Home-page client intake: the ten-question business profile (the questions
   themselves live in data/pricing.js `wizard.questions`; the wording here is
   the intake's own - no pricing language). */
export const intake = {
  eyebrow: 'Start here',
  title: 'Tell us about your business.',
  sub: 'Ten quick questions so our architects arrive at the first call already knowing your teams, systems, data and goals. About 4 minutes.',
  profileLabel: 'Your profile',
  restored: 'Picked up from earlier in this tab.',
  startOver: 'Start over',
  profileRows: {
    industry: 'Industry',
    size: 'Size',
    teams: 'Teams',
    apps: 'Systems',
    data: 'Data',
    outcome: 'Outcomes',
    stage: 'AI stage',
    blockers: 'Blockers',
    budget: 'Investment',
    timeline: 'Timeline',
  },
  trust: [
    'Reviewed by a solution architect',
    'We reply soon',
    'Your data stays with us — zero egress',
  ],
  stepLabel: (n, total) => `Question ${n} of ${total}`,
  next: 'Continue',
  back: 'Back',
  capNote: (max) => `Choose up to ${max}. Unselect one first.`,
  contact: {
    label: 'Last step',
    heading: 'Who should we talk to?',
    sub: 'An architect reads your profile first, so the conversation is about your business. They will reply soon.',
    notesLabel: 'Anything else we should know? (optional)',
    notesPlaceholder: 'Timelines, constraints, anything useful.',
    cta: 'Send my profile',
    errors: {
      name: 'Your name — we reply person to person.',
      email: 'That email doesn’t look complete.',
      company: 'Your company — it shapes the scope.',
      role: 'Your role — it tells us who we’re building with.',
    },
  },
  footnote: 'Your answers stay with Arinox and are used only to prepare for your conversation.',
  failure: 'Something went wrong — your answers are safe. Please try again.',
  success: {
    eyebrow: 'Received',
    heading: 'Thank you. An architect will be in touch.',
    sub: 'We will read your profile and reply soon.',
    next: [
      'An architect reviews your profile',
      'We reply soon',
      'If it helps, we book 30 minutes built around your answers',
    ],
    cta: 'Book a time',
  },
};

/* Home "Start here": a pointer to /get-started (the form never lives on Home). */
export const startHere = {
  label: 'Start here',
  titleLead: 'Tell us about your business.',
  titleAccent: 'We\u2019ll come prepared.',
  sub: 'Ten quick questions so our architects arrive at the first call already knowing your teams, systems, data and goals.',
  facts: ['10 questions', 'About 4 minutes', 'Read by an architect'],
  cta: 'Tell us about your business',
};

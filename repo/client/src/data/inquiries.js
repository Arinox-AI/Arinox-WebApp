/* The enquiry side of /get-started: what an enquiry is about.
 *
 * The intent keys are the server's (server/src/utils/intents.js) and the
 * asset keys are the documents a visitor can ask for. Keep the two in
 * sync - the labels here are the visitor's, the server owns the email copy.
 */

export const inquiries = {
  /* The link for a document request. The product pages send the visitor to
     /get-started with the document already picked (Step 2). */
  deckHref: (asset) => `/get-started?intent=deck&asset=${asset}`,

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

  /* The note asks a different question when the enquiry is about
     something other than a workflow. */
  noteByIntent: {
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

  /* Copy for the card that replaces the inline deck form on a product page. */
  hubCard: {
    eyebrow: 'One form, one place',
    body: 'The get-started page, with this document already picked. A few fields, and a person from the team emails your copy shortly.',
    foot: 'No newsletter, no drip sequence. One reply from a human who can read an architecture diagram.',
  },
};

/* /get-started: one journey in three steps - your business (ten questions),
   who you are (the lead is saved here), your call (optional). The questions
   themselves live in data/pricing.js `wizard.questions`; the wording here is
   the flow's own - no pricing language. */
export const intake = {
  eyebrow: 'Get started',
  title: 'Tell us about your business.',
  sub: 'Ten quick questions, so our architects arrive already knowing your teams, systems, data and goals. Then a few details and, if you like, 30 minutes on the calendar. About 4 minutes.',
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
    'Your data stays with us: zero egress',
  ],

  /* The three steps. `stepOf` is the mono label above each one. */
  steps: [
    { key: 'business', name: 'Your business' },
    { key: 'you', name: 'Who you are' },
    { key: 'call', name: 'Your call' },
  ],
  stepOf: (n, total, name, optional) => `Step ${n} of ${total} · ${name}${optional ? ' (optional)' : ''}`,
  stepLabel: (n, total) => `Question ${n} of ${total}`,
  next: 'Continue',
  back: 'Back',
  skip: 'Skip — just talk to us',
  capNote: (max) => `Choose up to ${max}. Unselect one first.`,

  /* Step 2 */
  contact: {
    heading: 'Who should we talk to?',
    sub: 'A person from the team reads this first, so the conversation is about your business. They will reply soon.',
    subSent: 'Your answers go with it; an architect reads them before replying.',
    notesLabel: 'Anything else? What should we look at first?',
    notesPlaceholder: 'One workflow, one bottleneck, one hunch — that’s enough to start.',
    subjectLabel: 'What is this about?',
    assetLabel: 'Which one?',
    assetAny: 'Not sure — send me the closest',
    cta: 'Send my details',
    sending: 'Sending…',
    errors: {
      name: 'Your name — we reply person to person.',
      email: 'That email doesn’t look complete.',
      company: 'Your company — it shapes the scope.',
      role: 'Your role — it tells us who we’re building with.',
    },
  },
  footnote: 'Your details stay with Arinox and are used only to reply to you.',
  failure: 'Something went wrong — your answers are safe. Please try again.',

  /* Step 3 */
  call: {
    heading: 'Want 30 minutes with an architect?',
    sub: 'Pick a time and it lands in your calendar. Your name, email and company are already filled in.',
    skip: 'No call yet — email me first',
  },

  /* The one confirmation, reflecting what happened. */
  done: {
    stepLabel: 'Step 3 of 3 · Done',
    /* Arrived from the booking email (?booked=1) and answered the questions. */
    prepared: {
      heading: 'Thank you. Your architect will read these before the call.',
      sub: 'Your call is already booked, so there is nothing else to do. See you then.',
    },
    eyebrow: 'Received',
    received: {
      heading: 'Thank you. The team has your details.',
      sub: (email) => `A person from the team will reply to ${email} soon. It comes from a person, not a mailing robot.`,
    },
    booked: {
      eyebrow: 'Received · Booked',
      heading: (first) => `You’re booked, ${first}.`,
      sub: (email) => `A calendar invite is on its way to ${email}, and the team has your details. Accept it and it lands in your calendar.`,
      when: 'When',
      topic: 'Topic',
      join: 'Join',
      joinLink: 'Video call',
      move: 'Need to move it? Just reply to the confirmation email.',
    },
    next: [
      'The team reads what you sent',
      'We reply soon',
      'If it helps, we build the conversation around your answers',
    ],
    home: 'Back to home',
  },
};

/* Home "Start here": a pointer to /get-started (the form never lives on Home). */
export const startHere = {
  titleLead: 'Tell us about your business.',
  titleAccent: 'Let’s get to work.',
  offer: 'Ten quick questions, so the architect on your first call already knows your teams, systems and goals.',
  primary: { label: 'Get your AI roadmap', to: '/get-started' },
  facts: ['10 questions', 'About 4 minutes', 'Read by an architect'],
};

/* The Offices + Direct block at the foot of /get-started (data: data/site.js). */
export const reachUs = {
  eyebrow: 'Prefer to write or call?',
  offices: 'Offices',
  linkedin: 'LinkedIn →',
};

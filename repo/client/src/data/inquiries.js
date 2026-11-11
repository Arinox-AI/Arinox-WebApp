/* The contact hub: what an enquiry is about.
 *
 * The intent keys are the server's (server/src/utils/intents.js) and the
 * asset keys are the four documents a visitor can ask for. Keep the two in
 * sync - the labels here are the visitor's, the server owns the email copy.
 */

import { QUESTION_COUNT } from './pricing';

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
  pricingSurvey: { lead: 'Want a precise number?', link: `Answer ${QUESTION_COUNT} questions`, to: '/pricing/discovery?cta=hub' },

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

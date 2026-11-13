/* Server-owned inquiry intents.
 *
 * The client names an intent and, for a document request, an asset key. The
 * server owns everything else: the label the team sees, the auto-reply
 * template and the wording. A client can never send email copy, and an
 * unknown intent or asset falls back to the general reply - it never
 * reaches the auto-reply table as-is.
 *
 * The asset keys map 1:1 onto the deck-request forms that live inline
 * on the product pages (client/src/data/{marketingSuite,fashionLifestyleSuite,
 * industrialSuite,secureOsSuite,digitalTwinSuite}.js) - keep the two in sync.
 */

const INQUIRY_INTENTS = {
  question: { label: 'General inquiry', autoReplyId: 'general-inquiry' },
  deck: { label: 'Deck request', autoReplyId: null }, // the asset decides the template
  partnership: { label: 'Partnership', autoReplyId: 'partnership' },
  pricing: { label: 'Price Discovery', autoReplyId: 'price-discovery' },
  profile: { label: 'Business Profile', autoReplyId: 'business-profile' },
};

/* Asset key → what the visitor asked for + the auto-reply template. */
const INQUIRY_ASSETS = {
  'marketing-os': { label: 'Marketing OS deck', autoReplyId: 'marketing-os-deck' },
  'fashion-lifestyle-os': { label: 'Fashion & Lifestyle OS deck', autoReplyId: 'fashion-lifestyle-os-deck' },
  'industrial-os': { label: 'Manufacturing OS deck', autoReplyId: 'industrial-os-deck' },
  'secure-os': { label: 'Secure OS playbook', autoReplyId: 'secure-os-deck' },
  'digital-twin': { label: 'Digital Twin++ brief', autoReplyId: 'digital-twin-brief' },
};

/* Subjects offered on the contact form. Each one maps to an intent; the
   label is what the team reads, the intent is what we report on. */
const CONTACT_SUBJECTS = [
  { label: 'General inquiry', intent: 'question' },
  { label: 'Request a deck', intent: 'deck' },
  { label: 'Partnership', intent: 'partnership' },
  { label: 'Media & press', intent: 'question' },
  { label: 'Something else', intent: 'question' },
];

/* Where an enquiry came from. Only the pricing and profile intents carry it - the team
   wants to know which door converts (the quick form, the survey, the hub),
   not where every "general inquiry" was typed. */
const INQUIRY_SOURCES = {
  quick: 'quick form',
  survey: 'survey',
  hub: 'contact hub',
  home: 'home intake',
  /* The intake offered as a dialog right after someone reached us. */
  'after-message': 'after their message',
  'after-booking': 'after booking a session',
  'contact-page': 'contact page',
};

const isIntent = (v) => typeof v === 'string' && Object.prototype.hasOwnProperty.call(INQUIRY_INTENTS, v);
const isAsset = (v) => typeof v === 'string' && Object.prototype.hasOwnProperty.call(INQUIRY_ASSETS, v);
const isSource = (v) => typeof v === 'string' && Object.prototype.hasOwnProperty.call(INQUIRY_SOURCES, v);

/* Resolve an incoming inquiry into a safe, server-owned shape.
   Unknown values degrade to the general inquiry - never to an error. */
const resolveInquiry = ({ intent, asset, subject, autoReplyId, source } = {}) => {
  let resolvedIntent = isIntent(intent) ? intent : 'question';

  // A legacy caller may still name a deck template directly (the Price
  // Discovery wizard does). Map it onto the new intent/asset pair.
  let resolvedAsset = isAsset(asset) ? asset : null;
  if (!resolvedAsset && typeof autoReplyId === 'string') {
    const match = Object.entries(INQUIRY_ASSETS).find(([, a]) => a.autoReplyId === autoReplyId);
    if (match) { resolvedAsset = match[0]; resolvedIntent = 'deck'; }
    else if (autoReplyId === 'price-discovery') resolvedIntent = 'pricing';
  }

  // A deck request without a known asset is still a deck request - it lands
  // on the general reply so the team can ask which document was meant.
  const templateId = resolvedIntent === 'deck'
    ? (resolvedAsset ? INQUIRY_ASSETS[resolvedAsset].autoReplyId : 'general-inquiry')
    : INQUIRY_INTENTS[resolvedIntent].autoReplyId;

  const assetLabel = resolvedAsset ? INQUIRY_ASSETS[resolvedAsset].label : null;

  return {
    intent: resolvedIntent,
    intentLabel: INQUIRY_INTENTS[resolvedIntent].label,
    asset: resolvedAsset,
    assetLabel,
    templateId,
    source: isSource(source) ? source : null,
    sourceLabel: isSource(source) ? INQUIRY_SOURCES[source] : null,
    subject: typeof subject === 'string' && subject.trim() ? subject.trim().slice(0, 200) : null,
  };
};

/* The source tag the team notification surfaces (the Leads.role column). */
const sourceTag = ({ intentLabel, assetLabel, subject, intent, source }) => {
  const parts = [subject || intentLabel, assetLabel].filter(Boolean);
  if ((intent === 'pricing' || intent === 'profile') && source && INQUIRY_SOURCES[source]) parts.push(INQUIRY_SOURCES[source]);
  return parts.join(' · ');
};

module.exports = {
  INQUIRY_INTENTS,
  INQUIRY_ASSETS,
  INQUIRY_SOURCES,
  CONTACT_SUBJECTS,
  isIntent,
  isAsset,
  isSource,
  resolveInquiry,
  sourceTag,
};

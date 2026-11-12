const { KNOWLEDGE } = require('./knowledge');

/* Picks the slice of the knowledge base relevant to the current conversation.
 *
 * Why: sending all ~19 KB (~5,000 tokens) with every message made each request
 * cost most of Groq's per-minute token budget (8,000 TPM on the on-demand tier),
 * so a second message within a minute was rate-limited. Sending only what the
 * question needs cuts the prompt by roughly two thirds - faster, cheaper, and it
 * leaves headroom for more than one visitor at a time.
 *
 * knowledge.js stays the single source of truth; this only chooses from it.
 * No embeddings or network: a small keyword scorer is deterministic, instant,
 * and testable. Swap in vectors later behind the same selectKnowledge() call. */

const MAX_SECTIONS = 3;
const MAX_CHARS = 6500;

// Always sent: who Arinox is, where, and how to reach it.
const ALWAYS = ['ARINOX — THE COMPANY'];

// Sent when nothing matches (greetings, "tell me about Arinox").
const OVERVIEW = ['COMMANDCORE', 'KOGO OS'];

/* Words a visitor uses that never appear in the section text itself. Keyed by a
 * section-title fragment; every key must match exactly one section (tested). */
const ALIASES = {
  LEADERSHIP: ['founder', 'ceo', 'cto', 'coo', 'team', 'leader', 'leadership', 'management', 'executive', 'who', 'advisor', 'advisors', 'people'],
  'VALUES': ['value', 'culture', 'principle', 'pillar', 'mission'],
  'THE METHOD': ['method', 'process', 'approach', 'how do you work', 'engagement', 'implementation', 'phases', 'steps'],
  COMMANDCORE: ['commandcore', 'appliance', 'on-prem', 'onprem', 'air-gapped', 'airgapped', 'hardware', 'datacenter', 'tier', 'tiers', 'private ai', 'product'],
  'KOGO OS': ['kogo', 'agent', 'agents', 'agentic', 'orchestration', 'workflow', 'workflows', 'automation'],
  'DATA READINESS': ['data', 'readiness', 'ingest', 'ingestion', 'pipeline', 'quality', 'clean', 'unstructured'],
  'INCLUDED BUSINESS APPLICATIONS': ['application', 'applications', 'apps', 'included', 'module', 'modules'],
  'DEPLOYMENT OPTIONS': ['deploy', 'deployment', 'cloud', 'hosted', 'self-hosted', 'hybrid', 'infrastructure'],
  COMPLIANCE: ['compliance', 'certification', 'certified', 'certifications', 'soc', 'iso', 'gdpr', 'hipaa', 'audit', 'regulated', 'regulation', 'governance', 'security'],
  'PROOF AND OUTCOMES': ['case', 'cases', 'study', 'studies', 'customer', 'customers', 'client', 'clients', 'proof', 'result', 'results', 'outcome', 'outcomes', 'roi', 'example', 'examples', 'success'],
  PARTNERS: ['partner', 'partners', 'ecosystem', 'nvidia', 'dell', 'microsoft', 'integration', 'alliance'],
  'WEBSITE PAGES': ['page', 'pages', 'link', 'where', 'blog', 'careers', 'jobs', 'contact', 'pricing', 'price', 'cost', 'book', 'demo', 'discovery', 'url', 'website'],
  'APPROACH TO AI COMPETITORS': ['competitor', 'competitors', 'compare', 'comparison', 'versus', 'vs', 'alternative', 'openai', 'chatgpt', 'copilot', 'palantir', 'better'],
  'MARKETING OS': ['marketing', 'campaign', 'campaigns', 'brand', 'content', 'seo', 'leads', 'ads', 'advertising'],
  'SECURE OS': ['secure', 'security', 'cyber', 'cybersecurity', 'attack', 'attacks', 'defense', 'defence', 'honeypot', 'threat', 'threats', 'dlp', 'breach'],
  'DIGITAL TWIN++': ['digital', 'twin', 'twins', 'dt++', 'airport', 'airports', 'defence', 'defense', 'government', 'simulation', 'crisis', 'bim', 'gis'],
  'GENERAL AI KNOWLEDGE': ['llm', 'llms', 'rag', 'generative', 'genai', 'machine', 'learning', 'neural', 'model', 'models', 'nlp', 'vision', 'mlops', 'sovereign', 'fine-tuning', 'finetuning', 'what is', 'explain', 'difference', 'hallucination', 'prompt', 'embedding', 'embeddings', 'vector'],
};

const STOP = new Set(('the a an and or of to in on for with is are was were be been it its this that these those what which who how why when where do does did can could should would will you your we our us i me my they them their about tell give show please any some more not no yes just also than then so if as at by from up out into over').split(' '));

// Cheap stemming so "agents"/"agentic"/"integrations" meet their root forms.
const stem = (w) => w.replace(/(ing|ers|er|es|ic|ed|s)$/, '');

const tokenize = (text) => (String(text).toLowerCase().match(/[a-z0-9][a-z0-9.+-]*/g) || [])
  .filter((w) => w.length > 1 && !STOP.has(w))
  .map(stem);

/* Parse once at load. */
const SECTIONS = KNOWLEDGE.split(/\n(?=## )/)
  .map((raw) => raw.trim())
  .filter((raw) => raw.startsWith('## '))
  .map((raw) => {
    const title = raw.split('\n')[0].replace(/^##\s*/, '');
    const aliasKey = Object.keys(ALIASES).find((k) => title.toUpperCase().includes(k));
    return {
      title,
      text: raw,
      titleTokens: new Set(tokenize(title)),
      aliasTokens: new Set((aliasKey ? ALIASES[aliasKey] : []).flatMap(tokenize)),
      bodyTokens: new Set(tokenize(raw)),
    };
  });

// Document frequency, so a word found in every section counts for little.
const DF = new Map();
SECTIONS.forEach((s) => s.bodyTokens.forEach((t) => DF.set(t, (DF.get(t) || 0) + 1)));
const idf = (t) => Math.log(1 + SECTIONS.length / (DF.get(t) || 1));

// A word found in most sections ("arinox", "ai") says nothing about WHICH one
// the visitor wants - it must not pull in arbitrary sections.
const isCommon = (t) => (DF.get(t) || 0) > SECTIONS.length / 2;

const isAlways = (s) => ALWAYS.some((a) => s.title.toUpperCase().includes(a));
const byTitle = (frag) => SECTIONS.find((s) => s.title.toUpperCase().includes(frag));

/* weighted: [{ token, weight }] - the newest user message weighs most, because
 * it is the question; the turn before it only supplies context. */
function score(section, weighted) {
  let total = 0;
  weighted.forEach(({ token: t, weight }) => {
    if (isCommon(t)) return;
    if (section.titleTokens.has(t)) total += 6 * weight;
    if (section.aliasTokens.has(t)) total += 4 * weight;
    if (section.bodyTokens.has(t)) total += idf(t) * weight;
  });
  return total;
}

/**
 * @param {{role: string, content: string}[]} messages sanitized conversation
 * @returns {string} knowledge text to place in the system prompt
 */
function selectKnowledge(messages) {
  // The last two user turns: a follow-up like "and the pricing?" still carries
  // the topic of the turn before it.
  const userTurns = messages.filter((m) => m.role === 'user').slice(-2);
  const weighted = userTurns.flatMap((m, i) => {
    const weight = i === userTurns.length - 1 ? 3 : 1; // newest turn counts 3x
    return tokenize(m.content).map((token) => ({ token, weight }));
  });

  const ranked = SECTIONS
    .filter((s) => !isAlways(s))
    .map((s) => ({ s, v: score(s, weighted) }))
    .filter((x) => x.v > 0)
    .sort((a, b) => b.v - a.v)
    .slice(0, MAX_SECTIONS)
    .map((x) => x.s);

  const chosen = ranked.length ? ranked : OVERVIEW.map(byTitle).filter(Boolean);
  const picked = [...SECTIONS.filter(isAlways), ...chosen];

  // Hard ceiling, dropping the lowest-ranked extras first (company always stays).
  let text = picked.map((s) => s.text).join('\n\n');
  while (text.length > MAX_CHARS && picked.length > 2) {
    picked.pop();
    text = picked.map((s) => s.text).join('\n\n');
  }
  return text;
}

module.exports = { selectKnowledge, SECTIONS, ALIASES, MAX_SECTIONS, MAX_CHARS };

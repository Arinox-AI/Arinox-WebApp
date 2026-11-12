const Groq = require('groq-sdk');

/* Central Groq client + model config. Keeping this in one place means the model
 * and limits are changed in a single spot for both the JSON and streaming paths. */
const MODEL = process.env.CHAT_MODEL || 'openai/gpt-oss-120b';

// Groq rate limits are PER MODEL, so a second model is a second quota. When the
// primary is rate-limited or down, one retry goes here. Set to '' to disable.
const FALLBACK_MODEL = process.env.CHAT_FALLBACK_MODEL ?? 'openai/gpt-oss-20b';

// Grounded, factual answers want a low temperature. 0.6 encouraged confident
// hallucination; 0.3 keeps it close to the knowledge base.
const TEMPERATURE = Number(process.env.CHAT_TEMPERATURE || 0.3);

// Replies are 2-4 sentences and gpt-oss at low effort spends only a handful of
// reasoning tokens, so ~700 is ample. Groq reserves max_tokens against the
// per-minute token budget up front, so a large cap directly costs throughput.
const MAX_TOKENS = Number(process.env.CHAT_MAX_TOKENS || 700);
const REASONING_EFFORT = process.env.CHAT_REASONING_EFFORT || 'low';

// Upstream request ceiling. Groq streams fast; this only guards a stall.
const REQUEST_TIMEOUT_MS = Number(process.env.CHAT_TIMEOUT_MS || 30000);

/* Parameters shared by every completion call. `reasoning_effort` is only sent
 * to gpt-oss models - other models reject unknown parameters, so switching
 * CHAT_MODEL never needs a code change. */
const completionParams = (extra = {}) => {
  const model = extra.model || MODEL;
  return {
    max_tokens: MAX_TOKENS,
    temperature: TEMPERATURE,
    ...(/gpt-oss/i.test(model) && REASONING_EFFORT ? { reasoning_effort: REASONING_EFFORT } : {}),
    ...extra,
    model,
  };
};

let _groq = null;
const getGroq = () => {
  if (!process.env.GROQ_API_KEY) {
    throw Object.assign(new Error('GROQ_API_KEY not set'), { status: 401 });
  }
  // maxRetries 0: the SDK's default is to sleep and retry on a 429, which turns
  // a rate limit into a silent 20s+ stall for the visitor. Fail fast instead and
  // let the controller fall back to the second model.
  if (!_groq) _groq = new Groq({ apiKey: process.env.GROQ_API_KEY, maxRetries: Number(process.env.CHAT_MAX_RETRIES || 0) });
  return _groq;
};

/* Should a failed call be retried on the fallback model? Rate limits, overload
 * and 5xx yes; a bad key or a malformed request would fail identically. */
const shouldFallback = (err) => {
  if (!FALLBACK_MODEL || FALLBACK_MODEL === MODEL) return false;
  const status = err?.status;
  if (status === 429 || status >= 500) return true;
  return !status && err?.name !== 'AbortError'; // network-level failure
};

/* Creates a completion on the primary model, retrying once on the fallback if
 * the primary is rate-limited or down. `body` is the params WITHOUT a model. */
async function createCompletion(body, options) {
  try {
    return await getGroq().chat.completions.create(completionParams(body), options);
  } catch (err) {
    if (!shouldFallback(err)) throw err;
    console.warn(`[chat] ${MODEL} failed (${err.status || err.name}); retrying on ${FALLBACK_MODEL}`);
    return getGroq().chat.completions.create(completionParams({ ...body, model: FALLBACK_MODEL }), options);
  }
}

module.exports = {
  getGroq,
  createCompletion,
  completionParams,
  shouldFallback,
  MODEL,
  FALLBACK_MODEL,
  TEMPERATURE,
  MAX_TOKENS,
  REASONING_EFFORT,
  REQUEST_TIMEOUT_MS,
};

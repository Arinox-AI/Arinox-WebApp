const supabase = require('../config/supabase');
const { SAFE_FALLBACK } = require('./guardrails');

/* Persistence for the chatbot: a conversation log (so the team can see what
 * visitors ask and where Arin falls short) and a durable rate-limit counter.
 *
 * Both exist because Vercel serverless instances share no memory: an in-process
 * counter resets on every cold start and differs per instance.
 *
 * Both are best-effort by design. Supabase being down or the migration not yet
 * applied must NEVER break a conversation - the log is skipped and the limiter
 * fails open (the in-process limiter in routes/chat.js still applies). */

const LOG_TIMEOUT_MS = 1500;
const clip = (value, max) => String(value ?? '').slice(0, max);

// Phrases that mean Arin could not answer from the knowledge base. These feed
// the "unanswered questions" report - the backlog for improving knowledge.js.
const UNANSWERED = [
  /i do not have that detail/i,
  /i don't have that detail/i,
  /i do not have (that|this) information/i,
  /i don't have (that|this) information/i,
];

function classify({ blocked, reason, error, reply }) {
  if (error) return 'error';
  if (reason === 'injection') return 'refused';
  if (blocked) return 'blocked';
  if (reply === SAFE_FALLBACK || UNANSWERED.some((re) => re.test(reply || ''))) return 'unanswered';
  return 'answered';
}

const withTimeout = (promise, ms) => Promise.race([
  promise,
  new Promise((resolve) => { setTimeout(() => resolve(null), ms).unref?.(); }),
]);

/**
 * Records one exchange. Resolves once written (or skipped) and never throws.
 * Callers await it BEFORE ending the response: a serverless function may be
 * frozen the moment the response closes, which would drop a fire-and-forget
 * write. The timeout bounds the cost to the visitor.
 */
async function logExchange({ question, reply, blocked, reason, error, latencyMs, model, page }) {
  if (!supabase) return;
  const row = {
    question: clip(question, 2000),
    reply: clip(reply, 4000),
    outcome: classify({ blocked, reason, error, reply }),
    reason: reason ? clip(reason, 60) : null,
    latencyMs: Number.isFinite(latencyMs) ? Math.round(latencyMs) : null,
    model: clip(model, 80),
    page: page ? clip(page, 200) : null,
  };
  try {
    const result = await withTimeout(supabase.from('ChatLogs').insert(row), LOG_TIMEOUT_MS);
    if (result?.error) console.warn('[chat] log skipped:', result.error.message);
  } catch (err) {
    console.warn('[chat] log skipped:', err.message);
  }
}

/**
 * Atomically counts one hit for `key` in the current fixed window and returns
 * the running total, or null when the shared counter is unavailable.
 */
async function countHit(key, windowSeconds) {
  if (!supabase) return null;
  try {
    const result = await withTimeout(
      supabase.rpc('chat_rate_hit', { p_key: key, p_window_seconds: windowSeconds }),
      LOG_TIMEOUT_MS,
    );
    if (!result || result.error) return null;
    return typeof result.data === 'number' ? result.data : null;
  } catch {
    return null;
  }
}

module.exports = { logExchange, countHit, classify };

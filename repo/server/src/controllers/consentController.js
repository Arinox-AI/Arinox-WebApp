const crypto = require('crypto');
const supabase = require('../config/supabase');

/* Cookie-consent audit trail (best effort). The banner POSTs every choice;
 * we keep a minimal record as proof of consent: policy version, choices,
 * where the choice was made, a SALTED hash of the IP (never the IP itself;
 * skipped when CONSENT_HASH_SALT is unset) and the user agent. Records older
 * than RETENTION_DAYS are deleted on each write. Always answers 204 so a
 * missing table or DB outage never affects the visitor. */
const RETENTION_DAYS = 395; // 13 months
const SOURCES = new Set(['banner', 'settings', 'gpc']);

const recordConsent = async (req, res) => {
  const b = req.body || {};
  const p = b.preferences || {};
  const version = typeof b.version === 'string' ? b.version.slice(0, 20) : '';
  if (!version || !SOURCES.has(b.source) || typeof p.functional !== 'boolean' || typeof p.analytics !== 'boolean') {
    return res.status(400).json({ success: false, message: 'Invalid consent record.' });
  }
  if (supabase) {
    try {
      const salt = process.env.CONSENT_HASH_SALT;
      const ipHash = salt && req.ip ? crypto.createHash('sha256').update(req.ip + salt).digest('hex') : null;
      const { error } = await supabase.from('ConsentRecords').insert({
        consentVersion: version,
        source: b.source,
        functional: p.functional,
        analytics: p.analytics,
        ipHash,
        userAgent: String(req.get('user-agent') || '').slice(0, 300),
      });
      if (error) console.warn('[consent] record not saved:', error.message);
      const cutoff = new Date(Date.now() - RETENTION_DAYS * 86400000).toISOString();
      await supabase.from('ConsentRecords').delete().lt('consentedAt', cutoff);
    } catch (err) {
      console.warn('[consent] record not saved:', err.message);
    }
  }
  return res.status(204).end();
};

module.exports = { recordConsent, RETENTION_DAYS };

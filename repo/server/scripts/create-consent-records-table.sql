-- ----------------------------------------------------------------------------
-- Creates the "ConsentRecords" table: the cookie-consent audit trail
-- (POST /api/v1/consent, written by the cookie banner on every choice).
-- Run once: Supabase dashboard -> SQL Editor -> paste -> Run. Safe to re-run.
--
-- No raw IP is stored: "ipHash" is sha256(ip + CONSENT_HASH_SALT), and only
-- when that env var is set. Rows older than 13 months are deleted by the API.
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS "ConsentRecords" (
  "id"             BIGSERIAL PRIMARY KEY,
  "consentVersion" VARCHAR(20) NOT NULL,
  "source"         VARCHAR(10) NOT NULL,   -- banner | settings | gpc
  "functional"     BOOLEAN NOT NULL,
  "analytics"      BOOLEAN NOT NULL,
  "ipHash"         VARCHAR(64),
  "userAgent"      VARCHAR(300),
  "consentedAt"    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "ConsentRecords_consentedAt_idx" ON "ConsentRecords" ("consentedAt");

-- Service-role key bypasses RLS; enabling it keeps the table closed to anon keys.
ALTER TABLE "ConsentRecords" ENABLE ROW LEVEL SECURITY;

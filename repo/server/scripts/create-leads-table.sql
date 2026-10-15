-- ----------------------------------------------------------------------------
-- Creates the "Leads" table used by the Google Ads landing page (/get-started).
-- Stores each ICP-qualifying answer as its own column so leads can be filtered
-- and segmented (employees, industry, AI usage, timeline, campaign source...).
--
-- Run once: paste into the Supabase dashboard → SQL Editor → Run.
-- Safe to re-run - uses CREATE TABLE IF NOT EXISTS / CREATE INDEX IF NOT EXISTS.
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS "Leads" (
  "id"            SERIAL PRIMARY KEY,
  "name"          VARCHAR(120) NOT NULL,
  "email"         VARCHAR(255) NOT NULL,
  "phone"         VARCHAR(40),
  "company"       VARCHAR(160),
  "role"          VARCHAR(80),
  "companySize"   VARCHAR(40),
  "companyType"   VARCHAR(60),
  "domain"        VARCHAR(80),
  "usesAi"        VARCHAR(60),
  "aiTools"       TEXT,
  "useCases"      TEXT,
  "timeline"      VARCHAR(60),
  "message"       TEXT,
  -- leadController stores the auto-reply copy shown to the lead (incl. the
  -- deck-request asset marker). Must exist or every insert 400s.
  "autoReply"     JSONB,
  "utmSource"     VARCHAR(120),
  "utmMedium"     VARCHAR(120),
  "utmCampaign"   VARCHAR(160),
  "utmTerm"       VARCHAR(160),
  "utmContent"    VARCHAR(160),
  "gclid"         VARCHAR(255),
  "gadSource"     VARCHAR(120),
  "referrer"      TEXT,
  "landingPage"   TEXT,
  "status"        VARCHAR(20) DEFAULT 'new',
  "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS: no policies on purpose. The site only touches Leads with the
-- service-role key (bypasses RLS), so with RLS enabled and zero policies
-- these rows are unreadable to anon/authed clients - exactly what we want
-- for lead privacy.
ALTER TABLE "Leads" ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS "leads_domain_idx"      ON "Leads" ("domain");
CREATE INDEX IF NOT EXISTS "leads_companySize_idx" ON "Leads" ("companySize");
CREATE INDEX IF NOT EXISTS "leads_createdAt_idx"   ON "Leads" ("createdAt");

-- Refresh the PostgREST schema cache so the REST API sees the new table.
NOTIFY pgrst, 'reload schema';

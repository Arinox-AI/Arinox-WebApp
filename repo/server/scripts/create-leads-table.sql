-- ----------------------------------------------------------------------------
-- Creates the "Leads" table used by the Google Ads landing page (/get-started).
-- Stores each ICP-qualifying answer as its own column so leads can be filtered
-- and segmented (employees, industry, AI usage, timeline, campaign source...).
--
-- Run once: paste into the Supabase dashboard → SQL Editor → Run.
-- Safe to re-run — uses CREATE TABLE IF NOT EXISTS / CREATE INDEX IF NOT EXISTS.
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

CREATE INDEX IF NOT EXISTS "leads_domain_idx"      ON "Leads" ("domain");
CREATE INDEX IF NOT EXISTS "leads_companySize_idx" ON "Leads" ("companySize");
CREATE INDEX IF NOT EXISTS "leads_createdAt_idx"   ON "Leads" ("createdAt");

-- Refresh the PostgREST schema cache so the REST API sees the new table.
NOTIFY pgrst, 'reload schema';

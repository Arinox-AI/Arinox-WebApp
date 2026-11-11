-- ----------------------------------------------------------------------------
-- Adds the two columns the unified inquiry intake writes (server/src/controllers/
-- inquiryController.js): every website enquiry - a question, a deck request, a
-- partnership note, a Price Discovery answer - lands in the existing "Leads"
-- table with an intent and, for a document request, the asset that was asked for.
--
-- Run once: Supabase dashboard -> SQL Editor -> paste -> Run. Safe to re-run.
--
-- OPTIONAL: the intake works without this migration - the insert falls back to
-- the columns that already exist (intent and asset are then only visible in
-- the team email and the auto-reply, not in the table).
-- ----------------------------------------------------------------------------

ALTER TABLE public."Leads" ADD COLUMN IF NOT EXISTS "intent" TEXT;
ALTER TABLE public."Leads" ADD COLUMN IF NOT EXISTS "asset"  TEXT;

-- Reporting: which surface produced which kind of inquiry.
CREATE INDEX IF NOT EXISTS "Leads_intent_createdAt_idx"
  ON public."Leads" ("intent", "createdAt" DESC);

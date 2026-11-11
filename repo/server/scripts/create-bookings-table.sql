-- ----------------------------------------------------------------------------
-- Creates the "Bookings" table for 30-minute discovery sessions (/contact).
-- Run once: Supabase dashboard -> SQL Editor -> paste -> Run. Safe to re-run.
--
-- The partial unique index is the double-booking guard: two visitors who pick
-- the same time at the same moment cannot both be confirmed.
-- To free a slot (meeting cancelled/moved): cancel the calendar event AND set
-- this row's "status" to 'cancelled'.
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS "Bookings" (
  "id"            SERIAL PRIMARY KEY,
  "startAt"       TIMESTAMPTZ NOT NULL,
  "endAt"         TIMESTAMPTZ NOT NULL,
  "status"        VARCHAR(20) NOT NULL DEFAULT 'confirmed',  -- confirmed | cancelled | completed
  "name"          VARCHAR(120) NOT NULL,
  "email"         VARCHAR(255) NOT NULL,
  "company"       VARCHAR(160),
  "phone"         VARCHAR(40),
  "topic"         VARCHAR(80),
  "notes"         TEXT,
  "guests"        JSONB,
  "visitorTz"     VARCHAR(64),
  "uid"           VARCHAR(64),
  "googleEventId" VARCHAR(255),
  "meetLink"      TEXT,
  "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS "Bookings_confirmed_start_uniq"
  ON "Bookings" ("startAt") WHERE "status" = 'confirmed';

CREATE INDEX IF NOT EXISTS "Bookings_startAt_idx" ON "Bookings" ("startAt");

-- Service-role key bypasses RLS; enabling it keeps the table closed to anon keys.
ALTER TABLE "Bookings" ENABLE ROW LEVEL SECURITY;

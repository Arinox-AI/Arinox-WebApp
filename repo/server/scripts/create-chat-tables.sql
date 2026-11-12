-- ----------------------------------------------------------------------------
-- Chatbot persistence (server/src/chat/store.js): a conversation log and a
-- durable rate-limit counter. Run once: Supabase dashboard -> SQL Editor ->
-- paste -> Run. Safe to re-run.
--
-- OPTIONAL: the chatbot works without this migration. Until it runs, nothing
-- is logged and the shared rate limit is skipped (the in-process limiter in
-- routes/chat.js still applies).
--
-- Privacy: the log stores the visitor's last question and Arin's reply only -
-- no IP address, no cookies, no identifiers. Visitors can type personal
-- details into a chat, so mention chat logging in the Privacy page.
-- ----------------------------------------------------------------------------

-- 1. Conversation log -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public."ChatLogs" (
  "id"        BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "question"  TEXT        NOT NULL,
  "reply"     TEXT,
  -- answered | unanswered | refused | blocked | error
  "outcome"   TEXT        NOT NULL,
  "reason"    TEXT,
  "latencyMs" INTEGER,
  "model"     TEXT,
  "page"      TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "ChatLogs_outcome_createdAt_idx"
  ON public."ChatLogs" ("outcome", "createdAt" DESC);

-- Server-only table: RLS on with no policies = the anon key can read nothing.
-- The service-role key used by the server bypasses RLS.
ALTER TABLE public."ChatLogs" ENABLE ROW LEVEL SECURITY;

-- 2. Durable rate limit -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public."ChatRateLimits" (
  "key"         TEXT        NOT NULL,
  "windowStart" TIMESTAMPTZ NOT NULL,
  "hits"        INTEGER     NOT NULL DEFAULT 0,
  PRIMARY KEY ("key", "windowStart")
);

ALTER TABLE public."ChatRateLimits" ENABLE ROW LEVEL SECURITY;

-- Counts one hit for p_key in the current fixed window and returns the total.
-- One atomic upsert, so concurrent serverless instances cannot under-count.
CREATE OR REPLACE FUNCTION public.chat_rate_hit(p_key TEXT, p_window_seconds INTEGER)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  bucket TIMESTAMPTZ;
  total  INTEGER;
BEGIN
  bucket := to_timestamp(floor(extract(epoch FROM now()) / p_window_seconds) * p_window_seconds);

  INSERT INTO public."ChatRateLimits" AS r ("key", "windowStart", "hits")
  VALUES (p_key, bucket, 1)
  ON CONFLICT ("key", "windowStart") DO UPDATE SET "hits" = r."hits" + 1
  RETURNING r."hits" INTO total;

  -- Housekeeping on ~1% of calls: drop windows older than a day.
  IF random() < 0.01 THEN
    DELETE FROM public."ChatRateLimits" WHERE "windowStart" < now() - INTERVAL '1 day';
  END IF;

  RETURN total;
END;
$$;

-- Only the server (service role) may call it.
REVOKE ALL ON FUNCTION public.chat_rate_hit(TEXT, INTEGER) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.chat_rate_hit(TEXT, INTEGER) TO service_role;

-- 3. Reports ----------------------------------------------------------------
-- What Arin could not answer (the backlog for server/src/chat/knowledge.js):
--   SELECT "question", "createdAt" FROM public."ChatLogs"
--   WHERE "outcome" = 'unanswered' ORDER BY "createdAt" DESC LIMIT 50;

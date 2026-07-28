const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set — Supabase SDK unavailable');
}

// Service-role client for server-side use (bypasses Row Level Security)
const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })
  : null;

module.exports = supabase;

/* Bookings persistence. Supabase `Bookings` table (see
   server/scripts/create-bookings-table.sql) with an in-memory fallback for
   local dev when Supabase isn't configured or the table isn't created yet.
   The fallback is never used in production — there a missing table is a
   real error, not something to paper over. */
const supabase = require('../config/supabase');

const mem = [];
let memSeq = 1;
let forceMem = false;

const prod = () => process.env.NODE_ENV === 'production';
const tableMissing = (e) => e && (e.code === '42P01' || e.code === 'PGRST205' || /Bookings/.test(e.message || '') && /does not exist|schema cache/i.test(e.message || ''));
const useMem = () => forceMem || (!supabase && !prod());

const fallback = (e) => {
  if (prod() || !tableMissing(e)) return false;
  if (!forceMem) console.warn('[booking] "Bookings" table not found - using IN-MEMORY store (dev only). Run server/scripts/create-bookings-table.sql to persist.');
  forceMem = true;
  return true;
};
const taken = () => Object.assign(new Error('That time was just taken.'), { code: 'TAKEN' });

/* Confirmed bookings overlapping [fromIso, toIso] as busy blocks. */
async function listBusy(fromIso, toIso) {
  if (!useMem()) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase.from('Bookings').select('startAt,endAt').eq('status', 'confirmed').gte('endAt', fromIso).lte('startAt', toIso);
    if (!error) return data.map((r) => ({ start: r.startAt, end: r.endAt }));
    if (!fallback(error)) throw new Error(error.message);
  }
  return mem.filter((r) => r.status === 'confirmed' && r.endAt >= fromIso && r.startAt <= toIso).map((r) => ({ start: r.startAt, end: r.endAt }));
}

/* Reserve the slot. A unique index on confirmed startAt makes a double-booking
   race impossible: the loser gets code 'TAKEN'. */
async function insert(row) {
  const now = new Date().toISOString();
  const full = { ...row, status: 'confirmed', createdAt: now, updatedAt: now };
  if (!useMem()) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase.from('Bookings').insert(full).select().single();
    if (!error) return data;
    if (error.code === '23505') throw taken();
    if (!fallback(error)) throw new Error(error.message);
  }
  if (mem.some((r) => r.status === 'confirmed' && r.startAt === row.startAt)) throw taken();
  const rec = { ...full, id: memSeq++ };
  mem.push(rec);
  return rec;
}

/* Confirmed, not-yet-finished sessions for one address (email is stored lowercase). */
async function countUpcoming(email) {
  const now = new Date().toISOString();
  if (!useMem()) {
    if (!supabase) throw new Error('Supabase not configured');
    const { count, error } = await supabase.from('Bookings').select('id', { count: 'exact', head: true }).eq('status', 'confirmed').eq('email', email).gte('endAt', now);
    if (!error) return count || 0;
    if (!fallback(error)) throw new Error(error.message);
  }
  return mem.filter((r) => r.status === 'confirmed' && r.email === email && r.endAt >= now).length;
}

async function update(id, patch) {
  const body = { ...patch, updatedAt: new Date().toISOString() };
  if (!useMem()) {
    const { error } = await supabase.from('Bookings').update(body).eq('id', id);
    if (error) console.error('[booking] update failed:', error.message);
    return;
  }
  const rec = mem.find((r) => r.id === id);
  if (rec) Object.assign(rec, body);
}

module.exports = { listBusy, insert, update, countUpcoming };

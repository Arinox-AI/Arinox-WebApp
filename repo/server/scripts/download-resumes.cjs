/*
 * Downloads every stored resume from the Supabase 'resumes' bucket to a local
 * folder, named by candidate + role for easy outreach.
 *
 * Usage:  node server/scripts/download-resumes.cjs
 * Output: <repo>/resumes_export/
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const fs = require('fs');
const path = require('path');
const supabase = require('../src/config/supabase');

const BUCKET = 'resumes';
const outDir = path.join(__dirname, '../../resumes_export');

const safe = (s) => String(s).replace(/[^\w.-]+/g, '_').replace(/^_+|_+$/g, '');

(async () => {
  fs.mkdirSync(outDir, { recursive: true });

  const { data: apps, error } = await supabase
    .from('JobApplications')
    .select('*')
    .not('resumePath', 'is', null)
    .order('createdAt', { ascending: false });
  if (error) { console.error('DB error:', error.message); process.exit(1); }

  if (!apps.length) { console.log('No applications with a stored resume yet.'); return; }

  let ok = 0;
  for (const a of apps) {
    const { data: blob, error: dErr } = await supabase.storage.from(BUCKET).download(a.resumePath);
    if (dErr) { console.warn(`  ✗ ${a.fullName}: ${dErr.message}`); continue; }
    const ext = path.extname(a.resumeName || a.resumePath) || '.bin';
    const name = `${safe(a.fullName)}_${safe(a.role)}_id${a.id}${ext}`;
    fs.writeFileSync(path.join(outDir, name), Buffer.from(await blob.arrayBuffer()));
    console.log(`  ✓ ${name}`);
    ok++;
  }
  console.log(`\nDownloaded ${ok}/${apps.length} resume(s) to ${outDir}`);
})();

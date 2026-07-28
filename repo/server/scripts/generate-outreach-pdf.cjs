/*
 * Generates a downloadable PDF "Candidate Outreach Sheet" from the
 * JobApplications table so the team can reach out to applicants.
 * Dependency-free PDF writer (built-in Helvetica, no embedding needed).
 *
 * Usage:  node server/scripts/generate-outreach-pdf.cjs
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const fs = require('fs');
const path = require('path');
const supabase = require('../src/config/supabase');

// ---- tiny PDF builder ---------------------------------------------------
const PAGE_W = 612, PAGE_H = 792, MARGIN = 54;
const FONT_SIZE = 11, LEADING = 16;
const MAX_W = PAGE_W - MARGIN * 2;

// Average Helvetica char width is ~0.5em; wrap conservatively.
function wrap(text, size, maxW) {
  const words = String(text).replace(/\s+/g, ' ').trim().split(' ');
  const charW = size * 0.52;
  const maxChars = Math.floor(maxW / charW);
  const lines = [];
  let line = '';
  for (const w of words) {
    if (!line.length) { line = w; continue; }
    if ((line.length + 1 + w.length) <= maxChars) line += ' ' + w;
    else { lines.push(line); line = w; }
  }
  if (line.length) lines.push(line);
  return lines.length ? lines : [''];
}

function esc(s) {
  return String(s)
    .replace(/[^\x20-\x7E]/g, '')   // Latin-1/ASCII printable only
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

class Pdf {
  constructor() { this.pages = []; this.ops = []; this.y = 0; this.newPage(); }
  newPage() {
    if (this.ops.length) this.pages.push(this.ops);
    this.ops = [];
    this.y = PAGE_H - MARGIN;
  }
  ensure(h) { if (this.y - h < MARGIN) this.newPage(); }
  text(str, { size = FONT_SIZE, bold = false, indent = 0, color = '0 0 0' } = {}) {
    const font = bold ? 'F2' : 'F1';
    for (const line of wrap(str, size, MAX_W - indent)) {
      this.ensure(LEADING);
      this.ops.push(
        `BT /${font} ${size} Tf ${color} rg ${MARGIN + indent} ${this.y} Td (${esc(line)}) Tj ET`
      );
      this.y -= (size >= FONT_SIZE ? LEADING : size + 4);
    }
  }
  rule() {
    this.ensure(10);
    this.ops.push(`0.8 0.8 0.8 RG 0.7 w ${MARGIN} ${this.y} m ${PAGE_W - MARGIN} ${this.y} l S`);
    this.y -= 12;
  }
  gap(h = 8) { this.y -= h; }
  build() {
    if (this.ops.length) this.pages.push(this.ops);
    const objs = [];
    const add = (s) => objs.push(s);
    // 1 catalog, 2 pages, fonts 3/4, then page+content pairs
    const pageIds = [];
    let id = 5;
    const contentIds = [];
    for (let i = 0; i < this.pages.length; i++) { pageIds.push(id++); contentIds.push(id++); }

    add('<< /Type /Catalog /Pages 2 0 R >>');
    add(`<< /Type /Pages /Kids [${pageIds.map(p => `${p} 0 R`).join(' ')}] /Count ${pageIds.length} >>`);
    add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
    add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');
    for (let i = 0; i < this.pages.length; i++) {
      add(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
          `/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentIds[i]} 0 R >>`);
      const stream = this.pages[i].join('\n');
      add(`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`);
    }

    let out = '%PDF-1.4\n';
    const offsets = [];
    objs.forEach((body, i) => {
      offsets.push(Buffer.byteLength(out));
      out += `${i + 1} 0 obj\n${body}\nendobj\n`;
    });
    const xrefPos = Buffer.byteLength(out);
    out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
    offsets.forEach(o => { out += `${String(o).padStart(10, '0')} 00000 n \n`; });
    out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;
    return Buffer.from(out, 'latin1');
  }
}

// ---- data + layout ------------------------------------------------------
(async () => {
  const { data, error } = await supabase
    .from('JobApplications')
    .select('*')
    .order('createdAt', { ascending: false });
  if (error) { console.error('DB error:', error.message); process.exit(1); }

  const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const pdf = new Pdf();

  pdf.text('Arinox AI - Candidate Outreach Sheet', { size: 20, bold: true });
  pdf.gap(2);
  pdf.text(`Generated ${fmt(new Date())}  |  ${data.length} application(s)`, { size: 10, color: '0.45 0.45 0.45' });
  pdf.gap(6);
  pdf.rule();
  pdf.gap(4);

  data.forEach((a, i) => {
    pdf.ensure(90);
    pdf.text(`${i + 1}.  ${a.fullName}`, { size: 14, bold: true });
    pdf.gap(2);
    pdf.text(`Role:        ${a.role}${a.department ? '  (' + a.department + ')' : ''}`);
    pdf.text(`Email:       ${a.email}`);
    pdf.text(`Phone:       ${a.phone}`);
    if (a.linkedIn) pdf.text(`LinkedIn:    ${a.linkedIn}`);
    pdf.text(`Applied:     ${fmt(a.createdAt)}    Status: ${a.status}`);
    if (a.resumeName) pdf.text(`Resume file: ${a.resumeName}`, { color: '0.4 0.4 0.4' });
    if (a.coverNote) {
      pdf.gap(3);
      pdf.text('Cover note:', { bold: true, size: 10 });
      pdf.text(a.coverNote, { size: 10, color: '0.25 0.25 0.25' });
    }
    pdf.gap(6);
    pdf.rule();
    pdf.gap(4);
  });

  const outDir = path.join(__dirname, '../../');
  const outPath = path.join(outDir, 'Candidate_Outreach_Sheet.pdf');
  fs.writeFileSync(outPath, pdf.build());
  console.log('Wrote', outPath, `(${data.length} candidates)`);
})();

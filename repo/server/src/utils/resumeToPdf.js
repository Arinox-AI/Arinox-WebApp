const path = require('path');
const mammoth = require('mammoth');
const PDFDocument = require('pdfkit');

/*
 * Ensures a resume is delivered as a downloadable, openable PDF.
 *  - If the upload is already a PDF, it is returned unchanged.
 *  - A .docx is converted to a clean, readable PDF (headings, paragraphs,
 *    list items preserved) using pure-JS libs (Alpine/Cloud Run friendly).
 *  - Anything else (e.g. legacy .doc) falls back to the original file.
 *
 * Returns: { filename, content }  (content is a Buffer, ready for nodemailer)
 */
async function resumeToPdf(buffer, originalName, mimetype) {
  const ext = path.extname(originalName || '').toLowerCase();
  const base = (path.basename(originalName || 'resume', ext) || 'resume').trim();

  if (ext === '.pdf' || mimetype === 'application/pdf') {
    return { filename: originalName || 'resume.pdf', content: buffer };
  }

  if (ext === '.docx') {
    try {
      const { value: html } = await mammoth.convertToHtml({ buffer });
      const pdf = await htmlToPdf(html);
      return { filename: `${base}.pdf`, content: pdf };
    } catch (err) {
      console.error('[resumeToPdf] docx conversion failed, attaching original:', err.message);
      return { filename: originalName, content: buffer };
    }
  }

  // .doc or unknown — no reliable pure-JS converter; attach original.
  return { filename: originalName, content: buffer };
}

// Minimal mammoth-HTML -> PDF renderer. Mammoth emits a predictable, small set
// of block tags (p, h1-h6, ul/ol, li, table). We render text content block by
// block; pdfkit handles wrapping and pagination.
function htmlToPdf(html) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 56 });
    const chunks = [];
    doc.on('data', (c) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const blocks = parseBlocks(html);
    if (!blocks.length) doc.fontSize(11).text('(empty document)');

    blocks.forEach((b, i) => {
      if (i > 0) doc.moveDown(b.type === 'h' ? 0.6 : 0.3);
      if (b.type === 'h') {
        const size = Math.max(13, 20 - (b.level - 1) * 2);
        doc.font('Helvetica-Bold').fontSize(size).text(b.text);
      } else if (b.type === 'li') {
        doc.font('Helvetica').fontSize(11).text(`•  ${b.text}`, { indent: 12 });
      } else {
        doc.font('Helvetica').fontSize(11).text(b.text, { align: 'left' });
      }
    });

    doc.end();
  });
}

function decodeEntities(s) {
  return s
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/[ \t]+/g, ' ')
    .trim();
}

function parseBlocks(html) {
  const blocks = [];
  const re = /<(h[1-6]|p|li)[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const tag = m[1].toLowerCase();
    const text = decodeEntities(m[2]);
    if (!text) continue;
    if (tag[0] === 'h') blocks.push({ type: 'h', level: +tag[1], text });
    else if (tag === 'li') blocks.push({ type: 'li', text });
    else blocks.push({ type: 'p', text });
  }
  return blocks;
}

module.exports = { resumeToPdf };

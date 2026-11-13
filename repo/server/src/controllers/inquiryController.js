const validator = require('validator');
const supabase = require('../config/supabase');
const { sendMail, teamCc, customerCc, inquiryNotification, contactAutoReply } = require('../utils/mailer');
const { getAutoReply } = require('../utils/autoReplies');
const { resolveInquiry, sourceTag } = require('../utils/intents');

/* Same hygiene as the older contact/lead flows: trim + length-cap every
   free-text field so the row and the email bodies can't be inundated by
   oversized junk (the 10kb body limit only bounds the request). */
const str = (v, max = 500) => (v == null ? null : String(v).trim().slice(0, max)) || null;
const join = (v) => (Array.isArray(v) ? str(v.map(String).join(', ')) : str(v));

/* One intake for every website inquiry: a question, a deck request, a
   partnership note, a Price Discovery answer. The visitor names the intent
   and (for a document) the asset; the server owns the label, the auto-reply
   wording and what lands in the Leads row.
 *
 * The row is written to the existing Leads table - it already carries the
 * contact fields, the campaign columns and the server-owned autoReply
 * jsonb. `intent` and `asset` are optional columns (see
   scripts/add-inquiry-intent-to-leads.sql); until they exist in Supabase
 * the insert falls back to the columns it does have. */
const submitInquiry = async (req, res, next) => {
  try {
    const b = req.body || {};
    const resolved = resolveInquiry(b);

    const inquiry = {
      name:        str(b.name, 120),
      email:       str(b.email, 255),
      phone:       str(b.phone, 40),
      company:     str(b.company, 160),
      role:        sourceTag({ intentLabel: resolved.intentLabel, assetLabel: resolved.assetLabel, subject: resolved.subject, intent: resolved.intent, source: resolved.source }),
      message:     str(b.message, 4000),
      // ICP answers carried by the Price Discovery wizard - same columns the
      // Leads table already had.
      companySize: str(b.companySize, 40),
      companyType: str(b.companyType, 60),
      domain:      str(b.domain, 80),
      usesAi:      str(b.usesAi, 60),
      aiTools:     join(b.aiTools),
      useCases:    join(b.useCases),
      timeline:    str(b.timeline, 60),
      // Auto-reply copy is server-owned (utils/autoReplies.js): the request
      // names an intent, it never supplies email text.
      autoReply:   getAutoReply(resolved.templateId),
      intent:      resolved.intent,
      asset:       resolved.asset,
      utmSource:   str(b.utm_source, 120),
      utmMedium:   str(b.utm_medium, 120),
      utmCampaign: str(b.utm_campaign, 160),
      utmTerm:     str(b.utm_term, 160),
      utmContent:  str(b.utm_content, 160),
      gclid:       str(b.gclid, 255),
      gadSource:   str(b.gad_source, 120),
      referrer:    str(b.referrer, 1000),
      landingPage: str(b.landing_page, 1000),
    };

    if (!inquiry.name || !inquiry.email)
      return res.status(400).json({ success: false, message: 'Name and email are required.' });
    if (!validator.isEmail(inquiry.email))
      return res.status(400).json({ success: false, message: 'Invalid email address.' });

    // A deck request never ships the file: the team email flags the intent
    // loudly and the visitor is told a person sends it shortly.
    const deckRequest = Boolean(inquiry.autoReply?.asset?.name);

    // Save the row - log but don't fail the request if the DB hiccups, so a
    // real enquiry is never lost (the team email carries the full detail).
    let saved = null;
    try {
      const now = new Date().toISOString();
      const row = { ...inquiry, status: 'new', createdAt: now, updatedAt: now };
      const { data, error } = await supabase
        .from('Leads')
        .insert(row)
        .select()
        .single();
      if (error) throw new Error(error.message);
      saved = data;
    } catch (dbErr) {
      // The intent/asset columns may not exist yet (the migration is
      // optional) - retry without them before calling it a failure.
      if (isMissingColumn(dbErr)) {
        console.warn('[leads] the intent/asset columns are missing - run server/scripts/add-inquiry-intent-to-leads.sql (the enquiry is saved without them)');
        try {
          const now = new Date().toISOString();
          const row = { ...inquiry };
          delete row.intent;
          delete row.asset;
          const { data, error } = await supabase
            .from('Leads')
            .insert({ ...row, status: 'new', createdAt: now, updatedAt: now })
            .select()
            .single();
          if (error) throw new Error(error.message);
          saved = data;
        } catch (retryErr) {
          console.error('Inquiry DB insert failed (email will still send):', retryErr.message);
        }
      } else {
        console.error('Inquiry DB insert failed (email will still send):', dbErr.message);
      }
    }

    // Notify team + auto-reply to the visitor. Awaited in serverless so Vercel
    // does not freeze the function before SMTP has a chance to complete.
    const emailResults = await Promise.allSettled([
      sendMail({
        to: notifyTo(),
        cc: teamCc(notifyTo()),
        subject: `[Arinox Inquiry] ${resolved.intentLabel}${deckRequest ? ' - ' + (resolved.assetLabel || 'Deck') : ''} - ${inquiry.name}${inquiry.company ? ' - ' + inquiry.company : ''}`,
        html: inquiryNotification({
          ...inquiry,
          intentLabel: resolved.intentLabel,
          assetLabel: resolved.assetLabel,
          sourceLabel: resolved.sourceLabel,
        }),
        replyTo: inquiry.email,
      }),
      sendMail({
        to: inquiry.email,
        cc: customerCc(inquiry.email),
        subject: inquiry.autoReply?.subject || 'We received your message - Arinox AI',
        html: contactAutoReply({
          name: inquiry.name,
          subject: inquiry.autoReply?.subject || resolved.subject || 'your enquiry',
          body: inquiry.autoReply?.body,
          steps: inquiry.autoReply?.steps,
          asset: inquiry.autoReply?.asset,
          // Everyone except those who just sent the intake gets the link to it.
          surveyLink: resolved.intent !== 'profile',
        }),
      }),
    ]);
    emailResults.forEach((r, i) => {
      if (r.status === 'rejected') {
        const label = i === 0 ? 'team-notify' : 'auto-reply';
        console.error(`Email error (inquiry/${label}):`, r.reason?.responseCode ?? '', r.reason?.message ?? r.reason);
      }
    });

    res.status(201).json({ success: true, message: "Thank you! We'll get back to you soon.", id: saved?.id });
  } catch (err) { next(err); }
};

/* Postgres error 42703 = undefined column. Supabase surfaces it through
   PostgREST as "Could not find the 'asset' column of 'Leads' in the schema
   cache" - both shapes mean "run the migration". */
const isMissingColumn = (err) => {
  const message = err?.message || '';
  return err?.code === '42703'
    || /column .* does not exist/i.test(message)
    || /could not find the .* column/i.test(message);
};

/* Team notification recipients. EMAIL_TO may hold one address or a
   comma-separated list; the fallback recipient is always included.
   LEADS_FALLBACK_EMAIL steers it via env; the default keeps prior behavior. */
const FALLBACK_EMAIL = process.env.LEADS_FALLBACK_EMAIL || 'vandana@arinox.ai';
const notifyTo = () => {
  const list = (process.env.EMAIL_TO || 'assist@arinox.ai')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (!list.includes(FALLBACK_EMAIL)) list.push(FALLBACK_EMAIL);
  return list.join(', ');
};

module.exports = { submitInquiry, notifyTo };

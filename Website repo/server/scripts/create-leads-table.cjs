/* ----------------------------------------------------------------------------
 * Creates the "Leads" table used by the Google Ads landing page (/get-started).
 * Stores each ICP-qualifying answer as its own column so leads can be filtered
 * and segmented (employees, industry, AI usage, timeline, campaign source...).
 *
 * Run once:  node scripts/create-leads-table.cjs   (from the server/ folder)
 * Safe to re-run — uses CREATE TABLE IF NOT EXISTS.
 *
 * The Supabase direct host (db.<ref>.supabase.co) is IPv6-only and fails to
 * resolve on IPv4-only networks, so this connects via the IPv4 session pooler.
 * It auto-detects the project's region by probing the regional poolers.
 * --------------------------------------------------------------------------- */
require('dotenv').config();
const { Sequelize } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL not set — aborting.');
  process.exit(1);
}

const parts = databaseUrl.match(/^postgresql:\/\/([^:]+):([^@]+)@db\.([a-z0-9]+)\.supabase\.co:(\d+)\/(.+)$/i);
if (!parts) {
  console.error('DATABASE_URL is not a Supabase direct connection string — aborting.');
  process.exit(1);
}
const [, user, pass, ref, , db] = parts;

const REGIONS = process.env.SUPABASE_REGION
  ? [process.env.SUPABASE_REGION]
  : ['ap-south-1', 'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1',
     'us-east-1', 'us-east-2', 'us-west-1', 'eu-central-1', 'eu-west-1', 'eu-west-2'];

// Supabase poolers exist under both aws-0-* (older) and aws-1-* (newer) hosts.
const HOST_PREFIXES = ['aws-0', 'aws-1'];

const poolerUrl = (host, region) =>
  `postgresql://${user}.${ref}:${pass}@${host}-${region}.pooler.supabase.com:5432/${db}`;

const sql = `
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
`;

async function tryConnect(host, region) {
  const sequelize = new Sequelize(poolerUrl(host, region), {
    dialect: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
    logging: false,
    retry: { max: 0 },
  });
  try {
    await sequelize.authenticate();
    return sequelize; // connected
  } catch (err) {
    await sequelize.close().catch(() => {});
    throw err;
  }
}

(async () => {
  let sequelize = null;
  outer:
  for (const host of HOST_PREFIXES) {
    for (const region of REGIONS) {
      try {
        process.stdout.write(`Trying ${host}-${region}... `);
        sequelize = await tryConnect(host, region);
        console.log('connected.');
        break outer;
      } catch (err) {
        console.log(`no (${err.message.split('\n')[0]})`);
      }
    }
  }
  if (!sequelize) {
    console.error('Could not connect via any regional pooler. Set SUPABASE_REGION and retry, or run the SQL in the Supabase SQL editor.');
    process.exit(1);
  }
  try {
    await sequelize.query(sql);
    console.log('"Leads" table is ready.');
    try { await sequelize.query("NOTIFY pgrst, 'reload schema';"); } catch (_) {}
    console.log('Done.');
    process.exit(0);
  } catch (err) {
    console.error('Failed to create Leads table:', err.message);
    process.exit(1);
  }
})();

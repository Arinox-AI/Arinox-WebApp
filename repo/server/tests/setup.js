// Hermetic smoke tests: neutralize the env that would otherwise make app.js
// reach live services (Supabase, SMTP), and pin NODE_ENV to a non-production
// value so CORS/rate-limit behavior is deterministic regardless of repo/.env.
// dotenv does not override variables that are already set, so pre-setting
// these to empty strings keeps the values in repo/.env out of the test process.
process.env.NODE_ENV = '';
process.env.SUPABASE_URL = '';
process.env.SUPABASE_SERVICE_ROLE_KEY = '';
process.env.EMAIL_USER = '';
process.env.EMAIL_PASS = '';
process.env.SITE_URL = '';

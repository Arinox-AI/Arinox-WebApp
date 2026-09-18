/* ─── Data readiness content ────────────────────────────────
   Sits under the transformation narrative on the Home page:
   the stack's data layer, then one supporting section.
   ──────────────────────────────────────────────────────────── */

export const dataReadiness = {
  eyebrow: 'Under the hood · data readiness',
  titleLead: 'Make your data',
  titleAccent: 'AI-ready.',
  lead: 'Your AI engine is only as powerful as the data behind it. Arinox transforms fragmented, unstructured and siloed enterprise data into a trusted, governed and AI-ready data foundation.',
  chips: ['discover', 'cleanse', 'structure', 'connect', 'govern', 'AI-enable'],
  link: { label: 'Data readiness, in detail', to: '/commandcore' },
  pullQuote: 'Garbage in, garbage out — at enterprise scale.',
  pullNote: 'Not a data management service. A readiness step inside the transformation, so the AI you deploy isn’t guessing.',
  governance: 'Governance applied at every stage',
  governanceNote: 'lineage · access control · security',
  flow: [
    {
      k: 'Input',
      t: 'Enterprise Data',
      d: 'Documents, ERP/CRM/HRMS, email, databases, media, legacy apps and third-party feeds.',
      tone: 'light',
    },
    {
      k: 'Foundation',
      t: 'Data Readiness',
      d: 'Discovered, cleansed, structured, connected, governed and enriched.',
      tone: 'ember',
    },
    {
      k: 'Engine',
      t: 'AI Intelligence',
      d: 'RAG, agents and copilots that reason with your enterprise context.',
      tone: 'dark',
    },
    {
      k: 'Outcome',
      t: 'Business Action',
      d: 'Decisions, automation and workflows that move the numbers.',
      tone: 'tint',
    },
  ],
}

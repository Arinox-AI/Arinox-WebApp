/* Cookie consent copy + config. Single source for the banner, the /cookies
 * page and the consent effects. To add a "marketing" category later: add an
 * entry to `categories`, add its default to lib/consent.js (CATEGORIES), and
 * add one loader in lib/consentEffects.js. */

export const CLARITY_PROJECT_ID = 'zj62if5kjn';

export const CONSENT_COOKIE = 'arinox_consent';
export const CONSENT_DAYS = 180;
/* Policy version. Bump it (any new string) whenever the cookie list or
 * purposes change: stored choices from an older version are ignored and the
 * banner asks again. */
export const CONSENT_VERSION = '2026-11-27';

/* localStorage/sessionStorage keys that only exist with Functional consent.
 * Cleared when Functional is turned off. Keep in step with wizardLogic's
 * ANSWERS_KEY (a test asserts it). */
export const FUNCTIONAL_STORAGE_KEYS = ['arinox-discovery-answers'];

/* Cookies Clarity may set on our domain; removed on withdrawal. */
export const CLARITY_COOKIES = ['_clck', '_clsk', 'CLID', 'MUID', 'ANONCHK', 'MR', 'SM', 'SRM_B'];

export const banner = {
  title: 'Cookies and your choices',
  body: 'We use analytics and a small functional store only if you say yes. Nothing optional runs until you choose.',
  alwaysOn: 'Always on',
  gpc: "Your browser's Global Privacy Control signal is on, so we saved \"Reject all\" for you. You can still turn categories on here.",
  learnMore: { label: 'Cookie policy', to: '/cookies' },
  privacy: { label: 'Privacy policy', to: '/privacy' },
  acceptAll: 'Accept all',
  rejectAll: 'Reject all',
  choose: 'Choose',
  save: 'Save choices',
  back: 'Back',
};

export const categories = [
  {
    key: 'necessary',
    label: 'Necessary',
    locked: true,
    description: 'Remembers your cookie choice. The site does not work as intended without it.',
    short: 'Remembers this choice.',
  },
  {
    key: 'functional',
    label: 'Functional',
    description: 'Keeps your roadmap answers in this browser for 30 days so you can pick up where you left off.',
    short: 'Keeps your roadmap answers for 30 days.',
  },
  {
    key: 'analytics',
    label: 'Analytics',
    description: 'Microsoft Clarity records anonymised sessions and heatmaps so we can improve the site. Microsoft acts as our processor and may process data outside India.',
    short: 'Microsoft Clarity heatmaps and session recordings.',
  },
];

export const cookiesPage = {
  title: 'Cookie Policy',
  seoTitle: 'Cookie Policy | Arinox AI',
  seoDescription: 'The cookies and browser storage www.arinox.ai uses, why, and how to change your choices.',
  updated: '27 November 2026',
  intro: 'This policy lists every cookie and browser-storage item used on www.arinox.ai. Only the necessary item is set before you choose. Everything else needs your consent, which you can change or withdraw at any time.',
  change: 'Change your choices',
  sections: [
    {
      title: '1. How consent works',
      paras: [
        'When you first visit, a panel asks you to accept all, reject all, or choose by category. The three options carry equal weight. Until you choose, only the necessary item below is used and nothing is sent to Microsoft.',
        'Your choice is stored in a first-party cookie named arinox_consent for 180 days, after which we ask again. We also ask again whenever this policy changes. If your browser sends a Global Privacy Control signal and you have not chosen yet, we treat it as "Reject all" and do not show the panel; you can still opt in through Cookie settings.',
        'As proof of consent we keep a record of each choice on our server: the policy version, the choices, where you made them (panel, settings or the privacy signal), the time, your browser’s user agent and a one-way hash of your IP address (never the address itself). Records are deleted after 13 months.',
        'You can change your mind at any time using "Cookie settings" in the site footer or the button below. Withdrawing analytics consent stops Clarity immediately and we delete its cookies from this site (see section 4 for the ones Microsoft sets on its own domain).',
      ],
    },
    {
      title: '2. Categories',
      list: [
        ['Necessary', 'Always on. Remembers your consent choice and keeps your first-visit campaign source for the length of a browser session.'],
        ['Functional', 'Optional. Stores your in-progress roadmap answers in this browser for 30 days. When off, answers are kept only for the current tab session, as before.'],
        ['Analytics', 'Optional. Microsoft Clarity session recordings and heatmaps. Clarity masks form input by default. It is loaded only after you consent.'],
      ],
    },
    {
      title: '3. What we use',
      table: true,
    },
    {
      title: '4. Microsoft Clarity',
      paras: [
        'Clarity is provided by Microsoft Corporation, which processes the data on our behalf. Recordings and heatmaps may be stored on servers outside India. Microsoft describes its handling of data at privacy.microsoft.com. Durations marked "per Microsoft" are set by Clarity and can change; we list the values published at the time of writing.',
        'Some Clarity cookies (CLID, MUID, ANONCHK, MR, SM) are set by Microsoft on its own domain, clarity.ms, not on arinox.ai. Browsers do not let one website delete another website\'s cookies, so when you withdraw consent we stop loading Clarity and delete the cookies on arinox.ai, and the clarity.ms cookies are no longer used by this site. To remove them as well, clear cookies for clarity.ms in your browser settings.',
        'To withdraw consent, turn Analytics off in Cookie settings. For deletion requests about data already collected, write to assist@arinox.ai.',
      ],
    },
  ],
};

export const cookieTable = {
  head: ['Name', 'Provider', 'Purpose', 'Category', 'Duration'],
  rows: [
    ['arinox_consent', 'Arinox (first party)', 'Stores your cookie choice, the policy version and when you chose', 'Necessary', '180 days'],
    ['arinox.attribution (sessionStorage)', 'Arinox (first party)', 'Remembers the campaign source (UTM) that first brought you here, so an enquiry carries it. Never sent until you submit a form', 'Necessary', 'Until you close the tab'],
    ['arinox-discovery-answers (sessionStorage)', 'Arinox (first party)', 'Keeps roadmap answers while you move around the site in the same tab', 'Necessary', 'Until you close the tab'],
    ['arinox-discovery-answers (localStorage)', 'Arinox (first party)', 'Keeps roadmap answers between visits', 'Functional', '30 days'],
    ['_clck', 'Microsoft Clarity', 'Persists the Clarity user ID and preferences', 'Analytics', '1 year (per Microsoft)'],
    ['_clsk', 'Microsoft Clarity', 'Connects page views into one session recording', 'Analytics', '1 day (per Microsoft)'],
    ['CLID', 'Microsoft Clarity (third party, clarity.ms)', 'Identifies the first time Clarity saw this browser on any site using Clarity', 'Analytics', '1 year (per Microsoft)'],
    ['MUID', 'Microsoft (third party, clarity.ms)', 'Identifies unique browsers across Microsoft sites. Set by Microsoft on clarity.ms, not on arinox.ai', 'Analytics', '1 year (per Microsoft)'],
    ['ANONCHK', 'Microsoft (third party, clarity.ms)', 'Indicates whether MUID is passed to an advertising cookie. Clarity does not use advertising cookies, so this is always 0', 'Analytics', 'Set by Microsoft'],
    ['MR', 'Microsoft (third party, clarity.ms)', 'Indicates whether to refresh MUID', 'Analytics', 'Set by Microsoft'],
    ['SM', 'Microsoft (third party, clarity.ms)', 'Synchronises MUID across Microsoft domains', 'Analytics', 'Set by Microsoft'],
    ['Vercel Web Analytics', 'Vercel', 'Aggregate page views. Cookieless: no cookie or browser storage is written', 'None', 'Not applicable'],
  ],
};

/* ─── CommandCore product data ──────────────────────────────
   Source of truth: official CommandCore Sovereign AI Platform
   brochure (2026) + KOGO OS spec sheet.
   ──────────────────────────────────────────────────────────── */

export const commandCoreIntro = {
  overline: 'The Platform',
  product: 'CommandCore™',
  tagline: 'Agentic AI in a box',
  title: 'CommandCore, agentic AI, in a box.',
  lead: 'CommandCore is our sovereign AI appliance: a self-contained micro-datacenter that brings compute, models, agentic intelligence and governance inside your perimeter.',
  badges: ['Agentic AI in a box', '100% AI · 0% internet', 'Fully air-gapped', 'Edge to datacenter'],
  claim: 'India’s first fully sovereign implementation of AI-in-a-Box.',
};

/* Three headline claims from the brochure, used as an impact strip */
export const headlineClaims = [
  { big: '100% AI.', small: '0% Internet.', note: 'Runs advanced AI with zero external connectivity.' },
  { big: '100% Secure.', small: '0% Risk.', note: 'Air-gapped, zero-egress architecture by design.' },
  { big: 'Edge → Datacenter.', small: 'One stack.', note: 'Modular, plug-and-play scalability without re-architecting.' },
];

export const whatItIs = [
  {
    title: 'Infrastructure you own',
    desc: 'AI compute that lives in your server room, branch office, or plant floor, not in someone else’s cloud. Nothing to lease back from a hyperscaler.',
  },
  {
    title: 'Intelligence that stays home',
    desc: 'Models, prompts, and data never leave your perimeter. CommandCore runs advanced AI with zero internet access, fully air-gapped by design.',
  },
  {
    title: 'Work, not chat',
    desc: 'Built-in KOGO OS runs purpose-built agents that execute real workflows, reviewing, reconciling, scheduling, deciding, with every action logged.',
  },
  {
    title: 'Deploy in weeks, not years',
    desc: 'A plug-and-play, self-contained AI micro-datacenter. Scale seamlessly from the edge to the datacenter without re-architecting your estate.',
  },
];

/* Architecture stack, top to bottom */
export const stack = [
  { layer: 'Your AI agents',       desc: 'Purpose-built agents for your workflows, configured with your rules, your data, your approvals.' },
  { layer: 'KOGO OS',              desc: 'The built-in agentic OS: agent builder, pre-built agent store, Agentic Mesh orchestration, memory, and governance.' },
  { layer: 'Models & knowledge',   desc: 'Open-weight LLMs and your governed knowledge base (RAG), running locally, cited and auditable.' },
  { layer: 'AI-ready data layer',  desc: 'Your enterprise data, made ingestible and governed: discovered, cleansed, structured, connected, enriched, with lineage and access control, so the layers above reason over your context instead of guessing.' },
  { layer: 'CommandCore hardware', desc: 'Sovereign compute engineered for on-premises deployment, from edge units to datacenter-grade systems.' },
  { layer: 'Your premises',        desc: 'Your network, your security perimeter, your compliance boundary. Nothing crosses it.' },
];

export const tiers = [
  {
    id: 's',
    name: 'CommandCore S',
    tagline: 'Agentic edge AI',
    img: 'commandcore-s',
    accelerator: 'NVIDIA AGX Jetson Orin',
    desc: 'Jetson Orin brings real-time AI to the edge, ideal for disconnected, mobile, and tactical environments.',
    bestFor: [
      'Batch processing of audio, video, image & sentiment',
      'Video analytics & computer vision',
      'Autonomous systems & IoT AI',
      'Remote and rugged deployments',
    ],
    specs: [
      { label: 'GPU', value: ['64 GB · 2 GPC · 8 TPC', '2,048 CUDA cores · 64 Tensor cores', 'Up to 275 INT8 TOPS'] },
      { label: 'CPU', value: ['Arm Cortex-A78AE cluster', 'Up to 12 cores (high SKU)'] },
      { label: 'Memory', value: ['Up to 64 GB LPDDR5', '~204 GB/s bandwidth'] },
      { label: 'FP compute', value: ['Up to 5.3 TFLOPS FP32', 'Higher FP16 throughput with sparsity'] },
      { label: 'Power', value: ['Optimised for edge deployments', 'Configurable power modes'] },
    ],
  },
  {
    id: 'm',
    name: 'CommandCore M',
    tagline: 'Blackwell powered agents on your desktop',
    img: 'commandcore-m',
    accelerator: 'NVIDIA Grace Blackwell GB10 Superchip',
    desc: 'A desktop-scale AI system powered by NVIDIA Grace-Blackwell, designed for secure enterprise AI workloads where space, speed, and sovereignty matter.',
    bestFor: [
      'Secure AI labs & R&D',
      'Local LLM inference & fine-tuning',
      'Department-level analytics',
      'Simulation & experimentation without cloud',
      'Batch processing of audio, video, image & sentiment',
    ],
    specs: [
      { label: 'Core', value: ['NVIDIA Grace-Blackwell (GB10) Superchip', '20-core Arm Grace CPU (10× Cortex-X925 + 10× Cortex-A725)', 'Blackwell GPU: 5th-gen Tensor Cores, 4th-gen RT Cores'] },
      { label: 'AI performance', value: ['Up to 1 PFLOP FP4 AI performance', 'Supports up to 200B parameter models', 'Dual-node scaling up to ~405B parameters (via ConnectX)'] },
      { label: 'Memory & storage', value: ['128 GB unified coherent memory (CPU + GPU)', 'Up to 4 TB NVMe storage'] },
      { label: 'Networking', value: ['NVIDIA ConnectX NIC', 'High-speed interconnect for multi-system scaling'] },
    ],
  },
  {
    id: 'xl',
    name: 'CommandCore XL',
    tagline: 'Datacenter-grade meets private agentic AI',
    img: 'commandcore-xl',
    accelerator: '2× NVIDIA RTX PRO 6000 Blackwell',
    desc: 'Built for large-scale, mission-critical AI workloads requiring maximum performance, reliability, and compliance, capable of running large models, multi-agent workflows, analytics pipelines, and AI governance systems, fully air-gapped.',
    highlight: true,
    bestFor: [
      'Secure AI operations hub',
      'Enterprise process automation engine',
      'Real-time intelligence & monitoring platform',
      'Large model inference & fine-tuning environment',
      'Executive decision intelligence dashboard',
      'AI governance & red-teaming environment',
    ],
    specs: [
      { label: 'Compute', value: ['Intel Xeon w7-2575X', '22 cores / 44 threads · 45 MB cache', '3.0 GHz (up to 4.8 GHz) · 250W TDP'] },
      { label: 'GPU', value: ['2× NVIDIA RTX PRO 6000 Blackwell (Workstation Edition)', 'Built for large model inference, multi-agent orchestration, high-throughput AI pipelines'] },
      { label: 'Memory', value: ['6× 32 GB DDR5-4800 ECC RDIMM', '192 GB ECC RAM total'] },
      { label: 'Storage', value: ['2× 2 TB SATA NL 7200 RPM (data)', '1× 1 TB PCIe NVMe SSD (OS / fast access)'] },
      { label: 'Networking', value: ['2-port X550 10GbE adapter'] },
      { label: 'Power & reliability', value: ['2000W enterprise PSU', '3-year warranty · enterprise-grade chassis'] },
    ],
  },
];

/* What CommandCore powers, from the brochure use-case map */
export const powerUseCases = [
  { sector: 'Government & public sector', image: '/images/sectors/government.svg', items: ['Secure analytics & dashboards', 'Citizen data intelligence', 'Policy simulation & planning', 'Offline AI for critical departments'] },
  { sector: 'BFSI', image: '/images/sectors/bfsi.svg', items: ['Fraud detection & compliance', 'Risk analytics', 'Secure AI copilots'] },
  { sector: 'Enterprise & industry', image: '/images/sectors/industry.svg', items: ['Process automation', 'Predictive maintenance', 'Supply chain intelligence', 'Autonomous enterprise workflows'] },
  { sector: 'Security & surveillance', image: '/images/sectors/security.svg', items: ['Intelligence analysis & fusion', 'Sensor, satellite & video processing', 'Autonomous threat detection', 'Secure AI red-teaming'] },
];

export const governance = [
  { title: 'Air-gapped by design',   desc: 'Zero-egress architecture. Advanced AI runs with no internet access at any layer.' },
  { title: 'Full audit coverage',    desc: 'Every agent decision logged and reviewable, governance on by default, not bolted on.' },
  { title: 'Least-privilege access', desc: 'Role-based and attribute-based controls with customer-managed keys (KMS/HSM).' },
  { title: 'Red-teamed & hardened',  desc: 'Adversarial testing, refusal suites, PII controls, and prompt hardening baked in.' },
];

export const deploymentSteps = [
  { step: '01', title: 'Assess',      desc: 'We map where AI creates real advantage in your operations, constraints, data readiness, compliance needs.' },
  { step: '02', title: 'Architect',   desc: 'We design the private AI stack for your environment, hardware footprint, agents, integrations, governance.' },
  { step: '03', title: 'Deploy',      desc: 'CommandCore is installed inside your perimeter; KOGO OS agents are configured, tested, and handed over.' },
  { step: '04', title: 'Run & scale', desc: 'We operate, measure, and expand, new agents, new workflows, new sites, as your AI practice matures.' },
];

/* KOGO OS, the agentic layer (built into CommandCore) */
export const kogo = {
  name: 'KOGO OS',
  role: 'The agentic layer',
  desc: 'KOGO OS is an agentic operating system: the layer between your infrastructure and your work. It builds agents, orchestrates them as a mesh, manages their memory and tools, and keeps every action accountable, so the work runs itself and every step stays auditable.',
  badges: ['Built-in', '500+ tools & connectors', '0 cloud dependence'],
  points: [
    'Agent Builder, low/no-code drag-and-drop workflows',
    'Agent Store, ready agents for video, audio, text & OCR',
    'Agentic Mesh, multi-agent orchestration with shared memory',
    'Policy & guardrails with PII controls',
    'Red-team & evaluation harness',
    'Live runs, replay & full observability',
    'Unified memory, governed retrieval across agents',
    'Model manager, host, fine-tune & route open models',
  ],
  security: [
    'Air-gapped, zero-egress stack',
    'SSO (SAML/OIDC) + MFA, RBAC/ABAC',
    'TLS 1.2+ in transit, AES-256 at rest',
    'Customer-managed keys via KMS/HSM',
    'Exportable audit packs for every run',
  ],
};

/* Business applications built into the platform, included with every deployment. */
export const businessApps = [
  { name: 'ERP',        full: 'Enterprise Resource Planning',     desc: 'Agents plan, procure, produce and account, without the spreadsheet chase.' },
  { name: 'HRMS',       full: 'Human Resource Management System', desc: 'Agents run attendance, payroll and performance, not the inbox.' },
  { name: 'CRM',        full: 'Customer Relationship Management', desc: 'Agents work every account and follow-up, so nothing goes cold.' },
  { name: 'Accounting', full: '',                                 desc: 'Agents post, reconcile and flag exceptions; ledgers stay current.' },
  { name: 'Legal',      full: '',                                 desc: 'Agents track matters, obligations and compliance continuously.' },
  { name: 'SCM',        full: 'Supply Chain Management',          desc: 'Agents source, replenish and monitor suppliers against live demand.' },
  { name: 'CLM',        full: 'Contract Lifecycle Management',    desc: 'Agents draft, route and renew contracts, watching every obligation.' },
  { name: 'Marketing',  full: '',                                 desc: 'Agents run campaigns, content and pipeline from one stack.' },
  { name: 'Helpdesk',   full: '',                                 desc: 'Agents resolve and route tickets before they pile up.' },
];

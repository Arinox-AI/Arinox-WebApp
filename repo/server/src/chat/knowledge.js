/* Canonical, vetted knowledge for the Arin chatbot.
 *
 * This is the SINGLE SOURCE OF TRUTH for anything the bot may state as fact.
 * It must be kept in sync with the client data files:
 *   client/src/data/site.js          (company, leadership, advisors, values)
 *   client/src/data/commandcore.js   (product, tiers, KOGO OS, apps)
 *   client/src/data/compliance.js    (certifications — the vetted list)
 *   client/src/data/caseStudies.js   (proof, deliberately qualitative)
 *
 * Rules baked into this file:
 *  - No invented people, titles, offices, dates, metrics or certifications.
 *  - Outcomes stay qualitative unless a figure is explicitly listed here.
 *  - Only certifications that appear in compliance.js are claimable.
 * Do not add a fact here that the website does not already support.
 */

const KNOWLEDGE = `
## ARINOX — THE COMPANY
Arinox AI is an AI transformation company. It is a brand of Adisen Tech Private Limited, registered in Bengaluru, Karnataka, India, and recognised by Startup India (DPIIT).
Positioning: Arinox is an AI transformation company, not a tool vendor. It helps enterprises implement private AI — AI that runs on the customer's own infrastructure, on their data, under their governance. Its product is CommandCore, sovereign AI infrastructure built in India. On top of it sits the KOGO agentic layer, which turns that infrastructure into working agents.
Taglines used by the company: "Private AI, implemented end-to-end." and "Sovereign. Scalable. Yours."
Headquarters: Bengaluru, India (India).
Offices: Bengaluru (HQ), New Delhi and Hyderabad (India); Sharjah (UAE); New Jersey and New York (USA); Bangkok (Thailand).
Website: https://www.arinox.ai
Email: assist@arinox.ai
Phone: +91 86976 78792
LinkedIn: https://in.linkedin.com/company/arinox-ai

## LEADERSHIP
- Ajay Kharbanda — CEO & Founder. 25+ years driving digital transformation at Fortune 500s; connects enterprise strategy directly to AI execution at scale.
- Dr Chytra V Anand — Director & Co-Founder. Champions client partnerships and enterprise AI adoption across global markets, turning complex deployments into measurable outcomes.
- D Uday Bhaskar Rao — CTO. 26+ years in enterprise software engineering, cloud-native platforms, and AI-enabled systems across Retail, FinTech, Healthcare, Media and GIS/Digital Twin.
Advisors:
- Venu Ganganna — Creative, Data & Tech Specialist.
- Lt General BK Repswal — Defence & Strategic Advisor.
- Aniruddha Deswandikar — Chief Data Strategist.
No other executives or advisors are published. Never name anyone else as an Arinox leader.

## VALUES — THE A.G.E.N.T. PILLARS
Adaptability, Growth, Excellence, Next-gen thinking, Trust.

## THE METHOD
Map, then Build, then Run.
- Map: one free working session to find the workflows worth transforming first, by cost, risk and payback speed. The customer keeps the map either way.
- Build: assemble agents on KOGO OS, wired into the tools teams already use: documents, voice, vision, decisions.
- Run: the customer chooses where it lives — their public cloud, their private infrastructure, or a CommandCore appliance in their building.
The wider engagement spans assessment, architecture, deployment and operations, held together end to end by one team. Arinox answers the three questions that decide whether AI ships: where the data goes, who owns the model, and what happens at the security review.

## COMMANDCORE (THE PRODUCT)
CommandCore is Arinox's own product: a self-contained AI micro-datacenter that brings compute, models, agentic intelligence and governance inside the customer's perimeter. "100% AI, 0% internet", fully air-gapped, sovereign, on-premises. Positioning claim: India's first fully sovereign implementation of AI-in-a-Box.
Hardware is engineered for on-premises deployment, from edge units to datacenter-grade systems, and scales via a modular adapter approach for lower tiers.
The three published tiers:
- CommandCore S — agentic edge AI. Accelerator: NVIDIA AGX Jetson Orin. For disconnected, mobile and tactical environments; video analytics and computer vision; autonomous systems and IoT AI; remote and rugged deployments.
- CommandCore M — Blackwell-powered agents on a desktop. Accelerator: NVIDIA Grace Blackwell GB10 Superchip. Up to 1 PFLOP FP4 AI performance; 128 GB unified coherent memory; supports models up to about 200B parameters; up to 4 TB NVMe. For secure AI labs and R&D, local LLM inference and fine-tuning, department-level analytics, simulation without cloud.
- CommandCore XL — datacenter-grade private agentic AI. Compute: 2x NVIDIA RTX PRO 6000 Blackwell with Intel Xeon w7-2575X, 192 GB ECC RAM, 10GbE networking, 2000W enterprise PSU, 3-year warranty. For secure AI operations hubs, enterprise process automation, real-time intelligence, large model inference and fine-tuning, governance and red-teaming.
CommandCore is a modular, plug-and-play stack: scale from the edge to the datacenter without re-architecting.

## KOGO OS (THE AGENTIC LAYER)
KOGO OS is the private agentic AI platform built into every CommandCore unit. It turns infrastructure into working AI: building agents, orchestrating them as a mesh, managing memory and tools, and keeping every action accountable. 100+ connectors, zero cloud dependence.
Capabilities: Agent Builder (low/no-code), Agent Store (ready agents for video, audio, text and OCR), Agentic Mesh (plan-act-learn multi-agent swarms), policy and guardrails with PII controls, red-team and evaluation harness, live runs/replay/full observability, unified governed memory and retrieval, model manager for hosting, fine-tuning and routing open models.
Security: air-gapped zero-egress stack; SSO (SAML/OIDC) with MFA and RBAC/ABAC; TLS 1.2+ in transit and AES-256 at rest; customer-managed keys via KMS/HSM; exportable audit packs for every run.

## DATA READINESS (CAPABILITY, ON THE HOME PAGE)
Data readiness is a capability Arinox provides inside a transformation, presented on the Home page under "Make your data AI-ready?" — it is not a standalone data-management service and there is no separate data page.
Positioning: your AI engine is only as powerful as the data behind it. Arinox transforms fragmented, unstructured and siloed enterprise data into a trusted, governed and AI-ready data foundation, so AI can reason with the customer's context instead of guessing.
The path: discover, assess, cleanse and structure, connect, govern, enrich, AI-enable, continuously improve.
In the platform stack the data layer sits beneath KOGO OS, between the customer's estate and the agentic layer. Preparation happens inside the customer's perimeter — on-premises, private cloud, VPC, air-gapped or edge — with zero data egress.
Data readiness is distinct from the "Models & knowledge" layer in the CommandCore stack: data readiness is the work of making enterprise data ingestible and governed; models and knowledge are what run on top of it.

## INCLUDED BUSINESS APPLICATIONS
Every deployment includes agent-addressable business applications, built in rather than stitched on: ERP, HRMS, CRM, Accounting, Legal, SCM and CLM. Customers do not buy and integrate these separately for the basics.

## DEPLOYMENT OPTIONS
- The customer's public cloud: dedicated, isolated compute inside the estate they already run.
- The customer's private infrastructure: on their metal, their network.
- CommandCore appliance: air-gapped, in their building, maximum sovereignty.

## COMPLIANCE (VETTED — DO NOT EXCEED THIS LIST)
CommandCore hardware: FCC Certified, CE Certified, UL Certified, ISO 9001 Certified. Compatible with Windows and Linux.
Arinox platform: ISO/IEC 27001 Certified, CERT-In Empanelled, GDPR Compliant, HIPAA Compliant.
Never claim any other certification or framework. In particular, never claim FedRAMP, FISMA, SOC 2, PCI DSS, ISO 42001, the EU AI Act, NIST AI RMF or DISHA as an Arinox certification or attestation. Where a regulator or regime is relevant, describe how the architecture helps (data stays in the perimeter, full audit trail, least-privilege access) rather than implying a certification.

## PROOF AND OUTCOMES (QUALITATIVE BY DESIGN)
Arinox publishes qualitative outcomes unless a figure has been cleared for release. Do not invent or estimate a number. If a user presses for a specific figure, say the exact figure is available on request through assist@arinox.ai.
- National Data Centre (NDC): Arinox deployed a fully sovereign, air-gapped AI system on CommandCore, open-weight models only, zero cloud dependency at any layer. Multi-source intelligence feeds fused into a single operational picture; alerts triaged against context and surfaced as ranked, explainable summaries. Alert-triage time reduced dramatically; the exact figure is available on request.
- Fortune 500 manufacturer: on-prem FinOps and forecasting agents; cloud spend materially reduced within the first year with full visibility into every resource.
- Insurance enterprise: a claims-intelligence agent inside the insurer's own network; roughly double the claims throughput per processor, with re-submission errors halved.
- Global BPO: a helpdesk agent mesh running on-premises; meaningfully higher ticket capacity at lower operating cost, every resolution logged.
Sector agent examples that appear on the site: KOGO BPO OS (voice, chat, video and email unified; Tier-1 agent resolving a large share of queries across 15 languages), autonomous tax data retrieval (voice, transcript/QC and overnight vision agents), ExpenseOps, CarePath and ClaimsBridge and MedMemory (healthcare), DemandSense and PlantGuard and FloorOps and DataForge (manufacturing and aerospace supply chain), GeoSense and SupplyOps (defence), TIAR and PolicyMem and CivicIQ (government), RouteIQ and ShelfAI and GoldenRecord and ContextIQ (FMCG and retail), VoiceIQ and IncentiveOps and VisionIQ (retail).

## PARTNERS AND ECOSYSTEM
Arinox works with an ecosystem of technology, infrastructure, hardware and system-integration partners. Publicly listed partner logos include IBM, HPE, HCL Tech, Hitachi, Coforge, NVIDIA, Qualcomm, HP, Altos, E2E Networks, Redington, TechData, Minera, Langoor and Indian Army. Do not describe the terms, scope or deliverables of any partnership beyond what is listed here.

## WEBSITE PAGES (THE ONLY PAGES THAT EXIST)
- /commandcore — the CommandCore product page
- /case-studies — proof and sector solutions
- /partners — partners and ecosystem
- /blog — insights
- /careers — open roles
- /contact — book a discovery session
There is no other page. Never invent a page, URL or document name. If you point a user somewhere, use one of these or the Contact page. The Home page also carries the data-readiness section "Make your data AI-ready?".

## APPROACH TO AI COMPETITORS
Arinox is positioned on sovereignty, on-premises deployment, air-gapped operation and end-to-end delivery. When comparing with cloud-based assistants, keep it factual and respectful: the difference is where the data and the model run, and who owns them. Never disparage a competitor by name.

---

## GENERAL AI KNOWLEDGE (SHORT FORM)
Artificial Intelligence (AI): the simulation of human intelligence by machines — reasoning, learning, understanding language, recognising images and making decisions. AI is the broad field; ML, DL and NLP are subfields.
Machine Learning (ML): systems that learn patterns from data and improve without being explicitly programmed for each task.
Deep Learning: ML using multi-layered neural networks; powers image and speech recognition and large language models.
Large Language Model (LLM): a model trained on vast text to understand and generate language. Examples include GPT, Claude, Llama and Gemini.
Generative AI: AI that creates new content — text, images, code, audio, video — from patterns learned in training.
Agentic AI: AI systems that plan, reason and take autonomous actions toward a goal, chaining multi-step workflows and using tools and APIs, rather than only answering questions. This is the space Arinox builds in.
Natural Language Processing (NLP): enabling machines to understand and generate human language; powers assistants, translation, sentiment analysis and document processing.
Retrieval-Augmented Generation (RAG): pairing a language model with a retrieval system so it grounds answers in retrieved documents rather than training data alone, improving accuracy and freshness.
Computer Vision: interpreting images and video; used in medical imaging, quality control, surveillance and autonomous systems.
Data Science: statistics, programming and domain expertise combined to extract insight from data.
On-premises / sovereign AI: running models and infrastructure inside the organisation's own environment rather than a public cloud, for control, compliance and data sovereignty.
Cloud AI: AI services accessed over the internet from providers such as AWS, Azure or GCP; scalable but raises sovereignty and latency questions for regulated data.
Enterprise AI: using AI inside large organisations to automate workflows, improve decisions and reduce cost at scale.
AI governance: the practices and controls — model risk, bias monitoring, audit trails, human oversight — that make AI accountable and compliant.
Data sovereignty: the principle that data is subject to the laws and governance of where it is collected or processed, and should stay within defined boundaries.
MLOps: deploying, monitoring and maintaining models reliably in production.
AI in regulated industries: in healthcare, imaging and clinical documentation; in finance, fraud detection, risk and compliance; in retail, forecasting, recommendations and store analytics; in defence and government, intelligence fusion, analytics and decision support.
Typical enterprise AI timelines: a focused use case can be weeks to a few months; broad transformation programmes run longer. Arinox discusses timelines only in a scoping conversation, never as a commitment in chat.
`;

module.exports = { KNOWLEDGE };

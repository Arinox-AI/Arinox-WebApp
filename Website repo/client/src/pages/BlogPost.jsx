import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';

import aksImg           from '../assets/9th Nov- AKS Workshop Global.jpeg';
import ansrImg          from '../assets/4th July - ANSR Tech Workshop_.jpg';
import nvidiaImg        from '../assets/26th June- Nvidia Workshop.jpg';
import hitachiImg       from '../assets/Hitachi_shori_2026.JPG';
import aiSummitImg      from '../assets/ai_summit.jpg';
import sovereignLaunchImg from '../assets/severign_launch.jpeg';
import hitachiSystemsImg  from '../assets/Hitachi_systems_event.jpeg';
import indianGovImg       from '../assets/IndianGov.jpeg';
import bharatDigitalImg   from '../assets/Bharat_digital_event.jpeg';

const AI_FINANCE_IMG   = 'https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?auto=format&fit=crop&w=800&q=80';
const SERVER_ROOM_IMG  = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80';
const FACTORY_AUTO_IMG = 'https://images.unsplash.com/photo-1647427060118-4911c9821b82?auto=format&fit=crop&w=800&q=80';

const samplePosts = [
  {
    slug: 'aks-workshop-global-sovereign-ai',
    title: 'AKS Workshop Global: Sovereign AI for Kubernetes-Native Enterprises',
    excerpt: 'Arinox AI joined global CIOs and cloud architects at the AKS Workshop Global to demonstrate how Kubernetes-native deployments can achieve full data sovereignty without sacrificing performance — using CommandCore™ as the on-premises AI substrate.',
    image: aksImg,
    author: { name: 'Arinox AI Team', role: 'Events & Innovation' },
    category: 'Events', domain: 'Enterprise AI', publishedAt: '2025-11-09', readTime: 5,
    body: [
      'At the AKS Workshop Global, enterprise CIOs and cloud architects gathered to tackle one of the most pressing questions in modern AI infrastructure: how do you maintain data sovereignty when your entire compute estate is built on Kubernetes? Arinox AI joined the event to demonstrate how CommandCore™ integrates natively with AKS cluster architectures — running frontier AI models directly inside enterprise-managed nodes, without routing inference workloads through public cloud endpoints.',
      'The live demonstration showed CommandCore orchestrating 70B-parameter models across an air-gapped AKS cluster, with RBAC controls, full audit logging, and zero data egress. For CIOs managing containerised environments, this represented a practical path to sovereign AI — layered on top of existing Kubernetes infrastructure they already operate and control, with no requirement to re-architect their platform or expose sensitive data to third-party APIs.',
      'Kubernetes-native sovereign AI is rapidly becoming a baseline enterprise requirement. Regulatory pressure across BFSI, healthcare, and defence is forcing organisations to demonstrate that AI inference — not just data storage — stays within jurisdictional boundaries. The AKS Workshop reinforced that the tooling to achieve this at scale is available today, not in a future roadmap.',
      'Do your own research: Kubernetes AI infrastructure decisions involve significant trade-offs across performance, compliance, and operational complexity. Review the CNCF (Cloud Native Computing Foundation) landscape, your cloud provider\'s data residency documentation, and applicable compliance frameworks (ISO 27001, SOC 2, sector-specific regulations) before finalising architecture decisions.',
    ],
  },
  {
    slug: 'ansr-tech-workshop-agentic-ai-gcc',
    title: 'ANSR Tech Workshop: Agentic AI Meets Global Capability Centre Operations',
    excerpt: 'At the ANSR Tech Workshop in July, Arinox AI explored how agentic AI systems are redefining the role of Global Capability Centres — shifting them from cost arbitrage hubs to autonomous intelligence factories.',
    image: ansrImg, imagePosition: 'center 35%',
    author: { name: 'Arinox AI Team', role: 'Events & Innovation' },
    category: 'Events', domain: 'GCC & Outsourcing', publishedAt: '2025-07-04', readTime: 6,
    body: [
      'The ANSR Tech Workshop in Bangalore brought together GCC leaders, enterprise transformation heads, and AI practitioners to explore a fundamental shift in how Global Capability Centres create value. Arinox AI presented a core thesis: GCCs are no longer cost arbitrage vehicles — they are becoming autonomous intelligence factories. The workshop showcased how CommandCore-powered agents, running entirely within the GCC\'s own infrastructure, can handle end-to-end operational workflows with minimal human intervention.',
      'Live demonstrations showed agentic workflows across finance, procurement, and customer operations — achieving 75–80% AI agent utilisation from day one, with full audit trail coverage on every decision. For GCC operators, the business case is clear: sovereign AI running on-premises eliminates per-token cloud costs, removes data governance risk, and positions the GCC to offer IP-protected AI services that cannot be replicated through shared public model access.',
      'The workshop also addressed the strategic repositioning that agentic AI enables for GCC organisations. When routine operations are handled autonomously, GCC talent shifts to higher-value work — AI oversight, model governance, and innovation delivery. This transforms the GCC\'s value proposition from headcount efficiency to intelligent capability, commanding higher margin and stronger strategic relevance within the enterprise.',
      'Do your own research: GCC AI adoption rates, automation outcomes, and ROI vary significantly by industry, geography, and organisational maturity. The performance figures cited reflect specific deployment contexts. Consult NASSCOM\'s GCC Council reports and independent analyst research (Everest Group, ISG) for sector-specific GCC AI benchmarks and transformation frameworks.',
    ],
  },
  {
    slug: 'nvidia-workshop-h100-enterprise-ai',
    title: 'NVIDIA Workshop: Unlocking H100 Performance for Enterprise Sovereign AI',
    excerpt: 'Arinox AI partnered with NVIDIA to showcase how CommandCore harnesses H100 GPU clusters for real-time, on-premises AI inference — delivering hyperscaler performance without hyperscaler dependency.',
    image: nvidiaImg,
    author: { name: 'Arinox AI Team', role: 'Events & Innovation' },
    category: 'Events', domain: 'Infrastructure', publishedAt: '2025-06-26', readTime: 6,
    body: [
      'The NVIDIA Workshop brought together Arinox AI, NVIDIA\'s enterprise team, and senior IT infrastructure leaders to address a practical question: how do you run H100-grade AI performance on-premises, with complete data sovereignty, and without the complexity that typically makes on-prem AI a multi-year project? CommandCore™ was the answer — an integrated sovereign AI platform pre-validated on NVIDIA H100 and Blackwell GPU hardware, designed for enterprise data centre deployment in days, not months.',
      'Live demonstrations running 70B and 405B parameter models on H100 GPU clusters showed sub-second inference latency, full network isolation, and zero token egress to external APIs. The results validated what enterprise AI teams have been searching for: frontier model performance on infrastructure they own, with the governance, audit coverage, and compliance controls that regulated industries demand. For organisations comparing on-prem sovereign AI against sustained hyperscaler spend, the TCO case is increasingly compelling at scale.',
      'NVIDIA\'s Blackwell architecture is reshaping the on-premises AI economics. With a single GB200 NVL72 rack delivering 1.4 exaFLOPS of AI compute, enterprises can now run the world\'s most capable foundation models on a footprint that fits in a standard data centre bay. The NVIDIA Workshop underlined that the hardware ecosystem for sovereign enterprise AI is no longer a prototype — it\'s production-ready and deployment-tested.',
      'Do your own research: GPU availability, pricing, and performance benchmarks change rapidly with each hardware generation. H100 and Blackwell allocations remain constrained in some markets. We recommend engaging with NVIDIA-certified partners and Arinox AI directly to validate current hardware availability, independently published inference benchmarks, and total cost of ownership models for your specific workload profile.',
    ],
  },
  {
    slug: 'hitachi-shori-2026-industrial-ai',
    title: 'Hitachi Shori 2026: Industrial Intelligence at the Sovereign Edge',
    excerpt: 'Arinox AI was featured at Hitachi Shori 2026 — an elite gathering of industrial leaders — to present how sovereign AI and agentic automation are transforming manufacturing, supply chain, and operational technology environments.',
    image: hitachiImg, imagePosition: 'top',
    author: { name: 'Arinox AI Team', role: 'Events & Innovation' },
    category: 'Events', domain: 'Industrial AI', publishedAt: '2026-05-07', readTime: 7,
    body: [
      'Hitachi Shori 2026 assembled an elite cohort of industrial and manufacturing leaders to explore the convergence of Industrial IoT, operational technology AI, and sovereign edge computing. Arinox AI was invited to demonstrate CommandCore™ in the context of OT environments — running AI agents directly at the plant floor, analysing real-time sensor data, predicting equipment failure, and coordinating supply chain responses, all within an air-gapped edge environment that meets the uptime and safety constraints of industrial operations.',
      'The demonstration addressed the specific challenges that make industrial AI different from commercial deployments: deterministic response times, safety-critical decision boundaries, and the absolute requirement that operational data — production recipes, quality specifications, equipment telemetry — never leaves the enterprise boundary. CommandCore\'s architecture supports both cloud-connected and fully air-gapped edge deployments, making it viable for manufacturing environments where external network access is prohibited or restricted.',
      'Industrial AI at the sovereign edge represents one of the highest-value frontiers for on-premises AI adoption. Manufacturers and logistics operators hold sensitive IP — process optimisation algorithms, yield improvement data, supplier relationships — that cannot be exposed to external cloud AI providers without significant competitive and regulatory risk. CommandCore\'s edge deployment model makes sovereign industrial intelligence practical today, without waiting for edge hardware roadmaps to mature further.',
      'Do your own research: Industrial AI deployments involve specific OT/IT integration challenges, functional safety standards (IEC 62443, ISO 13849, IEC 61508), and sector-specific compliance requirements. Performance outcomes in OT environments are highly contextual. We recommend engaging with certified industrial AI integration specialists and reviewing your sector\'s applicable safety and security standards before planning production deployments.',
    ],
  },
  {
    slug: 'nvidia-inception-ai-summit-2025',
    title: 'NVIDIA Inception AI Summit: Arinox Showcases Sovereign AI to Indian Defence & Enterprises',
    excerpt: 'At the NVIDIA Inception AI Summit, Arinox AI stood alongside India\'s defence leadership and enterprise innovators — demonstrating how CommandCore brings frontier AI to the most security-sensitive environments in the country.',
    image: aiSummitImg, imagePosition: 'center 25%',
    author: { name: 'Arinox AI Team', role: 'Events & Innovation' },
    category: 'Events', domain: 'Defence & Enterprise', publishedAt: '2026-02-18', readTime: 5,
    body: [
      'The NVIDIA Inception AI Summit is among India\'s most strategically significant AI gatherings — convening defence leadership, enterprise technology heads, and the global AI hardware ecosystem in a single forum. Arinox AI\'s presence at the summit reflected the company\'s positioning at the intersection of two critical national priorities: frontier AI capability and sovereign infrastructure for defence and high-security enterprise operations.',
      'At the Arinox booth, CommandCore™ was demonstrated handling defence-grade workloads — real-time intelligence correlation, multi-source data fusion, and classified document processing — running entirely within an air-gapped, on-premises environment with zero external network dependency. Conversations with defence and government attendees focused on a core architectural requirement: a system where the AI itself, not just the data, remains sovereign and auditable at every inference step.',
      'The summit marked a milestone for India\'s AI ecosystem: the convergence of global frontier model capability (NVIDIA GPU hardware and model ecosystem) with India-built sovereign deployment infrastructure (CommandCore). For India\'s defence and high-security enterprise sectors, this combination — world-class AI performance, entirely on Indian-controlled infrastructure — represents the architecture that national AI sovereignty demands.',
      'Do your own research: Defence AI procurement involves classification requirements, security clearances, and compliance frameworks that vary by organisation and jurisdiction. Capabilities described in open forums represent unclassified demonstrations only. We recommend consulting your organisation\'s security officer and the relevant defence procurement guidelines for operational deployment requirements.',
    ],
  },
  {
    slug: 'langoor-arinox-sovereign-ai-launch',
    title: 'Langoor & Arinox Launch Sovereign AI: Marketing Transforms Into Autonomous Execution',
    excerpt: 'In a landmark broadcast on AIM\'s Front Page, Langoor and Arinox AI announced the joint launch of a sovereign AI platform built for marketing intelligence — turning campaign strategy into fully autonomous, on-premises AI execution without a single token leaving the enterprise.',
    image: sovereignLaunchImg, imagePosition: 'center 25%',
    author: { name: 'Arinox AI Team', role: 'Events & Innovation' },
    category: 'Events', domain: 'Marketing AI', publishedAt: '2026-05-09', readTime: 5,
    body: [
      'Featured on Analytics India Magazine\'s Front Page segment, Langoor and Arinox AI jointly announced the commercial launch of a sovereign AI marketing intelligence platform — the first time a major Indian marketing agency has built autonomous campaign execution directly on private, on-premises AI infrastructure. The broadcast brought together Langoor\'s leadership and Arinox\'s AI team to walk through the platform\'s architecture, its commercial positioning, and the enterprise use cases it unlocks.',
      'The platform, powered by CommandCore™, runs Langoor\'s proprietary marketing agents entirely within the client\'s own environment. Campaign data — audience insights, creative performance metrics, spend attribution, and competitive intelligence — never leaves the enterprise boundary. AI agents handle everything from creative brief generation and audience segmentation to real-time bid optimisation, with full audit trails on every decision. For enterprise clients handling sensitive brand and customer data, this eliminates the governance risk of routing marketing intelligence through public model APIs.',
      'This partnership redefines what "AI-powered marketing" means at enterprise scale. Instead of sending proprietary audience data to shared cloud model endpoints, organisations can now run autonomous marketing workflows on infrastructure they control — with the same frontier model performance as public AI services, but with zero data exposure to third parties. The launch positions sovereign AI as a practical reality for the marketing and creative industries, not just defence and financial services.',
      'Do your own research: The sovereign AI landscape for marketing is evolving rapidly and capabilities differ across vendors. We encourage readers to explore independent analysis on AI data governance regulations, MeitY\'s data localisation guidelines, and to engage directly with Langoor and Arinox AI for current platform capabilities, integration requirements, and commercial terms.',
    ],
  },
  {
    slug: 'hitachi-systems-india-partnership',
    title: 'Hitachi Systems India: Expanding the Sovereign AI SI Network',
    excerpt: 'Arinox AI formalised a strategic partnership with Hitachi Systems India, extending CommandCore™ sovereign AI deployments into manufacturing, logistics, and government enterprise sectors through one of India\'s most trusted system integration networks.',
    image: hitachiSystemsImg,
    imagePosition: 'center 35%',
    author: { name: 'Arinox AI Team', role: 'Events & Innovation' },
    category: 'Events', domain: 'Enterprise AI', publishedAt: '2026-05-21', readTime: 4,
    body: [
      'Arinox AI\'s partnership with Hitachi Systems India marks a significant expansion of the CommandCore™ sovereign AI ecosystem. The collaboration brings together Arinox\'s on-premises AI platform with Hitachi Systems India\'s deep enterprise integration expertise — giving enterprise clients access to sovereign AI through a trusted infrastructure partner with decades of on-the-ground deployment experience across India\'s most demanding sectors.',
      'Hitachi Systems India operates across manufacturing, logistics, government, and financial services — precisely the sectors where data sovereignty and compliance are non-negotiable. By embedding CommandCore into Hitachi\'s delivery model, enterprises in these sectors can now deploy frontier AI agents within their own environments, with Hitachi Systems providing end-to-end services: hardware infrastructure procurement, system integration, agent configuration, and ongoing managed support. The partnership also accelerates Arinox\'s reach into Tier 2 and Tier 3 enterprise markets where Hitachi Systems has established long-standing client relationships.',
      'For enterprises that have relied on Hitachi Systems as a trusted IT infrastructure partner, the addition of CommandCore to the Hitachi delivery stack means sovereign AI is now accessible through a familiar, trusted channel — without requiring organisations to evaluate and onboard a new integration vendor from scratch. This dramatically reduces the adoption friction for on-premises AI in sectors that have traditionally been cautious about emerging technology vendors.',
      'Do your own research: SI partnership terms, deployment scope, service-level commitments, and available hardware configurations vary by project. We recommend engaging directly with both Arinox AI and Hitachi Systems India for current partnership details, verified reference deployments, and enterprise pricing. Always conduct independent due diligence before committing to infrastructure partnerships.',
    ],
  },
  {
    slug: 'government-engagement-sovereign-ai-india',
    title: 'Government Engagement: Sovereign AI Briefing for India\'s Public Sector',
    excerpt: 'Arinox AI engaged senior officials from India\'s central and state government agencies to present CommandCore™ as a sovereign AI platform for public sector digital transformation — with full data localisation, on-premises deployment, and compliance-ready agent governance.',
    image: indianGovImg,
    author: { name: 'Arinox AI Team', role: 'Events & Innovation' },
    category: 'Events', domain: 'Government & Defence', publishedAt: '2026-04-23', readTime: 5,
    body: [
      'Arinox AI conducted formal briefings with senior officials from Indian central and state government agencies, presenting CommandCore™ as a purpose-built sovereign AI platform for public sector digital transformation. The meeting brought together officials spanning digital transformation, IT policy, and departmental administration — exploring how AI-powered agents can streamline government operations while ensuring that all data processing remains within government-controlled infrastructure, under full government audit and oversight.',
      'The briefings focused on three requirements unique to government AI deployments: complete data localisation (all AI inference within government-owned or government-leased environments), granular audit coverage (every agent decision traceable and explainable for RTI compliance and internal governance), and seamless interoperability with existing government IT systems including NIC infrastructure, state data centres, and the India Stack digital public infrastructure layer. CommandCore was demonstrated handling document processing, citizen query routing, and policy compliance verification — all running offline, within a closed local network.',
      'India\'s government AI ambitions are substantial. The IndiaAI Mission, launched with ₹10,372 crore in approved funding, explicitly prioritises sovereign compute and on-premises AI for sensitive government workloads. Government AI procurement is also accelerating across state governments, with multiple states running AI pilot programmes in citizen services, agriculture advisory, and public safety. Arinox\'s engagement with government stakeholders positions CommandCore as a platform aligned with these national priorities.',
      'Do your own research: Government AI procurement in India is governed by GFR (General Financial Rules), CVC guidelines, and sector-specific policies. IndiaAI Mission allocations, eligibility criteria, and government technology priorities are subject to change. We encourage readers to consult official government portals (meity.gov.in, indiaai.gov.in) and formal tender documents for current, accurate procurement and policy information.',
    ],
  },
  {
    slug: 'bharat-digital-summit-bdia',
    title: 'Bharat Digital Summit: Arinox at BDIA\'s Foundation Forum for India\'s Digital Future',
    excerpt: 'Arinox AI joined India\'s leading technologists, policymakers, and enterprise leaders at the Bharat Digital Summit — BDIA\'s Foundation Forum — contributing to the roadmap for India\'s sovereign digital infrastructure and AI-first public services.',
    image: bharatDigitalImg, imagePosition: 'center 55%',
    author: { name: 'Arinox AI Team', role: 'Events & Innovation' },
    category: 'Events', domain: 'Digital Infrastructure', publishedAt: '2026-05-28', readTime: 4,
    body: [
      'The Bharat Digital Summit, organised by BDIA (Bharat Digital Infrastructure Alliance), brought together India\'s most influential voices in technology policy, enterprise AI, and digital public infrastructure at a high-profile Foundation Forum. The event convened policymakers, enterprise CIOs, sovereign AI infrastructure providers, and digital transformation leaders to align on India\'s technology roadmap — covering sovereign cloud, DPI (Digital Public Infrastructure), AI-first citizen services, and national compute capacity.',
      'Arinox AI participated as a featured contributor to the sovereign cloud and enterprise AI stream, presenting CommandCore™ as a deployment-ready platform for India\'s digital public infrastructure requirements. Key discussion themes included data sovereignty for DPI workloads, AI-powered citizen services running on government-controlled compute, and the role of private enterprise in building India\'s national AI capacity. CommandCore\'s air-gapped deployment architecture and 80+ pre-built agents drew particular interest from government digital transformation heads exploring on-premises alternatives to hyperscaler-dependent AI.',
      'The summit reinforced a clear consensus across participants: India\'s path to digital leadership requires sovereign infrastructure — compute, data storage, and AI inference that remain within Indian jurisdiction and under Indian governance. For enterprises and government bodies navigating this shift, the BDIA forum provided a rare platform to benchmark approaches, review emerging policy direction, and identify deployment-ready integration partners for India\'s sovereign AI stack.',
      'Do your own research: The Bharat Digital Summit and BDIA are industry-led initiatives whose proceedings and participant organisations evolve across editions. Summit outcomes are advisory, not binding. Readers should consult BDIA\'s official communications, MeitY policy publications, and India\'s National Data Governance Framework for current digital infrastructure policy and AI governance frameworks.',
    ],
  },
  {
    slug: 'beyond-offshoring-ai-shoring',
    title: 'Beyond Offshoring: The Macroeconomics of AI-Shoring',
    excerpt: 'Why CFOs will reclassify cloud savings as growth CAPEX — and how the 30-30-30 loop turns theory into cashflow in 90 days.',
    image: AI_FINANCE_IMG,
    author: { name: 'Praveer Kochhar', role: 'Co-Founder, KOGO AI' },
    category: 'AI Strategy', domain: 'General', publishedAt: '2025-05-01', readTime: 7,
    body: [
      'For three decades, offshoring was the enterprise CFO\'s primary lever for labour cost arbitrage. AI-shoring is the next evolution — and it operates on an entirely different economic logic. Where offshoring moved work to cheaper human labour, AI-shoring moves work to on-premises AI agents, converting recurring operational expenditure into a one-time infrastructure investment that compounds over time.',
      'The 30-30-30 loop is the framework we use to make this concrete: 30% cloud cost reduction in the first 30 days, reinvested into on-prem AI infrastructure over the next 30 days, generating measurable ROI within the 90-day window. In practice, this means deploying CommandCore agents on existing or procured GPU infrastructure, eliminating per-token cloud AI spend, and immediately redirecting that saving toward agent capability expansion and model fine-tuning.',
      'The macroeconomic case is compelling. At scale, the total cost of on-premises AI inference is 60–80% lower than equivalent sustained hyperscaler AI spend. For enterprises running thousands of AI inference calls per day — document processing, customer service, compliance review — this delta is measured in millions of dollars annually. CFOs who understand this are reclassifying AI infrastructure CAPEX as a growth investment, not an IT cost.',
      'Do your own research: The financial projections and savings estimates in this article are based on specific deployment scenarios and should not be taken as guaranteed outcomes. AI infrastructure economics vary significantly by workload type, volume, hardware generation, and negotiated cloud pricing. Commission an independent TCO analysis using your actual workload data before making infrastructure investment decisions.',
    ],
  },
  {
    slug: 'edge-to-core-ai',
    title: 'Edge-to-Core AI: Turning On-Prem HPC Into a Profit Center',
    excerpt: 'Inside a Tier-1 bank that flipped its dormant DGX cluster into an agent farm and paid off hardware amortisation two quarters early.',
    image: SERVER_ROOM_IMG,
    author: { name: 'P.N. Sudarshan', role: 'Global CTO, HPE' },
    category: 'Technology', domain: 'BFSI', publishedAt: '2025-04-20', readTime: 9,
    body: [
      'Most enterprise HPC clusters spend 60–70% of their operational life underutilised. For a major Tier-1 bank we worked with, a DGX A100 cluster — procured at significant capital expense for a risk modelling initiative — was running at less than 20% utilisation six months after deployment. The risk models were built. The hardware sat idle. The depreciation clock kept ticking.',
      'The intervention was straightforward: deploy CommandCore across the idle DGX nodes and redirect the available GPU capacity to AI agent workloads — document review, regulatory compliance checking, transaction anomaly detection, and customer query processing. Within 45 days, the cluster was running at 78% average utilisation. The AI agent workloads generated measurable cost savings against the alternative of cloud-based AI processing: $2.3M annualised, against a hardware amortisation schedule of $1.8M over the remaining asset life. The cluster went from cost centre to net positive within two quarters.',
      'The edge-to-core architecture that made this possible is straightforward: CommandCore agents running at the data centre core handle high-volume inference workloads, while lightweight edge nodes handle latency-sensitive operations at the branch or point-of-decision. This tiered architecture means the DGX cluster\'s capacity is always efficiently allocated — core agents handle batch processing and complex multi-step reasoning; edge agents handle real-time response with sub-100ms latency requirements.',
      'Do your own research: The financial outcomes described in this case study reflect a specific deployment context and should not be taken as indicative of typical results. GPU utilisation improvements, cost savings, and amortisation timelines vary significantly based on existing hardware, workload profiles, and organisational readiness. Commission independent infrastructure assessments before repositioning existing HPC assets for AI workloads.',
    ],
  },
  {
    slug: 'bpo-to-autonomous-ops',
    title: 'From BPO to Autonomous Ops: Building an Agent Factory',
    excerpt: 'A step-by-step walkthrough of how Coforge cut 40% ticket resolution time by roboshoring processes back to on-prem KOGO agents.',
    image: FACTORY_AUTO_IMG,
    author: { name: 'Nikhil Arora', role: 'SVP AI & Automation, Coforge' },
    category: 'Case Study', domain: 'Technology', publishedAt: '2025-04-10', readTime: 8,
    body: [
      'Coforge\'s IT helpdesk operation handles over 800,000 support tickets annually across its enterprise client base. Like most large BPO operations, the economics had been optimised through a combination of offshore labour and RPA automation — but ticket resolution times remained stubbornly high, with a 40% backlog on Tier 2 and Tier 3 issues that required contextual reasoning beyond what rule-based automation could handle. The agent factory approach changed this fundamentally.',
      'The deployment involved configuring KOGO agents — running on CommandCore™ infrastructure within Coforge\'s own data centre — to handle the full Tier 1 and Tier 2 ticket resolution workflow. Agents were trained on Coforge\'s internal knowledge base, client system documentation, and historical ticket resolution patterns. Within 30 days, 74% of Tier 1 tickets were resolved autonomously, without human intervention. Tier 2 resolution time dropped by 40%. Azure cloud AI processing costs fell by 28% as on-prem inference replaced cloud API calls for the majority of ticket processing.',
      'The agent factory model works because it separates routine execution from exception handling. KOGO agents handle the high-volume, pattern-matching work — password resets, access provisioning, known-issue resolution — while human agents focus exclusively on novel, complex, or escalated cases. This inversion of the human-to-AI ratio is what transforms a BPO into an autonomous operations centre: the same client SLA, with a fraction of the manual intervention.',
      'Do your own research: Automation outcomes in BPO and helpdesk environments vary significantly based on ticket complexity, knowledge base quality, and the maturity of existing automation infrastructure. The results described reflect Coforge\'s specific deployment context. We recommend reviewing independent analyst research on AI-powered ITSM automation (Gartner, Forrester, HDI benchmarks) before forecasting outcomes for your own operations.',
    ],
  },
];

const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const BlogPost = () => {
  const { slug } = useParams();
  const post = samplePosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-brand-muted text-lg">Post not found.</p>
        <Link to="/blog" className="text-brand-primary hover:underline text-sm">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${post.title} — Arinox AI`}
        description={post.excerpt}
        canonical={`https://www.arinox.ai/blog/${post.slug}`}
        type="article"
        image={typeof post.image === 'string' && post.image.startsWith('http') ? post.image : 'https://www.arinox.ai/og-image.jpg'}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          author: { '@type': post.author?.name === 'Arinox AI Team' ? 'Organization' : 'Person', name: post.author?.name || 'Arinox AI Team' },
          publisher: {
            '@type': 'Organization',
            name: 'Arinox AI',
            logo: { '@type': 'ImageObject', url: 'https://www.arinox.ai/logo.png' },
          },
          mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.arinox.ai/blog/${post.slug}` },
        }}
      />

      {/* Hero image */}
      <div className="w-full overflow-hidden" style={{ marginTop: '64px' }}>
        <div className="h-56 sm:h-72 md:h-96 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
          />
        </div>
      </div>

      <article className="container-wide px-4 sm:px-6 py-10 sm:py-14 max-w-3xl">

        {/* Back */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-brand-muted hover:text-brand-primary text-sm mb-6 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
            Back to Blog
          </Link>
        </motion.div>

        {/* Meta */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-semibold">{post.category}</span>
          {post.domain && <span className="text-[11px] text-brand-muted">{post.domain}</span>}
          <span className="text-[11px] text-brand-muted ml-auto">{formatDate(post.publishedAt)} · {post.readTime} min read</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-brand-text leading-tight mb-4"
        >
          {post.title}
        </motion.h1>

        {/* Author */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex items-center gap-3 mb-8 pb-8 border-b border-brand-border">
          <div className="w-9 h-9 rounded-full bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center text-brand-primary font-bold text-sm flex-shrink-0">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-text">{post.author.name}</p>
            <p className="text-xs text-brand-muted">{post.author.role}</p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-5">
          <p className="text-base sm:text-lg text-brand-muted leading-relaxed">{post.excerpt}</p>
          {post.body?.map((para, i) => (
            i === post.body.length - 1 ? (
              <div key={i} className="mt-8 pt-6 border-t border-brand-border">
                <p className="text-xs font-semibold text-brand-primary uppercase tracking-widest mb-2">Research Note</p>
                <p className="text-sm text-brand-muted/80 leading-relaxed italic">{para.replace(/^Do your own research:\s*/i, '')}</p>
              </div>
            ) : (
              <p key={i} className="text-sm sm:text-base text-brand-muted leading-relaxed">{para}</p>
            )
          ))}
        </motion.div>
      </article>
    </>
  );
};

export default BlogPost;

import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';

const Section = ({ title, children }) => (
  <div className="mb-12">
    <h2 className="mb-4 border-b border-line pb-2.5 font-display text-[20px] tracking-[-0.015em] text-ink">{title}</h2>
    <div className="space-y-3 text-[14.5px] leading-relaxed text-ink-soft">{children}</div>
  </div>
);

const Terms = () => (
  <>
    <SEO
      title="Terms of Service | Arinox AI"
      description="Terms and conditions governing use of Arinox AI's website and enterprise AI services."
      canonical="https://www.arinox.ai/terms"
    />

    <section className="px-7 pb-24 pt-20 md:pt-28">
      <div className="mx-auto max-w-3xl">

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="eyebrow mb-3 text-ember-deep">Legal</p>
          <h1 className="mb-3 font-display text-[40px] leading-[1.06] tracking-[-0.025em] text-ink md:text-[52px]">Terms of Service</h1>
          <p className="mb-2 text-[13.5px] text-ink-faint">Effective date: 1 January 2025 &nbsp;·&nbsp; Last updated: 18 September 2026</p>
          <p className="mb-10 text-[15.5px] leading-relaxed text-ink-soft">
            These Terms of Service ("Terms") govern your use of the website at
            <strong className="text-ink"> www.arinox.ai</strong> and any services provided by
            Adisen Tech Private Limited ("Arinox AI", "we", "our", or "us"), a company incorporated under the laws of India
            with its registered office in Bengaluru, Karnataka. By accessing this website or engaging our services,
            you agree to be bound by these Terms.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>

          <Section title="1. Acceptance of Terms">
            <p>By accessing or using our website, booking a demonstration, submitting an enquiry, or entering into any service agreement with Arinox AI, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.</p>
            <p>If you are using our services on behalf of an organisation, you represent that you have the authority to bind that organisation to these Terms. In that case, "you" refers to that organisation.</p>
            <p>If you do not agree to these Terms, please do not use our website or services.</p>
          </Section>

          <Section title="2. Services">
            <p>Arinox AI provides enterprise-grade sovereign AI solutions, including but not limited to:</p>
            <ul className="list-disc list-outside space-y-1 pl-5">
              <li><strong className="text-ink">CommandCore™:</strong> An on-premises, sovereign AI platform for large-scale enterprise deployments</li>
              <li><strong className="text-ink">KOGO OS:</strong> The private agentic operating system that builds, orchestrates and governs AI agents</li>
              <li><strong className="text-ink">AI Agents &amp; Automation:</strong> Purpose-built autonomous AI agents for enterprise workflows across BFSI, Healthcare, Defence, Manufacturing, Retail, and other sectors</li>
              <li><strong className="text-ink">Data readiness:</strong> Work that makes enterprise data discoverable, governed and usable by AI</li>
              <li><strong className="text-ink">Advisory &amp; Implementation:</strong> AI strategy consulting, system integration, and managed deployment services</li>
              <li><strong className="text-ink">Training &amp; Enablement:</strong> Workshops, technical training, and AI literacy programmes for enterprise teams</li>
            </ul>
            <p>The specific scope, deliverables, timelines, and commercial terms for any engagement are set out in a separate Statement of Work or Service Agreement signed by both parties. In the event of conflict between these Terms and a signed agreement, the signed agreement prevails.</p>
          </Section>

          <Section title="3. Intellectual Property">
            <p><strong className="text-ink">Arinox AI property:</strong> All content on this website   including text, graphics, logos, product names (including CommandCore™), software, and documentation   is the property of Adisen Tech Private Limited or its licensors and is protected by applicable Indian and international intellectual property laws.</p>
            <p><strong className="text-ink">Permitted use:</strong> You may access and view website content for your personal, non-commercial informational purposes. You may not reproduce, distribute, modify, create derivative works from, or commercially exploit any content without our prior written consent.</p>
            <p><strong className="text-ink">Your data:</strong> You retain all rights to data you provide to us or that is processed through our services. We acquire no ownership interest in your data by virtue of providing our services.</p>
            <p><strong className="text-ink">Feedback:</strong> If you provide us with suggestions, feedback, or ideas regarding our products or services, you grant us a perpetual, worldwide, royalty-free licence to use such feedback without any obligation to compensate you.</p>
            <p><strong className="text-ink">Third-party marks:</strong> Product names, company names and logos on this site that belong to others, including our partners, customers and technology providers, remain the property of their respective owners. We display them to identify the organisations we work with. Their presence does not imply any endorsement beyond the partnership or engagement described.</p>
          </Section>

          <Section title="4. Confidentiality">
            <p>Information disclosed by either party during commercial discussions, demonstrations, or engagements that is designated as confidential, or that would reasonably be understood to be confidential given its nature, will be treated as confidential information. Both parties agree not to disclose such information to third parties without prior written consent, except as required by law.</p>
            <p>Confidentiality obligations survive termination of any agreement between the parties for a period of three (3) years.</p>
          </Section>

          <Section title="5. Acceptable Use">
            <p>When using our website or services, you must not:</p>
            <ul className="list-disc list-outside space-y-1 pl-5">
              <li>Use our systems for any unlawful purpose or in violation of applicable Indian or international law</li>
              <li>Attempt to gain unauthorised access to any system, network, or data</li>
              <li>Transmit malware, viruses, or other harmful code</li>
              <li>Interfere with or disrupt the integrity or performance of our website or services</li>
              <li>Use automated means to scrape, crawl, or harvest content from our website</li>
              <li>Misrepresent your identity or affiliation when contacting us</li>
              <li>Reverse-engineer, decompile, or attempt to extract the source code of any Arinox AI software</li>
            </ul>
            <p>We reserve the right to suspend or terminate access to any user who violates these acceptable use provisions.</p>
          </Section>

          <Section title="6. Disclaimers">
            <p><strong className="text-ink">Website content:</strong> Information on this website is provided for general informational purposes only and does not constitute professional advice. We make reasonable efforts to ensure accuracy, but we make no warranties, express or implied, regarding completeness, accuracy, or fitness for a particular purpose.</p>
            <p><strong className="text-ink">AI outputs:</strong> Outputs generated by AI systems, including those powered by CommandCore™, are provided as-is. They may contain errors or inaccuracies. Enterprise customers are responsible for validating AI outputs before acting on them in business-critical contexts.</p>
            <p><strong className="text-ink">Website assistant:</strong> Replies from the chat assistant on this website are generated by AI, may be incomplete or wrong, and are not professional advice. Do not share confidential information with it, and confirm anything important with our team before relying on it.</p>
            <p><strong className="text-ink">Third-party links:</strong> Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or accuracy of any third-party site.</p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>To the maximum extent permitted by applicable Indian law, Adisen Tech Private Limited, its directors, employees, and affiliates shall not be liable for:</p>
            <ul className="list-disc list-outside space-y-1 pl-5">
              <li>Indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, business opportunity, or goodwill</li>
              <li>Losses arising from reliance on information on this website</li>
              <li>Interruption or unavailability of our website or services</li>
            </ul>
            <p>Our total aggregate liability for any claim arising under or in connection with these Terms or any service shall not exceed the amount paid by you to us in the three (3) months preceding the claim, or INR 10,000, whichever is greater.</p>
            <p>Nothing in these Terms excludes or limits liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be excluded by law.</p>
          </Section>

          <Section title="8. Indemnification">
            <p>You agree to indemnify and hold harmless Adisen Tech Private Limited and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including legal fees) arising out of or related to: (a) your use of our website or services in violation of these Terms; (b) your violation of applicable law; or (c) your infringement of any third-party rights.</p>
          </Section>

          <Section title="9. Governing Law and Dispute Resolution">
            <p>These Terms are governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka, India.</p>
            <p>Before initiating formal proceedings, both parties agree to attempt to resolve any dispute informally by contacting the other party and engaging in good-faith negotiations for a minimum period of 30 days.</p>
          </Section>

          <Section title="10. Changes to These Terms">
            <p>We may revise these Terms at any time by posting an updated version on this page. We will update the "Last updated" date when we make material changes. Continued use of our website or services after changes are posted constitutes your acceptance of the revised Terms.</p>
            <p>For significant changes, we may notify active customers by email with reasonable advance notice.</p>
          </Section>

          <Section title="11. Contact Us">
            <p>For questions about these Terms or to report a breach:</p>
            <div className="card-light mt-2 space-y-1 p-5">
              <p><strong className="text-ink">Contact</strong></p>
              <p>Adisen Tech Private Limited (Arinox AI)</p>
              <p>Bengaluru, Karnataka, India</p>
              <p>Email: <a href="mailto:assist@arinox.ai" className="text-ember-deep underline underline-offset-2 hover:text-ink">assist@arinox.ai</a></p>
            </div>
          </Section>

        </motion.div>
      </div>
    </section>
  </>
);

export default Terms;

import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';

const Section = ({ title, children }) => (
  <div className="mb-12">
    <h2 className="mb-4 border-b border-line pb-2.5 font-display text-[20px] tracking-[-0.015em] text-ink">{title}</h2>
    <div className="space-y-3 text-[14.5px] leading-relaxed text-ink-soft">{children}</div>
  </div>
);

const Privacy = () => (
  <>
    <SEO
      title="Privacy Policy | Arinox AI"
      description="How Arinox AI collects, uses, and protects your personal information."
      canonical="https://www.arinox.ai/privacy"
    />

    <section className="px-7 pb-24 pt-20 md:pt-28">
      <div className="mx-auto max-w-3xl">

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="eyebrow mb-3 text-ember-deep">Legal</p>
          <h1 className="mb-3 font-display text-[40px] leading-[1.06] tracking-[-0.025em] text-ink md:text-[52px]">Privacy Policy</h1>
          <p className="mb-2 text-[13.5px] text-ink-faint">Effective date: 1 January 2025 &nbsp;·&nbsp; Last updated: 16 September 2026</p>
          <p className="mb-10 text-[15.5px] leading-relaxed text-ink-soft">
            This Privacy Policy describes how Adisen Tech Private Limited ("Arinox AI", "we", "our", or "us"),
            registered in Bengaluru, India, collects, uses, and protects information when you visit
            <strong className="text-ink"> www.arinox.ai</strong> or engage with our services.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>

          <Section title="1. Information We Collect">
            <p><strong className="text-ink">A. Information you provide directly</strong></p>
            <ul className="list-disc list-outside space-y-1 pl-5">
              <li><strong className="text-ink">Contact & enquiry forms:</strong> Name, email address, phone number (optional), company name, job title, and the message you write to us</li>
              <li><strong className="text-ink">Book a demo / Book a free call:</strong> Name, business email, company name, and any scheduling preferences you share</li>
              <li><strong className="text-ink">Newsletter / update subscriptions:</strong> Email address and name (where provided)</li>
              <li><strong className="text-ink">Event registrations:</strong> Name, email, company, and event-specific details you submit via our registration forms</li>
              <li><strong className="text-ink">Chatbot conversations:</strong> Messages sent through our website chat assistant. These may be monitored, recorded, and used for service improvement, personalisation, and business purposes as described in this policy</li>
            </ul>

            <p className="pt-1"><strong className="text-ink">B. Data collected automatically when you visit our website</strong></p>
            <ul className="list-disc list-outside space-y-1 pl-5">
              <li><strong className="text-ink">Device & browser information:</strong> Browser type and version, operating system, device type (desktop / mobile / tablet), screen resolution, and language settings</li>
              <li><strong className="text-ink">Network information:</strong> Your IP address (used to determine approximate country/region for analytics; not stored in identifiable form beyond 90 days)</li>
              <li><strong className="text-ink">Page interaction data:</strong> Pages visited, time spent on each page, scroll depth, links clicked, and buttons interacted with</li>
              <li><strong className="text-ink">Referral data:</strong> The URL or search query that brought you to our site (e.g., Google, LinkedIn, a direct link)</li>
              <li><strong className="text-ink">Session data:</strong> Session duration, entry and exit pages, and navigation path through the site</li>
            </ul>

            <p className="pt-1"><strong className="text-ink">C. Cookies and tracking technologies</strong></p>
            <p>We do not set cookies on this website. We do not use advertising or marketing cookies, social tracking pixels, or cross-site tracking of any kind.</p>
            <p>We use Vercel Web Analytics to understand aggregate traffic to the site. It is cookieless: it does not place cookies, does not store personal data, does not fingerprint your device, and does not follow you across other websites. It records aggregate page views, referrers, and coarse device and country information only.</p>
            <p>Because we do not set cookies or use tracking that requires consent, no cookie consent banner is shown. You can block or disable analytics requests in your browser or with an ad blocker without affecting how the website works.</p>

            <p className="pt-1"><strong className="text-ink">D. What we do NOT collect</strong></p>
            <p>We do not collect, process, or store any data processed by CommandCore™ or other on-premises AI deployments. Our sovereign AI platform operates entirely within your own infrastructure   your operational data, AI prompts, model outputs, and business data never reach our systems or servers.</p>
            <p>We do not use session recording tools (e.g., Hotjar, FullStory) and do not capture keystrokes, form field contents before submission, or individual video recordings of browsing sessions.</p>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-outside space-y-1 pl-5">
              <li>Respond to your enquiries and provide the services you request</li>
              <li>Send you updates, newsletters, and product information where you have opted in</li>
              <li>Improve our website and understand how visitors engage with our content</li>
              <li>Comply with legal obligations under Indian law, including the Information Technology Act 2000 and the Digital Personal Data Protection Act 2023 (DPDP Act)</li>
              <li>Detect and prevent fraud, abuse, and security incidents</li>
            </ul>
            <p>We do not sell, rent, or trade your personal data to third parties for marketing purposes.</p>
          </Section>

          <Section title="3. Legal Basis for Processing">
            <p>We process your personal data on the following bases under the DPDP Act 2023 and applicable Indian law:</p>
            <ul className="list-disc list-outside space-y-1 pl-5">
              <li><strong className="text-ink">Consent:</strong> For marketing communications and non-essential cookies, where you have given explicit consent</li>
              <li><strong className="text-ink">Legitimate interest:</strong> For responding to enquiries, website security monitoring, and aggregate analytics</li>
              <li><strong className="text-ink">Legal obligation:</strong> Where processing is required to comply with applicable Indian law</li>
            </ul>
          </Section>

          <Section title="4. Data Sharing and Third Parties">
            <p>We share your personal data only in the following limited circumstances:</p>
            <ul className="list-disc list-outside space-y-1 pl-5">
              <li><strong className="text-ink">Service providers:</strong> Trusted vendors (hosting, email delivery, analytics) who process data on our behalf under contractual data processing agreements</li>
              <li><strong className="text-ink">Analytics:</strong> Vercel Inc. provides cookieless, aggregate website analytics. No personal data is shared with them</li>
              <li><strong className="text-ink">Legal requirements:</strong> Where required by Indian law, court order, or government authority</li>
            </ul>
            <p>We do not transfer your personal data outside India without appropriate safeguards as required by the DPDP Act 2023.</p>
          </Section>

          <Section title="5. Data Retention">
            <p>We retain personal data only as long as necessary for the purposes described in this policy:</p>
            <ul className="list-disc list-outside space-y-1 pl-5">
              <li>Contact form submissions: 3 years from date of submission</li>
              <li>Marketing opt-in data: Until you withdraw consent</li>
              <li>Server logs: 90 days</li>
              <li>Analytics data: aggregate and non-identifying (cookieless), retained by our analytics provider</li>
            </ul>
            <p>After the applicable retention period, data is securely deleted or anonymised.</p>
          </Section>

          <Section title="6. Your Rights">
            <p>Under the DPDP Act 2023 and applicable Indian law, you have the right to:</p>
            <ul className="list-disc list-outside space-y-1 pl-5">
              <li><strong className="text-ink">Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong className="text-ink">Correction:</strong> Request that inaccurate or incomplete data be corrected</li>
              <li><strong className="text-ink">Erasure:</strong> Request deletion of your personal data where there is no legitimate reason for continued processing</li>
              <li><strong className="text-ink">Withdraw consent:</strong> Where processing is based on consent, withdraw it at any time without affecting the lawfulness of prior processing</li>
              <li><strong className="text-ink">Grievance redressal:</strong> Lodge a complaint with our Data Protection Officer or the Data Protection Board of India</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href="mailto:assist@arinox.ai" className="text-ember-deep underline underline-offset-2 hover:text-ink">assist@arinox.ai</a>. We will respond within 30 days.</p>
          </Section>

          <Section title="7. Security">
            <p>We implement industry-standard technical and organisational measures to protect your personal data against unauthorised access, disclosure, alteration, or destruction. These include TLS encryption in transit, access controls, and regular security reviews.</p>
            <p>No method of transmission over the internet is 100% secure. If you believe your data has been compromised, contact us immediately at <a href="mailto:assist@arinox.ai" className="text-ember-deep underline underline-offset-2 hover:text-ink">assist@arinox.ai</a>.</p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>Our website and services are not directed at individuals under the age of 18. We do not knowingly collect personal data from minors. If you become aware that a minor has provided us with personal data, please contact us so we can delete it.</p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. When we make material changes, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically. Continued use of our website after changes are posted constitutes acceptance of the updated policy.</p>
          </Section>

          <Section title="10. Contact Us">
            <p>For privacy-related enquiries, requests, or complaints:</p>
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

export default Privacy;

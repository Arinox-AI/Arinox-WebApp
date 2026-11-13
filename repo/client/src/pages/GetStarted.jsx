import SEO from '../components/ui/SEO'
import { ClientIntake } from '../components/site/ClientIntake'

/* /get-started: the ten-question client intake on its own page
   (formerly /pricing/discovery, which now redirects here). */
const GetStarted = () => (
  <>
    <SEO
      title="Get Started: Tell Us About Your Business | Arinox AI"
      description="The Arinox client survey: ten quick questions before your meeting, so our architects arrive already knowing your teams, systems, data and goals. About 4 minutes."
      canonical="https://www.arinox.ai/get-started"
    />
    <div className="pt-6 md:pt-10">
      <ClientIntake headingLevel="h1" />
    </div>
  </>
)

export default GetStarted

import { useSearchParams } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import { ClientIntake } from '../components/site/ClientIntake'
import { ContactDetails } from '../components/site/ContactDetails'

/* /get-started: one journey - your business, who you are, your call.
   Deep links: ?start=roadmap|message|book, ?intent=deck|pricing|partnership
   [&asset=key]. A change of query string restarts the flow (key={search}).
   The Offices + Direct block sits below it.
   (/pricing/discovery, /survey and /contact all land here.) */
const GetStarted = () => {
  const [params] = useSearchParams()
  const key = params.toString()
  return (
    <>
      <SEO
        title="Get Started: Tell Us About Your Business | Arinox AI"
        description="Get your AI roadmap: ten quick questions about your business, a few details, and an optional 30-minute call, so our architects arrive already knowing your teams, systems, data and goals."
        canonical="https://www.arinox.ai/get-started"
      />
      <div className="pt-6 md:pt-10">
        <ClientIntake
          key={key}
          headingLevel="h1"
          start={params.get('start')}
          intent={params.get('intent')}
          asset={params.get('asset')}
          alreadyBooked={params.get('booked') === '1'}
        />
      </div>
      <ContactDetails />
    </>
  )
}

export default GetStarted

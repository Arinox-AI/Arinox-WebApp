import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'Arinox AI — Transforming Enterprises Through Strategic AI Systems',
  description = 'Arinox AI delivers sovereign, private AI infrastructure and intelligent agents for enterprises across BFSI, Healthcare, Manufacturing, Defense, and Government.',
  canonical = 'https://www.arinox.ai',
  image = 'https://www.arinox.ai/og-image.jpg',
  type = 'website',
  keywords = 'sovereign AI, enterprise AI, on-premises AI, CommandCore, AI agents, private AI infrastructure, BFSI AI, defence AI, government AI, India AI platform',
  jsonLd,
}) => {
  const fullTitle = title.includes('Arinox') ? title : `${title} | Arinox AI`;

  const defaultJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Arinox AI',
    legalName: 'Adisen Tech Private Limited',
    url: 'https://www.arinox.ai',
    logo: 'https://www.arinox.ai/logo.png',
    description,
    foundingDate: '2022',
    sameAs: [
      'https://www.linkedin.com/company/arinox-ai',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'assist@arinox.ai',
      availableLanguage: 'English',
    },
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Arinox AI" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content="Arinox AI" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ArinoxAI" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd || defaultJsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;

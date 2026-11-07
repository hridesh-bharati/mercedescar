// src/app/about-us/page.jsx
import { Suspense } from 'react';
import AboutClient from './AboutClient';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mercedesgaragedubai.com';
const SITE_NAME = 'Mercedes Garage Dubai';

export const metadata = {
  title: 'About Mercedes Garage Dubai | Al Quoz Workshop',
  description:
    'Learn about Mercedes Garage Dubai — a specialist Mercedes-Benz workshop in Al Quoz, Dubai. Certified technicians, genuine parts and dealer-level diagnostics.',
  alternates: {
    canonical: `${SITE_URL}/about-us`,
  },
  openGraph: {
    title: 'About Mercedes Garage Dubai | Al Quoz Workshop',
    description:
      'Specialist Mercedes-Benz workshop in Al Quoz, Dubai. Certified technicians, genuine parts and dealer-level diagnostics.',
    url: `${SITE_URL}/about-us`,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/images/og-about.png`,
        width: 1200,
        height: 630,
        alt: 'Mercedes Garage Dubai — Al Quoz Workshop',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Mercedes Garage Dubai | Al Quoz Workshop',
    description:
      'Specialist Mercedes-Benz workshop in Al Quoz, Dubai.',
    images: [`${SITE_URL}/images/og-about.png`],
  },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    q: 'Where is Mercedes Garage Dubai located?',
    a: 'We are located at Warehouse #S2, Al Quoz 20C Street, Industrial Area 2, Dubai, UAE. Our workshop is open Monday to Saturday, 9am to 8pm.',
  },
  {
    q: 'Do you only service Mercedes-Benz vehicles?',
    a: 'Yes. We are a Mercedes-Benz specialist workshop in Dubai. Our technicians focus exclusively on Mercedes-Benz and AMG repair, maintenance and modification.',
  },
  {
    q: 'How long have you been servicing Mercedes-Benz in Dubai?',
    a: 'Our team has over 15 years of collective experience working on Mercedes-Benz vehicles in Dubai, using dealer-level XENTRY diagnostics and genuine parts.',
  },
  {
    q: 'Do you offer body kits, facelift conversions and custom upgrades?',
    a: 'Yes. We install Mercedes AMG body kits, G63 wide-body kits, W205 to W206 and W213 facelift conversions, and custom Mercedes upgrades at our Al Quoz workshop.',
  },
];

export default function AboutPage() {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: 'Mercedes Garage Dubai',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    telephone: '+971567888808',
    email: 'info@mercedesgaragedubai.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Warehouse #S2, Al Quoz 20C Street Industrial Area 2',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.1321,
      longitude: 55.2352,
    },
    areaServed: [
      { '@type': 'City', name: 'Dubai' },
      { '@type': 'Place', name: 'Al Quoz' },
    ],
  };

  const aboutPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Mercedes Garage Dubai',
    description:
      'Specialist Mercedes-Benz workshop in Al Quoz, Dubai — certified technicians, genuine parts and dealer-level diagnostics.',
    url: `${SITE_URL}/about-us`,
    mainEntity: { '@id': `${SITE_URL}/#organization` },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About Us',
        item: `${SITE_URL}/about-us`,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationJsonLd,
            aboutPageJsonLd,
            breadcrumbJsonLd,
            faqJsonLd,
          ]),
        }}
      />
      <Suspense fallback={null}>
        <AboutClient faqs={faqs} />
      </Suspense>
    </>
  );
}

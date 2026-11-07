// src/app/case/layout.jsx
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mercedesgaragedubai.com/';
const SITE_NAME = 'Mercedes Garage Dubai';

export const metadata = {
  title: 'Mercedes-Benz Case Studies in Dubai | Mercedes Garage',
  description:
    'Explore real Mercedes-Benz repair, body kit and facelift projects from our Al Quoz, Dubai workshop. See engine repair, AMG upgrades and diagnostics in action.',
  alternates: { canonical: `${SITE_URL}/case` },
  openGraph: {
    title: 'Mercedes-Benz Case Studies in Dubai | Mercedes Garage',
    description:
      'Real Mercedes-Benz repair, body kit and facelift projects from our Al Quoz, Dubai workshop.',
    url: `${SITE_URL}/case`,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/images/og-cases.png`,
        width: 1200,
        height: 630,
        alt: 'Mercedes Garage Dubai Case Studies',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercedes-Benz Case Studies in Dubai',
    description:
      'Real Mercedes-Benz repair and upgrade projects from our Al Quoz workshop.',
    images: [`${SITE_URL}/images/og-cases.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function CaseLayout({ children }) {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Case Studies',
        item: `${SITE_URL}/case`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}


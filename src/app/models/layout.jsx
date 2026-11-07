// src/app/models/layout.jsx
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mercedesgaragedubai.com/';
const SITE_NAME = 'Mercedes Garage Dubai';

export const metadata = {
  title: 'Mercedes-Benz Models Service Dubai | Mercedes Garage',
  description:
    'Browse our Mercedes-Benz model catalog — G-Class, S-Class, C-Class, AMG, GLE, GLC and more. Specialist Mercedes service in Al Quoz, Dubai.',
  alternates: { canonical: `${SITE_URL}/models` },
  openGraph: {
    title: 'Mercedes-Benz Models Service Dubai | Mercedes Garage',
    description:
      'Specialist Mercedes-Benz service for every model — G-Class, S-Class, C-Class, AMG, GLE, GLC and more in Al Quoz, Dubai.',
    url: `${SITE_URL}/models`,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/images/og-models.png`,
        width: 1200,
        height: 630,
        alt: 'Mercedes-Benz Models — Mercedes Garage Dubai',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercedes-Benz Models Service Dubai | Mercedes Garage',
    description:
      'Specialist Mercedes service for every model in Al Quoz, Dubai.',
    images: [`${SITE_URL}/images/og-models.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function ModelsLayout({ children }) {
  return children;
}


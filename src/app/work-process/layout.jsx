// src/app/work-process/layout.jsx
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mercedesgaragedubai.com';
const SITE_NAME = 'Mercedes Garage Dubai';

export const metadata = {
  title: 'Mercedes Work Process Dubai | 4-Step Repair Method',
  description:
    'See our 4-step Mercedes-Benz repair process at our Al Quoz, Dubai workshop — XENTRY diagnosis, detailed estimate, quality control and final road test.',
  alternates: { canonical: `${SITE_URL}/work-process` },
  openGraph: {
    title: 'Mercedes Work Process Dubai | 4-Step Repair Method',
    description:
      'See our 4-step Mercedes-Benz repair process — diagnosis, estimate, QC and final delivery.',
    url: `${SITE_URL}/work-process`,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/images/og-work-process.png`,
        width: 1200,
        height: 630,
        alt: 'Mercedes Garage Dubai Work Process',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercedes Work Process Dubai | 4-Step Repair Method',
    description:
      'Our 4-step Mercedes repair process from Al Quoz, Dubai.',
    images: [`${SITE_URL}/images/og-work-process.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

export default function WorkProcessLayout({ children }) {
  return children;
}

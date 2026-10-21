// src/app/layout.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import Script from 'next/script';
import './globals.css';
import CursorFollower from '@/components/layout/CursorFollower';

export const metadata = {
  title: 'Mercedes Garage Dubai | Luxury Car Repair & Maintenance',
  description:
    'Expert luxury car service, repair, diagnostics, and maintenance in Al Quoz, Dubai. Certified mechanics and genuine parts.',
  keywords:
    'Mercedes repair Dubai, Mercedes garage Al Quoz, luxury car service Dubai, auto workshop Dubai',
  openGraph: {
    title: 'Mercedes Garage Dubai | Luxury Car Repair & Maintenance',
    description:
      'Expert Mercedes repair, engine diagnostics, and maintenance in Al Quoz, Dubai.',
    url: 'https://mercedesgaragedubai.com',
    siteName: 'Mercedes Garage Dubai',
    images: [
      {
        url: 'https://mercedesgaragedubai.com/images/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'Mercedes Garage Dubai Workshop',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercedes Garage Dubai | Luxury Car Repair',
    description: 'Expert luxury car service and repair in Al Quoz, Dubai.',
    images: ['https://mercedesgaragedubai.com/images/og-banner.png'],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: 'Mercedes Garage Dubai',
    image: 'https://mercedesgaragedubai.com/images/logo.png',
    url: 'https://mercedesgaragedubai.com',
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
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '08:00',
      closes: '20:00',
    },
    priceRange: '$$',
  };

  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="81DlaGd_JjkgQ3rqAKKiqknev76jOg2BovWV-qkUObk"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <CursorFollower />
        {children}

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
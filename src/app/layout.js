
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

import { Suspense } from 'react';
import Script from 'next/script';

import ScrollToTop from '@/components/layout/ScrollToTop';
import ScrollAnimProvider from '@/components/providers/ScrollAnimProvider';
import AnalyticsTracker from '@/components/AnalyticsTracker';

const GA_ID = 'G-RQ0CSJVTBG';

export const metadata = {
  metadataBase: new URL('https://www.mercedesgaragedubai.com'),

  title: {
    template: '%s | Mercedes Garage Dubai',
    default: 'Mercedes Garage Dubai | Mercedes-Benz Specialist Workshop',
  },

  description:
    'Looking for a Mercedes-Benz garage in Dubai? Specialist Mercedes repair, servicing, diagnostics and maintenance in Al Quoz. Contact our expert team today.',

  keywords: [
    'Mercedes Garage Dubai',
    'Mercedes Workshop Dubai',
    'Mercedes Repair Dubai',
    'Mercedes Service Dubai',
    'Mercedes Maintenance Dubai',
    'Mercedes Specialist Dubai',
    'Mercedes Mechanic Dubai',
    'Mercedes Garage Al Quoz',
    'Mercedes body kits Dubai',
    'AMG body kits Dubai',
    'Mercedes facelift Dubai',
    'luxury car workshop Al Quoz',
  ],

  manifest: '/manifest.json',

  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mercedes Garage Dubai',
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  openGraph: {
    title: 'Mercedes-Benz Specialist Workshop in Al Quoz',
    description:
      'Specialist Mercedes repair, servicing, diagnostics and maintenance in Al Quoz, Dubai.',
    url: 'https://www.mercedesgaragedubai.com',
    siteName: 'Mercedes Garage Dubai',
    images: [
      {
        url: 'https://www.mercedesgaragedubai.com/images/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'Mercedes Garage Dubai Workshop in Al Quoz',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Mercedes-Benz Specialist Workshop in Al Quoz',
    description:
      'Specialist Mercedes repair, servicing and diagnostics in Al Quoz, Dubai.',
    images: [
      'https://www.mercedesgaragedubai.com/images/og-banner.png',
    ],
  },

  verification: {
    google: '81DlaGd_JjkgQ3rqAKKiqknev76jOg2BovWV-qkUObk',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': 'https://www.mercedesgaragedubai.com/#business',
    name: 'Mercedes Garage Dubai',
    alternateName: 'German Auto Expert',
    image: 'https://www.mercedesgaragedubai.com/images/logo.png',
    url: 'https://www.mercedesgaragedubai.com',
    telephone: '+971567888808',
    email: 'info@mercedesgaragedubai.com',

    address: {
      '@type': 'PostalAddress',
      streetAddress:
        'Warehouse #S2, Al Quoz 20C Street Industrial Area 2',
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
      ],
      opens: '09:00',
      closes: '20:00',
    },

    priceRange: '$$',

    areaServed: [
      { '@type': 'City', name: 'Dubai' },
      { '@type': 'Place', name: 'Al Quoz' },
    ],

    sameAs: [
      'https://www.facebook.com/mercedesgaragedubai',
      'https://www.instagram.com/mercedesgaragedubai',
    ],
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];

            window.gtag = function() {
              window.dataLayer.push(arguments);
            };

            window.gtag('js', new Date());

            window.gtag('config', '${GA_ID}', {
              send_page_view: false
            });
          `}
        </Script>

        {/* Business Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>

      <body suppressHydrationWarning={true}>
        {/* Analytics Route & Click Tracking */}
        <Suspense fallback={null}>
          <AnalyticsTracker gaId={GA_ID} />
        </Suspense>

        <ScrollAnimProvider>
          {children}
        </ScrollAnimProvider>

        <ScrollToTop />
      </body>
    </html>
  );
}

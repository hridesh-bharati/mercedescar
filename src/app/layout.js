// src/app/layout.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { Suspense } from 'react';
import Script from 'next/script';
import ScrollToTop from '@/components/layout/ScrollToTop';
import ScrollAnimProvider from '@/components/providers/ScrollAnimProvider';
import AnalyticsTracker from '@/components/AnalyticsTracker';

const GA_ID = 'G-RQ0CSJVTBG';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mercedesgaragedubai.com';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Mercedes Garage Dubai',
    default: 'Mercedes Garage Dubai | Specialist Workshop', // 46 chars
  },
  description: 'Specialist Mercedes repair, servicing, diagnostics and maintenance in Al Quoz, Dubai. Contact our expert team today.', // 123 chars
  keywords: [
    'Mercedes garage', 'Mercedes workshop', 'Mercedes repair',
    'Mercedes service', 'Mercedes maintenance', 'Mercedes specialist',
    'Mercedes mechanic', 'Mercedes technician', 'Mercedes Garage Dubai'
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
    description: 'Specialist Mercedes repair, servicing, diagnostics and maintenance in Al Quoz, Dubai.',
    url: SITE_URL,
    siteName: 'Mercedes Garage Dubai',
    images: [{ url: `${SITE_URL}/images/og-banner.png`, width: 1200, height: 630, alt: 'Mercedes Garage Dubai' }],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercedes-Benz Specialist Workshop in Al Quoz',
    description: 'Specialist Mercedes repair, servicing and diagnostics in Al Quoz, Dubai.',
    images: [`${SITE_URL}/images/og-banner.png`],
  },
  verification: {
    google: '81DlaGd_JjkgQ3rqAKKiqknev76jOg2BovWV-qkUObk',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${SITE_URL}/#business`,
    name: 'Mercedes Garage Dubai',
    alternateName: 'German Auto Expert',
    image: `${SITE_URL}/images/logo.png`,
    url: SITE_URL,
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
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { send_page_view: false });
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning={true}>
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
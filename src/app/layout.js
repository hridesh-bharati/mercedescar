// src/app/layout.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import Script from 'next/script';
import './globals.css';
import ScrollToTop from '@/components/layout/ScrollToTop';
import ScrollAnimProvider from '@/components/providers/ScrollAnimProvider';

export const metadata = {
  metadataBase: new URL('https://mercedesgaragedubai.com'),
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
    title: 'Mercedes Garage Dubai | Mercedes-Benz Specialist Workshop',
    description:
      'Specialist Mercedes repair, servicing, diagnostics and maintenance in Al Quoz, Dubai.',
    url: 'https://mercedesgaragedubai.com',
    siteName: 'Mercedes Garage Dubai',
    images: [
      {
        url: 'https://mercedesgaragedubai.com/images/og-banner.png',
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
    title: 'Mercedes Garage Dubai | Mercedes-Benz Specialist Workshop',
    description:
      'Specialist Mercedes repair, servicing and diagnostics in Al Quoz, Dubai.',
    images: ['https://mercedesgaragedubai.com/images/og-banner.png'],
  },
  verification: {
    google: '81DlaGd_JjkgQ3rqAKKiqknev76jOg2BovWV-qkUObk',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': 'https://mercedesgaragedubai.com/#business',
    name: 'Mercedes Garage Dubai',
    alternateName: 'German Auto Expert',
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
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '20:00',
    },
    priceRange: '$$',
    areaServed: [
      { '@type': 'City', name: 'Dubai' },
      { '@type': 'Place', name: 'Al Quoz' },
    ],
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <ScrollAnimProvider>{children}</ScrollAnimProvider>
        <ScrollToTop />
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
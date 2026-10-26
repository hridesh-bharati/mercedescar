// src/app/layout.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import Script from 'next/script';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://mercedesgaragedubai.com'),
  title: {
    template: '%s | German Auto Expert Dubai',
    default: 'German Auto Expert | Luxury Car Repair & Maintenance Dubai',
  },
  description:
    'Expert luxury car service, repair, diagnostics, and maintenance in Al Quoz, Dubai. Certified mechanics and genuine parts for German vehicles.',
  keywords: [
    'German Auto Expert',
    'Mercedes repair Dubai',
    'BMW repair Dubai',
    'Audi service Dubai',
    'luxury car workshop Al Quoz',
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'GERMAN AUTO EXPERT',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'German Auto Expert | Luxury Car Repair & Maintenance',
    description: 'Expert luxury car service, engine diagnostics, and maintenance in Al Quoz, Dubai.',
    url: 'https://mercedesgaragedubai.com',
    siteName: 'German Auto Expert',
    images: [
      {
        url: 'https://mercedesgaragedubai.com/images/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'German Auto Expert Workshop Dubai',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'German Auto Expert | Luxury Car Repair',
    description: 'Expert luxury car service and repair in Al Quoz, Dubai.',
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
    name: 'German Auto Expert',
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
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00',
    },
    priceRange: '$$',
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
        {children}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
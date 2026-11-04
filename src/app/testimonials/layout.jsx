// src/app/testimonials/layout.jsx
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://mercedesgaragedubai.com';
const SITE_NAME = 'Mercedes Garage Dubai';

export const metadata = {
  title: 'Mercedes Garage Dubai Reviews | Client Testimonials',
  description:
    'Read real reviews from Mercedes-Benz owners in Dubai. Engine diagnostics, AMG servicing, G-Class repair and maintenance at our Al Quoz workshop.',
  alternates: { canonical: `${SITE_URL}/testimonials` },
  openGraph: {
    title: 'Mercedes Garage Dubai Reviews | Client Testimonials',
    description:
      'Real reviews from Mercedes-Benz owners in Dubai. Specialist servicing at our Al Quoz workshop.',
    url: `${SITE_URL}/testimonials`,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/images/og-testimonials.png`,
        width: 1200,
        height: 630,
        alt: 'Mercedes Garage Dubai — Client Testimonials',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercedes Garage Dubai Reviews | Client Testimonials',
    description:
      'Real reviews from Mercedes-Benz owners in Dubai.',
    images: [`${SITE_URL}/images/og-testimonials.png`],
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

export default function TestimonialsLayout({ children }) {
  return children;
}
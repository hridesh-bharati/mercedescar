// src/app/gallery/page.jsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Gallery from '@/components/Gallery';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://mercedesgaragedubai.com';

export const metadata = {
  title: 'Mercedes Workshop Gallery Dubai | Mercedes Garage',
  description:
    'Explore our Mercedes-Benz workshop gallery in Al Quoz, Dubai. See our facility, AMG projects, engine repairs, body kits and facelift conversions.',
  alternates: { canonical: `${SITE_URL}/gallery` },
  openGraph: {
    title: 'Mercedes Workshop Gallery Dubai | Mercedes Garage',
    description:
      'Inside our Mercedes-Benz workshop in Al Quoz, Dubai — AMG projects, repairs and upgrades.',
    url: `${SITE_URL}/gallery`,
    siteName: 'Mercedes Garage Dubai',
    images: [
      {
        url: `${SITE_URL}/images/og-gallery.png`,
        width: 1200,
        height: 630,
        alt: 'Mercedes Garage Dubai Workshop Gallery',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercedes Workshop Gallery Dubai',
    description:
      'Inside our Mercedes-Benz workshop in Al Quoz, Dubai.',
    images: [`${SITE_URL}/images/og-gallery.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function GalleryPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Gallery',
        item: `${SITE_URL}/gallery`,
      },
    ],
  };

  const galleryJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Mercedes Garage Dubai Workshop Gallery',
    description:
      'Photos of Mercedes-Benz projects, AMG upgrades and workshop facility in Al Quoz, Dubai.',
    url: `${SITE_URL}/gallery`,
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#business`,
      name: 'Mercedes Garage Dubai',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, galleryJsonLd]),
        }}
      />
      <Header />
      <Gallery />
      <Footer />
    </>
  );
}

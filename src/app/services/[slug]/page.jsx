// src/app/services/[slug]/page.jsx
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { dbService } from '@/services/dbService';
import ServiceLandingClient from './ServiceDetailClient';

const SITE_URL = 'https://mercedesgaragedubai.com';
const SITE_NAME = 'German Auto Expert';

const PAGE_CONFIG = {
  'mercedes-body-kits-dubai': {
    title: 'Mercedes Body Kits in Dubai',
    metaTitle: 'Mercedes Body Kits Dubai | AMG Styling | German Auto Expert',
    metaDescription:
      'Explore Mercedes-Benz AMG body kits, exterior styling and custom body kit installations in Al Quoz, Dubai.',
    heading: 'Mercedes-Benz Body Kits in Dubai',
    intro:
      'Upgrade your Mercedes-Benz exterior with AMG-inspired body kits and custom styling options at German Auto Expert in Al Quoz, Dubai.',
    keywords: [
      'Mercedes body kits Dubai',
      'Mercedes AMG body kit Dubai',
      'Mercedes exterior styling Dubai',
      'Mercedes custom body kits Al Quoz',
    ],
    match: [
      'body kit',
      'body kits',
      'amg kit',
      'amg body',
      'widebody',
      'exterior styling',
      'front bumper',
      'rear bumper',
      'side skirt',
    ],
    sections: [
      {
        heading: 'Mercedes AMG Body Kits',
        description:
          'Explore AMG-inspired exterior styling options designed to give compatible Mercedes-Benz models a distinctive appearance.',
      },
      {
        heading: 'Custom Exterior Styling',
        description:
          'Discuss bumper styling, side skirts and other exterior enhancements for your Mercedes-Benz with our team.',
      },
    ],
  },

  'mercedes-facelift-dubai': {
    title: 'Mercedes Facelift Services in Dubai',
    metaTitle: 'Mercedes Facelift Dubai | German Auto Expert',
    metaDescription:
      'Discover Mercedes-Benz facelift and model conversion options in Al Quoz, Dubai. Explore exterior styling upgrades for your vehicle.',
    heading: 'Mercedes-Benz Facelift in Dubai',
    intro:
      'Give your Mercedes-Benz a refreshed appearance with facelift and model conversion options. Contact German Auto Expert in Al Quoz, Dubai.',
    keywords: [
      'Mercedes facelift Dubai',
      'Mercedes facelift conversion Dubai',
      'Mercedes model conversion Al Quoz',
      'Mercedes exterior facelift',
    ],
    match: [
      'facelift',
      'face lift',
      'model conversion',
      'front conversion',
      'rear conversion',
      'facelift conversion',
    ],
    sections: [
      {
        heading: 'Mercedes Facelift Conversion',
        description:
          'Explore facelift options for selected Mercedes-Benz models and discuss compatibility before choosing an upgrade.',
      },
      {
        heading: 'Modern Mercedes Exterior Styling',
        description:
          'Refresh your vehicle’s exterior appearance with carefully selected model-specific styling components.',
      },
    ],
  },

  'mercedes-vehicle-upgrades-dubai': {
    title: 'Mercedes Vehicle Upgrades in Dubai',
    metaTitle: 'Mercedes Custom Upgrades Dubai | German Auto Expert',
    metaDescription:
      'Explore custom Mercedes-Benz vehicle upgrades, performance enhancements and styling options in Al Quoz, Dubai.',
    heading: 'Mercedes-Benz Custom Vehicle Upgrades',
    intro:
      'Discover custom styling and vehicle upgrade options for Mercedes-Benz models at German Auto Expert, Al Quoz, Dubai.',
    keywords: [
      'Mercedes custom upgrades Dubai',
      'Mercedes vehicle upgrades Dubai',
      'Mercedes performance upgrades Dubai',
      'Mercedes custom modifications Al Quoz',
    ],
    match: [
      'vehicle upgrade',
      'vehicle upgrades',
      'custom upgrade',
      'custom modification',
      'performance upgrade',
      'performance tuning',
      'interior upgrade',
      'ambient lighting',
      'exhaust upgrade',
      'suspension upgrade',
      'wheel upgrade',
      'retrofit',
    ],
    sections: [
      {
        heading: 'Mercedes Performance Upgrades',
        description:
          'Discuss suitable performance-related upgrades and compatibility for your Mercedes-Benz model.',
      },
      {
        heading: 'Mercedes Custom Modifications',
        description:
          'Explore selected interior, exterior and technology upgrade options to personalise your vehicle.',
      },
    ],
  },
};

const getCachedServices = unstable_cache(
  async () => {
    try {
      const result = await dbService.getAll('services');
      return result.success && Array.isArray(result.data) ? result.data : [];
    } catch (err) {
      console.error('Error fetching services for dynamic landing:', err);
      return [];
    }
  },
  ['mercedes-dynamic-landing-services'],
  { revalidate: 60, tags: ['services'] }
);

function matchesService(service, keywords) {
  const searchable = [
    service.title,
    service.desc,
    service.description,
    service.category,
    service.model,
    service.slug,
    ...(Array.isArray(service.tags) ? service.tags : []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return keywords.some((keyword) =>
    searchable.includes(keyword.toLowerCase())
  );
}

function safeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = PAGE_CONFIG[slug];

  if (!page) {
    return { title: 'Page Not Found' };
  }

  const services = await getCachedServices();
  const matchingServices = services.filter((service) =>
    matchesService(service, page.match)
  );

  const firstImage =
    matchingServices[0]?.imageUrls?.[0] ||
    matchingServices[0]?.imageUrl;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: {
      canonical: `${SITE_URL}/${slug}`,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${SITE_URL}/${slug}`,
      siteName: SITE_NAME,
      type: 'website',
      ...(firstImage ? { images: [{ url: firstImage }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle,
      description: page.metaDescription,
      ...(firstImage ? { images: [firstImage] } : {}),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function DynamicServicePage({ params }) {
  const { slug } = await params;
  const page = PAGE_CONFIG[slug];

  if (!page) notFound();

  const services = await getCachedServices();

  const matchingServices = services.filter((service) =>
    matchesService(service, page.match)
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.title,
    description: page.metaDescription,
    url: `${SITE_URL}/${slug}`,
    provider: {
      '@type': 'AutoRepair',
      name: SITE_NAME,
      url: SITE_URL,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Al Quoz 20C Street Industrial Area 2',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Dubai',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(jsonLd),
        }}
      />

      <ServiceLandingClient
        page={page}
        services={matchingServices}
      />
    </>
  );
}
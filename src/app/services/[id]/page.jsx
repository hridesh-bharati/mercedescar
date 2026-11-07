// src/app/services/[id]/page.jsx
import { dbService } from '@/services/dbService';
import { notFound } from 'next/navigation';
import ServiceDetailClient from './ServiceDetailClient';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mercedesgaragedubai.com/';
const SITE_NAME = 'Mercedes Garage Dubai';

async function getService(id) {
  try {
    const res = await dbService.getById('services', id);
    return res.success && res.data ? res.data : null;
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const service = await getService(resolvedParams.id);

  if (!service) {
    return { title: 'Service Not Found' };
  }

  const title = service.title
    ? `${service.title} | Mercedes Service Dubai`
    : `Mercedes Service Dubai | ${SITE_NAME}`;

  // ✅ Safely trim to 155 chars — no mid-word cuts
  const rawDesc = service.desc || service.description;
  const description = rawDesc
    ? rawDesc.trim().replace(/\s+/g, ' ').slice(0, 152).replace(/\s+\S*$/, '') + '…'
    : `Professional Mercedes-Benz ${service.title || 'repair'} in Al Quoz, Dubai. Certified technicians and genuine parts at ${SITE_NAME}.`;

  const image =
    service.imageUrls?.[0] ||
    service.imageUrl ||
    `${SITE_URL}/images/og-services.png`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/services/${resolvedParams.id}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/services/${resolvedParams.id}`,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${service.title} — Mercedes-Benz service in Dubai`,
        },
      ],
      locale: 'en_AE',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const service = await getService(resolvedParams.id);

  if (!service) {
    notFound();
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.desc || service.description,
    provider: {
      '@type': 'AutoRepair',
      '@id': `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      telephone: '+971567888808',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Warehouse #S2, Al Quoz 20C Street Industrial Area 2',
        addressLocality: 'Dubai',
        addressRegion: 'Dubai',
        addressCountry: 'AE',
      },
    },
    areaServed: [
      { '@type': 'City', name: 'Dubai' },
      { '@type': 'Place', name: 'Al Quoz' },
    ],
    image: service.imageUrls?.[0] || service.imageUrl,
    offers: service.price
      ? {
          '@type': 'Offer',
          price: service.price,
          priceCurrency: 'AED',
        }
      : undefined,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${SITE_URL}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `${SITE_URL}/services/${resolvedParams.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([serviceJsonLd, breadcrumbJsonLd]),
        }}
      />
      <ServiceDetailClient initialService={service} />
    </>
  );
}
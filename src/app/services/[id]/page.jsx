// src/app/services/[id]/page.jsx
import { dbService } from '@/services/dbService';
import { notFound } from 'next/navigation';
import ServiceDetailClient from './ServiceDetailClient';

const SITE_URL = 'https://mercedesgaragedubai.com';
const SITE_NAME = 'German Auto Expert';

// Data fetch function
async function getService(id) {
  try {
    const res = await dbService.getById('services', id);
    return res.success && res.data ? res.data : null;
  } catch (err) {
    return null;
  }
}

// ✅ SEO Metadata Generation
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const service = await getService(resolvedParams.id);

  if (!service) {
    return { title: 'Service Not Found' };
  }

  const title = service.title 
    ? `${service.title} | Mercedes Service Dubai | ${SITE_NAME}` 
    : `Mercedes Service Dubai | ${SITE_NAME}`;
    
  const description = service.desc || service.description 
    ? service.desc?.substring(0, 155) + '...' 
    : `Professional Mercedes-Benz ${service.title || 'repair'} services in Dubai. Certified technicians and genuine parts at German Auto Expert.`;

  const image = service.imageUrls?.[0] || service.imageUrl || `${SITE_URL}/images/car-class.png`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/services/${resolvedParams.id}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/services/${resolvedParams.id}`,
      siteName: SITE_NAME,
      images: [{ url: image, alt: service.title }],
      type: 'website',
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

// ✅ Server Page Component
export default async function Page({ params }) {
  const resolvedParams = await params;
  const service = await getService(resolvedParams.id);

  if (!service) {
    notFound(); // Next.js 404 Page
  }

  // JSON-LD Schema for this specific service
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.desc || service.description,
    provider: {
      '@type': 'AutoRepair',
      name: SITE_NAME,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Al Quoz',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
      },
    },
    areaServed: 'Dubai',
    image: service.imageUrls?.[0] || service.imageUrl,
    offers: service.price ? {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'AED',
    } : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailClient initialService={service} />
    </>
  );
}
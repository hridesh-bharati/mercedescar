// src/app/car-class/[className]/page.jsx
import { dbService } from '@/services/dbService';
import CarClassClient from './CarClassClient';
import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://mercedesgaragedubai.com';
const SITE_NAME = 'Mercedes Garage Dubai';

const slugify = (str = '') =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// ✅ Caching
const getCachedClasses = unstable_cache(
  async () => {
    const res = await dbService.getAll('car_classes');
    return res.success && res.data ? res.data : null;
  },
  ['car-classes-cache'],
  { revalidate: 60, tags: ['car-classes'] }
);

const getData = cache(async (slug) => {
  try {
    const data = await getCachedClasses();
    if (!data) return { list: [], single: null };

    const dataList = Array.isArray(data)
      ? data
      : Object.keys(data).map((key) => ({ id: key, ...data[key] }));

    if (slug === 'all') return { list: dataList, single: null };

    const single = dataList.find(
      (item) =>
        slugify(item.className) === slug ||
        item.slug === slug ||
        item.id?.toLowerCase() === slug
    );
    return { list: dataList, single: single || null };
  } catch (err) {
    console.error('Error fetching class details:', err);
    return { list: [], single: null };
  }
});

// ===================== METADATA =====================
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const className = resolvedParams?.className || '';
  const isAll = className.toLowerCase() === 'all';

  if (isAll) {
    return {
      title: 'All Mercedes Car Classes Service Dubai | Mercedes Garage',
      description:
        'Explore specialized Mercedes-Benz servicing, maintenance and repair for every car class — G-Class, S-Class, C-Class, AMG and more in Al Quoz, Dubai.',
      alternates: { canonical: `${SITE_URL}/car-class/all` },
      openGraph: {
        title: 'All Mercedes Car Classes Service Dubai | Mercedes Garage',
        description:
          'Specialized Mercedes-Benz workshop services for every class in Al Quoz, Dubai.',
        url: `${SITE_URL}/car-class/all`,
        siteName: SITE_NAME,
        type: 'website',
        locale: 'en_AE',
        images: [
          {
            url: `${SITE_URL}/images/car-class.png`,
            width: 1200,
            height: 630,
            alt: 'Mercedes Garage Dubai - All Mercedes Car Classes',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'All Mercedes Car Classes Service Dubai | Mercedes Garage',
        description:
          'Specialized Mercedes-Benz workshop services in Al Quoz, Dubai.',
        images: [`${SITE_URL}/images/car-class.png`],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
      },
    };
  }

  const { single: data } = await getData(className);
  if (!data) return { title: 'Car Class Not Found' };

  const formatted = data.className || className.replace(/-/g, ' ').toUpperCase();
  const title =
    data.seoTitle ||
    `Mercedes ${formatted} Service & Repair Dubai | ${SITE_NAME}`;
  const description =
    data.seoDescription ||
    `Professional Mercedes ${formatted} servicing, maintenance and repair in Al Quoz, Dubai. Certified technicians, genuine parts and transparent pricing.`;
  const image =
    data.imageUrl || data.imageUrls?.[0] || `${SITE_URL}/images/car-class.png`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/car-class/${className}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/car-class/${className}`,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: `Mercedes ${formatted} service Dubai` }],
      locale: 'en_AE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

// ===================== PAGE =====================
export default async function Page({ params }) {
  const resolvedParams = await params;
  const className = resolvedParams?.className || '';
  const isAll = className.toLowerCase() === 'all';

  const { list, single } = await getData(className);
  if (!isAll && !single) notFound();

  const formatted = isAll
    ? 'All Mercedes Classes'
    : single?.className || className.replace(/-/g, ' ').toUpperCase();

  // ✅ AutoRepair — full NAP + @id
  const autoRepair = {
    '@type': 'AutoRepair',
    '@id': `${SITE_URL}/#business`,
    name: SITE_NAME,
    alternateName: 'German Auto Expert',
    url: SITE_URL,
    telephone: '+971567888808',
    email: 'info@mercedesgaragedubai.com',
    image: `${SITE_URL}/images/logo.png`,
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
      ],
      opens: '09:00',
      closes: '20:00',
    },
    areaServed: [
      { '@type': 'City', name: 'Dubai' },
      { '@type': 'Place', name: 'Al Quoz' },
    ],
  };

  // ✅ Breadcrumb
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: isAll
      ? [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Car Classes',
            item: `${SITE_URL}/car-class/all`,
          },
        ]
      : [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Car Classes',
            item: `${SITE_URL}/car-class/all`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: formatted,
            item: `${SITE_URL}/car-class/${className}`,
          },
        ],
  };

  // ✅ ItemList (only for /all)
  const itemList = isAll
    ? {
        '@type': 'ItemList',
        name: 'Mercedes Car Classes Services',
        description:
          'Complete list of Mercedes-Benz service classes offered by Mercedes Garage Dubai.',
        itemListElement: list.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.className,
          url: `${SITE_URL}/car-class/${c.slug || slugify(c.className)}`,
        })),
      }
    : null;

  // ✅ Service (only for single)
  const serviceSchema =
    !isAll && single
      ? {
          '@type': 'Service',
          serviceType: `Mercedes ${formatted} Service`,
          provider: { '@id': `${SITE_URL}/#business` },
          areaServed: [
            { '@type': 'City', name: 'Dubai' },
            { '@type': 'Place', name: 'Al Quoz' },
          ],
          name:
            single.h1 ||
            `Mercedes ${formatted} Service and Repair in Dubai`,
          description:
            single.heroIntro ||
            `Expert Mercedes ${formatted} servicing in Al Quoz, Dubai.`,
          url: `${SITE_URL}/car-class/${className}`,
        }
      : null;

  // ✅ FAQ (only for single)
  const faqSchema =
    !isAll && single?.faqs?.length
      ? {
          '@type': 'FAQPage',
          mainEntity: single.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      autoRepair,
      breadcrumb,
      ...(itemList ? [itemList] : []),
      ...(serviceSchema ? [serviceSchema] : []),
      ...(faqSchema ? [faqSchema] : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CarClassClient
        initialData={single}
        initialList={isAll ? list : null}
        slug={className}
      />
    </>
  );
}
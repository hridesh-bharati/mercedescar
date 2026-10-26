// src/app/car-class/[className]/page.jsx
import { dbService } from '@/services/dbService';
import CarClassClient from './CarClassClient';
import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

const SITE_URL = 'https://mercedesgaragedubai.com';
const SITE_NAME = 'German Auto Expert';

const slugify = (str = '') =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// ✅ Caching: 60 sec revalidate (Speed boost)
const getCachedClasses = unstable_cache(
  async () => {
    const res = await dbService.getAll('car_classes');
    return res.success && res.data ? res.data : null;
  },
  ['car-classes-cache'],
  { revalidate: 60, tags: ['car-classes'] }
);

// ✅ React cache — same request mein ek hi baar chalega
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

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const className = resolvedParams?.className || '';
  const isAll = className.toLowerCase() === 'all';

  if (isAll) {
    return {
      title: 'All Mercedes Car Classes Service in Dubai | German Auto Expert',
      description:
        'Explore specialized Mercedes-Benz servicing, maintenance and repair for every car class — G-Class, S-Class, C-Class, AMG and more in Al Quoz, Dubai.',
      alternates: { canonical: `${SITE_URL}/car-class/all` },
      openGraph: {
        title: 'All Mercedes Car Classes Service in Dubai',
        description: 'Specialized Mercedes-Benz workshop services in Al Quoz, Dubai.',
        url: `${SITE_URL}/car-class/all`,
        siteName: SITE_NAME,
        type: 'website',
        images: [
          {
            url: `${SITE_URL}/images/car-class.png`,
            alt: 'German Auto Expert Dubai - Mercedes Car Classes',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'All Mercedes Car Classes Service in Dubai',
        description: 'Specialized Mercedes-Benz workshop services in Al Quoz, Dubai.',
        images: [`${SITE_URL}/images/car-class.png`],
      },
    };
  }

  const { single: data } = await getData(className);
  if (!data) return { title: 'Car Class Not Found' };

  const formatted = data.className || className.replace(/-/g, ' ').toUpperCase();
  const title =
    data.seoTitle || `Mercedes ${formatted} Service & Repair in Dubai | ${SITE_NAME}`;
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
      images: [{ url: image, alt: `Mercedes ${formatted} service Dubai` }],
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

export default async function Page({ params }) {
  const resolvedParams = await params;
  const className = resolvedParams?.className || '';
  const isAll = className.toLowerCase() === 'all';

  const { list, single } = await getData(className);
  if (!isAll && !single) notFound();

  const formatted = isAll
    ? 'All Mercedes Classes'
    : single?.className || className.replace(/-/g, ' ').toUpperCase();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AutoRepair',
        name: SITE_NAME,
        url: SITE_URL,
        telephone: '+971 56 788 8808',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Al Quoz',
          addressLocality: 'Dubai',
          addressCountry: 'AE',
        },
      },
      ...(isAll
        ? [
            {
              '@type': 'ItemList',
              name: 'Mercedes Car Classes Services',
              description:
                'Complete list of Mercedes-Benz service classes offered by German Auto Expert.',
              itemListElement: list.map((c, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: c.className,
                url: `${SITE_URL}/car-class/${c.slug || slugify(c.className)}`,
              })),
            },
          ]
        : []),
      ...(!isAll && single
        ? [
            {
              '@type': 'Service',
              serviceType: `Mercedes ${formatted} Service`,
              provider: { '@type': 'AutoRepair', name: SITE_NAME },
              areaServed: 'Dubai',
              name: single.h1 || `Mercedes ${formatted} Service and Repair in Dubai`,
              description:
                single.heroIntro || `Expert Mercedes ${formatted} servicing in Dubai.`,
            },
            ...(single.faqs?.length
              ? [
                  {
                    '@type': 'FAQPage',
                    mainEntity: single.faqs.map((f) => ({
                      '@type': 'Question',
                      name: f.q,
                      acceptedAnswer: { '@type': 'Answer', text: f.a },
                    })),
                  },
                ]
              : []),
          ]
        : []),
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
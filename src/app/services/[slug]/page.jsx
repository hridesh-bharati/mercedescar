
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { dbService } from '@/services/dbService';
import ServiceLandingClient from './ServiceDetailClient';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  ArrowLeft,
  PhoneCall,
  Calendar,
} from 'lucide-react';

const SITE_URL = 'https://mercedesgaragedubai.com';
const SITE_NAME = 'German Auto Expert';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

function generateSlug(title = '') {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Supports Firebase ID, stored slug and generated title slug.
function findServiceBySlug(services, slug) {
  return services.find((service) => {
    const id = String(service.id || '');
    const storedSlug = String(service.slug || '');

    return (
      id === slug ||
      storedSlug === slug ||
      generateSlug(service.title) === slug
    );
  });
}

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

async function getFreshServices() {
  try {
    const result = await dbService.getAll('services');

    return result.success && Array.isArray(result.data)
      ? result.data
      : [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = PAGE_CONFIG[slug];

  if (page) {
    return {
      title: page.metaTitle,
      description: page.metaDescription,
      keywords: page.keywords,

      alternates: {
        canonical: `${SITE_URL}/services/${slug}`,
      },

      openGraph: {
        title: page.metaTitle,
        description: page.metaDescription,
        url: `${SITE_URL}/services/${slug}`,
        siteName: SITE_NAME,
        type: 'website',
      },

      twitter: {
        card: 'summary_large_image',
        title: page.metaTitle,
        description: page.metaDescription,
      },

      robots: {
        index: true,
        follow: true,
      },
    };
  }

  const services = await getFreshServices();
  const service = findServiceBySlug(services, slug);

  if (!service) {
    return {
      title: 'Service Not Found | German Auto Expert',
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const image =
    service.imageUrls?.[0] || service.imageUrl || undefined;

  const canonicalSlug = service.slug || generateSlug(service.title);

  return {
    title: `${service.title} | Mercedes Service Dubai | ${SITE_NAME}`,
    description:
      service.desc ||
      service.description ||
      `Professional ${service.title} for Mercedes-Benz vehicles in Dubai.`,

    alternates: {
      canonical: `${SITE_URL}/services/${canonicalSlug}`,
    },

    openGraph: {
      title: `${service.title} | ${SITE_NAME}`,
      description:
        service.desc || service.description || 'Mercedes-Benz service in Dubai.',
      url: `${SITE_URL}/services/${canonicalSlug}`,
      siteName: SITE_NAME,
      type: 'website',
      ...(image ? { images: [{ url: image }] } : {}),
    },

    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: `${service.title} | ${SITE_NAME}`,
      description: service.desc || service.description || 'Mercedes-Benz service in Dubai.',
      ...(image ? { images: [image] } : {}),
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

  const services = await getFreshServices();

  // SEO landing pages
  if (page) {
    const matchingServices = services.filter((service) =>
      matchesService(service, page.match)
    );

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.title,
      description: page.metaDescription,
      url: `${SITE_URL}/services/${slug}`,
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
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />

        <ServiceLandingClient
          page={page}
          services={matchingServices}
        />
      </>
    );
  }

  // Individual Firebase service page
  const singleService = findServiceBySlug(services, slug);

  if (!singleService) {
    notFound();
  }

  const image =
    singleService.imageUrls?.[0] ||
    singleService.imageUrl ||
    '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: singleService.title,
    description:
      singleService.desc ||
      singleService.description ||
      'Professional Mercedes-Benz service in Dubai.',
    url: `${SITE_URL}/services/${singleService.slug || generateSlug(singleService.title)}`,
    provider: {
      '@type': 'AutoRepair',
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'City',
      name: 'Dubai',
    },
    ...(image ? { image } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <Header />

      <main className="bg-light min-vh-100 py-5">
        <div className="container py-4">

          <Link
            href="/services"
            className="text-dark text-decoration-none small d-inline-flex align-items-center gap-2 mb-4 fw-bold"
          >
            <ArrowLeft size={16} />
            Back to Services
          </Link>

          <div className="row g-4 align-items-center">

            <div className="col-lg-6">
              {image ? (
                <img
                  src={image}
                  alt={`${singleService.title} - Mercedes-Benz service in Dubai`}
                  className="w-100 rounded-4 shadow-sm object-fit-cover"
                  style={{ height: '350px' }}
                />
              ) : (
                <div
                  className="bg-secondary bg-opacity-10 rounded-4 d-flex align-items-center justify-content-center text-muted"
                  style={{ height: '350px' }}
                >
                  No Image Available
                </div>
              )}
            </div>

            <div className="col-lg-6">

              <span className="badge bg-danger rounded-pill px-3 py-2 mb-3">
                MERCEDES-BENZ SERVICE
              </span>

              <h1 className="fw-bold display-6 mb-3 text-dark">
                {singleService.title}
              </h1>

              <p className="text-secondary mb-4" style={{ lineHeight: 1.8 }}>
                {singleService.desc ||
                  singleService.description ||
                  'Professional Mercedes-Benz service provided by German Auto Expert in Al Quoz, Dubai.'}
              </p>

              {singleService.price && (
                <h3 className="fw-bold text-danger mb-4">
                  AED {singleService.price}
                </h3>
              )}

              <div className="d-flex flex-wrap gap-3">
                <a
                  href="tel:+971567888808"
                  className="btn btn-danger rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
                >
                  <PhoneCall size={17} />
                  Call Now
                </a>

                <Link
                  href="/contact-us"
                  className="btn btn-dark rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
                >
                  <Calendar size={17} />
                  Book Appointment
                </Link>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

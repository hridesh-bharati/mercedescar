// src/app/services/page.jsx
import Header from '@/components/layout/Header';
import HeroSection from './components/HeroSection';
import ServiceGrid from './components/ServiceGrid';
import CTASection from './components/CTASection';
import Footer from '@/components/layout/Footer';
import { Suspense } from 'react';
import { unstable_cache } from 'next/cache';
import { dbService } from '@/services/dbService';
import './services.css';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mercedesgaragedubai.com/';
const SITE_NAME = 'Mercedes Garage Dubai';

// ✅ PDF-mapped SEO Metadata
export const metadata = {
  title: 'Mercedes Services Dubai | Repair, Diagnostics & Maintenance',
  description:
    'Mercedes repair, diagnostics and maintenance in Al Quoz, Dubai. Engine, brake, transmission, AC and electrical service by certified Mercedes specialists.',
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: 'Mercedes Services Dubai | Repair, Diagnostics & Maintenance',
    description:
      'Mercedes repair, diagnostics and maintenance in Al Quoz, Dubai by certified specialists.',
    url: `${SITE_URL}/services`,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/images/og-services.png`,
        width: 1200,
        height: 630,
        alt: 'Mercedes Services Dubai — Repair & Maintenance at Al Quoz Workshop',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercedes Services Dubai | Repair, Diagnostics & Maintenance',
    description:
      'Mercedes repair, diagnostics and maintenance in Al Quoz, Dubai.',
    images: [`${SITE_URL}/images/og-services.png`],
  },
  robots: { index: true, follow: true },
};

// ✅ Cached services data
const getCachedServices = unstable_cache(
  async () => {
    const res = await dbService.getAll('services');
    return res.success && res.data ? res.data : [];
  },
  ['services-page-cache'],
  { revalidate: 60, tags: ['services'] }
);

// PDF-required FAQ
const faqs = [
  {
    q: 'What Mercedes services do you offer in Dubai?',
    a: 'We offer routine Mercedes maintenance, engine diagnostics, brake service, transmission repair, AC repair, electrical repair, AMG body kits, facelift conversions and custom upgrades in Al Quoz, Dubai.',
  },
  {
    q: 'Do you service all Mercedes-Benz models?',
    a: 'Yes. We service the full Mercedes range including C-Class, E-Class, S-Class, G-Class, GLC, GLE, GLS and AMG models such as G63, C63 and E63.',
  },
  {
    q: 'Where is your Mercedes workshop located?',
    a: 'Warehouse #S2, Al Quoz 20C Street, Industrial Area 2, Dubai, UAE. Open Monday to Saturday, 9am to 8pm.',
  },
  {
    q: 'Can I book a Mercedes service online?',
    a: 'Yes. Book online through this page or call +971 56 788 8808 to schedule your Mercedes service in Al Quoz.',
  },
];

export default async function ServicesPage() {
  const initialServices = await getCachedServices();

  // ✅ Improved ItemList — anchors + proper names
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Mercedes Services Dubai',
    description:
      'Comprehensive Mercedes-Benz repair and maintenance services in Al Quoz, Dubai.',
    itemListElement: initialServices.slice(0, 20).map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.title,
      url: `${SITE_URL}/services/${service.id}`,
    })),
  };

  // ✅ Service schema (PDF checklist)
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Mercedes-Benz Repair and Maintenance',
    provider: {
      '@type': 'AutoRepair',
      '@id': `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      telephone: '+971567888808',
    },
    areaServed: [
      { '@type': 'City', name: 'Dubai' },
      { '@type': 'Place', name: 'Al Quoz' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Mercedes Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mercedes Engine Repair' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mercedes Transmission Repair' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mercedes Brake Service' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mercedes AC Repair' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mercedes Diagnostics' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mercedes Electrical Repair' } },
      ],
    },
  };

  // ✅ Breadcrumb schema
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
    ],
  };

  // ✅ FAQ schema
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            itemListJsonLd,
            serviceJsonLd,
            breadcrumbJsonLd,
            faqJsonLd,
          ]),
        }}
      />

      <Header />
      <main>
        <HeroSection />

        {/* Anchor targets for Services.jsx card links */}
        <div id="routine-maintenance" aria-hidden="true" />
        <div id="brake-repair" aria-hidden="true" />
        <div id="transmission-repair" aria-hidden="true" />

        <Suspense
          fallback={
            <div
              className="d-flex justify-content-center align-items-center py-5"
              style={{ minHeight: '400px' }}
            >
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading services...</span>
              </div>
            </div>
          }
        >
          <ServiceGrid initialServices={initialServices} />
        </Suspense>

        {/* ✅ PDF FAQ section — visible, not just schema */}
        <section className="py-5 bg-white" id="services-faq">
          <div className="container">
            <h2 className="fw-bold text-dark mb-4">
              Frequently Asked Questions About Mercedes Services in Dubai
            </h2>
            {faqs.map((f, i) => (
              <details
                key={i}
                className="mb-3 p-3 border rounded-3 bg-light"
              >
                <summary className="fw-bold" style={{ cursor: 'pointer' }}>
                  {f.q}
                </summary>
                <p className="mt-2 mb-0 text-secondary">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}


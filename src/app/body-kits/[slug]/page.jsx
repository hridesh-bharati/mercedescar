// src/app/body-kits/[slug]/page.jsx
import { dbService } from '@/services/dbService';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Wrench, Calendar, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';

const SITE_URL = 'https://mercedesgaragedubai.com';
const SITE_NAME = 'German Auto Expert';

async function getItem(slug) {
  try {
    const res = await dbService.getAll('body_kits_upgrades');
    if (!res.success || !res.data) return null;
    const dataList = Array.isArray(res.data)
      ? res.data
      : Object.keys(res.data).map(k => ({ id: k, ...res.data[k] }));
    return dataList.find(i => i.slug === slug || i.id === slug) || null;
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const item = await getItem(resolvedParams?.slug);
  if (!item) return { title: 'Service Not Found' };

  return {
    title: item.seoTitle || `${item.title} Dubai | ${SITE_NAME}`,
    description: item.seoDescription || item.desc || `Professional ${item.title} installation and upgrades in Al Quoz, Dubai.`,
    alternates: { canonical: `${SITE_URL}/body-kits/${item.slug}` },
    openGraph: {
      title: item.seoTitle || item.title,
      description: item.seoDescription || item.desc,
      url: `${SITE_URL}/body-kits/${item.slug}`,
      siteName: SITE_NAME,
      images: [{ url: item.imageUrl || `${SITE_URL}/images/car-class.png`, alt: item.title }],
      type: 'website',
    },
  };
}

export default async function BodyKitsDetailPage({ params }) {
  const resolvedParams = await params;
  const item = await getItem(resolvedParams?.slug);
  if (!item) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AutoRepair',
        name: SITE_NAME,
        url: SITE_URL,
        telephone: '+971 56 788 8808',
        address: { '@type': 'PostalAddress', streetAddress: 'Al Quoz', addressLocality: 'Dubai', addressCountry: 'AE' },
      },
      {
        '@type': 'Service',
        serviceType: item.title,
        provider: { '@type': 'AutoRepair', name: SITE_NAME },
        areaServed: 'Dubai',
        name: item.h1 || item.title,
        description: item.heroIntro || item.desc,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="bg-light pb-5">
        <section className="position-relative text-white py-5" style={{ background: '#0a0a0a', minHeight: '380px' }}>
          <div className="position-absolute top-0 start-0 w-100 h-100 opacity-40">
            <Image src={item.imageUrl || '/images/car-class.png'} alt={item.title} fill className="object-fit-cover" priority />
          </div>
          <div className="container position-relative py-4" style={{ zIndex: 2 }}>
            <span className="badge bg-danger mb-2">{item.category}</span>
            <h1 className="display-5 fw-bold mb-3">{item.h1 || item.title}</h1>
            <p className="text-white-50 fs-5" style={{ maxWidth: '700px' }}>{item.tagline || item.desc}</p>
          </div>
        </section>

        <div className="container py-5">
          <div className="row g-5">
            <div className="col-12 col-lg-8">
              <div className="bg-white rounded-4 p-4 p-md-5 shadow-sm border mb-4">
                <h2 className="fw-bold text-danger mb-4">Overview & Customization Details</h2>
                {item.contentSections?.length > 0 ? (
                  item.contentSections.map((sec, i) => (
                    <div key={i} className="mb-4">
                      <h3 className="fw-bold text-dark fs-5 mb-2">{sec.heading}</h3>
                      <p className="text-secondary" style={{ lineHeight: '1.8' }}>{sec.body}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-secondary" style={{ lineHeight: '1.8' }}>{item.desc}</p>
                )}
              </div>
            </div>

            <div className="col-12 col-lg-4" id="booking-form">
              <div className="sticky-top" style={{ top: '100px' }}>
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white border">
                  <h3 className="fw-bold mb-2 fs-5 text-danger">Enquire About This Upgrade</h3>
                  <p className="text-muted small mb-4">Get professional consultation from our modification experts in Al Quoz, Dubai.</p>
                  <div className="d-flex flex-column gap-2 small text-muted pt-3 border-top">
                    <div className="d-flex align-items-center gap-2"><Phone size={14} className="text-danger" /><span>+971 56 788 8808</span></div>
                    <div className="d-flex align-items-center gap-2"><Mail size={14} className="text-danger" /><span>info@mercedesgaragedubai.com</span></div>
                    <div className="d-flex align-items-center gap-2"><MapPin size={14} className="text-danger" /><span>Al Quoz, Dubai, UAE</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
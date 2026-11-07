// src/app/case/[id]/page.jsx
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { dbService } from '@/services/dbService';
import GallerySection from '@/components/Gallery';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mercedesgaragedubai.com/';
const SITE_NAME = 'Mercedes Garage Dubai';

async function getCase(id) {
  try {
    const res = await dbService.getAll('cases');
    if (res.success && res.data) {
      return res.data.find((item) => item.id === id) || null;
    }
    return null;
  } catch {
    return null;
  }
}

async function getGallery() {
  try {
    const res = await dbService.getAll('gallery');
    return res.success && res.data ? res.data : [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const caseData = await getCase(resolvedParams.id);

  if (!caseData) {
    return { title: 'Case Study Not Found' };
  }

  const title = caseData.title
    ? `${caseData.title} | Mercedes Case Study Dubai`
    : `Mercedes Case Study Dubai | ${SITE_NAME}`;

  const rawDesc = caseData.description || '';
  const description = rawDesc
    ? rawDesc.trim().replace(/\s+/g, ' ').slice(0, 152).replace(/\s+\S*$/, '') +
      '…'
    : `Mercedes-Benz ${caseData.category || 'repair'} case study from our Al Quoz, Dubai workshop.`;

  const image =
    caseData.imageUrl ||
    caseData.image ||
    `${SITE_URL}/images/servicesman.avif`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/case/${resolvedParams.id}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/case/${resolvedParams.id}`,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: caseData.title }],
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

export default async function CaseDetailPage({ params }) {
  const resolvedParams = await params;
  const [caseData, galleryAlbums] = await Promise.all([
    getCase(resolvedParams.id),
    getGallery(),
  ]);

  if (!caseData) {
    notFound();
  }

  const mainImage =
    caseData.imageUrl || caseData.image || '/images/servicesman.avif';

  // ✅ CreativeWork schema (case study as a project)
  const caseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: caseData.title,
    description: caseData.description,
    image: mainImage,
    dateCreated: caseData.startDate,
    creator: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      '@type': 'Service',
      serviceType: `Mercedes-Benz ${caseData.category || 'Repair'}`,
      provider: {
        '@id': `${SITE_URL}/#business`,
        '@type': 'AutoRepair',
        name: SITE_NAME,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/case/${resolvedParams.id}`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Case Studies',
        item: `${SITE_URL}/case`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: caseData.title,
        item: `${SITE_URL}/case/${resolvedParams.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([caseJsonLd, breadcrumbJsonLd]),
        }}
      />
      <Header />

      <main className="bg-light py-5">
        <div className="container">
          <div className="mb-4 text-start" data-anim="down">
            <nav aria-label="Breadcrumb">
              <ol className="breadcrumb mb-2 small">
                <li className="breadcrumb-item">
                  <Link
                    href="/"
                    className="text-danger text-decoration-none"
                  >
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link
                    href="/case"
                    className="text-danger text-decoration-none"
                  >
                    Cases
                  </Link>
                </li>
                <li
                  className="breadcrumb-item active text-muted"
                  aria-current="page"
                >
                  {caseData.title || 'Case Detail'}
                </li>
              </ol>
            </nav>
            <h1 className="fs-3 fw-bold text-dark">{caseData.title}</h1>
          </div>

          <div
            className="card border-0 glass-card p-3 rounded-4 shadow-sm bg-white mb-4"
            data-anim="up"
          >
            <div
              className="rounded-4 overflow-hidden position-relative"
              style={{ height: '420px' }}
            >
              <Image
                src={mainImage}
                alt={`${caseData.title} — Mercedes-Benz case study in Dubai`}
                fill
                sizes="(max-width: 992px) 100vw, 900px"
                className="object-fit-cover"
                priority
              />
            </div>

            <div className="row g-3 mt-3 pt-3 border-top border-light-subtle text-start px-2">
              <div className="col-6 col-md-3">
                <span className="text-muted small d-block">Client:</span>
                <span className="fw-bold text-dark">
                  {caseData.client || 'Mercedes Owner'}
                </span>
              </div>
              <div className="col-6 col-md-3">
                <span className="text-muted small d-block">Category:</span>
                <span className="fw-bold text-dark">
                  {caseData.category || 'Repair'}
                </span>
              </div>
              <div className="col-6 col-md-3">
                <span className="text-muted small d-block">Start Date:</span>
                <span className="fw-bold text-dark">
                  {caseData.startDate || 'Recent'}
                </span>
              </div>
              <div className="col-6 col-md-3">
                <span className="text-muted small d-block">Price:</span>
                <span className="fw-bold text-danger fs-5">
                  AED {caseData.price || '—'}
                </span>
              </div>
            </div>
          </div>

          <div
            className="card border-0 glass-card p-4 rounded-4 shadow-sm bg-white mb-4 text-start"
            data-anim="up"
            data-anim-delay="100"
          >
            <p
              className="text-secondary small lh-lg mb-0"
              style={{ whiteSpace: 'pre-line' }}
            >
              {caseData.description}
            </p>
          </div>

          <div
            className="card border-0 glass-card p-4 rounded-4 shadow-sm bg-white mb-4 text-start"
            data-anim="up"
            data-anim-delay="150"
          >
            <h2 className="fs-5 fw-bold text-dark mb-3">
              What We Did — Mercedes {caseData.category || 'Repair'}
            </h2>
            <div className="row g-2 mb-3">
              {[
                'Replaced Clogged Engine Air Filters',
                'Installed New Oil Filters',
                'Repaired & Replaced Fuel Filters',
                'Upgraded Cabin Air Filters',
                'Serviced Transmission Filters',
                'Conducted Full Filter Inspections',
              ].map((item, idx) => (
                <div className="col-md-6" key={idx}>
                  <div className="d-flex align-items-center gap-2 text-secondary small py-1">
                    <CheckCircle2
                      size={16}
                      className="text-danger flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="card border-0 glass-card p-4 rounded-4 shadow-sm bg-white mb-4 text-start"
            data-anim="up"
            data-anim-delay="200"
          >
            <h2 className="fs-5 fw-bold text-dark mb-2">Project Results</h2>
            <p className="text-secondary small lh-lg mb-0">
              {caseData.resultsText ||
                'Our Mercedes-Benz services significantly improved engine performance, fuel efficiency and overall driving comfort in Dubai conditions.'}
            </p>
          </div>

          <GallerySection
            albums={
              galleryAlbums.length > 0
                ? galleryAlbums
                : [
                    {
                      id: '1',
                      title: caseData.title,
                      images: [mainImage],
                      coverImage: mainImage,
                    },
                  ]
            }
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
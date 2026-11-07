// src/app/work-process/page.jsx
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './WorkProcess.css';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mercedesgaragedubai.com/';
const SITE_NAME = 'Mercedes Garage Dubai';

const steps = [
  {
    num: '01',
    title: 'Inspection & Diagnosis',
    desc: 'We begin by thoroughly inspecting your Mercedes using advanced XENTRY diagnostic scanners to identify any issues and determine the root cause of the problem.',
    image: '/images/work-process/image-cr1.avif',
  },
  {
    num: '02',
    title: 'Estimate & Approval',
    desc: "Once we've diagnosed the problem, we provide a detailed estimate for the Mercedes repairs. Your approval is required before any work begins.",
    image: '/images/work-process/image-cr2.avif',
  },
  {
    num: '03',
    title: 'Quality Control Check',
    desc: 'After repairs, your Mercedes undergoes a thorough quality check to ensure everything is functioning properly and up to Mercedes factory standards.',
    image: '/images/work-process/image-cr3.avif',
  },
  {
    num: '04',
    title: 'Final Testing & Delivery',
    desc: 'We perform a final road test and inspection before handing your Mercedes back to you in showroom-ready condition.',
    image: '/images/work-process/image-cr4.avif',
  },
];

export default function WorkProcess() {
  // ✅ HowTo schema — Google rich results (step-by-step)
  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Mercedes-Benz Repair Process at Mercedes Garage Dubai',
    description:
      'Our 4-step Mercedes-Benz repair process at our Al Quoz, Dubai workshop — from XENTRY diagnosis to final delivery.',
    image: `${SITE_URL}/images/work-process/image-cr1.avif`,
    totalTime: 'P2D',
    step: steps.map((step, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: step.title,
      text: step.desc,
      image: `${SITE_URL}${step.image}`,
      url: `${SITE_URL}/work-process#step-${idx + 1}`,
    })),
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
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Work Process',
        item: `${SITE_URL}/work-process`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([howToJsonLd, breadcrumbJsonLd]),
        }}
      />
      <Header />

      <main className="wp-main">
        {/* HERO BANNER */}
        <section className="wp-hero text-white position-relative">
          <div className="wp-hero-bg"></div>
          <div className="wp-hero-overlay"></div>
          <div className="container position-relative z-2 py-4">
            <div className="row">
              <div className="col-lg-8 text-start" data-anim="down">
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-dark bg-opacity-50 border border-light border-opacity-25 mb-2">
                  <span
                    style={{
                      width: '20px',
                      height: '2px',
                      background: '#D6241D',
                      display: 'inline-block',
                    }}
                  ></span>
                  <span className="small fw-bold tracking-wider text-danger">
                    MERCEDES WORK PROCESS
                  </span>
                </div>
                {/* ✅ PDF-aligned H1 */}
                <h1 className="display-5 fw-bold mb-2">
                  Mercedes-Benz Repair Process
                  <span className="text-danger d-block fs-5 mt-2">
                    in Al Quoz, Dubai
                  </span>
                </h1>
                <nav aria-label="Breadcrumb">
                  <ol className="breadcrumb mb-0 bg-dark bg-opacity-50 px-3 py-1 rounded-pill d-inline-flex align-items-center border border-light border-opacity-10 small">
                    <li className="breadcrumb-item">
                      <Link
                        href="/"
                        className="text-danger text-decoration-none fw-semibold"
                      >
                        Home
                      </Link>
                    </li>
                    <li
                      className="breadcrumb-item active text-light fw-semibold"
                      aria-current="page"
                    >
                      Work Process
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* WORK PROCESS TIMELINE */}
        <section className="wp-section py-5 position-relative overflow-hidden">
          <div className="wp-glow wp-glow-blue"></div>
          <div className="wp-glow wp-glow-pink"></div>

          <div className="container position-relative z-2">
            {/* Section Header */}
            <div className="row mb-5">
              <div className="col-lg-8 text-start" data-anim="right">
                <span className="text-danger fw-bold small text-uppercase tracking-wider">
                  Step-by-Step Excellence
                </span>
                {/* ✅ H2 copy fixed */}
                <h2 className="fw-bold text-dark mt-1">
                  Our 4-Step Mercedes Repair Process
                </h2>
                <p className="text-secondary">
                  Transparency, precision and efficiency guide every step of
                  our Mercedes repair and maintenance process in Dubai.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="wp-timeline-wrapper position-relative">
              <div className="wp-timeline-line d-none d-lg-block"></div>

              {steps.map((step, index) => {
                const isEven = index % 2 === 0;
                const stepAlt = `Mercedes ${step.title} — Step ${step.num} at Mercedes Garage Dubai`;

                return (
                  <div
                    className="row align-items-center mb-5 pb-lg-4 position-relative"
                    key={index}
                    id={`step-${index + 1}`}
                  >
                    {isEven ? (
                      <>
                        <div
                          className="col-lg-6 mb-4 mb-lg-0"
                          data-anim="right"
                        >
                          <div className="glass-card overflow-hidden rounded-4 shadow-sm p-2 bg-white bg-opacity-50 position-relative">
                            <div
                              className="position-relative w-100"
                              style={{ height: '260px' }}
                            >
                              <Image
                                src={step.image}
                                alt={stepAlt}
                                fill
                                sizes="(max-width: 992px) 100vw, 50vw"
                                className="rounded-4 object-fit-cover"
                                loading={index < 2 ? 'eager' : 'lazy'}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-lg-6 ps-lg-5 text-start"
                          data-anim="left"
                        >
                          <div className="d-flex align-items-center gap-3 mb-2">
                            <span
                              className="display-4 fw-bold text-danger opacity-75"
                              aria-hidden="true"
                            >
                              {step.num}
                            </span>
                            <h3 className="fw-bold text-dark mb-0 fs-3">
                              {step.title}
                            </h3>
                          </div>
                          <p
                            className="text-secondary small fst-italic ps-lg-4"
                            style={{ lineHeight: '1.8' }}
                          >
                            {step.desc}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="col-lg-6 pe-lg-5 text-start order-2 order-lg-1"
                          data-anim="right"
                        >
                          <div className="d-flex align-items-center gap-3 mb-2">
                            <span
                              className="display-4 fw-bold text-danger opacity-75"
                              aria-hidden="true"
                            >
                              {step.num}
                            </span>
                            <h3 className="fw-bold text-dark mb-0 fs-3">
                              {step.title}
                            </h3>
                          </div>
                          <p
                            className="text-secondary small fst-italic ps-lg-4"
                            style={{ lineHeight: '1.8' }}
                          >
                            {step.desc}
                          </p>
                        </div>
                        <div
                          className="col-lg-6 mb-4 mb-lg-0 order-1 order-lg-2"
                          data-anim="left"
                        >
                          <div className="glass-card overflow-hidden rounded-4 shadow-sm p-2 bg-white bg-opacity-50 position-relative">
                            <div
                              className="position-relative w-100"
                              style={{ height: '260px' }}
                            >
                              <Image
                                src={step.image}
                                alt={stepAlt}
                                fill
                                sizes="(max-width: 992px) 100vw, 50vw"
                                className="rounded-4 object-fit-cover"
                                loading={index < 2 ? 'eager' : 'lazy'}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}


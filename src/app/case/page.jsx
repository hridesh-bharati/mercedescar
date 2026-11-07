// src/app/case/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, User, Briefcase } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { dbService } from '@/services/dbService';

export default function CasesPage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    const res = await dbService.getAll('cases');
    if (res.success && res.data) {
      setCases(res.data);
    }
    setLoading(false);
  };

  return (
    <>
      <Header />

      <main className="bg-light py-5">
        {/* ============ HERO BANNER ============ */}
        <section className="bg-dark text-white py-5 mb-5 position-relative overflow-hidden rounded-4 mx-3 mx-md-4 shadow-sm">
          <div className="container position-relative z-2 py-4">
            <div className="row">
              <div className="col-lg-8 text-start" data-anim="down">
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-danger bg-opacity-25 border border-danger border-opacity-50 mb-3">
                  <span
                    style={{
                      width: '20px',
                      height: '2px',
                      background: '#D6241D',
                      display: 'inline-block',
                    }}
                  ></span>
                  <span className="small fw-bold tracking-wider text-danger">
                    MERCEDES PORTFOLIO & CASE STUDIES
                  </span>
                </div>
                <h1 className="display-5 fw-bold mb-2">
                  Mercedes-Benz Case Studies
                  <span className="text-danger d-block fs-5 mt-2">
                    &amp; Projects in Al Quoz, Dubai
                  </span>
                </h1>
                <p className="text-secondary small mb-3">
                  Explore how our specialist technicians diagnose, repair and
                  restore Mercedes-Benz vehicles with precision at our Al Quoz
                  workshop in Dubai.
                </p>
                <nav aria-label="Breadcrumb">
                  <ol className="breadcrumb mb-0 bg-white bg-opacity-10 px-3 py-1 rounded-pill d-inline-flex align-items-center border border-light border-opacity-10 small">
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
                      Case Studies
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* ============ CASES GRID ============ */}
        <div className="container pb-5">
          {loading ? (
            <div
              className="text-center py-5 text-secondary fw-bold"
              role="status"
              aria-live="polite"
            >
              Loading Mercedes Case Studies...
            </div>
          ) : cases.length === 0 ? (
            <div className="text-center py-5 text-muted card border-0 shadow-sm rounded-4 p-5 bg-white">
              <Briefcase
                size={40}
                className="text-secondary mx-auto mb-3 opacity-50"
                aria-hidden="true"
              />
              <h2 className="fs-5 fw-bold text-dark mb-2">
                No Mercedes Case Studies Found
              </h2>
              <p className="small mb-3">
                We are updating our portfolio. Please check back soon!
              </p>
              <div className="mt-2">
                <Link
                  href="/"
                  className="btn btn-danger btn-sm rounded-pill px-4 fw-bold"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            <div className="row g-4 text-start">
              {cases.map((item, index) => {
                const imgUrl =
                  item.imageUrl || item.image || '/images/servicesman.avif';
                const snippet = item.description
                  ? item.description.slice(0, 95) + '...'
                  : '';

                return (
                  <div
                    className="col-lg-4 col-md-6"
                    key={item.id}
                    data-anim="up"
                    data-anim-delay={Math.min(index * 100, 500)}
                  >
                    <div className="card border-0 glass-card h-100 shadow-sm overflow-hidden d-flex flex-column rounded-4 bg-white">
                      <div
                        className="position-relative overflow-hidden"
                        style={{ height: '230px' }}
                      >
                        <Link
                          href={`/case/${item.id}`}
                          aria-label={`View case study: ${item.title}`}
                        >
                          <Image
                            src={imgUrl}
                            alt={`${item.title || 'Mercedes case study'} — Mercedes-Benz repair in Dubai`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw"
                            className="object-fit-cover"
                            style={{ transition: 'transform 0.4s ease' }}
                            priority={index < 3}
                          />
                        </Link>
                        <span className="position-absolute top-0 end-0 m-3 badge bg-danger text-white px-3 py-2 rounded-pill shadow-sm">
                          AED {item.price || '0'}
                        </span>
                      </div>

                      <div className="p-4 d-flex flex-column flex-grow-1 justify-content-between bg-white bg-opacity-75">
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <span className="badge bg-danger bg-opacity-10 text-danger px-3 py-1 rounded-pill small fw-semibold">
                              {item.category || 'Repair'}
                            </span>
                            <span className="text-muted small d-flex align-items-center gap-1">
                              <Calendar size={13} aria-hidden="true" />{' '}
                              {item.startDate || 'Recent'}
                            </span>
                          </div>

                          <h2 className="fs-6 fw-bold mb-2">
                            <Link
                              href={`/case/${item.id}`}
                              className="text-dark text-decoration-none hover-danger"
                            >
                              {item.title}
                            </Link>
                          </h2>

                          <p className="text-muted small mb-3">{snippet}</p>
                        </div>

                        <div className="border-top pt-3 border-light-subtle d-flex align-items-center justify-content-between mt-auto">
                          <span className="text-secondary small d-flex align-items-center gap-1">
                            <User size={13} aria-hidden="true" />{' '}
                            {item.client || 'Client'}
                          </span>
                          <Link
                            href={`/case/${item.id}`}
                            className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold d-flex align-items-center gap-1 shadow-sm"
                            aria-label={`View case study: ${item.title}`}
                          >
                            View Case{' '}
                            <ArrowRight size={14} aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}


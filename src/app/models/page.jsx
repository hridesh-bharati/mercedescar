// src/app/models/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Car, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { dbService } from '@/services/dbService';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mercedesgaragedubai.com/';

// Skeleton Card
const SkeletonCard = () => (
  <div className="col-12 col-md-6 col-lg-4">
    <div className="glass-card border-0 h-100 overflow-hidden placeholder-glow p-3">
      <div
        className="bg-white placeholder rounded-4 mb-3"
        style={{ height: '210px' }}
      ></div>
      <div className="card-body p-2">
        <h4 className="placeholder col-6 mb-3 rounded"></h4>
        <p className="placeholder col-12 mb-2 rounded"></p>
        <p className="placeholder col-10 mb-3 rounded"></p>
        <div className="pt-3 border-top border-white">
          <span className="placeholder col-5 py-2 rounded-pill"></span>
        </div>
      </div>
    </div>
  </div>
);

export default function CarModelsCatalog() {
  const [models, setModels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const [imageErrors, setImageErrors] = useState({});

  const observerTarget = useRef(null);

  useEffect(() => {
    async function fetchModels() {
      const res = await dbService.getAll('car_models');
      if (res.success && res.data) {
        setModels(res.data);
      }
      setLoading(false);
    }
    fetchModels();
  }, []);

  const filteredModels = models.filter(
    (item) =>
      item.modelName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.maker?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedModels = filteredModels.slice(0, visibleCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleCount < filteredModels.length
        ) {
          setVisibleCount((prev) => prev + 12);
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [visibleCount, filteredModels.length]);

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  // ✅ JSON-LD Schema (ItemList + Breadcrumb)
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Mercedes-Benz Models Serviced in Dubai',
    description:
      'Complete list of Mercedes-Benz models serviced by Mercedes Garage Dubai in Al Quoz.',
    itemListElement: models.slice(0, 50).map((model, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: `Mercedes ${model.modelName}`,
      url: `${SITE_URL}/contact-us?model=${encodeURIComponent(model.modelName || '')}`,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Mercedes Models',
        item: `${SITE_URL}/models`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([itemListJsonLd, breadcrumbJsonLd]),
        }}
      />
      <Header />

      <main className="contact-main position-relative py-5 min-vh-100">
        <div className="contact-glow contact-glow-blue"></div>
        <div className="contact-glow contact-glow-pink"></div>

        <div className="container position-relative" style={{ zIndex: 2 }}>
          {/* Header & Search */}
          <div
            className="text-center mb-5"
            data-anim="down"
          >
            {/* ✅ PDF-aligned H1 */}
            <h1 className="fw-bold text-dark display-6 mb-2">
              Mercedes-Benz Models Service in Dubai
            </h1>
            <p className="text-muted small">
              Explore our Mercedes-Benz model catalog — specialist repair,
              servicing and maintenance for every model at our Al Quoz workshop
              in Dubai.
            </p>

            <div className="row justify-content-center mt-4">
              <div className="col-12 col-md-6">
                <div className="input-group glass-card overflow-hidden p-1 shadow-sm">
                  <span
                    className="input-group-text bg-transparent border-0 ps-3"
                    aria-hidden="true"
                  >
                    <Search size={18} className="text-muted" />
                  </span>
                  <input
                    type="search"
                    className="form-control border-0 py-2 small shadow-none bg-transparent text-dark"
                    placeholder="Search Mercedes model (e.g. G63, S500, GLC)..."
                    aria-label="Search Mercedes-Benz models"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setVisibleCount(12);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="row g-4">
              {[...Array(6)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : filteredModels.length === 0 ? (
            <div
              className="text-center py-5 glass-card border-0 p-5 mx-auto col-12 col-md-8 shadow-sm"
              data-anim="up"
            >
              <Car
                size={40}
                className="text-secondary opacity-50 mb-3 mx-auto"
                aria-hidden="true"
              />
              <h2 className="fs-6 fw-bold text-dark">
                No Mercedes Models Found
              </h2>
              <p className="small text-muted mb-0">
                Try searching with a different keyword.
              </p>
            </div>
          ) : (
            <>
              <div className="row g-4">
                {displayedModels.map((item, index) => {
                  const hasImage = item.imageUrl && !imageErrors[item.id];

                  return (
                    <div
                      className="col-12 col-md-6 col-lg-4"
                      key={item.id}
                      data-anim="up"
                      data-anim-delay={(index % 3) * 100}
                    >
                      <div className="glass-card h-100 d-flex flex-column overflow-hidden p-3">
                        {/* Image */}
                        <div
                          className="position-relative"
                          style={{ height: '220px' }}
                        >
                          {hasImage ? (
                            <div className="w-100 h-100 rounded-4 overflow-hidden bg-white border border-white position-relative">
                              <Image
                                src={item.imageUrl}
                                alt={`Mercedes ${item.modelName} — service at our Al Quoz Dubai workshop`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw"
                                className="object-fit-cover"
                                onError={() => handleImageError(item.id)}
                                priority={index < 3}
                              />
                            </div>
                          ) : (
                            <div className="w-100 h-100 rounded-4 bg-white border border-white d-flex align-items-center justify-content-center text-muted">
                              <Car
                                size={48}
                                className="opacity-25 text-danger"
                                aria-hidden="true"
                              />
                            </div>
                          )}
                          <span className="position-absolute top-0 end-0 m-3 badge bg-dark text-white px-3 py-2 rounded-pill small shadow-sm">
                            {item.maker || 'Mercedes'}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="card-body p-3 d-flex flex-column justify-content-between flex-grow-1">
                          <div>
                            <h2 className="fw-bold text-dark fs-5 mb-2">
                              Mercedes {item.modelName}
                            </h2>
                            <p
                              className="text-muted small mb-3 text-truncate-3"
                              style={{ lineHeight: '1.6' }}
                            >
                              {item.desc}
                            </p>
                          </div>

                          <div className="pt-3 border-top border-white mt-auto">
                            <Link
                              href={`/contact-us?model=${encodeURIComponent(item.modelName || '')}`}
                              className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold d-inline-flex align-items-center gap-1 shadow-none"
                              aria-label={`Inquire about Mercedes ${item.modelName} service`}
                            >
                              Inquire {item.modelName} Service{' '}
                              <ArrowRight size={14} aria-hidden="true" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Infinite Scroll Trigger */}
              {visibleCount < filteredModels.length && (
                <div ref={observerTarget} className="text-center mt-5 py-3">
                  <div
                    className="spinner-border spinner-border-sm text-danger"
                    role="status"
                  >
                    <span className="visually-hidden">
                      Loading more models...
                    </span>
                  </div>
                  <p className="text-muted small mt-2">
                    Loading more Mercedes models...
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}



'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  Car,
  Star,
  ShieldCheck,
  Wrench,
  Zap,
  Layers,
  Search,
} from 'lucide-react';

import { mercedesModels } from '../mercedesModels';

export default function ServiceGrid({ initialServices = [] }) {
  const searchParams = useSearchParams();
  const modelParam = searchParams.get('model');

  const [liveServices, setLiveServices] = useState(initialServices);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All Services');
  const [modelSearch, setModelSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const loadMoreRef = useRef(null);

  const filterCategories = [
    { label: 'All Services', icon: Zap },
    { label: 'G-Class', icon: Star },
    { label: 'S-Class', icon: ShieldCheck },
    { label: 'AMG', icon: Zap },
    { label: 'C-Class', icon: Car },
    { label: 'GLE', icon: Car },
    { label: 'GLC', icon: Car },
    { label: 'Engine', icon: Wrench },
    { label: 'Brakes', icon: ShieldCheck },
  ];

  // Sync initial server data
  useEffect(() => {
    setLiveServices(initialServices || []);
  }, [initialServices]);

  // URL model filter
  useEffect(() => {
    if (modelParam) {
      setSelectedFilter(modelParam);
      setVisibleCount(9);
    }
  }, [modelParam]);

  // Fallback fetch only if server returned no data
  useEffect(() => {
    if (initialServices?.length > 0) return;

    let active = true;

    async function fetchServices() {
      try {
        setLoading(true);

        const { dbService } = await import('@/services/dbService');
        const result = await dbService.getAll('services');

        if (active && result.success && Array.isArray(result.data)) {
          setLiveServices(result.data);
        }
      } catch (error) {
        console.error('Services fetch error:', error);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchServices();

    return () => {
      active = false;
    };
  }, [initialServices]);

  // Service filtering
  const filteredServices = liveServices.filter((service) => {
    const title = (service.title || '').toLowerCase();
    const model = (service.model || '').toLowerCase();
    const desc = (
      service.desc ||
      service.description ||
      ''
    ).toLowerCase();

    const q = searchQuery.toLowerCase().trim();

    const matchSearch =
      !q ||
      title.includes(q) ||
      model.includes(q) ||
      desc.includes(q);

    if (!matchSearch) return false;

    if (selectedFilter === 'All Services') return true;

    const key = selectedFilter.toLowerCase();

    if (
      key.includes('g-class') ||
      key.includes('g63') ||
      key.includes('g500')
    ) {
      return (
        title.includes('g-class') ||
        title.includes('g63') ||
        model.includes('g-class') ||
        model.includes('g63') ||
        title.includes('engine')
      );
    }

    if (
      key.includes('s-class') ||
      key.includes('s500') ||
      key.includes('s580')
    ) {
      return (
        title.includes('s-class') ||
        title.includes('s500') ||
        model.includes('s-class') ||
        title.includes('airmatic')
      );
    }

    if (key.includes('amg')) {
      return (
        title.includes('amg') ||
        model.includes('amg') ||
        title.includes('performance')
      );
    }

    if (
      key.includes('c-class') ||
      key.includes('c300') ||
      key.includes('c200')
    ) {
      return (
        title.includes('c-class') ||
        model.includes('c-class') ||
        title.includes('transmission')
      );
    }

    if (key.includes('gle')) {
      return title.includes('gle') || model.includes('gle');
    }

    if (key.includes('glc')) {
      return title.includes('glc') || model.includes('glc');
    }

    if (key === 'engine') {
      return (
        title.includes('engine') ||
        desc.includes('engine') ||
        title.includes('timing') ||
        title.includes('compressor')
      );
    }

    if (key === 'brakes') {
      return (
        title.includes('brake') ||
        desc.includes('brake') ||
        title.includes('rotor') ||
        title.includes('abs')
      );
    }

    return (
      model.includes(key) ||
      title.includes(key) ||
      desc.includes(key) ||
      model.includes('all models')
    );
  });

  // Prioritize exact model matches
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (selectedFilter === 'All Services') return 0;

    const key = selectedFilter.toLowerCase();

    const aMatch =
      (a.model || '').toLowerCase().includes(key) ||
      (a.title || '').toLowerCase().includes(key);

    const bMatch =
      (b.model || '').toLowerCase().includes(key) ||
      (b.title || '').toLowerCase().includes(key);

    return Number(bMatch) - Number(aMatch);
  });

  const displayedServices = sortedServices.slice(0, visibleCount);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(9);
  }, [selectedFilter, searchQuery]);

  // Infinite loading
  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element || visibleCount >= sortedServices.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isFetchingMore &&
          visibleCount < sortedServices.length
        ) {
          setIsFetchingMore(true);

          setTimeout(() => {
            setVisibleCount((prev) =>
              Math.min(prev + 9, sortedServices.length)
            );
            setIsFetchingMore(false);
          }, 300);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [visibleCount, sortedServices.length, isFetchingMore]);

  const filteredModels = mercedesModels.filter((item) =>
    item.model.toLowerCase().includes(modelSearch.toLowerCase())
  );

  const getServiceUrl = (service) => {
    const slug =
      service.slug ||
      service.id ||
      (service.title || '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    return `/services/${encodeURIComponent(slug)}`;
  };

  return (
    <section className="py-5 bg-light">
      <div className="container py-3">

        {/* TOP CONTROLS */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

          <div>
            <h2 className="fw-bold text-dark mb-1">
              Our Professional Services
            </h2>

            <p className="text-muted small mb-0">
              Expert Mercedes-Benz specialized repairs in Dubai.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-danger rounded-pill px-4 py-2 fw-bold shadow-sm d-inline-flex align-items-center gap-2 align-self-start align-self-md-auto"
            data-bs-toggle="modal"
            data-bs-target="#mercedesModelsModal"
          >
            <Layers size={16} />
            View All Mercedes Models
          </button>

        </div>

        {/* SEARCH AND FILTERS */}
        <div className="bg-white p-3 rounded-4 shadow-sm mb-4 border">

          <div className="d-flex gap-2 mb-3">
            <div className="input-group bg-light rounded-pill overflow-hidden border w-100">

              <span className="input-group-text bg-transparent border-0 ps-3 text-muted">
                <Search size={16} />
              </span>

              <input
                type="text"
                className="form-control border-0 py-2 small shadow-none bg-transparent"
                placeholder="Search services, models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {searchQuery && (
                <button
                  type="button"
                  className="btn border-0 text-muted px-3 shadow-none"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}

            </div>
          </div>

          <div className="d-flex align-items-center gap-2 overflow-auto pb-1 scrollbar-none">

            {filterCategories.map((cat) => {
              const IconComponent = cat.icon;
              const isActive = selectedFilter === cat.label;

              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => setSelectedFilter(cat.label)}
                  className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2 text-nowrap ${
                    isActive
                      ? 'btn-danger text-white shadow-sm'
                      : 'btn-light text-secondary border'
                  }`}
                >
                  <IconComponent
                    size={14}
                    className={isActive ? 'text-white' : 'text-danger'}
                  />
                  <span>{cat.label}</span>
                </button>
              );
            })}

          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status" />
          </div>
        ) : displayedServices.length === 0 ? (

          <div className="text-center py-5 card border-0 shadow-sm rounded-4 p-5 bg-white">

            <Car size={40} className="text-secondary opacity-50 mb-3 mx-auto" />

            <h5 className="fw-bold text-dark mb-2">
              No Services Found for "{selectedFilter}"
            </h5>

            <p className="text-muted small">
              Try another search or filter.
            </p>

            <button
              type="button"
              className="btn btn-dark btn-sm rounded-pill px-4 fw-bold mt-2 mx-auto"
              onClick={() => {
                setSelectedFilter('All Services');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>

          </div>

        ) : (

          <>
            <div className="row g-4">

              {displayedServices.map((service, index) => {
                const {
                  id,
                  title,
                  model,
                  desc,
                  description,
                  imageUrl,
                  imageUrls,
                } = service;

                const cardDesc = desc || description;

                const pics = Array.isArray(imageUrls) && imageUrls.length > 0
                  ? imageUrls.filter(Boolean)
                  : imageUrl
                    ? [imageUrl]
                    : [];

                const mainImage = pics[0];

                return (
                  <div
                    className="col-lg-4 col-md-6 col-12"
                    key={id || index}
                  >

                    <div className="modern-service-card h-100 bg-white rounded-4 overflow-hidden position-relative d-flex flex-column shadow-sm border">

                      {mainImage && (
                        <div
                          className="position-relative overflow-hidden bg-light"
                          style={{ height: '190px' }}
                        >
                          <img
                            src={mainImage}
                            alt={`${title || 'Mercedes service'} in Dubai`}
                            className="w-100 h-100 object-fit-cover"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />

                          {pics.length > 1 && (
                            <span className="position-absolute top-0 end-0 m-2 badge bg-dark bg-opacity-75 text-white px-2 py-1 rounded-pill small shadow-sm">
                              📷 {pics.length} Photos
                            </span>
                          )}
                        </div>
                      )}

                      <div className="card-body p-4 d-flex flex-column flex-grow-1 justify-content-between">

                        <div>

                          {model && (
                            <div className="mb-2">
                              <span
                                className="badge bg-danger bg-opacity-10 text-danger fw-bold px-2 py-1 rounded-2"
                                style={{ fontSize: '0.7rem' }}
                              >
                                {model}
                              </span>
                            </div>
                          )}

                          <h3
                            className="fw-bold text-dark mb-2"
                            style={{
                              fontSize: '1.1rem',
                              lineHeight: '1.35',
                            }}
                          >
                            {title}
                          </h3>

                          <p
                            className="text-muted small mb-3"
                            style={{
                              fontSize: '0.85rem',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              lineHeight: '1.5',
                            }}
                          >
                            {cardDesc}
                          </p>

                        </div>

                        <div className="pt-2 border-top border-light d-flex align-items-center justify-content-between mt-auto">

                          <Link
                            href={getServiceUrl(service)}
                            className="text-danger fw-bold text-decoration-none d-inline-flex align-items-center gap-1"
                            style={{ fontSize: '0.8rem' }}
                          >
                            <span>View Details</span>
                            <ArrowRight size={13} />
                          </Link>

                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}

            </div>

            <div ref={loadMoreRef} className="text-center py-4 mt-4">

              {isFetchingMore && (
                <div
                  className="spinner-border text-danger spinner-border-sm"
                  role="status"
                />
              )}

            </div>
          </>

        )}

        {/* MODEL SELECTOR MODAL */}
        <div
          className="modal fade"
          id="mercedesModelsModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">

            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">

              <div className="modal-header bg-dark text-white px-4 py-3">

                <h5 className="modal-title fw-bold fs-6">
                  Select Your Mercedes-Benz Model
                </h5>

                <button
                  type="button"
                  className="btn-close btn-close-white shadow-none"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />

              </div>

              <div className="modal-body p-4 bg-light">

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control rounded-pill px-3 py-2 small shadow-sm border"
                    placeholder="Search model (e.g. G63, S500, GLC)..."
                    value={modelSearch}
                    onChange={(e) => setModelSearch(e.target.value)}
                  />
                </div>

                <div className="row g-2">

                  {filteredModels.map((car) => (
                    <div className="col-6 col-md-3" key={car.id}>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFilter(car.model);
                          setVisibleCount(9);
                        }}
                        data-bs-dismiss="modal"
                        className="w-100 d-flex align-items-center justify-content-between px-3 py-2 rounded-pill bg-white text-dark model-pill-btn border shadow-sm text-start"
                      >
                        <span
                          className="fw-bold text-dark text-truncate small"
                          style={{ fontSize: '0.8rem' }}
                        >
                          {car.model}
                        </span>

                        <ArrowRight
                          size={12}
                          className="text-danger flex-shrink-0"
                        />
                      </button>

                    </div>
                  ))}

                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

      <style jsx global>{`
        .modern-service-card {
          transition: all 0.3s ease;
        }

        .modern-service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 25px rgba(15, 23, 42, 0.08) !important;
          border-color: rgba(225, 29, 72, 0.3) !important;
        }

        .model-pill-btn:hover {
          background-color: #e11d48 !important;
          color: #ffffff !important;
          border-color: #e11d48 !important;
        }

        .model-pill-btn:hover span,
        .model-pill-btn:hover svg {
          color: #ffffff !important;
        }

        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

    </section>
  );
}

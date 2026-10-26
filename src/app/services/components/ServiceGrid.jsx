// src/app/services/components/ServiceGrid.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Car, Star, ShieldCheck, Wrench, Zap, Layers, Search } from 'lucide-react';
import { mercedesModels } from '../mercedesModels';

export default function ServiceGrid({ initialServices }) {
  const searchParams = useSearchParams();
  const modelParam = searchParams.get('model');

  // ✅ Direct initial data load (No spinner if data came from server)
  const [liveServices, setLiveServices] = useState(initialServices || []);
  const [loading, setLoading] = useState(!initialServices || initialServices.length === 0);
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

  useEffect(() => {
    if (modelParam) setSelectedFilter(modelParam);
    // Fallback fetch (if server data was empty for some reason)
    if (!initialServices || initialServices.length === 0) {
      setLoading(true);
      import('@/services/dbService').then(({ dbService }) => {
        dbService.getAll('services').then((res) => {
          if (res.success && res.data) setLiveServices(res.data);
          setLoading(false);
        });
      });
    }
  }, [modelParam, initialServices]);

  // Robust Smart Filtering
  const filteredServices = liveServices.filter((service) => {
    const titleText = (service.title || '').toLowerCase();
    const modelText = (service.model || '').toLowerCase();
    const descText = (service.desc || service.description || '').toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchSearch = !q || titleText.includes(q) || modelText.includes(q) || descText.includes(q);
    if (selectedFilter === 'All Services') return matchSearch;

    const filterKey = selectedFilter.toLowerCase();
    
    if (filterKey.includes('g-class') || filterKey.includes('g63') || filterKey.includes('g500')) {
      return matchSearch && (titleText.includes('g-class') || titleText.includes('g63') || modelText.includes('g-class') || modelText.includes('g63') || titleText.includes('engine'));
    }
    if (filterKey.includes('s-class') || filterKey.includes('s500') || filterKey.includes('s580')) {
      return matchSearch && (titleText.includes('s-class') || titleText.includes('s500') || modelText.includes('s-class') || titleText.includes('airmatic'));
    }
    if (filterKey.includes('amg')) {
      return matchSearch && (titleText.includes('amg') || modelText.includes('amg') || titleText.includes('performance'));
    }
    if (filterKey.includes('c-class') || filterKey.includes('c300') || filterKey.includes('c200')) {
      return matchSearch && (titleText.includes('c-class') || modelText.includes('c-class') || titleText.includes('transmission'));
    }
    if (filterKey.includes('gle')) {
      return matchSearch && (titleText.includes('gle') || modelText.includes('gle'));
    }
    if (filterKey.includes('glc')) {
      return matchSearch && (titleText.includes('glc') || modelText.includes('glc'));
    }
    if (filterKey === 'engine') {
      return matchSearch && (titleText.includes('engine') || descText.includes('engine') || titleText.includes('timing') || titleText.includes('compressor'));
    }
    if (filterKey === 'brakes') {
      return matchSearch && (titleText.includes('brake') || descText.includes('brake') || titleText.includes('rotor') || titleText.includes('abs'));
    }

    return matchSearch && (modelText.includes(filterKey) || titleText.includes(filterKey) || descText.includes(filterKey) || modelText.includes('all models'));
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    if (selectedFilter === 'All Services') return 0;
    const filterKey = selectedFilter.toLowerCase();
    const aMatch = (a.model || '').toLowerCase().includes(filterKey) || (a.title || '').toLowerCase().includes(filterKey);
    const bMatch = (b.model || '').toLowerCase().includes(filterKey) || (b.title || '').toLowerCase().includes(filterKey);
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0;
  });

  const displayedServices = sortedServices.slice(0, visibleCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < sortedServices.length && !isFetchingMore) {
          setIsFetchingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 9, sortedServices.length));
            setIsFetchingMore(false);
          }, 300);
        }
      },
      { threshold: 0.1 }
    );
    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [visibleCount, sortedServices.length, isFetchingMore]);

  const filteredModels = mercedesModels.filter((item) =>
    item.model.toLowerCase().includes(modelSearch.toLowerCase())
  );

  return (
    <section className="py-5 bg-light">
      <div className="container py-3">
        
        {/* TOP CONTROLS */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">Our Professional Services</h2>
            <p className="text-muted small mb-0">Expert Mercedes-Benz specialized repairs in Dubai.</p>
          </div>
          <button 
            type="button" 
            className="btn btn-danger rounded-pill px-4 py-2 fw-bold shadow-sm d-inline-flex align-items-center gap-2 align-self-start align-self-md-auto"
            data-bs-toggle="modal" 
            data-bs-target="#mercedesModelsModal"
          >
            <Layers size={16} /> View All Mercedes Models
          </button>
        </div>

        {/* SEARCH & FILTERS */}
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
                <button className="btn border-0 text-muted px-3 shadow-none" onClick={() => setSearchQuery('')}>✕</button>
              )}
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 overflow-auto pb-1 scrollbar-none">
            {filterCategories.map((cat, idx) => {
              const IconComponent = cat.icon;
              const isActive = selectedFilter === cat.label;
              return (
                <button
                  key={idx}
                  onClick={() => { setSelectedFilter(cat.label); setVisibleCount(9); }}
                  className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2 text-nowrap ${
                    isActive ? 'btn-danger text-white shadow-sm' : 'btn-light text-secondary border'
                  }`}
                >
                  <IconComponent size={14} className={isActive ? 'text-white' : 'text-danger'} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SKELETON / SERVICES GRID */}
        {loading ? (
          <div className="row g-4">
            {[1, 2, 3].map((item) => (
              <div className="col-lg-4 col-md-6 col-12" key={item}>
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white p-3">
                  <div className="skeleton-box rounded-3 mb-3" style={{ height: '190px' }}></div>
                  <div className="skeleton-box rounded-2 mb-2" style={{ height: '18px', width: '35%' }}></div>
                  <div className="skeleton-box rounded-2 mb-2" style={{ height: '22px', width: '80%' }}></div>
                  <div className="skeleton-box rounded-2 mb-4" style={{ height: '36px', width: '100%' }}></div>
                </div>
              </div>
            ))}
          </div>
        ) : displayedServices.length === 0 ? (
          <div className="text-center py-5 card border-0 shadow-sm rounded-4 p-5 bg-white">
            <Car size={40} className="text-secondary opacity-50 mb-3 mx-auto" />
            <h5 className="fw-bold text-dark mb-2">No Services Found for "{selectedFilter}"</h5>
            <button className="btn btn-dark btn-sm rounded-pill px-4 fw-bold mt-2 mx-auto" onClick={() => { setSelectedFilter('All Services'); setSearchQuery(''); setVisibleCount(9); }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="row g-4">
              {displayedServices.map((service, index) => {
                const { id, title, model, desc, description, imageUrl, imageUrls } = service;
                const cardDesc = desc || description;
                const pics = imageUrls?.length > 0 ? imageUrls : (imageUrl ? [imageUrl] : []);
                const mainImage = pics[0];

                return (
                  <div className="col-lg-4 col-md-6 col-12" key={id || index}>
                    <div className="modern-service-card h-100 bg-white rounded-4 overflow-hidden position-relative d-flex flex-column shadow-sm border">
                      {mainImage && (
                        <div className="position-relative overflow-hidden" style={{ height: '190px' }}>
                          <Image src={mainImage} alt={title || 'Mercedes service'} fill className="object-fit-cover" sizes="(max-width: 768px) 100vw, 33vw" />
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
                              <span className="badge bg-danger bg-opacity-10 text-danger fw-bold px-2 py-1 rounded-2" style={{ fontSize: '0.7rem' }}>
                                {model}
                              </span>
                            </div>
                          )}
                          <h3 className="fw-bold text-dark mb-2" style={{ fontSize: '1.1rem', lineHeight: '1.35' }}>{title}</h3>
                          <p className="text-muted small mb-3" style={{ fontSize: '0.85rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5' }}>
                            {cardDesc}
                          </p>
                        </div>
                        <div className="pt-2 border-top border-light d-flex align-items-center justify-content-between mt-auto">
                          <Link href={`/services/${id}`} className="text-danger fw-bold text-decoration-none d-inline-flex align-items-center gap-1" style={{ fontSize: '0.8rem' }}>
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
              {isFetchingMore && <div className="spinner-border text-danger spinner-border-sm" role="status" />}
            </div>
          </>
        )}

        {/* MODEL SELECTOR MODAL */}
        <div className="modal fade" id="mercedesModelsModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header bg-dark text-white px-4 py-3">
                <h5 className="modal-title fw-bold fs-6">Select Your Mercedes-Benz Model</h5>
                <button type="button" className="btn-close btn-close-white shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
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
                        onClick={() => { setSelectedFilter(car.model); setVisibleCount(9); }}
                        data-bs-dismiss="modal"
                        className="w-100 d-flex align-items-center justify-content-between px-3 py-2 rounded-pill bg-white text-dark model-pill-btn border shadow-sm text-start"
                      >
                        <span className="fw-bold text-dark text-truncate small" style={{ fontSize: '0.8rem' }}>{car.model}</span>
                        <ArrowRight size={12} className="text-danger flex-shrink-0" />
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
        @keyframes shimmer { 0% { background-position: -200px 0; } 100% { background-position: calc(200px + 100%) 0; } }
        .skeleton-box { background: #e2e8f0; background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%); background-size: 400px 100%; animation: shimmer 1.2s infinite linear; }
        .modern-service-card { transition: all 0.3s ease; }
        .modern-service-card:hover { transform: translateY(-4px); box-shadow: 0 12px 25px rgba(15, 23, 42, 0.08) !important; border-color: rgba(225, 29, 72, 0.3) !important; }
        .model-pill-btn:hover { background-color: #e11d48 !important; color: #ffffff !important; border-color: #e11d48 !important; }
        .model-pill-btn:hover span, .model-pill-btn:hover svg { color: #ffffff !important; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
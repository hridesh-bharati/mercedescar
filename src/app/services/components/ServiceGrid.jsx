// src/app/services/components/ServiceGrid.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Search, SlidersHorizontal, Car, Star, ShieldCheck, Wrench, Zap, Layers } from 'lucide-react';
import { dbService } from '@/services/dbService';
import { mercedesModels } from '../mercedesModels';

export default function ServiceGrid() {
  const searchParams = useSearchParams();
  const modelParam = searchParams.get('model');

  const [liveServices, setLiveServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Services');
  const [modelSearch, setModelSearch] = useState('');

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
    async function fetchServices() {
      const res = await dbService.getAll('services');
      if (res.success && res.data) {
        setLiveServices(res.data);
      } else {
        setLiveServices([]);
      }
      setLoading(false);
    }
    fetchServices();

    // Agar URL mein ?model=XYZ diya hai, toh usko active filter set kar do
    if (modelParam) {
      setSelectedFilter(modelParam);
    }
  }, [modelParam]);

  // Robust Filter Logic
  const filteredServices = liveServices.filter((service) => {
    const titleText = (service.title || '').toLowerCase();
    const modelText = (service.model || '').toLowerCase();
    const descText = (service.desc || service.description || '').toLowerCase();

    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      !query || titleText.includes(query) || modelText.includes(query) || descText.includes(query);

    if (selectedFilter === 'All Services') return matchesSearch;

    const filterKey = selectedFilter.toLowerCase();
    const matchesCategory = titleText.includes(filterKey) || modelText.includes(filterKey) || descText.includes(filterKey);

    return matchesSearch && matchesCategory;
  });

  // Filter 127 Mercedes Models for Modal
  const filteredModels = mercedesModels.filter((item) =>
    item.model.toLowerCase().includes(modelSearch.toLowerCase()) ||
    item.maker.toLowerCase().includes(modelSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="services-grid-section py-5">
      <div className="container py-3">
        
        {/* SECTION 1: ACTUAL SERVICES GRID */}
        <div className="mb-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark display-6 mb-2">Our Professional Services</h2>
            <p className="text-muted small">Expert multi-brand and Mercedes-Benz specialized repairs in Dubai.</p>
          </div>

          {/* Filter Bar */}
          <div className="filter-bar-container mb-4">
            <div className="d-flex align-items-center justify-content-between mb-3 px-1">
              <span className="filter-bar-heading">Filter Repair Categories & Models</span>
              <span className="badge bg-danger bg-opacity-10 text-danger px-3 py-2 rounded-pill fw-bold small">
                {filteredServices.length} Services Found
              </span>
            </div>

            <div className="filter-pills-wrapper d-flex align-items-center gap-2 overflow-auto pb-2 scrollbar-none">
              {filterCategories.map((cat, idx) => {
                const IconComponent = cat.icon;
                const isActive = selectedFilter === cat.label;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedFilter(cat.label)}
                    className={`filter-pill-btn d-inline-flex align-items-center gap-2 ${isActive ? 'active' : ''}`}
                  >
                    <IconComponent size={15} className={isActive ? 'text-white' : 'text-danger'} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Box & Modal Trigger Button */}
          <div className="row g-3 mb-5 align-items-center">
            <div className="col-12 col-md-6">
              <div className="search-bar-box d-flex align-items-center bg-white shadow-sm">
                <span className="search-icon-wrap ps-3 text-muted"><Search size={18} /></span>
                <input 
                  type="text" 
                  className="form-control border-0 py-3 small shadow-none bg-transparent" 
                  placeholder="Search Mercedes repair, engine, brakes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="btn btn-link text-muted small pe-3 text-decoration-none" onClick={() => setSearchQuery('')}>Clear</button>
                )}
              </div>
            </div>

            <div className="col-12 col-md-6 text-md-end d-flex justify-content-md-end align-items-center gap-2 flex-wrap">
              <div className="active-filter-badge d-inline-flex align-items-center gap-2">
                <SlidersHorizontal size={14} className="text-danger" />
                <span>Filter: <strong>{selectedFilter}</strong></span>
              </div>

              {/* Bootstrap Modal Trigger Button */}
              <button 
                type="button" 
                className="btn btn-danger rounded-pill px-4 py-3 fw-bold shadow-sm d-inline-flex align-items-center gap-2 small"
                data-bs-toggle="modal" 
                data-bs-target="#mercedesModelsModal"
              >
                <Layers size={16} /> View All 127 Mercedes Models
              </button>
            </div>
          </div>

          {/* Services Cards Grid */}
          {filteredServices.length === 0 ? (
            <div className="text-center py-5 text-muted card border-0 shadow-sm rounded-4 p-5 bg-white">
              <Car size={45} className="text-secondary opacity-50 mb-3 mx-auto" />
              <h5 className="fw-bold text-dark mb-2">No Matching Services Found for "{selectedFilter}"</h5>
              <p className="small text-muted mb-3">Try choosing another category or view all services.</p>
              <button className="btn btn-dark btn-sm rounded-pill px-4 fw-bold w-fit mx-auto" onClick={() => { setSearchQuery(''); setSelectedFilter('All Services'); }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {filteredServices.map((service, index) => {
                const { id, title, model, desc, description, imageUrl, imageUrls } = service;
                const cardDesc = desc || description;
                const pics = imageUrls && imageUrls.length > 0 ? imageUrls : (imageUrl ? [imageUrl] : []);
                const mainImage = pics[0];
                const formattedIndex = String(index + 1).padStart(2, '0');

                return (
                  <div className="col-lg-4 col-md-6 col-12" key={id || index}>
                    <div className="pro-service-card h-100 bg-white rounded-4 overflow-hidden position-relative d-flex flex-column shadow-sm">
                      {mainImage && (
                        <div className="service-card-img-wrap position-relative overflow-hidden m-3 rounded-3" style={{ height: '240px' }}>
                          <img src={mainImage} alt={title} className="w-100 h-100 object-fit-cover" />
                          {pics.length > 1 && (
                            <span className="position-absolute top-0 end-0 m-3 badge bg-dark bg-opacity-75 text-white px-2 py-1 rounded-pill small shadow-sm">
                              📷 {pics.length} Photos
                            </span>
                          )}
                        </div>
                      )}
                      <div className="card-body p-4 pt-2 d-flex flex-column flex-grow-1 justify-content-between">
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <span className="service-index-badge">{formattedIndex}</span>
                            {model && <span className="service-model-badge">{model}</span>}
                          </div>
                          <h3 className="service-card-title">{title}</h3>
                          <p className="service-card-desc">{cardDesc}</p>
                        </div>
                        <div className="pt-3 border-top border-light d-flex align-items-center justify-content-between mt-auto">
                          <Link href={`/services/${id}`} className="service-detail-link d-inline-flex align-items-center gap-2 text-decoration-none">
                            <span>VIEW DETAILS & GALLERY</span>
                            <div className="arrow-circle-icon d-flex align-items-center justify-content-center"><ArrowRight size={13} /></div>
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

        {/* BOOTSTRAP MODAL FOR ALL 127 MERCEDES MODELS */}
        <div className="modal fade" id="mercedesModelsModal" tabIndex="-1" aria-labelledby="mercedesModelsModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              
              <div className="modal-header bg-dark text-white px-4 py-3">
                <div className="d-flex align-items-center gap-2">
                  <div className="bg-danger text-white rounded-3 p-2">
                    <Car size={18} />
                  </div>
                  <div>
                    <h5 className="modal-title fw-bold m-0 fs-6" id="mercedesModelsModalLabel">Select Your Mercedes-Benz Model</h5>
                    <small className="text-white-50" style={{ fontSize: '0.75rem' }}>Click any model to filter services instantly</small>
                  </div>
                </div>
                <button type="button" className="btn-close btn-close-white shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body p-4 bg-light">
                <div className="row justify-content-center mb-3">
                  <div className="col-12">
                    <div className="search-bar-box d-flex align-items-center bg-white shadow-sm border">
                      <span className="search-icon-wrap ps-3 text-muted"><Search size={16} /></span>
                      <input 
                        type="text" 
                        className="form-control border-0 py-2 small shadow-none bg-transparent" 
                        placeholder="Search model (e.g. G63, S500, GLC, C43)..."
                        value={modelSearch}
                        onChange={(e) => setModelSearch(e.target.value)}
                      />
                      {modelSearch && (
                        <button className="btn btn-link text-muted small pe-3 text-decoration-none" onClick={() => setModelSearch('')}>Clear</button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3 px-1">
                  <span className="fw-bold text-secondary small uppercase" style={{ fontSize: '0.75rem' }}>Directory List</span>
                  <span className="badge bg-danger bg-opacity-10 text-danger px-3 py-1 rounded-pill small fw-bold">
                    Showing {filteredModels.length} of 127 Models
                  </span>
                </div>

                <div className="row g-2">
                  {filteredModels.map((car) => (
                    <div className="col-6 col-md-3" key={car.id}>
                      <button 
                        type="button"
                        onClick={() => setSelectedFilter(car.model)}
                        data-bs-dismiss="modal"
                        className="w-100 d-flex align-items-center justify-content-between px-3 py-2 rounded-pill bg-white text-dark model-pill-btn border shadow-sm text-start"
                      >
                        <span className="fw-bold text-dark text-truncate small" style={{ fontSize: '0.8rem' }}>{car.model}</span>
                        <span className="text-danger flex-shrink-0 ms-1">
                          <ArrowRight size={12} />
                        </span>
                      </button>
                    </div>
                  ))}
                </div>

              </div>

              <div className="modal-footer bg-white px-4 py-2 border-top">
                <button type="button" className="btn btn-dark btn-sm rounded-pill px-4 fw-bold small" data-bs-dismiss="modal">Close</button>
              </div>

            </div>
          </div>
        </div>

      </div>

      <style jsx global>{`
        .model-pill-btn {
          transition: all 0.2s ease;
          border-color: #e2e8f0 !important;
          cursor: pointer;
        }
        .model-pill-btn:hover {
          background-color: #e11d48 !important;
          color: #ffffff !important;
          border-color: #e11d48 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(225, 29, 72, 0.2);
        }
        .model-pill-btn:hover .text-danger {
          color: #ffffff !important;
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
// src/app/services/components/ServiceGrid.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Search, Car, Layers } from 'lucide-react';
import { dbService } from '@/services/dbService';
import { mercedesModels } from '../mercedesModels';

export default function ServiceGrid() {
  const searchParams = useSearchParams();
  const modelParam = searchParams.get('model');

  const [liveServices, setLiveServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [modelSearch, setModelSearch] = useState('');

  useEffect(() => {
    async function fetchServices() {
      const res = await dbService.getAll('services');
      setLiveServices(res.success && res.data ? res.data : []);
      setLoading(false);
    }
    fetchServices();
    if (modelParam) setSelectedFilter(modelParam);
  }, [modelParam]);

  const quickFilters = ['All', 'G-Class', 'S-Class', 'AMG', 'C-Class', 'GLE', 'GLC'];

  const filteredServices = liveServices.filter((s) => {
    const title = (s.title || '').toLowerCase();
    const model = (s.model || '').toLowerCase();
    const desc = (s.desc || s.description || '').toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchSearch = !q || title.includes(q) || model.includes(q) || desc.includes(q);
    if (selectedFilter === 'All') return matchSearch;

    const key = selectedFilter.toLowerCase();
    return matchSearch && (title.includes(key) || model.includes(key) || desc.includes(key));
  });

  const filteredModels = mercedesModels.filter(
    (m) =>
      m.model.toLowerCase().includes(modelSearch.toLowerCase()) ||
      m.maker.toLowerCase().includes(modelSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-danger spinner-border-sm" role="status" />
      </div>
    );
  }

  return (
    <section className="py-3 bg-light">
      <div className="container px-2 px-md-3">
        {/* Sticky Search & Filters */}
        <div className="sticky-top bg-white pt-2 pb-3 mb-3 shadow-sm rounded-3 px-3" style={{ zIndex: 10 }}>
          <div className="d-flex gap-2 mb-2">
            <div className="input-group bg-light rounded-pill overflow-hidden border">
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
                <button className="btn border-0 text-muted px-3 shadow-none" onClick={() => setSearchQuery('')}>
                  ✕
                </button>
              )}
            </div>
            <button
              type="button"
              className="btn btn-danger rounded-pill px-3 fw-bold d-flex align-items-center gap-1 flex-shrink-0 shadow-none"
              data-bs-toggle="modal"
              data-bs-target="#mercedesModelsModal"
            >
              <Layers size={16} />
              <span className="d-none d-sm-inline small">Models</span>
            </button>
          </div>

          <div className="d-flex gap-2 overflow-auto scrollbar-none pb-1">
            {quickFilters.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`btn btn-sm rounded-pill px-3 fw-bold text-nowrap shadow-none ${
                  selectedFilter === f ? 'btn-danger' : 'btn-outline-secondary bg-white text-dark border-0'
                }`}
                style={{ fontSize: '0.78rem' }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Services List - Pure Clean Light Cards */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-3 shadow-sm p-4 border">
            <Car size={40} className="text-secondary opacity-50 mb-2 mx-auto" />
            <h6 className="fw-bold mb-1">No Services Found</h6>
            <p className="small text-muted mb-3">Try a different search or filter.</p>
            <button
              className="btn btn-dark btn-sm rounded-pill px-4 fw-bold shadow-none"
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('All');
              }}
            >
              Reset
            </button>
          </div>
        ) : (
          <div className="row g-2 g-md-3">
            {filteredServices.map((service, index) => {
              const { id, title, model, desc, description, imageUrl, imageUrls, price } = service;
              const cardDesc = desc || description;
              const pics = imageUrls?.length > 0 ? imageUrls : imageUrl ? [imageUrl] : [];
              const mainImage = pics[0];

              return (
                <div className="col-6 col-lg-4 col-md-6" key={id || index}>
                  <Link
                    href={`/services/${id}`}
                    className="card h-100 bg-white rounded-3 overflow-hidden text-decoration-none border shadow-sm service-card"
                  >
                    {mainImage ? (
                      <div className="position-relative bg-light" style={{ height: '140px' }}>
                        <img src={mainImage} alt={title} className="w-100 h-100 object-fit-cover" loading="lazy" />
                        {pics.length > 1 && (
                          <span className="position-absolute top-0 end-0 m-1 bg-dark bg-opacity-75 text-white px-2 py-1 rounded-pill" style={{ fontSize: '9px' }}>
                            📷 {pics.length}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '140px' }}>
                        <Car size={28} className="text-danger opacity-50" />
                      </div>
                    )}
                    <div className="card-body p-2 p-md-3 d-flex flex-column bg-white">
                      {model && (
                        <span className="badge bg-danger bg-opacity-10 text-danger fw-bold mb-1 align-self-start" style={{ fontSize: '0.65rem' }}>
                          {model}
                        </span>
                      )}
                      <h3 className="fw-bold text-dark mb-1 text-truncate-2" style={{ fontSize: '0.85rem' }}>{title}</h3>
                      <p className="text-muted mb-2 text-truncate-2" style={{ fontSize: '0.72rem', lineHeight: '1.4' }}>{cardDesc}</p>
                      
                      {price && (
                        <div className="text-danger fw-bold mb-2" style={{ fontSize: '0.75rem' }}>
                          Price: ${price}
                        </div>
                      )}

                      <div className="text-danger fw-bold d-flex align-items-center gap-1 mt-auto" style={{ fontSize: '0.7rem' }}>
                        <span>View Details</span>
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* Models Modal */}
        <div className="modal fade" id="mercedesModelsModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div className="modal-content border-0 rounded-4 overflow-hidden bg-white">
              <div className="modal-header bg-dark text-white px-3 py-2">
                <h5 className="modal-title fw-bold m-0 small">Select Model</h5>
                <button type="button" className="btn-close btn-close-white shadow-none" data-bs-dismiss="modal" />
              </div>
              <div className="modal-body p-3 bg-light">
                <div className="input-group bg-white rounded-pill overflow-hidden border mb-3">
                  <span className="input-group-text bg-transparent border-0 ps-3 text-muted">
                    <Search size={15} />
                  </span>
                  <input
                    type="text"
                    className="form-control border-0 py-2 small shadow-none bg-transparent"
                    placeholder="Search model..."
                    value={modelSearch}
                    onChange={(e) => setModelSearch(e.target.value)}
                  />
                </div>
                <div className="row g-2">
                  {filteredModels.map((car) => (
                    <div className="col-6 col-md-4 col-lg-3" key={car.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedFilter(car.model)}
                        data-bs-dismiss="modal"
                        className="btn btn-outline-secondary bg-white text-dark border w-100 text-start py-2 px-3 rounded-2 fw-bold shadow-sm model-btn"
                        style={{ fontSize: '0.72rem' }}
                      >
                        {car.model}
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
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        .text-truncate-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .service-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .service-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08) !important;
        }
        .model-btn:hover {
          background-color: #e11d48 !important;
          border-color: #e11d48 !important;
          color: #fff !important;
        }
      `}</style>
    </section>
  );
}
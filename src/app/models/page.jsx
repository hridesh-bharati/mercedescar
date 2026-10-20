// src/app/models/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { dbService } from '@/services/dbService';
import { Search, Car, ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CarModelsCatalog() {
  const [models, setModels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12); // Default 12 cards show honge

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

  // Filter models based on live search query
  const filteredModels = models.filter((item) => 
    item.modelName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.maker?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination slice (Sirf utne hi dikhao jitna visibleCount hai)
  const displayedModels = filteredModels.slice(0, visibleCount);

  // Load more handler
  const loadMoreCards = () => {
    setVisibleCount((prev) => prev + 12);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: '60vh' }}>
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading Catalog...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container py-5 min-vh-100 bg-light">
        {/* Header & Search Section */}
        <div className="text-center mb-5">
          <h1 className="fw-bold text-dark display-6 mb-2">Mercedes-Benz Model Catalog</h1>
          <p className="text-muted small">Explore our database of luxury car models, specifications, and expert service info.</p>
          
          <div className="row justify-content-center mt-4">
            <div className="col-12 col-md-6">
              <div className="input-group shadow-sm rounded-pill overflow-hidden border bg-white">
                <span className="input-group-text bg-white border-0 ps-4">
                  <Search size={18} className="text-muted" />
                </span>
                <input 
                  type="text" 
                  className="form-control border-0 py-3 small shadow-none bg-transparent" 
                  placeholder="Search model (e.g. G63, S500, GLC)..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(12); // Search karte hi reset count to 12
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Grid Display */}
        {filteredModels.length === 0 ? (
          <div className="text-center py-5 card border-0 shadow-sm rounded-4 p-5 bg-white text-muted">
            <Car size={40} className="text-secondary opacity-50 mb-2 mx-auto" />
            <h6 className="fw-bold text-dark">No car models found</h6>
            <p className="small mb-0">Try searching with a different keyword or add models from admin panel.</p>
          </div>
        ) : (
          <>
            <div className="row g-4">
              {displayedModels.map((item) => (
                <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                  <div className="card border-0 shadow-sm rounded-4 h-100 bg-white overflow-hidden d-flex flex-column model-card">
                    {item.imageUrl ? (
                      <div className="position-relative bg-light" style={{ height: '220px' }}>
                        <img src={item.imageUrl} alt={item.modelName} className="w-100 h-100 object-fit-cover" loading="lazy" />
                        <span className="position-absolute top-0 end-0 m-3 badge bg-dark text-white px-3 py-2 rounded-pill small">
                          {item.maker || 'Mercedes'}
                        </span>
                      </div>
                    ) : (
                      <div className="bg-light d-flex align-items-center justify-content-center text-muted" style={{ height: '220px' }}>
                        <Car size={48} className="opacity-25 text-danger" />
                      </div>
                    )}

                    <div className="card-body p-4 d-flex flex-column justify-content-between">
                      <div>
                        <h4 className="fw-bold text-dark fs-5 mb-2">{item.modelName}</h4>
                        <p className="text-muted small mb-3 text-truncate-3" style={{ lineHeight: '1.6' }}>{item.desc}</p>
                      </div>
                      
                      <div className="pt-3 border-top mt-auto">
                        <Link href="/contact-us" className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold d-inline-flex align-items-center gap-1 shadow-none">
                          Inquire Service <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button (Instagram / Flipkart Style Lazy Load Trigger) */}
            {visibleCount < filteredModels.length && (
              <div className="text-center mt-5">
                <button 
                  onClick={loadMoreCards}
                  className="btn btn-dark rounded-pill px-5 py-3 fw-bold shadow-sm d-inline-flex align-items-center gap-2"
                  style={{ fontSize: '0.85rem' }}
                >
                  Load More Models <ChevronDown size={16} />
                </button>
                <p className="text-muted small mt-2">
                  Showing {displayedModels.length} of {filteredModels.length} models
                </p>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />

      <style jsx global>{`
        .model-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .model-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.1) !important;
          border-color: rgba(225, 29, 72, 0.3) !important;
        }
        .text-truncate-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
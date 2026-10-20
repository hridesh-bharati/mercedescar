'use client';
// src/app/models/page.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { dbService } from '@/services/dbService';
import { Search, Car, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AOS from 'aos';

// Skeleton Card Component for Loading State
const SkeletonCard = () => (
  <div className="col-12 col-md-6 col-lg-4">
    <div className="card border-0 shadow-sm rounded-4 h-100 bg-white overflow-hidden placeholder-glow">
      <div className="bg-light placeholder" style={{ height: '230px' }}></div>
      <div className="card-body p-4">
        <h4 className="placeholder col-6 mb-3 rounded"></h4>
        <p className="placeholder col-12 mb-2 rounded"></p>
        <p className="placeholder col-10 mb-2 rounded"></p>
        <p className="placeholder col-8 mb-4 rounded"></p>
        <div className="pt-3 border-top">
          <span className="placeholder col-4 py-2 rounded-pill"></span>
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

  // Infinite Scroll Observer Ref
  const observerTarget = useRef(null);

  useEffect(() => {
    async function fetchModels() {
      const res = await dbService.getAll('car_models');
      if (res.success && res.data) {
        setModels(res.data);
      }
      setLoading(false);
      AOS.refresh(); // Refresh AOS after data loads
    }
    fetchModels();
  }, []);

  // Filter models based on live search query
  const filteredModels = models.filter((item) => 
    item.modelName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.maker?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedModels = filteredModels.slice(0, visibleCount);

  // Infinite Scroll Logic using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredModels.length) {
          setVisibleCount((prev) => prev + 12);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) observer.disconnect();
    };
  }, [visibleCount, filteredModels.length]);

  // Refresh AOS when visibleCount increases so new cards animate
  useEffect(() => {
    setTimeout(() => {
      AOS.refresh();
    }, 200);
  }, [visibleCount]);

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <>
      <Header />
      <main className="bg-light py-5 min-vh-100">
        <div className="container">
          
          {/* Header & Search Section */}
          <div className="text-center mb-5" data-aos="fade-down" data-aos-duration="800">
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
                    className="form-control border-0 py-3 small shadow-none bg-transparent text-dark" 
                    placeholder="Search model (e.g. G63, S500, GLC)..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setVisibleCount(12); // Reset count on search
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Grid Display */}
          {loading ? (
            // Skeleton Loading State
            <div className="row g-4">
              {[...Array(6)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : filteredModels.length === 0 ? (
            // No Results State
            <div className="text-center py-5 card border-0 shadow-sm rounded-4 p-5 bg-white" data-aos="fade-up">
              <Car size={40} className="text-secondary opacity-50 mb-3 mx-auto" />
              <h6 className="fw-bold text-dark">No car models found</h6>
              <p className="small text-muted mb-0">Try searching with a different keyword or add models from admin panel.</p>
            </div>
          ) : (
            <>
              <div className="row g-4">
                {displayedModels.map((item, index) => {
                  const hasImage = item.imageUrl && !imageErrors[item.id];

                  return (
                    <div className="col-12 col-md-6 col-lg-4" key={item.id} data-aos="fade-up" data-aos-delay={(index % 3) * 100}>
                      <div className="card border-0 shadow-sm rounded-4 h-100 bg-white overflow-hidden d-flex flex-column model-card">
                        
                        {/* Image Container */}
                        <div className="position-relative p-2" style={{ height: '230px' }}>
                          {hasImage ? (
                            <div className="w-100 h-100 rounded-3 overflow-hidden bg-light border">
                              <img 
                                src={item.imageUrl} 
                                alt={item.modelName} 
                                className="w-100 h-100 object-fit-cover" 
                                loading="lazy" 
                                onError={() => handleImageError(item.id)}
                              />
                            </div>
                          ) : (
                            <div className="w-100 h-100 rounded-3 bg-light border d-flex align-items-center justify-content-center text-muted">
                              <Car size={48} className="opacity-25 text-danger" />
                            </div>
                          )}
                          <span className="position-absolute top-0 end-0 m-3 badge bg-dark text-white px-3 py-2 rounded-pill small shadow-sm">
                            {item.maker || 'Mercedes'}
                          </span>
                        </div>

                        <div className="card-body p-4 d-flex flex-column justify-content-between">
                          <div>
                            <h4 className="fw-bold text-dark fs-5 mb-2">{item.modelName}</h4>
                            <p className="text-muted small mb-3 text-truncate-3" style={{ lineHeight: '1.6' }}>
                              {item.desc}
                            </p>
                          </div>
                          
                          <div className="pt-3 border-top mt-auto">
                            <Link href="/contact-us" className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold d-inline-flex align-items-center gap-1 shadow-none">
                              Inquire Service <ArrowRight size={14} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Infinite Scroll Trigger Element (Absorption Target) */}
              {visibleCount < filteredModels.length && (
                <div ref={observerTarget} className="text-center mt-5 py-3">
                  {/* Optional: You can add a small loader here to show it's fetching next items */}
                  <div className="spinner-border spinner-border-sm text-danger" role="status">
                    <span className="visually-hidden">Loading more...</span>
                  </div>
                  <p className="text-muted small mt-2">Loading more models...</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />

      <style jsx global>{`
        /* Card Hover Effect */
        .model-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .model-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.1) !important;
        }

        /* Text truncate */
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
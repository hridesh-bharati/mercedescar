'use client';
// src/app/models/page.jsx
import { useState, useEffect, useRef } from 'react';
import { dbService } from '@/services/dbService';
import { Search, Car, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AOS from 'aos';

// Skeleton Card Component with Glassmorphism
const SkeletonCard = () => (
  <div className="col-12 col-md-6 col-lg-4">
    <div className="glass-card border-0 h-100 overflow-hidden placeholder-glow p-3">
      <div className="bg-white placeholder rounded-4 mb-3" style={{ height: '210px' }}></div>
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
      AOS.refresh();
    }
    fetchModels();
  }, []);

  const filteredModels = models.filter((item) => 
    item.modelName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.maker?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedModels = filteredModels.slice(0, visibleCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredModels.length) {
          setVisibleCount((prev) => prev + 12);
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) observer.disconnect();
    };
  }, [visibleCount, filteredModels.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 200);
    return () => clearTimeout(timer);
  }, [visibleCount]);

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <>
      <Header />
      
      {/* Main Section with Colorful Gradient & Glow Effects */}
      <main className="contact-main position-relative py-5 min-vh-100">
        
        {/* Ambient Background Colorful Glows */}
        <div className="contact-glow contact-glow-blue"></div>
        <div className="contact-glow contact-glow-pink"></div>

        <div className="container position-relative" style={{ zIndex: 2 }}>
          
          {/* Header & Search Section */}
          <div className="text-center mb-5" data-aos="fade-down" data-aos-duration="800">
            <h1 className="fw-bold text-dark display-6 mb-2">Mercedes-Benz Model Catalog</h1>
            <p className="text-muted small">Explore our database of luxury car models, specifications, and expert service info.</p>
            
            <div className="row justify-content-center mt-4">
              <div className="col-12 col-md-6">
                {/* Search input with Glassmorphism */}
                <div className="input-group glass-card overflow-hidden p-1 shadow-sm">
                  <span className="input-group-text bg-transparent border-0 ps-3">
                    <Search size={18} className="text-muted" />
                  </span>
                  <input 
                    type="text" 
                    className="form-control border-0 py-2 small shadow-none bg-transparent text-dark" 
                    placeholder="Search model (e.g. G63, S500, GLC)..."
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

          {/* Grid Display */}
          {loading ? (
            <div className="row g-4">
              {[...Array(6)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : filteredModels.length === 0 ? (
            <div className="text-center py-5 glass-card border-0 p-5 mx-auto col-12 col-md-8 shadow-sm" data-aos="fade-up">
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
                      {/* Glass Card with 3D Effect */}
                      <div className="glass-card h-100 d-flex flex-column overflow-hidden p-3">
                        
                        {/* Image Container */}
                        <div className="position-relative" style={{ height: '220px' }}>
                          {hasImage ? (
                            <div className="w-100 h-100 rounded-4 overflow-hidden bg-white border border-white">
                              <img 
                                src={item.imageUrl} 
                                alt={item.modelName} 
                                className="w-100 h-100 object-fit-cover" 
                                loading="lazy" 
                                onError={() => handleImageError(item.id)}
                              />
                            </div>
                          ) : (
                            <div className="w-100 h-100 rounded-4 bg-white border border-white d-flex align-items-center justify-content-center text-muted">
                              <Car size={48} className="opacity-25 text-danger" />
                            </div>
                          )}
                          <span className="position-absolute top-0 end-0 m-3 badge bg-dark text-white px-3 py-2 rounded-pill small shadow-sm">
                            {item.maker || 'Mercedes'}
                          </span>
                        </div>

                        {/* Card Content */}
                        <div className="card-body p-3 d-flex flex-column justify-content-between flex-grow-1">
                          <div>
                            <h4 className="fw-bold text-dark fs-5 mb-2">{item.modelName}</h4>
                            <p className="text-muted small mb-3 text-truncate-3" style={{ lineHeight: '1.6' }}>
                              {item.desc}
                            </p>
                          </div>
                          
                          <div className="pt-3 border-top border-white mt-auto">
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

              {/* Infinite Scroll Trigger Element */}
              {visibleCount < filteredModels.length && (
                <div ref={observerTarget} className="text-center mt-5 py-3">
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

      {/* Fully Combined Custom Glassmorphism Styles */}
      <style jsx global>{`
        .contact-main {
          background: linear-gradient(135deg, #e8f0fe 0%, #fae8e0 50%, #f3e8ff 100%);
          overflow-x: hidden;
          position: relative;
        }

        /* Enhanced 3D Glass Card Styling */
        .glass-card {
          background: rgba(255, 255, 255, 0.72) !important;
          backdrop-filter: blur(25px) saturate(200%);
          -webkit-backdrop-filter: blur(25px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.9) !important;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(31, 38, 135, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1);
          transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .glass-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 25px 50px rgba(31, 38, 135, 0.14), inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        /* Ambient Background Glows */
        .contact-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.6;
          z-index: 0;
          pointer-events: none;
        }

        .contact-glow-blue {
          width: 450px;
          height: 450px;
          background: #60a5fa;
          top: 10%;
          left: -100px;
        }

        .contact-glow-pink {
          width: 450px;
          height: 450px;
          background: #f472b6;
          bottom: 10%;
          right: -100px;
        }

        /* Text Truncate Helper */
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
// src/app/services/components/ServiceGrid.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { dbService } from '@/services/dbService';

export default function ServiceGrid() {
  const [liveServices, setLiveServices] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

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
    <section className="services-grid py-5" style={{ background: '#f8fafc' }}>
      <div className="container py-4">
        {liveServices.length === 0 ? (
          <div className="text-center py-5 text-muted card border-0 shadow-sm rounded-4 p-5 bg-white">
            <h5 className="fw-bold text-dark mb-2">No Services Found</h5>
            <p className="small mb-0 text-muted">Please add services from the admin panel.</p>
          </div>
        ) : (
          <div className="row g-4">
            {liveServices.map((service, index) => {
              const { id, title, desc, description, imageUrl, price } = service;
              const cardDesc = desc || description;
              const formattedIndex = String(index + 1).padStart(2, '0');
              const animType = index % 2 === 0 ? 'fade-up' : 'zoom-in';

              return (
                <div 
                  className="col-lg-4 col-md-6 col-12" 
                  key={id || index}
                  data-aos={animType}
                  data-aos-duration="800"
                >
                  <div 
                    className="pro-service-card card h-100 border-0 bg-white rounded-4 overflow-hidden position-relative d-flex flex-column"
                    style={{
                      boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
                      transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                    }}
                  >
                    {/* Top Image Box with Pro Hover Zoom */}
                    {imageUrl && (
                      <div className="position-relative overflow-hidden m-3 rounded-3" style={{ height: '240px' }}>
                        <img 
                          src={imageUrl} 
                          alt={title} 
                          className="w-100 h-100 object-fit-cover" 
                          style={{ 
                            transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)' 
                          }}
                        />
                        {/* Floating Price Badge */}
                        {price && (
                          <div 
                            className="position-absolute bottom-0 start-0 m-3 px-3 py-1 bg-white text-dark fw-bold rounded-pill shadow-sm"
                            style={{ fontSize: '0.85rem', backdropFilter: 'blur(8px)' }}
                          >
                            <span className="text-danger">${price}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Card Body Container */}
                    <div className="card-body p-4 pt-2 d-flex flex-column flex-grow-1 justify-content-between">
                      <div>
                        {/* Index & Title Row */}
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <span 
                            className="badge bg-danger bg-opacity-10 text-danger fw-bold px-2 py-1 rounded-2"
                            style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}
                          >
                            {formattedIndex}
                          </span>
                        </div>

                        <h3 className="fw-bold text-dark mb-2" style={{ fontSize: '1.25rem', lineHeight: '1.4' }}>
                          {title}
                        </h3>

                        {/* 3-Line Clamped Pro Description */}
                        <p 
                          className="text-muted small mb-4" 
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            lineHeight: '1.6'
                          }}
                        >
                          {cardDesc}
                        </p>
                      </div>

                      {/* Bottom Action Footer */}
                      <div className="pt-3 border-top border-light d-flex align-items-center justify-content-between mt-auto">
                        <Link 
                          href={`/services/${id || 'detail'}`} 
                          className="btn btn-link text-danger p-0 fw-bold text-decoration-none d-inline-flex align-items-center gap-2 group-link"
                          style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}
                        >
                          <span>LEARN MORE</span>
                          <div 
                            className="rounded-circle bg-danger bg-opacity-10 d-flex align-items-center justify-content-center"
                            style={{ width: '28px', height: '28px', transition: 'transform 0.2s ease' }}
                          >
                            <ArrowRight size={13} />
                          </div>
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

      {/* Pro Hover CSS Enhancements */}
      <style jsx global>{`
        .pro-service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(225, 29, 72, 0.08) !important;
        }
        .pro-service-card:hover img {
          transform: scale(1.06);
        }
        .pro-service-card:hover .rounded-circle {
          background-color: #dc3545 !important;
          color: #ffffff !important;
        }
      `}</style>
    </section>
  );
}
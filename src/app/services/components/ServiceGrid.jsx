// src/app/services/components/ServiceGrid.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
    return <div className="text-center py-5 text-secondary fw-bold">Loading Services...</div>;
  }

  return (
    <section className="services-grid py-5" style={{ background: '#ffffff' }}>
      <div className="container">
        {liveServices.length === 0 ? (
          <div className="text-center py-5 text-muted card border-0 shadow-sm rounded-4 p-5">
            <h5 className="fw-bold text-dark mb-2">No Services Found</h5>
            <p className="small mb-0">Please add services from the admin panel.</p>
          </div>
        ) : (
          <div className="row g-5">
            {liveServices.map((service, index) => {
              const { id, title, desc, description, imageUrl, price } = service;
              const cardDesc = desc || description;
              const formattedIndex = String(index + 1).padStart(2, '0'); // '01', '02', etc.
              const animType = index % 2 === 0 ? 'fade-up' : 'zoom-in';

              return (
                <div 
                  className="col-lg-4 col-md-6 col-12" 
                  key={id || index}
                  data-aos={animType}
                  data-aos-duration="800"
                >
                  <div className="service-card-item d-flex flex-column h-100">
                    
                    {/* Image with Border Frame Effect */}
                    {imageUrl && (
                      <div 
                        className="service-image-frame p-2 mb-4 bg-white shadow-sm position-relative rounded-3"
                        style={{ border: '1px solid #e0e0e0' }}
                      >
                        <img 
                          src={imageUrl} 
                          alt={title} 
                          className="w-100 object-fit-cover rounded-2" 
                          style={{ height: '260px', display: 'block' }} 
                        />
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="d-flex flex-column flex-grow-1">
                      <div className="d-flex align-items-baseline gap-2 mb-2">
                        <span className="fw-bold text-danger" style={{ fontSize: '1.1rem', borderBottom: '2px solid #dc3545', paddingBottom: '1px' }}>
                          {formattedIndex}
                        </span>
                        <h3 className="fw-bold mb-0 text-dark" style={{ fontSize: '1.4rem' }}>
                          {title}
                        </h3>
                      </div>

                      <p className="text-muted small mb-3 lh-lg">
                        {cardDesc}
                      </p>

                      {price && (
                        <div className="fw-bold mb-3 text-danger" style={{ fontSize: '1.1rem' }}>
                          Price: ${price}
                        </div>
                      )}

                      <div className="mt-auto pt-2">
                        <Link 
                          href={`/services/${id || 'detail'}`} 
                          className="btn btn-danger rounded-pill px-4 py-2 fw-bold text-white d-inline-flex align-items-center justify-content-center gap-2 shadow-sm"
                          style={{ 
                            fontSize: '0.8rem', 
                            letterSpacing: '0.5px',
                            backgroundColor: '#dc3545',
                            borderColor: '#dc3545'
                          }}
                        >
                          LEARN MORE <ArrowRight size={14} />
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
    </section>
  );
}
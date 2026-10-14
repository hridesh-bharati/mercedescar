// src/app/services/components/ServiceGrid.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Wrench } from 'lucide-react';
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
    <section className="services-grid py-5">
      <div className="container">
        {liveServices.length === 0 ? (
          <div className="text-center py-5 text-muted card border-0 shadow-sm rounded-4 p-5">
            <h5 className="fw-bold text-dark mb-2">No Services Found</h5>
            <p className="small mb-0">Please add services from the admin panel.</p>
          </div>
        ) : (
          <div className="row g-4">
            {liveServices.map((service, index) => {
              const { id, title, desc, description, imageUrl, price } = service;
              const cardDesc = desc || description;

              let colSpan = 3;
              if (imageUrl) {
                colSpan = index === 4 || index % 6 === 4 ? 6 : 3;
              }

              const animType = index % 2 === 0 ? 'fade-up' : 'zoom-in';

              return (
                <div 
                  className={`col-lg-${colSpan} col-md-6 col-12`} 
                  key={id || index}
                  data-aos={animType}
                  data-aos-duration="800"
                >
                  <div 
                    className="card border-0 shadow-sm rounded-4 overflow-hidden position-relative h-100"
                    style={{ minHeight: '300px', backgroundColor: imageUrl ? '#000' : '#fff' }}
                  >
                    {/* Background Image with Overlay if imageUrl exists */}
                    {imageUrl && (
                      <div 
                        className="position-absolute top-0 start-0 w-100 h-100"
                        style={{ 
                          backgroundImage: `url(${imageUrl})`, 
                          backgroundSize: 'cover', 
                          backgroundPosition: 'center',
                          opacity: '0.75'
                        }}
                      />
                    )}

                    {/* Dark gradient overlay for image cards so text is readable */}
                    {imageUrl && (
                      <div 
                        className="position-absolute top-0 start-0 w-100 h-100"
                        style={{ 
                          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)' 
                        }}
                      />
                    )}

                    {/* Card Content */}
                    <div className="card-body p-4 d-flex flex-column justify-content-between position-relative z-1 h-100">
                      <div>
                        {!imageUrl && (
                          <div className="text-danger mb-3 bg-danger bg-opacity-10 p-2 rounded-circle d-inline-block">
                            <Wrench size={22} strokeWidth={2} />
                          </div>
                        )}
                        <h3 className={`fw-bold mb-2 fs-5 ${imageUrl ? 'text-white' : 'text-dark'}`}>
                          {title}
                        </h3>
                        <p className={`small mb-3 ${imageUrl ? 'text-light opacity-88' : 'text-muted'}`}>
                          {cardDesc}
                        </p>
                      </div>

                      <div>
                        {price && (
                          <div className="text-danger fw-bold mb-2">
                            Price: ${price}
                          </div>
                        )}

                        <Link 
                          href={`/services/${id || 'detail'}`} 
                          className={`btn btn-sm rounded-pill px-3 fw-bold d-inline-flex align-items-center gap-1 ${
                            imageUrl ? 'btn-light text-dark' : 'btn-outline-danger'
                          }`}
                        >
                          DETAILS MORE <ArrowRight size={14} />
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
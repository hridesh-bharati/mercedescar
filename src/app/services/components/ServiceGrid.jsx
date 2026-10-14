// src/app/services/components/ServiceGrid.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldAlert } from 'lucide-react';
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
    <section className="services-grid py-5" style={{ background: '#f8f9fa' }}>
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

              // Automatic Styling Pattern:
              // 1. Agar image hai, toh image background card (kuch wide col-6, kuch col-3)
              // 2. Agar image nahi hai, toh index ke mutabiq White, Dark, aur Yellow cards aayenge!
              const hasImage = Boolean(imageUrl);
              let theme = 'white';
              let colSpan = 3;

              if (hasImage) {
                colSpan = index === 1 || index % 4 === 1 ? 6 : 3; // Wide or normal image card
              } else {
                const nonImageThemes = ['white', 'dark', 'white', 'yellow', 'white'];
                theme = nonImageThemes[index % nonImageThemes.length];
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
                    className={`mosaic-card rounded-4 shadow-sm p-4 h-100 position-relative overflow-hidden d-flex flex-column justify-content-between ${
                      hasImage ? 'text-white' :
                      theme === 'dark' ? 'bg-dark text-white' : 
                      theme === 'yellow' ? 'bg-warning text-dark' : 
                      'bg-white text-dark'
                    }`}
                    style={
                      hasImage 
                        ? { 
                            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.85)), url(${imageUrl})`, 
                            backgroundSize: 'cover', 
                            backgroundPosition: 'center', 
                            minHeight: '320px' 
                          } 
                        : { 
                            minHeight: '320px', 
                            border: theme === 'white' ? '1px solid rgba(0,0,0,0.05)' : 'none' 
                          }
                    }
                  >
                    <div>
                      {!hasImage && (
                        <div className={`mosaic-icon mb-3 p-2 rounded-circle d-inline-flex align-items-center justify-content-center ${
                          theme === 'dark' ? 'bg-secondary bg-opacity-25 text-danger' : 
                          theme === 'yellow' ? 'bg-dark bg-opacity-10 text-dark' : 
                          'bg-danger bg-opacity-10 text-danger'
                        }`} style={{ width: '42px', height: '42px' }}>
                          <ShieldAlert size={20} strokeWidth={2} />
                        </div>
                      )}
                      
                      <h3 className={`mosaic-title fw-bold mb-2 fs-5 ${hasImage || theme === 'dark' ? 'text-white' : 'text-dark'}`}>
                        {title}
                      </h3>
                      
                      <p className={`mosaic-desc small mb-3 lh-base ${hasImage || theme === 'dark' ? 'text-light text-opacity-75' : 'text-muted'}`}>
                        {cardDesc}
                      </p>
                    </div>

                    <div>
                      {price && (
                        <div className="fw-bold mb-2 text-danger fs-6">
                          Price: ${price}
                        </div>
                      )}

                      <Link 
                        href={`/services/${id || 'detail'}`} 
                        className={`mosaic-btn btn btn-sm rounded-pill px-4 fw-bold d-inline-flex align-items-center gap-2 shadow-sm ${
                          hasImage || theme === 'dark' ? 'btn-danger text-white' : 
                          theme === 'yellow' ? 'btn-dark text-white' : 
                          'btn-dark text-white'
                        }`}
                        style={{ fontSize: '0.8rem', letterSpacing: '0.5px' }}
                      >
                        DETAILS MORE <ArrowRight size={14} />
                      </Link>
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
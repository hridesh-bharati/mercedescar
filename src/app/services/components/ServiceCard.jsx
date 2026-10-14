'use client';
// src/app/services/components/ServiceGrid.jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Wrench } from 'lucide-react';
import { dbService } from '@/services/dbService';
import { servicesData } from '../data/servicesData';

export default function ServiceGrid() {
  const [liveServices, setLiveServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      const res = await dbService.getAll('services');
      if (res.success && res.data.length > 0) {
        setLiveServices(res.data);
      } else {
        // Fallback to static data if firebase is empty
        setLiveServices(servicesData);
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
        <div className="row g-4">
          {liveServices.map((service, index) => {
            const { id, title, desc, description, imageUrl, image, price, theme = 'light', icon: IconComponent } = service;
            const cardDesc = desc || description;
            const cardImage = imageUrl || image;
            const isImageBox = theme === 'image' || cardImage;
            const animType = index % 2 === 0 ? 'fade-up' : 'zoom-in';

            return (
              <div 
                className={`col-lg-3 col-md-6 col-12`} 
                key={id || index}
                data-aos={animType}
                data-aos-duration="800"
              >
                <div 
                  className={`mosaic-card mosaic-card--${theme}`}
                  style={isImageBox && cardImage ? { backgroundImage: `url(${cardImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                >
                  <div className="mosaic-card-content p-4">
                    {!cardImage && (
                      <div className="mosaic-icon text-danger mb-3">
                        <Wrench size={24} strokeWidth={2} />
                      </div>
                    )}
                    <h3 className="mosaic-title fw-bold text-dark">{title}</h3>
                    <p className="mosaic-desc text-muted small">{cardDesc}</p>
                    
                    {price && (
                      <div className="text-danger fw-bold mb-3">Price: ${price}</div>
                    )}

                    <Link href={`/services/${id || 'detail'}`} className="mosaic-btn btn btn-outline-danger btn-sm rounded-pill px-3 mt-2 d-inline-flex align-items-center gap-1">
                      DETAILS MORE <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ service, index }) {
  const { title, description, image, imagePosition, theme, icon: IconComponent } = service;
  
  // Staggered AOS animations
  const animType = index % 2 === 0 ? 'fade-right' : 'fade-left';

  return (
    <div 
      className={`service-card service-card--${theme || 'light'} service-card--img-${imagePosition}`}
      data-aos={animType}
      data-aos-duration="800"
    >
      <div className="service-card-inner">
        {/* Image Side */}
        <div className="service-card-image">
          <img src={image} alt={title} loading="lazy" />
        </div>

        {/* Content Side */}
        <div className="service-card-content">
          <div className="service-card-icon">
            {IconComponent && <IconComponent size={24} strokeWidth={2} />}
          </div>
          <h3 className="service-card-title">{title}</h3>
          <p className="service-card-desc">{description}</p>
          <Link href={`/services/${service.id}`} className="service-card-btn">
            DETAILS MORE <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
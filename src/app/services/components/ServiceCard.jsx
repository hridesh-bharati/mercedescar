'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ service, index }) {
  const { title, description, image, imagePosition, theme, icon: IconComponent } = service;
  const animType = index % 2 === 0 ? 'fade-right' : 'fade-left';

  return (
    <div 
      className={`service-card service-card--${theme || 'light'} service-card--img-${imagePosition}`}
      data-aos={animType}
      data-aos-duration="900"
    >
      <div className="service-card-inner">
        <div className="service-card-image">
          <img src={image} alt={title} loading="lazy" />
        </div>
        <div className="service-card-content">
          <div className="service-card-icon">
            {IconComponent && <IconComponent size={28} strokeWidth={2} />}
          </div>
          <h3 className="service-card-title">{title}</h3>
          <p className="service-card-desc">{description}</p>
          <Link href={`/services/${service.id}`} className="service-card-btn">
            DETAILS MORE <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
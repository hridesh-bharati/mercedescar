import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { servicesData } from '../data/servicesData';

export default function ServiceGrid() {
  return (
    <section className="services-grid">
      <div className="container">
        <div className="row g-4">
          {servicesData.map((service, index) => {
            const { id, title, description, image, theme, icon: IconComponent } = service;
            
            // Checking if card should render as an image background box matching screenshot layout
            const isImageBox = theme === 'image';
            const animType = index % 2 === 0 ? 'fade-up' : 'zoom-in';

            return (
              <div 
                className={`col-lg-${service.colSpan || 3} col-md-6 col-12`} 
                key={id}
                data-aos={animType}
                data-aos-duration="800"
              >
                <div 
                  className={`mosaic-card mosaic-card--${theme}`}
                  style={isImageBox ? { backgroundImage: `url(${image})` } : {}}
                >
                  <div className="mosaic-card-content p-4">
                    {!isImageBox && (
                      <div className="mosaic-icon">
                        {IconComponent && <IconComponent size={22} strokeWidth={2} />}
                      </div>
                    )}
                    <h3 className="mosaic-title">{title}</h3>
                    <p className="mosaic-desc">{description}</p>
                    <Link href={`/services/${id}`} className="mosaic-btn">
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
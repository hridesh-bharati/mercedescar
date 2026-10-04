import ServiceCard from './ServiceCard';
import { servicesData } from '../data/servicesData';

export default function ServiceGrid() {
  return (
    <section className="services-grid">
      <div className="container">
        <div className="row g-4 flex-column">
          {servicesData.map((service, index) => (
            <div className="col-12" key={service.id}>
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
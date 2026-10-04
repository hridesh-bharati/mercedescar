import { PhoneCall } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="services-cta" data-aos="zoom-in" data-aos-duration="700">
      <div className="container services-cta-content">
        <h2 className="services-cta-title">
          Schedule Your
          <br />
          Mercedes Service
          <br />
          Today.
        </h2>
        <p className="services-cta-text">
          Your trusted independent specialist for premium Mercedes-Benz and AMG
          repair and maintenance.
        </p>
        <a href="tel:+971567888808" className="services-cta-phone">
          <PhoneCall size={18} />
          +971 56 788 8808
        </a>
      </div>
    </section>
  );
}
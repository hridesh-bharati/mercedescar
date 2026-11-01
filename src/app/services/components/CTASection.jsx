
'use client';

import { PhoneCall } from 'lucide-react';

export default function CTASection() {
  return (
    <section
      className="services-cta"
      data-aos="zoom-in"
      data-aos-duration="800"
    >
      <div className="container services-cta-content">
        <h2 className="services-cta-title">
          Book Your
          <br />
          Mercedes-Benz
          <br />
          Service Today.
        </h2>

        <p className="services-cta-text">
          Looking for reliable Mercedes-Benz servicing and repair in
          Al Quoz, Dubai? Contact German Auto Expert to discuss your
          vehicle's maintenance and repair needs.
        </p>

        <a
          href="tel:+971567888808"
          className="services-cta-phone"
          aria-label="Call German Auto Expert"
        >
          <PhoneCall size={18} />
          +971 56 788 8808
        </a>
      </div>
    </section>
  );
}

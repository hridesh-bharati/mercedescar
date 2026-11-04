// src/app/services/components/CTASection.jsx
'use client';

import { PhoneCall } from 'lucide-react';

export default function CTASection() {
  return (
    <section
      className="services-cta"
      data-anim="up"
    >
      <div className="container services-cta-content">
        <h2 className="services-cta-title">
          Schedule Your
          <br />
          Mercedes Service
          <br />
          Today.
        </h2>
        <p className="services-cta-text">
          Your trusted independent specialist for Mercedes-Benz and AMG repair
          and maintenance in Al Quoz, Dubai.
        </p>
        <a
          href="tel:+971567888808"
          className="services-cta-phone"
          aria-label="Call Mercedes Garage Dubai at plus 971 56 788 8808"
        >
          <PhoneCall size={18} aria-hidden="true" />
          +971 56 788 8808
        </a>
      </div>
    </section>
  );
}
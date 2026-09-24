'use client';

import { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Services.css';

export default function Services() {
  const sectionRef = useRef(null);

  // Mouse-follow spotlight for cards
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e) => {
      const cards = section.querySelectorAll('.service-card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const servicesData = [
    {
      title: 'Routine Maintenance',
      description:
        'Oil changes, filters, fluids and more — keeping your Mercedes in peak condition.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
    {
      title: 'Engine Repair & Diagnostics',
      description:
        'Complete engine service with advanced diagnostics and precision tuning.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      title: 'Brake Service',
      description:
        'Safe driving with premium brake service, pads, rotors and fluid replacement.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ),
    },
    {
      title: 'Transmission Service',
      description:
        'Smooth performance with expert transmission care and fluid management.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="services-section" id="services" ref={sectionRef}>
      {/* Pattern layer */}
      <div className="services-pattern" aria-hidden="true"></div>

      {/* Ambient orbs */}
      <div className="services-orb services-orb-1" aria-hidden="true"></div>
      <div className="services-orb services-orb-2" aria-hidden="true"></div>

      {/* Background image + overlay */}
      <div className="services-bg" aria-hidden="true"></div>
      <div className="services-bg-overlay" aria-hidden="true"></div>

      <div className="container services-container">
        {/* Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7" data-aos="fade-right">
            <div className="services-badge">
              <span className="services-badge-icon" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </span>
              <span className="services-badge-text">OUR SERVICES</span>
            </div>

            <h2 className="services-heading">
              Comprehensive Care
              <span className="services-heading-accent"> for Your Mercedes</span>
            </h2>
            <p className="services-paragraph">
              We offer a full range of services to keep your Mercedes running
              smoothly, safely and efficiently. From routine maintenance to
              complex diagnostics, we&apos;ve got you covered.
            </p>
          </div>

          <div className="col-lg-5 text-lg-end mt-4 mt-lg-0" data-aos="fade-left">
            <a href="#all-services" className="services-btn-primary">
              <span>View All Services</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>

        {/* Cards grid */}
        <div className="row g-4">
          {servicesData.map((item, index) => (
            <div
              className="col-lg-3 col-md-6"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 120}
            >
              <div className="service-card" style={{ '--card-index': index }}>
                <div className="service-card-spotlight" aria-hidden="true"></div>
                <div className="service-card-glow" aria-hidden="true"></div>

                {/* Icon box */}
                <div className="service-icon-box">
                  <span className="service-icon-glow" aria-hidden="true"></span>
                  {item.icon}
                </div>

                <h4 className="service-title">{item.title}</h4>
                <p className="service-desc">{item.description}</p>

                {/* Arrow */}
                <div className="service-card-arrow" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
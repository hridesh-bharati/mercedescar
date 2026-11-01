
'use client';

import { useEffect, useRef } from 'react';
import AOS from 'aos';
import Link from 'next/link';
import 'aos/dist/aos.css';
import './Services.css';

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e) => {
      section.querySelectorAll('.service-card').forEach((card) => {
        const rect = card.getBoundingClientRect();

        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    };

    section.addEventListener('mousemove', handleMouseMove);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const servicesData = [
    {
      title: 'Routine Maintenance',
      description:
        'Professional Mercedes-Benz maintenance in Dubai, including oil changes, filters, fluids and scheduled servicing.',
      href: '/services',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
    {
      title: 'Engine Diagnostics',
      description:
        'Advanced Mercedes-Benz engine diagnostics, fault detection and precision repair by specialist technicians in Al Quoz, Dubai.',
      href: '/services',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      title: 'Brake Service',
      description:
        'Mercedes-Benz brake inspection, brake pad replacement, rotor servicing and brake fluid maintenance.',
      href: '/services',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ),
    },
    {
      title: 'Transmission Service',
      description:
        'Expert Mercedes-Benz transmission inspection, gearbox servicing and fluid replacement for smooth performance.',
      href: '/services',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      title: 'Mercedes Body Kits',
      description:
        'Upgrade your Mercedes with AMG body kits, premium exterior styling packages and custom body modifications in Dubai.',
      href: '/mercedes-body-kits-dubai',
      icon: <span className="fw-bold">AMG</span>,
    },
    {
      title: 'Mercedes Facelift',
      description:
        'Transform your Mercedes with model-specific facelift conversions, updated exterior styling and modern design upgrades.',
      href: '/mercedes-facelift-dubai',
      icon: <span className="fw-bold">FL</span>,
    },
    {
      title: 'Mercedes Custom Upgrades',
      description:
        'Discover custom Mercedes upgrades, styling enhancements and vehicle modifications at our Al Quoz workshop.',
      href: '/mercedes-vehicle-upgrades-dubai',
      icon: <span className="fw-bold">UP</span>,
    },
  ];

  return (
    <section className="services-section" id="services" ref={sectionRef}>
      <div className="services-pattern" aria-hidden="true" />
      <div className="services-orb services-orb-1" aria-hidden="true" />
      <div className="services-orb services-orb-2" aria-hidden="true" />
      <div className="services-bg" aria-hidden="true" />
      <div className="services-bg-overlay" aria-hidden="true" />

      <div className="container services-container">
        <div className="row align-items-end mb-4 mb-lg-5">
          <div className="col-lg-7" data-aos="fade-right">
            <div className="services-badge">
              <span className="services-badge-icon" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </span>
              <span className="services-badge-text">MERCEDES-BENZ SPECIALISTS</span>
            </div>

            <h2 className="services-heading">
              Mercedes-Benz Services
              <span className="services-heading-accent">
                {' '}in Al Quoz, Dubai
              </span>
            </h2>

            <p className="services-paragraph">
              German Auto Expert provides specialist Mercedes-Benz servicing,
              diagnostics, maintenance and repair in Al Quoz, Dubai. Explore
              our AMG body kits, Mercedes facelift solutions and custom vehicle
              upgrades, all focused on your Mercedes.
            </p>
          </div>

          <div className="col-lg-5 text-lg-end mt-4 mt-lg-0" data-aos="fade-left">
            <Link href="/services" className="services-btn-primary">
              <span>View All Mercedes Services</span>
              <svg width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="row g-4">
          {servicesData.map((item, index) => (
            <div
              className="col-lg-3 col-md-6"
              key={item.title}
              data-aos="fade-up"
              data-aos-delay={index * 120}
            >
              <Link
                href={item.href}
                className="service-card text-decoration-none"
                aria-label={`Explore ${item.title}`}
              >
                <div className="service-card-spotlight" aria-hidden="true" />
                <div className="service-card-glow" aria-hidden="true" />

                <div className="service-card-icon-row">
                  <div className="service-icon-box">
                    <span className="service-icon-glow" aria-hidden="true" />
                    {item.icon}
                  </div>

                  <div className="service-card-arrow" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2.4"
                      strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>

                <h3 className="service-title">{item.title}</h3>
                <p className="service-desc">{item.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// src/components/home/AboutCard.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './AboutCard.css';

// ---------- Ripple Effect ----------
function addRipple(e) {
  const target = e.currentTarget;
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.8;
  const clientX =
    (e.touches && e.touches[0] && e.touches[0].clientX) ??
    e.clientX ??
    rect.left + rect.width / 2;
  const clientY =
    (e.touches && e.touches[0] && e.touches[0].clientY) ??
    e.clientY ??
    rect.top + rect.height / 2;
  const x = clientX - rect.left - size / 2;
  const y = clientY - rect.top - size / 2;
  const ripple = document.createElement('span');
  ripple.className = 'md-ripple-effect';
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  target.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}

export default function AboutCard() {
  const sectionRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Initial state mein real numbers (Googlebot SEO ke liye)
  const [counts, setCounts] = useState({ years: 15, customers: 5, parts: 100 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const countersStarted = useRef(false);

  const slides = [
    {
      image: '/images/about-mechanic1.avif',
      badge: 'Mercedes Expert Care',
      caption: 'For Your Mercedes-Benz',
    },
    {
      image: '/images/about-mechanic2.avif',
      badge: 'Precision Mercedes Service',
      caption: 'Built On Trust in Dubai',
    },
  ];

  // Auto Slider Timer
  useEffect(() => {
    if (slides.length <= 1) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // ----- Counter Animation on Scroll -----
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    if (!section) return;

    const animateCount = (target, key, duration = 1600) => {
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCounts((c) => ({ ...c, [key]: Math.floor(eased * target) }));
        if (progress < 1) requestAnimationFrame(tick);
        else setCounts((c) => ({ ...c, [key]: target }));
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted.current) {
            countersStarted.current = true;
            setCounts({ years: 0, customers: 0, parts: 0 }); 
            animateCount(15, 'years', 1400);
            animateCount(5, 'customers', 1600);
            animateCount(100, 'parts', 1800);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // ----- Modal: Body scroll lock + ESC close -----
  useEffect(() => {
    if (!isModalOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isModalOpen]);

  const stats = [
    {
      display: `${counts.years}+`,
      label: 'Years Experience',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      display: `${counts.customers}K+`,
      label: 'Happy Customers',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      display: `${counts.parts}%`,
      label: 'Genuine Parts',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
  ];

  const darkCardImage =
    slides.length > 1 ? slides[(activeSlide + 1) % slides.length] : slides[0];
  const mainCardImage = slides[activeSlide];

  return (
    <>
      <section
        className="about-section"
        id="about-mercedes"
        ref={sectionRef}
        aria-labelledby="about-heading"
      >
        <span className="about-pattern" aria-hidden="true"></span>
        <span className="about-glow about-glow--blue" aria-hidden="true"></span>
        <span className="about-glow about-glow--pink" aria-hidden="true"></span>

        <div className="container about-container">
          <div className="row align-items-center g-5">
            {/* LEFT: Text & Stats */}
            <div className="col-lg-6 about-text-col">
              <div className="about-badge" data-anim="right">
                <span className="about-badge-dot"></span>
                <span className="about-badge-text">
                  ABOUT MERCEDES GARAGE DUBAI
                </span>
              </div>

              <h2
                id="about-heading"
                className="about-heading"
                data-anim="right"
                data-anim-delay="80"
              >
                Mercedes-Benz Repair &amp;
                <span className="about-heading-accent">
                  {' '}
                  Maintenance Services in Al Quoz, Dubai
                </span>
              </h2>

              <p
                className="about-paragraph"
                data-anim="right"
                data-anim-delay="160"
              >
                Mercedes Garage Dubai provides a full range of Mercedes-Benz
                repair and maintenance services at our Al Quoz workshop — from
                routine servicing and engine diagnostics to advanced
                transmission repair, AMG body kits and facelift conversions.
                All Mercedes work, under one roof.
              </p>

              <button
                type="button"
                className="about-showmore-btn"
                onClick={() => setIsModalOpen(true)}
                data-anim="right"
                data-anim-delay="200"
                aria-haspopup="dialog"
              >
                <span>Show More</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div data-anim="right" data-anim-delay="260">
                <Link
                  href="/services"
                  className="about-btn-primary md-ripple"
                  onMouseDown={addRipple}
                  onTouchStart={addRipple}
                >
                  <span>Explore Mercedes Services</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>

              <div
                className="about-stats-row"
                data-anim="up"
                data-anim-delay="340"
              >
                {stats.map((stat, idx) => (
                  <div className="about-stat-item" key={idx}>
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-content">
                      <h3>{stat.display}</h3>
                      <p>{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Dual-card swap slider */}
            <div
              className="col-lg-6 about-image-col"
              data-anim="left"
              data-anim-delay="160"
            >
              <div className="about-image-wrapper">
                <div className="about-card-back">
                  <div className="about-back-img-box">
                    <div
                      key={`back-${activeSlide}`}
                      className="about-swap-layer about-swap-down"
                    >
                      <Image
                        src={darkCardImage.image}
                        alt={`${darkCardImage.badge} — Mercedes-Benz service at our Al Quoz Dubai workshop`}
                        fill
                        sizes="(max-width: 991px) 100vw, 50vw"
                        className="about-img"
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </div>
                    <div className="about-back-dim" aria-hidden="true"></div>
                  </div>
                </div>

                <div className="about-card-front">
                  <div
                    key={`front-${activeSlide}`}
                    className="about-swap-layer about-swap-up"
                  >
                    <Image
                      src={mainCardImage.image}
                      alt={`${mainCardImage.badge} — ${mainCardImage.caption}`}
                      fill
                      sizes="(max-width: 991px) 100vw, 50vw"
                      className="about-img"
                      style={{ objectFit: 'cover' }}
                      priority
                    />
                    <div className="about-img-overlay-text">
                      <span>{mainCardImage.badge}</span>
                      <p>{mainCardImage.caption}</p>
                    </div>
                  </div>

                  <div className="about-slider-dots">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`about-slider-dot md-ripple ${
                          idx === activeSlide ? 'active' : ''
                        }`}
                        onMouseDown={addRipple}
                        onTouchStart={addRipple}
                        onClick={() => setActiveSlide(idx)}
                        aria-label={`Show slide ${idx + 1}`}
                        aria-pressed={idx === activeSlide}
                      />
                    ))}
                  </div>
                </div>

                <div className="about-floating-badge">
                  <div className="floating-badge-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div className="floating-badge-text">
                    <strong>Certified</strong>
                    <span>Mercedes Technicians</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {isModalOpen && (
        <div
          className="about-modal-overlay"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-modal-title"
          aria-describedby="about-modal-desc"
        >
          <div className="about-modal" onClick={(e) => e.stopPropagation()}>
            <div className="about-modal-header">
              <h3 id="about-modal-title" className="about-modal-title">
                Mercedes-Benz Repair &amp; Maintenance Services in Dubai
              </h3>
              <button
                type="button"
                className="about-modal-close"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="about-modal-body" id="about-modal-desc">
              <p>
                <strong>Mercedes Garage Dubai</strong> is a specialist
                Mercedes-Benz workshop in Al Quoz, Dubai. We focus exclusively
                on Mercedes-Benz vehicles, delivering expert repair, maintenance
                and modification services backed by certified technicians and
                genuine parts.
              </p>

              <h4>Mercedes Engine &amp; Mechanical Repair</h4>
              <p>
                From engine repair and diagnostics to gearbox and transmission
                repair, we handle the full range of Mercedes mechanical work.
                This includes engine overheating, coolant system faults, starter
                motor replacement, oil and filter changes, radiator replacement
                and condenser repair.
              </p>

              <h4>Mercedes Brake, Suspension &amp; Transmission Service</h4>
              <p>
                We service Mercedes brake systems (pads, rotors, brake fluid),
                suspension components including Airmatic systems, and automatic
                transmissions with specialist fluid replacement for smooth,
                reliable performance.
              </p>

              <h4>Mercedes Electrical &amp; Electronic Diagnostics</h4>
              <p>
                Our workshop uses Mercedes-specific diagnostic equipment for
                ECU diagnostics, fault code reading, electrical repair, screen
                and infotainment (CarPlay) issues, window regulator and washer
                motor replacement.
              </p>

              <h4>Mercedes AMG Body Kits &amp; Facelift Conversions</h4>
              <p>
                We install Mercedes AMG body kits, G63 wide-body kits, C-Class
                and E-Class AMG styling, and complete Mercedes facelift
                conversions — including W205 to W206 C-Class and W213 E-Class
                facelifts — at our Al Quoz workshop in Dubai.
              </p>

              <h4>Mercedes Interior, Detailing &amp; Protection</h4>
              <p>
                Interior repairs (dashboard, instrument cluster, seat covers,
                leather), complete interior and exterior detailing, ceramic
                coating, paint protection film, window tinting and rust
                proofing — all available at our Dubai workshop.
              </p>

              <h4>Mercedes Custom Upgrades</h4>
              <p>
                For performance and styling enthusiasts, we offer brake caliper
                painting, suspension upgrades, body kit installation, window
                tinting, custom wrapping and personalized Mercedes
                modifications.
              </p>

              <p>
                At <strong>Mercedes Garage Dubai</strong>, every service is
                performed with precision and attention to detail. Whether you
                need a simple wiper blade replacement or complex repairs such as
                catalytic converter replacement, we maintain the highest
                standards. Trust us for all your Mercedes care needs — because
                your Mercedes deserves nothing but the best.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
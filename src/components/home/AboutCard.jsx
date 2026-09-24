'use client';

import { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './AboutCard.css';

export default function AboutCard() {
  const sectionRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [counts, setCounts] = useState({ years: 0, customers: 0, parts: 0 });
  const countersStarted = useRef(false);

  const slides = [
    {
      image: '/images/about-mechanic1.png',
      badge: 'Expert Care',
      caption: 'For Your Mercedes',
    },
    {
      image: '/images/about-mechanic2.png',
      badge: 'Precision Service',
      caption: 'Built On Trust',
    },
  ];

  /* ============ AOS init ============ */
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: false,
      offset: 60,
    });
  }, []);

  /* ============ Auto swap every 2.5s ============ */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [slides.length]);

  /* ============ Animated counters on view ============ */
  useEffect(() => {
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
            animateCount(10, 'years', 1400);
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

  const stats = [
    {
      display: `${counts.years}+`,
      label: 'Years of Experience',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
  ];

  /* Image mapping — cards swap each cycle */
  const darkCardImage = slides[(activeSlide + 1) % slides.length];
  const mainCardImage = slides[activeSlide];

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-pattern" aria-hidden="true"></div>
      <div className="about-glow" aria-hidden="true"></div>

      <div className="container about-container">
        <div className="row align-items-center g-5">

          {/* ============ LEFT: Text & Stats ============ */}
          <div className="col-lg-6 about-text-col">
            <div className="about-badge" data-aos="fade-right">
              <span className="about-badge-dot"></span>
              <span className="about-badge-text">ABOUT US</span>
            </div>

            <h2 className="about-heading" data-aos="fade-right" data-aos-delay="80">
              Your Mercedes
              <span className="about-heading-accent"> Our Priority</span>
            </h2>

            <p className="about-paragraph" data-aos="fade-right" data-aos-delay="160">
              We are a professional Mercedes-Benz service center committed to
              providing top-quality maintenance, repairs, and premium customer
              service. From routine checkups to complex repairs, our experts
              ensure your Mercedes performs at its best.
            </p>

            <div data-aos="fade-right" data-aos-delay="240">
              <a href="#contact" className="about-btn-primary">
                <span>Learn More</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>

            <div className="about-stats-row" data-aos="fade-up" data-aos-delay="320">
              {stats.map((stat, idx) => (
                <div className="about-stat-item" key={idx}>
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-content">
                    <h4>{stat.display}</h4>
                    <p>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ============ RIGHT: Dual-card swap slider ============ */}
          <div className="col-lg-6 about-image-col" data-aos="fade-left" data-aos-delay="160">
            <div className="about-image-wrapper">

              {/* BACK CARD (left, dark, preview) */}
              <div className="about-card-back">
                <div className="about-back-img-box">
                  <div
                    key={`back-${activeSlide}`}
                    className="about-swap-layer about-swap-down"
                  >
                    <img
                      src={darkCardImage.image}
                      alt="Mercedes Service Preview"
                      className="about-img"
                    />
                  </div>
                  <div className="about-back-dim" aria-hidden="true"></div>
                </div>
              </div>

              {/* FRONT CARD (right, large, hero) */}
              <div className="about-card-front">
                <div
                  key={`front-${activeSlide}`}
                  className="about-swap-layer about-swap-up"
                >
                  <img
                    src={mainCardImage.image}
                    alt="Mercedes Mechanic Working"
                    className="about-img"
                  />
                  <div className="about-img-overlay-text">
                    <span>{mainCardImage.badge}</span>
                    <p>{mainCardImage.caption}</p>
                  </div>
                </div>

                <div className="about-slider-dots" aria-hidden="true">
                  {slides.map((_, idx) => (
                    <span
                      key={idx}
                      className={`about-slider-dot ${
                        idx === activeSlide ? 'active' : ''
                      }`}
                    ></span>
                  ))}
                </div>
              </div>

              <div className="about-red-stripe" aria-hidden="true"></div>

              <div className="about-floating-badge" aria-hidden="true">
                <div className="floating-badge-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div className="floating-badge-text">
                  <strong>Certified</strong>
                  <span>Technicians</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
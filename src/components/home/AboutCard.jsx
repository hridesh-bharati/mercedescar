'use client';

import { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './AboutCard.css';

// ---------- Ripple Effect ----------
function addRipple(e) {
  const target = e.currentTarget;
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.8;
  const x = (e.clientX ?? rect.left + rect.width / 2) - rect.left - size / 2;
  const y = (e.clientY ?? rect.top + rect.height / 2) - rect.top - size / 2;
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
  const [counts, setCounts] = useState({ years: 0, customers: 0, parts: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const countersStarted = useRef(false);

  const slides = [
    { image: '/images/about-mechanic1.png', badge: 'Expert Care', caption: 'For Your Auto' },
    { image: '/images/about-mechanic2.png', badge: 'Precision Service', caption: 'Built On Trust' },
  ];

  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: false, offset: 60 });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // ----- Counter Animation -----
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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
  ];

  const darkCardImage = slides[(activeSlide + 1) % slides.length];
  const mainCardImage = slides[activeSlide];

  return (
    <>
      <section className="about-section" id="about" ref={sectionRef}>
        <div className="container about-container">
          <div className="row align-items-center g-5">

            {/* ============ LEFT: Text & Stats ============ */}
            <div className="col-lg-6 about-text-col">
              <div className="about-badge" data-aos="fade-right">
                <span className="about-badge-dot"></span>
                <span className="about-badge-text">About us</span>
              </div>

              <h2 className="about-heading" data-aos="fade-right" data-aos-delay="80">
                Premium Auto Repair &amp;
                <span className="about-heading-accent"> Maintenance Services</span>
              </h2>

              <p className="about-paragraph" data-aos="fade-right" data-aos-delay="160">
                We offer a full range of auto repair and maintenance services
                tailored to meet all your vehicle needs under one roof. Our
                expert technicians specialize in everything from routine
                maintenance to advanced repairs, ensuring your car stays in top
                condition...
              </p>

              {/* Show More Button */}
              <button
                type="button"
                className="about-showmore-btn"
                onClick={() => setIsModalOpen(true)}
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <span>Show More</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div data-aos="fade-right" data-aos-delay="260">
                <a href="#contact" className="about-btn-primary md-ripple" onMouseDown={addRipple}>
                  <span>Learn More</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>

              <div className="about-stats-row" data-aos="fade-up" data-aos-delay="340">
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

                <div className="about-card-back">
                  <div className="about-back-img-box">
                    <div key={`back-${activeSlide}`} className="about-swap-layer about-swap-down">
                      <img src={darkCardImage.image} alt="Service Preview" className="about-img" />
                    </div>
                    <div className="about-back-dim" aria-hidden="true"></div>
                  </div>
                </div>

                <div className="about-card-front">
                  <div key={`front-${activeSlide}`} className="about-swap-layer about-swap-up">
                    <img src={mainCardImage.image} alt="Mechanic Working" className="about-img" />
                    <div className="about-img-overlay-text">
                      <span>{mainCardImage.badge}</span>
                      <p>{mainCardImage.caption}</p>
                    </div>
                  </div>

                  <div className="about-slider-dots">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        className={`about-slider-dot md-ripple ${idx === activeSlide ? 'active' : ''}`}
                        onMouseDown={addRipple}
                        onClick={() => setActiveSlide(idx)}
                        aria-label={`Show slide ${idx + 1}`}
                      ></button>
                    ))}
                  </div>
                </div>

                <div className="about-floating-badge">
                  <div className="floating-badge-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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

      {/* ============ MODAL ============ */}
      {isModalOpen && (
        <div
          className="about-modal-overlay"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-modal-title"
        >
          <div
            className="about-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="about-modal-header">
              <h3 id="about-modal-title" className="about-modal-title">
                Premium Auto Repair &amp; Maintenance Services You Can Trust
              </h3>
              <button
                type="button"
                className="about-modal-close"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Body — Scrollable */}
            <div className="about-modal-body">
              <p>
                We offer a full range of auto repair and maintenance services
                tailored to meet all your vehicle needs under one roof. Our
                expert technicians specialize in everything from routine
                maintenance to advanced repairs, ensuring your car stays in top
                condition. Whether you&apos;re dealing with mechanical issues,
                body damage, or looking for custom upgrades, we&apos;ve got you
                covered with reliable and professional solutions.
              </p>

              <p>
                For mechanical repairs, we handle everything from engine repair,
                gearbox repair, and transmission repair to resolving issues like
                engine overheating, coolant system faults, and starter motor
                replacement. We also provide essential services such as oil
                changes, oil filter replacements, and regular vehicle
                maintenance to keep your car running smoothly. If you&apos;re
                experiencing issues with your vehicle&apos;s cooling system, our
                experts can perform radiator replacement, condenser repair, and
                even complex tasks like evaporator core replacement.
              </p>

              <p>
                When it comes to bodywork and detailing, we excel in services
                like bumper repair, fender repair, frame straightening, and
                chassis repair. Our team can restore your car&apos;s appearance
                with services such as paintless dent removal, scratch removal,
                and full-body painting, including specialized finishes like
                candy paint, chrome paint, and even customizable options like
                peelable paint. For added protection, we offer premium solutions
                like ceramic coating and paint protection film to safeguard your
                car&apos;s exterior.
              </p>

              <p>
                Our expertise extends to interior repairs as well. From
                dashboard repair and instrument cluster repair to seat cover
                replacement and leather repair, we ensure your car&apos;s
                interior looks as good as new. We also provide complete interior
                and exterior detailing services, including steam cleaning and
                upholstery care, to give your vehicle a fresh, polished look.
              </p>

              <p>
                For those facing electrical or electronic issues, we provide
                specialized services like repairing a non-functional screen
                (CarPlay – Uconnect), replacing faulty components such as the
                window regulator or the washer motor, and even assisting with
                advanced systems like airbags through our trusted airbag repair
                service. If your vehicle requires lighting restoration or
                replacements, we handle everything from headlight restoration to
                installing new taillights or side mirrors.
              </p>

              <p>
                Additionally, we cater to performance enthusiasts with
                customizations like bodykit installation, brake caliper
                painting, and suspension upgrades. Our team also provides
                solutions for unique needs such as convertible roof repairs,
                sunroof repairs, and hail damage restoration. To enhance your
                driving experience further, we offer services like window
                tinting, rust proofing, undercoating, and even wrapping for a
                completely personalized look.
              </p>

              <p>
                At <strong>Auto Expert Workshop</strong>, every service is
                performed with precision and attention to detail. Whether you
                need simple fixes like a wiper blade replacement or complex
                repairs such as catalytic converter replacement or frame
                straightening after an accident, we ensure the highest standards
                of quality. Trust us for all your auto care needs—because your
                car deserves nothing but the best!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
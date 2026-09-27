'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import './Hero.css';

// ---------- Split Text Component ----------
function SplitText({ text, className = '', delay = 0, stagger = 0.035 }) {
  const chars = useMemo(() => text.split(''), [text]);
  return (
    <span className={className} aria-label={text}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="split-char"
          style={{ animationDelay: `${delay + i * stagger}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

// ---------- Word Reveal Component ----------
function WordReveal({ children, delay = 0, stagger = 0.08 }) {
  if (typeof children !== 'string') return children;
  return (
    <span className="word-reveal-wrap">
      {children.split(' ').map((word, i) => (
        <span
          key={i}
          className="word-reveal"
          style={{ animationDelay: `${delay + i * stagger}s` }}
        >
          {word}&nbsp;
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  // Sirf ek hi stable background image
  const bgImage = '/images/hero-car.png';

  // 3 alag-alag texts aur tags jo rotate honge
  const textSlides = [
    {
      badge: 'AUTO EXPERT WORKSHOP DUBAI',
      headingTop: 'One-Stop Shop for',
      headingAccent: 'All Auto Repairs',
      paragraph:
        'Auto Expert Workshop is equipped with latest technology, excellent infrastructural facilities and a team of professional mechanics to solve every automobile-related need.',
      caption: 'Trusted Auto Care Experts',
      tags: [
        'Computer Diagnostics',
        'Complete Safety Analysis',
        'Drivability Problems',
        'Performance Upgrade',
      ],
    },
    {
      badge: 'ADVANCED AUTO CARE',
      headingTop: 'Complete Auto',
      headingAccent: 'Repair Solutions',
      paragraph:
        'From routine servicing to complex auto repairs, our premium workshop features state-of-the-art machinery and equipment to give you the service you deserve.',
      caption: 'Precision & Excellence',
      tags: [
        'Engine Diagnostics',
        'Brake & Suspension',
        'AC Service & Repair',
        'Full Body Work',
      ],
    },
    {
      badge: 'PROFESSIONAL AUTO GARAGE',
      headingTop: 'Premium Auto Garage',
      headingAccent: 'in Al Quoz, Dubai',
      paragraph:
        'High-standard auto garage with quality services, modern equipment and a team of certified mechanics ready to handle every automobile-related need.',
      caption: 'Your Auto, Our Passion',
      tags: [
        'Oil & Filter Change',
        'Battery Replacement',
        'Wheel Alignment',
        'Insurance Support',
      ],
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  // ----- Auto Slide for Text -----
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % textSlides.length);
    }, 7500);
    return () => clearInterval(timer);
  }, [textSlides.length]);

  // ----- Mouse Parallax (3D Tilt) -----
  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    if (!hero || !content) return;

    const handleMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      content.style.transform = `perspective(1200px) rotateX(${-y * 3}deg) rotateY(${x * 4}deg) translateZ(0)`;

      const glow = hero.querySelector('.hero-cursor-glow');
      if (glow) {
        glow.style.left = `${e.clientX - rect.left}px`;
        glow.style.top = `${e.clientY - rect.top}px`;
      }
    };

    const handleLeave = () => {
      content.style.transform = 'perspective(1200px) rotateX(0) rotateY(0)';
    };

    hero.addEventListener('mousemove', handleMove);
    hero.addEventListener('mouseleave', handleLeave);
    return () => {
      hero.removeEventListener('mousemove', handleMove);
      hero.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const goToSlide = (idx) => setCurrentSlide(idx);

  const activeSlide = textSlides[currentSlide];

  return (
    <section
      ref={heroRef}
      className="hero-section"
      aria-label="Auto Expert Workshop Hero Section"
    >
      {/* Background Image - Single & Static (No image switching/flickering) */}
      <div
        className="hero-bg active"
        style={{ backgroundImage: `url('${bgImage}')` }}
        role="img"
        aria-label="Hero Background"
      ></div>

      {/* Overlays */}
      <div className="hero-overlay"></div>
      <div className="hero-glow-left"></div>
      <div className="hero-glow-right"></div>
      <div className="hero-cursor-glow"></div>

      {/* Pure CSS Particles */}
      <div className="hero-particles" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="particle"></span>
        ))}
      </div>

      {/* Animated Grid Lines */}
      <div className="hero-grid-lines" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Main Content */}
      <div className="hero-main">
        <div className="hero-container container">
          <div className="row">
            <div className="col-lg-7 hero-text-col">
              <div
                ref={contentRef}
                key={currentSlide}
                className="hero-content-wrapper"
              >
                {/* Badge */}
                <div className="hero-badge animate-slide-down">
                  <span className="hero-badge-dash"></span>
                  <SplitText
                    text={activeSlide.badge}
                    className="hero-badge-text"
                    delay={0.2}
                    stagger={0.03}
                  />
                </div>

                {/* Heading — TWO LINES */}
                <h1 className="hero-heading">
                  <span className="heading-line">
                    <SplitText
                      text={activeSlide.headingTop}
                      delay={0.35}
                      stagger={0.025}
                    />
                  </span>
                  <span className="heading-line">
                    <SplitText
                      text={activeSlide.headingAccent}
                      className="hero-heading-accent"
                      delay={0.75}
                      stagger={0.025}
                    />
                  </span>
                </h1>

                {/* Paragraph */}
                <p className="hero-paragraph">
                  <WordReveal delay={1.1} stagger={0.025}>
                    {activeSlide.paragraph}
                  </WordReveal>
                </p>

                {/* Service Tags */}
                <ul className="hero-tags">
                  {activeSlide.tags.map((tag, i) => (
                    <li
                      key={i}
                      className="hero-tag"
                      style={{ animationDelay: `${1.4 + i * 0.1}s` }}
                    >
                      <span className="hero-tag-check" aria-hidden="true">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span>{tag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Buttons */}
              <div className="hero-buttons animate-slide-up-delay">
                <a href="/book" className="hero-btn-primary md-ripple">
                  <span>Book Service Now</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>

                <a href="tel:+971567888808" className="hero-btn-video">
                  <span className="hero-play-circle">
                    <span className="pulse-ring"></span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 3a2 2 0 0 1-.5 2.1L8 10.1a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c1 .3 2 .5 3 .7a2 2 0 0 1 1.6 2z"></path>
                    </svg>
                  </span>
                  <span>Call Us Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="hero-bottom-bar container">
        {/* Desktop Progress Ring Indicators */}
        <div className="hero-indicators">
          {textSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`hero-indicator-btn ${
                index === currentSlide ? 'active' : ''
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span className="indicator-ring">
                <svg viewBox="0 0 36 36" className="ring-svg">
                  <circle cx="18" cy="18" r="15" className="ring-track" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    className={`ring-progress ${
                      index === currentSlide ? 'running' : ''
                    }`}
                  />
                </svg>
                <span className="indicator-num">0{index + 1}</span>
              </span>
              <span className="indicator-line"></span>
            </button>
          ))}
        </div>

        {/* Mobile Dots */}
        <div className="hero-mobile-dots">
          {textSlides.map((_, index) => (
            <span
              key={index}
              onClick={() => goToSlide(index)}
              className={`hero-mobile-dot ${
                index === currentSlide ? 'active' : ''
              }`}
            ></span>
          ))}
        </div>

        {/* Infinite Arrows */}
        <div className="hero-infinite-arrows">
          <svg className="arrow-icon arrow-small" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
          <svg className="arrow-icon arrow-medium" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
          <svg className="arrow-icon arrow-large" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Right Caption */}
        <div key={currentSlide} className="hero-right-caption">
          <span className="caption-line"></span>
          <SplitText text={activeSlide.caption} delay={0.3} stagger={0.04} />
        </div>
      </div>
    </section>
  );
}
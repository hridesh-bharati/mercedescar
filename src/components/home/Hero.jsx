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
  const slides = [
    {
      image: '/images/hero-car1.png',
      headingTop: 'German Car Repair &',
      headingAccent: 'Service in Dubai, UAE',
      paragraph:
        'Specialized independent garage for Mercedes, BMW, Audi, Porsche, Volkswagen, and Lamborghini with dealer-level diagnostics.',
      caption: 'Luxury Car Care Experts',
    },
    {
      image: '/images/hero-car2.png',
      headingTop: 'Advanced Supercar &',
      headingAccent: 'Exotic Car Repair',
      paragraph:
        'Professional mechanics and state-of-the-art workshop setup designed for high-performance and luxury supercars.',
      caption: 'Precision & Excellence',
    },
    {
      image: '/images/hero-car3.png',
      headingTop: 'Complete Body Shop &',
      headingAccent: 'Accident Repair',
      paragraph:
        'Top-tier paint booth, denting, chassis alignment, and insurance claim support under one roof in Al Quoz.',
      caption: 'Trusted Workshop Dubai',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  // ----- Auto Slide -----
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

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

  const activeSlide = slides[currentSlide];

  return (
    <section
      ref={heroRef}
      className="hero-section"
      aria-label="Auto Expert Workshop Hero Section"
    >
      {/* Background Slider */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-bg ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url('${slide.image}')` }}
          role="img"
          aria-label={`Slide ${index + 1}`}
        ></div>
      ))}

      {/* Overlays */}
      <div className="hero-overlay"></div>
      <div className="hero-glow-left"></div>
      <div className="hero-glow-right"></div>
      <div className="hero-cursor-glow"></div>

      {/* Pure CSS Particles — SSR safe ✅ */}
      <div className="hero-particles" aria-hidden="true">
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
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
                    text="AUTO EXPERT WORKSHOP DUBAI"
                    className="hero-badge-text"
                    delay={0.2}
                    stagger={0.03}
                  />
                </div>

                {/* Heading — TWO LINES ✅ */}
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
                  <WordReveal delay={1.1} stagger={0.03}>
                    {activeSlide.paragraph}
                  </WordReveal>
                </p>
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
          {slides.map((_, index) => (
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
          {slides.map((_, index) => (
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
          <svg
            className="arrow-icon arrow-small"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
          <svg
            className="arrow-icon arrow-medium"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
          <svg
            className="arrow-icon arrow-large"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
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
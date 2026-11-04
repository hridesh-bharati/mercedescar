// src/components/home/Hero.jsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './Hero.css';

const slides = [
  {
    image: '/images/home-page-pic1.avif',
    badge: 'DUBAI’S PREMIER MERCEDES WORKSHOP',
    titleMain: 'Mercedes-Benz Garage &',
    titleHighlight: 'Specialist Workshop in Dubai',
    description:
      'Advanced diagnostics, expert servicing and genuine parts for Mercedes-Benz vehicles at our Al Quoz workshop in Dubai.',
  },
  {
    image: '/images/home-page-pic2.avif',
    badge: 'CERTIFIED MERCEDES SPECIALISTS',
    titleMain: 'Complete Mercedes',
    titleHighlight: 'Repair Solutions',
    description:
      'Professional engine diagnostics, brake servicing and maintenance for Mercedes-Benz vehicles with reliable workmanship in Al Quoz, Dubai.',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="enterprise-hero"
      aria-label="Mercedes-Benz Specialist Workshop in Dubai"
    >
      <div className="hero-bg-wrapper" aria-hidden="true">
        {slides.map((slide, index) => (
          <Image
            key={slide.image}
            src={slide.image}
            alt=""
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 100vw"
            quality={index === 0 ? 75 : 65}
            className={`hero-bg-image ${
              currentSlide === index ? 'hero-image-active' : ''
            }`}
            style={{ objectFit: 'cover' }}
          />
        ))}
        <div className="hero-gradient-overlay" />
      </div>

      <div className="container enterprise-container">
        <div className="row align-items-center enterprise-hero-row">
          <div className="col-12 col-lg-7 hero-content-col">
            <div className="hero-carousel-inner">
              {slides.map((slide, index) => (
                <div
                  key={slide.badge}
                  className={`hero-slide ${
                    currentSlide === index ? 'hero-slide-active' : ''
                  }`}
                  aria-hidden={currentSlide !== index}
                >
                  <div className="hero-text-block">
                    <div className="enterprise-badge hero-heading-animate">
                      <span className="badge-line" />
                      <span>{slide.badge}</span>
                    </div>

                    {index === 0 ? (
                      <h1 className="enterprise-heading">
                        <span className="heading-main hero-heading-animate">
                          {slide.titleMain}
                        </span>
                        <span className="heading-highlight hero-heading-animate">
                          {slide.titleHighlight}
                        </span>
                      </h1>
                    ) : (
                      <h2 className="enterprise-heading">
                        <span className="heading-main hero-heading-animate">
                          {slide.titleMain}
                        </span>
                        <span className="heading-highlight hero-heading-animate">
                          {slide.titleHighlight}
                        </span>
                      </h2>
                    )}

                    <p className="enterprise-desc hero-paragraph-animate">
                      {slide.description}
                    </p>

                    <div className="enterprise-actions hero-paragraph-animate">
                      <Link
                        href="/contact"
                        className="btn-enterprise-primary"
                        aria-label="Book a Mercedes-Benz service appointment in Dubai"
                      >
                        Book Service
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </Link>

                      <a
                        href="tel:+971567888808"
                        className="btn-enterprise-secondary"
                        aria-label="Call Mercedes Garage Dubai at plus 971 56 788 8808"
                      >
                        <span className="phone-icon-wrap">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7a2 2 0 0 1 1.73 2.03Z" />
                          </svg>
                        </span>
                        <span className="phone-text">
                          <span className="phone-label">Call Experts</span>
                          <span className="phone-number">
                            +971 56 788 8808
                          </span>
                        </span>
                      </a>
                    </div>

                    {/* ✅ Niche 3 animated down arrows */}
                    <div className="hero-scroll-indicator hero-paragraph-animate">
                      <svg width="32" height="16" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2 2 12 10 22 2" />
                      </svg>
                      <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2 2 12 10 22 2" />
                      </svg>
                      <svg width="16" height="8" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2 2 12 10 22 2" />
                      </svg>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import './Hero.css';

const slides = [
  {
    image: '/images/hero-car.png',
    badge: 'DUBAI’S PREMIER AUTO HUB',
    titleMain: 'Precision Engineering',
    titleHighlight: 'Elite Auto Care',
    description:
      'Advanced diagnostics, expert servicing and genuine parts for luxury and performance vehicles in Al Quoz, Dubai.',
    features: ['OEM Diagnostics', 'Certified Technicians', 'Genuine Parts'],
  },
  {
    image: '/images/home.png',
    badge: 'ADVANCED WORKSHOP SOLUTIONS',
    titleMain: 'Complete Auto',
    titleHighlight: 'Repair Solutions',
    description:
      'Professional engine diagnostics, brake servicing and maintenance for luxury vehicles with reliable workmanship.',
    features: ['Engine Diagnostics', 'Brake & Suspension', 'AC Service'],
  },
];

export default function Hero() {
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let instance;
    let element;
    let disposed = false;

    const initializeCarousel = async () => {
      const { default: Carousel } = await import(
        'bootstrap/js/dist/carousel'
      );

      if (disposed || !carouselRef.current) return;

      element = carouselRef.current;

      instance = Carousel.getOrCreateInstance(element, {
        interval: 7000,
        ride: 'carousel',
        pause: false,
        touch: true,
        wrap: true,
      });

      const handleSlide = (event) => {
        setCurrentSlide(event.to);
      };

      element.addEventListener('slid.bs.carousel', handleSlide);

      element._heroSlideHandler = handleSlide;

      instance.cycle();
    };

    initializeCarousel();

    return () => {
      disposed = true;

      if (element) {
        if (element._heroSlideHandler) {
          element.removeEventListener(
            'slid.bs.carousel',
            element._heroSlideHandler
          );
          delete element._heroSlideHandler;
        }

        instance?.dispose();
      }
    };
  }, []);

  const goToSlide = async (index) => {
    const { default: Carousel } = await import(
      'bootstrap/js/dist/carousel'
    );

    if (!carouselRef.current) return;

    Carousel.getOrCreateInstance(carouselRef.current).to(index);
  };

  return (
    <section className="enterprise-hero" aria-label="Auto Service Centre">
      <div className="hero-bg-wrapper" aria-hidden="true">
        {slides.map((slide, index) => (
          <img
            key={slide.image}
            src={slide.image}
            alt=""
            className={`hero-bg-image ${
              currentSlide === index ? 'hero-image-active' : ''
            }`}
            fetchPriority={index === 0 ? 'high' : 'auto'}
          />
        ))}

        <div className="hero-gradient-overlay" />
      </div>

      <div className="container enterprise-container">
        <div className="row align-items-center enterprise-hero-row">
          <div className="col-lg-7 hero-content-col">
            <div
              id="heroBootstrapCarousel"
              ref={carouselRef}
              className="carousel slide"
            >
              <div className="carousel-inner">
                {slides.map((slide, index) => (
                  <div
                    key={slide.badge}
                    className={`carousel-item ${
                      index === 0 ? 'active' : ''
                    }`}
                  >
                    <div className="hero-text-block">
                      <div className="enterprise-badge hero-heading-animate">
                        <span className="badge-line" />
                        <span>{slide.badge}</span>
                      </div>

                      <h1 className="enterprise-heading">
                        <span className="heading-main hero-heading-animate">
                          {slide.titleMain}
                        </span>

                        <span className="heading-highlight hero-heading-animate">
                          {slide.titleHighlight}
                        </span>
                      </h1>

                      <p className="enterprise-desc hero-paragraph-animate">
                        {slide.description}
                      </p>

                      <div className="enterprise-features hero-paragraph-animate">
                        {slide.features.map((feature) => (
                          <div className="feature-pill" key={feature}>
                            <span className="feature-check">✓</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="enterprise-actions hero-paragraph-animate">
                        <Link
                          href="/book-service"
                          className="btn-enterprise-primary"
                        >
                          Book Service Now
                          <svg
                            width="18"
                            height="18"
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
                        >
                          <span className="phone-icon-wrap">
                            <svg
                              width="19"
                              height="19"
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
                            <span className="phone-label">
                              Call Our Experts
                            </span>
                            <span className="phone-number">
                              +971 56 788 8808
                            </span>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hero-carousel-indicators">
                {slides.map((slide, index) => (
                  <button
                    key={slide.badge}
                    type="button"
                    className={`hero-indicator ${
                      currentSlide === index ? 'active' : ''
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Show slide ${index + 1}`}
                    aria-pressed={currentSlide === index}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-5 hero-empty-col" aria-hidden="true" />
        </div>
      </div>

      <div className="enterprise-bottom-bar">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="bottom-meta-item">
            <span className="meta-dot" />
            <span>Premium Workshop Care</span>
          </div>

          <div className="bottom-meta-item bottom-meta-right">
            <span>Al Quoz Industrial Area 2, Dubai</span>
          </div>
        </div>
      </div>
    </section>
  );
}
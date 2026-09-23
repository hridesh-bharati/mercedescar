'use client';

import { useState, useEffect } from 'react';
import './Hero.css';

export default function Hero() {
  // Har slide ke liye alag text content
  const slides = [
    {
      image: '/images/hero-car1.png',
      heading: (
        <>
          Mercedes Maintenance, <br />
          Repair, and Care by <span className="hero-heading-accent">Expert Hands</span>
        </>
      ),
      paragraph:
        'We provide trusted Mercedes-Benz service & repair with certified technicians, genuine parts and advanced diagnostics.',
      caption: 'Your Mercedes Our Priority',
    },
    {
      image: '/images/hero-car2.png',
      heading: (
        <>
          Advanced Engineering <br />
          & <span className="hero-heading-accent">Precision Care</span>
        </>
      ),
      paragraph:
        'Experience state-of-the-art diagnostics and factory-grade equipment designed specifically for your luxury vehicle.',
      caption: 'Excellence in Every Detail',
    },
    {
      image: '/images/hero-car3.png',
      heading: (
        <>
          Uncompromising Quality <br />
          For <span className="hero-heading-accent">Ultimate Performance</span>
        </>
      ),
      paragraph:
        'Keep your vehicle running at its absolute best with 100% genuine parts and dedicated specialists.',
      caption: 'Driven By Passion & Care',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slider change every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      className="hero-section"
      aria-label="Mercedes-Benz Premium Auto Service"
    >
      {/* 3 Picture Background Slider */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-bg ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url('${slide.image}')` }}
          role="img"
          aria-label={`Mercedes Benz Service Slide ${index + 1}`}
        ></div>
      ))}

      {/* Dark Gradient Overlay for Readability */}
      <div className="hero-overlay"></div>

      {/* Red ambient glows */}
      <div className="hero-glow-left"></div>
      <div className="hero-glow-right"></div>

      <div className="hero-container container">
        <div className="row">
          <div className="col-lg-7 hero-text-col">
            {/* key triggers re-animation on every slide change */}
            <div key={currentSlide} className="hero-content-wrapper">
              {/* Badge */}
              <div className="hero-badge animate-slide-down">
                <span className="hero-badge-dash"></span>
                <span className="hero-badge-text">PREMIUM AUTO SERVICE</span>
              </div>

              {/* Heading */}
              <h1 className="hero-heading animate-slide-down-delay">
                {slides[currentSlide].heading}
              </h1>

              {/* Paragraph */}
              <p className="hero-paragraph animate-slide-up">
                {slides[currentSlide].paragraph}
              </p>
            </div>

            {/* Buttons — outside key so they animate once on load */}
            <div className="hero-buttons animate-slide-up-delay">
              <a href="#contact" className="hero-btn-primary">
                <span>Book an Appointment</span>
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

              <button type="button" className="hero-btn-video">
                <span className="hero-play-circle">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6 4 20 12 6 20" />
                  </svg>
                </span>
                <span>Watch Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR: Indicators, Infinite Arrows & Right Caption */}
      <div className="hero-bottom-bar container">
        <div className="hero-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`hero-indicator-btn ${
                index === currentSlide ? 'active' : ''
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span className="indicator-num">0{index + 1}</span>
              <span className="indicator-line"></span>
            </button>
          ))}
        </div>

        {/* Bottom Infinite Animated Arrows (Small, Medium, Large) */}
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

        {/* Right caption — key for fresh animation per slide */}
        <div key={currentSlide} className="hero-right-caption">
          <span className="caption-line"></span>
          <p>{slides[currentSlide].caption}</p>
        </div>
      </div>
    </section>
  );
}
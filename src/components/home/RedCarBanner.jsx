'use client';

import './RedCarBanner.css';

export default function RedCarBanner() {
  return (
    <section className="rcb-section" id="amg">
      {/* Background layers */}
      <div className="rcb-bg" aria-hidden="true"></div>
      <div className="rcb-bg-overlay" aria-hidden="true"></div>
      <div className="rcb-grid" aria-hidden="true"></div>

      {/* Ambient glows */}
      <div className="rcb-glow rcb-glow-1" aria-hidden="true"></div>
      <div className="rcb-glow rcb-glow-2" aria-hidden="true"></div>

      {/* Decorative racing stripes */}
      <div className="rcb-stripes" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="container rcb-container">
        <div className="rcb-content">
          {/* Badge */}
          <div className="rcb-badge">
            <span className="rcb-badge-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </span>
            <span className="rcb-badge-text">AMG & PERFORMANCE DIVISION</span>
          </div>

          {/* Heading */}
          <h2 className="rcb-heading">
            Specialized Red Car
            <span className="rcb-heading-accent"> &amp; AMG Division</span>
          </h2>

          {/* Subtext */}
          <p className="rcb-paragraph">
            High-performance tuning, body modifications, and customized care for
            elite sports models — engineered by specialists who live and breathe
            Mercedes performance.
          </p>

          {/* CTAs */}
          <div className="rcb-cta-row">
            <a href="#contact" className="rcb-btn-primary">
              <span>Consult an Expert</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="#services" className="rcb-btn-ghost">
              <span>Explore Services</span>
            </a>
          </div>

          {/* Mini stats */}
          <div className="rcb-stats">
            <div className="rcb-stat">
              <strong>25+</strong>
              <span>AMG Builds</span>
            </div>
            <div className="rcb-stat-divider" aria-hidden="true"></div>
            <div className="rcb-stat">
              <strong>100%</strong>
              <span>OEM Parts</span>
            </div>
            <div className="rcb-stat-divider" aria-hidden="true"></div>
            <div className="rcb-stat">
              <strong>7★</strong>
              <span>Specialists</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
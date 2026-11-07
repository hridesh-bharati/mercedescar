// src/components/home/RedCarBanner.jsx
'use client';

import Link from 'next/link';

export default function RedCarBanner() {
  return (
    <section
      className="position-relative d-flex align-items-center justify-content-center text-center overflow-hidden bg-black text-white"
      style={{
        minHeight: '380px',
        maxHeight: '430px',
        padding: '40px 0',
        backgroundImage: `url('/images/servicesman.avif')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      id="amg"
      aria-labelledby="amg-heading"
    >
      {/* Overlay with grid effect */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: `
            linear-gradient(90deg, rgba(139, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.85) 50%),
            radial-gradient(circle at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.95) 100%),
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 40px 40px, 40px 40px',
          zIndex: 1,
        }}
        aria-hidden="true"
      ></div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Badge */}
            <div
              className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill border border-danger border-opacity-50 bg-black bg-opacity-50 text-danger fw-bold small shadow-sm"
              style={{ boxShadow: '0 0 15px rgba(225, 29, 72, 0.2)' }}
              data-anim="down"
            >
              <span
                className="rounded-circle bg-danger"
                style={{
                  width: 6,
                  height: 6,
                  boxShadow: '0 0 8px #ff4d4d',
                }}
                aria-hidden="true"
              ></span>
              <span style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>
                MERCEDES AMG &amp; PERFORMANCE DIVISION
              </span>
            </div>

            {/* ✅ Mercedes keyword H2 */}
            <h2
              id="amg-heading"
              className="fw-bold mb-2 text-white"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.7rem)',
                lineHeight: '1.2',
              }}
              data-anim="up"
              data-anim-delay="100"
            >
              Mercedes AMG &amp; Performance
              <br />
              <span className="text-danger">Division in Dubai</span>
            </h2>

            {/* Subtext */}
            <p
              className="text-light opacity-75 mb-4 mx-auto"
              style={{
                maxWidth: '580px',
                fontSize: '0.9rem',
                lineHeight: '1.5',
              }}
              data-anim="up"
              data-anim-delay="200"
            >
              High-performance Mercedes AMG tuning, G63 wide-body kits, AMG
              styling and custom upgrades — engineered by specialists who live
              and breathe Mercedes performance in Al Quoz, Dubai.
            </p>

            {/* CTAs */}
            <div
              className="d-flex align-items-center justify-content-center gap-3 flex-wrap"
              data-anim="up"
              data-anim-delay="300"
            >
              <Link
                href="/contact"
                className="btn btn-danger px-4 py-2 fw-bold text-uppercase small shadow"
                style={{
                  background:
                    'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                  border: 'none',
                  boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)',
                }}
                aria-label="Consult a Mercedes AMG specialist"
              >
                Consult AMG Expert &rarr;
              </Link>
              <Link
                href="/services"
                className="btn btn-outline-light px-4 py-2 fw-semibold text-uppercase small bg-black bg-opacity-25"
                style={{ borderColor: 'rgba(255,255,255,0.3)' }}
                aria-label="Explore Mercedes AMG services"
              >
                Explore AMG Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { Star, Quote } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Rashid Al-Maktoum',
    car: 'Mercedes-Benz S500',
    service: 'Engine Diagnostics & Maintenance',
    text: 'Best Mercedes garage in Dubai! Their XENTRY diagnostic tools pinpointed an issue other workshops missed completely. Highly professional mechanics and transparent pricing.',
    rating: 5,
  },
  {
    name: 'Michael Schmidt',
    car: 'Mercedes AMG C63',
    service: 'Performance Tune-up',
    text: 'If you drive an AMG in Dubai, this is the only workshop you should visit. Absolute specialists who know German engines inside out. Very satisfied with the service!',
    rating: 5,
  },
  {
    name: 'Fatima Al-Zahra',
    car: 'Mercedes GLC 300',
    service: 'Periodic Service & Brakes',
    text: 'Quick turnaround time and genuine parts used. The team is extremely polite, and they explained every single detail before proceeding with the repair. Top-tier service.',
    rating: 5,
  },
  {
    name: 'Alexander V.',
    car: 'Mercedes E-Class',
    service: 'Airmatic Suspension Repair',
    text: 'My suspension warning light was fixed within hours. Great customer support, cozy waiting area, and expert technicians. Will definitely come back for future maintenance.',
    rating: 5,
  },
  {
    name: 'Tariq Mansoor',
    car: 'Mercedes G63',
    service: 'Full Engine Overhaul',
    text: 'Extremely knowledgeable mechanics. Finding a trustworthy Mercedes specialist in Al Quoz can be tough, but German Auto Expert exceeded all my expectations.',
    rating: 5,
  },
  {
    name: 'David Miller',
    car: 'Mercedes GLE 450',
    service: 'AC & Electrical Repair',
    text: 'Superb service! Fixed my AC cooling issue just before peak summer heat. Fair pricing and professional staff. Highly recommend them to all luxury car owners.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <>
      <Header />

      <main className="testimonials-main">
        {/* ============ HERO BANNER ============ */}
        <section className="testimonials-hero text-white position-relative">
          <div className="testimonials-hero-bg"></div>
          <div className="testimonials-hero-overlay"></div>
          <div className="container position-relative z-2 py-4">
            <div className="row">
              <div className="col-lg-7 text-start" data-aos="fade-down">
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-dark bg-opacity-50 border border-light border-opacity-25 mb-2">
                  <span style={{ width: '20px', height: '2px', background: '#D6241D', display: 'inline-block' }}></span>
                  <span className="small fw-bold tracking-wider text-danger">TESTIMONIALS</span>
                </div>
                <h1 className="display-5 fw-bold mb-2">
                  What Our <span className="text-danger">Clients Say</span>
                </h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0 bg-dark bg-opacity-50 px-3 py-1 rounded-pill d-inline-flex align-items-center border border-light border-opacity-10 small">
                    <li className="breadcrumb-item"><a href="/" className="text-danger text-decoration-none fw-semibold">Home</a></li>
                    <li className="breadcrumb-item active text-light fw-semibold" aria-current="page">Testimonials</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* ============ TESTIMONIALS GRID SECTION ============ */}
        <section className="testimonials-section py-5 position-relative overflow-hidden">
          {/* Ambient Glow Effects */}
          <div className="testimonials-glow testimonials-glow-blue"></div>
          <div className="testimonials-glow testimonials-glow-pink"></div>

          <div className="container position-relative z-2">
            
            <div className="row mb-5">
              <div className="col-lg-8 text-start" data-aos="fade-right">
                <span className="text-danger fw-bold small text-uppercase tracking-wider">Trusted by Luxury Car Owners</span>
                <h2 className="fw-bold text-dark mt-1">Real Reviews from Real Mercedes Owners</h2>
                <p className="text-secondary">Read how we deliver unmatched precision, quality, and care for every vehicle that rolls into our Al Quoz workshop.</p>
              </div>
            </div>

            {/* 6 Testimonial Cards Grid */}
            <div className="row g-4">
              {testimonials.map((item, index) => (
                <div 
                  className="col-lg-4 col-md-6" 
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="card border-0 glass-card p-4 h-100 d-flex flex-column justify-content-between shadow-sm text-start position-relative">
                    
                    <div className="position-absolute top-0 end-0 p-4 text-danger opacity-25">
                      <Quote size={40} />
                    </div>

                    <div>
                      {/* Star Ratings */}
                      <div className="d-flex gap-1 mb-3 text-warning">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>

                      <p className="text-secondary small fst-italic mb-4" style={{ lineHeight: '1.7' }}>
                        &ldquo;{item.text}&rdquo;
                      </p>
                    </div>

                    <div className="border-top pt-3 border-light-subtle">
                      <h6 className="fw-bold text-dark mb-0">{item.name}</h6>
                      <div className="d-flex justify-content-between align-items-center mt-1">
                        <span className="text-danger small fw-semibold" style={{ fontSize: '0.75rem' }}>{item.car}</span>
                        <span className="text-muted small" style={{ fontSize: '0.75rem' }}>{item.service}</span>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Google Review Banner CTA */}
            <div className="row mt-5 justify-content-center">
              <div className="col-lg-8" data-aos="fade-up">
                <div className="glass-card p-4 text-center rounded-4 shadow-sm border border-light">
                  <h5 className="fw-bold text-dark mb-2">Have you serviced your Mercedes with us?</h5>
                  <p className="text-secondary small mb-3">We would love to hear about your experience at German Auto Expert!</p>
                  <a 
                    href="https://share.google/fW9nIaX2BXPwkKhmg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-danger btn-sm rounded-pill px-4 fw-bold py-2 shadow-sm"
                  >
                    Leave a Review on Google
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
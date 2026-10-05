'use client';

import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CheckCircle2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './case-detail.css';

const galleryImages = [
  '/images/case/image-1.webp',
  '/images/case/image-2.webp',
  '/images/case/image-3.webp',
  '/images/case/image-4.webp',
  '/images/case/image-5.webp',
  '/images/case/image-6.webp',
];

export default function CaseDetailPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 40,
    });
  }, []);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Header />

      <main className="case-main">
        {/* ============ HERO BANNER ============ */}
        <section className="case-hero text-white position-relative">
          <div className="case-hero-bg"></div>
          <div className="case-hero-overlay"></div>
          <div className="container position-relative z-2 py-4">
            <div className="row">
              <div className="col-lg-7 text-start" data-aos="fade-down">
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-dark bg-opacity-50 border border-light border-opacity-25 mb-2">
                  <span style={{ width: '20px', height: '2px', background: '#D6241D', display: 'inline-block' }}></span>
                  <span className="small fw-bold tracking-wider text-danger">CASE DETAILS</span>
                </div>
                <h1 className="display-5 fw-bold mb-2">
                  Full Synthetic <span className="text-danger">Oil Change</span>
                </h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0 bg-dark bg-opacity-50 px-3 py-1 rounded-pill d-inline-flex align-items-center border border-light border-opacity-10 small">
                    <li className="breadcrumb-item"><a href="/" className="text-danger text-decoration-none fw-semibold">Home</a></li>
                    <li className="breadcrumb-item active text-light fw-semibold" aria-current="page">Full Synthetic Oil Change</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* ============ MAIN CONTENT SECTION ============ */}
        <section className="py-5 position-relative overflow-hidden">
          <div className="case-glow case-glow-blue"></div>
          <div className="case-glow case-glow-pink"></div>

          <div className="container position-relative z-2">
            
            {/* Featured Image & Meta Info Bar */}
            <div className="row mb-5" data-aos="fade-up">
              <div className="col-12">
                <div className="glass-card p-3 rounded-4 shadow-sm bg-white bg-opacity-75">
                  <div className="rounded-4 overflow-hidden mb-4" style={{ height: '420px' }} data-aos="zoom-in">
                    <img 
                      src="/images/case/image-6.webp" 
                      alt="Full Synthetic Oil Change" 
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>

                  {/* Meta Bar Details */}
                  <div className="row g-3 py-3 px-2 text-start justify-content-between align-items-center bg-white rounded-4 shadow-sm border border-light" data-aos="fade-up" data-aos-delay="100">
                    <div className="col-6 col-md-3 border-end border-light-subtle">
                      <span className="text-muted d-block small uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Clients:</span>
                      <strong className="text-dark">JOHN DOE</strong>
                    </div>
                    <div className="col-6 col-md-3 border-end border-light-subtle">
                      <span className="text-muted d-block small uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Category:</span>
                      <strong className="text-dark">Repair</strong>
                    </div>
                    <div className="col-6 col-md-3 border-end border-light-subtle">
                      <span className="text-muted d-block small uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Start Date:</span>
                      <strong className="text-dark">December 13, 2023</strong>
                    </div>
                    <div className="col-6 col-md-3">
                      <span className="text-muted d-block small uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Price:</span>
                      <strong className="text-danger fs-5">$584</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Article Text Section */}
            <div className="row g-4 text-start">
              <div className="col-lg-12">
                <div className="glass-card p-4 p-md-5 rounded-4 shadow-sm bg-white bg-opacity-75 mb-5">
                  
                  <p className="text-secondary small lh-lg mb-4" style={{ fontSize: '0.95rem' }} data-aos="fade-up">
                    Automotive filters play a crucial role in keeping your vehicle running smoothly by preventing dirt, debris, and contaminants from affecting key components. At German Auto Expert, we provide expert repair and replacement services for all essential filters, including engine air filters, oil filters, fuel filters, cabin air filters, and transmission filters. A clogged or dirty filter can reduce engine efficiency, lower fuel economy, and affect air quality inside your vehicle. Our certified technicians thoroughly inspect, clean, and replace filters to ensure optimal performance.
                  </p>

                  <p className="text-secondary small lh-lg mb-4" style={{ fontSize: '0.95rem' }} data-aos="fade-up" data-aos-delay="50">
                    Using high-quality replacement parts, we help extend your engine’s lifespan and improve overall vehicle efficiency. Whether you’re experiencing reduced acceleration, poor fuel efficiency, or dirty airflow, we’ve got you covered. Regular filter maintenance is essential to prevent costly engine damage and ensure smooth driving. Our quick and reliable service ensures minimal downtime, getting you back on the road safely. Trust German Auto Expert for professional automotive filter repair.
                  </p>

                  <h3 className="fs-4 fw-bold text-dark mt-5 mb-3" data-aos="fade-right">WHAT WE&apos;VE DONE</h3>
                  <p className="text-secondary small lh-lg mb-4" style={{ fontSize: '0.95rem' }} data-aos="fade-up">
                    At German Auto Expert, we have successfully repaired and replaced hundreds of automotive filters, ensuring vehicles run efficiently and safely. Our expert technicians have handled clogged engine air filters, worn-out oil filters, faulty fuel filters, and dirty cabin air filters, restoring engine performance and improving air quality. We’ve helped customers enhance fuel efficiency, reduce emissions, and extend engine life with timely filter maintenance. Whether it’s a simple replacement or a complex filtration system issue, our precision, high-quality parts, and expert service guarantee the best results. Trust us for all your automotive filter repair needs!
                  </p>

                  <ul className="list-unstyled d-grid gap-2 mb-5">
                    {[
                      'Replaced Clogged Engine Air Filters',
                      'Installed New Oil Filters',
                      'Repaired & Replaced Fuel Filters',
                      'Upgraded Cabin Air Filters',
                      'Serviced Transmission Filters',
                      'Conducted Full Filter Inspections',
                    ].map((item, idx) => (
                      <li key={idx} className="d-flex align-items-center gap-2 small text-secondary fw-semibold" data-aos="fade-right" data-aos-delay={idx * 60}>
                        <CheckCircle2 size={16} className="text-danger flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="row g-4 mb-5">
                    <div className="col-md-6" data-aos="fade-right" data-aos-delay="100">
                      <div className="rounded-4 overflow-hidden shadow-sm" style={{ height: '240px' }}>
                        <img src="/images/case/image-2.webp" alt="Mechanic work" className="w-100 h-100 object-fit-cover" />
                      </div>
                    </div>
                    <div className="col-md-6" data-aos="fade-left" data-aos-delay="150">
                      <div className="rounded-4 overflow-hidden shadow-sm" style={{ height: '240px' }}>
                        <img src="/images/case/image-3.webp" alt="Workshop bay" className="w-100 h-100 object-fit-cover" />
                      </div>
                    </div>
                  </div>

                  <h3 className="fs-4 fw-bold text-dark mt-4 mb-3" data-aos="fade-right">AUTOMOTIVE FILERS REPAIR PROCESS</h3>
                  <p className="text-secondary small lh-lg mb-4" style={{ fontSize: '0.95rem' }} data-aos="fade-up">
                    Our automotive filter repair process begins with a thorough inspection to assess the condition of your engine air, oil, fuel, cabin, and transmission filters. We then clean or replace clogged filters using high-quality parts to ensure optimal performance. After installation, we test your vehicle for improved airflow, fuel efficiency, and engine protection. Trust German Auto Expert for expert filter maintenance and repair—schedule your service today!
                  </p>

                  <h3 className="fs-4 fw-bold text-dark mt-4 mb-3" data-aos="fade-right">PROJECT RESULTS</h3>
                  <p className="text-secondary small lh-lg mb-4" style={{ fontSize: '0.95rem' }} data-aos="fade-up">
                    Our automotive filter repair and replacement services have significantly improved engine performance, fuel efficiency, and air quality for our clients. Vehicles serviced experienced smoother acceleration, reduced emissions, and enhanced longevity of engine components. By using high-quality filters and expert installation, we’ve helped prevent costly engine damage and ensured optimal vehicle health. Customers have reported better mileage, improved airflow, and overall driving comfort. Trust German Auto Expert for reliable filter maintenance and top-notch results—book your service today!
                  </p>

                  <h3 className="fs-4 fw-bold text-dark mt-4 mb-3" data-aos="fade-right">PROJECT GALLERY</h3>
                  <p className="text-secondary small mb-3" data-aos="fade-up">Click on any image to open the full-screen interactive slider.</p>
                  
                  {/* Clickable Gallery Grid */}
                  <div className="row g-3 mt-2">
                    {galleryImages.map((imgSrc, gIdx) => (
                      <div className="col-md-4" key={gIdx} data-aos="fade-up" data-aos-delay={gIdx * 80}>
                        <div 
                          className="rounded-4 overflow-hidden shadow-sm gallery-thumb position-relative" 
                          style={{ height: '180px', cursor: 'pointer' }}
                          onClick={() => openLightbox(gIdx)}
                        >
                          <img src={imgSrc} alt={`Gallery ${gIdx + 1}`} className="w-100 h-100 object-fit-cover transition-transform" />
                          <div className="gallery-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25 d-flex align-items-center justify-content-center opacity-0 transition-opacity hover-opacity">
                            <span className="badge bg-danger px-3 py-2 rounded-pill shadow-sm">View Full</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* ============ FIXED LIGHTBOX MODAL ============ */}
      {lightboxOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: '#D6241D',
              border: 'none',
              borderRadius: '50%',
              width: '45px',
              height: '45px',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 1000000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
            }}
            onClick={closeLightbox}
          >
            <X size={24} />
          </button>

          {/* Prev Arrow */}
          <button 
            style={{
              position: 'absolute',
              left: '20px',
              background: '#D6241D',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 1000000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
            }}
            onClick={handlePrev}
          >
            <ChevronLeft size={28} />
          </button>

          {/* Image Box */}
          <div style={{ textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <img 
              src={galleryImages[currentIndex]} 
              alt={`Slide ${currentIndex + 1}`} 
              style={{
                maxHeight: '80vh',
                maxWidth: '85vw',
                borderRadius: '12px',
                objectFit: 'contain',
                boxShadow: '0 10px 40px rgba(0,0,0,0.8)'
              }}
            />
            <div style={{ color: '#fff', marginTop: '15px', fontWeight: 'bold', letterSpacing: '2px' }}>
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Next Arrow */}
          <button 
            style={{
              position: 'absolute',
              right: '20px',
              background: '#D6241D',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 1000000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
            }}
            onClick={handleNext}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}

      <Footer />
    </>
  );
}
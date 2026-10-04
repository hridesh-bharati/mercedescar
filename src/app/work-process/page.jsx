'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './WorkProcess.css';

const steps = [
  {
    num: '01',
    title: 'Inspection & Diagnosis',
    desc: 'We begin by thoroughly inspecting your vehicle using advanced XENTRY diagnostic scanners to identify any issues and determine the root cause of the problem.',
    image: '/images/work-process/image-cr1.webp',
  },
  {
    num: '02',
    title: 'Estimate & Approval',
    desc: 'Once we\'ve diagnosed the problem, we provide a detailed estimate for the repairs. Your approval is required before any work begins.',
    image: '/images/work-process/image-cr2.webp',
  },
  {
    num: '03',
    title: 'Quality Control Check',
    desc: 'After repairs, the vehicle undergoes a thorough quality check to ensure everything is functioning properly and up to Mercedes factory standards.',
    image: '/images/work-process/image-cr3.webp',
  },
  {
    num: '04',
    title: 'Final Testing & Delivery',
    desc: 'We perform a final road test and inspection before handing your luxury vehicle back to you in showroom-ready condition.',
    image: '/images/work-process/image-cr4.webp',
  },
];

export default function WorkProcess() {
  return (
    <>
      <Header />

      <main className="wp-main">
        {/* ============ HERO BANNER ============ */}
        <section className="wp-hero text-white position-relative">
          <div className="wp-hero-bg"></div>
          <div className="wp-hero-overlay"></div>
          <div className="container position-relative z-2 py-4">
            <div className="row">
              <div className="col-lg-7 text-start" data-aos="fade-down">
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-dark bg-opacity-50 border border-light border-opacity-25 mb-2">
                  <span style={{ width: '20px', height: '2px', background: '#D6241D', display: 'inline-block' }}></span>
                  <span className="small fw-bold tracking-wider text-danger">WORK PROCESS</span>
                </div>
                <h1 className="display-5 fw-bold mb-2">
                  Our Working <span className="text-danger">Methodology</span>
                </h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0 bg-dark bg-opacity-50 px-3 py-1 rounded-pill d-inline-flex align-items-center border border-light border-opacity-10 small">
                    <li className="breadcrumb-item"><a href="/" className="text-danger text-decoration-none fw-semibold">Home</a></li>
                    <li className="breadcrumb-item active text-light fw-semibold" aria-current="page">Work Process</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* ============ WORK PROCESS TIMELINE SECTION ============ */}
        <section className="wp-section py-5 position-relative overflow-hidden">
          {/* Ambient Glow Effects */}
          <div className="wp-glow wp-glow-blue"></div>
          <div className="wp-glow wp-glow-pink"></div>

          <div className="container position-relative z-2">
            
            {/* Section Header */}
            <div className="row mb-5">
              <div className="col-lg-8 text-start" data-aos="fade-right">
                <span className="text-danger fw-bold small text-uppercase tracking-wider">Step-by-Step Excellence</span>
                <h2 className="fw-bold text-dark mt-1">Comprehending the Way We Approach Our Work.</h2>
                <p className="text-secondary">Transparency, precision, and efficiency guide every step of our repair and maintenance service process.</p>
              </div>
            </div>

            {/* Timeline Wrapper */}
            <div className="wp-timeline-wrapper position-relative">
              <div className="wp-timeline-line d-none d-lg-block"></div>

              {steps.map((step, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div className="row align-items-center mb-5 pb-lg-4 position-relative" key={index}>
                    
                    {/* For Even Rows: Image Left, Text Right */}
                    {isEven ? (
                      <>
                        <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-right">
                          <div className="glass-card overflow-hidden rounded-4 shadow-sm p-2 bg-white bg-opacity-50">
                            <img 
                              src={step.image} 
                              alt={step.title} 
                              className="w-100 rounded-4 object-fit-cover" 
                              style={{ height: '260px' }}
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 ps-lg-5 text-start" data-aos="fade-left">
                          <div className="d-flex align-items-center gap-3 mb-2">
                            <span className="display-4 fw-bold text-danger opacity-75">{step.num}</span>
                            <h3 className="fw-bold text-dark mb-0 fs-3">{step.title}</h3>
                          </div>
                          <p className="text-secondary small fst-italic ps-lg-4" style={{ lineHeight: '1.8' }}>
                            {step.desc}
                          </p>
                        </div>
                      </>
                    ) : (
                      /* For Odd Rows: Text Left, Image Right */
                      <>
                        <div className="col-lg-6 pe-lg-5 text-start order-2 order-lg-1" data-aos="fade-right">
                          <div className="d-flex align-items-center gap-3 mb-2">
                            <span className="display-4 fw-bold text-danger opacity-75">{step.num}</span>
                            <h3 className="fw-bold text-dark mb-0 fs-3">{step.title}</h3>
                          </div>
                          <p className="text-secondary small fst-italic ps-lg-4" style={{ lineHeight: '1.8' }}>
                            {step.desc}
                          </p>
                        </div>
                        <div className="col-lg-6 mb-4 mb-lg-0 order-1 order-lg-2" data-aos="fade-left">
                          <div className="glass-card overflow-hidden rounded-4 shadow-sm p-2 bg-white bg-opacity-50">
                            <img 
                              src={step.image} 
                              alt={step.title} 
                              className="w-100 rounded-4 object-fit-cover" 
                              style={{ height: '260px' }}
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </>
                    )}

                  </div>
                );
              })}

            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
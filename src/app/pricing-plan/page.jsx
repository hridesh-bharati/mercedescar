'use client';

import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Check, ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './PricingPlan.css';

const pricingPlans = [
  {
    title: 'Standard Plan',
    desc: 'Essential maintenance and quick repairs to keep you road-ready.',
    price: '120',
    unit: 'Per Car',
    highlighted: true,
    features: [
      '24h customer support',
      'Ceramic cutting',
      'Color changing indoor',
      'Heavy duty bumper',
      'Water proofing',
      'General diagnosis',
    ],
  },
  {
    title: 'Basic Plan',
    desc: 'Essential maintenance and quick repairs to keep you road-ready.',
    price: '120',
    unit: 'Per Car',
    highlighted: false,
    features: [
      '24h customer support',
      'Ceramic cutting',
      'Color changing indoor',
      'Heavy duty bumper',
      'Water proofing',
      'General diagnosis',
    ],
  },
  {
    title: 'Advanced Plan',
    desc: 'Essential maintenance and quick repairs to keep you road-ready.',
    price: '120',
    unit: 'Per Car',
    highlighted: false,
    features: [
      '24h customer support',
      'Ceramic cutting',
      'Color changing indoor',
      'Heavy duty bumper',
      'Water proofing',
      'General diagnosis',
    ],
  },
];

const partners = [
  'Be Car Care Aware',
  'SUMCO CORPORATION',
  'YOKOHAMA',
  'Venteshade Company',
  'National Car Rental',
  'PENTAIR',
];

const clientReviews = [
  {
    name: 'Randy Caligiuri',
    role: 'Web Developer',
    text: 'Since 1985 Reed has pioneered specialist recruitment, Sourcing knowledgeable, skilled professionals pioneered Specialist recruitment, sourcing.',
  },
  {
    name: 'Michael Ward',
    role: 'UI/UX Designer',
    text: 'Exceptional service quality and attention to detail. The team went above and beyond to ensure everything was running smoothly.',
  },
  {
    name: 'Savannah Jockdan',
    role: 'Product Manager',
    text: 'Professional mechanics with top-notch diagnostic tools. My car feels brand new after their complete maintenance package.',
  },
  {
    name: 'Alex Morgan',
    role: 'Automotive Specialist',
    text: 'Outstanding customer support and transparent pricing. Highly recommend their ceramic coating and detailing services!',
  },
];

export default function PricingPlan() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 40,
    });
  }, []);

  // Auto-slide effect (har 4 seconds me slide hoga)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= clientReviews.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? clientReviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= clientReviews.length - 1 ? 0 : prev + 1));
  };

  // First review (Mobile & PC dono ke liye)
  const firstReview = clientReviews[currentIndex];
  // Second review (Sirf PC ke liye 2nd card)
  const secondReview = clientReviews[(currentIndex + 1) % clientReviews.length];

  return (
    <>
      <Header />

      <main className="pricing-main">
        {/* ============ HERO BANNER ============ */}
        <section className="pricing-hero text-white position-relative">
          <div className="pricing-hero-bg"></div>
          <div className="pricing-hero-overlay"></div>
          <div className="container position-relative z-2 py-4">
            <div className="row">
              <div className="col-lg-7 text-start" data-aos="fade-down">
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-dark bg-opacity-50 border border-light border-opacity-25 mb-2">
                  <span style={{ width: '20px', height: '2px', background: '#D6241D', display: 'inline-block' }}></span>
                  <span className="small fw-bold tracking-wider text-danger">PRICING PLAN</span>
                </div>
                <h1 className="display-5 fw-bold mb-2">
                  Pricing <span className="text-danger">Plan</span>
                </h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0 bg-dark bg-opacity-50 px-3 py-1 rounded-pill d-inline-flex align-items-center border border-light border-opacity-10 small">
                    <li className="breadcrumb-item"><a href="/" className="text-danger text-decoration-none fw-semibold">Home</a></li>
                    <li className="breadcrumb-item active text-light fw-semibold" aria-current="page">Pricing Plan</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* ============ PRICING SECTION ============ */}
        <section className="pricing-section py-5 position-relative overflow-hidden">
          {/* Ambient Glow Effects */}
          <div className="pricing-glow pricing-glow-blue"></div>
          <div className="pricing-glow pricing-glow-pink"></div>

          <div className="container position-relative z-2">
            
            {/* Section Header */}
            <div className="row mb-5">
              <div className="col-lg-8 text-start" data-aos="fade-right">
                <div className="d-inline-flex align-items-center gap-2 mb-2">
                  <span style={{ width: '15px', height: '2px', background: '#D6241D' }}></span>
                  <span className="text-danger fw-bold small text-uppercase tracking-wider">PRICING PLAN</span>
                </div>
                <h2 className="fw-bold text-dark display-6">DRIVEN TO DELIVER THE BEST IN AUTO REPAIR SERVICES.</h2>
              </div>
            </div>

            {/* Pricing Cards Grid */}
            <div className="row g-4 justify-content-center mb-5 pb-5">
              {pricingPlans.map((plan, index) => (
                <div 
                  className="col-lg-4 col-md-6" 
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                >
                  <div className={`card border-0 p-4 h-100 d-flex flex-column justify-content-between shadow-sm rounded-4 text-start ${plan.highlighted ? 'pricing-card-dark text-white' : 'glass-card text-dark'}`}>
                    
                    <div>
                      <span className={`badge px-3 py-2 rounded-pill fw-bold mb-4 ${plan.highlighted ? 'bg-light text-dark' : 'bg-dark text-white'}`}>
                        {plan.title}
                      </span>

                      <p className={`small mb-4 ${plan.highlighted ? 'text-light opacity-75' : 'text-secondary'}`}>
                        {plan.desc}
                      </p>

                      <div className="d-flex align-items-baseline mb-4">
                        <span className="fs-2 fw-bold text-danger me-1">$</span>
                        <span className="display-4 fw-bold me-2">{plan.price}</span>
                        <span className={`small ${plan.highlighted ? 'text-light opacity-75' : 'text-muted'}`}>/ {plan.unit}</span>
                      </div>

                      <a 
                        href="/contact-us"
                        className={`btn w-100 rounded-pill fw-bold py-2 mb-4 shadow-sm ${plan.highlighted ? 'btn-light text-dark' : 'btn-primary bg-primary border-0 text-white'}`}
                      >
                        GET STARTED
                      </a>

                      <div className={`p-3 rounded-4 ${plan.highlighted ? 'bg-dark bg-opacity-50 border border-light border-opacity-10' : 'bg-white bg-opacity-50 border border-light'}`}>
                        <ul className="list-unstyled d-grid gap-2 mb-0">
                          {plan.features.map((feat, fIndex) => (
                            <li key={fIndex} className="d-flex align-items-center gap-2 small">
                              <span className="text-danger flex-shrink-0">
                                <Check size={14} strokeWidth={3} />
                              </span>
                              <span className={plan.highlighted ? 'text-light opacity-85' : 'text-secondary'}>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* ============ TRUSTED BY WORLDWIDE COMPANY BANNER ============ */}
            <div className="row mt-5">
              <div className="col-12" data-aos="fade-up">
                <div className="trusted-banner p-4 p-md-5 rounded-4 position-relative overflow-hidden text-white">
                  <div className="row align-items-center">
                    <div className="col-lg-4 text-start mb-4 mb-lg-0">
                      <h3 className="fw-bold text-white mb-0 lh-sm fs-2">TRUSTED BY WORLD WIDE COMPANY</h3>
                    </div>
                    <div className="col-lg-8">
                      <div className="row g-4 align-items-center justify-content-between text-center">
                        {partners.map((partner, pIdx) => (
                          <div className="col-4 col-md-4" key={pIdx}>
                            <span className="fw-bold text-white opacity-75 small tracking-wider text-uppercase" style={{ fontSize: '0.8rem' }}>
                              {partner}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============ TESTIMONIALS SLIDER SECTION ============ */}
            <div className="row mt-5 pt-4 align-items-center">
              
              {/* Left Side: Mechanic Image, Title & Navigation Controls */}
              <div className="col-lg-4 text-start mb-4 mb-lg-0" data-aos="fade-right">
                <div className="d-inline-flex align-items-center gap-2 mb-2">
                  <span style={{ width: '15px', height: '2px', background: '#D6241D' }}></span>
                  <span className="text-danger fw-bold small text-uppercase tracking-wider">FULL CLEANING</span>
                </div>
                <h2 className="fw-bold text-dark fs-3 mb-4">SHARING YOUR POSITIVE EXPERIENCE CLIENTS</h2>
                
                {/* Mechanic Image Container */}
                <div className="rounded-4 overflow-hidden shadow-sm mb-4" style={{ height: '220px' }}>
                  <img 
                    src="/images/servicesman.webp" 
                    alt="Mechanic" 
                    className="w-100 h-100 object-fit-cover"
                    loading="lazy"
                  />
                </div>

                {/* Slider Controls */}
                <div className="d-flex gap-2">
                  <button 
                    onClick={handlePrev}
                    className="btn btn-light rounded-2 p-2 shadow-sm border border-light-subtle d-flex align-items-center justify-content-center" 
                    style={{ width: '40px', height: '40px' }} 
                    aria-label="Previous"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="btn btn-primary bg-primary text-white rounded-2 p-2 shadow-sm border-0 d-flex align-items-center justify-content-center" 
                    style={{ width: '40px', height: '40px' }} 
                    aria-label="Next"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              {/* Right Side: Testimonial Cards (1 card on mobile, 2 cards side-by-side on PC/lg) */}
              <div className="col-lg-8" data-aos="fade-left">
                <div className="row g-4">
                  
                  {/* Card 1: Visible on Mobile and PC */}
                  <div className="col-12 col-md-6">
                    <div className="glass-card p-4 rounded-4 shadow-sm position-relative text-start d-flex flex-column justify-content-between h-100 testimonial-card-custom" style={{ minHeight: '300px' }}>
                      <div>
                        <div className="text-primary opacity-25 mb-3">
                          <Quote size={32} />
                        </div>
                        <p className="text-secondary fst-italic mb-4 small" style={{ lineHeight: '1.7' }}>
                          &ldquo;{firstReview.text}&rdquo;
                        </p>
                      </div>
                      <div className="border-top pt-3 border-light-subtle d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="fw-bold text-dark mb-0 fs-6">{firstReview.name}</h6>
                          <span className="text-muted small" style={{ fontSize: '0.8rem' }}>{firstReview.role}</span>
                        </div>
                        <span className="text-primary fw-bold small">0{currentIndex + 1} / 0{clientReviews.length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Hidden on mobile (d-none), visible on medium/large screens (d-md-flex) */}
                  <div className="col-md-6 d-none d-md-flex">
                    <div className="glass-card p-4 rounded-4 shadow-sm position-relative text-start d-flex flex-column justify-content-between h-100 testimonial-card-custom w-100" style={{ minHeight: '300px' }}>
                      <div>
                        <div className="text-primary opacity-25 mb-3">
                          <Quote size={32} />
                        </div>
                        <p className="text-secondary fst-italic mb-4 small" style={{ lineHeight: '1.7' }}>
                          &ldquo;{secondReview.text}&rdquo;
                        </p>
                      </div>
                      <div className="border-top pt-3 border-light-subtle d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="fw-bold text-dark mb-0 fs-6">{secondReview.name}</h6>
                          <span className="text-muted small" style={{ fontSize: '0.8rem' }}>{secondReview.role}</span>
                        </div>
                        <span className="text-primary fw-bold small">
                          {(currentIndex + 2) > clientReviews.length ? `0${(currentIndex + 2) % clientReviews.length || clientReviews.length}` : `0${currentIndex + 2}`} / 0{clientReviews.length}
                        </span>
                      </div>
                    </div>
                  </div>

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
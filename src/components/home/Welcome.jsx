'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Welcome.css';

export default function Welcome() {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }, []);

  const benefits = [
    'Free Annual Safety Analysis',
    'Free Car Wash',
    'Complimentary Upgrades',
    '15% Discount on All Painting',
  ];

  return (
    <section className="welcome-section" id="about">
      {/* Ambient Lighting & Pattern */}
      <div className="welcome-pattern" aria-hidden="true"></div>
      <div className="welcome-glow-orb" aria-hidden="true"></div>

      <div className="container welcome-container">
        <div className="row align-items-center g-5">
          {/* Left Text Column */}
          <div className="col-lg-7">
            {/* Badge */}
            <div className="welcome-badge" data-aos="fade-down" data-aos-delay="100">
              <span className="welcome-badge-dash"></span>
              <span className="welcome-badge-text">ABOUT OUR WORKSHOP</span>
            </div>

            {/* Heading */}
            <h2 className="welcome-heading" data-aos="fade-right" data-aos-delay="200">
              Welcome To <span className="welcome-heading-accent">Auto Expert Workshop</span>
            </h2>

            {/* Paragraph */}
            <p className="welcome-paragraph" data-aos="fade-up" data-aos-delay="300">
              Auto Expert Workshop provides exceptional automotive services including repairs, maintenance, and diagnostics. Our skilled technicians ensure your vehicle receives the care it deserves, keeping you safely on the road.
            </p>

            {/* Subheading */}
            <h3 className="welcome-subheading" data-aos="fade-up" data-aos-delay="400">
              Enjoy Exclusive Membership Benefits
            </h3>

            {/* Benefits Grid (Staggered animation) */}
            <div className="welcome-benefits-grid">
              {benefits.map((benefit, index) => (
                <div
                  className="welcome-benefit-card"
                  key={index}
                  data-aos="zoom-in-up"
                  data-aos-delay={450 + index * 100}
                >
                  <span className="benefit-icon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="benefit-text">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Column */}
          <div className="col-lg-5" data-aos="fade-left" data-aos-delay="300">
            <div className="welcome-image-wrapper">
              <div className="image-frame-glow" aria-hidden="true"></div>
              <div className="welcome-image-box">
                <img 
                  src="/images/mechanic-car.jpg" 
                  alt="Mechanic working on car" 
                  className="welcome-img"
                />
                <div 
                  className="experience-badge" 
                  data-aos="fade-up" 
                  data-aos-delay="600" 
                  data-aos-anchor-placement="top-bottom"
                >
                  <span className="exp-number">15+</span>
                  <span className="exp-text">Years of Excellence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
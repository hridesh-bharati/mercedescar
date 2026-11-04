// src/components/home/Welcome.jsx
'use client';

import Image from 'next/image';
import './Welcome.css';

export default function Welcome() {
  const benefits = [
    'Free Annual Mercedes Safety Analysis',
    'Free Mercedes Car Wash',
    'Complimentary AMG Upgrades',
    '15% Discount on All Painting',
  ];

  return (
    <section className="welcome-section" id="welcome">
      {/* Ambient Lighting & Pattern */}
      <div className="welcome-pattern" aria-hidden="true"></div>
      <div className="welcome-glow-orb welcome-glow-orb--red" aria-hidden="true"></div>
      <div className="welcome-glow-orb welcome-glow-orb--blue" aria-hidden="true"></div>
      <div className="welcome-glow-orb welcome-glow-orb--pink" aria-hidden="true"></div>

      <div className="container welcome-container">
        <div className="row align-items-center g-5">

          {/* Left Text Column */}
          <div className="col-lg-7">
            {/* Badge */}
            <div className="welcome-badge" data-anim="down" data-anim-delay="100">
              <span className="welcome-badge-dash"></span>
              <span className="welcome-badge-text">ABOUT OUR MERCEDES WORKSHOP</span>
            </div>

            {/* Heading */}
            <h2 className="welcome-heading" data-anim="right" data-anim-delay="200">
              Welcome To{' '}
              <span className="welcome-heading-accent">
                Mercedes Garage Dubai
              </span>
            </h2>

            {/* Paragraph */}
            <p className="welcome-paragraph" data-anim="up" data-anim-delay="300">
              Mercedes Garage Dubai provides specialist Mercedes-Benz repair,
              maintenance and diagnostics at our workshop in Al Quoz. From
              routine Mercedes servicing to advanced engine and transmission
              repair, our certified technicians ensure your Mercedes receives
              the care it deserves — keeping you safely on the road across Dubai.
            </p>

            {/* Subheading */}
            <h3 className="welcome-subheading" data-anim="up" data-anim-delay="400">
              Enjoy Exclusive Mercedes Membership Benefits
            </h3>

            {/* Benefits Grid (Staggered animation) */}
            <div className="welcome-benefits-grid">
              {benefits.map((benefit, index) => (
                <div
                  className="welcome-benefit-card"
                  key={index}
                  data-anim="up"
                  data-anim-delay={450 + index * 100}
                >
                  <span className="benefit-icon" aria-hidden="true">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="benefit-text">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Column */}
          <div className="col-lg-5" data-anim="left" data-anim-delay="300">
            <div className="welcome-image-wrapper">
              <div className="image-frame-glow" aria-hidden="true"></div>
              <div className="welcome-image-box">
                <Image
                  src="/images/mechanic-car.avif"
                  alt="Certified Mercedes-Benz mechanic servicing a car at our Al Quoz Dubai workshop"
                  width={600}
                  height={700}
                  sizes="(max-width: 991px) 100vw, 40vw"
                  className="welcome-img"
                  loading="lazy"
                />
                <div
                  className="experience-badge"
                  data-anim="up"
                  data-anim-delay="600"
                >
                  <span className="exp-number">15+</span>
                  <span className="exp-text">Years of Mercedes Excellence</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './TeamPage.css';

// Reusable SVG icons to keep code DRY
const SocialIcons = {
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
  twitter: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 4.94c-.81.36-1.68.6-2.59.71a4.53 4.53 0 0 0 1.98-2.5c-.87.52-1.84.9-2.87 1.1a4.5 4.5 0 0 0-7.67 4.1A12.78 12.78 0 0 1 2.56 3.7a4.5 4.5 0 0 0 1.4 6.01 4.47 4.47 0 0 1-2.04-.57v.06a4.5 4.5 0 0 0 3.61 4.41c-.66.18-1.36.2-2.03.07a4.5 4.5 0 0 0 4.2 3.13A9.04 9.04 0 0 1 1 19.48a12.75 12.75 0 0 0 6.92 2.03c8.3 0 12.84-6.88 12.84-12.84l-.02-.59A9.18 9.18 0 0 0 23 4.94z" />
    </svg>
  ),
  facebook: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>
  ),
};

const teamMembers = [
  { name: 'Esther Howard', role: 'Engine Specialist', image: '/images/team/team-1.png', variant: 'blue' },
  { name: 'Leslie Alexander', role: 'Diagnostics Expert', image: '/images/team/team-2.png', variant: 'orange' },
  { name: 'Ralph Edwards', role: 'Bodywork Specialist', image: '/images/team/team-3.png', variant: 'green' },
  { name: 'Kristin Watson', role: 'Transmission Expert', image: '/images/team/team-4.png', variant: 'purple' },
];

export default function TeamPage() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      once: true,
      offset: 40,
    });
  }, []);

  return (
    <>
      <Header />

      <main className="team-main-wrapper">
        {/* ============ HERO BANNER ============ */}
        <section className="team-hero">
          {/* Real mechanic workshop team background image */}
          <div className="team-hero-bg" aria-hidden="true"></div>
          <div className="team-hero-overlay" aria-hidden="true"></div>

          <div className="container team-hero-container">
            <div className="team-hero-content">
              <div className="team-hero-badge" data-aos="fade-down" data-aos-duration="600">
                <span className="team-hero-badge-dash"></span>
                <span>OUR TEAM</span>
              </div>

              <h1 className="team-hero-heading" data-aos="fade-up" data-aos-delay="80">
                Meet Our <span className="team-hero-accent">Expert Team</span>
              </h1>

              <nav className="team-hero-breadcrumb" aria-label="Breadcrumb" data-aos="fade-up" data-aos-delay="150">
                <a href="/">Home</a>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
                <span>Our Team</span>
              </nav>
            </div>
          </div>
        </section>

        {/* ============ TEAM SECTION ============ */}
        <section className="team-section" id="team">
          <div className="team-glow team-glow--blue" aria-hidden="true"></div>
          <div className="team-glow team-glow--pink" aria-hidden="true"></div>
          <div className="team-glow team-glow--purple" aria-hidden="true"></div>

          <div className="container team-container">
            
            {/* Section Header */}
            <div className="row justify-content-center text-center mb-5">
              <div className="col-lg-8">
                <div className="team-badge" data-aos="fade-down" data-aos-duration="600">
                  <span className="team-badge-dash"></span>
                  <span className="team-badge-text">OUR EXPERTS</span>
                </div>

                <h2 className="team-heading" data-aos="fade-up" data-aos-delay="80">
                  Meet Our Expert Auto Service Team:
                  <span className="team-heading-accent"> Dedicated, Skilled, Reliable.</span>
                </h2>

                <p className="team-subtext" data-aos="fade-up" data-aos-delay="150">
                  Our certified technicians bring years of hands-on experience and a passion for precision.
                  Every service is performed with absolute honesty, care, and attention to detail.
                </p>
              </div>
            </div>

            {/* Team Grid */}
            <div className="row g-4 justify-content-center">
              {teamMembers.map((member, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6"
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 90}
                >
                  <div className={`team-card team-card--${member.variant}`}>
                    <div className="team-card-image-wrap">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="team-card-image"
                        loading="lazy"
                      />
                      <div className="team-card-image-overlay" aria-hidden="true"></div>

                      <div className="team-card-social">
                        {['linkedin', 'twitter', 'facebook'].map((platform) => (
                          <a
                            key={platform}
                            href="#"
                            aria-label={`${member.name} on ${platform}`}
                            className="team-social-link"
                          >
                            {SocialIcons[platform]}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="team-card-body">
                      <h3 className="team-card-name">{member.name}</h3>
                      <p className="team-card-role">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
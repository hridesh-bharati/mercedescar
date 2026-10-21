'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Footer.css';

export default function Footer() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: false,
      offset: 60,
    });
  }, []);

  const quickLinks = [
    { label: 'Diagnostics & Repair', href: '/services' },
    { label: 'Engine & Performance', href: '/services' },
    { label: 'Body & Paintwork', href: '/services' },
    { label: 'Premium Maintenance', href: '/services' },
  ];

  const socials = [
    {
      label: 'Facebook',
      href: '#',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      label: 'Instagram',
      href: '#',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/971567888808?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20auto%20services.',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: '#',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.92 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      ),
    },
  ];

  const bottomLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Settings', href: '/cookies' },
  ];

  return (
    <footer className="footer-section">
      {/* Ambient background layers */}
      <div className="footer-pattern" aria-hidden="true"></div>
      <div className="footer-glow footer-glow-1" aria-hidden="true"></div>
      <div className="footer-glow footer-glow-2" aria-hidden="true"></div>

      <div className="container footer-container">
        {/* ============ Top: Brand + Newsletter ============ */}
        <div className="footer-top row align-items-center" data-aos="fade-up">
          <div className="col-lg-7 mb-4 mb-lg-0">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="footer-logo-mark">M</span>
                <div className="footer-logo-text">
                  <strong>Mercedes</strong>
                  <span>Garage Dubai</span>
                </div>
              </div>
              <p className="footer-tagline">
                Experience the art of automotive perfection. Premium diagnostics,
                maintenance, and repair services for your luxury vehicle in Dubai.
              </p>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="footer-newsletter">
              <h5 className="footer-newsletter-title">Stay in the loop</h5>
              <p className="footer-newsletter-sub">
                Service tips, exclusive offers &amp; updates — delivered monthly.
              </p>
              <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  aria-label="Email address"
                  required
                />
                <button type="submit" aria-label="Subscribe">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ============ Middle: 4 Column Grid ============ */}
        <div className="footer-grid row">
          {/* Col 1: About */}
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0 footer-col" data-aos="fade-up" data-aos-delay="0">
            <h6 className="footer-col-title">About</h6>
            <p className="footer-col-text">
              Dubai&apos;s trusted luxury vehicle specialists.
              Certified technicians, genuine parts, and absolute commitment to
              excellence.
            </p>
            <div className="footer-badges">
              <span className="footer-badge">Certified Workshop</span>
              <span className="footer-badge">OEM Parts</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0 footer-col" data-aos="fade-up" data-aos-delay="80">
            <h6 className="footer-col-title">Quick Links</h6>
            <ul className="footer-links">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="footer-link">
                    <span className="footer-link-dot" aria-hidden="true"></span>
                    <span>{link.label}</span>
                    <svg className="footer-link-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0 footer-col" data-aos="fade-up" data-aos-delay="160">
            <h6 className="footer-col-title">Get in Touch</h6>
            <ul className="footer-contact">
              <li>
                <span className="footer-contact-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span>Warehouse #32, Al Quoz 26th Street Industrial Area 2, Dubai, UAE</span>
              </li>
              <li>
                <span className="footer-contact-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <a href="tel:+971567888808" className="footer-contact-link">+971 56 788 8808</a>
              </li>
              <li>
                <span className="footer-contact-icon">
                  <svg width="16" height="16" viewBox="0 0 24 

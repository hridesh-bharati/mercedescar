// src/components/footer/Footer.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import { 
  Facebook, 
  Instagram, 
  MessageCircle, 
  Youtube, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  Clock 
} from 'lucide-react';
import 'aos/dist/aos.css';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: false,
      offset: 60,
    });
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus({ loading: true, success: false, error: null });

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({ loading: false, success: true, error: null });
        setEmail('');
      } else {
        setStatus({ loading: false, success: false, error: data.message || 'Failed to subscribe.' });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Network error. Please try again.' });
    }
  };

  const quickLinks = [
    { label: 'Diagnostics & Repair', href: '/services' },
    { label: 'Engine & Performance', href: '/services' },
    { label: 'Body & Paintwork', href: '/services' },
    { label: 'Premium Maintenance', href: '/services' },
  ];

  const socials = [
    { label: 'Facebook', href: '#', icon: <Facebook size={16} /> },
    { label: 'Instagram', href: '#', icon: <Instagram size={16} /> },
    { label: 'WhatsApp', href: 'https://wa.me/971567888808?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20auto%20services.', icon: <MessageCircle size={16} /> },
    { label: 'YouTube', href: '#', icon: <Youtube size={16} /> },
  ];

  const bottomLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Settings', href: '/cookies' },
  ];

  return (
    <footer className="footer-section">
      {/* Ambient background glows */}
      <div className="footer-glow footer-glow-1" aria-hidden="true"></div>
      <div className="footer-glow footer-glow-2" aria-hidden="true"></div>

      <div className="container py-5">
        {/* Top: Brand + Newsletter */}
        <div className="row align-items-center pb-5 mb-5 border-bottom border-secondary border-opacity-10" data-aos="fade-up">
          <div className="col-lg-7 mb-4 mb-lg-0">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="footer-logo-mark">M</div>
              <div className="d-flex flex-column lh-1">
                <span className="fs-4 fw-bold text-white tracking-tight">Mercedes</span>
                <span className="text-danger small fw-semibold text-uppercase mt-1" style={{ letterSpacing: '2.5px' }}>Garage Dubai</span>
              </div>
            </div>
            <p className="text-light opacity-75 small mb-0" style={{ maxWidth: '480px', lineHeight: '1.6' }}>
              Experience the art of automotive perfection. Premium diagnostics, maintenance, and repair services for your luxury vehicle in Dubai.
            </p>
          </div>

          <div className="col-lg-5">
            <div className="p-4 rounded-4 border border-white border-opacity-10 bg-white bg-opacity-5 backdrop-blur">
              <h6 className="text-white fw-bold mb-1">Stay in the loop</h6>
              <p className="text-light opacity-75 small mb-3">Service tips, exclusive offers &amp; updates — delivered monthly.</p>
              
              <form className="d-flex gap-2 p-1 rounded-3 bg-dark border border-white border-opacity-10" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  className="form-control form-control-sm bg-transparent border-0 text-white shadow-none ps-2"
                  placeholder="your@email.com"
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-danger btn-sm px-3 d-flex align-items-center justify-content-center shadow-sm" disabled={status.loading}>
                  {status.loading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    <ArrowRight size={16} />
                  )}
                </button>
              </form>

              {status.success && <p className="text-success small mt-2 mb-0">Thank you for subscribing!</p>}
              {status.error && <p className="text-danger small mt-2 mb-0">{status.error}</p>}
            </div>
          </div>
        </div>

        {/* Middle: 4 Column Grid */}
        <div className="row g-4 pb-5 mb-4 border-bottom border-secondary border-opacity-10">
          {/* Col 1: About */}
          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="0">
            <h6 className="text-white fw-bold text-uppercase small mb-3 pb-2 border-bottom border-danger border-2 d-inline-block" style={{ letterSpacing: '2px' }}>About</h6>
            <p className="text-light opacity-75 small mb-3" style={{ lineHeight: '1.6' }}>
              Dubai&apos;s trusted luxury vehicle specialists. Certified technicians, genuine parts, and absolute commitment to excellence.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 px-2 py-1 rounded-pill small fw-semibold">Certified Workshop</span>
              <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 px-2 py-1 rounded-pill small fw-semibold">OEM Parts</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="80">
            <h6 className="text-white fw-bold text-uppercase small mb-3 pb-2 border-bottom border-danger border-2 d-inline-block" style={{ letterSpacing: '2px' }}>Quick Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-light opacity-75 text-decoration-none small d-flex align-items-center gap-2 footer-link-item">
                    <span className="spinner-grow spinner-grow-sm text-danger opacity-50" style={{ width: '5px', height: '5px' }}></span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="160">
            <h6 className="text-white fw-bold text-uppercase small mb-3 pb-2 border-bottom border-danger border-2 d-inline-block" style={{ letterSpacing: '2px' }}>Get in Touch</h6>
            <ul className="list-unstyled d-flex flex-column gap-3 small mb-0 text-light opacity-75">
              <li className="d-flex align-items-start gap-2">
                <span className="text-danger mt-1 flex-shrink-0"><MapPin size={16} /></span>
                <span>Warehouse #32, Al Quoz 26th Street Industrial Area 2, Dubai, UAE</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <span className="text-danger flex-shrink-0"><Phone size={16} /></span>
                <a href="tel:+971567888808" className="text-light opacity-75 text-decoration-none">+971 56 788 8808</a>
              </li>
              <li className="d-flex align-items-center gap-2">
                <span className="text-danger flex-shrink-0"><Mail size={16} /></span>
                <a href="mailto:info@mercedesgaragedubai.com" className="text-light opacity-75 text-decoration-none">info@mercedesgaragedubai.com</a>
              </li>
              <li className="d-flex align-items-start gap-2">
                <span className="text-danger mt-1 flex-shrink-0"><Clock size={16} /></span>
                <span>Mon – Sat: 8:00 AM – 7:00 PM<br />Sunday: Closed</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Social + Hours */}
          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="240">
            <h6 className="text-white fw-bold text-uppercase small mb-3 pb-2 border-bottom border-danger border-2 d-inline-block" style={{ letterSpacing: '2px' }}>Follow Us</h6>
            <p className="text-light opacity-75 small mb-3">Connect with us for updates, maintenance tips, and special service packages.</p>
            
            <div className="d-flex gap-2 mb-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} className="btn btn-outline-secondary btn-sm rounded-3 text-white border-white border-opacity-10 bg-white bg-opacity-5 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="p-3 rounded-3 bg-danger bg-opacity-10 border border-danger border-opacity-25">
              <div className="small text-white fw-bold">Need Immediate Help?</div>
              <a href="https://wa.me/971567888808" target="_blank" rel="noopener noreferrer" className="text-danger text-decoration-none small fw-semibold">
                Chat on WhatsApp &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 pt-2">
          <p className="text-light opacity-50 small mb-0">
            &copy; {new Date().getFullYear()} Mercedes Garage Dubai. All rights reserved.
          </p>

          <ul className="list-unstyled d-flex gap-4 mb-0 small">
            {bottomLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-light opacity-50 text-decoration-none">{link.label}</Link>
              </li>
            ))}
          </ul>

          <p className="text-light opacity-50 small mb-0">
            Developed by:{' '}
            <a href="https://www.pixsymedia.com/" target="_blank" rel="noopener noreferrer" className="text-warning text-decoration-none">
              Pixsy Media
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
// src/components/layout/Footer.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import 'aos/dist/aos.css';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out',
      once: false,
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
    { label: 'Mercedes-Benz Diagnostics & Repair', href: '/services' },
    { label: 'Mercedes Engine & Performance', href: '/services' },
    { label: 'Mercedes Body Kits', href: '/mercedes-body-kits-dubai' },
    { label: 'Mercedes Facelift', href: '/mercedes-facelift-dubai' },
    { label: 'Mercedes Vehicle Upgrades', href: '/mercedes-vehicle-upgrades-dubai' },
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
      icon: <MessageCircle size={16} />
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
      <div className="container py-5">
        
        {/* Top Section: Brand + Newsletter */}
        <div className="row align-items-center pb-4 mb-4 border-bottom border-secondary border-opacity-25" data-aos="fade-up">
          <div className="col-lg-7 mb-4 mb-lg-0">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="footer-logo-mark">M</div>
              <div className="d-flex flex-column lh-1">
                <span className="fs-4 fw-bold text-white">Mercedes</span>
                <span className="text-danger small fw-bold text-uppercase mt-1" style={{ letterSpacing: '2px' }}>Garage Dubai</span>
              </div>
            </div>
            <p className="text-light opacity-75 small mb-0" style={{ maxWidth: '460px', lineHeight: '1.6' }}>
              Professional diagnostics, expert maintenance, and custom body upgrades for your luxury vehicle in Al Quoz, Dubai.
            </p>
          </div>

          <div className="col-lg-5">
            <div className="p-3 p-md-4 rounded-3 footer-card-bg border border-secondary border-opacity-25">
              <h6 className="text-white fw-bold mb-1">Stay Updated</h6>
              <p className="text-light opacity-75 small mb-3">Get exclusive offers and auto care tips in your inbox.</p>
              
              <form className="d-flex gap-2" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  className="form-control form-control-sm bg-dark text-white border-secondary shadow-none px-3"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-danger btn-sm px-3 fw-bold d-flex align-items-center gap-1" disabled={status.loading}>
                  {status.loading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    <><span>Join</span> <ArrowRight size={14} /></>
                  )}
                </button>
              </form>

              {status.success && <p className="text-success small mt-2 mb-0 fw-semibold">Thank you for subscribing!</p>}
              {status.error && <p className="text-danger small mt-2 mb-0 fw-semibold">{status.error}</p>}
            </div>
          </div>
        </div>

        {/* Middle Section: 4 Column Grid */}
        <div className="row g-4 pb-4 mb-4 border-bottom border-secondary border-opacity-25">
          
          {/* Col 1: About */}
          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="50">
            <h6 className="text-white fw-bold text-uppercase small mb-3 pb-2 border-bottom border-danger d-inline-block">About Us</h6>
            <p className="text-light opacity-75 small mb-3" style={{ lineHeight: '1.6' }}>
              Independent luxury automotive specialists delivering dealership-level precision with personal care.
            </p>
            <div className="d-flex gap-2">
              <span className="badge bg-danger bg-opacity-25 text-danger border border-danger border-opacity-50 px-2.5 py-1 small fw-bold">
                <ShieldCheck size={12} className="me-1" /> Certified
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <h6 className="text-white fw-bold text-uppercase small mb-3 pb-2 border-bottom border-danger d-inline-block">Quick Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-light opacity-75 text-decoration-none small d-flex align-items-center gap-2 footer-link">
                    <ChevronRight size={12} className="text-danger" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="150">
            <h6 className="text-white fw-bold text-uppercase small mb-3 pb-2 border-bottom border-danger d-inline-block">Contact Info</h6>
            <ul className="list-unstyled d-flex flex-column gap-2.5 small mb-0 text-light opacity-75">
              <li className="d-flex align-items-start gap-2">
                <MapPin size={15} className="text-danger mt-1 flex-shrink-0" />
                <span>Al Quoz Industrial Area 2, Dubai, UAE</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <Phone size={15} className="text-danger flex-shrink-0" />
                <a href="tel:+971567888808" className="text-light text-decoration-none">+971 56 788 8808</a>
              </li>
              <li className="d-flex align-items-center gap-2">
                <Mail size={15} className="text-danger flex-shrink-0" />
                <a href="mailto:info@mercedesgaragedubai.com" className="text-light text-decoration-none">info@mercedesgaragedubai.com</a>
              </li>
              <li className="d-flex align-items-start gap-2">
                <Clock size={15} className="text-danger mt-1 flex-shrink-0" />
                <span>Mon – Sat: 8:00 AM – 7:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Social & Help */}
          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <h6 className="text-white fw-bold text-uppercase small mb-3 pb-2 border-bottom border-danger d-inline-block">Connect</h6>
            <p className="text-light opacity-75 small mb-3">Follow our latest projects and car care tips.</p>
            
            <div className="d-flex gap-2 mb-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} className="footer-social-icon text-white rounded-2 d-flex align-items-center justify-content-center bg-dark border border-secondary" aria-label={s.label} target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px' }}>
                  {s.icon}
                </a>
              ))}
            </div>

            <a href="https://wa.me/971567888808" target="_blank" rel="noopener noreferrer" className="btn btn-outline-danger btn-sm w-100 fw-bold d-flex align-items-center justify-content-center gap-2">
              <MessageCircle size={15} /> WhatsApp Support
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 pt-1">
          <p className="text-light opacity-50 small mb-0">
            &copy; {new Date().getFullYear()} Mercedes Garage Dubai. All rights reserved.
          </p>

          <ul className="list-unstyled d-flex gap-3 mb-0 small">
            {bottomLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-light opacity-50 text-decoration-none">{link.label}</Link>
              </li>
            ))}
          </ul>

          <p className="text-light opacity-50 small mb-0">
            Developed by <a href="https://www.pixsymedia.com/" target="_blank" rel="noopener noreferrer" className="text-warning text-decoration-none fw-semibold">Pixsy Media</a>
          </p>
        </div>

      </div>
    </footer>
  );
}
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import './Header.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#contact', label: 'Contact' },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* ✅ py-2 on mobile, py-lg-3 on desktop — reduces mobile height */}
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top py-2 py-lg-3 mercedes-navbar">
        <div className="container">
          {/* Logo Section */}
          <Link href="/" className="navbar-brand d-flex align-items-center gap-3 text-decoration-none">
            <div className="d-flex align-items-center justify-content-center mercedes-logo-circle">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2v10" />
                <path d="M12 12l-8.5 5" />
                <path d="M12 12l8.5 5" />
              </svg>
            </div>
            <div className="d-flex flex-column lh-1">
              <span className="fw-bold fs-4 mercedes-brand-title">Mercedes</span>
              <span className="mercedes-brand-subtitle">Expert Service</span>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <ul className="mercedes-desktop-nav d-none d-lg-flex align-items-center gap-4 mx-auto mb-0">
            {navItems.map((item) => (
              <li key={item.href} className="nav-item">
                <Link href={item.href} className={`nav-link px-2 mercedes-nav-link ${item.href === '/' ? 'active' : ''}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="d-flex align-items-center gap-3">
            <a
              href="tel:+9719876543210"
              className="btn rounded-pill px-4 py-2 d-none d-lg-flex align-items-center gap-2 mercedes-cta-btn"
            >
              <span>📞</span>
              <span>+971 987 654 3210</span>
            </a>

            <button
              className="mercedes-menu-btn d-lg-none"
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              aria-expanded={isOpen}
            >
              <span className="mercedes-menu-line"></span>
              <span className="mercedes-menu-line"></span>
              <span className="mercedes-menu-line"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`mercedes-overlay ${isOpen ? 'show' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Offcanvas Sidebar */}
      <aside
        className={`mercedes-offcanvas ${isOpen ? 'open' : ''}`}
        aria-hidden={!isOpen}
      >
        <button
          className="mercedes-close-btn"
          onClick={closeMenu}
          aria-label="Close menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="mercedes-offcanvas-logo">
          <div className="d-flex align-items-center justify-content-center mercedes-logo-circle">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v10" />
              <path d="M12 12l-8.5 5" />
              <path d="M12 12l8.5 5" />
            </svg>
          </div>
          <div className="d-flex flex-column lh-1">
            <span className="fw-bold fs-5 mercedes-brand-title">Mercedes</span>
            <span className="mercedes-brand-subtitle">Expert Service</span>
          </div>
        </div>

        <ul className="mercedes-offcanvas-nav">
          {navItems.map((item, index) => (
            <li
              key={item.href}
              className="mercedes-offcanvas-item"
              style={{ '--delay': `${0.15 + index * 0.09}s` }}
            >
              <Link
                href={item.href}
                className="mercedes-offcanvas-link"
                onClick={closeMenu}
              >
                <span className="mercedes-link-number">0{index + 1}</span>
                <span className="mercedes-link-text">{item.label}</span>
                <svg
                  className="mercedes-link-arrow"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>

        <div
          className="mercedes-offcanvas-footer"
          style={{ '--delay': `${0.15 + navItems.length * 0.09}s` }}
        >
          <a
            href="tel:+9719876543210"
            className="btn w-100 rounded-pill px-4 py-3 d-flex align-items-center justify-content-center gap-2 mercedes-cta-btn"
          >
            <span>📞</span>
            <span>+971 987 654 3210</span>
          </a>
          <p className="mercedes-offcanvas-tagline">
            Premium Mercedes Service & Care
          </p>
        </div>
      </aside>
    </>
  );
}
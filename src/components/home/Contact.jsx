'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import './Contact.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

 

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3200);
  };

  const contactItems = [
    {
      label: 'Visit Us',
      value: 'Al Quoz Industrial Area 3, Dubai, UAE',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      label: 'Call / WhatsApp',
      value: '+971 4 123 4567',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      label: 'Email Us',
      value: 'support@mercedesgaragedubai.com',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      label: 'Working Hours',
      value: 'Mon – Sat · 9 AM – 8 PM',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="contact-pattern" aria-hidden="true"></div>
      <div className="contact-glow-1" aria-hidden="true"></div>
      <div className="contact-glow-2" aria-hidden="true"></div>

      <div className="contact-container">

        {/* ============ Header ============ */}
        <div className="contact-header">
          <div className="contact-badge" data-aos="fade-down">
            <span className="contact-badge-line"></span>
            <span className="contact-badge-text">GET IN TOUCH</span>
            <span className="contact-badge-line"></span>
          </div>

          <h2 className="contact-heading" data-aos="fade-up" data-aos-delay="100">
            Let&apos;s talk
            <span className="contact-heading-accent"> cars.</span>
          </h2>

          <p className="contact-lead" data-aos="fade-up" data-aos-delay="200">
            Talk to our master technicians or book directly. We reply within
            30 minutes, every working day.
          </p>
        </div>

        {/* ============ Split ============ */}
        <div className="contact-split">

          {/* ---------- LEFT: Info ---------- */}
          <aside className="contact-left">
            <ul className="contact-list">
              {contactItems.map((item, idx) => (
                <li
                  className="contact-list-item"
                  key={idx}
                  data-aos="fade-right"
                  data-aos-delay={idx * 80}
                >
                  <div className="contact-list-icon">{item.icon}</div>
                  <div className="contact-list-text">
                    <span className="contact-list-label">{item.label}</span>
                    <span className="contact-list-value">{item.value}</span>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href="https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-map-btn"
              data-aos="fade-right"
              data-aos-delay="320"
            >
              <span className="contact-map-btn-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
              </span>
              <span>Open in Google Maps</span>
              <svg className="contact-map-btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </aside>

          {/* ---------- RIGHT: Form ---------- */}
          <div className="contact-right" data-aos="fade-left" data-aos-delay="150">
            <div className="contact-form-wrap">
              <div className="contact-form-head">
                <div className="contact-form-head-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="contact-form-title">Quick Booking</h3>
                  <p className="contact-form-subtitle">
                    Average response: <strong>28 min</strong>
                  </p>
                </div>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-row">
                  <div className="contact-field">
                    <input type="text" id="cf-name" placeholder=" " required />
                    <label htmlFor="cf-name">Full Name</label>
                  </div>
                  <div className="contact-field">
                    <input type="tel" id="cf-phone" placeholder=" " required />
                    <label htmlFor="cf-phone">Phone</label>
                  </div>
                </div>

                <div className="contact-field">
                  <input type="email" id="cf-email" placeholder=" " required />
                  <label htmlFor="cf-email">Email Address</label>
                </div>

                <div className="contact-field contact-field-select">
                  <select id="cf-service" required defaultValue="">
                    <option value="" disabled hidden></option>
                    <option>Diagnostics &amp; Repair</option>
                    <option>Engine &amp; Performance</option>
                    <option>Body &amp; Paintwork</option>
                    <option>Periodic Maintenance</option>
                    <option>AMG / Custom Build</option>
                  </select>
                  <label htmlFor="cf-service">Service Type</label>
                </div>

                <div className="contact-field contact-field-textarea">
                  <textarea id="cf-msg" rows="3" placeholder=" "></textarea>
                  <label htmlFor="cf-msg">Tell us about your car…</label>
                </div>

                <button
                  type="submit"
                  className={`contact-submit ${submitted ? 'is-success' : ''}`}
                  disabled={submitted}
                >
                  <span className="contact-submit-text">
                    {submitted ? 'Request Sent!' : 'Book My Service'}
                  </span>
                  <span className="contact-submit-icon" aria-hidden="true">
                    {submitted ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    )}
                  </span>
                </button>

                <p className="contact-form-note">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  100% secure. No spam, ever.
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
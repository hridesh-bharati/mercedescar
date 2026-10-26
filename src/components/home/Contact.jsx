'use client';

import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Aapka WhatsApp Number (Country code ke sath, bina + ya space ke)
  const whatsappNumber = '971567888808'; 

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Form se data uthana
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const service = formData.get('service');
    const message = formData.get('message');

    // WhatsApp ke liye message format karna (Line breaks ke liye %0A use hota hai)
    const waMessage = 
      `*New Service Request* 🚗%0A%0A` +
      `*Name:* ${name}%0A` +
      `*Phone:* ${phone}%0A` +
      `*Email:* ${email}%0A` +
      `*Service:* ${service}%0A` +
      `*Message:* ${message || 'N/A'}`;

    // WhatsApp URL banana
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${waMessage}`;

    // WhatsApp ko naye tab mein open karna
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3500);
    }, 800); // Thoda delay taaki loading animation dikh sake
  };

  const contactItems = [
    {
      label: 'Visit Our Facility',
      value: 'Al Quoz Industrial Area 3, Dubai, UAE',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      label: 'Call Us Anytime',
      value: '+971 56 788 8808',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      label: 'Email Inquiries',
      value: 'support@mercedesgaragedubai.com',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      label: 'Operating Hours',
      value: 'Mon – Sat · 9:00 AM – 8:00 PM',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];

  return (
    <section className="contact-section py-5" id="contact">
      <div className="contact-pattern" aria-hidden="true"></div>
      <div className="contact-glow-1" aria-hidden="true"></div>
      <div className="contact-glow-2" aria-hidden="true"></div>

      <div className="container position-relative z-1 py-md-5">
        
        {/* Header Section */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-8" data-aos="fade-up">
            <div className="contact-badge mb-3">
              <span className="contact-badge-dot"></span>
              <span className="contact-badge-text">CONCIERGE &amp; BOOKINGS</span>
            </div>
            <h2 className="contact-heading mb-3">
              Precision care for
              <span className="contact-heading-accent"> your vehicle.</span>
            </h2>
            <p className="contact-lead mb-0">
              Connect with our factory-trained specialists. Guaranteed response within 30 minutes during standard operations.
            </p>
          </div>
        </div>

        {/* Split Content Layout */}
        <div className="row g-4 g-lg-5 align-items-stretch">
          
          {/* Left Side: Information & Map CTA */}
          <div className="col-lg-5" data-aos="fade-right">
            <div className="d-flex flex-column h-100 gap-3">
              <ul className="list-unstyled m-0 d-flex flex-column gap-3">
                {contactItems.map((item, idx) => (
                  <li
                    className="contact-list-item d-flex align-items-center gap-3 p-3 bg-white rounded-4 border"
                    key={idx}
                    data-aos="fade-right"
                    data-aos-delay={idx * 60}
                  >
                    <div className="contact-list-icon flex-shrink-0 rounded-3 d-flex align-items-center justify-content-center">
                      {item.icon}
                    </div>
                    <div className="d-flex flex-column">
                      <span className="contact-list-label text-uppercase fw-bold text-muted mb-1">{item.label}</span>
                      <span className="contact-list-value fw-semibold text-dark">{item.value}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href="https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-map-btn d-flex align-items-center justify-content-between p-3 rounded-4 text-decoration-none mt-auto"
              >
                <div className="d-flex align-items-center gap-3">
                  <span className="contact-map-btn-icon rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="3 11 22 2 13 21 11 13 3 11" />
                    </svg>
                  </span>
                  <div>
                    <span className="contact-map-title text-light d-block fw-bold">Navigate to Workshop</span>
                    <span className="contact-map-sub d-block text-light small">Open interactive Google Maps</span>
                  </div>
                </div>
                <svg className="contact-map-btn-arrow d-none d-sm-block" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side: Interactive Booking Form */}
          <div className="col-lg-7" data-aos="fade-left">
            <div className="contact-form-wrap bg-white rounded-4 border p-4 p-md-5 h-100 shadow-sm">
              <div className="contact-form-head d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
                <div className="contact-form-head-icon flex-shrink-0 rounded-3 d-flex align-items-center justify-content-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="contact-form-title h5 mb-1">Instant Service Request</h3>
                  <div className="contact-status-indicator d-flex align-items-center gap-2">
                    <span className="live-dot"></span>
                    <p className="contact-form-subtitle mb-0 small text-muted">Specialists online · Avg reply <strong>18 mins</strong></p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="form-floating">
                      <input type="text" name="name" className="form-control contact-input" id="cf-name" placeholder="Full Name" required />
                      <label htmlFor="cf-name">Full Name</label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-floating">
                      <input type="tel" name="phone" className="form-control contact-input" id="cf-phone" placeholder="Phone Number" required />
                      <label htmlFor="cf-phone">Phone Number</label>
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <div className="form-floating">
                      <input type="email" name="email" className="form-control contact-input" id="cf-email" placeholder="Email Address" required />
                      <label htmlFor="cf-email">Email Address</label>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-floating">
                      <select name="service" className="form-select contact-input" id="cf-service" required defaultValue="">
                        <option value="" disabled hidden></option>
                        <option>Diagnostics &amp; Electronic Repair</option>
                        <option>Engine Optimization &amp; Performance</option>
                        <option>Exotic Body &amp; Custom Paintwork</option>
                        <option>Scheduled Periodic Maintenance</option>
                        <option>AMG Performance &amp; Upgrades</option>
                      </select>
                      <label htmlFor="cf-service">Select Required Service</label>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-floating">
                      <textarea name="message" className="form-control contact-input" id="cf-msg" placeholder="Leave a message here" style={{ height: '120px' }}></textarea>
                      <label htmlFor="cf-msg">Vehicle model &amp; specific requirements…</label>
                    </div>
                  </div>

                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      className={`contact-submit btn w-100 d-flex align-items-center justify-content-between px-4 py-3 rounded-3 ${submitted ? 'is-success' : ''}`}
                      disabled={isSubmitting || submitted}
                    >
                      <span className="contact-submit-text">
                        {isSubmitting ? 'Redirecting to WhatsApp...' : submitted ? 'Opening WhatsApp!' : 'Book Appointment'}
                      </span>
                      <span className="contact-submit-icon rounded-2 d-flex align-items-center justify-content-center" aria-hidden="true">
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
                  </div>

                  <div className="col-12 text-center mt-3">
                    <span className="security-badge d-inline-flex align-items-center gap-2 text-muted small">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      Secure WhatsApp Booking
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
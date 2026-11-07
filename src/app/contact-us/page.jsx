// src/app/contact/page.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { dbService } from '@/services/dbService';
import './ContactUs.css';

export default function ContactUs() {
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    loading: false,
  });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'General Diagnosis',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitted: false, loading: true });

    const payload = {
      ...formData,
      type: 'Contact Inquiry',
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      timestamp: Date.now(),
    };

    const res = await dbService.create('bookings', payload);

    if (res.success) {
      setFormStatus({ submitted: true, loading: false });
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: 'General Diagnosis',
        message: '',
      });
    } else {
      alert('Failed to submit inquiry. Please try again.');
      setFormStatus({ submitted: false, loading: false });
    }
  };

  return (
    <>
      <Header />

      <main className="contact-main">
        {/* ============ HERO BANNER ============ */}
        <section className="contact-hero text-white position-relative">
          <div className="contact-hero-bg"></div>
          <div className="contact-hero-overlay"></div>
          <div className="container position-relative z-2 py-4">
            <div className="row">
              <div className="col-lg-7 text-start" data-anim="up">
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-dark bg-opacity-50 border border-light border-opacity-25 mb-2">
                  <span
                    style={{
                      width: '20px',
                      height: '2px',
                      background: '#D6241D',
                      display: 'inline-block',
                    }}
                  ></span>
                  <span className="small fw-bold tracking-wider text-danger">
                    GET IN TOUCH
                  </span>
                </div>
                <h1 className="display-5 fw-bold mb-2">
                  Contact Mercedes Garage Dubai
                  <span className="text-danger d-block fs-5 mt-2">
                    Specialist Workshop in Al Quoz
                  </span>
                </h1>
                <nav aria-label="Breadcrumb">
                  <ol className="breadcrumb mb-0 bg-dark bg-opacity-50 px-3 py-1 rounded-pill d-inline-flex align-items-center border border-light border-opacity-10 small">
                    <li className="breadcrumb-item">
                      <Link
                        href="/"
                        className="text-danger text-decoration-none fw-semibold"
                      >
                        Home
                      </Link>
                    </li>
                    <li
                      className="breadcrumb-item active text-light fw-semibold"
                      aria-current="page"
                    >
                      Contact Us
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* ============ MAIN CONTACT SECTION ============ */}
        <section className="contact-section py-4 py-md-5 position-relative overflow-hidden">
          <div className="contact-glow contact-glow-blue"></div>
          <div className="contact-glow contact-glow-pink"></div>

          <div className="container position-relative z-2">
            {/* Top Cards Info Grid */}
            <div className="row g-4 mb-4">
              {/* Phone Card */}
              <div
                className="col-md-4"
                data-anim="up"
                data-anim-delay="100"
              >
                <div className="card border-0 glass-card p-3 p-md-4 text-start h-100">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="icon-box bg-danger bg-opacity-10 text-danger p-2 rounded-circle flex-shrink-0">
                      <Phone size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h2
                        className="text-muted text-uppercase small fw-bold mb-0"
                        style={{ fontSize: '0.7rem' }}
                      >
                        Call Us Anytime
                      </h2>
                      <a
                        href="tel:+971567888808"
                        className="fw-bold mb-0 text-dark d-block text-decoration-none"
                        aria-label="Call Mercedes Garage Dubai at plus 971 56 788 8808"
                      >
                        +971 56 788 8808
                      </a>
                    </div>
                  </div>
                  <p
                    className="text-secondary small mb-0 ps-5"
                    style={{ fontSize: '0.8rem' }}
                  >
                    Mon - Sat: 9:00 AM - 8:00 PM
                  </p>
                </div>
              </div>

              {/* Email Card */}
              <div
                className="col-md-4"
                data-anim="up"
                data-anim-delay="200"
              >
                <div className="card border-0 glass-card p-3 p-md-4 text-start h-100">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="icon-box bg-primary bg-opacity-10 text-primary p-2 rounded-circle flex-shrink-0">
                      <Mail size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h2
                        className="text-muted text-uppercase small fw-bold mb-0"
                        style={{ fontSize: '0.7rem' }}
                      >
                        Email Support
                      </h2>
                      <a
                        href="mailto:info@mercedesgaragedubai.com"
                        className="fw-bold mb-0 text-dark d-block text-decoration-none text-break fs-6"
                      >
                        info@mercedesgaragedubai.com
                      </a>
                    </div>
                  </div>
                  <p
                    className="text-secondary small mb-0 ps-5"
                    style={{ fontSize: '0.8rem' }}
                  >
                    Response within 2 hours
                  </p>
                </div>
              </div>

              {/* WhatsApp Quick Chat Card */}
              <div
                className="col-md-4"
                data-anim="up"
                data-anim-delay="300"
              >
                <div className="card border-0 glass-card p-3 p-md-4 text-start bg-success bg-opacity-10 border-success border-opacity-25 h-100">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="icon-box bg-success text-white p-2 rounded-circle shadow-sm flex-shrink-0">
                      <MessageCircle size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h2
                        className="text-success text-uppercase small fw-bold mb-0"
                        style={{ fontSize: '0.7rem' }}
                      >
                        Direct WhatsApp
                      </h2>
                      <a
                        href="https://wa.me/971567888808?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20Mercedes%20services."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fw-bold mb-0 text-dark d-block text-decoration-none"
                        aria-label="Chat on WhatsApp with Mercedes Garage Dubai"
                      >
                        +971 56 788 8808
                      </a>
                    </div>
                  </div>
                  <div className="ps-5">
                    <a
                      href="https://wa.me/971567888808?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20Mercedes%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success btn-sm w-100 rounded-pill fw-bold py-1 px-2 shadow-sm d-flex align-items-center justify-content-center gap-2 small"
                    >
                      <MessageCircle size={14} aria-hidden="true" /> Chat on
                      WhatsApp Now
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form and Map Grid */}
            <div className="row g-4 text-start">
              {/* Contact Form */}
              <div
                className="col-lg-7"
                data-anim="right"
                data-anim-delay="200"
              >
                <div className="card border-0 glass-card p-4 p-md-4 shadow-sm text-start h-100">
                  <div className="mb-3">
                    <span className="text-danger fw-bold small text-uppercase tracking-wider">
                      Send a Message
                    </span>
                    <h2 className="fw-bold text-dark mt-1 mb-1 fs-4">
                      Book a Mercedes Appointment
                    </h2>
                    <p className="text-secondary small mb-0">
                      Fill out the form below and our coordinators will get
                      back to you promptly.
                    </p>
                  </div>

                  {formStatus.submitted && (
                    <div
                      className="alert alert-success d-flex align-items-center gap-2 border-0 shadow-sm rounded-4 mb-3 py-2 small"
                      role="alert"
                      aria-live="polite"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-success flex-shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <strong>Thank you!</strong> Your inquiry has been
                        submitted and sent to our admin panel successfully.
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="row g-3" noValidate>
                    <div className="col-md-6">
                      <label
                        htmlFor="contact-name"
                        className="form-label small fw-bold text-secondary mb-1"
                      >
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        className="form-control rounded-pill px-3 py-2 bg-white bg-opacity-75 border-light-subtle shadow-none small"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        autoComplete="name"
                      />
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="contact-phone"
                        className="form-label small fw-bold text-secondary mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        className="form-control rounded-pill px-3 py-2 bg-white bg-opacity-75 border-light-subtle shadow-none small"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+971 50 123 4567"
                        required
                        autoComplete="tel"
                      />
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="contact-email"
                        className="form-label small fw-bold text-secondary mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        className="form-control rounded-pill px-3 py-2 bg-white bg-opacity-75 border-light-subtle shadow-none small"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        autoComplete="email"
                      />
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="contact-service"
                        className="form-label small fw-bold text-secondary mb-1"
                      >
                        Select Service
                      </label>
                      <select
                        id="contact-service"
                        className="form-select rounded-pill px-3 py-2 bg-white bg-opacity-75 border-light-subtle shadow-none small"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                      >
                        <option value="General Diagnosis">
                          General Diagnosis
                        </option>
                        <option value="Engine Repair">
                          Engine Repair &amp; Tune-up
                        </option>
                        <option value="Transmission Service">
                          Transmission Service
                        </option>
                        <option value="Bodywork & Paint">
                          Bodywork &amp; Paint
                        </option>
                        <option value="AMG Body Kit">AMG Body Kit</option>
                        <option value="Facelift Conversion">
                          Facelift Conversion
                        </option>
                        <option value="Periodic Maintenance">
                          Periodic Maintenance
                        </option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label
                        htmlFor="contact-message"
                        className="form-label small fw-bold text-secondary mb-1"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="contact-message"
                        className="form-control rounded-4 p-3 bg-white bg-opacity-75 border-light-subtle shadow-none small"
                        rows="3"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your Mercedes issue..."
                        required
                      ></textarea>
                    </div>

                    <div className="col-12 mt-3">
                      <button
                        type="submit"
                        className="btn btn-danger w-100 rounded-pill fw-bold py-2 shadow-sm d-flex align-items-center justify-content-center gap-2"
                        disabled={formStatus.loading}
                      >
                        {formStatus.loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Sending to Admin...
                          </>
                        ) : (
                          <>
                            <Send size={16} aria-hidden="true" /> Send Message
                            Now
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Location & Map Sidebar */}
              <div
                className="col-lg-5"
                data-anim="left"
                data-anim-delay="200"
              >
                <div className="card border-0 glass-card p-4 h-100 shadow-sm d-flex flex-column text-start">
                  <div className="mb-3">
                    <div className="d-flex align-items-center gap-3 mb-2">
                      <div className="bg-danger bg-opacity-10 text-danger p-2 rounded-circle flex-shrink-0">
                        <MapPin size={20} aria-hidden="true" />
                      </div>
                      <div>
                        <h2 className="fw-bold text-dark mb-0 fs-6">
                          Visit Our Mercedes Workshop
                        </h2>
                        <p
                          className="text-secondary small mb-0"
                          style={{ fontSize: '0.75rem' }}
                        >
                          State-of-the-art facility in Al Quoz, Dubai
                        </p>
                      </div>
                    </div>

                    <p
                      className="text-secondary small mb-3 ps-5"
                      style={{ fontSize: '0.85rem' }}
                    >
                      Warehouse #S2, Al Quoz 20C Street, Industrial Area 2,
                      Dubai, UAE
                    </p>

                    <div className="d-flex align-items-start gap-3 mb-3">
                      <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-circle flex-shrink-0">
                        <Clock size={16} aria-hidden="true" />
                      </div>
                      <div>
                        <h2
                          className="fw-bold text-dark small mb-0"
                          style={{ fontSize: '0.8rem' }}
                        >
                          Working Hours
                        </h2>
                        <p
                          className="text-secondary small mb-0"
                          style={{ fontSize: '0.75rem' }}
                        >
                          Mon – Sat: 9:00 AM – 8:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Responsive Google Maps Embed */}
                  <div
                    className="rounded-4 overflow-hidden shadow-sm border border-light flex-grow-1"
                    style={{ minHeight: '180px' }}
                  >
                    <iframe
                      title="Mercedes Garage Dubai Workshop Location Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.5493731742868!2d55.2228169!3d25.117111100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6996da821b49%3A0xd48eaed50255ad5b!2sGerman%20Auto%20Expert!5e0!3m2!1sen!2sin!4v1791133966961!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
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


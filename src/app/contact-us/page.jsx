'use client';

import { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  CheckCircle2 
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './ContactUs.css';

export default function ContactUs() {
  const [formStatus, setFormStatus] = useState({ submitted: false, loading: false });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'General Diagnosis',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitted: false, loading: true });
    
    // Simulate API submission
    setTimeout(() => {
      setFormStatus({ submitted: true, loading: false });
      setFormData({ name: '', phone: '', email: '', service: 'General Diagnosis', message: '' });
    }, 1200);
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
              <div className="col-lg-7 text-start">
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-dark bg-opacity-50 border border-light border-opacity-25 mb-2">
                  <span style={{ width: '20px', height: '2px', background: '#D6241D', display: 'inline-block' }}></span>
                  <span className="small fw-bold tracking-wider text-danger">GET IN TOUCH</span>
                </div>
                <h1 className="display-5 fw-bold mb-2">
                  Contact Our <span className="text-danger">Experts</span>
                </h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0 bg-dark bg-opacity-50 px-3 py-1 rounded-pill d-inline-flex align-items-center border border-light border-opacity-10 small">
                    <li className="breadcrumb-item"><a href="/" className="text-danger text-decoration-none fw-semibold">Home</a></li>
                    <li className="breadcrumb-item active text-light fw-semibold" aria-current="page">Contact Us</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* ============ MAIN CONTACT SECTION ============ */}
        <section className="contact-section py-4 py-md-5 position-relative overflow-hidden">
          {/* Ambient Glow Effects */}
          <div className="contact-glow contact-glow-blue"></div>
          <div className="contact-glow contact-glow-pink"></div>

          <div className="container position-relative z-2">
            
            {/* Top Cards Info Grid (Left Aligned) */}
            <div className="row g-4 mb-4">
              
              {/* Phone Card */}
              <div className="col-md-4">
                <div className="card border-0 glass-card p-3 p-md-4 text-start">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="icon-box bg-danger bg-opacity-10 text-danger p-2 rounded-circle flex-shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h6 className="text-muted text-uppercase small fw-bold mb-0" style={{ fontSize: '0.7rem' }}>Call Us Anytime</h6>
                      <h6 className="fw-bold mb-0 text-dark">+971 56 788 8808</h6>
                    </div>
                  </div>
                  <p className="text-secondary small mb-0 ps-5" style={{ fontSize: '0.8rem' }}>Mon - Sat: 8:00 AM - 7:00 PM</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="col-md-4">
                <div className="card border-0 glass-card p-3 p-md-4 text-start">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="icon-box bg-primary bg-opacity-10 text-primary p-2 rounded-circle flex-shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h6 className="text-muted text-uppercase small fw-bold mb-0" style={{ fontSize: '0.7rem' }}>Email Support</h6>
                      <h6 className="fw-bold mb-0 text-dark text-break fs-6">info@mercedesgaragedubai.com</h6>
                    </div>
                  </div>
                  <p className="text-secondary small mb-0 ps-5" style={{ fontSize: '0.8rem' }}>Response within 2 hours</p>
                </div>
              </div>

              {/* WhatsApp Quick Chat Card */}
              <div className="col-md-4">
                <div className="card border-0 glass-card p-3 p-md-4 text-start bg-success bg-opacity-10 border-success border-opacity-25">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="icon-box bg-success text-white p-2 rounded-circle shadow-sm flex-shrink-0">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <h6 className="text-success text-uppercase small fw-bold mb-0" style={{ fontSize: '0.7rem' }}>Direct WhatsApp</h6>
                      <h6 className="fw-bold mb-0 text-dark">+971 56 788 8808</h6>
                    </div>
                  </div>
                  <div className="ps-5">
                    <a 
                      href="https://wa.me/971567888808?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20auto%20services." 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-success btn-sm w-100 rounded-pill fw-bold py-1 px-2 shadow-sm d-flex align-items-center justify-content-center gap-2 small"
                    >
                      <MessageCircle size={14} /> Chat on WhatsApp Now
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Form and Map Grid */}
            <div className="row g-4 text-start">
              
              {/* Contact Form */}
              <div className="col-lg-7">
                <div className="card border-0 glass-card p-4 p-md-4 shadow-sm text-start">
                  <div className="mb-3">
                    <span className="text-danger fw-bold small text-uppercase tracking-wider">Send a Message</span>
                    <h4 className="fw-bold text-dark mt-1 mb-1">Book an Appointment</h4>
                    <p className="text-secondary small mb-0">Fill out the form below and our coordinators will get back to you promptly.</p>
                  </div>

                  {formStatus.submitted && (
                    <div className="alert alert-success d-flex align-items-center gap-2 border-0 shadow-sm rounded-4 mb-3 py-2 small" role="alert">
                      <CheckCircle2 size={18} className="text-success flex-shrink-0" />
                      <div>
                        <strong>Thank you!</strong> Your message has been sent successfully.
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-secondary mb-1">Your Name</label>
                      <input 
                        type="text" 
                        className="form-control rounded-pill px-3 py-2 bg-white bg-opacity-75 border-light-subtle shadow-none small" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe" 
                        required 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-secondary mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        className="form-control rounded-pill px-3 py-2 bg-white bg-opacity-75 border-light-subtle shadow-none small" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+971 50 123 4567" 
                        required 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-secondary mb-1">Email Address</label>
                      <input 
                        type="email" 
                        className="form-control rounded-pill px-3 py-2 bg-white bg-opacity-75 border-light-subtle shadow-none small" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com" 
                        required 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-secondary mb-1">Select Service</label>
                      <select 
                        className="form-select rounded-pill px-3 py-2 bg-white bg-opacity-75 border-light-subtle shadow-none small"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                      >
                        <option value="General Diagnosis">General Diagnosis</option>
                        <option value="Engine Repair">Engine Repair & Tune-up</option>
                        <option value="Transmission Service">Transmission Service</option>
                        <option value="Bodywork & Paint">Bodywork & Paint</option>
                        <option value="Periodic Maintenance">Periodic Maintenance</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-bold text-secondary mb-1">Your Message</label>
                      <textarea 
                        className="form-control rounded-4 p-3 bg-white bg-opacity-75 border-light-subtle shadow-none small" 
                        rows="3" 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your vehicle issue..."
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
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={16} /> Send Message Now
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Location & Map Sidebar */}
              <div className="col-lg-5">
                <div className="card border-0 glass-card p-4 h-100 shadow-sm d-flex flex-column text-start">
                  <div className="mb-3">
                    <div className="d-flex align-items-center gap-3 mb-2">
                      <div className="bg-danger bg-opacity-10 text-danger p-2 rounded-circle flex-shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h6 className="fw-bold text-dark mb-0">Visit Our Workshop</h6>
                        <p className="text-secondary small mb-0" style={{ fontSize: '0.75rem' }}>State-of-the-art facility in Dubai</p>
                      </div>
                    </div>

                    <p className="text-secondary small mb-3 ps-5" style={{ fontSize: '0.85rem' }}>
                      Warehouse #32, Al Quoz 26th Street Industrial Area 2, Dubai, UAE
                    </p>

                    <div className="d-flex align-items-start gap-3 mb-3">
                      <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-circle flex-shrink-0">
                        <Clock size={16} />
                      </div>
                      <div>
                        <h6 className="fw-bold text-dark small mb-0" style={{ fontSize: '0.8rem' }}>Working Hours</h6>
                        <p className="text-secondary small mb-0" style={{ fontSize: '0.75rem' }}>Mon – Sat: 8:00 AM – 7:00 PM<br />Sunday: Closed</p>
                      </div>
                    </div>
                  </div>

                  {/* Responsive Google Maps Embed */}
                  <div className="rounded-4 overflow-hidden shadow-sm border border-light flex-grow-1" style={{ minHeight: '180px' }}>
                    <iframe
                      title="Workshop Location Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.367852643503!2d55.2345!3d25.1325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMjXCsDA3JzU3LjAiTiA1NcKwMTQnMDQuMiJF!5e0!3m2!1sen!2sae!4v1650000000000!5m2!1sen!2sae"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
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
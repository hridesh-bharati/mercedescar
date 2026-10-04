'use client';

import { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  ChevronRight 
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
        <section className="contact-hero py-5 text-white position-relative">
          <div className="contact-hero-bg"></div>
          <div className="contact-hero-overlay"></div>
          <div className="container position-relative z-2 py-4">
            <div className="row">
              <div className="col-lg-7">
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-dark bg-opacity-50 border border-light border-opacity-25 mb-3">
                  <span style={{ width: '20px', height: '2px', background: '#D6241D', display: 'inline-block' }}></span>
                  <span className="small fw-bold tracking-wider text-danger">GET IN TOUCH</span>
                </div>
                <h1 className="display-4 fw-bold mb-3">
                  Contact Our <span className="text-danger">Experts</span>
                </h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0 bg-dark bg-opacity-50 px-3 py-2 rounded-pill d-inline-flex align-items-center border border-light border-opacity-10">
                    <li className="breadcrumb-item"><a href="/" className="text-danger text-decoration-none fw-semibold">Home</a></li>
                    <li className="breadcrumb-item active text-light fw-semibold" aria-current="page">Contact Us</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* ============ MAIN CONTACT SECTION ============ */}
        <section className="contact-section py-5 position-relative">
          {/* Ambient Glow Effects */}
          <div className="contact-glow contact-glow-blue"></div>
          <div className="contact-glow contact-glow-pink"></div>

          <div className="container position-relative z-2">
            
            {/* Top Cards Info Grid */}
            <div className="row g-4 mb-5">
              
              {/* Phone Card */}
              <div className="col-md-4">
                <div className="card h-100 border-0 glass-card p-4 text-center text-md-start">
                  <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-3">
                    <div className="icon-box bg-danger bg-opacity-10 text-danger p-3 rounded-circle">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h6 className="text-muted text-uppercase small fw-bold mb-0">Call Us Anytime</h6>
                      <h5 className="fw-bold mb-0 text-dark">+971 56 788 8808</h5>
                    </div>
                  </div>
                  <p className="text-secondary small mb-0">Mon - Sat: 8:00 AM - 7:00 PM. Instant support for emergencies.</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="col-md-4">
                <div className="card h-100 border-0 glass-card p-4 text-center text-md-start">
                  <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-3">
                    <div className="icon-box bg-primary bg-opacity-10 text-primary p-3 rounded-circle">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h6 className="text-muted text-uppercase small fw-bold mb-0">Email Support</h6>
                      <h5 className="fw-bold mb-0 text-dark text-break fs-6">info@mercedesgaragedubai.com</h5>
                    </div>
                  </div>
                  <p className="text-secondary small mb-0">Send us your queries and get a response within 2 hours.</p>
                </div>
              </div>

              {/* WhatsApp Quick Chat Card */}
              <div className="col-md-4">
                <div className="card h-100 border-0 glass-card p-4 text-center text-md-start bg-success bg-opacity-10 border-success border-opacity-25">
                  <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-3">
                    <div className="icon-box bg-success text-white p-3 rounded-circle shadow-sm">
                      <MessageCircle size={24} />
                    </div>
                    <div>
                      <h6 className="text-success text-uppercase small fw-bold mb-0">Direct WhatsApp</h6>
                      <h5 className="fw-bold mb-0 text-dark">+971 56 788 8808</h5>
                    </div>
                  </div>
                  <a 
                    href="https://wa.me/971567888808?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20auto%20services." 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-success btn-sm w-100 rounded-pill fw-bold py-2 shadow-sm d-flex align-items-center justify-content-center gap-2"
                  >
                    <MessageCircle size={16} /> Chat on WhatsApp Now
                  </a>
                </div>
              </div>

            </div>

            {/* Form and Map Grid */}
            <div className="row g-4 align-items-stretch">
              
              {/* Contact Form */}
              <div className="col-lg-7">
                <div className="card border-0 glass-card p-4 p-md-5 h-100 shadow-sm">
                  <div className="mb-4">
                    <span className="text-danger fw-bold small text-uppercase tracking-wider">Send a Message</span>
                    <h3 className="fw-bold text-dark mt-1">Book an Appointment or Ask a Question</h3>
                    <p className="text-secondary small">Fill out the form below and our service coordinators will get back to you promptly.</p>
                  </div>

                  {formStatus.submitted && (
                    <div className="alert alert-success d-flex align-items-center gap-3 border-0 shadow-sm rounded-4 mb-4" role="alert">
                      <CheckCircle2 size={24} className="text-success flex-shrink-0" />
                      <div>
                        <strong>Thank you!</strong> Your message has been sent successfully. We will contact you shortly.
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-secondary">Your Name</label>
                      <input 
                        type="text" 
                        className="form-control rounded-pill px-3 py-2 bg-white bg-opacity-75 border-light-subtle shadow-none" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe" 
                        required 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-secondary">Phone Number</label>
                      <input 
                        type="tel" 
                        className="form-control rounded-pill px-3 py-2 bg-white bg-opacity-75 border-light-subtle shadow-none" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+971 50 123 4567" 
                        required 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-secondary">Email Address</label>
                      <input 
                        type="email" 
                        className="form-control rounded-pill px-3 py-2 bg-white bg-opacity-75 border-light-subtle shadow-none" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com" 
                        required 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-secondary">Select Service</label>
                      <select 
                        className="form-select rounded-pill px-3 py-2 bg-white bg-opacity-75 border-light-subtle shadow-none"
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
                      <label className="form-label small fw-bold text-secondary">Your Message / Requirements</label>
                      <textarea 
                        className="form-control rounded-4 p-3 bg-white bg-opacity-75 border-light-subtle shadow-none" 
                        rows="4" 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your vehicle issue or service requirements..."
                        required
                      ></textarea>
                    </div>

                    <div className="col-12 mt-4">
                      <button 
                        type="submit" 
                        className="btn btn-danger btn-lg w-100 rounded-pill fw-bold py-3 shadow d-flex align-items-center justify-content-center gap-2"
                        disabled={formStatus.loading}
                      >
                        {formStatus.loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} /> Send Message Now
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Location & Map Sidebar */}
              <div className="col-lg-5">
                <div className="card border-0 glass-card p-4 h-100 d-flex flex-column justify-content-between shadow-sm">
                  <div>
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="bg-danger bg-opacity-10 text-danger p-3 rounded-circle">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h5 className="fw-bold text-dark mb-0">Visit Our Workshop</h5>
                        <p className="text-secondary small mb-0">State-of-the-art facility in Dubai</p>
                      </div>
                    </div>

                    <p className="text-secondary small mb-4">
                      Warehouse #32, Al Quoz 26th Street Industrial Area 2, Dubai, UAE
                    </p>

                    <div className="d-flex align-items-start gap-3 mb-4">
                      <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-circle mt-1">
                        <Clock size={18} />
                      </div>
                      <div>
                        <h6 className="fw-bold text-dark small mb-1">Working Hours</h6>
                        <p className="text-secondary small mb-0">Monday – Saturday: 8:00 AM – 7:00 PM<br />Sunday: Closed</p>
                      </div>
                    </div>
                  </div>

                  {/* Responsive Google Maps Embed */}
                  <div className="rounded-4 overflow-hidden shadow-sm border border-light flex-grow-1" style={{ minHeight: '220px' }}>
                    <iframe
                      title="Workshop Location Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.367852643503!2d55.2345!3d25.1325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDA3JzU3LjAiTiA1NcKwMTQnMDQuMiJF!5e0!3m2!1sen!2sae!4v1650000000000!5m2!1sen!2sae"
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
// src/app/car-class/[className]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Wrench, ShieldCheck, Cpu, Phone, Mail, MapPin, 
  CheckCircle2, ArrowRight, Disc, Settings, Wind, Shield, AlertTriangle, Sparkles 
} from 'lucide-react';
import { dbService } from '@/services/dbService';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import 'aos/dist/aos.css';
import AOS from 'aos';

export default function CarClassDynamicPage() {
  const params = useParams();
  const rawSlug = params?.className || 'g-class';
  const isAll = rawSlug.toLowerCase() === 'all';
  const classNameFormatted = isAll ? 'All Mercedes Models' : rawSlug.replace(/-/g, ' ').toUpperCase();

  const [activeTab, setActiveTab] = useState('overview');
  const [modelData, setModelData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Backend Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    serviceType: 'Routine Servicing',
    preferredDate: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    async function fetchModelDetails() {
      setLoading(true);
      if (!isAll) {
        const res = await dbService.getAll('car_models');
        if (res.success && res.data) {
          const found = res.data.find(
            item => item.modelName?.toLowerCase().replace(/\s+/g, '-') === rawSlug.toLowerCase() ||
                    item.id?.toLowerCase() === rawSlug.toLowerCase()
          );
          if (found) {
            setModelData(found);
          }
        }
      }
      setLoading(false);
    }
    fetchModelDetails();
  }, [rawSlug, isAll]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg('');

    const payload = {
      ...bookingForm,
      carClass: classNameFormatted,
      createdAt: new Date().toISOString(),
      status: 'Pending'
    };

    const res = await dbService.add('service_bookings', payload);
    if (res.success) {
      setSuccessMsg('Appointment booked successfully! Our workshop technician will call you shortly.');
      setBookingForm({ name: '', phone: '', serviceType: 'Routine Servicing', preferredDate: '', notes: '' });
    } else {
      setSuccessMsg('Failed to submit appointment. Please call us directly.');
    }
    setSubmitting(false);
  };

  const servicesList = [
    { title: 'Routine Servicing', desc: `Keep your ${classNameFormatted} in perfect condition.`, icon: <Wrench size={24} className="text-danger" /> },
    { title: 'Engine Diagnostics', desc: 'Advanced scanning & error code analysis.', icon: <Cpu size={24} className="text-danger" /> },
    { title: 'Brake Service', desc: 'Safe braking, maximum control.', icon: <Disc size={24} className="text-danger" /> },
    { title: 'Suspension & Steering', desc: 'Smooth ride, precise handling.', icon: <Settings size={24} className="text-danger" /> },
    { title: 'Electrical & AC Service', desc: 'Stay cool & connected on every drive.', icon: <Wind size={24} className="text-danger" /> },
    { title: 'Transmission Repair', desc: 'Smooth gear shifts, better performance.', icon: <AlertTriangle size={24} className="text-danger" /> },
    { title: 'Body & Paint Work', desc: 'Restore the original luxury look.', icon: <Shield size={24} className="text-danger" /> },
    { title: 'Genuine Parts', desc: '100% authentic Mercedes-Benz parts.', icon: <ShieldCheck size={24} className="text-danger" /> },
  ];

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-white">
          <div className="spinner-border text-danger" role="status"></div>
          <span className="ms-2 fw-bold text-dark">Loading {classNameFormatted} Details...</span>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="bg-light pb-5">
        
        {/* ============ HERO SECTION ============ */}
        <section className="position-relative text-white py-5 overflow-hidden" style={{ background: '#0a0a0a', minHeight: '420px' }}>
          <div className="position-absolute top-0 start-0 w-100 h-100 opacity-50" style={{ pointerEvents: 'none' }}>
            <img 
              src={modelData?.imageUrl || '/images/car-class.avif'} 
              alt={`${classNameFormatted} Repair Dubai`} 
              className="w-100 h-100 object-fit-cover" 
            />
          </div>
          <div className="container position-relative py-4" style={{ zIndex: 2 }}>
            <nav aria-label="breadcrumb" data-aos="fade-down">
              <ol className="breadcrumb mb-3 small text-white-50">
                <li className="breadcrumb-item"><Link href="/" className="text-white text-decoration-none">Home</Link></li>
                <li className="breadcrumb-item"><Link href="/models" className="text-white text-decoration-none">Pages</Link></li>
                <li className="breadcrumb-item active text-danger fw-bold" aria-current="page">{classNameFormatted}</li>
              </ol>
            </nav>

            <div className="row align-items-center">
              <div className="col-12 col-lg-8" data-aos="fade-up">
                <span className="text-danger fw-bold small text-uppercase tracking-widest d-block mb-1">
                  Mercedes-Benz Service Al Quoz
                </span>
                <h1 className="display-3 fw-bold mb-3 text-white">{classNameFormatted}</h1>
                <p className="fs-5 fw-semibold text-white mb-2">Expert Service & Repair for Your Mercedes {classNameFormatted}</p>
                <p className="text-white-50 mb-0" style={{ maxWidth: '650px', lineHeight: '1.7' }}>
                  {modelData?.desc || `Your ${classNameFormatted} deserves the absolute best care. We provide specialized factory-grade servicing, diagnostics, and genuine repairs in Dubai.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ TAB NAVIGATION BAR ============ */}
        <div className="bg-white border-bottom sticky-top shadow-sm" style={{ top: '80px', zIndex: 10 }}>
          <div className="container">
            <ul className="nav py-3 gap-4 border-0">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'services', label: 'Our Services' },
                { id: 'why-choose-us', label: 'Why Choose Us' },
                { id: 'faqs', label: 'FAQs' },
              ].map((tab) => (
                <li className="nav-item" key={tab.id}>
                  <button 
                    className={`btn btn-link text-decoration-none p-0 fw-bold small text-uppercase position-relative pb-1 ${activeTab === tab.id ? 'text-danger' : 'text-dark'}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="position-absolute bottom-0 start-0 w-100 bg-danger" style={{ height: '3px', borderRadius: '2px' }}></span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ============ MAIN CONTENT & SIDEBAR ============ */}
        <div className="container py-5">
          <div className="row g-5">
            
            {/* LEFT COLUMN */}
            <div className="col-12 col-lg-8">
              
              {activeTab === 'overview' && (
                <div data-aos="fade-up">
                  <div className="bg-white rounded-4 p-4 p-md-5 shadow-sm border mb-5">
                    <h2 className="fw-bold text-danger mb-4">About Mercedes {classNameFormatted}</h2>
                    <p className="text-secondary mb-4" style={{ lineHeight: '1.8' }}>
                      The Mercedes-Benz {classNameFormatted} stands as a pinnacle of power, luxury, and precise engineering. Whether navigating city roads or tackling rough terrains, our specialized workshop in Al Quoz, Dubai ensures your vehicle runs at ultimate performance.
                    </p>
                    <div className="rounded-4 overflow-hidden shadow-sm" style={{ height: '340px' }}>
                      <img src="/images/car-class.avif" alt={`${classNameFormatted} maintenance workshop Dubai`} className="w-100 h-100 object-fit-cover" />
                    </div>
                  </div>

                  <div className="mb-5">
                    <h3 className="fw-bold text-danger mb-4">Our {classNameFormatted} Services</h3>
                    <div className="row g-4">
                      {servicesList.map((srv, idx) => (
                        <div className="col-12 col-md-6" key={idx} data-aos="fade-up" data-aos-delay={idx * 40}>
                          <div className="bg-white p-4 rounded-4 shadow-sm border h-100 d-flex flex-column align-items-center text-center">
                            <div className="bg-danger bg-opacity-10 p-3 rounded-circle mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                              {srv.icon}
                            </div>
                            <h5 className="fw-bold text-dark mb-2 fs-6">{srv.title}</h5>
                            <p className="text-muted small mb-0">{srv.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'services' && (
                <div className="bg-white rounded-4 p-4 p-md-5 shadow-sm border" data-aos="fade-up">
                  <h3 className="fw-bold text-dark mb-4">Comprehensive Workshop Services</h3>
                  <div className="list-group list-group-flush gap-3">
                    {servicesList.map((s, i) => (
                      <div key={i} className="list-group-item border rounded-4 p-4 d-flex align-items-center justify-content-between bg-light">
                        <div className="d-flex align-items-center gap-3">
                          <div className="bg-danger text-white p-3 rounded-3">{s.icon}</div>
                          <div>
                            <h5 className="fw-bold text-dark mb-1">{s.title}</h5>
                            <p className="text-muted small mb-0">{s.desc}</p>
                          </div>
                        </div>
                        <a href="#booking-form" className="btn btn-dark btn-sm rounded-pill px-3">Book Service</a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'why-choose-us' && (
                <div className="bg-white rounded-4 p-4 p-md-5 shadow-sm border" data-aos="fade-up">
                  <h3 className="fw-bold text-dark mb-4">Why Choose Our {classNameFormatted} Workshop?</h3>
                  <p className="text-muted mb-4">We combine factory-trained technical mastery with genuine OEM parts to deliver dealership-level precision without the heavy markup.</p>
                  <div className="row g-4">
                    <div className="col-12 col-md-6">
                      <div className="p-4 bg-light rounded-4 h-100 border">
                        <h5 className="fw-bold text-dark mb-2">Certified Technicians</h5>
                        <p className="text-muted small mb-0">Specialized training in Mercedes electronics, engine tuning, and transmission systems.</p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="p-4 bg-light rounded-4 h-100 border">
                        <h5 className="fw-bold text-dark mb-2">Advanced Diagnostics</h5>
                        <p className="text-muted small mb-0">Equipped with official Mercedes Xentry diagnostic scanners for error-free troubleshooting.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'faqs' && (
                <div className="bg-white rounded-4 p-4 p-md-5 shadow-sm border" data-aos="fade-up">
                  <h3 className="fw-bold text-dark mb-4">Frequently Asked Questions</h3>
                  <div className="accordion" id="faqAccordion">
                    <div className="accordion-item border rounded-4 mb-3 overflow-hidden">
                      <h2 className="accordion-header">
                        <button className="accordion-button fw-bold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                          How long does a routine service take for a {classNameFormatted}?
                        </button>
                      </h2>
                      <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                        <div className="accordion-body text-muted small">
                          A standard routine service typically takes between 2 to 3 hours, depending on additional inspections or filter replacements.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT COLUMN: Booking & Info Sidebar (Clean White Background, No Solid Black) */}
            <div className="col-12 col-lg-4" id="booking-form">
              <div className="sticky-top d-flex flex-column gap-4" style={{ top: '130px' }}>
                
                {/* 1. Book Your Service Card (Clean Professional White/Light Look) */}
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white border">
                  <h4 className="fw-bold mb-2 fs-5 text-danger">Book Your Service</h4>
                  <p className="text-muted small mb-4">Get expert care for your Mercedes {classNameFormatted} from our certified technicians.</p>

                  {successMsg && (
                    <div className="alert alert-success small py-2 rounded-3 mb-3">
                      {successMsg}
                    </div>
                  )}

                  <form onSubmit={handleBookingSubmit} className="d-flex flex-column gap-3">
                    <div>
                      <input 
                        type="text" 
                        required 
                        className="form-control rounded-3 bg-light text-dark border py-2.5 small shadow-none"
                        placeholder="Your Name"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        required 
                        className="form-control rounded-3 bg-light text-dark border py-2.5 small shadow-none"
                        placeholder="Phone Number"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <select 
                        className="form-select rounded-3 bg-light text-dark border py-2.5 small shadow-none"
                        value={bookingForm.serviceType}
                        onChange={(e) => setBookingForm({...bookingForm, serviceType: e.target.value})}
                      >
                        <option value="Routine Servicing">Routine Servicing</option>
                        <option value="Engine Diagnostics">Engine Diagnostics</option>
                        <option value="Brake Service">Brake Service</option>
                        <option value="AC & Electrical">AC & Electrical</option>
                      </select>
                    </div>
                    <div>
                      <input 
                        type="date" 
                        required 
                        className="form-control rounded-3 bg-light text-dark border py-2.5 small shadow-none"
                        value={bookingForm.preferredDate}
                        onChange={(e) => setBookingForm({...bookingForm, preferredDate: e.target.value})}
                      />
                    </div>

                    <button type="submit" disabled={submitting} className="btn btn-danger w-100 rounded-pill py-2.5 fw-bold shadow-sm mt-1">
                      {submitting ? 'Booking...' : 'Book an Appointment →'}
                    </button>
                  </form>

                  <div className="mt-4 pt-4 border-top d-flex flex-column gap-2.5 small text-muted">
                    <div className="d-flex align-items-center gap-2">
                      <Phone size={14} className="text-danger" />
                      <span>+971 56 788 8808</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Mail size={14} className="text-danger" />
                      <span>info@mercedesgaragedubai.com</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <MapPin size={14} className="text-danger" />
                      <span>Al Quoz, Dubai, UAE</span>
                    </div>
                  </div>
                </div>

                {/* 2. Mercedes-Benz Standard Checklist Card */}
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white border">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="text-dark fw-bold fs-6">Mercedes-Benz</span>
                  </div>
                  <ul className="list-unstyled d-flex flex-column gap-2.5 small text-secondary mb-0">
                    <li className="d-flex align-items-center gap-2"><CheckCircle2 size={16} className="text-success" /> Certified Technicians</li>
                    <li className="d-flex align-items-center gap-2"><CheckCircle2 size={16} className="text-success" /> Genuine Mercedes Parts</li>
                    <li className="d-flex align-items-center gap-2"><CheckCircle2 size={16} className="text-success" /> Advanced Diagnostic Tools</li>
                    <li className="d-flex align-items-center gap-2"><CheckCircle2 size={16} className="text-success" /> Transparent Pricing</li>
                    <li className="d-flex align-items-center gap-2"><CheckCircle2 size={16} className="text-success" /> Quick Turnaround Time</li>
                  </ul>
                </div>

                {/* 3. Keep Your Car at Its Best Banner Card */}
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-dark text-white position-relative overflow-hidden">
                  <h5 className="fw-bold mb-1 fs-6">Keep Your {classNameFormatted} at Its Best</h5>
                  <p className="text-white-50 small mb-3">Luxury. Power. Performance.</p>
                  <Link href="/contact-us" className="btn btn-danger btn-sm rounded-pill px-4 fw-bold d-inline-flex align-items-center gap-1 shadow-sm" style={{ width: 'fit-content' }}>
                    Contact Us <ArrowRight size={14} />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ============ BOTTOM TRUST STRIP ============ */}
        <section className="bg-dark text-white py-4 mt-5 border-top border-secondary border-opacity-25">
          <div className="container">
            <div className="row text-center text-md-start align-items-center g-4">
              <div className="col-12 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start gap-3">
                <ShieldCheck size={28} className="text-danger" />
                <div>
                  <h6 className="fw-bold mb-0 small">Genuine Mercedes Parts</h6>
                  <span className="text-white-50" style={{ fontSize: '0.75rem' }}>100% Authentic</span>
                </div>
              </div>
              <div className="col-12 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start gap-3">
                <Wrench size={28} className="text-danger" />
                <div>
                  <h6 className="fw-bold mb-0 small">Expert Technicians</h6>
                  <span className="text-white-50" style={{ fontSize: '0.75rem' }}>Factory Trained</span>
                </div>
              </div>
              <div className="col-12 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start gap-3">
                <Cpu size={28} className="text-danger" />
                <div>
                  <h6 className="fw-bold mb-0 small">Advanced Diagnostics</h6>
                  <span className="text-white-50" style={{ fontSize: '0.75rem' }}>Latest Technology</span>
                </div>
              </div>
              <div className="col-12 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start gap-3">
                <Sparkles size={28} className="text-danger" />
                <div>
                  <h6 className="fw-bold mb-0 small">Trusted by 1000+ Customers</h6>
                  <span className="text-white-50" style={{ fontSize: '0.75rem' }}>In Dubai</span>
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
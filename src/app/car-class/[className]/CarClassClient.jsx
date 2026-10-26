// src/app/car-class/[className]/CarClassClient.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Wrench, ShieldCheck, Cpu, Phone, Mail, MapPin, Clock, Award, Users,
  CheckCircle2, ArrowRight, Disc, Settings, Wind, Shield, AlertTriangle,
  Sparkles, Car, Calendar, ChevronRight, Zap, HeartHandshake, Gauge
} from 'lucide-react';
import { dbService } from '@/services/dbService';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const slugify = (str = '') =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const getToday = () => new Date().toLocaleDateString('en-CA');

const SERVICES_LIST = [
  { title: 'Routine Servicing', desc: 'Comprehensive scheduled maintenance with genuine Mercedes-Benz fluids, filters, and factory-approved inspection checklists.', icon: Wrench },
  { title: 'Engine Diagnostics', desc: 'Advanced Xentry and Star Diagnosis scanning to pinpoint error codes, sensor faults, and performance issues with pinpoint accuracy.', icon: Cpu },
  { title: 'Brake Service', desc: 'Complete brake system care — pads, discs, fluid flushes, and ABS diagnostics — for confident stopping power on every drive.', icon: Disc },
  { title: 'Suspension & Steering', desc: 'Expert repair of AIRMATIC, ABC systems, control arms, and steering racks to restore the signature Mercedes ride comfort.', icon: Settings },
  { title: 'Electrical & AC Service', desc: 'Full electrical diagnostics, battery replacement, and climate control repair to keep your cabin cool and your electronics flawless.', icon: Wind },
  { title: 'Transmission Repair', desc: '7G-Tronic and 9G-Tronic transmission servicing, clutch replacement, and mechatronic repair for silky-smooth gear shifts.', icon: AlertTriangle },
  { title: 'Body & Paint Work', desc: 'Precision dent removal, panel repair, and OEM-color-matched painting to restore your Mercedes to showroom perfection.', icon: Shield },
  { title: 'Genuine Parts', desc: '100% authentic Mercedes-Benz OEM parts sourced from authorized suppliers — never third-party substitutes.', icon: ShieldCheck },
];

export default function CarClassClient({ initialData, initialList, slug }) {
  const isAll = slug?.toLowerCase() === 'all';
  const classNameFormatted = isAll ? 'All Mercedes Classes' : (initialData?.className || slug.replace(/-/g, ' ').toUpperCase());

  const [modelData, setModelData] = useState(initialData);
  const [allClasses, setAllClasses] = useState(initialList || []);
  const [loading, setLoading] = useState(!initialData && !isAll && !initialList);

  const [bookingForm, setBookingForm] = useState({
    name: '', phone: '', serviceType: 'Routine Servicing', preferredDate: '', notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ type: '', msg: '' });

  const today = getToday();

  useEffect(() => {
    if ((isAll && !initialList?.length) || (!isAll && !initialData)) {
      let active = true;
      (async () => {
        setLoading(true);
        const res = await dbService.getAll('car_classes');
        if (!active) return;
        if (res.success && res.data) {
          const dataList = Array.isArray(res.data)
            ? res.data
            : Object.keys(res.data).map(k => ({ id: k, ...res.data[k] }));

          if (isAll) {
            setAllClasses(dataList);
          } else {
            const found = dataList.find((item) =>
              slugify(item.className) === slug || item.slug === slug || item.id?.toLowerCase() === slug
            );
            setModelData(found || null);
          }
        }
        setLoading(false);
      })();
      return () => { active = false; };
    }
  }, [slug, isAll, initialData, initialList]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: '', msg: '' });

    if (bookingForm.phone.length < 8) {
      setAlert({ type: 'error', msg: 'Please enter a valid phone number (min 8 digits).' });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...bookingForm,
        carClass: classNameFormatted,
        createdAt: new Date().toISOString(),
        status: 'Pending',
      };
      const res = await dbService.create('service_bookings', payload);
      if (res.success) {
        setAlert({ type: 'success', msg: 'Appointment booked successfully! Our technician will call you shortly.' });
        setBookingForm({ name: '', phone: '', serviceType: 'Routine Servicing', preferredDate: '', notes: '' });
      } else {
        setAlert({ type: 'error', msg: 'Failed to submit. Please call us directly.' });
      }
    } catch (err) {
      setAlert({ type: 'error', msg: 'A network error occurred. Please try again or call us.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-white">
          <div className="spinner-border text-danger" role="status"></div>
          <span className="ms-2 fw-bold text-dark">Loading...</span>
        </div>
        <Footer />
      </>
    );
  }

  // ===================== ALL CLASSES VIEW =====================
  if (isAll) {
    return (
      <>
        <Header />
        <main className="bg-light pb-5 min-vh-100">
          <section className="position-relative text-white py-4 py-md-5" style={{ background: '#0a0a0a', minHeight: '320px' }}>
            <div className="container py-3 py-md-4 text-center">
              <span className="text-danger fw-bold small text-uppercase d-block mb-1">Mercedes-Benz Dubai</span>
              <h1 className="display-5 display-md-4 fw-bold mb-3 text-white">All Mercedes Car Classes Service in Dubai</h1>
              <p className="text-white-50 mx-auto" style={{ maxWidth: '640px', fontSize: '0.95rem' }}>
                Explore specialized workshop service divisions for every Mercedes-Benz luxury class — G-Class, S-Class, C-Class, AMG and more in Al Quoz, Dubai.
              </p>
            </div>
          </section>
          <div className="container py-4 py-md-5">
            {allClasses.length === 0 ? (
              <div className="text-center py-5 bg-white rounded-4 border p-4">
                <Car size={48} className="text-muted opacity-50 mb-3" />
                <h5 className="fw-bold text-dark">No Car Classes Found</h5>
              </div>
            ) : (
              <div className="row g-3 g-md-4">
                {allClasses.map((item, idx) => {
                  const urlSlug = item.slug || slugify(item.className);
                  const cardImg = item.imageUrl || item.imageUrls?.[0] || '/images/car-class.png';
                  return (
                    <div className="col-12 col-md-6 col-lg-4" key={item.id || idx}>
                      <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 bg-white">
                        <div style={{ height: '220px', position: 'relative' }} className="overflow-hidden bg-light">
                          <Image src={cardImg} alt={`Mercedes ${item.className} service Dubai`} fill className="object-fit-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                          <span className="position-absolute top-0 end-0 m-3 badge bg-dark px-3 py-2 rounded-pill small">Certified Care</span>
                        </div>
                        <div className="card-body p-3 p-md-4 d-flex flex-column">
                          <h2 className="fw-bold text-dark fs-5 fs-md-4 mb-2">{item.className}</h2>
                          <p className="text-muted small mb-3" style={{ lineHeight: '1.6' }}>{item.tagline || item.desc}</p>
                          <div className="d-flex flex-wrap gap-2 mt-auto pt-3">
                            <Link href={`/car-class/${urlSlug}`} className="btn btn-outline-dark btn-sm rounded-pill px-3 fw-bold">View Details <ArrowRight size={14} /></Link>
                            <Link href={`/car-class/${urlSlug}#booking-form`} className="btn btn-danger btn-sm rounded-pill px-3 fw-bold"><Calendar size={14} /> Book</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ===================== SINGLE CLASS VIEW =====================
  if (!modelData) {
    return (
      <>
        <Header />
        <main className="bg-light min-vh-100 d-flex align-items-center">
          <div className="container text-center py-5">
            <Car size={64} className="text-danger opacity-50 mb-4" />
            <h1 className="fw-bold text-dark mb-3">Mercedes Class Not Found</h1>
            <p className="text-muted mb-4">We couldn't find a service page for "{classNameFormatted}".</p>
            <Link href="/car-class/all" className="btn btn-danger rounded-pill px-4 fw-bold">View All Classes</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const heroImage = modelData.imageUrl || modelData.imageUrls?.[0] || '/images/car-class.png';
  const h1Text = modelData.h1 || `Mercedes ${classNameFormatted} Service and Repair in Dubai`;
  const introText = modelData.heroIntro || modelData.desc || `Professional Mercedes ${classNameFormatted} servicing in Dubai.`;
  const contentSections = modelData.contentSections || [];
  const faqs = modelData.faqs || [];
  const relatedModels = (modelData.relatedModels || []).filter(l => l.label && l.href);

  return (
    <>
      <Header />
      <main className="bg-light pb-5">
        {/* HERO */}
        <section className="position-relative text-white py-4 py-md-5 overflow-hidden d-flex align-items-center" style={{ background: '#0a0a0a', minHeight: 'auto', paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="position-absolute top-0 start-0 w-100 h-100 opacity-25 opacity-md-50" style={{ pointerEvents: 'none' }}>
            <Image src={heroImage} alt={`Mercedes ${classNameFormatted} at German Auto Expert workshop in Al Quoz Dubai`} fill className="object-fit-cover" priority sizes="100vw" />
          </div>
          <div className="container position-relative py-2 py-md-4" style={{ zIndex: 2 }}>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-3 mb-md-4 small text-white-50">
                <li className="breadcrumb-item"><Link href="/" className="text-white text-decoration-none">Home</Link></li>
                <li className="breadcrumb-item"><Link href="/car-class/all" className="text-white text-decoration-none">Car Classes</Link></li>
                <li className="breadcrumb-item active text-danger fw-bold">{classNameFormatted}</li>
              </ol>
            </nav>
            <div className="row align-items-center">
              <div className="col-12 col-lg-9">
                <span className="text-danger fw-bold small text-uppercase d-block mb-2">Mercedes-Benz Service Al Quoz, Dubai</span>
                <h1 className="display-5 display-md-4 display-lg-3 fw-bold mb-3 text-white" style={{ lineHeight: '1.2' }}>{h1Text}</h1>
                <p className="fs-6 fs-md-5 fw-semibold text-white mb-2">{modelData.tagline || `Expert Service & Repair for Your Mercedes ${classNameFormatted}`}</p>
                <p className="text-white-50 mb-4" style={{ maxWidth: '680px', lineHeight: '1.7', fontSize: '0.95rem' }}>{introText}</p>
                <a href="#booking-form" className="btn btn-danger btn-md btn-lg rounded-pill px-4 px-md-5 fw-bold shadow-sm d-inline-flex align-items-center gap-2">
                  <Calendar size={18} /> Book Your Service Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <div className="bg-white border-bottom shadow-sm py-3">
          <div className="container">
            <div className="row text-center text-md-start align-items-center g-3 g-md-4">
              <div className="col-6 col-md-3 d-flex flex-column flex-md-row align-items-center align-items-md-start gap-2">
                <Award size={22} className="text-danger mb-1 mb-md-0" />
                <div className="text-center text-md-start">
                  <div className="fw-bold small text-dark">Certified Techs</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Factory Trained</div>
                </div>
              </div>
              <div className="col-6 col-md-3 d-flex flex-column flex-md-row align-items-center align-items-md-start gap-2">
                <ShieldCheck size={22} className="text-danger mb-1 mb-md-0" />
                <div className="text-center text-md-start">
                  <div className="fw-bold small text-dark">Genuine Parts</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>100% OEM</div>
                </div>
              </div>
              <div className="col-6 col-md-3 d-flex flex-column flex-md-row align-items-center align-items-md-start gap-2">
                <Clock size={22} className="text-danger mb-1 mb-md-0" />
                <div className="text-center text-md-start">
                  <div className="fw-bold small text-dark">Fast Turnaround</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Same-Day Options</div>
                </div>
              </div>
              <div className="col-6 col-md-3 d-flex flex-column flex-md-row align-items-center align-items-md-start gap-2">
                <Users size={22} className="text-danger mb-1 mb-md-0" />
                <div className="text-center text-md-start">
                  <div className="fw-bold small text-dark">1000+ Clients</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Trusted in Dubai</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT + SIDEBAR */}
        <div className="container py-4 py-md-5">
          <div className="row g-4 g-lg-5">
            {/* LEFT COLUMN */}
            <div className="col-12 col-lg-8">
              {/* ABOUT */}
              <section className="bg-white rounded-4 p-3 p-md-4 p-lg-5 shadow-sm border mb-4" id="about">
                <span className="badge bg-danger bg-opacity-10 text-danger fw-bold mb-3">Overview</span>
                <h2 className="fw-bold text-dark mb-3 mb-md-4" style={{ fontSize: '1.5rem', lineHeight: '1.3' }}>About Mercedes {classNameFormatted} Service in Dubai</h2>
                {contentSections.length > 0 ? (
                  contentSections.map((sec, i) => (
                    <div key={i} className="mb-4">
                      <h3 className="fw-bold text-danger fs-5 mb-2">{sec.heading}</h3>
                      <p className="text-secondary mb-0" style={{ lineHeight: '1.8', fontSize: '0.95rem' }}>{sec.body}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-secondary" style={{ lineHeight: '1.8', fontSize: '0.95rem' }}>{modelData.desc}</p>
                )}
                <div className="rounded-4 overflow-hidden shadow-sm mt-4" style={{ height: 'clamp(220px, 40vw, 380px)', position: 'relative' }}>
                  <Image src={heroImage} alt={`Certified technicians servicing Mercedes ${classNameFormatted} in Dubai`} fill className="object-fit-cover" sizes="(max-width: 992px) 100vw, 800px" />
                </div>
              </section>

              {/* SERVICES */}
              <section className="bg-white rounded-4 p-3 p-md-4 p-lg-5 shadow-sm border mb-4" id="services">
                <span className="badge bg-danger bg-opacity-10 text-danger fw-bold mb-3">Services</span>
                <h2 className="fw-bold text-dark mb-3" style={{ fontSize: '1.5rem' }}>Complete {classNameFormatted} Services We Offer</h2>
                <p className="text-muted mb-4" style={{ lineHeight: '1.8', fontSize: '0.95rem' }}>From routine maintenance to complex engine repair, our certified technicians handle every aspect of {classNameFormatted} care with dealership-level precision.</p>
                <div className="row g-3">
                  {SERVICES_LIST.map((srv, idx) => {
                    const Icon = srv.icon;
                    return (
                      <div className="col-12 col-md-6" key={idx}>
                        <div className="border rounded-4 p-3 p-md-4 h-100 bg-light d-flex flex-column">
                          <div className="d-flex align-items-start gap-3 mb-2">
                            <div className="bg-danger text-white p-2 rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                              <Icon size={18} />
                            </div>
                            <h3 className="fw-bold text-dark fs-6 mb-0 pt-1">{srv.title}</h3>
                          </div>
                          <p className="text-muted small mb-3 mt-2" style={{ lineHeight: '1.7' }}>{srv.desc}</p>
                          <a href="#booking-form" className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold mt-auto align-self-start">Book This →</a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* WHY CHOOSE US */}
              <section className="bg-white rounded-4 p-3 p-md-4 p-lg-5 shadow-sm border mb-4" id="why-choose-us">
                <span className="badge bg-danger bg-opacity-10 text-danger fw-bold mb-3">Why Us</span>
                <h2 className="fw-bold text-dark mb-3" style={{ fontSize: '1.5rem' }}>Why Choose German Auto Expert for {classNameFormatted}?</h2>
                <p className="text-muted mb-4" style={{ lineHeight: '1.8', fontSize: '0.95rem' }}>We've built our reputation on three pillars: certified expertise, genuine parts, and transparent communication. Here's what makes us Dubai's trusted choice for Mercedes owners.</p>
                <div className="row g-3">
                  {[
                    { icon: Award, title: 'Factory-Trained Technicians', desc: 'Our team has 10+ years of specialized Mercedes experience and holds official certifications.' },
                    { icon: ShieldCheck, title: '100% Genuine Mercedes Parts', desc: 'Every component we fit is OEM-sourced — no third-party substitutes, ever.' },
                    { icon: Cpu, title: 'Advanced Diagnostic Equipment', desc: 'We use official Mercedes Xentry and Star Diagnosis scanners for precise error detection.' },
                    { icon: Gauge, title: 'Transparent Pricing', desc: 'Detailed quotes before any work begins. No hidden fees, no surprise charges.' },
                    { icon: HeartHandshake, title: 'Personal Service Advisor', desc: 'A dedicated advisor keeps you informed at every stage of your service.' },
                    { icon: Zap, title: 'Fast Turnaround', desc: 'Routine services often completed same-day. Express appointments available.' },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div className="col-12 col-md-6" key={idx}>
                        <div className="p-3 p-md-4 bg-light rounded-4 h-100 border">
                          <Icon size={24} className="text-danger mb-2" />
                          <h3 className="fw-bold text-dark fs-6 mb-2">{item.title}</h3>
                          <p className="text-muted small mb-0" style={{ lineHeight: '1.7' }}>{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* RELATED MODELS */}
              {relatedModels.length > 0 && (
                <section className="bg-white rounded-4 p-3 p-md-4 p-lg-5 shadow-sm border mb-4" id="related">
                  <span className="badge bg-danger bg-opacity-10 text-danger fw-bold mb-3">Related</span>
                  <h2 className="fw-bold text-dark mb-3" style={{ fontSize: '1.5rem' }}>Related Mercedes Services</h2>
                  <p className="text-muted mb-4" style={{ fontSize: '0.95rem' }}>Explore our specialized service pages for other Mercedes-Benz models.</p>
                  <div className="d-flex flex-wrap gap-2">
                    {relatedModels.map((l, i) => (
                      <Link key={i} href={l.href} className="btn btn-outline-dark btn-sm rounded-pill px-3 px-md-4 fw-bold d-inline-flex align-items-center gap-1 py-2">
                        {l.label} <ChevronRight size={14} />
                      </Link>
                    ))}
                    <Link href="/car-class/all" className="btn btn-danger btn-sm rounded-pill px-3 px-md-4 fw-bold d-inline-flex align-items-center gap-1 py-2">
                      View All Classes <ChevronRight size={14} />
                    </Link>
                  </div>
                </section>
              )}

              {/* FAQS */}
              <section className="bg-white rounded-4 p-3 p-md-4 p-lg-5 shadow-sm border mb-4" id="faqs">
                <span className="badge bg-danger bg-opacity-10 text-danger fw-bold mb-3">FAQs</span>
                <h2 className="fw-bold text-dark mb-4" style={{ fontSize: '1.5rem' }}>{classNameFormatted} Service — Frequently Asked Questions</h2>
                <div className="accordion" id="faqAccordion">
                  {(faqs.length > 0 ? faqs : [
                    { q: `How long does a routine service take for a ${classNameFormatted}?`, a: 'A standard routine service typically takes 2 to 3 hours depending on additional inspections or filter replacements.' },
                    { q: `Do you use genuine Mercedes ${classNameFormatted} parts?`, a: 'Yes — every part we fit is OEM-sourced from authorized Mercedes-Benz suppliers. No third-party substitutes.' },
                    { q: `How often should a ${classNameFormatted} be serviced?`, a: 'Mercedes recommends servicing every 10,000-15,000 km or once a year, whichever comes first.' },
                  ]).map((faq, i) => (
                    <div key={i} className="accordion-item border rounded-4 mb-3 overflow-hidden">
                      <h3 className="accordion-header" style={{ fontSize: '0.95rem' }}>
                        <button className={`accordion-button fw-bold shadow-none ${i === 0 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#faq${i}`}>
                          {faq.q}
                        </button>
                      </h3>
                      <div id={`faq${i}`} className={`accordion-collapse collapse ${i === 0 ? 'show' : ''}`} data-bs-parent="#faqAccordion">
                        <div className="accordion-body text-muted small" style={{ lineHeight: '1.7' }}>{faq.a}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* BOTTOM CTA */}
              <section className="bg-dark text-white rounded-4 p-4 p-md-5 shadow-sm mb-4">
                <div className="row align-items-center g-3 g-md-4 text-center text-md-start">
                  <div className="col-12 col-md-8">
                    <h2 className="fw-bold mb-2" style={{ fontSize: '1.4rem' }}>Ready to Book Your {classNameFormatted} Service?</h2>
                    <p className="text-white-50 mb-0 small">Contact our Al Quoz workshop today for a free consultation and transparent quote.</p>
                  </div>
                  <div className="col-12 col-md-4 text-md-end">
                    <a href="#booking-form" className="btn btn-danger rounded-pill px-4 fw-bold w-100 w-md-auto py-2">Book Now →</a>
                  </div>
                </div>
              </section>
            </div>

            {/* SIDEBAR */}
            <div className="col-12 col-lg-4" id="booking-form" style={{ scrollMarginTop: '80px' }}>
              <div className="sticky-top d-flex flex-column gap-4" style={{ top: '90px' }}>
                <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 bg-white border">
                  <h2 className="fw-bold mb-2 fs-5 text-danger">Book Your {classNameFormatted} Service</h2>
                  <p className="text-muted small mb-4">Expert care from certified Mercedes technicians in Al Quoz, Dubai.</p>
                  {alert.msg && (
                    <div className={`alert ${alert.type === 'error' ? 'alert-danger' : 'alert-success'} small py-2 rounded-3 mb-3`}>
                      {alert.msg}
                    </div>
                  )}
                  <form onSubmit={handleBookingSubmit} className="d-flex flex-column gap-3">
                    <div>
                      <label className="form-label small fw-bold">Your Name</label>
                      <input type="text" required className="form-control rounded-3 bg-light small shadow-none" placeholder="Full name" value={bookingForm.name} onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="form-label small fw-bold">Phone Number</label>
                      <input type="tel" required minLength={8} className="form-control rounded-3 bg-light small shadow-none" placeholder="+971 XX XXX XXXX" value={bookingForm.phone} onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })} />
                    </div>
                    <div>
                      <label className="form-label small fw-bold">Service Type</label>
                      <select className="form-select rounded-3 bg-light small shadow-none" value={bookingForm.serviceType} onChange={(e) => setBookingForm({ ...bookingForm, serviceType: e.target.value })}>
                        {SERVICES_LIST.map((s, i) => (
                          <option key={i} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="form-label small fw-bold">Preferred Date</label>
                      <input type="date" required min={today} className="form-control rounded-3 bg-light small shadow-none" value={bookingForm.preferredDate} onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })} />
                    </div>
                    <div>
                      <label className="form-label small fw-bold">Additional Notes (Optional)</label>
                      <textarea rows="2" className="form-control rounded-3 bg-light small shadow-none" placeholder="Any specific issues?" value={bookingForm.notes} onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}></textarea>
                    </div>
                    <button type="submit" disabled={submitting} className="btn btn-danger w-100 rounded-pill py-2.5 fw-bold shadow-sm mt-1">
                      {submitting ? 'Booking...' : 'Book Appointment →'}
                    </button>
                  </form>
                  <div className="mt-4 pt-4 border-top d-flex flex-column gap-2 small text-muted">
                    <div className="d-flex align-items-center gap-2"><Phone size={14} className="text-danger" /><span>+971 56 788 8808</span></div>
                    <div className="d-flex align-items-center gap-2"><Mail size={14} className="text-danger" /><span>info@mercedesgaragedubai.com</span></div>
                    <div className="d-flex align-items-center gap-2"><MapPin size={14} className="text-danger" /><span>Al Quoz, Dubai, UAE</span></div>
                  </div>
                </div>

                <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 bg-white border">
                  <h3 className="text-dark fw-bold fs-6 mb-3">Why Mercedes Owners Trust Us</h3>
                  <ul className="list-unstyled d-flex flex-column gap-2 small text-secondary mb-0">
                    <li className="d-flex align-items-center gap-2"><CheckCircle2 size={16} className="text-success" /> Certified Technicians</li>
                    <li className="d-flex align-items-center gap-2"><CheckCircle2 size={16} className="text-success" /> Genuine Mercedes Parts</li>
                    <li className="d-flex align-items-center gap-2"><CheckCircle2 size={16} className="text-success" /> Advanced Diagnostic Tools</li>
                    <li className="d-flex align-items-center gap-2"><CheckCircle2 size={16} className="text-success" /> Transparent Pricing</li>
                    <li className="d-flex align-items-center gap-2"><CheckCircle2 size={16} className="text-success" /> Quick Turnaround Time</li>
                  </ul>
                </div>

                <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 bg-white border">
                  <h3 className="text-dark fw-bold fs-6 mb-3">Quick Links</h3>
                  <ul className="list-unstyled small mb-0 d-flex flex-column gap-2">
                    <li><a href="#about" className="text-dark text-decoration-none d-flex align-items-center gap-1"><ChevronRight size={14} className="text-danger" /> About {classNameFormatted}</a></li>
                    <li><a href="#services" className="text-dark text-decoration-none d-flex align-items-center gap-1"><ChevronRight size={14} className="text-danger" /> Our Services</a></li>
                    <li><a href="#why-choose-us" className="text-dark text-decoration-none d-flex align-items-center gap-1"><ChevronRight size={14} className="text-danger" /> Why Choose Us</a></li>
                    <li><a href="#faqs" className="text-dark text-decoration-none d-flex align-items-center gap-1"><ChevronRight size={14} className="text-danger" /> FAQs</a></li>
                    <li><a href="#booking-form" className="text-dark text-decoration-none d-flex align-items-center gap-1"><ChevronRight size={14} className="text-danger" /> Book Now</a></li>
                  </ul>
                </div>

                <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 bg-danger text-white">
                  <h3 className="fw-bold mb-1 fs-6">Need Help Choosing?</h3>
                  <p className="text-white-50 small mb-3">Our advisors are here to help.</p>
                  <Link href="/contact-us" className="btn btn-light btn-sm rounded-pill px-4 fw-bold d-inline-flex align-items-center gap-1 text-danger" style={{ width: 'fit-content' }}>Contact Us <ArrowRight size={14} /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM TRUST STRIP (Colorful) */}
        <section className="py-4 py-md-5 mt-4 mt-md-5 bg-light border-top">
          <div className="container">
            <div className="row text-center text-md-start align-items-center g-3 g-md-4">
              <div className="col-12 col-md-3">
                <div className="d-flex align-items-center gap-3 p-3 rounded-4 shadow-sm border bg-white h-100">
                  <div className="rounded-circle d-flex align-items-center justify-content-center bg-danger bg-opacity-10 text-danger flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <div className="fw-bold mb-0 text-dark small">Genuine Parts</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>100% Authentic</div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="d-flex align-items-center gap-3 p-3 rounded-4 shadow-sm border bg-white h-100">
                  <div className="rounded-circle d-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                    <Wrench size={24} />
                  </div>
                  <div>
                    <div className="fw-bold mb-0 text-dark small">Expert Techs</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>Factory Trained</div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="d-flex align-items-center gap-3 p-3 rounded-4 shadow-sm border bg-white h-100">
                  <div className="rounded-circle d-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                    <Cpu size={24} />
                  </div>
                  <div>
                    <div className="fw-bold mb-0 text-dark small">Advanced Tools</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>Latest Tech</div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="d-flex align-items-center gap-3 p-3 rounded-4 shadow-sm border bg-white h-100">
                  <div className="rounded-circle d-flex align-items-center justify-content-center bg-warning bg-opacity-10 text-warning flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <div className="fw-bold mb-0 text-dark small">1000+ Clients</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>Trusted in Dubai</div>
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
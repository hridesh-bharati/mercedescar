'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Award, Check, ArrowRight, CheckCircle2, Sparkles, Zap, Wrench, AlertCircle,
  CircleDot, Cpu, Users, Cog, MapPin, Phone, Send, Loader2,
} from 'lucide-react';
import './about.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const WHATSAPP = '971567888808';

const TABS = [
  { icon: Sparkles, label: 'Full Cleaning', title: 'Full Interior & Exterior Cleaning', text: 'Deep polish, leather care and engine bay cleaning that keeps your Mercedes showroom-fresh in Dubai heat and dust.' },
  { icon: Zap, label: 'Engine Light', title: 'Engine Light Diagnostics', text: 'XENTRY scans find the exact fault behind the warning light, so you pay for the real fix, not guesswork.' },
  { icon: Wrench, label: 'Auto Services', title: 'Complete Auto Services', text: 'Oil, filters, brakes, suspension and more, done by certified technicians using genuine Mercedes parts.' },
  { icon: AlertCircle, label: 'All Check Light', title: 'Every Warning Light Checked', text: 'ABS, airbag, battery, Airmatic or SRS: we read, explain and clear every light after the repair.' },
  { icon: CircleDot, label: 'Wheels & Tires', title: 'Wheels, Tires & 3D Alignment', text: 'Laser alignment, balancing and tire replacement calibrated for Mercedes handling and even wear.' },
];

const WHY = [
  { icon: Cpu, title: 'High-End Technology', text: 'We use advanced XENTRY diagnostics to repair your Mercedes with pinpoint accuracy and dealership-level service every time.' },
  { icon: Users, title: 'Expert Team Members', text: 'Our certified technicians have years of specialized experience with Mercedes-Benz and AMG engines, ensuring reliable care.' },
  { icon: Cog, title: 'Quality Equipment', text: 'We rely on genuine Mercedes parts and specialized German equipment to guarantee lasting performance and safety.' },
];

const SERVICES = ['Oil Change', 'Brake Repair', 'Engine Diagnostics', 'General Maintenance'];
const EMPTY = { name: '', phone: '', email: '', service: SERVICES[0], message: '' };

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (!/^\+?[\d\s-]{7,16}$/.test(f.phone.trim())) e.phone = 'Enter a valid phone number.';
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = 'Enter a valid email address.';
  if (f.message.trim().length < 5) e.message = 'Tell us a little about the issue.';
  return e;
}

export default function AboutUs() {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 40,
    });
  }, []);

  const set = (k) => (ev) => {
    setForm((f) => ({ ...f, [k]: ev.target.value }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus('sending');
    const msg =
      `Hello Mercedes Garage Dubai!%0A` +
      `Name: ${encodeURIComponent(form.name.trim())}%0A` +
      `Phone: ${encodeURIComponent(form.phone.trim())}%0A` +
      `Email: ${encodeURIComponent(form.email.trim())}%0A` +
      `Service: ${encodeURIComponent(form.service)}%0A` +
      `Message: ${encodeURIComponent(form.message.trim())}`;
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank', 'noopener');
      setForm(EMPTY);
      setStatus('sent');
    }, 700);
  };

  const Active = TABS[tab];

  return (
    <>
      <Header />

      <main className="ab-page">
        {/* Background Ambient Glow Orbs */}
        <div className="ab-glow ab-glow-blue" aria-hidden="true" />
        <div className="ab-glow ab-glow-pink" aria-hidden="true" />
        <div className="ab-glow ab-glow-purple" aria-hidden="true" />

        {/* ============ HERO BANNER ============ */}
        <section className="ab-hero text-white position-relative py-5">
          <div className="ab-hero-bg"></div>
          <div className="ab-hero-overlay"></div>
          <div className="container position-relative z-2 py-3">
            <div className="row">
              <div className="col-lg-7 text-start">
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-dark bg-opacity-50 border border-light border-opacity-25 mb-2">
                  <span style={{ width: '20px', height: '2px', background: '#D6241D', display: 'inline-block' }}></span>
                  <span className="small fw-bold tracking-wider text-danger">ABOUT US</span>
                </div>
                <h1 className="display-4 fw-bold mb-3 text-white">
                  About Our <span className="text-danger">Workshop</span>
                </h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0 bg-dark bg-opacity-50 px-3 py-1 rounded-pill d-inline-flex align-items-center border border-light border-opacity-10 small">
                    <li className="breadcrumb-item"><Link href="/" className="text-danger text-decoration-none fw-semibold">Home</Link></li>
                    <li className="breadcrumb-item active text-light fw-semibold" aria-current="page">About Us</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* ============ SECTION 1 — Collage + Text ============ */}
        <section className="py-5">
          <div className="container">
            <div className="row align-items-center g-4 g-lg-5">
              <div className="col-lg-6" data-aos="fade-right">
                <div className="ab-collage">
                  <img
                    src="/images/about/car-1.avif"
                    alt="Mechanic working on Mercedes"
                    className="ab-main-img"
                    loading="lazy"
                  />
                  <img
                    src="/images/about/wheel-1.avif"
                    alt="Certified mechanic portrait"
                    className="ab-sub-img"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="col-lg-6 text-start" data-aos="fade-left">
                <div className="ab-tag">
                  <Sparkles size={14} /> NEW EXCLUSIVE
                </div>
                <h2 className="ab-heading">
                  Professional Mercedes-Benz Services Since 2020
                </h2>
                <p className="ab-lead">
                  Mercedes-Benz engineering is becoming ever more complex. We stay ahead of these
                  challenges by combining advanced dealer-level diagnostic technology, genuine parts,
                  and highly skilled certified technicians to meet every luxury car owner&apos;s needs.
                </p>

                <ul className="list-unstyled d-grid gap-3 mb-4">
                  {[
                    'Have 24 Hour Emergency hotline',
                    'Mobile Diagnostic Service',
                    'Manage your Car Online 24/7',
                  ].map((t) => (
                    <li key={t} className="glass-card p-3 d-flex align-items-center gap-3 fw-semibold small text-dark">
                      <span className="d-grid place-items-center bg-danger bg-opacity-10 text-danger p-1 rounded-circle">
                        <Check size={16} strokeWidth={3} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>

                <a href="#contact" className="ab-btn">
                  Get Started <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============ SECTION 2 — Circle + Checklist ============ */}
        <section className="py-5">
          <div className="container">
            <div className="row align-items-center g-4 g-lg-5">
              <div className="col-lg-5 text-center" data-aos="zoom-in">
                <div className="ab-circle-wrap">
                  <img
                    src="/images/services/imag-post-3.webp"
                    alt="Mechanic cleaning Mercedes"
                    loading="lazy"
                  />
                  <div className="ab-discount-badge">
                    <b>45%</b>
                    <span>Discount</span>
                  </div>
                </div>
              </div>

              <div className="col-lg-7 text-start" data-aos="fade-left">
                <div className="ab-tag">
                  <Wrench size={14} /> CERTIFIED CARE
                </div>
                <h2 className="ab-heading">
                  Essential Mercedes Maintenance &amp; Service Checklist
                </h2>
                <p className="ab-lead">
                  Modern Mercedes-Benz engineering is highly complex. Our certified specialists have
                  the upper hand, using advanced tools to overcome these challenges and keep your
                  vehicle performing flawlessly.
                </p>

                <ul className="list-unstyled d-grid gap-3">
                  {[
                    'Premium Engine Oil & Genuine Filter Replacement',
                    'AGM Battery Testing & Computer System Coding',
                    'Checking & Replacing Vital Suspension and Brake Components',
                  ].map((t) => (
                    <li key={t} className="glass-card p-3 d-flex align-items-center gap-3 fw-semibold small text-dark">
                      <CheckCircle2 size={20} className="text-danger flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============ TABS ============ */}
        <section className="py-5">
          <div className="container">
            <div className="ab-tabbar" role="tablist">
              {TABS.map((t, i) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.label}
                    type="button"
                    role="tab"
                    aria-selected={tab === i}
                    className={`ab-tab ${tab === i ? 'is-active' : ''}`}
                    onClick={() => setTab(i)}
                  >
                    <Icon size={16} /> {t.label}
                  </button>
                );
              })}
            </div>

            <div className="glass-card p-4 p-md-5 text-center max-w-800 mx-auto" style={{ maxWidth: '800px' }}>
              <h3 className="fw-bold mb-3 text-dark">{Active.title}</h3>
              <p className="text-secondary mb-4">{Active.text}</p>
              <a href="#contact" className="ab-btn">
                Book this service <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* ============ WHY CHOOSE US ============ */}
        <section className="py-5">
          <div className="container text-center">
            <div className="ab-tag mx-auto">WHY CHOOSE US</div>
            <h2 className="ab-heading mb-5">
              Why Dubai Chooses Us For Mercedes-Benz Excellence
            </h2>

            <div className="row g-4 text-start">
              {WHY.map((w) => {
                const Icon = w.icon;
                return (
                  <div className="col-md-4" key={w.title}>
                    <div className="glass-card p-4 h-100">
                      <div className="bg-danger bg-opacity-10 text-danger p-3 rounded-4 d-inline-flex mb-3 shadow-sm">
                        <Icon size={28} />
                      </div>
                      <h4 className="fw-bold mb-2 text-dark fs-5">{w.title}</h4>
                      <p className="text-secondary small mb-0">{w.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ CONTACT & FORM SECTION ============ */}
        <section id="contact" className="py-5 mb-4">
          <div className="container">
            <div className="row g-4 g-lg-5 align-items-center text-start">
              <div className="col-lg-5" data-aos="fade-right">
                <h2 className="ab-heading">Book Your Mercedes Service</h2>
                <p className="ab-lead">
                  We&apos;re here to provide expert assistance. Reach out today for reliable,
                  specialized Mercedes-Benz repair and maintenance services.
                </p>

                <a
                  className="glass-card p-3 d-flex align-items-center gap-3 text-decoration-none mb-3 text-dark"
                  href="https://www.google.com/maps/search/?api=1&query=Al+Quoz+Dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bg-danger bg-opacity-10 text-danger p-3 rounded-circle">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <small className="text-muted text-uppercase fw-bold d-block" style={{ fontSize: '0.7rem' }}>Address</small>
                    <b className="fs-6">Al Quoz 26th Street Industrial Area 2, Dubai</b>
                  </div>
                </a>

                <a
                  className="glass-card p-3 d-flex align-items-center gap-3 text-decoration-none text-dark"
                  href="tel:+971567888808"
                >
                  <div className="bg-success bg-opacity-10 text-success p-3 rounded-circle">
                    <Phone size={22} />
                  </div>
                  <div>
                    <small className="text-muted text-uppercase fw-bold d-block" style={{ fontSize: '0.7rem' }}>Phone No</small>
                    <b className="fs-6">+971 56 788 8808</b>
                  </div>
                </a>
              </div>

              <div className="col-lg-7" data-aos="fade-left">
                <div className="glass-card p-4 p-md-5">
                  <h3 className="fw-bold text-dark mb-4">Send Us a Message</h3>

                  {status === 'sent' ? (
                    <div className="text-center py-4">
                      <CheckCircle2 size={48} className="text-success mb-3" />
                      <h4 className="fw-bold">Request Ready!</h4>
                      <p className="text-secondary small mb-4">
                        WhatsApp has opened with your details. Press send there and we&apos;ll reply shortly.
                      </p>
                      <button
                        type="button"
                        className="ab-btn"
                        onClick={() => setStatus('idle')}
                      >
                        Send Another Request
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={submit} noValidate className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-secondary">Full Name</label>
                        <input
                          className={`form-control rounded-pill px-3 py-2 bg-white bg-opacity-75 ${errors.name ? 'is-invalid' : ''}`}
                          value={form.name}
                          onChange={set('name')}
                          placeholder="John Doe"
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-secondary">Phone Number</label>
                        <input
                          type="tel"
                          className={`form-control rounded-pill px-3 py-2 bg-white bg-opacity-75 ${errors.phone ? 'is-invalid' : ''}`}
                          value={form.phone}
                          onChange={set('phone')}
                          placeholder="+971 50 123 4567"
                        />
                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                      </div>

                      <div className="col-12">
                        <label className="form-label small fw-bold text-secondary">Email Address</label>
                        <input
                          type="email"
                          className={`form-control rounded-pill px-3 py-2 bg-white bg-opacity-75 ${errors.email ? 'is-invalid' : ''}`}
                          value={form.email}
                          onChange={set('email')}
                          placeholder="john@example.com"
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                      </div>

                      <div className="col-12">
                        <label className="form-label small fw-bold text-secondary">Service Type</label>
                        <select
                          className="form-select rounded-pill px-3 py-2 bg-white bg-opacity-75"
                          value={form.service}
                          onChange={set('service')}
                        >
                          {SERVICES.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      <div className="col-12">
                        <label className="form-label small fw-bold text-secondary">Message</label>
                        <textarea
                          rows="3"
                          className={`form-control rounded-4 p-3 bg-white bg-opacity-75 ${errors.message ? 'is-invalid' : ''}`}
                          value={form.message}
                          onChange={set('message')}
                          placeholder="Write your message here..."
                        />
                        {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                      </div>

                      <div className="col-12 mt-4">
                        <button
                          type="submit"
                          className="ab-btn w-100 py-3 shadow"
                          disabled={status === 'sending'}
                        >
                          {status === 'sending' ? (
                            <>
                              <Loader2 size={18} className="spinner-border spinner-border-sm" /> Sending...
                            </>
                          ) : (
                            <>
                              <Send size={18} /> Submit Request via WhatsApp
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
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
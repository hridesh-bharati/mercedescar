// src/app/about-us/AboutClient.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Check,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Wrench,
  AlertCircle,
  CircleDot,
  Cpu,
  Users,
  Cog,
  MapPin,
  Phone,
  Send,
  Loader2,
} from 'lucide-react';
import { useScrollAnimation } from '@/components/providers/useScrollAnimation';
import './about.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const WHATSAPP = '971567888808';

const TABS = [
  {
    icon: Sparkles,
    label: 'Full Cleaning',
    title: 'Full Mercedes Interior & Exterior Cleaning',
    text: 'Deep polish, leather care and engine bay cleaning that keeps your Mercedes showroom-fresh in Dubai heat and dust.',
  },
  {
    icon: Zap,
    label: 'Engine Light',
    title: 'Mercedes Engine Light Diagnostics',
    text: 'XENTRY scans find the exact fault behind the warning light, so you pay for the real fix, not guesswork.',
  },
  {
    icon: Wrench,
    label: 'Auto Services',
    title: 'Complete Mercedes Auto Services',
    text: 'Oil, filters, brakes, suspension and more, done by certified Mercedes technicians using genuine parts.',
  },
  {
    icon: AlertCircle,
    label: 'All Check Light',
    title: 'Every Mercedes Warning Light Checked',
    text: 'ABS, airbag, battery, Airmatic or SRS: we read, explain and clear every light after the repair.',
  },
  {
    icon: CircleDot,
    label: 'Wheels & Tires',
    title: 'Mercedes Wheels, Tires & 3D Alignment',
    text: 'Laser alignment, balancing and tire replacement calibrated for Mercedes handling and even wear.',
  },
];

const WHY = [
  {
    icon: Cpu,
    title: 'High-End Mercedes Technology',
    text: 'We use advanced XENTRY diagnostics to repair your Mercedes with pinpoint accuracy and dealership-level service every time.',
  },
  {
    icon: Users,
    title: 'Mercedes Expert Team',
    text: 'Our certified technicians have 15+ years of specialized experience with Mercedes-Benz and AMG engines, ensuring reliable care.',
  },
  {
    icon: Cog,
    title: 'Quality Mercedes Equipment',
    text: 'We rely on genuine Mercedes parts and specialized German equipment to guarantee lasting performance and safety.',
  },
];

const SERVICES = [
  'Oil Change',
  'Brake Repair',
  'Engine Diagnostics',
  'General Maintenance',
  'AMG Body Kit',
  'Facelift Conversion',
];

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  service: SERVICES[0],
  message: '',
};

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (!/^\+?[\d\s-]{7,16}$/.test(f.phone.trim()))
    e.phone = 'Enter a valid phone number.';
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim()))
    e.email = 'Enter a valid email address.';
  if (f.message.trim().length < 5)
    e.message = 'Tell us a little about the issue.';
  return e;
}

export default function AboutClient({ faqs = [] }) {
  useScrollAnimation();

  const [tab, setTab] = useState(0);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

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

    const isMobile =
      typeof window !== 'undefined' &&
      /Mobi|Android/i.test(navigator.userAgent);
    const url = isMobile
      ? `whatsapp://send?phone=${WHATSAPP}&text=${msg}`
      : `https://wa.me/${WHATSAPP}?text=${msg}`;

    setTimeout(() => {
      window.open(url, '_blank', 'noopener');
      setForm(EMPTY);
      setStatus('sent');
    }, 500);
  };

  const Active = TABS[tab];

  return (
    <>
      <Header />

      <main className="ab-page">
        <div className="ab-glow ab-glow-blue" aria-hidden="true" />
        <div className="ab-glow ab-glow-pink" aria-hidden="true" />
        <div className="ab-glow ab-glow-purple" aria-hidden="true" />

        {/* ============ HERO BANNER ============ */}
        <section className="ab-hero text-white position-relative py-5">
          <div
            className="ab-hero-bg"
            aria-hidden="true"
            style={{ backgroundImage: "url('/images/about/about-car.avif')" }}
          />
          <div className="ab-hero-overlay" aria-hidden="true" />
          <div className="container position-relative z-2 py-3">
            <div className="row">
              <div className="col-lg-8 text-start">
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-dark bg-opacity-50 border border-light border-opacity-25 mb-3">
                  <span
                    style={{
                      width: '20px',
                      height: '2px',
                      background: '#D6241D',
                      display: 'inline-block',
                    }}
                  ></span>
                  <span className="small fw-bold tracking-wider text-danger">
                    ABOUT US
                  </span>
                </div>

                <h1 className="display-5 fw-bold mb-3 text-white">
                  About Mercedes Garage Dubai
                  <span className="text-danger d-block fs-4 mt-2">
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
                      About Us
                    </li>
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
              <div className="col-lg-6" data-anim="fade-right">
                <div className="ab-collage">
                  <Image
                    src="/images/about/car-1.avif"
                    alt="Certified Mercedes-Benz mechanic repairing a car at our Al Quoz Dubai workshop"
                    width={600}
                    height={380}
                    className="ab-main-img"
                    sizes="(max-width: 991px) 100vw, 50vw"
                    priority
                  />
                  <Image
                    src="/images/about/wheel-1.avif"
                    alt="Mercedes-Benz wheel and brake service at our Dubai workshop"
                    width={300}
                    height={200}
                    className="ab-sub-img"
                    sizes="(max-width: 991px) 50vw, 25vw"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="col-lg-6 text-start" data-anim="fade-left">
                <div className="ab-tag">
                  <Sparkles size={14} aria-hidden="true" /> MERCEDES SPECIALISTS
                </div>
                <h2 className="ab-heading">
                  Professional Mercedes-Benz Services in Dubai
                  <span className="text-danger"> Since 2010</span>
                </h2>
                <p className="ab-lead">
                  Mercedes-Benz engineering is becoming ever more complex. We
                  stay ahead of these challenges by combining advanced
                  dealer-level diagnostic technology, genuine parts, and highly
                  skilled certified technicians to meet every Mercedes
                  owner&apos;s needs in Dubai.
                </p>

                <ul className="list-unstyled d-grid gap-3 mb-4">
                  {[
                    '24-Hour Mercedes Emergency Hotline',
                    'Mobile Mercedes Diagnostic Service',
                    'Manage Your Mercedes Online 24/7',
                  ].map((t) => (
                    <li
                      key={t}
                      className="glass-card p-3 d-flex align-items-center gap-3 fw-semibold small text-dark"
                    >
                      <span className="d-grid place-items-center bg-danger bg-opacity-10 text-danger p-1 rounded-circle">
                        <Check size={16} strokeWidth={3} aria-hidden="true" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>

                <a href="#contact" className="ab-btn">
                  Get Started <ArrowRight size={18} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============ SECTION 2 — Circle + Checklist ============ */}
        <section className="py-5">
          <div className="container">
            <div className="row align-items-center g-4 g-lg-5">
              <div className="col-lg-5 text-center" data-anim="zoom-in">
                <div className="ab-circle-wrap">
                  <Image
                    src="/images/services/imag-post-3.avif"
                    alt="Mercedes-Benz service and cleaning at our Al Quoz workshop"
                    width={280}
                    height={280}
                    loading="lazy"
                    sizes="280px"
                  />
                  <div className="ab-discount-badge">
                    <b>15+</b>
                    <span>Years</span>
                  </div>
                </div>
              </div>

              <div className="col-lg-7 text-start" data-anim="fade-left">
                <div className="ab-tag">
                  <Wrench size={14} aria-hidden="true" /> CERTIFIED MERCEDES CARE
                </div>
                <h2 className="ab-heading">
                  Essential Mercedes Maintenance &amp; Service Checklist
                </h2>
                <p className="ab-lead">
                  Modern Mercedes-Benz engineering is highly complex. Our
                  certified specialists have the upper hand, using advanced
                  tools to overcome these challenges and keep your Mercedes
                  performing flawlessly in Dubai.
                </p>

                <ul className="list-unstyled d-grid gap-3">
                  {[
                    'Premium Mercedes Engine Oil & Genuine Filter Replacement',
                    'AGM Battery Testing & Mercedes Computer System Coding',
                    'Checking & Replacing Vital Suspension and Brake Components',
                  ].map((t) => (
                    <li
                      key={t}
                      className="glass-card p-3 d-flex align-items-center gap-3 fw-semibold small text-dark"
                    >
                      <CheckCircle2
                        size={20}
                        className="text-danger flex-shrink-0"
                        aria-hidden="true"
                      />
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
            <div
              className="ab-tabbar"
              role="tablist"
              aria-label="Mercedes Services"
            >
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
                    <Icon size={16} aria-hidden="true" /> {t.label}
                  </button>
                );
              })}
            </div>

            <div
              className="glass-card p-4 p-md-5 text-center mx-auto"
              style={{ maxWidth: '800px' }}
            >
              <h3 className="fw-bold mb-3 text-dark">{Active.title}</h3>
              <p className="text-secondary mb-4">{Active.text}</p>
              <a href="#contact" className="ab-btn">
                Book This Mercedes Service{' '}
                <ArrowRight size={16} aria-hidden="true" />
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
                  <div className="col-md-4" key={w.title} data-anim="fade-up">
                    <div className="glass-card p-4 h-100">
                      <div className="bg-danger bg-opacity-10 text-danger p-3 rounded-4 d-inline-flex mb-3 shadow-sm">
                        <Icon size={28} aria-hidden="true" />
                      </div>
                      <h3 className="fw-bold mb-2 text-dark fs-5">
                        {w.title}
                      </h3>
                      <p className="text-secondary small mb-0">{w.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ FAQ SECTION ============ */}
        {faqs.length > 0 && (
          <section className="py-5" id="about-faq">
            <div className="container" style={{ maxWidth: '900px' }}>
              <div className="text-center mb-4">
                <div className="ab-tag mx-auto">FAQ</div>
                <h2 className="ab-heading">Frequently Asked Questions</h2>
              </div>
              {faqs.map((f, i) => (
                <details
                  key={i}
                  className="glass-card p-3 mb-3 bg-white bg-opacity-75"
                >
                  <summary
                    className="fw-bold text-dark"
                    style={{ cursor: 'pointer' }}
                  >
                    {f.q}
                  </summary>
                  <p className="mt-2 mb-0 text-secondary small">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ============ CONTACT & FORM ============ */}
        <section id="contact" className="py-5 mb-4">
          <div className="container">
            <div className="row g-4 g-lg-5 align-items-center text-start">
              <div className="col-lg-5" data-anim="fade-right">
                <h2 className="ab-heading">Book Your Mercedes Service</h2>
                <p className="ab-lead">
                  We&apos;re here to provide expert assistance. Reach out today
                  for reliable, specialized Mercedes-Benz repair and maintenance
                  services in Dubai.
                </p>

                <a
                  className="glass-card p-3 d-flex align-items-center gap-3 text-decoration-none mb-3 text-dark"
                  href="https://www.google.com/maps/search/?api=1&query=Warehouse+S2+Al+Quoz+20C+Street+Industrial+Area+2+Dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Mercedes Garage Dubai location on Google Maps"
                >
                  <div className="bg-danger bg-opacity-10 text-danger p-3 rounded-circle">
                    <MapPin size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <small
                      className="text-muted text-uppercase fw-bold d-block"
                      style={{ fontSize: '0.7rem' }}
                    >
                      Address
                    </small>
                    <b className="fs-6">
                      Warehouse #S2, Al Quoz 20C Street, Industrial Area 2,
                      Dubai
                    </b>
                  </div>
                </a>

                <a
                  className="glass-card p-3 d-flex align-items-center gap-3 text-decoration-none text-dark"
                  href="tel:+971567888808"
                  aria-label="Call Mercedes Garage Dubai at plus 971 56 788 8808"
                >
                  <div className="bg-success bg-opacity-10 text-success p-3 rounded-circle">
                    <Phone size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <small
                      className="text-muted text-uppercase fw-bold d-block"
                      style={{ fontSize: '0.7rem' }}
                    >
                      Phone No
                    </small>
                    <b className="fs-6">+971 56 788 8808</b>
                  </div>
                </a>
              </div>

              <div className="col-lg-7" data-anim="fade-left">
                <div className="glass-card p-4 p-md-5">
                  <h3 className="fw-bold text-dark mb-4">
                    Send Us a Mercedes Message
                  </h3>

                  {status === 'sent' ? (
                    <div className="text-center py-4">
                      <CheckCircle2
                        size={48}
                        className="text-success mb-3"
                        aria-hidden="true"
                      />
                      <h4 className="fw-bold">Request Ready!</h4>
                      <p className="text-secondary small mb-4">
                        WhatsApp has opened with your details. Press send there
                        and we&apos;ll reply shortly.
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
                        <label
                          htmlFor="ab-name"
                          className="form-label small fw-bold text-secondary"
                        >
                          Full Name
                        </label>
                        <input
                          id="ab-name"
                          className={`form-control rounded-pill px-3 py-2 bg-white bg-opacity-75 ${
                            errors.name ? 'is-invalid' : ''
                          }`}
                          value={form.name}
                          onChange={set('name')}
                          placeholder="John Doe"
                          aria-invalid={!!errors.name}
                          aria-describedby={
                            errors.name ? 'ab-name-error' : undefined
                          }
                        />
                        {errors.name && (
                          <div
                            id="ab-name-error"
                            className="invalid-feedback"
                          >
                            {errors.name}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label
                          htmlFor="ab-phone"
                          className="form-label small fw-bold text-secondary"
                        >
                          Phone Number
                        </label>
                        <input
                          id="ab-phone"
                          type="tel"
                          className={`form-control rounded-pill px-3 py-2 bg-white bg-opacity-75 ${
                            errors.phone ? 'is-invalid' : ''
                          }`}
                          value={form.phone}
                          onChange={set('phone')}
                          placeholder="+971 50 123 4567"
                          aria-invalid={!!errors.phone}
                        />
                        {errors.phone && (
                          <div className="invalid-feedback">
                            {errors.phone}
                          </div>
                        )}
                      </div>

                      <div className="col-12">
                        <label
                          htmlFor="ab-email"
                          className="form-label small fw-bold text-secondary"
                        >
                          Email Address
                        </label>
                        <input
                          id="ab-email"
                          type="email"
                          className={`form-control rounded-pill px-3 py-2 bg-white bg-opacity-75 ${
                            errors.email ? 'is-invalid' : ''
                          }`}
                          value={form.email}
                          onChange={set('email')}
                          placeholder="john@example.com"
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                          <div className="invalid-feedback">
                            {errors.email}
                          </div>
                        )}
                      </div>

                      <div className="col-12">
                        <label
                          htmlFor="ab-service"
                          className="form-label small fw-bold text-secondary"
                        >
                          Service Type
                        </label>
                        <select
                          id="ab-service"
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
                        <label
                          htmlFor="ab-message"
                          className="form-label small fw-bold text-secondary"
                        >
                          Message
                        </label>
                        <textarea
                          id="ab-message"
                          rows="3"
                          className={`form-control rounded-4 p-3 bg-white bg-opacity-75 ${
                            errors.message ? 'is-invalid' : ''
                          }`}
                          value={form.message}
                          onChange={set('message')}
                          placeholder="Write your Mercedes service details here..."
                          aria-invalid={!!errors.message}
                        />
                        {errors.message && (
                          <div className="invalid-feedback">
                            {errors.message}
                          </div>
                        )}
                      </div>

                      <div className="col-12 mt-4">
                        <button
                          type="submit"
                          className="ab-btn w-100 py-3 shadow"
                          disabled={status === 'sending'}
                        >
                          {status === 'sending' ? (
                            <>
                              <Loader2
                                size={18}
                                className="spinner-border spinner-border-sm"
                                aria-hidden="true"
                              />{' '}
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send size={18} aria-hidden="true" /> Submit
                              Request via WhatsApp
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


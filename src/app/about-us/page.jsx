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
  { icon: Cpu, color: 'c-violet', title: 'High-End Technology', text: 'We use advanced XENTRY diagnostics to repair your Mercedes with pinpoint accuracy and dealership-level service every time.' },
  { icon: Users, color: 'c-pink', title: 'Expert Team Members', text: 'Our certified technicians have years of specialized experience with Mercedes-Benz and AMG engines, ensuring reliable care.' },
  { icon: Cog, color: 'c-cyan', title: 'Quality Equipment', text: 'We rely on genuine Mercedes parts and specialized German equipment to guarantee lasting performance and safety.' },
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
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: false,
      easing: 'ease-out-cubic',
      offset: 60,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
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
   
   <Header / >
 <div className="ab-page">
      <div className="ab-orb ab-orb-1" />
      <div className="ab-orb ab-orb-2" />
      <div className="ab-orb ab-orb-3" />
      <div className="ab-orb ab-orb-4" />

      {/* HERO */}
      <section className="ab-hero">
        <div className="ab-hero-overlay" />
        <div className="container ab-hero-inner">
          <h1 className="ab-hero-title" data-aos="fade-down" data-aos-duration="1000">
            About Us
          </h1>
          <nav
            aria-label="Breadcrumb"
            className="ab-glass ab-crumb"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <strong aria-current="page">About Us</strong>
          </nav>
        </div>
      </section>

      {/* SECTION 1 */}
      <section className="ab-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="ab-collage">
                <img src="/images/about/car-1.avif" alt="Mechanic working" className="ab-main-img" />
                <img src="/images/about/wheel-1.avif" alt="Mechanic portrait" className="ab-sub-img" />
                <div className="ab-glass ab-float-badge">
                  <Award size={28} />
                  <span>Certified Experts</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left" data-aos-delay="150">
              <span className="ab-tag ab-glass" data-aos="fade-up">New Exclusive</span>
              <h2 className="ab-heading" data-aos="fade-up" data-aos-delay="100">
                Professional Mercedes-Benz Services Since 2020
              </h2>
              <p className="ab-lead" data-aos="fade-up" data-aos-delay="200">
                Mercedes-Benz engineering is becoming ever more complex. We stay ahead of these challenges by combining advanced dealer-level diagnostic technology, genuine parts, and highly skilled certified technicians to meet every luxury car owner&apos;s needs.
              </p>
              <ul className="ab-checks">
                {['Have 24 Hour Emergency hotline', 'Mobile Diagnostic Service', 'Manage your Car Online 24/7'].map((t, i) => (
                  <li key={t} className="ab-glass" data-aos="fade-up" data-aos-delay={300 + i * 100}>
                    <span className="ab-tick"><Check size={16} strokeWidth={3} /></span>
                    {t}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="ab-btn" data-aos="zoom-in" data-aos-delay="600">
                Get Started <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="ab-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5 text-center" data-aos="zoom-in">
              <div className="ab-circle">
                <img src="/images/about/bg-video2-scaled.webp" alt="Mechanic cleaning" />
                <div className="ab-glass ab-discount" data-aos="zoom-in" data-aos-delay="400">
                  <b>45%</b>
                  <span>Discount</span>
                </div>
              </div>
            </div>
            <div className="col-lg-7" data-aos="fade-left" data-aos-delay="150">
              <span className="ab-tag ab-glass" data-aos="fade-up">New Exclusive</span>
              <h2 className="ab-heading" data-aos="fade-up" data-aos-delay="100">
                Essential Mercedes Maintenance &amp; Service Checklist
              </h2>
              <p className="ab-lead" data-aos="fade-up" data-aos-delay="200">
                Modern Mercedes-Benz engineering is highly complex. Our certified specialists have the upper hand, using advanced tools to overcome these challenges and keep your vehicle performing flawlessly.
              </p>
              <ul className="ab-list">
                {[
                  'Premium Engine Oil & Genuine Filter Replacement',
                  'AGM Battery Testing & Computer System Coding',
                  'Checking & Replacing Vital Suspension and Brake Components',
                ].map((t, i) => (
                  <li key={t} className="ab-glass" data-aos="fade-up" data-aos-delay={300 + i * 100}>
                    <CheckCircle2 size={22} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="ab-section ab-tabs-section">
        <div className="container">
          <div className="ab-glass ab-tabbar" role="tablist" data-aos="fade-up">
            {TABS.map((t, i) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.label}
                  role="tab"
                  aria-selected={tab === i}
                  className={`ab-tab ${tab === i ? 'is-active' : ''}`}
                  onClick={() => setTab(i)}
                >
                  <Icon size={18} /> {t.label}
                </button>
              );
            })}
          </div>
          <div
            key={tab}
            role="tabpanel"
            className="ab-glass ab-panel"
            data-aos="zoom-in"
            data-aos-duration="600"
          >
            <h3>{Active.title}</h3>
            <p>{Active.text}</p>
            <a href="#contact" className="ab-btn ab-btn-sm">
              Book this service <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="ab-section">
        <div className="container">
          <div className="text-center">
            <span className="ab-tag ab-glass" data-aos="fade-up">Why Choose Us</span>
            <h2 className="ab-heading ab-center" data-aos="fade-up" data-aos-delay="100">
              Why Dubai Chooses Us For Mercedes-Benz Excellence
            </h2>
          </div>
          <div className="row g-4 mt-4">
            {WHY.map((w, i) => {
              const Icon = w.icon;
              return (
                <div className="col-md-4" key={w.title} data-aos="fade-up" data-aos-delay={i * 150}>
                  <div className={`ab-glass ab-feature ${w.color}`}>
                    <div className="ab-icon"><Icon size={30} /></div>
                    <h4>{w.title}</h4>
                    <p>{w.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="ab-section">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5" data-aos="fade-right">
              <h2 className="ab-heading" data-aos="fade-up">Book Your Mercedes Service</h2>
              <p className="ab-lead" data-aos="fade-up" data-aos-delay="100">
                We&apos;re here to provide expert assistance. Reach out today for reliable, specialized Mercedes-Benz repair and maintenance services.
              </p>
              <a
                className="ab-glass ab-contact"
                href="https://www.google.com/maps/search/?api=1&query=Al+Quoz+Dubai"
                target="_blank"
                rel="noopener noreferrer"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <span className="ab-ci"><MapPin size={24} /></span>
                <span><small>Address</small><b>AL-Quoz Dubai</b></span>
              </a>
              <a className="ab-glass ab-contact" href="tel:+971567888808" data-aos="fade-up" data-aos-delay="300">
                <span className="ab-ci"><Phone size={24} /></span>
                <span><small>Phone No</small><b>+971 56 788 8808</b></span>
              </a>
            </div>

            <div className="col-lg-7" data-aos="fade-left" data-aos-delay="150">
              <div className="ab-form-wrap">
                <div className="ab-form">
                  <h2 className="ab-heading" data-aos="fade-up">Contact Us</h2>
                  {status === 'sent' ? (
                    <div className="ab-success" role="status">
                      <CheckCircle2 size={44} />
                      <h3>Request ready!</h3>
                      <p>WhatsApp has opened with your details. Press send there and we&apos;ll reply shortly.</p>
                      <button className="ab-btn ab-btn-sm" onClick={() => setStatus('idle')}>
                        Send another request
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={submit} noValidate data-aos="fade-up" data-aos-delay="100">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label htmlFor="f-name">Full Name</label>
                          <input id="f-name" className={`ab-input ${errors.name ? 'has-err' : ''}`} value={form.name} onChange={set('name')} placeholder="e.g. Oliver Spiteri" autoComplete="name" />
                          {errors.name && <em>{errors.name}</em>}
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="f-phone">Phone Number</label>
                          <input id="f-phone" type="tel" className={`ab-input ${errors.phone ? 'has-err' : ''}`} value={form.phone} onChange={set('phone')} placeholder="e.g. +971 50 123 4567" autoComplete="tel" />
                          {errors.phone && <em>{errors.phone}</em>}
                        </div>
                        <div className="col-12">
                          <label htmlFor="f-email">Email Address</label>
                          <input id="f-email" type="email" className={`ab-input ${errors.email ? 'has-err' : ''}`} value={form.email} onChange={set('email')} placeholder="example@email.com" autoComplete="email" />
                          {errors.email && <em>{errors.email}</em>}
                        </div>
                        <div className="col-12">
                          <label htmlFor="f-service">Service Type</label>
                          <select id="f-service" className="ab-input" value={form.service} onChange={set('service')}>
                            {SERVICES.map((s) => <option key={s}>{s}</option>)}
                          </select>
                        </div>
                        <div className="col-12">
                          <label htmlFor="f-msg">Message</label>
                          <textarea id="f-msg" rows="4" className={`ab-input ${errors.message ? 'has-err' : ''}`} value={form.message} onChange={set('message')} placeholder="Write your message here..." />
                          {errors.message && <em>{errors.message}</em>}
                        </div>
                      </div>
                      <button type="submit" className="ab-btn ab-btn-block" disabled={status === 'sending'}>
                        {status === 'sending' ? <><Loader2 size={18} className="ab-spin" /> Sending...</> : <><Send size={18} /> Submit Request</>}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
   <Footer />
   </>
  );
}
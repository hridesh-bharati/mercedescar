'use client';
import Link from 'next/link';
import { Sparkles, Search } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="services-hero">
      <div className="container text-center">
        {/* Top Floating Badge */}
        <div className="services-hero-badge" data-aos="fade-down">
          <Sparkles size={16} className="text-warning" />
          Shop With Confidence • Certified Vehicles
        </div>

        {/* Main Hero Title */}
        <h1 className="services-hero-title" data-aos="fade-up" data-aos-delay="100">
          Discover Our Best Deals On <br />
          <span className="text-danger">New And Used Cars</span>
        </h1>

        {/* Interactive Search / Filter Bar */}
        <div className="hero-search-box mx-auto mt-4 p-3" data-aos="fade-up" data-aos-delay="200">
          <div className="row g-2 align-items-center">
            <div className="col-md-4">
              <select className="form-select py-2 px-3 fw-semibold text-secondary">
                <option>Car Make</option>
                <option>Mercedes-Benz</option>
                <option>AMG</option>
                <option>BMW</option>
              </select>
            </div>
            <div className="col-md-4">
              <select className="form-select py-2 px-3 fw-semibold text-secondary">
                <option>Car Model</option>
                <option>C-Class</option>
                <option>E-Class</option>
                <option>S-Class</option>
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select py-2 px-3 fw-semibold text-secondary">
                <option>Price Range</option>
                <option>$20,000 - $50,000</option>
                <option>$50,000+</option>
              </select>
            </div>
            <div className="col-md-1">
              <button className="btn btn-danger w-100">
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Breadcrumb Below Search */}
        <div className="services-breadcrumb mt-4" data-aos="fade-up" data-aos-delay="300">
          <Link href="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-sep">✕</span>
          <span className="breadcrumb-current">Services</span>
        </div>
      </div>
    </section>
  );
}
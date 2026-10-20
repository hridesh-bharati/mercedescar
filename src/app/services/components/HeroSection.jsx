// src/app/services/components/HeroSection.jsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Search } from 'lucide-react';
import SearchModal from '@/components/layout/SearchModal';

export default function HeroSection() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <section className="services-hero">
        <div className="container text-center">
          <div className="services-hero-badge" data-aos="fade-down">
            <Sparkles size={16} className="text-warning" />
            Shop With Confidence • Certified Vehicles
          </div>

          <h1 className="services-hero-title" data-aos="fade-up" data-aos-delay="100">
            Discover Our Best Deals On <br />
            <span className="text-danger">New And Used Cars</span>
          </h1>

          {/* Integrated Search Trigger Bar inside Hero */}
          <div className="row justify-content-center mt-4" data-aos="fade-up" data-aos-delay="150">
            <div className="col-12 col-md-8 col-lg-6">
              <div 
                className="d-flex align-items-center bg-white shadow-sm rounded-pill px-4 py-3 border cursor-pointer"
                onClick={() => setSearchOpen(true)}
                style={{ cursor: 'pointer' }}
              >
                <Search size={18} className="text-muted me-2" />
                <span className="text-muted small flex-grow-1 text-start">Search Mercedes services, models, repairs...</span>
                <span className="badge bg-light text-dark border px-2 py-1 rounded-pill" style={{ fontSize: '0.7rem' }}>Quick Search</span>
              </div>
            </div>
          </div>

          <div className="services-breadcrumb mt-4" data-aos="fade-up" data-aos-delay="200">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-sep">✕</span>
            <span className="breadcrumb-current">Services</span>
          </div>
        </div>
      </section>

      {/* Trigger Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
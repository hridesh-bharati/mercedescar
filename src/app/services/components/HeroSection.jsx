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

          {/* Balanced & Compact Search Trigger Bar inside Hero */}
          <div className="row justify-content-center mt-4" data-aos="fade-up" data-aos-delay="150">
            <div className="col-10 col-sm-8 col-md-6 col-lg-5">
              <div 
                className="d-flex align-items-center bg-white shadow-sm rounded-pill px-3 px-md-4 py-2 py-md-2.5 border cursor-pointer"
                onClick={() => setSearchOpen(true)}
                style={{ cursor: 'pointer' }}
              >
                <Search size={17} className="text-danger me-2 flex-shrink-0" />
                <span className="text-muted small flex-grow-1 text-start text-truncate" style={{ fontSize: '0.85rem' }}>Search Mercedes services, models, repairs...</span>
                <span className="badge bg-danger bg-opacity-10 text-danger px-2 py-1 rounded-pill flex-shrink-0 ms-2" style={{ fontSize: '0.65rem' }}>Quick Search</span>
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
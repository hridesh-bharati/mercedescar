// src/app/services/components/HeroSection.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Wrench } from 'lucide-react';
import SearchModal from '@/components/layout/SearchModal';

export default function HeroSection() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <section className="services-hero">
        <div className="container text-center">
          <div className="services-hero-badge animate-fade-down">
            <Wrench size={16} className="text-danger" aria-hidden="true" />
            MERCEDES-BENZ SPECIALISTS
          </div>

          {/* ✅ H1 — PDF exact keyword target */}
          <h1
            className="services-hero-title animate-fade-up"
            style={{ animationDelay: '100ms' }}
          >
            Mercedes-Benz Repair, Maintenance &<br />
            <span className="text-danger">Specialist Services in Dubai</span>
          </h1>

          {/* Search bar */}
          <div
            className="row justify-content-center mt-4 animate-fade-up"
            style={{ animationDelay: '150ms' }}
          >
            <div className="col-10 col-sm-8 col-md-6 col-lg-5">
              <button
                type="button"
                className="d-flex align-items-center w-100 bg-white shadow-sm rounded-pill px-3 px-md-4 py-2 py-md-2 border border-0"
                onClick={() => setSearchOpen(true)}
                style={{ cursor: 'pointer' }}
                aria-label="Search Mercedes services"
              >
                <Search
                  size={17}
                  className="text-danger me-2 flex-shrink-0"
                  aria-hidden="true"
                />
                <span
                  className="text-muted small flex-grow-1 text-start text-truncate"
                  style={{ fontSize: '0.85rem' }}
                >
                  Search Mercedes services, models, repairs...
                </span>
                <span
                  className="badge bg-danger bg-opacity-10 text-danger px-2 py-1 rounded-pill flex-shrink-0 ms-2"
                  style={{ fontSize: '0.65rem' }}
                >
                  Quick Search
                </span>
              </button>
            </div>
          </div>

          {/* Breadcrumb */}
          <nav
            className="services-breadcrumb mt-4 animate-fade-up"
            style={{ animationDelay: '200ms' }}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="breadcrumb-link">
              Home
            </Link>
            <span className="breadcrumb-sep" aria-hidden="true">
              ›
            </span>
            <span className="breadcrumb-current" aria-current="page">
              Services
            </span>
          </nav>
        </div>
      </section>

      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes fadeDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-down {
            animation: fadeDown 0.8s ease forwards;
            opacity: 0;
          }
          .animate-fade-up {
            animation: fadeUp 0.8s ease forwards;
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-down,
          .animate-fade-up {
            opacity: 1;
          }
        }
      `}</style>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
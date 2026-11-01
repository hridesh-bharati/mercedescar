
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

          <div className="services-hero-badge animate-fade-down">
            <Sparkles size={16} className="text-warning" />
            Mercedes-Benz Specialists • Al Quoz, Dubai
          </div>

          <h1
            className="services-hero-title animate-fade-up"
            style={{ animationDelay: '100ms' }}
          >
            Mercedes-Benz Services
            <br />
            <span className="text-danger">
              Repair & Maintenance in Dubai
            </span>
          </h1>

          <p
            className="text-muted mt-3 mx-auto animate-fade-up"
            style={{
              animationDelay: '150ms',
              maxWidth: '720px',
              lineHeight: '1.7',
            }}
          >
            Explore Mercedes-Benz servicing, engine diagnostics,
            brake repair, transmission service and specialist
            vehicle upgrades at German Auto Expert in Al Quoz, Dubai.
          </p>

          {/* Search Trigger */}
          <div
            className="row justify-content-center mt-4 animate-fade-up"
            style={{ animationDelay: '200ms' }}
          >
            <div className="col-10 col-sm-8 col-md-6 col-lg-5">
              <button
                type="button"
                className="d-flex align-items-center bg-white shadow-sm rounded-pill px-3 px-md-4 py-2 border w-100"
                onClick={() => setSearchOpen(true)}
                aria-label="Search Mercedes-Benz services"
                style={{
                  cursor: 'pointer',
                  minHeight: '48px',
                }}
              >
                <Search
                  size={17}
                  className="text-danger me-2 flex-shrink-0"
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

          <div
            className="services-breadcrumb mt-4 animate-fade-up"
            style={{ animationDelay: '250ms' }}
          >
            <Link href="/" className="breadcrumb-link">
              Home
            </Link>

            <span className="breadcrumb-sep">✕</span>

            <span className="breadcrumb-current">
              Mercedes Services
            </span>
          </div>
        </div>
      </section>

      <style jsx>{`
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
      `}</style>

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}

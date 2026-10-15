// src/app/case/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ArrowRight, Calendar, User, Briefcase } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { dbService } from '@/services/dbService';

export default function CasesPage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 40 });
    fetchCases();
  }, []);

  const fetchCases = async () => {
    const res = await dbService.getAll('cases');
    if (res.success && res.data) {
      setCases(res.data);
    }
    setLoading(false);
  };

  return (
    <>
      <Header />

      <main className="bg-light py-5">
        {/* ============ HERO BANNER ============ */}
        <section className="bg-dark text-white py-5 mb-5 position-relative overflow-hidden rounded-4 mx-3 mx-md-4 shadow-sm">
          <div className="container position-relative z-2 py-4">
            <div className="row">
              <div className="col-lg-8 text-start" data-aos="fade-down">
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-danger bg-opacity-25 border border-danger border-opacity-50 mb-3">
                  <span style={{ width: '20px', height: '2px', background: '#D6241D', display: 'inline-block' }}></span>
                  <span className="small fw-bold tracking-wider text-danger">PORTFOLIO & CASE STUDIES</span>
                </div>
                <h1 className="display-5 fw-bold mb-2">
                  Our Successful <span className="text-danger">Projects</span>
                </h1>
                <p className="text-secondary small mb-3">
                  Explore how our expert technicians diagnose, repair, and restore luxury and standard vehicles with precision.
                </p>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0 bg-white bg-opacity-10 px-3 py-1 rounded-pill d-inline-flex align-items-center border border-light border-opacity-10 small">
                    <li className="breadcrumb-item"><Link href="/" className="text-danger text-decoration-none fw-semibold">Home</Link></li>
                    <li className="breadcrumb-item active text-light fw-semibold" aria-current="page">Case Studies</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* ============ CASES GRID SECTION ============ */}
        <div className="container pb-5">
          {loading ? (
            <div className="text-center py-5 text-secondary fw-bold">Loading Case Studies...</div>
          ) : cases.length === 0 ? (
            <div className="text-center py-5 text-muted card border-0 shadow-sm rounded-4 p-5 bg-white">
              <Briefcase size={40} className="text-secondary mx-auto mb-3 opacity-50" />
              <h5 className="fw-bold text-dark mb-2">No Case Studies Found</h5>
              <p className="small mb-3">We are updating our portfolio. Please check back soon!</p>
              <div className="mt-2">
                <Link href="/" className="btn btn-danger btn-sm rounded-pill px-4 fw-bold">Back to Home</Link>
              </div>
            </div>
          ) : (
            <div className="row g-4 text-start">
              {cases.map((item, index) => {
                const imgUrl = item.imageUrl || item.image || '/images/servicesman.webp';
                const snippet = item.description ? item.description.slice(0, 95) + '...' : '';

                return (
                  <div className="col-lg-4 col-md-6" key={item.id} data-aos="fade-up" data-aos-delay={index * 100}>
                    <div className="card border-0 glass-card h-100 shadow-sm overflow-hidden d-flex flex-column rounded-4 bg-white">
                      
                      <div className="position-relative overflow-hidden" style={{ height: '230px' }}>
                        <Link href={`/case/${item.id}`}>
                          <img 
                            src={imgUrl} 
                            alt={item.title} 
                            className="w-100 h-100 object-fit-cover transition-transform duration-500 hover-scale"
                            loading="lazy"
                          />
                        </Link>
                        <span className="position-absolute top-0 end-0 m-3 badge bg-danger text-white px-3 py-2 rounded-pill shadow-sm">
                          ${item.price || '0'}
                        </span>
                      </div>

                      <div className="p-4 d-flex flex-column flex-grow-1 justify-content-between bg-white bg-opacity-75">
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <span className="badge bg-danger bg-opacity-10 text-danger px-3 py-1 rounded-pill small fw-semibold">
                              {item.category || 'Repair'}
                            </span>
                            <span className="text-muted small d-flex align-items-center gap-1">
                              <Calendar size={13} /> {item.startDate || 'Recent'}
                            </span>
                          </div>

                          <h4 className="fs-6 fw-bold mb-2">
                            <Link href={`/case/${item.id}`} className="text-dark text-decoration-none hover-danger">
                              {item.title}
                            </Link>
                          </h4>

                          <p className="text-muted small mb-3">{snippet}</p>
                        </div>

                        <div className="border-top pt-3 border-light-subtle d-flex align-items-center justify-content-between mt-auto">
                          <span className="text-secondary small d-flex align-items-center gap-1">
                            <User size={13} /> {item.client || 'Client'}
                          </span>
                          <Link href={`/case/${item.id}`} className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold d-flex align-items-center gap-1 shadow-sm">
                            View Case <ArrowRight size={14} />
                          </Link>
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
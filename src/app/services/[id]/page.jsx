// src/app/services/[id]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { dbService } from '@/services/dbService';
import { ArrowLeft, CheckCircle2, PhoneCall, ShieldCheck, Wrench, Calendar, Star, Award } from 'lucide-react';
import Link from 'next/link';
import Header from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState('');

  useEffect(() => {
    async function fetchDetail() {
      const res = await dbService.getById('services', id);
      if (res.success && res.data) {
        setService(res.data);
        const images = res.data.imageUrls || (res.data.imageUrl ? [res.data.imageUrl] : []);
        if (images.length > 0) setActiveImg(images[0]);
      }
      setLoading(false);
    }
    if (id) fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: '60vh' }}>
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!service) {
    return (
      <>
        <Header />
        <div className="container py-5 text-center" style={{ minHeight: '60vh' }}>
          <div className="card border-0 shadow-sm rounded-4 p-5 max-w-md mx-auto bg-white">
            <h4 className="fw-bold text-dark mb-2">Service Not Found</h4>
            <p className="text-muted small mb-4">The service you are looking for might have been removed or updated.</p>
            <Link href="/services" className="btn btn-dark btn-sm rounded-pill px-4 py-2 fw-bold w-fit mx-auto shadow-none">
              Back to Services
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const pics = service.imageUrls?.length > 0 ? service.imageUrls : service.imageUrl ? [service.imageUrl] : [];
  const displayImage = activeImg || pics[0];
  const serviceDesc = service.desc || service.description;

  return (
    <>
      <Header />
      
      <main className="py-4 bg-light min-vh-100">
        <div className="container px-2 px-md-3">
          
          {/* Breadcrumb / Back Button */}
          <div className="mb-3">
            <button 
              onClick={() => router.back()} 
              className="btn btn-white bg-white border btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-1 shadow-sm text-dark fw-bold"
            >
              <ArrowLeft size={14} /> Back
            </button>
          </div>

          {/* Main Product/Service Info Section (Flipkart / E-commerce Grid Style) */}
          <div className="row g-4 mb-5">
            
            {/* Left: Image Gallery (Flipkart Style Thumbnails + Main View) */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm rounded-4 p-3 bg-white sticky-lg-top" style={{ top: '90px' }}>
                <div className="position-relative rounded-3 overflow-hidden bg-light mb-3" style={{ height: '320px' }}>
                  {displayImage ? (
                    <img src={displayImage} alt={service.title} className="w-100 h-100 object-fit-cover transition-all" />
                  ) : (
                    <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted small">
                      No Image Available
                    </div>
                  )}
                  <span className="position-absolute top-0 start-0 m-2 badge bg-danger text-white px-2 py-1 rounded-pill" style={{ fontSize: '10px' }}>
                    Certified Workshop
                  </span>
                </div>

                {/* Thumbnails Row */}
                {pics.length > 1 && (
                  <div className="d-flex gap-2 overflow-auto pb-1 scrollbar-none">
                    {pics.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImg(img)}
                        className={`border-0 rounded-2 p-0 overflow-hidden flex-shrink-0 bg-light ${displayImage === img ? 'ring-danger' : 'opacity-75'}`}
                        style={{ width: '64px', height: '64px', border: displayImage === img ? '2px solid #e11d48' : '1px solid #dee2e6' }}
                      >
                        <img src={img} alt="" className="w-100 h-100 object-fit-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Details, Model Badge, Pricing & CTAs */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-4 bg-white h-100 d-flex flex-column justify-content-between">
                <div>
                  {/* Model & Rating header */}
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="badge bg-danger bg-opacity-10 text-danger fw-bold px-3 py-1.5 rounded-pill" style={{ fontSize: '0.75rem' }}>
                      {service.model || 'Mercedes-Benz Specialist'}
                    </span>
                    <div className="d-flex align-items-center gap-1 text-warning" style={{ fontSize: '12px' }}>
                      <Star size={14} fill="#f59e0b" />
                      <span className="fw-bold text-dark">4.9 / 5.0 (Certified)</span>
                    </div>
                  </div>

                  {/* SEO Optimized Title */}
                  <h1 className="fw-bold text-dark mb-3" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.8rem)', lineHeight: '1.3' }}>
                    {service.title}
                  </h1>

                  {service.price && (
                    <div className="mb-3">
                      <span className="text-muted small me-2">Estimated Service Cost:</span>
                      <span className="text-danger fw-black fs-4">${service.price}</span>
                    </div>
                  )}

                  <hr className="text-muted opacity-25 my-3" />

                  {/* Description */}
                  <div className="mb-4">
                    <h6 className="fw-bold text-dark mb-2" style={{ fontSize: '0.9rem' }}>Service Overview</h6>
                    <p className="text-muted mb-0" style={{ fontSize: '0.85rem', lineHeight: '1.7' }}>
                      {serviceDesc || 'Professional diagnostic and repair services tailored specifically for Mercedes-Benz and AMG vehicles using genuine OEM equipment.'}
                    </p>
                  </div>

                  {/* Workshop Standards Box */}
                  <div className="bg-light p-3 rounded-3 mb-4 border">
                    <h6 className="fw-bold text-dark mb-2" style={{ fontSize: '0.85rem' }}>Why Choose Our Garage?</h6>
                    <ul className="list-unstyled d-flex flex-column gap-2 mb-0 small text-secondary">
                      <li className="d-flex align-items-center gap-2">
                        <CheckCircle2 size={15} className="text-danger flex-shrink-0" /> Genuine OEM parts & advanced diagnostics.
                      </li>
                      <li className="d-flex align-items-center gap-2">
                        <CheckCircle2 size={15} className="text-danger flex-shrink-0" /> Factory-trained luxury mechanics.
                      </li>
                      <li className="d-flex align-items-center gap-2">
                        <CheckCircle2 size={15} className="text-danger flex-shrink-0" /> Transparent pricing & warranty included.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Desktop Action Buttons */}
                <div className="d-none d-md-flex flex-wrap gap-2 pt-3 border-top mt-auto">
                  <a href="tel:+971567888808" className="btn btn-danger rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2 flex-grow-1 justify-content-center shadow-sm" style={{ fontSize: '0.85rem' }}>
                    <PhoneCall size={16} /> Call Expert: +971 56 788 8808
                  </a>
                  <Link href="/contact-us" className="btn btn-dark rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2 justify-content-center shadow-sm" style={{ fontSize: '0.85rem' }}>
                    <Calendar size={16} /> Book Slot
                  </Link>
                </div>

              </div>
            </div>

          </div>

          {/* Garage Views / Real Workshop Gallery */}
          {pics.length > 0 && (
            <div className="mt-5 pt-3">
              <div className="text-center mb-4">
                <h3 className="fw-bold text-dark" style={{ fontSize: '1.25rem' }}>Workshop Action & Recent Work</h3>
                <p className="text-muted small">Live captured imagery from our service bays during {service.title}.</p>
              </div>

              <div className="row g-3">
                {pics.map((imgUrl, index) => (
                  <div className="col-6 col-md-4" key={index}>
                    <div className="card border-0 shadow-sm rounded-3 overflow-hidden bg-white" style={{ height: '180px' }}>
                      <img src={imgUrl} alt={`Workshop view ${index + 1}`} className="w-100 h-100 object-fit-cover" loading="lazy" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Mobile Sticky Bottom Action Bar (Flipkart App Style Conversion Booster) */}
      <div className="d-md-none fixed-bottom bg-white border-top p-2 shadow-lg d-flex align-items-center gap-2" style={{ zIndex: 1040 }}>
        <a href="tel:+971567888808" className="btn btn-outline-danger rounded-pill py-2 px-3 fw-bold flex-grow-1 d-flex align-items-center justify-content-center gap-1 shadow-none" style={{ fontSize: '0.78rem' }}>
          <PhoneCall size={14} /> Call Now
        </a>
        <Link href="/contact-us" className="btn btn-danger rounded-pill py-2 px-3 fw-bold flex-grow-1 d-flex align-items-center justify-content-center gap-1 shadow-none" style={{ fontSize: '0.78rem' }}>
          <Calendar size={14} /> Book Service
        </Link>
      </div>

      <Footer />

      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}
// src/app/case/[id]/page.jsx
'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CheckCircle2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { dbService } from '@/services/dbService';
import GallerySection from '@/components/Gallery';

export default function CaseDetailPage({ params }) {
  const unwrappedParams = use(params);
  const caseId = unwrappedParams.id;

  const [caseData, setCaseData] = useState(null);
  const [galleryAlbums, setGalleryAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 40 });
    fetchCaseDetails();
  }, [caseId]);

  const fetchCaseDetails = async () => {
    const res = await dbService.getAll('cases');
    if (res.success && res.data) {
      const current = res.data.find((item) => item.id === caseId);
      if (current) setCaseData(current);
    }

    // Fetch all gallery albums stably without random shuffling
    const gRes = await dbService.getAll('gallery');
    if (gRes.success && gRes.data) {
      setGalleryAlbums(gRes.data);
    }

    setLoading(false);
  };

  if (loading) {
    return <div className="text-center py-5 text-secondary fw-bold">Loading Case Study...</div>;
  }

  if (!caseData) {
    return (
      <div className="container py-5 text-center">
        <h3 className="fw-bold text-dark mb-3">Case Study Not Found</h3>
        <Link href="/case" className="btn btn-danger rounded-pill px-4 fw-bold">Back to Cases</Link>
      </div>
    );
  }

  const mainImage = caseData.imageUrl || caseData.image || '/images/servicesman.avif';

  return (
    <>
      <Header />

      <main className="bg-light py-5">
        <div className="container">
          
          <div className="mb-4 text-start">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-2 small">
                <li className="breadcrumb-item"><Link href="/" className="text-danger text-decoration-none">Home</Link></li>
                <li className="breadcrumb-item"><Link href="/case" className="text-danger text-decoration-none">Cases</Link></li>
                <li className="breadcrumb-item active text-muted" aria-current="page">{caseData.title || 'Case Detail'}</li>
              </ol>
            </nav>
            <h1 className="fs-3 fw-bold text-dark">{caseData.title}</h1>
          </div>

          <div className="card border-0 glass-card p-3 rounded-4 shadow-sm bg-white mb-4">
            <div className="rounded-4 overflow-hidden position-relative" style={{ height: '420px' }}>
              <img src={mainImage} alt="Case Hero" className="w-100 h-100 object-fit-cover" />
            </div>

            <div className="row g-3 mt-3 pt-3 border-top border-light-subtle text-start px-2">
              <div className="col-6 col-md-3">
                <span className="text-muted small d-block">Clients:</span>
                <span className="fw-bold text-dark">{caseData.client || 'JOHN DOE'}</span>
              </div>
              <div className="col-6 col-md-3">
                <span className="text-muted small d-block">Category:</span>
                <span className="fw-bold text-dark">{caseData.category || 'Repair'}</span>
              </div>
              <div className="col-6 col-md-3">
                <span className="text-muted small d-block">Start Date:</span>
                <span className="fw-bold text-dark">{caseData.startDate || 'December 13, 2023'}</span>
              </div>
              <div className="col-6 col-md-3">
                <span className="text-muted small d-block">Price:</span>
                <span className="fw-bold text-danger fs-5">${caseData.price || '584'}</span>
              </div>
            </div>
          </div>

          <div className="card border-0 glass-card p-4 rounded-4 shadow-sm bg-white mb-4 text-start">
            <p className="text-secondary small lh-lg mb-0" style={{ whiteSpace: 'pre-line' }}>
              {caseData.description}
            </p>
          </div>

          <div className="card border-0 glass-card p-4 rounded-4 shadow-sm bg-white mb-4 text-start">
            <h3 className="fs-5 fw-bold text-dark mb-3">WHAT WE'VE DONE</h3>
            <div className="row g-2 mb-3">
              {[
                'Replaced Clogged Engine Air Filters',
                'Installed New Oil Filters',
                'Repaired & Replaced Fuel Filters',
                'Upgraded Cabin Air Filters',
                'Serviced Transmission Filters',
                'Conducted Full Filter Inspections'
              ].map((item, idx) => (
                <div className="col-md-6" key={idx}>
                  <div className="d-flex align-items-center gap-2 text-secondary small py-1">
                    <CheckCircle2 size={16} className="text-danger flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card border-0 glass-card p-4 rounded-4 shadow-sm bg-white mb-4 text-start">
            <h3 className="fs-5 fw-bold text-dark mb-2">PROJECT RESULTS</h3>
            <p className="text-secondary small lh-lg mb-0">
              {caseData.resultsText || 'Our services have significantly improved engine performance, fuel efficiency, and overall driving comfort.'}
            </p>
          </div>

          {/* Project Gallery Albums Section */}
          <GallerySection albums={galleryAlbums.length > 0 ? galleryAlbums : [{ id: '1', title: caseData.title, images: [mainImage], coverImage: mainImage }]} />

        </div>
      </main>

      <Footer />
    </>
  );
}
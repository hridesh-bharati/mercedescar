// src/app/services/[id]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { dbService } from '@/services/dbService';
import { ArrowLeft, CheckCircle2, PhoneCall, ShieldCheck, Wrench } from 'lucide-react';
import Link from 'next/link';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      const res = await dbService.getById('services', id);
      if (res.success) {
        setService(res.data);
      }
      setLoading(false);
    }
    if (id) fetchDetail();
  }, [id]);

  if (loading) {
    return <div className="text-center py-5 fw-bold text-secondary">Loading Service Details...</div>;
  }

  if (!service) {
    return (
      <div className="container py-5 text-center">
        <h4 className="fw-bold text-dark">Service not found</h4>
        <Link href="/services" className="btn btn-dark btn-sm rounded-pill mt-3">Back to Services</Link>
      </div>
    );
  }

  const pics = service.imageUrls || (service.imageUrl ? [service.imageUrl] : []);

  return (
    <div className="container py-5 min-vh-100">
      <button onClick={() => router.back()} className="btn btn-outline-dark btn-sm rounded-pill px-3 mb-4 d-inline-flex align-items-center gap-1 shadow-sm">
        <ArrowLeft size={16} /> Back to Services
      </button>

      {/* Top Banner / Details Section */}
      <div className="row g-5 mb-5 align-items-center">
        <div className="col-lg-6">
          <div className="card border-0 shadow rounded-4 overflow-hidden bg-white" style={{ height: '400px' }}>
            {pics[0] ? (
              <img src={pics[0]} alt={service.title} className="w-100 h-100 object-fit-cover" />
            ) : (
              <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-light text-muted">No Image Available</div>
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
            <span className="badge bg-danger bg-opacity-10 text-danger fw-bold px-3 py-2 rounded-pill d-inline-block mb-3" style={{ width: 'fit-content' }}>
              {service.model || 'Mercedes Specialist'}
            </span>

            <h1 className="fw-bold text-dark display-6 mb-3" style={{ fontSize: '2rem' }}>{service.title}</h1>
            <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>{service.desc}</p>

            <div className="bg-light p-4 rounded-4 mb-4">
              <h6 className="fw-bold text-dark mb-3">Workshop Guarantee & Standards</h6>
              <ul className="list-unstyled d-flex flex-column gap-2 mb-0 small text-secondary">
                <li className="d-flex align-items-center gap-2"><CheckCircle2 size={16} className="text-danger" /> Genuine OEM parts and high-end diagnostic tools.</li>
                <li className="d-flex align-items-center gap-2"><CheckCircle2 size={16} className="text-danger" /> Certified expert technicians for luxury vehicles.</li>
                <li className="d-flex align-items-center gap-2"><CheckCircle2 size={16} className="text-danger" /> Transparent inspection and custom price quotes.</li>
              </ul>
            </div>

            <div className="d-flex flex-wrap gap-3">
              <a href="tel:+971567888808" className="btn btn-danger rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2 shadow-sm">
                <PhoneCall size={16} /> Call Now: +971 56 788 8808
              </a>
              <Link href="/contact-us" className="btn btn-dark rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2 shadow-sm">
                Book Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Garage Views / Service Gallery Section (Multiple Photos Grid) */}
      {pics.length > 0 && (
        <div className="mt-5 pt-4 border-top">
          <div className="text-center mb-4">
            <h3 className="fw-bold text-dark">Garage Views & Recent Work</h3>
            <p className="text-muted small">Actual shots from our workshop during {service.title}.</p>
          </div>

          <div className="row g-4">
            {pics.map((imgUrl, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white" style={{ height: '260px' }}>
                  <img src={imgUrl} alt="Workshop view" className="w-100 h-100 object-fit-cover hover-zoom" style={{ transition: 'transform 0.4s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
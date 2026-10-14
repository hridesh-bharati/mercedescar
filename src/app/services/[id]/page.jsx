// src/app/services/[id]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { dbService } from '@/services/dbService';
import { ArrowLeft, Wrench, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ServiceDetailPage() {
  const params = useParams();
  const { id } = params;

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServiceDetail() {
      if (id) {
        const res = await dbService.getById('services', id);
        if (res.success) {
          setService(res.data);
        }
      }
      setLoading(false);
    }
    fetchServiceDetail();
  }, [id]);

  if (loading) {
    return <div className="text-center py-5 text-secondary fw-bold">Loading Service Details...</div>;
  }

  if (!service) {
    return (
      <div className="container py-5 text-center">
        <h3 className="fw-bold text-dark mb-3">Service Not Found</h3>
        <p className="text-muted mb-4">The service you are looking for does not exist or has been removed.</p>
        <Link href="/services" className="btn btn-danger rounded-pill px-4 fw-bold">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Link href="/services" className="btn btn-outline-secondary btn-sm rounded-pill px-3 mb-4 d-inline-flex align-items-center gap-1">
        <ArrowLeft size={16} /> Back to Services
      </Link>

      <div className="row g-5 align-items-center">
        <div className="col-lg-6">
          {service.imageUrl ? (
            <img 
              src={service.imageUrl} 
              alt={service.title} 
              className="img-fluid rounded-4 shadow-sm w-100 object-fit-cover" 
              style={{ maxHeight: '400px' }} 
            />
          ) : (
            <div className="bg-light rounded-4 d-flex align-items-center justify-content-center text-danger" style={{ height: '350px' }}>
              <Wrench size={64} />
            </div>
          )}
        </div>

        <div className="col-lg-6">
          <span className="badge bg-danger bg-opacity-10 text-danger px-3 py-2 rounded-pill fw-bold mb-3">
            German Auto Specialist
          </span>
          <h1 className="fw-bold text-dark mb-3">{service.title}</h1>
          {service.price && (
            <h3 className="text-danger fw-bold mb-3">Price: ${service.price}</h3>
          )}
          <p className="text-muted mb-4 lh-lg">{service.desc || service.description}</p>

          <div className="card border-0 shadow-sm rounded-4 p-4 bg-light mb-4">
            <h5 className="fw-bold text-dark mb-3">Why Choose Our Service?</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li className="d-flex align-items-center gap-2 text-secondary">
                <CheckCircle2 size={18} className="text-success" /> Genuine OEM parts and high-end diagnostic tools.
              </li>
              <li className="d-flex align-items-center gap-2 text-secondary">
                <ShieldCheck size={18} className="text-success" /> Certified expert technicians for luxury vehicles.
              </li>
            </ul>
          </div>

          <Link href="/contact-us" className="btn btn-danger rounded-pill px-5 py-3 fw-bold shadow-sm">
            Book This Service Now
          </Link>
        </div>
      </div>
    </div>
  );
}
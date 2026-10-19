// src/app/models/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { dbService } from '@/services/dbService';
import { Search, Car, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CarModelsCatalog() {
  const [models, setModels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchModels() {
      const res = await dbService.getAll('car_models');
      if (res.success && res.data) {
        setModels(res.data);
      }
      setLoading(false);
    }
    fetchModels();
  }, []);

  // Filter models based on live search query
  const filteredModels = models.filter((item) => 
    item.modelName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.maker?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-5 fw-bold text-secondary">Loading Car Catalog...</div>;
  }

  return (
    <div className="container py-5 min-vh-100">
      {/* Header & Search Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-dark display-6 mb-2">Mercedes-Benz Model Catalog</h1>
        <p className="text-muted small">Explore our database of luxury car models, specifications, and expert service info.</p>
        
        <div className="row justify-content-center mt-4">
          <div className="col-12 col-md-6">
            <div className="input-group shadow-sm rounded-pill overflow-hidden border">
              <span className="input-group-text bg-white border-0 ps-4">
                <Search size={18} className="text-muted" />
              </span>
              <input 
                type="text" 
                className="form-control border-0 py-3 small shadow-none" 
                placeholder="Search model (e.g. G63, S500, GLC)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid Display */}
      {filteredModels.length === 0 ? (
        <div className="text-center py-5 card border-0 shadow-sm rounded-4 p-5 bg-white text-muted">
          <Car size={40} className="text-secondary opacity-50 mb-2" />
          <h6 className="fw-bold text-dark">No car models found</h6>
          <p className="small mb-0">Try searching with a different keyword or add models from admin panel.</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredModels.map((item) => (
            <div className="col-12 col-md-6 col-lg-4" key={item.id}>
              <div className="card border-0 shadow-sm rounded-4 h-100 bg-white overflow-hidden d-flex flex-column">
                {item.imageUrl ? (
                  <div className="position-relative" style={{ height: '220px' }}>
                    <img src={item.imageUrl} alt={item.modelName} className="w-100 h-100 object-fit-cover" />
                    <span className="position-absolute top-0 end-0 m-3 badge bg-dark text-white px-3 py-2 rounded-pill small">
                      {item.maker || 'Mercedes'}
                    </span>
                  </div>
                ) : (
                  <div className="bg-light d-flex align-items-center justify-content-center text-muted" style={{ height: '220px' }}>
                    <Car size={48} className="opacity-25" />
                  </div>
                )}

                <div className="card-body p-4 d-flex flex-column justify-content-between">
                  <div>
                    <h4 className="fw-bold text-dark fs-5 mb-2">{item.modelName}</h4>
                    <p className="text-muted small mb-3" style={{ lineHeight: '1.6' }}>{item.desc}</p>
                  </div>
                  
                  <div className="pt-3 border-top mt-auto">
                    <Link href="/contact-us" className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold d-inline-flex align-items-center gap-1">
                      Inquire Service <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
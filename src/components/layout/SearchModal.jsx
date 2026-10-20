// src/components/layout/SearchModal.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, Wrench, Car, FileText, ArrowRight } from 'lucide-react';
import { dbService } from '@/services/dbService';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [cacheData, setCacheData] = useState({ services: [], models: [], blogs: [] });
  const [results, setResults] = useState({ services: [], models: [], blogs: [] });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    async function prefetchDatabase() {
      setLoading(true);
      const [servicesRes, modelsRes, blogsRes] = await Promise.all([
        dbService.getAll('services'),
        dbService.getAll('car_models'),
        dbService.getAll('blogs')
      ]);

      setCacheData({
        services: servicesRes.success ? servicesRes.data : [],
        models: modelsRes.success ? modelsRes.data : [],
        blogs: blogsRes.success ? blogsRes.data : []
      });
      setLoading(false);
    }

    if (isOpen) {
      prefetchDatabase();
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
    }

    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ services: [], models: [], blogs: [] });
      return;
    }

    const q = query.toLowerCase();

    const matchedServices = cacheData.services.filter(
      item => item.title?.toLowerCase().includes(q) || item.desc?.toLowerCase().includes(q)
    ).slice(0, 5);

    const matchedModels = cacheData.models.filter(
      item => item.modelName?.toLowerCase().includes(q) || item.desc?.toLowerCase().includes(q)
    ).slice(0, 5);

    const matchedBlogs = cacheData.blogs.filter(
      item => item.title?.toLowerCase().includes(q) || item.content?.toLowerCase().includes(q)
    ).slice(0, 3);

    setResults({ services: matchedServices, models: matchedModels, blogs: matchedBlogs });
  }, [query, cacheData]);

  if (!isOpen) return null;

  const totalResults = results.services.length + results.models.length + results.blogs.length;

  return (
    <div 
      className="search-overlay-modal fixed-top w-100 h-100 d-flex flex-column bg-white" 
      style={{ zIndex: 99999, position: 'fixed', top: 0, left: 0 }}
    >
      {/* Top Bar with Input & Close */}
      <div className="bg-white shadow-sm py-3 px-3 px-md-4 border-bottom">
        <div className="container d-flex align-items-center gap-2 gap-md-3">
          <Search size={20} className="text-danger flex-shrink-0" />
          <div className="flex-grow-1 min-width-0">
            <input
              ref={inputRef}
              type="text"
              className="form-control border-0 shadow-none fs-6 fs-md-5 bg-transparent text-dark w-100"
              placeholder="Search Mercedes services, models..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {query && (
            <button className="btn btn-light rounded-pill px-2 px-md-3 py-1 small text-muted flex-shrink-0" onClick={() => setQuery('')}>
              Clear
            </button>
          )}
          <button className="btn btn-dark rounded-circle p-2 d-flex align-items-center justify-content-center flex-shrink-0" onClick={onClose} style={{ width: '38px', height: '38px' }}>
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Results Container */}
      <div className="container flex-grow-1 overflow-auto py-4" style={{ maxWidth: '800px' }}>
        {loading && cacheData.services.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <div className="spinner-border text-danger spinner-border-sm me-2" role="status"></div>
            <span>Fetching...</span>
          </div>
        ) : !query.trim() ? (
          <div className="text-center py-5 text-muted">
            <p className="mb-0">Start typing to search instantly across all workshop services, models, and blogs.</p>
          </div>
        ) : totalResults === 0 ? (
          <div className="text-center py-5 text-dark card bg-light border-0 rounded-4 p-4 p-md-5">
            <h5 className="fw-bold mb-1">No results found for "{query}"</h5>
            <p className="small text-muted mb-0">Try searching for keywords like "Engine", "G63", "Brakes", or "Airmatic".</p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-4 pb-5">
            
            {/* Services Results */}
            {results.services.length > 0 && (
              <div>
                <h6 className="text-secondary small fw-bold text-uppercase tracking-wider mb-2">Services ({results.services.length})</h6>
                <div className="list-group rounded-4 overflow-hidden shadow-sm border">
                  {results.services.map((item) => (
                    <Link
                      key={item.id}
                      href={`/services/${item.id}`}
                      onClick={onClose}
                      className="list-group-item list-group-item-action p-3 d-flex align-items-center justify-content-between bg-white text-decoration-none border-bottom"
                    >
                      <div className="d-flex align-items-center gap-3 min-width-0">
                        <div className="bg-danger bg-opacity-10 text-danger p-2 rounded-3 flex-shrink-0">
                          <Wrench size={18} />
                        </div>
                        <div className="min-width-0">
                          <h6 className="fw-bold text-dark mb-0 small text-truncate">{item.title}</h6>
                          <p className="text-muted mb-0 small text-truncate" style={{ fontSize: '0.75rem' }}>{item.desc}</p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-muted flex-shrink-0 ms-2" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Car Models Results */}
            {results.models.length > 0 && (
              <div>
                <h6 className="text-secondary small fw-bold text-uppercase tracking-wider mb-2">Car Models ({results.models.length})</h6>
                <div className="list-group rounded-4 overflow-hidden shadow-sm border">
                  {results.models.map((item) => (
                    <Link
                      key={item.id}
                      href="/models"
                      onClick={onClose}
                      className="list-group-item list-group-item-action p-3 d-flex align-items-center justify-content-between bg-white text-decoration-none border-bottom"
                    >
                      <div className="d-flex align-items-center gap-3 min-width-0">
                        <div className="bg-dark bg-opacity-10 text-dark p-2 rounded-3 flex-shrink-0">
                          <Car size={18} />
                        </div>
                        <div className="min-width-0">
                          <h6 className="fw-bold text-dark mb-0 small text-truncate">{item.modelName}</h6>
                          <p className="text-muted mb-0 small text-truncate" style={{ fontSize: '0.75rem' }}>{item.desc}</p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-muted flex-shrink-0 ms-2" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Blogs Results */}
            {results.blogs.length > 0 && (
              <div>
                <h6 className="text-secondary small fw-bold text-uppercase tracking-wider mb-2">Blog Posts ({results.blogs.length})</h6>
                <div className="list-group rounded-4 overflow-hidden shadow-sm border">
                  {results.blogs.map((item) => (
                    <Link
                      key={item.id}
                      href="/blogs"
                      onClick={onClose}
                      className="list-group-item list-group-item-action p-3 d-flex align-items-center justify-content-between bg-white text-decoration-none border-bottom"
                    >
                      <div className="d-flex align-items-center gap-3 min-width-0">
                        <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-3 flex-shrink-0">
                          <FileText size={18} />
                        </div>
                        <div className="min-width-0">
                          <span className="badge bg-danger bg-opacity-10 text-danger mb-1" style={{ fontSize: '0.65rem' }}>{item.category}</span>
                          <h6 className="fw-bold text-dark mb-0 small text-truncate">{item.title}</h6>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-muted flex-shrink-0 ms-2" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
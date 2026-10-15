// src/components/GallerySection.jsx
'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function GallerySection({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(null);

  if (!images || images.length === 0) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="card border-0 glass-card p-4 rounded-4 shadow-sm bg-white text-start">
      <h3 className="fs-5 fw-bold text-dark mb-1">PROJECT GALLERY</h3>
      <p className="text-muted small mb-4">Click on any image to open the full-screen interactive slider.</p>

      <div className="row g-3">
        {images.map((imgUrl, gIdx) => (
          <div className="col-md-4 col-sm-6" key={gIdx}>
            <div 
              className="rounded-4 overflow-hidden shadow-sm position-relative cursor-pointer" 
              style={{ height: '180px', cursor: 'pointer' }}
              onClick={() => setCurrentIndex(gIdx)}
            >
              <img src={imgUrl} alt={`Gallery ${gIdx}`} className="w-100 h-100 object-fit-cover transition-transform duration-300" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal with Slider Buttons */}
      {currentIndex !== null && (
        <div className="modal show fade d-block bg-dark bg-opacity-85" tabIndex="-1" onClick={() => setCurrentIndex(null)}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-transparent border-0 position-relative">
              
              {/* Close Button */}
              <button 
                type="button" 
                className="btn btn-dark rounded-circle position-absolute top-0 end-0 m-3 z-3 text-white p-2 d-flex align-items-center justify-content-center shadow" 
                onClick={() => setCurrentIndex(null)}
              >
                <X size={20} />
              </button>

              {/* Prev Button */}
              <button 
                className="btn btn-dark rounded-circle position-absolute start-0 top-50 translate-middle-y ms-2 z-3 text-white p-2 d-flex align-items-center justify-content-center shadow"
                onClick={handlePrev}
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next Button */}
              <button 
                className="btn btn-dark rounded-circle position-absolute end-0 top-50 translate-middle-y me-2 z-3 text-white p-2 d-flex align-items-center justify-content-center shadow"
                onClick={handleNext}
              >
                <ChevronRight size={24} />
              </button>

              {/* Image Preview */}
              <div className="modal-body text-center p-0 d-flex align-items-center justify-content-center" onClick={(e) => e.stopPropagation()}>
                <img 
                  src={images[currentIndex]} 
                  alt="Fullscreen slider preview" 
                  className="img-fluid rounded-4 shadow-lg object-fit-contain" 
                  style={{ maxHeight: '80vh', maxWidth: '85vw' }}
                />
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
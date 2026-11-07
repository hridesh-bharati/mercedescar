// src/components/GalleryClient.jsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, Layers } from 'lucide-react';

export default function GalleryClient({ albums }) {
  const [activeAlbumImages, setActiveAlbumImages] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ✅ Keyboard nav + scroll lock
  useEffect(() => {
    if (!activeAlbumImages) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveAlbumImages(null);
      } else if (e.key === 'ArrowLeft' && activeAlbumImages.length > 1) {
        setCurrentImageIndex((prev) =>
          prev === 0 ? activeAlbumImages.length - 1 : prev - 1
        );
      } else if (e.key === 'ArrowRight' && activeAlbumImages.length > 1) {
        setCurrentImageIndex((prev) =>
          prev === activeAlbumImages.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeAlbumImages]);

  const openAlbumModal = (imagesArray) => {
    if (imagesArray && imagesArray.length > 0) {
      setActiveAlbumImages(imagesArray);
      setCurrentImageIndex(0);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? activeAlbumImages.length - 1 : prev - 1
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === activeAlbumImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <div className="row g-4">
        {albums.map((album, index) => {
          const coverImg =
            album.coverImage ||
            (album.images && album.images[0]) ||
            '/images/servicesman.avif';
          const totalPhotos = album.images ? album.images.length : 1;

          return (
            <div
              className="col-lg-4 col-md-6"
              key={album.id}
              data-anim="up"
              data-anim-delay={Math.min(index * 100, 500)}
            >
              <button
                type="button"
                className="card border-0 shadow-sm rounded-4 overflow-hidden position-relative h-100 w-100 text-start p-0"
                style={{ cursor: 'pointer', background: 'transparent' }}
                onClick={() => openAlbumModal(album.images || [coverImg])}
                aria-label={`View ${album.title || 'Mercedes gallery'} album with ${totalPhotos} photos`}
              >
                <div className="position-relative" style={{ height: '240px' }}>
                  <Image
                    src={coverImg}
                    alt={`${album.title || 'Mercedes workshop'} — Mercedes-Benz workshop in Al Quoz Dubai`}
                    fill
                    className="object-fit-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                  />
                  <span className="position-absolute top-0 end-0 m-3 badge bg-dark bg-opacity-75 text-white px-3 py-2 rounded-pill small d-flex align-items-center gap-1 shadow-sm">
                    <Layers size={14} aria-hidden="true" /> {totalPhotos} Photos
                  </span>
                </div>
                <div className="p-3 bg-white text-start">
                  <h3 className="fw-bold text-dark mb-1 fs-6">
                    {album.title}
                  </h3>
                  <span
                    className="text-muted small"
                    style={{ fontSize: '0.75rem' }}
                  >
                    {album.date} — Click to view all
                  </span>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activeAlbumImages && (
        <div
          className="modal show fade d-block bg-dark bg-opacity-85"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          aria-label="Mercedes workshop gallery image viewer"
          onClick={() => setActiveAlbumImages(null)}
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content bg-transparent border-0 position-relative d-flex flex-row align-items-center justify-content-between px-md-5">
              <button
                type="button"
                className="btn btn-dark rounded-circle position-absolute top-0 end-0 m-4 z-3 text-white p-2 d-flex align-items-center justify-content-center shadow"
                onClick={() => setActiveAlbumImages(null)}
                aria-label="Close gallery"
              >
                <X size={20} aria-hidden="true" />
              </button>

              {activeAlbumImages.length > 1 && (
                <button
                  type="button"
                  className="btn btn-dark rounded-circle text-white p-3 d-flex align-items-center justify-content-center shadow flex-shrink-0 z-3"
                  onClick={handlePrev}
                  aria-label="Previous image"
                  style={{ width: '50px', height: '50px' }}
                >
                  <ChevronLeft size={28} aria-hidden="true" />
                </button>
              )}

              <div
                className="modal-body text-center p-0 flex-grow-1 d-flex flex-column align-items-center justify-content-center mx-3"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="position-relative w-100 d-flex justify-content-center"
                  style={{ height: '75vh' }}
                >
                  <Image
                    src={activeAlbumImages[currentImageIndex]}
                    alt={`Mercedes workshop gallery image ${currentImageIndex + 1} of ${activeAlbumImages.length}`}
                    fill
                    className="rounded-4 shadow-lg object-fit-contain"
                    sizes="90vw"
                  />
                </div>
                <span
                  className="badge bg-dark bg-opacity-75 text-white px-3 py-1 rounded-pill small mt-2"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {currentImageIndex + 1} / {activeAlbumImages.length}
                </span>
              </div>

              {activeAlbumImages.length > 1 && (
                <button
                  type="button"
                  className="btn btn-dark rounded-circle text-white p-3 d-flex align-items-center justify-content-center shadow flex-shrink-0 z-3"
                  onClick={handleNext}
                  aria-label="Next image"
                  style={{ width: '50px', height: '50px' }}
                >
                  <ChevronRight size={28} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}


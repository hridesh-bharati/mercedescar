'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Layers } from 'lucide-react';
import { dbService } from '@/services/dbService';

export default function Gallery() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [activeAlbumImages, setActiveAlbumImages] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    const res = await dbService.getAll('gallery');
    if (res.success && res.data) {
      setAlbums(res.data);
    }
    setLoading(false);
  };

  const openAlbumModal = (imagesArray) => {
    if (imagesArray && imagesArray.length > 0) {
      setActiveAlbumImages(imagesArray);
      setCurrentImageIndex(0);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? activeAlbumImages.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === activeAlbumImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <main className="bg-light py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="text-danger fw-bold small text-uppercase tracking-wider">Our Showcase</span>
            <h1 className="fw-bold display-5 text-dark mt-1">Workshop Photo Gallery</h1>
            <p className="text-secondary small">Explore our state-of-the-art facility and expert mechanics in action.</p>
          </div>

          {loading ? (
            <div className="text-center py-5 text-secondary fw-bold">Loading Gallery...</div>
          ) : albums.length === 0 ? (
            <div className="text-center py-5 text-muted card border-0 shadow-sm rounded-4 p-5 bg-white">
              <h5 className="fw-bold text-dark mb-2">No Gallery Albums Found</h5>
              <p className="small mb-0">Check back later for workshop updates.</p>
            </div>
          ) : (
            <div className="row g-4">
              {albums.map((album) => {
                const coverImg = album.coverImage || (album.images && album.images[0]) || '/images/servicesman.webp';
                const totalPhotos = album.images ? album.images.length : 1;

                return (
                  <div className="col-lg-4 col-md-6" key={album.id}>
                    <div 
                      className="card border-0 shadow-sm rounded-4 overflow-hidden position-relative h-100 cursor-pointer"
                      style={{ cursor: 'pointer' }}
                      onClick={() => openAlbumModal(album.images || [coverImg])}
                    >
                      <div className="position-relative" style={{ height: '240px' }}>
                        <img src={coverImg} alt={album.title} className="w-100 h-100 object-fit-cover hover-scale transition-transform duration-300" />
                        <span className="position-absolute top-0 end-0 m-3 badge bg-dark bg-opacity-75 text-white px-3 py-2 rounded-pill small d-flex align-items-center gap-1 shadow-sm">
                          <Layers size={14} /> {totalPhotos} Photos
                        </span>
                      </div>
                      <div className="p-3 bg-white text-start">
                        <h6 className="fw-bold text-dark mb-1">{album.title}</h6>
                        <span className="text-muted small" style={{ fontSize: '0.75rem' }}>{album.date} — Click to view all</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Lightbox Modal */}
      {activeAlbumImages && (
        <div className="modal show fade d-block bg-dark bg-opacity-85" tabIndex="-1" onClick={() => setActiveAlbumImages(null)}>
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content bg-transparent border-0 position-relative d-flex flex-row align-items-center justify-content-between px-md-5">
              
              <button 
                type="button" 
                className="btn btn-dark rounded-circle position-absolute top-0 end-0 m-4 z-3 text-white p-2 d-flex align-items-center justify-content-center shadow" 
                onClick={() => setActiveAlbumImages(null)}
              >
                <X size={20} />
              </button>

              {activeAlbumImages.length > 1 && (
                <button 
                  className="btn btn-dark rounded-circle text-white p-3 d-flex align-items-center justify-content-center shadow flex-shrink-0 z-3"
                  onClick={handlePrev}
                  style={{ width: '50px', height: '50px' }}
                >
                  <ChevronLeft size={28} />
                </button>
              )}

              <div className="modal-body text-center p-0 flex-grow-1 d-flex flex-column align-items-center justify-content-center mx-3" onClick={(e) => e.stopPropagation()}>
                <img 
                  src={activeAlbumImages[currentImageIndex]} 
                  alt="Album slide preview" 
                  className="img-fluid rounded-4 shadow-lg object-fit-contain mb-2" 
                  style={{ maxHeight: '75vh', maxWidth: '75vw' }}
                />
                <span className="badge bg-dark bg-opacity-75 text-white px-3 py-1 rounded-pill small">
                  {currentImageIndex + 1} / {activeAlbumImages.length}
                </span>
              </div>

              {activeAlbumImages.length > 1 && (
                <button 
                  className="btn btn-dark rounded-circle text-white p-3 d-flex align-items-center justify-content-center shadow flex-shrink-0 z-3"
                  onClick={handleNext}
                  style={{ width: '50px', height: '50px' }}
                >
                  <ChevronRight size={28} />
                </button>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
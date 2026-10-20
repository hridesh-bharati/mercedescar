// src/app/dashboard/adminpanel/gallery-manager.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { dbService } from '@/services/dbService';
import { Trash2, Image as ImageIcon, Layers, ChevronLeft, ChevronRight, X, List, PlusCircle } from 'lucide-react';

export default function GalleryManager() {
  const [albums, setAlbums] = useState([]);
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  
  // Toggle state for Form vs Albums Grid view
  const [showList, setShowList] = useState(false);
  
  const fileInputRef = useRef(null);

  const [activeAlbumImages, setActiveAlbumImages] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    loadAlbums();
  }, []);

  const loadAlbums = async () => {
    const res = await dbService.getAll('gallery');
    if (res.success && res.data) {
      setAlbums(res.data);
    }
  };

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const readers = files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then((base64Images) => {
        setSelectedFiles(base64Images);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0 || submitting) return;

    setSubmitting(true);
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const payload = {
      title: title.trim() || 'Workshop Album',
      images: selectedFiles,
      coverImage: selectedFiles[0],
      count: selectedFiles.length,
      date: currentDate
    };

    const res = await dbService.create('gallery', payload);
    if (res.success) {
      setTitle('');
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      loadAlbums();
      setShowList(true); // Switch back to albums grid view after successful upload
    } else {
      alert('Failed to upload album.');
    }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this photo album?')) {
      await dbService.remove('gallery', id);
      loadAlbums();
    }
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
    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white text-start">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
        <div className="d-flex align-items-center gap-2">
          <ImageIcon size={22} className="text-danger" />
          <h4 className="fw-bold text-dark mb-0 fs-5">Manage Gallery Albums</h4>
        </div>

        {/* Single Unified Toggle Button */}
        <button 
          type="button" 
          className="btn btn-outline-dark btn-sm rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center gap-2"
          onClick={() => setShowList(!showList)}
        >
          {showList ? (
            <>
              <PlusCircle size={16} /> Create New Album
            </>
          ) : (
            <>
              <List size={16} /> Existing Albums ({albums.length})
            </>
          )}
        </button>
      </div>

      {!showList ? (
        /* Form View */
        <form onSubmit={handleSubmit} className="card p-3 p-md-4 bg-light border-0 rounded-4 mb-4">
          <h6 className="fw-bold mb-3">Create New Photo Album (Multiple Photos = 1 Reference)</h6>
          <div className="row g-3">
            <div className="col-12 col-md-5">
              <input 
                type="text" 
                className="form-control rounded-pill px-3 small" 
                placeholder="Album Title (e.g. Engine Repair Showcase)" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required
              />
            </div>
            <div className="col-12 col-md-5">
              <input 
                ref={fileInputRef}
                type="file" 
                className="form-control rounded-pill px-3 small py-2 bg-white" 
                accept="image/*"
                multiple
                onChange={handleFilesChange} 
                required 
              />
            </div>
            <div className="col-12 col-md-2">
              <button type="submit" className="btn btn-danger btn-sm w-100 rounded-pill fw-bold py-2" disabled={submitting}>
                {submitting ? 'Creating...' : 'Create Album'}
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* Albums Grid View */
        <div>
          <h5 className="fw-bold text-dark fs-6 mb-3">Existing Albums ({albums.length})</h5>

          <div className="row g-3">
            {albums.length === 0 ? (
              <div className="col-12 text-center py-4 text-muted small card border-0 bg-light rounded-4">No photo albums created yet.</div>
            ) : (
              albums.map((item) => (
                <div className="col-md-4 col-sm-6" key={item.id}>
                  <div 
                    className="card border-0 shadow-sm rounded-4 overflow-hidden position-relative h-100 cursor-pointer"
                    style={{ cursor: 'pointer' }}
                    onClick={() => openAlbumModal(item.images || [item.coverImage])}
                  >
                    <div style={{ height: '180px' }} className="position-relative">
                      <img src={item.coverImage || (item.images && item.images[0])} alt={item.title} className="w-100 h-100 object-fit-cover" />
                      <span className="position-absolute top-0 end-0 m-2 badge bg-dark bg-opacity-75 text-white px-2 py-1 rounded-pill small d-flex align-items-center gap-1 shadow-sm">
                        <Layers size={12} /> {item.images ? item.images.length : 1} Photos
                      </span>
                    </div>
                    <div className="p-3 d-flex justify-content-between align-items-center bg-white">
                      <div>
                        <h6 className="fw-bold text-dark small mb-0">{item.title}</h6>
                        <span className="text-muted" style={{ fontSize: '0.7rem' }}>{item.date} — Click to view slider</span>
                      </div>
                      <button 
                        className="btn btn-sm btn-outline-danger rounded-circle p-2" 
                        onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }} 
                        title="Delete Album"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Admin Lightbox Slider Modal */}
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
                  alt="Admin slide preview" 
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
    </div>
  );
}
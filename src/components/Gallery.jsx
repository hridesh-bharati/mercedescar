// src/components/Gallery.jsx
import { dbService } from '@/services/dbService';
import GalleryClient from './GalleryClient';

async function getGalleryAlbums() {
  try {
    const res = await dbService.getAll('gallery');
    return res.success && res.data ? res.data : [];
  } catch (err) {
    console.error('Error fetching gallery:', err);
    return [];
  }
}

export default async function Gallery() {
  const albums = await getGalleryAlbums();

  return (
    <main className="bg-light py-5">
      <div className="container py-4">
        <div className="text-center mb-5" data-anim="down">
          <span className="text-danger fw-bold small text-uppercase tracking-wider">
            MERCEDES WORKSHOP SHOWCASE
          </span>
          {/* ✅ H1 — page-level SEO */}
          <h1
            id="gallery-heading"
            className="fw-bold display-5 text-dark mt-1"
          >
            Mercedes-Benz Workshop Gallery
            <span className="text-danger d-block fs-4 mt-2">
              in Al Quoz, Dubai
            </span>
          </h1>
          <p className="text-secondary small">
            Explore our Mercedes-Benz workshop, AMG projects, engine repairs,
            body kits and facelift conversions in Dubai.
          </p>
        </div>

        {albums.length === 0 ? (
          <div className="text-center py-5 text-muted card border-0 shadow-sm rounded-4 p-5 bg-white">
            <h2 className="fs-5 fw-bold text-dark mb-2">
              No Mercedes Gallery Albums Found
            </h2>
            <p className="small mb-0">
              Check back later for workshop updates.
            </p>
          </div>
        ) : (
          <GalleryClient albums={albums} />
        )}
      </div>
    </main>
  );
}


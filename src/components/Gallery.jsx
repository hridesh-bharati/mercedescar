// src/components/Gallery.jsx
import { dbService } from '@/services/dbService';
import GalleryClient from './GalleryClient';

// ✅ Server-side fetch (No loading spinner, SEO friendly)
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
        <div className="text-center mb-5">
          <span className="text-danger fw-bold small text-uppercase tracking-wider">Our Showcase</span>
          {/* ✅ Fixed: H1 ki jagah H2 use kiya taaki duplicate H1 na ho */}
          <h2 className="fw-bold display-5 text-dark mt-1">Workshop Photo Gallery</h2>
          <p className="text-secondary small">Explore our state-of-the-art facility and expert mechanics in action.</p>
        </div>

        {albums.length === 0 ? (
          <div className="text-center py-5 text-muted card border-0 shadow-sm rounded-4 p-5 bg-white">
            <h5 className="fw-bold text-dark mb-2">No Gallery Albums Found</h5>
            <p className="small mb-0">Check back later for workshop updates.</p>
          </div>
        ) : (
          <GalleryClient albums={albums} />
        )}
      </div>
    </main>
  );
}
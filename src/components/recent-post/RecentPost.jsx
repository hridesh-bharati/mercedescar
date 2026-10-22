// src/components/recent-post/RecentPost.jsx
'use client';

import { useState, useEffect } from 'react';
import { dbService } from '@/services/dbService';
import { Search, SlidersHorizontal } from 'lucide-react';
import 'aos/dist/aos.css';
import './RecentPosts.css';

export default function RecentPosts() {
  const [posts, setPosts] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const INITIAL_COUNT = 2;
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchServicesForPosts() {
      const res = await dbService.getAll('services');
      if (res.success && res.data && res.data.length > 0) {
        const shuffled = [...res.data].sort(() => 0.5 - Math.random());
        
        const formattedPosts = shuffled.slice(0, 6).map((item, index) => ({
          id: item.id || index,
          title: item.title || 'Mercedes Professional Service',
          href: `/services/${item.id}`,
          excerpt: item.desc || item.description || 'Expert Mercedes-Benz specialized repairs and diagnostics in Dubai.',
          author: 'Mercedes Expert',
          avatar: item.imageUrls?.[0] || item.imageUrl || '/images/avatar-1.webp',
          tag: item.model || 'Specialized',
        }));

        setPosts(formattedPosts);
      } else {
        setPosts([]);
      }
    }

    fetchServicesForPosts();
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    post.tag.toLowerCase().includes(searchFilter.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const visiblePosts = showAll ? filteredPosts : filteredPosts.slice(0, INITIAL_COUNT);
  const hasMore = filteredPosts.length > INITIAL_COUNT;

  if (posts.length === 0) return null;

  return (
    <section className="recent-posts-section py-5" aria-label="Recent Posts">
      <div className="container">
        <div className="row g-4 g-lg-5">

          {/* ============ LEFT: Social Feed ============ */}
          <div className="col-12 col-lg-8">
            <div data-aos="fade-up" data-aos-duration="600">
              <h2 className="recent-posts-heading">RECENT POSTS & SERVICES</h2>
              <div className="recent-posts-underline" aria-hidden="true"></div>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-5 card border-0 shadow-sm rounded-4 bg-white p-4">
                <p className="text-muted mb-0">No matching posts or services found for "{searchFilter}".</p>
              </div>
            ) : (
              <div className="social-feed">
                {visiblePosts.map((post, index) => (
                  <article
                    key={post.id || index}
                    className="social-post-card"
                    data-aos="fade-up"
                    data-aos-duration="500"
                  >
                    <header className="social-post-header">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="social-post-avatar object-fit-cover"
                        loading="lazy"
                      />
                      <div className="social-post-meta">
                        <span className="social-post-author">{post.author}</span>
                      </div>
                      <span className="social-post-tag">{post.tag}</span>
                    </header>

                    <a href={post.href} className="social-post-body text-decoration-none">
                      <h3 className="social-post-title">{post.title}</h3>
                      <p className="social-post-excerpt">{post.excerpt}</p>
                    </a>
                  </article>
                ))}
              </div>
            )}

            {hasMore && (
              <div className="recent-posts-more-wrap d-flex justify-content-center"
                data-aos="fade-up" data-aos-duration="500">
                <button
                  type="button"
                  className={`recent-posts-more-btn d-inline-flex align-items-center gap-2 ${showAll ? 'is-open' : ''}`}
                  onClick={() => setShowAll((v) => !v)}
                  aria-expanded={showAll}
                >
                  <span>{showAll ? 'Show Less' : 'Show More'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* ============ RIGHT: Minimal Post Search Box (Aligned to Top Heading) ============ */}
          <div className="col-12 col-lg-4" data-aos="fade-left" data-aos-duration="600">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white sticky-top" style={{ top: '100px', marginTop: '-5px' }}>
              <div className="d-flex align-items-center gap-2">
                <SlidersHorizontal size={18} className="text-danger" />
                <h5 className="fw-bold text-dark mb-0 fs-6">Search Posts</h5>
              </div>
              <p className="text-muted small">Find specific workshop updates, services or repairs quickly.</p>
              
              <div className="position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  className="form-control rounded-pill ps-5 pe-3 py-2 small border bg-light shadow-none"
                  placeholder="Search keywords (e.g. Engine, G63)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
              </div>

              {searchFilter && (
                <div className="d-flex justify-content-between align-items-center">
                  <span className="small text-muted">Results: {filteredPosts.length} found</span>
                  <button 
                    className="btn btn-link btn-sm text-danger text-decoration-none p-0 small fw-bold"
                    onClick={() => setSearchFilter('')}
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
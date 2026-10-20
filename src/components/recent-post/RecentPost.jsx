// src/components/recent-post/RecentPost.jsx
'use client';

import { useState, useEffect } from 'react';
import { dbService } from '@/services/dbService';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
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
        // Shuffle and pick random 6 services from database
        const shuffled = [...res.data].sort(() => 0.5 - Math.random());
        
        // Map database fields to match card format
        const formattedPosts = shuffled.slice(0, 6).map((item, index) => ({
          id: item.id || index,
          title: item.title || 'Mercedes Professional Service',
          href: `/services/${item.id}`,
          excerpt: item.desc || item.description || 'Expert Mercedes-Benz specialized repairs and diagnostics in Dubai.',
          author: 'Mercedes Expert',
          avatar: item.imageUrls?.[0] || item.imageUrl || '/images/avatar-1.webp',
          time: 'Active Service',
          likes: Math.floor(Math.random() * 100) + 50,
          comments: Math.floor(Math.random() * 20) + 5,
          shares: Math.floor(Math.random() * 10) + 2,
          tag: item.model || 'Specialized',
        }));

        setPosts(formattedPosts);
      } else {
        setPosts([]);
      }
    }

    fetchServicesForPosts();
  }, []);

  // Filter posts based on search input in the right panel
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
        <div className="row g-4 g-lg-5 align-items-start">

          {/* ============ LEFT: Social Feed ============ */}
          <div className="col-12 col-lg-8">
            <div data-aos="fade-up" data-aos-duration="600">
              <h2 className="recent-posts-heading mb-2">RECENT POSTS & SERVICES</h2>
              <div className="recent-posts-underline mb-4" aria-hidden="true"></div>
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
                    {/* ---- Header: Avatar + Author + Time ---- */}
                    <header className="social-post-header">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="social-post-avatar object-fit-cover"
                        loading="lazy"
                      />
                      <div className="social-post-meta">
                        <span className="social-post-author">{post.author}</span>
                        <span className="social-post-time">{post.time}</span>
                      </div>
                      <span className="social-post-tag">{post.tag}</span>
                    </header>

                    {/* ---- Body: Title + Excerpt ---- */}
                    <a href={post.href} className="social-post-body text-decoration-none">
                      <h3 className="social-post-title">{post.title}</h3>
                      <p className="social-post-excerpt">{post.excerpt}</p>
                    </a>

                    {/* ---- Footer: Engagement ---- */}
                    <footer className="social-post-footer">
                      <button type="button" className="social-action-btn" aria-label="Like">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span>{post.likes}</span>
                      </button>

                      <button type="button" className="social-action-btn" aria-label="Comment">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span>{post.comments}</span>
                      </button>

                      <button type="button" className="social-action-btn" aria-label="Share">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="18" cy="5" r="3" />
                          <circle cx="6" cy="12" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </svg>
                        <span>{post.shares}</span>
                      </button>

                      <a href={post.href} className="social-read-more">
                        Read More
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </a>
                    </footer>
                  </article>
                ))}
              </div>
            )}

            {hasMore && (
              <div className="recent-posts-more-wrap d-flex justify-content-center mt-4"
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

          {/* ============ RIGHT: Minimal Post Search Box ============ */}
          <div className="col-12 col-lg-4" data-aos="fade-left" data-aos-duration="600">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white sticky-top" style={{ top: '100px' }}>
              <div className="d-flex align-items-center gap-2 mb-3">
                <SlidersHorizontal size={18} className="text-danger" />
                <h5 className="fw-bold text-dark mb-0 fs-6">Search Posts</h5>
              </div>
              <p className="text-muted small mb-3">Find specific workshop updates, services or repairs quickly.</p>
              
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
                <div className="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
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
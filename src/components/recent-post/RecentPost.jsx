// src/components/recent-post/RecentPost.jsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { dbService } from '@/services/dbService';
import { Search, SlidersHorizontal } from 'lucide-react';
import './RecentPosts.css';

const SITE_NAME = 'Mercedes Garage Dubai';
const INITIAL_COUNT = 3;

const FALLBACK_POSTS = [
  {
    id: 'fallback-1',
    title: 'Mercedes Engine Repair & Diagnostics in Dubai',
    href: '/services',
    excerpt:
      'Advanced Mercedes engine diagnostics, ECU fault reading and precision repair by certified specialists in Al Quoz, Dubai.',
    tag: 'Engine',
  },
  {
    id: 'fallback-2',
    title: 'Mercedes G63 AMG Service & Maintenance Dubai',
    href: '/car-class/g-class',
    excerpt:
      'Specialist G63 AMG and G-Wagon servicing at our Al Quoz workshop — engine, transmission, brakes and AMG performance maintenance.',
    tag: 'G-Class',
  },
  {
    id: 'fallback-3',
    title: 'Mercedes AMG Body Kit Installation Dubai',
    href: '/mercedes-body-kits-dubai',
    excerpt:
      'G63 wide-body kits, C-Class and E-Class AMG styling, and full Mercedes body kit conversion at our Al Quoz workshop.',
    tag: 'Body Kits',
  },
];

function seededShuffle(arr, seed = 42) {
  const copy = [...arr];
  let s = seed;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function RecentPosts() {
  const [posts, setPosts] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServicesForPosts() {
      try {
        const res = await dbService.getAll('services');
        if (res.success && res.data && res.data.length > 0) {
          const stable = seededShuffle(res.data, 42);
          const formattedPosts = stable.slice(0, 6).map((item, index) => ({
            id: item.id || index,
            title: item.title || 'Mercedes Professional Service',
            href: `/services/${item.id}`,
            excerpt:
              item.desc ||
              item.description ||
              'Expert Mercedes-Benz specialized repairs and diagnostics in Dubai.',
            tag: item.model || 'Specialized',
            image: item.imageUrls?.[0] || item.imageUrl || null,
          }));
          setPosts(formattedPosts);
        } else {
          setPosts(FALLBACK_POSTS);
        }
      } catch (err) {
        setPosts(FALLBACK_POSTS);
      } finally {
        setLoading(false);
      }
    }
    fetchServicesForPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    if (!searchFilter.trim()) return posts;
    const q = searchFilter.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.tag.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q)
    );
  }, [posts, searchFilter]);

  const visiblePosts = showAll
    ? filteredPosts
    : filteredPosts.slice(0, INITIAL_COUNT);
  const hasMore = filteredPosts.length > INITIAL_COUNT;

  return (
    <section
      className="recent-posts-section py-5"
      aria-labelledby="recent-posts-heading"
    >
      <div className="container">
        <div className="row g-4 g-lg-5">
          {/* LEFT: Services Feed */}
          <div className="col-12 col-lg-8">
            <div data-anim="up">
              <h2 id="recent-posts-heading" className="recent-posts-heading">
                Latest Mercedes Services & Workshop Updates in Dubai
              </h2>
              <div className="recent-posts-underline" aria-hidden="true"></div>
            </div>

            {loading ? (
              <div className="social-feed">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="social-post-card"
                    aria-hidden="true"
                    style={{ opacity: 0.5 }}
                  >
                    <div
                      style={{
                        height: '80px',
                        background: '#f1f5f9',
                        borderRadius: '12px',
                        marginBottom: '12px',
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-5 card border-0 shadow-sm rounded-4 bg-white p-4">
                <p className="text-muted mb-0">
                  No matching Mercedes services found for &quot;{searchFilter}
                  &quot;. Try a different keyword or call us on{' '}
                  <a
                    href="tel:+971567888808"
                    className="text-danger fw-bold text-decoration-none"
                  >
                    +971 56 788 8808
                  </a>
                  .
                </p>
              </div>
            ) : (
              <div className="social-feed">
                {visiblePosts.map((post, index) => (
                  <article
                    key={post.id || index}
                    className="social-post-card"
                    data-anim="up"
                  >
                    <header className="social-post-header">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={`${post.title} — Mercedes-Benz service in Dubai`}
                          width={40}
                          height={40}
                          className="social-post-avatar object-fit-cover"
                          sizes="40px"
                          priority={index === 0}
                          loading={index === 0 ? 'eager' : 'lazy'}
                        />
                      ) : (
                        <div
                          className="social-post-avatar d-flex align-items-center justify-content-center bg-danger bg-opacity-10 text-danger fw-bold"
                          aria-hidden="true"
                        >
                          MB
                        </div>
                      )}
                      <div className="social-post-meta">
                        <span className="social-post-author">{SITE_NAME}</span>
                      </div>
                      <span className="social-post-tag">{post.tag}</span>
                    </header>

                    <Link
                      href={post.href}
                      className="social-post-body text-decoration-none"
                    >
                      <h3 className="social-post-title">{post.title}</h3>
                      <p className="social-post-excerpt">{post.excerpt}</p>
                    </Link>
                  </article>
                ))}
              </div>
            )}

            {hasMore && (
              <div className="recent-posts-more-wrap d-flex justify-content-center" data-anim="up">
                <button
                  type="button"
                  className={`recent-posts-more-btn d-inline-flex align-items-center gap-2 ${
                    showAll ? 'is-open' : ''
                  }`}
                  onClick={() => setShowAll((v) => !v)}
                  aria-expanded={showAll}
                  aria-controls="recent-posts-feed"
                >
                  <span>{showAll ? 'Show Less' : 'Show More'}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: Search Sidebar */}
          <div className="col-12 col-lg-4" data-anim="left">
            <div
              className="card border-0 shadow-sm rounded-4 p-4 bg-white sticky-top-lg"
              style={{ top: '100px' }}
            >
              <div className="d-flex align-items-center gap-2">
                <SlidersHorizontal
                  size={18}
                  className="text-danger"
                  aria-hidden="true"
                />
                <h5 className="fw-bold text-dark mb-0 fs-6">
                  Search Mercedes Services
                </h5>
              </div>
              <p className="text-muted small mt-2 mb-3">
                Find specific workshop updates, Mercedes services or repairs
                quickly.
              </p>

              <div className="position-relative">
                <span
                  className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
                  aria-hidden="true"
                >
                  <Search size={16} />
                </span>
                <input
                  type="search"
                  className="form-control rounded-pill ps-5 pe-3 py-2 small border bg-light shadow-none"
                  placeholder="Search (e.g. Engine, G63)..."
                  aria-label="Search Mercedes services"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
              </div>

              {searchFilter && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="small text-muted">
                    Results: {filteredPosts.length} found
                  </span>
                  <button
                    type="button"
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

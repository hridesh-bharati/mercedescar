// src/app/blogs/page.jsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { dbService } from '@/services/dbService';
import './blogs.css';

function BlogsContent() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    fetchLiveBlogs();
  }, []);

  const fetchLiveBlogs = async () => {
    const res = await dbService.getAll('blogs');
    if (res.success && res.data) {
      setBlogs(res.data);
    } else {
      setBlogs([]);
    }
    setLoading(false);
  };

  const filteredBlogs = blogs.filter((blog) => {
    if (!searchQuery) return true;
    const titleMatch = blog.title?.toLowerCase().includes(searchQuery);
    const categoryMatch = blog.category?.toLowerCase().includes(searchQuery);
    const contentMatch = blog.content?.toLowerCase().includes(searchQuery);
    return titleMatch || categoryMatch || contentMatch;
  });

  return (
    <>
      <Header />

      <main className="blogs-main">
        {/* ============ HERO BANNER ============ */}
        <section className="blogs-hero text-white position-relative">
          <div className="blogs-hero-bg"></div>
          <div className="blogs-hero-overlay"></div>
          <div className="container position-relative z-2 py-4">
            <div className="row">
              <div className="col-lg-7 text-start" data-anim="down">
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-dark bg-opacity-50 border border-light border-opacity-25 mb-2">
                  <span
                    style={{
                      width: '20px',
                      height: '2px',
                      background: '#D6241D',
                      display: 'inline-block',
                    }}
                  ></span>
                  <span className="small fw-bold tracking-wider text-danger">
                    MERCEDES BLOGS{' '}
                    {searchQuery && `— Search: "${searchQuery}"`}
                  </span>
                </div>
                <h1 className="display-5 fw-bold mb-2">
                  Mercedes-Benz Blogs &amp; Guides
                  <span className="text-danger d-block fs-5 mt-2">
                    in Al Quoz, Dubai
                  </span>
                </h1>
                <nav aria-label="Breadcrumb">
                  <ol className="breadcrumb mb-0 bg-dark bg-opacity-50 px-3 py-1 rounded-pill d-inline-flex align-items-center border border-light border-opacity-10 small">
                    <li className="breadcrumb-item">
                      <Link
                        href="/"
                        className="text-danger text-decoration-none fw-semibold"
                      >
                        Home
                      </Link>
                    </li>
                    <li
                      className="breadcrumb-item active text-light fw-semibold"
                      aria-current="page"
                    >
                      Blogs
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* ============ BLOG CARDS GRID SECTION ============ */}
        <section className="py-5 position-relative overflow-hidden">
          <div className="blogs-glow blogs-glow-blue"></div>
          <div className="blogs-glow blogs-glow-pink"></div>

          <div className="container position-relative z-2">
            {loading ? (
              <div
                className="text-center py-5 text-secondary fw-bold"
                role="status"
                aria-live="polite"
              >
                Loading Mercedes Blogs...
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-5 text-muted card border-0 shadow-sm rounded-4 p-5 bg-white bg-opacity-75">
                <h2 className="fs-5 fw-bold text-dark mb-2">
                  No Matching Mercedes Blog Posts Found
                </h2>
                <p className="small mb-0">
                  Try searching with a different keyword or category.
                </p>
                <div className="mt-3">
                  <Link
                    href="/blogs"
                    className="btn btn-danger btn-sm rounded-pill px-4"
                  >
                    View All Blogs
                  </Link>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {filteredBlogs.map((blog, index) => {
                  const { id, title, category, date, imageUrl, image, content } =
                    blog;
                  const blogImage =
                    imageUrl || image || '/images/servicesman.avif';
                  const blogSnippet = content
                    ? content.slice(0, 100) + '...'
                    : '';

                  return (
                    <div
                      className="col-lg-4 col-md-6"
                      key={id || index}
                      data-anim="up"
                      data-anim-delay={Math.min(index * 100, 500)}
                    >
                      <div className="card border-0 glass-card h-100 shadow-sm overflow-hidden d-flex flex-column text-start">
                        <div
                          className="position-relative overflow-hidden"
                          style={{ height: '220px' }}
                        >
                          <Link
                            href={`/blogs/${id}`}
                            aria-label={`Read ${title}`}
                          >
                            <Image
                              src={blogImage}
                              alt={`${title} — Mercedes-Benz blog in Dubai`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw"
                              className="object-fit-cover transition-transform hover-scale"
                              style={{ transition: 'transform 0.4s ease' }}
                              priority={index < 3}
                            />
                          </Link>
                        </div>

                        <div className="p-4 d-flex flex-column justify-content-between flex-grow-1 bg-white bg-opacity-60">
                          <div>
                            <h3 className="fs-6 fw-bold mb-2">
                              <Link
                                href={`/blogs/${id}`}
                                className="text-dark text-decoration-none hover-danger"
                              >
                                {title}
                              </Link>
                            </h3>
                            <p className="text-muted small mb-3">{blogSnippet}</p>
                          </div>

                          <div className="border-top pt-3 border-light-subtle d-flex align-items-center justify-content-between mt-auto">
                            <span className="text-muted small">
                              {date || 'Mar 2025'}
                            </span>
                            <div className="d-flex align-items-center gap-2">
                              {category && (
                                <span className="text-danger small fw-semibold">
                                  {category}
                                </span>
                              )}
                              <Link
                                href={`/blogs/${id}`}
                                className="bg-danger text-white rounded-circle p-1 d-inline-flex align-items-center justify-content-center shadow-sm"
                                aria-label={`Read more about ${title}`}
                              >
                                <Plus size={14} aria-hidden="true" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default function BlogsPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-5 fw-bold text-secondary" role="status">
          Loading...
        </div>
      }
    >
      <BlogsContent />
    </Suspense>
  );
}
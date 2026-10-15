// src/app/blogs/page.jsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Plus } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { dbService } from '@/services/dbService';
import './blogs.css';

function BlogsContent() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    setMounted(true);
    AOS.init({ duration: 800, once: true, offset: 40 });
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
              <div className="col-lg-7 text-start" {...(mounted ? { 'data-aos': 'fade-down' } : {})}>
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-dark bg-opacity-50 border border-light border-opacity-25 mb-2">
                  <span style={{ width: '20px', height: '2px', background: '#D6241D', display: 'inline-block' }}></span>
                  <span className="small fw-bold tracking-wider text-danger">BLOGS {searchQuery && `— Search: "${searchQuery}"`}</span>
                </div>
                <h1 className="display-5 fw-bold mb-2">
                  Our Latest <span className="text-danger">Articles</span>
                </h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0 bg-dark bg-opacity-50 px-3 py-1 rounded-pill d-inline-flex align-items-center border border-light border-opacity-10 small">
                    <li className="breadcrumb-item"><a href="/" className="text-danger text-decoration-none fw-semibold">Home</a></li>
                    <li className="breadcrumb-item active text-light fw-semibold" aria-current="page">Blogs</li>
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
              <div className="text-center py-5 text-secondary fw-bold">Loading Live Blogs...</div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-5 text-muted card border-0 shadow-sm rounded-4 p-5 bg-white bg-opacity-75">
                <h5 className="fw-bold text-dark mb-2">No Matching Blog Posts Found</h5>
                <p className="small mb-0">Try searching with a different keyword or category.</p>
                <div className="mt-3">
                  <Link href="/blogs" className="btn btn-danger btn-sm rounded-pill px-4">View All Blogs</Link>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {filteredBlogs.map((blog, index) => {
                  const { id, title, category, date, imageUrl, image, content } = blog;
                  const blogImage = imageUrl || image || '/images/servicesman.webp';
                  const blogSnippet = content ? content.slice(0, 100) + '...' : '';

                  return (
                    <div className="col-lg-4 col-md-6" key={id || index} {...(mounted ? { 'data-aos': 'fade-up', 'data-aos-delay': index * 100 } : {})}>
                      <div className="card border-0 glass-card h-100 shadow-sm overflow-hidden d-flex flex-column text-start">
                        
                        <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
                          <Link href={`/blogs/${id}`}>
                            <img 
                              src={blogImage} 
                              alt={title} 
                              className="w-100 h-100 object-fit-cover transition-transform duration-500 hover-scale"
                              loading="lazy"
                            />
                          </Link>
                        </div>

                        <div className="p-4 d-flex flex-column justify-content-between flex-grow-1 bg-white bg-opacity-60">
                          <div>
                            <h4 className="fs-6 fw-bold mb-2">
                              <Link href={`/blogs/${id}`} className="text-dark text-decoration-none hover-danger">
                                {title}
                              </Link>
                            </h4>
                            <p className="text-muted small mb-3">{blogSnippet}</p>
                          </div>

                          <div className="border-top pt-3 border-light-subtle d-flex align-items-center justify-content-between mt-auto">
                            <span className="text-muted small">{date || 'Mar 2025'}</span>
                            <div className="d-flex align-items-center gap-2">
                              <span className="text-danger small fw-semibold">{category}</span>
                              <Link href={`/blogs/${id}`} className="bg-danger text-white rounded-circle p-1 d-inline-flex align-items-center justify-content-center shadow-sm">
                                <Plus size={14} />
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
    <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
      <BlogsContent />
    </Suspense>
  );
}
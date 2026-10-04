'use client';

import { use, useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Search, Calendar, MessageSquare, User, Tag, Send } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { blogsData } from '../page';
import '../blogs.css';

export default function BlogDetail({ params }) {
  const unwrappedParams = use(params);
  const blogId = unwrappedParams.id;
  const blog = blogsData.find((b) => b.id === blogId) || blogsData[0];

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 40 });
  }, []);

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
              <div className="col-lg-9 text-start" data-aos="fade-down">
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-dark bg-opacity-50 border border-light border-opacity-25 mb-2">
                  <span style={{ width: '20px', height: '2px', background: '#D6241D', display: 'inline-block' }}></span>
                  <span className="small fw-bold tracking-wider text-danger">{blog.category.toUpperCase()}</span>
                </div>
                <h1 className="fs-3 fw-bold mb-2 text-white lh-base">
                  {blog.title}
                </h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0 bg-dark bg-opacity-50 px-3 py-1 rounded-pill d-inline-flex align-items-center border border-light border-opacity-10 small">
                    <li className="breadcrumb-item"><Link href="/" className="text-danger text-decoration-none fw-semibold">Home</Link></li>
                    <li className="breadcrumb-item"><Link href="/blogs" className="text-danger text-decoration-none fw-semibold">Blogs</Link></li>
                    <li className="breadcrumb-item active text-light fw-semibold" aria-current="page">{blog.category}</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* ============ BLOG DETAIL & SIDEBAR SECTION ============ */}
        <section className="py-5 position-relative overflow-hidden">
          <div className="blogs-glow blogs-glow-blue"></div>
          <div className="blogs-glow blogs-glow-pink"></div>

          <div className="container position-relative z-2">
            <div className="row g-4">
              
              {/* Left Side: Main Blog Article Content */}
              <div className="col-lg-8 text-start" data-aos="fade-right">
                <div className="glass-card p-4 p-md-5 rounded-4 shadow-sm bg-white bg-opacity-75">
                  
                  {/* Meta Bar */}
                  <div className="d-flex flex-wrap align-items-center gap-3 text-muted small pb-3 mb-4 border-bottom border-light-subtle">
                    <span className="d-flex align-items-center gap-1 text-danger">
                      <User size={15} /> {blog.author}
                    </span>
                    <span className="d-flex align-items-center gap-1">
                      <MessageSquare size={15} /> No Comments
                    </span>
                    <span className="d-flex align-items-center gap-1">
                      <Calendar size={15} /> {blog.date}/2025
                    </span>
                  </div>

                  {/* Featured Image */}
                  <div className="mb-4 rounded-4 overflow-hidden shadow-sm" style={{ height: '380px' }}>
                    <img src={blog.image} alt={blog.title} className="w-100 h-100 object-fit-cover" />
                  </div>

                  {/* Article Text */}
                  <div className="text-secondary small lh-lg mb-5" style={{ fontSize: '0.95rem' }}>
                    <p className="mb-3">{blog.content}</p>
                    <h3 className="fs-5 fw-bold text-dark mt-4 mb-3">TYPES OF CAR FILTERS AND THEIR FUNCTIONS:</h3>
                    <p className="mb-3">Replacing filters at recommended intervals helps avoid unnecessary strain on your engine and other systems, ultimately extending the life of your car. Keeping your filters clean and functional is essential for maintaining a safe, reliable, and efficient vehicle.</p>
                    
                    <ul className="list-unstyled d-grid gap-2 mb-4">
                      <li><strong>• Engine Air Filter:</strong> Ensures clean air enters for combustion, protecting internal components.</li>
                      <li><strong>• Oil Filter:</strong> Traps contaminants in engine oil, preventing sludge buildup and wear.</li>
                      <li><strong>• Transmission Filter:</strong> Keeps transmission fluid clean for smooth gear shifting.</li>
                    </ul>

                    {/* Quote Box */}
                    <div className="p-4 rounded-4 border-start border-danger border-4 bg-light shadow-sm my-4">
                      <p className="fst-italic text-dark mb-2">&ldquo;Tortor dis efficitur risus placerat libero condimentum faucibus enim luctus. Port titor per si nisi sodales accumsan. Accumsan suscipit semper pharetra pretium consequat primis.&rdquo;</p>
                      <strong className="text-danger small">— KATHRYN MURPHY</strong>
                    </div>

                    <h3 className="fs-5 fw-bold text-dark mt-4 mb-3">WHY REGULAR REPLACEMENT MATTERS:</h3>
                    <ul className="list-unstyled d-grid gap-2">
                      <li><strong>• Improves Performance:</strong> Clean filters ensure optimal engine and HVAC output.</li>
                      <li><strong>• Boosts Fuel Efficiency:</strong> Clean airflow reduces fuel consumption.</li>
                      <li><strong>• Prevents Costly Repairs:</strong> Avoids unexpected breakdowns on Dubai highways.</li>
                    </ul>
                  </div>

                  {/* Author Box & Comment Form */}
                  <div className="p-4 rounded-4 bg-light shadow-sm mb-4 d-flex align-items-center gap-3">
                    <div className="bg-danger text-white rounded-circle p-3 d-flex align-items-center justify-content-center fw-bold">
                      W
                    </div>
                    <div>
                      <h6 className="fw-bold text-dark mb-0">{blog.author}</h6>
                      <span className="text-muted small">Specialist Automotive Author</span>
                    </div>
                  </div>

                  {/* Leave a Comment Section */}
                  <div className="mt-5 pt-4 border-top border-light-subtle">
                    <h4 className="fs-5 fw-bold text-dark mb-3">LEAVE A COMMENT</h4>
                    <form onSubmit={(e) => { e.preventDefault(); alert('Comment posted successfully!'); }} className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-secondary">FULL NAME</label>
                        <input type="text" className="form-control rounded-pill px-3 py-2 bg-white border-light-subtle shadow-none small" placeholder="e.g. Oliver Spiteri" required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-secondary">EMAIL ADDRESS</label>
                        <input type="email" className="form-control rounded-pill px-3 py-2 bg-white border-light-subtle shadow-none small" placeholder="example@email.com" required />
                      </div>
                      <div className="col-12">
                        <label className="form-label small fw-bold text-secondary">MESSAGES</label>
                        <textarea rows="4" className="form-control rounded-4 p-3 bg-white border-light-subtle shadow-none small" placeholder="Write your message here..." required></textarea>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-danger w-100 rounded-pill fw-bold py-2 shadow-sm d-flex align-items-center justify-content-center gap-2">
                          <Send size={16} /> POST COMMENT
                        </button>
                      </div>
                    </form>
                  </div>

                </div>
              </div>

              {/* Right Side: Sidebar (Search, Categories, Recent Posts, Tag Cloud) */}
              <div className="col-lg-4 text-start" data-aos="fade-left">
                <div className="d-grid gap-4">
                  
                  {/* Search Widget */}
                  <div className="glass-card p-4 rounded-4 shadow-sm bg-white bg-opacity-75">
                    <h5 className="fs-6 fw-bold text-dark text-uppercase mb-3 border-bottom pb-2">Search</h5>
                    <div className="input-group">
                      <input type="text" className="form-control bg-light border-0 shadow-none small rounded-start-pill px-3" placeholder="Search here..." />
                      <button className="btn btn-danger rounded-end-pill px-3" type="button"><Search size={16} /></button>
                    </div>
                  </div>

                  {/* Categories Widget */}
                  <div className="glass-card p-4 rounded-4 shadow-sm bg-white bg-opacity-75">
                    <h5 className="fs-6 fw-bold text-dark text-uppercase mb-3 border-bottom pb-2">Categories</h5>
                    <ul className="list-unstyled d-grid gap-2 mb-0 small">
                      {['Auto Car (05)', 'Battery Check (01)', 'Car Denting Repair (02)', 'Engine Repair (01)', 'Exhaust System Repair (01)', 'Hydro Dripping (01)', 'Workshop (03)'].map((cat, idx) => (
                        <li key={idx} className="d-flex justify-content-between align-items-center py-1 border-bottom border-light-subtle">
                          <span className="text-secondary">{cat.split(' (')[0]}</span>
                          <span className="text-muted">({cat.split('(')[1]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recent Posts Widget */}
                  <div className="glass-card p-4 rounded-4 shadow-sm bg-white bg-opacity-75">
                    <h5 className="fs-6 fw-bold text-dark text-uppercase mb-3 border-bottom pb-2">Recent Posts</h5>
                    <div className="d-grid gap-3">
                      {blogsData.slice(0, 4).map((item) => (
                        <div key={item.id} className="pb-2 border-bottom border-light-subtle">
                          <Link href={`/blogs/${item.id}`} className="text-dark fw-bold text-decoration-none small hover-danger d-block mb-1">
                            {item.title}
                          </Link>
                          <span className="text-danger small" style={{ fontSize: '0.75rem' }}>{item.date} — {item.author}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tag Cloud Widget */}
                  <div className="glass-card p-4 rounded-4 shadow-sm bg-white bg-opacity-75">
                    <h5 className="fs-6 fw-bold text-dark text-uppercase mb-3 border-bottom pb-2">Tag Cloud</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {['Auto Car', 'Battery Check', 'Car', 'Car Services', 'Consultant', 'Denting', 'Engine', 'Engine Repair', 'Exhaust', 'Hydro', 'Repair'].map((tag, tIdx) => (
                        <span key={tIdx} className="badge bg-light text-secondary border px-2 py-1 small fw-normal">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
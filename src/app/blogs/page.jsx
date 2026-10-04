'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Plus } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './blogs.css';

// Blog data array matching your screenshots
export const blogsData = [
  {
    id: '1',
    title: 'How to Extend the Life of Your Car with Preventive Maintenance',
    category: 'Battery Check',
    date: 'Mar 21',
    image: '/images/servicesman.webp',
    author: 'waqas@saaki.net',
    content: `Car filters, including engine air filters, oil filters, fuel filters, cabin air filters, and transmission filters, play a vital role in maintaining the health and performance of your vehicle. Regular replacement of these filters ensures that your car runs smoothly by preventing dirt, debris, and contaminants from damaging critical components. Dirty or clogged filters can lead to poor fuel efficiency, engine performance issues, and costly repairs. By staying on top of regular filter maintenance, you can improve fuel economy, engine longevity, and air quality inside your vehicle.

    Replacing filters at recommended intervals helps avoid unnecessary strain on your engine and other systems, ultimately extending the life of your car. Keeping your filters clean and functional is essential for maintaining a safe, reliable, and efficient vehicle.`,
  },
  {
    id: '2',
    title: "What's the Best Time to Schedule Your Car's Tune-Up?",
    category: 'Auto Car',
    date: 'Mar 21',
    image: '/images/team/team-2.png',
    author: 'waqas@saaki.net',
    content: 'Regular tune-ups are essential for keeping your engine operating at peak efficiency. Learn the seasonal milestones and mileage intervals that signal when it is time to visit our Al Quoz workshop.',
  },
  {
    id: '3',
    title: 'Top 10 Car Repairs That Can Save You Money in the Long Run',
    category: 'Car Denting Repair',
    date: 'Mar 21',
    image: '/images/team/team-3.png',
    author: 'waqas@saaki.net',
    content: 'Ignoring minor squeaks or small dents can snowball into massive engine or body bills. Discover which 10 repairs protect your wallet when handled early.',
  },
  {
    id: '4',
    title: 'Car service myths debunked: What you really need to know',
    category: 'Engine Repair',
    date: 'Mar 21',
    image: '/images/services/imag-post-3.webp',
    author: 'waqas@saaki.net',
    content: 'Do you really need to change your oil every 3,000 miles? We debunk common automotive service myths and give you the facts straight from our certified technicians.',
  },
  {
    id: '5',
    title: 'How to save money on auto repairs without compromising quality',
    category: 'Hydro Dripping',
    date: 'Mar 21',
    image: '/images/about/car-1.avif',
    author: 'waqas@saaki.net',
    content: 'Smart ways to source reliable parts, pick trustworthy garages, and maintain your luxury vehicle without spending a fortune at dealership service centers.',
  },
  {
    id: '6',
    title: 'Why regular oil changes are crucial for your engine\'s health',
    category: 'Exhaust System Repair',
    date: 'Mar 21',
    image: '/images/about/wheel-1.avif',
    author: 'waqas@saaki.net',
    content: 'Clean oil lubricates moving parts and dissipates heat. Find out what happens inside your motor when old oil turns sludge-like.',
  },
];

export default function BlogsPage() {
  const [currentPage, setCurrentPage] = useState(1);

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
              <div className="col-lg-7 text-start" data-aos="fade-down">
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-dark bg-opacity-50 border border-light border-opacity-25 mb-2">
                  <span style={{ width: '20px', height: '2px', background: '#D6241D', display: 'inline-block' }}></span>
                  <span className="small fw-bold tracking-wider text-danger">BLOGS</span>
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
            <div className="row g-4">
              {blogsData.map((blog, index) => (
                <div className="col-lg-4 col-md-6" key={blog.id} data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="card border-0 glass-card h-100 shadow-sm overflow-hidden d-flex flex-column text-start">
                    
                    {/* Blog Image with Link */}
                    <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
                      <Link href={`/blogs/${blog.id}`}>
                        <img 
                          src={blog.image} 
                          alt={blog.title} 
                          className="w-100 h-100 object-fit-cover transition-transform duration-500 hover-scale"
                          loading="lazy"
                        />
                      </Link>
                    </div>

                    {/* Blog Body */}
                    <div className="p-4 d-flex flex-column justify-content-between flex-grow-1 bg-white bg-opacity-60">
                      <div>
                        <h4 className="fs-6 fw-bold mb-3">
                          <Link href={`/blogs/${blog.id}`} className="text-dark text-decoration-none hover-danger">
                            {blog.title}
                          </Link>
                        </h4>
                      </div>

                      <div className="border-top pt-3 border-light-subtle d-flex align-items-center justify-content-between mt-auto">
                        <span className="text-muted small">{blog.date}</span>
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-danger small fw-semibold">{blog.category}</span>
                          <Link href={`/blogs/${blog.id}`} className="bg-danger text-white rounded-circle p-1 d-inline-flex align-items-center justify-content-center shadow-sm">
                            <Plus size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="row mt-5">
              <div className="col-12 d-flex justify-content-center">
                <nav aria-label="Page navigation">
                  <ul className="pagination gap-2 border-0">
                    <li className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
                      <button className="page-link rounded-circle fw-bold border-0 shadow-sm d-flex align-items-center justify-content-center bg-danger text-white" style={{ width: '38px', height: '38px' }} onClick={() => setCurrentPage(1)}>1</button>
                    </li>
                    <li className={`page-item ${currentPage === 2 ? 'active' : ''}`}>
                      <button className="page-link rounded-circle fw-bold border-0 shadow-sm d-flex align-items-center justify-content-center bg-white text-dark" style={{ width: '38px', height: '38px' }} onClick={() => setCurrentPage(2)}>2</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
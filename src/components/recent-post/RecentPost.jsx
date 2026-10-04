'use client';

import { useState } from 'react';
import 'aos/dist/aos.css';
import './RecentPosts.css';

export default function RecentPosts() {
  const posts = [
    { title: 'How To Diagnose And Repair Common Mercedes Engine Leaks With Pro Tips And When To Call', href: '#' },
    { title: 'Car Fuel System Service', href: '#' },
    { title: 'Car Safety Check', href: '#' },
    { title: 'Car Tire And Wheel Services', href: '#' },
    { title: 'Air Conditioning', href: '#' },
    { title: 'Oil And Filters', href: '#' },
    { title: 'Engine Diagnostics', href: '#' },
    { title: 'Third Party Car Insurance', href: '#' },
    { title: 'Affordable Car Window Tinting Services In Dubai', href: '#' },
    { title: 'Vehicle Testing And Inspection Procedures In Dubai: Everything You Need To Know', href: '#' },
    { title: 'Brake Pad Replacement Service', href: '#' },
    { title: 'Transmission Fluid Change & Repair', href: '#' },
    { title: 'Battery Testing And Replacement', href: '#' },
    { title: 'Suspension And Steering Repair', href: '#' },
    { title: 'Ceramic Coating And Paint Protection', href: '#' },
    { title: 'Full Body Painting & Dent Removal', href: '#' },
  ];

  const INITIAL_COUNT = 10;
  const [showAll, setShowAll] = useState(false);

  const visiblePosts = showAll ? posts : posts.slice(0, INITIAL_COUNT);
  const hasMore = posts.length > INITIAL_COUNT;

  return (
    <section className="recent-posts-section py-5" aria-label="Recent Posts">
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-start">

          {/* ============ LEFT: Posts List ============ */}
          <div className="col-12 col-lg-8">
            <div data-aos="fade-up" data-aos-duration="600">
              <h2 className="recent-posts-heading mb-2">RECENT POSTS</h2>
              <div className="recent-posts-underline mb-4" aria-hidden="true"></div>
            </div>

            <ul className="recent-posts-list list-unstyled mb-0">
              {visiblePosts.map((post, index) => (
                <li
                  key={index}
                  className="recent-post-item"
                  data-aos="fade-up"
                  data-aos-duration="500"
                  data-aos-delay={Math.min(index * 40, 300)}
                >
                  <a href={post.href} className="recent-post-link d-flex align-items-center justify-content-between">
                    <span className="recent-post-title">{post.title}</span>
                    <span className="recent-post-arrow" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

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

          {/* ============ RIGHT: Wheel Image (STATIC) ============ */}
          <div className="col-12 col-lg-4 text-center"
            data-aos="zoom-in" data-aos-duration="700" aria-hidden="true">
            <div className="recent-posts-wheel-wrap mx-auto">
              <img src="/images/banne-right.webp" alt="" className="recent-posts-wheel img-fluid" />
              <span className="recent-posts-wheel-glow"></span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
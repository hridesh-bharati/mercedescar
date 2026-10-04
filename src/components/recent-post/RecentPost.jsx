'use client';

import { useState } from 'react';
import 'aos/dist/aos.css';
import './RecentPosts.css';

export default function RecentPosts() {
  const posts = [
    {
      title: 'How To Diagnose And Repair Common Mercedes Engine Leaks With Pro Tips And When To Call',
      href: '#',
      excerpt: 'Engine leaks are one of the most common issues Mercedes owners face. Here is how to spot them early...',
      author: 'AutoCare Team',
      avatar: '/images/avatar-1.webp',
      time: '2 hours ago',
      likes: 128,
      comments: 24,
      shares: 8,
      tag: 'Engine',
    },
    {
      title: 'Car Fuel System Service',
      href: '#',
      excerpt: 'A clean fuel system means better mileage and smoother acceleration. Here is what our service includes...',
      author: 'Service Desk',
      avatar: '/images/avatar-2.webp',
      time: '5 hours ago',
      likes: 86,
      comments: 12,
      shares: 4,
      tag: 'Fuel',
    },
    {
      title: 'Car Safety Check',
      href: '#',
      excerpt: 'Before any long drive, a safety check can save your trip. Brakes, tires, lights — we check it all...',
      author: 'Safety Team',
      avatar: '/images/avatar-3.webp',
      time: '1 day ago',
      likes: 64,
      comments: 9,
      shares: 2,
      tag: 'Safety',
    },
    {
      title: 'Car Tire And Wheel Services',
      href: '#',
      excerpt: 'From alignment to balancing, we keep your wheels running true and your tires lasting longer...',
      author: 'Wheel Pros',
      avatar: '/images/avatar-1.webp',
      time: '1 day ago',
      likes: 92,
      comments: 15,
      shares: 6,
      tag: 'Tires',
    },
    {
      title: 'Air Conditioning',
      href: '#',
      excerpt: 'Dubai heat is no joke. Get your AC checked, recharged, and ready before summer hits...',
      author: 'Cooling Experts',
      avatar: '/images/avatar-2.webp',
      time: '2 days ago',
      likes: 110,
      comments: 18,
      shares: 7,
      tag: 'AC',
    },
    {
      title: 'Oil And Filters',
      href: '#',
      excerpt: 'Regular oil changes are the cheapest insurance for your engine. Here is our recommended interval...',
      author: 'AutoCare Team',
      avatar: '/images/avatar-3.webp',
      time: '2 days ago',
      likes: 75,
      comments: 11,
      shares: 3,
      tag: 'Maintenance',
    },
    {
      title: 'Engine Diagnostics',
      href: '#',
      excerpt: 'Check engine light on? Our advanced OBD scanners pinpoint the issue in minutes...',
      author: 'Diagnostics Lab',
      avatar: '/images/avatar-1.webp',
      time: '3 days ago',
      likes: 143,
      comments: 27,
      shares: 9,
      tag: 'Diagnostics',
    },
    {
      title: 'Third Party Car Insurance',
      href: '#',
      excerpt: 'Mandatory in UAE. Here is how to pick the right third-party insurance without overpaying...',
      author: 'Insurance Desk',
      avatar: '/images/avatar-2.webp',
      time: '3 days ago',
      likes: 58,
      comments: 8,
      shares: 2,
      tag: 'Insurance',
    },
    {
      title: 'Affordable Car Window Tinting Services In Dubai',
      href: '#',
      excerpt: 'Beat the heat with premium window tinting. RTA-approved films, lifetime warranty...',
      author: 'Tint Studio',
      avatar: '/images/avatar-3.webp',
      time: '4 days ago',
      likes: 201,
      comments: 34,
      shares: 14,
      tag: 'Tinting',
    },
    {
      title: 'Vehicle Testing And Inspection Procedures In Dubai: Everything You Need To Know',
      href: '#',
      excerpt: 'Annual testing made simple. Here is the full checklist and what to expect at the center...',
      author: 'RTA Guide',
      avatar: '/images/avatar-1.webp',
      time: '4 days ago',
      likes: 167,
      comments: 22,
      shares: 11,
      tag: 'Inspection',
    },
    {
      title: 'Brake Pad Replacement Service',
      href: '#',
      excerpt: 'Squealing brakes? Here is how to know when it is time for a replacement...',
      author: 'Brake Pros',
      avatar: '/images/avatar-2.webp',
      time: '5 days ago',
      likes: 89,
      comments: 13,
      shares: 5,
      tag: 'Brakes',
    },
    {
      title: 'Transmission Fluid Change & Repair',
      href: '#',
      excerpt: 'Smooth shifting starts with clean fluid. Here is our transmission service process...',
      author: 'Trans Lab',
      avatar: '/images/avatar-3.webp',
      time: '5 days ago',
      likes: 72,
      comments: 10,
      shares: 3,
      tag: 'Transmission',
    },
    {
      title: 'Battery Testing And Replacement',
      href: '#',
      excerpt: 'Car not starting? Get your battery tested free. We stock all major brands...',
      author: 'Power Team',
      avatar: '/images/avatar-1.webp',
      time: '6 days ago',
      likes: 95,
      comments: 16,
      shares: 6,
      tag: 'Battery',
    },
    {
      title: 'Suspension And Steering Repair',
      href: '#',
      excerpt: 'Bumpy ride? We diagnose and fix suspension issues with OEM parts...',
      author: 'Ride Fixers',
      avatar: '/images/avatar-2.webp',
      time: '6 days ago',
      likes: 81,
      comments: 12,
      shares: 4,
      tag: 'Suspension',
    },
    {
      title: 'Ceramic Coating And Paint Protection',
      href: '#',
      excerpt: 'Give your car a mirror finish with 9H ceramic coating. Years of protection...',
      author: 'Detail Studio',
      avatar: '/images/avatar-3.webp',
      time: '1 week ago',
      likes: 234,
      comments: 41,
      shares: 18,
      tag: 'Detailing',
    },
    {
      title: 'Full Body Painting & Dent Removal',
      href: '#',
      excerpt: 'From minor dents to full respray — we restore your car to showroom condition...',
      author: 'Paint Pros',
      avatar: '/images/avatar-1.webp',
      time: '1 week ago',
      likes: 156,
      comments: 29,
      shares: 10,
      tag: 'Bodywork',
    },
  ];

  const INITIAL_COUNT = 3;
  const [showAll, setShowAll] = useState(false);

  const visiblePosts = showAll ? posts : posts.slice(0, INITIAL_COUNT);
  const hasMore = posts.length > INITIAL_COUNT;

  return (
    <section className="recent-posts-section py-5" aria-label="Recent Posts">
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-start">

          {/* ============ LEFT: Social Feed ============ */}
          <div className="col-12 col-lg-8">
            <div data-aos="fade-up" data-aos-duration="600">
              <h2 className="recent-posts-heading mb-2">RECENT POSTS</h2>
              <div className="recent-posts-underline mb-4" aria-hidden="true"></div>
            </div>

            <div className="social-feed">
              {visiblePosts.map((post, index) => (
                <article
                  key={index}
                  className="social-post-card"
                  data-aos="fade-up"
                  data-aos-duration="500"
                  data-aos-delay={Math.min(index * 40, 300)}
                >
                  {/* ---- Header: Avatar + Author + Time ---- */}
                  <header className="social-post-header">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="social-post-avatar"
                      loading="lazy"
                    />
                    <div className="social-post-meta">
                      <span className="social-post-author">{post.author}</span>
                      <span className="social-post-time">{post.time}</span>
                    </div>
                    <span className="social-post-tag">{post.tag}</span>
                  </header>

                  {/* ---- Body: Title + Excerpt ---- */}
                  <a href={post.href} className="social-post-body">
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
// src/app/blogs/BlogSidebar.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function BlogSidebar({ blogs = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to blogs page with search query or handle filtering
      router.push(`/blogs?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Dynamically calculate categories from live blogs data
  const categoryCounts = blogs.reduce((acc, blog) => {
    const cat = blog.category || 'Uncategorized';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const dynamicCategories = Object.entries(categoryCounts);
  const dynamicTags = [...new Set(blogs.map((blog) => blog.category).filter(Boolean))];

  return (
    <div className="d-grid gap-4">
      
      {/* Working Search Widget */}
      <div className="glass-card p-4 rounded-4 shadow-sm bg-white bg-opacity-75">
        <h5 className="fs-6 fw-bold text-dark text-uppercase mb-3 border-start border-danger border-3 ps-2">Search</h5>
        <form onSubmit={handleSearch} className="input-group">
          <input 
            type="text" 
            className="form-control bg-light border-0 shadow-none small rounded-start-pill px-3" 
            placeholder="Search here..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-danger rounded-end-pill px-3" type="submit">
            <Search size={16} />
          </button>
        </form>
      </div>

      {/* Dynamic Categories Widget */}
      <div className="glass-card p-4 rounded-4 shadow-sm bg-white bg-opacity-75">
        <h5 className="fs-6 fw-bold text-dark text-uppercase mb-3 border-start border-danger border-3 ps-2">Categories</h5>
        <ul className="list-unstyled d-grid gap-2 mb-0 small">
          {dynamicCategories.length === 0 ? (
            <li className="text-muted small">No categories found</li>
          ) : (
            dynamicCategories.map(([catName, count], idx) => (
              <li key={idx} className="d-flex justify-content-between align-items-center py-1 border-bottom border-light-subtle">
                <span className="text-secondary">{catName}</span>
                <span className="text-muted">({String(count).padStart(2, '0')})</span>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Recent Posts Widget */}
      <div className="glass-card p-4 rounded-4 shadow-sm bg-white bg-opacity-75">
        <h5 className="fs-6 fw-bold text-dark text-uppercase mb-3 border-start border-danger border-3 ps-2">Recent Posts</h5>
        <div className="d-grid gap-3">
          {blogs.slice(0, 4).map((item) => (
            <div key={item.id} className="pb-2 border-bottom border-light-subtle">
              <Link href={`/blogs/${item.id}`} className="text-dark fw-bold text-decoration-none small hover-danger d-block mb-1">
                {item.title}
              </Link>
              <span className="text-danger small" style={{ fontSize: '0.75rem' }}>{item.date || 'Mar 21'} — {item.author || 'admin'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tag Cloud Widget */}
      <div className="glass-card p-4 rounded-4 shadow-sm bg-white bg-opacity-75">
        <h5 className="fs-6 fw-bold text-dark text-uppercase mb-3 border-start border-danger border-3 ps-2">Tag Cloud</h5>
        <div className="d-flex flex-wrap gap-2">
          {dynamicTags.length === 0 ? (
            <span className="text-muted small">No tags available</span>
          ) : (
            dynamicTags.map((tag, tIdx) => (
              <span key={tIdx} className="badge bg-light text-secondary border px-2 py-1 small fw-normal">
                {tag}
              </span>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
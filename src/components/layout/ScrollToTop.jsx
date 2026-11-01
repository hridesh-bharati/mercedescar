// src/components/ScrollToTop.jsx
'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [showScrollTopBtn, setShowScrollTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTopBtn(true);
      } else {
        setShowScrollTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showScrollTopBtn) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        background: '#000',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        width: '45px',
        height: '45px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        fontSize: '18px',
      }}
      title="Go to top"
    >
      ↑
    </button>
  );
}
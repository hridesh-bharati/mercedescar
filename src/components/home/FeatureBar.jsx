'use client';

import { useEffect, useRef, useState } from 'react';
import './FeatureBar.css';

// ---------- Icons ----------
const icons = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" className="icon-check" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  diagnostic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8" />
      <path d="M12 16v4" />
      <path d="M9 10l2 2 4-4" className="icon-check" />
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  ),
};

export default function FeatureBar() {
  const features = [
    { icon: icons.shield,      title: 'Certified Technicians',  subtitle: 'Factory trained experts' },
    { icon: icons.gear,        title: 'Genuine Parts',          subtitle: '100% original parts' },
    { icon: icons.diagnostic,  title: 'Advanced Diagnostics',   subtitle: 'Latest technology' },
    { icon: icons.support,     title: 'Customer Satisfaction',  subtitle: 'Your trust drives us' },
  ];

  const sectionRef = useRef(null);
  const itemRefs = useRef([]);
  const barRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // ---------- Scroll Reveal ----------
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ---------- 3D Tilt on bar ----------
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const handleMove = (e) => {
      const rect = bar.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      bar.style.setProperty('--rx', `${-y * 3}deg`);
      bar.style.setProperty('--ry', `${x * 4}deg`);

      // Cursor spotlight follow
      bar.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      bar.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };

    const handleLeave = () => {
      bar.style.setProperty('--rx', '0deg');
      bar.style.setProperty('--ry', '0deg');
    };

    bar.addEventListener('mousemove', handleMove);
    bar.addEventListener('mouseleave', handleLeave);
    return () => {
      bar.removeEventListener('mousemove', handleMove);
      bar.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  // ---------- Per-item 3D tilt ----------
  const handleItemMove = (e, index) => {
    const el = itemRefs.current[index];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--itx', `${-y * 5}deg`);
    el.style.setProperty('--ity', `${x * 6}deg`);
  };

  const handleItemLeave = (index) => {
    const el = itemRefs.current[index];
    if (!el) return;
    el.style.setProperty('--itx', '0deg');
    el.style.setProperty('--ity', '0deg');
  };

  return (
    <section
      ref={sectionRef}
      className={`feature-bar-section ${isVisible ? 'is-visible' : ''}`}
      aria-label="Why choose us"
    >
      {/* Floating background dots */}
      <div className="feature-bg-dots" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="feature-dot"></span>
        ))}
      </div>

      <div className="feature-bar-container">
        <div ref={barRef} className="feature-bar">
          {/* Animated top gradient line */}
          <span className="feature-top-line" aria-hidden="true"></span>

          {/* Cursor spotlight */}
          <span className="feature-spotlight" aria-hidden="true"></span>

          {/* Shine sweep on hover */}
          <span className="feature-shine" aria-hidden="true"></span>

          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className="feature-item"
              style={{ '--i': index }}
              onMouseMove={(e) => handleItemMove(e, index)}
              onMouseLeave={() => handleItemLeave(index)}
            >
              {/* Background big number */}
              <span className="feature-number" aria-hidden="true">
                0{index + 1}
              </span>

              {/* Icon */}
              <div className="feature-icon-wrap">
                <span className="feature-icon-ring" aria-hidden="true"></span>
                <div className="feature-icon">{feature.icon}</div>
              </div>

              {/* Text */}
              <div className="feature-text">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-subtitle">{feature.subtitle}</p>
              </div>

              {/* Divider */}
              {index < features.length - 1 && (
                <span className="feature-divider" aria-hidden="true"></span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
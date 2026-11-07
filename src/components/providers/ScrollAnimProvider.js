// src/components/providers/ScrollAnimProvider.jsx
'use client';

import { useEffect } from 'react';

export default function ScrollAnimProvider({ children }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Reduced motion — instant show
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document
        .querySelectorAll('[data-anim]')
        .forEach((el) => el.classList.add('anim-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('anim-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const observeAll = () => {
      document
        .querySelectorAll('[data-anim]:not(.anim-visible)')
        .forEach((el) => observer.observe(el));
    };

    observeAll();

    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return children;
}


// src/components/providers/useScrollAnimation.js
'use client';

import { useEffect } from 'react';

/**
 * Lightweight scroll animation hook — AOS-style, zero dependencies.
 * Animations: up, down, left, right
 *
 * Usage: <div data-anim="up" data-anim-delay="100">
 */
export function useScrollAnimation() {
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

    // Re-observe dynamically added content
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);
}


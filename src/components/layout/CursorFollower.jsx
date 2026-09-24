// src/components/layout/CursorFollower.jsx
'use client';

import { useEffect, useRef } from 'react';

export default function CursorFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only enable on real desktop
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isDesktop) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId;

    // Initial off-screen position (prevents flash at top-left)
    dot.style.transform = `translate(-100px, -100px)`;
    ring.style.transform = `translate(-100px, -100px)`;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Instant follow for dot
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    // Smooth trailing ring
    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onEnter = () => document.body.classList.remove('cursor-hidden');
    const onLeave = () => document.body.classList.add('cursor-hidden');

    // Hover detection — broad selector
    const hoverSelector = [
      'a',
      'button',
      '[role="button"]',
      'input',
      'select',
      'textarea',
      'summary',
      'label[for]',
      '.service-card',
      '.services-btn-primary',
      '.cursor-pointer',
    ].join(',');

    const onOver = (e) => {
      const el = e.target.closest?.(hoverSelector);
      document.body.classList.toggle('cursor-hover', !!el);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
// src/components/home/Process.jsx
'use client';

import { useEffect, useRef } from 'react';
import './Process.css';

export default function Process() {
  const sectionRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ✅ Skip on touch/reduced-motion
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.matchMedia('(hover: none)').matches)
    ) {
      return;
    }

    const handleMouseMove = (e) => {
      // ✅ Throttle with rAF — 60fps max
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const cards = section.querySelectorAll('.process-card');
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
          card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
        rafRef.current = null;
      });
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const steps = [
    {
      title: 'Mercedes Inspection',
      description:
        'Detailed multi-point analysis of your Mercedes by our certified technicians.',
      icon: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      ),
    },
    {
      title: 'Transparent Estimation',
      description:
        'Clear, itemized Mercedes pricing — no surprises, no hidden charges.',
      icon: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="13" y2="17" />
        </svg>
      ),
    },
    {
      title: 'Expert Mercedes Repair',
      description:
        'Precision service using genuine Mercedes parts and advanced tooling.',
      icon: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
    {
      title: 'Quality Check',
      description:
        'Final road test and safety verification before we hand back your Mercedes keys.',
      icon: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="process-section"
      id="process"
      ref={sectionRef}
      aria-labelledby="process-heading"
    >
      <div className="process-grid-bg" aria-hidden="true"></div>
      <div className="process-orb process-orb-1" aria-hidden="true"></div>
      <div className="process-orb process-orb-2" aria-hidden="true"></div>

      <div className="container process-container">
        <div className="process-header" data-anim="up">
          <div className="process-badge">
            <span className="process-badge-icon" aria-hidden="true">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </span>
            <span className="process-badge-text">MERCEDES WORK PROCESS</span>
          </div>

          {/* ✅ PDF keyword H2 */}
          <h2 id="process-heading" className="process-heading">
            Our 4-Step Mercedes Repair Process
            <span className="process-heading-accent">
              in Al Quoz, Dubai
            </span>
          </h2>
          <p className="process-paragraph">
            From the first inspection to the final road test, every step is
            designed to give you confidence, clarity and a perfectly tuned
            Mercedes in Dubai.
          </p>
        </div>

        <div className="process-timeline">
          <div className="process-timeline-track" aria-hidden="true">
            <div className="process-timeline-progress"></div>
          </div>

          <div className="process-grid">
            {steps.map((step, idx) => (
              <div
                className="process-step"
                key={idx}
                data-anim="up"
                data-anim-delay={idx * 150}
              >
                <div className="process-node" aria-hidden="true">
                  <span className="process-node-number">{idx + 1}</span>
                  <span className="process-node-ring"></span>
                </div>

                <div className="process-card">
                  <div
                    className="process-card-spotlight"
                    aria-hidden="true"
                  ></div>
                  <div className="process-card-glow" aria-hidden="true"></div>

                  <div className="process-icon-box">{step.icon}</div>

                  {/* ✅ h3 not h4 — hierarchy */}
                  <h3 className="process-title">{step.title}</h3>
                  <p className="process-desc">{step.description}</p>

                  <div className="process-card-footer">
                    <span className="process-card-step-label">
                      Step {idx + 1} of {steps.length}
                    </span>
                    <div className="process-card-arrow" aria-hidden="true">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
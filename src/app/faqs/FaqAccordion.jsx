// src/app/faqs/FaqAccordion.jsx
'use client';

import { useState } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

export default function FaqAccordion({ faqs }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="pxl-accordion pxl-accordion1 style-4 glass-card p-4 p-md-5 rounded-4 shadow-sm mb-4">
      {faqs.map((faq, index) => {
        const isActive = activeIndex === index;
        const contentId = `faq-content-${faq.id}`;
        const buttonId = `faq-button-${faq.id}`;

        return (
          <div
            className={`pxl--item mb-3 pb-3 border-bottom border-light-subtle ${
              isActive ? 'active' : ''
            }`}
            key={faq.id}
          >
            {/* ✅ Semantic heading + button */}
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                className="pxl-accordion--title ft-kenyan w-100 border-0 bg-transparent text-start py-2 d-flex align-items-center justify-content-between"
                onClick={() => toggleAccordion(index)}
                aria-expanded={isActive}
                aria-controls={contentId}
              >
                <span className="pxl-title--text fw-bold text-dark fs-5">
                  {faq.question}
                </span>
                <span
                  className="pxl-icon--action text-danger transition-transform flex-shrink-0"
                  aria-hidden="true"
                >
                  {isActive ? (
                    <ArrowDown size={18} />
                  ) : (
                    <ArrowRight size={18} />
                  )}
                </span>
              </button>
            </h3>

            {/* ✅ CSS-based collapse (smooth animation) */}
            <div
              id={contentId}
              role="region"
              aria-labelledby={buttonId}
              className={`pxl-accordion--content-wrap ${
                isActive ? 'is-open' : ''
              }`}
              hidden={!isActive}
            >
              <div className="pxl-accordion--content text-secondary small mt-2 ps-0">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

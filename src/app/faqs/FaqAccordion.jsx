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
        return (
          <div className={`pxl--item mb-3 pb-3 border-bottom border-light-subtle ${isActive ? 'active' : ''}`} key={faq.id}>
            <h3 
              className="pxl-accordion--title ft-kenyan m-0 py-2 d-flex align-items-center justify-content-between cursor-pointer"
              onClick={() => toggleAccordion(index)}
              style={{ cursor: 'pointer' }}
            >
              <span className="pxl-title--text fw-bold text-dark fs-5">
                {faq.question}
              </span>
              <span className="pxl-icon--action text-danger transition-transform">
                {isActive ? <ArrowDown size={18} /> : <ArrowRight size={18} />}
              </span>
            </h3>
            
            <div 
              id={faq.id} 
              className="pxl-accordion--content text-secondary small mt-2 ps-0" 
              style={{ 
                display: isActive ? 'block' : 'none',
                lineHeight: '1.8'
              }}
            >
              {faq.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
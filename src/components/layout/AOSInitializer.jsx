// src/components/layout/AOSInitializer.jsx
'use client';

import { useEffect } from 'react';
import AOS from 'aos';

export default function AOSInitializer() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: false,
      offset: 80,
    });
  }, []);

  return null;
}
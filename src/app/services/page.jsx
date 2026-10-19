// src/app/services/page.jsx
'use client';
import { useEffect, Suspense } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from "@/components/layout/Header";
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import ServiceGrid from './components/ServiceGrid';
import CTASection from './components/CTASection';
import './services.css';
import Footer from '@/components/layout/Footer';

export default function ServicesPage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <>
      <Header />
      <HeroSection />
      <IntroSection />
      <Suspense fallback={
        <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: '400px' }}>
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }>
        <ServiceGrid />
      </Suspense>
      <CTASection />
      <Footer />
    </>
  );
}
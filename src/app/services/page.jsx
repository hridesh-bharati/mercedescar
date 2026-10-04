'use client';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from "@/components/layout/Header";
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import ServiceGrid from './components/ServiceGrid';
import CTASection from './components/CTASection';
import './services.css';

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
      <ServiceGrid />
      <CTASection />
    </>
  );
}
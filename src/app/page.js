// src/app/page.jsx
'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Process from '@/components/home/Process';
import RedCarBanner from '@/components/home/RedCarBanner';
import Contact from '@/components/home/Contact';
import FeatureBar from '@/components/home/FeatureBar';

export default function Home() {
  return (
    <div className="min-vh-100">
      <Header />
      <Hero />
      <FeatureBar />
      <Services />
      <Process />
      <RedCarBanner />
      <Contact />
      <Footer />
    </div>
  );
}
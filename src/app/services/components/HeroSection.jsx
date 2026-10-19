// src/app/services/components/HeroSection.jsx
'use client';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="services-hero">
      <div className="container text-center">
        <div className="services-hero-badge" data-aos="fade-down">
          <Sparkles size={16} className="text-warning" />
          Shop With Confidence • Certified Vehicles
        </div>

        <h1 className="services-hero-title" data-aos="fade-up" data-aos-delay="100">
          Discover Our Best Deals On <br />
          <span className="text-danger">New And Used Cars</span>
        </h1>

        <div className="services-breadcrumb mt-4" data-aos="fade-up" data-aos-delay="200">
          <Link href="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-sep">✕</span>
          <span className="breadcrumb-current">Services</span>
        </div>
      </div>
    </section>
  );
}
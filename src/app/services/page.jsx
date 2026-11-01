// src/app/services/page.jsx
import Header from "@/components/layout/Header";
import HeroSection from './components/HeroSection';
import ServiceGrid from './components/ServiceGrid';
import CTASection from './components/CTASection';
import Footer from '@/components/layout/Footer';
import { Suspense } from 'react';
import { unstable_cache } from 'next/cache';
import { dbService } from '@/services/dbService';
import './services.css'; 
const SITE_URL = 'https://mercedesgaragedubai.com';
const SITE_NAME = 'German Auto Expert';

// ✅ SEO Metadata

export const metadata = {
  title: 'Mercedes-Benz Specialist Services in Al Quoz, Dubai | German Auto Expert',

  description:
    'German Auto Expert provides specialist Mercedes-Benz servicing, maintenance, engine diagnostics, brake repair, transmission service and AC repair in Al Quoz, Dubai.',

  keywords: [
    'Mercedes service Dubai',
    'Mercedes repair Dubai',
    'Mercedes garage Al Quoz',
    'Mercedes-Benz specialist Dubai',
    'Mercedes maintenance Dubai',
    'Mercedes engine diagnostics Dubai',
    'Mercedes brake service Dubai',
    'Mercedes transmission repair Dubai',
    'Mercedes AC repair Dubai',
  ],

  alternates: {
    canonical: 'https://mercedesgaragedubai.com/services',
  },

  openGraph: {
    title: 'Mercedes-Benz Specialist Services in Dubai | German Auto Expert',
    description:
      'Professional Mercedes-Benz maintenance, diagnostics and repair services in Al Quoz, Dubai.',
    url: 'https://mercedesgaragedubai.com/services',
    siteName: 'German Auto Expert',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Mercedes-Benz Services in Dubai | German Auto Expert',
    description:
      'Explore specialist Mercedes-Benz servicing and repair in Al Quoz, Dubai.',
  },

  robots: {
    index: true,
    follow: true,
  },
};


// ✅ Caching services data for speed
const getCachedServices = unstable_cache(
  async () => {
    const res = await dbService.getAll('services');
    return res.success && res.data ? res.data : [];
  },
  ['services-page-cache'],
  { revalidate: 60, tags: ['services'] }
);

export default async function ServicesPage() {
  const initialServices = await getCachedServices();

  // JSON-LD Schema for Services ItemList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Mercedes-Benz Services Dubai',
    description: 'Comprehensive list of Mercedes-Benz repair and maintenance services offered in Dubai.',
    itemListElement: initialServices.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.title,
      url: `${SITE_URL}/services/${service.id}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* ✅ CSS Animations replacement for AOS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fadeUp 0.8s ease forwards; opacity: 0; }
        .animate-fade-down { animation: fadeDown 0.8s ease forwards; opacity: 0; }
      `}} />

      <Header />
      <main>
        <HeroSection />
        <Suspense fallback={
          <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: '400px' }}>
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }>
          {/* ✅ Passing initial data to Client to avoid loading spinner */}
          <ServiceGrid initialServices={initialServices} />
        </Suspense>
        <CTASection />
      </main>
      <Footer />
    </>
  );
}



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
  title: 'Mercedes-Benz Services in Dubai | German Auto Expert',
  description: 'Explore our comprehensive Mercedes-Benz services in Al Quoz, Dubai. From routine maintenance and engine diagnostics to transmission repair and AC service.',
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: 'Mercedes-Benz Services in Dubai | German Auto Expert',
    description: 'Expert Mercedes servicing, repair, and maintenance in Dubai. Certified technicians and genuine parts.',
    url: `${SITE_URL}/services`,
    siteName: SITE_NAME,
    type: 'website',
  },
  robots: { index: true, follow: true },
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
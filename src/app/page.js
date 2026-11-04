// src/app/page.jsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Process from '@/components/home/Process';
import RedCarBanner from '@/components/home/RedCarBanner';
import Contact from '@/components/home/Contact';
import FeatureBar from '@/components/home/FeatureBar';
import AboutCard from '@/components/home/AboutCard';
import RecentPosts from '@/components/recent-post/RecentPost';
import Welcome from '@/components/home/Welcome';
import Preloader from '@/components/layout/PreLoader';

export const metadata = {
  title: 'Mercedes Garage Dubai | Mercedes-Benz Specialist Workshop',
  description:
    'Looking for a Mercedes-Benz garage in Dubai? Specialist Mercedes repair, servicing, diagnostics and maintenance in Al Quoz. Contact our expert team today.',
  alternates: {
    canonical: 'https://mercedesgaragedubai.com',
  },
};

const faqs = [
  {
    q: 'Do you specialise only in Mercedes-Benz vehicles?',
    a: 'Yes. Mercedes Garage Dubai is a Mercedes-Benz specialist workshop in Al Quoz, Dubai, focused entirely on Mercedes repair, maintenance and modification.',
  },
  {
    q: 'Where is your Mercedes workshop in Dubai?',
    a: 'Warehouse #S2, Al Quoz 20C Street, Industrial Area 2, Dubai, UAE. We are open Monday to Saturday, 9am to 8pm.',
  },
  {
    q: 'Do you install Mercedes AMG body kits and facelift conversions?',
    a: 'Yes. We install AMG body kits, G63 wide-body kits, Mercedes facelift conversions (W205 to W206, W213) and custom upgrades at our Dubai workshop.',
  },
  {
    q: 'Can I book a Mercedes service online?',
    a: 'Yes. Book online through our services page or call +971 56 788 8808 to schedule your Mercedes service in Al Quoz.',
  },
];

export default function Home() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main className="min-vh-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Preloader />
      <Header />
      <Hero />
      <FeatureBar />
      <AboutCard />
      <RecentPosts />
      <Welcome />
      <Services />
      <Process />
      <RedCarBanner />

      {/* ✅ FAQ Section (PDF checklist) */}
      <section className="py-5 bg-light" id="faq">
        <div className="container">
          <h2 className="mb-4">Frequently Asked Questions</h2>
          {faqs.map((f, i) => (
            <details
              key={i}
              className="mb-3 p-3 border rounded bg-white"
            >
              <summary className="fw-bold" style={{ cursor: 'pointer' }}>{f.q}</summary>
              <p className="mt-2 mb-0">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
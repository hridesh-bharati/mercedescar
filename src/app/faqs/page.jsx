// src/app/faqs/page.jsx
import Link from 'next/link';
import { ArrowRight, ArrowDown, MessageSquare } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FaqAccordion from './FaqAccordion';
import './Faqs.css';

const SITE_URL = 'https://mercedesgaragedubai.com';
const SITE_NAME = 'German Auto Expert';

// ✅ SEO Metadata
export const metadata = {
  title: 'Mercedes Repair FAQs Dubai | German Auto Expert',
  description: 'Find answers to common questions about Mercedes engine repair, brake service, transmission issues, and maintenance in Dubai. Expert advice from German Auto Expert.',
  alternates: { canonical: `${SITE_URL}/faqs` },
  openGraph: {
    title: 'Mercedes Repair FAQs Dubai | German Auto Expert',
    description: 'Find answers to common questions about Mercedes engine repair, brake service, and maintenance in Dubai.',
    url: `${SITE_URL}/faqs`,
    siteName: SITE_NAME,
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const faqsData = [
  {
    id: 'faq-1',
    question: 'What are the signs that my car needs engine repair?',
    answer: 'If your car experiences loss of power, unusual noises (knocking, ticking), excessive exhaust smoke, or frequent overheating, it may need engine repair. Other warning signs include poor fuel efficiency, rough idling, and the check engine light staying on. Addressing these issues early can prevent costly repairs and extend your engine’s lifespan.',
  },
  {
    id: 'faq-2',
    question: 'How do I know if my brakes need to be replaced?',
    answer: 'Common signs of failing brakes include squealing or grinding noises when pressing the pedal, a spongy or soft brake pedal, vibrating steering wheel while stopping, or the car pulling to one side. If you notice any of these, bring your car to German Auto Expert for an immediate inspection.',
  },
  {
    id: 'faq-3',
    question: 'What should I do if my car is overheating?',
    answer: 'If your engine temperature gauge rises into the red zone or steam appears from under the hood, safely pull over immediately and turn off the engine. Do not open the radiator cap while hot. Call our emergency hotline or schedule a tow to our Al Quoz workshop for coolant leak or thermostat checks.',
  },
  {
    id: 'faq-4',
    question: 'Why is my car making strange noises?',
    answer: 'Strange noises often point to specific mechanical issues: squealing under the hood usually means a worn serpentine belt, grinding indicates worn brake pads, and clunking sounds from underneath point to suspension or joint wear. Have our technicians inspect it to diagnose the exact source.',
  },
  {
    id: 'faq-5',
    question: 'What should I do if my transmission is slipping?',
    answer: 'Transmission slipping causes delayed acceleration, rough or sudden gear shifts, strange whining noises, or sudden revving without speed increase. Check your transmission fluid levels if possible, and visit our specialist workshop immediately to prevent total transmission failure.',
  },
  {
    id: 'faq-6',
    question: 'What are the signs of a failing timing belt?',
    answer: 'A failing timing belt can produce a ticking noise coming from the engine, engine misfires, oil leaks around the motor front, or complete engine failure to start. Mercedes manufacturers recommend replacing timing components according to specific mileage intervals.',
  },
  {
    id: 'faq-7',
    question: 'Why does my car stall or struggle to start?',
    answer: 'Stalling and hard starting are typically caused by a weak battery, faulty alternator, clogged fuel filters, worn spark plugs, or issues within the ignition system. A comprehensive computer diagnostic scan at our garage will pinpoint the exact faulty component.',
  },
  {
    id: 'faq-8',
    question: 'Why is my check engine light on?',
    answer: 'The check engine light can trigger due to hundreds of reasons ranging from a loose gas cap to a faulty oxygen sensor, catalytic converter issue, or engine misfire. Do not ignore it—bring your Mercedes to our workshop for an advanced XENTRY system scan.',
  },
  {
    id: 'faq-9',
    question: 'How often should I check my tire pressure?',
    answer: 'It is recommended to check your tire pressure at least once a month and before any long road trip. Maintaining proper tire pressure ensures optimal fuel efficiency, safer handling, and extends the lifespan of your luxury vehicle tires.',
  },
];

// ✅ Google Rich Snippets (FAQ Schema)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqsData.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function Faqs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="faqs-main">
        {/* HERO BANNER */}
        <section className="faqs-hero text-white position-relative">
          <div className="faqs-hero-bg"></div>
          <div className="faqs-hero-overlay"></div>
          <div className="container position-relative z-2 py-4">
            <div className="row">
              <div className="col-lg-7 text-start animate-fade-down">
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-dark bg-opacity-50 border border-light border-opacity-25 mb-2">
                  <span style={{ width: '20px', height: '2px', background: '#D6241D', display: 'inline-block' }}></span>
                  <span className="small fw-bold tracking-wider text-danger">FAQS</span>
                </div>
                <h1 className="display-5 fw-bold mb-2">
                  Frequently Asked <span className="text-danger">Questions</span>
                </h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0 bg-dark bg-opacity-50 px-3 py-1 rounded-pill d-inline-flex align-items-center border border-light border-opacity-10 small">
                    <li className="breadcrumb-item"><Link href="/" className="text-danger text-decoration-none fw-semibold">Home</Link></li>
                    <li className="breadcrumb-item active text-light fw-semibold" aria-current="page">FAQs</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="faqs-section py-5 position-relative overflow-hidden">
          <div className="faqs-glow faqs-glow-blue"></div>
          <div className="faqs-glow faqs-glow-pink"></div>

          <div className="container position-relative z-2">
            <div className="row justify-content-center text-center mb-5">
              <div className="col-lg-7 animate-fade-down">
                <div className="d-inline-flex align-items-center gap-2 mb-2">
                  <span style={{ width: '15px', height: '2px', background: '#D6241D' }}></span>
                  <span className="text-danger fw-bold small text-uppercase tracking-wider">POPULAR QUESTIONS</span>
                  <span style={{ width: '15px', height: '2px', background: '#D6241D' }}></span>
                </div>
                <h2 className="fw-bold text-dark fs-2">Frequently Asked Questions</h2>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-9 animate-fade-up">
                {/* ✅ Client Component for Accordion (Handles Click State) */}
                <FaqAccordion faqs={faqsData} />

                {/* Still Need Help Banner */}
                <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
                  <Link 
                    href="/contact-us"
                    className="glass-card p-4 rounded-4 shadow-sm text-decoration-none d-flex align-items-center justify-content-center gap-3 text-dark fw-bold transition-all hover-scale"
                    style={{ background: 'rgba(255, 255, 255, 0.85)' }}
                  >
                    <div className="bg-danger text-white p-2 rounded-circle d-flex align-items-center justify-content-center shadow-sm">
                      <MessageSquare size={22} />
                    </div>
                    <span className="fs-6 tracking-wider">STILL NEED HELP? CHAT TO US.</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-down { animation: fadeDown 0.8s ease forwards; opacity: 0; }
        .animate-fade-up { animation: fadeUp 0.8s ease forwards; opacity: 0; }
      `}} />
    </>
  );
}
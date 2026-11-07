// src/app/faqs/page.jsx
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FaqAccordion from './FaqAccordion';
import './Faqs.css';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mercedesgaragedubai.com';
const SITE_NAME = 'Mercedes Garage Dubai';

// ✅ SEO Metadata
export const metadata = {
  title: 'Mercedes Repair FAQs Dubai | Mercedes Garage Dubai',
  description:
    'Find answers to common questions about Mercedes engine repair, brake service, transmission issues and maintenance in Al Quoz, Dubai. Expert advice from Mercedes Garage Dubai.',
  alternates: { canonical: `${SITE_URL}/faqs` },
  openGraph: {
    title: 'Mercedes Repair FAQs Dubai | Mercedes Garage Dubai',
    description:
      'Answers to common questions about Mercedes engine, brake, transmission and AC repair in Al Quoz, Dubai.',
    url: `${SITE_URL}/faqs`,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/images/og-faqs.png`,
        width: 1200,
        height: 630,
        alt: 'Mercedes Garage Dubai FAQs',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercedes Repair FAQs Dubai | Mercedes Garage Dubai',
    description:
      'Answers to common Mercedes repair questions from our Al Quoz workshop.',
    images: [`${SITE_URL}/images/og-faqs.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const faqsData = [
  {
    id: 'faq-1',
    question: 'What are the signs that my Mercedes needs engine repair?',
    answer:
      'If your Mercedes experiences loss of power, unusual noises (knocking, ticking), excessive exhaust smoke, or frequent overheating, it may need engine repair. Other warning signs include poor fuel efficiency, rough idling, and the check engine light staying on. Addressing these issues early at our Al Quoz workshop can prevent costly repairs and extend your engine’s lifespan.',
  },
  {
    id: 'faq-2',
    question: 'How do I know if my Mercedes brakes need to be replaced?',
    answer:
      'Common signs of failing Mercedes brakes include squealing or grinding noises when pressing the pedal, a spongy or soft brake pedal, vibrating steering wheel while stopping, or the car pulling to one side. If you notice any of these, bring your Mercedes to Mercedes Garage Dubai for an immediate brake inspection.',
  },
  {
    id: 'faq-3',
    question: 'What should I do if my Mercedes is overheating?',
    answer:
      'If your engine temperature gauge rises into the red zone or steam appears from under the hood, safely pull over immediately and turn off the engine. Do not open the radiator cap while hot. Call our emergency hotline or schedule a tow to our Al Quoz workshop for coolant leak or thermostat checks.',
  },
  {
    id: 'faq-4',
    question: 'Why is my Mercedes making strange noises?',
    answer:
      'Strange noises often point to specific mechanical issues: squealing under the hood usually means a worn serpentine belt, grinding indicates worn brake pads, and clunking sounds from underneath point to suspension or joint wear. Our Mercedes technicians will diagnose the exact source with XENTRY diagnostics.',
  },
  {
    id: 'faq-5',
    question: 'What should I do if my Mercedes transmission is slipping?',
    answer:
      'Mercedes transmission slipping causes delayed acceleration, rough or sudden gear shifts, strange whining noises, or sudden revving without speed increase. Check your transmission fluid levels if possible, and visit our specialist Mercedes workshop immediately to prevent total transmission failure.',
  },
  {
    id: 'faq-6',
    question: 'What are the signs of a failing Mercedes timing belt?',
    answer:
      'A failing Mercedes timing belt can produce a ticking noise coming from the engine, engine misfires, oil leaks around the motor front, or complete engine failure to start. Mercedes-Benz recommends replacing timing components according to specific mileage intervals — we can advise based on your model.',
  },
  {
    id: 'faq-7',
    question: 'Why does my Mercedes stall or struggle to start?',
    answer:
      'Stalling and hard starting are typically caused by a weak battery, faulty alternator, clogged fuel filters, worn spark plugs, or issues within the ignition system. A comprehensive Mercedes XENTRY diagnostic scan at our Al Quoz garage will pinpoint the exact faulty component.',
  },
  {
    id: 'faq-8',
    question: 'Why is my Mercedes check engine light on?',
    answer:
      'The Mercedes check engine light can trigger due to hundreds of reasons — from a loose gas cap to a faulty oxygen sensor, catalytic converter issue, or engine misfire. Do not ignore it: bring your Mercedes to our workshop for an advanced XENTRY system scan.',
  },
  {
    id: 'faq-9',
    question: 'How often should I check my Mercedes tire pressure?',
    answer:
      'We recommend checking your Mercedes tire pressure at least once a month and before any long road trip. Maintaining proper tire pressure ensures optimal fuel efficiency, safer handling and extends the lifespan of your Mercedes tires.',
  },
];

// ✅ Schema: FAQPage + BreadcrumbList
const faqJsonLd = {
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

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'FAQs',
      item: `${SITE_URL}/faqs`,
    },
  ],
};

export default function Faqs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqJsonLd, breadcrumbJsonLd]),
        }}
      />
      <Header />

      <main className="faqs-main">
        {/* HERO BANNER */}
        <section className="faqs-hero text-white position-relative">
          <div className="faqs-hero-bg"></div>
          <div className="faqs-hero-overlay"></div>
          <div className="container position-relative z-2 py-4">
            <div className="row">
              <div className="col-lg-8 text-start" data-anim="down">
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-dark bg-opacity-50 border border-light border-opacity-25 mb-2">
                  <span
                    style={{
                      width: '20px',
                      height: '2px',
                      background: '#D6241D',
                      display: 'inline-block',
                    }}
                  ></span>
                  <span className="small fw-bold tracking-wider text-danger">
                    MERCEDES FAQS
                  </span>
                </div>
                <h1 className="display-5 fw-bold mb-2">
                  Mercedes Repair FAQs
                  <span className="text-danger d-block fs-5 mt-2">
                    Dubai &amp; Al Quoz Workshop Answers
                  </span>
                </h1>
                <nav aria-label="Breadcrumb">
                  <ol className="breadcrumb mb-0 bg-dark bg-opacity-50 px-3 py-1 rounded-pill d-inline-flex align-items-center border border-light border-opacity-10 small">
                    <li className="breadcrumb-item">
                      <Link
                        href="/"
                        className="text-danger text-decoration-none fw-semibold"
                      >
                        Home
                      </Link>
                    </li>
                    <li
                      className="breadcrumb-item active text-light fw-semibold"
                      aria-current="page"
                    >
                      FAQs
                    </li>
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
            <div
              className="row justify-content-center text-center mb-5"
              data-anim="down"
            >
              <div className="col-lg-7">
                <div className="d-inline-flex align-items-center gap-2 mb-2">
                  <span
                    style={{
                      width: '15px',
                      height: '2px',
                      background: '#D6241D',
                    }}
                  ></span>
                  <span className="text-danger fw-bold small text-uppercase tracking-wider">
                    POPULAR MERCEDES QUESTIONS
                  </span>
                  <span
                    style={{
                      width: '15px',
                      height: '2px',
                      background: '#D6241D',
                    }}
                  ></span>
                </div>
                <h2 className="fw-bold text-dark fs-2">
                  Frequently Asked Questions About Mercedes Repair
                </h2>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-9" data-anim="up">
                <FaqAccordion faqs={faqsData} />

                {/* Still Need Help Banner */}
                <div data-anim="up" data-anim-delay="200">
                  <Link
                    href="/contact-us"
                    className="glass-card p-4 rounded-4 shadow-sm text-decoration-none d-flex align-items-center justify-content-center gap-3 text-dark fw-bold transition-all hover-scale"
                    style={{ background: 'rgba(255, 255, 255, 0.85)' }}
                  >
                    <div className="bg-danger text-white p-2 rounded-circle d-flex align-items-center justify-content-center shadow-sm">
                      <MessageSquare size={22} aria-hidden="true" />
                    </div>
                    <span className="fs-6 tracking-wider">
                      STILL NEED HELP? CHAT TO OUR MERCEDES EXPERTS.
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

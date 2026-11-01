// src/app/body-kits/[slug]/page.jsx
import { dbService } from '@/services/dbService';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Wrench, Calendar, Phone, Mail, MapPin, CheckCircle2, Sparkles, Clock, Award, Star, Images } from 'lucide-react';
import styles from './page.module.css'; 

const SITE_URL = 'https://mercedesgaragedubai.com';
const SITE_NAME = 'German Auto Expert';

const slugify = (str = '') =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Static SEO & Content mapping based on slug category or fallback
const getStaticPageContent = (slug, title = '') => {
  const formattedTitle = title || slug.replace(/-/g, ' ').toUpperCase();
  return {
    seoTitle: `Mercedes ${formattedTitle} Dubai | ${SITE_NAME}`,
    seoDescription: `Professional Mercedes ${formattedTitle} installation, body kits, and custom upgrades in Al Quoz, Dubai by certified technicians.`,
    h1: `Mercedes ${formattedTitle} in Dubai`,
    heroIntro: 'Professional customization and body kit upgrades designed specifically for Mercedes-Benz vehicles with OEM precision.',
    contentSections: [
      { heading: 'Precision Craftsmanship & Fitment', body: 'Our certified technicians deliver dealership-level precision for all customization and body kit installations, ensuring seamless alignment and factory-grade finish.' },
      { heading: 'Enhanced Aesthetics & Performance', body: 'Upgrade your vehicle’s road presence with premium styling parts that combine aggressive styling with aerodynamic efficiency.' }
    ],
    faqs: [
      { q: 'How long does installation take?', a: 'Most body kit installations and upgrades are completed within 3 to 5 working days.' },
      { q: 'Do you use genuine Mercedes parts?', a: 'Yes, we use only OEM or premium-grade aftermarket components built to exact factory specifications.' },
      { q: 'Is warranty provided on installation?', a: 'All our body kit installations and paint services are backed by our workmanship warranty.' }
    ]
  };
};

async function getItem(slug) {
  try {
    const res = await dbService.getAll('body_kits_upgrades');
    if (!res.success || !res.data) return null;
    const dataList = Array.isArray(res.data)
      ? res.data
      : Object.keys(res.data).map(k => ({ id: k, ...res.data[k] }));

    const found = dataList.find(i =>
      i.slug === slug ||
      i.id === slug ||
      slugify(i.title) === slug ||
      (slug === 'amg-body-kits' && i.category?.toLowerCase().includes('amg')) ||
      (slug === 'mercedes-facelift' && i.category?.toLowerCase().includes('facelift')) ||
      (slug === 'custom-upgrades' && i.category?.toLowerCase().includes('custom'))
    );

    if (found) {
      const staticMeta = getStaticPageContent(slug, found.title);
      return { ...found, ...staticMeta };
    }

    const fallbackTitle = slug.replace(/-/g, ' ');
    return {
      title: fallbackTitle.toUpperCase(),
      category: 'Body Kits & Upgrades',
      tagline: 'Elite Mercedes-Benz Upgrades in Al Quoz, Dubai',
      desc: 'Transform your Mercedes with professional installation services at German Auto Expert.',
      imageUrl: '/images/car-class.png',
      imageUrls: ['/images/car-class.png'],
      ...getStaticPageContent(slug, fallbackTitle),
    };
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || '';
  const item = await getItem(slug);
  if (!item) return { title: 'Service Not Found' };

  const images = item.imageUrls?.length ? item.imageUrls : [item.imageUrl || `${SITE_URL}/images/car-class.png`];

  return {
    title: item.seoTitle,
    description: item.seoDescription,
    keywords: [item.title, item.category, 'Mercedes body kit Dubai', 'Mercedes upgrade Al Quoz', 'AMG body kit Dubai', item.h1].filter(Boolean),
    alternates: { canonical: `${SITE_URL}/body-kits/${slug}` },
    openGraph: {
      title: item.seoTitle,
      description: item.seoDescription,
      url: `${SITE_URL}/body-kits/${slug}`,
      siteName: SITE_NAME,
      images: images.map(url => ({ url, alt: item.title })),
      type: 'website',
      locale: 'en_AE',
    },
    twitter: { card: 'summary_large_image', title: item.seoTitle, description: item.seoDescription, images: images },
    robots: { index: true, follow: true },
  };
}

export default async function BodyKitsDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || '';
  const item = await getItem(slug);

  if (!item) {
    return (
      <>
        <Header />
        <main className="container py-5 text-center min-vh-100 d-flex flex-column justify-content-center align-items-center">
          <h1 className="fw-bold text-dark mb-3">Service Coming Soon</h1>
          <Link href="/" className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm">Back to Home</Link>
        </main>
        <Footer />
      </>
    );
  }

  const defaultHeroImage = '/images/services/services.avif'; 
  
  // Compact gallery images array
  const galleryImages = item.imageUrls?.length 
    ? item.imageUrls 
    : (item.imageUrl ? [item.imageUrl] : ['/images/car-class.png']);

  const features = [
    { icon: ShieldCheck, title: 'Certified Installation', desc: 'Factory-trained technicians with Mercedes-specific experience.' },
    { icon: Wrench, title: 'OEM & Premium Parts', desc: 'Only genuine or high-grade aftermarket components used.' },
    { icon: Clock, title: 'Fast Turnaround', desc: 'Most upgrades completed within 3-5 working days.' },
    { icon: Award, title: 'Warranty Backed', desc: 'All installations covered by our workmanship warranty.' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AutoRepair',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        telephone: '+971 56 788 8808',
        address: { '@type': 'PostalAddress', streetAddress: 'Al Quoz Industrial Area', addressLocality: 'Dubai', addressCountry: 'AE' },
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/body-kits/${slug}#service`,
        serviceType: item.title,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'City', name: 'Dubai' },
        name: item.h1 || item.title,
        description: item.heroIntro || item.desc,
        image: galleryImages.map(url => url.startsWith('http') ? url : `${SITE_URL}${url}`),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Body Kits', item: `${SITE_URL}/body-kits` },
          { '@type': 'ListItem', position: 3, name: item.title, item: `${SITE_URL}/body-kits/${slug}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: item.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="bg-light pb-5">
        
        {/* HERO SECTION */}
        <section className={`position-relative text-white overflow-hidden ${styles.heroSection}`}>
          <div className="position-absolute top-0 start-0 w-100 h-100">
            <Image 
              src={defaultHeroImage} 
              alt={`Mercedes ${item.title} Hero Background`} 
              fill 
              className={styles.heroImage} 
              priority 
              sizes="100vw" 
            />
          </div>
          
          <div className={`position-absolute top-0 start-0 w-100 h-100 ${styles.heroOverlay}`} />
          
          <div className={`container position-relative d-flex flex-column justify-content-center align-items-center text-center ${styles.heroContent}`}>
            <div>
              <span className={`badge text-white px-3 py-2 mb-4 rounded-pill fw-semibold ${styles.glassBadge}`}>
                <Sparkles size={14} className="me-2" /> {item.category} · CERTIFIED
              </span>
            </div>
            
            <h1 className="display-4 fw-bold mb-3">
              {item.h1 || item.title}
            </h1>
            
            <p className="text-white-50 fs-5 mb-4 maxWidth600">
              {item.tagline || item.heroIntro || item.desc}
            </p>

            <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
              <a href="#booking-form" className="btn btn-danger rounded-pill px-4 py-2 fw-bold shadow-sm d-flex align-items-center gap-2">
                <Calendar size={18} /> Get a Quote
              </a>
              <a href="tel:+971567888808" className={`btn text-white rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 ${styles.glassDarkBtn}`}>
                <Phone size={18} /> Call Now
              </a>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-4 pt-4 border-top border-secondary border-opacity-25 w-100">
              <div className="d-flex align-items-center gap-2 text-white-50 small"><ShieldCheck size={18} className="text-danger" /> Certified</div>
              <div className="d-flex align-items-center gap-2 text-white-50 small"><Award size={18} className="text-danger" /> OEM Parts</div>
              <div className="d-flex align-items-center gap-2 text-white-50 small"><Star size={18} className="text-danger" /> 5-Star Rated</div>
            </div>
          </div>
        </section>

        <div className="container py-5">
          <div className="row g-4 g-lg-5">
            
            {/* LEFT COLUMN */}
            <div className="col-12 col-lg-8">
              
              {/* COMPACT GALLERY */}
              {galleryImages.length > 0 && (
                <div className={`rounded-4 p-4 mb-4 ${styles.glassCard}`}>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className={styles.iconBox}><Images size={22} /></div>
                    <div>
                      <h2 className="fw-bold text-dark mb-0 fs-5">Photo Gallery</h2>
                      <p className="text-muted small mb-0">{galleryImages.length} images showcase · {item.category}</p>
                    </div>
                  </div>
                  <div className={styles.galleryGrid}>
                    {galleryImages.map((url, idx) => (
                      <div key={idx} className={styles.galleryItem}>
                        <Image src={url} alt={`${item.title} photo ${idx + 1}`} fill className={`object-fit-cover ${styles.galleryImg}`} sizes="(max-width: 576px) 50vw, 33vw" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* OVERVIEW */}
              <div className={`rounded-4 p-4 p-md-5 mb-4 ${styles.glassCard}`}>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className={styles.iconBox}><Wrench size={22} /></div>
                  <div>
                    <h2 className="fw-bold text-dark mb-0 fs-4">Overview</h2>
                    <p className="text-muted small mb-0">{item.category}</p>
                  </div>
                </div>
                {item.desc && <p className="text-secondary mb-4 fs-6">{item.desc}</p>}
                <div className={styles.contentProse}>
                  {item.contentSections.map((sec, i) => (
                    <div key={i} className="mb-4">
                      {sec.heading?.trim() && (
                        <h3 className="fw-bold text-dark fs-6 mb-2 d-flex align-items-center gap-2">
                          <CheckCircle2 size={18} className="text-danger flex-shrink-0" /> {sec.heading}
                        </h3>
                      )}
                      {sec.body?.trim() && <p className="mb-0 text-secondary small">{sec.body}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* FEATURES */}
              <div className={`rounded-4 p-4 mb-4 ${styles.glassCard}`}>
                <h3 className="fw-bold text-dark fs-5 mb-3">Why Choose Us?</h3>
                <div className="row g-3">
                  {features.map((feat, i) => (
                    <div key={i} className="col-12 col-md-6">
                      <div className="d-flex gap-3 p-3 rounded-3 bg-white bg-opacity-75 h-100 border border-white shadow-sm">
                        <div className={styles.iconBoxSm}><feat.icon size={18} /></div>
                        <div>
                          <h4 className="fw-bold fs-6 mb-1 text-dark">{feat.title}</h4>
                          <p className="text-muted small mb-0">{feat.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className={`rounded-4 p-4 ${styles.glassCard}`}>
                <h3 className="fw-bold text-dark fs-5 mb-4 d-flex align-items-center gap-2">
                  <span className="badge bg-danger rounded-pill">FAQ</span> Frequently Asked Questions
                </h3>
                <div className="accordion" id="faqAcc">
                  {item.faqs.map((f, idx) => (
                    <div key={idx} className="accordion-item border-0 rounded-3 mb-2 overflow-hidden bg-white bg-opacity-75 shadow-sm">
                      <h4 className="accordion-header">
                        <button className="accordion-button fw-bold small shadow-none bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target={`#faq${idx}`} aria-expanded={idx === 0 ? 'true' : 'false'}>
                          {f.q}
                        </button>
                      </h4>
                      <div id={`faq${idx}`} className={`accordion-collapse collapse ${idx === 0 ? 'show' : ''}`} data-bs-parent="#faqAcc">
                        <div className="accordion-body text-secondary small">{f.a}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN SIDEBAR */}
            <div className="col-12 col-lg-4" id="booking-form">
              <div className="sticky-top" style={{ top: '100px' }}>
                
                {/* BOOKING CARD */}
                <div className={`rounded-4 p-4 mb-4 ${styles.glassCard}`}>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div className={styles.iconBoxSm}><Calendar size={18} /></div>
                    <h3 className="fw-bold mb-0 fs-5 text-dark">Enquire Now</h3>
                  </div>
                  <p className="text-muted small mb-4">Get professional consultation from our modification experts.</p>
                  <div className="d-grid gap-2 mb-4">
                    <a href="tel:+971567888808" className="btn btn-danger rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm">
                      <Phone size={16} /> Call Now
                    </a>
                    <a href="https://wa.me/971567888808" target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2">
                      <Mail size={16} /> WhatsApp Us
                    </a>
                  </div>
                  <div className="d-flex flex-column gap-2 small text-muted pt-3 border-top">
                    <div className="d-flex align-items-center gap-2"><Phone size={14} className="text-danger flex-shrink-0" /><span>+971 56 788 8808</span></div>
                    <div className="d-flex align-items-center gap-2"><Mail size={14} className="text-danger flex-shrink-0" /><span>info@mercedesgaragedubai.com</span></div>
                    <div className="d-flex align-items-center gap-2"><MapPin size={14} className="text-danger flex-shrink-0" /><span>Al Quoz, Dubai, UAE</span></div>
                    <div className="d-flex align-items-center gap-2"><Clock size={14} className="text-danger flex-shrink-0" /><span>Mon - Sat: 9:00 AM - 7:00 PM</span></div>
                  </div>
                </div>

                {/* EXPLORE SERVICES */}
                <div className={`rounded-4 p-4 ${styles.glassCard}`}>
                  <h4 className="fw-bold fs-6 mb-3 text-dark">Explore More Services</h4>
                  <div className="d-flex flex-column gap-2">
                    <Link href="/body-kits/amg-body-kits" className="text-decoration-none text-secondary small d-flex align-items-center justify-content-between p-2 rounded-3 bg-white bg-opacity-75 border border-white">
                      <span>AMG Body Kits</span> <span className="text-danger">→</span>
                    </Link>
                    <Link href="/body-kits/mercedes-facelift" className="text-decoration-none text-secondary small d-flex align-items-center justify-content-between p-2 rounded-3 bg-white bg-opacity-75 border border-white">
                      <span>Mercedes Facelift</span> <span className="text-danger">→</span>
                    </Link>
                    <Link href="/body-kits/custom-upgrades" className="text-decoration-none text-secondary small d-flex align-items-center justify-content-between p-2 rounded-3 bg-white bg-opacity-75 border border-white">
                      <span>Custom Upgrades</span> <span className="text-danger">→</span>
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* FLOATING WHATSAPP CTA */}
        <a href="https://wa.me/971567888808" target="_blank" rel="noopener noreferrer" className={`btn btn-danger rounded-circle shadow-lg d-flex align-items-center justify-content-center ${styles.floatingBtn}`} aria-label="Chat on WhatsApp">
          <Phone size={24} />
        </a>

      </main>
      <Footer />
    </>
  );
}

/* page.module.css */
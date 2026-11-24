// src/app/html-sitemap/page.jsx
import Link from 'next/link';

export const metadata = {
  title: 'HTML Sitemap | Mercedes Garage Dubai',
  description: 'Browse all pages on Mercedes Garage Dubai. Find Mercedes repair, maintenance, body kits, and car classes in Al Quoz, Dubai.',
  alternates: {
    canonical: 'https://www.mercedesgaragedubai.com/html-sitemap',
  },
  robots: { index: true, follow: true },
};

const sitemapLinks = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'About Us', url: '/about-us' },
  { name: 'Models', url: '/models' },
  { name: 'Body Kits', url: '/body-kits' },
  { name: 'Gallery', url: '/gallery' },
  { name: 'Blogs', url: '/blogs' },
  { name: 'Contact Us', url: '/contact-us' },
  { name: 'FAQs', url: '/faqs' },
  { name: 'Testimonials', url: '/testimonials' },
  { name: 'Car Classes Directory', url: '/car-class/all' },
  { name: 'AMG Body Kits', url: '/body-kits/amg-body-kits' },
  { name: 'Mercedes Facelift', url: '/body-kits/mercedes-facelift' },
  { name: 'Custom Upgrades', url: '/body-kits/custom-upgrades' },
  { name: 'Privacy Policy', url: '/privacy-policy' },
  { name: 'Terms of Service', url: '/terms-of-service' },
];

export default function HtmlSitemap() {
  return (
    <main className="container py-5 min-vh-100">
      <h1 className="mb-4">Website Sitemap</h1>
      <p className="text-muted mb-5">Find all the pages and services we offer at Mercedes Garage Dubai.</p>
      
      <div className="row g-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="h5 card-title mb-3">Main Pages</h2>
              <ul className="list-unstyled">
                {sitemapLinks.slice(0, 6).map((link) => (
                  <li key={link.name} className="mb-2">
                    <Link href={link.url} className="text-decoration-none text-dark hover-primary">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="h5 card-title mb-3">Special Services</h2>
              <ul className="list-unstyled">
                {sitemapLinks.slice(6, 14).map((link) => (
                  <li key={link.name} className="mb-2">
                    <Link href={link.url} className="text-decoration-none text-dark hover-primary">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="h5 card-title mb-3">Legal & Info</h2>
              <ul className="list-unstyled">
                {sitemapLinks.slice(14).map((link) => (
                  <li key={link.name} className="mb-2">
                    <Link href={link.url} className="text-decoration-none text-dark hover-primary">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
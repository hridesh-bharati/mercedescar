const fs = require('fs');
const path = require('path');

// Saare pages with title
const pages = [
  { path: 'our-team', title: 'Our Team 1' },
  { path: 'our-team-2', title: 'Our Team 2' },
  { path: 'team-details', title: 'Team Details' },
  { path: 'case-studies-3-columns', title: 'Case Studies - 3 Columns' },
  { path: 'case-studies-4-columns', title: 'Case Studies - 4 Columns' },
  { path: 'case-carousel', title: 'Case Carousel' },
  { path: 'work-process', title: 'Work Process' },
  { path: 'testimonials', title: 'Testimonials' },
  { path: 'pricing-table', title: 'Pricing Plan' },
  { path: 'faqs', title: 'FAQs' },
  { path: 'blog', title: 'Blog' },
  { path: 'blog-grid', title: 'Blog Grid 01' },
  { path: 'blog-grid-2', title: 'Blog Grid 02' },
  { path: 'blog-grid-3', title: 'Blog Grid 03' },
  { path: 'blog-carousel', title: 'Blog Carousel' },
  { path: 'shop', title: 'Shop' },
  { path: 'shop-grid', title: 'Shop Grid' },
  { path: 'cart', title: 'Cart' },
  { path: 'checkout', title: 'Checkout' },
  { path: 'landing', title: 'Landing' },
  { path: 'login', title: 'Login' },
  { path: 'error-404', title: 'Error 404' },
  { path: 'portfolio/full-synthetic-oil-change', title: 'Case Single' },
  { path: 'product/vehicle-suspension', title: 'Shop Details' },
];

// Template for each page
const template = (title) => `export default function Page() {
  return (
    <div className="container" style={{ padding: '60px 16px' }}>
      <h1>${title}</h1>
      <p style={{ marginTop: 12, color: '#555' }}>
        ${title} page content yahan aayega.
      </p>
    </div>
  );
}
`;

// Create each page
pages.forEach(({ path: pagePath, title }) => {
  const dir = path.join(process.cwd(), 'app', pagePath);
  const file = path.join(dir, 'page.jsx');

  // Create directory (recursive)
  fs.mkdirSync(dir, { recursive: true });

  // Write file
  fs.writeFileSync(file, template(title), 'utf8');
  console.log(`✅ Created: app/${pagePath}/page.jsx`);
});

console.log(`\n🎉 Total ${pages.length} pages created successfully!`);
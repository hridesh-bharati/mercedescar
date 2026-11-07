// src/app/blogs/layout.jsx
export const metadata = {
  title: 'Mercedes-Benz Blogs & Guides in Dubai | Mercedes Garage',
  description:
    'Read expert Mercedes-Benz repair, maintenance and modification guides from our Al Quoz, Dubai workshop. Tips, diagnostics and AMG upgrades explained.',
  alternates: {
    canonical: 'https://mercedesgaragedubai.com/blogs',
  },
  openGraph: {
    title: 'Mercedes-Benz Blogs & Guides in Dubai',
    description:
      'Expert Mercedes-Benz repair, maintenance and modification guides from our Al Quoz, Dubai workshop.',
    url: 'https://mercedesgaragedubai.com/blogs',
    siteName: 'Mercedes Garage Dubai',
    images: [
      {
        url: 'https://mercedesgaragedubai.com/images/og-blogs.png',
        width: 1200,
        height: 630,
        alt: 'Mercedes Garage Dubai Blog',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function BlogsLayout({ children }) {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://mercedesgaragedubai.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blogs',
        item: 'https://mercedesgaragedubai.com/blogs',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}

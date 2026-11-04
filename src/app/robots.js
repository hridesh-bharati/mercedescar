// src/app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: 'https://mercedesgaragedubai.com/sitemap.xml',
    host: 'https://mercedesgaragedubai.com',
  };
}
// src/app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: 'https://www.mercedesgaragedubai.com/sitemap.xml',
    host: 'https://www.mercedesgaragedubai.com',
  };
}
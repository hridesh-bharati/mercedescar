export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/dashboard/', // Admin panel ko Google crawl na kare
    },
    sitemap: 'https://mercedesgaragedubai.com/sitemap.js',
  };
}
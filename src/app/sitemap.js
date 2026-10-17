export default async function sitemap() {
  const baseUrl = 'https://mercedesgaragedubai.com';

  // Static routes
  const routes = ['', '/services', '/about-us', '/gallery', '/blogs', '/contact-us'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...routes];
}
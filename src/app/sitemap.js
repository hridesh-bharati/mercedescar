// src/app/sitemap.js
import { dbService } from '@/services/dbService';

export default async function sitemap() {
  const baseUrl = 'https://www.mercedesgaragedubai.com';  
  const lastModified = new Date('2026-11-01');

  // ✅ 1. Static Routes (Sirf valid pages)
  const staticRoutes = [
    { route: '', priority: 1.0, changeFrequency: 'weekly' },
    { route: '/services', priority: 0.95, changeFrequency: 'weekly' },
    { route: '/about-us', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/gallery', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/blogs', priority: 0.8, changeFrequency: 'weekly' },
    { route: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/testimonials', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/work-process', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/faqs', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/case', priority: 0.7, changeFrequency: 'weekly' },
    { route: '/models', priority: 0.8, changeFrequency: 'weekly' },
    { route: '/car-class/g-class', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/car-class/amg', priority: 0.9, changeFrequency: 'weekly' },
    // ✅ Body kits actual valid URLs (404 wale nahi)
    { route: '/body-kits/amg-body-kits', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/body-kits/mercedes-facelift', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/body-kits/custom-upgrades', priority: 0.9, changeFrequency: 'weekly' },
  ];

  // ✅ 2. Dynamic Routes Fetch (Blogs + Services)
  let dynamicRoutes = [];
  try {
    const [blogsRes, servicesRes] = await Promise.all([
      dbService.getAll('blogs'),
      dbService.getAll('services'),
    ]);

    if (blogsRes.success && blogsRes.data) {
      blogsRes.data.forEach((b) => {
        dynamicRoutes.push({
          route: `/blogs/${b.id}`,
          priority: 0.6,
          changeFrequency: 'monthly',
        });
      });
    }

    if (servicesRes.success && servicesRes.data) {
      servicesRes.data.forEach((s) => {
        dynamicRoutes.push({
          route: `/services/${s.id}`,
          priority: 0.7,
          changeFrequency: 'monthly',
        });
      });
    }
  } catch (error) {
    console.error('Sitemap dynamic routes error:', error);
  }

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  return allRoutes.map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
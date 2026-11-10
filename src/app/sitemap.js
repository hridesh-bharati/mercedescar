import { dbService } from '@/services/dbService';

const SITE_URL = 'https://www.mercedesgaragedubai.com';
const DEFAULT_LAST_MODIFIED = new Date('2026-11-01T00:00:00.000Z');

// ✅ Verified Static Routes (Crawl report ke according 200 OK)
const staticRoutes = [
  ['', 1.0, 'weekly'],
  ['/services', 0.95, 'weekly'],
  ['/about-us', 0.7, 'monthly'],
  ['/gallery', 0.7, 'monthly'],
  ['/blogs', 0.8, 'weekly'],
  ['/contact-us', 0.8, 'monthly'],  
  ['/testimonials', 0.7, 'monthly'],
  ['/work-process', 0.7, 'monthly'],
  ['/faqs', 0.7, 'monthly'],
  ['/case', 0.7, 'weekly'],
  ['/models', 0.8, 'weekly'],

  // Car Classes (Verified 200 OK)
  ['/car-class/all', 0.8, 'weekly'],
  ['/car-class/a-class', 0.8, 'monthly'],
  ['/car-class/c-class', 0.9, 'weekly'],
  ['/car-class/e-class', 0.9, 'weekly'],
  ['/car-class/s-class', 0.9, 'weekly'],
  ['/car-class/g-class', 0.9, 'weekly'],
  ['/car-class/amg', 0.9, 'weekly'],
  ['/car-class/glc-class', 0.8, 'monthly'],
  ['/car-class/gle-class', 0.8, 'monthly'],
  ['/car-class/gls-class', 0.8, 'monthly'],
  ['/car-class/amg-series', 0.8, 'monthly'],
  ['/car-class/maybach', 0.8, 'monthly'],

  // Body Kits (Verified 200 OK)
  ['/body-kits/amg-body-kits', 0.9, 'weekly'],
  ['/body-kits/mercedes-facelift', 0.9, 'weekly'],
  ['/body-kits/custom-upgrades', 0.9, 'weekly'],
  
  ['/privacy-policy', 0.3, 'yearly'],
  ['/terms-of-service', 0.3, 'yearly'],
  ['/cookie-policy', 0.3, 'yearly'],
];

function normalizeDate(value) {
  if (!value) return DEFAULT_LAST_MODIFIED;
  const date = value?.toDate ? value.toDate() : new Date(value);
  return Number.isNaN(date.getTime()) ? DEFAULT_LAST_MODIFIED : date;
}

export default async function sitemap() {
  const routes = new Map();

  // 1. Static routes
  staticRoutes.forEach(([route, priority, changeFrequency]) => {
    routes.set(route, {
      url: `${SITE_URL}${route}`,
      lastModified: DEFAULT_LAST_MODIFIED,
      changeFrequency,
      priority,
    });
  });

  // 2. Dynamic routes
  try {
    const [blogsRes, servicesRes] = await Promise.all([
      dbService.getAll('blogs'),
      dbService.getAll('services'),
    ]);

    // Dynamic Blogs (Agar ID ajeeb hai toh skip karo, sirf valid slug lo)
    if (blogsRes?.success && Array.isArray(blogsRes.data)) {
      blogsRes.data.forEach((blog) => {
        // Only include blogs with valid IDs (ignore long weird Firebase IDs if they break)
        if (!blog?.id || blog.id.startsWith('-')) return; 

        const route = `/blogs/${blog.id}`;
        routes.set(route, {
          url: `${SITE_URL}${route}`,
          lastModified: normalizeDate(blog.updatedAt || blog.createdAt),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });
    }

    // Dynamic Services
    if (servicesRes?.success && Array.isArray(servicesRes.data)) {
      servicesRes.data.forEach((service) => {
        if (!service?.id || service.id.startsWith('-')) return;

        const route = `/services/${service.id}`;
        routes.set(route, {
          url: `${SITE_URL}${route}`,
          lastModified: normalizeDate(service.updatedAt || service.createdAt),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      });
    }
  } catch (error) {
    console.error('Sitemap generation error:', error);
  }

  return Array.from(routes.values());
}

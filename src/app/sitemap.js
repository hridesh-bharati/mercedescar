import { dbService } from '@/services/dbService';

const SITE_URL = 'https://www.mercedesgaragedubai.com';
const DEFAULT_LAST_MODIFIED = new Date('2026-11-01T00:00:00.000Z');
const ID_REGEX = /^[a-zA-Z0-9_-]+$/;

const staticRoutes = [
  ['/', 1.0, 'weekly'],
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

  // Car Classes
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

  // Body Kits
  ['/body-kits/amg-body-kits', 0.9, 'weekly'],
  ['/body-kits/mercedes-facelift', 0.9, 'weekly'],
  ['/body-kits/custom-upgrades', 0.9, 'weekly'],

  // Legal
  ['/privacy-policy', 0.3, 'yearly'],
  ['/terms-of-service', 0.3, 'yearly'],
  ['/cookie-policy', 0.3, 'yearly'],
];

function normalizeDate(value) {
  if (!value) return DEFAULT_LAST_MODIFIED;
  const date = typeof value?.toDate === 'function' ? value.toDate() : new Date(value);
  return Number.isNaN(date.getTime()) ? DEFAULT_LAST_MODIFIED : date;
}

function getValidId(item) {
  const rawId = item?.id ? String(item.id).trim() : '';
  if (!rawId || rawId.startsWith('-') || !ID_REGEX.test(rawId)) {
    return null;
  }
  return rawId;
}

async function safeGetAll(collectionName) {
  try {
    const res = await dbService.getAll(collectionName);
    return res?.success && Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error(`Sitemap fetch error for "${collectionName}":`, error);
    return [];
  }
}

export default async function sitemap() {
  const routes = new Map();

  for (const [route, priority, changeFrequency] of staticRoutes) {
    routes.set(route, {
      url: `${SITE_URL}${route}`,
      lastModified: DEFAULT_LAST_MODIFIED,
      changeFrequency,
      priority,
    });
  }

  const [blogs, services] = await Promise.all([
    safeGetAll('blogs'),
    safeGetAll('services'),
  ]);

  for (const blog of blogs) {
    if (blog?.status && blog.status !== 'published') continue;
    const id = getValidId(blog);
    if (!id) continue;

    const route = `/blogs/${id}`;
    routes.set(route, {
      url: `${SITE_URL}${route}`,
      lastModified: normalizeDate(blog.updatedAt || blog.createdAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  for (const service of services) {
    if (service?.status && service.status !== 'published') continue;
    const id = getValidId(service);
    if (!id) continue;

    const route = `/services/${id}`;
    routes.set(route, {
      url: `${SITE_URL}${route}`,
      lastModified: normalizeDate(service.updatedAt || service.createdAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return Array.from(routes.values());
}
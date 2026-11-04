// src/app/sitemap.js
export default async function sitemap() {
  const baseUrl = 'https://mercedesgaragedubai.com';
  const lastModified = new Date('2026-11-01');

  const routes = [
    // Core (PDF priority 1)
    { route: '', priority: 1.0, changeFrequency: 'weekly' },

    // Primary service pages (PDF priority 2-4)
    { route: '/services', priority: 0.95, changeFrequency: 'weekly' },
    { route: '/mercedes-workshop-dubai', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/mercedes-repair-dubai', priority: 0.9, changeFrequency: 'weekly' },

    // Diagnostics (PDF priority 5)
    { route: '/mercedes-diagnostics-dubai', priority: 0.9, changeFrequency: 'weekly' },

    // Model pages (PDF priority 6-7)
    { route: '/car-class/amg', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/car-class/g-class', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/models', priority: 0.8, changeFrequency: 'weekly' },

    // Modification pages (PDF priority 8-10)
    { route: '/mercedes-body-kits-dubai', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/mercedes-facelift-dubai', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/mercedes-vehicle-upgrades-dubai', priority: 0.9, changeFrequency: 'weekly' },

    // Static
    { route: '/about-us', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/gallery', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/blogs', priority: 0.8, changeFrequency: 'weekly' },
    { route: '/contact-us', priority: 0.8, changeFrequency: 'monthly' }, 
    { route: '/testimonials', priority: 0.7, changeFrequency: 'monthly' }, 
    { route: '/work-process', priority: 0.7, changeFrequency: 'monthly' },  
    { route: '/faqs', priority: 0.7, changeFrequency: 'monthly' },          
    { route: '/case', priority: 0.7, changeFrequency: 'weekly' },          
  ];

  return routes.map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
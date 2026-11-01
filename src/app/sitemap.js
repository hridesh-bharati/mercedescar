// src/app/sitemap.js

export default async function sitemap() {
  const baseUrl = 'https://mercedesgaragedubai.com';

  // Static routes
  const staticRoutes = [
    { route: '', priority: 1.0, changeFrequency: 'daily' },
    { route: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/about-us', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/gallery', priority: 0.7, changeFrequency: 'weekly' },
    { route: '/blogs', priority: 0.8, changeFrequency: 'weekly' },
    { route: '/contact-us', priority: 0.8, changeFrequency: 'monthly' },
  ];

  // Body kit pages — actual live URLs
  const bodyKitRoutes = [
    { route: '/body-kits/amg-body-kits', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/body-kits/mercedes-facelift', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/body-kits/custom-upgrades', priority: 0.9, changeFrequency: 'weekly' },
  ];

  const allRoutes = [...staticRoutes, ...bodyKitRoutes];

  return allRoutes.map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: changeFrequency || 'weekly',
    priority: priority ?? 0.8,
  }));
}
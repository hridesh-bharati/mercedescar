
export default async function sitemap() {
  const baseUrl = 'https://mercedesgaragedubai.com';

  const routes = [
    { route: '', priority: 1.0 },
    { route: '/services', priority: 0.9 },
    { route: '/mercedes-body-kits-dubai', priority: 0.9 },
    { route: '/mercedes-facelift-dubai', priority: 0.9 },
    { route: '/mercedes-vehicle-upgrades-dubai', priority: 0.9 },
    { route: '/about-us', priority: 0.7 },
    { route: '/gallery', priority: 0.7 },
    { route: '/blogs', priority: 0.8 },
    { route: '/contact-us', priority: 0.8 },
  ];
  const newRoutes = [
    '/mercedes-body-kits-dubai',
    '/mercedes-facelift-dubai',
    '/mercedes-vehicle-upgrades-dubai',
  ];
  return routes.map(({ route, priority }) => ({
    ...newRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))
  }));
}

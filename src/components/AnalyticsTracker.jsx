
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function AnalyticsTracker({ gaId }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();

  // Page View Tracking
  useEffect(() => {
    if (typeof window.gtag !== 'function') return;

    const pagePath = pathname + (queryString ? `?${queryString}` : '');

    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_location: window.location.origin + pagePath,
      page_title: document.title,
    });
  }, [pathname, queryString]);

  // WhatsApp & Phone Click Tracking
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const target = e.target;

      if (!(target instanceof Element)) return;

      const anchor = target.closest('a');

      if (!anchor || typeof window.gtag !== 'function') return;

      const href = anchor.getAttribute('href') || '';

      // WhatsApp Click
      if (
        href.includes('wa.me') ||
        href.includes('whatsapp.com')
      ) {
        window.gtag('event', 'whatsapp_click', {
          event_category: 'Lead',
          event_label: href,
          page_path: pathname,
          transport_type: 'beacon',
        });
      }

      // Phone Call Click
      if (href.startsWith('tel:')) {
        window.gtag('event', 'phone_call_click', {
          event_category: 'Lead',
          event_label: href,
          page_path: pathname,
          transport_type: 'beacon',
        });
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [pathname]);

  return null;
}



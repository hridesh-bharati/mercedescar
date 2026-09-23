// src/app/layout.jsx

import 'bootstrap/dist/css/bootstrap.min.css';
import Script from 'next/script';

export const metadata = {
  title: 'Mercedes Garage Dubai | Luxury Car Repair & Maintenance',
  description:
    'Expert Mercedes-Benz service, repair, and diagnostics in Dubai.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
      >
        {children}

        {/* Bootstrap JavaScript */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
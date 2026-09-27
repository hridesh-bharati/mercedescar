// src/app/layout.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css'; 
import Script from 'next/script';
import './globals.css';
import CursorFollower from '@/components/layout/CursorFollower'; 
import AOSInitializer from '@/components/layout/AOSInitializer'; 

export const metadata = {
  title: 'Auto Expert Workshop | Luxury Car Repair & Maintenance Dubai',
  description: 'Expert multi-brand and luxury car service, repair, and diagnostics in Dubai.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning={true}>
        {/* Global AOS Runner */}
        <AOSInitializer />
        
        <CursorFollower />      
        {children}

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
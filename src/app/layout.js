// src/app/layout.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css'; 
import Script from 'next/script';
import './globals.css';
import CursorFollower from '@/components/layout/CursorFollower'; 
import AOSInitializer from '@/components/layout/AOSInitializer'; 

export const metadata = {
  title: 'Mercedes Garage Dubai | Luxury Car Repair & Maintenance',
  description:
    'Expert Mercedes-Benz service, repair, and diagnostics in Dubai.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
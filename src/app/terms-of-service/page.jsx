// src/app/terms-of-service/page.jsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Terms of Service | Mercedes Garage Dubai',
  description: 'Terms of service for Mercedes Garage Dubai — service terms, warranty and repair policies.',
  alternates: { canonical: 'https://www.mercedesgaragedubai.com/terms-of-service' },
};

export default function TermsOfService() {
  return (
    <>
      <Header />
      <main className="container py-5" style={{ maxWidth: '900px' }}>
        <h1 className="fw-bold mb-3">Terms of Service</h1>
        <p className="text-muted small">Last updated: November 2026</p>

        <h2 className="h4 mt-4">1. Service Agreement</h2>
        <p>By booking a service with Mercedes Garage Dubai, you agree to these terms. All repairs are performed by certified Mercedes-Benz specialists using genuine OEM parts unless otherwise specified.</p>

        <h2 className="h4 mt-4">2. Estimates and Pricing</h2>
        <p>All estimates are provided in good faith. Final pricing may vary if additional issues are discovered during inspection. We will always inform you before proceeding with additional work.</p>

        <h2 className="h4 mt-4">3. Warranty</h2>
        <p>All repairs are covered by a 12-month parts and labor warranty from the date of service. Warranty does not cover:</p>
        <ul>
          <li>Normal wear and tear</li>
          <li>Damage from accidents or misuse</li>
          <li>Modifications by third parties</li>
        </ul>

        <h2 className="h4 mt-4">4. Vehicle Storage</h2>
        <p>Vehicles left at our workshop after completion of repairs may incur storage fees after 7 days.</p>

        <h2 className="h4 mt-4">5. Liability</h2>
        <p>Mercedes Garage Dubai is not liable for personal items left in vehicles or for delays caused by parts suppliers.</p>

        <h2 className="h4 mt-4">6. Contact</h2>
        <p>
          Mercedes Garage Dubai<br />
          Warehouse #S2, Al Quoz 20C Street, Industrial Area 2, Dubai, UAE<br />
          Phone: <a href="tel:+971567888808">+971 56 788 8808</a>
        </p>
      </main>
      <Footer />
    </>
  );
}

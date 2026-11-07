// src/app/privacy-policy/page.jsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Privacy Policy | Mercedes Garage Dubai',
  description: 'Privacy policy for Mercedes Garage Dubai — how we collect, use and protect your information.',
  alternates: { canonical: 'https://www.mercedesgaragedubai.com/privacy-policy' },
};

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="container py-5" style={{ maxWidth: '900px' }}>
        <h1 className="fw-bold mb-3">Privacy Policy</h1>
        <p className="text-muted small">Last updated: November 2026</p>

        <h2 className="h4 mt-4">1. Information We Collect</h2>
        <p>When you book a Mercedes service or contact us, we may collect:</p>
        <ul>
          <li>Full name</li>
          <li>Phone number and email address</li>
          <li>Vehicle details (model, year, VIN)</li>
          <li>Service history and preferences</li>
        </ul>

        <h2 className="h4 mt-4">2. How We Use Your Information</h2>
        <p>Your information is used to:</p>
        <ul>
          <li>Process service bookings and estimates</li>
          <li>Contact you about your Mercedes</li>
          <li>Improve our workshop services</li>
          <li>Send service reminders and offers (optional)</li>
        </ul>

        <h2 className="h4 mt-4">3. Data Protection</h2>
        <p>We use secure systems and never sell your personal data to third parties. Your information is stored in Firebase (Google) with industry-standard encryption.</p>

        <h2 className="h4 mt-4">4. Cookies</h2>
        <p>Our website uses cookies to improve your browsing experience. You can disable cookies in your browser settings.</p>

        <h2 className="h4 mt-4">5. Your Rights</h2>
        <p>You can request access, correction or deletion of your data by emailing <a href="mailto:info@mercedesgaragedubai.com">info@mercedesgaragedubai.com</a>.</p>

        <h2 className="h4 mt-4">6. Contact</h2>
        <p>
          Mercedes Garage Dubai<br />
          Warehouse #S2, Al Quoz 20C Street, Industrial Area 2, Dubai, UAE<br />
          Phone: <a href="tel:+971567888808">+971 56 788 8808</a><br />
          Email: <a href="mailto:info@mercedesgaragedubai.com">info@mercedesgaragedubai.com</a>
        </p>
      </main>
      <Footer />
    </>
  );
}

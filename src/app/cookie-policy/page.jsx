// src/app/cookie-policy/page.jsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Cookie Policy | Mercedes Garage Dubai',
  description: 'Cookie policy for Mercedes Garage Dubai — how we use cookies on our website.',
  alternates: { canonical: 'https://www.mercedesgaragedubai.com//cookie-policy' },
};

export default function CookiePolicy() {
  return (
    <>
      <Header />
      <main className="container py-5" style={{ maxWidth: '900px' }}>
        <h1 className="fw-bold mb-3">Cookie Policy</h1>
        <p className="text-muted small">Last updated: November 2026</p>

        <h2 className="h4 mt-4">1. What Are Cookies?</h2>
        <p>Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and improve your experience.</p>

        <h2 className="h4 mt-4">2. Cookies We Use</h2>
        <ul>
          <li><strong>Essential cookies:</strong> Required for basic site functionality (navigation, forms).</li>
          <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site (Google Analytics).</li>
          <li><strong>Preference cookies:</strong> Remember your language and region preferences.</li>
        </ul>

        <h2 className="h4 mt-4">3. Managing Cookies</h2>
        <p>You can control cookies through your browser settings. Disabling cookies may affect some site features.</p>

        <h2 className="h4 mt-4">4. Third-Party Cookies</h2>
        <p>We use Google Maps, Google Analytics and WhatsApp integration. These services may set their own cookies. Refer to their respective privacy policies.</p>

        <h2 className="h4 mt-4">5. Contact</h2>
        <p>
          For questions about cookies, email <a href="mailto:info@mercedesgaragedubai.com">info@mercedesgaragedubai.com</a>.
        </p>
      </main>
      <Footer />
    </>
  );
}

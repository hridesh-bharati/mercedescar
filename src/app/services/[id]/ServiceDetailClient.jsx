
'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  PhoneCall,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ServiceDetailClient({ initialService }) {
  if (!initialService) {
    return (
      <main className="container py-5">
        <h1>Service not available</h1>
        <Link href="/services">Back to Services</Link>
      </main>
    );
  }

  const service = initialService;

  const description =
    service.desc ||
    service.description ||
    'Contact Mercedes Garage Dubai for more information about this service.';

  const images = [
    ...(Array.isArray(service.imageUrls) ? service.imageUrls : []),
    service.imageUrl,
  ].filter(
    (image, index, array) =>
      typeof image === 'string' &&
      image.trim() !== '' &&
      array.indexOf(image) === index
  );

  return (
    <>
      <Header />

      <main className="bg-light min-vh-100">
        <section className="bg-dark text-white py-5">
          <div className="container py-4">
            <Link
              href="/services"
              className="text-white text-decoration-none d-inline-flex align-items-center gap-2 mb-4"
            >
              <ArrowLeft size={17} />
              All Mercedes Services
            </Link>

            <span className="badge bg-danger mb-3 d-table">
              MERCEDES-BENZ SPECIALISTS
            </span>

            <h1 className="fw-bold display-5 mb-3">
              {service.title || 'Mercedes-Benz Service'}
            </h1>

            <p className="text-white-50 mb-4" style={{ maxWidth: 750 }}>
              {description}
            </p>

            <div className="d-flex flex-wrap gap-2">
              <a
                href="tel:+971567888808"
                className="btn btn-danger rounded-pill px-4"
              >
                <PhoneCall size={16} className="me-2" />
                Call Now
              </a>

              <Link
                href="/contact-us"
                className="btn btn-outline-light rounded-pill px-4"
              >
                <Calendar size={16} className="me-2" />
                Book Appointment
              </Link>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-8">
                <div className="bg-white rounded-4 shadow-sm p-4">
                  <h2 className="fw-bold mb-3">
                    {service.title || 'Service Details'}
                  </h2>

                  <p
                    className="text-secondary mb-0"
                    style={{ lineHeight: 1.9 }}
                  >
                    {description}
                  </p>

                  {service.model && (
                    <p className="mt-3 mb-0">
                      <strong>Mercedes Model:</strong> {service.model}
                    </p>
                  )}

                  {service.price !== undefined &&
                    service.price !== null &&
                    service.price !== '' && (
                      <p className="text-danger fw-bold mt-3 mb-0">
                        Price: AED {service.price}
                      </p>
                    )}
                </div>
              </div>

              <div className="col-lg-4">
                <div className="bg-white rounded-4 shadow-sm p-4">
                  <h3 className="h5 fw-bold mb-3">
                    Why Choose Mercedes Garage Dubai?
                  </h3>

                  <ul className="list-unstyled mb-0">
                    {[
                      'Mercedes-Benz focused services',
                      'Experienced technicians',
                      'Al Quoz, Dubai location',
                    ].map((item) => (
                      <li
                        key={item}
                        className="d-flex gap-2 mb-3 text-secondary"
                      >
                        <CheckCircle2
                          size={18}
                          className="text-danger flex-shrink-0"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {images.length > 0 && (
          <section className="pb-5">
            <div className="container">
              <h2 className="fw-bold mb-4">Service Images</h2>

              <div className="row g-3">
                {images.map((image, index) => (
                  <div className="col-sm-6 col-lg-4" key={image}>
                    <img
                      src={image}
                      alt={`${service.title || 'Mercedes service'} image ${index + 1}`}
                      className="img-fluid rounded-4 w-100"
                      style={{
                        height: 240,
                        objectFit: 'cover',
                      }}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-5 bg-white border-top">
          <div className="container text-center">
            <h2 className="fw-bold mb-3">
              Need Help With Your Mercedes-Benz?
            </h2>

            <p className="text-secondary mb-4">
              Contact Mercedes Garage Dubai in Al Quoz, Dubai.
            </p>

            <a
              href="tel:+971567888808"
              className="btn btn-danger rounded-pill px-4 py-2"
            >
              <PhoneCall size={16} className="me-2" />
              +971 56 788 8808
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

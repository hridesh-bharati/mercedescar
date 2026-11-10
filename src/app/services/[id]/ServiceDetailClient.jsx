// src/app/services/[id]/ServiceLandingClient.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Calendar,
} from 'lucide-react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ServiceLandingClient({ page, services = [] }) {
  const [activeImages, setActiveImages] = useState({});

  const getImages = (service) => {
    if (Array.isArray(service.imageUrls)) {
      return service.imageUrls.filter(Boolean);
    }
    return service.imageUrl ? [service.imageUrl] : [];
  };

  const getDescription = (service) =>
    service.desc ||
    service.description ||
    'Contact Mercedes Garage Dubai for more information about this Mercedes-Benz service in Dubai.';

  return (
    <>
      <Header />

      <main className="bg-light min-vh-100">
        {/* Hero */}
        <section className="py-5 bg-dark text-white">
          <div className="container py-4">
            <Link
              href="/services"
              className="text-white text-decoration-none small d-inline-flex align-items-center gap-2 mb-4"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              All Mercedes Services
            </Link>

            <div className="mb-3">
              <span className="badge bg-danger rounded-pill px-3 py-2">
                MERCEDES-BENZ SPECIALISTS
              </span>
            </div>

            <h1 className="fw-bold display-5 mb-3">{page.heading}</h1>

            <p
              className="text-white-75 fs-6 mb-4"
              style={{ maxWidth: '750px', lineHeight: 1.8 }}
            >
              {page.intro}
            </p>

            <div className="d-flex flex-wrap gap-2">
              <a
                href="tel:+971567888808"
                className="btn btn-danger rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
                aria-label="Call Mercedes Garage Dubai"
              >
                <PhoneCall size={17} aria-hidden="true" />
                Call Now
              </a>

              <Link
                href="/contact-us"
                className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
              >
                <Calendar size={17} aria-hidden="true" />
                Book Appointment
              </Link>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-5">
          <div className="container">
            <div className="row g-4 align-items-start">
              <div className="col-lg-8">
                <h2 className="fw-bold text-dark mb-3">{page.title}</h2>
                <p className="text-secondary" style={{ lineHeight: 1.8 }}>
                  {page.intro}
                </p>
              </div>

              <div className="col-lg-4">
                <div className="bg-white rounded-4 shadow-sm p-4">
                  <h3 className="h5 fw-bold mb-3">
                    Why Choose Mercedes Garage Dubai?
                  </h3>

                  <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
                    {[
                      'Mercedes-Benz focused services',
                      'Service options for different models',
                      'Convenient Al Quoz, Dubai location',
                      'Contact our team for service details',
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="d-flex align-items-start gap-2 text-secondary small"
                      >
                        <CheckCircle2
                          size={17}
                          className="text-danger flex-shrink-0"
                          aria-hidden="true"
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

        {/* Content Sections */}
        <section className="pb-4">
          <div className="container">
            <div className="row g-4">
              {page.sections.map((section, index) => (
                <div className="col-md-6" key={index}>
                  <div className="bg-white shadow-sm rounded-4 p-4 h-100">
                    <h2 className="h5 fw-bold text-dark mb-3">
                      {section.heading}
                    </h2>
                    <p
                      className="text-secondary mb-0"
                      style={{ lineHeight: 1.8 }}
                    >
                      {section.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services and Images */}
        <section className="py-5">
          <div className="container">
            <div className="text-center mb-4">
              <span className="text-danger fw-bold small">OUR SERVICES</span>
              <h2 className="fw-bold text-dark mt-2">
                Available Mercedes-Benz Services
              </h2>
              <p className="text-secondary">
                Explore related services and available service images.
              </p>
            </div>

            {services.length > 0 ? (
              <div className="row g-4">
                {services.map((service, idx) => {
                  const images = getImages(service);
                  const selectedImage = activeImages[service.id] || images[0];

                  return (
                    <div className="col-sm-6 col-lg-4" key={service.id}>
                      <article className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                        <div
                          className="position-relative bg-secondary bg-opacity-10"
                          style={{ height: '230px' }}
                        >
                          {selectedImage ? (
                            <Image
                              src={selectedImage}
                              alt={`${service.title} - Mercedes-Benz service at our Al Quoz Dubai workshop`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw"
                              className="object-fit-cover"
                              priority={idx < 3}
                            />
                          ) : (
                            <div className="h-100 d-flex align-items-center justify-content-center text-muted">
                              No Image Available
                            </div>
                          )}
                        </div>

                        {images.length > 1 && (
                          <div className="d-flex gap-2 px-3 pt-3 overflow-auto">
                            {images.map((image, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() =>
                                  setActiveImages((prev) => ({
                                    ...prev,
                                    [service.id]: image,
                                  }))
                                }
                                className="border rounded-2 p-0 overflow-hidden flex-shrink-0 position-relative"
                                style={{
                                  width: 48,
                                  height: 48,
                                  borderColor:
                                    selectedImage === image
                                      ? '#dc3545'
                                      : '#dee2e6',
                                }}
                                aria-label={`View service image ${index + 1}`}
                              >
                                <Image
                                  src={image}
                                  alt={`${service.title} thumbnail ${index + 1}`}
                                  fill
                                  sizes="48px"
                                  className="object-fit-cover"
                                />
                              </button>
                            ))}
                          </div>
                        )}

                        <div className="card-body p-4">
                          <h3 className="h5 fw-bold text-dark">
                            {service.title}
                          </h3>
                          <p
                            className="small text-secondary"
                            style={{ lineHeight: 1.7 }}
                          >
                            {getDescription(service)}
                          </p>

                          {service.price !== undefined &&
                            service.price !== null &&
                            service.price !== '' && (
                              <p className="fw-bold text-danger mb-3">
                                AED {service.price}
                              </p>
                            )}

                          <Link
                            href={`/services/${service.id}`}
                            className="btn btn-outline-danger rounded-pill px-3 btn-sm fw-bold d-inline-flex align-items-center gap-2"
                          >
                            View Service
                            <ArrowRight size={15} aria-hidden="true" />
                          </Link>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-4 shadow-sm p-4 text-center">
                <p className="text-secondary mb-0">
                  No matching service records are currently available. Contact
                  our team for information about this service.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-5 bg-white border-top">
          <div className="container text-center py-3">
            <h2 className="fw-bold text-dark mb-3">
              Need Help With Your Mercedes-Benz?
            </h2>
            <p className="text-secondary mb-4">
              Contact Mercedes Garage Dubai in Al Quoz, Dubai.
            </p>

            <div className="d-flex justify-content-center flex-wrap gap-2">
              <a
                href="tel:+971567888808"
                className="btn btn-danger rounded-pill px-4 py-2 fw-bold"
              >
                <PhoneCall size={16} className="me-2" aria-hidden="true" />
                +971 56 788 8808
              </a>

              <Link
                href="/contact-us"
                className="btn btn-dark rounded-pill px-4 py-2 fw-bold"
              >
                Book Service
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
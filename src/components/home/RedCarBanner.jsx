'use client';

export default function RedCarBanner() {
  return (
    <section
      className="py-5 position-relative text-center text-white"
      style={{
        background:
          'linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url("https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1920&q=80") center/cover',
      }}
    >
      <div className="container py-5">
        <h2 className="display-5 fw-bold text-warning mb-3">
          Specialized Red Car &amp; AMG Division
        </h2>
        <p className="lead text-light w-75 mx-auto mb-4">
          High-performance tuning, body modifications, and customized care for elite sports models.
        </p>
        <a href="#contact" className="btn btn-warning px-5 py-3 rounded-pill fw-bold text-dark">
          Consult an Expert
        </a>
      </div>
    </section>
  );
}
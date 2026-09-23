'use client';

const services = [
  'Diagnostics & Repair',
  'Engine & Performance',
  'Body & Paintwork',
  'Premium Maintenance',
];

export default function Services() {
  return (
    <section id="services" className="py-5 bg-black">
      <div className="container py-4">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-white">Our Premium Services</h2>
          <p className="text-muted">Specialized care tailored for your Mercedes-Benz</p>
        </div>
        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-md-3" key={index}>
              <div className="card bg-dark border-secondary text-light h-100 p-4 shadow hover-card">
                <div className="mb-3 text-warning fs-2">⚙️</div>
                <h4 className="h5 fw-bold mb-3">{service}</h4>
                <p className="text-muted small">
                  Advanced computerized diagnostics and factory-grade equipment for unmatched precision.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
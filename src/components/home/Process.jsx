'use client';

const steps = ['Inspection', 'Estimation', 'Expert Repair', 'Quality Check'];

export default function Process() {
  return (
    <section id="process" className="py-5" style={{ background: '#0a0a0a' }}>
      <div className="container py-4">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-white">Our Process</h2>
          <p className="text-muted">Seamless steps to absolute vehicle reliability</p>
        </div>
        <div className="row text-center g-4">
          {steps.map((step, idx) => (
            <div className="col-md-3" key={idx}>
              <div className="p-4 border border-secondary rounded bg-black">
                <h1 className="text-warning fw-bold display-4 opacity-50">0{idx + 1}</h1>
                <h5 className="text-white mt-2">{step}</h5>
                <p className="text-muted small mt-2">
                  Detailed multi-point analysis and expert execution.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
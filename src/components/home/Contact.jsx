'use client';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Booking request simulated successfully!');
  };

  return (
    <section id="contact" className="py-5 bg-black">
      <div className="container py-4">
        <div className="row g-5 align-items-center">
          {/* Left: Info */}
          <div className="col-lg-6">
            <h2 className="fw-bold text-white mb-3">Contact &amp; Quick Booking</h2>
            <p className="text-muted mb-4">
              Get in touch with our master technicians or book an appointment directly using our online
              booking form.
            </p>
            <div className="mb-3">
              <h6 className="text-warning">📍 Location</h6>
              <p className="text-muted small">Al Quoz Industrial Area 3, Dubai, UAE</p>
            </div>
            <div className="mb-3">
              <h6 className="text-warning">📞 Phone / WhatsApp</h6>
              <p className="text-muted small">+971 4 123 4567 / +971 50 000 0000</p>
            </div>
            <div>
              <h6 className="text-warning">✉️ Email</h6>
              <p className="text-muted small">support@mercedesgaragedubai.com</p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="col-lg-6">
            <div className="card bg-dark border-secondary p-4 shadow-lg rounded-4">
              <h4 className="text-white mb-3">Book Your Service</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control bg-black text-light border-secondary"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control bg-black text-light border-secondary"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="tel"
                    className="form-control bg-black text-light border-secondary"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div className="mb-3">
                  <select className="form-select bg-black text-light border-secondary">
                    <option>Select Service Type</option>
                    <option>Diagnostics &amp; Repair</option>
                    <option>Engine &amp; Performance</option>
                    <option>Body &amp; Paintwork</option>
                    <option>Periodic Maintenance</option>
                  </select>
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control bg-black text-light border-secondary"
                    rows="3"
                    placeholder="Describe your car issue..."
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-warning w-100 fw-bold py-2 text-dark">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
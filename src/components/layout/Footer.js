// src/components/layout/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-black text-light border-top border-secondary py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h4 className="text-warning fw-bold mb-3">Mercedes Garage Dubai</h4>
            <p className="text-muted small">Experience the art of automotive perfection. Premium diagnostics, maintenance, and repair for your luxury vehicle.</p>
          </div>
          <div className="col-md-4">
            <h5 className="text-white mb-3">Quick Links</h5>
            <ul className="list-unstyled text-muted small">
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted hover-warning">Diagnostics & Repair</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Engine & Performance</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Body & Paintwork</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Premium Maintenance</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="text-white mb-3">Location & Hours</h5>
            <p className="text-muted small mb-1">📍 Al Quoz Industrial Area, Dubai, UAE</p>
            <p className="text-muted small mb-1">📞 +971 4 000 0000</p>
            <p className="text-muted small">⏰ Mon - Sat: 8:00 AM - 7:30 PM</p>
          </div>
        </div>
        <hr className="border-secondary my-4" />
        <div className="text-center text-muted small">
          © {new Date().getFullYear()} Mercedes Garage Dubai. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
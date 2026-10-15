// src/app/dashboard/adminpanel/bookings-manager.jsx
'use client';

import { useState, useEffect } from 'react';
import { dbService } from '@/services/dbService';
import { Trash2, Phone, Mail, Calendar } from 'lucide-react';

export default function BookingsManager() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const res = await dbService.getAll('bookings');
    if (res.success) {
      setBookings(res.data);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this booking/inquiry?')) {
      await dbService.remove('bookings', id);
      loadBookings();
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
      <h4 className="fw-bold text-dark mb-4">Customer Bookings & Contact Inquiries</h4>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>Client Name</th>
              <th>Contact Info</th>
              <th>Service</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">No bookings or inquiries found.</td>
              </tr>
            ) : (
              bookings.map((item) => (
                <tr key={item.id}>
                  <td className="fw-bold text-dark">{item.name}</td>
                  <td>
                    <div className="small text-secondary d-flex align-items-center gap-1"><Phone size={12} /> {item.phone}</div>
                    <div className="small text-muted d-flex align-items-center gap-1"><Mail size={12} /> {item.email}</div>
                  </td>
                  <td>
                    <span className="badge bg-danger bg-opacity-10 text-danger px-3 py-1 rounded-pill">
                      {item.service || item.type || 'General'}
                    </span>
                  </td>
                  <td className="text-secondary small" style={{ maxWidth: '220px' }}>{item.message}</td>
                  <td className="text-muted small">
                    <span className="d-flex align-items-center gap-1"><Calendar size={12} /> {item.date || 'Recent'}</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger rounded-circle p-2" onClick={() => handleDelete(item.id)} title="Delete Inquiry">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
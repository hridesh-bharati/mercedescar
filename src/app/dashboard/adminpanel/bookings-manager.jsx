'use client';

import { useState, useEffect } from 'react';
import { dbService } from '@/services/dbService';
import { Trash2 } from 'lucide-react';

export default function BookingsManager() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => { loadBookings(); }, []);

  const loadBookings = async () => {
    const res = await dbService.getAll('bookings');
    if (res.success) setBookings(res.data);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete booking lead?')) {
      await dbService.remove('bookings', id);
      loadBookings();
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
      <h4 className="fw-bold text-dark mb-4">Customer Bookings & Contact Leads</h4>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>Client Name</th>
              <th>Email</th>
              <th>Service / Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr><td colSpan="5" className="text-center text-muted py-4">No bookings found.</td></tr>
            ) : (
              bookings.map((item) => (
                <tr key={item.id}>
                  <td className="fw-bold">{item.name || 'N/A'}</td>
                  <td>{item.email}</td>
                  <td>{item.service || item.message || 'General Inquiry'}</td>
                  <td className="text-muted small">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger rounded-circle p-2" onClick={() => handleDelete(item.id)}><Trash2 size={14} /></button>
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
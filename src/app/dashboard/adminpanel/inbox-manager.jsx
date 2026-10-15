// src/app/dashboard/adminpanel/inbox-manager.jsx
'use client';

import { useState, useEffect } from 'react';
import { dbService } from '@/services/dbService';
import { Trash2, Phone, Mail, Calendar, MessageSquare } from 'lucide-react';

export default function InboxManager() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    // Contact form submissions are saved in 'bookings' or 'contacts' node
    const res = await dbService.getAll('bookings');
    if (res.success && res.data) {
      // Filter only contact inquiries if needed
      setInquiries(res.data);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this contact inquiry?')) {
      await dbService.remove('bookings', id);
      loadInquiries();
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
      <div className="d-flex align-items-center gap-2 mb-4">
        <MessageSquare size={22} className="text-danger" />
        <h4 className="fw-bold text-dark mb-0">Contact Inquiries & Inbox</h4>
      </div>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>Client Name</th>
              <th>Contact Details</th>
              <th>Selected Service</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">No messages in inbox yet.</td>
              </tr>
            ) : (
              inquiries.map((item) => (
                <tr key={item.id}>
                  <td className="fw-bold text-dark">{item.name}</td>
                  <td>
                    <div className="small text-secondary d-flex align-items-center gap-1"><Phone size={12} /> {item.phone}</div>
                    <div className="small text-muted d-flex align-items-center gap-1"><Mail size={12} /> {item.email}</div>
                  </td>
                  <td>
                    <span className="badge bg-danger bg-opacity-10 text-danger px-3 py-1 rounded-pill">
                      {item.service || 'General Inquiry'}
                    </span>
                  </td>
                  <td className="text-secondary small" style={{ maxWidth: '240px' }}>{item.message}</td>
                  <td className="text-muted small">
                    <span className="d-flex align-items-center gap-1"><Calendar size={12} /> {item.date || 'Recent'}</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger rounded-circle p-2" onClick={() => handleDelete(item.id)} title="Delete Message">
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
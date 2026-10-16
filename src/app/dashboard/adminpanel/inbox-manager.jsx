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
    const res = await dbService.getAll('bookings');
    if (res.success && res.data) {
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
    <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 bg-white text-start">
      <div className="d-flex align-items-center gap-2 mb-4">
        <MessageSquare size={22} className="text-danger flex-shrink-0" />
        <h4 className="fw-bold text-dark mb-0 fs-5">Contact Inquiries & Inbox</h4>
      </div>

      {inquiries.length === 0 ? (
        <div className="text-center py-4 text-muted small card border-0 bg-light rounded-4">No messages in inbox yet.</div>
      ) : (
        <>
          {/* Mobile View: Clean Bootstrap Cards */}
          <div className="d-md-none row g-3">
            {inquiries.map((item) => (
              <div className="col-12" key={item.id}>
                <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="fw-bold text-dark mb-0">{item.name}</h6>
                    <span className="badge bg-danger bg-opacity-10 text-danger px-2 py-1 rounded-pill small">
                      {item.service || 'General Inquiry'}
                    </span>
                  </div>

                  <div className="small text-secondary mb-1 d-flex align-items-center gap-1">
                    <Phone size={13} className="text-muted" /> <a href={`tel:${item.phone}`} className="text-decoration-none text-secondary">{item.phone}</a>
                  </div>
                  <div className="small text-muted mb-2 d-flex align-items-center gap-1 text-break">
                    <Mail size={13} /> {item.email}
                  </div>

                  <p className="text-secondary small bg-light p-2 rounded-3 mb-2">{item.message}</p>

                  <div className="d-flex justify-content-between align-items-center border-top pt-2 mt-1">
                    <span className="text-muted small d-flex align-items-center gap-1">
                      <Calendar size={12} /> {item.date || 'Recent'}
                    </span>
                    <button className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1 small d-flex align-items-center gap-1" onClick={() => handleDelete(item.id)}>
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View: Table */}
          <div className="d-none d-md-block table-responsive">
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
                {inquiries.map((item) => (
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
                    <td className="text-muted small text-nowrap">
                      <span className="d-flex align-items-center gap-1"><Calendar size={12} /> {item.date || 'Recent'}</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-danger rounded-circle p-2" onClick={() => handleDelete(item.id)} title="Delete Message">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
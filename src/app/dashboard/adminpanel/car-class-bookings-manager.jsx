// src/app/dashboard/adminpanel/car-class-bookings-manager.jsx
'use client';

import { useState, useEffect } from 'react';
import { dbService } from '@/services/dbService';
import { Calendar, Phone, User, CheckCircle, Clock, Trash2, Car } from 'lucide-react';

export default function CarClassBookingsManager() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    const res = await dbService.getAll('service_bookings');
    if (res.success && res.data) {
      const dataArray = Array.isArray(res.data) 
        ? res.data 
        : Object.keys(res.data).map(key => ({ id: key, ...res.data[key] }));
      setBookings(dataArray);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      await dbService.remove('service_bookings', id);
      loadBookings();
    }
  };

  const handleStatusUpdate = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'Confirmed' : 'Pending';
    await dbService.update('service_bookings', id, { status: newStatus });
    loadBookings();
  };

  return (
    <div id="bookings-manager-area" className="card border-0 shadow-sm rounded-4 p-3 p-md-4 bg-white text-start mt-4">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
        <div className="d-flex align-items-center gap-2">
          <Calendar size={22} className="text-danger flex-shrink-0" />
          <h4 className="fw-bold text-dark mb-0 fs-5">Car Class Service Bookings ({bookings.length})</h4>
        </div>
        <button 
          className="btn btn-outline-dark btn-sm rounded-pill px-4 fw-bold shadow-sm"
          onClick={loadBookings}
        >
          Refresh List
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border spinner-border-sm text-danger" role="status"></div>
          <span className="ms-2 small text-muted">Loading bookings...</span>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-5 text-muted small card border-0 bg-light rounded-4">
          No service bookings found yet. Users booking from car classes will appear here!
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Car Class / Model</th>
                <th>Service Type</th>
                <th>Preferred Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((item) => (
                <tr key={item.id}>
                  <td className="fw-bold text-dark">
                    <div className="d-flex align-items-center gap-2">
                      <User size={16} className="text-muted" />
                      {item.name || 'N/A'}
                    </div>
                  </td>
                  <td>
                    <a href={`tel:${item.phone}`} className="text-decoration-none text-secondary d-flex align-items-center gap-1">
                      <Phone size={14} className="text-danger" /> {item.phone || 'N/A'}
                    </a>
                  </td>
                  <td>
                    <span className="badge bg-danger bg-opacity-10 text-danger px-3 py-1.5 rounded-pill d-inline-flex align-items-center gap-1">
                      <Car size={12} /> {item.carClass || item.carModel || 'General'}
                    </span>
                  </td>
                  <td className="text-secondary small">{item.serviceType || 'Routine Servicing'}</td>
                  <td className="text-secondary small">
                    <span className="d-flex align-items-center gap-1">
                      <Calendar size={13} className="text-muted" /> {item.preferredDate || 'Not specified'}
                    </span>
                  </td>
                  <td>
                    <button 
                      className={`badge border-0 px-3 py-1 rounded-pill ${item.status === 'Confirmed' ? 'bg-success text-white' : 'bg-warning text-dark'}`}
                      onClick={() => handleStatusUpdate(item.id, item.status || 'Pending')}
                      title="Click to toggle status"
                    >
                      {item.status || 'Pending'}
                    </button>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-sm btn-outline-danger rounded-circle p-2" 
                        onClick={() => handleDelete(item.id)} 
                        title="Delete Booking"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
// src/app/dashboard/adminpanel/cases-manager.jsx
'use client';

import { useState, useEffect } from 'react';
import { dbService } from '@/services/dbService';
import { Plus, Trash2, Edit3, Briefcase } from 'lucide-react';

export default function CasesManager() {
  const [cases, setCases] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    client: '',
    category: '',
    startDate: '',
    price: '',
    imageUrl: '',
    description: '',
    resultsText: ''
  });

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    const res = await dbService.getAll('cases');
    if (res.success && res.data) {
      setCases(res.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await dbService.update('cases', currentId, formData);
    } else {
      await dbService.create('cases', formData);
    }
    resetForm();
    loadCases();
  };

  const handleEdit = (item) => {
    setFormData(item);
    setCurrentId(item.id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this case study?')) {
      await dbService.remove('cases', id);
      loadCases();
    }
  };

  const resetForm = () => {
    setFormData({ title: '', client: '', category: '', startDate: '', price: '', imageUrl: '', description: '', resultsText: '' });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white text-start">
      <div className="d-flex align-items-center gap-2 mb-4">
        <Briefcase size={22} className="text-danger" />
        <h4 className="fw-bold text-dark mb-0">Manage Case Studies</h4>
      </div>

      <form onSubmit={handleSubmit} className="card p-3 bg-light border-0 rounded-4 mb-4">
        <h6 className="fw-bold mb-3">{isEditing ? 'Edit Case Study' : 'Add New Case Study'}</h6>
        <div className="row g-3">
          <div className="col-md-6">
            <input type="text" className="form-control rounded-pill px-3 small" placeholder="Case Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          </div>
          <div className="col-md-6">
            <input type="text" className="form-control rounded-pill px-3 small" placeholder="Client Name (e.g. John Doe)" value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} required />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control rounded-pill px-3 small" placeholder="Category (e.g. Repair)" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control rounded-pill px-3 small" placeholder="Start Date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control rounded-pill px-3 small" placeholder="Price (e.g. 584)" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
          </div>
          <div className="col-12">
            <input type="url" className="form-control rounded-pill px-3 small" placeholder="Main Image URL" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} required />
          </div>
          <div className="col-12">
            <textarea className="form-control rounded-4 p-3 small" rows="2" placeholder="Case Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required></textarea>
          </div>
          <div className="col-12 d-flex gap-2">
            <button type="submit" className="btn btn-danger btn-sm rounded-pill px-4 fw-bold">
              {isEditing ? 'Update Case' : 'Add Case'}
            </button>
            {isEditing && (
              <button type="button" className="btn btn-secondary btn-sm rounded-pill px-3" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Client</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cases.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-3 text-muted">No case studies found.</td>
              </tr>
            ) : (
              cases.map((item) => (
                <tr key={item.id}>
                  <td className="fw-bold text-dark">{item.title}</td>
                  <td>{item.client}</td>
                  <td><span className="badge bg-danger bg-opacity-10 text-danger">{item.category}</span></td>
                  <td>${item.price}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-primary rounded-circle p-2" onClick={() => handleEdit(item)} title="Edit">
                        <Edit3 size={14} />
                      </button>
                      <button className="btn btn-sm btn-outline-danger rounded-circle p-2" onClick={() => handleDelete(item.id)} title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
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
// src/app/dashboard/adminpanel/cases-manager.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { dbService } from '@/services/dbService';
import { Plus, Trash2, Edit3, Briefcase, Calendar, User, Tag, DollarSign } from 'lucide-react';

export default function CasesManager() {
  const [cases, setCases] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const fileInputRef = useRef(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageUrl && !isEditing) {
      alert('Kripya ek main image select karein.');
      return;
    }

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (confirm('Kya aap is case study ko delete karna chahte hain?')) {
      await dbService.remove('cases', id);
      loadCases();
    }
  };

  const resetForm = () => {
    setFormData({ title: '', client: '', category: '', startDate: '', price: '', imageUrl: '', description: '', resultsText: '' });
    setIsEditing(false);
    setCurrentId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 bg-white text-start">
      <div className="d-flex align-items-center gap-2 mb-4">
        <Briefcase size={22} className="text-danger flex-shrink-0" />
        <h4 className="fw-bold text-dark mb-0 fs-5">Manage Case Studies</h4>
      </div>

      <form onSubmit={handleSubmit} className="card p-3 p-md-4 bg-light border-0 rounded-4 mb-4">
        <h6 className="fw-bold mb-3">{isEditing ? 'Edit Case Study' : 'Add New Case Study'}</h6>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="form-label small fw-semibold text-secondary">Case Title</label>
            <input type="text" className="form-control rounded-pill px-3 small" placeholder="e.g. Engine Repair" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label small fw-semibold text-secondary">Client Name</label>
            <input type="text" className="form-control rounded-pill px-3 small" placeholder="e.g. John Doe" value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} required />
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label small fw-semibold text-secondary">Category</label>
            <input type="text" className="form-control rounded-pill px-3 small" placeholder="e.g. Repair" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label small fw-semibold text-secondary">Start Date</label>
            <input type="date" className="form-control rounded-pill px-3 small bg-white" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required />
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label small fw-semibold text-secondary">Price ($)</label>
            <input type="number" className="form-control rounded-pill px-3 small" placeholder="e.g. 584" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
          </div>
          <div className="col-12">
            <label className="form-label small fw-bold text-secondary mb-1">Upload Main Image</label>
            <input ref={fileInputRef} type="file" className="form-control rounded-pill px-3 small py-2 bg-white" accept="image/*" onChange={handleImageChange} required={!isEditing} />
          </div>
          <div className="col-12">
            <label className="form-label small fw-semibold text-secondary">Case Description</label>
            <textarea className="form-control rounded-4 p-3 small" rows="3" placeholder="Describe the service details..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required></textarea>
          </div>
          <div className="col-12 d-flex flex-wrap gap-2 pt-2">
            <button type="submit" className="btn btn-danger btn-sm rounded-pill px-4 fw-bold shadow-sm">
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

      <h5 className="fw-bold text-dark fs-6 mb-3">Existing Cases ({cases.length})</h5>

      {cases.length === 0 ? (
        <div className="text-center py-4 text-muted small card border-0 bg-light rounded-4">No case studies found.</div>
      ) : (
        <>
          {/* Mobile View: Bootstrap Cards */}
          <div className="d-md-none row g-3">
            {cases.map((item) => (
              <div className="col-12" key={item.id}>
                <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
                  <div className="d-flex gap-3 align-items-center mb-3">
                    <img 
                      src={item.imageUrl || '/images/servicesman.webp'} 
                      alt="Thumbnail" 
                      className="rounded-3 object-fit-cover shadow-sm flex-shrink-0" 
                      style={{ width: '60px', height: '60px' }} 
                    />
                    <div>
                      <span className="badge bg-danger bg-opacity-10 text-danger mb-1">{item.category}</span>
                      <h6 className="fw-bold text-dark mb-0 small">{item.title}</h6>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between text-muted small border-top pt-2 mb-3">
                    <span className="d-flex align-items-center gap-1"><User size={13} /> {item.client}</span>
                    <span className="fw-bold text-success">${item.price}</span>
                  </div>
                  <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-sm btn-outline-primary rounded-pill px-3 d-flex align-items-center gap-1 py-1 small" onClick={() => handleEdit(item)}>
                      <Edit3 size={13} /> Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger rounded-pill px-3 d-flex align-items-center gap-1 py-1 small" onClick={() => handleDelete(item.id)}>
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
                  <th>Image</th>
                  <th>Title</th>
                  <th>Client</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img 
                        src={item.imageUrl || '/images/servicesman.webp'} 
                        alt="Thumbnail" 
                        className="rounded-3 object-fit-cover shadow-sm" 
                        style={{ width: '45px', height: '40px' }} 
                      />
                    </td>
                    <td className="fw-bold text-dark text-break" style={{ minWidth: '180px' }}>{item.title}</td>
                    <td className="text-nowrap">{item.client}</td>
                    <td><span className="badge bg-danger bg-opacity-10 text-danger text-nowrap">{item.category}</span></td>
                    <td className="fw-semibold text-success">${item.price}</td>
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
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
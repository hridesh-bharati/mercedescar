// src/app/dashboard/adminpanel/services-manager.jsx
'use client';

import { useState, useEffect } from 'react';
import { dbService } from '@/services/dbService';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Trash2, Edit } from 'lucide-react';

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const res = await dbService.getAll('services');
    if (res.success) setServices(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = '';
    if (imageFile) {
      const uploadRes = await uploadToCloudinary(imageFile);
      if (uploadRes.success) {
        imageUrl = uploadRes.url;
      } else {
        alert("Image upload failed: " + uploadRes.error);
        setLoading(false);
        return;
      }
    }

    const payload = { title, desc, price, imageUrl };

    if (editId) {
      await dbService.update('services', editId, payload);
      setEditId(null);
    } else {
      await dbService.create('services', payload);
    }

    setTitle('');
    setDesc('');
    setPrice('');
    setImageFile(null);
    setLoading(false);
    loadServices();
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this service?')) {
      await dbService.remove('services', id);
      loadServices();
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setTitle(item.title);
    setDesc(item.desc);
    setPrice(item.price);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
      <h4 className="fw-bold text-dark mb-4">Manage Car Services</h4>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="row g-3 mb-5 bg-light p-4 rounded-4">
        <div className="col-md-4">
          <label className="form-label small fw-bold">Service Title</label>
          <input type="text" className="form-control rounded-pill px-3" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="col-md-3">
          <label className="form-label small fw-bold">Price ($)</label>
          <input type="text" className="form-control rounded-pill px-3" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="col-md-5">
          <label className="form-label small fw-bold">Service Image</label>
          <input type="file" className="form-control rounded-pill px-3" onChange={(e) => setImageFile(e.target.files[0])} />
        </div>
        <div className="col-12">
          <label className="form-label small fw-bold">Description</label>
          <textarea className="form-control rounded-4 p-3" rows="2" value={desc} onChange={(e) => setDesc(e.target.value)} required></textarea>
        </div>
        <div className="col-12 d-flex gap-2">
          <button type="submit" className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm" disabled={loading}>
            {loading ? 'Processing...' : editId ? 'Update Service' : 'Add Service'}
          </button>
          {editId && (
            <button type="button" className="btn btn-secondary rounded-pill px-4 fw-bold" onClick={() => { setEditId(null); setTitle(''); setDesc(''); setPrice(''); }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Services List Table */}
      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt="" className="rounded-3 object-fit-cover" style={{ width: '50px', height: '50px' }} />
                  ) : (
                    <span className="text-muted small">No Image</span>
                  )}
                </td>
                <td className="fw-bold">{item.title}</td>
                <td className="text-danger fw-bold">${item.price}</td>
                <td className="text-muted small text-truncate" style={{ maxWidth: '250px' }}>{item.desc}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary rounded-circle p-2" onClick={() => handleEdit(item)}><Edit size={14} /></button>
                    <button className="btn btn-sm btn-outline-danger rounded-circle p-2" onClick={() => handleDelete(item.id)}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
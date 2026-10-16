// src/app/dashboard/adminpanel/services-manager.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { dbService } from '@/services/dbService';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Trash2, Edit, Wrench } from 'lucide-react';

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const fileInputRef = useRef(null);

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

    const payload = { 
      title, 
      desc, 
      price, 
      ...(imageUrl && { imageUrl }) 
    };

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
    if (fileInputRef.current) fileInputRef.current.value = '';
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 bg-white text-start">
      <div className="d-flex align-items-center gap-2 mb-4">
        <Wrench size={22} className="text-danger flex-shrink-0" />
        <h4 className="fw-bold text-dark mb-0 fs-5">Manage Car Services</h4>
      </div>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="row g-3 mb-4 bg-light p-3 p-md-4 rounded-4">
        <h6 className="fw-bold mb-0">{editId ? 'Edit Service' : 'Add New Service'}</h6>
        <div className="col-12 col-md-5">
          <label className="form-label small fw-bold">Service Title</label>
          <input type="text" className="form-control rounded-pill px-3 small" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="col-12 col-md-3">
          <label className="form-label small fw-bold">Price ($)</label>
          <input type="text" className="form-control rounded-pill px-3 small" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="col-12 col-md-4">
          <label className="form-label small fw-bold">Service Image</label>
          <input ref={fileInputRef} type="file" className="form-control rounded-pill px-3 small py-2 bg-white" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
        </div>
        <div className="col-12">
          <label className="form-label small fw-bold">Description</label>
          <textarea className="form-control rounded-4 p-3 small" rows="3" value={desc} onChange={(e) => setDesc(e.target.value)} required></textarea>
        </div>
        <div className="col-12 d-flex flex-wrap gap-2">
          <button type="submit" className="btn btn-danger btn-sm rounded-pill px-4 fw-bold shadow-sm" disabled={loading}>
            {loading ? 'Processing...' : editId ? 'Update Service' : 'Add Service'}
          </button>
          {editId && (
            <button type="button" className="btn btn-secondary btn-sm rounded-pill px-3 fw-bold" onClick={() => { setEditId(null); setTitle(''); setDesc(''); setPrice(''); }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <h5 className="fw-bold text-dark fs-6 mb-3">All Services ({services.length})</h5>

      {services.length === 0 ? (
        <div className="text-center py-4 text-muted small card border-0 bg-light rounded-4">No services found.</div>
      ) : (
        <>
          {/* Mobile View: Clean Bootstrap Cards */}
          <div className="d-md-none row g-3">
            {services.map((item) => (
              <div className="col-12" key={item.id}>
                <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
                  <div className="d-flex gap-3 align-items-center mb-3">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt="" className="rounded-3 object-fit-cover shadow-sm flex-shrink-0" style={{ width: '55px', height: '55px' }} />
                    ) : (
                      <div className="rounded-3 bg-light text-muted d-flex align-items-center justify-content-center small flex-shrink-0" style={{ width: '55px', height: '55px' }}>No Img</div>
                    )}
                    <div>
                      <h6 className="fw-bold text-dark mb-1 small">{item.title}</h6>
                      <span className="fw-bold text-danger small">${item.price}</span>
                    </div>
                  </div>
                  <p className="text-muted small mb-3">{item.desc}</p>
                  <div className="d-flex justify-content-end gap-2 border-top pt-2">
                    <button className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 small d-flex align-items-center gap-1" onClick={() => handleEdit(item)}>
                      <Edit size={13} /> Edit
                    </button>
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
                        <img src={item.imageUrl} alt="" className="rounded-3 object-fit-cover shadow-sm" style={{ width: '45px', height: '40px' }} />
                      ) : (
                        <span className="text-muted small">No Image</span>
                      )}
                    </td>
                    <td className="fw-bold text-dark">{item.title}</td>
                    <td className="text-danger fw-bold">${item.price}</td>
                    <td className="text-muted small text-truncate" style={{ maxWidth: '250px' }}>{item.desc}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-primary rounded-circle p-2" onClick={() => handleEdit(item)} title="Edit"><Edit size={14} /></button>
                        <button className="btn btn-sm btn-outline-danger rounded-circle p-2" onClick={() => handleDelete(item.id)} title="Delete"><Trash2 size={14} /></button>
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
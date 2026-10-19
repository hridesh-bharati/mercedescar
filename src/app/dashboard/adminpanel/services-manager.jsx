// src/app/dashboard/adminpanel/services-manager.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { dbService } from '@/services/dbService';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Trash2, Edit, Wrench, X, Camera } from 'lucide-react';

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState('');
  const [model, setModel] = useState('');
  const [desc, setDesc] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
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

  const handleMultipleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const uploadedLinks = [...imageUrls];

    for (const file of files) {
      const uploadRes = await uploadToCloudinary(file);
      if (uploadRes.success) {
        uploadedLinks.push(uploadRes.url);
      } else {
        alert("Image upload failed: " + uploadRes.error);
      }
    }

    setImageUrls(uploadedLinks);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (indexToRemove) => {
    setImageUrls(imageUrls.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = { 
      title, 
      model,
      desc, 
      imageUrls,
      imageUrl: imageUrls[0] || '' // Primary fallback image
    };

    if (editId) {
      await dbService.update('services', editId, payload);
      setEditId(null);
    } else {
      await dbService.create('services', payload);
    }

    setTitle('');
    setModel('');
    setDesc('');
    setImageUrls([]);
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
    setTitle(item.title || '');
    setModel(item.model || '');
    setDesc(item.desc || '');
    if (item.imageUrls && Array.isArray(item.imageUrls)) {
      setImageUrls(item.imageUrls);
    } else if (item.imageUrl) {
      setImageUrls([item.imageUrl]);
    } else {
      setImageUrls([]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditId(null);
    setTitle('');
    setModel('');
    setDesc('');
    setImageUrls([]);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 bg-white text-start">
      <div className="d-flex align-items-center gap-2 mb-4">
        <Wrench size={22} className="text-danger flex-shrink-0" />
        <h4 className="fw-bold text-dark mb-0 fs-5">Manage Pro Services & Gallery</h4>
      </div>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="row g-3 mb-4 bg-light p-3 p-md-4 rounded-4">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="fw-bold mb-0">{editId ? 'Edit Service' : 'Add New Service'}</h6>
          {editId && (
            <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1" onClick={handleCancel}>
              <X size={14} /> Cancel
            </button>
          )}
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label small fw-bold">Service Title (e.g. Mercedes Engine Repair)</label>
          <input 
            type="text" 
            className="form-control rounded-pill px-3 small bg-white" 
            placeholder="e.g. Engine Repair" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label small fw-bold">Category / Model Focus</label>
          <input 
            type="text" 
            className="form-control rounded-pill px-3 small bg-white" 
            placeholder="e.g. All Models / G-Class / AMG" 
            value={model} 
            onChange={(e) => setModel(e.target.value)} 
            required 
          />
        </div>

        <div className="col-12">
          <label className="form-label small fw-bold">Upload Multiple Workshop Photos (Gallery for this service)</label>
          <input 
            ref={fileInputRef} 
            type="file" 
            className="form-control rounded-pill px-3 small py-2 bg-white" 
            accept="image/*" 
            multiple 
            onChange={handleMultipleImageUpload} 
          />
          {uploading && <div className="text-danger small mt-1">Uploading pictures to Cloudinary...</div>}

          {/* Previews */}
          {imageUrls.length > 0 && (
            <div className="d-flex flex-wrap gap-2 mt-3">
              {imageUrls.map((url, idx) => (
                <div key={idx} className="position-relative border rounded-3 p-1 bg-white shadow-sm" style={{ width: '65px', height: '65px' }}>
                  <img src={url} alt="Preview" className="w-100 h-100 object-fit-cover rounded-2" />
                  <button 
                    type="button" 
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border-0 p-1"
                    onClick={() => removeImage(idx)}
                    title="Remove image"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-12">
          <label className="form-label small fw-bold">Description</label>
          <textarea 
            className="form-control rounded-4 p-3 small bg-white" 
            rows="3" 
            placeholder="Write detailed service specifications..." 
            value={desc} 
            onChange={(e) => setDesc(e.target.value)} 
            required
          ></textarea>
        </div>

        <div className="col-12 d-flex flex-wrap gap-2 pt-2">
          <button type="submit" className="btn btn-danger btn-sm rounded-pill px-4 fw-bold shadow-sm" disabled={loading || uploading}>
            {loading ? 'Processing...' : editId ? 'Update Service' : 'Add Service'}
          </button>
        </div>
      </form>

      <h5 className="fw-bold text-dark fs-6 mb-3">All Services ({services.length})</h5>

      {services.length === 0 ? (
        <div className="text-center py-4 text-muted small card border-0 bg-light rounded-4">No services found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>Photos</th>
                <th>Title</th>
                <th>Focus</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((item) => {
                const pics = item.imageUrls || (item.imageUrl ? [item.imageUrl] : []);
                return (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex gap-1">
                        {pics.length > 0 ? (
                          pics.slice(0, 3).map((url, i) => (
                            <img key={i} src={url} alt="" className="rounded-2 object-fit-cover shadow-sm" style={{ width: '35px', height: '35px' }} />
                          ))
                        ) : (
                          <span className="text-muted small">No Img</span>
                        )}
                        {pics.length > 3 && <span className="small text-muted align-self-center">+{pics.length - 3}</span>}
                      </div>
                    </td>
                    <td className="fw-bold text-dark">{item.title}</td>
                    <td><span className="badge bg-danger bg-opacity-10 text-danger">{item.model || 'General'}</span></td>
                    <td className="text-muted small text-truncate" style={{ maxWidth: '250px' }}>{item.desc}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-primary rounded-circle p-2" onClick={() => handleEdit(item)} title="Edit"><Edit size={14} /></button>
                        <button className="btn btn-sm btn-outline-danger rounded-circle p-2" onClick={() => handleDelete(item.id)} title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
// src/app/dashboard/adminpanel/services-manager.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { dbService } from '@/services/dbService';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Trash2, Edit, Wrench, X, UploadCloud, Save, List, PlusCircle } from 'lucide-react';

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState('');
  const [model, setModel] = useState('');
  const [desc, setDesc] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [importingJson, setImportingJson] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // New state to toggle between Form view and Services List view
  const [showList, setShowList] = useState(false);

  const fileInputRef = useRef(null);
  const jsonInputRef = useRef(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const res = await dbService.getAll('services');
    if (res.success) setServices(res.data);
  };

  // Bulk Import Services via JSON file upload
  const handleJsonFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        if (!Array.isArray(jsonData)) {
          alert("Invalid JSON format. Expected an array of services.");
          return;
        }

        if (!confirm(`Are you sure you want to import ${jsonData.length} services into the database?`)) return;

        setImportingJson(true);
        let successCount = 0;

        for (const item of jsonData) {
          const payload = {
            title: item.title || 'Mercedes Repair Service',
            model: item.model || 'All Models',
            desc: item.desc || item.description || 'Professional Mercedes-Benz workshop services in Dubai.',
            imageUrls: item.imageUrls || (item.imageUrl ? [item.imageUrl] : []),
            imageUrl: item.imageUrl || (item.imageUrls?.[0] || '')
          };

          const res = await dbService.create('services', payload);
          if (res.success) successCount++;
        }

        alert(`Successfully imported ${successCount} services!`);
        setImportingJson(false);
        loadServices();
        if (jsonInputRef.current) jsonInputRef.current.value = '';
      } catch (err) {
        alert("Failed to parse JSON file: " + err.message);
        setImportingJson(false);
      }
    };
    reader.readAsText(file);
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
      imageUrl: imageUrls[0] || '' 
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
    setShowList(true); // Switch to list view after submitting successfully
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
    setShowList(false); // Switch to form view when editing
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditId(null);
    setTitle('');
    setModel('');
    setDesc('');
    setImageUrls([]);
    setShowList(true);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 bg-white text-start">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
        <div className="d-flex align-items-center gap-2">
          <Wrench size={22} className="text-danger flex-shrink-0" />
          <h4 className="fw-bold text-dark mb-0 fs-5">Manage Car Services & Gallery</h4>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          {/* Toggle View Button */}
          <button 
            type="button" 
            className="btn btn-outline-dark btn-sm rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center gap-2"
            onClick={() => setShowList(!showList)}
          >
            {showList ? (
              <>
                <PlusCircle size={16} /> Add New Service
              </>
            ) : (
              <>
                <List size={16} /> All Services ({services.length})
              </>
            )}
          </button>

          {/* JSON File Upload Button */}
          <div>
            <input 
              ref={jsonInputRef}
              type="file" 
              accept=".json" 
              className="d-none" 
              onChange={handleJsonFileUpload} 
            />
            <button 
              type="button" 
              className="btn btn-dark btn-sm rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center gap-2"
              onClick={() => jsonInputRef.current?.click()}
              disabled={importingJson}
            >
              <UploadCloud size={16} /> {importingJson ? 'Importing...' : 'Upload JSON'}
            </button>
          </div>
        </div>
      </div>

      {/* Conditionally Render Form or Table */}
      {!showList ? (
        /* Add / Edit Form */
        <form onSubmit={handleSubmit} className="row g-3 mb-4 bg-light p-3 p-md-4 rounded-4">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="fw-bold mb-0">{editId ? 'Edit Service' : 'Add New Service'}</h6>
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1" onClick={() => setShowList(true)}>
                <List size={14} /> View All Services
              </button>
              {editId && (
                <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1" onClick={handleCancel}>
                  <X size={14} /> Cancel
                </button>
              )}
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label small fw-bold">Service Title</label>
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
            <label className="form-label small fw-bold">Model / Category Focus</label>
            <input 
              type="text" 
              className="form-control rounded-pill px-3 small bg-white" 
              placeholder="e.g. All Models / G63" 
              value={model} 
              onChange={(e) => setModel(e.target.value)} 
              required 
            />
          </div>

          <div className="col-12">
            <label className="form-label small fw-bold">Upload Multiple Workshop Photos</label>
            <input 
              ref={fileInputRef} 
              type="file" 
              className="form-control rounded-pill px-3 small py-2 bg-white" 
              accept="image/*" 
              multiple 
              onChange={handleMultipleImageUpload} 
            />
            {uploading && <div className="text-danger small mt-1">Uploading pictures...</div>}

            {imageUrls.length > 0 && (
              <div className="d-flex flex-wrap gap-2 mt-3">
                {imageUrls.map((url, idx) => (
                  <div key={idx} className="position-relative border rounded-3 p-1 bg-white shadow-sm" style={{ width: '60px', height: '60px' }}>
                    <img src={url} alt="Preview" className="w-100 h-100 object-fit-cover rounded-2" />
                    <button 
                      type="button" 
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border-0 p-1"
                      onClick={() => removeImage(idx)}
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
              placeholder="Write service specifications..." 
              value={desc} 
              onChange={(e) => setDesc(e.target.value)} 
              required
            ></textarea>
          </div>

          <div className="col-12 pt-2">
            <button type="submit" className="btn btn-danger btn-sm rounded-pill px-4 fw-bold shadow-sm" disabled={loading || uploading}>
              <Save size={15} /> {loading ? 'Processing...' : editId ? 'Update Service' : 'Add Service'}
            </button>
          </div>
        </form>
      ) : (
        /* Services List View */
        <div>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="fw-bold text-dark fs-6 mb-0">All Services ({services.length})</h5>
            <button 
              className="btn btn-danger btn-sm rounded-pill px-3 fw-bold d-flex align-items-center gap-1"
              onClick={() => {
                handleCancel();
                setShowList(false);
              }}
            >
              <PlusCircle size={14} /> Add Service
            </button>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-4 text-muted small card border-0 bg-light rounded-4">
              No services found. Click "Upload JSON" above or "Add Service" to create one.
            </div>
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
      )}
    </div>
  );
}
// src/app/dashboard/adminpanel/car-models-manager.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { dbService } from '@/services/dbService';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Trash2, Edit, Car, Camera, Save, X, UploadCloud, List, PlusCircle } from 'lucide-react';

export default function CarModelsManager() {
  const [modelsList, setModelsList] = useState([]);
  const [maker, setMaker] = useState('Mercedes');
  const [modelName, setModelName] = useState('');
  const [desc, setDesc] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadingPic, setUploadingPic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [importingJson, setImportingJson] = useState(false);
  const [editId, setEditId] = useState(null);

  // Toggle state between Form view and List view
  const [showList, setShowList] = useState(true);

  const fileInputRef = useRef(null);
  const jsonInputRef = useRef(null);

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    const res = await dbService.getAll('car_models');
    if (res.success) setModelsList(res.data);
  };

  // Handler to upload and import external JSON file containing models
  const handleJsonFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        if (!Array.isArray(jsonData)) {
          alert("Invalid JSON format. Expected an array of models.");
          return;
        }

        if (!confirm(`Are you sure you want to import ${jsonData.length} models into the database?`)) return;

        setImportingJson(true);
        let successCount = 0;

        for (const item of jsonData) {
          const payload = {
            maker: item.maker || 'Mercedes',
            modelName: item.modelName || item.model || 'Unknown',
            desc: item.desc || `Professional Mercedes-Benz maintenance and repair services in Dubai.`,
            imageUrl: item.imageUrl || ''
          };

          const res = await dbService.create('car_models', payload);
          if (res.success) {
            successCount++;
          }
        }

        alert(`Successfully imported ${successCount} models from JSON!`);
        setImportingJson(false);
        loadModels();
        if (jsonInputRef.current) jsonInputRef.current.value = '';
      } catch (err) {
        alert("Failed to parse JSON file: " + err.message);
        setImportingJson(false);
      }
    };
    reader.readAsText(file);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingPic(true);
    const uploadRes = await uploadToCloudinary(file);
    if (uploadRes.success) {
      setImageUrl(uploadRes.url);
    } else {
      alert('Image upload failed: ' + uploadRes.error);
    }
    setUploadingPic(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = { 
      maker, 
      modelName, 
      desc, 
      imageUrl 
    };

    if (editId) {
      await dbService.update('car_models', editId, payload);
      setEditId(null);
    } else {
      await dbService.create('car_models', payload);
    }

    setMaker('Mercedes');
    setModelName('');
    setDesc('');
    setImageUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setLoading(false);
    loadModels();
    setShowList(true); // Switch back to list view after save
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this car model?')) {
      await dbService.remove('car_models', id);
      loadModels();
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setMaker(item.maker || 'Mercedes');
    setModelName(item.modelName || '');
    setDesc(item.desc || '');
    setImageUrl(item.imageUrl || '');
    setShowList(false); // Switch to form view when editing
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditId(null);
    setMaker('Mercedes');
    setModelName('');
    setDesc('');
    setImageUrl('');
    setShowList(true);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 bg-white text-start">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
        <div className="d-flex align-items-center gap-2">
          <Car size={24} className="text-danger flex-shrink-0" />
          <h4 className="fw-bold text-dark mb-0 fs-5">Manage Car Models Database</h4>
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
                <PlusCircle size={16} /> Add New Model
              </>
            ) : (
              <>
                <List size={16} /> All Car Models ({modelsList.length})
              </>
            )}
          </button>

          {/* Hidden JSON file input & Upload Button */}
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
        <form onSubmit={handleSubmit} className="card p-3 p-md-4 bg-light border-0 rounded-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold mb-0 text-dark">{editId ? 'Edit Car Model' : 'Add New Car Model'}</h6>
            <div className="d-flex gap-2">
              {editId && (
                <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1" onClick={handleCancel}>
                  <X size={14} />Cancel
                </button>
              )}
            </div>
          </div>

          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label small fw-semibold text-secondary">Maker</label>
              <input 
                type="text" 
                className="form-control rounded-pill px-3 small bg-white" 
                value={maker} 
                onChange={(e) => setMaker(e.target.value)} 
                required 
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label small fw-semibold text-secondary">Model Name (e.g. G63, S500)</label>
              <input 
                type="text" 
                className="form-control rounded-pill px-3 small bg-white" 
                placeholder="e.g. G63 AMG" 
                value={modelName} 
                onChange={(e) => setModelName(e.target.value)} 
                required 
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label small fw-semibold text-secondary">Model Image</label>
              <div className="d-flex align-items-center gap-3">
                {imageUrl ? (
                  <img src={imageUrl} alt="Preview" className="rounded-3 object-fit-cover shadow-sm border" style={{ width: '50px', height: '40px' }} />
                ) : (
                  <div className="rounded-3 bg-white border text-muted d-flex align-items-center justify-content-center small" style={{ width: '50px', height: '40px' }}>No Img</div>
                )}
                <button 
                  type="button" 
                  className="btn btn-outline-dark btn-sm rounded-pill px-3 d-flex align-items-center gap-1 small"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingPic}
                >
                  <Camera size={14} /> {uploadingPic ? 'Uploading...' : 'Choose Image'}
                </button>
                <input 
                  ref={fileInputRef} 
                  type="file" 
                  className="d-none" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                />
              </div>
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold text-secondary">Description / Specifications</label>
              <textarea 
                className="form-control rounded-4 p-3 small bg-white" 
                rows="3" 
                placeholder="Write specifications or details about this model..." 
                value={desc} 
                onChange={(e) => setDesc(e.target.value)} 
                required
              ></textarea>
            </div>

            <div className="col-12 pt-2">
              <button type="submit" className="btn btn-danger btn-sm rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center gap-2" disabled={loading || uploadingPic}>
                <Save size={15} /> {loading ? 'Saving...' : editId ? 'Update Model' : 'Save Model'}
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* Car Models List View */
        <div>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="fw-bold text-dark fs-6 mb-0">All Car Models ({modelsList.length})</h5>
            <button 
              className="btn btn-danger btn-sm rounded-pill px-3 fw-bold d-flex align-items-center gap-1"
              onClick={() => {
                handleCancel();
                setShowList(false);
              }}
            >
            </button>
          </div>

          {modelsList.length === 0 ? (
            <div className="text-center py-4 text-muted small card border-0 bg-light rounded-4">
              No car models found in database. Click "Upload JSON" above or "Add Model" to create one.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Image</th>
                    <th>Maker</th>
                    <th>Model</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {modelsList.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt="" className="rounded-3 object-fit-cover shadow-sm" style={{ width: '45px', height: '40px' }} />
                        ) : (
                          <span className="text-muted small">No Image</span>
                        )}
                      </td>
                      <td><span className="badge bg-secondary bg-opacity-10 text-dark">{item.maker}</span></td>
                      <td className="fw-bold text-dark">{item.modelName}</td>
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
          )}
        </div>
      )}
    </div>
  );
}
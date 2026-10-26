// src/app/dashboard/adminpanel/car-classes-manager.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { dbService } from '@/services/dbService';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Trash2, Edit, Car, X, UploadCloud, Save, List, PlusCircle, Calendar, ChevronDown, ChevronUp, Globe } from 'lucide-react';

const EMPTY = {
  className: '', tagline: '', desc: '',
  seoTitle: '', seoDescription: '',
  h1: '', heroIntro: '',
  contentSections: [{ heading: '', body: '' }],
  faqs: [{ q: '', a: '' }],
  relatedModels: [{ label: '', href: '' }],
  imageUrls: [],
};

export default function CarClassesManager() {
  const [carClasses, setCarClasses] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [importingJson, setImportingJson] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showList, setShowList] = useState(false);
  const [showSeo, setShowSeo] = useState(false);

  const fileInputRef = useRef(null);
  const jsonInputRef = useRef(null);

  useEffect(() => { loadCarClasses(); }, []);

  const loadCarClasses = async () => {
    const res = await dbService.getAll('car_classes');
    if (res.success && res.data) {
      // Preserve IDs if data comes as an object
      const dataList = Array.isArray(res.data) 
        ? res.data 
        : Object.keys(res.data).map(k => ({ id: k, ...res.data[k] }));
      setCarClasses(dataList);
    }
  };

  const handleJsonFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        if (!Array.isArray(jsonData)) { alert('Invalid JSON. Expected an array.'); return; }
        if (!confirm(`Import ${jsonData.length} car classes?`)) return;
        setImportingJson(true);
        let ok = 0;
        for (const item of jsonData) {
          
          // Auto-generate slug for JSON imports
          const generatedSlug = (item.className || item.modelName || 'g-class').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

          const payload = {
            className: item.className || item.modelName || 'G-Class',
            slug: item.slug || generatedSlug,
            tagline: item.tagline || 'Expert Service & Repair',
            desc: item.desc || item.description || '',
            seoTitle: item.seoTitle || '',
            seoDescription: item.seoDescription || '',
            h1: item.h1 || '',
            heroIntro: item.heroIntro || '',
            contentSections: item.contentSections || [],
            faqs: item.faqs || [],
            relatedModels: item.relatedModels || [],
            imageUrls: item.imageUrls || (item.imageUrl ? [item.imageUrl] : []),
            imageUrl: item.imageUrl || item.imageUrls?.[0] || '',
          };
          const res = await dbService.create('car_classes', payload);
          if (res.success) ok++;
        }
        alert(`Imported ${ok} car classes.`);
        setImportingJson(false);
        loadCarClasses();
        if (jsonInputRef.current) jsonInputRef.current.value = '';
      } catch (err) {
        alert('Failed to parse JSON: ' + err.message);
        setImportingJson(false);
      }
    };
    reader.readAsText(file);
  };

  const handleMultipleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    const links = [...form.imageUrls];
    for (const f of files) {
      const r = await uploadToCloudinary(f);
      if (r.success) links.push(r.url);
    }
    setForm({ ...form, imageUrls: links });
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (idx) => setForm({ ...form, imageUrls: form.imageUrls.filter((_, i) => i !== idx) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Fix 1: Auto-generate slug so URLs never break if className changes
    const generatedSlug = form.className.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    // Fix 2: Filter out empty rows before saving
    const payload = {
      ...form,
      slug: generatedSlug,
      imageUrl: form.imageUrls[0] || '',
      contentSections: form.contentSections.filter(s => s.heading.trim() && s.body.trim()),
      faqs: form.faqs.filter(f => f.q.trim() && f.a.trim()),
      relatedModels: form.relatedModels.filter(r => r.label.trim() && r.href.trim()),
    };

    try {
      if (editId) await dbService.update('car_classes', editId, payload);
      else await dbService.create('car_classes', payload);
      
      setForm(EMPTY);
      setEditId(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      loadCarClasses();
      setShowList(true);
    } catch (err) {
      alert('Error saving car class. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this car class?')) {
      await dbService.remove('car_classes', id);
      loadCarClasses();
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      className: item.className || '',
      tagline: item.tagline || '',
      desc: item.desc || '',
      seoTitle: item.seoTitle || '',
      seoDescription: item.seoDescription || '',
      h1: item.h1 || '',
      heroIntro: item.heroIntro || '',
      contentSections: item.contentSections?.length ? item.contentSections : [{ heading: '', body: '' }],
      faqs: item.faqs?.length ? item.faqs : [{ q: '', a: '' }],
      relatedModels: item.relatedModels?.length ? item.relatedModels : [{ label: '', href: '' }],
      imageUrls: item.imageUrls || (item.imageUrl ? [item.imageUrl] : []),
    });
    setShowList(false);
    setShowSeo(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditId(null);
    setForm(EMPTY);
    setShowList(true);
  };

  const updateArr = (key, idx, field, value) => {
    const arr = [...form[key]];
    arr[idx] = { ...arr[idx], [field]: value };
    setForm({ ...form, [key]: arr });
  };
  const addRow = (key, template) => setForm({ ...form, [key]: [...form[key], template] });
  const removeRow = (key, idx) => setForm({ ...form, [key]: form[key].filter((_, i) => i !== idx) });

  return (
    <div className="card border-0 shadow-sm rounded-4 p-2 p-md-4 bg-white text-start">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
        <div className="d-flex align-items-center gap-2">
          <Car size={22} className="text-danger" />
          <h4 className="fw-bold text-dark mb-0 fs-5">Manage Car Classes</h4>
        </div>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <a href="#bookings-section" className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold text-decoration-none">
            <Calendar size={15} /> Bookings
          </a>
          <button type="button" className="btn btn-outline-dark btn-sm rounded-pill px-4 fw-bold"
            onClick={() => setShowList(!showList)}>
            {showList ? <><PlusCircle size={16} /> Add New</> : <><List size={16} /> All ({carClasses.length})</>}
          </button>
          <div>
            <input ref={jsonInputRef} type="file" accept=".json" className="d-none" onChange={handleJsonFileUpload} />
            <button type="button" className="btn btn-dark btn-sm rounded-pill px-4 fw-bold"
              onClick={() => jsonInputRef.current?.click()} disabled={importingJson}>
              <UploadCloud size={16} /> {importingJson ? 'Importing...' : 'Upload JSON'}
            </button>
          </div>
        </div>
      </div>

      {!showList ? (
        <form onSubmit={handleSubmit} className="row g-3 mb-4 bg-light p-3 p-md-4 rounded-4">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="fw-bold mb-0">{editId ? 'Edit Car Class' : 'Add New Car Class'}</h6>
            {editId && (
              <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill px-3" onClick={handleCancel}>
                <X size={14} /> Cancel
              </button>
            )}
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label small fw-bold">Car Class Name *</label>
            <input type="text" className="form-control rounded-pill px-3 small bg-white"
              placeholder="e.g. G-Class, S-Class, C-Class, AMG"
              value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })} required />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label small fw-bold">Tagline (Hero Subtitle)</label>
            <input type="text" className="form-control rounded-pill px-3 small bg-white"
              placeholder="Expert Service & Repair for Your Mercedes G-Class"
              value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
          </div>

          <div className="col-12">
            <label className="form-label small fw-bold">Short Description (Fallback)</label>
            <textarea className="form-control rounded-3 p-3 small bg-white" rows="2"
              value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
          </div>

          <div className="col-12">
            <label className="form-label small fw-bold">Photos</label>
            <input ref={fileInputRef} type="file" className="form-control rounded-pill px-3 small bg-white"
              accept="image/*" multiple onChange={handleMultipleImageUpload} />
            {uploading && <div className="text-danger small mt-1">Uploading...</div>}
            {form.imageUrls.length > 0 && (
              <div className="d-flex flex-wrap gap-2 mt-3">
                {form.imageUrls.map((url, idx) => (
                  <div key={idx} className="position-relative border rounded-3 p-1 bg-white" style={{ width: '60px', height: '60px' }}>
                    <img src={url} alt="" className="w-100 h-100 object-fit-cover rounded-2" />
                    <button type="button" className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border-0 p-1"
                      onClick={() => removeImage(idx)}><X size={10} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-12">
            <button type="button" className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold d-flex align-items-center gap-2"
              onClick={() => setShowSeo(!showSeo)}>
              <Globe size={14} /> {showSeo ? 'Hide' : 'Show'} SEO Content {showSeo ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {showSeo && (
            <>
              <div className="col-12">
                <label className="form-label small fw-bold">SEO Title (50-60 chars)</label>
                <input type="text" className="form-control rounded-pill px-3 small bg-white"
                  placeholder="Mercedes G-Class Service & Repair Dubai | German Auto Expert"
                  value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} />
                <div className="form-text small">{form.seoTitle.length}/60</div>
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold">SEO Meta Description (150-160 chars)</label>
                <textarea className="form-control rounded-3 p-3 small bg-white" rows="2"
                  placeholder="Professional Mercedes G-Class servicing, maintenance & repair in Al Quoz, Dubai..."
                  value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} />
                <div className="form-text small">{form.seoDescription.length}/160</div>
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold">H1 Heading (must include model + Dubai)</label>
                <input type="text" className="form-control rounded-pill px-3 small bg-white"
                  placeholder="Mercedes G-Class Service and Repair in Dubai"
                  value={form.h1} onChange={(e) => setForm({ ...form, h1: e.target.value })} />
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold">Hero Intro Paragraph</label>
                <textarea className="form-control rounded-3 p-3 small bg-white" rows="3"
                  placeholder="Looking for professional Mercedes G-Class service in Dubai? German Auto Expert provides..."
                  value={form.heroIntro} onChange={(e) => setForm({ ...form, heroIntro: e.target.value })} />
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold">Content Sections (H2 blocks)</label>
                {form.contentSections.map((sec, i) => (
                  <div key={i} className="border rounded-3 p-3 mb-2 bg-white">
                    <input type="text" className="form-control form-control-sm rounded-pill px-3 mb-2"
                      placeholder="H2 heading — e.g. Mercedes G-Class Maintenance"
                      value={sec.heading} onChange={(e) => updateArr('contentSections', i, 'heading', e.target.value)} />
                    <textarea className="form-control form-control-sm rounded-3 p-2" rows="3"
                      placeholder="Body paragraph..."
                      value={sec.body} onChange={(e) => updateArr('contentSections', i, 'body', e.target.value)} />
                    {form.contentSections.length > 1 && (
                      <button type="button" className="btn btn-sm btn-outline-danger rounded-pill mt-2"
                        onClick={() => removeRow('contentSections', i)}>Remove</button>
                    )}
                  </div>
                ))}
                <button type="button" className="btn btn-sm btn-outline-dark rounded-pill px-3 fw-bold"
                  onClick={() => addRow('contentSections', { heading: '', body: '' })}>+ Add Section</button>
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold">FAQs (for FAQPage schema)</label>
                {form.faqs.map((faq, i) => (
                  <div key={i} className="border rounded-3 p-3 mb-2 bg-white">
                    <input type="text" className="form-control form-control-sm rounded-pill px-3 mb-2"
                      placeholder="Question"
                      value={faq.q} onChange={(e) => updateArr('faqs', i, 'q', e.target.value)} />
                    <textarea className="form-control form-control-sm rounded-3 p-2" rows="2"
                      placeholder="Answer"
                      value={faq.a} onChange={(e) => updateArr('faqs', i, 'a', e.target.value)} />
                    {form.faqs.length > 1 && (
                      <button type="button" className="btn btn-sm btn-outline-danger rounded-pill mt-2"
                        onClick={() => removeRow('faqs', i)}>Remove</button>
                    )}
                  </div>
                ))}
                <button type="button" className="btn btn-sm btn-outline-dark rounded-pill px-3 fw-bold"
                  onClick={() => addRow('faqs', { q: '', a: '' })}>+ Add FAQ</button>
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold">Related Model Pages (internal linking)</label>
                {form.relatedModels.map((r, i) => (
                  <div key={i} className="d-flex gap-2 mb-2">
                    <input type="text" className="form-control form-control-sm rounded-pill px-3"
                      placeholder="Label — e.g. Mercedes S-Class Service"
                      value={r.label} onChange={(e) => updateArr('relatedModels', i, 'label', e.target.value)} />
                    <input type="text" className="form-control form-control-sm rounded-pill px-3"
                      placeholder="/car-class/s-class"
                      value={r.href} onChange={(e) => updateArr('relatedModels', i, 'href', e.target.value)} />
                    {form.relatedModels.length > 1 && (
                      <button type="button" className="btn btn-sm btn-outline-danger rounded-circle"
                        onClick={() => removeRow('relatedModels', i)}><X size={12} /></button>
                    )}
                  </div>
                ))}
                <button type="button" className="btn btn-sm btn-outline-dark rounded-pill px-3 fw-bold"
                  onClick={() => addRow('relatedModels', { label: '', href: '' })}>+ Add Link</button>
              </div>
            </>
          )}

          <div className="col-12 pt-2">
            <button type="submit" className="btn btn-danger btn-sm rounded-pill px-4 fw-bold shadow-sm" disabled={loading || uploading}>
              <Save size={15} /> {loading ? 'Processing...' : editId ? 'Update Car Class' : 'Add Car Class'}
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="fw-bold text-dark fs-6 mb-0">All Car Classes ({carClasses.length})</h5>
            <button className="btn btn-danger btn-sm rounded-pill px-3 fw-bold d-flex align-items-center gap-1"
              onClick={() => { handleCancel(); setShowList(false); }}>
              <PlusCircle size={14} /> Add Car Class
            </button>
          </div>

          {carClasses.length === 0 ? (
            <div className="text-center py-4 text-muted small bg-light rounded-4">
              No car classes found. Click "Add Car Class" to create one.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Photos</th>
                    <th>Car Class</th>
                    <th>SEO</th>
                    <th>Tagline</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {carClasses.map((item) => {
                    const pics = item.imageUrls || (item.imageUrl ? [item.imageUrl] : []);
                    const slug = (item.slug || (item.className || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
                    const hasSeo = !!(item.seoTitle && item.h1 && item.contentSections?.length);
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex gap-1">
                            {pics.length > 0 ? pics.slice(0, 3).map((url, i) => (
                              <img key={i} src={url} alt="" className="rounded-2 object-fit-cover" style={{ width: '35px', height: '35px' }} />
                            )) : <span className="text-muted small">No Img</span>}
                          </div>
                        </td>
                        <td className="fw-bold text-dark">{item.className}</td>
                        <td>
                          {hasSeo
                            ? <span className="badge bg-success">Complete</span>
                            : <span className="badge bg-warning text-dark">Pending</span>}
                        </td>
                        <td className="text-muted small text-truncate" style={{ maxWidth: '260px' }}>{item.tagline || item.desc}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <a href={`/car-class/${slug}`} target="_blank" rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-dark rounded-circle p-2" title="View Page">
                              <Car size={14} />
                            </a>
                            <button className="btn btn-sm btn-outline-primary rounded-circle p-2" onClick={() => handleEdit(item)} title="Edit">
                              <Edit size={14} />
                            </button>
                            <button className="btn btn-sm btn-outline-danger rounded-circle p-2" onClick={() => handleDelete(item.id)} title="Delete">
                              <Trash2 size={14} />
                            </button>
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
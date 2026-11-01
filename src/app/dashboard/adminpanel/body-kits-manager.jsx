// src/app/dashboard/adminpanel/body-kits-manager.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { dbService } from '@/services/dbService';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Trash2, Edit, Wrench, X, UploadCloud, Save, List, PlusCircle, Globe, ChevronDown, ChevronUp } from 'lucide-react';

const EMPTY = {
  title: '',
  category: 'AMG Body Kits', 
  tagline: '',
  desc: '',
  seoTitle: '',
  seoDescription: '',
  h1: '',
  heroIntro: '',
  contentSections: [{ heading: '', body: '' }],
  faqs: [{ q: '', a: '' }],
  imageUrls: [],
};

export default function BodyKitsManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showList, setShowList] = useState(false); // false = show form, true = show list
  const [showSeo, setShowSeo] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    const res = await dbService.getAll('body_kits_upgrades');
    if (res.success && res.data) {
      const dataList = Array.isArray(res.data)
        ? res.data
        : Object.keys(res.data).map(k => ({ id: k, ...res.data[k] }));
      setItems(dataList);
    }
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
    const slug = form.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const payload = {
      ...form,
      slug,
      imageUrl: form.imageUrls[0] || '',
    };
    if (editId) await dbService.update('body_kits_upgrades', editId, payload);
    else await dbService.create('body_kits_upgrades', payload);
    setForm(EMPTY);
    setEditId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setLoading(false);
    loadItems();
    setShowList(true); // Switch to list view after save
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this body kit / upgrade service?')) {
      await dbService.remove('body_kits_upgrades', id);
      loadItems();
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      title: item.title || '',
      category: item.category || 'AMG Body Kits',
      tagline: item.tagline || '',
      desc: item.desc || '',
      seoTitle: item.seoTitle || '',
      seoDescription: item.seoDescription || '',
      h1: item.h1 || '',
      heroIntro: item.heroIntro || '',
      contentSections: item.contentSections?.length ? item.contentSections : [{ heading: '', body: '' }],
      faqs: item.faqs?.length ? item.faqs : [{ q: '', a: '' }],
      imageUrls: item.imageUrls || (item.imageUrl ? [item.imageUrl] : []),
    });
    setShowList(false); // Ensure form is shown when editing
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
    <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 bg-white text-start">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
        <div className="d-flex align-items-center gap-2">
          <Wrench size={22} className="text-danger" />
          <h4 className="fw-bold text-dark mb-0 fs-5">Manage Body Kits & Upgrades</h4>
        </div>
        <button 
          type="button" 
          className="btn btn-outline-dark btn-sm rounded-pill px-4 fw-bold"
          onClick={() => {
            if (showList) {
              setEditId(null);
              setForm(EMPTY);
            }
            setShowList(!showList);
          }}
        >
          {showList ? <><PlusCircle size={16} /> Add New</> : <><List size={16} /> All Items ({items.length})</>}
        </button>
      </div>

      {!showList ? (
        <form onSubmit={handleSubmit} className="row g-3 mb-4 bg-light p-3 p-md-4 rounded-4">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="fw-bold mb-0">{editId ? 'Edit Service' : 'Add New Body Kit / Upgrade'}</h6>
            {editId && (
              <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill px-3" onClick={handleCancel}>
                <X size={14} /> Cancel
              </button>
            )}
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label small fw-bold">Service Title *</label>
            <input type="text" className="form-control rounded-pill px-3 small bg-white"
              placeholder="e.g. C-Class W205 to W206 Facelift Bodykit"
              value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label small fw-bold">Category *</label>
            <select className="form-select rounded-pill px-3 small bg-white"
              value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option value="AMG Body Kits">AMG Body Kits</option>
              <option value="Mercedes Facelift">Mercedes Facelift</option>
              <option value="Custom Upgrades">Custom Upgrades</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label small fw-bold">Tagline (Subtitle)</label>
            <input type="text" className="form-control rounded-pill px-3 small bg-white"
              placeholder="Full conversion bodykit bumper, hood, headlight & taillight"
              value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
          </div>

          <div className="col-12">
            <label className="form-label small fw-bold">Short Description</label>
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

          {/* SEO TOGGLE */}
          <div className="col-12">
            <button type="button" className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold d-flex align-items-center gap-2"
              onClick={() => setShowSeo(!showSeo)}>
              <Globe size={14} /> {showSeo ? 'Hide' : 'Show'} SEO & Content Sections {showSeo ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {showSeo && (
            <>
              <div className="col-12">
                <label className="form-label small fw-bold">SEO Title</label>
                <input type="text" className="form-control rounded-pill px-3 small bg-white"
                  value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} />
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold">SEO Meta Description</label>
                <textarea className="form-control rounded-3 p-3 small bg-white" rows="2"
                  value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} />
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold">H1 Heading</label>
                <input type="text" className="form-control rounded-pill px-3 small bg-white"
                  value={form.h1} onChange={(e) => setForm({ ...form, h1: e.target.value })} />
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold">Hero Intro</label>
                <textarea className="form-control rounded-3 p-3 small bg-white" rows="3"
                  value={form.heroIntro} onChange={(e) => setForm({ ...form, heroIntro: e.target.value })} />
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold">Content Sections (H2 blocks)</label>
                {form.contentSections.map((sec, i) => (
                  <div key={i} className="border rounded-3 p-3 mb-2 bg-white">
                    <input type="text" className="form-control form-control-sm rounded-pill px-3 mb-2"
                      placeholder="Heading" value={sec.heading} onChange={(e) => updateArr('contentSections', i, 'heading', e.target.value)} />
                    <textarea className="form-control form-control-sm rounded-3 p-2" rows="3"
                      placeholder="Body..." value={sec.body} onChange={(e) => updateArr('contentSections', i, 'body', e.target.value)} />
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
                <label className="form-label small fw-bold">FAQs</label>
                {form.faqs.map((faq, i) => (
                  <div key={i} className="border rounded-3 p-3 mb-2 bg-white">
                    <input type="text" className="form-control form-control-sm rounded-pill px-3 mb-2"
                      placeholder="Question" value={faq.q} onChange={(e) => updateArr('faqs', i, 'q', e.target.value)} />
                    <textarea className="form-control form-control-sm rounded-3 p-2" rows="2"
                      placeholder="Answer" value={faq.a} onChange={(e) => updateArr('faqs', i, 'a', e.target.value)} />
                    {form.faqs.length > 1 && (
                      <button type="button" className="btn btn-sm btn-outline-danger rounded-pill mt-2"
                        onClick={() => removeRow('faqs', i)}>Remove</button>
                    )}
                  </div>
                ))}
                <button type="button" className="btn btn-sm btn-outline-dark rounded-pill px-3 fw-bold"
                  onClick={() => addRow('faqs', { q: '', a: '' })}>+ Add FAQ</button>
              </div>
            </>
          )}

          <div className="col-12 pt-2">
            <button type="submit" className="btn btn-danger btn-sm rounded-pill px-4 fw-bold shadow-sm" disabled={loading || uploading}>
              <Save size={15} /> {loading ? 'Processing...' : editId ? 'Update Service' : 'Save Service'}
            </button>
          </div>
        </form>
      ) : (
        <div>
          {items.length === 0 ? (
            <div className="text-center py-4 text-muted small bg-light rounded-4">No services added yet.</div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Photo</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.imageUrl || item.imageUrls?.[0] || '/images/car-class.png'} alt="" className="rounded-2 object-fit-cover" style={{ width: '40px', height: '40px' }} />
                      </td>
                      <td className="fw-bold text-dark">{item.title}</td>
                      <td><span className="badge bg-danger bg-opacity-10 text-danger">{item.category}</span></td>
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
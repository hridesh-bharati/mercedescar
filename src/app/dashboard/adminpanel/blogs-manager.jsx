// src/app/dashboard/adminpanel/blogs-manager.jsx
'use client';

import { useState, useEffect } from 'react';
import { dbService } from '@/services/dbService';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Trash2, Edit } from 'lucide-react';

export default function BlogsManager() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => { loadBlogs(); }, []);

  const loadBlogs = async () => {
    const res = await dbService.getAll('blogs');
    if (res.success) setBlogs(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = '';
    if (imageFile) {
      const uploadRes = await uploadToCloudinary(imageFile);
      if (uploadRes.success) imageUrl = uploadRes.url;
    }

    const payload = { 
      title, 
      category, 
      content, 
      ...(imageUrl && { imageUrl }), 
      date: 'Mar 2026', 
      author: 'hridesh027@gmail.com' 
    };

    if (editId) {
      await dbService.update('blogs', editId, payload);
      setEditId(null);
    } else {
      await dbService.create('blogs', payload);
    }

    setTitle(''); 
    setCategory(''); 
    setContent(''); 
    setImageFile(null); 
    setLoading(false);
    loadBlogs();
  };

  const handleEdit = (blog) => {
    setEditId(blog.id);
    setTitle(blog.title);
    setCategory(blog.category);
    setContent(blog.content);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete blog post?')) {
      await dbService.remove('blogs', id);
      loadBlogs();
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
      <h4 className="fw-bold text-dark mb-4">Manage Blog Posts</h4>

      <form onSubmit={handleSubmit} className="row g-3 mb-5 bg-light p-4 rounded-4">
        <div className="col-md-6">
          <label className="form-label small fw-bold">Blog Title</label>
          <input type="text" className="form-control rounded-pill px-3" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="col-md-6">
          <label className="form-label small fw-bold">Category</label>
          <input type="text" className="form-control rounded-pill px-3" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div className="col-md-12">
          <label className="form-label small fw-bold">Blog Image</label>
          <input type="file" className="form-control rounded-pill px-3" onChange={(e) => setImageFile(e.target.files[0])} />
        </div>
        <div className="col-12">
          <label className="form-label small fw-bold">Content</label>
          <textarea className="form-control rounded-4 p-3" rows="4" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>
        <div className="col-12 d-flex gap-2">
          <button type="submit" className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm" disabled={loading}>
            {loading ? 'Processing...' : editId ? 'Update Blog' : 'Publish Blog'}
          </button>
          {editId && (
            <button type="button" className="btn btn-secondary rounded-pill px-3" onClick={() => { setEditId(null); setTitle(''); setCategory(''); setContent(''); }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b.id}>
                <td>
                  {b.imageUrl ? (
                    <img src={b.imageUrl} alt="" className="rounded-3 object-fit-cover" style={{ width: '50px', height: '50px' }} />
                  ) : (
                    <span className="text-muted small">No Image</span>
                  )}
                </td>
                <td className="fw-bold">{b.title}</td>
                <td><span className="badge bg-danger bg-opacity-10 text-danger px-3 py-1 rounded-pill">{b.category}</span></td>
                <td className="text-muted small">{b.author}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary rounded-circle p-2" onClick={() => handleEdit(b)}><Edit size={14} /></button>
                    <button className="btn btn-sm btn-outline-danger rounded-circle p-2" onClick={() => handleDelete(b.id)}><Trash2 size={14} /></button>
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
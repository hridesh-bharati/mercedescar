// src/app/dashboard/adminpanel/blogs-manager.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { dbService } from '@/services/dbService';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Trash2, Edit, FileText, List, PlusCircle } from 'lucide-react';

export default function BlogsManager() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // Single toggle state for Form vs List view
  const [showList, setShowList] = useState(false);
  
  const fileInputRef = useRef(null);

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
      author: 'waqas@saaki.net' 
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
    if (fileInputRef.current) fileInputRef.current.value = '';
    setLoading(false);
    loadBlogs();
    setShowList(true); // Switch back to list view after publishing/updating
  };

  const handleEdit = (blog) => {
    setEditId(blog.id);
    setTitle(blog.title);
    setCategory(blog.category);
    setContent(blog.content);
    setShowList(false); // Switch to form view when editing
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (confirm('Delete blog post?')) {
      await dbService.remove('blogs', id);
      loadBlogs();
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setTitle('');
    setCategory('');
    setContent('');
    setImageFile(null);
    setShowList(true);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 bg-white text-start">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
        <div className="d-flex align-items-center gap-2">
          <FileText size={22} className="text-danger flex-shrink-0" />
          <h4 className="fw-bold text-dark mb-0 fs-5">Manage Blog Posts</h4>
        </div>

        {/* Single Unified Toggle Button */}
        <button 
          type="button" 
          className="btn btn-outline-dark btn-sm rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center gap-2"
          onClick={() => setShowList(!showList)}
        >
          {showList ? (
            <>
              <PlusCircle size={16} /> Add New Blog
            </>
          ) : (
            <>
              <List size={16} /> All Blogs ({blogs.length})
            </>
          )}
        </button>
      </div>

      {!showList ? (
        /* Form View */
        <form onSubmit={handleSubmit} className="row g-3 mb-4 bg-light p-3 p-md-4 rounded-4">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="fw-bold mb-0">{editId ? 'Edit Blog Post' : 'Add New Blog Post'}</h6>
            {editId && (
              <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label small fw-bold">Blog Title</label>
            <input type="text" className="form-control rounded-pill px-3 small" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label small fw-bold">Category</label>
            <input type="text" className="form-control rounded-pill px-3 small" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>
          <div className="col-12">
            <label className="form-label small fw-bold">Blog Image</label>
            <input ref={fileInputRef} type="file" className="form-control rounded-pill px-3 small py-2 bg-white" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
          </div>
          <div className="col-12">
            <label className="form-label small fw-bold">Content</label>
            <textarea className="form-control rounded-4 p-3 small" rows="4" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
          </div>
          <div className="col-12 d-flex flex-wrap gap-2">
            <button type="submit" className="btn btn-danger btn-sm rounded-pill px-4 fw-bold shadow-sm" disabled={loading}>
              {loading ? 'Processing...' : editId ? 'Update Blog' : 'Publish Blog'}
            </button>
          </div>
        </form>
      ) : (
        /* List View */
        <div>
          <h5 className="fw-bold text-dark fs-6 mb-3">All Blogs ({blogs.length})</h5>

          {blogs.length === 0 ? (
            <div className="text-center py-4 text-muted small card border-0 bg-light rounded-4">No blogs found.</div>
          ) : (
            <>
              {/* Mobile View: Clean Bootstrap Cards */}
              <div className="d-md-none row g-3">
                {blogs.map((b) => (
                  <div className="col-12" key={b.id}>
                    <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
                      <div className="d-flex gap-3 align-items-center mb-3">
                        {b.imageUrl ? (
                          <img src={b.imageUrl} alt="" className="rounded-3 object-fit-cover shadow-sm flex-shrink-0" style={{ width: '55px', height: '55px' }} />
                        ) : (
                          <div className="rounded-3 bg-light text-muted d-flex align-items-center justify-content-center small flex-shrink-0" style={{ width: '55px', height: '55px' }}>No Img</div>
                        )}
                        <div>
                          <span className="badge bg-danger bg-opacity-10 text-danger mb-1">{b.category}</span>
                          <h6 className="fw-bold text-dark mb-0 small">{b.title}</h6>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center border-top pt-2 mt-1">
                        <span className="text-muted small">{b.author}</span>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 small d-flex align-items-center gap-1" onClick={() => handleEdit(b)}>
                            <Edit size={13} /> Edit
                          </button>
                          <button className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1 small d-flex align-items-center gap-1" onClick={() => handleDelete(b.id)}>
                            <Trash2 size={13} /> 
                          </button>
                        </div>
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
                            <img src={b.imageUrl} alt="" className="rounded-3 object-fit-cover shadow-sm" style={{ width: '45px', height: '40px' }} />
                          ) : (
                            <span className="text-muted small">No Image</span>
                          )}
                        </td>
                        <td className="fw-bold text-dark">{b.title}</td>
                        <td><span className="badge bg-danger bg-opacity-10 text-danger px-3 py-1 rounded-pill">{b.category}</span></td>
                        <td className="text-muted small">{b.author}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary rounded-circle p-2" onClick={() => handleEdit(b)} title="Edit"><Edit size={14} /></button>
                            <button className="btn btn-sm btn-outline-danger rounded-circle p-2" onClick={() => handleDelete(b.id)} title="Delete"><Trash2 size={14} /></button>
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
      )}
    </div>
  );
}
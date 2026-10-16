// src/app/dashboard/adminpanel/comments-manager.jsx
'use client';

import { useState, useEffect } from 'react';
import { dbService } from '@/services/dbService';
import { Trash2 } from 'lucide-react';

export default function CommentsManager() {
  const [comments, setComments] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const cRes = await dbService.getAll('comments');
    const bRes = await dbService.getAll('blogs');
    if (cRes.success) setComments(cRes.data);
    if (bRes.success) setBlogs(bRes.data);
  };

  const getBlogTitle = (blogId) => blogs.find((b) => b.id === blogId)?.title || 'General';

  const handleDelete = async (id) => {
    if (confirm('Delete this comment?')) {
      await dbService.remove('comments', id);
      loadData();
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 bg-white text-start">
      <h4 className="fw-bold text-dark mb-3 fs-5">Manage Blog Comments</h4>

      {comments.length === 0 ? (
        <p className="text-muted small text-center py-3">No comments found.</p>
      ) : (
        <div className="row g-3">
          {comments.map((c) => (
            <div key={c.id} className="col-12 col-md-6">
              <div className="card border-0 bg-light p-3 rounded-4 shadow-sm h-100 position-relative">
                <div className="d-flex justify-content-between align-items-center mb-1 gap-2">
                  <span className="badge bg-danger bg-opacity-10 text-danger text-truncate" style={{ maxWidth: '80%' }}>
                    {getBlogTitle(c.blogId)}
                  </span>
                  <button 
                    className="btn btn-sm btn-outline-danger rounded-circle p-0 d-flex align-items-center justify-content-center flex-shrink-0" 
                    style={{ width: '26px', height: '26px' }} 
                    onClick={() => handleDelete(c.id)}
                    title="Delete"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <h6 className="fw-bold text-dark mb-1 small">{c.name} <span className="text-muted fw-normal" style={{fontSize: '0.75rem'}}>{c.email}</span></h6>
                <p className="text-secondary small mb-1">{c.message}</p>
                <span className="text-muted" style={{ fontSize: '0.7rem' }}>{c.date || 'Recent'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
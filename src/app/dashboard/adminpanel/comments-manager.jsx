// src/app/dashboard/adminpanel/comments-manager.jsx
'use client';

import { useState, useEffect } from 'react';
import { dbService } from '@/services/dbService';
import { Trash2 } from 'lucide-react';

export default function CommentsManager() {
  const [comments, setComments] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const cRes = await dbService.getAll('comments');
    const bRes = await dbService.getAll('blogs');
    if (cRes.success) setComments(cRes.data);
    if (bRes.success) setBlogs(bRes.data);
  };

  const getBlogTitle = (blogId) => {
    const blog = blogs.find((b) => b.id === blogId);
    return blog ? blog.title : 'General / Unknown Blog';
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this comment?')) {
      await dbService.remove('comments', id);
      loadData();
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
      <h4 className="fw-bold text-dark mb-4">Manage Blog Comments</h4>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>Blog Post</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">No comments found.</td>
              </tr>
            ) : (
              comments.map((c) => (
                <tr key={c.id}>
                  <td>
                    <span className="badge bg-secondary bg-opacity-10 text-dark fw-bold text-truncate d-inline-block" style={{ maxWidth: '180px' }}>
                      {getBlogTitle(c.blogId)}
                    </span>
                  </td>
                  <td className="fw-bold">{c.name}</td>
                  <td className="text-muted small">{c.email}</td>
                  <td className="text-secondary small" style={{ maxWidth: '220px' }}>{c.message}</td>
                  <td className="text-muted small">{c.date}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger rounded-circle p-2" onClick={() => handleDelete(c.id)}>
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
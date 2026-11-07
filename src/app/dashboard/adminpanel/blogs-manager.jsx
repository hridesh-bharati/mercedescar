// src/app/dashboard/adminpanel/blogs-manager.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { dbService } from '@/services/dbService';
import { uploadToCloudinary, extractPublicIdFromUrl } from '@/lib/cloudinary';
import {
  Trash2,
  Edit,
  FileText,
  List,
  PlusCircle,
  X,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function BlogsManager() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [currentImagePublicId, setCurrentImagePublicId] = useState('');
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showList, setShowList] = useState(false);
  const [toast, setToast] = useState({ type: '', msg: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    if (!toast.msg) return;
    const t = setTimeout(() => setToast({ type: '', msg: '' }), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const loadBlogs = async () => {
    const res = await dbService.getAll('blogs');
    if (res.success) setBlogs(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = currentImageUrl;
    let imagePublicId = currentImagePublicId;

    // ✅ Overwrite: Same public_id → purani image replace
    if (imageFile) {
      const existingPublicId =
        currentImagePublicId || extractPublicIdFromUrl(currentImageUrl);
      const uploadRes = await uploadToCloudinary(imageFile, {
        folder: 'mercedes-garage/blogs',
        publicId: existingPublicId,
      });
      if (uploadRes.success) {
        imageUrl = uploadRes.url;
        imagePublicId = uploadRes.publicId;
      }
    }

    const payload = {
      title,
      category,
      content,
      ...(imageUrl && { imageUrl, imagePublicId }),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      }),
      author: 'waqas@saaki.net',
    };

    try {
      if (editId) {
        await dbService.update('blogs', editId, payload);
        setToast({ type: 'success', msg: 'Blog updated.' });
        setEditId(null);
      } else {
        await dbService.create('blogs', payload);
        setToast({ type: 'success', msg: 'Blog published.' });
      }

      setTitle('');
      setCategory('');
      setContent('');
      setImageFile(null);
      setCurrentImageUrl('');
      setCurrentImagePublicId('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      await loadBlogs();
      setShowList(true);
    } catch (err) {
      setToast({ type: 'error', msg: 'Save failed. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setEditId(blog.id);
    setTitle(blog.title);
    setCategory(blog.category);
    setContent(blog.content);
    setCurrentImageUrl(blog.imageUrl || '');
    setCurrentImagePublicId(blog.imagePublicId || '');
    setImageFile(null);
    setShowList(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;
    try {
      await dbService.remove('blogs', deleteConfirm.id);
      setToast({ type: 'success', msg: 'Blog deleted.' });
      await loadBlogs();
    } catch {
      setToast({ type: 'error', msg: 'Delete failed.' });
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setTitle('');
    setCategory('');
    setContent('');
    setImageFile(null);
    setCurrentImageUrl('');
    setCurrentImagePublicId('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setShowList(true);
  };

  return (
    <>
      {toast.msg && (
        <div
          className={`alert ${
            toast.type === 'success' ? 'alert-success' : 'alert-danger'
          } d-flex align-items-center gap-2 shadow-sm position-fixed top-0 end-0 m-3 z-5`}
          role="status"
          aria-live="polite"
        >
          {toast.type === 'success' ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          {toast.msg}
        </div>
      )}

      <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 bg-white text-start">
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
          <div className="d-flex align-items-center gap-2">
            <FileText size={22} className="text-danger" />
            <h4 className="fw-bold text-dark mb-0 fs-5">Manage Blog Posts</h4>
          </div>

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
          <form
            onSubmit={handleSubmit}
            className="row g-3 mb-4 bg-light p-3 p-md-4 rounded-4"
          >
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="fw-bold mb-0">
                {editId ? 'Edit Blog Post' : 'Add New Blog Post'}
              </h6>
              {editId && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="bm-title" className="form-label small fw-bold">
                Blog Title
              </label>
              <input
                id="bm-title"
                type="text"
                className="form-control rounded-pill px-3 small"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="bm-cat" className="form-label small fw-bold">
                Category
              </label>
              <input
                id="bm-cat"
                type="text"
                className="form-control rounded-pill px-3 small"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div className="col-12">
              <label htmlFor="bm-img" className="form-label small fw-bold">
                Blog Image
              </label>
              <input
                ref={fileInputRef}
                id="bm-img"
                type="file"
                className="form-control rounded-pill px-3 small py-2 bg-white"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />

              {/* ✅ Preview: Current or new image */}
              {(currentImageUrl || imageFile) && (
                <div className="mt-2 d-flex align-items-center gap-2">
                  <div
                    className="position-relative rounded-3 overflow-hidden border"
                    style={{ width: 80, height: 80 }}
                  >
                    <Image
                      src={
                        imageFile
                          ? URL.createObjectURL(imageFile)
                          : currentImageUrl
                      }
                      alt="Blog preview"
                      fill
                      className="object-fit-cover"
                      sizes="80px"
                    />
                  </div>
                  <small className="text-muted">
                    {imageFile ? 'New image (will overwrite)' : 'Current image'}
                  </small>
                </div>
              )}
            </div>

            <div className="col-12">
              <label htmlFor="bm-content" className="form-label small fw-bold">
                Content
              </label>
              <textarea
                id="bm-content"
                className="form-control rounded-4 p-3 small"
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="col-12 d-flex flex-wrap gap-2">
              <button
                type="submit"
                className="btn btn-danger btn-sm rounded-pill px-4 fw-bold shadow-sm"
                disabled={loading}
              >
                {loading
                  ? 'Processing...'
                  : editId
                  ? 'Update Blog'
                  : 'Publish Blog'}
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h5 className="fw-bold text-dark fs-6 mb-3">
              All Blogs ({blogs.length})
            </h5>

            {blogs.length === 0 ? (
              <div className="text-center py-4 text-muted small card border-0 bg-light rounded-4">
                No blogs found.
              </div>
            ) : (
              <>
                {/* Mobile */}
                <div className="d-md-none row g-3">
                  {blogs.map((b) => (
                    <div className="col-12" key={b.id}>
                      <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
                        <div className="d-flex gap-3 align-items-center mb-3">
                          {b.imageUrl ? (
                            <div
                              className="rounded-3 overflow-hidden flex-shrink-0 position-relative border"
                              style={{ width: 55, height: 55 }}
                            >
                              <Image
                                src={b.imageUrl}
                                alt={b.title || 'Blog'}
                                fill
                                className="object-fit-cover"
                                sizes="55px"
                              />
                            </div>
                          ) : (
                            <div
                              className="rounded-3 bg-light text-muted d-flex align-items-center justify-content-center small flex-shrink-0"
                              style={{ width: 55, height: 55 }}
                            >
                              No Img
                            </div>
                          )}
                          <div className="flex-grow-1">
                            <span className="badge bg-danger bg-opacity-10 text-danger mb-1">
                              {b.category}
                            </span>
                            <h6 className="fw-bold text-dark mb-0 small">
                              {b.title}
                            </h6>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-top pt-2 mt-1">
                          <span className="text-muted small">{b.author}</span>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 small d-flex align-items-center gap-1"
                              onClick={() => handleEdit(b)}
                            >
                              <Edit size={13} /> Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1 small d-flex align-items-center gap-1"
                              onClick={() => setDeleteConfirm(b)}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop */}
                <div className="d-none d-md-block table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Category</th>
                        <th scope="col">Author</th>
                        <th scope="col">Date</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map((b) => (
                        <tr key={b.id}>
                          <td>
                            {b.imageUrl ? (
                              <div
                                className="rounded-3 overflow-hidden position-relative border"
                                style={{ width: 45, height: 40 }}
                              >
                                <Image
                                  src={b.imageUrl}
                                  alt={b.title || 'Blog'}
                                  fill
                                  className="object-fit-cover"
                                  sizes="45px"
                                />
                              </div>
                            ) : (
                              <span className="text-muted small">No Image</span>
                            )}
                          </td>
                          <td className="fw-bold text-dark">{b.title}</td>
                          <td>
                            <span className="badge bg-danger bg-opacity-10 text-danger px-3 py-1 rounded-pill">
                              {b.category}
                            </span>
                          </td>
                          <td className="text-muted small">{b.author}</td>
                          <td className="text-muted small">{b.date}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-outline-primary rounded-circle p-2"
                                onClick={() => handleEdit(b)}
                                title="Edit"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger rounded-circle p-2"
                                onClick={() => setDeleteConfirm(b)}
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
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

      {/* Delete Modal */}
      {deleteConfirm && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="del-title"
          style={{ background: 'rgba(15, 23, 42, 0.5)' }}
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 rounded-4 shadow-lg">
              <div className="modal-header border-0 pb-2">
                <h5 id="del-title" className="modal-title fw-bold fs-6">
                  Delete Blog?
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setDeleteConfirm(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body pt-0">
                <p className="small text-muted mb-0">
                  Delete <strong>&ldquo;{deleteConfirm.title}&rdquo;</strong>?
                  This cannot be undone.
                </p>
              </div>
              <div className="modal-footer border-0 pt-2">
                <button
                  className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-sm btn-danger rounded-pill px-3 fw-bold"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

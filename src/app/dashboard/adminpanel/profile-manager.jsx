// src/app/dashboard/adminpanel/profile-manager.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { auth, database } from '@/lib/firebase';
import { ref, get, update } from 'firebase/database';
import { updateProfile } from 'firebase/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { UserCircle, Phone, Camera, Save, User, Mail, Edit3, X } from 'lucide-react';

export default function ProfileManager() {
  const [loading, setLoading] = useState(false);
  const [uploadingPic, setUploadingPic] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Toggle for edit mode
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    about: '',
    profilePic: ''
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setFormData({
          name: data.name || user.displayName || '',
          email: user.email || '',
          mobile: data.mobile || '',
          about: data.about || '',
          profilePic: data.profilePic || user.photoURL || ''
        });
      } else {
        setFormData({
          name: user.displayName || '',
          email: user.email || '',
          mobile: '',
          about: '',
          profilePic: user.photoURL || ''
        });
      }
    }
    setFetching(false);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingPic(true);
    setMessage('');
    setError('');

    const uploadRes = await uploadToCloudinary(file);
    if (uploadRes.success) {
      setFormData((prev) => ({ ...prev, profilePic: uploadRes.url }));
      setMessage('Profile picture uploaded successfully!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setError('Image upload failed: ' + uploadRes.error);
    }
    setUploadingPic(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    const user = auth.currentUser;
    if (!user) {
      setError('No authenticated user found.');
      setLoading(false);
      return;
    }

    try {
      await updateProfile(user, {
        displayName: formData.name,
        photoURL: formData.profilePic
      });

      const userRef = ref(database, `users/${user.uid}`);
      await update(userRef, {
        name: formData.name,
        mobile: formData.mobile,
        about: formData.about,
        profilePic: formData.profilePic,
        updatedAt: Date.now()
      });

      setMessage('Profile updated successfully!');
      setIsEditing(false); // Close edit mode after saving
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Failed to update profile: ' + err.message);
    }
    setLoading(false);
  };

  if (fetching) {
    return <div className="text-center py-4 text-muted small">Loading profile...</div>;
  }

  return (
    <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 bg-white text-start">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-2">
          <UserCircle size={24} className="text-danger flex-shrink-0" />
          <h4 className="fw-bold text-dark mb-0 fs-5">Admin Profile & Settings</h4>
        </div>
        {!isEditing ? (
          <button 
            type="button" 
            className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold d-flex align-items-center gap-1 shadow-sm"
            onClick={() => setIsEditing(true)}
          >
            <Edit3 size={15} /> Edit Profile
          </button>
        ) : (
          <button 
            type="button" 
            className="btn btn-light btn-sm rounded-pill px-3 fw-bold d-flex align-items-center gap-1 text-secondary"
            onClick={() => setIsEditing(false)}
          >
            <X size={15} /> Cancel
          </button>
        )}
      </div>

      {message && <div className="alert alert-success py-2 small rounded-3">{message}</div>}
      {error && <div className="alert alert-danger py-2 small rounded-3">{error}</div>}

      <form onSubmit={handleSubmit} className="card p-3 p-md-4 bg-light border-0 rounded-4">
        
        {/* Profile Header */}
        <div className="row g-4 align-items-center mb-4">
          <div className="col-12 col-md-auto text-center">
            <div className="position-relative d-inline-block">
              {formData.profilePic ? (
                <img 
                  src={formData.profilePic} 
                  alt="Profile" 
                  className={`rounded-circle object-fit-cover shadow-sm border border-2 border-white ${uploadingPic ? 'opacity-50' : ''}`} 
                  style={{ width: '90px', height: '90px' }} 
                />
              ) : (
                <div className={`rounded-circle bg-danger bg-opacity-10 text-danger d-flex align-items-center justify-content-center fw-bold fs-3 shadow-sm border border-2 border-white ${uploadingPic ? 'opacity-50' : ''}`} style={{ width: '90px', height: '90px' }}>
                  {formData.name ? formData.name.charAt(0).toUpperCase() : 'A'}
                </div>
              )}

              {uploadingPic && (
                <div className="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center">
                  <div className="spinner-border spinner-border-sm text-danger" role="status"></div>
                </div>
              )}

              {isEditing && (
                <>
                  <button 
                    type="button" 
                    className="position-absolute bottom-0 end-0 btn btn-dark btn-sm rounded-circle p-1 shadow-sm"
                    onClick={() => fileInputRef.current?.click()}
                    title="Change Picture"
                    disabled={uploadingPic}
                  >
                    <Camera size={14} />
                  </button>
                  <input 
                    ref={fileInputRef} 
                    type="file" 
                    className="d-none" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                  />
                </>
              )}
            </div>
          </div>

          <div className="col-12 col-md">
            <h5 className="fw-bold text-dark mb-1">{formData.name || 'Admin'}</h5>
            <p className="text-muted small mb-0">{formData.email}</p>
            <span className="badge bg-danger bg-opacity-10 text-danger mt-2">Super Admin</span>
          </div>
        </div>

        {/* Fields */}
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="form-label small fw-semibold text-secondary">Display Name</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 rounded-start-pill ps-3"><User size={15} className="text-muted" /></span>
              <input 
                type="text" 
                className={`form-control rounded-end-pill px-3 small border-start-0 ${!isEditing ? 'bg-white text-dark' : ''}`} 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                disabled={!isEditing}
                required 
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label small fw-semibold text-secondary">Email Address (Read-only)</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 rounded-start-pill ps-3"><Mail size={15} className="text-muted" /></span>
              <input 
                type="email" 
                className="form-control rounded-end-pill px-3 small bg-white text-muted border-start-0" 
                value={formData.email} 
                disabled 
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label small fw-semibold text-secondary">Mobile Number</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 rounded-start-pill ps-3"><Phone size={15} className="text-muted" /></span>
              <input 
                type="tel" 
                className={`form-control rounded-end-pill px-3 small border-start-0 ${!isEditing ? 'bg-white text-dark' : ''}`} 
                placeholder="+971 50 000 0000"
                value={formData.mobile} 
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} 
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="col-12">
            <label className="form-label small fw-semibold text-secondary">About / Bio</label>
            <textarea 
              className={`form-control rounded-4 p-3 small ${!isEditing ? 'bg-white text-dark' : ''}`} 
              rows="3" 
              placeholder="Write a short bio about your role..."
              value={formData.about} 
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              disabled={!isEditing}
            ></textarea>
          </div>

          {isEditing && (
            <div className="col-12 pt-2">
              <button type="submit" className="btn btn-danger btn-sm rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center gap-2" disabled={loading || uploadingPic}>
                <Save size={15} /> {loading ? 'Saving Changes...' : 'Save Profile'}
              </button>
            </div>
          )}
        </div>

      </form>
    </div>
  );
}
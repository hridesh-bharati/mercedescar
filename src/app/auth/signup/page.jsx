'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { authService } from '@/services/authService';
import '../auth.css';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await authService.signup(email, password);
    if (res.success) {
      router.push('/dashboard/adminpanel');
    } else {
      setError(res.error);
    }
    setLoading(false);
  };

  return (
    <div className="auth-bg container-fluid py-5 d-flex justify-content-center align-items-center min-vh-100">
      <div className="card rounded-4 p-4 p-md-5 glass-card" style={{ maxWidth: '450px', width: '100%' }}>
        <h3 className="fw-bold text-dark mb-1">Create Account</h3>
        <p className="text-muted small mb-4">Sign up to access your dashboard.</p>

        {error && <div className="alert alert-danger py-2 small rounded-3">{error}</div>}

        <form onSubmit={handleSignup} className="d-flex flex-column gap-3">
          <div>
            <label className="form-label small fw-bold text-secondary">Email Address</label>
            <input 
              type="email" 
              className="form-control rounded-pill px-3 glass-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label className="form-label small fw-bold text-secondary">Password</label>
            <div className="position-relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="form-control rounded-pill px-3 pe-5 glass-input" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button
                type="button"
                className="btn btn-link text-muted position-absolute top-50 end-0 translate-middle-y me-3 p-0 text-decoration-none d-flex align-items-center"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="form-text text-muted" style={{ fontSize: '0.75rem' }}>
              Minimum 12 characters, including 1 uppercase, 1 lowercase, and 1 special character.
            </div>
          </div>

          <button type="submit" className="btn btn-danger rounded-pill py-2 fw-bold mt-2 shadow-sm" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center small text-muted mt-4 mb-0">
          Already have an account? <Link href="/auth/login" className="text-danger fw-bold text-decoration-none">Login</Link>
        </p>
      </div>
    </div>
  );
}
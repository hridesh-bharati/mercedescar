'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import '../auth.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.email.toLowerCase() === 'hridesh027@gmail.com'.toLowerCase()) {
          router.push('/dashboard/adminpanel');
        } else {
          router.push('/dashboard/userpanel');
        }
      } else {
        setCheckingAuth(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await authService.login(email, password);
    setLoading(false);

    if (res.success) {
      if (res.user.email.toLowerCase() === 'hridesh027@gmail.com'.toLowerCase()) {
        router.push('/dashboard/adminpanel');
      } else {
        router.push('/dashboard/userpanel');
      }
    } else {
      setError(res.error);
    }
  };

  if (checkingAuth) {
    return <div className="auth-bg d-flex justify-content-center align-items-center text-center fw-bold text-danger">Checking session...</div>;
  }

  return (
    <div className="auth-bg container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 rounded-4 glass-card" style={{ width: '400px' }}>
        <h3 className="fw-bold text-center mb-4 text-dark">Login to <span className="text-danger">German Auto</span></h3>
        
        {error && <div className="alert alert-danger small py-2">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">Email Address</label>
            <input 
              type="email" 
              className="form-control rounded-pill px-3 py-2 glass-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold text-secondary">Password</label>
            <input 
              type="password" 
              className="form-control rounded-pill px-3 py-2 glass-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="btn btn-danger w-100 rounded-pill fw-bold py-2 shadow-sm" disabled={loading}>
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>

        <div className="text-center mt-3 small text-secondary">
          Don&apos;t have an account? <Link href="/auth/signup" className="text-danger fw-bold text-decoration-none">Signup</Link>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, database } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { authService } from '@/services/authService';

export default function AdminPanel() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user || user.email.toLowerCase() !== 'hridesh027@gmail.com'.toLowerCase()) {
        router.push('/login');
      } else {
        setIsAdmin(true);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="text-center py-5">Loading Admin Panel...</div>;

  if (!isAdmin) return null;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">Admin Dashboard (HRIDESH)</h2>
        <button 
          onClick={async () => { await authService.logout(); router.push('/login'); }}
          className="btn btn-outline-danger rounded-pill btn-sm fw-bold px-4"
        >
          Logout
        </button>
      </div>
      <div className="card p-4 rounded-4 shadow-sm border-0 bg-white">
        <h5 className="fw-bold text-success">Welcome back, Admin!</h5>
        <p className="text-secondary small">Aap yahan se poori website ka data manage kar sakte hain. Yeh area sirf hridesh027@gmail.com ke liye restricted hai.</p>
      </div>
    </div>
  );
}
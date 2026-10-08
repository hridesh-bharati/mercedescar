'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from '@/services/authService';

export default function UserPanel() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="text-center py-5">Loading User Panel...</div>;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">User Dashboard</h2>
        <button 
          onClick={async () => { await authService.logout(); router.push('/login'); }}
          className="btn btn-outline-danger rounded-pill btn-sm fw-bold px-4"
        >
          Logout
        </button>
      </div>
      <div className="card p-4 rounded-4 shadow-sm border-0 bg-white">
        <h5 className="fw-bold text-primary">Welcome, {user?.email}</h5>
        <p className="text-secondary small">Aap apne bookings aur account details yahan view kar sakte hain.</p>
      </div>
    </div>
  );
}
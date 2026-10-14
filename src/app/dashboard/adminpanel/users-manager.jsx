'use client';

import { useState, useEffect } from 'react';
import { dbService } from '@/services/dbService';

export default function UsersManager() {
  const [users, setUsers] = useState([]);

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    const res = await dbService.getAll('users');
    if (res.success) setUsers(res.data);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
      <h4 className="fw-bold text-dark mb-4">Registered Users List</h4>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="fw-bold">{u.name || 'User'}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`badge px-3 py-1 rounded-pill ${u.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="text-muted small">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
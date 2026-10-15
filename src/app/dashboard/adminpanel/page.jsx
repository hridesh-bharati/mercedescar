// src/app/dashboard/adminpanel/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from '@/services/authService';
import { dbService } from '@/services/dbService';
import { LayoutDashboard, Wrench, FileText, Inbox, Users, MessageSquare, Briefcase, Image as ImageIcon, LogOut, Menu, X, Home } from 'lucide-react';

import ServicesManager from './services-manager';
import BlogsManager from './blogs-manager';
import InboxManager from './inbox-manager';
import UsersManager from './users-manager';
import CommentsManager from './comments-manager';
import CasesManager from './cases-manager';
import GalleryManager from './gallery-manager';

export default function AdminPanel() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [stats, setStats] = useState({ services: 0, blogs: 0, inbox: 0, users: 0, comments: 0, cases: 0, gallery: 0 });
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user || user.email.toLowerCase() !== 'hridesh027@gmail.com'.toLowerCase()) {
        router.push('/auth/login');
      } else {
        setIsAdmin(true);
        fetchStats();
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const fetchStats = async () => {
    const sRes = await dbService.getAll('services');
    const bRes = await dbService.getAll('blogs');
    const bookRes = await dbService.getAll('bookings');
    const uRes = await dbService.getAll('users');
    const cRes = await dbService.getAll('comments');
    const caseRes = await dbService.getAll('cases');
    const gRes = await dbService.getAll('gallery');

    setStats({
      services: sRes.success ? sRes.data.length : 0,
      blogs: bRes.success ? bRes.data.length : 0,
      inbox: bookRes.success ? bookRes.data.length : 0,
      users: uRes.success ? uRes.data.length : 0,
      comments: cRes.success ? cRes.data.length : 0,
      cases: caseRes.success ? caseRes.data.length : 0,
      gallery: gRes.success ? gRes.data.length : 0,
    });
  };

  if (loading) return <div className="text-center py-5 fw-bold text-danger">Loading Admin Dashboard...</div>;
  if (!isAdmin) return null;

  const menuItems = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'services', label: 'Manage Services', icon: Wrench },
    { key: 'blogs', label: 'Manage Blogs', icon: FileText },
    { key: 'comments', label: 'Blog Comments', icon: MessageSquare },
    { key: 'cases', label: 'Manage Cases', icon: Briefcase },
    { key: 'gallery', label: 'Manage Gallery', icon: ImageIcon },
    { key: 'inbox', label: 'Contact / Inbox', icon: Inbox },
    { key: 'users', label: 'Users List', icon: Users },
  ];

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      
      {/* Mobile Top Navbar */}
      <div className="d-lg-none card border-0 shadow-sm rounded-4 p-3 bg-white mb-4 d-flex flex-row justify-content-between align-items-center">
        <h5 className="fw-bold text-dark m-0">Admin <span className="text-danger">Panel</span></h5>
        <div className="d-flex align-items-center gap-2">
          <Link href="/" className="btn btn-dark btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center text-white" title="Go to Home">
            <Home size={18} />
          </Link>
          <button 
            className="btn btn-danger btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="d-lg-none card border-0 shadow-sm rounded-4 p-3 bg-white mb-4">
          <div className="nav flex-column gap-2">
            <Link href="/" className="btn btn-light text-secondary text-start d-flex align-items-center gap-2 rounded-pill px-3 py-2 fw-semibold text-decoration-none">
              <Home size={18} /> Go to Home
            </Link>
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button 
                  key={item.key}
                  className={`btn text-start d-flex align-items-center gap-2 rounded-pill px-3 py-2 fw-semibold ${activeTab === item.key ? 'btn-danger text-white shadow-sm' : 'btn-light text-secondary'}`}
                  onClick={() => { setActiveTab(item.key); setMobileMenuOpen(false); }}
                >
                  <IconComponent size={18} /> {item.label}
                </button>
              );
            })}
            <button 
              onClick={async () => { await authService.logout(); router.push('/auth/login'); }}
              className="btn btn-outline-danger rounded-pill fw-bold py-2 mt-2 d-flex align-items-center justify-content-center gap-2"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      )}

      <div className="row">
        
        {/* Desktop Sidebar */}
        <div className="col-lg-2 d-none d-lg-block">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white sticky-top" style={{ top: '20px' }}>
            <h5 className="fw-bold text-dark px-2 mb-4">Admin <span className="text-danger">Panel</span></h5>
            
            <div className="nav flex-column gap-2">
              <Link href="/" className="btn btn-dark text-start d-flex align-items-center gap-2 rounded-pill px-3 py-2 fw-semibold text-decoration-none shadow-sm mb-2">
                <Home size={18} /> Go to Home
              </Link>
              
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button 
                    key={item.key}
                    className={`btn text-start d-flex align-items-center gap-2 rounded-pill px-3 py-2 fw-semibold ${activeTab === item.key ? 'btn-danger text-white shadow-sm' : 'btn-light text-secondary'}`}
                    onClick={() => setActiveTab(item.key)}
                  >
                    <IconComponent size={18} /> {item.label}
                  </button>
                );
              })}
            </div>

            <hr className="my-4 text-muted" />

            <button 
              onClick={async () => { await authService.logout(); router.push('/auth/login'); }}
              className="btn btn-outline-danger rounded-pill fw-bold py-2 d-flex align-items-center justify-content-center gap-2 shadow-sm"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col-lg-10">
          
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4 d-flex flex-row justify-content-between align-items-center">
            <div>
              <h3 className="fw-bold text-dark mb-1 fs-5">Welcome back, Admin (Hridesh) 👋</h3>
              <p className="text-secondary small mb-0 d-none d-sm-block">Here is what is happening with your car service business today.</p>
            </div>
            <span className="badge bg-danger bg-opacity-10 text-danger px-3 py-2 rounded-pill fw-bold">Super Admin</span>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <div className="row g-4 mb-4">
                <div className="col-6 col-md-3">
                  <div className="card border-0 shadow-sm rounded-4 p-4 bg-white border-start border-danger border-4">
                    <span className="text-muted small fw-bold">SERVICES</span>
                    <h2 className="fw-bold text-dark mt-2 mb-0">{stats.services}</h2>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="card border-0 shadow-sm rounded-4 p-4 bg-white border-start border-primary border-4">
                    <span className="text-muted small fw-bold">BLOGS</span>
                    <h2 className="fw-bold text-dark mt-2 mb-0">{stats.blogs}</h2>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="card border-0 shadow-sm rounded-4 p-4 bg-white border-start border-success border-4">
                    <span className="text-muted small fw-bold">COMMENTS</span>
                    <h2 className="fw-bold text-dark mt-2 mb-0">{stats.comments}</h2>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="card border-0 shadow-sm rounded-4 p-4 bg-white border-start border-warning border-4">
                    <span className="text-muted small fw-bold">INBOX / MESSAGES</span>
                    <h2 className="fw-bold text-dark mt-2 mb-0">{stats.inbox}</h2>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="card border-0 shadow-sm rounded-4 p-4 bg-white border-start border-info border-4">
                    <span className="text-muted small fw-bold">CASES</span>
                    <h2 className="fw-bold text-dark mt-2 mb-0">{stats.cases}</h2>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="card border-0 shadow-sm rounded-4 p-4 bg-white border-start border-dark border-4">
                    <span className="text-muted small fw-bold">GALLERY</span>
                    <h2 className="fw-bold text-dark mt-2 mb-0">{stats.gallery}</h2>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <h5 className="fw-bold text-dark mb-3">Quick Navigation</h5>
                <div className="d-flex flex-wrap gap-3">
                  <button className="btn btn-dark rounded-pill px-4 fw-semibold" onClick={() => setActiveTab('services')}>Manage Services</button>
                  <button className="btn btn-outline-dark rounded-pill px-4 fw-semibold" onClick={() => setActiveTab('blogs')}>Manage Blogs</button>
                  <button className="btn btn-outline-dark rounded-pill px-4 fw-semibold" onClick={() => setActiveTab('cases')}>Manage Cases</button>
                  <button className="btn btn-outline-dark rounded-pill px-4 fw-semibold" onClick={() => setActiveTab('gallery')}>Manage Gallery</button>
                  <button className="btn btn-outline-dark rounded-pill px-4 fw-semibold" onClick={() => setActiveTab('inbox')}>View Contact Inbox</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && <ServicesManager />}
          {activeTab === 'blogs' && <BlogsManager />}
          {activeTab === 'comments' && <CommentsManager />}
          {activeTab === 'cases' && <CasesManager />}
          {activeTab === 'gallery' && <GalleryManager />}
          {activeTab === 'inbox' && <InboxManager />}
          {activeTab === 'users' && <UsersManager />}

        </div>

      </div>
    </div>
  );
}
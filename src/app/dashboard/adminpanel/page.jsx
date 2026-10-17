// src/app/dashboard/adminpanel/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from '@/services/authService';
import { dbService } from '@/services/dbService';
import { LayoutDashboard, Wrench, FileText, Inbox, Users, MessageSquare, Briefcase, Image as ImageIcon, LogOut, Menu, X, Home, TrendingUp, Layers, Activity, ShieldCheck, UserCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

import ServicesManager from './services-manager';
import BlogsManager from './blogs-manager';
import InboxManager from './inbox-manager';
import UsersManager from './users-manager';
import CommentsManager from './comments-manager';
import CasesManager from './cases-manager';
import GalleryManager from './gallery-manager';
import ProfileManager from './profile-manager'; // ProfileManager imported here

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
    { key: 'profile', label: 'Admin Profile', icon: UserCircle },
  ];

  const chartData = [
    { name: 'Services', count: stats.services, color: '#6610f2' },
    { name: 'Blogs', count: stats.blogs, color: '#0d6efd' },
    { name: 'Comments', count: stats.comments, color: '#198754' },
    { name: 'Inbox', count: stats.inbox, color: '#ffc107' },
    { name: 'Cases', count: stats.cases, color: '#0dcaf0' },
    { name: 'Gallery', count: stats.gallery, color: '#d63384' },
  ];

  const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="container-fluid min-vh-100 py-4" style={{ background: '#f4f6f9' }}>
      
      {/* Mobile Top Navbar */}
      <div className="d-lg-none border-0 shadow-sm rounded-4 p-3 bg-white mb-4 d-flex flex-row justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <div className="bg-primary text-white rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm">
            <ShieldCheck size={20} />
          </div>
          <h5 className="fw-bold text-dark m-0">Admin <span className="text-primary">Panel</span></h5>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Link href="/" className="btn btn-dark btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center text-white" title="Go to Home">
            <Home size={18} />
          </Link>
          <button 
            className="btn btn-primary btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="d-lg-none border-0 shadow-lg rounded-4 p-3 bg-white mb-4">
          <div className="nav flex-column gap-2">
            <Link href="/" className="btn btn-light text-secondary text-start d-flex align-items-center gap-2 rounded-pill px-3 py-2 fw-semibold text-decoration-none">
              <Home size={18} /> Go to Home
            </Link>
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button 
                  key={item.key}
                  className={`btn text-start d-flex align-items-center gap-2 rounded-pill px-3 py-2 fw-semibold transition-all ${activeTab === item.key ? 'btn-primary text-white shadow' : 'btn-light text-secondary'}`}
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

      <div className="row g-4">
        
        {/* Pro Desktop Sidebar */}
        <div className="col-lg-3 col-xl-2 d-none d-lg-block">
          <div className="border-0 shadow-sm rounded-4 p-3 bg-white sticky-top d-flex flex-column justify-content-between" style={{ top: '20px', minHeight: '91vh' }}>
            <div>
              <div className="d-flex align-items-center gap-2 px-2 mb-4 pt-2">
                <div className="bg-primary text-white rounded-3 p-2 shadow-sm">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h6 className="fw-bold text-dark m-0 lh-1">Admin</h6>
                  <span className="text-primary small fw-bold" style={{ fontSize: '0.7rem' }}>CONSOLE</span>
                </div>
              </div>
              
              <div className="nav flex-column gap-1 mb-3">
                <Link href="/" className="btn btn-dark text-start d-flex align-items-center gap-2 rounded-pill px-3 py-2 fw-semibold text-decoration-none shadow-sm mb-3">
                  <Home size={16} /> Go to Home
                </Link>
                
                <span className="text-muted fw-bold px-3 mb-2" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>NAVIGATION</span>

                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeTab === item.key;
                  return (
                    <button 
                      key={item.key}
                      className={`btn text-start d-flex align-items-center gap-2 rounded-pill px-3 py-2 fw-semibold transition-all ${isActive ? 'btn-primary text-white shadow-sm' : 'btn-light text-secondary bg-transparent border-0'}`}
                      onClick={() => setActiveTab(item.key)}
                    >
                      <IconComponent size={16} className={isActive ? 'text-white' : 'text-muted'} /> 
                      <span className="small">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <hr className="text-muted opacity-25 my-3" />
              <button 
                onClick={async () => { await authService.logout(); router.push('/auth/login'); }}
                className="btn btn-outline-danger w-100 rounded-pill fw-bold py-2 d-flex align-items-center justify-content-center gap-2 shadow-sm small"
              >
                <LogOut size={15} /> Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col-lg-9 col-xl-10">
          
          {/* Pro Top Banner */}
          <div className="border-0 shadow rounded-4 p-4 text-white mb-4 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #6f42c1 0%, #4e73df 100%)' }}>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <Activity size={24} className="text-warning" />
                  <h3 className="fw-bold mb-0">Admin Dashboard</h3>
                </div>
                <span className="text-white-50 small">Manage your platform modules • {currentDate}</span>
              </div>
              <span className="badge bg-white text-dark px-3 py-2 rounded-pill fw-bold shadow-sm d-flex align-items-center gap-1">
                <span className="spinner-grow spinner-grow-sm text-success" role="status"></span> SYSTEM LIVE
              </span>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <div className="row g-3 mb-4">
                <div className="col-6 col-md-4 col-lg-2">
                  <div className="card border-0 shadow-sm rounded-4 p-3 text-white h-100" style={{ background: 'linear-gradient(135deg, #6610f2 0%, #8540f5 100%)' }}>
                    <Wrench size={22} className="mb-2 opacity-75" />
                    <h3 className="fw-bold mb-0">{stats.services}</h3>
                    <span className="small opacity-75 fw-semibold">Services</span>
                  </div>
                </div>
                <div className="col-6 col-md-4 col-lg-2">
                  <div className="card border-0 shadow-sm rounded-4 p-3 text-white h-100" style={{ background: 'linear-gradient(135deg, #0d6efd 0%, #3d8bfd 100%)' }}>
                    <FileText size={22} className="mb-2 opacity-75" />
                    <h3 className="fw-bold mb-0">{stats.blogs}</h3>
                    <span className="small opacity-75 fw-semibold">Blogs</span>
                  </div>
                </div>
                <div className="col-6 col-md-4 col-lg-2">
                  <div className="card border-0 shadow-sm rounded-4 p-3 text-white h-100" style={{ background: 'linear-gradient(135deg, #198754 0%, #20c997 100%)' }}>
                    <MessageSquare size={22} className="mb-2 opacity-75" />
                    <h3 className="fw-bold mb-0">{stats.comments}</h3>
                    <span className="small opacity-75 fw-semibold">Comments</span>
                  </div>
                </div>
                <div className="col-6 col-md-4 col-lg-2">
                  <div className="card border-0 shadow-sm rounded-4 p-3 text-dark h-100" style={{ background: 'linear-gradient(135deg, #ffc107 0%, #ffca2c 100%)' }}>
                    <Inbox size={22} className="mb-2 opacity-75" />
                    <h3 className="fw-bold mb-0">{stats.inbox}</h3>
                    <span className="small opacity-75 fw-semibold">Inbox</span>
                  </div>
                </div>
                <div className="col-6 col-md-4 col-lg-2">
                  <div className="card border-0 shadow-sm rounded-4 p-3 text-dark h-100" style={{ background: 'linear-gradient(135deg, #0dcaf0 0%, #31d2f2 100%)' }}>
                    <Briefcase size={22} className="mb-2 opacity-75" />
                    <h3 className="fw-bold mb-0">{stats.cases}</h3>
                    <span className="small opacity-75 fw-semibold">Cases</span>
                  </div>
                </div>
                <div className="col-6 col-md-4 col-lg-2">
                  <div className="card border-0 shadow-sm rounded-4 p-3 text-white h-100" style={{ background: 'linear-gradient(135deg, #d63384 0%, #e83e8c 100%)' }}>
                    <ImageIcon size={22} className="mb-2 opacity-75" />
                    <h3 className="fw-bold mb-0">{stats.gallery}</h3>
                    <span className="small opacity-75 fw-semibold">Gallery</span>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="row g-4 mb-4">
                <div className="col-12 col-lg-7">
                  <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <TrendingUp size={20} className="text-primary" />
                      <h5 className="fw-bold text-dark mb-0 fs-6">Business Metrics Overview</h5>
                    </div>
                    <div style={{ width: '100%', height: '280px' }}>
                      <ResponsiveContainer>
                        <BarChart data={chartData}>
                          <XAxis dataKey="name" stroke="#6c757d" fontSize={12} />
                          <YAxis stroke="#6c757d" fontSize={12} allowDecimals={false} />
                          <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                          <Bar dataKey="count" fill="#4e73df" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-5">
                  <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <Layers size={20} className="text-danger" />
                      <h5 className="fw-bold text-dark mb-0 fs-6">Distribution Ratio</h5>
                    </div>
                    <div style={{ width: '100%', height: '280px' }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie data={chartData} dataKey="count" nameKey="name" cx="50%"{...{cy: "50%"}} outerRadius={85} innerRadius={45} label>
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                          <Legend wrapperStyle={{ fontSize: '11px' }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab Component Render */}
          {activeTab === 'profile' && <ProfileManager />}

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
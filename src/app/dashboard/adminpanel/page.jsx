// src/app/dashboard/adminpanel/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from '@/services/authService';
import { dbService } from '@/services/dbService';
import { LayoutDashboard, Wrench, FileText, Inbox, Users, MessageSquare, Briefcase, Image as ImageIcon, LogOut, Menu, X, Home, TrendingUp, Layers, Activity, ShieldCheck, UserCircle, Car } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

import ServicesManager from './services-manager';
import BlogsManager from './blogs-manager';
import InboxManager from './inbox-manager';
import UsersManager from './users-manager';
import CommentsManager from './comments-manager';
import CasesManager from './cases-manager';
import GalleryManager from './gallery-manager';
import ProfileManager from './profile-manager';  
import CarModelsManager from './car-models-manager'; 

// In-memory cache for ultra-fast loading across tab switches
let dashboardCache = {
  stats: null,
  timestamp: 0,
};
const CACHE_DURATION = 60 * 1000; // 1 Minute

export default function AdminPanel() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [stats, setStats] = useState({ services: 0, blogs: 0, inbox: 0, users: 0, comments: 0, cases: 0, gallery: 0, car_models: 0 });
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
    const now = Date.now();
    if (dashboardCache.stats && (now - dashboardCache.timestamp < CACHE_DURATION)) {
      setStats(dashboardCache.stats);
      return;
    }

    const res = await dbService.getDashboardStats();
    const modelsRes = await dbService.getAll('car_models');

    if (res.success) {
      const updatedStats = {
        ...res.data,
        car_models: modelsRes.success ? modelsRes.data.length : 0
      };
      dashboardCache = {
        stats: updatedStats,
        timestamp: now,
      };
      setStats(updatedStats);
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' }}>
      <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  
  if (!isAdmin) return null;

  const menuItems = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'services', label: 'Services', icon: Wrench },
    { key: 'car-models', label: 'Car Models', icon: Car }, 
    { key: 'blogs', label: 'Blogs', icon: FileText },
    { key: 'comments', label: 'Blog Comments', icon: MessageSquare },
    { key: 'cases', label: 'Cases', icon: Briefcase },
    { key: 'gallery', label: 'Gallery', icon: ImageIcon },
    { key: 'inbox', label: 'Inbox', icon: Inbox },
    { key: 'users', label: 'Users', icon: Users },
    { key: 'profile', label: 'Profile', icon: UserCircle },
  ];

  const chartData = [
    { name: 'Services', count: stats.services, color: '#8b5cf6' },
    { name: 'Models', count: stats.car_models, color: '#f97316' },
    { name: 'Blogs', count: stats.blogs, color: '#3b82f6' },
    { name: 'Comments', count: stats.comments, color: '#10b981' },
    { name: 'Inbox', count: stats.inbox, color: '#eab308' },
    { name: 'Cases', count: stats.cases, color: '#06b6d4' },
    { name: 'Gallery', count: stats.gallery, color: '#ec4899' },
  ];

  const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  // Common Glass Style Classes
  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.65)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)'
  };

  return (
    <div className="container-fluid min-vh-100 py-4 position-relative overflow-hidden" style={{ 
      background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', 
      fontFamily: "'Inter', sans-serif"
    }}>
      
      {/* Decorative Background Blobs */}
      <div className="position-absolute rounded-circle" style={{ top: '-10%', left: '-5%', width: '400px', height: '400px', background: 'rgba(255, 154, 158, 0.4)', filter: 'blur(80px)', zIndex: 0 }}></div>
      <div className="position-absolute rounded-circle" style={{ bottom: '-10%', right: '-5%', width: '500px', height: '500px', background: 'rgba(161, 196, 253, 0.4)', filter: 'blur(80px)', zIndex: 0 }}></div>

      <div className="position-relative" style={{ zIndex: 1 }}>
        
        {/* Mobile Top Navbar */}
        <div className="d-lg-none p-3 mb-4 d-flex flex-row justify-content-between align-items-center" style={{ ...glassStyle, borderRadius: '20px' }}>
          <div className="d-flex align-items-center gap-2">
            <div className="text-white rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm" style={{ background: 'linear-gradient(45deg, #667eea, #764ba2)' }}>
              <ShieldCheck size={20} />
            </div>
            <h5 className="fw-bold text-dark m-0">Admin <span style={{ color: '#764ba2' }}>Panel</span></h5>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Link href="/" className="btn btn-light btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm border-0" title="Go to Home">
              <Home size={18} className="text-primary" />
            </Link>
            <button 
              className="btn text-white btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm border-0"
              style={{ background: 'linear-gradient(45deg, #ff9a9e, #fecfef)' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="d-lg-none p-3 mb-4" style={{ ...glassStyle, borderRadius: '20px' }}>
            <div className="nav flex-column gap-2">
              <Link href="/" className="btn btn-light text-start d-flex align-items-center gap-2 rounded-pill px-3 py-2 fw-semibold text-decoration-none shadow-sm border-0">
                <Home size={18} className="text-primary" /> Go to Home
              </Link>
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.key;
                return (
                  <button 
                    key={item.key}
                    className={`btn text-start d-flex align-items-center gap-2 rounded-pill px-3 py-2 fw-semibold transition-all border-0 ${isActive ? 'text-white shadow' : 'text-secondary bg-white bg-opacity-50'}`}
                    style={isActive ? { background: 'linear-gradient(45deg, #667eea, #764ba2)' } : {}}
                    onClick={() => { setActiveTab(item.key); setMobileMenuOpen(false); }}
                  >
                    <IconComponent size={18} /> {item.label}
                  </button>
                );
              })}
              <button 
                onClick={async () => { await authService.logout(); router.push('/auth/login'); }}
                className="btn btn-outline-danger rounded-pill fw-bold py-2 mt-2 d-flex align-items-center justify-content-center gap-2 bg-white bg-opacity-50"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        )}

        <div className="row g-4">
          
          {/* Pro Desktop Sidebar */}
          <div className="col-lg-3 col-xl-2 d-none d-lg-block">
            <div className="p-3 sticky-top d-flex flex-column justify-content-between" style={{ ...glassStyle, top: '20px', minHeight: '91vh', borderRadius: '24px' }}>
              <div>
                <div className="d-flex align-items-center gap-2 px-2 mb-4 pt-2">
                  <div className="text-white rounded-3 p-2 shadow-sm" style={{ background: 'linear-gradient(45deg, #667eea, #764ba2)' }}>
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark m-0 lh-1">Admin</h6>
                    <span className="small fw-bold" style={{ fontSize: '0.7rem', color: '#764ba2' }}>CONSOLE</span>
                  </div>
                </div>
                
                <div className="nav flex-column gap-1 mb-3">
                  <Link href="/" className="btn text-start d-flex align-items-center gap-2 rounded-pill px-3 py-2 fw-semibold text-decoration-none shadow-sm mb-3 border-0 text-white" style={{ background: 'linear-gradient(45deg, #434343, #000000)' }}>
                    <Home size={16} /> Go to Home
                  </Link>
                  
                  <span className="text-muted fw-bold px-3 mb-2" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>NAVIGATION</span>

                  {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = activeTab === item.key;
                    return (
                      <button 
                        key={item.key}
                        className={`btn text-start d-flex align-items-center gap-2 rounded-pill px-3 py-2 fw-semibold transition-all border-0 ${isActive ? 'text-white shadow' : 'bg-transparent text-secondary'}`}
                        style={isActive ? { background: 'linear-gradient(45deg, #667eea, #764ba2)' } : {}}
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
                  className="btn w-100 rounded-pill fw-bold py-2 d-flex align-items-center justify-content-center gap-2 shadow-sm small text-danger bg-white bg-opacity-50 border-0"
                >
                  <LogOut size={15} /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-lg-9 col-xl-10">
            
            {/* Pro Top Banner */}
            <div className="p-4 text-white mb-4 position-relative overflow-hidden" style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
              borderRadius: '24px',
              boxShadow: '0 10px 30px rgba(118, 75, 162, 0.3)'
            }}>
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 position-relative" style={{ zIndex: 1 }}>
                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <Activity size={24} className="text-warning" />
                    <h3 className="fw-bold mb-0">Admin Dashboard</h3>
                  </div>
                  <span className="text-white-50 small">Manage your platform modules • {currentDate}</span>
                </div>
                <span className="badge px-3 py-2 rounded-pill fw-bold shadow-sm d-flex align-items-center gap-2" style={{ background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                  <span className="spinner-grow spinner-grow-sm text-success" role="status"></span> SYSTEM LIVE
                </span>
              </div>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <div className="row g-3 mb-4">
                  {/* UPDATED: Solid Vibrant Colorful Stat Cards with low opacity watermark */}
                  {[
                    { label: 'Services', count: stats.services, icon: Wrench, gradient: 'linear-gradient(135deg, #6610f2 0%, #8540f5 100%)', textColor: 'text-white' },
                    { label: 'Car Models', count: stats.car_models, icon: Car, gradient: 'linear-gradient(135deg, #ff5722 0%, #ff7043 100%)', textColor: 'text-white' },
                    { label: 'Blogs', count: stats.blogs, icon: FileText, gradient: 'linear-gradient(135deg, #0d6efd 0%, #3d8bfd 100%)', textColor: 'text-white' },
                    { label: 'Comments', count: stats.comments, icon: MessageSquare, gradient: 'linear-gradient(135deg, #198754 0%, #20c997 100%)', textColor: 'text-white' },
                    { label: 'Inbox', count: stats.inbox, icon: Inbox, gradient: 'linear-gradient(135deg, #ffc107 0%, #ffca2c 100%)', textColor: 'text-dark' },
                    { label: 'Gallery', count: stats.gallery, icon: ImageIcon, gradient: 'linear-gradient(135deg, #d63384 0%, #e83e8c 100%)', textColor: 'text-white' }
                  ].map((stat, idx) => (
                    <div className="col-6 col-md-4 col-lg-2" key={idx}>
                      <div className="card border-0 shadow-sm rounded-4 p-3 h-100 position-relative overflow-hidden" style={{ 
                        background: stat.gradient, // Solid Vibrant Color Back
                        transition: 'transform 0.2s',
                        cursor: 'pointer'
                      }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        
                        {/* Watermark Icon with VERY LOW OPACITY to keep text readable */}
                        <div className="position-absolute" style={{ right: '-15px', bottom: '-15px', opacity: 0.08, pointerEvents: 'none' }}>
                          <stat.icon size={90} className={stat.textColor} strokeWidth={1.5} />
                        </div>

                        <stat.icon size={22} className={`mb-2 ${stat.textColor} opacity-75 position-relative`} style={{ zIndex: 1 }} />
                        <h3 className={`fw-bold mb-0 position-relative ${stat.textColor}`} style={{ zIndex: 1 }}>{stat.count}</h3>
                        <span className={`small fw-semibold position-relative ${stat.textColor} opacity-75`} style={{ zIndex: 1 }}>{stat.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Charts Section */}
                <div className="row g-4 mb-4">
                  <div className="col-12 col-lg-7">
                    <div className="p-4 h-100" style={{ ...glassStyle, borderRadius: '24px' }}>
                      <div className="d-flex align-items-center gap-2 mb-4">
                        <div className="p-2 rounded-circle bg-primary bg-opacity-10 text-primary">
                          <TrendingUp size={20} />
                        </div>
                        <h5 className="fw-bold text-dark mb-0 fs-6">Business Metrics Overview</h5>
                      </div>
                      <div style={{ width: '100%', height: '280px' }}>
                        <ResponsiveContainer>
                          <BarChart data={chartData}>
                            <XAxis dataKey="name" stroke="#6c757d" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#6c757d" fontSize={12} allowDecimals={false} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backdropFilter: 'blur(10px)' }} />
                            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                              {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-5">
                    <div className="p-4 h-100" style={{ ...glassStyle, borderRadius: '24px' }}>
                      <div className="d-flex align-items-center gap-2 mb-4">
                        <div className="p-2 rounded-circle bg-danger bg-opacity-10 text-danger">
                          <Layers size={20} />
                        </div>
                        <h5 className="fw-bold text-dark mb-0 fs-6">Distribution Ratio</h5>
                      </div>
                      <div style={{ width: '100%', height: '280px' }}>
                        <ResponsiveContainer>
                          <PieChart>
                            <Pie data={chartData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={85} innerRadius={45} label={({name, percent}) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                              {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backdropFilter: 'blur(10px)' }} />
                            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} iconType="circle" />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Render Active Components in Glass Container */}
            {activeTab !== 'overview' && (
               <div className="p-4" style={{ ...glassStyle, borderRadius: '24px', minHeight: '60vh' }}>
                  {activeTab === 'profile' && <ProfileManager />}
                  {activeTab === 'services' && <ServicesManager />}
                  {activeTab === 'car-models' && <CarModelsManager />} 
                  {activeTab === 'blogs' && <BlogsManager />}
                  {activeTab === 'comments' && <CommentsManager />}
                  {activeTab === 'cases' && <CasesManager />}
                  {activeTab === 'gallery' && <GalleryManager />}
                  {activeTab === 'inbox' && <InboxManager />}
                  {activeTab === 'users' && <UsersManager />}
               </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
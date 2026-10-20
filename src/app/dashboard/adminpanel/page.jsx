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

let dashboardCache = {
  stats: null,
  timestamp: 0,
};
const CACHE_DURATION = 60 * 1000;

export default function AdminPanel() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [stats, setStats] = useState({ services: 0, blogs: 0, inbox: 0, users: 0, comments: 0, cases: 0, gallery: 0, car_models: 0 });
  const router = useRouter();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

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
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' }}>
      <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  
  if (!isAdmin) return null;

  const menuItems = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'services', label: 'Manage Services', icon: Wrench },
    { key: 'car-models', label: 'Car Models DB', icon: Car }, 
    { key: 'blogs', label: 'Manage Blogs', icon: FileText },
    { key: 'comments', label: 'Blog Comments', icon: MessageSquare },
    { key: 'cases', label: 'Manage Cases', icon: Briefcase },
    { key: 'gallery', label: 'Manage Gallery', icon: ImageIcon },
    { key: 'inbox', label: 'Contact / Inbox', icon: Inbox },
    { key: 'users', label: 'Users List', icon: Users },
    { key: 'profile', label: 'Admin Profile', icon: UserCircle },
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

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.45)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)'
  };

  return (
    <div className="container-fluid min-vh-100 py-4 position-relative overflow-hidden" style={{ 
      background: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 50%, #e0c3fc 100%)', 
      fontFamily: "'Inter', sans-serif"
    }}>
      
      <div className="position-absolute rounded-circle" style={{ top: '-15%', left: '-10%', width: '600px', height: '600px', background: 'rgba(255, 255, 255, 0.4)', filter: 'blur(100px)', zIndex: 0 }}></div>
      <div className="position-absolute rounded-circle" style={{ bottom: '-15%', right: '-10%', width: '500px', height: '500px', background: 'rgba(142, 197, 252, 0.5)', filter: 'blur(100px)', zIndex: 0 }}></div>

      <div className="position-relative" style={{ zIndex: 1 }}>
        
        {/* Mobile Top Navbar */}
        <div className="d-lg-none p-3 mb-4 d-flex flex-row justify-content-between align-items-center" style={{ ...glassStyle, borderRadius: '24px' }}>
          <div className="d-flex align-items-center gap-2">
            <div className="text-white rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <ShieldCheck size={20} />
            </div>
            <h5 className="fw-bold text-dark m-0">Admin <span style={{ color: '#764ba2' }}>Panel</span></h5>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Link href="/" className="btn btn-light btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm border-0">
              <Home size={18} className="text-primary" />
            </Link>
            <button 
              className="btn text-white btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center shadow-sm border-0"
              style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' }}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* --- MOBILE SIDEBAR DRAWER (70vw) --- */}
        <div 
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100"
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.25)', 
            backdropFilter: 'blur(8px)',
            zIndex: 1040,
            opacity: mobileMenuOpen ? 1 : 0,
            visibility: mobileMenuOpen ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease, visibility 0.3s ease'
          }}
          onClick={() => setMobileMenuOpen(false)}
        />

        <div 
          className="d-lg-none position-fixed top-0 end-0 h-100 d-flex flex-column"
          style={{ 
            width: '70vw', // Updated to 70vw as requested
            zIndex: 1050,
            background: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            borderTopLeftRadius: '40px',
            borderBottomLeftRadius: '40px',
            boxShadow: '-10px 0 40px rgba(0,0,0,0.1)',
            transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
            overflowY: 'auto'
          }}
        >
          <div className="p-4 pt-5 d-flex justify-content-between align-items-center">
             <span className="fw-bold text-dark fs-5">Menu</span>
             <button 
               className="btn btn-light btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center border-0 shadow-sm"
               onClick={() => setMobileMenuOpen(false)}
             >
               <X size={18} className="text-danger" />
             </button>
          </div>

          <div className="px-3 pb-3 flex-grow-1 d-flex flex-column gap-2">
            <Link href="/" className="btn btn-light text-start d-flex align-items-center gap-3 rounded-4 px-3 py-3 fw-semibold text-decoration-none shadow-sm border-0 mb-2">
              <Home size={18} className="text-primary" /> Go to Home
            </Link>
            
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.key;
              return (
                <button 
                  key={item.key}
                  className={`btn text-start d-flex align-items-center gap-3 rounded-4 px-3 py-3 fw-semibold transition-all border-0 ${isActive ? 'text-white shadow' : 'text-secondary bg-white bg-opacity-50'}`}
                  style={isActive ? { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' } : {}}
                  onClick={() => { setActiveTab(item.key); setMobileMenuOpen(false); }}
                >
                  <IconComponent size={20} /> <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-4 mt-auto">
            <button 
              onClick={async () => { await authService.logout(); router.push('/auth/login'); }}
              className="btn btn-outline-danger w-100 rounded-4 fw-bold py-3 d-flex align-items-center justify-content-center gap-2 bg-white shadow-sm"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
        {/* --- END MOBILE SIDEBAR DRAWER --- */}

        <div className="row g-4">
          
          {/* Desktop Sidebar */}
          <div className="col-lg-3 col-xl-2 d-none d-lg-block">
            <div className="p-3 sticky-top d-flex flex-column justify-content-between" style={{ ...glassStyle, top: '20px', minHeight: '91vh', borderRadius: '30px' }}>
              <div>
                <div className="d-flex align-items-center gap-2 px-2 mb-4 pt-2">
                  <div className="text-white rounded-3 p-2 shadow-sm" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark m-0 lh-1">Admin</h6>
                    <span className="small fw-bold" style={{ fontSize: '0.7rem', color: '#764ba2' }}>CONSOLE</span>
                  </div>
                </div>
                
                <div className="nav flex-column gap-1 mb-3">
                  <Link href="/" className="btn text-start d-flex align-items-center gap-2 rounded-pill px-3 py-2 fw-semibold text-decoration-none shadow-sm mb-3 border-0 text-white" style={{ background: 'linear-gradient(135deg, #232526 0%, #414345 100%)' }}>
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
                        style={isActive ? { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' } : {}}
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
            
            {/* Top Banner (Updated to be Slim & Inline on Mobile) */}
            <div className="p-3 px-md-4 text-white mb-4 position-relative overflow-hidden" style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
              borderRadius: '30px',
              boxShadow: '0 10px 30px rgba(118, 75, 162, 0.3)'
            }}>
              <div className="d-flex justify-content-between align-items-center flex-row flex-nowrap gap-2 position-relative" style={{ zIndex: 1 }}>
                <div>
                  <div className="d-flex align-items-center gap-2 mb-0 mb-md-1">
                    <Activity size={18} className="text-warning  " />
                    <h4 className="fw-bold mb-0 fs-6 fs-md-4">Admin Dashboard</h4>
                  </div>
                  <span className="text-white-50   small">Manage your platform modules </span>
                </div>
                {/* Slim Inline System Live Badge */}
                <span className="badge px-2 py-1 px-md-3 py-md-2 rounded-pill fw-bold shadow-sm d-flex align-items-center gap-1 gap-md-2" style={{ background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', fontSize: '0.65rem' }}>
                  <span className="spinner-grow spinner-grow-sm text-success" role="status" style={{ width: '8px', height: '8px' }}></span> SYSTEM LIVE <br />
                 • {currentDate}
                </span>
              </div>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <div className="row g-3 mb-4">
                  {[
                    { label: 'Services', count: stats.services, icon: Wrench, gradient: 'linear-gradient(135deg, #6610f2 0%, #8540f5 100%)', textColor: 'text-white', targetTab: 'services' },
                    { label: 'Car Models', count: stats.car_models, icon: Car, gradient: 'linear-gradient(135deg, #ff5722 0%, #ff7043 100%)', textColor: 'text-white', targetTab: 'car-models' },
                    { label: 'Blogs', count: stats.blogs, icon: FileText, gradient: 'linear-gradient(135deg, #0d6efd 0%, #3d8bfd 100%)', textColor: 'text-white', targetTab: 'blogs' },
                    { label: 'Comments', count: stats.comments, icon: MessageSquare, gradient: 'linear-gradient(135deg, #198754 0%, #20c997 100%)', textColor: 'text-white', targetTab: 'comments' },
                    { label: 'Inbox', count: stats.inbox, icon: Inbox, gradient: 'linear-gradient(135deg, #ffc107 0%, #ffca2c 100%)', textColor: 'text-dark', targetTab: 'inbox' },
                    { label: 'Gallery', count: stats.gallery, icon: ImageIcon, gradient: 'linear-gradient(135deg, #d63384 0%, #e83e8c 100%)', textColor: 'text-white', targetTab: 'gallery' }
                  ].map((stat, idx) => (
                    <div className="col-6 col-md-4 col-lg-2" key={idx}>
                      {/* Added onClick and role="button" to make it clickable */}
                      <div 
                        role="button"
                        onClick={() => setActiveTab(stat.targetTab)}
                        className="card border-0 shadow-sm p-3 h-100 position-relative overflow-hidden" 
                        style={{ 
                          background: stat.gradient,
                          transition: 'transform 0.2s',
                          cursor: 'pointer',
                          borderRadius: '24px'
                        }} 
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} 
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        
                        <div className="position-absolute" style={{ right: '-15px', bottom: '-15px', opacity: 0.1, pointerEvents: 'none' }}>
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
                    <div className="p-4 h-100" style={{ ...glassStyle, borderRadius: '30px' }}>
                      <div className="d-flex align-items-center gap-2 mb-4">
                        <div className="p-2 rounded-circle bg-white bg-opacity-50 text-primary shadow-sm">
                          <TrendingUp size={20} />
                        </div>
                        <h5 className="fw-bold text-dark mb-0 fs-6">Business Metrics Overview</h5>
                      </div>
                      <div style={{ width: '100%', height: '280px' }}>
                        <ResponsiveContainer>
                          <BarChart data={chartData}>
                            <XAxis dataKey="name" stroke="#6c757d" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#6c757d" fontSize={12} allowDecimals={false} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{fill: 'rgba(255,255,255,0.2)'}} contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backdropFilter: 'blur(10px)' }} />
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
                    <div className="p-4 h-100" style={{ ...glassStyle, borderRadius: '30px' }}>
                      <div className="d-flex align-items-center gap-2 mb-4">
                        <div className="p-2 rounded-circle bg-white bg-opacity-50 text-danger shadow-sm">
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
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backdropFilter: 'blur(10px)' }} />
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
               <div className="p-4" style={{ ...glassStyle, borderRadius: '30px', minHeight: '60vh' }}>
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
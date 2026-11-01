// src/components/layout/Header.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth, database } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import SearchModal from './SearchModal';
import './Header.css';
import GoogleTranslateButton from './LanguageTranslator';

const Icon = ({ path, size = 20, fill = 'none' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const ICONS = {
  Menu: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 5H3" /><path d="M21 12H9" /><path d="M21 19H7" /></svg>,
  Back: 'M19 12H5 M12 19l-7-7 7-7',
  Search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.3-4.3',
  Chevron: 'M9 18l6-6-6-6',
  Home: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
  Wrench: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L2 19l3 3 7.3-7.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2z',
  Contact: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 3a2 2 0 0 1-.5 2.1L8 10.1a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c1 .3 2 .5 3 .7a2 2 0 0 1 1.6 2z',
  User: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  Login: 'M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4 M10 17l5-5-5-5 M15 12H3',
  Gallery: 'M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3 z M21 15l-5-5L5 21',
};

function addRipple(e) {
  const target = e.currentTarget;
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.8;
  const x = (e.clientX ?? rect.left + rect.width / 2) - rect.left - size / 2;
  const y = (e.clientY ?? rect.top + rect.height / 2) - rect.top - size / 2;
  const ripple = document.createElement('span');
  ripple.className = 'md-ripple-effect';
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  target.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}

const slugify = (str = '') =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [userData, setUserData] = useState(null);
  
  // State to hold all items fetched from Firebase for the dropdown visual list
  const [bodyKitItems, setBodyKitItems] = useState([]);

  const ADMIN_EMAIL = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || '').toLowerCase();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch all items from database so header can show Title + Photo on hover
  useEffect(() => {
    async function fetchItems() {
      try {
        const refPath = ref(database, 'body_kits_upgrades');
        const snapshot = await get(refPath);
        if (snapshot.exists()) {
          const val = snapshot.val();
          const dataList = Array.isArray(val) ? val : Object.keys(val).map(k => ({ id: k, ...val[k] }));
          setBodyKitItems(dataList);
        }
      } catch (err) {
        console.error('Error fetching items in header:', err);
      }
    }
    fetchItems();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userRef = ref(database, `users/${currentUser.uid}`);
          const snapshot = await get(userRef);
          let profilePic = currentUser.photoURL || '';
          if (snapshot.exists()) {
            profilePic = snapshot.val().profilePic || profilePic;
          }
          setUserData({
            email: currentUser.email,
            profilePic,
            isAdmin: ADMIN_EMAIL ? currentUser.email?.toLowerCase() === ADMIN_EMAIL : false
          });
        } catch (err) {
          setUserData({
            email: currentUser.email,
            profilePic: currentUser.photoURL || '',
            isAdmin: ADMIN_EMAIL ? currentUser.email?.toLowerCase() === ADMIN_EMAIL : false
          });
        }
      } else {
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, [ADMIN_EMAIL]);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { key: 'home', label: 'Home', href: '/' },
    { key: 'about', label: 'About Us', href: '/about-us' },
    { key: 'services', label: 'Services', href: '/services' },
    {
      key: 'body-kits',
      label: 'Body & Kits',
      href: '/body-kits/amg-body-kits',
      hasImageDropdown: true, // Flag to render rich dropdown with Title + Pic
    },
    {
      key: 'car-classes',
      label: 'Car Classes',
      href: '/car-class/g-class',
      subItems: [
        { label: 'All Classes', href: '/car-class/all' },
        { label: 'G-Class', href: '/car-class/g-class' },
        { label: 'C-Class', href: '/car-class/c-class' },
        { label: 'S-Class', href: '/car-class/s-class' },
        { label: 'E-Class', href: '/car-class/e-class' },
        { label: 'AMG Series', href: '/car-class/amg-series' },
      ]
    },
    { key: 'models', label: 'Car Models', href: '/models' },
    { key: 'blog', label: 'Blogs', href: '/blogs' },
    { key: 'contact', label: 'Contact Us', href: '/contact-us' },
  ];

  const closeDrawer = () => { setDrawerOpen(false); };
  const dashboardUrl = userData?.isAdmin ? './dashboard/adminpanel' : '/dashboard/userpanel';

  if (!mounted) return <header className="md-appbar" style={{ minHeight: '80px' }} />;

  return (
    <>
      <header className={`md-appbar ${elevated ? 'md-appbar--elevated' : ''}`}>
        <div className="container-fluid d-flex align-items-center justify-content-between md-appbar-row">
          <Link href="/" className="md-appbar-brand" onClick={closeDrawer}>
            <img src="/images/logo.avif" alt="Mercedes Garage Dubai" className="md-logo-img rounded-3" />
          </Link>

          <nav className="md-desktop-nav d-none d-lg-flex align-items-center gap-1 m-0">
            {navItems.map((item) => (
              <div key={item.key} className="md-desktop-item position-relative">
                <Link href={item.href} className="md-desktop-link">{item.label}</Link>
                
                {/* Standard Submenu (for other tabs) */}
                {item.subItems && (
                  <div className="md-desktop-menu shadow border-0 rounded-3">
                    {item.subItems.map((s, i) => (
                      <Link key={i} href={s.href} className="md-desktop-menu-item">{s.label}</Link>
                    ))}
                  </div>
                )}

                {/* Rich Image + Title Dropdown on Hover for Body & Kits */}
                {item.hasImageDropdown && (
                  <div className="md-desktop-menu shadow border-0 rounded-4 p-2" style={{ width: '320px', maxHeight: '400px', overflowY: 'auto' }}>
                    {bodyKitItems.length === 0 ? (
                      <div className="p-2 text-muted small text-center">No items available</div>
                    ) : (
                      bodyKitItems.map((prod, idx) => {
                        const prodImg = prod.imageUrl || prod.imageUrls?.[0] || '/images/car-class.png';
                        const prodSlug = prod.slug || slugify(prod.title);
                        return (
                          <Link 
                            key={idx} 
                            href={`/body-kits/${prodSlug}`} 
                            className="d-flex align-items-center gap-3 p-2 rounded-3 text-decoration-none text-dark hover-bg-light transition"
                          >
                            <img src={prodImg} alt={prod.title} className="rounded-2 object-fit-cover shadow-sm flex-shrink-0" style={{ width: '45px', height: '45px' }} />
                            <div className="overflow-hidden">
                              <h6 className="fw-bold text-dark small mb-0 text-truncate" style={{ fontSize: '0.85rem' }}>{prod.title}</h6>
                              <span className="text-danger" style={{ fontSize: '0.75rem' }}>{prod.category || 'Upgrade'}</span>
                            </div>
                          </Link>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="md-appbar-actions d-flex align-items-center gap-2">
            <GoogleTranslateButton />
            <button className="md-icon-btn md-ripple" onMouseDown={addRipple} onClick={() => setSearchOpen(true)} aria-label="Search">
              <Icon path={ICONS.Search} size={20} />
            </button>
            {userData ? (
              <Link href={dashboardUrl} className="rounded-circle p-0 overflow-hidden shadow-sm d-none d-lg-flex align-items-center justify-content-center border border-2 border-danger" style={{ width: '36px', height: '36px' }} onMouseDown={addRipple} title="Go to Dashboard">
                {userData.profilePic ? <img src={userData.profilePic} alt="Profile" className="w-100 h-100 object-fit-cover" /> : <div className="bg-danger text-white w-100 h-100 d-flex align-items-center justify-content-center fw-bold small">{userData.email?.charAt(0).toUpperCase()}</div>}
              </Link>
            ) : (
              <Link href="/auth/login" className="btn btn-danger btn-sm rounded-pill px-3 fw-bold d-none d-lg-flex align-items-center gap-1 shadow-sm" onMouseDown={addRipple}>
                <Icon path={ICONS.Login} size={16} /> <span>Login</span>
              </Link>
            )}
            <button className="md-icon-btn md-ripple d-lg-none" onMouseDown={addRipple} onClick={() => setDrawerOpen(true)} aria-label="Open menu">
              {ICONS.Menu}
            </button>
          </div>
        </div>
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <div className={`md-scrim ${drawerOpen ? 'show' : ''}`} onClick={closeDrawer} aria-hidden="true" />
    </>
  );
}
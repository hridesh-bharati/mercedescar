'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import './Header.css';

const Icon = ({ path, size = 20, fill = 'none' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const ICONS = {
  Menu: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 5H3"/><path d="M21 12H9"/><path d="M21 19H7"/></svg>,
  Back: 'M19 12H5 M12 19l-7-7 7-7',
  Search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.3-4.3',
  Close: 'M18 6L6 18 M6 6l12 12',
  Chevron: 'M9 18l6-6-6-6',
  Home: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
  Wrench: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L2 19l3 3 7.3-7.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2z',
  Contact: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 3a2 2 0 0 1-.5 2.1L8 10.1a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c1 .3 2 .5 3 .7a2 2 0 0 1 1.6 2z',
  User: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  Login: 'M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4 M10 17l5-5-5-5 M15 12H3',
  Plus: 'M12 5v14 M5 12h14',
  Phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 3a2 2 0 0 1-.5 2.1L8 10.1a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c1 .3 2 .5 3 .7a2 2 0 0 1 1.6 2z',
  Email: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
  Location: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  Blog: 'M4 4h16v16H4z M8 8h8 M8 12h8 M8 16h5',
  Shop: 'M6 2l1.5 5h9L18 2 M4 7h16l-1.5 13a2 2 0 0 1-2 1.8H7.5a2 2 0 0 1-2-1.8z M9 11v4 M15 11v4',
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

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [elevated, setElevated] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const searchRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [drawerOpen]);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 150);
    else setQuery('');
  }, [searchOpen]);

  // ✅ Mercedes Garage Dubai ke actual links
  const navItems = [
    { key: 'home', label: 'Home', href: '/', icon: ICONS.Home },
    { key: 'services', label: 'Services', href: '/services', icon: ICONS.Wrench },
    { key: 'about', label: 'About Us', href: '/about-us', icon: ICONS.User },
    {
      key: 'pages',
      label: 'Pages',
      href: '#',
      icon: ICONS.Blog,
      subItems: [
        { label: 'Our Team 1', href: '/our-team' },
        { label: 'Our Team 2', href: '/our-team-2' },
        { label: 'Team Details', href: '/team-details' },
        { label: 'Case Studies 3 Columns', href: '/case-studies-3-columns' },
        { label: 'Case Studies 4 Columns', href: '/case-studies-4-columns' },
        { label: 'Case Carousel', href: '/case-carousel' },
        { label: 'Case Single', href: '/portfolio/full-synthetic-oil-change' },
        { label: 'Work Process', href: '/work-process' },
        { label: 'Testimonials', href: '/testimonials' },
        { label: 'Pricing Plan', href: '/pricing-table' },
        { label: 'FAQs', href: '/faqs' },
        { label: 'Shop Grid', href: '/shop-grid' },
        { label: 'Shop Default', href: '/shop' },
        { label: 'Shop Details', href: '/product/vehicle-suspension' },
        { label: 'Shop Cart', href: '/cart' },
        { label: 'Shop Checkout', href: '/checkout' },
        { label: 'Error 404', href: '/error-404' },
        { label: 'Landing', href: '/landing' },
      ]
    },
    {
      key: 'blog',
      label: 'Blog',
      href: '/blog',
      icon: ICONS.Blog,
      subItems: [
        { label: 'Blog Grid 01', href: '/blog-grid' },
        { label: 'Blog Grid 02', href: '/blog-grid-2' },
        { label: 'Blog Grid 03', href: '/blog-grid-3' },
        { label: 'Blog Carousel', href: '/blog-carousel' },
        { label: 'Blog Standard', href: '/blog' },
        { label: 'Blog Details', href: '/blog-details' },
      ]
    },
    { key: 'contact', label: 'Contact Us', href: '/contact-us', icon: ICONS.Contact },
  ];

  const closeDrawer = () => { setDrawerOpen(false); setExpanded(null); };

  const filtered = query.trim()
    ? navItems
        .map((i) => ({ ...i, subItems: i.subItems?.filter((s) => s.label.toLowerCase().includes(query.toLowerCase())) }))
        .filter((i) => i.label.toLowerCase().includes(query.toLowerCase()) || (i.subItems && i.subItems.length > 0))
    : navItems;

  return (
    <>
      {/* 1st Layer: Top Info Bar */}
      <div className="md-top-info-bar d-none d-lg-block">
        <div className="container d-flex justify-content-between align-items-center py-2">
          <div className="d-flex align-items-center gap-2 text-white">
            <Icon path={ICONS.Location} size={14} />
            <span>Warehouse #S2, Al Qouz 20C Street Industrial Area 2, Dubai, UAE</span>
          </div>
          <div className="d-flex align-items-center gap-4">
            <a href="tel:+971567888808" className="text-decoration-none text-white d-flex align-items-center gap-1">
              <Icon path={ICONS.Phone} size={14} /> +971 56 788 8808
            </a>
            <a href="mailto:info@mercedesgaragedubai.com" className="text-decoration-none text-white d-flex align-items-center gap-1">
              <Icon path={ICONS.Email} size={14} /> info@mercedesgaragedubai.com
            </a>
          </div>
        </div>
      </div>

      {/* 2nd Layer: Main App Bar */}
      <header className={`md-appbar ${elevated ? 'md-appbar--elevated' : ''}`}>
        <div className="container d-flex align-items-center justify-content-between md-appbar-row">
          {!searchOpen ? (
            <>
              <Link href="/" className="md-appbar-brand" onClick={closeDrawer}>
                <img src="/images/logo.png" alt="Mercedes Garage Dubai" className="md-logo-img" />
              </Link>

              <nav className="md-desktop-nav d-none d-lg-flex align-items-center gap-1 m-0">
                {navItems.map((item) => (
                  <div key={item.key} className="md-desktop-item">
                    <Link href={item.href} className="md-desktop-link">{item.label}</Link>
                    {item.subItems && (
                      <div className="md-desktop-menu shadow-sm">
                        {item.subItems.map((s, i) => (
                          <Link key={i} href={s.href} className="md-desktop-menu-item">{s.label}</Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="md-appbar-actions d-flex align-items-center gap-2">
                <button className="md-icon-btn md-ripple" onMouseDown={addRipple} onClick={() => setSearchOpen(true)} aria-label="Search">
                  <Icon path={ICONS.Search} size={20} />
                </button>
                <Link href="/login" className="md-icon-btn md-ripple d-none d-lg-flex" onMouseDown={addRipple} aria-label="Account">
                  <Icon path={ICONS.User} size={20} />
                </Link>
                <button className="md-icon-btn md-ripple d-lg-none" onMouseDown={addRipple} onClick={() => setDrawerOpen(true)} aria-label="Open menu">
                  {ICONS.Menu}
                </button>
              </div>
            </>
          ) : (
            <div className="md-search-row w-100">
              <button className="md-icon-btn md-ripple" onMouseDown={addRipple} onClick={() => setSearchOpen(false)} aria-label="Close search">
                <Icon path={ICONS.Back} size={20} />
              </button>
              <input
                ref={searchRef}
                className="md-search-field"
                type="text"
                placeholder="Search brand or service..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button className="md-icon-btn md-ripple" onMouseDown={addRipple} onClick={() => setQuery('')} aria-label="Clear">
                  <Icon path={ICONS.Close} size={18} />
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      <div className={`md-scrim ${drawerOpen ? 'show' : ''}`} onClick={closeDrawer} aria-hidden="true" />

      {/* Mobile Drawer */}
      <aside className={`md-drawer ${drawerOpen ? 'open' : ''}`} aria-hidden={!drawerOpen}>
        <div className="md-drawer-header">
          <img src="/images/logo.png" alt="Mercedes Garage Dubai" className="md-logo-img-drawer" />
        </div>

        <ul className="md-drawer-list">
          {filtered.map((item, idx) => (
            <li key={item.key} className="md-drawer-item" style={{ '--d': `${idx * 0.03}s` }}>
              <div
                className={`md-drawer-row md-ripple ${activeTab === item.key ? 'is-active' : ''}`}
                onMouseDown={addRipple}
                onClick={() => item.subItems ? setExpanded(expanded === item.key ? null : item.key) : (setActiveTab(item.key), closeDrawer())}
              >
                <span className="md-drawer-icon"><Icon path={item.icon} size={20} /></span>
                <Link href={item.href} className="md-drawer-label" onClick={(e) => { if (item.subItems) e.preventDefault(); else closeDrawer(); }}>
                  {item.label}
                </Link>
                {item.subItems && (
                  <span className={`md-drawer-chevron ${expanded === item.key ? 'open' : ''}`}>
                    <Icon path={ICONS.Chevron} size={16} />
                  </span>
                )}
              </div>

              {item.subItems && (
                <ul className="md-drawer-submenu" style={{ maxHeight: expanded === item.key ? `${item.subItems.length * 40 + 8}px` : '0px' }}>
                  {item.subItems.map((s, i) => (
                    <li key={i}>
                      <Link href={s.href} className="md-drawer-sublink md-ripple" onMouseDown={addRipple} onClick={closeDrawer}>
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="md-drawer-footer">
          <Link href="/login" className="md-btn-filled md-ripple w-100" onMouseDown={addRipple} onClick={closeDrawer}>
            <Icon path={ICONS.Login} size={18} />
            <span>Log in</span>
          </Link>
        </div>
      </aside>

      {/* Bottom Nav (Mobile) */}
      <nav className="md-navbar d-lg-none">
        <Link href="/" className={`md-nav-dest md-ripple ${activeTab === 'home' ? 'is-active' : ''}`} onMouseDown={addRipple} onClick={() => setActiveTab('home')}>
          <span className="md-nav-indicator"><Icon path={ICONS.Home} size={20} /></span>
          <span className="md-nav-label">Home</span>
        </Link>

        <button className={`md-nav-dest md-ripple ${activeTab === 'categories' ? 'is-active' : ''}`} onMouseDown={addRipple} onClick={() => { setActiveTab('categories'); setDrawerOpen(true); }}>
          <span className="md-nav-indicator"><Icon path={ICONS.Wrench} size={20} /></span>
          <span className="md-nav-label">Services</span>
        </button>

        <div className="md-nav-fab-slot">
          <Link href="/book" className="md-fab md-ripple" onMouseDown={addRipple} aria-label="Book a service">
            <Icon path={ICONS.Plus} size={24} />
          </Link>
        </div>

        <Link href="/contact-us" className={`md-nav-dest md-ripple ${activeTab === 'contact' ? 'is-active' : ''}`} onMouseDown={addRipple} onClick={() => setActiveTab('contact')}>
          <span className="md-nav-indicator"><Icon path={ICONS.Contact} size={20} /></span>
          <span className="md-nav-label">Contact</span>
        </Link>

        <Link href="/login" className={`md-nav-dest md-ripple ${activeTab === 'account' ? 'is-active' : ''}`} onMouseDown={addRipple} onClick={() => setActiveTab('account')}>
          <span className="md-nav-indicator"><Icon path={ICONS.User} size={20} /></span>
          <span className="md-nav-label">Account</span>
        </Link>
      </nav>
    </>
  );
}
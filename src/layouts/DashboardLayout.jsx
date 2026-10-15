import React, { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { 
  Home, 
  User, 
  Sparkles, 
  Building, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  Clock, 
  MapPin, 
  Mic, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Globe,
  ChevronRight,
  ShieldCheck,
  Building2,
  PhoneCall,
  Wifi,
  WifiOff,
  HeartHandshake
} from 'lucide-react';
import OfflineBanner from '../components/OfflineBanner';

const DashboardLayout = ({ 
  userProfile, 
  lang, 
  setLang, 
  notifications, 
  onLogout,
  isOffline = false,
  setIsOffline = () => {},
  offlineQueueCount = 0,
  onSyncNow = () => {}
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showHelplineModal, setShowHelplineModal] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications ? notifications.filter(n => !n.read).length : 0;

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: <Home size={18} /> },
    { label: "My Profile", path: "/profile", icon: <User size={18} />, badge: `${userProfile.completeness}%` },
    { label: "Smart Assessment", path: "/assessment", icon: <Sparkles size={18} /> },
    { label: "Schemes", path: "/schemes", icon: <Building size={18} /> },
    { label: "Jobs", path: "/jobs", icon: <Briefcase size={18} /> },
    { label: "Skill Learning", path: "/skills", icon: <GraduationCap size={18} /> },
    { label: "Document Assistant", path: "/documents", icon: <FileText size={18} /> },
    { label: "Application Tracker", path: "/tracker", icon: <Clock size={18} /> },
    { label: "Panchayat Staff Mode", path: "/panchayat", icon: <Building2 size={18} />, badge: "Kiosk" },
    { label: "Help Centers", path: "/help-centers", icon: <MapPin size={18} /> },
    { label: "Voice Assistant", path: "/voice", icon: <Mic size={18} /> },
    { label: "Notifications", path: "/notifications", icon: <Bell size={18} />, badge: unreadCount > 0 ? unreadCount : null },
    { label: "Settings", path: "/settings", icon: <Settings size={18} /> }
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="dashboard-app-layout">
      {/* Mobile Top Header */}
      <div className="mobile-header-bar">
        <div className="brand-logo-small">
          <span className="logo-symbol">🌸</span>
          <span className="logo-text">EmpowerHer</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button 
            className="btn btn-sm" 
            style={{ background: '#e03131', color: 'white', padding: '4px 8px', fontSize: '0.75rem', borderRadius: '20px' }}
            onClick={() => setShowHelplineModal(true)}
          >
            <PhoneCall size={12} /> 181 SOS
          </button>
          <NavLink to="/notifications" className="icon-circle-btn">
            <Bell size={18} color="var(--primary)" />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </NavLink>
          <button 
            className="mobile-hamburger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Left Sidebar Navigation */}
      <aside className={`dashboard-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-brand">
          <NavLink to="/dashboard" className="brand-link" onClick={handleNavClick}>
            <div className="logo-icon-wrap">
              <span className="logo-symbol">🌸</span>
            </div>
            <div>
              <span className="logo-text">EmpowerHer</span>
              <span className="sub-logo-tag">SaaS Platform</span>
            </div>
          </NavLink>
        </div>

        <nav className="sidebar-nav-menu">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.badge && <span className="sidebar-badge">{item.badge}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Helpline Button in Sidebar */}
        <div style={{ padding: '0 16px', marginBottom: '12px' }}>
          <button 
            className="btn btn-block" 
            style={{ background: '#ffe3e3', color: '#c92a2a', border: '1px solid #ffa8a8', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            onClick={() => setShowHelplineModal(true)}
          >
            <PhoneCall size={15} /> 24/7 Women Helpline (181)
          </button>
        </div>

        {/* Sidebar Footer Profile Card */}
        <div className="sidebar-profile-card">
          <div className="user-avatar-circle">
            {userProfile.name.charAt(0)}
          </div>
          <div className="user-details">
            <strong className="user-name">{userProfile.name}</strong>
            <span className="user-role">{userProfile.category} • {userProfile.occupation}</span>
          </div>

          <button 
            className="sidebar-logout-btn"
            onClick={() => {
              onLogout();
              navigate('/login');
            }}
            title="Log out"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Dashboard Area */}
      <div className="dashboard-main-content">
        {/* Top Navbar */}
        <header className="dashboard-topbar">
          <div className="topbar-welcome">
            <h3 style={{ margin: 0 }}>Good morning, {userProfile.name.split(' ')[0]} 🌸</h3>
            <span className="topbar-sub">EmpowerHer Dashboard • {userProfile.location}</span>
          </div>

          <div className="topbar-actions">
            {/* Rural Offline Mode Toggle */}
            <button 
              className="btn btn-sm"
              style={{
                background: isOffline ? '#ff6b6b' : '#f1f3f5',
                color: isOffline ? 'white' : '#495057',
                border: '1px solid #ced4da',
                borderRadius: '20px',
                padding: '6px 12px',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onClick={() => setIsOffline(!isOffline)}
              title={isOffline ? "Click to switch online" : "Click to simulate rural offline mode"}
            >
              {isOffline ? <WifiOff size={14} /> : <Wifi size={14} color="#0ca678" />}
              <span>{isOffline ? "Offline Mode" : "Online"}</span>
            </button>

            {/* 24/7 Helpline Button */}
            <button 
              className="btn btn-sm"
              style={{
                background: '#fff5f5',
                color: '#e03131',
                border: '1px solid #ffc9c9',
                borderRadius: '20px',
                padding: '6px 12px',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onClick={() => setShowHelplineModal(true)}
            >
              <PhoneCall size={14} />
              <span>SOS Helpline</span>
            </button>

            {/* Language Switcher */}
            <div className="lang-switcher-dropdown">
              <Globe size={15} color="#555" />
              <button 
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
              >
                EN
              </button>
              <button 
                className={`lang-btn ${lang === 'ta' ? 'active' : ''}`}
                onClick={() => setLang('ta')}
              >
                த
              </button>
              <button 
                className={`lang-btn ${lang === 'hi' ? 'active' : ''}`}
                onClick={() => setLang('hi')}
              >
                हि
              </button>
            </div>

            {/* Notifications Button */}
            <NavLink to="/notifications" className="icon-circle-btn">
              <Bell size={18} color="var(--primary)" />
              {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </NavLink>

            {/* Profile Avatar */}
            <div 
              className="topbar-profile-chip"
              onClick={() => navigate('/profile')}
            >
              <div className="user-avatar-circle small">
                {userProfile.name.charAt(0)}
              </div>
              <span className="chip-name">{userProfile.name}</span>
            </div>
          </div>
        </header>

        {/* Offline Banner when Offline Mode is Activated */}
        <OfflineBanner 
          isOffline={isOffline} 
          setIsOffline={setIsOffline} 
          offlineQueueCount={offlineQueueCount} 
          onSyncNow={onSyncNow} 
        />

        {/* Outlet for Dashboard Sub-pages */}
        <div className="dashboard-page-container">
          <Outlet />
        </div>
      </div>

      {/* Emergency Women Helpline Modal */}
      {showHelplineModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-container" style={{ maxWidth: '520px' }}>
            <div className="modal-header" style={{ background: '#e03131', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <PhoneCall size={22} color="white" />
                <h3 style={{ color: 'white', margin: 0 }}>24/7 Emergency Helplines & Legal Aid</h3>
              </div>
              <button className="modal-close-btn" style={{ color: 'white' }} onClick={() => setShowHelplineModal(false)}>✕</button>
            </div>

            <div className="modal-body" style={{ padding: '20px' }}>
              <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '16px' }}>
                Toll-free, confidential support services for women in distress, domestic safety, and legal guidance.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#fff5f5', border: '1px solid #ffc9c9', borderRadius: '10px' }}>
                  <div>
                    <strong style={{ display: 'block', color: '#c92a2a', fontSize: '1.05rem' }}>181 — Women Helpline (National)</strong>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>24/7 Emergency response, counselling & shelter support</span>
                  </div>
                  <a href="tel:181" className="btn btn-sm" style={{ background: '#e03131', color: 'white' }}>Call 181</a>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: '10px' }}>
                  <div>
                    <strong style={{ display: 'block', color: '#333', fontSize: '1.05rem' }}>1091 — Police Women Safety Desk</strong>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>Immediate police dispatch & distress intervention</span>
                  </div>
                  <a href="tel:1091" className="btn btn-sm btn-outline">Call 1091</a>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: '10px' }}>
                  <div>
                    <strong style={{ display: 'block', color: '#333', fontSize: '1.05rem' }}>15100 — Free Legal Services Authority</strong>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>Free legal advice for underprivileged women</span>
                  </div>
                  <a href="tel:15100" className="btn btn-sm btn-outline">Call 15100</a>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: '10px' }}>
                  <div>
                    <strong style={{ display: 'block', color: '#333', fontSize: '1.05rem' }}>1098 — Childline Support</strong>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>Girl child protection & education crisis helpline</span>
                  </div>
                  <a href="tel:1098" className="btn btn-sm btn-outline">Call 1098</a>
                </div>
              </div>
            </div>

            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => setShowHelplineModal(false)}>Close Window</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;

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
  ShieldCheck
} from 'lucide-react';

const DashboardLayout = ({ userProfile, lang, setLang, notifications, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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

        {/* Sidebar Footer Profile Card */}
        <div className="sidebar-footer-card">
          <div 
            className="user-profile-mini"
            onClick={() => { navigate('/profile'); handleNavClick(); }}
          >
            <div className="user-avatar-circle">
              {userProfile.name ? userProfile.name.charAt(0) : 'S'}
            </div>
            <div className="user-mini-info">
              <strong className="user-name-text">{userProfile.name}</strong>
              <div className="progress-mini-bar">
                <div 
                  className="fill-mini" 
                  style={{ width: `${userProfile.completeness}%` }}
                ></div>
              </div>
              <span className="completeness-mini-text">{userProfile.completeness}% Complete</span>
            </div>
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

        {/* Outlet for Dashboard Sub-pages */}
        <div className="dashboard-page-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

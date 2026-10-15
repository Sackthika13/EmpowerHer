import React from 'react';
import { 
  Globe, 
  Smartphone, 
  Building2, 
  Wifi, 
  WifiOff, 
  Bell, 
  UserCheck, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { translations } from '../data/translations';

const Header = ({
  lang,
  setLang,
  userMode,
  setUserMode,
  isOffline,
  setIsOffline,
  unreadCount,
  onOpenNotifications,
  userProfile,
  onOpenProfileModal,
  onOpenPanchayatPortal
}) => {
  const t = translations[lang] || translations.en;

  return (
    <header className="app-header">
      {/* Top Accessibility & System Banner */}
      <div className="top-system-bar">
        <div className="container top-bar-content">
          <div className="tagline-text">
            <span>🌸 {t.tagline}</span>
          </div>

          <div className="top-bar-controls">
            {/* User Entry Mode Toggle */}
            <div className="mode-toggle-group" title="Switch User Access Entry Mode">
              <button 
                className={`mode-btn ${userMode === 'smartphone' ? 'active' : ''}`}
                onClick={() => setUserMode('smartphone')}
              >
                <Smartphone size={14} /> {t.smartphoneMode}
              </button>
              <button 
                className={`mode-btn ${userMode === 'panchayat' ? 'active-panchayat' : ''}`}
                onClick={() => setUserMode('panchayat')}
              >
                <Building2 size={14} /> {t.panchayatMode}
              </button>
            </div>

            {/* Offline Simulation Toggle */}
            <button 
              className={`offline-pill ${isOffline ? 'offline' : 'online'}`}
              onClick={() => setIsOffline(!isOffline)}
              title="Click to simulate Offline / Rural internet mode"
            >
              {isOffline ? (
                <>
                  <WifiOff size={13} /> <span>{t.offlineStatus}</span>
                </>
              ) : (
                <>
                  <Wifi size={13} /> <span>{t.onlineStatus}</span>
                </>
              )}
            </button>

            {/* Language Selector */}
            <div className="language-selector">
              <Globe size={14} className="globe-icon" />
              <button 
                className={`lang-chip ${lang === 'en' ? 'selected' : ''}`}
                onClick={() => setLang('en')}
              >
                A English
              </button>
              <button 
                className={`lang-chip ${lang === 'ta' ? 'selected' : ''}`}
                onClick={() => setLang('ta')}
              >
                அ தமிழ்
              </button>
              <button 
                className={`lang-chip ${lang === 'hi' ? 'selected' : ''}`}
                onClick={() => setLang('hi')}
              >
                अ हिंदी
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="main-nav-container">
        <div className="container nav-flex">
          <div className="brand-logo-group">
            <div className="logo-icon-wrap">
              <span className="logo-symbol">🌸</span>
            </div>
            <div>
              <span className="logo-text">{t.title}</span>
              <span className="sub-logo-tag">Smart Women Empowerment System</span>
            </div>
          </div>

          <nav className="nav-links">
            <a href="#schemes">Schemes</a>
            <a href="#guided-app">Apply Online</a>
            <a href="#jobs">Jobs</a>
            <a href="#skills">Skill Learning</a>
            <a href="#locations">Help Centers</a>
            <a href="#tracker">Track Application</a>
          </nav>

          <div className="nav-actions">
            {/* Panchayat Portal Button if in Panchayat Mode */}
            {userMode === 'panchayat' && (
              <button 
                className="btn btn-panchayat-staff"
                onClick={onOpenPanchayatPortal}
              >
                <Building2 size={16} /> Panchayat Staff Portal
              </button>
            )}

            {/* Profile Status Button */}
            <button 
              className="btn btn-profile-chip"
              onClick={onOpenProfileModal}
            >
              <UserCheck size={16} color="var(--primary)" />
              <div className="profile-btn-info">
                <span className="user-name">{userProfile.name || 'User Profile'}</span>
                <span className="completion-badge">{userProfile.completeness}% Complete</span>
              </div>
            </button>

            {/* Notifications Bell */}
            <button 
              className="icon-circle-btn bell-btn"
              onClick={onOpenNotifications}
              title="Notifications & Reminders"
            >
              <Bell size={20} color="var(--primary)" />
              {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Banner Notice for Panchayat Assisted Mode */}
      {userMode === 'panchayat' && (
        <div className="panchayat-banner">
          <div className="container banner-inner">
            <ShieldCheck size={18} />
            <span>
              <strong>Panchayat Office Mode Active:</strong> Staff-assisted portal enabled for offline registration, manual document validation, and summary printing for women without smartphones.
            </span>
            <button className="banner-link-btn" onClick={onOpenPanchayatPortal}>
              Open Staff Portal →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

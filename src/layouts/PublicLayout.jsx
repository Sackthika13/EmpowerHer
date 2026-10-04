import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Sparkles, Globe, User, ArrowRight } from 'lucide-react';

const PublicLayout = ({ lang, setLang }) => {

  return (
    <div className="public-app-layout">
      {/* Top Header */}
      <header className="public-header">
        <div className="container header-content">
          <NavLink to="/" className="brand-logo-group" style={{ textDecoration: 'none' }}>
            <span className="logo-symbol">🌸</span>
            <div>
              <span className="logo-text">EmpowerHer</span>
              <span className="sub-logo-tag">Welfare & Employment Platform</span>
            </div>
          </NavLink>

          <div className="public-nav-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/assessment">Smart Assessment</NavLink>
            <NavLink to="/schemes">Explore Schemes</NavLink>
          </div>

          <div className="public-actions">
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
                அ हिंदी
              </button>
            </div>

            <NavLink to="/login" className="btn btn-outline btn-sm">
              <User size={15} /> Sign In
            </NavLink>
            <NavLink to="/assessment" className="btn btn-primary btn-sm">
              Start Assessment <ArrowRight size={14} />
            </NavLink>
          </div>
        </div>
      </header>

      {/* Main Outlet */}
      <div className="public-main-content">
        <Outlet />
      </div>

      {/* Minimal Footer */}
      <footer className="public-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="logo-text" style={{ color: 'white', fontSize: '1.5rem' }}>🌸 EmpowerHer</div>
            <p className="footer-tagline">
              Your Benefits. Your Opportunities. Your Future. A smart accessibility platform for women welfare & employment support.
            </p>
          </div>

          <div className="footer-links-col">
            <h4>Platform</h4>
            <NavLink to="/assessment">Smart Assessment</NavLink>
            <NavLink to="/schemes">Scheme Directory</NavLink>
            <NavLink to="/jobs">Job Opportunities</NavLink>
            <NavLink to="/skills">Skill Courses</NavLink>
          </div>

          <div className="footer-links-col">
            <h4>Support</h4>
            <NavLink to="/help-centers">Help Centers</NavLink>
            <NavLink to="/documents">Document Assistant</NavLink>
            <NavLink to="/voice">Voice Assistant</NavLink>
          </div>

          <div className="footer-links-col">
            <h4>Accessibility</h4>
            <span>Languages: Tamil • Hindi • English</span>
            <span>Simple Explanation Mode</span>
            <span>Offline Ready</span>
          </div>
        </div>

        <div className="footer-bottom text-center">
          <p>© 2026 EmpowerHer Initiative. Holistic support for every woman.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;

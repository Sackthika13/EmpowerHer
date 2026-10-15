import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  UserCheck, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Clock, 
  Globe, 
  Mic, 
  ShieldCheck, 
  Building, 
  Zap, 
  Layers
} from 'lucide-react';
import heroImg from '../assets/images/hero.png';

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      {/* 1. HERO SECTION */}
      <section className="hero-public-section container">
        <div className="hero-text-col">
          <span className="feature-pill-tag">
            <Sparkles size={14} /> Smart Women Empowerment System
          </span>
          <h1 className="hero-heading">
            Your Benefits.<br />Your Opportunities.<br />Your Future.
          </h1>
          <p className="hero-subtext">
            One simple platform to discover welfare schemes, employment opportunities, and skill development support designed for every woman.
          </p>

          <div className="hero-cta-group">
            <NavLink to="/assessment" className="btn btn-primary btn-large">
              <Sparkles size={18} /> Start Smart Assessment
            </NavLink>
            <NavLink to="/schemes" className="btn btn-outline btn-large">
              Explore Schemes <ArrowRight size={18} />
            </NavLink>
          </div>

          <div className="hero-trust-row">
            <div className="trust-item"><ShieldCheck size={16} color="var(--primary)" /> 100% Free & Verified</div>
            <div className="trust-item"><Globe size={16} color="var(--secondary)" /> Tamil • Hindi • English</div>
            <div className="trust-item"><Mic size={16} color="var(--accent-teal)" /> Voice Enabled</div>
          </div>
        </div>

        <div className="hero-visual-col">
          <div className="dashboard-preview-frame glass-card">
            <img src={heroImg} alt="EmpowerHer System Preview" className="hero-graphic" />
            <div className="floating-badge badge-1">
              <CheckCircle2 size={18} color="#2ec4b6" /> 98% AI Scheme Match
            </div>
            <div className="floating-badge badge-2">
              <FileText size={18} color="var(--primary)" /> Instant Document OCR
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (4 CLEAN STEPS) */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="section-header text-center">
            <span className="feature-pill-tag">Simple & Transparent</span>
            <h2>How EmpowerHer Works</h2>
            <p className="section-desc">Four effortless steps to unlock your government benefits and career growth.</p>
          </div>

          <div className="how-it-works-grid">
            <div className="step-card glass-card">
              <div className="step-number-circle">1</div>
              <h3>Create Profile</h3>
              <p>Fill basic info or scan your Aadhaar with our AI Document OCR tool.</p>
            </div>

            <div className="step-card glass-card">
              <div className="step-number-circle">2</div>
              <h3>Get Matched</h3>
              <p>Our rule engine checks 50+ schemes and ranks your exact eligibility score.</p>
            </div>

            <div className="step-card glass-card">
              <div className="step-number-circle">3</div>
              <h3>Apply Easily</h3>
              <p>Follow guided 5-step application forms with automated document checks.</p>
            </div>

            <div className="step-card glass-card">
              <div className="step-number-circle">4</div>
              <h3>Track Progress</h3>
              <p>Monitor verification stages in real-time until benefit disbursement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SMART FEATURES (6 COMPACT CARDS LINKING TO PAGES) */}
      <section className="section-padding container">
        <div className="section-header text-center">
          <span className="feature-pill-tag">Core Software Modules</span>
          <h2>Explore Platform Features</h2>
          <p className="section-desc">Click any card below to navigate directly to that dedicated feature.</p>
        </div>

        <div className="features-compact-grid">
          <NavLink to="/assessment" className="feature-compact-card glass-card hover-lift">
            <div className="feature-icon-box" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <Sparkles size={24} />
            </div>
            <h3>Smart Eligibility</h3>
            <p>Rule-based AI matching against age, income, and education rules.</p>
            <span className="card-link-text">Take Assessment →</span>
          </NavLink>

          <NavLink to="/voice" className="feature-compact-card glass-card hover-lift">
            <div className="feature-icon-box" style={{ background: 'var(--secondary-light)', color: 'var(--secondary)' }}>
              <Mic size={24} />
            </div>
            <h3>Voice Assistance</h3>
            <p>Speak in Tamil, Hindi, or English for accessible audio support.</p>
            <span className="card-link-text">Talk to Voice Bot →</span>
          </NavLink>

          <NavLink to="/documents" className="feature-compact-card glass-card hover-lift">
            <div className="feature-icon-box" style={{ background: '#e6fcf5', color: '#0ca678' }}>
              <FileText size={24} />
            </div>
            <h3>Document Assistant</h3>
            <p>OCR scanning & instant document completeness status checks.</p>
            <span className="card-link-text">Upload Documents →</span>
          </NavLink>

          <NavLink to="/jobs" className="feature-compact-card glass-card hover-lift">
            <div className="feature-icon-box" style={{ background: '#fff9db', color: '#f59f00' }}>
              <Briefcase size={24} />
            </div>
            <h3>Job Opportunities</h3>
            <p>Verified local, remote, and work-from-home employment listings.</p>
            <span className="card-link-text">Browse Jobs →</span>
          </NavLink>

          <NavLink to="/skills" className="feature-compact-card glass-card hover-lift">
            <div className="feature-icon-box" style={{ background: '#f3e8ff', color: '#7012ce' }}>
              <GraduationCap size={24} />
            </div>
            <h3>Skill Learning</h3>
            <p>Structured video courses, profit calculator & skill certificates.</p>
            <span className="card-link-text">Start Learning →</span>
          </NavLink>

          <NavLink to="/tracker" className="feature-compact-card glass-card hover-lift">
            <div className="feature-icon-box" style={{ background: '#e7f5ff', color: '#1c7ed6' }}>
              <Clock size={24} />
            </div>
            <h3>Application Tracking</h3>
            <p>Real-time timeline monitor for submitted scheme applications.</p>
            <span className="card-link-text">Track Status →</span>
          </NavLink>
        </div>
      </section>

      {/* 4. ACCESSIBILITY SECTION */}
      <section className="section-padding bg-light">
        <div className="container accessibility-banner-grid glass-card">
          <div className="acc-info">
            <span className="feature-pill-tag">Accessibility First</span>
            <h2>Designed for Inclusion & Rural Access</h2>
            <p>
              EmpowerHer is built to ensure every woman—whether with a smartphone or visiting a rural Panchayat kiosk—can easily access welfare schemes.
            </p>
            <ul className="acc-bullets-list">
              <li><strong>Multi-Language:</strong> Native support for Tamil, Hindi, and English.</li>
              <li><strong>Voice Commands:</strong> Integrated Speech-to-Text for effortless query typing.</li>
              <li><strong>Simple Explanation Mode:</strong> Plain language document & eligibility rules.</li>
              <li><strong>Offline Friendly:</strong> Local storage caching for zero-internet rural camps.</li>
            </ul>
          </div>

          <div className="acc-badge-box text-center">
            <Globe size={64} color="var(--primary)" style={{ marginBottom: '16px' }} />
            <h3>Accessibility Certified</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Panchayat Staff Kiosk Mode Available</p>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="final-cta-section">
        <div className="container text-center">
          <h2>Start your EmpowerHer journey today.</h2>
          <p style={{ maxWidth: '600px', margin: '10px auto 30px', color: 'rgba(255,255,255,0.9)' }}>
            Discover personalized schemes, upgrade your skills, and secure your financial future in minutes.
          </p>
          <NavLink to="/assessment" className="btn btn-large" style={{ background: 'white', color: 'var(--primary)', padding: '16px 40px', fontSize: '1.1rem' }}>
            <Sparkles size={20} /> Start Smart Assessment
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

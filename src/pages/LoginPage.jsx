import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, ShieldCheck, UserCheck, Sparkles } from 'lucide-react';

const LoginPage = ({ userProfile, onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('selvi.k@empowerher.org');
  const [password, setPassword] = useState('demo123');
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess();
    navigate('/dashboard');
  };

  const handleGuestLogin = () => {
    onLoginSuccess();
    navigate('/dashboard');
  };

  return (
    <div className="login-page-container">
      <div className="container login-flex-wrap">
        {/* Left Info Panel */}
        <div className="login-info-card glass-card">
          <div className="brand-logo-group" style={{ marginBottom: '24px' }}>
            <span className="logo-symbol">🌸</span>
            <div>
              <span className="logo-text">EmpowerHer</span>
              <span className="sub-logo-tag">Smart Women System</span>
            </div>
          </div>

          <h2>Welcome to EmpowerHer SaaS</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            Access personalized government welfare schemes, job listings, and skill courses with instant document OCR verification.
          </p>

          {/* Demo User Card */}
          <div className="demo-user-box">
            <div className="demo-user-header">
              <Sparkles size={16} color="var(--primary)" />
              <strong>Demo User Account</strong>
            </div>
            <div className="demo-user-details">
              <div className="avatar-circle-demo">{userProfile.name.charAt(0)}</div>
              <div>
                <strong className="demo-name">{userProfile.name}</strong>
                <span className="demo-sub">{userProfile.age} yrs • {userProfile.location}</span>
                <span className="demo-badge">✓ {userProfile.completeness}% Profile Complete</span>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '16px' }}>
            🔒 Note: backend authentication is currently operating in local demo mode for presentation purposes.
          </p>
        </div>

        {/* Right Form Card */}
        <div className="login-form-card glass-card">
          <div className="form-header">
            <h3>{isRegister ? "Create New Account" : "Sign In to Your Account"}</h3>
            <span className="sub-text">Enter your credentials or continue as guest demo user</span>
          </div>

          <form onSubmit={handleLoginSubmit} className="auth-form" style={{ marginTop: '20px' }}>
            <div className="form-group">
              <label><User size={14} /> Email / Phone Number</label>
              <input 
                type="text" 
                className="form-input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="selvi.k@empowerher.org"
              />
            </div>

            <div className="form-group" style={{ marginTop: '14px' }}>
              <label><Lock size={14} /> Password</label>
              <input 
                type="password" 
                className="form-input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-large" style={{ marginTop: '24px' }}>
              {isRegister ? "Register & Enter Dashboard" : "Sign In to Dashboard"} <ArrowRight size={18} />
            </button>
          </form>

          <div className="or-divider">
            <span>OR</span>
          </div>

          <button 
            type="button"
            className="btn btn-outline btn-block"
            onClick={handleGuestLogin}
          >
            <UserCheck size={18} color="var(--primary)" /> Continue as Guest (Selvi K.)
          </button>

          <div style={{ marginTop: '20px', textCenter: 'center', fontSize: '0.9rem', color: '#666', textAlign: 'center' }}>
            {isRegister ? (
              <span>Already have an account? <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setIsRegister(false)}>Sign In</button></span>
            ) : (
              <span>Don't have an account? <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setIsRegister(true)}>Create Account</button></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

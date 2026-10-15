import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  UserCheck, 
  Building, 
  Clock, 
  GraduationCap, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  PlayCircle, 
  Info,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Wallet
} from 'lucide-react';
import { schemes } from '../data/SchemeDatabase';
import { skillCourses } from '../data/SkillCourses';
import ModalEligibilityExplanation from '../components/ModalEligibilityExplanation';

const DashboardHome = ({ userProfile, applications }) => {
  const navigate = useNavigate();
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState(null);

  // Pick top 3 recommendations
  const topRecommendations = schemes.slice(0, 3);
  const activeApp = applications.length > 0 ? applications[0] : null;
  const learningCourse = skillCourses[0];

  const handleApplyScheme = (scheme) => {
    navigate(`/apply/${scheme.id}`);
  };

  return (
    <div className="dashboard-home-page">
      {/* Welcome Banner Header */}
      <div className="dash-welcome-banner glass-card">
        <div className="welcome-text">
          <h1>Good morning, {userProfile.name.split(' ')[0]} 🌸</h1>
          <p>Let's find opportunities made for you based on your verified profile.</p>
        </div>
        <NavLink to="/assessment" className="btn btn-primary btn-sm">
          <Sparkles size={16} /> Re-Run Smart Assessment
        </NavLink>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="dash-metrics-grid">
        <div className="metric-card glass-card hover-lift" onClick={() => navigate('/profile')}>
          <div className="metric-icon-wrap" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            <UserCheck size={22} />
          </div>
          <div>
            <span className="metric-title">Profile Completion</span>
            <strong className="metric-value">{userProfile.completeness}%</strong>
          </div>
          <span className="metric-link">Complete Profile →</span>
        </div>

        <div className="metric-card glass-card hover-lift" onClick={() => navigate('/schemes')}>
          <div className="metric-icon-wrap" style={{ background: 'var(--secondary-light)', color: 'var(--secondary)' }}>
            <Building size={22} />
          </div>
          <div>
            <span className="metric-title">Scheme Matches</span>
            <strong className="metric-value">{schemes.length} Available</strong>
          </div>
          <span className="metric-link">View Matches →</span>
        </div>

        <div className="metric-card glass-card hover-lift" onClick={() => navigate('/tracker')}>
          <div className="metric-icon-wrap" style={{ background: '#e7f5ff', color: '#1c7ed6' }}>
            <Clock size={22} />
          </div>
          <div>
            <span className="metric-title">Active Applications</span>
            <strong className="metric-value">{applications.length} Submitted</strong>
          </div>
          <span className="metric-link">Track Applications →</span>
        </div>

        <div className="metric-card glass-card hover-lift" onClick={() => navigate('/skills')}>
          <div className="metric-icon-wrap" style={{ background: '#e6fcf5', color: '#0ca678' }}>
            <GraduationCap size={22} />
          </div>
          <div>
            <span className="metric-title">Skill Progress</span>
            <strong className="metric-value">65% Overall</strong>
          </div>
          <span className="metric-link">Continue Learning →</span>
        </div>
      </div>

      {/* NEW FEATURE: Grant & Subsidy Financial Impact Estimator */}
      <div className="glass-card" style={{ marginTop: '30px', padding: '24px', background: 'linear-gradient(135deg, rgba(112, 18, 206, 0.04), rgba(255, 77, 109, 0.08))', border: '1px solid rgba(112, 18, 206, 0.15)', borderRadius: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'var(--primary)', color: 'white', padding: '8px', borderRadius: '10px', display: 'flex' }}>
              <Wallet size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-dark)' }}>Estimated Financial Entitlement & Direct Grants</h3>
              <p className="sub-text" style={{ margin: 0 }}>Based on your profile ({userProfile.age} yrs, {userProfile.education}, {userProfile.location})</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.82rem', color: '#666', display: 'block' }}>Potential Annual Benefit</span>
            <strong style={{ fontSize: '1.6rem', color: 'var(--primary)', fontWeight: '800' }}>₹71,000 / yr</strong>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div style={{ background: 'white', padding: '14px', borderRadius: '10px', border: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>Monthly Direct DBT</span>
              <span className="status-badge status-eligible" style={{ fontSize: '0.72rem', padding: '2px 6px' }}>Verified</span>
            </div>
            <strong style={{ fontSize: '1.15rem', color: '#2b8a3e' }}>₹1,000 / month</strong>
            <div style={{ fontSize: '0.78rem', color: '#555', marginTop: '4px' }}>Pudhumai Penn Higher Education Grant</div>
          </div>

          <div style={{ background: 'white', padding: '14px', borderRadius: '10px', border: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>Livelihood Capital Subsidy</span>
              <span className="status-badge status-eligible" style={{ fontSize: '0.72rem', padding: '2px 6px' }}>Eligible</span>
            </div>
            <strong style={{ fontSize: '1.15rem', color: 'var(--secondary)' }}>Up to ₹35,000</strong>
            <div style={{ fontSize: '0.78rem', color: '#555', marginTop: '4px' }}>SEWA Machinery & Equipment Grant</div>
          </div>

          <div style={{ background: 'white', padding: '14px', borderRadius: '10px', border: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>Tuition Fee Concession</span>
              <span className="status-badge status-possibly" style={{ fontSize: '0.72rem', padding: '2px 6px' }}>Needs TC</span>
            </div>
            <strong style={{ fontSize: '1.15rem', color: '#1c7ed6' }}>100% Free Tuition</strong>
            <div style={{ fontSize: '0.78rem', color: '#555', marginTop: '4px' }}>First Graduate College Concession</div>
          </div>

          <div style={{ background: 'white', padding: '14px', borderRadius: '10px', border: '1px solid #eee', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#666', marginBottom: '6px' }}>Financial Advisory</span>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/assessment')}>
              <TrendingUp size={14} /> Optimize Grants
            </button>
          </div>
        </div>
      </div>

      {/* Recommended For You (3 Cards) */}
      <div className="dash-section-wrap" style={{ marginTop: '30px' }}>
        <div className="dash-section-header">
          <div>
            <h2>Recommended For You</h2>
            <span className="sub-text">Top 3 high-probability match schemes for {userProfile.location}</span>
          </div>
          <NavLink to="/schemes" className="view-all-link">View All {schemes.length} Schemes →</NavLink>
        </div>

        <div className="recommendations-grid">
          {topRecommendations.map((scheme) => (
            <div key={scheme.id} className="rec-card glass-card hover-lift">
              <div className="rec-card-top">
                <span className="scheme-cat-tag">{scheme.category}</span>
                <span className="match-score-pill">{scheme.matchScore}% Match</span>
              </div>

              <h3 className="rec-title">{scheme.title}</h3>
              <p className="rec-benefit"><strong>Grant:</strong> {scheme.benefit}</p>

              <div className="rec-status-row">
                <span className="status-badge status-eligible">
                  <CheckCircle size={13} /> {scheme.status}
                </span>
                <span className="region-text">Region: {scheme.region}</span>
              </div>

              <div className="rec-actions">
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => setSelectedSchemeForModal(scheme)}
                >
                  <Info size={14} /> View Details
                </button>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => handleApplyScheme(scheme)}
                >
                  Apply <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Application Preview */}
      {activeApp && (
        <div className="dash-section-wrap" style={{ marginTop: '35px' }}>
          <div className="dash-section-header">
            <div>
              <h2>Your Active Application</h2>
              <span className="sub-text">Real-time status overview</span>
            </div>
            <NavLink to="/tracker" className="view-all-link">Full Application History →</NavLink>
          </div>

          <div className="active-app-preview-card glass-card">
            <div className="app-preview-top">
              <div>
                <span className="app-id-badge">ID: {activeApp.appId}</span>
                <h3 style={{ margin: '4px 0' }}>{activeApp.schemeTitle}</h3>
                <span className="sub-text">Submitted on: {activeApp.submittedDate}</span>
              </div>
              <span className="status-pill status-under-verification">
                ● {activeApp.status}
              </span>
            </div>

            {/* Compact Progress Line */}
            <div className="compact-progress-row" style={{ marginTop: '16px' }}>
              <div className="progress-node active">1. Submitted ✓</div>
              <div className="progress-line active"></div>
              <div className="progress-node active">2. Verification ⚙</div>
              <div className="progress-line"></div>
              <div className="progress-node">3. Approval</div>
            </div>
          </div>
        </div>
      )}

      {/* Continue Learning Preview */}
      <div className="dash-section-wrap" style={{ marginTop: '35px' }}>
        <div className="dash-section-header">
          <div>
            <h2>Continue Learning</h2>
            <span className="sub-text">Resume your skill courses</span>
          </div>
          <NavLink to="/skills" className="view-all-link">Browse All Courses →</NavLink>
        </div>

        <div className="learning-preview-card glass-card hover-lift" onClick={() => navigate('/skills')}>
          <div className="learning-thumb">
            <img src={learningCourse.image} alt={learningCourse.title} />
            <PlayCircle size={36} color="white" className="play-icon-overlay" />
          </div>

          <div className="learning-content">
            <span className="course-cat-tag">{learningCourse.category}</span>
            <h3>{learningCourse.title}</h3>
            <p className="instructor-text">Lesson 3: Applying for Govt Schemes Online</p>

            <div className="course-progress-wrap">
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${learningCourse.progress}%` }}></div>
              </div>
              <span className="progress-num-text">{learningCourse.progress}% Complete</span>
            </div>
          </div>

          <button className="btn btn-primary btn-sm">
            Resume <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Modal Detail View */}
      {selectedSchemeForModal && (
        <ModalEligibilityExplanation 
          scheme={selectedSchemeForModal}
          userProfile={userProfile}
          isOpen={!!selectedSchemeForModal}
          onClose={() => setSelectedSchemeForModal(null)}
          onApply={handleApplyScheme}
        />
      )}
    </div>
  );
};

export default DashboardHome;

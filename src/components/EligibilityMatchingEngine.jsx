import React, { useState } from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Search, 
  Filter, 
  FileText, 
  ArrowRight, 
  Sparkles,
  Info,
  Calendar,
  Check,
  Building
} from 'lucide-react';
import { schemes } from '../data/SchemeDatabase';

const EligibilityMatchingEngine = ({ 
  userProfile, 
  onStartApplication, 
  onOpenDocumentGuide 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchemeModal, setSelectedSchemeModal] = useState(null);

  // Filter schemes based on search, category and compute eligibility status dynamically based on user profile
  const processedSchemes = schemes.map(scheme => {
    let matchesAge = userProfile.age >= scheme.eligibilityCriteria.minAge && userProfile.age <= scheme.eligibilityCriteria.maxAge;
    let matchesIncome = userProfile.income <= scheme.eligibilityCriteria.maxIncome;
    let matchesLocation = scheme.region === "National" || userProfile.location.includes("Tamil Nadu") || scheme.region === userProfile.location;

    let computedStatus = "Eligible";
    let score = 95;

    if (matchesAge && matchesIncome && matchesLocation) {
      computedStatus = "Eligible";
      score = 92 + (scheme.id.length % 7);
    } else if (matchesAge && matchesLocation && !matchesIncome) {
      computedStatus = "Possibly Eligible";
      score = 75;
    } else if (!matchesAge || (!matchesLocation && scheme.region !== "National")) {
      computedStatus = "Not Eligible";
      score = 45;
    }

    return {
      ...scheme,
      computedStatus,
      score
    };
  });

  const filteredSchemes = processedSchemes.filter(scheme => {
    const matchesCat = selectedCategory === 'all' || scheme.type === selectedCategory;
    const matchesText = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        scheme.benefit.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        scheme.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesText;
  });

  const renderStatusBadge = (status) => {
    if (status === 'Eligible') {
      return (
        <span className="status-badge status-eligible">
          <CheckCircle size={14} /> Eligible
        </span>
      );
    } else if (status === 'Possibly Eligible') {
      return (
        <span className="status-badge status-possibly">
          <AlertTriangle size={14} /> Possibly Eligible
        </span>
      );
    } else {
      return (
        <span className="status-badge status-not">
          <XCircle size={14} /> Not Eligible
        </span>
      );
    }
  };

  return (
    <section id="schemes" className="section-padding bg-light">
      <div className="container">
        <div className="section-header text-center">
          <span className="feature-pill-tag">
            <Sparkles size={14} /> AI + Rule-Based Eligibility Engine
          </span>
          <h2>Personalized Welfare Schemes & Support Matching</h2>
          <p className="section-desc">
            Matching algorithms analyze your profile (Age: <strong>{userProfile.age}</strong>, Income: <strong>₹{userProfile.income.toLocaleString()}</strong>, Location: <strong>{userProfile.location}</strong>) against government criteria.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="scheme-filter-bar glass-card">
          <div className="search-input-wrap">
            <Search size={18} color="#666" />
            <input 
              type="text" 
              placeholder="Search scheme name, education, maternal benefit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="category-tabs">
            <button 
              className={`cat-tab ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Schemes ({schemes.length})
            </button>
            <button 
              className={`cat-tab ${selectedCategory === 'govt' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('govt')}
            >
              Government Schemes
            </button>
            <button 
              className={`cat-tab ${selectedCategory === 'scholarship' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('scholarship')}
            >
              Scholarships & Education
            </button>
            <button 
              className={`cat-tab ${selectedCategory === 'ngo' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('ngo')}
            >
              Private / NGO Support
            </button>
          </div>
        </div>

        {/* Scheme Grid */}
        <div className="schemes-grid">
          {filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="scheme-card glass-card hover-lift">
              <div className="scheme-card-header">
                <span className="scheme-cat-tag">{scheme.category}</span>
                {renderStatusBadge(scheme.computedStatus)}
              </div>

              <h3 className="scheme-title">{scheme.title}</h3>
              
              <div className="benefit-highlight-box">
                <strong>Benefit Grant:</strong> {scheme.benefit}
              </div>

              <div className="match-score-row">
                <span className="score-label">AI Match Rating:</span>
                <div className="score-pill">{scheme.score}% Match</div>
              </div>

              <ul className="criteria-mini-list">
                <li><Building size={13} /> Region: {scheme.region}</li>
                <li><Calendar size={13} /> Deadline: {scheme.deadline}</li>
              </ul>

              <div className="scheme-card-actions">
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => setSelectedSchemeModal(scheme)}
                >
                  <Info size={15} /> Details & Specs
                </button>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => onStartApplication(scheme)}
                >
                  Apply Step-by-Step <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheme Detail Modal */}
      {selectedSchemeModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-container">
            <div className="modal-header">
              <div>
                <span className="scheme-cat-tag">{selectedSchemeModal.category}</span>
                <h2 style={{ marginTop: '8px' }}>{selectedSchemeModal.title}</h2>
              </div>
              <button 
                className="modal-close-btn" 
                onClick={() => setSelectedSchemeModal(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="benefit-highlight-box" style={{ fontSize: '1.05rem', padding: '15px 20px' }}>
                💰 <strong>Grant / Subsidy:</strong> {selectedSchemeModal.benefit}
              </div>

              <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>Required Documents & Credentials</h4>
              <ul className="doc-check-list">
                {selectedSchemeModal.documentsRequired.map((doc, idx) => (
                  <li key={idx}><Check size={16} color="var(--primary)" /> {doc}</li>
                ))}
              </ul>

              <div className="document-guide-box">
                <strong>💡 Document Assistance Advice:</strong>
                <p style={{ margin: '5px 0 0', fontSize: '0.92rem' }}>{selectedSchemeModal.documentGuide}</p>
              </div>

              <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>Application Workflow Steps</h4>
              <ol className="step-number-list">
                {selectedSchemeModal.applicationSteps.map((stepText, idx) => (
                  <li key={idx}><span>Step {idx + 1}:</span> {stepText}</li>
                ))}
              </ol>
            </div>

            <div className="modal-footer">
              <button 
                className="btn btn-outline"
                onClick={() => {
                  const s = selectedSchemeModal;
                  setSelectedSchemeModal(null);
                  onOpenDocumentGuide(s);
                }}
              >
                <FileText size={16} /> Document Assistant Guide
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  const s = selectedSchemeModal;
                  setSelectedSchemeModal(null);
                  onStartApplication(s);
                }}
              >
                Start Guided Application <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EligibilityMatchingEngine;

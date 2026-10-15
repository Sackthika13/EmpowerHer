import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Building, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  Info, 
  ExternalLink,
  Calendar,
  ShieldCheck,
  Check
} from 'lucide-react';
import { schemes } from '../data/SchemeDatabase';
import ModalEligibilityExplanation from '../components/ModalEligibilityExplanation';

const SchemesPage = ({ userProfile }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedSchemeDetail, setSelectedSchemeDetail] = useState(null);
  const [selectedSchemeCheckEligibility, setSelectedSchemeCheckEligibility] = useState(null);

  const categories = [
    "All", 
    "Government Schemes", 
    "Scholarships", 
    "Women Entrepreneurship", 
    "Education", 
    "Financial Support"
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          scheme.benefit.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          scheme.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
    const matchesState = selectedState === 'All' || scheme.region === 'National' || scheme.region === selectedState;
    return matchesSearch && matchesCategory && matchesState;
  });

  const handleApply = (scheme) => {
    navigate(`/apply/${scheme.id}`);
  };

  return (
    <div className="schemes-page-container">
      <div className="page-header-title">
        <h2>Government Schemes & Welfare Database</h2>
        <p className="subtitle-text">Browse, search, and verify eligibility for all national and state schemes.</p>
      </div>

      {/* Search & Filter Control Panel */}
      <div className="filter-panel-card glass-card">
        <div className="search-bar-wrap">
          <Search size={18} color="#666" />
          <input 
            type="text" 
            placeholder="Search scheme by name, education grant, loan, Pudhumai Penn..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-controls-row">
          <div className="filter-group">
            <label><Filter size={14} /> Category:</label>
            <select 
              className="form-input" 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>State / Region:</label>
            <select 
              className="form-input" 
              value={selectedState} 
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="All">All Regions</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="National">National (All India)</option>
            </select>
          </div>

          <span className="results-count-pill">{filteredSchemes.length} Schemes Found</span>
        </div>
      </div>

      {/* Scheme Cards Grid */}
      <div className="schemes-grid" style={{ marginTop: '24px' }}>
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="scheme-card glass-card hover-lift">
            <div className="scheme-card-header">
              <span className="scheme-cat-tag">{scheme.category}</span>
              <span className="status-badge status-eligible">
                <CheckCircle size={13} /> Eligible
              </span>
            </div>

            <h3 className="scheme-title">{scheme.title}</h3>
            
            <div className="benefit-highlight-box">
              <strong>Grant / Subsidy:</strong> {scheme.benefit}
            </div>

            <p style={{ fontSize: '0.88rem', color: '#666', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {scheme.description}
            </p>

            <div className="criteria-mini-list" style={{ marginBottom: '16px' }}>
              <span>Region: <strong>{scheme.region}</strong></span>
              <span>Deadline: <strong>{scheme.deadline}</strong></span>
            </div>

            <div className="scheme-card-actions">
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => setSelectedSchemeCheckEligibility(scheme)}
              >
                <ShieldCheck size={14} color="var(--primary)" /> Check My Eligibility
              </button>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => setSelectedSchemeDetail(scheme)}
              >
                View Specs & Apply
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Scheme Detail View Modal */}
      {selectedSchemeDetail && (
        <div className="modal-overlay">
          <div className="glass-card modal-container modal-large">
            <div className="modal-header">
              <div>
                <span className="scheme-cat-tag">{selectedSchemeDetail.category}</span>
                <h2 style={{ marginTop: '6px' }}>{selectedSchemeDetail.title}</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedSchemeDetail(null)}>✕</button>
            </div>

            <div className="modal-body">
              <p style={{ fontSize: '1rem', color: '#444', marginBottom: '16px' }}>
                {selectedSchemeDetail.description}
              </p>

              <div className="benefit-highlight-box" style={{ padding: '16px 20px', fontSize: '1.05rem' }}>
                💰 <strong>Benefit Grant:</strong> {selectedSchemeDetail.benefit}
              </div>

              <h4 style={{ marginTop: '20px', marginBottom: '8px' }}>Mandatory Required Documents</h4>
              <ul className="doc-check-list">
                {selectedSchemeDetail.documentsRequired.map((doc, idx) => (
                  <li key={idx}><Check size={16} color="var(--primary)" /> {doc}</li>
                ))}
              </ul>

              <h4 style={{ marginTop: '20px', marginBottom: '8px' }}>Application Workflow Steps</h4>
              <ol className="step-number-list">
                {selectedSchemeDetail.applicationProcess.map((stepTxt, idx) => (
                  <li key={idx}><span>Step {idx + 1}:</span> {stepTxt}</li>
                ))}
              </ol>

              {selectedSchemeDetail.officialLink && (
                <div style={{ marginTop: '20px' }}>
                  <a 
                    href={selectedSchemeDetail.officialLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-link-btn"
                    style={{ fontSize: '0.9rem' }}
                  >
                    Official Portal Source ({selectedSchemeDetail.officialLink}) <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button 
                className="btn btn-outline"
                onClick={() => {
                  const s = selectedSchemeDetail;
                  setSelectedSchemeDetail(null);
                  setSelectedSchemeCheckEligibility(s);
                }}
              >
                <ShieldCheck size={16} /> Check My Eligibility Rules
              </button>

              <button 
                className="btn btn-primary"
                onClick={() => {
                  const s = selectedSchemeDetail;
                  setSelectedSchemeDetail(null);
                  handleApply(s);
                }}
              >
                Start Guided Application <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Smart Eligibility Explanation Modal */}
      {selectedSchemeCheckEligibility && (
        <ModalEligibilityExplanation 
          scheme={selectedSchemeCheckEligibility}
          userProfile={userProfile}
          isOpen={!!selectedSchemeCheckEligibility}
          onClose={() => setSelectedSchemeCheckEligibility(null)}
          onApply={handleApply}
        />
      )}
    </div>
  );
};

export default SchemesPage;

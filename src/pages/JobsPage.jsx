import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Search, 
  Filter, 
  Bookmark, 
  Share2, 
  ArrowRight, 
  CheckCircle, 
  Building, 
  Award, 
  X
} from 'lucide-react';
import { jobs } from '../data/JobListings';

const JobsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkType, setSelectedWorkType] = useState('All');
  const [selectedJobType, setSelectedJobType] = useState('All');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'saved'
  const [savedJobIds, setSavedJobIds] = useState(['job-1']);
  const [selectedJobModal, setSelectedJobModal] = useState(null);

  const toggleSaveJob = (jobId) => {
    setSavedJobIds(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWork = selectedWorkType === 'All' || job.workType === selectedWorkType;
    const matchesType = selectedJobType === 'All' || job.jobType === selectedJobType;
    const matchesSaved = activeTab === 'all' || savedJobIds.includes(job.id);
    return matchesSearch && matchesWork && matchesType && matchesSaved;
  });

  return (
    <div className="jobs-page-container">
      <div className="page-header-title">
        <h2>Verified Job Listings for Women</h2>
        <p className="subtitle-text">Discover local, hybrid, and remote career opportunities tailored for women.</p>
      </div>

      {/* Tabs & Search Bar */}
      <div className="filter-panel-card glass-card">
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
            style={{ borderRadius: '20px', padding: '6px 18px' }}
          >
            All Listings ({jobs.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
            style={{ borderRadius: '20px', padding: '6px 18px' }}
          >
            Saved Jobs ({savedJobIds.length})
          </button>
        </div>

        <div className="search-bar-wrap">
          <Search size={18} color="#666" />
          <input 
            type="text" 
            placeholder="Search job title, company, teacher, customer support..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-controls-row">
          <div className="filter-group">
            <label>Work Location:</label>
            <select className="form-input" value={selectedWorkType} onChange={(e) => setSelectedWorkType(e.target.value)}>
              <option value="All">All Location Types</option>
              <option value="Remote">Work from Home (Remote)</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Employment Type:</label>
            <select className="form-input" value={selectedJobType} onChange={(e) => setSelectedJobType(e.target.value)}>
              <option value="All">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="schemes-grid" style={{ marginTop: '24px' }}>
        {filteredJobs.map((job) => {
          const isSaved = savedJobIds.includes(job.id);
          return (
            <div key={job.id} className="scheme-card glass-card hover-lift" style={{ borderLeft: '4px solid var(--secondary)' }}>
              <div className="scheme-card-header">
                <span className="scheme-cat-tag">{job.category}</span>
                <button 
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  onClick={() => toggleSaveJob(job.id)}
                  title={isSaved ? "Saved Job" : "Save Job"}
                >
                  <Bookmark size={18} color="var(--primary)" fill={isSaved ? "var(--primary)" : "none"} />
                </button>
              </div>

              <h3 className="scheme-title">{job.title}</h3>
              <p style={{ color: 'var(--secondary)', fontWeight: '700', marginBottom: '8px' }}>{job.company}</p>

              <div style={{ fontSize: '0.88rem', color: '#555', marginBottom: '16px' }}>
                <p><MapPin size={13} /> {job.location} ({job.workType})</p>
                <p><Briefcase size={13} /> {job.jobType} • {job.experience}</p>
                <p><Award size={13} /> {job.salary}</p>
              </div>

              <div className="scheme-card-actions">
                <button className="btn btn-outline btn-sm" onClick={() => setSelectedJobModal(job)}>
                  View Details
                </button>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => alert(`Application for ${job.title} sent successfully!`)}
                >
                  Apply <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Job Details Modal */}
      {selectedJobModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-container">
            <div className="modal-header">
              <div>
                <span className="scheme-cat-tag">{selectedJobModal.category}</span>
                <h2>{selectedJobModal.title}</h2>
                <p className="sub-text">{selectedJobModal.company} • {selectedJobModal.location}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedJobModal(null)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="benefit-highlight-box">
                💰 <strong>Salary Package:</strong> {selectedJobModal.salary}
              </div>

              <h4 style={{ marginTop: '16px' }}>Job Description</h4>
              <p style={{ fontSize: '0.95rem', color: '#444' }}>{selectedJobModal.description}</p>

              <h4 style={{ marginTop: '16px', marginBottom: '8px' }}>Requirements</h4>
              <ul className="doc-check-list">
                {selectedJobModal.requirements.map((req, i) => (
                  <li key={i}><CheckCircle size={15} color="var(--primary)" /> {req}</li>
                ))}
              </ul>
            </div>

            <div className="modal-footer">
              <button 
                className="btn btn-outline"
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert("Job link copied to clipboard!");
                }}
              >
                <Share2 size={16} /> Share Job
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  alert(`Application for ${selectedJobModal.title} submitted!`);
                  setSelectedJobModal(null);
                }}
              >
                Submit Application Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;

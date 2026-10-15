import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Search, 
  Printer, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const ApplicationTracker = ({ applications }) => {
  const [searchAppId, setSearchAppId] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  const statuses = [
    { title: "Applied", color: "#3a86ef" },
    { title: "Under Verification", color: "#ffb703" },
    { title: "Pending", color: "#fb8500" },
    { title: "Approved", color: "#2ec4b6" },
    { title: "Rejected", color: "#e63946" }
  ];

  const filteredApps = applications.filter(app => 
    app.appId.toLowerCase().includes(searchAppId.toLowerCase()) ||
    app.schemeTitle.toLowerCase().includes(searchAppId.toLowerCase())
  );

  return (
    <section id="tracker" className="section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="feature-pill-tag">
            <Clock size={14} /> Real-Time Application Tracking System
          </span>
          <h2>Track Your Welfare & Scholarship Applications</h2>
          <p className="section-desc">
            Monitor verification updates, Panchayat Nodal checks, and direct bank disbursement status in real time.
          </p>
        </div>

        {/* Search Bar for Tracker */}
        <div className="tracker-search-bar glass-card">
          <Search size={18} color="#666" />
          <input 
            type="text" 
            placeholder="Enter Application ID (e.g., EMP-2026-8942) or Scheme Name..."
            value={searchAppId}
            onChange={(e) => setSearchAppId(e.target.value)}
          />
        </div>

        {/* Applications List */}
        <div className="applications-grid">
          {filteredApps.length === 0 ? (
            <div className="empty-tracker glass-card text-center" style={{ padding: '40px' }}>
              <FileText size={48} color="#ccc" />
              <h3>No Applications Found</h3>
              <p style={{ color: '#666' }}>
                You haven't submitted any applications yet, or no results matched your search. Select a scheme above to apply!
              </p>
            </div>
          ) : (
            filteredApps.map((app) => {
              const currentStepIndex = app.currentTimelineStep || 1;
              return (
                <div key={app.appId} className="app-tracker-card glass-card">
                  <div className="app-card-top">
                    <div>
                      <span className="app-id-badge">ID: {app.appId}</span>
                      <h3 style={{ margin: '6px 0 2px' }}>{app.schemeTitle}</h3>
                      <span className="sub-text">Submitted on: {app.submittedDate} • Applicant: {app.applicantName}</span>
                    </div>

                    <div className="status-pill-wrap">
                      <span className={`status-pill status-${app.status.toLowerCase().replace(' ', '-')}`}>
                        ● {app.status}
                      </span>
                    </div>
                  </div>

                  {/* Visual 5-Step Timeline Bar */}
                  <div className="timeline-track-container">
                    <div className="timeline-track">
                      {statuses.map((st, idx) => {
                        const stepNum = idx + 1;
                        const isDone = stepNum <= currentStepIndex;
                        const isCurrent = stepNum === currentStepIndex;
                        return (
                          <div 
                            key={idx} 
                            className={`timeline-step ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
                          >
                            <div className="timeline-node" style={{ borderColor: isDone ? st.color : '#ddd', background: isDone ? st.color : 'white' }}>
                              {isDone ? <CheckCircle2 size={14} color="white" /> : stepNum}
                            </div>
                            <span className="timeline-label">{st.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Logs & Actions */}
                  <div className="app-card-footer">
                    <div className="latest-log-note">
                      <strong>Latest Update:</strong> {app.logs[app.logs.length - 1]}
                    </div>
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => setSelectedApp(app)}
                    >
                      <Printer size={14} /> View Receipt & Details
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Application Receipt Modal */}
      {selectedApp && (
        <div className="modal-overlay">
          <div className="glass-card modal-container">
            <div className="modal-header">
              <div>
                <h2>Application Receipt Slip</h2>
                <p className="subtitle-text">Official EmpowerHer Verification Record</p>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedApp(null)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="receipt-box" style={{ border: '2px dashed var(--primary)', padding: '20px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '15px' }}>
                  <div>
                    <h3 style={{ margin: 0, color: 'var(--primary)' }}>EmpowerHer Initiative</h3>
                    <span style={{ fontSize: '0.85rem', color: '#666' }}>Smart Welfare Portal</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ display: 'block' }}>{selectedApp.appId}</strong>
                    <span style={{ fontSize: '0.85rem', color: '#666' }}>Date: {selectedApp.submittedDate}</span>
                  </div>
                </div>

                <div className="receipt-row"><strong>Scheme Name:</strong> {selectedApp.schemeTitle}</div>
                <div className="receipt-row"><strong>Applicant Name:</strong> {selectedApp.applicantName}</div>
                <div className="receipt-row"><strong>Current Status:</strong> <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{selectedApp.status}</span></div>
                
                <h4 style={{ marginTop: '15px', marginBottom: '8px' }}>Verification Activity Log</h4>
                <ul className="mini-bullet-list">
                  {selectedApp.logs.map((logMsg, i) => (
                    <li key={i}>{logMsg}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn btn-outline"
                onClick={() => window.print()}
              >
                <Printer size={16} /> Print Official Slip
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => setSelectedApp(null)}
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ApplicationTracker;

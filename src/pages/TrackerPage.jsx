import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  Search, 
  Printer, 
  FileText, 
  ChevronRight, 
  Calendar,
  ShieldCheck,
  Building
} from 'lucide-react';

const TrackerPage = ({ applications }) => {
  const [searchAppId, setSearchAppId] = useState('');
  const [selectedStageIndex, setSelectedStageIndex] = useState(2); // default stage 2

  const timelineStages = [
    { title: "Application Submitted", date: "2026-09-28", desc: "Digital application received via EmpowerHer portal.", nextAction: "Automated document OCR verification." },
    { title: "Documents Verified", date: "2026-09-29", desc: "Aadhaar and income certificates verified via automated OCR engine.", nextAction: "Physical Nodal check at Panchayat office." },
    { title: "Under Panchayat Verification", date: "2026-10-01", desc: "Field officer assigned for local ward residence confirmation.", nextAction: "Departmental sanction approval." },
    { title: "Department Approval", date: "Pending", desc: "Final sanction by District Collectorate Welfare Board.", nextAction: "NPCI bank account mapping check." },
    { title: "Benefit Disbursement", date: "Pending", desc: "Direct Benefit Transfer (DBT) credit to bank account.", nextAction: "Monthly status SMS dispatch." }
  ];

  const filteredApps = applications.filter(app => 
    app.appId.toLowerCase().includes(searchAppId.toLowerCase()) ||
    app.schemeTitle.toLowerCase().includes(searchAppId.toLowerCase())
  );

  return (
    <div className="tracker-page-container">
      <div className="page-header-title">
        <h2>Real-Time Application Status Tracker</h2>
        <p className="subtitle-text">Click any stage on the interactive timeline to inspect dates and next verification steps.</p>
      </div>

      {/* Search Bar */}
      <div className="filter-panel-card glass-card" style={{ marginBottom: '24px' }}>
        <div className="search-bar-wrap">
          <Search size={18} color="#666" />
          <input 
            type="text" 
            placeholder="Search Application ID (e.g., EMP-2026-8942) or Scheme Name..."
            value={searchAppId}
            onChange={(e) => setSearchAppId(e.target.value)}
          />
        </div>
      </div>

      {/* Applications List */}
      <div className="applications-grid">
        {filteredApps.map((app) => (
          <div key={app.appId} className="app-tracker-card glass-card">
            <div className="app-card-top">
              <div>
                <span className="app-id-badge">ID: {app.appId}</span>
                <h3 style={{ margin: '6px 0 2px' }}>{app.schemeTitle}</h3>
                <span className="sub-text">Applicant: {app.applicantName} • Date: {app.submittedDate}</span>
              </div>
              <span className="status-pill status-under-verification">
                ● {app.status}
              </span>
            </div>

            {/* Clickable 5-Stage Visual Timeline */}
            <div className="timeline-track-container" style={{ margin: '24px 0' }}>
              <div className="timeline-track">
                {timelineStages.map((st, idx) => {
                  const stepNum = idx + 1;
                  const isDone = stepNum <= selectedStageIndex;
                  const isSelected = selectedStageIndex === stepNum;
                  return (
                    <div 
                      key={idx}
                      className={`timeline-step ${isDone ? 'done' : ''} ${isSelected ? 'current' : ''}`}
                      onClick={() => setSelectedStageIndex(stepNum)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="timeline-node">
                        {isDone ? <CheckCircle2 size={16} /> : stepNum}
                      </div>
                      <span className="timeline-label">{st.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Inspection Box for Selected Stage */}
            <div className="stage-detail-box glass-card" style={{ background: '#f8f9fa', padding: '18px', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h4 style={{ margin: 0, color: 'var(--primary)' }}>
                  Stage {selectedStageIndex}: {timelineStages[selectedStageIndex - 1].title}
                </h4>
                <span className="sub-text"><Calendar size={13} /> {timelineStages[selectedStageIndex - 1].date}</span>
              </div>
              <p style={{ margin: '4px 0 8px', fontSize: '0.92rem', color: '#444' }}>
                {timelineStages[selectedStageIndex - 1].desc}
              </p>
              <div style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: '600' }}>
                ➡️ Next Required Action: {timelineStages[selectedStageIndex - 1].nextAction}
              </div>
            </div>

            <div className="app-card-footer" style={{ marginTop: '20px' }}>
              <span className="sub-text">Receipt generated & signed by EmpowerHer System</span>
              <button className="btn btn-outline btn-sm" onClick={() => window.print()}>
                <Printer size={14} /> Print Receipt Slip
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackerPage;
